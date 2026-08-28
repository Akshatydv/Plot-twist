/**
 * THE MYSTERY LAYER — every configurable piece of the hunt lives here.
 *
 * To change the destination, change DESTINATION and ACCEPTED below. Nothing
 * else in the codebase knows the answer, and it never appears in rendered
 * copy, alt text or metadata until the visitor actually solves it.
 */

const DESTINATION = "Bali";

/** Normalised forms that count as correct. Keep lowercase, no punctuation. */
const ACCEPTED = ["bali", "baliindonesia", "denpasar"];

/** Strip case, accents, punctuation and spacing so near-misses still land. */
export function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function isCorrectGuess(value: string) {
  const v = normalise(value);
  return v.length > 0 && ACCEPTED.some((a) => normalise(a) === v);
}

/**
 * The five PRIMARY clues — findable through normal exploration, and the only
 * ones that count toward "THE PLOT x/5".
 */
export type PrimaryClueId = "place" | "culture" | "landscape" | "nightlife" | "final";

export const PRIMARY_CLUE_IDS: PrimaryClueId[] = ["place", "culture", "landscape", "nightlife", "final"];

/**
 * Bonus discoveries — genuinely optional. Delightful if you find them, but
 * they never gate the guess and they carry no geography.
 */
export type BonusClueId = "flight" | "last" | "hero-annotation" | "signature";

export type ClueId = PrimaryClueId | BonusClueId;

export const CLUE_IDS: ClueId[] = [...PRIMARY_CLUE_IDS, "flight", "last", "hero-annotation", "signature"];

export const TOTAL_CLUES = PRIMARY_CLUE_IDS.length;

/**
 * Guessing opens at three. By then the ladder below has handed over island +
 * region + the offerings detail — enough to have a real theory without
 * forcing a completionist sweep.
 */
export const GUESS_THRESHOLD = 3;

/**
 * THE LADDER — information is assigned by DISCOVERY ORDER, not by location.
 *
 * Visitors explore in whatever order they like, so keying these to the page
 * they happen to poke first would let someone open with the strongest clue
 * and collapse the mystery. Indexing by "how many have you found" guarantees
 * the intended arc every time: broad → direction → signal → confirmation →
 * final nudge. Rung three is deliberately the one that makes a guess possible,
 * which is why the gate sits at three.
 *
 * None of these name the destination. They're deduction, not disclosure.
 */
export const CLUE_LADDER = [
  {
    step: "01",
    kicker: "SOMEWHERE WARM",
    reveal: "Not a city. An island. You'll want a passport and almost no luggage.",
    note: "could be anywhere.",
  },
  {
    step: "02",
    kicker: "NARROWING IT",
    reveal: "Southeast Asia. Eight degrees south of the equator, so our winter is their dry season.",
    note: "hmm. getting warmer.",
  },
  {
    step: "03",
    kicker: "THE TELL",
    reveal:
      "Every morning, little palm-leaf trays of flowers appear on the doorsteps. Not decoration — offerings. On an island that kept its own gods when the rest of the country changed.",
    note: "okay, you have a theory.",
  },
  {
    step: "04",
    kicker: "CONFIRMATION",
    reveal:
      "Temples on the sea cliffs. Rice terraces stacked up the hills. A volcano watching the whole thing, and a monkey going through someone's bag.",
    note: "this feels suspicious now.",
  },
  {
    step: "05",
    kicker: "LAST ONE",
    reveal: "They call it the Island of the Gods. Sunset drinks, boat days, and nights with no real bedtime.",
    note: "you definitely know.",
  },
] as const;

export const plotHunt = {
  /** Bumped: the ladder changed what a saved find means. */
  storageKey: "plottwist.plot.v3",

  tracker: {
    label: "THE PLOT",
    /** Picked by how many have been found — handwritten, never a progress bar. */
    lines: [
      { min: 0, text: "you have work to do." },
      { min: 1, text: "could be anywhere." },
      { min: 2, text: "hmm. getting warmer." },
      { min: 3, text: "okay, you have a theory." },
      { min: 4, text: "this feels suspicious now." },
      { min: 5, text: "you definitely know." },
    ],
    found: "FOUND",
  },

  /** Copy for the bonus MysteryPreview cards — atmosphere, not geography. */
  reveals: {
    flight: {
      /** Cycles while the destination field "tries" to resolve. */
      scramble: ["B _ _ _", "▮ ▮ ▮ ▮", "T R _ _", "▮▮▮▮▮", "N I C E", "T R Y"],
      settle: "CLASSIFIED",
      note: "not giving you that easily.",
      earned: "Nice try. The board isn't telling you either.",
    },
    last: {
      note: "the rest is on our grid.",
      earned: "Somewhere we've already posted about. Twice.",
    },
  },

  /** Bonus finds. Deliberately no geography — these are jokes, not clues. */
  bonus: {
    "hero-annotation": "told you.",
    signature: "we do mean it.",
  } as Record<string, string>,

  guess: {
    lockedTitle: "KEEP LOOKING.",
    lockedBody: `Find ${GUESS_THRESHOLD} clues and we'll let you have a go.`,
    lockedNote: "we can wait.",
    title: "THINK YOU FIGURED IT OUT?",
    body: "Let's see if you're actually onto something.",
    placeholder: "Type your guess",
    submit: "SUBMIT THE PLOT",
    /** Rotated through on each wrong answer. */
    wrong: [
      { big: "NOPE.", small: "Respectable guess though." },
      { big: "GOOD GUESS.", small: "Wrong plot." },
      { big: "NOT QUITE.", small: "You're warm. Very warm." },
      { big: "PLOT TWIST:", small: "still no." },
    ],
    correct: {
      kicker: "YOU GOT IT.",
      title: "That was supposed to take longer.",
      destination: DESTINATION,
      body: "Journey 01. Now you know where. You still don't know who with.",
      note: "okay, detective.",
      ctaLead: "Now let's see if you're a 10/10.",
      cta: { label: "MAKE YOUR CASE", href: "#apply" },
    },
  },
} as const;
