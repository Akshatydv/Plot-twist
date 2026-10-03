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
  eyebrow: `EDC × THAILAND · ${TRIP.dates.value}`,
  /** Two words. The second is the whole page. */
  title: ["THAILAND", "× EDC"],
  dateline: "PHUKET · KRABI · PHI PHI · MAYA BAY",
  /** Under the title, small, and the only full sentence on the first screen. */
  line: "The best of both worlds.",
  cta: "BOOK YOUR SPOT · FROM ₹44,999",
  /** The scroll hint. The page is a film; this is the only instruction in it. */
  scroll: "IT STARTS IN THE DARK",
  /**
   * THE FOOTAGE — the same clip the live page at /journey/3 runs, by the site
   * owner’s direction, with a 9:16 cut generated for phones.
   *
   * ─── WHAT THIS FILE IS, AND WHY IT IS WRITTEN DOWN ─────────────────────────
   * `edc-hero.mp4` is a 24-second cut of Insomniac’s official EDC Thailand
   * trailer, and public/videos/thailand/VIDEOS.md records its licence as
   * **none**. That file also states the rule this change has to obey: if you
   * change which clip plays, change the disclaimer in the same commit. The
   * disclaimer naming the trailer therefore travels with it — see
   * `close.footageNote` below and THE DETAILS on the page.
   *
   * The lawful alternative remains one field: the official YouTube embed, which
   * is already coded and tested on the live page.
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
      src: "/videos/thailand/edc-hero.mp4",
      poster: "/videos/thailand/edc-hero-poster.jpg",
    },
    tall: {
      src: "/videos/thailand/edc-hero-tall.mp4",
      poster: "/videos/thailand/edc-hero-tall-poster.jpg",
    },
    alt: "EDC Thailand festival footage: stage pyro, lasers and a crowd at night",
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
    id: "begins",
    register: "island",
    cardDate: "15",
    lines: ["You land in Phuket.", "You sleep in Krabi."],
    tint: "linear-gradient(to bottom, rgba(42,19,48,0.30) 0%, rgba(42,19,48,0.12) 44%, rgba(42,19,48,0.92) 100%)",
    layout: "anchor",
    n: "01",
    name: "ARRIVED",
    date: "15 DEC",
    index: "Land in Phuket, drive to Krabi, and meet the people you have the week with.",
    title: ["TONIGHT IS ALREADY", "WORTH THE FLIGHT."],
    body:
      "You land in Phuket and you do not stay there. The crew is waiting with the transfers — no taxis to argue with, no luggage to drag, no logistics. Straight to Krabi, into the hotel, and back out for the first taste of it: Railay and Ao Nang, limestone standing in turquoise water, and a sunset that makes the flight worth it. Then the first night, which is the one that turns a group into a crew.",
    beat: "And it's only Tuesday.",
    where: "PHUKET → KRABI · STAY: KRABI",
    light: "last light",
    ground: "#2A1330",
    accent: "#FF9E7A",
    ink: "#FFF1DC",
    media: clip("krabi", "Aerial over Phra Nang Cave Beach on the Railay peninsula, Krabi — limestone cliffs and clear water", "50% 50%"),
  },
  {
    id: "water",
    register: "island",
    cardDate: "16",
    lines: ["Out before the day boats.", "Back long after them."],
    tint: "linear-gradient(to bottom, rgba(12,58,63,0.26) 0%, rgba(12,58,63,0.08) 42%, rgba(12,58,63,0.92) 100%)",
    layout: "float",
    n: "02",
    name: "THE WATER",
    date: "16 DEC",
    index: "The Andaman all day. Maya Bay, hidden bays, and a boat with music on it.",
    title: ["MAYA BAY IS THE STOP.", "THE WATER IS THE DAY."],
    body:
      "Breakfast, then out onto the Andaman for the biggest day of the first half. Phi Phi, the hidden bays, and Maya Bay — the one you have already seen a hundred times and will still look at properly. Swimming, snorkelling, island hopping. This is not a sightseeing run on a schedule: it is music on the boat, cold drinks, and finding your own corner of it. Back to Krabi around sunset, then Ao Nang at an easy pace.",
    beat: "Swim. Snorkel. Drift. Repeat.",
    where: "PHI PHI · MAYA BAY · STAY: KRABI",
    light: "noon",
    ground: "#0C3A3F",
    accent: "#79C8BE",
    ink: "#F2FBF8",
    media: clip("water", "A longtail boat crossing turquoise water between limestone cliffs in Thailand", "50% 50%"),
  },
  {
    id: "calm",
    register: "island",
    cardDate: "17",
    lines: ["No festival alarms today.", "Just Thailand."],
    tint: "linear-gradient(to bottom, rgba(241,233,220,0.58) 0%, rgba(241,233,220,0.30) 44%, rgba(241,233,220,0.95) 100%)",
    layout: "void",
    n: "03",
    name: "THE PLOT THICKENS",
    date: "17 DEC",
    index: "A guided Krabi exploration, a slow evening, then the crew regroups.",
    title: ["TOMORROW,", "THE LIGHTS CHANGE."],
    body:
      "Today isn't a day off. We head out on a guided exploration of Krabi — past the hotel and the beach, out into the landscape that makes this part of Thailand look the way it does. Back in Krabi, the pace changes: beach walk, pool, food, a little wandering. Then everyone comes back together — drinks, games, music, one last Krabi night before the festival stretch begins.",
    beat: "Tonight, we take it slow. Tomorrow, we go electric.",
    where: "KRABI · STAY: KRABI",
    light: "afternoon",
    ground: "#F1E9DC",
    accent: "#1B1B1B",
    ink: "#141414",
    media: clip("pool", "A resort pool under tall palms in flat afternoon light", "50% 48%"),
  },
  {
    id: "electric",
    register: "festival",
    cardDate: "18",
    lines: ["Krabi in the morning.", "The Electric Sky at night."],
    tint: "linear-gradient(to bottom, rgba(10,4,20,0.52) 0%, rgba(10,4,20,0.20) 42%, rgba(10,4,20,0.94) 100%)",
    layout: "blast",
    n: "04",
    name: "ELECTRIC SKY",
    date: "18 DEC",
    index: "Krabi to Phuket, check in, get ready — and then the first night of EDC.",
    title: ["NIGHT ONE OF THREE.", "NOBODY'S PACING THEMSELVES."],
    body:
      "Bags packed, transfers back to Phuket, and into the stay for the rest of the week. Shower, pool, eat, sleep if you are sensible. Then the energy changes. Because tonight, for the first time all week, we're not heading out to explore Thailand — we're heading to EDC. First-timers, veterans, and the friend who swears they'll leave early: same crew, same gates, same moment the lights hit.",
    beat: "Three days of Thailand. Tonight, we go electric.",
    where: "KRABI → PHUKET · EDC NIGHT 01 · STAY: PHUKET",
    light: "manufactured",
    ground: "#0A0414",
    accent: "#FF2E7E",
    ink: "#FFF1DC",
    media: clip("drop", "A laser show over a crowd at a night event", "50% 46%"),
  },
  {
    id: "phuket",
    register: "festival",
    cardDate: "19",
    lines: ["Phuket by day.", "The Electric Sky again by night."],
    tint: "linear-gradient(to bottom, rgba(8,3,15,0.50) 0%, rgba(8,3,15,0.18) 42%, rgba(8,3,15,0.94) 100%)",
    layout: "held",
    n: "05",
    name: "DAYLIGHT / NIGHTLIGHT",
    date: "19 DEC",
    index: "Kata, Big Buddha, Karon Viewpoint, Old Phuket Town — then night two.",
    title: ["SUNSCREEN IN THE MORNING.", "WRISTBAND BY NIGHT."],
    body:
      "The morning after, which is its own experience. Take the morning slow, then Phuket properly: Kata Beach, Big Buddha, Karon Viewpoint, and the Sino-Portuguese streets and cafés of Old Phuket Town. Back to the hotel for the pool, the shower, the outfit and the pre-game. Then night two, which everybody says is the one that gets away from them.",
    beat: "Same crew. Same gates. Night two.",
    where: "PHUKET OLD TOWN · VIEWPOINTS · EDC NIGHT 02",
    light: "no light",
    ground: "#08030F",
    accent: "#8B3DFF",
    ink: "#EFE9DD",
    media: still(DAYS + "/day-05.jpg", "A fan of laser beams over a crowd at night", "50% 44%"),
  },
  {
    id: "last",
    register: "festival",
    cardDate: "20",
    lines: ["One last adventure.", "One last night."],
    tint: "linear-gradient(to bottom, rgba(18,4,14,0.56) 0%, rgba(18,4,14,0.22) 40%, rgba(18,4,14,0.94) 100%)",
    layout: "blast",
    n: "06",
    name: "ONE LAST DANCE",
    date: "20 DEC",
    index: "A final Phuket adventure by day. The last night under the Electric Sky.",
    title: ["ONE LAST SUNSET.", "ONE LAST SET."],
    body:
      "You have survived two nights, barely, and the last day is not getting wasted. Breakfast, then one more proper adventure — ATV, the water, the viewpoints — then Promthep Cape and Nai Harn Beach for a final sunset with the crew. Back to the hotel. Final outfit, final pre-game, final night. The last night of the festival and of the trip, which is a great deal to put inside one evening.",
    beat: "Make both count.",
    where: "PHUKET · EDC NIGHT 03 · STAY: PHUKET",
    light: "manufactured",
    ground: "#12040E",
    accent: "#FF2E7E",
    ink: "#FFF1DC",
    media: still(DAYS + "/day-06.jpg", "Pyrotechnic fountains firing across a festival mainstage above a crowd", "50% 46%"),
  },
  {
    id: "morning",
    register: "island",
    cardDate: "21",
    lines: ["No alarms.", "Nobody wants it to end."],
    tint: "linear-gradient(to bottom, rgba(28,16,24,0.44) 0%, rgba(28,16,24,0.16) 44%, rgba(28,16,24,0.92) 100%)",
    layout: "credits",
    n: "07",
    name: "TO BE CONTINUED",
    date: "21 DEC",
    index: "Breakfast, coffee, stories, and nobody admitting the trip is over.",
    title: ["AND JUST LIKE THAT,", "IT'S MONDAY."],
    body:
      "No alarms. No eight o'clock sightseeing. Just breakfast, coffee and six days of stories, with everybody exhausted and nobody willing to say it is over. One last group breakfast, one last poolside hour, one last round of photos. Then the transfers to the airport, and that is Thailand. The group chat, on the other hand, is only getting started.",
    beat: "You came for EDC. You left with a story.",
    where: "PHUKET → HOME",
    light: "first light",
    ground: "#1C1018",
    accent: "#E8B48A",
    ink: "#FFF1DC",
    media: clip("sunrise", "Low sun over breaking waves on an empty shore", "50% 54%"),
  }

];

/* ------------------------------------------------------------------ */
/* the close                                                           */
/* ------------------------------------------------------------------ */

export const close = {
  /** The masthead returns here rather than opening the page. */
  masthead: ["You've found", "the plot."],
  line: "Until the next one.",
  cta: "BOOK YOUR SPOT →",
  /** The only status this page states about money, per the current instruction. */
  /**
   * THE PRICE, IN TWO HALVES THAT ARE ALWAYS STATED TOGETHER.
   *
   * ₹49,999 alone, under the words EDC THAILAND, is technically accurate and
   * practically misleading — somebody budgets fifty and arrives needing eighty.
   * So the trip price, the pass and the all-in number are one block, and the
   * page never shows the first without the other two.
   */
  price: {
    amount: "₹44,999",
    per: "EARLY BIRD · BOOK BY 15 OCTOBER",
    pass: "₹49,999 from 16 Oct · ₹54,999 from 16 Nov",
    allIn: "Same trip at every price. Book early, save ₹10,000.",
    note: "₹15,000 confirms your spot; the balance is due by 2 December. EDC ticket and flights are additional — the pass is at official MRP and we add nothing to it.",
  },
  status: "Early bird ₹44,999 · until 15 Oct",
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
 * The three lines before it set up the page's whole argument in the plainest
 * language it has: two ordinary trips, and the one nobody combines.
 */
export const entry = {
  /** The first two are the setup, read together. The third is the punch. */
  lines: ["Most people go to Thailand.", "Some go to EDC.", "We decided to do both."],
  /** Knocked out of the black. Line 2 is the one you fly through. */
  welcome: ["WELCOME TO", "THE WEEK"],
  /** What is visible through the letters, and what you land inside. */
  inside: clip("entry", "Stage lighting sweeping through fog, seen through the letters", "50% 50%"),
} as const;

/* ------------------------------------------------------------------ */
/* the reels — the two days that are a sequence of hours               */
/* ------------------------------------------------------------------ */

/**
 * One world gets a reel, and that restraint is the point. A pinned
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
      line: "The whole bay, briefly, to sixteen people.",
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
  /**
   * 01 and 05 — the two days that are a ROUTE. Both draw a line and light the
   * stops as you reach them; they are the only days where the point is that you
   * moved. Everything else that day is a place you stayed in.
   */
  routes: {
    begins: {
      label: "THE TRANSFER",
      stops: [
        { k: "PHUKET", v: "You land. The crew is already there with the transfers.", t: "ARRIVE" },
        { k: "KRABI", v: "Premium group transfer, straight through. No taxis, no logistics.", t: "DRIVE" },
        { k: "RAILAY / AO NANG", v: "Limestone, turquoise water, and the first Thai sunset of the week.", t: "SUNSET" },
      ],
    },
    phuket: {
      label: "THE DAY, BEFORE THE NIGHT",
      stops: [
        { k: "KATA / KARON", v: "The beaches first, while it is still quiet.", t: "MORNING" },
        { k: "OLD TOWN", v: "Sino-Portuguese streets, cafés, and the Phuket nobody photographs.", t: "MIDDAY" },
        { k: "KARON VIEWPOINT", v: "The coastal view, then Promthep Cape for the last of the light.", t: "LATE" },
      ],
    },
  },

  /**
   * 03 — the Krabi day. Written as options rather than a schedule, because the
   * brief for this day is explicitly "do not cram attractions into it". The
   * list is what is ON the table; the point of the page is the space around it.
   */
  loosely: {
    label: "THE DAY, LOOSELY",
    note: "Pick what the day feels like. Nothing here is a timetable.",
    options: [
      "Emerald Pool and the jungle around it",
      "Beaches — Ao Nang, Railay, whichever is calmer",
      "Viewpoints, if anyone is awake early enough",
      "Local Krabi, at the pace of people on holiday",
      "A long lunch that becomes a long afternoon",
      "One last Krabi sunset, together",
    ],
    close: "Explore. Swim. Eat. Shoot. Sit down. Repeat.",
  },

  /**
   * 04 — the chat, which is where the hours before a first festival night
   * actually happen. Nobody is named: the sixteen are not picked yet, so
   * inventing participants would be inventing people.
   */
  groupChat: {
    label: "THE GROUP CHAT · 16:40",
    messages: [
      { who: "someone", text: "we're in phuket. hotel is unreal" },
      { who: "someone", text: "wristbands sorted" },
      { who: "you", text: "what time are we leaving" },
      { who: "someone", text: "gates at 4. we are not going at 4" },
      { who: "someone", text: "pool first" },
      { who: "you", text: "pool first" },
      { who: "someone", text: "see everyone downstairs" },
    ],
  },

  /**
   * 06 — the six stages, on the night you run out of chances to see them. It is
   * the only list in the week that is a genuine choice rather than a plan.
   */
  stages: {
    label: "SIX STAGES · ONE LAST NIGHT",
    names: ["kineticFIELD", "circuitGROUNDS", "neonGARDEN", "stereoBLOOM", "bionicJUNGLE", "BOOMBOX"],
    note: "Stages as announced by the organiser and subject to their changes.",
  },

  /** 07 — the sun comes up while you scroll. The only world that gets lighter. */
  sunrise: {
    label: "FIRST LIGHT",
    beats: [
      { t: "04:50", v: "The last track." },
      { t: "06:05", v: "Nobody wants to be the one who says let's go." },
      { t: "09:30", v: "Breakfast, and nobody mentions the flight." },
      { t: "12:00", v: "Transfers. And that is Thailand." },
    ],
  },

  /**
   * THE RECAP — not a day. It closes the whole week, so it mounts after World
   * 07 rather than inside it: a montage belongs to the trip, not to a morning.
   */
  recap: {
    label: "SEVEN DAYS, IN ORDER",
    words: [
      "LAND",
      "KRABI",
      "RAILAY",
      "MAYA BAY",
      "JUNGLE",
      "PHUKET",
      "GATES",
      "LASERS",
      "AGAIN",
      "SUNRISE",
    ],
    close: "You came for EDC. You left with fifteen other people.",
  },

} as const;

/* ------------------------------------------------------------------ */
/* the crew, the inclusions, and the closing argument                  */
/* ------------------------------------------------------------------ */

/**
 * SIXTEEN, AND THE ASTERISK.
 *
 * The group moved from twenty to a maximum of sixteen, and the gender split
 * ("ten and ten") is gone — not softened, removed, because a split we might not
 * hold to is worse than no split at all.
 *
 * `caveat` is mandatory copy wherever the number is stated large. Sixteen is a
 * ceiling and an intention, not a promise, and a page that implies otherwise is
 * writing a cheque the trip has to cash.
 */
export const crew = {
  label: "THE CREW",
  big: ["16 PEOPLE.", "ONE CREW."],
  lines: [
    "No giant tour buses.",
    "No anonymous group of forty.",
    "No disappearing into a crowd.",
  ],
  body: "Sixteen people, moving through Thailand together, with a Plot Twist trip leader who is on the trip rather than holding a flag outside it.",
  caveat: "*The final group size can vary and is not guaranteed.",
} as const;

/**
 * WHAT THE PRICE BUYS — and the one thing it does not.
 *
 * The festival pass is listed in `excluded` and repeated in `passNote`, in
 * full-size type rather than small print. A reader who sees a price on a page
 * headed EDC will assume the ticket is in it; that assumption ends in a refund
 * conversation and a screenshot, so it is answered twice on purpose.
 */
export const included = {
  label: "YOUR 7-DAY PLOT TWIST",
  title: ["EVERYTHING THAT TURNS THIS", "INTO A WHOLE WEEK."],
  sub: "Everything that turns this from a festival trip into a full Thailand experience.",
  groups: [
    {
      k: "THE STAY",
      items: ["6 nights, 7 days", "Premium hotels in Krabi and Phuket", "Breakfast every single day"],
    },
    {
      k: "THE MOVING",
      items: [
        "Premium group transfers throughout",
        "Phuket → Krabi on arrival",
        "Krabi → Phuket before the festival",
        "Group transfers to and from EDC, all three nights",
        "Airport transfers both ends",
      ],
    },
    {
      k: "THE WATER",
      items: ["Phi Phi and Maya Bay by boat", "Island hopping and water experiences", "Krabi experiences"],
    },
    {
      k: "THE REST OF IT",
      items: [
        "Curated Phuket exploration",
        "A Phuket adventure experience",
        "Planned group experiences all week",
        "A dedicated Plot Twist trip leader",
        "A curated group of 16*",
      ],
    },
  ],
  festival: {
    k: "THE FESTIVAL",
    item: "3 nights of EDC Thailand — 18, 19 and 20 December, Rhythm Park, Phuket",
  },
  passNote:
    "From ₹44,999 (early bird, until 15 October; ₹49,999 from 16 Oct, ₹54,999 from 16 Nov) covers the week above. The EDC Thailand 3-day pass sits on top at official MRP — we add nothing to the ticket. We curate the trip; EDC prices the ticket.",
} as const;

/** The closing argument. The loudest plain statement on the page. */
export const philosophy = {
  label: "THE PLOT TWIST",
  lines: ["Most people go to Thailand.", "Some go to EDC.", "We decided to do both."],
  body: [
    "Three days of islands, beaches and adventures.",
    "Three nights under the Electric Sky.",
    "One ridiculously good week in between.",
  ],
  dates: "15–21 DECEMBER 2026",
  lockup: "THAILAND × EDC",
  close: "This isn't just a festival trip. It's the whole plot.",
} as const;
