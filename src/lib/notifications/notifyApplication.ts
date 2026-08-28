import "server-only";

/**
 * THE DISPATCHER — the one function that turns a persisted application into
 * admin alerts.
 *
 * Two guarantees this file exists to make:
 *
 *   1. It never throws. Every channel failure becomes a logged ChannelResult.
 *      Nothing downstream of a successful INSERT may be able to fail the
 *      submission the visitor already saw succeed.
 *   2. It never runs before the row is committed. Its only caller is the
 *      internal webhook route, which is invoked by an AFTER INSERT trigger
 *      on the applications table and re-reads the row by id.
 *
 * Adding Telegram later is one entry in CHANNELS.
 */

import { emailChannel } from "./email";
import type { ApplicationNotification, ChannelResult } from "./types";
import type { StoredApplication } from "@/lib/applications";

/** Every channel is attempted; one failing never stops the others. */
const CHANNELS = [emailChannel];

/**
 * Absolute link to the casting file. The id is a path segment on an
 * admin-authenticated route, never a query parameter, and no applicant data
 * travels in the URL.
 */
export function caseUrlFor(applicationId: string) {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4321").replace(/\/+$/, "");
  return `${origin}/admin/applications/${applicationId}`;
}

export type NotifyOutcome = {
  applicationId: string;
  event: "application_submitted";
  results: ChannelResult[];
  /** True when at least one channel actually delivered. */
  delivered: boolean;
};

/**
 * Structured, PII-free delivery log.
 *
 * Deliberately no name, handle, city or answers: this line ends up in the
 * hosting platform's log drain, which is a much wider audience than the
 * admin inbox the email itself goes to.
 */
function logOutcome(outcome: NotifyOutcome) {
  for (const result of outcome.results) {
    console.info(
      "[plot:notify]",
      JSON.stringify({
        event: outcome.event,
        application_id: outcome.applicationId,
        channel: result.channel,
        status: result.skipped ? "SKIPPED" : result.ok ? "SENT" : "FAILED",
        reference: result.reference,
        error: result.error,
      })
    );
  }
}

/**
 * Fans one persisted application out across every configured channel.
 *
 * Resolves with an outcome in all cases — including when every channel is
 * unconfigured or broken. Callers do not need a try/catch.
 */
export async function notifyApplicationSubmitted(application: StoredApplication): Promise<NotifyOutcome> {
  const notification: ApplicationNotification = {
    event: "application_submitted",
    application,
    caseUrl: caseUrlFor(application.id),
  };

  const results = await Promise.all(
    CHANNELS.map(async (channel): Promise<ChannelResult> => {
      try {
        return await channel.send(notification);
      } catch (err) {
        // A channel that rejects instead of resolving is a bug in that channel,
        // not a reason for the dispatcher to fail.
        return {
          channel: channel.name,
          ok: false,
          error: err instanceof Error ? err.message : "channel threw",
        };
      }
    })
  );

  const outcome: NotifyOutcome = {
    applicationId: application.id,
    event: "application_submitted",
    results,
    delivered: results.some((r) => r.ok),
  };

  logOutcome(outcome);
  return outcome;
}
