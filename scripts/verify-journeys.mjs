import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = {};
for (const l of readFileSync(".env.local","utf8").split("\n")) {
  const t=l.trim(); if(!t||t.startsWith("#"))continue; const i=t.indexOf("="); if(i>0) env[t.slice(0,i)]=t.slice(i+1);
}
const admin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth:{persistSession:false} });
const BASE = process.argv[2] ?? "http://localhost:4321";
const pass=[], fail=[];
const check=(ok,l,d="")=>(ok?pass:fail).push(l+(d?` — ${d}`:""));

const answer = n => `Probe answer ${n}. `.padEnd(70, "x");
const base = (handle) => ({
  name:"Journey Probe", instagram:handle, mobile:"+919000000002", age:24, city:"Probeville",
  answer_1:answer(1), answer_2:answer(2), answer_3:answer(3),
  clue_progress:3, destination_guess:"goa", reward_id:"spa",
  source:"instagram", medium:"reel", campaign:"journey00_launch", content:"probe",
});
/**
 * Each probe gets its own x-forwarded-for so the 5-per-10-minutes limiter
 * doesn't reject the back half of the suite. The limiter is keyed on client
 * IP (see lib/rateLimit.ts) — this exercises it honestly rather than
 * disabling it.
 */
let probeIp = 0;
const post = (body) =>
  fetch(BASE + "/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `203.0.113.${++probeIp}` },
    body: JSON.stringify(body),
  });

await admin.from("applications").delete().ilike("instagram","@__jprobe%");

// 1. Journey 00 submission
const r0 = await post({ ...base("@__jprobe_00"), journey:"JOURNEY 00" });
const b0 = await r0.json().catch(()=>({}));
check(r0.status===201, "Journey 00 application accepted", `HTTP ${r0.status}`);
const row0 = b0.id ? (await admin.from("applications").select("*").eq("id",b0.id).maybeSingle()).data : null;
check(row0?.journey==="JOURNEY 00", "stored journey is JOURNEY 00", `got ${row0?.journey}`);
check(row0?.reward_id==="spa", "Journey 00 reward persisted", `got ${row0?.reward_id}`);
check(row0?.destination_guess==="goa", "destination guess persisted");
check(row0?.clue_progress===3, "clue progress persisted");
check(row0?.campaign==="journey00_launch", "Journey 00 campaign attribution stored", `got ${row0?.campaign}`);

// 2. Journey 01 still works, same handle allowed on the other journey
const r1 = await post({ ...base("@__jprobe_00"), journey:"JOURNEY 01", destination_guess:"bali" });
const b1 = await r1.json().catch(()=>({}));
check(r1.status===201, "same handle may apply to Journey 01 too", `HTTP ${r1.status}`);
const row1 = b1.id ? (await admin.from("applications").select("*").eq("id",b1.id).maybeSingle()).data : null;
check(row1?.journey==="JOURNEY 01", "stored journey is JOURNEY 01", `got ${row1?.journey}`);

// 3. Duplicate WITHIN a journey still 409
const rd = await post({ ...base("@__jprobe_00"), journey:"JOURNEY 00" });
check(rd.status===409, "duplicate within Journey 00 rejected", `HTTP ${rd.status}`);

// 4. Unknown journey rejected rather than silently refiled
const ru = await post({ ...base("@__jprobe_x"), journey:"JOURNEY 99" });
check(ru.status===422, "unknown journey rejected (not defaulted)", `HTTP ${ru.status}`);

// 5. Absent journey falls back to the default
const ra = await post({ ...base("@__jprobe_def") });
const ba = await ra.json().catch(()=>({}));
const rowa = ba.id ? (await admin.from("applications").select("journey").eq("id",ba.id).maybeSingle()).data : null;
check(ra.status===201 && rowa?.journey==="JOURNEY 01", "absent journey defaults to Journey 01", `got ${rowa?.journey}`);

// 6. A reward id that is NOT in the journey's pool is dropped, not stored
const rr = await post({ ...base("@__jprobe_rw"), journey:"JOURNEY 00", reward_id:"not-a-real-reward" });
const br = await rr.json().catch(()=>({}));
check(rr.status===201, "application with a bogus reward is still accepted", `HTTP ${rr.status}`);
const rowr = br.id ? (await admin.from("applications").select("reward_id").eq("id",br.id).maybeSingle()).data : null;
check(rowr?.reward_id===null, "reward outside the journey pool is discarded", `got ${rowr?.reward_id}`);

// 7. Notifications still fire per journey (Phase 4B regression check)
const d0 = b0.id ? (await admin.from("notification_deliveries").select("*").eq("application_id",b0.id)).data : [];
check((d0??[]).length===1, "Journey 00 submission still triggers one notification", `${(d0??[]).length} rows`);

// 8. The admin list's journey filter, run as the admin page runs it.
//    (The page itself is behind Supabase Auth + the email allow-list, so this
//    exercises the query rather than the login.)
const SEL = "id,name,instagram,age,city,submitted_at,status,journey";
const only00 = (await admin.from("applications").select(SEL).eq("journey","JOURNEY 00").ilike("instagram","@__jprobe%")).data ?? [];
const only01 = (await admin.from("applications").select(SEL).eq("journey","JOURNEY 01").ilike("instagram","@__jprobe%")).data ?? [];
const all = (await admin.from("applications").select(SEL).ilike("instagram","@__jprobe%")).data ?? [];
check(only00.length > 0 && only00.every(r=>r.journey==="JOURNEY 00"), "admin filter journey=JOURNEY 00 returns only Journey 00", `${only00.length} rows`);
check(only01.length > 0 && only01.every(r=>r.journey==="JOURNEY 01"), "admin filter journey=JOURNEY 01 returns only Journey 01", `${only01.length} rows`);
check(all.length === only00.length + only01.length, "unfiltered list covers both journeys and nothing else", `${all.length} total`);
check(all.every(r => typeof r.journey === "string" && r.journey.length > 0), "every listed row carries a journey (the admin column can always render)");

await admin.from("applications").delete().ilike("instagram","@__jprobe%");
const left = (await admin.from("applications").select("id").ilike("instagram","@__jprobe%")).data ?? [];
check(left.length===0, "probe rows cleaned up");

console.log("\n  PASS"); pass.forEach(p=>console.log("    ✅ "+p));
if (fail.length){ console.log("\n  FAIL"); fail.forEach(f=>console.log("    ❌ "+f)); }
console.log(`\n  ${pass.length} passed, ${fail.length} failed\n`);
process.exit(fail.length?1:0);
