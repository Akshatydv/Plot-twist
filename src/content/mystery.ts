/**
 * THE MYSTERY LAYER — the MECHANICS of the hunt. Journey-agnostic.
 *
 * What lives here: how many clues there are, how many unlock a guess, how a
 * guess is normalised, and the copy that is true of every Plot Twist hunt.
 *
 * What does NOT live here: the destination, the words on the ladder, the
 * accepted answers, or the storage namespace. Those are per-journey and live
 * in content/journeys/. This file must never learn a destination's name —
 * that is what stopped Bali leaking into the bundle, and it is what keeps a
 * second journey from being a second copy of the site.
 */

/** Strip case, accents, punctuation and spacing so near-misses still land. */
export function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Does this guess solve THIS journey?
 *
 * The accepted list is passed in rather than imported, so there is exactly
 * one guess implementation and no component can be tempted to branch on
 * which journey it is rendering.
 */
export function isCorrectGuess(value: string, accepted: readonly string[]) {
  const v = normalise(value);
  return v.length > 0 && accepted.some((a) => normalise(a) === v);
}

/**
 * The five PRIMARY clues — findable through normal exploration, and the only
 * ones that count toward "THE PLOT x/5". Same five slots in every journey;
 * only what they say changes.
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
 * Guessing opens at three. Every journey's ladder is written so that rung
 * three is the one that makes a real theory possible — see the ladder
 * contract in content/journeys/types.ts.
 */
export const GUESS_THRESHOLD = 3;

/**
 * THE LADDER CONTRACT — information is assigned by DISCOVERY ORDER, not by
 * location. Visitors explore in whatever order they like, so keying rungs to
 * the page they happen to poke first would let someone open with the
 * strongest clue and collapse the mystery. Indexing by "how many have you
 * found" guarantees the intended arc every time: broad → direction → signal →
 * confirmation → final nudge.
 *
 * The rungs themselves are per-journey. This is only their shape.
 */
export type { LadderRung } from "./journeys/types";

export const plotHunt = {
  tracker: {
    label: "THE PLOT",
    /** Picked by how many have been found — handwritten, never a progress bar. */
    lines: [
      // Shown before a visitor has found anything — which is also their first
      // second on the page. "you have work to do." assigned homework to
      // someone who didn't yet know what this was.
      { min: 0, text: "if you're curious." },
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
      // The scramble sequence teases the destination's own shape (letter
      // count, a first initial), so it is per-journey — see
      // JourneyConfig.flightScramble.
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
      // `destination` and `body` are per-journey — see JourneyConfig.
      note: "okay, detective.",
      ctaLead: "Solving it doesn't get you a seat. This might.",
      cta: { label: "MAKE YOUR CASE", href: "#apply" },
    },
  },
} as const;
