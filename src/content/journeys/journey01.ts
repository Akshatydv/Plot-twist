/**
 * JOURNEY 01 — BALI.
 *
 * The approved master. Every value here was lifted verbatim out of
 * content/site.ts, content/mystery.ts and content/rewards.ts when the journey
 * layer was introduced; nothing about this journey changed. If you are
 * reading this to build Journey 02, copy journey00.ts instead — it is the
 * one written against the contract rather than extracted from history.
 *
 * The storage key is deliberately still `plottwist.plot.v3`: renaming it
 * would have wiped the saved hunt of every visitor who had already started.
 */

import { brand } from "@/content/site";
import { DEFAULT_REWARD_WEIGHTS, REWARD_POOL } from "@/content/rewards";
import type { JourneyConfig } from "./types";

export const JOURNEY_01: JourneyConfig = {
  id: "JOURNEY 01",
  slug: "01",
  displayName: "Journey 01",
  /**
   * ─── THIS ONE IS A DELIBERATE TRADE-OFF, NOT AN OVERSIGHT ──────────────────
   * Journey 01 runs the MYSTERY variant: its destination is withheld, and a
   * visitor is meant to earn it through five clues and a guess. Naming Bali in
   * a menu that renders on every page hands that answer out for free, to
   * everyone, before they have scrolled anything.
   *
   * It is named anyway, on the site owner's instruction (11 September 2026):
   * the menu's job is to move cold traffic between three live trips, and an
   * entry reading "JOURNEY 01" tells a first-time visitor nothing about
   * whether they want to click it.
   *
   * IF THE HUNT MATTERS MORE THAN THE NAVIGATION, this is a one-word fix:
   * change `label` to "SOMEWHERE WARM", or delete this `nav` block entirely to
   * take the journey out of the menu. Nothing else needs to change — every
   * clue, rung, hotspot and reward is untouched by it.
   */
  nav: { label: "BALI", kicker: "JOURNEY 01 · THE MYSTERY ONE" },
  campaignId: "journey01_launch",
  storageKey: "plottwist.plot.v3",

  destination: {
    name: "Bali",
    accepted: ["bali", "baliindonesia", "denpasar"],
  },

  hero: {
    eyebrow: "JOURNEY 01 — 20 SEATS, AGES 18–30",
    sideNote: { big: ["20 PEOPLE.", "ONE PLOT."], invite: "COME GET CAST." },
    photo: {
      src: "/photos/hero-sunset.jpg",
      alt: "Palm silhouettes against a pink and orange tropical sunset over the ocean",
      // The value this hero has always used, now stated rather than implied.
      objectPosition: "60% 58%",
    },
  },

  story: {
    frames: [
      {
        key: "escape",
        title: "THE ESCAPE",
        caption: "Ocean / beach / adventure",
        src: "/photos/escape.jpg",
        alt: "Turquoise water breaking over a rocky coastline from above",
        note: "day 02",
      },
      {
        key: "experience",
        title: "THE EXPERIENCE",
        caption: "Nature / culture / exploration",
        src: "/photos/experience.jpg",
        alt: "Dense palm fronds and tropical foliage in a dark forest canopy",
      },
      {
        key: "people",
        title: "THE PEOPLE",
        caption: "20 strangers, briefly",
        src: "/photos/people.jpg",
        alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
        note: "10/10s only",
      },
      {
        key: "plot",
        title: "THE PLOT",
        caption: "Sunset / party / nightlife",
        src: "/photos/plot.jpg",
        alt: "Crowd silhouetted against a burning tropical sunset",
        note: "02:00",
        clueId: "nightlife",
      },
      {
        key: "unexpected",
        title: "THE UNEXPECTED",
        caption: "Not on the itinerary",
        src: "/photos/unexpected.jpg",
        alt: "A scooter on a palm-lined coastal road at sunset",
      },
    ],
  },

  casting: {
    stamp: "CASTING — JOURNEY 01",
    photos: [
      {
        src: "/photos/people.jpg",
        alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
        note: "the group chat, irl",
      },
      { src: "/photos/plot.jpg", alt: "A crowd silhouetted against a tropical sunset", note: "02:00" },
      { src: "/photos/unexpected.jpg", alt: "A scooter on a palm-lined coastal road at sunset", note: "no filter" },
    ],
  },

  clues: [
    {
      id: "clue-01",
      index: "01",
      eyebrow: "DEPARTURE",
      title: "THE FLIGHT",
      kind: "flight",
      line: "You're going to need a passport.",
      hint: "Somewhere warm. Worth flying for.",
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
        /**
         * Reads as a sea-cliff photograph at a glance. On the headland, small
         * enough to miss, is a tiered-roof shrine — the actual clue. The alt
         * text describes its shape, never its country: a screen-reader user
         * gets the same puzzle everyone else does, not the answer.
         */
        src: "/photos/landscape-clue.jpg",
        alt: "A limestone sea cliff above breaking surf, with a small tiered-roof structure set back on the headland",
      },
      /** Centred on the shrine — drives both the marker and the magnifier. */
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

  flightScramble: ["B _ _ _", "▮ ▮ ▮ ▮", "T R _ _", "▮▮▮▮▮", "N I C E", "T R Y"],

  ladder: [
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
  ],

  solvedBody: "Journey 01. That was the easy half — the other 19 seats are still open.",

  rewards: {
    pool: REWARD_POOL,
    weightsByClueProgress: DEFAULT_REWARD_WEIGHTS,
    envelopeMark: "JOURNEY 01",
  },
};
