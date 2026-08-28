/**
 * Phase 4B — points the database trigger at this deployment.
 *
 * Writes NOTIFICATIONS_WEBHOOK_URL + NOTIFICATIONS_WEBHOOK_SECRET from
 * .env.local into private.notification_config on the linked Supabase
 * project, via the service-role-only setter. Run it once per environment,
 * and again whenever the origin or the secret changes.
 *
 *   node scripts/setup-notifications.mjs
 *
 * Never prints the secret.
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
const missing = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NOTIFICATIONS_WEBHOOK_SECRET"].filter((k) => !env[k]);
if (missing.length) {
  console.error(`\n  ❌ .env.local is missing: ${missing.join(", ")}\n`);
  process.exit(1);
}

const url =
  env.NOTIFICATIONS_WEBHOOK_URL ||
  `${(env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "")}/api/internal/notifications/application`;

if (!url.startsWith("http")) {
  console.error("\n  ❌ Set NOTIFICATIONS_WEBHOOK_URL (or NEXT_PUBLIC_SITE_URL) to an absolute origin.\n");
  process.exit(1);
}

const admin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { error } = await admin.rpc("set_notification_config", {
  p_endpoint_url: url,
  p_shared_secret: env.NOTIFICATIONS_WEBHOOK_SECRET,
});

if (error) {
  console.error(`\n  ❌ Could not write notification config — ${error.message}\n`);
  process.exit(1);
}

const { data } = await admin.rpc("notification_config_status");
const row = Array.isArray(data) ? data[0] : data;

console.log("\n  ✅ Database webhook configured");
console.log(`     endpoint    ${row?.endpoint_url}`);
console.log(`     secret set  ${row?.secret_set}`);
if (url.includes("localhost") || url.includes("127.0.0.1")) {
  console.log("\n  ⚠️  Supabase cannot reach localhost. The trigger will fire and be");
  console.log("     recorded, but the HTTP call will not arrive until this points at a");
  console.log("     public origin (a deployment, or a tunnel).\n");
} else {
  console.log("");
}
