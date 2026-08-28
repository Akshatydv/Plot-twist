import "server-only";

/**
 * NOTIFICATION CONTRACT
 *
 * One event type today (`application_submitted`) and one channel (email).
 * Both are named rather than assumed so adding Telegram, a WhatsApp admin
 * alert or a daily digest later means adding a file in this folder — not
 * touching the application submission path, which must never depend on any
 * of this succeeding.
 */

import type { StoredApplication } from "@/lib/applications";

/** The only event that currently produces an admin alert. Analytics events are not here on purpose. */
export const NOTIFIABLE_EVENTS = ["application_submitted"] as const;
export type NotifiableEvent = (typeof NOTIFIABLE_EVENTS)[number];

export function isNotifiableEvent(value: unknown): value is NotifiableEvent {
  return typeof value === "string" && (NOTIFIABLE_EVENTS as readonly string[]).includes(value);
}

/** What a channel is handed. The full record — this is an admin-only surface. */
export type ApplicationNotification = {
  event: "application_submitted";
  application: StoredApplication;
  /** Absolute link to /admin/applications/[id]. Built once, shared by every channel. */
  caseUrl: string;
};

export type ChannelResult = {
  channel: string;
  ok: boolean;
  /** Provider-side id, when the provider gives one. Useful for chasing a missing email. */
  reference?: string;
  /** Safe to log: never contains applicant data or credentials. */
  error?: string;
  /** The channel had nothing configured, so it did not attempt a send. */
  skipped?: boolean;
};

/**
 * A delivery channel. `send` must resolve — never reject. A broken provider
 * is a failed ChannelResult, not an exception that could bubble anywhere
 * near the application funnel.
 */
export type NotificationChannel = {
  name: string;
  send(notification: ApplicationNotification): Promise<ChannelResult>;
};
