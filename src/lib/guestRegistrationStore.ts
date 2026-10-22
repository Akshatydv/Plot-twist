import "server-only";
import { randomInt } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isSupabaseConfigured, serviceRoleClient, StorageNotConfiguredError } from "./supabase/serviceRole";
import { GUEST_TRIP, expandConsents, type GuestConsents, type GuestDetails } from "./guestRegistration";

export const ID_BUCKET = "guest-ids";

/** A validated ID upload: bytes already sniffed by the route handler. */
export type IdUpload = { bytes: Buffer; mime: string; ext: string };

/**
 * STORAGE ADAPTER for guest registrations — mirrors lib/applicationStore.ts.
 *
 * Production path: one call to the `submit_guest_registration` Postgres
 * function (see supabase/migrations/20261010000000_guest_registrations.sql),
 * which writes the registration and every consent record in a single
 * transaction and decides duplicates / retries with unique indexes, not with
 * a racy read-then-write here.
 *
 * Without Supabase: development falls back to .data/guest-registrations.jsonl
 * (gitignored) so the flow is testable; every other environment refuses to
 * save, because a "success" that wrote nowhere is the worst possible failure.
 *
 * Nothing here logs a field value. Errors are logged by code only.
 */

export { isSupabaseConfigured, StorageNotConfiguredError };

export type SaveOutcome =
  | { status: "created"; reference: string }
  /** Same submission key seen before: a retry. The original reference, not an error. */
  | { status: "replayed"; reference: string }
  /** A different submission already holds this email for this trip. */
  | { status: "duplicate" };

/** No 0/O/1/I/L — read aloud or copied from a screenshot, a reference shouldn't be ambiguous. */
const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** PT-GOA-7K4M9QXD — 31^8 ≈ 8.5e11, drawn from a CSPRNG, so references can't be enumerated. */
export function newReference(): string {
  let id = "";
  for (let i = 0; i < 8; i++) id += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  return `PT-${GUEST_TRIP.shortName.toUpperCase()}-${id}`;
}

/** The consent rows as stored: server-side wording and version, one row per underlying consent. */
const consentRows = expandConsents;

/* ------------------------------------------------------------------ */
/* dev fallback                                                        */
/* ------------------------------------------------------------------ */

const FILE = path.join(process.cwd(), ".data", "guest-registrations.jsonl");
let warned = false;

type FileRecord = {
  reference: string;
  submission_key: string;
  trip_id: string;
  details: GuestDetails;
  consents: ReturnType<typeof consentRows>;
  created_at: string;
};

/** Dev fallback only: serialise writes in-process so concurrent requests can't both pass the duplicate check. Postgres does this properly in production. */
let fileQueue: Promise<unknown> = Promise.resolve();
function saveToFile(
  key: string,
  details: GuestDetails,
  consents: GuestConsents,
  reference: string,
  id: IdUpload
): Promise<SaveOutcome> {
  const run = fileQueue.then(() => writeToFile(key, details, consents, reference, id));
  fileQueue = run.catch(() => undefined);
  return run;
}

async function writeToFile(
  key: string,
  details: GuestDetails,
  consents: GuestConsents,
  reference: string,
  id: IdUpload
): Promise<SaveOutcome> {
  if (!warned) {
    warned = true;
    console.warn("[plot] Supabase is not configured — writing guest registrations to .data/guest-registrations.jsonl (dev only).");
  }
  await mkdir(path.dirname(FILE), { recursive: true });

  let existing: FileRecord[] = [];
  try {
    existing = (await readFile(FILE, "utf8")).split("\n").filter(Boolean).map((l) => JSON.parse(l) as FileRecord);
  } catch {
    /* no file yet */
  }
  const replay = existing.find((r) => r.submission_key === key);
  if (replay) return { status: "replayed", reference: replay.reference };
  if (existing.some((r) => r.trip_id === GUEST_TRIP.id && r.details.email === details.email)) {
    return { status: "duplicate" };
  }

  const idPath = path.join(path.dirname(FILE), "guest-ids", `${key}.${id.ext}`);
  await mkdir(path.dirname(idPath), { recursive: true });
  await writeFile(idPath, id.bytes);

  const record: FileRecord = {
    reference,
    submission_key: key,
    trip_id: GUEST_TRIP.id,
    details,
    consents: consentRows(consents),
    created_at: new Date().toISOString(),
  };
  await appendFile(FILE, `${JSON.stringify(record)}\n`, "utf8");
  return { status: "created", reference };
}

/* ------------------------------------------------------------------ */
/* the interface the route handler uses                                */
/* ------------------------------------------------------------------ */

/**
 * Persists one registration plus its consent records.
 *
 * @throws {StorageNotConfiguredError} no Supabase credentials outside development
 */
export async function saveGuestRegistration(
  submissionKey: string,
  details: GuestDetails,
  consents: GuestConsents,
  id: IdUpload
): Promise<SaveOutcome> {
  if (!isSupabaseConfigured) {
    if (process.env.NODE_ENV !== "development") throw new StorageNotConfiguredError();
    return saveToFile(submissionKey, details, consents, newReference(), id);
  }

  // The document goes to the PRIVATE bucket first; only its path is stored in the row.
  // Keyed by submission key, so a retry overwrites the same object instead of piling up copies.
  const idPath = `${GUEST_TRIP.id}/${submissionKey}.${id.ext}`;
  const up = await serviceRoleClient().storage.from(ID_BUCKET).upload(idPath, id.bytes, { contentType: id.mime, upsert: true });
  if (up.error) {
    console.error("[plot] guest id upload failed");
    throw new Error("guest id upload failed");
  }
  const discard = () => serviceRoleClient().storage.from(ID_BUCKET).remove([idPath]).then(() => undefined, () => undefined);

  // A reference collision (~1 in 10^12) surfaces as a unique violation that is
  // neither "replayed" nor "duplicate"; a fresh reference resolves it.
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await serviceRoleClient().rpc("submit_guest_registration", {
      p: {
        trip_id: GUEST_TRIP.id,
        reference: newReference(),
        submission_key: submissionKey,
        full_name: details.fullName,
        date_of_birth: details.dob,
        phone: details.phone,
        email: details.email,
        city: details.city,
        emergency_name: details.emergencyName,
        emergency_relationship: details.emergencyRelationship,
        emergency_phone: details.emergencyPhone,
        safety_note: details.safetyNote || null,
        id_document_path: idPath,
        consents: consentRows(consents),
      },
    });

    if (error) {
      if (error.code === "23505" && attempt < 2) continue;
      // Code only. The message of a failed insert can quote the offending value.
      console.error("[plot] guest registration failed, pg code:", error.code ?? "unknown");
      await discard();
      throw new Error("guest registration failed");
    }

    const result = data as { status?: string; reference?: string } | null;
    if (result?.status === "duplicate") {
      await discard(); // someone else already holds this email; don't keep an orphaned ID
      return { status: "duplicate" };
    }
    if ((result?.status === "created" || result?.status === "replayed") && result.reference) {
      return { status: result.status, reference: result.reference };
    }
    console.error("[plot] guest registration returned an unexpected result");
    await discard();
    throw new Error("guest registration failed");
  }
  throw new Error("guest registration failed");
}
