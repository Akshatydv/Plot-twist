/**
 * JOURNEY 00 — GOA.
 *
 * The first plot. Positioned as the journey that came before Journey 01, not
 * as a pilot: a visitor is joining a real Plot Twist journey, and the
 * internal reason it exists is nobody's business but ours. Hence "THE FIRST
 * PLOT" in the hero side note, and nothing anywhere that says test, beta or
 * trial.
 *
 * Everything structural is Journey 01's. Only the destination, its evidence
 * and its odds are here.
 *
 * ─── THE CLUE LADDER ────────────────────────────────────────────────────────
 * Every factual claim below was verified before it was written, because a
 * mystery that rewards deduction cannot afford an invented detail:
 *
 *   rung 01  ~105 km of coastline
 *   rung 02  west-facing Arabian Sea coast; the tourist season runs after the
 *            south-west monsoon
 *   rung 03  Portuguese rule 1510–1961 (451 years); traditional Goan houses
 *            glazed with translucent windowpane-oyster shell ("carepa"/nacre)
 *            rather than glass
 *   rung 04  laterite makes up ~73% of Goa's soil and caps the low plateaus
 *            that form the rocky headlands between its beaches; the Mandovi
 *            and Zuari are crossed by free government ferries where no bridge
 *            exists; licensed beach shacks run 1 September – 31 May
 *   rung 05  smallest Indian state by area; "susegad", from the Portuguese
 *            "sossegado"; cashew feni holds a Geographical Indication (2009 —
 *            the state's first, and India's first for a local liquor)
 *
 * Rung 03 is the one that makes a real guess possible — Portuguese India
 * narrows to one answer — which is why the guess gate sits at three. No rung
 * writes the destination's name.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { brand } from "@/content/site";
import { DEFAULT_REWARD_WEIGHTS, REWARD_POOL } from "@/content/rewards";
import type { JourneyConfig } from "./types";

export const JOURNEY_00: JourneyConfig = {
  id: "JOURNEY 00",
  slug: "00",
  displayName: "Journey 00",
  campaignId: "journey00_launch",
  /**
   * Goa is stated outright — see content/goa.ts for the page this renders.
   *
   * Everything below this line (the clue ladder, the three cards, the flight
   * scramble, the reward odds) is deliberately LEFT INTACT and unused. It is
   * parked, not deleted: flip this back to "mystery" and the whole hunt
   * returns exactly as it was. The header comment above documents the ladder's
   * verified research, which is the expensive part to recreate.
   */
  pageVariant: "reveal",
  /** Its own namespace. This is what keeps the two hunts from bleeding into each other. */
  storageKey: "plottwist.plot.j00.v1",

  destination: {
    name: "Goa",
    /**
     * Normalised before comparison, so "Goa, India" and "GOA" both land here.
     * The two districts and the capital count — someone who types "Panjim"
     * has solved it. Nothing broader: "India" is not a guess.
     */
    accepted: ["goa", "goaindia", "northgoa", "southgoa", "panaji", "panjim"],
  },

  hero: {
    eyebrow: "JOURNEY 00 — 20 SEATS, AGES 18–30",
    /** The only place the prequel framing appears. Same slot, same type, different words. */
    sideNote: { big: ["20 PEOPLE.", "THE FIRST PLOT."], invite: "COME GET CAST." },
    photo: {
      // Deliberately NOT another dreamy palm sunset — Journey 01 already owns
      // that visual language. This is a rocky, palm-topped headland in flat
      // coastal haze: rawer, more characterful, unmistakably a different trip.
      // The lower half is open water, which is where the headline sits.
      src: "/photos/goa/hero.jpg",
      alt: "A rocky headland crowded with palms rising out of a calm sea under a pale, hazy sky",
      // Holds the headland high and right so the headline keeps the open water.
      objectPosition: "55% 42%",
    },
  },

  /**
   * Real photography of this destination. Every file's id, photographer and
   * licence is recorded in public/photos/goa/PHOTOS.md.
   *
   * None of it shares a frame with Journey 01, and none of it gives the
   * answer away: no signage, no named landmark, no third-party branding.
   * Candidates were rejected for exactly those reasons — one otherwise
   * perfect nightlife shot had an "I ♥ GOA" sign in it.
   *
   * The story sells the trip. The mystery stays in the clue cards.
   */
  story: {
    frames: [
      {
        key: "escape",
        title: "THE ESCAPE",
        caption: "Ocean / beach / adventure",
        src: "/photos/goa/escape.jpg",
        alt: "A small cove seen from a clifftop, rocky headlands running out into a hazy sea",
        note: "day 02",
      },
      {
        key: "experience",
        title: "THE EXPERIENCE",
        caption: "Backwater / village / detour",
        src: "/photos/goa/experience.jpg",
        alt: "A narrow bamboo footbridge over a still creek, leading to fields fringed with coconut palms",
      },
      {
        key: "people",
        title: "THE PEOPLE",
        caption: "20 strangers, briefly",
        src: "/photos/goa/people.jpg",
        alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
        note: "10/10s only",
      },
      {
        key: "plot",
        title: "THE PLOT",
        caption: "Night / lights / nowhere to be",
        src: "/photos/goa/plot.jpg",
        alt: "A beach after dark, lantern-lit tables set out on the sand below shacks strung with lights",
        note: "02:00",
        clueId: "nightlife",
      },
      {
        key: "unexpected",
        title: "THE UNEXPECTED",
        caption: "Not on the itinerary",
        src: "/photos/goa/unexpected.jpg",
        alt: "A surfboard propped against the wall of a whitewashed beach cafe in late afternoon light",
      },
    ],
  },

  casting: {
    stamp: "CASTING — JOURNEY 00",
    photos: [
      {
        src: "/photos/goa/people.jpg",
        alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
        note: "the group chat, irl",
      },
      { src: "/photos/goa/plot.jpg", alt: "Lantern-lit tables on a beach after dark", note: "02:00" },
      {
        src: "/photos/goa/unexpected.jpg",
        alt: "A surfboard propped against a beach cafe wall",
        note: "no filter",
      },
    ],
  },

  clues: [
    {
      id: "clue-01",
      index: "01",
      eyebrow: "DEPARTURE",
      title: "THE FLIGHT",
      kind: "flight",
      /**
       * Journey 01's card says "You're going to need a passport." For this
       * destination that is simply false, and a clue that lies is worse than
       * no clue. The inversion is also the strongest single signal on the
       * card, which is why it sits here rather than in the copy above it.
       */
      line: "You won't need a passport.",
      hint: "Still warm. Still worth the flight.",
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
         * THE HIDDEN DETAIL: a whitewashed masonry cross on a stepped plinth,
         * standing on the rocks at the waterline, left of frame.
         *
         * At a glance this is a dusk beach — figures walking, the last pink
         * smear of sunset on the water. The cross reads as one more rock until
         * it is magnified, and then it is the odd thing out: a Catholic
         * wayside cross planted on an Indian shoreline. That is the deduction
         * the card exists for, and it lands squarely on ladder rung 03 —
         * Portuguese for 451 years, baroque churches.
         *
         * No signage, no named landmark, nothing that spells the answer.
         *
         * Pre-cropped to 4:3, the card's own aspect, so the frame and the
         * hotspot can never drift apart. Source rect is in PHOTOS.md.
         */
        src: "/photos/goa/landscape-clue.jpg",
        // Describes the SHAPE, never the country — a screen-reader user gets
        // the same puzzle everyone else does, not the answer.
        alt: "A beach at dusk with figures silhouetted along the waterline, and a small stone cross on a stepped plinth standing among the rocks at the left",
      },
      /**
       * Centred on the cross — drives both the marker and the magnifier.
       *
       * 25%, not less: the loupe is 112px wide and centred here, so on a
       * 768px viewport (the narrowest the clue card gets) a smaller x clips
       * the magnifier against the left edge of the frame. The crop was chosen
       * to put the cross at this position for exactly that reason.
       */
      hotspot: { x: 25, y: 58 },
    },
    {
      id: "clue-03",
      index: "03",
      eyebrow: "ONE MORE THING",
      title: "THE LAST CLUE",
      kind: "twist",
      line: "This one isn't here.",
      hint: "You'll have to leave the website.",
      // Same account, same interaction. What differs is the post it leads to,
      // which lives on Instagram, not in this repository.
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

  /** Three letters, teased and then withdrawn. */
  flightScramble: ["G _ _", "▮ ▮ ▮", "N _ _ _", "▮▮▮▮", "N I C E", "T R Y"],

  ladder: [
    // 01 — BROAD. Warm, coastal, casual. Rules out almost nothing on purpose.
    {
      step: "01",
      kicker: "SOMEWHERE WARM",
      reveal:
        "Not an island. A coastline — about a hundred kilometres of it, and you could get through the whole trip without putting shoes on.",
      note: "could be anywhere.",
    },
    // 02 — GEOGRAPHIC. Country, then which side of it. After this the field is
    // one coast rather than one continent.
    {
      step: "02",
      kicker: "NARROWING IT",
      reveal:
        "Still India — no passport, nothing to exchange. West-facing coast, so the sun goes down into the sea every single night, and we're going once the rains have finished.",
      note: "hmm. getting warmer.",
    },
    // 03 — THE TELL. The rung that has to make a real guess possible: on this
    // coast, "Portuguese for 451 years" narrows to essentially one answer.
    {
      step: "03",
      kicker: "THE TELL",
      reveal:
        "The churches are baroque, and the old houses are glazed with oyster shell instead of glass. Both because the people who sailed in got here in 1510 and stayed for 451 years.",
      note: "okay, you have a theory.",
    },
    // 04 — LANDSCAPE. What it actually looks like out of the window, and the
    // detail nowhere else has: rivers you cross by ferry because there's no bridge.
    {
      step: "04",
      kicker: "CONFIRMATION",
      reveal:
        "Red laterite headlands between the beaches. Two rivers you cross on a free government ferry, because there's no bridge. Shacks on the sand that go up in September and come down before the rain.",
      note: "this feels suspicious now.",
    },
    // 05 — FINAL NUDGE. Two things that are true of exactly one place.
    {
      step: "05",
      kicker: "LAST ONE",
      reveal:
        "The smallest state in the country. It has its own word for doing absolutely nothing and feeling excellent about it — and a cashew spirit that legally can't use its own name unless it was made here.",
      note: "you definitely know.",
    },
  ],

  solvedBody: "Journey 00. The first plot — and 15 of the seats are still open.",

  rewards: {
    // The same eight rewards, drawn from the same table. This is one reward
    // system with two front doors, not two systems: what makes a reward
    // "Journey 00's" is that it was assigned under this journey's storage key
    // and submitted with this journey's id, both of which the server checks.
    pool: REWARD_POOL,
    weightsByClueProgress: DEFAULT_REWARD_WEIGHTS,
    envelopeMark: "JOURNEY 00",
  },
};
