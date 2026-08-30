/**
 * THE JOURNEY CONTRACT
 *
 * A journey is a destination, its evidence, and its odds. Everything else —
 * the layout, the casting board, the philosophy, the tea cup, the application,
 * the brand voice — is shared, lives in content/site.ts, and must not be
 * duplicated per journey.
 *
 * The test for whether something belongs in here: *would it be wrong if we
 * changed the destination?* Hero proportions, no. The clue ladder, yes.
 *
 * Adding Journey 02 means adding one file in this folder and one line in
 * index.ts. It must never mean copying a component.
 */

import type { Clue, Frame } from "@/content/site";
import type { Reward } from "@/content/rewards";

/** Matches the `journey` column on the applications table, exactly. */
export type JourneyId = string;

/** One rung of the five-step clue ladder — see CLUE_LADDER in content/mystery.ts. */
export type LadderRung = {
  step: string;
  kicker: string;
  reveal: string;
  /** Mirrors the tracker line for that count, so the two never contradict. */
  note: string;
};

export type JourneyConfig = {
  /** The stored id. Written to every application row and every analytics event. */
  id: JourneyId;
  /** URL segment: /journey/<slug>. */
  slug: string;
  /** Human label for the admin filter. */
  displayName: string;
  /**
   * The campaign parameter this journey's ads should use. Not forced onto
   * visitors — UTMs still win — but it documents the intended value in one
   * place and lets the admin tell two launches apart.
   */
  campaignId: string;

  /**
   * localStorage namespace for the hunt. MUST be unique per journey: this is
   * the single mechanism that stops Journey 01 clue progress from unlocking
   * Journey 00's guess box, or a Journey 00 reward from surfacing on the
   * Journey 01 page.
   */
  storageKey: string;

  destination: {
    /** Only ever rendered after a correct guess. Never in metadata, never in alt text. */
    name: string;
    /** Normalised forms that count as correct. Lowercase, no punctuation — see normalise(). */
    accepted: string[];
  };

  /** Journey-specific slots in the shared hero. Structure is fixed; words are not. */
  hero: {
    eyebrow: string;
    /** The handwritten statement on the right of the frame. */
    sideNote: { big: [string, string]; invite: string };
    photo: {
      src: string;
      alt: string;
      /**
       * CSS object-position for the full-bleed hero crop. Each journey's
       * photograph puts its subject somewhere different, and the headline
       * always sits over the lower left — so the focal point is per-journey.
       * Falls back to Journey 01's original value when omitted.
       */
      objectPosition?: string;
    };
  };

  /** The five-frame visual story. Same component, same layout, different film. */
  story: { frames: Frame[] };

  /** The casting board is brand-level; only its stamp and photo scraps are per-journey. */
  casting: {
    stamp: string;
    photos: { src: string; alt: string; note: string }[];
  };

  /** The three mystery cards: the flight, the landscape zoom, the Instagram twist. */
  clues: Clue[];

  /**
   * What the departure board cycles through before it settles on CLASSIFIED.
   * Per-journey because the sequence teases the destination's own shape — a
   * letter count, a first initial — and the same tease for two destinations
   * would be a lie in one of them.
   */
  flightScramble: string[];

  /**
   * THE LADDER — five rungs, handed out by DISCOVERY ORDER, not by location.
   * Rung three must be the one that makes a real guess possible; the guess
   * gate sits at three because of it.
   */
  ladder: LadderRung[];

  /** The body line under the correct-guess reveal. Names the journey, not the sales pitch. */
  solvedBody: string;

  rewards: {
    /** The pool this journey draws from. A reward outside it is rejected server-side. */
    pool: Reward[];
    /** Odds by clue count at the moment of the solve — rows for 3, 4 and 5. */
    weightsByClueProgress: Record<number, Record<string, number>>;
    /** Printed on the envelope. */
    envelopeMark: string;
  };
};
