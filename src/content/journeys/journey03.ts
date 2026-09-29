/**
 * JOURNEY 03 — BIR × BAROT.
 *
 * Written against the contract in types.ts, the same way journey02.ts was.
 *
 * ─── WHY THIS FILE LOOKS THIN ───────────────────────────────────────────────
 * This journey renders the "bir" page variant, and ALL of its copy lives in
 * content/bir.ts — exactly as Goa's lives in content/goa.ts and Thailand's in
 * content/thailand.ts. What remains here is what the registry needs: the id,
 * the slug, the storage key, the casting scraps, and the parked hunt.
 *
 * ─── THE PARKED HUNT ────────────────────────────────────────────────────────
 * The ladder, the three cards, the flight scramble and the reward odds are
 * UNUSED by the bir variant and kept real so a flip to "mystery" works. The
 * ladder leans on well-documented facts — Bir Billing hosted the Paragliding
 * World Cup in 2015; Billing's launch sits roughly 1,000 m above the Bir
 * landing field; Bir is home to a Tibetan settlement and its monasteries —
 * but it was written from the brief, not researched rung by rung the way
 * Goa's was. VERIFY EVERY RUNG BEFORE FLIPPING THIS JOURNEY TO "mystery".
 *
 * The photo clue points at the site's shared landscape frame as a
 * placeholder; it must be replaced with a Bir frame before any flip.
 *
 * NO RUNG WRITES THE DESTINATION'S NAME — the build-time invariant in
 * index.ts enforces that.
 */

import { brand } from "@/content/site";
import { DEFAULT_REWARD_WEIGHTS, REWARD_POOL } from "@/content/rewards";
import type { JourneyConfig } from "./types";

export const JOURNEY_03: JourneyConfig = {
  id: "JOURNEY 03",
  slug: "03",
  displayName: "Journey 03",
  /** The mountain page. Bir × Barot is the headline of its own hero. */
  nav: { label: "BIR × BAROT", kicker: "JOURNEY 03 · NOV 2026" },
  campaignId: "journey03_launch",
  /**
   * The hero states Bir, Barot and Himachal outright, so naming them here
   * gives nothing away. No start/end dates: "last weekend of November" is
   * read as 27–30 Nov in content/bir.ts, but that is an interpretation, and
   * types.ts is explicit that an ISO date in a schema must be CONFIRMED.
   * Add them once it is.
   */
  seo: {
    title: "Bir Billing + Barot Group Trip, Nov 2026 | Plot Twist",
    description:
      "Twenty strangers, four days in Himachal: a hidden valley in Barot, tandem paragliding in Bir, a mountain trek and two bonfire nights. Not a tour — a story.",
    destination: "Bir Billing & Barot, Himachal Pradesh, India",
  },

  pageVariant: "bir",
  /** Its own namespace — this is what stops four hunts bleeding into each other. */
  storageKey: "plottwist.plot.j03.v1",

  destination: {
    name: "Bir Billing",
    accepted: ["birbilling", "bir", "billing", "barot", "birbarot", "barotbir", "himachal", "himachalpradesh"],
  },

  /** Unused by the bir variant (its hero is FlightHero). Kept destination-free. */
  hero: {
    eyebrow: "JOURNEY 03 — 20 SEATS, AGES 18–30",
    sideNote: { big: ["20 PEOPLE.", "ONE SKY."], invite: "COME GET CAST." },
    photo: {
      src: "/photos/escape.jpg",
      alt: "An open landscape under a wide sky",
      objectPosition: "50% 50%",
    },
  },

  /** Empty on purpose — see journey02.ts. The bir page tells its story through the four days. */
  story: { frames: [] },

  /**
   * Three of this journey's own photographs — Barot, Bir, the trek — so no
   * frame is shared with another journey. Credits and licences are in
   * content/bir.ts → `photos` (rendered on the page) and public/photos/bir/PHOTOS.md.
   * Places, not people: nobody in them is on this trip.
   */
  casting: {
    stamp: "CASTING — JOURNEY 03",
    photos: [
      { src: "/photos/bir/bir-sunset-gliding.jpg", alt: "Two paragliders against an orange sunset over Bir", note: "day 02, 6pm" },
      { src: "/photos/bir/river.jpg", alt: "The Uhl river running over boulders at Barot", note: "day 01" },
      { src: "/photos/bir/summit.jpg", alt: "Stone cairns on a ridgetop above Bir, snow peaks behind", note: "earned it" },
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
      line: "You won't need a passport. You might need a jacket.",
      hint: "Overnight. Uphill.",
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
        alt: "A placeholder landscape frame awaiting this journey's own clue photograph",
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

  flightScramble: ["B _ _", "▮ ▮ ▮", "B _ _ _ _", "▮▮▮▮▮", "U P", "H I G H"],

  ladder: [
    {
      step: "01",
      kicker: "SOMEWHERE COLD",
      reveal: "No passport. One long overnight road out of the city, and the air gets thinner by the hour.",
      note: "could be anywhere.",
    },
    {
      step: "02",
      kicker: "NARROWING IT",
      reveal: "The mountains in the north. A green valley under a wall of snow peaks, in a state that runs on apples and tea.",
      note: "hmm. getting warmer.",
    },
    {
      step: "03",
      kicker: "THE TELL",
      reveal: "In 2015 the world cup of flying came here — the first time it had ever been held in the country.",
      note: "okay, you have a theory.",
    },
    {
      step: "04",
      kicker: "CONFIRMATION",
      reveal: "A Tibetan settlement, gold-roofed monasteries, and a grass landing field where people drop out of the sky all afternoon.",
      note: "this feels suspicious now.",
    },
    {
      step: "05",
      kicker: "LAST ONE",
      reveal: "You take off from a meadow about a kilometre higher up the hill, and the hill has a name that sounds like an invoice.",
      note: "you definitely know.",
    },
  ],

  solvedBody: "Journey 03. You're going up — and the other 19 seats are still open.",

  rewards: {
    pool: REWARD_POOL,
    weightsByClueProgress: DEFAULT_REWARD_WEIGHTS,
    envelopeMark: "JOURNEY 03",
  },
};
