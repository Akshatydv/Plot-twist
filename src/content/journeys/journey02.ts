/**
 * JOURNEY 02 — EDC THAILAND.
 *
 * Written against the contract in types.ts, the same way journey00.ts was.
 *
 * ─── WHY THIS FILE LOOKS THIN ───────────────────────────────────────────────
 * This journey renders the "edc" page variant, and ALL of its copy lives in
 * content/thailand.ts — exactly as Journey 00's reveal-page copy lives in
 * content/goa.ts. What remains here is what the registry itself needs: the
 * id, the slug, the storage key, the casting scraps, and the parked mystery
 * material.
 *
 * ─── THE PARKED HUNT ────────────────────────────────────────────────────────
 * The clue ladder, the three cards, the flight scramble and the reward odds
 * below are UNUSED by the edc variant, and they are deliberately real rather
 * than filler. If this journey is ever flipped to "mystery", the hunt works
 * on the first try. Same posture as journey00.ts.
 *
 * Every factual claim in the ladder was verified before it was written:
 *   rung 01  Thailand is the only Southeast Asian country never colonised by
 *            a European power
 *   rung 02  Phuket is the country's largest island, in the Andaman Sea
 *   rung 03  Songkran — the water-throwing new year — and the tuk-tuk, both
 *            unmistakable and neither naming the country
 *   rung 04  Phang Nga Bay's limestone karsts; longtail boats
 *   rung 05  the December festival itself
 *
 * Rung 03 is the one that makes a real guess possible, which is why the guess
 * gate sits at three. NO RUNG WRITES THE DESTINATION'S NAME — the build-time
 * invariant in index.ts enforces that, and it will fail the build if you
 * break it.
 */

import { brand } from "@/content/site";
import { DEFAULT_REWARD_WEIGHTS, REWARD_POOL } from "@/content/rewards";
import type { JourneyConfig } from "./types";

export const JOURNEY_02: JourneyConfig = {
  id: "JOURNEY 02",
  slug: "02",
  displayName: "Journey 02",
  /** The festival page. EDC Thailand is the headline of its own hero. */
  nav: { label: "EDC THAILAND", kicker: "JOURNEY 02 · DEC 18–20, 2026" },
  campaignId: "journey02_launch",
  /** The festival page. See components/edc/EdcPage.tsx. */
  pageVariant: "edc",
  /** Its own namespace — this is what stops three hunts bleeding into each other. */
  storageKey: "plottwist.plot.j02.v1",

  destination: {
    name: "Thailand",
    accepted: ["thailand", "phuket", "bangkok", "siam"],
  },

  /**
   * Unused by the edc variant — that page's hero is the festival footage
   * embed, not SunsetBackdrop. Kept populated and destination-free because
   * the contract requires it and because flipping this journey to "mystery"
   * must not need a second edit.
   */
  hero: {
    eyebrow: "JOURNEY 02 — 20 SEATS, AGES 18–30",
    sideNote: { big: ["20 PEOPLE.", "ONE MAINSTAGE."], invite: "COME GET CAST." },
    photo: {
      src: "/photos/plot.jpg",
      alt: "A crowd silhouetted against a burning tropical sunset",
      objectPosition: "60% 55%",
    },
  },

  /**
   * Empty on purpose. The five-frame StoryCollage belongs to the mystery
   * variant; the edc page tells its story through THE RUN OF SHOW and BEYOND
   * THE GATES instead, and there is no licensed Thailand photography in this
   * repo to fill five frames with. See public/photos/thailand/PHOTOS.md.
   */
  story: { frames: [] },

  /**
   * ─── A DELIBERATE, DOCUMENTED EXCEPTION ─────────────────────────────────
   * Goa and Bali share no photograph. These three scraps break that rule, and
   * the reason is licence, not laziness: there is no licensed Thailand or
   * festival photography in this repo, and public/photos/goa/PHOTOS.md exists
   * precisely because sourcing images without verifying their licence is how
   * this project has previously nearly shipped a mistake.
   *
   * So the casting board reuses three already-cleared night frames. They are
   * night-energy crowd images, which is the right register for this page —
   * but they ARE Journey 00's, and REPLACING THEM IS THE FIRST THING TO DO
   * once real photography exists. The shot list is in
   * public/photos/thailand/PHOTOS.md.
   */
  casting: {
    stamp: "CASTING — JOURNEY 02",
    photos: [
      {
        src: "/photos/goa/people.jpg",
        alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
        note: "the group chat, irl",
      },
      {
        src: "/photos/goa/plot.jpg",
        alt: "A beach after dark, lantern-lit tables on the sand below shacks strung with lights",
        note: "04:00",
      },
      {
        src: "/photos/plot.jpg",
        alt: "A crowd silhouetted against a burning tropical sunset",
        note: "no filter",
      },
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
      line: "You're going to need a passport.",
      hint: "Somewhere loud. Worth flying for.",
      from: "YOU",
      to: "??? ???",
      seat: "01 OF 20",
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
        src: "/photos/landscape-clue.jpg",
        alt: "A limestone sea cliff above breaking surf, with a small tiered-roof structure set back on the headland",
      },
      hotspot: { x: 31, y: 35 },
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

  flightScramble: ["T _ _ _ _ _ _ _", "▮ ▮ ▮ ▮", "P H _ _ _ _", "▮▮▮▮▮", "L O U D", "E R"],

  ladder: [
    {
      step: "01",
      kicker: "SOMEWHERE LOUD",
      reveal:
        "Southeast Asia. The one country in the region that no European power ever colonised — which is why it still feels entirely like itself.",
      note: "could be a few places.",
    },
    {
      step: "02",
      kicker: "NARROWING IT",
      reveal: "An island on the Andaman side. The country's largest, and the one everyone flies straight into.",
      note: "hmm. getting warmer.",
    },
    {
      step: "03",
      kicker: "THE TELL",
      reveal:
        "Once a year the whole country throws water at each other in the street to mark the new year. The rest of the year, you get around in the back of a converted pickup with no doors.",
      note: "okay, you have a theory.",
    },
    {
      step: "04",
      kicker: "CONFIRMATION",
      reveal:
        "Limestone towers standing straight out of the sea. Longtail boats with engines that sound like lawnmowers. Food that ruins you for home.",
      note: "this feels suspicious now.",
    },
    {
      step: "05",
      kicker: "LAST ONE",
      reveal:
        "And in December, on that island, the biggest electronic music festival on the planet sets up on the sand for three nights.",
      note: "you definitely know.",
    },
  ],

  solvedBody: "Journey 02. That was the easy half — the other 19 seats are still open.",

  rewards: {
    pool: REWARD_POOL,
    weightsByClueProgress: DEFAULT_REWARD_WEIGHTS,
    envelopeMark: "JOURNEY 02",
  },
};
