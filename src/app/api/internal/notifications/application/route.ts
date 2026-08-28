import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getApplication } from "@/lib/adminApplications";
import { alreadyDelivered, recordOutcome } from "@/lib/notifications/deliveries";
import { notifyApplicationSubmitted } from "@/lib/notifications/notifyApplication";
import { isNotifiableEvent } from "@/lib/notifications/types";

/**
 * THE INTERNAL NOTIFICATION HOOK.
 *
 * Called by the `applications_notify_submitted` AFTER INSERT trigger on the
 * applications table (see supabase/migrations/…_application_notifications.sql),
 * never by a browser and never by the application form.
 *
 * The request body carries an application id and nothing else — the record
 * is re-read here with the service-role key, so no applicant data ever
 * travels over the webhook or appears in a URL.
 *
 * There is deliberately no GET. The only way in is a POST carrying the
 * shared secret, which means this cannot be used to enumerate applications
 * or to spam the casting team's inbox.
 */

export const dynamic = "force-dynamic";
/** Node, not Edge: timingSafeEqual and the service-role client both need it. */
export const runtime = "nodejs";

const SECRET_HEADER = "x-plot-notification-secret";

/** Constant-time compare so the secret can't be recovered by timing the endpoint. */
function secretMatches(provided: string | null) {
  const expected = process.env.NOTIFICATIONS_WEBHOOK_SECRET;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // Compare a fixed-length digest-ish pair: differing lengths would throw.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!secretMatches(request.headers.get(SECRET_HEADER))) {
    // No hint about which part was wrong, and no body worth probing for.
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { event?: unknown; application_id?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed payload." }, { status: 400 });
  }

  // application_submitted is the only alertable event. Analytics events that
  // somehow reach here are acknowledged and dropped, not emailed.
  if (!isNotifiableEvent(body.event)) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 202 });
  }

  const id = typeof body.application_id === "string" ? body.application_id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing application_id." }, { status: 400 });
  }

  // Guards against a pg_net retry producing a second casting email.
  if (await alreadyDelivered(id, body.event)) {
    return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
  }

  const application = await getApplication(id).catch(() => null);
  if (!application) {
    // The row was deleted between trigger and delivery, or the id is bogus.
    // Either way there is nothing to notify about.
    return NextResponse.json({ ok: false, error: "Unknown application." }, { status: 404 });
  }

  const outcome = await notifyApplicationSubmitted(application);
  await recordOutcome(outcome);

  // A non-2xx here tells pg_net's response log that delivery failed — useful
  // operationally, and completely detached from the visitor's submission,
  // which was committed before this endpoint was ever called.
  return NextResponse.json(
    { ok: outcome.delivered, channels: outcome.results.map((r) => ({ channel: r.channel, ok: r.ok, skipped: r.skipped })) },
    { status: outcome.delivered ? 200 : 502 }
  );
}
