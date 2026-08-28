/**
 * THE PLOT TWIST REWARD — one config, eight rewards.
 *
 * Everything tunable lives here: which rewards exist, what they say, what
 * they're worth, and how likely they are. The UI reads this and nothing
 * else, so changing the pool, the copy or the odds never means touching a
 * component.
 *
 * WEIGHTS ARE PLACEHOLDERS. Every reward is currently equally likely (1),
 * which is deliberately wrong for real economics — the expensive ones should
 * be rarer. Set these from trip margin and supplier cost before launch; the
 * picker already handles uneven weights, so it's a one-line change per row.
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

export const JOURNEY_01_REWARDS: Reward[] = [
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

export function rewardById(id: string | null | undefined): Reward | null {
  if (!id) return null;
  return JOURNEY_01_REWARDS.find((r) => r.id === id) ?? null;
}

/**
 * Weighted pick across the pool. Returns null only if the pool is empty or
 * every weight is zero — the caller treats that as an assignment failure
 * rather than silently handing out nothing.
 */
export function pickReward(pool: Reward[] = JOURNEY_01_REWARDS): Reward | null {
  const usable = pool.filter((r) => r.weight > 0);
  if (usable.length === 0) return null;

  const total = usable.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * total;

  for (const reward of usable) {
    roll -= reward.weight;
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
  envelopeMark: "JOURNEY 01",
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
