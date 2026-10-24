import { NextResponse, after } from "next/server";
import {
  REVIEW_LIMITS,
  cleanBody,
  validatePhotoMeta,
  validateReview,
  type ReviewInput,
} from "@/lib/reviews";
import { AlreadyReviewedError, ReviewStorageError, normalisePhoto, saveReview } from "@/lib/reviewsStore";
import { lookupInvite } from "@/lib/reviewInvite";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { sendReviewAlert } from "@/lib/notifications/reviewEmail";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = REVIEW_LIMITS.photos * REVIEW_LIMITS.photoBytes + 128 * 1024;
/** 4 reviews per 30 minutes per IP — a real traveller posts one. */
const LIMIT = 4;
const WINDOW_MS = 30 * 60 * 1000;

const json = (body: Record<string, unknown>, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Public, write-only. A review is saved as PENDING and is invisible until an
 * admin approves it. Photos are decoded and re-encoded server-side (EXIF/GPS
 * stripped), never stored as uploaded.
 *
 * Request: multipart/form-data — `payload` (JSON) + up to 4 `photos`.
 */
export async function POST(request: Request) {
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("multipart/form-data")) {
    return json({ ok: false, error: "Unsupported request." }, 415);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    let same = false;
    try {
      same = new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
    } catch {
      /* malformed */
    }
    if (!same) return json({ ok: false, error: "Unsupported request." }, 403);
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Those photos are too large in total." }, 413);
  }
  if (rateLimit(`review:${clientIp(request)}`, LIMIT, WINDOW_MS).limited) {
    return json({ ok: false, error: "That’s a lot of reviews — please wait a bit and try again." }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  const raw = form.get("payload");
  if (typeof raw !== "string" || raw.length > 10_000) return json({ ok: false, error: "Malformed request." }, 400);
  let body: Partial<ReviewInput> & { website?: unknown; token?: unknown };
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot: look successful, save nothing.
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true }, 201);

  // Personal review link: the server, not the browser, decides who this is and which trip it was.
  let registrationId: string | null = null;
  if (body.token !== undefined && body.token !== "") {
    const invitee = typeof body.token === "string" ? await lookupInvite(body.token) : null;
    if (!invitee) return json({ ok: false, error: "This review link isn’t valid any more. Ask us for a fresh one." }, 400);
    if (invitee.alreadyReviewed) return json({ ok: false, already: true, error: "You’ve already shared your review — thank you!" }, 409);
    registrationId = invitee.registrationId;
    body.tripId = invitee.tripId;
    body.reference = "";
  }

  const errors = validateReview(body);
  const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > REVIEW_LIMITS.photos) errors.photos = `Up to ${REVIEW_LIMITS.photos} photos, please.`;
  for (const f of files) {
    const msg = validatePhotoMeta(f);
    if (msg) errors.photos = msg;
  }
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  // Decode + re-encode every photo; anything that isn't a real image is refused.
  const photos: Buffer[] = [];
  for (const f of files) {
    const out = await normalisePhoto(Buffer.from(await f.arrayBuffer()));
    if (!out) return json({ ok: false, errors: { photos: "One of those files isn’t a photo we can read. Try a JPG, PNG or WebP." } }, 422);
    photos.push(out);
  }

  const name = String(body.name).replace(/\s+/g, " ").trim();
  const city = String(body.city ?? "").replace(/\s+/g, " ").trim();
  const text = cleanBody(body.body);

  try {
    await saveReview(
      { name, city, tripId: String(body.tripId), rating: Number(body.rating), body: text, reference: String(body.reference ?? ""), consent: true },
      photos,
      registrationId
    );
    after(() => sendReviewAlert({ name, rating: Number(body.rating), excerpt: text.slice(0, 240), photos: photos.length }));
    return json({ ok: true }, 201);
  } catch (err) {
    if (err instanceof AlreadyReviewedError) {
      return json({ ok: false, already: true, error: "You’ve already shared your review — thank you!" }, 409);
    }
    if (err instanceof ReviewStorageError) {
      return json({ ok: false, error: "We couldn’t save your review just now. Your words are still here — please try again." }, 503);
    }
    console.error("[plot] review submission failed");
    return json({ ok: false, error: "Something went wrong and nothing was saved. Please try again." }, 500);
  }
}
