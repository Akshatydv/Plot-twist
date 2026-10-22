import "server-only";
import { recipients, sender } from "./email";
import { GUEST_TRIP } from "../guestRegistration";

/**
 * ADMIN ALERT: "a guest just registered".
 *
 * Deliberately thin. Email is not a secure channel, so the message carries
 * only what identifies the registration (name, city, reference) and a link to
 * the admin page, which sits behind the admin login. It never includes the
 * phone number, date of birth, emergency contact, allergy/accessibility note,
 * or the Aadhaar file.
 *
 * Fire-and-forget by design: the caller runs it after the response is sent and
 * ignores failure. A broken mail provider must never undo or delay a saved
 * registration.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 8_000;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendGuestRegistrationAlert(g: { reference: string; fullName: string; city: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!apiKey || to.length === 0) {
    console.warn("[plot] guest alert skipped: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL is unset");
    return;
  }

  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const link = site ? `${site}/admin/guests?q=${encodeURIComponent(g.reference)}` : "";
  // Header-injection guard: names are guest-typed, and subjects are headers.
  const name = g.fullName.replace(/[\r\n]+/g, " ").slice(0, 100);
  const subject = `New guest registered for ${GUEST_TRIP.shortName}: ${name}`;

  const text = [
    `${name} (${g.city}) just completed their guest registration for ${GUEST_TRIP.shortName}, ${GUEST_TRIP.dates}.`,
    `Reference: ${g.reference}`,
    link ? `View it (admin login required): ${link}` : "Open the admin Guests page to view it.",
    "",
    "Details and the ID document are deliberately not included in this email.",
  ].join("\n");

  const html = `<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;background:#fff1dc;color:#1a0d0a;border-radius:12px;overflow:hidden">
  <div style="background:#2b0f1c;color:#fff1dc;padding:18px 24px;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Plot Twist · Guest registration</div>
  <div style="padding:24px">
    <p style="margin:0 0 6px;font-size:20px;font-weight:700">${esc(name)}</p>
    <p style="margin:0 0 18px;color:#5a4a44">${esc(g.city)} · just registered for ${esc(GUEST_TRIP.shortName)}, ${esc(GUEST_TRIP.dates)}</p>
    <p style="margin:0 0 18px;font-family:monospace;font-size:16px">${esc(g.reference)}</p>
    ${link ? `<p style="margin:0 0 18px"><a href="${esc(link)}" style="display:inline-block;background:#1a0d0a;color:#fff1dc;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;letter-spacing:.12em;text-transform:uppercase">View registration</a></p>` : ""}
    <p style="margin:0;font-size:12px;color:#7a6a64">Admin login required. Details and the ID document are deliberately not included in this email.</p>
  </div>
</div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // A retry cannot send the same alert twice.
        "Idempotency-Key": `guest_registered:${g.reference}`,
      },
      body: JSON.stringify({ from: sender(), to, subject, html, text }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error("[plot] guest alert email failed, status:", res.status);
  } catch (err) {
    console.error("[plot] guest alert email failed:", err instanceof Error ? err.name : "unknown");
  }
}
