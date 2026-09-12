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

/**
 * WHICH PAGE A JOURNEY RENDERS.
 *
 * "mystery" is the original: the destination is withheld, five clues are
 * hidden down the page, and a correct guess unlocks the reveal and a reward.
 *
 * "reveal" is the opposite posture — the destination is stated in the hero and
 * the four days are the story. It exists because the clue hunt is a retention
 * mechanic: it rewards people who already care, which is the wrong bet while
 * we're buying cold traffic. Journey 00 runs it; Journey 01 keeps the hunt.
 *
 * This is a deliberate exception to the rule in JourneyPage.tsx that a journey
 * needing different sections is a redesign rather than a destination. It is
 * one — so it's named, typed and switched on explicitly here, rather than
 * quietly forked inside a component. NOTHING about the mystery path is
 * removed by it: every clue, rung, hotspot and reward stays in the repo and
 * stays live on Journey 01.
 */
/**
 * "edc" is the third posture, and it is a genuine redesign rather than a
 * destination: the page is built around an embedded, unmodified official
 * festival video, runs on a near-black neon canvas, and re-reads the site's
 * own devices as festival credentials (set-time board, ticket stub,
 * countdown). See components/edc/EdcPage.tsx and content/thailand.ts.
 *
 * It is named and switched on explicitly here for exactly the reason
 * "reveal" is — so a new composition is a typed variant, never a quiet fork
 * inside a component.
 */
export type JourneyPageVariant = "mystery" | "reveal" | "edc";

export type JourneyConfig = {
  /** The stored id. Written to every application row and every analytics event. */
  id: JourneyId;
  /** URL segment: /journey/<slug>. */
  slug: string;
  /** Human label for the admin filter. */
  displayName: string;

  /**
   * HOW THIS JOURNEY APPEARS IN THE MASTHEAD MENU.
   *
   * Optional: a journey with no `nav` is simply not offered in the menu, which
   * is the right default for anything unlaunched or retired.
   *
   * ─── A WARNING BEFORE YOU SET THIS ON A MYSTERY JOURNEY ────────────────────
   * `label` is rendered in plain sight, on every page, to every visitor. On a
   * journey running `pageVariant: "mystery"` the whole product is that the
   * destination is WITHHELD until someone earns it through five clues and a
   * guess — so putting that destination in the menu hands out the answer for
   * free and quietly kills the hunt.
   *
   * The build-time invariant in index.ts cannot catch this: it guards clue and
   * hero copy, not navigation. It is a judgement call, and it is deliberately
   * one field so it can be reversed in one word (see JOURNEY_01, where the
   * trade-off is spelled out).
   */
  nav?: {
    /** The line the visitor reads. */
    label: string;
    /** The small line above it — what kind of trip this is. */
    kicker: string;
  };
  /**
   * SEARCH METADATA — the title and description this journey's page carries.
   *
   * ─── WHY THIS IS PER-JOURNEY AND NOT ONE SITE-WIDE STRING ──────────────────
   * Every page shipped the root title and description verbatim: "Plot Twist —
   * 20 People. One Trip. 10/10s Only." / "You've found the plot. But do you
   * know where it's going?". That was correct while every journey was a
   * mystery, and it is what a shared link should still say for one.
   *
   * It is also why /journey/02 could not rank for anything. Nothing in its
   * head named EDC, Thailand, Phuket or 2026, so the one page on this site
   * with genuine search demand behind it was invisible for all of it — and
   * two pages sharing a title and description are duplicates to a crawler.
   *
   * ─── THE RULE ──────────────────────────────────────────────────────────────
   * Set this ONLY on a journey that already states its destination on the
   * page. The precedent is `nav` directly above: Journey 00 names Goa in the
   * menu because Goa is in its own hero, so naming it costs nothing. Identical
   * reasoning — metadata cannot give away something the H1 already says.
   *
   * NEVER set it on a `pageVariant: "mystery"` journey. There the withheld
   * destination IS the product, and putting it in a <title> hands the answer
   * to anyone who hovers a tab, plus every search result and every share.
   * Those journeys inherit the generic pair, which is the correct behaviour
   * and not an oversight.
   *
   * Keep `title` under ~60 characters and `description` under ~155, or Google
   * truncates them and writes its own.
   */
  seo?: {
    title: string;
    description: string;
    /**
     * Trip facts for the TouristTrip node in this page's structured data.
     * All optional, and all subject to the same rule as the rest of this
     * repo: only set them once they are CONFIRMED. An ISO date in a schema
     * is a fact stated to a machine, and "probably October" is not one.
     */
    startDate?: string;
    endDate?: string;
    /** Plain place name, e.g. "Phuket, Thailand". */
    destination?: string;
  };

  /** Which page composition this journey renders. Defaults to "mystery". */
  pageVariant?: JourneyPageVariant;
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
