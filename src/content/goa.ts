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
  "plotTwists",
  "difference",
  "facts",
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

export const goaHero = {
  /** The destination, stated flat, in the highest-attention slot on the site. */
  eyebrow: `${GOA.destination} · ${GOA.when}`,
  line1: "You've found",
  line2: "the plot.",
  sub: "20 people who haven't met yet. Four days in Goa. One plot.",
  support: "Come alone. Leave with 19 others.",
  /** The four-fact strip under the headline — the whole offer, before a scroll. */
  facts: [GOA.cast, GOA.days, GOA.split, `AGES ${GOA.ages}`],
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
  big: ["YOU COULD", "JUST GO TO GOA.", "OR YOU COULD DO THIS."],
  body: [
    "Anyone can book a flight and a room.",
    "We cast twenty people, put them in the same four days, and let the rest happen.",
    "Ten girls. Ten guys. Every one of them picked.",
  ],
  /** The objection, killed early — the full version of this lands in THE DIFFERENCE. */
  kicker: "You can book Goa. You can't book the nineteen people you're about to meet.",
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
  split: {
    title: "10 AND 10.",
    body: "Twenty people. Not a ratio — a room that works.",
    /** Said once. Never explained, never repeated — explaining it makes it louder. */
    disclaimer: "This isn't that kind of show.",
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
    tagline: "Everyone arrives as themselves. By dinner, everyone's got a character.",
    body: [
      "Twenty strangers, one dress code, and a room that stops being quiet almost immediately.",
    ],
    note: "the awkward part lasts about an hour.",
    details: [
      { k: "DRESS CODE", v: "Bollywood / Indian glam" },
      { k: "THE NIGHT", v: "Dinner → Character reveal → Out" },
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
    tagline: "All white. All day. The party left the shore.",
    body: ["One dress code. One direction — out. It doesn't come back until the sun does."],
    note: "yes, everyone's in white. yes, it photographs exactly like that.",
    details: [
      { k: "DRESS CODE", v: "All white" },
      { k: "THE PLOT", v: "Cruise → Water → Sunset → Party" },
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
    body: ["Somebody says let's just drive. Nobody argues. You get back when you get back."],
    note: "this is the day everyone talks about after.",
    details: [
      { k: "DRESS CODE", v: "None. Genuinely." },
      { k: "THE ROUTE", v: "Jeep → Waterfall → Beach → Shack → Sunset" },
    ],
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
    body: ["Coffee, the pool, and twenty people reconstructing a weekend nobody fully remembers."],
    note: "you came alone. that's over now.",
    details: [
      { k: "SLOW MORNING", v: "Coffee · Pool · Brunch" },
      { k: "ONE LAST THING", v: "Not on the itinerary" },
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
export const roleCall = {
  title: "THE ROLE CALL",
  sub: "Everyone draws a character. Nobody gets to pick.",
  roles: ["THE SRK", "THE KAREENA", "THE RANVEER", "THE VILLAIN", "THE HEARTBREAK HERO", "THE ITEM SONG"],
  note: "you do not get to swap.",
} as const;

/** LOST IN GOA renders as an actual route rather than a list. */
export const route = ["THE ROAD", "THE WATERFALL", "THE BEACH", "THE SHACK", "THE SUNSET"] as const;

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
/* the plot twists                                                     */
/* ------------------------------------------------------------------ */

export const plotTwists = {
  index: goaIndex("plotTwists"),
  label: "THE PLOT TWISTS",
  headline: ["SOME THINGS ARE ON THE ITINERARY.", "SOME THINGS ARE BETTER LEFT OFF IT."],
  /** Everything confirmed, listed plainly. Transparency is the point. */
  onIt: [
    "Bollywood night",
    "The White Flamingo cruise",
    "Fire on the sand",
    "Open jeeps",
    "Waterfalls",
    "Beach shacks",
    "Sunsets, every night",
    "Goa after midnight",
  ],
  /** The kept mystery — about WHAT happens, never about where. Never hinted at. */
  offIt: {
    title: "ONE LAST THING.",
    body: "It's in the four days. It isn't on this page.",
    note: "you'll find out when everyone else does.",
    /** Rendered as a redacted bar — the case-file vocabulary, reused. */
    redacted: "████████ ███████ ██████",
  },
} as const;

/* ------------------------------------------------------------------ */
/* the difference                                                      */
/* ------------------------------------------------------------------ */

export const difference = {
  index: goaIndex("difference"),
  label: "THE DIFFERENCE",
  /** The best line on the site. Unchanged, and now the thesis rather than an aside. */
  big: ["WE PLANNED THE TRIP.", "NOT THE PEOPLE."],
  bookable: ["You can book the flight.", "You can book the room.", "You can book the boat."],
  unbookable: "You can't book the nineteen people.",
  body: "We plan the destination. We plan the parties. We can't plan who you're friends with by 2AM, or the story you'll tell after.",
  signature: "DO IT FOR THE PLOT.",
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
 * A plausible-looking number here would be an invented commitment on a page
 * that asks for a phone number, so the row renders `pending` instead and
 * points at WhatsApp. Set `confirmed: true` and fill `amount` when it's real.
 *
 * NOTE FOR WHOEVER SETS IT: the reward pool already promises ₹1,000 / ₹2,500 /
 * ₹5,000 off (content/rewards.ts) and those emails are already going out. The
 * price has to make those discounts sane.
 */
export const price = {
  confirmed: false,
  amount: "",
  note: "",
  pending: "ANNOUNCED SOON",
  pendingNote: "Ask us for the number before it's public.",
} as const;

/**
 * INCLUSIONS / EXCLUSIONS.
 *
 * Same rule as the price: nothing is recorded in this project, so nothing is
 * listed. Populate both arrays and flip `confirmed` — the section renders the
 * two columns automatically and hides the placeholder.
 */
export const inclusions = {
  confirmed: false,
  included: [] as string[],
  excluded: [] as string[],
  pending: "The full included / not-included list is being finalised. Ask us and we'll send it.",
} as const;

export const facts = {
  index: goaIndex("facts"),
  label: "THE CALL SHEET",
  headline: ["THE BORING PAGE", "OF THE SCRIPT."],
  annotation: "every page needs one.",
  /** Only confirmed values. */
  rows: [
    { k: "WHERE", v: "Goa" },
    { k: "WHEN", v: "October 2026" },
    { k: "HOW LONG", v: "4 days" },
    { k: "THE CAST", v: "20 people" },
    { k: "THE SPLIT", v: "10 girls + 10 guys" },
    { k: "AGES", v: "18–30" },
    { k: "SELECTION", v: "Curated. Every application read by a real person." },
  ],
  price,
  inclusions,
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
