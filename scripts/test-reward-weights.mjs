/**
 * Deterministic + statistical verification of the 3/4/5-clue reward mechanic.
 *
 * Pure content-file logic — no server, no Supabase, no browser. Run any time
 * the weights in src/content/rewards.ts change.
 *
 *   node scripts/test-reward-weights.mjs
 */
import { execSync } from "node:child_process";

// rewards.ts is plain TS (types, `as const`, `satisfies` — all erasable, no
// enums/namespaces), so Node's own type-stripping imports it directly. Run
// this script with: node --experimental-strip-types scripts/test-reward-weights.mjs
const { REWARD_POOL, pickReward, DEFAULT_REWARD_WEIGHTS } = await import("../src/content/rewards.ts");

const pass = [];
const fail = [];
const check = (ok, label, detail = "") => (ok ? pass : fail).push(label + (detail ? ` — ${detail}` : ""));

/* ---------------- odds table sanity ---------------- */

for (const tier of [3, 4, 5]) {
  const row = DEFAULT_REWARD_WEIGHTS[tier];
  const sum = Object.values(row).reduce((a, b) => a + b, 0);
  check(sum === 100, `tier ${tier} weights sum to 100`, `got ${sum}`);
  check(Object.keys(row).length === REWARD_POOL.length, `tier ${tier} covers every reward id`);
}

const cashIds = ["off-1000", "off-2500", "off-5000"];
for (const id of cashIds) {
  const w3 = DEFAULT_REWARD_WEIGHTS[3][id];
  const w4 = DEFAULT_REWARD_WEIGHTS[4][id];
  const w5 = DEFAULT_REWARD_WEIGHTS[5][id];
  check(w3 < w4 && w4 < w5, `${id} weight strictly increases 3 < 4 < 5`, `${w3} / ${w4} / ${w5}`);
}
check(
  DEFAULT_REWARD_WEIGHTS[5]["off-5000"] <= 5,
  "₹5,000 stays rare even at 5 clues (≤5%)",
  `got ${DEFAULT_REWARD_WEIGHTS[5]["off-5000"]}`
);

/* ---------------- CASE 1–3: tiered draw actually differs ---------------- */

function drawMany(clueProgress, n) {
  const counts = {};
  for (let i = 0; i < n; i++) {
    const r = pickReward(clueProgress);
    counts[r.id] = (counts[r.id] ?? 0) + 1;
  }
  return counts;
}

const N = 100_000;
const draws3 = drawMany(3, N);
const draws4 = drawMany(4, N);
const draws5 = drawMany(5, N);

for (const [tier, draws] of [[3, draws3], [4, draws4], [5, draws5]]) {
  const total = Object.values(draws).reduce((a, b) => a + b, 0);
  check(total === N, `tier ${tier}: ${N} draws all resolved to a real reward`);
}

/* expected value in rupees — perks/upgrades count as 0 cash, consistent with value:null */
function expectedValue(draws, n) {
  let sum = 0;
  for (const r of REWARD_POOL) {
    const share = (draws[r.id] ?? 0) / n;
    sum += share * (r.value ?? 0);
  }
  return sum;
}

const ev3 = expectedValue(draws3, N);
const ev4 = expectedValue(draws4, N);
const ev5 = expectedValue(draws5, N);

check(ev3 < ev4, "expected cash value: 3 clues < 4 clues", `₹${ev3.toFixed(1)} vs ₹${ev4.toFixed(1)}`);
check(ev4 < ev5, "expected cash value: 4 clues < 5 clues", `₹${ev4.toFixed(1)} vs ₹${ev5.toFixed(1)}`);

const p5000_3 = (draws3["off-5000"] ?? 0) / N;
const p5000_4 = (draws4["off-5000"] ?? 0) / N;
const p5000_5 = (draws5["off-5000"] ?? 0) / N;
check(p5000_3 < p5000_4 && p5000_4 < p5000_5, "₹5,000 draw rate strictly increases 3→4→5", `${(p5000_3*100).toFixed(2)}% / ${(p5000_4*100).toFixed(2)}% / ${(p5000_5*100).toFixed(2)}%`);
check(p5000_5 < 0.08, "₹5,000 still genuinely rare at 5 clues (<8% observed)", `${(p5000_5*100).toFixed(2)}%`);

/* CASE with no clue context (fallback path) — every reward still equally likely */
const drawsFlat = drawMany(undefined, N);
const flatShares = REWARD_POOL.map((r) => (drawsFlat[r.id] ?? 0) / N);
const maxDeviation = Math.max(...flatShares.map((s) => Math.abs(s - 1 / 8)));
check(maxDeviation < 0.01, "no-clue-context fallback stays flat (~1/8 each)", `max deviation ${(maxDeviation * 100).toFixed(2)}pp`);

/* ---------------- CASE 4 & 5: no reward on a wrong guess ---------------- */
// This is enforced structurally, not by pickReward — the assignment effect
// only runs when guessState === "solved", which submitGuess() only reaches on
// a correct guess. Verified here by reading the source directly, since this
// script has no React runtime to mount PlotProvider in.
const providerSrc = execSync("cat src/components/mystery/PlotProvider.tsx", { encoding: "utf8" });
// submitGuess only calls setGuessState("solved") on the `right` branch; a
// wrong guess falls to the `else` and sets "wrong" instead — so it can never
// reach the state the reward effect requires.
const submitGuessBody = providerSrc.match(/const submitGuess = useCallback\(\(value: string\) => \{[\s\S]*?\n  \}, \[[^\]]*\]\);/)?.[0] ?? "";
check(
  /if \(right\) \{[\s\S]*?setGuessState\("solved"\)/.test(submitGuessBody) &&
    /\} else \{[\s\S]*?setGuessState\("wrong"\)/.test(submitGuessBody),
  "CASE 4/5 — submitGuess only reaches \"solved\" on a correct guess (wrong guess → \"wrong\", never assigns a reward)"
);
check(
  /if \(!ready \|\| guessState !== "solved" \|\| rewardId\) return;/.test(providerSrc),
  "reward effect additionally re-checks guessState === \"solved\" itself before ever calling pickReward"
);
check(
  /if \(!ready \|\| guessState !== "solved" \|\| rewardId\) return;/.test(providerSrc),
  "CASE 6 — effect also gates on existing rewardId (assign-once, refresh-safe)"
);
// The effect that calls pickReward(primaryCount, ...) must NOT list
// primaryCount in its dependency array — if it did, finding a 4th or 5th
// clue after an assigned reward would re-run the effect (still blocked by
// the rewardId guard in this build, but that's a second line of defence, not
// the intended one). `journey` is a fine dependency to include: it's a
// module-level constant for the life of the page (see JourneyProvider), so
// its presence here can never fire on a clue-count change. The guarantee
// this asserts is that pickReward's `primaryCount` argument is fixed at
// whichever render flipped guessState to "solved", never a later one.
const assignmentEffect = providerSrc.match(/useEffect\(\(\) => \{\s*if \(!ready[\s\S]*?pickReward\(primaryCount,[\s\S]*?\}, \[([^\]]*)\]\);/);
check(Boolean(assignmentEffect), "CASE 7 — found the reward-assignment effect calling pickReward(primaryCount, ...)");
const deps = assignmentEffect?.[1]?.replace(/\s/g, "").split(",") ?? [];
check(
  deps.length > 0 && !deps.includes("primaryCount"),
  "CASE 7 — the effect's deps exclude primaryCount (so later clue finds cannot reroll)",
  deps.join(",")
);

/* ---------------- report ---------------- */

console.log("\n  PASS");
pass.forEach((p) => console.log("    ✅ " + p));
if (fail.length) {
  console.log("\n  FAIL");
  fail.forEach((f) => console.log("    ❌ " + f));
}
console.log(`\n  ${pass.length} passed, ${fail.length} failed\n`);

console.log("  Reward table (rupee EV shown; perks/upgrades count as ₹0):");
console.log(`    3 clues → EV ₹${ev3.toFixed(1)}   ₹5,000 rate ${(p5000_3*100).toFixed(2)}%`);
console.log(`    4 clues → EV ₹${ev4.toFixed(1)}   ₹5,000 rate ${(p5000_4*100).toFixed(2)}%`);
console.log(`    5 clues → EV ₹${ev5.toFixed(1)}   ₹5,000 rate ${(p5000_5*100).toFixed(2)}%\n`);

process.exit(fail.length ? 1 : 0);
