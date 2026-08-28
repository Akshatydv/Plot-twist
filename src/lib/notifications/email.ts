import "server-only";

/**
 * EMAIL CHANNEL — Resend.
 *
 * Called over plain fetch rather than the `resend` SDK: one HTTP POST does
 * not justify a dependency, and it keeps the API key in a single file that
 * `server-only` guarantees never gets bundled for the browser.
 *
 * Swapping providers means rewriting this file and nothing else — the
 * dispatcher in notifyApplication.ts only knows about NotificationChannel.
 */

import { SUBJECT, renderApplicationEmailHtml, renderApplicationEmailText } from "./applicationEmail";
import type { ApplicationNotification, ChannelResult, NotificationChannel } from "./types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Slow provider must not hold a webhook request open indefinitely. */
const TIMEOUT_MS = 8_000;

/** Comma-separated, so a second casting-team address is a config change, not a code change. */
function recipients(): string[] {
  return (process.env.ADMIN_NOTIFICATION_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

/**
 * Resend requires a verified sending domain. Falls back to Resend's shared
 * onboarding sender so a fresh setup can be smoke-tested before DNS is done.
 */
function sender(): string {
  return process.env.NOTIFICATIONS_FROM_EMAIL?.trim() || "Plot Twist <onboarding@resend.dev>";
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY) && recipients().length > 0;
}

export const emailChannel: NotificationChannel = {
  name: "email",

  async send(notification: ApplicationNotification): Promise<ChannelResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = recipients();

    if (!apiKey || to.length === 0) {
      // Not an error: an unconfigured channel is a deployment state, not a fault.
      return { channel: "email", ok: false, skipped: true, error: "RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL is unset" };
    }

    const { application, caseUrl } = notification;

    const payload = {
      from: sender(),
      to,
      subject: SUBJECT,
      html: renderApplicationEmailHtml(application, caseUrl),
      text: renderApplicationEmailText(application, caseUrl),
      // Lets a human reply straight into the thread without exposing anything.
      headers: { "X-Entity-Ref-ID": application.id },
    };

    try {
      const response = await fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // Resend de-duplicates on this, so a webhook retry cannot send twice.
          "Idempotency-Key": `application_submitted:${application.id}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (!response.ok) {
        // Resend's error bodies describe the config problem (bad key, unverified
        // domain) and contain no applicant data, so they're safe to surface.
        const detail = await response.text().catch(() => "");
        return {
          channel: "email",
          ok: false,
          error: `resend responded ${response.status}${detail ? `: ${detail.slice(0, 300)}` : ""}`,
        };
      }

      const body = (await response.json().catch(() => ({}))) as { id?: string };
      return { channel: "email", ok: true, reference: body.id };
    } catch (err) {
      return {
        channel: "email",
        ok: false,
        error: err instanceof Error ? err.message : "unknown transport failure",
      };
    }
  },
};
