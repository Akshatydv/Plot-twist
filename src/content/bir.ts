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
 * Two kinds of image, and the difference matters:
 *
 *   PLACE photographs — anything shown AS Bir, Billing or Barot (the hero
 *   still, the day cards, the river, the town, the aerial, the summit) — were
 *   taken there, checked against their Commons title and description.
 *
 *   MOMENT images — golden hour, the fires, the last night, the road, and
 *   both flying clips — are chosen for the moment, not the map, on the site
 *   owner's instruction. None is captioned or alt-texted as Bir or Barot.
 *   The hero clip is a paraglider over New South Wales; the golden hour is
 *   Kinner Kailash from Kalpa, elsewhere in Himachal.
 *
 * Licences: Creative Commons BY / BY-SA (credit required), CC0 and the
 * Mixkit Free licence (credit not required, given anyway). `photos` and
 * `footage` below are the single lists, rendered on the page by
 * <PhotoCredits/> and mirrored in public/photos/bir/PHOTOS.md and
 * public/videos/bir/VIDEOS.md. An image added without a credit line is a
 * licence breach, not a style choice.
 */
export type MediaSlot = {
  /** An mp4 (H.264) path under /public. Muted, looped, never autoplayed with sound. */
  video?: string;
  /** The same clip as VP9 WebM, offered first — smaller, and plays where H.264 isn't licensed. */
  webm?: string;
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
const CC_BY_3 = { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" };
const CC0 = { license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const CC_BY_SA_2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const PDM = { license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/" };
const MIXKIT = { license: "Mixkit Free License", licenseUrl: "https://mixkit.co/license/#videoFree" };
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

export const photos = {
  hero: { file: "/photos/bir/hero.jpg", title: "Paragliding at Bir, HP", author: "PanWoyteczek (derivative: UnpetitproleX)", ...CC_BY_SA_4, source: `${COMMONS}Paragliding_at_Bir,_HP.jpg` },
  barotValley: { file: "/photos/bir/barot-valley.jpg", title: "Barot and Ühl Rivulet", author: "Sanjay Lakhanpal", ...CC_BY_SA_4, source: `${COMMONS}Barot_and_%C3%9Chl_Rivulet.jpg` },
  barotUhl: { file: "/photos/bir/barot-uhl.jpg", title: "Uhl above Barot towards Billing", author: "Timothy Gonsalves", ...CC_BY_SA_4, source: `${COMMONS}Uhl_above_Barot_towards_Billing_Oct_2017_D72_2280_01.jpg` },
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
  // ── moment photographs: not Bir or Barot, never labelled as them ──
  goldenHour: { file: "/photos/bir/golden-hour.jpg", title: "Mt Kailash, as seen from Kalpa", author: "India Untravelled", ...CC_BY_2, source: "https://www.flickr.com/photos/73700351@N03/6742605245" },
  bonfire: { file: "/photos/bir/bonfire.jpg", title: "Bonfire", author: "SurFeRGiRL30", ...CC_BY_2, source: "https://www.flickr.com/photos/33143245@N02/7390704632" },
  campfire: { file: "/photos/bir/campfire.jpg", title: "Meadow Creek Campfire", author: "US Forest Service, Northern Region", ...CC_BY_2, source: "https://www.flickr.com/photos/40882383@N03/9194201298" },
  embers: { file: "/photos/bir/embers.jpg", title: "Warmth in the night", author: "Kitty Terwolbeck", ...CC_BY_2, source: "https://www.flickr.com/photos/59800091@N04/6263334396" },
  lastNight: { file: "/photos/bir/last-night.jpg", title: "Dinner under the lights", author: "shankar s.", ...CC_BY_2, source: "https://www.flickr.com/photos/77742560@N06/14583973531" },
  road: { file: "/photos/bir/road.jpg", title: "A winding mountain road", author: "shirishpoudel07", ...CC0, source: "https://wordpress.org/photos/photo/9666995a9b/" },
  roadAlt: { file: "/photos/bir/road-alt.jpg", title: "A road through the tea gardens", author: "Vishnu Chandra", ...CC0, source: "https://wordpress.org/photos/photo/6216a2a5a7/" },
  barotView: { file: "/photos/bir/barot-view.jpg", title: "View of Barot valley", author: "Harvinder Chandigarh", ...CC_BY_SA_4, source: `${COMMONS}View_of_Barot_valley_01.jpg` },
} satisfies Record<string, PhotoCredit>;

/**
 * THE SCENE PHOTOGRAPHS — one for every screen that used to be illustration.
 * Moment photographs, like the ones above: chosen for what's happening, not
 * where, and never labelled as Bir or Barot. Found through Openverse; all
 * CC BY / BY-SA 2.0, CC0 or Public Domain Mark. No-derivatives (ND) licences
 * were excluded, since every one of these is cropped and graded.
 */
export const scenes = {
  clouds: { file: "/photos/bir/more/clouds.jpg", title: "Hiking above the clouds. Chugach State Park, Alaska", author: "Paxson Woelber", ...CC_BY_2, source: "https://www.flickr.com/photos/59306007@N08/29693555372" },
  day3: { file: "/photos/bir/more/day3.jpg", title: "Spiti Valley Trek: Where Adventure Meets The Road", author: "hitesh9352718", ...CC_BY_2, source: "https://www.flickr.com/photos/198887757@N02/53207533720" },
  day4: { file: "/photos/bir/more/day4.jpg", title: "RoadToChandraTal", author: "4ocima", ...CC_BY_2, source: "https://www.flickr.com/photos/19016430@N00/299019563" },
  end: { file: "/photos/bir/more/end.jpg", title: "The Burning Dhaulagiri", author: "cnneil", ...CC_BY_SA_2, source: "https://www.flickr.com/photos/62510930@N07/12608812145" },
  eveMusic: { file: "/photos/bir/more/eve-music.jpg", title: "Last night campfire.", author: "twodolla", ...CC_BY_2, source: "https://www.flickr.com/photos/76991932@N00/5779158766" },
  eveNotforlong: { file: "/photos/bir/more/eve-notforlong.jpg", title: "Sunset Watching", author: "Zach Dischner", ...CC_BY_2, source: "https://www.flickr.com/photos/35557234@N07/5975314337" },
  eveStrangers: { file: "/photos/bir/more/eve-strangers.jpg", title: "Friends!", author: "philos from Athens", ...CC_BY_2, source: "https://www.flickr.com/photos/62722383@N00/9583526116" },
  finalStars: { file: "/photos/bir/more/final-stars.jpg", title: "Loveland Lights", author: "Zach Dischner", ...CC_BY_2, source: "https://www.flickr.com/photos/35557234@N07/31454588860" },
  flightEdge: { file: "/photos/bir/more/flight-edge.jpg", title: "Little Church Paragliding Launch in Greece", author: "jonas.wagner", ...CC_BY_2, source: "https://www.flickr.com/photos/80225884@N06/30426400422" },
  homeBreakfast: { file: "/photos/bir/more/home-breakfast.jpg", title: "Breakfast @ Mountain Lyon", author: "nloyless", ...CC_BY_2, source: "https://www.flickr.com/photos/56201943@N00/7615332098" },
  homeCoffee: { file: "/photos/bir/more/home-coffee.jpg", title: "Bosnian coffee", author: "M1key.me", ...CC_BY_2, source: "https://www.flickr.com/photos/91418149@N03/13926468997" },
  homeMorning: { file: "/photos/bir/more/home-morning.jpg", title: "Old Market's Window", author: "Diego3336", ...CC_BY_2, source: "https://www.flickr.com/photos/31018257@N00/9930009153" },
  homePacking: { file: "/photos/bir/more/home-packing.jpg", title: "Packs", author: "Jo Simon", ...CC_BY_2, source: "https://www.flickr.com/photos/49194777@N00/2229636990" },
  homePhotos: { file: "/photos/bir/more/home-photos.jpg", title: "Top of ridge above lake buttermere", author: "SeanJCPhoto", ...CC_BY_2, source: "https://www.flickr.com/photos/38016332@N02/4568996957" },
  homeRoad: { file: "/photos/bir/more/home-road.jpg", title: "15 mph curve, Haleakela", author: "wbaiv", ...CC_BY_SA_2, source: "https://www.flickr.com/photos/9998127@N06/7533845556" },
  homeViews: { file: "/photos/bir/more/home-views.jpg", title: "Lockett Meadow", author: "deborah.soltesz", ...CC0, source: "https://www.flickr.com/photos/10836653@N05/3593834794" },
  morningRoad: { file: "/photos/bir/more/morning-road.jpg", title: "Children's Seat Viewpoint, yercaud, Salem, Chennai", author: "Mathew S Thomas", ...CC0, source: "https://www.flickr.com/photos/144598114@N02/41838657830" },
  nightStars: { file: "/photos/bir/more/night-stars.jpg", title: "February #conservationlands15 Social Media Takeover: Top 15 Places on", author: "mypubliclands", ...CC_BY_2, source: "https://www.flickr.com/photos/91981596@N06/15924490113" },
  recapPeople: { file: "/photos/bir/more/recap-people.jpg", title: "climbing helping team work , success concept", author: "ujgmxxuy61", ...PDM, source: "https://www.flickr.com/photos/159535053@N06/42172615510" },
  routeCity: { file: "/photos/bir/more/route-city.jpg", title: "City streets!", author: "Flickr user 61732052@N02", ...CC_BY_2, source: "https://www.flickr.com/photos/61732052@N02/8061937565" },
  routeHighway: { file: "/photos/bir/more/route-highway.jpg", title: "Belgharia Expressway,Kolkata", author: "seaview99", ...CC_BY_SA_2, source: "https://www.flickr.com/photos/85296574@N00/2067375702" },
  routeHills: { file: "/photos/bir/more/route-hills.jpg", title: "Mountain road", author: "generalising", ...CC_BY_SA_2, source: "https://www.flickr.com/photos/97534175@N00/6609215681" },
  sunrise: { file: "/photos/bir/more/sunrise.jpg", title: "Sunrise in the Himalayas", author: "Koshyk", ...CC_BY_2, source: "https://www.flickr.com/photos/97235261@N00/11096205714" },
  townCafe: { file: "/photos/bir/more/town-cafe.jpg", title: "Chai tea latte at Tod Mountain Cafe", author: "Ruth and Dave", ...CC_BY_2, source: "https://www.flickr.com/photos/95142644@N00/31970926371" },
  townColour: { file: "/photos/bir/more/town-colour.jpg", title: "A Mexican - Tibetan Buddha rooftop in Puerto Vallarta, Jalisco, Mexico", author: "Wonderlane", ...CC0, source: "https://www.flickr.com/photos/71401718@N00/351494912" },
  townFlags: { file: "/photos/bir/more/town-flags.jpg", title: "Prayer Flag over Namgyal Tsemo", author: "Prayudi Hartono", ...CC_BY_2, source: "https://www.flickr.com/photos/30040853@N02/6272955020" },
  townRoads: { file: "/photos/bir/more/town-roads.jpg", title: "Trollstigen - The Troll Ladder", author: "doegox", ...CC_BY_SA_2, source: "https://www.flickr.com/photos/8034873@N07/2764840675" },
  townTravellers: { file: "/photos/bir/more/town-travellers.jpg", title: "Girl Traveling Mountain Vacation", author: "Rawpixel Ltd", ...CC0, source: "https://www.flickr.com/photos/147875007@N03/34006154775" },
  trees: { file: "/photos/bir/more/trees.jpg", title: "Merry Christmas Forest, Stockholm", author: "Sue Wellington: photography and sketchbooks", ...PDM, source: "https://www.flickr.com/photos/45843037@N03/23759873986" },
  trekArrive: { file: "/photos/bir/more/trek-arrive.jpg", title: "A photographer capturing view from Mt Fuji", author: "diloz", ...CC_BY_2, source: "https://www.flickr.com/photos/18589149@N06/4879774124" },
  trekAscend: { file: "/photos/bir/more/trek-ascend.jpg", title: "Pacific Crest National Scenic Trail, California", author: "mypubliclands", ...CC_BY_2, source: "https://www.flickr.com/photos/91981596@N06/35906491624" },
  trekDiscover: { file: "/photos/bir/more/trek-discover.jpg", title: "20150822_Prescott NF, AZ_R3_Mingus Mountain Picnic Site_001 (US Forest", author: "Prescott NF", ...PDM, source: "https://www.flickr.com/photos/128931870@N08/48650398007" },
  trekStart: { file: "/photos/bir/more/trek-start.jpg", title: "travel gear.", author: "stevecoutts", ...CC_BY_2, source: "https://www.flickr.com/photos/11679961@N05/3671034436" },
} satisfies Record<string, PhotoCredit>;

/**
 * THE FOOTAGE. Each file is a 16s (or shorter) silent loop cut from the
 * source and cross-faded end-into-start so the seam doesn't jump — a trim
 * and a re-encode, both permitted by the licences below. No other edit.
 */
export const footage = {
  hero: { file: "/videos/bir/hero.mp4", title: "Paragliding in Blackheath NSW Australia at high altitude", author: "skinduptruk", ...CC_BY_3, source: `${COMMONS}Paragliding_in_Blackheath_NSW_Australia_at_high_altitude.webm` },
  above: { file: "/videos/bir/above.mp4", title: "Paragliding through clouds in Blackheath NSW Australia", author: "skinduptruk", ...CC_BY_3, source: `${COMMONS}Paragliding_through_clouds_in_Blackheath_NSW_Australia.webm` },
  bonfire: { file: "/videos/bir/bonfire.mp4", title: "Campfire burning wood logs in the dark", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/campfire-burning-wood-logs-in-the-dark-22730/" },
  prepare: { file: "/videos/bir/flight-prepare.mp4", title: "Paragliding - Parapendio - Vipavska dolina, Slovenia", author: "Slovely.eu", ...CC_BY_3, source: `${COMMONS}Paragliding_-_Parapendio_-_Vipavska_dolina,_Slovenia.webm` },
  fly: { file: "/videos/bir/flight-fly.mp4", title: "Fly Golte, fly Slovenia - paragliding tandem Slovenia 9", author: "Nejc Sedovnik", ...CC_BY_3, source: `${COMMONS}Fly_Golte,_fly_Slovenia_-_paragliding_tandem_Slovenia_9.webm` },
  land: { file: "/videos/bir/flight-land.mp4", title: "Paragliding Slovenija - Vremščica", author: "Aleš Kalin", ...CC_BY_3, source: `${COMMONS}Paragliding_Slovenija_-_Vremščica.webm` },
  warmDrink: { file: "/videos/bir/warm-drink.mp4", title: "People pouring a warm drink around a campfire", author: "Mixkit", ...MIXKIT, source: "https://mixkit.co/free-stock-video/people-pouring-a-warm-drink-around-a-campfire-513/" },
} satisfies Record<string, PhotoCredit>;

/** A still slot from a scene photograph. */
const still = (c: PhotoCredit, alt: string, focus = "50% 50%"): MediaSlot => ({ image: c.file, alt, focus });
/** A video slot from a clip under /videos/bir/<name>.{webm,mp4} with its poster. */
const clip = (name: string, alt: string, focus = "50% 50%"): MediaSlot => ({
  video: `/videos/bir/${name}.mp4`,
  webm: `/videos/bir/${name}.webm`,
  image: `/videos/bir/${name}-poster.jpg`,
  alt,
  focus,
});

/**
 * EVERY SEQUENCE'S FRAMES, IN ORDER. Components index these by stage, so a
 * sequence can never have a stage without a picture.
 */
export const sequences = {
  route: [
    still(scenes.routeCity, "A city road at night, streaked with the light trails of traffic"),
    still(scenes.routeHighway, "An empty expressway under a clear evening sky"),
    still(scenes.routeHills, "A narrow road bending round a hillside, trucks climbing it"),
    still(photos.barotView, "Barot: the Uhl running over boulders under forested hills", "50% 55%"),
  ],
  dawn: [
    still(scenes.nightStars, "The Milky Way over a tent glowing orange under the trees"),
    still(scenes.sunrise, "First light on a range of snow peaks above dark valleys", "50% 60%"),
    still(scenes.morningRoad, "A road winding through morning mist on a hillside"),
  ],
  town: [scenes.townFlags, scenes.townCafe, photos.chokling, scenes.townRoads, scenes.townTravellers, scenes.townColour],
  flight: [
    clip("flight-prepare", "Paragliders' wings laid out on a launch meadow, pilots getting ready"),
    still(scenes.flightEdge, "The edge of a launch meadow, a windsock, and the valley falling away beyond it"),
    clip("flight-takeoff", "A paraglider's wing filling with air and lifting its pilot off the hill"),
    clip("flight-fly", "Flying under a paraglider canopy over steep green mountains"),
    still(photos.aerial, "Bir from the air: terraced fields, winding roads and scattered houses"),
    clip("flight-land", "Coming in low over green fields to land on the grass"),
  ],
  evening: [
    still(photos.sunset, "A paraglider silhouetted directly across the setting sun in Bir", "50% 55%"),
    still(scenes.eveMusic, "Friends around a campfire at night"),
    still(scenes.eveStrangers, "A row of friends silhouetted against a red sky"),
    still(scenes.eveNotforlong, "People watching the sunset together from a hill"),
  ],
  forest: [
    still(scenes.clouds, "A hiker on a ridge above a sea of cloud"),
    still(scenes.trees, "Low sun through a pine forest"),
  ],
  trek: [
    still(scenes.trekStart, "Trail kit laid out: boots, layers, bottles, a map"),
    still(scenes.trekAscend, "A hiker with a big pack on a narrow mountain trail"),
    still(scenes.trekDiscover, "A picnic spot at the edge of a forest above a wide valley"),
    still(scenes.trekArrive, "Someone standing on a summit above a sea of cloud"),
  ],
  home: [
    still(scenes.homeMorning, "Morning light through an old window"),
    still(scenes.homeCoffee, "Coffee on a copper tray"),
    still(scenes.homeBreakfast, "A breakfast table, pancakes and mugs"),
    still(scenes.homeViews, "Snow-dusted mountains over a green meadow"),
    still(scenes.homePhotos, "Someone photographing the view from a rocky ridge"),
    still(scenes.homePacking, "Backpacks piled in the back of a truck"),
    still(scenes.homeRoad, "A mountain road curving away"),
  ],
};

export const media: Record<
  | "hero"
  | "landing"
  | "day1"
  | "river"
  | "trail"
  | "goldenHour"
  | "bonfire"
  | "day2"
  | "flight"
  | "above"
  | "lookDown"
  | "social"
  | "socialNight"
  | "day3"
  | "day4"
  | "end"
  | "final"
  | "sunset"
  | "summit"
  | "lastNight"
  | "road",
  MediaSlot
> = {
  // The Bir still shows first and the flying clip fades in over it once it plays.
  hero: { video: footage.hero.file, webm: "/videos/bir/hero.webm", image: photos.hero.file, alt: "Flying a paraglider high above a valley, the canopy overhead and a field of cloud all around", focus: "88% 35%" },
  /** Where the hero's descent comes down — the valley from above, the first ground you see. */
  landing: { image: photos.barotValley.file, alt: "Barot seen from the hillside: the green reservoir, the village and pine-covered slopes", focus: "50% 60%" },
  day1: { image: photos.barotUhl.file, alt: "The Uhl valley above Barot, forested slopes running up towards Billing", focus: "50% 50%" },
  river: { image: photos.river.file, alt: "The Uhl river running over boulders at Barot, pine forest on the far bank", focus: "50% 60%" },
  trail: { image: photos.trail.file, alt: "Morning light through a forested gorge above a boulder-strewn stream near Barot", focus: "50% 50%" },
  goldenHour: { image: photos.goldenHour.file, alt: "Snow peaks lit pink and gold by the last of the sun above a dark valley", focus: "50% 45%" },
  bonfire: { video: footage.bonfire.file, webm: "/videos/bir/bonfire.webm", image: photos.bonfire.file, alt: "Flames rising off burning logs in the dark", focus: "50% 60%" },
  day2: { image: photos.flags.file, alt: "Prayer flags strung in front of snow-dusted Dhauladhar peaks above Bir", focus: "50% 60%" },
  flight: {},
  above: { video: footage.above.file, webm: "/videos/bir/above.webm", image: "/videos/bir/above-poster.jpg", alt: "Gliding past a towering cloud, the sun overhead and the valley far below", focus: "50% 50%" },
  lookDown: { image: photos.aerial.file, alt: "Bir from the air: terraced fields, winding roads and scattered houses", focus: "50% 50%" },
  social: { image: photos.sunsetGliding.file, alt: "Two paragliders silhouetted against a hazy orange sunset over Bir", focus: "50% 70%" },
  socialNight: { image: photos.campfire.file, alt: "Silhouettes around a campfire at dusk under a dark mountain", focus: "60% 70%" },
  sunset: { image: photos.sunset.file, alt: "A paraglider silhouetted directly across the setting sun in Bir", focus: "50% 55%" },
  summit: { image: photos.summit.file, alt: "Stone cairns on a ridgetop on the Hanuman Garh trek, snow peaks behind", focus: "50% 45%" },
  day3: still(scenes.day3, "Two trekkers on a trail climbing towards snow peaks", "50% 40%"),
  day4: still(scenes.day4, "A gravel road running through a high, empty valley towards the mountains", "50% 60%"),
  end: still(scenes.end, "A mountain lit gold at the last of the day", "50% 45%"),
  final: still(scenes.finalStars, "The Milky Way over a mountain road at night", "50% 40%"),
  lastNight: { video: footage.warmDrink.file, webm: "/videos/bir/warm-drink.webm", image: "/videos/bir/warm-drink-poster.jpg", alt: "Someone pouring a warm drink by a small fire at the water's edge, at dusk", focus: "50% 60%" },
  road: { image: photos.road.file, alt: "A winding mountain road between rock walls and pines, snow peaks ahead", focus: "50% 55%" },
};



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
      { caption: "the long table", tone: "#E8793A", image: photos.lastNight.file },
      { caption: "someone brought a guitar", tone: "#A95F38", image: photos.embers.file },
      { caption: "3 days ago we'd never met", tone: "#D9C7A6", image: photos.campfire.file },
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
    { word: "Bonfire.", tone: "#2A120A", ink: "#FFB36B", image: photos.bonfire.file },
    { word: "Bir.", tone: "#24527D", ink: "#F3EFE6", image: photos.monastery.file },
    { word: "Paragliding.", tone: "#24527D", ink: "#F3EFE6", image: photos.hero.file },
    { word: "Mountains.", tone: "#3B4A55", ink: "#EFE9DD", image: photos.flags.file },
    { word: "Trek.", tone: "#2E2119", ink: "#EFE9DD", image: photos.summit.file },
    { word: "Dinner.", tone: "#3A1A0E", ink: "#EFE9DD", image: photos.lastNight.file },
    { word: "People.", tone: "#3a2a1f", ink: "#EFE9DD", image: scenes.recapPeople.file },
    { word: "Road.", tone: "#3b464c", ink: "#F1E6D6", image: photos.roadAlt.file },
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
  label: "PHOTOGRAPHS & FOOTAGE",
  note: "The photographs of Bir, Billing and Barot were taken there. The fires, the golden hour, the road and the flying footage are from elsewhere in the mountains — chosen for the moment, not the map. Thank you to:",
} as const;

export const sticky = {
  label: "JOIN THE JOURNEY",
  href: "#apply",
  meta: "BIR × BAROT · NOV 2026",
  line: "twenty seats.",
} as const;
