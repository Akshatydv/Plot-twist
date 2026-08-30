/**
 * THE PLOT TWIST REWARD — one config, eight rewards.
 *
 * Everything tunable lives here: which rewards exist, what they say, what
 * they're worth, and how likely they are. The UI reads this and nothing
 * else, so changing the pool, the copy or the odds never means touching a
 * component.
 *
 * Each reward's own `weight` is the flat fallback used when no clue count is
 * known (currently 1 across the board — an even draw). The real odds live in
 * `DEFAULT_REWARD_WEIGHTS` below: three tiers, one per clue count a visitor
 * can actually solve with (3, 4 or 5 — GUESS_THRESHOLD to TOTAL_CLUES).
 * These are still launch-experiment numbers, not trip-margin economics —
 * tune them here, in one place, once real numbers exist.
 *
 * JOURNEY-AWARE. Every journey draws from a pool and an odds table named by
 * its own config (see content/journeys/). Today both journeys point at the
 * two defaults below, which is the intent — one reward system, not two — but
 * the indirection is what lets a later journey run different odds, or drop a
 * reward that doesn't exist at its destination, without a second code path.
 * It is also what makes cross-journey validation possible: a reward id is
 * valid only for a journey whose pool actually contains it.
 */

export type RewardType = "perk" | "upgrade" | "discount";

export type Reward = {
  id: string;
  /** The headline, set in the display face. */
  title: string;
  /** Two short lines under it. Kept as an array so the line break is intentional, not a wrap. */
  lines: [string, string];
  type: RewardType;
  /** Rupees off, for discounts. Null for perks — there's no cash value to quote. */
  value: number | null;
  /** Relative likelihood. Not a percentage; the picker normalises across the pool. */
  weight: number;
};

export const REWARD_POOL: Reward[] = [
  {
    id: "first-round",
    title: "FIRST ROUND'S ON US",
    lines: ["You found the plot.", "We'll get the drinks."],
    type: "perk",
    value: null,
    weight: 1,
  },
  {
    id: "surf",
    title: "SURF'S ON US",
    lines: ["Hope you brought", "your balance."],
    type: "perk",
    value: null,
    weight: 1,
  },
  {
    id: "spa",
    title: "SPA'S ON US",
    lines: ["You've earned", "the reset."],
    type: "perk",
    value: null,
    weight: 1,
  },
  {
    id: "boat-day",
    title: "BOAT DAY UPGRADE",
    lines: ["Yeah.", "We like this one."],
    type: "upgrade",
    value: null,
    weight: 1,
  },
  {
    id: "on-film",
    title: "YOUR PLOT, ON FILM",
    lines: ["You bring the memories.", "We'll bring the camera."],
    type: "perk",
    value: null,
    weight: 1,
  },
  {
    id: "off-1000",
    title: "₹1,000 OFF",
    lines: ["Not bad,", "detective."],
    type: "discount",
    value: 1000,
    weight: 1,
  },
  {
    id: "off-2500",
    title: "₹2,500 OFF",
    lines: ["Okayyyy.", "You got a good one."],
    type: "discount",
    value: 2500,
    weight: 1,
  },
  {
    id: "off-5000",
    title: "₹5,000 OFF",
    lines: ["Plot twist:", "your trip just got cheaper."],
    type: "discount",
    value: 5000,
    weight: 1,
  },
];

/**
 * Looks an id up in ONE journey's pool. `pool` defaults to the shared eight so
 * a caller with no journey context can still resolve a title for display;
 * pass the journey's own pool wherever the answer must be authoritative —
 * validating a submission, or assigning a reward.
 */
export function rewardById(id: string | null | undefined, pool: Reward[] = REWARD_POOL): Reward | null {
  if (!id) return null;
  return pool.find((r) => r.id === id) ?? null;
}

/**
 * THE ODDS TABLE — the whole reward-progression mechanic lives in these three
 * rows. Each is a per-reward-id weight, normalised the same way the flat pool
 * is: relative numbers, not percentages, but all three rows deliberately sum
 * to 100 so they read like percentages at a glance.
 *
 * Directionality is the requirement, not these exact figures:
 *   - the three cash discounts strictly increase, tier over tier
 *   - ₹5,000 stays rare everywhere (1% → 2% → 4%) — it must never feel common
 *   - the five experience/perk rewards still carry the majority of the
 *     weight even at 5 clues (64%), so finding everything improves the odds
 *     without turning this into "grind for the jackpot"
 *
 * Solving with more than 5 or fewer than 3 primary clues isn't reachable
 * (GUESS_THRESHOLD gates the guess box, TOTAL_CLUES caps the count), so three
 * rows is the whole table — no interpolation needed.
 */
export const DEFAULT_REWARD_WEIGHTS: Record<number, Record<string, number>> = {
  3: {
    "first-round": 20,
    surf: 18,
    spa: 17,
    "boat-day": 15,
    "on-film": 15,
    "off-1000": 10,
    "off-2500": 4,
    "off-5000": 1,
  },
  4: {
    "first-round": 18,
    surf: 16,
    spa: 15,
    "boat-day": 13,
    "on-film": 14,
    "off-1000": 15,
    "off-2500": 7,
    "off-5000": 2,
  },
  5: {
    "first-round": 15,
    surf: 14,
    spa: 13,
    "boat-day": 11,
    "on-film": 11,
    "off-1000": 20,
    "off-2500": 12,
    "off-5000": 4,
  },
};

/**
 * Weighted pick across the pool.
 *
 * `clueProgress` selects which row of the odds table to draw from — pass the
 * primary-clue count at the moment of the first successful solve, never a
 * later count, or a reroll becomes possible. Omit it (or pass a count outside
 * 3–5) to fall back to each reward's own flat `weight` — every reward
 * currently equally likely, which is also what the test suite and any future
 * caller without clue context gets.
 *
 * Returns null only if the resulting pool is empty or every weight in it is
 * zero — the caller treats that as an assignment failure rather than
 * silently handing out nothing.
 */
export function pickReward(
  clueProgress?: number,
  pool: Reward[] = REWARD_POOL,
  weights: Record<number, Record<string, number>> = DEFAULT_REWARD_WEIGHTS
): Reward | null {
  const tier = clueProgress !== undefined ? weights[clueProgress] : undefined;
  const weightOf = (r: Reward) => tier?.[r.id] ?? r.weight;

  const usable = pool.filter((r) => weightOf(r) > 0);
  if (usable.length === 0) return null;

  const total = usable.reduce((sum, r) => sum + weightOf(r), 0);
  let roll = Math.random() * total;

  for (const reward of usable) {
    roll -= weightOf(reward);
    if (roll <= 0) return reward;
  }
  // Floating-point drift on the last step — the final entry is the answer.
  return usable[usable.length - 1];
}

/** Copy for the reveal. Kept beside the pool so the whole moment is editable in one file. */
export const rewardMoment = {
  /** Bridges straight out of the destination reveal. */
  bridge: {
    lead: "But obviously…",
    line: "there's another plot twist.",
  },
  eyebrow: "YOUR PLOT TWIST",
  /**
   * Says rewards vary without listing them — showing the pool up front would
   * turn a surprise into a promotion.
   */
  everyone: "Everyone gets a plot twist. Yours is…",
  sealStamp: "SEALED",
  // The envelope mark is per-journey — see JourneyConfig.rewards.envelopeMark.
  openLabel: "OPEN IT",
  opening: "OPENING…",
  terms: "*T&Cs apply.",
  cta: { label: "MAKE YOUR CASE", href: "#apply" },
  share: {
    label: "SHARE YOUR PLOT",
    title: "PLOT TWIST",
    /** Deliberately vague — never leaks the destination or the reward. */
    text: "I just solved the Plot Twist. 👀",
    copied: "link copied.",
  },
  error: {
    title: "Plot twist — something went sideways.",
    body: "That wasn't supposed to happen.",
    retry: "TRY AGAIN",
  },
} as const;
