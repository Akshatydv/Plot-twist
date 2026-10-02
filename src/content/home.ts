/**
 * THE BRAND HOMEPAGE — every word and every media slot on it.
 *
 * Edit here, not in components/home/. Same contract as content/site.ts.
 *
 * ─── WHAT THIS PAGE IS ──────────────────────────────────────────────────────
 * The journey pages are the individual stories. This is the trailer for all
 * of them: land, understand, feel, discover, trust, imagine, act.
 *
 * ─── THE HONESTY RULES (same as everywhere else in this repo) ───────────────
 * 1. No invented numbers. A stat with `value: null` is not rendered at all —
 *    a placeholder shown to a live visitor reads as broken, not mysterious.
 * 2. No invented testimonials. `voices` is empty until real travellers say
 *    real things; the wall labels itself a moodboard until then.
 * 3. Stock photography is never captioned as a Plot Twist trip. See `wall`.
 * 4. Trip facts (dates, prices, durations) are NOT retyped here. They are
 *    read from content/goa.ts and content/thailand.ts in content/homeWorlds.ts
 *    so the homepage can never disagree with the journey page it links to.
 */

/* ------------------------------------------------------------------ */
/* media — the one place a file path is swapped                        */
/* ------------------------------------------------------------------ */

import { trust as siteTrust } from "@/content/site";

/**
 * One cut in a reel. A still gets a slow push-in; a video plays muted.
 * `caption` is a moment, never a place name — none of this footage is from a
 * Plot Twist trip yet, and a caption must not imply it is.
 */
export type ReelCut = {
  kind: "image" | "video";
  src: string;
  /** Required for video: the frame shown before and instead of it. */
  poster?: string;
  /** CSS object-position, wide screens. */
  focal?: string;
  /** CSS object-position, phones. Falls back to `focal`. */
  focalMobile?: string;
  caption?: string;
};

/**
 * A MEDIA SLOT.
 *
 * `video` wins when set. Until then — or when it fails to load, or the
 * visitor prefers reduced motion — the slot plays `reel`: a cut-together
 * sequence of stills (and optionally short clips) with cinematic push-ins.
 * `poster` is what paints first, and is the LCP element for the hero.
 *
 * TO DROP IN REAL FOOTAGE: set `video.src` (and `video.srcMobile` for a
 * portrait 9:16 cut — phones get it below 768px). Nothing else changes.
 * Keep clips short (8–20s), muted, H.264 + faststart, ≤ 6 MB desktop /
 * ≤ 3 MB mobile.
 */
export type MediaSlot = {
  video: { src: string; srcMobile?: string } | null;
  poster: string;
  reel: ReelCut[];
  /** Milliseconds each still holds before the cut. */
  hold?: number;
};

/** Every photograph on this page lives in /public/photos/home — see PHOTOS.md there for licence and credits. */
const H = (name: string) => `/photos/home/${name}.jpg`;

export const MEDIA = {
  /**
   * THE HERO — one clip, not a montage.
   *
   * A drone gliding over still water toward a low gold sun: sea and sky fill
   * the frame, no people, no landmark, just arriving somewhere. Pexels,
   * trimmed and looped — see public/videos/home/VIDEOS.md. Phones get a true
   * 9:16 portrait cut.
   *
   * `reel` is a single still — the clip's own poster frame — so reduced
   * motion, a failed load and the first paint all show the same picture.
   */
  HERO_VIDEO: {
    video: { src: "/videos/home/hero-sea.mp4", srcMobile: "/videos/home/hero-sea-mobile.mp4" },
    poster: "/videos/home/hero-sea-poster.jpg",
    // The portrait cut is centred on the sun, so the poster is too — on a
    // phone it lines up with the video under it.
    reel: [{ kind: "image", src: "/videos/home/hero-sea-poster.jpg", focal: "50% 50%" }],
  },
  /**
   * THE WORLDS — real places only. Every photograph in the four journey worlds
   * was matched against the location Unsplash records for it, so a Goa frame is
   * a Goa place (Vagator, Aguada Fort, Butterfly Beach, Dudhsagar, Palolem)
   * and a Bir frame is Bir (see PHOTOS.md for the recorded location of each).
   * 3840px originals: these are full-bleed, and a phone at 3x needs them.
   *
   * Vasco da Gama was looked for by name and is not here on purpose — the only
   * free photographs of it are snapshots (a museum helicopter, a church), and a
   * weak frame in a full-bleed panel does more harm than a strong one nearby.
   */
  GOA_VIDEO: {
    video: null,
    poster: H("goa-vagator"),
    hold: 3400,
    reel: [
      { kind: "image", src: H("goa-vagator"), focal: "50% 50%" },
      { kind: "image", src: H("goa-aguada"), focal: "35% 45%" },
      { kind: "image", src: H("goa-palolem"), focal: "50% 55%" },
      { kind: "image", src: H("goa-butterfly"), focal: "50% 50%" },
      { kind: "image", src: H("goa-dudhsagar"), focal: "50% 45%" },
    ],
  },
  BIR_VIDEO: {
    video: null,
    poster: H("bir-billing"),
    hold: 3600,
    reel: [
      { kind: "image", src: H("bir-billing"), focal: "50% 40%" },
      { kind: "image", src: H("bir-hills"), focal: "50% 50%" },
      { kind: "image", src: H("bir-chokling"), focal: "50% 45%" },
      { kind: "image", src: H("bir-stupa"), focal: "30% 45%" },
      { kind: "image", src: H("bir-road"), focal: "50% 30%" },
    ],
  },
  /**
   * Phuket and Krabi at dusk, plus Old Phuket Town by night — the warm-to-violet
   * end of Thailand, which is also the Journey 02 page's own palette. Generic
   * scenery: never captioned as EDC footage.
   */
  THAILAND_VIDEO: {
    video: null,
    poster: H("thailand-kalim"),
    hold: 3000,
    reel: [
      { kind: "image", src: H("thailand-kalim"), focal: "50% 50%" },
      { kind: "image", src: H("thailand-dusk"), focal: "50% 50%" },
      { kind: "image", src: H("thailand-krabi"), focal: "50% 45%" },
      { kind: "image", src: H("thailand-oldtown"), focal: "45% 50%" },
    ],
  },
  /**
   * Sri Lanka, in itinerary order: Colombo → Ella → the Nine Arch Bridge →
   * Mirissa → the south coast at dusk. Every frame carries a recorded Sri Lankan
   * location (see PHOTOS.md). The train opens it because it is the one picture
   * that is unmistakably this island.
   */
  SRILANKA_VIDEO: {
    video: null,
    poster: H("srilanka-train"),
    hold: 3400,
    reel: [
      { kind: "image", src: H("srilanka-train"), focal: "50% 50%" },
      { kind: "image", src: H("srilanka-ella"), focal: "50% 40%" },
      { kind: "image", src: H("srilanka-colombo"), focal: "50% 45%" },
      { kind: "image", src: H("srilanka-mirissa"), focal: "50% 50%" },
      { kind: "image", src: H("srilanka-stilt"), focal: "45% 50%" },
      { kind: "image", src: H("srilanka-sunset"), focal: "50% 55%" },
    ],
  },
  COMMUNITY_VIDEO: {
    video: null,
    poster: H("calm-dunes"),
    reel: [{ kind: "image", src: H("calm-dunes"), focal: "50% 50%" }],
  },
  FINAL_CTA_VIDEO: {
    video: null,
    poster: H("end-sun"),
    hold: 4400,
    reel: [
      { kind: "image", src: H("end-sun"), focal: "50% 55%" },
      { kind: "image", src: H("end-dusk"), focal: "50% 55%" },
      { kind: "image", src: H("end-pink"), focal: "50% 60%" },
    ],
  },
} satisfies Record<string, MediaSlot>;

/* ------------------------------------------------------------------ */
/* meta + nav                                                          */
/**
 * THE MOMENTS WALL ("NOT A BROCHURE. A FEELING.") — HIDDEN, NOT DELETED.
 *
 * It is a wall of the club's own trip photographs, and it is switched off for
 * now. Nothing was removed: components/home/MomentsWall.tsx, the `wall` copy
 * and every trip-*.jpg are all still in the repo. Flip this to `true` and it
 * returns in the same slot, and the nav link below follows it back.
 */
export const SHOW_MOMENTS_WALL = false;

/* ------------------------------------------------------------------ */

export const homeMeta = {
  title: "Plot Twist — Travel Differently.",
  description: "Curated journeys for 20 people at a time. Goa, Bir × Barot, Thailand + EDC, Sri Lanka and whatever's next. Pick a plot.",
} as const;

export const nav = {
  links: [
    { label: "Journeys", href: "#journeys" },
    { label: "How It Works", href: "#how" },
    // With the wall hidden "#moments" does not exist, so this lands on the casting section — the
    // brand's own plot twist, that it does not take everyone — until the wall is back.
    { label: "The Plot Twist", href: SHOW_MOMENTS_WALL ? "#moments" : "#the-casting" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Explore Journeys", href: "#journeys" },
  menu: "MENU",
  close: "CLOSE",
} as const;

/* ------------------------------------------------------------------ */
/* 01 — the hero                                                       */
/* ------------------------------------------------------------------ */

export const homeHero = {
  /** The slate line above the wordmark — reads like a trailer card. */
  slate: "A PLOT TWIST PRODUCTION",
  wordmark: "PLOT TWIST",
  line: "Travel differently.",
  support: "Curated journeys. Unexpected people. Stories you'll actually remember.",
  primary: { label: "Explore Journeys", href: "#journeys" },
  secondary: { label: "What is Plot Twist?", href: "#about" },
  scrollCue: "SCROLL",
  /** The label over the row of trips in the hero. */
  pick: "WHERE TO?",
  /** The handwritten line beside REC. A moment, never a place. */
  caption: "keep going. it gets better.",
  /** Rotates under the wordmark, small, once the hero has settled. */
  alternates: ["Same world. Different plot.", "Go somewhere. Meet everyone.", "Your next story starts here."],
} as const;

/* ------------------------------------------------------------------ */
/* 02 — this isn't a trip                                              */
/* ------------------------------------------------------------------ */

export const notATour = {
  a: ["THIS ISN'T", "A TRIP."],
  b: ["IT'S A", "PLOT TWIST."],
  body: [
    "Plot Twist creates curated travel experiences where the destination is only half the story.",
    "The other half is the people, the unexpected moments, and everything that happens in between.",
  ],
  note: "you'll see.",
  /** The image the second line is cut out of. */
  image: H("twist-fill-sky"),
  reveal: H("twist-reveal-lake"),
} as const;

/* ------------------------------------------------------------------ */
/* 03 — choose your plot twist                                         */
/* ------------------------------------------------------------------ */

export const worldsIntro = {
  eyebrow: "THE JOURNEYS",
  headline: ["CHOOSE YOUR", "PLOT TWIST."],
  sub: "These aren't destinations. They're different worlds.",
  hint: "scroll to travel →",
  cursor: "ENTER",
  soonCursor: "SOON",
} as const;

/* ------------------------------------------------------------------ */
/* 04 — why plot twist                                                 */
/* ------------------------------------------------------------------ */

export const principles = {
  eyebrow: "WHY PLOT TWIST",
  headline: ["NOT A PACKAGE.", "A PREMISE."],
  items: [
    {
      n: "01",
      title: ["CURATED,", "NOT CROWDED."],
      accent: 1,
      body: "Nobody's getting thrown onto a bus with a hundred strangers. Twenty seats, cast on purpose.",
      image: H("calm-lake"),
      note: "room to breathe.",
    },
    {
      n: "02",
      title: ["THE PEOPLE ARE", "THE JOURNEY."],
      accent: 1,
      body: "You're not just visiting somewhere. You're meeting people who came looking for the same kind of story.",
      image: H("calm-dunes"),
      note: "worth meeting someone here.",
    },
    {
      n: "03",
      title: ["EXPERIENCES", "> ITINERARIES."],
      accent: 1,
      body: "An itinerary tells you where you'll be. A journey hands you stories you didn't see coming.",
      image: H("calm-falls"),
      note: "we didn't plan this bit.",
    },
    {
      n: "04",
      title: ["DESIGNED FROM", "SCRATCH."],
      accent: 1,
      body: "Every journey is built around its place. The nights, the stays, the detours — written as one story.",
      image: H("calm-tide"),
      note: "no templates.",
    },
    {
      n: "05",
      title: ["YOU JUST", "SHOW UP."],
      accent: 1,
      body: "We handle the whole experience. Your only job is to be there for it.",
      image: H("calm-bay"),
      note: "seriously. just show up.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 05 — how a plot twist works                                         */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  eyebrow: "HOW A PLOT TWIST WORKS",
  headline: ["FOUR STOPS.", "ONE STORY."],
  steps: [
    { n: "01", code: "DEP", title: "FIND YOUR JOURNEY", body: "Pick the world that feels like you.", note: "trust your gut." },
    {
      n: "02",
      code: "CHK",
      title: "APPLY",
      body: "Tell us a little about yourself. Five minutes. No LinkedIn answers.",
      note: "be honest. it's more fun.",
    },
    {
      n: "03",
      code: "SEL",
      title: "GET SELECTED",
      body: "A real person reads every application. We cast the group around the vibe of the journey.",
      note: "yes, a human.",
    },
    { n: "04", code: "ARR", title: "SHOW UP", body: "Everything else becomes the story.", note: "that's the whole thing." },
  ],
  cta: { label: "Find your journey", href: "#journeys" },
} as const;

/* ------------------------------------------------------------------ */
/* 06 — we don't take everyone                                         */
/* ------------------------------------------------------------------ */

export const curation = {
  eyebrow: "THE CASTING",
  headline: ["WE DON'T", "TAKE EVERYONE."],
  body: [
    "Because the people you travel with can change the entire journey.",
    "We look for people who are curious, social, spontaneous and genuinely excited to try something new.",
  ],
  lookFor: {
    title: "WHAT WE LOOK FOR",
    stamp: "CASTING SHEET",
    items: ["Curiosity", "Good energy", "Open-mindedness", "Social spirit", "Respect for others", "A yes to new things"],
    note: "that's the list. really.",
  },
  isnt: "Not your follower count. Not your job title. Just whether we'd want you at the table.",
  statement: ["DESTINATION MATTERS.", "PEOPLE MATTER MORE."],
} as const;

/* ------------------------------------------------------------------ */
/* 07 — what does a plot twist look like                               */
/* ------------------------------------------------------------------ */

/**
 * THE WALL.
 *
 * `mode: "moodboard"` while every frame is stock photography — the header
 * says so, and captions describe a feeling rather than claim a trip. Once real
 * trip content lands, add it with `source: "trip"`, flip `mode` to "trips",
 * and the header changes to match. A clip plays muted inline.
 *
 * `voices` holds REAL traveller quotes only, each with a real first name and
 * the journey it came from. Empty renders nothing — never fill it with the
 * example lines from the brief.
 */
export type WallItem = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  source: "stock" | "trip" | "creator";
  /** Portrait items span two rows on the wall. */
  tall?: boolean;
};

export const wall = {
  eyebrow: "WHAT A PLOT TWIST LOOKS LIKE",
  headline: ["NOT A BROCHURE.", "A FEELING."],
  mode: "trips" as "moodboard" | "trips",
  moodboardNote: "The moodboard — places, until our first journeys hand us the real footage.",
  tripsNote: "Glimpses from the trips so far.",
  follow: { label: "Follow the story", note: "the real stuff lands here first" },
  items: [
    { kind: "image", src: H("trip-bridge"), alt: "Four friends taking a selfie on a bridge held up by giant stone hands", caption: "we made it to the bridge", source: "trip" },
    { kind: "image", src: H("trip-couple"), alt: "Two friends posing on a stone path in the evening light", caption: "golden hour, found the path", source: "trip", tall: true },
    { kind: "image", src: H("trip-pool"), alt: "The whole group crowded together by the pool at night", caption: "the whole cast, one frame", source: "trip" },
    { kind: "image", src: H("trip-guys"), alt: "Six friends lined up on a path at dusk", caption: "the lineup", source: "trip", tall: true },
    { kind: "image", src: H("trip-mirror"), alt: "A group photo caught in a round road mirror", caption: "found a mirror, obviously", source: "trip", tall: true },
    { kind: "image", src: H("trip-girls"), alt: "Two friends leaning into a selfie at a street cafe", caption: "cheers, we think", source: "trip" },
    { kind: "image", src: H("trip-fire"), alt: "Friends around a fire at night, toasting", caption: "one more round by the fire", source: "trip", tall: true },
    { kind: "image", src: H("trip-path"), alt: "A big group posing together on a path in the evening", caption: "group photo, take 11", source: "trip" },
    { kind: "image", src: H("trip-mirror2"), alt: "Friends reflected in a curved mirror by the road", caption: "took it twice", source: "trip", tall: true },
    { kind: "image", src: H("trip-waiting"), alt: "Loungers by a pool with the sun setting over the sea", caption: "quiet, for once", source: "trip", tall: true },
  ] as WallItem[],
  voices: [] as { quote: string; name: string; journey: string }[],
} as const;

/* ------------------------------------------------------------------ */
/* 10 — where next                                                     */
/* ------------------------------------------------------------------ */
/* the trust section — the small print, printed large                  */
/* ------------------------------------------------------------------ */

/**
 * WHAT MAKES A STRANGER TRUST A TRAVEL BRAND THAT HAS NO REVIEWS YET.
 *
 * Not faces, not star ratings, not a counter of travellers: none of that is
 * true yet, and the site's one rule is that nothing is invented. What IS true,
 * and is already written down elsewhere on this site, is how the thing works —
 * who reads an application, what applying costs, what a price does and does
 * not include. So this section shows exactly that, and shows the receipts:
 * every trip's published price and the footnote it carries, read live from
 * that trip's own page.
 *
 * Wording comes from content/site.ts (`trust`, vetted) wherever a sentence
 * already exists there, so the landing page and the application form can never
 * promise different things.
 */
export const trustSection = {
  id: "trust",
  eyebrow: "BEFORE YOU APPLY",
  headline: ["THE SMALL PRINT,", "printed large."],
  intro: "Everything you'd want to know before you say yes. No scrolling to the bottom of a PDF to find it.",
  promises: [
    {
      n: "01",
      title: "APPLYING ISN'T BOOKING.",
      body: "It costs nothing, reserves nothing and charges nothing. We read it first.",
    },
    {
      n: "02",
      title: "A REAL PERSON READS EVERY ONE.",
      body: siteTrust.who.body,
    },
    {
      n: "03",
      title: "WE TALK BEFORE IT'S FINAL.",
      body: siteTrust.safety.points[1],
    },
    {
      n: "04",
      title: "THE NUMBERS ARE ON THE PAGE.",
      body: "Dates, price and what's included are published for every trip. Anything not final says TBA — we don't guess.",
    },
    {
      n: "05",
      title: "ONE DIRECT LINE.",
      body: siteTrust.safety.points[2],
    },
  ],
  ledger: {
    title: "THE LEDGER",
    sub: "What's published, trip by trip",
    footnote: "Not final yet? It says TBA.",
    stamp: "NOTHING HIDDEN",
  },
  ask: {
    headline: ["STILL HAVE A", "QUESTION?"],
    sub: "Ask the people behind the plot, before you apply or after.",
    whatsapp: "WhatsApp us",
    instagram: "Message on Instagram",
  },
} as const;

/* ------------------------------------------------------------------ */

export const whereNext = {
  eyebrow: "DEPARTURES",
  headline: ["WHERE SHOULD WE", "TAKE YOU NEXT?"],
  columns: { where: "DESTINATION", when: "DATES", length: "DURATION", from: "FROM", status: "STATUS" },
  cta: "ENTER JOURNEY",
  soon: "COMING SOON",
} as const;

/* ------------------------------------------------------------------ */
/* 11 — the final scene                                                */
/* ------------------------------------------------------------------ */

export const finalScene = {
  big: ["YOUR NEXT STORY", "IS WAITING."],
  line: ["DON'T JUST TAKE A TRIP.", "TAKE A PLOT TWIST."],
  primary: { label: "Explore Journeys", href: "#journeys" },
  secondary: { label: "Follow the story" },
  credit: "FIN? NOT EVEN CLOSE.",
} as const;
