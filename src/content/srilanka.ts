/**
 * SRI LANKA — JOURNEY 4'S PAGE.
 *
 * All copy for the "srilanka" page variant lives here, the same way Bir's
 * lives in content/bir.ts. Components read; they never hold words. The
 * architecture this copy is written against is in docs/sri-lanka-design.md.
 *
 * ─── THE ONE RULE ───────────────────────────────────────────────────────────
 * What the brief supplied is stated flat: the dates (29 Dec 2026 → 4 Jan
 * 2027), the length (7 days / 6 nights), the overnights (Weligama ×2 →
 * Mirissa ×2 → Ella ×2 — THE NEW YEAR TAKEOVER, a party-first week), New
 * Year's Eve in Mirissa, the price (₹54,999 till 20 Nov 2026, then ₹59,999), flights
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
/* the takeover's own media                                            */
/* ------------------------------------------------------------------ */

/**
 * ─── THE PARTY PICTURES ARE MOOD, NOT VENUES ────────────────────────────────
 * No openly licensed photograph or clip of The Doctor's House, Lamana, Secret
 * Jungle Party, Cafe One Love or Hiking Bar exists, and a venue's Instagram
 * can't be used without its permission. So every party image below is a
 * candid frame from somewhere else (Goa, Thailand, Indonesia — Vyacheslav
 * Argenberg, CC BY 4.0) or a Mixkit Free-licence clip. None is captioned,
 * alt-texted or titled as a named venue, and every night block says so on
 * screen ("mood footage, not the venue"). When real venue footage arrives,
 * swap the file and delete that line.
 */
export const partyPhotos = {
  // ── mood: parties elsewhere, never labelled as a Sri Lankan venue ──
  fire: { file: `${P}/party-fire.jpg`, title: "Goa trance party, Fire dancing, Morjim, Goa, India", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Goa_trance_party,_Fire_dancing,_Morjim,_Goa,_India.jpg` },
  jungle: { file: `${P}/party-jungle.jpg`, title: "Vagator, Goa, India, Trance party in Goa, nightlife in Goa", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Vagator,_Goa,_India,_Trance_party_in_Goa,_nightlife_in_Goa.jpg` },
  junglePsy: { file: `${P}/party-jungle-psy.jpg`, title: "Vagator, Goa, India, Psychedelic trance party in Goa, nightlife in Goa", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Vagator,_Goa,_India,_Psychedelic_trance_party_in_Goa,_nightlife_in_Goa.jpg` },
  jungleBeams: { file: `${P}/party-jungle-beams.jpg`, title: "Night party, dancing, Koh Chang, Thailand", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Night_party,_dancing,_Koh_Chang,_Thailand.jpg` },
  beachBar: { file: `${P}/party-beach-bar.jpg`, title: "People dancing on the beach at night, Gili Trawangan (island), Indonesia", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}People_dancing_on_the_beach_at_night,_Gili_Trawangan_(island),_Indonesia.jpg` },
  floor: { file: `${P}/party-floor.jpg`, title: "Psychedelic trance party, Ashwem, Goa, India", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Psychedelic_trance_party,_Ashwem,_Goa,_India.jpg` },
  djBar: { file: `${P}/party-dj-bar.jpg`, title: "Dance party at night, DJ, Gili Trawangan (island), Indonesia", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Dance_party_at_night,_DJ,_Gili_Trawangan_(island),_Indonesia.jpg` },
  beams: { file: `${P}/party-beams.jpg`, title: "Night techno party, dancing, Koh Chang, Thailand", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Night_techno_party,_dancing,_Koh_Chang,_Thailand.jpg` },
  sparklers: { file: `${P}/sparklers.jpg`, title: "Dark image of people holding yellow fireworks", author: "Isabella Mendes", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", source: "https://www.pexels.com/photo/dark-image-of-people-holding-yellow-fireworks-9304093/" },
  toast: { file: `${P}/toast.jpg`, title: "People enjoying confettis", author: "cottonbro studio", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", source: "https://www.pexels.com/photo/people-enjoying-confettis-3171820/" },
  pool: { file: `${P}/pool.jpg`, title: "Palm trees resort swimming pool", author: "Rawpixel (public domain)", ...CC0, source: "https://www.rawpixel.com/image/6029096/photo-image-background-public-domain" },
  // ── place: taken in Sri Lanka ──
  ellaClouds: { file: `${P}/ella-clouds.jpg`, title: "Ella, Sri Lanka, Valley in clouds", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Ella,_Sri_Lanka,_Valley_in_clouds.jpg` },
  ellaClouds2: { file: `${P}/ella-clouds-2.jpg`, title: "Ella, Sri Lanka, Mountains in clouds 11", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Ella,_Sri_Lanka,_Mountains_in_clouds_11.jpg` },
  teaFog: { file: `${P}/tea-fog.jpg`, title: "Haputale, Sri Lanka, Tea plantations in fog 3", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Haputale,_Sri_Lanka,_Tea_plantations_in_fog_3.jpg` },
  hillTrain: { file: `${P}/hill-train.jpg`, title: "Sri Lanka, Haputale, Train in the mountains of Sri Lanka's 'Hill Country'", author: "Vyacheslav Argenberg", ...CC_BY_4, source: `${COMMONS}Sri_Lanka,_Haputale,_Train_in_the_mountains_of_Sri_Lanka%27s_%27Hill_Country%27.jpg` },
  weligamaAerial: { file: `${P}/weligama-aerial.jpg`, title: "Weligama Beach", author: "Rikazr", ...CC_BY_SA_4, source: `${COMMONS}Weligama_Beach.jpg` },
  mirissaBeach: { file: `${P}/mirissa-beach.jpg`, title: "Mirissa beach, Srilanka", author: "Abishek Palraj", ...CC_BY_SA_4, source: `${COMMONS}Mirissa_beach,_Srilanka.jpg` },
  mirissaPalms: { file: `${P}/mirissa-palms.jpg`, title: "Mirissa palms", author: "Swanthika", ...CC_BY_SA_4, source: "https://commons.wikimedia.org/wiki/Category:Mirissa" },
  mirissaSunset: { file: `${P}/mirissa-sunset.jpg`, title: "Sunset in Mirissa", author: "Alexey Komarov", ...CC_BY_SA_4, source: `${COMMONS}Sunset_in_Mirissa_5_March_2023,_Sri_Lanka.jpg` },
  galleCafe: { file: `${P}/galle-cafe.jpg`, title: "Peace and Plenty Cafe, Galle Fort", author: "calflier001", ...CC_BY_SA_2, source: `${COMMONS}PEACE_AND_PLENTY_CAFE_GALLE_FORT_SRI_LANKA_JAN2013_(8510165328).jpg` },
  poolOcean: { file: `${P}/pool-ocean.jpg`, title: "Ocean view from Saman Villas at Bentota, Sri Lanka", author: "Jithra Adikari", ...CC_BY_SA_2, source: `${COMMONS}Ocean_view_from_Saman_Villas_at_Bentota_,_Sri_Lanka.jpg` },
} satisfies Record<string, PhotoCredit>;

const mix = (id: string, slug: string, title: string, name: string): PhotoCredit => ({
  file: `${V}/${name}.mp4`,
  title,
  author: "Mixkit",
  ...MIXKIT,
  source: `https://mixkit.co/free-stock-video/${slug}-${id}/`,
});
/** Each checked for `copyrightNotice: "Free"` on its Mixkit page (12 Nov 2026). Sources kept in srilanka-takeover-assets/video-src. */
export const partyFootage = {
  djSunset: mix("42398", "skillful-hands-of-a-dj-mixing-music-outdoors", "Skillful hands of a DJ mixing music outdoors", "party-dj-sunset"),
  djStage: mix("4187", "dj-playing-on-a-stage-with-led-screens", "DJ playing on a stage with LED screens", "party-dj-stage"),
  hands: mix("341", "hands-raised-high-on-a-nightclub-dance-floor", "Hands raised high on a nightclub dance floor", "party-hands"),
  pool: mix("40105", "friends-dancing-in-a-pool", "Friends dancing in a pool", "party-pool"),
  crowd: mix("4344", "people-dancing-at-a-night-club", "People dancing at a night club", "party-crowd"),
  decks: mix("831", "dj-playing-music-at-a-nightclub", "DJ playing music at a nightclub", "party-decks"),
} satisfies Record<string, PhotoCredit>;

/**
 * ─── OUR OWN SRI LANKA (added 14 Nov 2026) ─────────────────────────────────
 * Photographs and clips Plot Twist shot in Sri Lanka (source: the "Sri lanka"
 * folder; converted by srilanka-real/, encoded by srilanka-takeover/encode-real.sh),
 * plus a few Unsplash-licence photographs for what we had no footage of (surf,
 * Nine Arch Bridge, the hill train, Ella, Coconut Tree Hill).
 * The party footage is real south-coast nightlife, but NOT necessarily the
 * venue named on that night, so it is never captioned as one.
 */
const OWN = { author: "Plot Twist", license: "Own work", licenseUrl: "https://www.instagram.com/plottwist.social", source: "https://www.instagram.com/plottwist.social" };
const UNSPLASH = { license: "Unsplash License", licenseUrl: "https://unsplash.com/license" };
const un = (name: string, id: string, title: string): PhotoCredit => ({ file: `${P}/${name}.jpg`, title, author: "Unsplash contributor", ...UNSPLASH, source: `https://images.unsplash.com/photo-${id}` });
const own = (name: string, title: string): PhotoCredit => ({ file: `${P}/${name}.jpg`, title, ...OWN });
export const real = {
  beachClub: own("real-beach-club", "Beach club on the south coast"),
  beachClubWide: own("real-beach-club-wide", "Umbrellas and beanbags above the surf, south coast"),
  lounging: own("real-lounging", "An afternoon under an umbrella by the sea"),
  lighthouse: own("real-lighthouse", "Galle Fort lighthouse"),
  infinityPool: own("real-infinity-pool", "Infinity pool over the hills"),
  chillCafe: own("real-chill-cafe", "Café in Ella"),
  hillTrain: own("real-hill-train", "The hill-country train"),
  pool: own("real-pool", "Pool at a south-coast stay"),
  redSunset: own("real-red-sunset", "Red sunset through the palms, south coast"),
  cthDusk: own("real-cth-dusk", "Coconut Tree Hill at dusk"),
  partyCrowd: own("real-party-crowd", "A south-coast party crowd"),
  partyDome: own("real-party-dome", "A party under a thatched dome"),
  partyGreen: own("real-party-green", "A dance floor under green light"),
  partyJungle: own("real-party-jungle", "Beams of light over a crowd in the trees"),
  partyRed: own("real-party-red", "A packed open-air dance floor, red light"),
  nineSun: un("un-nine-sun", "1598955890270-d77cdb06d2bb", "Blue train on the Nine Arch Bridge"),
  surfGirls: un("un-surf-girls", "1580331522941-58d0812c6d81", "Two surfers walking into the sea"),
  trainGirl: un("un-train-girl", "1704797389166-c7dac99fc633", "Leaning out of the hill-country train"),
  ellaRock: un("un-ella-rock", "1580635849305-4399d586ac5c", "Ella Rock"),
  cthArms: un("un-cth-arms", "1544750040-4ea9b8a27d38", "Coconut Tree Hill, Mirissa"),
  beachBar: un("un-beach-bar", "1704797390597-24dea42ffea8", "A beach bar lit up at dusk, from above"),
  sparklerFriends: un("un-sparkler-friends", "1758523981337-7508dda01c3f", "Friends with sparklers on a beach"),
  hotelWeligamaPool: un("un2-hotel-weligama-pool", "1604293679030-7cfcd7174ab1", "A resort pool running out towards the sea"),
  hotelWeligamaDeck: un("un2-hotel-weligama-deck", "1709755502254-3a71dab6fa58", "A deck with loungers and umbrellas"),
  hotelMirissaVilla: un("un2-hotel-mirissa-villa", "1596178067639-5c6e68aea6dc", "A villa pool among palms"),
  hotelMirissaGarden: un("un2-hotel-mirissa-garden", "1721989518229-3e84837fc398", "A tropical garden and pool"),
  hotelEllaPool: un("un2-hotel-ella-pool", "1559117209-c3b23082265a", "An infinity pool over the hills"),
  hotelEllaRoom: un("un2-hotel-ella-room", "1689729738920-edea97589328", "A room with a valley view"),
  galleStreetDusk: un("un2-galle-street-dusk", "1509982724584-2ce0d4366d8b", "A Galle Fort street at dusk"),
  galleSunsetFriends: un("un2-galle-sunset-friends", "1743611847979-ba4678e845b8", "Friends watching the sunset on the ramparts"),
  sunsetCrowd: un("un2-sunset-crowd", "1704830657561-a6a663931172", "A sunset crowd on the sand"),
  nyeParty: un("un2-nye-party", "1684348406379-950ef79e81c9", "Hands up at a beach party at sunset"),
  nyeFireworks: un("un2-nye-fireworks", "1690763367559-d63c891dc409", "Fireworks over the water"),
  nyeToastFun: un("un2-nye-toast-fun", "1699730164892-d7c433524ff3", "A toast with balloons"),
  nyeBeachParty: un("un2-nye-beach-party", "1735351959795-18dd72749e9c", "A packed beach party"),
  jungleLasers: un("un2-jungle-lasers", "1563784462386-044fd95e9852", "Lasers over a crowd"),
  jungleSmoke: un("un2-jungle-smoke", "1665035212282-3e117d618b36", "A smoky stage at night"),
  ropeSwing: un("un2-rope-swing", "1569670380685-4582bf29a24a", "A rope swing from a palm at sunset"),
  ellaTownStreet: un("un2-ella-town-street", "1748491829000-a88e5028e209", "A street in Ella"),
  ellaTownCafe: un("un2-ella-town-cafe", "1761344788942-f03c87c19420", "A café in Ella"),
  aerialCove: un("un2-aerial-cove", "1552055568-e9943cd2a08f", "An aerial cove with turquoise water"),
  teaPath: un("un2-tea-path", "1585171328560-947fbd92d6f0", "A path through the tea"),
} satisfies Record<string, PhotoCredit>;
const ownClip = (name: string, title: string): PhotoCredit => ({ file: `${V}/${name}.mp4`, title, ...OWN });
export const realFootage = {
  crowd: ownClip("real-crowd", "A south-coast party crowd"),
  dome: ownClip("real-dome", "A party under a thatched dome"),
  hands: ownClip("real-hands", "Hands up under a green-lit roof"),
  jungle: ownClip("real-jungle", "Beams of light over a crowd in the trees"),
  bar: ownClip("real-bar", "Dancing at a beach bar"),
  cth: ownClip("real-cth", "Coconut Tree Hill"),
  sunset: ownClip("real-sunset", "Red sunset through the palms"),
} satisfies Record<string, PhotoCredit>;

/* ------------------------------------------------------------------ */
/* the trip                                                            */
/* ------------------------------------------------------------------ */

/**
 * THE NEW YEAR TAKEOVER. Positioning changed on 12 Nov 2026: this is a
 * party-first New Year week, not a slow sightseeing loop. The overnights are
 * fixed — Weligama ×2, Mirissa ×2, Ella ×2 — and every night has a night out,
 * never the same venue twice.
 */
export const trip = {
  name: "SRI LANKA",
  edition: "THE NEW YEAR TAKEOVER",
  length: "7 DAYS · 6 NIGHTS",
  /** CONFIRMED by the brief. Must agree with seo.startDate / endDate in journeys/journey4.ts. */
  dates: "29 DEC — 4 JAN",
  datesLong: "29 December 2026 — 4 January 2027",
  /** Where the group sleeps, in order. Galle, Madiha, Ahangama and Hiriketiya are visits. */
  route: ["WELIGAMA", "MIRISSA", "ELLA"] as const,
  /** The brief's own number ("16 strangers"). Group size can vary. */
  seats: 16,
  ages: "18–30",
} as const;

/* ------------------------------------------------------------------ */
/* the chapters                                                        */
/* ------------------------------------------------------------------ */

/**
 * THE SEVEN CHAPTERS. The chapter navigator, the film index, the lineup and
 * every chapter card read from this one list. `tone` is the chapter's
 * signature colour — the navigator borrows it as you enter.
 */
export const chapters = [
  { id: "world-01", n: "01", date: "29 DEC", name: "THE COASTAL TAKEOVER.", short: "THE COASTAL TAKEOVER", place: "COLOMBO AIRPORT → WELIGAMA", feel: "the crew · welcome dinner · first night out", tone: "#F2A23A" },
  { id: "world-02", n: "02", date: "30 DEC", name: "GOOD WAVES. BETTER NIGHTS.", short: "GOOD WAVES. BETTER NIGHTS.", place: "WELIGAMA · GALLE FORT · MADIHA", feel: "surf · the fort · a wednesday dj night", tone: "#3FD0BF" },
  { id: "world-03", n: "03", date: "31 DEC", name: "ONE NIGHT OFF THE RECORD.", short: "ONE NIGHT OFF THE RECORD", place: "MIRISSA · NEW YEAR'S EVE", feel: "last sunset · the party · midnight on the beach", tone: "#FF4F6D" },
  { id: "world-04", n: "04", date: "1 JAN", name: "THE FIRST DAY. THE FIRST MADNESS.", short: "THE FIRST MADNESS", place: "MIRISSA · HIRIKETIYA", feel: "slow morning · the coast · a jungle party", tone: "#B9F23F" },
  { id: "world-05", n: "05", date: "2 JAN", name: "PLOT TWIST: MOUNTAIN EDITION.", short: "MOUNTAIN EDITION", place: "MIRISSA → ELLA", feel: "coast → tea country → ella after dark", tone: "#7FC48A" },
  { id: "world-06", n: "06", date: "3 JAN", name: "LOST IN THE HIGHLANDS.", short: "LOST IN THE HIGHLANDS", place: "ELLA", feel: "nine arch · the peak · the last night", tone: "#C9A7FF" },
  { id: "world-07", n: "07", date: "4 JAN", name: "UNTIL THE NEXT PLOT TWIST.", short: "UNTIL THE NEXT ONE", place: "ELLA → COLOMBO AIRPORT", feel: "last breakfast · the road · departures", tone: "#F4EDE1" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
export const chapter = (id: ChapterId) => chapters.find((c) => c.id === id)!;

/* ------------------------------------------------------------------ */
/* 00 · the hero                                                       */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: "PLOT TWIST — SRI LANKA · THE NEW YEAR TAKEOVER",
  /** The headline, one line per row; the last line takes the accent colour. */
  title: ["YOUR NEW YEAR", "DESERVES A", "PLOT TWIST."] as const,
  line: "Seven days. Three destinations. Beach days, wild nights, unexpected adventures and a New Year you'll be talking about long after it's over.",
  dates: "29 DEC 2026 — 4 JAN 2027",
  price: "₹54,999",
  priceNote: "TILL 20 NOV, THEN ₹59,999 · FLIGHTS EXCLUDED",
  meta: "7 DAYS. 3 DESTINATIONS. ENDLESS PLOT TWISTS.",
  cta: { label: "GET ON THE LIST", href: "#apply" },
  secondary: { label: "EXPLORE THE JOURNEY", href: "#entry" },
  /** Two cuts: 16:9 for landscape screens, 9:16 for phones (it's an Instagram-ad page). */
  video: {
    wide: { src: `${V}/takeover-hero.mp4`, poster: `${V}/takeover-hero-poster.jpg` },
    tall: { src: `${V}/takeover-hero-mobile.mp4`, poster: `${V}/takeover-hero-mobile-poster.jpg` },
    alt: "A montage cutting between day and night, much of it our own footage from Sri Lanka: flying low over a turquoise sea, a surfer walking into the waves at dusk, a DJ's hands on the decks at sunset, hands in the air under warm lights, friends dancing in a pool, a DJ silhouetted against a wall of light, a jungle valley from the air, a mountain road, a packed dance floor, palms against an orange sky",
  },
} as const;

/* ------------------------------------------------------------------ */
/* ~~ the entry — the transition into the island                       */
/* ------------------------------------------------------------------ */

export const entry = {
  lines: ["Forget what you think a New Year trip looks like.", "This one has a plot."] as const,
  welcome: ["WELCOME TO", "SRI LANKA."] as const,
  /** What the knockout letters are filled with, and what you fly into. */
  inside: clip("jungle", "Flying over a deep green valley, a river threading through the bottom of it"),
  index: {
    label: "THE FILM",
    lead: "Days full of discovery. Nights full of plot twists.",
    body: "Explore beautiful coastal towns, chase sunsets, surf the waves, wander through a 400-year-old fort and find your way into the mountains. Then switch gears for beach parties, DJ nights and a jungle rave. This is a holiday, not a checklist: room for lazy mornings, long lunches and spontaneous plans. We've planned the experiences. You make the moments yours.",
    scribble: "don't skip ahead. (you will.)",
  },
} as const;

/* ------------------------------------------------------------------ */
/* the lineup — six nights, six nights out                             */
/* ------------------------------------------------------------------ */

/**
 * VENUE STATUS IS PART OF THE COPY. `PLANNED` = on our plan, the event itself
 * is confirmed closer to the date. `PROPOSED` = our pick, not yet confirmed.
 * Nothing here says a venue, a DJ or an entry is booked, because none is.
 * Party entries and drinks are not included in the price.
 */
export type NightStatus = "PLANNED" | "PROPOSED" | "SUBJECT TO EVENT CONFIRMATION" | "PICKED CLOSER TO THE DATE";

export const lineup = {
  kicker: "29 DEC — 3 JAN · SOUTH COAST & HILL COUNTRY",
  title: "THE LINEUP",
  sub: "A full week of bad bedtime decisions. Great life decisions.",
  slot: clip("real-hands", "Hands in the air under a green-lit thatched roof, a packed open-air dance floor"),
  nights: [
    { day: "TUE", date: "29 DEC", where: "WELIGAMA", act: "LAZIES", sub: "First night out: welcome dinner, then the first party", status: "PLANNED" as NightStatus, href: "#world-01", tone: "#F2A23A" },
    { day: "WED", date: "30 DEC", where: "MADIHA", act: "THE DOCTOR'S HOUSE", sub: "Its Wednesday DJ night", status: "PLANNED" as NightStatus, href: "#world-02", tone: "#3FD0BF" },
    { day: "THU", date: "31 DEC", where: "AHANGAMA → MIRISSA", act: "LAMANA · MIDNIGHT ON THE BEACH", sub: "Then a Mirissa New Year's Eve after-party", status: "SUBJECT TO EVENT CONFIRMATION" as NightStatus, href: "#world-03", tone: "#FF4F6D" },
    { day: "FRI", date: "1 JAN", where: "HIRIKETIYA", act: "SECRET JUNGLE PARTY", sub: "Electronic music, deep in the trees", status: "PLANNED" as NightStatus, href: "#world-04", tone: "#B9F23F" },
    { day: "SAT", date: "2 JAN", where: "ELLA", act: "CAFE ONE LOVE", sub: "A DJ night, after the group dinner", status: "PROPOSED" as NightStatus, href: "#world-05", tone: "#7FC48A" },
    { day: "SUN", date: "3 JAN", where: "ELLA", act: "HIKING BAR", sub: "Live music, after the final dinner", status: "PROPOSED" as NightStatus, href: "#world-06", tone: "#C9A7FF" },
  ],
  legend: "PLANNED: on our plan, event details confirmed closer to the date. PROPOSED: our pick, subject to confirmation. If a night changes, it's replaced with a night of the same kind. Entries and drinks are on you.",
} as const;

/* ------------------------------------------------------------------ */
/* the bases — three places you wake up                                */
/* ------------------------------------------------------------------ */

/**
 * NO HOTEL IS NAMED, because none is confirmed. The photographs are labelled
 * on screen as stay inspiration; the descriptions are categories, not
 * properties. Replace both the day the bookings are made.
 */
export const bases = {
  kicker: "THE ROUTE · WHERE YOU WAKE UP",
  title: ["THREE BASES.", "SEVEN LOCATIONS."] as const,
  body: "Many “wait, this is beautiful” moments. You unpack three times; Galle Fort, Madiha, Ahangama and Hiriketiya are all on the route from your bases.",
  inspiration: "",
  note: "",
  stops: [
    {
      key: "weligama",
      name: "WELIGAMA",
      nights: "29 & 30 DEC",
      kind: "BEACHFRONT",
      line: "Where the ocean meets the good life.",
      body: "A premium beachfront stay on the surf bay. Ocean out front, a pool, breakfast with the day's surf report.",
      tone: "#F2A23A",
      days: [
        { n: "01", label: "The Coastal Takeover", href: "#world-01" },
        { n: "02", label: "Good Waves. Better Nights.", href: "#world-02" },
      ],
      visits: [["LAZIES", "29 DEC · NIGHT OUT"], ["GALLE FORT", "30 DEC · DAY OUT"], ["MADIHA · THE DOCTOR'S HOUSE", "30 DEC · NIGHT OUT"]],
      slot: still(real.hotelWeligamaPool, "A resort pool running out towards the sea", "50% 58%"),
      place: still(partyPhotos.weligamaAerial, "Weligama from above: a long beach, fishing boats pulled up on the sand, surf rolling in", "50% 60%"),
      placeCap: "Weligama, from above",
    },
    {
      key: "mirissa",
      name: "MIRISSA",
      nights: "31 DEC & 1 JAN",
      kind: "BOUTIQUE COASTAL",
      line: "Where the year ends, and the next one starts.",
      body: "A premium coastal stay near the bay. Poolside afternoons, palms overhead, the beach a short walk away.",
      tone: "#FF4F6D",
      days: [
        { n: "03", label: "One Night Off The Record.", href: "#world-03" },
        { n: "04", label: "The First Day. The First Madness.", href: "#world-04" },
      ],
      visits: [["COCONUT TREE HILL", "31 DEC · SUNSET"], ["AHANGAMA · LAMANA", "31 DEC · NIGHT OUT"], ["ROPE SWING", "1 JAN · AFTERNOON"], ["HIRIKETIYA · JUNGLE PARTY", "1 JAN · NIGHT OUT"]],
      slot: still(real.hotelMirissaVilla, "A villa pool among palms", "50% 55%"),
      place: still(partyPhotos.mirissaBeach, "Mirissa bay: turquoise water, dark rocks and a green island offshore", "50% 50%"),
      placeCap: "Mirissa",
    },
    {
      key: "ella",
      name: "ELLA",
      nights: "2 & 3 JAN",
      kind: "MOUNTAIN VIEW",
      line: "The plot twist: mountains.",
      body: "A premium mountain-view stay above the valley. Mist at breakfast, tea slopes, a view you'll screenshot.",
      tone: "#7FC48A",
      days: [
        { n: "05", label: "Plot Twist: Mountain Edition.", href: "#world-05" },
        { n: "06", label: "Lost In The Highlands.", href: "#world-06" },
      ],
      visits: [["NINE ARCH BRIDGE", "3 JAN · MORNING"], ["LITTLE ADAM'S PEAK", "3 JAN · MORNING"], ["CAFE ONE LOVE · HIKING BAR", "2 + 3 JAN · NIGHTS OUT"]],
      slot: still(real.hotelEllaPool, "An infinity pool over the hills", "50% 55%"),
      place: still(photos.ellaRock, "Ella's green peaks under a moving sky, a trail scratched across the slope", "50% 45%"),
      placeCap: "Ella",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* tonight — the night out that closes each chapter                    */
/* ------------------------------------------------------------------ */

export const MOOD_NOTE = "";

export const tonight = {
  "world-01": {
    kicker: "TONIGHT · 29 DEC · WELIGAMA",
    venue: "LAZIES.",
    line: "Dinner's done, names are (mostly) learned. Now the first party of the trip, at Lazies in Weligama.",
    status: "PICKED CLOSER TO THE DATE" as NightStatus,
    slot: clip("real-dome", "A crowd dancing under a thatched dome washed in purple light"),
    tone: "#F2A23A",
    ground: "#1a0d05",
  },
  "world-02": {
    kicker: "TONIGHT · 30 DEC · MADIHA",
    venue: "THE DOCTOR'S HOUSE.",
    line: "A 200-year-old house by the sea that turns into a party on Wednesdays. This is its DJ night.",
    status: "PLANNED" as NightStatus,
    slot: clip("real-crowd", "A packed open-air crowd, arms in the air under a bright stage light"),
    tone: "#3FD0BF",
    ground: "#06141a",
  },
  "world-04": {
    kicker: "TONIGHT · 1 JAN · HIRIKETIYA",
    venue: "SECRET JUNGLE PARTY.",
    line: "The first party of 2027 is under the trees. Electronic music, a jungle clearing, lights in the canopy.",
    status: "PLANNED" as NightStatus,
    slot: clip("real-jungle", "Green and yellow beams cutting over a crowd under the trees"),
    tone: "#B9F23F",
    ground: "#020e08",
    stills: [
      { image: real.jungleLasers.file, alt: "Lasers cutting over a crowd in the dark" },
      { image: real.partyDome.file, alt: "A crowd under a thatched dome in purple light" },
      { image: real.jungleSmoke.file, alt: "A smoky stage lit from behind, a crowd below" },
    ],
  },
  "world-05": {
    kicker: "TONIGHT · 2 JAN · ELLA",
    venue: "CAFE ONE LOVE.",
    line: "A different kind of night out: mountain air, a DJ, the same crew in hoodies. Our stop after the group dinner.",
    status: "PROPOSED" as NightStatus,
    slot: still(photos.ellaNight, "Ella's main street at night: a tuk-tuk, wet tarmac, bar signs glowing", "50% 55%"),
    caption: "ELLA TOWN AFTER DARK",
    tone: "#7FC48A",
    ground: "#0c1712",
  },
  "world-06": {
    kicker: "TONIGHT · 3 JAN · ELLA",
    venue: "HIKING BAR.",
    line: "Live music to close the week, straight after the final dinner. One last night out with the people who were strangers six days ago.",
    status: "PROPOSED" as NightStatus,
    slot: clip("real-bar", "Friends dancing at a painted beach bar under palm thatch"),
    tone: "#C9A7FF",
    ground: "#120b1c",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 01 · 29 dec — the coastal takeover: weligama                        */
/* ------------------------------------------------------------------ */

/**
 * No clock times are stated unless the brief gave one ("around 5 PM" is the
 * brief's). Days are told in day-parts.
 */
export const world1 = {
  ...chapter("world-01"),
  lines: ["First stop. First waves. First “how do we all know each other?”", "Two nights by the ocean to settle in, find your people and get into holiday mode."] as const,
  slot: clip("landing", "Looking out over an aircraft wing as it descends towards a green coastline", "50% 40%"),

  board: {
    kicker: "ARRIVALS · COLOMBO · 29 DEC",
    /** The rows that flip in. Cities are where people fly from, not a promise of a group flight. */
    rows: [
      { from: "DELHI", code: "DEL" },
      { from: "MUMBAI", code: "BOM" },
      { from: "BENGALURU", code: "BLR" },
      { from: "CHENNAI", code: "MAA" },
      { from: "WHEREVER YOU ARE", code: "???" },
    ],
    to: "COLOMBO",
    status: "LAND BY 5 PM",
    note: "Flights aren't included — book from wherever you are, landing in Colombo around 5 PM. Your trip leader meets the group at arrivals, and our private vehicle takes it from there.",
    scribble: "everyone lands. then it starts.",
  },

  road: {
    kicker: "COLOMBO AIRPORT → WELIGAMA",
    title: ["STRANGERS", "FOR ABOUT", "AN HOUR."] as const,
    body: "Straight from arrivals onto the southern expressway in our own vehicle. By the time the sea shows up on the right, the van is already a group chat with wheels.",
    /** Panels of the horizontal reel, left to right. */
    frames: [
      { word: "Music.", note: "aux goes round the van. no skipping.", slot: clip("van", "Two friends up front in a car, green fields through the windscreen", "60% 50%") },
      { word: "Snacks.", note: "a roadside stop. king coconut. short eats.", slot: still(photos.kingCoconut, "A king-coconut seller sitting beside his bicycle, hung with bright orange coconuts", "30% 50%") },
      { word: "Games.", note: "two truths and a lie, somewhere past the paddy fields.", slot: still(photos.paddy, "Bright green paddy fields, a white stupa and coconut palms behind", "62% 50%") },
      { word: "New people.", note: "fifteen strangers. not for long.", slot: clip("window", "A passenger with her hand out of the car window, green fields rushing past", "55% 50%") },
      { word: "Weligama.", note: "home for the first two nights. the sea is right there.", slot: still(partyPhotos.weligamaAerial, "Weligama from above: a long beach, fishing boats pulled up on the sand, surf rolling in", "50% 60%") },
    ],
  },

  /** The evening, one beat at a time. Day-parts, not clock times. */
  sunset: {
    kicker: "29 DEC · WELIGAMA",
    title: "FIRST NIGHT, PROPERLY.",
    times: ["CHECK-IN", "PRE-GAME", "DINNER", "AFTER"] as const,
    lines: ["Keys, rooms, the first look at the ocean from our beachfront stay.", "Shower, change, the first drinks. Somebody connects a speaker.", "The welcome dinner: names, stories, terrible ice-breakers.", "Then we go out. Night one sets the tone."] as const,
    slot: still(real.beachClub, "White umbrellas and beanbags on a deck above breaking surf", "50% 60%"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 02 · 30 dec — good waves. better nights.                            */
/* ------------------------------------------------------------------ */

export const world2 = {
  ...chapter("world-02"),
  lines: ["Wake up by the ocean. Catch some waves. Lose track of time in Galle.", "And when the sun goes down, the real plans begin."] as const,
  slot: clip("surfer-dusk", "A surfer walking out of the sea into a silver evening, board under one arm"),

  /**
   * The horizontal reel of the day — one screen per beat, bright daylight
   * sliding into night. The label is a day-part, not a clock time.
   */
  beats: [
    {
      key: "surf" as string,
      time: "AM",
      title: ["YOUR FIRST", "WAVE."] as const,
      line: "A guided surf session in Weligama bay.",
      note: "Beginner-friendly: soft boards, gentle waves, instructors in the water with you. They handle the technique. You handle the falling off.",
      slot: still(real.surfGirls, "Two surfers carrying their boards into the shallows in soft morning light", "50% 55%"),
    },
    {
      key: "fort",
      time: "MIDDAY",
      title: ["GALLE FORT,", "ON FOOT."] as const,
      line: "A 400-year-old fort with the sea on three sides.",
      note: "A short drive up the coast, then no agenda: the old streets, the ramparts, the boutiques, the corners you'd never find alone.",
      slot: still(real.galleStreetDusk, "A Galle Fort street at dusk, lights coming on", "50% 50%"),
    },
    {
      key: "cafes",
      time: "PM",
      title: ["CAFÉ TO", "CAFÉ."] as const,
      line: "Lose track of time. That's the plan.",
      note: "Iced coffee, a second iced coffee, something you didn't need from a shop with no sign. Nobody's counting.",
      slot: still(partyPhotos.galleCafe, "A café veranda in Galle Fort: wooden tables, potted palms, a colonial facade", "50% 50%"),
    },
    {
      key: "sunset",
      time: "DUSK",
      title: ["SUNSET ON", "THE RAMPARTS."] as const,
      line: "The whole fort comes out for it.",
      note: "Up on the sea wall with everyone else in Galle, watching the sky go pink behind the lighthouse.",
      slot: still(real.galleSunsetFriends, "Friends sitting on the ramparts watching the sun go down", "50% 55%"),
    },
    {
      key: "night",
      time: "NIGHT",
      title: ["WEDNESDAY", "NIGHT."] as const,
      line: "The Doctor's House, Madiha.",
      note: "A proper party to end the day: its weekly DJ night, a dance floor, the sea somewhere in the dark behind it.",
      slot: still(real.partyRed, "A packed open-air dance floor in red light", "50% 60%"),
    },
  ],
  scribble: "bright by day. loud by night.",
} as const;

/* ------------------------------------------------------------------ */
/* 03 · 31 dec — one night off the record: mirissa, new year's eve     */
/* ------------------------------------------------------------------ */

/**
 * New Year's Eve, in order: move to Mirissa → the beach → the last sunset →
 * get ready → dinner → the party stop → midnight on the sand → after-party.
 * NOTHING IS PROMISED THAT ISN'T SECURED: Lamana is "planned, subject to
 * event confirmation"; the after-party venue is confirmed before departure;
 * no fireworks are promised (the canvas burst is an animation, and no copy
 * mentions them); turtles are wild. The ramp's clock is the scroll device
 * counting to midnight — its readings are illustrative.
 */
export const world3 = {
  ...chapter("world-03"),
  lines: ["Some New Year's Eves are spent watching the clock.", "Ours is spent chasing the last sunset and dancing by the coast."] as const,
  slot: still(photos.mirissaCoast, "Mirissa from the air: palms, a curve of beach and white surf", "50% 50%"),

  ramp: [
    { at: "09:30", word: "CHECK OUT", line: "Weligama to Mirissa. A short hop down the coast.", slot: clip("window", "A passenger with her hand out of the car window, green fields rushing past", "55% 50%") },
    { at: "11:00", word: "MIRISSA", line: "Check into the coastal stay. Then straight to the beach.", slot: still(partyPhotos.mirissaBeach, "Mirissa bay: turquoise water, dark rocks and a green island offshore", "50% 50%") },
    { at: "13:00", word: "TURTLES", line: "A responsible turtle-spotting stop, if the sea plays along.", slot: still(photos.mirissaBay, "Mirissa bay, waves breaking below a green headland", "50% 50%") },
    { at: "15:00", word: "THE BEACH", line: "Sand, a swim, a nap. You will need the nap.", slot: still(photos.palms, "Coconut palms leaning over a turquoise bay", "50% 50%") },
    { at: "17:45", word: "COCONUT TREE HILL", line: "The last sunset of 2026. Don't look at your phone.", slot: still(real.cthArms, "Someone standing arms-out on Coconut Tree Hill, palms all around, turquoise sea behind", "50% 45%") },
    { at: "19:30", word: "GET READY", line: "Black. White. Shimmer. Four mirrors, one charger.", slot: still(photos.dusk, "The sea under a violet dusk, a headland dark on the horizon", "50% 60%") },
    { at: "20:45", word: "DINNER", line: "Dressed up, glasses up, the whole group at one table.", slot: still(partyPhotos.toast, "Raised glasses and gold confetti in the air", "50% 40%") },
    { at: "22:15", word: "THE PARTY STOP", line: "Lamana, Ahangama. The party stop of the night.", slot: still(real.partyCrowd, "A packed open-air crowd, arms in the air under a bright stage light", "50% 60%") },
    { at: "23:40", word: "BACK TO THE BEACH", line: "Back to Mirissa. Shoes off. Everyone walks down to the water.", slot: still(real.sparklerFriends, "Friends on a beach at dusk, waving sparklers", "52% 50%") },
  ],
  midnightWord: "MIDNIGHT.",

  party: {
    kicker: "31 DEC · NEW YEAR'S EVE · THE CENTREPIECE",
    title: ["ONE NIGHT", "OFF THE RECORD"] as const,
    body: "A night in four acts: a pre-party dinner, a party stop at Lamana in Ahangama, the countdown barefoot on Mirissa beach, and a Mirissa New Year's Eve after-party to carry it into the morning. Dress code: black, white, shimmer.",
    /** The night's running order, read top to bottom like a programme. */
    programme: ["DINNER", "THE PARTY", "23:59", "00:00", "AFTER-PARTY", "2027"] as const,
  },

  countdown: {
    lead: ["One minute.", "One beach.", "16 strangers.", "And a year waiting to begin."] as const,
    year: "2027",
    after: "Happy New Year. You're not strangers any more.",
    slot: clip("real-hands", "Hands in the air under a green-lit thatched roof, a packed open-air dance floor"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* 04 · 1 jan — the first day. the first madness.                      */
/* ------------------------------------------------------------------ */

/**
 * Slow by day, loud by night: the page's one light chapter (paper, prints,
 * a swim) cuts straight into its darkest (the jungle party — see `tonight`).
 * No openly licensed photograph of Hiriketiya could be found, so it is named
 * in text and never pinned to a photo of somewhere else.
 */
export const world4 = {
  ...chapter("world-04"),
  heading: ["THE FIRST", "DAY"] as const,
  lines: ["Sleep in.", "Late breakfast.", "Nobody is setting alarms."] as const,
  turn: ["New year. Same energy.", "Tonight we follow the bass into the trees."] as const,
  slot: clip("morning", "Looking up through a palm tree, the sun flaring between its fronds"),
  /** Above the prints: the day, in order. */
  exploreTag: "1 JAN · MIRISSA · LATE BREAKFAST · POOL · THE BEACHES · THEN HIRIKETIYA AFTER DARK",
  /** The day in frames. Captions, not features. */
  moments: [
    { caption: "late breakfast. no alarm.", image: photos.breakfast.file, alt: "A tropical breakfast: fruit, coffee and juice on a wooden table", tilt: -3 },
    { caption: "pool. book. zero plans.", image: real.pool.file, alt: "Feet up at the edge of a blue pool, palms and a white villa behind", tilt: 2 },
    { caption: "a rope swing over the water.", image: real.ropeSwing.file, alt: "Someone swinging out on a rope from a leaning palm at sunset", tilt: -1.5 },
    { caption: "the first sunset of 2027.", image: real.redSunset.file, alt: "A red sunset through leaning palms", tilt: 3 },
  ],
  swim: {
    kicker: "1 JAN · SLOW BY DAY",
    title: ["FIRST SWIM", "OF 2027."] as const,
    body: "A slow morning by the beach, a little sunshine, a lot of laughter. The afternoon is for the beaches around Mirissa, a rope swing over the water, a long lunch, and resting up — because the first night of the year runs late.",
    slot: clip("gold-shore", "Late gold light on a beach, small waves running up the sand"),
    scribble: "rest up. tonight is in a jungle.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 05 · 2 jan — plot twist: mountain edition                           */
/* ------------------------------------------------------------------ */

export const world5 = {
  ...chapter("world-05"),
  lines: ["Just when you think you've seen it all, we switch the scene.", "Goodbye coastline. Hello mountains."] as const,
  slot: still(real.ellaRock, "Ella Rock rising green and steep under a heavy sky", "50% 50%"),

  /** COAST → MOUNTAINS: the drive inland, as a drift of words. */
  hopsLabel: "COAST → MOUNTAINS · THE DRIVE IS THE FIRST VIEWPOINT",
  hops: [
    { word: "OCEAN", note: "one last look. salt still in your hair.", slot: clip("ocean-tall", "Turquoise water from above, waves breaking white onto sand") },
    { word: "PALMS", note: "the coast road, one more time.", slot: still(photos.palms, "Coconut palms leaning over a turquoise bay", "50% 50%") },
    { word: "PADDY FIELDS", note: "where the green starts.", slot: still(photos.paddy, "Bright green paddy fields, a white stupa and coconut palms behind", "62% 50%") },
    { word: "GREEN HILLS", note: "the air cools, one bend at a time.", slot: clip("road", "A road curving through green mountains under low cloud") },
    { word: "TEA COUNTRY", note: "every slope combed into rows.", slot: still(photos.tea, "A tea estate from above, rows of green bushes combed across a hillside", "50% 50%") },
    { word: "ELLA", note: "swap the bikini for a hoodie.", slot: still(photos.ellaRock, "Ella's green peaks under a moving sky, a trail scratched across the slope", "50% 45%") },
  ],

  floating: {
    kicker: "2 JAN · ELLA",
    title: ["MOUNTAIN", "EDITION"] as const,
    /** These drift up one at a time as you scroll. */
    words: ["Check in. Look at that view.", "Ella town, on foot.", "Cafés, little shops, the valley.", "A social group dinner.", "Then the night out."] as const,
    slot: still(photos.ellaDawn, "A sky burning orange over the silhouettes of hill-country trees", "50% 60%"),
    note: "A premium mountain-view stay, an afternoon in Ella's cafés, a group dinner — and the nights stay loud, just at altitude.",
    scribble: "first night in the mountains.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 06 · 3 jan — lost in the highlands                                  */
/* ------------------------------------------------------------------ */

export const world6 = {
  ...chapter("world-06"),
  lines: ["Somewhere between the mountain views and the nights out,", "this stopped feeling like a group of strangers."] as const,
  slot: still(real.nineSun, "A blue train curving over the Nine Arch Bridge, sun flaring through the trees", "46% 50%"),

  /** The day, landing as a pile of prints in the order we do it. */
  memories: [
    { image: photos.trainBridge.file, caption: "morning: nine arch bridge" },
    { image: real.trainGirl.file, caption: "the scenic train, doors open" },
    { image: photos.littleAdams.file, caption: "little adam's peak" },
    { image: real.hillTrain.file, caption: "tea country, from the train window" },
    { image: real.chillCafe.file, caption: "a café, and nothing else on the list" },
    { image: photos.ellaGap.file, caption: "golden hour over the gap" },
  ],
  road: { from: "MORNING", to: "GOLDEN HOUR", note: "The bridge, the train, the peak, a long café afternoon. It goes far too fast." },

  supper: {
    kicker: "3 JAN · ELLA · THE FINAL DINNER",
    title: ["THE FINAL", "DINNER"] as const,
    body: "The last Plot Twist dinner of the trip. One long table in the mountains, the stories everyone's going to be telling wrong for years — and a group that was sixteen strangers six days ago. Then one more night out.",
    slot: still(photos.ellaGap, "The Ella Gap: a deep green valley opening out towards the plains far below", "50% 50%"),
    /** The order of the evening. */
    courses: ["Long table", "Music", "Drinks", "Stories", "Photos", "Awards", "Inside jokes", "One last night out"],
    awards: {
      label: "THE AWARDS",
      hint: "Tap a card. The winners are decided on the night.",
      items: [
        "Last one off the dance floor",
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
/* 07 · 4 jan — until the next plot twist                              */
/* ------------------------------------------------------------------ */

export const world7 = {
  ...chapter("world-07"),
  /** One word per frame, fast, like a camera roll that needs its own holiday. */
  roll: [
    { word: "Last breakfast.", image: photos.breakfast.file },
    { word: "Your first wave.", image: real.surfGirls.file },
    { word: "Galle Fort.", image: photos.galleStreet.file },
    { word: "Coconut Tree Hill.", image: real.cthArms.file },
    { word: "Midnight.", image: real.sparklerFriends.file },
    { word: "The jungle.", image: real.partyJungle.file },
    { word: "Ella.", image: real.ellaRock.file },
    { word: "Nine Arch.", image: real.nineSun.file },
    { word: "People.", image: "/photos/trips/goa-oct-26/beach-crew.jpg" },
    { word: "Colombo.", image: photos.colomboNight.file },
  ],
  close: ["WE CAME FOR THE DESTINATIONS.", "WE LEFT WITH THE STORIES."] as const,
  sign: "PLOT TWIST",
  signoff: "Seven days ago we arrived as strangers. Now we're leaving with inside jokes, stories we'll keep repeating and a camera roll that needs its own holiday.",
  cta: { label: "MAKE THIS YOUR NEW YEAR", href: "#apply" },
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
  slot: clip("real-jungle", "Something hidden behind frosted glass"),
} as const;

/* ------------------------------------------------------------------ */
/* come as strangers                                                   */
/* ------------------------------------------------------------------ */

/** Every photograph here is a real Plot Twist group on an earlier journey — nothing is stock. */
export const strangers = {
  kicker: "THE PEOPLE",
  title: ["COME AS STRANGERS.", "LEAVE WITH STORIES."] as const,
  body: "Come solo, bring a friend or show up with your favourite travel partner. The best part of the journey might just be the people you meet along the way.",
  caption: "real plot twist crews, earlier journeys. nothing here is stock.",
  facts: [
    { k: "MOST PEOPLE", v: "come solo" },
    { k: "THE GROUP", v: `${trip.seats} seats · ages ${trip.ages}` },
    { k: "BY NIGHT TWO", v: "nobody's a stranger" },
  ],
  photos: [
    { src: "/photos/trips/goa-oct-26/crew-selfie.jpg", alt: "A Plot Twist group crowding into a selfie", tilt: -3 },
    { src: "/photos/trips/goa-oct-26/beach-crew.jpg", alt: "A Plot Twist group on a beach at dusk", tilt: 2 },
    { src: "/photos/trips/goa-oct-26/linen-crew.jpg", alt: "A Plot Twist group dressed in white linen on a boat deck", tilt: -1.5 },
    { src: "/photos/trips/goa-oct-26/bridge-crew.jpg", alt: "A Plot Twist group on a bridge, mid-laugh", tilt: 3 },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* the conversion — what's included, who it's for, the details        */
/* ------------------------------------------------------------------ */

/**
 * INCLUSIONS. Taken from the trip brief and the brochure's deal page. Party
 * entries and drinks are NOT included (same as the creator edition). The
 * list is still `confirmed: false`: it is confirmed in writing with each
 * offer, and the page says so rather than implying a contract.
 */
export const included = {
  label: "WHAT'S INCLUDED",
  headline: "Everything except the flight and the hangover.",
  confirmed: true,
  items: [
    { k: "SIX NIGHTS, THREE BASES", v: "Premium stays: two nights beachfront in Weligama, two on the coast in Mirissa, two with a mountain view in Ella." },
    { k: "PRIVATE TRANSPORT", v: "Colombo airport pickup and drop, and our own group vehicle for the transfers in the itinerary." },
    { k: "THE SURF SESSION", v: "A guided, beginner-friendly surf session in Weligama bay." },
    { k: "THE COAST", v: "Galle Fort, Mirissa Beach, Coconut Tree Hill, a rope swing and a responsible turtle-spotting stop." },
    { k: "THE HIGHLANDS", v: "Nine Arch Bridge, the scenic train experience and the viewpoints, Little Adam's Peak." },
    { k: "THE NIGHTS OUT", v: "Six nights planned for you: Lazies, The Doctor's House, Lamana and midnight on the beach, the jungle party, Cafe One Love and Hiking Bar. Entry tickets and drinks are yours to buy." },
    { k: "BREAKFASTS & GROUP DINNERS", v: "Daily breakfast, the welcome dinner, the New Year's Eve pre-party dinner, the Ella social dinner and the final dinner." },
    { k: "YOUR TRIP LEADER", v: "A Plot Twist trip leader with the group throughout, handling the coordination so you never have to." },
  ],
  pending: "",
  excluded: ["Flights to and from Colombo", "Drinks, at dinner and on the nights out", "Party and club entry tickets", "Meals other than those mentioned in the itinerary", "Personal expenses: shopping, tips and extras", "Visa (ETA) and travel insurance", "Anything not listed under included"],
} as const;

export const forWho = {
  label: "WHO IS THIS FOR?",
  lead: "For people who'd rather collect stories than souvenirs.",
  lines: [
    "For anyone travelling solo who'd rather not ring in the year alone. (Most people come solo.)",
    "For people who've done the big group New Year's Eve at home, and want to know what else there is.",
    "For the one who wants the surf, the fort and the mountains — and also wants to be out every single night.",
    "For people who'll be first on the dance floor, and the ones who'll film it.",
    "For anyone who wants a week planned end to end, without planning any of it.",
  ],
  not: "Not for: itinerary police, five-star complainers, or anyone who needs to be asleep by 11 on the 31st.",
} as const;

export const cast = {
  bridge: ["THE ISLAND IS THE SETTING. THE PEOPLE ARE THE PLOT.", "16 seats. 16 strangers. One New Year."] as [string, string],
  composition: {
    title: "16 SEATS.",
    body: "We're looking for the ones who'll be first in the sea, loudest at the countdown and still somehow make breakfast on January 1.",
    disclaimer: "Basically, good vibes only.",
    extra: ["And yes, 10/10s only.", "Not the looks kind. The energy kind."],
  },
} as const;

/** Same shape as bir.price. The owner set ₹54,999 until 20 Nov 2026 and ₹59,999 after, flights excluded, on 14 Nov 2026. */
export const price = {
  confirmed: true,
  amount: "₹54,999",
  note: "Per person · till 20 Nov 2026, then ₹59,999 · flights excluded",
  tiers: [{ k: "TILL 20 NOV 2026", v: "₹54,999" }, { k: "AFTER 20 NOV", v: "₹59,999" }],
  pending: "",
  pendingNote: "",
} as const;

export const details = {
  label: "THE DEAL",
  headline: trip.dates,
  sub: "SRI LANKA · THE NEW YEAR TAKEOVER · COAST TO MOUNTAINS",
  basics: [
    { k: "WHEN", v: trip.datesLong },
    { k: "LENGTH", v: trip.length },
    { k: "YOU SLEEP IN", v: "Weligama · Mirissa · Ella" },
    { k: "NIGHTS OUT", v: "Six · never the same venue" },
    { k: "SEATS", v: `${trip.seats} · group size can vary` },
    { k: "AGES", v: trip.ages },
  ],
  price,
  priceLabel: "TILL 20 NOV 2026",
  priceUnit: "PER PERSON · THEN ₹59,999 · FLIGHTS EXCLUDED",
  selection: "Curated. Every application is read by a real person. ₹10,000 books your seat; the balance is due by 7 December.",
  /**
   * THE FINE PRINT. Only what is actually decided is stated. Payment schedule,
   * room-sharing basis and cancellation terms are NOT yet set for this trip,
   * so each says where and when the visitor gets them, instead of a guess.
   */
  fineprint: [
    { k: "FLIGHTS", v: "Not included. Land in Colombo (CMB) around 5 PM on 29 December. For the 4th, check your departure time with us before you book: Ella is a long drive from the airport." },
    { k: "BOOKING AMOUNT", v: "₹10,000 books your seat. That is all you pay now." },
    { k: "THE BALANCE", v: "The rest is due by 7 December 2026." },
    { k: "CANCELLATION", v: "Plans change, and we get it. Cancel by 20 November 2026 and it is free: your ₹10,000 comes straight back. After that the booking amount stays with us, because from that point we start paying our stays, transport and vendors to hold your seat." },
    { k: "ROOMS", v: "Rooms are shared with others in the group. Coming with a friend? Tell us and we put you together." },
    { k: "THE NIGHTS OUT", v: "We plan every night out. Entry tickets and drinks are yours to buy at the venue." },
    { k: "COMING SOLO", v: "Nobody knows each other on day one, and by night two nobody remembers that." },
    { k: "PASSPORT & VISA", v: "A passport valid for six months. Sri Lanka needs an ETA or visa on entry; we send you the current steps once you book." },
  ],
  cta: "I'M IN — LET'S GO",
  ask: "ASK US ON WHATSAPP →",
  whatsapp: "Hey Plot Twist 👀 tell me about the Sri Lanka New Year Takeover",
  scribble: "the boring bit. read it anyway.",
} as const;

export const finalCta = {
  headline: ["YOUR NEW YEAR PLANS", "ARE LOOKING A LITTLE", "TOO ORDINARY."] as const,
  sub: "Let's fix that. 29 December – 4 January. ₹10,000 books your seat. Come be part of the plot.",
  primary: { label: "BOOK YOUR SPOT", href: "#apply" },
  secondary: { label: "BACK TO THE FILM", href: "#world-01" },
  slot: clip("real-sunset", "A red sunset behind leaning palms, the sea going dark"),
} as const;

export const sticky = {
  label: "I'M IN",
  href: "#apply",
  meta: "SRI LANKA · 29 DEC — 4 JAN · ₹54,999 TILL 20 NOV",
  line: "₹10,000 books your seat.",
} as const;

export const credits = {
  label: "PHOTOGRAPHS & FOOTAGE",
  note: "Photographs of Weligama, Galle Fort, Mirissa, Coconut Tree Hill, the tea country, the train, Nine Arch Bridge, Little Adam's Peak, Ella and Colombo were taken in Sri Lanka. Group photographs are Plot Twist's own, from earlier journeys. The party footage and most of the coast, stay and café pictures are our own, shot in Sri Lanka: real nights on the south coast, though not necessarily the venue named on each night, and not the specific stays we book. A few moments (breakfast, the toast, some road footage) are from elsewhere. Thank you to:",
} as const;

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

export const SL_SECTION_ORDER = ["film", "included", "for", "cast", "details", "application"] as const;
export type SlSectionKey = (typeof SL_SECTION_ORDER)[number];
export function slIndex(key: SlSectionKey): string {
  return String(SL_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}
