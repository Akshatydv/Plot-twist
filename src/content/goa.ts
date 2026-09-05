/**
 * GOA — JOURNEY 00'S REVEAL PAGE.
 *
 * All copy for the "reveal" page variant lives here, the same way every other
 * word on this site lives in content/. Components read; they never hold copy.
 *
 * ─── WHAT THIS FILE IS NOT ──────────────────────────────────────────────────
 * It is not a replacement for journeys/journey00.ts. That file still holds the
 * full clue ladder, the three cards and the reward odds, untouched and parked.
 * This file is the transparent page that runs INSTEAD of the hunt, for now.
 *
 * ─── THE ONE RULE ───────────────────────────────────────────────────────────
 * NOTHING IN HERE IS INVENTED. Every fact below is one the site owner
 * confirmed. Two things they have NOT confirmed — the price, and the
 * included/excluded list — are therefore modelled as explicitly unconfirmed
 * (see `facts.price` and `facts.inclusions`) and render an honest "not
 * announced yet" rather than a plausible-looking number. Flip the flags when
 * the real values exist. Do not fill them in to make the page look finished.
 * ────────────────────────────────────────────────────────────────────────────
 */

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

/**
 * THE RUNNING ORDER — the single source of the little 01/02/03 beside each
 * section label.
 *
 * It exists because hardcoding those numbers on each section is how they broke
 * in the first place: two sections both showed 03 and two both showed 04,
 * because THE CASTING and THE APPLICATION take their index from
 * content/site.ts — where the numbers are correct for JOURNEY 01's running
 * order (setup, story, philosophy, casting, mystery, selection, application)
 * and wrong for this page's.
 *
 * Anything numbered on the reveal page must appear in this array, in the order
 * it appears on screen. Insert or move an entry and every number after it
 * follows automatically.
 *
 * The four chapters are deliberately NOT in here — they run their own
 * CHAPTER 01–04 track in the scene slates, which is a separate sequence and
 * should not consume section numbers.
 */
export const GOA_SECTION_ORDER = [
  "premise",
  "cast",
  "homeBase",
  "facts",
  "finePrint",
  "application",
] as const;

export type GoaSectionKey = (typeof GOA_SECTION_ORDER)[number];

/** Zero-padded position of a section in the running order — "01", "02", … */
export function goaIndex(key: GoaSectionKey): string {
  return String(GOA_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/* the facts everything else is built on                               */
/* ------------------------------------------------------------------ */

/**
 * Stated once, reused everywhere, so the hero strip, the facts table and the
 * meta description can never drift apart and contradict each other.
 */
export const GOA = {
  destination: "GOA",
  when: "OCTOBER 2026",
  days: "4 DAYS",
  cast: "20 PEOPLE",
  split: "10 GIRLS + 10 GUYS",
  ages: "18–30",
} as const;

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

/**
 * THE HERO — copy hierarchy, refined.
 *
 * The previous version framed the cast as strangers ("20 people who haven't
 * met yet", "Come alone. Leave with 19 others.") — accurate, but it led with
 * social risk rather than FOMO, and the brief was explicit that arriving
 * without knowing anyone should never be the hero's opening note. Nothing
 * below implies loneliness or a need to make friends; the energy is Goa,
 * the people, the trip — not the fact that the cast doesn't know each other
 * yet.
 *
 * `secondary` and `subheading` replace the old single italic `sub` line —
 * they're two different weights doing two different jobs (the emotional hook,
 * then a light confident aside), not one sentence split in half.
 *
 * The old four-chip fact strip is replaced by one line (`tripLine`) plus a
 * voiced tagline, with the age range pulled OUT into its own handwritten note
 * (`ageNote`) rather than sitting in the line as a fifth stat — composition
 * ("10 and 10") already has its real home in THE CAST section below; the hero
 * only needs the playful "10s ONLY" version.
 */
export const goaHero = {
  /** The destination, stated flat, in the highest-attention slot on the site. */
  eyebrow: `${GOA.destination} · ${GOA.when}`,
  /** The primary heading. Unchanged — this is the biggest, type-dominant element. */
  line1: "You've found",
  line2: "the plot.",
  /** The emotional hook — large, but clearly subordinate to line1/line2. */
  secondary: "The kind of trip you'll be talking about after.",
  /** Lighter, smaller, a confident aside rather than a second headline. */
  subheading: "And it hasn't even started yet.",
  /** One line, dot-separated — the offer, stated once, playfully. */
  tripLine: `${GOA.cast} · ${GOA.days} · 10s ONLY`,
  tripTagline: "Good people. Questionable decisions.",
  /**
   * The floating scrapbook note — kept OUT of tripLine on purpose, so it reads
   * as an aside pinned to the trip-details area rather than a fifth statistic
   * in the row.
   */
  ageNote: {
    headline: GOA.ages,
    lines: ["old enough to know better", "young enough to do it anyway"],
  },
  cta: { label: "REQUEST YOUR INVITE", href: "#apply" },
  scrollCue: "THE FOUR DAYS ↓",
  annotation: "twenty seats. that's the whole trip.",
} as const;

/* ------------------------------------------------------------------ */
/* the premise                                                         */
/* ------------------------------------------------------------------ */

export const premise = {
  index: goaIndex("premise"),
  label: "THE PREMISE",
  big: ["YOU COULD", "JUST GO TO GOA.", "OR YOU COULD MAKE A PLOT OUT OF IT."],
  body: [
    "Anyone can book a flight. Anyone can book a room.",
    "We bring the right people into the story.",
    "Ten girls. Ten guys. Every one of them picked.",
  ],
  /**
   * The objection, answered. This used to be the short version, with the full
   * argument ("WE PLANNED THE TRIP. NOT THE PEOPLE.") landing later in THE
   * DIFFERENCE — that section has since been removed, so this line is now the
   * only place on the page that makes the people-over-place case. Worth
   * keeping in mind before trimming it.
   */
  kicker: "You can book Goa. You can't book the nineteen people who make the trip what it is.",
  annotation: "that's the whole idea.",
  badge: "20 SEATS. NO FILLERS.",
} as const;

/* ------------------------------------------------------------------ */
/* the cast                                                            */
/* ------------------------------------------------------------------ */

/**
 * THE CAST.
 *
 * The Cast section on this page is the SHARED casting board — the same
 * `WhatsATen` component Journey 01 runs, in its `compact` mode. It is the
 * master Cast concept for every trip, so it is not reimplemented here and its
 * six traits, grading and interaction are not duplicated into this file.
 *
 * The board already adapts itself to this journey without any content below:
 * its stamp ("CASTING — JOURNEY 00") and its three photo scraps come from
 * journeys/journey00.ts via JourneyProvider.
 *
 * The only thing this page adds is the composition line — who the twenty
 * actually are — which the shared component takes as a prop rather than
 * importing, so it stays journey-agnostic.
 */
export const cast = {
  /**
   * The bridge under the CASTING — JOURNEY 00 stamp. Overrides
   * `casting.bridge` from site.ts, which is Journey 01's wording — see the
   * `bridge` prop on WhatsATen.
   */
  bridge: [
    "WE'RE PICKING THE PEOPLE. THE TRIP CAN TAKE CARE OF ITSELF.",
    "20 spots. 10 girls. 10 guys. And a very particular kind of energy.",
  ] as [string, string],
  split: {
    title: "10 AND 10.",
    body: "We're looking for the ones who are always up for one more plan, one more drink, one more story.",
    /** Said once. Never explained, never repeated — explaining it makes it louder. */
    disclaimer: "Basically, good vibes only.",
    extra: ["And yes, 10/10s only.", "Not the looks kind. The energy kind."],
  },
} as const;

/* ------------------------------------------------------------------ */
/* the four chapters                                                   */
/* ------------------------------------------------------------------ */

/**
 * THE SCENE — a chapter's full-bleed environment.
 *
 * The background is not decoration behind the content; it IS the section, and
 * the copy is layered into it. Video when footage exists, the still otherwise
 * (and always the still under reduced-motion) — see components/goa/Scene.tsx.
 *
 * `focal` is the object-position for the crop. It matters more than it looks:
 * these are one image serving a wide desktop banner AND a tall phone screen,
 * and the subject of each photo sits somewhere different.
 */
export type Scene = {
  /** Path under /videos/goa/. null until real footage exists. */
  video: string | null;
  poster: string;
  alt: string;
  /** object-position for the background crop, desktop and mobile. */
  focal: string;
  focalMobile: string;
  /** Tailwind gradient stops for the legibility scrim over the photo. */
  scrim: string;
};

export type Chapter = {
  id: string;
  day: string;
  index: string;
  title: string;
  /** Split across two lines in the big display type. */
  titleLines: [string, string];
  /** The one cinematic line. Set in the serif italic, always.  */
  tagline: string;
  /** Two or three short lines. Never a paragraph. */
  body: string[];
  /** Handwritten margin note. */
  note: string;
  /** The scene this chapter is set in. */
  scene: Scene;
  /** Small labelled details laid into the scene — dress code, running order. */
  details: { k: string; v: string }[];
  /**
   * An ordered narrative, for a chapter with more to tell than `body` fits.
   * Optional — most chapters don't set it and read `body` instead. A "beat"
   * is either a plain paragraph or a `moment`: a specific memorable line
   * (a cinematic reference, a quoted exchange) that earns heavier visual
   * treatment than the surrounding prose. Currently only White Flamingo uses
   * this; the other three chapters are untouched by adding it.
   */
  story?: ({ kind: "p"; text: string } | { kind: "moment"; line: string; reply?: string })[];
};

/**
 * Four chapters, one story: strangers → a crew → a blur → a group chat that
 * won't die. Each renders through its OWN component with its own visual world
 * (see components/goa/) — they are deliberately not four passes of one
 * template. What they share is this shape, so the copy stays comparable.
 */
export const chapters: Chapter[] = [
  {
    id: "bollywood",
    day: "FRIDAY",
    index: "01",
    title: "BOLLYWOOD AFTER DARK",
    titleLines: ["BOLLYWOOD", "AFTER DARK"],
    // Cut from two clauses to one. The old version explained the whole day
    // before the day had started; the details row below already does that.
    tagline: "First day energy. By night, everyone's got an alter ego.",
    body: [
      "Check in, meet the crew, explore, eat. Then dinner, glam, music — and a night with no intention of ending early.",
    ],
    // Replaces "the awkward part lasts about an hour." — that line leaned on
    // the awkward-strangers beat the rest of the page moved away from (it had
    // been flagged twice). This is the site owner's own wording from the
    // earlier draft of this chapter, so nothing new is invented.
    note: "nobody's shy by the second round.",
    // Two halves, not three boxes. THE LOOK moved out to a stamp (see
    // `bollywoodLook`) — it's the dress code, and the dress code is this
    // chapter's signature, so it reads as a stamp rather than a labelled box.
    details: [
      { k: "THE DAY", v: "Check-in. Settle in. Explore. Dinner." },
      { k: "THE NIGHT", v: "Bollywood glam. Music. Out late." },
    ],
    scene: {
      video: null,
      poster: "/photos/goa/chapters/bollywood.jpg",
      alt: "A club interior washed deep red, a crowd in silhouette facing bright vertical stage lights",
      focal: "50% 45%",
      focalMobile: "58% 40%",
      // Darkest at the bottom, where the title and details sit.
      scrim:
        "linear-gradient(180deg, rgba(10,2,10,0.62) 0%, rgba(10,2,10,0.30) 30%, rgba(10,2,10,0.68) 72%, rgba(8,2,8,0.94) 100%)",
    },
  },
  {
    id: "flamingo",
    day: "SATURDAY",
    index: "02",
    title: "WHITE FLAMINGO",
    titleLines: ["WHITE", "FLAMINGO"],
    // The whole day in one line. Saturday is the signature chapter, so it
    // gets the shortest copy of the four, not the longest — the earlier
    // version ran to eight prose beats and read as an itinerary.
    tagline: "Slow morning. Iconic Goa. Then everything goes white.",
    // Unused — this chapter reads `story` and `details` below.
    body: ["Slow morning, Chapora Fort, café hopping, then sunset offshore in all white."],
    // ONE moment, kept because it's the culture-specific beat nothing else on
    // the page has. The "Same time next year? / Obviously." exchange that used
    // to sit here was cut: The Hangover Club now closes the whole trip on
    // "Same people next time? / Obviously.", and the same punchline landing
    // twice made neither of them hit.
    story: [{ kind: "moment", line: "Chapora Fort. Our own Dil Chahta Hai moment — obviously." }],
    note: "Yes, everyone's in white. Yes, it photographs exactly like that.",
    // Two halves, not a seven-stop chain — the day splits cleanly at the
    // point everyone changes into white, and that split is this chapter's
    // own composition (see components/goa/ChapterFlamingo.tsx).
    details: [
      { k: "THE DAY", v: "Breakfast. Pool. Chapora Fort. Café hopping." },
      { k: "THE NIGHT", v: "Sunset yacht. Thalassa. Purple Martini. Whatever comes after." },
    ],
    scene: {
      video: null,
      poster: "/photos/goa/chapters/flamingo.jpg",
      alt: "A white ship's deck curving away, teak floor and rails, open sea and a coral sunset beyond",
      focal: "62% 50%",
      focalMobile: "72% 52%",
      // The lightest scrim of the four — this scene has to keep its air.
      scrim:
        "linear-gradient(180deg, rgba(14,6,22,0.42) 0%, rgba(14,6,22,0.12) 34%, rgba(20,8,26,0.52) 74%, rgba(16,6,22,0.86) 100%)",
    },
  },
  {
    id: "lost",
    day: "SUNDAY",
    index: "03",
    title: "LOST IN GOA",
    titleLines: ["LOST", "IN GOA"],
    tagline: "No dress code. No rush. Just follow the road.",
    // Unused — this chapter reads `story` below.
    body: ["Open jeeps, the coast road, and nowhere in particular to be on time."],
    // Down from five beats to two. The place-name run that used to sit here
    // ("Cabo de Rama. Cola. Palolem…") was cut because THE ROUTE strip below
    // already IS that list — printing it twice was most of why this chapter
    // ran to 169% of the viewport while its neighbours sat near 100%.
    story: [
      {
        kind: "p",
        text: "We head south. We stop wherever looks good, and keep finding places we weren't planning to find.",
      },
      { kind: "moment", line: "Somebody says let's just drive.", reply: "Nobody argues." },
    ],
    note: "That's kind of the point.",
    // No details row and no dress-code stamp, on purpose: the tagline already
    // says "No dress code", and this is the one chapter whose character is
    // that nothing is prescribed. THE ROUTE is its signature instead.
    details: [],
    scene: {
      video: null,
      poster: "/photos/goa/chapters/lost.jpg",
      alt: "The view through a windscreen driving down a palm-lined coastal road, ocean to the left",
      focal: "50% 58%",
      focalMobile: "52% 62%",
      scrim:
        "linear-gradient(180deg, rgba(8,20,26,0.50) 0%, rgba(8,20,26,0.14) 30%, rgba(10,16,24,0.60) 70%, rgba(10,12,20,0.92) 100%)",
    },
  },
  {
    id: "hangover",
    day: "MONDAY",
    index: "04",
    title: "THE HANGOVER CLUB",
    titleLines: ["THE HANGOVER", "CLUB"],
    tagline: "Nobody's ready to leave.",
    body: [
      "Coffee. Pool. Beach air. Brunch. One last slow morning before reality starts calling.",
      "After three days of doing the absolute most, Monday is deliberately easy.",
      "No alarms. No rushing. Just twenty people soaking up the last few hours of Goa together.",
    ],
    // The two closing exchanges — "leaving.", then "same people next time? /
    // obviously." — same moment/reply pattern as White Flamingo and Lost in
    // Goa, rendered after the details grid and before the taped closing note.
    story: [
      { kind: "moment", line: "And then comes the part nobody really planned for:", reply: "Leaving." },
      { kind: "moment", line: "Same people next time?", reply: "Obviously." },
    ],
    // Replaces "you came alone. that's over now." — that line was a callback
    // to the hero's old "Come alone. Leave with 19 others.", which was
    // rewritten to drop the strangers framing (see the note in FinalBeat.tsx).
    // This couplet was in the new copy and needs no callback to stand on its
    // own, so it resolves that flagged loose end as a side effect.
    note: "You came for the trip. You leave with a story.",
    details: [
      { k: "SLOW MORNING", v: "Coffee → Pool → Beach → Brunch → One last hang" },
      {
        k: "ONE LAST THING",
        v: "We saved one more surprise. Not everything needs to be on the itinerary. Some things are better discovered when everyone's already there.",
      },
    ],
    scene: {
      video: null,
      poster: "/photos/goa/chapters/hangover.jpg",
      alt: "Empty poolside loungers in warm hazy light, palms overhead and the sea beyond",
      focal: "50% 55%",
      focalMobile: "46% 58%",
      scrim:
        "linear-gradient(180deg, rgba(26,13,10,0.44) 0%, rgba(26,13,10,0.14) 32%, rgba(24,12,14,0.56) 72%, rgba(18,8,14,0.90) 100%)",
    },
  },
];

/**
 * THE ROLE CALL — Friday's ice-breaker, and the most repeatable format idea in
 * the trip. Playful Bollywood archetypes, drawn as casting cards. Deliberately
 * NOT explained on the page beyond the cards themselves.
 */
/**
 * THE STAMPED DRESS CODE — the one device shared across the chapters.
 *
 * Each night that HAS a dress code stamps it, rather than filing it in a
 * labelled box: it's the most repeatable, most screenshot-able fact about
 * that night, and a stamp is the loudest small element in the design system.
 *
 * Lost in Goa deliberately has none — its whole point is that Sunday has no
 * dress code, and its tagline already says so. Absence is the joke; stamping
 * "NO DRESS CODE" would have flattened it into just another label.
 *
 * The stamp is shared vocabulary, NOT a shared layout: each chapter still
 * places it inside its own composition (Bollywood low-left with the role
 * cards, Flamingo centred on the day/night seam).
 */
export const flamingoLook = {
  stamp: "ALL WHITE",
  line: "One dress code. One very good excuse to overdress.",
} as const;

export const bollywoodLook = {
  stamp: "BOLLYWOOD GLAM",
  line: "No rules. Just make an entrance.",
} as const;

export const roleCall = {
  title: "BRING YOUR ALTER EGO",
  // Replaces the old "Everyone draws a character. Nobody gets to pick." —
  // that line implied a mandatory, randomly-assigned character, which this
  // rewrite explicitly asked to remove. This is purely optional/inspirational.
  sub: "Whatever your Bollywood looks like, tonight's the night to bring it out.",
  roles: ["THE SRK", "THE KAREENA", "THE RANVEER", "THE VILLAIN", "THE HEARTBREAK HERO", "THE ITEM SONG"],
  note: "you do not get to swap.",
} as const;

/** LOST IN GOA renders as an actual route rather than a list. */
export const route = [
  "JEEP",
  "CABO DE RAMA",
  "WATERFALL",
  "COLA",
  "PALOLEM / AGONDA",
  "SHACK",
  "SUNSET",
] as const;

/**
 * THE NIGHT — Lost in Goa's closing beat, unplanned on purpose. Standalone
 * const, the same way `roleCall` is Bollywood's own extra block.
 *
 * Compressed from nine stacked lines (a three-line intro, four questions on
 * their own rows, a resolve line) to two. The options now run as one line
 * because that IS the point — they're a shrug, not a menu, and stacking them
 * gave four throwaway phrases the same vertical weight as the day itself.
 */
export const theNight = {
  label: "THE NIGHT",
  options: "Shack? Beach party? Club hopping? Somewhere nobody expected?",
  resolve: "We haven't planned it. The group decides.",
} as const;

/* ------------------------------------------------------------------ */
/* the home base                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE HOME BASE — where the cast sleeps between the chapters.
 *
 * ─── WHAT THIS SECTION IS NOT ───────────────────────────────────────────────
 * It is NOT a property reveal. The accommodation is chosen from several
 * handpicked Goa properties depending on availability, so nothing here may
 * imply that a specific building is guaranteed. The photographs are a
 * STANDARD, not a booking — which is why `disclaimer` is mandatory copy and
 * renders directly under the collage rather than in a footnote.
 *
 * ─── THE ANNOTATIONS ────────────────────────────────────────────────────────
 * Deliberately about taste and standard, never about amenities. With
 * properties still being selected there is no amenity that can honestly be
 * promised "across" them, so the notes are Plot Twist commentary — the same
 * red-pen voice as the casting board — and not a facilities list.
 *
 * ─── THE SLOTS ──────────────────────────────────────────────────────────────
 * Four slots, each with a fixed compositional role. The section renders only
 * the ones with a `src` and re-composes itself around however many exist, so
 * adding a photo is a one-line change and never breaks the layout. See
 * public/photos/goa/homebase/PHOTOS.md for what is still missing.
 */
export type HomeBaseShot = {
  id: string;
  /** null = slot declared, photo not supplied yet. Renders nothing. */
  src: string | null;
  alt: string;
  /** Handwritten scrap on the print. */
  note: string;
  /**
   * The print's own crop. Per-shot rather than fixed, because a portrait
   * frame forced into a landscape print loses its subject — and because a
   * board of identically-shaped prints stops reading as a pile of
   * photographs and starts reading as a grid of cards.
   */
  aspect: string;
};

export const homeBase = {
  index: goaIndex("homeBase"),
  label: "THE HOME BASE",
  headline: ["THE", "HOME BASE"],
  sub: "Because even main characters need somewhere to wake up.",
  /** The one strong statement under the collage. */
  statement: "WHEREVER WE STAY, IT HAS TO PASS THE VIBE CHECK.",
  /** Mandatory. Understated, never hidden. */
  disclaimer:
    "Properties shown are representative. Your stay will be at one of our handpicked Goa properties, subject to availability.",
  stamp: "HANDPICKED · SUBJECT TO AVAILABILITY",
  /** Commentary, not a facilities list — see the note above. */
  annotations: [
    "vibe check? passed.",
    "if we wouldn't stay, neither are you.",
    "the 4am conversations happen here.",
  ],
  /**
   * Four properties, four different kinds of space and four different times of
   * day — chosen as a set so the board reads as a STANDARD across places
   * rather than as one hotel shot from four angles. Two aerials, one exterior
   * and one from inside a room; one of them portrait, so the prints don't all
   * come out the same shape.
   */
  shots: [
    {
      id: "one",
      src: "/photos/goa/homebase/property-01.jpg",
      alt: "A property seen from directly above at night, lit pathways winding between red-tiled roofs, palms and a floodlit pool",
      note: "somewhere to come back to.",
      aspect: "1039 / 748",
    },
    {
      id: "two",
      src: "/photos/goa/homebase/property-02.jpg",
      alt: "An open wooden door onto a balcony, palms and the sea beyond, the beach below",
      note: "the view, most mornings.",
      aspect: "816 / 1020",
    },
    {
      id: "three",
      src: "/photos/goa/homebase/property-03.jpg",
      alt: "A terraced beachfront guesthouse among palms, seen from the sand with parasols and loungers in front",
      note: "straight onto the sand.",
      aspect: "1360 / 1020",
    },
    {
      id: "four",
      src: "/photos/goa/homebase/property-04.jpg",
      alt: "An aerial view of a headland settlement above a beach, huts along the slope and surf breaking on the rocks",
      note: "the whole neighbourhood.",
      aspect: "1027 / 753",
    },
  ] as HomeBaseShot[],
} as const;
/* ------------------------------------------------------------------ */
/* the facts                                                           */
/* ------------------------------------------------------------------ */

/**
 * THE PRICE.
 *
 * `confirmed: false` because no price exists anywhere in this project — not in
 * content/site.ts (pricing.revealed is false, amount is ""), not in the terms
 * page, which states outright that price and cancellation aren't final.
 *
 * CONFIRMED 4 SEPTEMBER 2026. The price is public — it is on the Journey 00
 * performance creative — so the site states it rather than deferring to a DM.
 * It is a FROM price and is labelled as one.
 *
 * THE REWARD POOL STILL HAS TO MAKE SENSE AGAINST IT. content/rewards.ts
 * promises ₹1,000 / ₹2,500 / ₹5,000 off and those emails are already going
 * out. Against ₹14,999 the top reward is a third off, taking a seat to
 * ₹9,999. That is survivable at its 1-4% draw rate, but it is a real
 * commitment to anyone holding one and should be a deliberate decision rather
 * than an inherited default.
 */
export const price = {
  confirmed: true,
  amount: "FROM ₹14,999 / PERSON",
  note: "Flights, alcohol and personal spends aren't in it.",
  pending: "ANNOUNCED SOON",
  pendingNote: "Ask us for the number before it's public.",
} as const;

/**
 * INCLUSIONS / EXCLUSIONS.
 *
 * CONFIRMED 4 SEPTEMBER 2026, and deliberately explicit on both sides. Open
 * jeeps are listed under NOT INCLUDED rather than omitted: they appear in the
 * Journey 00 story and content, so a reader could reasonably assume they are
 * covered. Naming them costs one line and prevents a dispute on the trip.
 */
export const inclusions = {
  confirmed: true,
  included: [
    "3 nights at 4-star properties",
    "Breakfast every day",
    "One hosted lunch",
    "White Flamingo yacht party",
    "Bollywood After Dark",
    "Club hopping",
    "South Goa, all day",
    "Chapora Fort",
    "Waterfall experiences",
    "Beach experiences",
    "Café hopping",
    "Local trip transfers",
    "Plot Twist hosts throughout",
    "Spontaneous moments and surprises",
  ] as string[],
  excluded: [
    "Flights",
    "Alcohol and personal drinks",
    "Shopping and personal expenses",
    "Additional meals",
    "Optional add-ons, including open jeeps",
    "Independent rentals",
    "Travel insurance where desired or required",
  ] as string[],
  pending: "We're finalising the full included / not-included list. Ask us and we'll send it.",
} as const;

export const facts = {
  index: goaIndex("facts"),
  label: "THE CALL SHEET",
  headline: ["THE BORING PAGE", "OF THE SCRIPT."],
  annotation: "every page needs one.",
  /**
   * THE SIX BASICS — a compact grid, not a stack of full-width rows.
   *
   * These used to run as seven stacked rows plus a price row: eight rows at
   * ~56px each, which was most of this section's height. Six short facts in a
   * grid say exactly the same thing in two rows instead of six.
   */
  basics: [
    { k: "WHERE", v: "Goa" },
    { k: "WHEN", v: "October 2026" },
    { k: "HOW LONG", v: "4 days · 3 nights" },
    { k: "THE CAST", v: "20 people" },
    { k: "THE SPLIT", v: "10 girls + 10 guys" },
    { k: "AGES", v: "18–30" },
  ],
  /**
   * The two facts that carry weight rather than just data — pulled out of the
   * grid as callouts, because "a person reads this" and "here's the money"
   * are the two lines someone actually decides on.
   */
  selection: { k: "SELECTION", v: "Curated. Every application is read by a real person." },
  /** Was derived from a brittle `rows[6]` index lookup. Stated plainly instead. */
  stamp: "EVERY APPLICATION READ BY A HUMAN",
  cta: "ASK US ANYTHING →",
  price,
  inclusions,
} as const;

/* ------------------------------------------------------------------ */
/* the fine print + behind the plot                                    */
/* ------------------------------------------------------------------ */

/**
 * THE FINE PRINT — the last reassurance before the ask.
 *
 * ─── WHERE THESE CLAIMS COME FROM ───────────────────────────────────────────
 * Every pillar below is either a restatement of something this page already
 * shows, or one of the four commitments already written and vetted in
 * `trust.safety` in content/site.ts — which this section replaces on the
 * reveal page. Nothing here is new marketing.
 *
 * NOTHING INVENTED. No testimonials, traveller counts, ratings, press,
 * application numbers or awards, because none of that exists yet. At this
 * stage the trust is: a real founder, a real process, and saying plainly what
 * is and isn't decided. After Journey 00 runs, this is the section that earns
 * real participant stories.
 *
 * On CLEAR DETAILS specifically: the price is NOT yet published (see
 * `facts.price`). The pillar is therefore worded as a promise about WHEN you
 * will know — which is true and matches trust.safety's "trip details are
 * shared clearly before anyone travels" — and never as a claim that the
 * number is already on the page.
 */
export const finePrint = {
  index: goaIndex("finePrint"),
  label: "THE FINE PRINT",
  headline: ["THE FINE", "PRINT"],
  sub: "Because “trust us bro” isn’t a travel policy.",
  pillars: [
    {
      k: "CURATED PEOPLE",
      v: "20 isn’t a random number. A real person reads every application — that’s also why it isn’t instant.",
      accent: "#FF4F87",
    },
    {
      k: "HANDPICKED STAYS",
      v: "Whichever property availability lands on, it has to pass the same vibe check.",
      accent: "#00A9C7",
    },
    {
      k: "CLEAR DETAILS",
      v: "The mystery is the entertainment, not the invoice. You’ll know the number, and what’s in and out, before you commit.",
      accent: "#FF7A3D",
    },
    {
      k: "SOMEONE TO CALL",
      v: "Shortlisted means a real conversation first — then a direct contact for the whole trip, not just up to the booking.",
      accent: "#36C96F",
    },
  ],
} as const;

/**
 * BEHIND THE PLOT — the founder note.
 *
 * Written to sound like a traveller talking, not a founder writing an About
 * page. The only facts used are the ones supplied: seven-plus countries, solo
 * trips, group trips hosted, food, late nights. No dates, no company history,
 * no credentials — none were given and none are invented.
 *
 * `photo` is null: there is no founder photograph in this project yet. The
 * block is written to work as a signed handwritten note WITHOUT one, so it
 * reads as finished rather than as a section with a hole in it. Drop a file in
 * /photos/founder/ and set `photo` + `alt`; the polaroid appears beside the
 * note and the layout re-balances. See components/goa/TheFinePrint.tsx.
 */
export const founder = {
  eyebrow: "BEHIND THE PLOT",
  greeting: "Hi, I’m Akshat.",
  /**
   * The note is broken into beats rather than paragraphs so the composition
   * can breathe between them — the pivot line ("the best part was almost
   * never the place") is set apart on its own, because it's the sentence the
   * whole company is built on.
   */
  opening: "I’ve always been the kind of person who’d rather take the trip than talk about taking it.",
  story: [
    "Seven-plus countries, solo trips, group trips, too many late nights, far too much good food — and somewhere along the way, I realised something:",
  ],
  /** The pivot. Set larger and on its own line. */
  pivot: "the best part of travelling was almost never the place.",
  after: [
    "It was the people you met, the plans that changed, the stories that came out of nowhere, and those random moments you still talk about years later.",
    "That’s why I built Plot Twist. To make trips that feel less like a holiday you booked, and more like a story you got to be part of.",
  ],
  kicker: "And hopefully, a few of those stories become the ones you keep talking about long after you’re home.",
  signature: "— Akshat",
  role: "Founder, Plot Twist",
  /**
   * Three, not four. "FOOD MOTIVATED" was dropped so the marks stay an aside
   * rather than a badge row — the brief asked for these to be used
   * selectively so the section doesn't feel cluttered.
   */
  marks: ["7+ COUNTRIES", "TRIP HOST", "TRAVELLER BY HEART"],
  /**
   * THE SCRAPBOOK MOMENTS — real photographs, supplied by the founder.
   *
   * Deliberately small and scattered, one per beat of the note: a street
   * abroad beside the opening, a city at night beside the travel line, water
   * beside the signature. Day / night / water, so three small prints don't
   * read as three of the same picture.
   *
   * Five were supplied; three are used. Kept out: a shirtless beach frame
   * (visible third-party underwear branding, and this is the section whose
   * job is credibility) and a theme-park castle. Both are in Downloads if
   * you'd rather swap one in — it's one line each.
   */
  photos: [
    {
      src: "/photos/founder/founder-01.jpg",
      alt: "Akshat walking down a tree-lined street in Hanoi in the late afternoon",
      note: "hanoi, no plan.",
      aspect: "3 / 4",
    },
    {
      src: "/photos/founder/founder-02.jpg",
      alt: "Akshat on a city street at night, the Petronas Towers lit up behind him",
      note: "kuala lumpur, 1am.",
      aspect: "3 / 4",
    },
    {
      src: "/photos/founder/founder-03.jpg",
      alt: "Akshat sitting on the bow of a longtail boat in turquoise water below limestone cliffs",
      note: "worth the boat.",
      aspect: "4 / 5",
    },
  ],
} as const;

/**
 * HOW IT ACTUALLY WORKS — three steps, one thin row.
 *
 * Exists so REQUEST YOUR INVITE reads as entry to a process rather than a
 * decorated Buy Now. Kept to a single line of copy per step: the brief was
 * explicit that if this makes the section big, the founder and the pillars
 * win instead.
 */
export const howItWorks = {
  eyebrow: "AND THEN WHAT HAPPENS",
  steps: [
    { n: "01", t: "REQUEST YOUR INVITE", d: "Under five minutes. Be honest — it’s more interesting." },
    { n: "02", t: "GET SELECTED", d: "A real person reads it. Shortlisted means a real conversation." },
    { n: "03", t: "GET ON THE PLOT", d: "Goa. October 2026. Nineteen strangers." },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* the final beat                                                      */
/* ------------------------------------------------------------------ */

export const finalBeat = {
  /** Closes the loop the hero opened — "Come alone. Leave with 19 others." */
  big: ["YOU CAME FOR GOA.", "YOU'LL LEAVE WITH 19 PEOPLE."],
  body: "The destination was never the hard part to get right.",
  seats: "TWENTY SEATS. YOU WANT ONE.",
  cta: { label: "REQUEST YOUR INVITE", href: "#apply" },
  note: "not everyone gets one.",
} as const;

/* ------------------------------------------------------------------ */
/* the glimpses                                                        */
/* ------------------------------------------------------------------ */

/**
 * FIVE SMALL LOOPING GLIMPSES — the "the page is alive" layer.
 *
 * There is no Journey 00 footage yet, and this file will not pretend there is.
 * Every entry below therefore ships with `video: null` and renders its POSTER
 * PHOTO instead — a real, licensed Goa still from public/photos/goa/, framed
 * in the same tape-and-grain scrapbook treatment a clip would get. The page
 * looks complete and claims nothing false.
 *
 * TO ACTIVATE: drop a short muted loop at the `video` path and set the field.
 * The component upgrades from photo to video with no other change.
 *
 * WHEN YOU DO: mood footage is fine, but it must not be captioned or credited
 * in a way that implies it was shot on Journey 00. Once the real trip happens,
 * replace these with actual footage and the question disappears.
 */
export type Glimpse = {
  id: string;
  /** Path under /videos/goa/. null until real footage exists. */
  video: string | null;
  poster: string;
  alt: string;
  /** Handwritten scrap taped to the frame. */
  note: string;
};

/**
 * Only one glimpse remains — the closing scrap beside the final CTA.
 *
 * The four chapter glimpses that used to live here are gone: the chapters are
 * now full-bleed scenes (see `chapters[].scene`), so a small taped photo
 * inside one would be a picture of the place you are already standing in.
 */
export const glimpses: Record<string, Glimpse> = {
  closing: {
    id: "closing",
    video: null,
    poster: "/photos/goa/people.jpg",
    alt: "A large group of friends crowded together by a pool at night, laughing and celebrating",
    note: "19 of them.",
  },
};
