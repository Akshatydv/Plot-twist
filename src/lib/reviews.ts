/**
 * REVIEWS — shape, limits and validation. Imported by the form AND the route
 * handler so the browser and the server cannot disagree. No Node APIs here.
 *
 * ─── THE RULE THIS WHOLE FEATURE FOLLOWS ────────────────────────────────────
 * Nothing is invented. The wall, the landing section and the average rating are
 * built only from reviews a human on the team has approved. With none, the
 * landing section renders nothing at all (see components/home/ReviewsSection).
 */

/** Trips a review can be about. Add a line when the next trip has actually run. */
export const REVIEW_TRIPS = [{ id: "goa-2026", label: "Goa", when: "October 2026" }] as const;
export type ReviewTripId = (typeof REVIEW_TRIPS)[number]["id"];

export const tripLabel = (id: string) => REVIEW_TRIPS.find((t) => t.id === id)?.label ?? "Plot Twist";

export const REVIEW_LIMITS = {
  name: 60,
  city: 60,
  bodyMin: 20,
  bodyMax: 1200,
  photos: 4,
  /** Raw upload size per photo. The server re-encodes to ≤ 1600px WebP, so the stored file is far smaller. */
  photoBytes: 8 * 1024 * 1024,
} as const;

export const PHOTO_ACCEPT = ["image/jpeg", "image/png", "image/webp"] as const;

export type ReviewInput = {
  name: string;
  city: string;
  tripId: string;
  rating: number;
  body: string;
  /** Optional guest-registration reference — earns a "verified guest" badge if it matches. */
  reference: string;
  /** "You may publish this on the Plot Twist website and social channels." */
  consent: boolean;
};

export type ReviewErrors = Partial<Record<keyof ReviewInput | "photos", string>>;

export const EMPTY_REVIEW: ReviewInput = { name: "", city: "", tripId: REVIEW_TRIPS[0].id, rating: 0, body: "", reference: "", consent: false };

const clean = (s: unknown) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "");

export function cleanBody(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function validateReview(input: Partial<ReviewInput>): ReviewErrors {
  const e: ReviewErrors = {};
  const name = clean(input.name);
  if (name.length < 2) e.name = "Add your name — first name is fine.";
  else if (!/\p{L}/u.test(name)) e.name = "That doesn’t look like a name.";
  else if (name.length > REVIEW_LIMITS.name) e.name = "That’s a bit long.";

  if (clean(input.city).length > REVIEW_LIMITS.city) e.city = "That’s a bit long.";

  if (!REVIEW_TRIPS.some((t) => t.id === input.tripId)) e.tripId = "Pick the trip you went on.";

  const r = input.rating;
  if (typeof r !== "number" || !Number.isInteger(r) || r < 1 || r > 5) e.rating = "Tap a star to rate your trip.";

  const body = cleanBody(input.body);
  if (body.length < REVIEW_LIMITS.bodyMin) e.body = `Tell us a little more — at least ${REVIEW_LIMITS.bodyMin} characters.`;
  else if (body.length > REVIEW_LIMITS.bodyMax) e.body = `Keep it under ${REVIEW_LIMITS.bodyMax} characters.`;

  if (input.consent !== true) e.consent = "Please tick this so we’re allowed to share your review.";
  return e;
}

export function validatePhotoMeta(file: { type: string; size: number }): string | undefined {
  if (file.size === 0) return "That file is empty.";
  if (file.size > REVIEW_LIMITS.photoBytes) return "That photo is over 8 MB.";
  if (!(PHOTO_ACCEPT as readonly string[]).includes(file.type)) return "Use a JPG, PNG or WebP photo.";
  return undefined;
}

/** What the public site is allowed to know about a review. Nothing else leaves the server. */
export type PublicReview = {
  id: string;
  tripId: string;
  name: string;
  city: string | null;
  rating: number;
  body: string;
  /** Full public image URLs. */
  photos: string[];
  verified: boolean;
  featured: boolean;
  createdAt: string;
};

export type ReviewStats = { count: number; average: number | null };

export function statsOf(reviews: Pick<PublicReview, "rating">[]): ReviewStats {
  if (!reviews.length) return { count: 0, average: null };
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return { count: reviews.length, average: Math.round((sum / reviews.length) * 10) / 10 };
}
