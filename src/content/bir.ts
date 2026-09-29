/**
 * BIR × BAROT — JOURNEY 03'S PAGE.
 *
 * All copy for the "bir" page variant lives here, the same way Goa's lives in
 * content/goa.ts and Thailand's in content/thailand.ts. Components read; they
 * never hold words. The architecture this copy is written against is in
 * docs/bir-barot-design.md.
 *
 * ─── THE ONE RULE ───────────────────────────────────────────────────────────
 * NOTHING IN HERE IS INVENTED. What the brief supplied is stated flat: the
 * route (Delhi → Barot → Bir → Delhi), the length (3 nights, 4 days), the
 * month (last weekend of November), and every experience named day by day.
 *
 * Two things the brief did NOT supply are modelled honestly:
 *   - the PRICE → `price.confirmed: false`, renders "announced soon";
 *   - the EXACT DATES → "last weekend of November" is read as Fri 27 – Mon 30
 *     Nov 2026. That is an interpretation, flagged on `trip.dates`. Confirm
 *     it before a single ad runs.
 * ────────────────────────────────────────────────────────────────────────────
 */

/* ------------------------------------------------------------------ */
/* media slots                                                         */
/* ------------------------------------------------------------------ */

/**
 * EVERY PHOTOGRAPHIC SURFACE ON THE PAGE IS A SLOT.
 *
 * Empty, a slot renders the illustrated environment for that scene —
 * generated ridgelines, fog, stars, fire. Filled, the photograph (or clip)
 * sits OVER that environment, which stays underneath as its fallback.
 *
 * ─── WHAT IS FILLED, AND WITH WHAT ──────────────────────────────────────────
 * Every photograph below was taken IN Bir, Billing or Barot — checked against
 * its Commons title and description, not guessed from how it looks. Nothing
 * from Dharamshala, Manali or anywhere else stands in for them. The slots
 * left empty (golden hour, the bonfire, the last night, the road) are empty
 * because no licensed frame of THAT moment in THESE places was found, and the
 * illustration is more honest than a lookalike.
 *
 * All are Creative Commons (BY or BY-SA), which requires credit: `photos`
 * below is the single list, rendered on the page by <PhotoCredits/> and
 * mirrored in public/photos/bir/PHOTOS.md. A photo added here without a
 * credit line is a licence breach, not a style choice.
 *
 * Video: none yet. Shot list in public/videos/bir/VIDEOS.md.
 */
export type MediaSlot = {
  /** An mp4 path under /public. Muted, looped, never autoplayed with sound. */
  video?: string;
  /** A still. Used alone, or as the video's poster. */
  image?: string;
  /** Required whenever `video` or `image` is set. Describe the frame, not the brochure. */
  alt?: string;
  /** CSS object-position for the crop. */
  focus?: string;
};

export type PhotoCredit = {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

const CC_BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const CC_BY_4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };
const CC_BY_2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

export const photos = {
  hero: { file: "/photos/bir/hero.jpg", title: "Paragliding at Bir, HP", author: "PanWoyteczek (derivative: UnpetitproleX)", ...CC_BY_SA_4, source: `${COMMONS}Paragliding_at_Bir,_HP.jpg` },
  barotValley: { file: "/photos/bir/barot-valley.jpg", title: "Barot and Ühl Rivulet", author: "Sanjay Lakhanpal", ...CC_BY_SA_4, source: `${COMMONS}Barot_and_%C3%9Chl_Rivulet.jpg` },
  river: { file: "/photos/bir/river.jpg", title: "Uhl River at Barot", author: "Timothy Gonsalves", ...CC_BY_SA_4, source: `${COMMONS}Uhl_River_at_Barot_Oct_2017_D72_2280.jpg` },
  trail: { file: "/photos/bir/trail.jpg", title: "Lamba Dug, Barot", author: "Timothy A. Gonsalves", ...CC_BY_SA_4, source: `${COMMONS}Lamba_Dug_Barot_Himachal_Oct20_R16_04289.jpg` },
  flags: { file: "/photos/bir/bir-flags.jpg", title: "Bir Billing, Himachal Pradesh", author: "Mansi Gill", ...CC_BY_4, source: `${COMMONS}Bir_billing,_Himchal_pradesh.jpg` },
  monastery: { file: "/photos/bir/bir-monastery.jpg", title: "Monastery, Bir", author: "Gerd Eichmann", ...CC_BY_SA_4, source: `${COMMONS}Bir-06-Kloster-gje.jpg` },
  chokling: { file: "/photos/bir/bir-chokling.jpg", title: "Chokling Monastery, Bir", author: "Gannu03", ...CC_BY_SA_4, source: `${COMMONS}Chokling_Monastery,_Bir,_Himachal_Pradesh.jpg` },
  street: { file: "/photos/bir/bir-street.jpg", title: "Bir Village", author: "Gannu03", ...CC_BY_SA_4, source: `${COMMONS}Bir_Village_05.jpg` },
  aerial: { file: "/photos/bir/bir-aerial.jpg", title: "An aerial view of Bir", author: "Fredi Bach", ...CC_BY_2, source: `${COMMONS}An_aerial_view_of_Bir,_Kangra_valley_sights_nature_culture_Himachal_Pradesh_India_2015.jpg` },
  sunsetGliding: { file: "/photos/bir/bir-sunset-gliding.jpg", title: "Sunset gliding in Bir", author: "PulkitPithvaWiki", ...CC_BY_SA_4, source: `${COMMONS}Sunset_gliding_in_Bir,_Himachal_Pradesh.jpg` },
  sunset: { file: "/photos/bir/bir-sunset.jpg", title: "Sunset in Bir", author: "PulkitPithvaWiki", ...CC_BY_SA_4, source: `${COMMONS}Sunset_in_Bir,_Himachal_Pradesh.jpg` },
  summit: { file: "/photos/bir/summit.jpg", title: "Hanuman Garh Trek (Bir Billing)", author: "Chhama Rai", ...CC_BY_SA_4, source: `${COMMONS}Hanuman_Garh_Trek,_Himachal_Pradesh_(Bir_Billing,_Kangra).jpg` },
} satisfies Record<string, PhotoCredit>;

export const media: Record<
  | "hero"
  | "day1"
  | "river"
  | "trail"
  | "goldenHour"
  | "bonfire"
  | "day2"
  | "flight"
  | "lookDown"
  | "social"
  | "sunset"
  | "summit"
  | "lastNight"
  | "road",
  MediaSlot
> = {
  hero: { image: photos.hero.file, alt: "Paragliders in the sky above Bir, a sea of cloud and forested ridges below", focus: "55% 40%" },
  day1: { image: photos.barotValley.file, alt: "Barot seen from the hillside: the green reservoir, the village and pine-covered slopes", focus: "50% 55%" },
  river: { image: photos.river.file, alt: "The Uhl river running over boulders at Barot, pine forest on the far bank", focus: "50% 60%" },
  trail: { image: photos.trail.file, alt: "Morning light through a forested gorge above a boulder-strewn stream near Barot", focus: "50% 50%" },
  goldenHour: {},
  bonfire: {},
  day2: { image: photos.flags.file, alt: "Prayer flags strung in front of snow-dusted Dhauladhar peaks above Bir", focus: "50% 60%" },
  flight: {},
  lookDown: { image: photos.aerial.file, alt: "Bir from the air: terraced fields, winding roads and scattered houses", focus: "50% 50%" },
  social: { image: photos.sunsetGliding.file, alt: "Two paragliders silhouetted against a hazy orange sunset over Bir", focus: "50% 70%" },
  sunset: { image: photos.sunset.file, alt: "A paraglider silhouetted directly across the setting sun in Bir", focus: "50% 55%" },
  summit: { image: photos.summit.file, alt: "Stone cairns on a ridgetop on the Hanuman Garh trek, snow peaks behind", focus: "50% 45%" },
  lastNight: {},
  road: {},
};

/** The three photographs laid between the words of the Bir strip. */
export const townPhotos = [
  { after: 0, ...photos.monastery, alt: "A blue-and-red monastery in Bir under strings of prayer flags" },
  { after: 2, ...photos.chokling, alt: "The gold and red facade of Chokling Monastery, Bir" },
  { after: 4, ...photos.street, alt: "A street in Bir, cafés and yellow balconies, someone walking away" },
] as const;

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

/** Same mechanism as GOA_SECTION_ORDER — numbers are derived, never typed. */
export const BIR_SECTION_ORDER = ["journey", "cast", "details", "application"] as const;
export type BirSectionKey = (typeof BIR_SECTION_ORDER)[number];
export function birIndex(key: BirSectionKey): string {
  return String(BIR_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/* the trip                                                            */
/* ------------------------------------------------------------------ */

export const trip = {
  name: "BIR × BAROT",
  length: "3 NIGHTS · 4 DAYS",
  region: "HIMACHAL",
  route: ["DELHI", "BAROT", "BIR", "DELHI"] as const,
  /**
   * ⚠ INTERPRETATION, NOT CONFIRMATION. The brief says "last weekend of
   * November". In 2026 that is Sat 28 – Sun 29; a four-day trip around it is
   * read as Fri 27 – Mon 30. If the real window is different, change it here
   * and nowhere else.
   */
  dates: "27–30 NOV 2026",
  datesNote: "The last weekend of November.",
  departure: "Delhi",
  group: "20 people",
  split: "10 + 10",
  ages: "18–30",
} as const;

/* ------------------------------------------------------------------ */
/* the HUD — the film's running caption                                */
/* ------------------------------------------------------------------ */

/**
 * The small fixed readout, desktop only: which world you're in. Altitudes are
 * rounded and approximate on purpose — Barot sits around 1,800 m, Billing's
 * launch around 2,400 m, Bir's landing field around 1,400 m.
 */
export const hud = {
  hero: { day: "IN FLIGHT", place: "ABOVE THE DHAULADHAR", alt: "± 2,400 M" },
  day1: { day: "DAY 01", place: "BAROT VALLEY", alt: "± 1,800 M" },
  day2: { day: "DAY 02", place: "BIR · BILLING", alt: "1,400 → 2,400 M" },
  day3: { day: "DAY 03", place: "THE TRAIL", alt: "ASCENDING" },
  day4: { day: "DAY 04", place: "THE ROAD HOME", alt: "DESCENDING" },
} as const;

/* ------------------------------------------------------------------ */
/* 00 · the hero                                                       */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: "PLOT TWIST — JOURNEY 03",
  title: ["BIR", "BAROT"] as const,
  line: "ESCAPE THE ORDINARY.",
  meta: "3 NIGHTS · 4 DAYS · HIMACHAL",
  cta: { label: "ENTER THE JOURNEY", href: "#the-journey" },
  secondary: { label: "WATCH THE JOURNEY", href: "#day-01" },
  scribble: "hold on.",
  /** Crosses the frame during the descent — the first thing the valley says. */
  descent: ["COMING DOWN", "INTO THE VALLEY"] as const,
} as const;

/* ------------------------------------------------------------------ */
/* 01 · the journey                                                    */
/* ------------------------------------------------------------------ */

export const journey = {
  label: "THE JOURNEY",
  lead: ["WE'RE NOT SELLING", "A 3N/4D HIMACHAL PACKAGE."] as const,
  turn: "We're selling a story you get to live.",
  body: "Four days. Four completely different worlds. Twenty people who don't know each other yet. A valley, a sky, a mountain and a road — and you, somewhere in the middle of all of it.",
  worlds: [
    { day: "01", name: "THE ESCAPE", place: "Barot", feel: "wild · quiet · hidden", tone: "#8FB1A8" },
    { day: "02", name: "THE FLIGHT", place: "Bir", feel: "free · loud · airborne", tone: "#A9CBE0" },
    { day: "03", name: "THE WILD", place: "The trail", feel: "raw · earned · huge", tone: "#D9C7A6" },
    { day: "04", name: "THE WAY HOME", place: "The road", feel: "slow · golden · changed", tone: "#E8B48A" },
  ],
  scribble: "don't skip ahead.",
} as const;

/* ------------------------------------------------------------------ */
/* 02 · day 01 — the escape                                            */
/* ------------------------------------------------------------------ */

export const day1 = {
  id: "day-01",
  day: "DAY 01",
  emoji: "🌲",
  name: "THE ESCAPE",
  place: "BAROT VALLEY",
  lines: ["Leave Delhi behind.", "Find the valley nobody told you about."] as const,

  route: {
    kicker: "DELHI → BAROT",
    /** The four stops the line passes through. `at` is 0–1 along the route. */
    stops: [
      { name: "DELHI", note: "traffic. noise. deadlines.", at: 0 },
      { name: "THE HIGHWAY", note: "windows down.", at: 0.34 },
      { name: "THE HILLS", note: "phones lose signal.", at: 0.68 },
      { name: "BAROT", note: "nobody's heard of it. good.", at: 1 },
    ],
    caption: "The city gets smaller. The roads get narrower. The valley gets quieter.",
  },

  plates: [
    {
      key: "river" as const,
      kicker: "THE RIVER",
      title: "Cold, loud, glacier-green.",
      body: "The Uhl runs straight through the valley. You'll hear it before you see it, and you'll hear it all night.",
    },
    {
      key: "trail" as const,
      kicker: "THE TRAIL",
      title: "Pine. Moss. Riverbank.",
      body: "An afternoon wandering the forest trails along the water. No agenda. No signal. Nobody's in a hurry.",
    },
    {
      key: "goldenHour" as const,
      kicker: "GOLDEN HOUR",
      title: "The valley goes gold, then blue.",
      body: "Somewhere around five the light drops behind the ridge and the whole valley changes colour. Stay for it.",
    },
  ],

  bonfire: {
    kicker: "THE BONFIRE",
    headline: ["TONIGHT,", "WE DISAPPEAR."] as const,
    /** Lit one at a time as you scroll — never all at once. */
    elements: [
      { icon: "🔥", word: "Fire", line: "Riverside. Crackling. The centre of everything." },
      { icon: "🌲", word: "Mountains", line: "Black shapes on a blacker sky." },
      { icon: "✨", word: "Fairy lights", line: "Strung between the pines." },
      { icon: "🍷", word: "Drinks", line: "Something warm. Something strong." },
      { icon: "🎵", word: "Music", line: "Low, then not so low." },
      { icon: "🍽️", word: "Dinner", line: "Around the fire, on your lap, with strangers." },
      { icon: "🌌", word: "Stars", line: "More than you've seen since you were a kid." },
    ],
    scribble: "no one's checking their phone.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* ~~ night → sunrise → road → bir                                     */
/* ------------------------------------------------------------------ */

export const dawnRoad = {
  times: ["23:40", "04:55", "06:20", "07:10"] as const,
  lines: ["The fire goes out.", "The sky goes blue.", "The road goes on.", "Next chapter."] as const,
  pin: "BIR",
  from: "BAROT",
} as const;

/* ------------------------------------------------------------------ */
/* 03 · day 02 — the flight                                            */
/* ------------------------------------------------------------------ */

export const day2 = {
  id: "day-02",
  day: "DAY 02",
  emoji: "🪂",
  name: "THE FLIGHT",
  place: "BIR",
  intro: "The energy changes. A mountain town that runs on cafés, monasteries, prayer flags and people who came for a week and stayed a year.",

  /** The horizontal drift strip. Words, not cards. */
  town: [
    { word: "Prayer flags", note: "on every rooftop" },
    { word: "Cafés", note: "long ones. lazy ones." },
    { word: "Monasteries", note: "gold roofs, quiet halls" },
    { word: "Mountain roads", note: "one hairpin at a time" },
    { word: "Young travellers", note: "from everywhere" },
    { word: "Colour", note: "on every wall" },
  ],

  flight: {
    headline: ["YOU DIDN'T COME", "ALL THIS WAY", "TO STAY ON THE GROUND."] as const,
    kicker: "THE PARAGLIDING EXPERIENCE",
    /** The scroll-controlled sequence. One stage per screen of scroll. */
    stages: [
      { n: "01", word: "PREPARE", line: "Harness goes on. Your pilot checks every strap twice." },
      { n: "02", word: "WALK TO THE EDGE", line: "The hill just… stops. The valley is right there." },
      { n: "03", word: "TAKE OFF", line: "Three steps. Four. Then there's no ground under them." },
      { n: "04", word: "FLY", line: "Silence. Wind. Thermals lifting you up the ridge." },
      { n: "05", word: "LOOK DOWN", line: "Villages the size of rice grains. Tea gardens. Rivers like thread." },
      { n: "06", word: "LAND", line: "Grass, a running landing, and a grin you won't lose all day." },
    ],
    path: { from: "BILLING", to: "BIR", fromAlt: 2400, toAlt: 1400 },
    note: "Tandem — a certified pilot flies, you just have to run when they say run.",
    scribble: "you're allowed to scream.",
  },

  social: {
    kicker: "AFTER THE FLIGHT",
    title: ["THE BIR", "SOCIAL CLUB"] as const,
    body: "Slow the day down. Tibetan food, a café crawl, the town on foot — then everyone ends up at the same sunset.",
    items: ["Tibetan food", "Cafés", "Local exploration", "Sunset", "Music", "Drinks", "Games", "Group moments"],
  },

  evening: ["SUNSET.", "MUSIC.", "STRANGERS.", "NOT FOR LONG."] as const,

  night: {
    kicker: "PLOT TWIST",
    title: "SOCIAL NIGHT",
    items: ["Dinner", "Music", "Games", "Drinks", "Bonfire"],
    body: "Not a hotel dinner. A private night for twenty people who, as of this morning, had jumped off a mountain together.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* ~~ clouds → aerial → forest                                         */
/* ------------------------------------------------------------------ */

export const intoForest = {
  lines: ["Back down through the clouds.", "Past the ridgelines.", "Into the trees."] as const,
} as const;

/* ------------------------------------------------------------------ */
/* 04 · day 03 — the wild                                              */
/* ------------------------------------------------------------------ */

export const day3 = {
  id: "day-03",
  day: "DAY 03",
  emoji: "🥾",
  name: "THE WILD",
  headline: ["LEAVE THE ROAD.", "FIND THE TRAIL."] as const,
  challenge: {
    kicker: "THE MOUNTAIN CHALLENGE",
    beats: [
      { word: "START", lines: ["Everyone receives their trail kit."] },
      { word: "ASCEND", lines: ["Forest.", "Mountains.", "Small group challenges."] },
      { word: "DISCOVER", lines: ["Hidden viewpoints.", "Local trails.", "Mountain picnic."] },
      { word: "ARRIVE", lines: ["Everyone reaches the viewpoint together."] },
    ],
    scribble: "nobody gets left behind.",
  },
  reveal: {
    headline: ["SOME VIEWS", "HAVE TO BE EARNED."] as const,
    caption: "This one is.",
  },
  lastNight: {
    sequence: ["Hot shower", "Warm clothes", "Sunset", "Dinner", "Fire"] as const,
    title: "THE LAST NIGHT.",
    body: "One long table under the sky. Candles, a bonfire, music, drinks — and twenty people who are very much not strangers any more.",
    /** The disposable-camera date burned into each print — Day 03 under the reading of `trip.dates`. */
    stamp: "11 29 '26",
    polaroids: [
      { caption: "the long table", tone: "#E8793A" },
      { caption: "someone brought a guitar", tone: "#A95F38" },
      { caption: "3 days ago we'd never met", tone: "#D9C7A6" },
    ],
  },
  ritual: {
    kicker: "A PLOT TWIST RITUAL",
    title: "LEAVE IT BEHIND.",
    body: "Everyone writes down one thing they want to leave in the mountains. It goes into the fire. Nobody reads it. Nobody has to explain.",
    prompts: ["Work.", "Stress.", "Routine.", "A bad week.", "A situationship.", "Whatever."],
    input: "or write your own",
    burn: "BURN IT",
    after: "gone. the mountains can keep it.",
    privacy: "Nothing you type here leaves your screen.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 05 · day 04 — the way home                                          */
/* ------------------------------------------------------------------ */

export const day4 = {
  id: "day-04",
  day: "DAY 04",
  emoji: "🚐",
  name: "THE WAY HOME",
  moments: ["Slow morning.", "Coffee.", "Breakfast.", "Last mountain views.", "Final photographs.", "Packing up.", "The road."],
  end: ["EVERY GOOD JOURNEY", "HAS AN END."] as const,
  turn: "BUT YOU DON'T GO HOME THE SAME.",
  road: { from: "BIR", to: "DELHI", note: "The mountains get smaller in the back window." },
} as const;

/* ------------------------------------------------------------------ */
/* the cast (shared board, per-journey words)                          */
/* ------------------------------------------------------------------ */

export const cast = {
  bridge: [
    "THE MOUNTAINS ARE THE SETTING. THE PEOPLE ARE THE STORY.",
    "20 spots. 10 girls. 10 guys. One van you won't want to get out of.",
  ] as [string, string],
  composition: {
    title: "10 AND 10.",
    body: "We're looking for the ones who'll run off a mountain, sing badly at a bonfire and still be first to breakfast.",
    disclaimer: "Basically, good vibes only.",
    extra: ["And yes, 10/10s only.", "Not the looks kind. The energy kind."],
  },
} as const;

/* ------------------------------------------------------------------ */
/* the recap montage                                                   */
/* ------------------------------------------------------------------ */

export const recap = {
  frames: ([
    { word: "Barot.", tone: "#0F1D16", ink: "#EFE9DD", image: photos.barotValley.file },
    { word: "River.", tone: "#17302A", ink: "#EFE9DD", image: photos.river.file },
    { word: "Bonfire.", tone: "#2A120A", ink: "#FFB36B" },
    { word: "Bir.", tone: "#24527D", ink: "#F3EFE6", image: photos.monastery.file },
    { word: "Paragliding.", tone: "#24527D", ink: "#F3EFE6", image: photos.hero.file },
    { word: "Mountains.", tone: "#3B4A55", ink: "#EFE9DD", image: photos.flags.file },
    { word: "Trek.", tone: "#2E2119", ink: "#EFE9DD", image: photos.summit.file },
    { word: "Dinner.", tone: "#3A1A0E", ink: "#E8B48A" },
    { word: "People.", tone: "#EFE9DD", ink: "#101311" },
    { word: "Road.", tone: "#F1E6D6", ink: "#5D6B73" },
  ] as { word: string; tone: string; ink: string; image?: string }[]),
};

/* ------------------------------------------------------------------ */
/* the details                                                         */
/* ------------------------------------------------------------------ */

/** Same shape and same honesty as goa.price. Flip when the number exists. */
export const price = {
  confirmed: false,
  amount: "",
  note: "",
  pending: "ANNOUNCED SOON",
  pendingNote: "Ask us for the number before it's public.",
} as const;

/**
 * Every INCLUDED line is an experience the brief itself places on the
 * itinerary; every NOT INCLUDED line is the same standing exclusion Goa
 * confirmed. Nothing here is a new promise — but the final list should still
 * be signed off, exactly as Goa's was.
 */
export const inclusions = {
  confirmed: true,
  included: [
    "Delhi → Barot → Bir → Delhi, by road",
    "3 nights' stay in the mountains",
    "Riverside bonfire night in Barot",
    "Tandem paragliding, Billing → Bir",
    "Plot Twist Social Night",
    "Guided mountain trek + picnic",
    "The Last Night dinner",
    "Plot Twist hosts throughout",
  ] as string[],
  excluded: [
    "Alcohol and personal drinks",
    "Additional meals",
    "Shopping and personal expenses",
    "Optional add-ons",
    "Travel insurance where desired or required",
  ] as string[],
  pending: "We're finalising the full included / not-included list. Ask us and we'll send it.",
} as const;

export const details = {
  label: "THE DETAILS",
  headline: ["3 NIGHTS · 4 DAYS", "DELHI → BAROT → BIR → DELHI"] as const,
  scribble: "the boring bit. read it anyway.",
  basics: [
    { k: "WHEN", v: trip.dates },
    { k: "DEPARTS", v: trip.departure },
    { k: "HOW LONG", v: "3 nights · 4 days" },
    { k: "THE CAST", v: trip.group },
    { k: "THE SPLIT", v: "10 girls + 10 guys" },
    { k: "AGES", v: trip.ages },
  ],
  selection: "Curated. Every application is read by a real person.",
  price,
  inclusions,
  ask: "ASK US ANYTHING →",
  whatsapp: "Hey Plot Twist 👀 tell me about Bir × Barot",
} as const;

/* ------------------------------------------------------------------ */
/* the close                                                           */
/* ------------------------------------------------------------------ */

export const finalCta = {
  headline: ["YOUR NEXT", "PLOT TWIST", "STARTS HERE."] as const,
  primary: { label: "I'M IN", href: "#apply" },
  secondary: { label: "VIEW THE JOURNEY", href: "#day-01" },
  scribble: "see you in the mountains.",
} as const;

export const credits = {
  label: "PHOTOGRAPHS",
  note: "Every photograph on this page was taken in Bir, Billing or Barot, and is used under Creative Commons. Thank you to:",
} as const;

export const sticky = {
  label: "JOIN THE JOURNEY",
  href: "#apply",
  meta: "BIR × BAROT · NOV 2026",
  line: "twenty seats.",
} as const;
