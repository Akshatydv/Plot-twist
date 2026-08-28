import "server-only";

/**
 * THE DELIVERY LEDGER — one row per (application, event), written by the
 * database trigger and closed out here.
 *
 * It exists for three reasons:
 *   - proof the notification actually fired, without grepping logs;
 *   - idempotency, so a retried webhook can't send a second email;
 *   - an operational answer to "did the casting team get told about this one?".
 *
 * It holds no PII: an application id, an event name, a channel, a status and
 * a provider reference. Everything identifying stays in the applications
 * table, behind RLS.
 */

import { serviceRoleClient } from "@/lib/supabase/serviceRole";
import type { NotifyOutcome } from "./notifyApplication";

const TABLE = "notification_deliveries";

export type DeliveryStatus = "REQUESTED" | "SENT" | "FAILED" | "SKIPPED";

/**
 * True when this application/event pair has already been delivered.
 *
 * Never blocks on a ledger problem: if the table is missing or unreadable,
 * we would rather risk a duplicate admin email than drop a real one.
 */
export async function alreadyDelivered(applicationId: string, event: string) {
  try {
    const { data, error } = await serviceRoleClient()
      .from(TABLE)
      .select("status")
      .eq("application_id", applicationId)
      .eq("event", event)
      .maybeSingle();

    if (error) return false;
    return data?.status === "SENT";
  } catch {
    return false;
  }
}

/** Best-effort. A ledger write must never turn a delivered email into a failure. */
export async function recordOutcome(outcome: NotifyOutcome) {
  const email = outcome.results.find((r) => r.channel === "email") ?? outcome.results[0];
  if (!email) return;

  const status: DeliveryStatus = email.skipped ? "SKIPPED" : email.ok ? "SENT" : "FAILED";

  try {
    await serviceRoleClient()
      .from(TABLE)
      .upsert(
        {
          application_id: outcome.applicationId,
          event: outcome.event,
          channel: email.channel,
          status,
          reference: email.reference ?? null,
          // Provider/config messages only — never applicant data. Capped so a
          // verbose provider can't bloat the row.
          detail: email.error?.slice(0, 500) ?? null,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "application_id,event" }
      );
  } catch (err) {
    console.warn("[plot:notify] could not record delivery outcome:", err instanceof Error ? err.message : err);
  }
}
