import { NextResponse, after } from "next/server";
import {
  ID_MAX_BYTES,
  isRegistrationOpen,
  isUuid,
  normaliseDetails,
  sniffIdType,
  validateConsents,
  validateDetails,
  validateIdMeta,
  type GuestConsents,
  type GuestDetails,
} from "@/lib/guestRegistration";
import { StorageNotConfiguredError, saveGuestRegistration } from "@/lib/guestRegistrationStore";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { sendGuestRegistrationAlert } from "@/lib/notifications/guestEmail";

export const dynamic = "force-dynamic";

/** The ID file is up to 5 MB; the rest of the form is a few KB. */
const MAX_BODY_BYTES = ID_MAX_BYTES + 64 * 1024;
const MAX_JSON_BYTES = 12_000;
/** 6 attempts per 10 minutes per IP: ample for typos and retries, hostile to scripts. */
const LIMIT = 6;
const WINDOW_MS = 10 * 60 * 1000;

const json = (body: Record<string, unknown>, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Write-only, like /api/applications: no GET, no listing, no lookup by
 * reference or email. A response says "saved" (with a reference), "already
 * registered", or what to fix — never anything about anyone else.
 *
 * Request: multipart/form-data with
 *   - `payload`    JSON string: { submissionKey, details, consents, website? }
 *   - `idDocument` the guest's Aadhaar (JPG / PNG / PDF, ≤ 5 MB) — mandatory
 *
 * Re-validates everything, including the file's real bytes. The browser's
 * checks are UX; these are the rules.
 */
export async function POST(request: Request) {
  // The trip has started (or finished): no more registrations.
  if (!isRegistrationOpen()) {
    return json({ ok: false, closed: true, error: "Registration for this trip has closed." }, 410);
  }

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("multipart/form-data")) {
    return json({ ok: false, error: "Unsupported request." }, 415);
  }

  // Browsers always send Origin on cross-site POSTs. If it's present it must be us.
  const origin = request.headers.get("origin");
  if (origin) {
    let sameHost = false;
    try {
      sameHost = new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
    } catch {
      /* malformed origin */
    }
    if (!sameHost) return json({ ok: false, error: "Unsupported request." }, 403);
  }

  // Cheap rejection before reading a byte. A missing/lying header is caught below.
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "That upload is too large (5 MB max)." }, 413);

  if (rateLimit(`guest:${clientIp(request)}`, LIMIT, WINDOW_MS).limited) {
    return json({ ok: false, error: "Too many attempts — please wait a few minutes and try again." }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  const payloadRaw = form.get("payload");
  if (typeof payloadRaw !== "string" || payloadRaw.length > MAX_JSON_BYTES) {
    return json({ ok: false, error: "Malformed request." }, 400);
  }
  let body: { submissionKey?: unknown; details?: unknown; consents?: unknown; website?: unknown };
  try {
    const parsed = JSON.parse(payloadRaw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed;
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot: look successful, save nothing.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true, reference: "PT-GOA-XXXXXXXX" }, 201);
  }

  if (!isUuid(body.submissionKey)) return json({ ok: false, error: "Malformed request." }, 400);

  const details = (body.details ?? {}) as Partial<GuestDetails>;
  const detailErrors = validateDetails(details);
  const consentErrors = validateConsents(body.consents as Partial<GuestConsents> | undefined);

  const file = form.get("idDocument");
  const idError = !(file instanceof File) ? validateIdMeta(null) : validateIdMeta(file);

  if (Object.keys(detailErrors).length || Object.keys(consentErrors).length || idError) {
    return json({ ok: false, errors: { details: detailErrors, consents: consentErrors, idDocument: idError } }, 422);
  }

  // The real type comes from the bytes, not from the filename or the declared MIME type.
  const bytes = Buffer.from(await (file as File).arrayBuffer());
  const kind = bytes.length <= ID_MAX_BYTES ? sniffIdType(bytes) : null;
  if (!kind) {
    return json({ ok: false, errors: { details: {}, consents: {}, idDocument: "That doesn’t look like a JPG, PNG or PDF." } }, 422);
  }

  const c = (body.consents ?? {}) as Partial<GuestConsents>;
  const consents: GuestConsents = { agreement: c.agreement === true, privacy_media: c.privacy_media === true };

  try {
    const clean = normaliseDetails(details as GuestDetails);
    const outcome = await saveGuestRegistration(body.submissionKey as string, clean, consents, {
      bytes,
      mime: kind.mime,
      ext: kind.ext,
    });
    if (outcome.status === "duplicate") {
      return json(
        {
          ok: false,
          duplicate: true,
          error: "It looks like you’re already registered for this trip. If something needs changing, message us and we’ll sort it.",
        },
        409
      );
    }
    // Tell the team — only for a NEW registration (not a retry), and only after the
    // response is on its way, so email trouble can never affect the guest.
    if (outcome.status === "created") {
      const ref = outcome.reference;
      after(() => sendGuestRegistrationAlert({ reference: ref, fullName: clean.fullName, city: clean.city }));
    }
    return json({ ok: true, reference: outcome.reference }, outcome.status === "created" ? 201 : 200);
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      console.error("[plot] refusing guest registrations: storage is not configured.");
      return json({ ok: false, error: "Registration isn’t available right now. Please try again shortly." }, 503);
    }
    return json({ ok: false, error: "Something went wrong on our side and nothing was saved. Your answers are still here — please try again." }, 500);
  }
}
