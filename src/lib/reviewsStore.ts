import "server-only";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { isSupabaseConfigured, serviceRoleClient } from "./supabase/serviceRole";
import { REVIEW_LIMITS, type PublicReview, type ReviewInput } from "./reviews";
import { demoReviews } from "./reviewsDemo";

/**
 * REVIEWS STORAGE — the only file that reads or writes the reviews table.
 *
 * Public reads select DISPLAY COLUMNS of APPROVED rows only. Submission always
 * lands as PENDING. Admin moderation lives at the bottom and assumes the
 * caller has already passed requireAdmin().
 */

const TABLE = "reviews";
export const PHOTO_BUCKET = "review-photos";

function publicPhotoUrl(path: string) {
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${PHOTO_BUCKET}/${path}`;
}

type Row = {
  id: string;
  trip_id: string;
  author_name: string;
  city: string | null;
  rating: number;
  body: string;
  photos: string[];
  verified: boolean;
  featured: boolean;
  created_at: string;
  reply: string | null;
};

const toPublic = (r: Row): PublicReview => ({
  id: r.id,
  tripId: r.trip_id,
  name: r.author_name,
  city: r.city,
  rating: r.rating,
  body: r.body,
  photos: (r.photos ?? []).map(publicPhotoUrl),
  verified: r.verified,
  featured: r.featured,
  createdAt: r.created_at,
  reply: r.reply ?? null,
});

/**
 * Approved reviews, featured first then newest. Never throws: a database
 * hiccup must not take the homepage down, it just hides the section.
 *
 * DEV ONLY: with REVIEWS_DEMO=1 in a development run, clearly-labelled sample
 * reviews are returned instead, so the design can be reviewed before real ones
 * exist. The NODE_ENV check means this can never reach production.
 */
export async function listApprovedReviews(limit = 60): Promise<PublicReview[]> {
  if (process.env.NODE_ENV === "development" && process.env.REVIEWS_DEMO === "1") return demoReviews().slice(0, limit);
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await serviceRoleClient()
      .from(TABLE)
      .select("id,trip_id,author_name,city,rating,body,photos,verified,featured,created_at,reply")
      .eq("status", "APPROVED")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return ((data ?? []) as Row[]).map(toPublic);
  } catch {
    console.error("[plot] could not load reviews");
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* submission                                                          */
/* ------------------------------------------------------------------ */

/**
 * Re-encode an upload to WebP, ≤ 1600px, EXIF rotation applied.
 *
 * This is the privacy step: phone photos carry GPS coordinates, device model
 * and timestamps in their metadata, and sharp writes none of it back. It also
 * makes the file's real type come from decoding it (a renamed .exe fails here),
 * not from its name or declared MIME type. Returns null if it isn't a decodable
 * jpeg/png/webp image.
 */
export async function normalisePhoto(bytes: Buffer): Promise<Buffer | null> {
  try {
    const img = sharp(bytes, { failOn: "error", limitInputPixels: 50_000_000 });
    const meta = await img.metadata();
    if (!meta.format || !["jpeg", "png", "webp"].includes(meta.format)) return null;
    return await img
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return null;
  }
}

/** Does this guest-registration reference belong to a real registration for the trip? */
async function isVerifiedGuest(reference: string, tripId: string): Promise<boolean> {
  const ref = reference.trim().toUpperCase();
  if (!/^PT-[A-Z]+-[A-Z0-9]{8}$/.test(ref) || !isSupabaseConfigured) return false;
  const { data } = await serviceRoleClient().from("guest_registrations").select("id").eq("reference", ref).eq("trip_id", tripId).maybeSingle();
  return Boolean(data);
}

export class ReviewStorageError extends Error {}
/** This guest has already left a review through their personal link. */
export class AlreadyReviewedError extends Error {}

/** Saves a review as PENDING with its (already normalised) photos. Returns the new id. */
export async function saveReview(
  input: ReviewInput & { body: string; name: string; city: string },
  photos: Buffer[],
  /** Set when the review came through the guest's personal link: auto-verified, one per guest. */
  registrationId: string | null = null
): Promise<string> {
  if (!isSupabaseConfigured) {
    if (process.env.NODE_ENV === "development") {
      // Dev without Supabase: accept and discard, so the form is testable. Nothing is shown anywhere.
      console.warn("[plot] Supabase is not configured — review accepted but NOT stored (dev only).");
      return randomUUID();
    }
    throw new ReviewStorageError("not configured");
  }

  const db = serviceRoleClient();
  const verified = registrationId ? true : input.reference ? await isVerifiedGuest(input.reference, input.tripId) : false;

  const paths: string[] = [];
  for (const buf of photos.slice(0, REVIEW_LIMITS.photos)) {
    const path = `${input.tripId}/${randomUUID()}.webp`;
    const up = await db.storage.from(PHOTO_BUCKET).upload(path, buf, { contentType: "image/webp", upsert: false });
    if (up.error) {
      await db.storage.from(PHOTO_BUCKET).remove(paths).catch(() => undefined);
      throw new ReviewStorageError("photo upload failed");
    }
    paths.push(path);
  }

  const { data, error } = await db
    .from(TABLE)
    .insert({
      trip_id: input.tripId,
      author_name: input.name,
      city: input.city || null,
      rating: input.rating,
      body: input.body,
      photos: paths,
      verified,
      registration_id: registrationId,
      publish_consent: true,
    })
    .select("id")
    .single();

  if (error || !data) {
    if (paths.length) await db.storage.from(PHOTO_BUCKET).remove(paths).catch(() => undefined);
    // The one-review-per-guest index: a second submit through the same personal link.
    if (error?.code === "23505" && registrationId) throw new AlreadyReviewedError();
    console.error("[plot] review insert failed, pg code:", error?.code ?? "unknown");
    throw new ReviewStorageError("insert failed");
  }
  return data.id as string;
}

/* ------------------------------------------------------------------ */
/* admin moderation — caller must have passed requireAdmin()           */
/* ------------------------------------------------------------------ */

export type AdminReview = PublicReview & { status: "PENDING" | "APPROVED" | "REJECTED" };

export async function listReviewsForAdmin(status?: string): Promise<AdminReview[]> {
  let q = serviceRoleClient()
    .from(TABLE)
    .select("id,trip_id,author_name,city,rating,body,photos,verified,featured,created_at,reply,status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw error;
  return ((data ?? []) as (Row & { status: AdminReview["status"] })[]).map((r) => ({ ...toPublic(r), status: r.status }));
}

export async function setReviewStatus(id: string, status: "PENDING" | "APPROVED" | "REJECTED") {
  const { error } = await serviceRoleClient()
    .from(TABLE)
    .update({ status, approved_at: status === "APPROVED" ? new Date().toISOString() : null, ...(status !== "APPROVED" ? { featured: false } : {}) })
    .eq("id", id);
  if (error) throw error;
}

export async function setReviewFeatured(id: string, featured: boolean) {
  // Only an approved review can be featured.
  const { error } = await serviceRoleClient().from(TABLE).update({ featured }).eq("id", id).eq("status", "APPROVED");
  if (error) throw error;
}

/** Set or clear the team's public reply. */
export async function setReviewReply(id: string, reply: string) {
  const text = reply.replace(/\r\n?/g, "\n").trim().slice(0, 600);
  const { error } = await serviceRoleClient()
    .from(TABLE)
    .update({ reply: text || null, replied_at: text ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
}

/** Which registrations have already left a review — for the admin guest list. */
export async function reviewedRegistrationIds(): Promise<Set<string>> {
  const { data, error } = await serviceRoleClient().from(TABLE).select("registration_id").not("registration_id", "is", null);
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.registration_id as string));
}

export async function deleteReview(id: string) {
  const db = serviceRoleClient();
  const { data } = await db.from(TABLE).select("photos").eq("id", id).maybeSingle();
  const photos = (data?.photos as string[] | undefined) ?? [];
  if (photos.length) await db.storage.from(PHOTO_BUCKET).remove(photos);
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
