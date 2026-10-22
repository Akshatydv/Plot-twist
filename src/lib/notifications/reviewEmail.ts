import "server-only";
import { recipients, sender } from "./email";

/**
 * Admin alert: "a review is waiting for approval". Fire-and-forget, run after
 * the response (see app/api/reviews/route.ts); a mail failure never affects the
 * submitter. The excerpt is untrusted public input, so it is HTML-escaped and
 * kept out of the subject.
 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendReviewAlert(r: { name: string; rating: number; excerpt: string; photos: number }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!apiKey || to.length === 0) return;

  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const link = site ? `${site}/admin/reviews` : "";
  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  const photos = r.photos ? ` · ${r.photos} photo${r.photos > 1 ? "s" : ""}` : "";

  const text = [`New review waiting for approval (${r.rating}/5${photos}).`, "", r.excerpt, "", link ? `Review it: ${link}` : "Open Admin → Reviews."].join("\n");
  const html = `<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;background:#fff1dc;color:#1a0d0a;border-radius:12px;overflow:hidden">
  <div style="background:#2b0f1c;color:#fff1dc;padding:18px 24px;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Plot Twist · New review to approve</div>
  <div style="padding:24px">
    <p style="margin:0 0 4px;font-size:20px;font-weight:700">${esc(r.name)}</p>
    <p style="margin:0 0 16px;color:#d63a6e;font-size:18px;letter-spacing:2px">${stars}<span style="color:#7a6a64;font-size:13px;letter-spacing:0">${esc(photos)}</span></p>
    <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:17px;line-height:1.5;font-style:italic">“${esc(r.excerpt)}${r.excerpt.length >= 240 ? "…" : ""}”</p>
    ${link ? `<p style="margin:0"><a href="${esc(link)}" style="display:inline-block;background:#1a0d0a;color:#fff1dc;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;letter-spacing:.12em;text-transform:uppercase">Review &amp; approve</a></p>` : ""}
  </div>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: sender(), to, subject: "New Plot Twist review to approve", html, text }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) console.error("[plot] review alert email failed, status:", res.status);
  } catch {
    console.error("[plot] review alert email failed");
  }
}
