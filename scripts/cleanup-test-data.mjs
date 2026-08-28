/** Removes ONLY the records and users created by the Phase 4A.5 verification. */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = Object.fromEntries(
  readFileSync(".env.local","utf8").split("\n").filter(l=>l.trim()&&!l.startsWith("#"))
    .map(l=>[l.slice(0,l.indexOf("=")), l.slice(l.indexOf("=")+1)])
);
const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth:{persistSession:false} });

// Explicit allow-list of handles this phase created. Nothing else is touched.
const TEST_HANDLES = ["@plotwist_test", "@plotwist_race", "@failure_path_test"];
const TEST_EMAILS  = ["plottwist.admin.test@example.com", "plottwist.outsider.test@example.com"];

console.log("\n  BEFORE — everything currently in the table:");
const { data: before } = await db.from("applications").select("instagram,name,status").order("submitted_at");
(before ?? []).forEach(r => console.log(`    · ${r.instagram.padEnd(24)} ${r.name.padEnd(20)} ${r.status}`));

// Confirm each target really is one of ours before deleting.
for (const h of TEST_HANDLES) {
  const { data: row } = await db.from("applications").select("id,name,answer_1").eq("instagram", h).maybeSingle();
  if (!row) { console.log(`\n    (no record for ${h} — nothing to delete)`); continue; }
  const isOurs = /^(TEST RECORD|x{10,})/.test(row.answer_1 ?? "") || /^(Plot Twist Test|Race Test|Failure Path Test)/.test(row.name);
  if (!isOurs) { console.log(`\n    ⚠️  ${h} does NOT look like a test record — SKIPPED`); continue; }
  const { error } = await db.from("applications").delete().eq("id", row.id);
  console.log(`\n    ${error ? "❌" : "🗑️"}  deleted ${h} (${row.name})`);
}

// Disposable auth users.
const { data: users } = await db.auth.admin.listUsers();
for (const u of users.users) {
  if (!TEST_EMAILS.includes(u.email)) { console.log(`    ⚠️  keeping non-test user ${u.email}`); continue; }
  const { error } = await db.auth.admin.deleteUser(u.id);
  console.log(`    ${error ? "❌" : "🗑️"}  deleted auth user ${u.email}`);
}

console.log("\n  AFTER:");
const { data: after } = await db.from("applications").select("instagram,name,status");
console.log(`    applications remaining: ${after?.length ?? 0}`);
(after ?? []).forEach(r => console.log(`    · ${r.instagram} ${r.name} ${r.status}`));
const { data: usersAfter } = await db.auth.admin.listUsers();
console.log(`    auth users remaining:   ${usersAfter.users.length}`);
console.log("");
