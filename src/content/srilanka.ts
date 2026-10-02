/**
 * SRI LANKA — JOURNEY 4'S PAGE.
 *
 * All copy for the "srilanka" page variant lives here, the same way Bir's
 * lives in content/bir.ts. Components read; they never hold words. The
 * architecture this copy is written against is in docs/sri-lanka-design.md.
 *
 * ─── THE ONE RULE ───────────────────────────────────────────────────────────
 * What the brief supplied is stated flat: the dates (29 Dec 2026 → 4 Jan
 * 2027), the length (7 days), the route (Colombo → Ella → Ahangama → Mirissa
 * → Colombo), New Year's Eve on the south coast, flights not included, and
 * every experience named day by day.
 *
 * Three things have NOT been supplied and are modelled honestly:
 *   - the PRICE        → "COMING SOON" (`price.confirmed: false`)
 *   - the INCLUSIONS   → the categories the brief lists, flagged as being
 *                        finalised with the price (`inclusions.confirmed: false`)
 *   - THE SECRET       → withheld on purpose. Nothing on the page says what it is,
 *                        because nothing has been decided that it could say.
 *
 * Two lines are story beats rather than timetable facts, and must be checked
 * before launch: the 8:40 train over the Nine Arches Bridge (trains cross
 * several times a day; the exact time on 30 Dec is whatever the timetable
 * says) and "16 strangers" (the seat count is the brief's own number).
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
  trainFront: { file: `${P}/train-front.jpg`, title: "Beautiful Sri Lanka", author: "Ravindu Thaksara", ...CC_BY_SA_4, source: `${COMMONS}Beautiul_Sri_Lanka.jpg` },
  trainTunnel: { file: `${P}/train-tunnel.jpg`, title: "Civilization meets Jungle", author: "Fabian Greiler", ...CC_BY_2, source: `${COMMONS}Civilization_meets_Jungle_(44753903400).jpg` },
  trainHills: { file: `${P}/train-hills.jpg`, title: "Train journeys", author: "Rukisees", ...CC_BY_SA_4, source: `${COMMONS}Train_journeys.jpg` },
  bridgeMist: { file: `${P}/bridge-mist.jpg`, title: "Nine Arches Bridge, Demodara", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}Nine_Arches_Bridge,_Demodara_2023-04-29-1.jpg` },
  ellaRock: { file: `${P}/ella-rock.jpg`, title: "Beauty of Ella", author: "TP hettiarachchi", ...CC_BY_SA_4, source: `${COMMONS}Beauty_of_Ella.jpg` },
  ellaGap: { file: `${P}/ella-gap.jpg`, title: "Ella Gap (Valley), Sri Lanka", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Ella_Gap_(Valley),_Sri_Lanka.jpg` },
  ellaDawn: { file: `${P}/ella-dawn.jpg`, title: "Morning Vibes Srilanka", author: "Isuraamara", ...CC_BY_SA_4, source: `${COMMONS}Morning_Vibes_Srilanka.jpg` },
  littleAdams: { file: `${P}/little-adams.jpg`, title: "Little Adam's Peak Sri Lanka", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Little_Adam%27s_Peak_Sri_Lanka_(30073592055).jpg` },
  ravana: { file: `${P}/ravana.jpg`, title: "Rawana Ella Falls", author: "Ankur Panchbudhe", ...CC_BY_2, source: `${COMMONS}Rawana_Ella_Falls_(23343682506).jpg` },
  ellaNight: { file: `${P}/ella-night.jpg`, title: "Street scene at night in Ella, Sri Lanka", author: "Jonashtand", ...CC_BY_SA_4, source: `${COMMONS}202312_Street_scene_at_night_in_Ella,_Sri_Lanka.jpg` },
  tuktuks: { file: `${P}/tuktuks.jpg`, title: "Tuk-tuks waiting for fares in Kandy", author: "McKay Savage", ...CC_BY_2, source: `${COMMONS}Sri_Lanka_-_077_-_Tuk-tuks_waiting_for_fares_in_Kandy_(1685043688).jpg` },
  mirissaAerial: { file: `${P}/mirissa-aerial.jpg`, title: "Mirissa beach aerial", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Mirissa_beach_aerial_(29448581263).jpg` },
  mirissaCoast: { file: `${P}/mirissa-coast.jpg`, title: "Mirissa Luftbild", author: "dronepicr", ...CC_BY_2, source: `${COMMONS}Mirissa_Luftbild_(29448583993).jpg` },
  mirissaBay: { file: `${P}/mirissa-bay.jpg`, title: "Mirissa Bay Panorama", author: "Kondephy", ...CC_BY_SA_4, source: `${COMMONS}Mirissa_Bay_Panorama.jpg` },
  coconutAerial: { file: `${P}/coconut-aerial.jpg`, title: "Amazing Coconut Tree Hill", author: "Sachin Kaveesha Fernando", ...CC_BY_SA_4, source: `${COMMONS}Amazing_Coconut_Tree_Hill.jpg` },
  palms: { file: `${P}/palms.jpg`, title: "View from Coconut Tree Hill to Mirissa", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}View_from_Coconut_Tree_Hill_to_Mirissa_in_March.jpg` },
  surfer: { file: `${P}/surfer.jpg`, title: "Weligama, Sri Lanka", author: "Filipp Nekhaev", ...CC0, source: `${COMMONS}Weligama,_Sri_Lanka_(Unsplash).jpg` },
  surfboards: { file: `${P}/surfboards.jpg`, title: "Mirissa - surfboards", author: "Dan Arndt", ...CC_BY_SA_4, source: `${COMMONS}Mirissa_-_surfboards.jpg` },
  mirissaSunset: { file: `${P}/mirissa-sunset.jpg`, title: "Sunset in Mirissa", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}Sunset_in_Mirissa_5_March_2023,_Sri_Lanka.jpg` },
  dusk: { file: `${P}/dusk.jpg`, title: "Mirissa, sunset", author: "Arian Zwegers", ...CC_BY_2, source: `${COMMONS}Mirissa,_sunset_(6517708167).jpg` },
  stilt: { file: `${P}/stilt.jpg`, title: "Fishermen practicing traditional stilt fishing near Galle", author: "Jakub Hałun", ...CC_BY_4, source: `${COMMONS}Fishermen_practicing_traditional_stilt_fishing_near_Galle,_southern_Sri_Lanka,_20260207_1419_9452.jpg` },
  dolphins: { file: `${P}/dolphins.jpg`, title: "Mirissa, whale watching, dolphins", author: "Arian Zwegers", ...CC_BY_2, source: `${COMMONS}Mirissa,_whale_watching,_dolphins_(6782232766).jpg` },
  goldBeach: { file: `${P}/gold-beach.jpg`, title: "Jaga Beach, Sri Lanka", author: "Rod Waddington", ...CC_BY_SA_2, source: `${COMMONS}Jaga_Beach,_Sri_Lanka_(in_explore)_-_Flickr_-_Rod_Waddington.jpg` },
  galleSunset: { file: `${P}/galle-sunset.jpg`, title: "Sunset at Galle Face Colombo", author: "Mayooresan", ...CC_BY_SA_3, source: `${COMMONS}Sunset_at_Galle_Face_Colombo.JPG` },
  colomboNight: { file: `${P}/colombo-night.jpg`, title: "Stunning Night View of Colombo City Skyline", author: "Thilina Alagiyawanna", ...CC0, source: `${COMMONS}Stunning_Night_View_of_Colombo_City_Skyline.jpg` },
  colomboWater: { file: `${P}/colombo-water.jpg`, title: "Night Skyline Reflection in Colombo", author: "Thilina Alagiyawanna", ...CC_BY_4, source: `${COMMONS}Night_Skyline_Reflection_in_Colombo,_Sri_Lanka.jpg` },
  // ── moment photographs: not Sri Lanka, never labelled as it ──
  nyeBeach: { file: `${P}/nye-beach.jpg`, title: "Rio New Year Fireworks", author: "Porto Bay Hotels & Resorts", ...CC_BY_2, source: "https://commons.wikimedia.org/w/index.php?curid=23505838" },
  fireworks: { file: `${P}/fireworks.jpg`, title: "New Year's Eve, fireworks in the sky, beach party", author: "Vyacheslav Argenberg", ...CC_BY_4, source: "https://commons.wikimedia.org/w/index.php?curid=96768810" },
  dance: { file: `${P}/dance.jpg`, title: "Night techno party, dancing", author: "Vyacheslav Argenberg", ...CC_BY_4, source: "https://commons.wikimedia.org/w/index.php?curid=91338605" },
  crowd: { file: `${P}/crowd.jpg`, title: "Crowded people, night pub party", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/11189730/crowded-people-night-pub-party" },
  sparkler: { file: `${P}/sparkler.jpg`, title: "Sparks Sparkler", author: "Kaique Rocha", ...CC0, source: "https://stocksnap.io/photo/sparks-sparkler-HABABZA1UY" },
  departures: { file: `${P}/departures.jpg`, title: "Airport departure board", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/5917082/image-light-public-domain-free" },
  breakfast: { file: `${P}/breakfast.jpg`, title: "Tropical breakfast, fruit salad", author: "Vyacheslav Argenberg", ...CC_BY_4, source: "https://commons.wikimedia.org/w/index.php?curid=110878389" },
  coffee: { file: `${P}/coffee.jpg`, title: "Books Knowledge", author: "Freestocks.org", ...CC0, source: "https://stocksnap.io/photo/books-knowledge-Q9KNRI9EU2" },
  pool: { file: `${P}/pool.jpg`, title: "Palm trees resort swimming pool", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/6029096/photo-image-background-public-domain-nature" },
  hammock: { file: `${P}/hammock.jpg`, title: "Summer holiday, beach vacation, sea", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/5913323/image-public-domain-trees-blue" },
  jump: { file: `${P}/jump.jpg`, title: "Person jumped ocean splash", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/3302401/free-photo-image-foot-beach-animals-images-pictures-back" },
  zipline: { file: `${P}/zipline.jpg`, title: "Zipline", author: "Wikimedia Commons contributor", ...CC_BY_SA_3, source: "https://commons.wikimedia.org/w/index.php?curid=7832910" },
  waterfall: { file: `${P}/waterfall.jpg`, title: "Cold Waterfall", author: "Clayborneoguy", ...CC_BY_SA_4, source: "https://commons.wikimedia.org/w/index.php?curid=91748891" },
  catamaran: { file: `${P}/catamaran.jpg`, title: "Sunset at sea with catamaran", author: "Phuket@photographer.net", ...CC_BY_2, source: "https://commons.wikimedia.org/w/index.php?curid=127337142" },
  surfWave: { file: `${P}/surf-wave.jpg`, title: "Surfer Wave", author: "Wyncliffe", ...CC0, source: "https://stocksnap.io/photo/surfer-wave-VG0TG1V0XV" },
  friends: { file: `${P}/friends.jpg`, title: "Nature Water", author: "David McEachan", ...CC0, source: "https://stocksnap.io/photo/nature-water-H8UOZSGRC1" },
  friendsDusk: { file: `${P}/friends-dusk.jpg`, title: "Friends at dusk", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/5945021/free-public-domain-cc0-photo" },
  rooftop: { file: `${P}/rooftop.jpg`, title: "Rooftop at night", author: "Jorge Cortell", ...CC_BY_3, source: "https://commons.wikimedia.org/w/index.php?curid=87729669" },
  dinnerSea: { file: `${P}/dinner-sea.jpg`, title: "Seaside dinner at dusk", author: "PattayaPatrol", ...CC_BY_SA_4, source: "https://commons.wikimedia.org/w/index.php?curid=195229122" },
  dinner: { file: `${P}/dinner.jpg`, title: "Gourmet meal, long table", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/3282419/free-photo-image-restaurant-table-lunch" },
} satisfies Record<string, PhotoCredit>;

/**
 * THE FOOTAGE. Every clip is a silent loop of 7–18s, cross-faded end-into-
 * start so the seam doesn't jump. hero and hero-mobile are montages
 * cut from several of the sources below; because they include CC BY-SA
 * material they are themselves offered under CC BY-SA 4.0. Full log:
 * public/videos/srilanka/VIDEOS.md.
 */
export const footage = {
  train: { file: `${V}/train.mp4`, title: "Train in Pattipola, highest station in Sri Lanka", author: "Cherubino", ...CC_BY_SA_3, source: `${COMMONS}Pattipola_train.webm` },
  landing: { file: `${V}/landing.mp4`, title: "Landing at Colombo Airport, Sri Lanka", author: "Yosef Ben Melamed", ...CC_BY_SA_4, source: `${COMMONS}Landing_in_Colombo.webm` },
  tuktuk: { file: `${V}/tuktuk.mp4`, title: "Tuk-tuks in Sri Lanka", author: "Cherubino", ...CC_BY_SA_3, source: `${COMMONS}Tuk-tuks_in_Sri_Lanka.webm` },
  ocean: { file: `${V}/ocean.mp4`, title: "Aerial Shot Of Sea With Speedboat", author: "bellergy", ...CC0, source: `${COMMONS}Aerial_Shot_Of_Sea_With_Speedboat.webm` },
  hero: { file: `${V}/hero.mp4`, title: "Flying low over the sea of a beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/flying-low-over-the-sea-of-a-beach-44392/" },
  jungle: { file: `${V}/jungle.mp4`, title: "Fly over a huge canyon covered in vegetation", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/fly-over-a-huge-canyon-covered-in-vegetation-41401/" },
  cliffs: { file: `${V}/hero.mp4#cliffs`, title: "Sea waves in a little bay", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/sea-waves-in-a-little-bay-1954/" },
  palmSunset: { file: `${V}/palm-sunset.mp4`, title: "Bright orange sunset on beach", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/bright-orange-sunset-on-beach-2168/" },
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
  route: ["COLOMBO", "ELLA", "AHANGAMA", "MIRISSA", "COLOMBO"] as const,
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
 */
export const chapters = [
  { id: "world-01", n: "01", date: "29 DEC", name: "THE ESCAPE", short: "THE ESCAPE", place: "COLOMBO → ELLA", feel: "airport · road · mountains", tone: "#F2A23A" },
  { id: "world-02", n: "02", date: "30 DEC", name: "THE WILD SIDE", short: "THE WILD", place: "ELLA", feel: "train · jungle · falls", tone: "#7FC48A" },
  { id: "world-03", n: "03", date: "31 DEC", name: "THE COUNTDOWN", short: "THE COUNTDOWN", place: "ELLA → AHANGAMA", feel: "dusk · fire · midnight", tone: "#FF4F6D" },
  { id: "world-04", n: "04", date: "1 JAN", name: "THE MORNING AFTER", short: "THE MORNING AFTER", place: "AHANGAMA", feel: "slow · golden · salt", tone: "#F6D7A0" },
  { id: "world-05", n: "05", date: "2 JAN", name: "SALT & SUN", short: "SALT & SUN", place: "AHANGAMA → MIRISSA", feel: "surf · boats · sunset", tone: "#3FD0BF" },
  { id: "world-06", n: "06", date: "3 JAN", name: "ONE LAST NIGHT", short: "ONE LAST NIGHT", place: "MIRISSA → COLOMBO", feel: "road · rooftop · table", tone: "#C9A7FF" },
  { id: "world-07", n: "07", date: "4 JAN", name: "THE END?", short: "THE END", place: "COLOMBO", feel: "credits · roll", tone: "#F4EDE1" },
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
    lead: "Seven days. Seven worlds.",
    body: "You're not booking a Sri Lanka trip. You're stepping into one — a film in seven chapters, with sixteen people who haven't met yet, and a New Year's Eve somewhere in the middle of it.",
    scribble: "don't skip ahead. (you will.)",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 01 · 29 dec — the escape                                            */
/* ------------------------------------------------------------------ */

export const world1 = {
  ...chapter("world-01"),
  lines: ["You leave one world behind.", "And somewhere between the airport and the mountains, Sri Lanka begins."] as const,
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
    note: "Flights aren't included — book from wherever you are. We meet you at arrivals in Colombo.",
    scribble: "everyone lands. then it starts.",
  },

  road: {
    kicker: "THE PLOT TWIST ROADTRIP",
    title: ["THE JOURNEY", "IS THE FIRST", "EXPERIENCE."] as const,
    body: "Colombo to the hill country, the long way up. Out of the city, through the tea, into the clouds — in a private van that becomes the group chat with wheels.",
    /** Panels of the horizontal reel, left to right. */
    frames: [
      { word: "Music.", note: "aux goes round the van. no skipping.", slot: clip("road", "A road curving through green mountains under low cloud") },
      { word: "Snacks.", note: "roadside stops. king coconut. mystery short eats.", slot: still(photos.tuktuks, "Tuk-tuks lined up waiting for fares on a busy street", "50% 60%") },
      { word: "Games.", note: "two truths and a lie, at altitude.", slot: clip("tuktuk", "Driving down a busy town street full of tuk-tuks and buses") },
      { word: "New people.", note: "fifteen strangers. for about an hour.", slot: still(photos.friendsDusk, "Four friends silhouetted on a hill at dusk", "50% 60%") },
      { word: "The mountains.", note: "phones go quiet. windows go down.", slot: clip("train", "A diesel train with red carriages pulling through a hill-country station", "55% 50%") },
    ],
  },

  sunset: {
    kicker: "29 DEC · ELLA",
    title: "ELLA AT SUNSET.",
    times: ["17:52", "18:14", "18:31", "19:05"] as const,
    lines: ["The van door slides open.", "The sky's already on fire.", "Somebody says 'wait, look—'", "And then it's night."] as const,
    slot: still(photos.ellaDawn, "A sky burning orange over the silhouettes of hill-country trees", "50% 60%"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 02 · 30 dec — the wild side                                         */
/* ------------------------------------------------------------------ */

export const world2 = {
  ...chapter("world-02"),
  lines: ["Ella wakes up early.", "So do you. (We're sorry. It's worth it.)"] as const,
  slot: still(photos.ellaRock, "Ella's green peaks under a moving sky, a trail scratched across the slope", "50% 45%"),

  /** The horizontal reel of the day — one screen per beat, never a checklist. */
  beats: [
    {
      key: "train",
      time: "08:40",
      title: ["THE TRAIN COMES", "THROUGH AT 8:40."] as const,
      line: "Be there before it does.",
      note: "The Nine Arches Bridge. Blue carriages, stone arches, jungle on every side — and sixteen people pretending they're not filming.",
      slot: still(photos.trainBridge, "A blue train crossing the stone arches of the Nine Arches Bridge, deep in the jungle", "50% 55%"),
    },
    {
      key: "peak",
      time: "10:15",
      title: ["THE EASIEST SUMMIT", "YOU'LL EVER FEEL", "SMUG ABOUT."] as const,
      line: "Little Adam's Peak.",
      note: "Forty-five minutes up through the tea. The view does the rest.",
      slot: still(photos.littleAdams, "The ridge of Little Adam's Peak lit gold, the hill country rolling away behind", "40% 60%"),
    },
    {
      key: "zip",
      time: "12:30",
      title: ["LOOK DOWN."] as const,
      line: "You're about to fly over the jungle.",
      note: "A zipline over the valley. Harness on. Brave face on. Scream optional.",
      slot: clip("jungle", "Flying over a deep green valley, a river threading through the bottom of it"),
    },
    {
      key: "falls",
      time: "15:00",
      title: ["COLD WATER.", "WARM ROCKS."] as const,
      line: "The falls, then the hidden pool.",
      note: "Ravana Falls by the road — then somewhere a little harder to find, where nobody's taking photos because everyone's in the water.",
      slot: still(photos.ravana, "A waterfall tumbling over rock shelves into a jungle gorge", "50% 50%"),
    },
    {
      key: "night",
      time: "21:00",
      title: ["ONE STREET.", "EVERY BAR ON IT."] as const,
      line: "Ella after dark.",
      note: "Kottu off the hot plate, arrack in a coconut, a tuk-tuk ride back that takes twice as long because someone wants one more.",
      slot: still(photos.ellaNight, "Ella's main street at night: neon bar signs, a tuk-tuk, people out walking", "50% 50%"),
    },
  ],
  scribble: "drag it. or scroll. or both.",
} as const;

/* ------------------------------------------------------------------ */
/* 03 · 31 dec — the countdown                                         */
/* ------------------------------------------------------------------ */

export const world3 = {
  ...chapter("world-03"),
  lines: ["Down from the mountains. Out to the coast.", "Something is coming."] as const,
  slot: still(photos.ellaGap, "The Ella Gap: a deep green valley opening out towards the plains far below", "50% 50%"),

  /**
   * THE LIGHT RAMP — one pinned frame, the day going dark around you. Each
   * stage owns a slice of the scroll; the clock runs from the first time to
   * the last as you go. Order matters: it is the evening, in order.
   */
  ramp: [
    { at: "11:00", word: "ELLA", line: "Last breakfast in the hills.", slot: still(photos.trainFront, "A blue train curving across a stone viaduct in bright sun", "50% 50%") },
    { at: "13:30", word: "THE ROAD", line: "Down the mountain. Windows down. Somebody's already planning an outfit.", slot: clip("road", "A road curving through green mountains under low cloud") },
    { at: "17:10", word: "AHANGAMA", line: "Salt in the air. A villa by the sea.", slot: still(photos.palms, "Coconut palms leaning over a turquoise bay", "50% 50%") },
    { at: "18:20", word: "SUNSET", line: "The last one of the year.", slot: clip("palm-sunset", "Palms against a red-and-orange sunset over the sea") },
    { at: "19:10", word: "DUSK", line: "Everything goes violet.", slot: still(photos.dusk, "The sea under a violet dusk, a headland dark on the horizon", "50% 60%") },
    { at: "20:30", word: "NIGHT", line: "Candles on the sand.", slot: still(photos.dinnerSea, "Candlelit tables along a shoreline at dusk", "50% 55%") },
    { at: "22:05", word: "LIGHTS", line: "The music starts low.", slot: still(photos.dance, "Silhouettes dancing under coloured lights", "50% 40%") },
    { at: "23:10", word: "MUSIC", line: "Then it doesn't.", slot: still(photos.crowd, "A crowd with hands up in pink haze and spotlights", "50% 50%") },
    { at: "23:40", word: "FIRE", line: "Sparklers. Bare feet. Nobody's cold.", slot: still(photos.sparkler, "A sparkler fizzing in someone's hand at night", "50% 50%") },
    { at: "23:58", word: "THE OCEAN", line: "Everyone walks down to the water.", slot: clip("fireworks", "A crowd sitting on a dark beach, the first fireworks going up over the sea") },
  ],
  midnightWord: "MIDNIGHT.",

  party: {
    kicker: "A PLOT TWIST ORIGINAL",
    title: ["MIDNIGHT", "IN PARADISE"] as const,
    body: "Not a ticket to someone else's party. An evening we built for sixteen people: one table, one beach, one playlist, and one minute everyone's going to remember.",
    /** The night's running order, read top to bottom like a programme. */
    programme: ["DINNER", "MUSIC", "THE BEACH", "11:59", "00:00", "2027"] as const,
  },

  countdown: {
    lead: ["One minute.", "One beach.", "16 strangers.", "And a year waiting to begin."] as const,
    year: "2027",
    after: "Happy New Year. You're not strangers any more.",
    slot: clip("fireworks-gold", "Gold fireworks bursting over a beach at night, people silhouetted at the waterline"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 04 · 1 jan — the morning after                                      */
/* ------------------------------------------------------------------ */

export const world4 = {
  ...chapter("world-04"),
  lines: ["No alarms.", "No schedules.", "No “wake up, we're leaving in 20 minutes.”"] as const,
  turn: ["It's January 1.", "Take your time."] as const,
  slot: clip("morning", "Looking up through a palm tree, the sun flaring between its fronds"),
  /** Little frames of the slowest morning of the year. Captions, not features. */
  moments: [
    { caption: "breakfast at 11. nobody judges.", image: photos.breakfast.file, alt: "A tropical breakfast: fruit, coffee and juice on a wooden table", tilt: -3 },
    { caption: "coffee. a book you won't read.", image: photos.coffee.file, alt: "A cup of coffee in soft morning light", tilt: 2 },
    { caption: "the pool, technically open.", image: photos.pool.file, alt: "A swimming pool lined with palm trees", tilt: -1.5 },
    { caption: "the hammock was always yours.", image: photos.hammock.file, alt: "Looking past bare feet in a hammock to palm trees and sea", tilt: 3 },
  ],
  swim: {
    kicker: "1 JAN · THE OCEAN",
    title: ["FIRST SWIM", "OF 2027."] as const,
    body: "The year is about twelve hours old. The sea is the temperature of a bath. Somebody counts down from three, and for once nobody waits for the third.",
    slot: clip("gold-shore", "Late gold light on a beach, small waves running up the sand"),
    scribble: "best decision of the year so far.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 05 · 2 jan — salt & sun                                             */
/* ------------------------------------------------------------------ */

export const world5 = {
  ...chapter("world-05"),
  lines: ["Ahangama to Mirissa.", "The whole day smells like sunscreen and salt."] as const,
  slot: clip("ocean", "Looking down on deep blue sea as a speedboat carves a white wake towards a green island"),

  /** Beach-hopping, as a drift of places along the coast. Words, not cards. */
  hops: [
    { word: "SURF", note: "first lesson or tenth. the wave doesn't care.", slot: still(photos.surfer, "A surfer with a longboard on a golden beach under big clouds", "60% 50%") },
    { word: "SNORKEL", note: "turtles, if they feel like it.", slot: clip("ocean-tall", "Turquoise water from above, waves breaking white onto sand") },
    { word: "HIDDEN BEACHES", note: "the ones you need a local to find.", slot: still(photos.coconutAerial, "A palm-covered headland from above, surf breaking around it", "50% 50%") },
    { word: "STILT FISHERMEN", note: "the south coast's oldest trick.", slot: still(photos.stilt, "Fishermen perched on wooden stilts in the surf", "50% 50%") },
    { word: "SEAFOOD", note: "whatever came in this morning. grilled. now.", slot: still(photos.surfboards, "Surfboards stacked on the sand at golden hour, an island offshore", "50% 55%") },
  ],

  floating: {
    kicker: "2 JAN · MIRISSA · AT SEA",
    title: ["THE FLOATING", "SUNSET"] as const,
    /** These drift up out of the water one at a time as you scroll. */
    words: ["Engine off.", "Music low.", "Salt on your lips.", "Someone's playlist.", "The sun goes down without asking."] as const,
    slot: clip("boat-sunset", "A boat rocking on the swell as the sun sets over the sea"),
    note: "A boat, sixteen people, and nowhere to be. If the ocean is generous: dolphins.",
    scribble: "phones down. (lol. ok. one photo.)",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 06 · 3 jan — one last night                                         */
/* ------------------------------------------------------------------ */

export const world6 = {
  ...chapter("world-06"),
  lines: ["We came here not knowing anyone.", "Now nobody wants to leave."] as const,
  slot: still(photos.colomboWater, "Colombo's skyline at night, towers lit and doubled in still water", "50% 55%"),

  /** On the drive back up the coast, the trip flickers past in the window. */
  memories: [
    { image: photos.trainBridge.file, caption: "the 8:40" },
    { image: photos.littleAdams.file, caption: "smug, at the top" },
    { image: photos.nyeBeach.file, caption: "00:00" },
    { image: photos.breakfast.file, caption: "breakfast at 11" },
    { image: photos.surfer.file, caption: "stood up once. counts." },
    { image: photos.mirissaSunset.file, caption: "the floating sunset" },
  ],
  road: { from: "MIRISSA", to: "COLOMBO", note: "Up the coast road. The playlist is suddenly very emotional." },

  supper: {
    kicker: "3 JAN · COLOMBO",
    title: ["THE LAST", "SUPPER"] as const,
    body: "One long table, one last sunset over the city, and the stories everyone's going to be telling wrong for years.",
    slot: still(photos.galleSunset, "A blazing sunset over the sea at Galle Face, Colombo", "50% 50%"),
    /** The order of the evening. */
    courses: ["Long table", "Sunset", "Drinks", "Stories", "Photos", "Awards", "Inside jokes", "The final group moment"],
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
/* 07 · 4 jan — the end?                                               */
/* ------------------------------------------------------------------ */

export const world7 = {
  ...chapter("world-07"),
  /** The credits roll: one word per memory, fast, like a camera roll on the flight home. */
  roll: [
    { word: "Airport.", image: photos.departures.file },
    { word: "Road.", image: photos.trainHills.file },
    { word: "Mountains.", image: photos.ellaRock.file },
    { word: "The 8:40.", image: photos.trainBridge.file },
    { word: "Beach.", image: photos.mirissaAerial.file },
    { word: "Midnight.", image: photos.nyeBeach.file },
    { word: "Sunrise.", image: photos.goldBeach.file },
    { word: "People.", image: photos.friends.file },
    { word: "Laughter.", image: photos.dinnerSea.file },
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
    { k: "STAYS", v: "Six nights in handpicked boutique stays — hill country, south coast, Colombo." },
    { k: "PRIVATE TRANSPORT", v: "Our own van, the whole way round. Airport pick-up to airport drop." },
    { k: "THE NYE EXPERIENCE", v: "Midnight in Paradise — dinner, music, the beach, the countdown." },
    { k: "CURATED EXPERIENCES", v: "The 8:40 at Nine Arches, the floating sunset, the Last Supper." },
    { k: "ACTIVITIES", v: "Little Adam's Peak, the falls, the zipline, a surf session, beach-hopping." },
    { k: "MEALS", v: "As noted on the final itinerary — breakfasts, and the big group dinners." },
    { k: "YOUR TRIP HOST", v: "A Plot Twist host with you from arrivals to departures." },
    { k: "THE CONTENT", v: "Photos and video of the trip, shot so you don't have to." },
  ],
  pending: "The exact list is being locked with the price. Waitlist hears first.",
  excluded: ["Flights to and from Colombo", "Visa (ETA) and travel insurance", "Alcohol and personal spends"],
} as const;

export const forWho = {
  label: "WHO IS THIS FOR?",
  lead: "For people who'd rather collect stories than souvenirs.",
  lines: [
    "For the one who says yes before checking their calendar.",
    "For people who've done the big group NYE at home, and want to know what else there is.",
    "For anyone travelling solo who'd rather not ring in the year alone.",
    "For friends of friends of strangers.",
    "For people who'll jump off the rock first — and the ones who'll film it.",
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
  confirmed: false,
  amount: "",
  note: "",
  pending: "COMING SOON",
  pendingNote: "Pricing is being finalised. The waitlist gets it first — and first pick of the seats.",
} as const;

export const details = {
  label: "THE DETAILS",
  headline: trip.dates,
  sub: "SRI LANKA · NEW YEAR'S EVE 2026",
  basics: [
    { k: "WHEN", v: trip.datesLong },
    { k: "WHERE", v: "Sri Lanka" },
    { k: "ROUTE", v: "Colombo · Ella · Ahangama · Mirissa · Colombo" },
    { k: "LENGTH", v: trip.length },
    { k: "SEATS", v: `Limited · ${trip.seats}` },
    { k: "FLIGHTS", v: "Not included" },
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
  sub: "Join the waitlist. Seats go to the waitlist first.",
  primary: { label: "I'M IN", href: "#apply" },
  secondary: { label: "BACK TO THE FILM", href: "#world-01" },
  slot: clip("fireworks", "A crowd sitting on a dark beach, fireworks going up over the sea"),
} as const;

export const sticky = {
  label: "I'M IN",
  href: "#apply",
  meta: "SRI LANKA · 29 DEC — 4 JAN",
  line: "price coming soon.",
} as const;

export const credits = {
  label: "PHOTOGRAPHS & FOOTAGE",
  note: "Photographs of the train, Ella, the falls, the south coast and Colombo were taken in Sri Lanka. The fireworks, the parties, the breakfasts, the boat and most of the footage are from elsewhere — chosen for the moment, not the map. Thank you to:",
} as const;

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

export const SL_SECTION_ORDER = ["film", "included", "for", "cast", "details", "application"] as const;
export type SlSectionKey = (typeof SL_SECTION_ORDER)[number];
export function slIndex(key: SlSectionKey): string {
  return String(SL_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}
