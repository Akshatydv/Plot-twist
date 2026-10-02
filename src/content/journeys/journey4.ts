/**
 * JOURNEY 4 — SRI LANKA. New Year's Eve, 29 Dec 2026 → 4 Jan 2027.
 *
 * Written against the contract in types.ts, the same way journey2.ts was.
 *
 * ─── WHY THIS FILE LOOKS THIN ───────────────────────────────────────────────
 * This journey renders the "srilanka" page variant, and ALL of its copy lives
 * in content/srilanka.ts — exactly as Bir's lives in content/bir.ts. What
 * remains here is what the registry needs: the id, the slug, the storage key,
 * the casting scraps, the search metadata, and the parked hunt.
 *
 * ─── THE PARKED HUNT ────────────────────────────────────────────────────────
 * The ladder, the three cards, the flight scramble and the reward odds are
 * UNUSED by the srilanka variant and kept real so a flip to "mystery" works.
 * The rungs lean on well-documented facts (the Nine Arches Bridge at
 * Demodara; the south coast's stilt fishermen; Colombo's position on the
 * west coast), but were written from the brief, not researched rung by rung.
 * VERIFY EVERY RUNG BEFORE FLIPPING THIS JOURNEY TO "mystery".
 *
 * NO RUNG WRITES THE DESTINATION'S NAME — the build-time invariant in
 * index.ts enforces that.
 */

import { brand } from "@/content/site";
import { DEFAULT_REWARD_WEIGHTS, REWARD_POOL } from "@/content/rewards";
import type { JourneyConfig } from "./types";

export const JOURNEY_4: JourneyConfig = {
  id: "JOURNEY 4",
  slug: "4",
  displayName: "Journey 4 · Sri Lanka",
  /** The island page. Sri Lanka is the headline of its own hero. */
  nav: { label: "SRI LANKA", kicker: "JOURNEY 4 · NEW YEAR 2027" },
  campaignId: "journey04_launch",
  /**
   * The hero states Sri Lanka and the dates outright, so naming them here
   * gives nothing away. Dates CONFIRMED by the brief: 29 Dec 2026 → 4 Jan
   * 2027 — the same window as trip.dates in content/srilanka.ts. These two
   * must agree; change both or neither. No price in the description: it is
   * not set yet (see price in content/srilanka.ts).
   */
  seo: {
    title: "Sri Lanka New Year Group Trip, 29 Dec–4 Jan | Plot Twist",
    description:
      "7 days, one island, one New Year's Eve. Ella's mountains, a south-coast countdown on the beach, Mirissa at sunset. Limited seats — join the waitlist.",
    startDate: "2026-12-29",
    endDate: "2027-01-04",
    destination: "Ella, Ahangama, Mirissa & Colombo, Sri Lanka",
    image: "/photos/srilanka/train-bridge.jpg",
  },

  pageVariant: "srilanka",
  /** Its own namespace — this is what stops five hunts bleeding into each other. */
  storageKey: "plottwist.plot.j04.v1",

  destination: {
    name: "Sri Lanka",
    accepted: ["srilanka", "lanka", "ceylon", "ella", "mirissa", "ahangama", "colombo", "weligama"],
  },

  /** Unused by the srilanka variant (its hero is IslandHero). Kept destination-free. */
  hero: {
    eyebrow: "JOURNEY 4 — LIMITED SEATS, AGES 18–30",
    sideNote: { big: ["ONE ISLAND.", "ONE NEW YEAR."], invite: "COME GET CAST." },
    photo: {
      src: "/photos/srilanka/coconut-aerial.jpg",
      alt: "A palm-covered headland from above, surf breaking around it",
      objectPosition: "50% 50%",
    },
  },

  /** Empty on purpose — the srilanka page tells its story through the seven worlds. */
  story: { frames: [] },

  /**
   * Three of this journey's own photographs — the bridge at Ella, the south
   * coast from the air, the beach at night — so no frame is shared with
   * another journey. Credits are in content/srilanka.ts → `photos` (rendered
   * on the page). Places, not people: nobody in them is on this trip.
   */
  casting: {
    stamp: "CASTING — JOURNEY 4",
    photos: [
      { src: "/photos/srilanka/train-bridge.jpg", alt: "A blue train crossing a stone-arched bridge in the jungle near Ella", note: "30 dec, 8:40-ish" },
      { src: "/photos/srilanka/mirissa-aerial.jpg", alt: "The south coast from the air: palms, a bay, white surf", note: "2 jan" },
      { src: "/photos/srilanka/nye-beach.jpg", alt: "Fireworks over a beach crowded with people at midnight", note: "00:00" },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* everything below is parked — see the header note                  */
  /* ---------------------------------------------------------------- */

  clues: [
    {
      id: "clue-01",
      index: "01",
      eyebrow: "DEPARTURE",
      title: "THE FLIGHT",
      kind: "flight",
      line: "You will need a passport. You won't need a jacket.",
      hint: "South. Then further south.",
      from: "YOU",
      to: "??? ?????",
      seat: "01 OF 16",
    },
    {
      id: "clue-02",
      index: "02",
      eyebrow: "LOOK CLOSER",
      title: "THE LANDSCAPE",
      kind: "photo",
      line: "Look closer.",
      hint: "Something's hiding in plain sight. Almost everyone scrolls past it.",
      photo: {
        src: "/photos/srilanka/stilt.jpg",
        alt: "Fishermen perched on wooden poles in the surf",
      },
      hotspot: { x: 62, y: 44 },
    },
    {
      id: "clue-03",
      index: "03",
      eyebrow: "ONE MORE THING",
      title: "THE LAST CLUE",
      kind: "twist",
      line: "This one isn't here.",
      hint: "You'll have to leave the website.",
      reveal: brand.instagram,
      href: brand.instagramUrl,
      evidence: {
        meta: "INTERCEPTED · NOT FILED ON THIS SITE",
        stamp: "OUTSIDE THE PLOT",
        annotation: "last stop.",
        micro: "the internet is bigger than this page.",
        cta: "OPEN INSTAGRAM",
      },
    },
  ],

  flightScramble: ["S _ _", "▮ ▮ ▮", "I S L A N D", "▮▮▮▮▮", "S O U T H", "T E A"],

  ladder: [
    {
      step: "01",
      kicker: "SOMEWHERE WARM",
      reveal: "A short flight south. You land in shorts, in December, and nobody finds that strange.",
      note: "could be anywhere.",
    },
    {
      step: "02",
      kicker: "NARROWING IT",
      reveal: "An island. Tea on the hills in the middle, surf all the way round the edge.",
      note: "hmm. getting warmer.",
    },
    {
      step: "03",
      kicker: "THE TELL",
      reveal: "A blue train crosses a stone bridge of nine arches in the jungle, and half the internet has a photo of it.",
      note: "okay, you have a theory.",
    },
    {
      step: "04",
      kicker: "CONFIRMATION",
      reveal: "On the south coast, fishermen still sit on wooden poles out in the surf.",
      note: "this feels suspicious now.",
    },
    {
      step: "05",
      kicker: "LAST ONE",
      reveal: "It used to be called Ceylon, and so did the tea.",
      note: "you definitely know.",
    },
  ],

  solvedBody: "Journey 4. New Year's on an island — and the seats are still open.",

  rewards: {
    pool: REWARD_POOL,
    weightsByClueProgress: DEFAULT_REWARD_WEIGHTS,
    envelopeMark: "JOURNEY 4",
  },
};
