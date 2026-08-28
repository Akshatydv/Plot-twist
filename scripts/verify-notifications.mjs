/**
 * Phase 4B — verifies the real notification path against the real database.
 *
 * Submits genuine applications through the public API, then asserts what the
 * database actually did: that a committed INSERT produced a queued webhook,
 * that a duplicate produced nothing, and that a broken email provider leaves
 * the application intact.
 *
 *   node scripts/verify-notifications.mjs [baseUrl]
 *
 * Requires a running server (default http://localhost:4321). Never prints a
 * key, a secret or an applicant answer.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv(file = ".env.local") {
  const out = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    out[t.slice(0, i)] = t.slice(i + 1);
  }
  return out;
}

const env = loadEnv();
const BASE = (process.argv[2] ?? "http://localhost:4321").replace(/\/+$/, "");
const NOTIFY_PATH = "/api/internal/notifications/application";

const admin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const pass = [];
const fail = [];
const check = (ok, label, detail = "") => (ok ? pass : fail).push(label + (detail ? ` — ${detail}` : ""));

const HANDLE = "@__notify_probe__";
const answer = (n) => `Probe answer ${n}. ${"Long enough to clear the forty character minimum.".padEnd(60, " ")}`;

const probe = {
  name: "Notify Probe",
  instagram: HANDLE,
  mobile: "+919000000000",
  age: 24,
  city: "Probeville",
  answer_1: answer(1),
  answer_2: answer(2),
  answer_3: answer(3),
  clue_progress: 5,
  destination_guess: "Bali",
  reward_id: "off-2500",
  source: "instagram",
  medium: "reel",
  campaign: "probe",
  content: "verify-notifications",
};

async function cleanup() {
  // notification_deliveries cascades on application delete.
  await admin.from("applications").delete().ilike("instagram", `${HANDLE}%`);
}

const post = (path, body, headers = {}) =>
  fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

const deliveriesFor = async (id) =>
  (await admin.from("notification_deliveries").select("*").eq("application_id", id)).data ?? [];

await cleanup();

/* ---------------- 0. config is wired up ---------------- */

const status = await admin.rpc("notification_config_status");
const cfg = Array.isArray(status.data) ? status.data[0] : status.data;
check(Boolean(cfg?.endpoint_url), "database webhook endpoint configured", cfg?.endpoint_url ?? "not set");
check(cfg?.secret_set === true, "shared secret stored in the database");

/* ---------------- 1. a real submission ---------------- */

const first = await post("/api/applications", probe);
const firstBody = await first.json().catch(() => ({}));
check(first.status === 201, "valid application accepted", `HTTP ${first.status}`);

const id = firstBody.id;
check(typeof id === "string" && id.length === 36, "API returned an application id");

/* ---------------- 2. it really persisted ---------------- */

const stored = id ? (await admin.from("applications").select("*").eq("id", id).maybeSingle()).data : null;
check(Boolean(stored), "application exists in Supabase");
check(stored?.instagram === HANDLE, "stored handle matches what was submitted");
check(stored?.clue_progress === 5, "hunt progress persisted for the email");
check(stored?.reward_id === "off-2500", "reward persisted for the email");

/* ---------------- 3. the DATABASE fired the notification ---------------- */

const rows = id ? await deliveriesFor(id) : [];
check(rows.length === 1, "AFTER INSERT trigger created exactly one delivery row", `got ${rows.length}`);
check(rows[0]?.event === "application_submitted", "event is application_submitted");
check(
  typeof rows[0]?.request_id === "number" && rows[0].request_id > 0,
  "pg_net queued an HTTP request from the database",
  rows[0]?.request_id == null ? "no request_id — the trigger did not reach net.http_post" : `request ${rows[0].request_id}`
);

/* ---------------- 4. duplicates notify nobody ---------------- */

const dupe = await post("/api/applications", probe);
const dupeBody = await dupe.json().catch(() => ({}));
check(dupe.status === 409, "duplicate application rejected", `HTTP ${dupe.status}`);
check(dupeBody.duplicate === true, "duplicate flagged in the response");

const afterDupe = id ? await deliveriesFor(id) : [];
check(afterDupe.length === 1, "duplicate produced NO extra notification", `${afterDupe.length} delivery rows`);

const allProbeRows = (await admin.from("applications").select("id").ilike("instagram", `${HANDLE}%`)).data ?? [];
check(allProbeRows.length === 1, "duplicate did not create a second application row", `${allProbeRows.length} rows`);

/* ---------------- 5. the endpoint cannot be abused ---------------- */

const noSecret = await post(NOTIFY_PATH, { event: "application_submitted", application_id: id });
check(noSecret.status === 401, "notification endpoint rejects a request with no secret", `HTTP ${noSecret.status}`);

const badSecret = await post(
  NOTIFY_PATH,
  { event: "application_submitted", application_id: id },
  { "x-plot-notification-secret": "not-the-secret" }
);
check(badSecret.status === 401, "notification endpoint rejects a wrong secret", `HTTP ${badSecret.status}`);

const getIt = await fetch(BASE + NOTIFY_PATH);
check(getIt.status === 405, "notification endpoint has no GET", `HTTP ${getIt.status}`);

const publicRead = await fetch(`${BASE}/api/applications`);
check(publicRead.status === 405, "public applications API is still write-only", `HTTP ${publicRead.status}`);

/* ---------------- 6. authorised delivery attempt ---------------- */

const secret = env.NOTIFICATIONS_WEBHOOK_SECRET;
const authed = await post(
  NOTIFY_PATH,
  { event: "application_submitted", application_id: id },
  { "x-plot-notification-secret": secret }
);
const authedBody = await authed.json().catch(() => ({}));
const emailResult = (authedBody.channels ?? []).find((c) => c.channel === "email");

check(authed.status === 200 || authed.status === 502, "authorised webhook was accepted and processed", `HTTP ${authed.status}`);
check(Boolean(emailResult), "email channel was invoked");

if (emailResult?.ok) {
  pass.push("EMAIL ACTUALLY DELIVERED via Resend");
} else if (emailResult?.skipped) {
  pass.push("email channel skipped cleanly (RESEND_API_KEY / ADMIN_NOTIFICATION_EMAIL unset) — not a failure");
} else {
  pass.push("email channel reported a provider failure and contained it (see server log)");
}

const ledger = id ? await deliveriesFor(id) : [];
check(
  ["SENT", "FAILED", "SKIPPED"].includes(ledger[0]?.status),
  "delivery outcome recorded server-side",
  `status ${ledger[0]?.status}`
);

/* ---------------- 7. an email failure cannot unwind the application ---------------- */

const stillThere = id ? (await admin.from("applications").select("id,status").eq("id", id).maybeSingle()).data : null;
check(Boolean(stillThere), "application STILL persisted after the notification path ran");
check(stillThere?.status === "PENDING", "application status untouched by notification");

/* ---------------- 8. non-notifiable events are ignored ---------------- */

const analytics = await post(
  NOTIFY_PATH,
  { event: "clue_discovered", application_id: id },
  { "x-plot-notification-secret": secret }
);
const analyticsBody = await analytics.json().catch(() => ({}));
check(analytics.status === 202 && analyticsBody.ignored === true, "analytics events do not produce an email", `HTTP ${analytics.status}`);

/* ---------------- cleanup + report ---------------- */

await cleanup();
const leftover = (await admin.from("applications").select("id").ilike("instagram", `${HANDLE}%`)).data ?? [];
check(leftover.length === 0, "probe rows cleaned up");

console.log("\n  PASS");
pass.forEach((p) => console.log("    ✅ " + p));
if (fail.length) {
  console.log("\n  FAIL");
  fail.forEach((f) => console.log("    ❌ " + f));
}
console.log(`\n  ${pass.length} passed, ${fail.length} failed\n`);
process.exit(fail.length ? 1 : 0);
