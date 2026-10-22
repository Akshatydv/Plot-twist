/**
 * SRI LANKA — JOURNEY 4'S PAGE.
 *
 * All copy for the "srilanka" page variant lives here, the same way Bir's
 * lives in content/bir.ts. Components read; they never hold words. The
 * architecture this copy is written against is in docs/sri-lanka-design.md.
 *
 * ─── THE ONE RULE ───────────────────────────────────────────────────────────
 * What the brief supplied is stated flat: the dates (29 Dec 2026 → 4 Jan
 * 2027), the length (7 days / 6 nights), the route (Galle → Ahangama →
 * Mirissa → Ella — a slow southern Sri Lanka escape), New Year's Eve in
 * Mirissa, the price (₹54,999; early bird ₹49,999, final ₹59,999), flights
 * not included. NOT decided, and never named: hotels, the NYE venue,
 * restaurants, activity prices.
 *
 * Two things have NOT been supplied and are modelled honestly:
 *   - the INCLUSIONS   → the categories the brief lists, flagged as being
 *                        finalised with the price (`inclusions.confirmed: false`)
 *   - THE SECRET       → withheld on purpose. Nothing on the page says what it is,
 *                        because nothing has been decided that it could say.
 *
 * One line is a story beat rather than a fact, and must be checked before
 * launch: "16 strangers" (the seat count is the brief's own number). No
 * train time is stated for the Nine Arches Bridge — trains cross several
 * times a day.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { MediaSlot, PhotoCredit } from "@/content/bir";

export type { MediaSlot };

/* ------------------------------------------------------------------ */
/* credits                                                             */
/* ------------------------------------------------------------------ */

/**
 * ─── WHAT IS SHOWN AS SRI LANKA, AND WHAT IS NOT ────────────────────────────
 * PLACE photographs — the train, the bridge, Ella, Little Adam's Peak, the
 * falls, Mirissa, Weligama, the stilt fishermen, Colombo — were taken there,
 * checked against their Commons title and description.
 *
 * MOMENT images — the NYE fireworks, the dance floor, breakfast, the pool,
 * the boat at sunset, the long table, and every Mixkit clip — are chosen for
 * the moment, not the map, exactly as Bir's were. None is captioned or
 * alt-texted as Sri Lanka.
 *
 * Licences: CC BY / BY-SA (credit required), CC0, and the Mixkit Free licence
 * (credit not required, given anyway). Every Mixkit clip was checked one by
 * one for `copyrightNotice: "Free"` — every clip on Mixkit's own Sri Lanka
 * page is under its RESTRICTED (personal-use) licence, and none of those is
 * used. An image added without a credit line is a licence breach.
 */
const CC_BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const CC_BY_SA_3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" };
const CC_BY_SA_2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const CC_BY_4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };
const CC_BY_3 = { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" };
const CC_BY_2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const CC0 = { license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const MIXKIT = { license: "Mixkit Free License", licenseUrl: "https://mixkit.co/license/#videoFree" };
const COMMONS = "https://commons.wikimedia.org/wiki/File:";
const P = "/photos/srilanka";
const V = "/videos/srilanka";

export const photos = {
  // ── place photographs: taken in Sri Lanka ──
  trainBridge: { file: `${P}/train-bridge.jpg`, title: "A Train Crosses The Nine Arches Bridge", author: "Angshuman Chatterjee", ...CC_BY_SA_3, source: `${COMMONS}A_Train_Crosses_The_Nine_Arches_Bridge_(243270425).jpeg` },
  bridgeMist: { file: `${P}/bridge-mist.jpg`, title: "Nine Arches Bridge, Demodara", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}Nine_Arches_Bridge,_Demodara_2023-04-29-1.jpg` },
  ellaRock: { file: `${P}/ella-rock.jpg`, title: "Beauty of Ella", author: "TP hettiarachchi", ...CC_BY_SA_4, source: `${COMMONS}Beauty_of_Ella.jpg` },
  ellaGap: { file: `${P}/ella-gap.jpg`, title: "Ella Gap (Valley), Sri Lanka", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Ella_Gap_(Valley),_Sri_Lanka.jpg` },
  ellaDawn: { file: `${P}/ella-dawn.jpg`, title: "Morning Vibes Srilanka", author: "Isuraamara", ...CC_BY_SA_4, source: `${COMMONS}Morning_Vibes_Srilanka.jpg` },
  littleAdams: { file: `${P}/little-adams.jpg`, title: "Little Adam's Peak Sri Lanka", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Little_Adam%27s_Peak_Sri_Lanka_(30073592055).jpg` },
  ravana: { file: `${P}/ravana.jpg`, title: "Rawana Ella Falls", author: "Ankur Panchbudhe", ...CC_BY_2, source: `${COMMONS}Rawana_Ella_Falls_(23343682506).jpg` },
  ellaNight: { file: `${P}/ella-night.jpg`, title: "Street scene at night in Ella, Sri Lanka", author: "Jonashtand", ...CC_BY_SA_4, source: `${COMMONS}202312_Street_scene_at_night_in_Ella,_Sri_Lanka.jpg` },
  mirissaAerial: { file: `${P}/mirissa-aerial.jpg`, title: "Mirissa beach aerial", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Mirissa_beach_aerial_(29448581263).jpg` },
  mirissaCoast: { file: `${P}/mirissa-coast.jpg`, title: "Mirissa Luftbild", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Mirissa_Luftbild_(29448583993).jpg` },
  mirissaBay: { file: `${P}/mirissa-bay.jpg`, title: "Mirissa Bay Panorama", author: "Kondephy", ...CC_BY_SA_4, source: `${COMMONS}Mirissa_Bay_Panorama.jpg` },
  coconutAerial: { file: `${P}/coconut-aerial.jpg`, title: "Amazing Coconut Tree Hill", author: "Sachin Kaveesha Fernando", ...CC_BY_SA_4, source: `${COMMONS}Amazing_Coconut_Tree_Hill.jpg` },
  palms: { file: `${P}/palms.jpg`, title: "View from Coconut Tree Hill to Mirissa", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}View_from_Coconut_Tree_Hill_to_Mirissa_in_March.jpg` },
  surfer: { file: `${P}/surfer.jpg`, title: "Weligama, Sri Lanka", author: "Filipp Nekhaev", ...CC0, source: `${COMMONS}Weligama,_Sri_Lanka_(Unsplash).jpg` },
  surfboards: { file: `${P}/surfboards.jpg`, title: "Mirissa - surfboards", author: "Dan Arndt", ...CC_BY_SA_4, source: `${COMMONS}Mirissa_-_surfboards.jpg` },
  dusk: { file: `${P}/dusk.jpg`, title: "Mirissa, sunset", author: "Arian Zwegers", ...CC_BY_2, source: `${COMMONS}Mirissa,_sunset_(6517708167).jpg` },
  stilt: { file: `${P}/stilt.jpg`, title: "Fishermen practicing traditional stilt fishing near Galle", author: "Jakub Hałun", ...CC_BY_4, source: `${COMMONS}Fishermen_practicing_traditional_stilt_fishing_near_Galle,_southern_Sri_Lanka,_20260207_1419_9452.jpg` },
  goldBeach: { file: `${P}/gold-beach.jpg`, title: "Jaga Beach, Sri Lanka", author: "Rod Waddington", ...CC_BY_SA_2, source: `${COMMONS}Jaga_Beach,_Sri_Lanka_(in_explore)_-_Flickr_-_Rod_Waddington.jpg` },
  colomboNight: { file: `${P}/colombo-night.jpg`, title: "Stunning Night View of Colombo City Skyline", author: "Thilina Alagiyawanna", ...CC0, source: `${COMMONS}Stunning_Night_View_of_Colombo_City_Skyline.jpg` },
  kingCoconut: { file: `${P}/king-coconut.jpg`, title: "King of Coconut", author: "Yumeshan Lakshitha", ...CC_BY_SA_4, source: `${COMMONS}King_of_Coconut.jpg` },
  paddy: { file: `${P}/paddy.jpg`, title: "Paysage du Sri Lanka 2", author: "Dinkum", ...CC_BY_SA_3, source: `${COMMONS}Paysage_du_Sri_Lanka_2.jpg` },
  tea: { file: `${P}/tea.jpg`, title: "Ceylon Tee Sri Lanka", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Ceylon_Tee_Sri_Lanka_(29446719583).jpg` },
  ahangama: { file: `${P}/ahangama.jpg`, title: "Stilt Fishing in Ahangama", author: "Diluckshan Puviraj", ...CC_BY_SA_4, source: `${COMMONS}Stilt_Fishing_in_Ahangama.jpg` },
  galleLighthouse: { file: `${P}/galle-lighthouse.jpg`, title: "Lighthouse Galle, Sri Lanka", author: "Samal Nadeeshan", ...CC_BY_SA_4, source: `${COMMONS}Lighthouse_Galle,_Sri_Lanka.jpg` },
  galleDusk: { file: `${P}/galle-dusk.jpg`, title: "Galle Fort and lighthouse", author: "calflier001", ...CC_BY_SA_2, source: `${COMMONS}GALLE_FORT_AND_LIGHTHOUSE_GALLE_SRI_LANKA_JAN2013_(8510167078).jpg` },
  galleStreet: { file: `${P}/galle-street.jpg`, title: "Galle fort street", author: "Saqib Qayyum", ...CC_BY_SA_3, source: `${COMMONS}Galle_fort_street.JPG` },
  // ── moment photographs: not Sri Lanka, never labelled as it ──
  nyeBeach: { file: `${P}/nye-beach.jpg`, title: "Rio New Year Fireworks", author: "Porto Bay Hotels & Resorts", ...CC_BY_2, source: "https://commons.wikimedia.org/w/index.php?curid=23505838" },
  dance: { file: `${P}/dance.jpg`, title: "Night techno party, dancing", author: "Vyacheslav Argenberg", ...CC_BY_4, source: "https://commons.wikimedia.org/w/index.php?curid=91338605" },
  crowd: { file: `${P}/crowd.jpg`, title: "Crowded people, night pub party", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/11189730/crowded-people-night-pub-party" },
  breakfast: { file: `${P}/breakfast.jpg`, title: "Tropical breakfast, fruit salad", author: "Vyacheslav Argenberg", ...CC_BY_4, source: "https://commons.wikimedia.org/w/index.php?curid=110878389" },
  hammock: { file: `${P}/hammock.jpg`, title: "Summer holiday, beach vacation, sea", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/5913323/image-public-domain-trees-blue" },
  friends: { file: `${P}/friends.jpg`, title: "Nature Water", author: "David McEachan", ...CC0, source: "https://stocksnap.io/photo/nature-water-H8UOZSGRC1" },
  dinnerSea: { file: `${P}/dinner-sea.jpg`, title: "Seaside dinner at dusk", author: "PattayaPatrol", ...CC_BY_SA_4, source: "https://commons.wikimedia.org/w/index.php?curid=195229122" },
} satisfies Record<string, PhotoCredit>;

/**
 * THE FOOTAGE. Every clip is a silent loop of 7–18s, cross-faded end-into-
 * start so the seam doesn't jump. hero and hero-mobile are montages
 * cut from several of the sources below; because they include CC BY-SA
 * material they are themselves offered under CC BY-SA 4.0. Full log:
 * public/videos/srilanka/VIDEOS.md.
 */
export const footage = {
  train: { file: `${V}/hero.mp4#train`, title: "Train in Pattipola, highest station in Sri Lanka", author: "Cherubino", ...CC_BY_SA_3, source: `${COMMONS}Pattipola_train.webm` },
  landing: { file: `${V}/landing.mp4`, title: "Landing at Colombo Airport, Sri Lanka", author: "Yosef Ben Melamed", ...CC_BY_SA_4, source: `${COMMONS}Landing_in_Colombo.webm` },
  tuktuk: { file: `${V}/hero.mp4#tuktuk`, title: "Tuk-tuks in Sri Lanka", author: "Cherubino", ...CC_BY_SA_3, source: `${COMMONS}Tuk-tuks_in_Sri_Lanka.webm` },
  ocean: { file: `${V}/ocean.mp4`, title: "Aerial Shot Of Sea With Speedboat", author: "bellergy", ...CC0, source: `${COMMONS}Aerial_Shot_Of_Sea_With_Speedboat.webm` },
  hero: { file: `${V}/hero.mp4`, title: "Flying low over the sea of a beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/flying-low-over-the-sea-of-a-beach-44392/" },
  jungle: { file: `${V}/jungle.mp4`, title: "Fly over a huge canyon covered in vegetation", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/fly-over-a-huge-canyon-covered-in-vegetation-41401/" },
  cliffs: { file: `${V}/hero.mp4#cliffs`, title: "Sea waves in a little bay", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/sea-waves-in-a-little-bay-1954/" },
  palmSunset: { file: `${V}/palm-sunset.mp4`, title: "Bright orange sunset on beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/bright-orange-sunset-on-beach-2168/" },
  van: { file: `${V}/van.mp4`, title: "Road trip as a couple aboard a van", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/road-trip-as-a-couple-aboard-a-van-41582/" },
  window: { file: `${V}/window.mp4`, title: "Girl enjoying the air during a road trip", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/girl-enjoying-the-air-during-a-road-trip-in-a-41583/" },
  surfWalk: { file: `${V}/hero.mp4#surf`, title: "Person with surfboard walks towards waves", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/person-with-surfboard-walks-towards-waves-1044/" },
  fireworks: { file: `${V}/fireworks.mp4`, title: "People seeing fireworks in the beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/people-seeing-fireworks-in-the-beach-4155/" },
  fireworksGold: { file: `${V}/fireworks-gold.mp4`, title: "Fireworks in the beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/fireworks-in-the-beach-4156/" },
  oceanTall: { file: `${V}/ocean-tall.mp4`, title: "Aerial view of the beautiful turquoise waves crashing on the beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/aerial-view-of-the-beautiful-turquoise-waves-crashing-on-the-51500/" },
  palmTall: { file: `${V}/hero-mobile.mp4#palm`, title: "Palm tree in front of the sun", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/palm-tree-in-front-of-the-sun-1191/" },
  road: { file: `${V}/road.mp4`, title: "Going down a curved highway through a mountain range", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/going-down-a-curved-highway-through-a-mountain-range-41576/" },
  morning: { file: `${V}/morning.mp4`, title: "Palm tree on a sunny day", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/palm-tree-on-a-sunny-day-4645/" },
  goldShore: { file: `${V}/gold-shore.mp4`, title: "Sunset from a peaceful beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/sunset-from-a-peaceful-beach-44496/" },
  boatSunset: { file: `${V}/boat-sunset.mp4`, title: "The sunset near the seashore", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/the-sunset-near-the-seashore-3100/" },
  surferDusk: { file: `${V}/surfer-dusk.mp4`, title: "Surfer walking toward the ocean at sunset", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/surfer-walking-toward-the-ocean-at-sunset-1002/" },
} satisfies Record<string, PhotoCredit>;

/** A still slot. */
const still = (c: PhotoCredit, alt: string, focus = "50% 50%"): MediaSlot => ({ image: c.file, alt, focus });
/** A clip under /videos/srilanka/<name>.mp4 with its poster. No WebM: the encoder on hand has no VP9. */
const clip = (name: string, alt: string, focus = "50% 50%"): MediaSlot => ({
  video: `${V}/${name}.mp4`,
  image: `${V}/${name}-poster.jpg`,
  alt,
  focus,
});

/* ------------------------------------------------------------------ */
/* the trip                                                            */
/* ------------------------------------------------------------------ */

export const trip = {
  name: "SRI LANKA",
  length: "7 DAYS · 6 NIGHTS",
  /** CONFIRMED by the brief. Must agree with seo.startDate / endDate in journeys/journey4.ts. */
  dates: "29 DEC — 4 JAN",
  datesLong: "29 December 2026 — 4 January 2027",
  route: ["GALLE", "AHANGAMA", "MIRISSA", "ELLA"] as const,
  /** The brief's own number ("16 strangers"). Confirm before launch. */
  seats: 16,
  ages: "18–30",
} as const;

/* ------------------------------------------------------------------ */
/* the chapters                                                        */
/* ------------------------------------------------------------------ */

/**
 * THE SEVEN WORLDS. The chapter navigator, the film index and every chapter
 * card read from this one list, so a chapter can never be renamed in one
 * place and not another. `tone` is the world's signature colour — the
 * navigator borrows it as you enter.
 *
 * The route: GALLE → AHANGAMA → MIRISSA → ELLA. A slow southern Sri Lanka
 * escape — heritage, the creative coast, New Year's Eve, then the mountains.
 * Less rush. More story.
 */
export const chapters = [
  { id: "world-01", n: "01", date: "29 DEC", name: "THE BEGINNING", short: "THE BEGINNING", place: "COLOMBO AIRPORT → GALLE", feel: "galle fort · ramparts · welcome dinner", tone: "#F2A23A" },
  { id: "world-02", n: "02", date: "30 DEC", name: "THE CREATIVE COAST", short: "THE CREATIVE COAST", place: "GALLE → AHANGAMA", feel: "stilt fishers · surf · golden hour", tone: "#7FC48A" },
  { id: "world-03", n: "03", date: "31 DEC", name: "THE COUNTDOWN", short: "THE COUNTDOWN", place: "AHANGAMA → MIRISSA", feel: "sunset · dinner · midnight", tone: "#FF4F6D" },
  { id: "world-04", n: "04", date: "1 JAN", name: "THE FIRST DAY", short: "THE FIRST DAY", place: "MIRISSA · THE SOUTH COAST", feel: "first swim · coconut tree hill · hiriketiya", tone: "#F6D7A0" },
  { id: "world-05", n: "05", date: "2 JAN", name: "OCEAN TO MOUNTAINS", short: "OCEAN TO MOUNTAINS", place: "MIRISSA → ELLA", feel: "ocean → tea country → ella", tone: "#3FD0BF" },
  { id: "world-06", n: "06", date: "3 JAN", name: "THE LAST ASCENT", short: "THE LAST ASCENT", place: "ELLA", feel: "nine arches · the peak · the debrief", tone: "#C9A7FF" },
  { id: "world-07", n: "07", date: "4 JAN", name: "THE WAY HOME", short: "THE WAY HOME", place: "ELLA → COLOMBO", feel: "last breakfast · the road · airport", tone: "#F4EDE1" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
export const chapter = (id: ChapterId) => chapters.find((c) => c.id === id)!;

/* ------------------------------------------------------------------ */
/* 00 · the hero                                                       */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: "PLOT TWIST — JOURNEY 4",
  title: "SRI LANKA",
  line: "THE ISLAND AFTER DARK",
  dates: trip.dates,
  meta: "7 DAYS. ONE ISLAND. ONE NEW YEAR.",
  cta: { label: "ENTER THE JOURNEY", href: "#entry" },
  secondary: { label: "I'M IN", href: "#apply" },
  /** Two cuts: 16:9 for landscape screens, 9:16 for phones (it's an Instagram-ad page). */
  video: {
    wide: { src: `${V}/hero.mp4`, poster: `${V}/hero-poster.jpg` },
    tall: { src: `${V}/hero-mobile.mp4`, poster: `${V}/hero-mobile-poster.jpg` },
    alt: "A montage: flying low over the sea towards a green headland, a hill-country train, a jungle valley from the air, a street full of tuk-tuks, surf on rocks, palms at sunset, a crowd on a beach under fireworks",
  },
} as const;

/* ------------------------------------------------------------------ */
/* ~~ the entry — the transition into the island                       */
/* ------------------------------------------------------------------ */

export const entry = {
  lines: ["Forget what you think a group trip looks like.", "This one has a plot."] as const,
  welcome: ["WELCOME TO", "SRI LANKA."] as const,
  /** What the knockout letters are filled with, and what you fly into. */
  inside: clip("jungle", "Flying over a deep green valley, a river threading through the bottom of it"),
  index: {
    label: "THE FILM",
    lead: "You're not joining a tour.",
    body: "You're joining a Plot Twist. Galle's fort, a surf coast, New Year's Eve by the sea, then up into Ella's mountains — and we plan every experience along the way, so all you have to do is show up. Seven days. Four worlds. A lot to experience. Zero rush.",
    scribble: "don't skip ahead. (you will.)",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 01 · 29 dec — the beginning: galle                                  */
/* ------------------------------------------------------------------ */

/**
 * THE PLOT TWIST RULE FOR EVERY DAY: relaxed ≠ unplanned. We plan the
 * experience so you don't have to plan the trip — curated moments with
 * breathing room between them, never free time to figure out alone.
 * No clock times are stated unless confirmed; days are told in day-parts.
 */
export const world1 = {
  ...chapter("world-01"),
  lines: ["You land in Colombo.", "By golden hour you're on the ramparts of a 400-year-old fort, and the story has properly begun."] as const,
  slot: clip("landing", "Looking out over an aircraft wing as it descends towards a green coastline", "50% 40%"),

  board: {
    kicker: "DEPARTURES · 29 DEC",
    /** The rows that flip in. Cities are where people fly from, not a promise of a group flight. */
    rows: [
      { from: "DELHI", code: "DEL" },
      { from: "MUMBAI", code: "BOM" },
      { from: "BENGALURU", code: "BLR" },
      { from: "CHENNAI", code: "MAA" },
      { from: "WHEREVER YOU ARE", code: "???" },
    ],
    to: "COLOMBO",
    status: "BOARDING",
    note: "Flights aren't included — book from wherever you are. Your trip leader meets you at arrivals in Colombo, and our private group vehicle takes it from there.",
    scribble: "everyone lands. then it starts.",
  },

  road: {
    kicker: "THE PLOT TWIST ROADTRIP",
    title: ["THE JOURNEY", "IS THE FIRST", "EXPERIENCE."] as const,
    body: "Airport pickup, then south along the coast to Galle in our private group vehicle. Out of the city, past the paddy fields, towards the sea — the van becomes the group chat with wheels.",
    /** Panels of the horizontal reel, left to right. */
    frames: [
      { word: "Music.", note: "aux goes round the van. no skipping.", slot: clip("van", "Two friends up front in a car, green fields through the windscreen", "60% 50%") },
      { word: "Snacks.", note: "a planned roadside stop. king coconut. short eats.", slot: still(photos.kingCoconut, "A king-coconut seller sitting beside his bicycle, hung with bright orange coconuts", "30% 50%") },
      { word: "Games.", note: "two truths and a lie, somewhere past the paddy fields.", slot: still(photos.paddy, "Bright green paddy fields, a white stupa and coconut palms behind", "62% 50%") },
      { word: "New people.", note: "fifteen strangers. for about an hour.", slot: clip("window", "A passenger with her hand out of the car window, green fields rushing past", "55% 50%") },
      { word: "Galle.", note: "an old fort with the sea on three sides.", slot: still(photos.galleLighthouse, "Galle's white lighthouse against a blue sky, palms and the fort wall below it", "60% 50%") },
    ],
  },

  /** The afternoon and evening, one beat at a time. Day-parts, not clock times. */
  sunset: {
    kicker: "29 DEC · GALLE",
    title: "GALLE, PROPERLY.",
    times: ["AFTERNOON", "THE FORT", "GOLDEN HOUR", "EVENING"] as const,
    lines: ["Check in, then straight into Galle Fort.", "The ramparts, the old streets, the corners you'd never find alone — and a curated café stop.", "Golden hour on the ocean-facing walls. Everyone goes quiet.", "The welcome dinner. Our first proper evening together."] as const,
    slot: still(photos.galleDusk, "Galle Fort's sea wall under a pink dusk sky, the lighthouse in the distance", "50% 55%"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 02 · 30 dec — the creative coast: ahangama                          */
/* ------------------------------------------------------------------ */

export const world2 = {
  ...chapter("world-02"),
  lines: ["We don't take you to Ahangama.", "We show you Ahangama."] as const,
  slot: still(photos.ahangama, "Stilt fishermen perched on poles in the surf at Ahangama", "50% 50%"),

  /**
   * The horizontal reel of the day — one screen per beat. The huge outlined
   * label is a day-part, not a clock time: nothing here is a confirmed time.
   */
  beats: [
    {
      key: "coast" as string,
      time: "AM",
      title: ["THE COASTAL", "RUN."] as const,
      line: "Galle to Ahangama, the scenic way.",
      note: "Breakfast in the fort, then along the southern coast — palms, fishing boats, the sea on one side the whole way — with the stilt fishermen around Ahangama and Weligama as our first stop.",
      slot: still(photos.ahangama, "Stilt fishermen perched on poles in the surf at Ahangama", "50% 50%"),
    },
    {
      key: "surf",
      time: "MIDDAY",
      title: ["YOUR FIRST", "WAVE."] as const,
      line: "In the ocean, not just looking at it.",
      note: "A beach morning around Ahangama and Kabalana, and a curated beginner-friendly surf or water session where conditions allow. Instructors handle the technique; you handle the falling off.",
      slot: still(photos.surfer, "A surfer with a longboard on a golden beach under big clouds", "60% 50%"),
    },
    {
      key: "lunch",
      time: "PM",
      title: ["LUNCH, THEN", "THE CREATIVE COAST."] as const,
      line: "A curated coastal food stop.",
      note: "Then Ahangama itself: the cafés, the surf shops, the people who came for a week and stayed a year. We know where to go, so you don't have to.",
      slot: still(photos.breakfast, "A tropical spread: fruit, coffee and juice on a wooden table", "50% 50%"),
    },
    {
      key: "sunset",
      time: "DUSK",
      title: ["GOLDEN HOUR,", "ON THE COAST."] as const,
      line: "A proper sunset, planned.",
      note: "The beach we've picked for it, the sky going orange behind the fishermen, sixteen people on the sand pretending they're not taking the same photo.",
      slot: still(photos.goldBeach, "A golden sunset over a quiet beach on Sri Lanka's south coast", "50% 50%"),
    },
    {
      key: "night",
      time: "NIGHT",
      title: ["THE NIGHT BEFORE", "THE NIGHT."] as const,
      line: "Group dinner by the sea.",
      note: "Then a beach-side social evening — the format locked once the final plan is — and everyone pretending to be calm about tomorrow.",
      slot: still(photos.dinnerSea, "Candlelit tables along a shoreline at dusk", "50% 55%"),
    },
  ],
  scribble: "drag it. or scroll. or both.",
} as const;

/* ------------------------------------------------------------------ */
/* 03 · 31 dec — the countdown: mirissa                                */
/* ------------------------------------------------------------------ */

/**
 * New Year's Eve: arrive → settle in → golden hour → get ready → the night.
 * The venue is not final, so nothing names one — "a curated coastal New
 * Year's celebration in southern Sri Lanka" is as specific as the page gets.
 * The ramp's clock is the scroll device counting down to midnight; its
 * readings are illustrative, and the lines carry the actual plan.
 */
export const world3 = {
  ...chapter("world-03"),
  lines: ["Ahangama to Mirissa, the long way round the coast.", "Something is coming."] as const,
  slot: still(photos.mirissaCoast, "Mirissa from the air: palms, a curve of beach and white surf", "50% 50%"),

  /**
   * THE LIGHT RAMP — one pinned frame, the day going dark around you. Each
   * stage owns a slice of the scroll; the clock runs from the first time to
   * the last as you go. Order matters: it is the day, in order.
   */
  ramp: [
    { at: "09:30", word: "SLOW BREAKFAST", line: "Last morning in Ahangama. Nobody's rushed.", slot: still(photos.ahangama, "Stilt fishermen perched on poles in the surf at Ahangama", "50% 50%") },
    { at: "11:00", word: "THE COAST ROAD", line: "Coastal viewpoints, a beach stop, palm-lined roads, photographs on the way.", slot: clip("window", "A passenger with her hand out of the car window, green fields rushing past", "55% 50%") },
    { at: "13:00", word: "MIRISSA", line: "Check in. Then the beach and the bay.", slot: still(photos.mirissaBay, "Mirissa bay, waves breaking below a green headland", "50% 50%") },
    { at: "15:00", word: "THE BAY", line: "Palms, a swim, the afternoon on the sand.", slot: still(photos.palms, "Coconut palms leaning over a turquoise bay", "50% 50%") },
    { at: "18:00", word: "GOLDEN HOUR", line: "The last sunset of 2026 — a dedicated moment, not an afterthought.", slot: clip("palm-sunset", "Palms against a red-and-orange sunset over the sea") },
    { at: "19:30", word: "GET READY", line: "Back to the stay. Music on. Four mirrors, one charger.", slot: still(photos.dusk, "The sea under a violet dusk, a headland dark on the horizon", "50% 60%") },
    { at: "21:00", word: "DINNER", line: "One long table by the water.", slot: still(photos.dinnerSea, "Candlelit tables along a shoreline at dusk", "50% 55%") },
    { at: "22:30", word: "MUSIC", line: "Low, then not so low.", slot: still(photos.dance, "Silhouettes dancing under coloured lights", "50% 40%") },
    { at: "23:30", word: "THE CELEBRATION", line: "The whole group, together, as the year runs out.", slot: still(photos.crowd, "A crowd with hands up in pink haze and spotlights", "50% 50%") },
    { at: "23:58", word: "THE OCEAN", line: "Everyone walks down to the water.", slot: clip("fireworks", "A crowd sitting on a dark beach, the first fireworks going up over the sea") },
  ],
  midnightWord: "MIDNIGHT.",

  party: {
    kicker: "THE COUNTDOWN · A PLOT TWIST ORIGINAL",
    title: ["MIDNIGHT", "IN PARADISE"] as const,
    body: "A curated coastal New Year's celebration in southern Sri Lanka, included in the trip. Not a ticket to someone else's party — a night planned around our group: dinner, music, the celebration, the countdown, and one minute everyone's going to remember. The venue is being locked in now.",
    /** The night's running order, read top to bottom like a programme. */
    programme: ["GET READY", "DINNER", "MUSIC", "11:59", "00:00", "2027"] as const,
  },

  countdown: {
    lead: ["One minute.", "One coast.", "16 strangers.", "And a year waiting to begin."] as const,
    year: "2027",
    after: "Happy New Year. You're not strangers any more.",
    slot: clip("fireworks-gold", "Gold fireworks bursting over a beach at night, people silhouetted at the waterline"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 04 · 1 jan — the first day                                          */
/* ------------------------------------------------------------------ */

/**
 * A slower start, not an empty day. Sleep in, then THE COASTAL RUN: the
 * Mirissa bay, Coconut Tree Hill, Ahangama, and Hiriketiya as a curated
 * excursion where the final route allows. No openly licensed photograph of
 * Hiriketiya could be found, so it is named in text and never pinned to a
 * photo of somewhere else.
 */
export const world4 = {
  ...chapter("world-04"),
  heading: ["THE FIRST", "DAY"] as const,
  lines: ["Sleep in.", "Late breakfast.", "No forced early start."] as const,
  turn: ["Then the first day of 2027 begins.", "We make the most of it."] as const,
  slot: clip("morning", "Looking up through a palm tree, the sun flaring between its fronds"),
  /** Above the prints: the day's curated stops. */
  exploreTag: "THE COASTAL RUN · MIRISSA · COCONUT TREE HILL · AHANGAMA · HIRIKETIYA",
  /** The day in frames. Captions, not features. */
  moments: [
    { caption: "late breakfast. no alarm.", image: photos.breakfast.file, alt: "A tropical breakfast: fruit, coffee and juice on a wooden table", tilt: -3 },
    { caption: "coconut tree hill, mirissa.", image: photos.coconutAerial.file, alt: "Coconut Tree Hill near Mirissa from above, surf breaking around the headland", tilt: 2 },
    { caption: "the first swim of 2027.", image: photos.surfboards.file, alt: "Surfboards stacked on the sand at golden hour, an island offshore", tilt: -1.5 },
    { caption: "the first sunset of 2027.", image: photos.goldBeach.file, alt: "A golden sunset over a quiet beach on Sri Lanka's south coast", tilt: 3 },
  ],
  swim: {
    kicker: "1 JAN · THE FIRST SWIM",
    title: ["FIRST SWIM", "OF 2027."] as const,
    body: "Then the coastal run: Mirissa's bay, the palms of Coconut Tree Hill, back along the coast to Ahangama's cafés and surf — and, where the final route allows, a curated excursion to the bay at Hiriketiya. A beach or water experience, the first sunset of 2027, and a group dinner to close it.",
    slot: clip("gold-shore", "Late gold light on a beach, small waves running up the sand"),
    scribble: "we start the year slowly. we still make the most of it.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 05 · 2 jan — ocean to mountains                          */
/* ------------------------------------------------------------------ */

export const world5 = {
  ...chapter("world-05"),
  lines: ["One last look at the sea.", "Then the road climbs, and the island changes colour."] as const,
  slot: clip("ocean", "Looking down on deep blue sea as a speedboat carves a white wake towards a green island"),

  /** OCEAN → MOUNTAINS: the drive inland, as a drift of words, with scenic stops on the way. */
  hopsLabel: "OCEAN → MOUNTAINS · SCENIC STOPS ON THE WAY",
  hops: [
    { word: "OCEAN", note: "one last look. salt still in your hair.", slot: clip("ocean-tall", "Turquoise water from above, waves breaking white onto sand") },
    { word: "PALMS", note: "the coast road, one more time.", slot: still(photos.palms, "Coconut palms leaning over a turquoise bay", "50% 50%") },
    { word: "PADDY FIELDS", note: "a stop where the green starts.", slot: still(photos.paddy, "Bright green paddy fields, a white stupa and coconut palms behind", "62% 50%") },
    { word: "GREEN HILLS", note: "the air cools, one bend at a time.", slot: clip("road", "A road curving through green mountains under low cloud") },
    { word: "TEA COUNTRY", note: "every slope combed into rows.", slot: still(photos.tea, "A tea estate from above, rows of green bushes combed across a hillside", "50% 50%") },
    { word: "ELLA", note: "home for the last two nights.", slot: still(photos.ellaRock, "Ella's green peaks under a moving sky, a trail scratched across the slope", "50% 45%") },
  ],

  floating: {
    kicker: "2 JAN · ELLA",
    title: ["MOUNTAIN", "SUNSET"] as const,
    /** These drift up one at a time as you scroll. */
    words: ["Check in.", "A walk through Ella town.", "Cafés, little shops, the view.", "Golden hour from a viewpoint we've picked.", "Then a group dinner."] as const,
    slot: still(photos.ellaDawn, "A sky burning orange over the silhouettes of hill-country trees", "50% 60%"),
    note: "Ella town on foot — cafés, local shops, views — then a curated viewpoint for golden hour and a group dinner. An easy evening: tomorrow is the big one.",
    scribble: "first night in the mountains.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 06 · 3 jan — the last ascent: ella                                       */
/* ------------------------------------------------------------------ */

export const world6 = {
  ...chapter("world-06"),
  lines: ["The last ascent.", "One big day in the mountains, planned end to end."] as const,
  slot: still(photos.bridgeMist, "The Nine Arches Bridge in morning mist, a train crossing", "50% 50%"),

  /** THE LAST ASCENT — the day, landing as a pile of prints in the order we do it. */
  memories: [
    { image: photos.trainBridge.file, caption: "morning: nine arches bridge" },
    { image: photos.littleAdams.file, caption: "little adam's peak, the short hike" },
    { image: photos.ellaNight.file, caption: "lunch at a café we picked" },
    { image: photos.tea.file, caption: "afternoon: tea country" },
    { image: photos.ravana.file, caption: "a waterfall. cold water." },
    { image: photos.ellaGap.file, caption: "golden hour: the final viewpoint" },
  ],
  road: { from: "MORNING", to: "GOLDEN HOUR", note: "The bridge, the peak, a long lunch, the tea, the waterfall — then the final viewpoint. It goes far too fast." },

  supper: {
    kicker: "3 JAN · ELLA · THE DEBRIEF",
    title: ["THE", "DEBRIEF"] as const,
    body: "The final Plot Twist dinner. One long table in the mountains, music, the stories everyone's going to be telling wrong for years — and a group that was sixteen strangers six days ago.",
    slot: still(photos.ellaGap, "The Ella Gap: a deep green valley opening out towards the plains far below", "50% 50%"),
    /** The order of the evening. */
    courses: ["Long table", "Music", "Drinks", "Stories", "Photos", "Awards", "Inside jokes", "The final group moment"],
    awards: {
      label: "THE AWARDS",
      hint: "Tap a card. The winners are decided on the night.",
      items: [
        "Most likely to miss the train",
        "Best NYE confession",
        "Main character energy",
        "Accidentally fluent in Sinhala",
        "First in the sea, last out",
        "Lost a slipper, found a soulmate",
      ],
      sealed: "TBD · 3 JAN",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* 07 · 4 jan — the way home                                           */
/* ------------------------------------------------------------------ */

export const world7 = {
  ...chapter("world-07"),
  /**
   * The roll: the last morning, then the whole trip flashing past on the
   * drive back, then Colombo. One word per frame, fast, like a camera roll.
   */
  roll: [
    { word: "Last breakfast.", image: photos.breakfast.file },
    { word: "One last view.", image: photos.ellaGap.file },
    { word: "Galle Fort.", image: photos.galleLighthouse.file },
    { word: "Your first wave.", image: photos.surfer.file },
    { word: "Midnight.", image: photos.nyeBeach.file },
    { word: "Coconut Tree Hill.", image: photos.coconutAerial.file },
    { word: "Ella.", image: photos.ellaRock.file },
    { word: "Nine Arches.", image: photos.trainBridge.file },
    { word: "People.", image: photos.friends.file },
    { word: "Colombo.", image: photos.colomboNight.file },
  ],
  close: ["YOU CAME FOR SRI LANKA.", "YOU LEFT WITH A STORY."] as const,
  sign: "PLOT TWIST",
  signoff: "Until the next one.",
  cta: { label: "JOIN THE NEXT JOURNEY", href: "#apply" },
  slot: clip("surfer-dusk", "A surfer walking out of the sea into a silver evening, board under one arm"),
} as const;

/* ------------------------------------------------------------------ */
/* the secret — the post-credits scene                                 */
/* ------------------------------------------------------------------ */

export const secret = {
  kicker: "POST-CREDITS SCENE",
  title: "THERE'S ONE MORE PLOT TWIST.",
  body: ["There's something waiting for you in Sri Lanka.", "We're not telling you what it is yet."] as const,
  lock: "REVEALED ON DAY 3",
  hold: "HOLD TO PEEK",
  denied: ["Nice try.", "Still no.", "It's called a secret.", "Day 3. We promise."] as const,
  /** Blurred to nothing on the page — the frame is texture, not a hint. */
  slot: clip("fireworks-gold", "Something hidden behind frosted glass"),
} as const;

/* ------------------------------------------------------------------ */
/* the conversion — what's included, who it's for, the details        */
/* ------------------------------------------------------------------ */

export const included = {
  label: "WHAT'S INCLUDED",
  headline: "Everything except the flight and the hangover.",
  /** The brief's categories. Specifics are finalised with the price. */
  confirmed: false,
  items: [
    { k: "STAYS", v: "6 nights in handpicked stays — Galle, the south coast and Ella. Exact properties being locked in." },
    { k: "PRIVATE TRANSPORT", v: "Our own group vehicle the whole way, including airport pickup and drop in Colombo, timed to your flight." },
    { k: "CURATED SIGHTSEEING", v: "Galle Fort and the ramparts, Coconut Tree Hill, Nine Arches Bridge, Little Adam's Peak, tea country." },
    { k: "ADVENTURE & ACTIVITIES", v: "A beginner-friendly surf or water session, the Little Adam's Peak hike, a waterfall / nature experience — where conditions allow." },
    { k: "THE COASTAL RUN", v: "Curated southern-coast exploration — Ahangama, Mirissa, and Hiriketiya where the final route allows." },
    { k: "THE NYE EXPERIENCE", v: "A curated coastal New Year's celebration in Mirissa — dinner, music, the countdown. Venue being finalised." },
    { k: "GROUP EXPERIENCES", v: "The welcome dinner in Galle, planned golden hours, the final dinner in Ella. Breakfasts and meals as specified." },
    { k: "YOUR TRIP LEADER", v: "A Plot Twist trip leader with the group throughout, handling coordination so you never have to." },
  ],
  pending: "The exact list is being locked with the price. Waitlist hears first.",
  excluded: ["Flights to and from Colombo", "Visa (ETA) and travel insurance", "Alcohol and personal spends"],
} as const;

export const forWho = {
  label: "WHO IS THIS FOR?",
  lead: "For people who'd rather collect stories than souvenirs.",
  lines: [
    "For the one who wants to see Galle Fort, surf in Ahangama and stand on Little Adam's Peak — without researching, booking or negotiating any of it.",
    "For people who've done the big group NYE at home, and want to know what else there is.",
    "For anyone travelling solo who'd rather not ring in the year alone. (Most people come solo.)",
    "For people who want a week that's full of things worth showing up for — and never rushed.",
    "For people who'll jump into the ocean first — and the ones who'll film it.",
  ],
  not: "Not for: itinerary police, five-star complainers, or anyone who needs to be asleep by 11 on the 31st.",
} as const;

export const cast = {
  bridge: ["THE ISLAND IS THE SETTING. THE PEOPLE ARE THE PLOT.", "16 seats. 16 strangers. One New Year."] as [string, string],
  composition: {
    title: "16 SEATS.",
    body: "We're looking for the ones who'll be first off the rock, loudest at the countdown and still somehow make breakfast on January 1.",
    disclaimer: "Basically, good vibes only.",
    extra: ["And yes, 10/10s only.", "Not the looks kind. The energy kind."],
  },
} as const;

/** Same shape and same honesty as bir.price. Flip `confirmed` when the number exists. */
export const price = {
  confirmed: true,
  amount: "₹54,999",
  note: "Per person · early bird ₹49,999 · final ₹59,999 · flights not included",
  /** The three tiers, for anything that wants to show them. */
  tiers: [
    { k: "EARLY BIRD", v: "₹49,999" },
    { k: "REGULAR", v: "₹54,999" },
    { k: "FINAL", v: "₹59,999" },
  ],
  pending: "",
  pendingNote: "",
} as const;

export const details = {
  label: "THE DETAILS",
  headline: trip.dates,
  sub: "SLOW SOUTHERN SRI LANKA · NEW YEAR · COAST TO MOUNTAINS",
  basics: [
    { k: "WHEN", v: trip.datesLong },
    { k: "WHERE", v: "Sri Lanka" },
    { k: "ROUTE", v: "Galle → Ahangama → Mirissa → Ella" },
    { k: "LENGTH", v: trip.length },
    { k: "SEATS", v: `Limited · ${trip.seats}` },
    { k: "FLIGHTS", v: "Not included · airport drop timed to yours" },
  ],
  selection: "Curated. Every application is read by a real person.",
  price,
  cta: "JOIN THE WAITLIST",
  ask: "ASK US ANYTHING →",
  whatsapp: "Hey Plot Twist 👀 tell me about Sri Lanka for New Year",
  scribble: "the boring bit. read it anyway.",
} as const;

export const finalCta = {
  headline: ["I NEED TO BE", "ON THIS TRIP."] as const,
  sub: "₹54,999 per person. Early bird ₹49,999.",
  primary: { label: "I'M IN", href: "#apply" },
  secondary: { label: "BACK TO THE FILM", href: "#world-01" },
  slot: clip("fireworks", "A crowd sitting on a dark beach, fireworks going up over the sea"),
} as const;

export const sticky = {
  label: "I'M IN",
  href: "#apply",
  meta: "SRI LANKA · 29 DEC — 4 JAN · ₹54,999",
  line: "early bird ₹49,999.",
} as const;

export const credits = {
  label: "PHOTOGRAPHS & FOOTAGE",
  note: "Photographs of Galle, Ahangama, Mirissa, the tea, the train, Ella, the falls and Colombo were taken in Sri Lanka. The fireworks, the parties, the breakfasts, the boat and most of the footage are from elsewhere — chosen for the moment, not the map. Thank you to:",
} as const;

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

export const SL_SECTION_ORDER = ["film", "included", "for", "cast", "details", "application"] as const;
export type SlSectionKey = (typeof SL_SECTION_ORDER)[number];
export function slIndex(key: SlSectionKey): string {
  return String(SL_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}
