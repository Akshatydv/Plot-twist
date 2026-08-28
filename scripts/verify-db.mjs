/**
 * Phase 4A.5 — verifies the REAL remote database.
 *
 * Reads .env.local, talks to the linked Supabase project, and asserts the
 * schema, indexes and RLS actually match what the application expects.
 * Never prints a key.
 *
 *   node scripts/verify-db.mjs
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
const URL = env.SUPABASE_URL;
const SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;
const ANON = env.SUPABASE_ANON_KEY;

const admin = createClient(URL, SERVICE, { auth: { persistSession: false } });
const anon = createClient(URL, ANON, { auth: { persistSession: false } });

const pass = [];
const fail = [];
const check = (ok, label, detail = "") => (ok ? pass : fail).push(label + (detail ? ` — ${detail}` : ""));

/* ---------------- columns ---------------- */

const EXPECTED = {
  id: "uuid",
  name: "text",
  instagram: "text",
  mobile: "text",
  age: "smallint",
  city: "text",
  answer_1: "text",
  answer_2: "text",
  answer_3: "text",
  journey: "text",
  clue_progress: "smallint",
  destination_guess: "text",
  reward_id: "text",
  source: "text",
  medium: "text",
  campaign: "text",
  content: "text",
  notes: "text",
  status: "text",
  submitted_at: "timestamp with time zone",
};

// information_schema isn't exposed over PostgREST, so insert a probe row and
// read back its shape instead. Removed immediately afterwards.
const PROBE_IG = "@__schema_probe__";
await admin.from("applications").delete().eq("instagram", PROBE_IG);

const probe = {
  name: "Schema Probe",
  instagram: PROBE_IG,
  mobile: "+910000000000",
  age: 25,
  city: "Probe",
  answer_1: "x".repeat(45),
  answer_2: "x".repeat(45),
  answer_3: "x".repeat(45),
  journey: "JOURNEY 01",
  clue_progress: 0,
};

const ins = await admin.from("applications").insert(probe).select().single();
if (ins.error) {
  fail.push(`table insert failed — ${ins.error.message}`);
} else {
  const row = ins.data;
  const got = Object.keys(row).sort();
  const want = Object.keys(EXPECTED).sort();
  const missing = want.filter((c) => !got.includes(c));
  const extra = got.filter((c) => !want.includes(c));
  check(missing.length === 0, "all 20 expected columns exist", missing.length ? `missing: ${missing}` : "");
  check(extra.length === 0, "no unexpected columns", extra.length ? `extra: ${extra}` : "");
  check(row.status === "PENDING", "status defaults to PENDING", `got ${row.status}`);
  check(row.journey === "JOURNEY 01", "journey defaults correctly");
  check(typeof row.id === "string" && row.id.length === 36, "id is a generated uuid");
  check(Boolean(row.submitted_at), "submitted_at auto-populates");
}

/* ---------------- constraints ---------------- */

// age CHECK (18..30)
for (const [age, shouldPass] of [[17, false], [18, true], [30, true], [31, false]]) {
  const r = await admin
    .from("applications")
    .insert({ ...probe, instagram: `${PROBE_IG}${age}`, age })
    .select()
    .single();
  const ok = shouldPass ? !r.error : Boolean(r.error);
  check(ok, `age ${age} ${shouldPass ? "accepted" : "rejected by CHECK"}`, r.error ? r.error.code : "");
  if (!r.error) await admin.from("applications").delete().eq("id", r.data.id);
}

// status CHECK
const badStatus = await admin
  .from("applications")
  .insert({ ...probe, instagram: `${PROBE_IG}st`, status: "MAYBE" })
  .select()
  .single();
check(Boolean(badStatus.error), "invalid status rejected by CHECK", badStatus.error?.code ?? "");
if (!badStatus.error) await admin.from("applications").delete().eq("id", badStatus.data.id);

// unique (lower(instagram), journey) — different case must still collide
const dupe = await admin
  .from("applications")
  .insert({ ...probe, instagram: PROBE_IG.toUpperCase() })
  .select()
  .single();
check(
  dupe.error?.code === "23505",
  "unique (lower(instagram), journey) enforced across case",
  dupe.error ? `code ${dupe.error.code}` : "NO ERROR — duplicate was accepted!"
);
if (!dupe.error) await admin.from("applications").delete().eq("id", dupe.data.id);

// same handle, different journey must be allowed
const otherJourney = await admin
  .from("applications")
  .insert({ ...probe, journey: "JOURNEY 02" })
  .select()
  .single();
check(!otherJourney.error, "same handle allowed on a different journey", otherJourney.error?.message ?? "");
if (!otherJourney.error) await admin.from("applications").delete().eq("id", otherJourney.data.id);

/* ---------------- RLS ---------------- */

const anonRead = await anon.from("applications").select("*").limit(1);
check(
  Boolean(anonRead.error) || (anonRead.data ?? []).length === 0,
  "anon CANNOT read applications",
  anonRead.error ? `blocked (${anonRead.error.code})` : `returned ${anonRead.data?.length} rows`
);

const anonInsert = await anon.from("applications").insert({ ...probe, instagram: "@anon_probe" }).select();
check(Boolean(anonInsert.error), "anon CANNOT insert directly", anonInsert.error ? `blocked (${anonInsert.error.code})` : "INSERT SUCCEEDED!");
if (!anonInsert.error) await admin.from("applications").delete().eq("instagram", "@anon_probe");

const anonUpdate = await anon.from("applications").update({ status: "SELECTED" }).eq("instagram", PROBE_IG).select();
check(
  Boolean(anonUpdate.error) || (anonUpdate.data ?? []).length === 0,
  "anon CANNOT update applications",
  anonUpdate.error ? `blocked (${anonUpdate.error.code})` : "no rows affected"
);

const anonDelete = await anon.from("applications").delete().eq("instagram", PROBE_IG).select();
check(
  Boolean(anonDelete.error) || (anonDelete.data ?? []).length === 0,
  "anon CANNOT delete applications",
  anonDelete.error ? `blocked (${anonDelete.error.code})` : "no rows affected"
);

// service role must still work (it bypasses RLS by design)
const svcRead = await admin.from("applications").select("id").limit(1);
check(!svcRead.error, "service role CAN read", svcRead.error?.message ?? "");

/* ---------------- cleanup ---------------- */

await admin.from("applications").delete().like("instagram", "@__schema_probe__%");
const leftover = await admin.from("applications").select("id").like("instagram", "@__schema_probe__%");
check((leftover.data ?? []).length === 0, "probe rows cleaned up");

/* ---------------- report ---------------- */

console.log("\n  PASS");
pass.forEach((p) => console.log("    ✅ " + p));
if (fail.length) {
  console.log("\n  FAIL");
  fail.forEach((f) => console.log("    ❌ " + f));
}
console.log(`\n  ${pass.length} passed, ${fail.length} failed\n`);
process.exit(fail.length ? 1 : 0);
