import type { MediaSlot } from "./bir";
import { TRIP, festival, lineup } from "./thailand";

/**
 * THAILAND: THE CHAOS — the content for the rebuilt Journey 3.
 *
 * See `docs/thailand-chaos-design.md`. Bir is a descent, Sri Lanka is a trailer,
 * **Thailand is a night that doesn't end**, and the organising idea the whole
 * palette hangs off is the brief's own: BIR = EARTH, SRI LANKA = WATER,
 * THAILAND = LIGHT. Every world below is defined by what kind of light it is in
 * rather than by what colour it is painted.
 *
 * ─── WHY THIS IS A SEPARATE FILE FROM thailand.ts ───────────────────────────
 * `thailand.ts` is the live page's content and it stays live while this is
 * built — the rollout is "build alongside, switch when ready". Two content
 * files for one trip would normally be a mistake, so the rule that stops it
 * becoming one is: **this file never restates a confirmed fact.** Dates, the
 * festival, the lineup and the cast are imported from `thailand.ts` and
 * re-exported where needed. What lives here is only the new page's STAGING —
 * which world, which light, which line.
 *
 * When the rebuild goes live, `thailand.ts` keeps the facts and this keeps the
 * film. Neither becomes a copy of the other.
 *
 * ─── NOTHING INVENTED ───────────────────────────────────────────────────────
 * Every place, night and activity below traces to the confirmed itinerary:
 * 15 Dec land Phuket → Krabi → Railay → welcome night; 16 Dec Phi Phi + Maya
 * Bay; 17 Dec back to Phuket; 18–20 Dec EDC; 21 Dec home. **There is no
 * Bangkok on this trip** — the brief asked for a Bangkok world and the site
 * owner confirmed the real itinerary stands, so World 01 carries the arrival
 * ENERGY the brief wanted without claiming a city the trip does not visit.
 */

export type WorldLight =
  | "last light"
  | "noon"
  | "afternoon"
  | "no light"
  | "manufactured"
  | "first light"
  | "daylight";

/**
 * WHERE THE TYPE SITS, AND HOW MUCH OF THE FRAME IT TAKES.
 *
 * This exists because seven worlds that differ only in colour are a template
 * with seven skins, not seven experiences. Light alone does not change where
 * your eye lands or how much air a screen has — composition does. Each value
 * below is used exactly once, so no two worlds are laid out the same way.
 */
export type WorldLayout =
  /** 01 — bottom-left, loaded, travelling. The default editorial frame. */
  | "anchor"
  /** 02 — type at the top, the whole lower frame left open to the water. */
  | "float"
  /** 03 — centred, enormous, almost no photograph. The exhale. */
  | "void"
  /** 04 — small type in a lot of black. Held, tight, waiting. */
  | "held"
  /** 05 — oversized, full width, type as the loudest object on the page. */
  | "blast"
  /** 06 — right-aligned and low, the only world that reads right to left. */
  | "drift"
  /** 07 — centred and sparse. The credits. */
  | "credits";

/**
 * WHICH OF THE TWO UNIVERSES A WORLD BELONGS TO.
 *
 * This page is not one journey with a loud bit in the middle. It is a holiday
 * that gets hijacked, and the hijack has to be legible without reading a word.
 * Colour alone could not do it — the first build gave each world its own ground
 * and they still read as one continuous thing, because every screen was set in
 * the same typeface, with the same metadata, in the same voice.
 *
 * So the page CHANGES LANGUAGE at the gate:
 *
 *   "island"   — Instrument Serif italic. Editorial, lowercase asides, air,
 *                metadata that reads like a travel diary (tide, light, route).
 *                This is how Bir and Sri Lanka talk.
 *
 *   "festival" — Anton, uppercase, tight, tracked. Poster and laminate, not
 *                editorial. Metadata reads like a running order (gates, stage,
 *                set time). Nothing italic, nothing lowercase, no air.
 *
 * Anton is deliberate and it is a reversal: `docs/bir-barot-design.md` says
 * "Anton and Permanent Marker are NOT used here — they are Goa's loudness."
 * That is exactly why it is correct for the festival half. The loudness is the
 * point, and confining it to three of seven worlds is what stops it being the
 * page's whole voice. No new font is added — Anton is already loaded.
 */
export type WorldRegister = "island" | "festival";

export type World = {
  id: string;
  /** "01" … "07". The navigator and the title cards both read this. */
  n: string;
  /** Short name, used in the film index and the pinned navigator. */
  name: string;
  /** The date band this world covers, as it is printed. */
  date: string;
  /** One line for the film index — the whole world in a sentence. */
  index: string;
  /** The title card's line. Instrument Serif, enormous, often two lines. */
  title: string[];
  /** The body. One paragraph. If a world needs two, the world is wrong. */
  body: string;
  /** The one line that is Plot Twist talking rather than describing. */
  beat: string;
  /** Where you physically are. Rendered as metadata, never as a sentence. */
  where: string;
  /** What kind of light this world is in. Drives the grade, not just a label. */
  light: WorldLight;
  /** The ground this world is painted on. */
  ground: string;
  /** Its one accent. */
  accent: string;
  /** The type colour that survives on `ground`. */
  ink: string;
  /** Which of the two universes this world belongs to. Drives the typeface. */
  register: WorldRegister;
  /** The day of the month, set enormous and outlined on the world's card. */
  cardDate: string;
  /** One or two serif lines on the card, under the name. Never more. */
  lines: readonly string[];
  /** The wash over the card's photograph, in this world's own ground colour. */
  tint: string;
  /** Where the type sits. Each value is used exactly once across the seven. */
  layout: WorldLayout;
  /** The media slot. Empty renders the illustrated environment, never a box. */
  media: MediaSlot;
};

/** A still that already exists, is licensed, and was checked at full resolution. */
const still = (image: string, alt: string, focus = "50% 50%"): MediaSlot => ({ image, alt, focus });

/**
 * A clip under /videos/thailand/chaos/, with its own poster frame.
 *
 * All eight of these EXIST. The first build of this page pointed every slot at
 * files that were never created, so the whole page silently fell back to
 * stills — which is exactly what it looked like.
 *
 * Sourced from Pexels (commercial use, self-hosting and modification all
 * permitted), trimmed to 9–14s and re-encoded at CRF 30 with +faststart using
 * the recipe already documented in public/videos/bir/VIDEOS.md. 85 MB of
 * source became 14 MB of web video.
 *
 * ─── WHAT IS DELIBERATELY NOT HERE ──────────────────────────────────────────
 * The two EDC files in the owner's Downloads folder: Insomniac's official EDC
 * Thailand 2026 trailer, and a third party's aftermovie rip. Both are YouTube
 * downloads of other people's copyrighted work. public/videos/thailand/VIDEOS.md
 * already records the trailer's licence as **none**, and putting the festival's
 * own trailer on a commercial travel page damages the non-affiliation position
 * at the same time as the copyright one.
 *
 * The lawful route to that exact footage already exists in this repo: setting
 * `heroVideo.selfHosted = null` on the live page falls back to the OFFICIAL
 * YouTube embed, credit line and all. That is one field, and it is the owner's
 * call to make — not something to do quietly on a new URL.
 */
const clip = (name: string, alt: string, focus = "50% 50%"): MediaSlot => ({
  video: `/videos/thailand/chaos/${name}.mp4`,
  image: `/videos/thailand/chaos/${name}-poster.jpg`,
  alt,
  focus,
});

const DAYS = "/photos/thailand/days";

/* ------------------------------------------------------------------ */
/* the hero                                                            */
/* ------------------------------------------------------------------ */

/**
 * THE HERO. Black, then one light, and the light never cuts — it only gets
 * closer, until it is a road at last light and you are already moving.
 *
 * The headline is NOT the brand masthead ("You've found / the plot."). That
 * sentence is Goa's and Bali's and the current page sets one word inside it;
 * this rebuild is a film, and a film does not open on a slogan. The masthead
 * returns at the close, where it belongs.
 */
export const hero = {
  eyebrow: `${festival.name} · ${festival.datesShort}`,
  /** Two words. The second is the whole page. */
  title: ["THAILAND", "THE CHAOS"],
  dateline: `${TRIP.dates.value} · ${TRIP.days.value}`,
  /** Under the title, small, and the only full sentence on the first screen. */
  line: "Seven days, six nights, and three of them are a festival.",
  cta: "GET ON THE LIST",
  /** The scroll hint. The page is a film; this is the only instruction in it. */
  scroll: "IT STARTS IN THE DARK",
  /**
   * THE FOOTAGE.
   *
   * `festival-night.mp4`, which is the LICENSED clip — Pexels 14670415,
   * commercial use and self-hosting permitted, verified 11 Sep 2026.
   *
   * ─── WHAT IS DELIBERATELY NOT USED HERE ─────────────────────────────────
   * `edc-hero.mp4` sits in the same folder and is the better-looking file. It
   * is a 24-second cut of Insomniac's official EDC Thailand trailer, pulled
   * with yt-dlp, and `public/videos/thailand/VIDEOS.md` records its licence as
   * **none**. The live page runs it because the site owner directed that after
   * the risk was explained; this page is a new surface and a new URL, and
   * extending an uncleared use onto it is not a decision to make quietly. If
   * the owner wants it here too, it is a one-line change — and the disclaimer
   * has to change in the same commit.
   *
   * This clip is generic festival footage and must never be captioned as EDC.
   */
  /**
   * TWO CUTS OF ONE FILM.
   *
   * 16:9 for landscape screens, 9:16 for phones — and only one of them ever
   * loads. The reason is stated plainly in Sri Lanka's hero: this page is
   * bought with Instagram ads, and a landscape clip object-covered into a
   * 390x844 viewport shows the middle 44% of the frame. That is a postage
   * stamp of a crowd, not a hero.
   *
   * The tall cut is a centre crop of the same footage, so the two are the same
   * shot rather than two different ones — the page does not change what it is
   * showing depending on the device, only how much of it fits.
   */
  video: {
    wide: {
      src: "/videos/thailand/chaos/hero.mp4",
      poster: "/videos/thailand/chaos/hero-poster.jpg",
    },
    tall: {
      src: "/videos/thailand/chaos/hero-tall.mp4",
      poster: "/videos/thailand/chaos/hero-tall-poster.jpg",
    },
    alt: "A festival crowd under moving stage light at night",
  },
} as const;

/* ------------------------------------------------------------------ */
/* the film index                                                      */
/* ------------------------------------------------------------------ */

export const filmIndex = {
  label: "THE WEEK",
  title: ["SEVEN DAYS.", "SEVEN WORLDS."],
  note: "no bullet points. sorry.",
} as const;

/* ------------------------------------------------------------------ */
/* the seven worlds                                                    */
/* ------------------------------------------------------------------ */

/**
 * THE RHYTHM: dusk → sea → PAPER → black → MAXIMUM → gold → black.
 *
 * World 03 is the single brightest screen on the page and it sits dead centre,
 * flanked by the two darkest. That is Bir's structure exactly — its one
 * sky-bright chapter sits between the bonfire and the forest — and it is the
 * reason the festival lands when it lands. A page that is loud everywhere is
 * loud nowhere, which is the single most common way this brief gets built
 * wrong.
 */
export const worlds: World[] = [
  {
    id: "landfall",
    n: "01",
    name: "LANDFALL",
    date: "15 DEC",
    index: "Land in Phuket, drive to Krabi, and watch the cliffs arrive.",
    title: ["LAND IN PHUKET.", "HEAD FOR KRABI."],
    body:
      "You land in Phuket and you do not stay there. The road runs north-east to Krabi past limestone the size of office blocks, and the whole province is cliffs standing in green water. Railay at the end of it — a beach you reach by boat because no road goes there. Then the first night with the crew, which is where twenty strangers stop being twenty strangers.",
    beat: "Land. Switch off. Let's go.",
    where: "PHUKET → KRABI → RAILAY",
    light: "last light",
    layout: "anchor",
    register: "island",
    cardDate: "15",
    lines: ["You land in Phuket.", "You sleep in Krabi."],
    tint: "linear-gradient(to bottom, rgba(42,19,48,0.30) 0%, rgba(42,19,48,0.12) 44%, rgba(42,19,48,0.92) 100%)",
    ground: "#2A1330",
    accent: "#FF9E7A",
    ink: "#FFF1DC",
    media: clip("krabi", "Aerial over Phra Nang Cave Beach on the Railay peninsula, Krabi — limestone cliffs and clear water", "50% 50%"),
  },
  {
    id: "water",
    n: "02",
    name: "THE WATER",
    date: "16 DEC",
    index: "Out before the day boats. Back long after them.",
    title: ["THE WATER", "IS THE POINT."],
    body:
      "Out on the water before the day boats arrive. Phi Phi, and Maya Bay — the one you have already seen a hundred times and will still look at properly — and then the stops nobody photographs, which is where everyone actually gets in. Back late. Out later.",
    beat: "Island hopping, but make it chaotic.",
    where: "PHI PHI · MAYA BAY",
    light: "noon",
    layout: "float",
    register: "island",
    cardDate: "16",
    lines: ["Out before the day boats.", "Back long after them."],
    tint: "linear-gradient(to bottom, rgba(12,58,63,0.26) 0%, rgba(12,58,63,0.08) 42%, rgba(12,58,63,0.92) 100%)",
    ground: "#0C3A3F",
    accent: "#79C8BE",
    ink: "#F2FBF8",
    media: clip("water", "A longtail boat crossing turquoise water between limestone cliffs in Thailand", "50% 50%"),
  },
  {
    id: "daylight",
    n: "03",
    name: "THE DAYLIGHT",
    date: "17 DEC",
    index: "The last day nothing is asked of you.",
    title: ["NOTHING", "HAPPENS TODAY."],
    body:
      "Back across to Phuket, into the stay for the rest of the week, and then an afternoon that is deliberately empty. Pool, beach, sleep, whatever you need. Nobody sensible walks into three nights of EDC already tired.",
    beat: "Tomorrow, we enter another universe.",
    where: "KRABI → PHUKET",
    light: "afternoon",
    layout: "void",
    register: "island",
    cardDate: "17",
    lines: ["The last day nothing is asked of you."],
    tint: "linear-gradient(to bottom, rgba(241,233,220,0.58) 0%, rgba(241,233,220,0.30) 44%, rgba(241,233,220,0.95) 100%)",
    /* The only paper-light world on the page. It is the exhale, and it is why
       the three that follow it feel as dark as they do. */
    ground: "#F1E9DC",
    accent: "#1B1B1B",
    ink: "#141414",
    media: clip("pool", "A resort pool under tall palms in flat afternoon light", "50% 48%"),
  },
  {
    id: "night-before",
    n: "04",
    name: "THE NIGHT BEFORE",
    date: "17 DEC · NIGHT",
    index: "Nobody sleeps much, and nobody says why.",
    title: ["TOMORROW ISN'T", "ANOTHER DAY."],
    body:
      "The last ordinary evening of the trip, and everybody knows it. Wristbands come out of their packets. Somebody checks the set times for the fourth time. The group chat stops being about logistics and starts being about who is doing what at midnight.",
    beat: "It's the reason we're here.",
    where: "PHUKET",
    light: "no light",
    layout: "held",
    register: "festival",
    cardDate: "17",
    lines: ["Nobody sleeps much.", "Nobody says why."],
    tint: "linear-gradient(to bottom, rgba(7,4,13,0.72) 0%, rgba(7,4,13,0.46) 44%, rgba(7,4,13,0.96) 100%)",
    ground: "#07040D",
    accent: "#8B3DFF",
    ink: "#EFE9DD",
    media: clip("entry", "Stage lighting sweeping through fog in a dark venue", "50% 50%"),
  },
  {
    id: "drop",
    n: "05",
    name: "THE DROP",
    date: "18–20 DEC",
    index: "Three nights. Six stages. One reason the whole week exists.",
    title: ["EDC", "THAILAND."],
    body:
      "Gates at Rhythm Park. The walk in, the first time a mainstage that size is in front of you rather than on a screen, and the specific silence of twenty people realising at once that this is actually happening. Then it happens twice more.",
    beat: "Three nights. One festival. Zero normal plans.",
    where: festival.venue,
    light: "manufactured",
    layout: "blast",
    register: "festival",
    cardDate: "18–20",
    lines: ["Three nights.", "The reason the week exists."],
    tint: "linear-gradient(to bottom, rgba(10,4,20,0.52) 0%, rgba(10,4,20,0.20) 42%, rgba(10,4,20,0.94) 100%)",
    ground: "#0A0414",
    accent: "#FF2E7E",
    ink: "#FFF1DC",
    media: clip("drop", "A laser show over a crowd at a night event", "50% 46%"),
  },
  {
    id: "after-hours",
    n: "06",
    name: "AFTER HOURS",
    date: "EACH DAWN",
    index: "The music stops. The sun doesn't.",
    title: ["THE MUSIC STOPPED.", "THE SUN DIDN'T."],
    body:
      "You do not really leave a festival, you just end up on a beach watching the sky go from black to grey to gold with people you met four days ago. Nobody is talking much. Somebody finds coffee. This is the part nobody puts in the recap and everybody remembers.",
    beat: "You'll describe this badly for years.",
    where: "THE BEACH, EARLY",
    light: "first light",
    layout: "drift",
    register: "festival",
    cardDate: "DAWN",
    lines: ["The music stopped.", "The sun didn't."],
    tint: "linear-gradient(to bottom, rgba(28,16,24,0.44) 0%, rgba(28,16,24,0.16) 44%, rgba(28,16,24,0.92) 100%)",
    ground: "#1C1018",
    accent: "#E8B48A",
    ink: "#FFF1DC",
    media: clip("sunrise", "Low sun over breaking waves on an empty shore", "50% 54%"),
  },
  {
    id: "end",
    n: "07",
    name: "THE END",
    date: "21 DEC",
    index: "A slow breakfast, a checkout, and a very strange week afterwards.",
    title: ["YOU CAME FOR EDC."],
    body:
      "A slow breakfast, a checkout, and a transfer to the airport. Numbers get swapped that were never going to be swapped on day one. Then everyone goes back to their actual lives, which will feel strange for about a week.",
    beat: "You left with twenty people.",
    where: "PHUKET → HOME",
    light: "daylight",
    layout: "credits",
    register: "island",
    cardDate: "21",
    lines: ["Nobody says much at breakfast."],
    tint: "linear-gradient(to bottom, rgba(8,6,11,0.62) 0%, rgba(8,6,11,0.34) 44%, rgba(8,6,11,0.96) 100%)",
    ground: "#08060B",
    accent: "#EFE9DD",
    ink: "#FFF1DC",
    media: clip("aerial", "A drone shot over a tropical island and its reef", "50% 52%"),
  },
];

/* ------------------------------------------------------------------ */
/* the close                                                           */
/* ------------------------------------------------------------------ */

export const close = {
  /** The masthead returns here rather than opening the page. */
  masthead: ["You've found", "the plot."],
  line: "Until the next one.",
  cta: "PRE-REGISTER →",
  /** The only status this page states about money, per the current instruction. */
  status: "Not on sale yet. The list hears first.",
} as const;

/** Re-exported so components never reach past this file for confirmed facts. */
export { TRIP, festival, lineup };

/* ------------------------------------------------------------------ */
/* the entry — the portal                                              */
/* ------------------------------------------------------------------ */

/**
 * THE ENTRY. Sri Lanka's version is the house technique and this is Thailand's
 * answer to it, not a copy of it.
 *
 * Sri Lanka knocks WELCOME TO SRI LANKA out of a black layer in
 * `mix-blend-mode: multiply` over jungle footage — so the island is visible
 * ONLY through the letters — then scales the type x26 so you fly through the
 * word into the place. It works because the island is a secret being let out.
 *
 * Thailand is not a secret. THAILAND = LIGHT, so the same mechanism is pointed
 * at a different idea: what shows through the letters is not a landscape, it is
 * the rig. You are not flying into a country. You are flying into the lights,
 * and the thing on the far side of the word is the loudest frame on the page.
 *
 * The two lines before it set up the only joke the page tells: everyone books
 * a flight; nobody books this.
 */
export const entry = {
  lines: ["Anyone can book a flight to Thailand.", "NOBODY BOOKS THIS."],
  /** Knocked out of the black. Line 2 is the one you fly through. */
  welcome: ["WELCOME TO", "THE CHAOS"],
  /** What is visible through the letters, and what you land inside. */
  inside: clip("entry", "Stage lighting sweeping through fog, seen through the letters", "50% 50%"),
} as const;

/* ------------------------------------------------------------------ */
/* the reels — the two days that are a sequence of hours               */
/* ------------------------------------------------------------------ */

/**
 * Only two worlds get a reel, and that restraint is the point. A pinned
 * sideways sequence is the loudest device this page has after the portal, and
 * if every world had one the page would be a carousel of carousels.
 *
 * 02 THE WATER and 05 THE DROP get it because they are the only two days that
 * are genuinely a run of HOURS — a boat day has a shape you can put times on,
 * and three festival nights are three timed beats. 01 is a journey, 03 is a
 * mood, 06 and 07 are a feeling, and none of those scrub.
 *
 * Every title is a line somebody would say ("GET IN.") rather than a thing to
 * do ("Snorkelling"). That is the rule the Sri Lanka beats follow and the
 * reason they do not read as an itinerary in disguise.
 */
export const beats = {
  water: [
    {
      key: "early",
      time: "07:10",
      title: ["BEFORE", "THE BOATS."],
      line: "The whole bay, briefly, to twenty people.",
      note: "Out early on purpose. By ten the day-trippers arrive and it is a different place entirely.",
      slot: { image: "/photos/thailand/days/bay.jpg", alt: "Longtail boats on turquoise water below limestone cliffs", focus: "52% 30%" },
    },
    {
      key: "maya",
      time: "09:40",
      title: ["MAYA BAY.", "YES, THAT ONE."],
      line: "You have seen it a hundred times. Look anyway.",
      note: "The most photographed bay in Thailand, and it still does the thing it does when you are standing in it.",
      slot: { image: "/photos/thailand/days/bay.jpg", alt: "Maya Bay, limestone cliffs enclosing pale green water", focus: "48% 52%" },
    },
    {
      key: "in",
      time: "12:30",
      title: ["GET IN."],
      line: "The stops nobody photographs are the ones you swim at.",
      note: "Between the named places are the unnamed ones. No queue, no boats, nobody filming.",
      slot: { image: "/photos/thailand/days/day-02.jpg", alt: "Aerial of the Phi Phi islands, cliffs and turquoise water", focus: "50% 58%" },
    },
    {
      key: "late",
      time: "21:00",
      title: ["BACK LATE.", "OUT LATER."],
      line: "Day two is when the group stops being polite.",
      note: "Everyone is sunburnt, nobody is tired, and the night runs on its own.",
      slot: { image: "/photos/thailand/days/day-01.jpg", alt: "A Krabi beach at low sun with a moored longtail", focus: "50% 50%" },
    },
  ],
  drop: [
    {
      key: "n1",
      time: "NIGHT 01",
      title: ["THE FIRST", "DROP."],
      line: "Nothing is ever the first time twice.",
      note: "The walk in, the first time a mainstage that size is in front of you rather than on a screen, and twenty people realising at once that this is actually happening.",
      slot: { image: "/photos/thailand/days/mainstage.jpg", alt: "A festival mainstage under a fan of lasers, crowd silhouetted", focus: "50% 40%" },
    },
    {
      key: "n2",
      time: "NIGHT 02",
      title: ["NO LOOKING", "BACK."],
      line: "The crew is fully in.",
      note: "The site makes sense now. The group has split into the people chasing the mainstage and the people who found the small stage and will not leave it.",
      slot: { image: "/photos/thailand/days/day-05.jpg", alt: "A fan of green laser beams over a crowd at night", focus: "50% 44%" },
    },
    {
      key: "n3",
      time: "NIGHT 03",
      title: ["ONE LAST", "DANCE."],
      line: "Three nights. One festival. Zero normal plans.",
      note: "The last night of the festival and the last night of the trip, which is a great deal to put inside one evening. Everybody knows it while it is still happening.",
      slot: { image: "/photos/thailand/days/day-06.jpg", alt: "Pyrotechnic fountains firing across a festival mainstage above a crowd", focus: "50% 46%" },
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* the threshold                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE SENTENCE THE PAGE SAYS AS IT CHANGES LANGUAGE.
 *
 * It sits between World 03 and World 04 — between the last afternoon and the
 * first night — and it is the only place on the page that addresses the reader
 * directly about what is happening to the page itself. After it, the typeface
 * changes, the italics stop, and nothing is lowercase again until the morning.
 */
export const threshold = {
  small: "FROM HERE IT STOPS BEING A HOLIDAY",
  big: ["THREE NIGHTS", "THAT DO NOT", "LOOK LIKE", "THE OTHER FOUR."],
  foot: "RHYTHM PARK · LAGUNA PHUKET · GATES 16:00",
} as const;

/* ------------------------------------------------------------------ */
/* the crossings' own footage                                          */
/* ------------------------------------------------------------------ */

/**
 * WHAT PLAYS UNDERNEATH EACH TRANSITION.
 *
 * These were missing, and their absence was the "blank screens" bug: the
 * crossings were built to grade footage, the footage was never passed, and the
 * gradients multiplied against nothing — which on a dark page is black.
 *
 * Each clip is chosen as the thing the transition is physically travelling
 * through, not as decoration: you cross water to reach the islands, you cross
 * the empty afternoon to reach the night, and you cross the venue's own fog to
 * reach the gates.
 */
export const crossings = {
  dawn: clip("aerial", "An aerial drift over a tropical coastline at first light", "50% 54%"),
  bleach: clip("water", "A longtail boat on turquoise water between limestone cliffs", "50% 48%"),
  blackout: clip("pool", "A resort pool under palms as the afternoon light goes", "50% 46%"),
  countdown: clip("entry", "Stage lighting sweeping through fog before the gates open", "50% 50%"),
  lightsDown: clip("drop", "Lasers over a crowd, thinning out", "50% 46%"),
} as const;

/* ------------------------------------------------------------------ */
/* the rituals — one per world that has no reel                        */
/* ------------------------------------------------------------------ */

/**
 * THE THING EACH WORLD DOES THAT NO OTHER WORLD DOES.
 *
 * Sri Lanka gives every chapter one: a light ramp, a scrubbed countdown ring,
 * a floating sunset, a press-and-hold secret. Bir does the same — scroll IS
 * the flight, the bonfire lights element by element, you tap a card and it
 * burns. Without them a page is seven photographs with captions, however good
 * the photographs are.
 *
 * Two worlds already have a reel (02 and 05), so these are the other five. The
 * rule each one follows: it must be the thing that day actually IS, not an
 * effect borrowed from somewhere else.
 *
 *   01  the route        the only day that is about movement
 *   03  the empty hours  the only day with nothing in it
 *   04  the group chat   the only night where nothing happens yet
 *   06  the sunrise      the only time the light comes back
 *   07  the recap        the only chapter that looks backwards
 */
export const rituals = {
  /** 01 — the road, drawn as you scroll. Three stops, lit as you reach them. */
  route: {
    label: "THE ROAD",
    stops: [
      { k: "PHUKET", v: "You land here", t: "16:40" },
      { k: "KRABI", v: "Two hours north-east, past the cliffs", t: "19:10" },
      { k: "RAILAY", v: "By boat. No road goes there.", t: "20:30" },
    ],
  },

  /**
   * 03 — the afternoon where nothing is scheduled, told by an hour hand that
   * keeps moving while the plans stay empty. The joke is that the list gets
   * SHORTER as the day goes on.
   */
  emptyHours: {
    label: "THE PLAN",
    hours: [
      { t: "13:00", v: "Arrive. Find the pool." },
      { t: "15:00", v: "Still at the pool." },
      { t: "17:00", v: "Somebody suggests a plan. It is voted down." },
      { t: "19:00", v: "Eat. Sleep early, allegedly." },
    ],
    close: "That is the entire itinerary for today, and it is deliberate.",
  },

  /**
   * 04 — the group chat, which is where the night before an event actually
   * happens. Messages land one at a time as you scroll. Nothing is a real
   * person: they are roles, because the twenty are not picked yet.
   */
  groupChat: {
    label: "THE GROUP CHAT · 23:14",
    messages: [
      { who: "someone", text: "wristbands came" },
      { who: "someone", text: "set times are out. garrix is 1am" },
      { who: "you", text: "1am is late" },
      { who: "someone", text: "1am is not late" },
      { who: "someone", text: "who's doing the small stage at 11" },
      { who: "you", text: "me" },
      { who: "someone", text: "ok see everyone at the gates" },
    ],
  },

  /** 06 — the sun comes up while you scroll. The only world that gets lighter. */
  sunrise: {
    label: "FIRST LIGHT",
    beats: [
      { t: "04:50", v: "The last track." },
      { t: "05:20", v: "Nobody wants to be the one who says let's go." },
      { t: "06:05", v: "The sky does it for you." },
      { t: "06:40", v: "Somebody finds coffee." },
    ],
  },

  /**
   * 07 — the recap. Ten words, ten worlds, scrubbed fast, then it stops.
   * Bir ends the same way and for the same reason: the montage is what turns
   * seven separate days into one week you have already had.
   */
  recap: {
    label: "SEVEN DAYS, IN ORDER",
    words: [
      "LAND",
      "DRIVE",
      "CLIFFS",
      "BOAT",
      "MAYA BAY",
      "SWIM",
      "NOTHING",
      "GATES",
      "LASERS",
      "SUNRISE",
    ],
    close: "You came for EDC. You left with twenty people.",
  },
} as const;
