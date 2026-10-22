import "server-only";
import { serviceRoleClient } from "./supabase/serviceRole";
import { ID_BUCKET } from "./guestRegistrationStore";
import { GUEST_TRIP, CONSENT_IDS, type ConsentId } from "./guestRegistration";

/**
 * ADMIN DATA ACCESS for guest registrations. Same contract as
 * lib/adminApplications.ts: nothing in here checks auth — every caller must
 * already have passed requireAdmin().
 */

export type GuestConsentRow = {
  consent_type: ConsentId;
  granted: boolean;
  policy_version: string;
  recorded_at: string;
};

export type GuestRow = {
  id: string;
  reference: string;
  trip_id: string;
  full_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  city: string;
  emergency_name: string;
  emergency_relationship: string;
  emergency_phone: string;
  safety_note: string | null;
  id_document_path: string | null;
  status: string;
  created_at: string;
  guest_consents: GuestConsentRow[];
};

const COLUMNS =
  "id,reference,trip_id,full_name,date_of_birth,phone,email,city,emergency_name,emergency_relationship,emergency_phone,safety_note,id_document_path,status,created_at," +
  "guest_consents(consent_type,granted,policy_version,recorded_at)";

/** Strip characters that would break PostgREST's or-filter syntax rather than reject the search. */
function sanitiseSearchTerm(raw: string) {
  return raw.trim().replace(/[,()%_*\\]/g, "").slice(0, 60);
}

export async function listGuests(opts: { q?: string; tripId?: string } = {}): Promise<GuestRow[]> {
  let query = serviceRoleClient()
    .from("guest_registrations")
    .select(COLUMNS)
    .eq("trip_id", opts.tripId ?? GUEST_TRIP.id)
    .order("created_at", { ascending: false })
    .limit(500);

  const term = sanitiseSearchTerm(opts.q ?? "");
  if (term) query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%,reference.ilike.%${term}%`);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as GuestRow[];
}

export function consentOf(row: GuestRow, id: ConsentId): GuestConsentRow | undefined {
  return row.guest_consents.find((c) => c.consent_type === id);
}

/* ------------------------------------------------------------------ */
/* CSV export — trip-operations fields only                            */
/* ------------------------------------------------------------------ */

/**
 * Quote a cell, and neutralise spreadsheet formula injection: a guest-typed
 * value beginning with = + - @ (or tab/CR) would execute when an admin opens
 * the file in Excel/Sheets. A leading apostrophe makes it inert text.
 */
function cell(value: string | null | undefined): string {
  let s = value ?? "";
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export function guestsToCsv(rows: GuestRow[]): string {
  const header = [
    "reference",
    "registered_at",
    "full_name",
    "date_of_birth",
    "phone",
    "email",
    "city",
    "emergency_name",
    "emergency_relationship",
    "emergency_phone",
    "safety_note",
    "status",
    ...CONSENT_IDS.map((id) => `consent_${id}`),
  ];
  const lines = rows.map((r) =>
    [
      r.reference,
      r.created_at,
      r.full_name,
      r.date_of_birth,
      r.phone,
      r.email,
      r.city,
      r.emergency_name,
      r.emergency_relationship,
      r.emergency_phone,
      r.safety_note,
      r.status,
      ...CONSENT_IDS.map((id) => (consentOf(r, id)?.granted ? "yes" : "no")),
    ]
      .map((v) => cell(v))
      .join(",")
  );
  return [header.map((h) => cell(h)).join(","), ...lines].join("\r\n") + "\r\n";
}

/**
 * A 60-second signed URL for one guest's ID document. The bucket is private,
 * so this is the ONLY way anyone reads one. Caller must have passed requireAdmin().
 */
export async function signedIdUrl(registrationId: string): Promise<string | null> {
  const db = serviceRoleClient();
  const { data, error } = await db.from("guest_registrations").select("id_document_path").eq("id", registrationId).maybeSingle();
  if (error) throw error;
  if (!data?.id_document_path) return null;
  const signed = await db.storage.from(ID_BUCKET).createSignedUrl(data.id_document_path, 60);
  if (signed.error) throw signed.error;
  return signed.data.signedUrl;
}
