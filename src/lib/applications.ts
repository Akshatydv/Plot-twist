/**
 * APPLICATION SHAPE + VALIDATION
 *
 * One set of rules, imported by both the form and the route handler, so the
 * client and the server can never disagree about what's acceptable.
 *
 * Deliberately no email field: Instagram and mobile are the contact channels.
 */

import { rewardById } from "@/content/rewards";
import { DEFAULT_JOURNEY, JOURNEYS as JOURNEY_CONFIGS, journeyById } from "@/content/journeys";

/**
 * Which journey a submission belongs to when it doesn't say. Only reachable
 * from a hand-crafted request — the form always sends one — and defaulting
 * beats discarding an otherwise valid application.
 */
export const DEFAULT_JOURNEY_ID = DEFAULT_JOURNEY.id;

/**
 * The admin filter dropdown, derived from the journey registry so it can
 * never drift out of sync with the journeys that actually exist.
 */
export const JOURNEYS = JOURNEY_CONFIGS.map((j) => ({ id: j.id, label: j.displayName }));

/**
 * An absent journey is fine — it defaults. A journey that was *sent* but
 * isn't one we run is not: silently filing it under Journey 01 would put a
 * real applicant in the wrong casting list, which is exactly the confusion
 * the journey column exists to prevent. The route rejects those instead.
 */
export function isKnownJourney(value: unknown): boolean {
  return value === undefined || value === null || value === "" || journeyById(String(value)) !== null;
}

export const AGE_MIN = 18;
export const AGE_MAX = 30;

/** Long enough to rule out "idk lol", short enough not to be a chore. */
export const ANSWER_MIN = 40;
/** Not a UX limit — a backstop against someone pasting megabytes into a textarea. */
export const ANSWER_MAX = 1200;

const NAME_MAX = 80;
const CITY_MAX = 80;
const MOBILE_MAX = 20;

export type ApplicationStatus = "PENDING" | "SHORTLISTED" | "SELECTED" | "REJECTED";

export const APPLICATION_STATUSES: ApplicationStatus[] = ["PENDING", "SHORTLISTED", "SELECTED", "REJECTED"];

export type ApplicationInput = {
  name: string;
  instagram: string;
  mobile: string;
  age: string | number;
  city: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  /** Context from the hunt — how far they got before applying. */
  clue_progress?: number;
  destination_guess?: string | null;
  /** Which Plot Twist reward they were assigned on solving. Null if never solved. */
  reward_id?: string | null;
  /**
   * Which journey this application is for. Sent by the form from the journey
   * the page was rendered with — never inferred from a URL or a referrer,
   * both of which a visitor controls.
   */
  journey?: string | null;
  /**
   * Anonymous first-touch acquisition. Four short strings — no IP, no user
   * agent, no fingerprint. Answers "which Reel produced this applicant".
   */
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  content?: string | null;
  /**
   * Honeypot. Real visitors never see or fill this field — it's positioned
   * off-screen in the form. Anything non-empty here means a bot filled every
   * input it could find, so the route accepts the request but discards it.
   */
  _hp?: string;
};

export type StoredApplication = {
  id: string;
  name: string;
  instagram: string;
  mobile: string;
  age: number;
  city: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  journey: string;
  clue_progress: number;
  destination_guess: string | null;
  reward_id: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  submitted_at: string;
  status: ApplicationStatus;
  /** Admin-only. Never set from public input — see toStoredApplication. */
  notes?: string | null;
};

export type FieldErrors = Partial<Record<keyof ApplicationInput, string>>;

/**
 * "@Handle" / "instagram.com/handle" / "https://www.instagram.com/handle/" /
 * "handle" all normalise to "@handle". The protocol is optional because
 * people paste the bare domain far more often than the full URL.
 */
export function normaliseInstagram(raw: string) {
  const trimmed = raw
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "")
    .split("?")[0];
  const handle = trimmed.replace(/^@+/, "").replace(/\/+$/, "").trim();
  return handle ? `@${handle.toLowerCase()}` : "";
}

/** Keep a leading +, drop everything else that isn't a digit. */
export function normaliseMobile(raw: string) {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return digits ? `${plus ? "+" : ""}${digits}` : "";
}

const INSTAGRAM_RE = /^@[a-z0-9._]{1,30}$/;

/** Campaign labels only — trimmed, lowercased, capped. Never trusted raw. */
function attributionField(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase().slice(0, 64);
  return v.length ? v : null;
}

/**
 * Validates one step at a time so the form can gate "Next" without
 * red-flagging fields the visitor hasn't reached yet.
 */
export function validateBasics(input: Partial<ApplicationInput>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "We'll need something to call you.";
  } else if (input.name.trim().length > NAME_MAX) {
    errors.name = "That's a lot of name.";
  }

  const ig = normaliseInstagram(String(input.instagram ?? ""));
  if (!ig) errors.instagram = "Your handle — that's how we'll find you.";
  else if (!INSTAGRAM_RE.test(ig)) errors.instagram = "That doesn't look like a handle.";

  const mobile = normaliseMobile(String(input.mobile ?? ""));
  const digits = mobile.replace(/\D/g, "");
  if (!digits) errors.mobile = "We call, we don't email.";
  else if (digits.length < 7 || digits.length > 15 || mobile.length > MOBILE_MAX) errors.mobile = "That number looks off.";

  const age = Number(input.age);
  if (!input.age || Number.isNaN(age)) {
    errors.age = "How old are you?";
  } else if (!Number.isInteger(age) || age < AGE_MIN || age > AGE_MAX) {
    errors.age = `Plot Twist: this one's ${AGE_MIN}–${AGE_MAX} only.`;
  }

  if (!input.city || input.city.trim().length < 2) {
    errors.city = "Where are you flying from?";
  } else if (input.city.trim().length > CITY_MAX) {
    errors.city = "That's not a city, that's an essay.";
  }

  return errors;
}

const ANSWER_KEYS = ["answer_1", "answer_2", "answer_3"] as const;

export function validateAnswers(input: Partial<ApplicationInput>): FieldErrors {
  const errors: FieldErrors = {};
  for (const key of ANSWER_KEYS) {
    const value = String(input[key] ?? "").trim();
    if (!value) errors[key] = "This one's not optional.";
    else if (value.length < ANSWER_MIN) errors[key] = `A bit more than that — ${ANSWER_MIN - value.length} characters to go.`;
    else if (value.length > ANSWER_MAX) errors[key] = "Okay, that's a novel. Trim it down.";
  }
  return errors;
}

export function validateApplication(input: Partial<ApplicationInput>): FieldErrors {
  return { ...validateBasics(input), ...validateAnswers(input) };
}

/**
 * Normalised, trusted record — built server-side from raw input.
 *
 * The journey is resolved FIRST, because two other fields depend on it: the
 * stored `journey`, and the reward, which is validated against that
 * journey's own pool. That is what makes a Journey 00 reward impossible to
 * attach to a Journey 01 application — the pools are the authority, not the
 * client.
 */
export function toStoredApplication(input: ApplicationInput): StoredApplication {
  const journey = journeyById(input.journey) ?? DEFAULT_JOURNEY;

  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    instagram: normaliseInstagram(input.instagram),
    mobile: normaliseMobile(input.mobile),
    age: Number(input.age),
    city: input.city.trim(),
    answer_1: input.answer_1.trim(),
    answer_2: input.answer_2.trim(),
    answer_3: input.answer_3.trim(),
    journey: journey.id,
    clue_progress: Number(input.clue_progress ?? 0),
    destination_guess: input.destination_guess?.trim() || null,
    // Validated against THIS JOURNEY's pool, so a hand-crafted request can
    // neither invent a reward nor borrow one from another journey.
    reward_id: rewardById(input.reward_id, journey.rewards.pool)?.id ?? null,
    // Length-capped: these are campaign labels, not free text.
    source: attributionField(input.source),
    medium: attributionField(input.medium),
    campaign: attributionField(input.campaign),
    content: attributionField(input.content),
    submitted_at: new Date().toISOString(),
    status: "PENDING",
  };
}
