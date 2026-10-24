import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { isSupabaseConfigured, serviceRoleClient } from "./supabase/serviceRole";
import { isUuid } from "./guestRegistration";

/**
 * PERSONAL REVIEW LINKS — /review/<token>, one per registered guest.
 *
 * The token is the guest's registration id plus an HMAC signature, so:
 *   - it can't be guessed or forged without REVIEW_LINK_SECRET,
 *   - it needs no extra table (the registration IS the invite),
 *   - it carries no personal data — the name is looked up server-side.
 *
 * A review submitted through it is automatically "verified" and tied to the
 * registration; the database allows one review per registration.
 */

const b64url = (b: Buffer) => b.toString("base64url");

function sign(registrationId: string, secret: string) {
  return createHmac("sha256", secret).update(`review-invite:v1:${registrationId}`).digest().subarray(0, 16);
}

export const reviewLinksEnabled = () => Boolean(process.env.REVIEW_LINK_SECRET);

export function inviteToken(registrationId: string): string | null {
  const secret = process.env.REVIEW_LINK_SECRET;
  if (!secret || !isUuid(registrationId)) return null;
  return `${b64url(Buffer.from(registrationId.replace(/-/g, ""), "hex"))}.${b64url(sign(registrationId, secret))}`;
}

export function inviteUrl(registrationId: string): string | null {
  const t = inviteToken(registrationId);
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  return t ? `${site}/review/${t}` : null;
}

/** Registration id if the token is genuine, else null. Constant-time comparison. */
export function verifyInvite(token: string): string | null {
  const secret = process.env.REVIEW_LINK_SECRET;
  if (!secret || typeof token !== "string" || token.length > 80) return null;
  const [idPart, sigPart] = token.split(".");
  if (!idPart || !sigPart) return null;
  let hex: string;
  try {
    hex = Buffer.from(idPart, "base64url").toString("hex");
  } catch {
    return null;
  }
  if (hex.length !== 32) return null;
  const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  if (!isUuid(id)) return null;
  const given = Buffer.from(sigPart, "base64url");
  const expected = sign(id, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  return id;
}

export type Invitee = {
  registrationId: string;
  tripId: string;
  /** "Aanya R." — what we pre-fill; the guest can change it. */
  displayName: string;
  firstName: string;
  alreadyReviewed: boolean;
};

/** Resolve a token to the guest it was issued for. Null for a bad token or a deleted registration. */
export async function lookupInvite(token: string): Promise<Invitee | null> {
  const id = verifyInvite(token);
  if (!id || !isSupabaseConfigured) return null;
  const db = serviceRoleClient();
  const { data } = await db.from("guest_registrations").select("id,trip_id,full_name").eq("id", id).maybeSingle();
  if (!data) return null;
  const { count } = await db.from("reviews").select("id", { count: "exact", head: true }).eq("registration_id", id);
  const parts = String(data.full_name).trim().split(/\s+/);
  const firstName = parts[0];
  const displayName = parts.length > 1 ? `${firstName} ${parts[parts.length - 1][0].toUpperCase()}.` : firstName;
  return { registrationId: id, tripId: data.trip_id, displayName, firstName, alreadyReviewed: (count ?? 0) > 0 };
}
