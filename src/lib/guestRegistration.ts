/**
 * GUEST REGISTRATION — shape, copy-of-record and validation.
 *
 * One module imported by the form AND the route handler, so the browser and
 * the server cannot disagree about what is acceptable. Deliberately free of
 * `server-only` and Node APIs.
 *
 * ─── CONSENT TEXT IS DATA ───────────────────────────────────────────────────
 * The exact wording a guest is shown lives in CONSENT_GROUPS below. The form renders
 * from it and the server stores the SERVER's copy of it (never text sent by
 * the browser) next to the version id. So what is on record is, by
 * construction, what the guest was shown at that version. Edit a sentence ->
 * bump its `version`.
 *
 * Nothing here is legal advice. The terms, conduct and privacy documents these
 * versions point at are DRAFTS until the business and a lawyer say otherwise.
 */

export const GUEST_TRIP = {
  /** Stored on every row; the unique key for "one registration per guest per trip". */
  id: "goa-2026",
  name: "Goa",
  shortName: "Goa",
  dates: "17–20 October 2026",
  /** First day of the trip, ISO. Used for the age-at-travel check. */
  startDate: "2026-10-17",
  eyebrow: "GOA · 17–20 OCTOBER 2026",
  /** The registry id on the website (content/journeys). Used only to exclude Goa from "more trips". */
  journeyId: "JOURNEY 1",
  /** Route this flow lives at. */
  path: "/guest/goa-2026",
  /** Registration closes when the trip starts. After this the page says so and the API refuses. */
  closesAt: "2026-10-17T00:00:00+05:30",
} as const;

/** Is the registration form still taking submissions? `now` is injectable for tests. */
export function isRegistrationOpen(now: Date = new Date()): boolean {
  return now.getTime() < new Date(GUEST_TRIP.closesAt).getTime();
}

/** Minimum age on the first day of the trip. Taken from the published "ages 18–30" trip rule (content/goa.ts) — only the floor is enforced, as a guest cannot give the consents below if they are a minor. */
export const MIN_AGE_AT_TRIP = 18;

/**
 * TWO CLUBBED DECLARATIONS, EACH A SINGLE TICK.
 *
 * The guest ticks two boxes; the server expands each into the underlying
 * consent records so the audit trail stays granular (each row has its own
 * version). Every row stores the FULL wording of the box that was ticked —
 * what was actually shown — not a fragment.
 *
 *   agreement      -> terms + conduct + declaration
 *   privacy_media  -> privacy + media_organic + media_paid
 *
 * Everything is mandatory by business decision. NOTE for legal review: making
 * photo/video permission a condition of joining weakens it as "freely given"
 * consent under India's DPDP Act; see docs/guest-registration.md.
 */
/**
 * TWO CLUBBED DECLARATIONS, EACH A SINGLE TICK.
 *
 * The guest ticks two boxes; the server expands each into the underlying
 * consent records so the audit trail stays granular (each row has its own
 * version). Every row stores the FULL wording of the box that was ticked —
 * what was actually shown — not a fragment.
 *
 *   agreement      -> terms + conduct + declaration
 *   privacy_media  -> privacy + media_organic + media_paid
 *
 * Everything is mandatory by business decision. NOTE for legal review: making
 * photo/video permission a condition of joining weakens it as "freely given"
 * consent under India's DPDP Act; see docs/guest-registration.md.
 */
export type ConsentId = "terms" | "conduct" | "declaration" | "privacy" | "media_organic" | "media_paid";
export type ConsentGroupId = "agreement" | "privacy_media";

export type ConsentGroup = {
  id: ConsentGroupId;
  /** The exact text shown beside the tick box (links are rendered by the UI around these phrases). */
  text: string;
  ids: ConsentId[];
};

export const CONSENT_GROUPS: Record<ConsentGroupId, ConsentGroup> = {
  agreement: {
    id: "agreement",
    ids: ["terms", "conduct", "declaration"],
    text: "I have read and agree to the Plot Twist Trip Terms & Conditions for Goa and the Guest Code of Conduct and safety guidelines, and I confirm that the information I have provided is accurate to the best of my knowledge.",
  },
  privacy_media: {
    id: "privacy_media",
    ids: ["privacy", "media_organic", "media_paid"],
    text: "I have read the privacy notice, and I’m happy for Plot Twist to use photos and videos from the trip.",
  },
};

/** Per-record version. Bump whenever the wording OR the document it points at changes materially. */
export const CONSENT_VERSIONS: Record<ConsentId, string> = {
  terms: "goa-2026-terms-DRAFT-1",
  conduct: "goa-2026-conduct-DRAFT-1",
  declaration: "goa-2026-declaration-3",
  privacy: "privacy-DRAFT-2026-10-11",
  media_organic: "media-organic-3",
  media_paid: "media-paid-3",
};

export const CONSENT_IDS = Object.keys(CONSENT_VERSIONS) as ConsentId[];
export const CONSENT_GROUP_IDS = Object.keys(CONSENT_GROUPS) as ConsentGroupId[];

/** The stored consent rows for a set of ticked groups: every id in a ticked group, with the group's full wording. */
export function expandConsents(ticked: GuestConsents) {
  return CONSENT_GROUP_IDS.flatMap((g) =>
    CONSENT_GROUPS[g].ids.map((id) => ({
      consent_type: id,
      granted: ticked[g] === true,
      policy_version: CONSENT_VERSIONS[id],
      consent_text: CONSENT_GROUPS[g].text,
    }))
  );
}

/** Where each document lives. Opened in a new tab so the form keeps its state. */
export const GUEST_DOC_PATHS = {
  terms: "/guest/goa-2026/terms",
  conduct: "/guest/goa-2026/safety",
  privacy: "/privacy",
} as const;

/* ------------------------------------------------------------------ */
/* input                                                               */
/* ------------------------------------------------------------------ */

export type GuestDetails = {
  fullName: string;
  /** YYYY-MM-DD */
  dob: string;
  /** Any format; normalised to +<digits> (10 digits = India). */
  phone: string;
  email: string;
  city: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  /** Required. Allergies / accessibility needs — "None" if there are none. */
  safetyNote: string;
};

export type GuestConsents = Record<ConsentGroupId, boolean>;

export type GuestSubmission = {
  /** Random per page-load. Makes a retried or double-fired request idempotent. */
  submissionKey: string;
  details: GuestDetails;
  consents: GuestConsents;
  /** Honeypot. Humans never see it. */
  website?: string;
};

export type DetailErrors = Partial<Record<keyof GuestDetails, string>>;
export type ConsentErrors = Partial<Record<ConsentGroupId, string>>;

export const EMPTY_DETAILS: GuestDetails = {
  fullName: "",
  dob: "",
  phone: "",
  email: "",
  city: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  safetyNote: "",
};

export const EMPTY_CONSENTS: GuestConsents = { agreement: false, privacy_media: false };

export const LIMITS = {
  name: 100,
  city: 80,
  relationship: 40,
  safetyNote: 500,
  email: 254,
} as const;

/* ------------------------------------------------------------------ */
/* normalisation                                                       */
/* ------------------------------------------------------------------ */

/** Collapse runs of whitespace and trim. */
export function cleanText(raw: unknown): string {
  return typeof raw === "string" ? raw.replace(/\s+/g, " ").trim() : "";
}

/**
 * Stored as +<digits>. A country code is NOT required: a bare 10-digit number
 * (or one with a leading 0) is taken to be Indian and stored as +91…; anything
 * longer is assumed to already include its country code.
 */
export function normalisePhone(raw: unknown): string {
  const s = typeof raw === "string" ? raw.trim() : "";
  const digits = s.replace(/\D/g, "");
  if (!digits) return "";
  if (s.startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  return `+${digits}`;
}

export function normaliseEmail(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().toLowerCase() : "";
}

/** Free text keeps its line breaks (collapsed to at most one blank line) but loses control characters. */
export function cleanNote(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ------------------------------------------------------------------ */
/* validation                                                          */
/* ------------------------------------------------------------------ */

// Deliberately permissive: the only real test of an email is sending to it.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Calendar-valid YYYY-MM-DD? Rejects 2000-02-31 rather than letting Date roll it into March. */
function parseIsoDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return date;
}

/** Whole years between `dob` and `on`, both UTC dates. */
function ageOn(dob: Date, on: Date): number {
  let age = on.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    on.getUTCMonth() < dob.getUTCMonth() ||
    (on.getUTCMonth() === dob.getUTCMonth() && on.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

function validatePhone(raw: string, label: string): string | undefined {
  const phone = normalisePhone(raw);
  if (!phone) return `Add ${label}.`;
  const digits = phone.length - 1;
  if (digits < 8 || digits > 15) return "That number doesn’t look right — check the digits.";
  return undefined;
}

/** `today` is injectable so the date rules are testable. */
export function validateDetails(input: Partial<GuestDetails>, today: Date = new Date()): DetailErrors {
  const e: DetailErrors = {};

  const name = cleanText(input.fullName);
  if (name.length < 2) e.fullName = "Add your full name, as it appears on your ID.";
  else if (!/\p{L}/u.test(name)) e.fullName = "That doesn’t look like a name.";
  else if (name.length > LIMITS.name) e.fullName = "That’s a bit long — please shorten it.";

  const dob = typeof input.dob === "string" ? input.dob : "";
  if (!dob) e.dob = "Add your date of birth.";
  else {
    const d = parseIsoDate(dob);
    const todayUtc = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    if (!d) e.dob = "Enter a valid date.";
    else if (d.getTime() > todayUtc.getTime()) e.dob = "Your date of birth can’t be in the future.";
    else if (ageOn(d, todayUtc) > 100) e.dob = "Double-check the year.";
    else if (ageOn(d, parseIsoDate(GUEST_TRIP.startDate)!) < MIN_AGE_AT_TRIP) {
      e.dob = `Guests need to be ${MIN_AGE_AT_TRIP}+ on the first day of the trip. If this is a mistake, message us.`;
    }
  }

  const phoneErr = validatePhone(String(input.phone ?? ""), "your mobile number");
  if (phoneErr) e.phone = phoneErr;

  const email = normaliseEmail(input.email);
  if (!email) e.email = "Add your email address.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) e.email = "That email doesn’t look right.";

  const city = cleanText(input.city);
  if (city.length < 2) e.city = "Add the city you live in.";
  else if (city.length > LIMITS.city) e.city = "That’s a bit long — just the city, please.";

  const eName = cleanText(input.emergencyName);
  if (eName.length < 2) e.emergencyName = "Add your emergency contact’s name.";
  else if (eName.length > LIMITS.name) e.emergencyName = "That’s a bit long — please shorten it.";

  const rel = cleanText(input.emergencyRelationship);
  if (!rel) e.emergencyRelationship = "How are they related to you?";
  else if (rel.length > LIMITS.relationship) e.emergencyRelationship = "Keep it short, e.g. “Mother”.";

  const ePhoneErr = validatePhone(String(input.emergencyPhone ?? ""), "their phone number");
  if (ePhoneErr) e.emergencyPhone = ePhoneErr;
  else if (!phoneErr && normalisePhone(input.emergencyPhone) === normalisePhone(input.phone)) {
    e.emergencyPhone = "This should be someone else’s number, not yours.";
  }

  const note = cleanNote(input.safetyNote);
  if (!note) e.safetyNote = "Tell us about any allergy or accessibility need — or write “None”.";
  else if (note.length > LIMITS.safetyNote) e.safetyNote = `Keep this under ${LIMITS.safetyNote} characters.`;

  return e;
}

/** Both declarations are mandatory. */
export function validateConsents(input: Partial<GuestConsents> | undefined): ConsentErrors {
  const e: ConsentErrors = {};
  // Strictly `=== true`: a truthy string or number from a hand-made request is not consent.
  if (input?.agreement !== true) e.agreement = "Please tick this to continue.";
  if (input?.privacy_media !== true) e.privacy_media = "Please tick this to continue.";
  return e;
}

/** Strongly-typed, normalised copy of the details — what actually gets stored. */
export function normaliseDetails(d: GuestDetails): GuestDetails {
  return {
    fullName: cleanText(d.fullName),
    dob: d.dob,
    phone: normalisePhone(d.phone),
    email: normaliseEmail(d.email),
    city: cleanText(d.city),
    emergencyName: cleanText(d.emergencyName),
    emergencyRelationship: cleanText(d.emergencyRelationship),
    emergencyPhone: normalisePhone(d.emergencyPhone),
    safetyNote: cleanNote(d.safetyNote),
  };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

/** Last four digits only — what the review/confirmation UI and admin list show instead of the whole number. */
export function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  return d.length > 4 ? `${phone.startsWith("+") ? "+" : ""}••••${d.slice(-4)}` : phone;
}

/* ------------------------------------------------------------------ */
/* ID document (Aadhaar) — mandatory                                   */
/* ------------------------------------------------------------------ */

export const ID_MAX_BYTES = 5 * 1024 * 1024;
export const ID_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const;

/** Browser-side check from the File's metadata. UX only — the server re-checks the real bytes. */
export function validateIdMeta(file: { type: string; size: number } | null | undefined): string | undefined {
  if (!file) return "Upload a photo or scan of your Aadhaar card.";
  if (file.size === 0) return "That file is empty.";
  if (file.size > ID_MAX_BYTES) return "That file is over 5 MB — try a smaller photo or a PDF.";
  if (!(ID_TYPES as readonly string[]).includes(file.type)) return "Upload a JPG, PNG or PDF.";
  return undefined;
}

/** What a file REALLY is, from its first bytes — never from its name or the browser-supplied MIME type. */
export function sniffIdType(bytes: Uint8Array): { mime: (typeof ID_TYPES)[number]; ext: "jpg" | "png" | "pdf" } | null {
  const b = bytes;
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { mime: "image/png", ext: "png" };
  if (b.length > 5 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d) return { mime: "application/pdf", ext: "pdf" };
  return null;
}
