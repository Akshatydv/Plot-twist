/**
 * EDC THAILAND — JOURNEY 02'S PAGE.
 *
 * Same contract as content/goa.ts: all copy lives here, components read it,
 * components never hold words.
 *
 * ─── THE ONE RULE, RESTATED ─────────────────────────────────────────────────
 * NOTHING IN HERE IS INVENTED. Two categories of fact exist below and they are
 * kept strictly apart:
 *
 *   1. THE FESTIVAL'S OWN FACTS — dates and city. VERIFIED, and sourced in
 *      `festival.source`. See the note on `festival` before changing them.
 *   2. PLOT TWIST'S OWN FACTS — trip length, price, hotel, inclusions,
 *      itinerary detail. NONE of these have been confirmed, so every one of
 *      them is modelled as explicitly unconfirmed and renders an honest
 *      "not announced yet" rather than a plausible-looking value.
 *
 * Flip the flags when the real values exist. Do not fill them in to make the
 * page look finished.
 *
 * ─── THIS PAGE IS A TEASER, NOT A SALES PAGE ────────────────────────────────
 * Decided 11 September 2026. Journey 02 is NOT open for applications and is
 * NOT taking bookings. The only thing a visitor can do is PRE-REGISTER — put
 * their name down so they hear first when it opens properly.
 *
 * Three consequences, and all three are load-bearing:
 *
 *   1. NO DETAILED ITINERARY. The day-by-day is not published. The page states
 *      the SHAPE of the trip (7D/6N, three of those nights are the festival)
 *      and says plainly that the rest lands later. Do not add a day-by-day
 *      board back until the trip is actually open.
 *   2. NO PRICE, NO INCLUSIONS. Both were already unconfirmed; now they are
 *      also deliberately out of scope. A teaser that quotes a number is not a
 *      teaser.
 *   3. EVERY CTA IS THE SAME ONE, AND IT IS NOT "APPLY". A pre-registration
 *      that looks like a booking form is the single easiest way to mislead
 *      someone here, so the button says what it does and the microcopy under
 *      it says what it is not.
 *
 * ─── THE AFFILIATION RULE ───────────────────────────────────────────────────
 * Plot Twist is NOT a partner, sponsor, organiser, reseller or affiliate of
 * EDC, EDC Thailand or Insomniac Events, and nothing on this page may imply
 * that it is. `disclaimer` below is MANDATORY copy — it renders at full
 * contrast inside THE PASS, not in a footnote. Do not remove it, and do not
 * add EDC logos, wordmarks, artwork or campaign designs to this page.
 * ────────────────────────────────────────────────────────────────────────────
 */

/* ------------------------------------------------------------------ */
/* section numbering                                                   */
/* ------------------------------------------------------------------ */

/**
 * THE RUNNING ORDER — the single source of the 01/02/03 beside each section
 * label, for exactly the reason GOA_SECTION_ORDER exists: hardcoding these is
 * how Goa ended up rendering two 03s.
 *
 * THE DROP is deliberately NOT in here. It carries no section label at all —
 * it is the one section that stops behaving like a page.
 */
export const EDC_SECTION_ORDER = [
  "premise",
  "shape",
  "lineup",
  "cast",
  "beyond",
  "plot",
  "pass",
  "preRegister",
] as const;

export type EdcSectionKey = (typeof EDC_SECTION_ORDER)[number];

export function edcIndex(key: EdcSectionKey): string {
  return String(EDC_SECTION_ORDER.indexOf(key) + 1).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/* the festival                                                        */
/* ------------------------------------------------------------------ */

/**
 * THE FESTIVAL'S FACTS.
 *
 * VERIFIED 11 SEPTEMBER 2026 against Insomniac's own press site and the
 * organiser's June 2026 lineup announcement: the December edition of EDC
 * Thailand runs **December 18–20, 2026** at **Rhythm Park, Laguna Phuket**.
 * It is the festival's third edition, a deliberate move off its previous
 * January timing, and the closing event of EDC's 30th-anniversary year.
 *
 * `ground` is the festival site itself. It is NOT the same claim as the
 * official-hotel partner resort named in the press release — that is a
 * different thing and is not stated anywhere on this page.
 *
 * These are EDC's dates, not Plot Twist's trip dates. The trip's own arrival
 * and departure days are unconfirmed and live in `trip` below. Do not derive
 * one from the other.
 */
export const festival = {
  name: "EDC THAILAND",
  /** ISO, local Phuket time (UTC+7). Drives the countdown. */
  gatesAt: "2026-12-18T16:00:00+07:00",
  dates: "18–20 DECEMBER 2026",
  datesShort: "DEC 18–20, 2026",
  venue: "PHUKET, THAILAND",
  /** The festival grounds, named in the organiser's lineup announcement. */
  ground: "RHYTHM PARK · LAGUNA PHUKET",
  /** Third edition, and the closing event of EDC's 30th-anniversary year. */
  edition: "THIRD EDITION · EDC'S 30TH-ANNIVERSARY FINALE",
  /** Rendered in the page's smallest type, beside the countdown. */
  coordinates: "7.8804° N, 98.3923° E",
  source: {
    label: "Dates: Insomniac press release",
    href: "https://press.insomniac.com/blog/insomniac-announces-hotel-edc-packages-for-the-december-edition-of-edc-thailand",
  },
} as const;

/**
 * THE HERO FOOTAGE.
 *
 * ─── WHAT PLAYS TODAY ───────────────────────────────────────────────────────
 * A LICENSED, SELF-HOSTED CLIP: /videos/thailand/festival-night.mp4, under the
 * Pexels License, which explicitly permits commercial use and hosting on your
 * own site and requires no attribution. Licence, source and the full
 * verification are recorded in public/videos/thailand/VIDEOS.md.
 *
 * Because it is our own file served from our own origin, the hero is a plain
 * muted <video>: first frame on paint, no third-party script, no player
 * chrome, no spinner, no pause affordance, nothing to boot. That is the only
 * way a background video is genuinely seamless.
 *
 * ─── IT IS NOT EDC FOOTAGE, AND THE PAGE MUST NEVER SAY IT IS ───────────────
 * This is generic night-festival footage. It was not shot at EDC Thailand and
 * it is not published by Insomniac. `pass.disclaimer` states that in plain
 * text at full contrast. Do not caption this clip with an EDC name, date or
 * stage name, and do not place it directly beside a line that would read as a
 * caption for it.
 *
 * ─── THE EDC EMBED, AND WHY IT IS PARKED ────────────────────────────────────
 * This was built the other way first and it worked: Insomniac's OFFICIAL "EDC
 * Thailand 2026 Trailer" (`videoId` below), played through YouTube's own
 * iframe player, unmodified. Channel and embeddability were verified against
 * YouTube's oEmbed endpoint — `author_name` "Insomniac", `author_url`
 * youtube.com/@Insomniac — and a candidate titled "EDC Thailand 2026 |
 * Aftermovie" was REJECTED on that same check because oEmbed reported its
 * channel as "DemoDrops EDM", a fan re-upload.
 *
 * That path is NOT deleted. Set `selfHosted` to null and the component falls
 * straight back to it, credit line and all. It was replaced for exactly one
 * reason: a cross-origin iframe player cannot be made seamless — it takes
 * seconds to boot and draws its own furniture, none of which can be styled
 * from outside the frame.
 *
 * DOWNLOADING THE EDC TRAILER WAS CONSIDERED AND REJECTED. "Publicly viewable
 * on YouTube" is not a licence to copy a work onto a commercial site.
 * Embedding plays the publisher's file from the publisher's servers through
 * the player they provide for it; self-hosting makes an unlicensed copy and
 * distributes it commercially.
 *
 * ─── THE RULES, EITHER WAY ──────────────────────────────────────────────────
 *   - Muted, always. No page on this site plays audio at a visitor.
 *   - No filter, blend mode or grade on the video element. The scrim is a
 *     separate sibling layer above it, never a modification of it.
 *   - Reduced motion gets the painted plate and no video at all.
 */
export const heroVideo = {
  provider: "youtube" as const,
  videoId: "c7ZgG8GvebM",
  title: "EDC Thailand 2026 Trailer",
  channel: "Insomniac",
  watchUrl: "https://www.youtube.com/watch?v=c7ZgG8GvebM",

  /**
   * ─── WHERE IT STARTS, AND WHY NOT AT 0:00 ─────────────────────────────────
   * The trailer opens on roughly thirty seconds of Thailand landscape —
   * limestone karsts, coastline, drone shots — before it reaches the festival.
   * That is the wrong first three seconds for this page: a visitor is supposed
   * to land on the event, not on a tourism reel, and "Thailand visuals first"
   * is precisely the impression this page exists to avoid.
   *
   * These timestamps were found by stepping through the actual video rather
   * than guessed. The window below is the trailer's loudest stretch — crowd,
   * confetti, hands up, stage light:
   *
   *     100s  confetti bursting over a packed crowd
   *     112s  crowd, hands up, in colour
   *     ~120s the run ends and the video returns to darker performer shots
   *
   * ─── THIS IS PLAYBACK, NOT EDITING ────────────────────────────────────────
   * `start` and `end` are YouTube's own documented player parameters. Nothing
   * is cut, re-encoded, re-ordered, graded or re-hosted; a portion of the
   * publisher's video is played, from the publisher's player, on the
   * publisher's servers. Anyone can reach the full video in one click through
   * the on-screen credit, which is why that credit is not optional.
   */
  startAt: 100,
  endAt: 120,

  /**
   * ─── THE SEAMLESS PATH ────────────────────────────────────────────────────
   * Set this to a path under /videos/ and the hero stops using YouTube
   * entirely: it renders a native muted <video> instead — no third-party
   * script, no player chrome, no buffering spinner, first frame on paint.
   * That is the only way to get a genuinely seamless background video, and
   * the component already supports it. Nothing else needs to change.
   *
   * IT IS NULL, AND IT HAS TO STAY NULL UNTIL THERE IS FOOTAGE WE MAY HOST.
   * Downloading Insomniac's trailer and serving it from plotwist.in is not the
   * same act as embedding it. Embedding plays the publisher's file from the
   * publisher's servers through the player they provide for that purpose;
   * self-hosting makes an unlicensed copy of a copyrighted work and
   * distributes it commercially. The first is how the web works. The second is
   * infringement, and no amount of "it's only the background" changes that.
   *
   * THREE WAYS TO FILL THIS LEGITIMATELY:
   *   1. Licensed stock. Night festival crowd/laser footage is widely
   *      available on commercial-licence terms. Not EDC-branded, but seamless
   *      and ours to host.
   *   2. Our own footage, once Journey 02 has actually run. This is the real
   *      answer, and it is worth more than any trailer.
   *   3. Written permission from Insomniac to host their asset. If that ever
   *      exists, keep the paperwork with this file.
   *
   * Until one of those exists, the YouTube embed stays — and the component
   * hides every part of the player that is not the picture. See HeroVideo.tsx.
   */
  selfHosted: "/videos/thailand/festival-night.mp4" as string | null,
  /**
   * No poster file, deliberately. The painted stage plate underneath the video
   * IS the poster: it is on-palette, it paints from CSS with no request at
   * all, and a 4.6 MB clip served from our own origin starts before a poster
   * image would finish downloading anyway.
   */
  selfHostedPoster: null as string | null,
  /**
   * ONLY RENDERED ON THE YOUTUBE FALLBACK PATH.
   *
   * The self-hosted clip needs no on-screen credit: the Pexels License
   * requires none, and captioning a stock clip on this hero would actively
   * mislead — it would read as "here is footage of EDC Thailand", which it is
   * not. The honest statement lives in `pass.disclaimer` instead, in words,
   * at full contrast.
   *
   * If `selfHosted` is ever cleared and the official trailer comes back, this
   * line comes back with it, because on THAT path attribution is not optional.
   */
  credit: "VIDEO: INSOMNIAC",
  /** Screen-reader description. The video is atmosphere; the copy carries meaning. */
  description:
    "Official trailer footage for EDC Thailand, showing the festival's night-time stages, crowds and lighting.",
} as const;

/* ------------------------------------------------------------------ */
/* the trip — Plot Twist's own, and mostly unconfirmed                 */
/* ------------------------------------------------------------------ */

/**
 * Stated once, reused everywhere, so the hero, the ticker, the pass and the
 * metadata can never drift apart.
 *
 * `days` is CONFIRMED at 7 days / 6 nights (site owner, 11 September 2026).
 * Three of those six nights are the festival itself; the other three are the
 * trip around it. That ratio is the whole argument this page makes, so it is
 * stated once here and derived everywhere else — never retyped.
 *
 * WHAT IS STILL NOT CONFIRMED is which calendar days the non-festival ones
 * fall on. The festival's own three dates are fixed and public (18–20 Dec);
 * whether the trip opens three days before them, closes three days after, or
 * splits either side has not been decided. See the note on `runOfShow`.
 */
export const TRIP = {
  destination: "THAILAND",
  city: "PHUKET",
  cast: "20 PEOPLE",
  split: "10 GIRLS + 10 GUYS",
  ages: "18–30",
  days: { confirmed: true, value: "7 DAYS · 6 NIGHTS" },
  /** The split that carries the argument: 3 nights of festival, 3 of Thailand. */
  nights: { festival: "3 NIGHTS", rest: "3 NIGHTS" },
} as const;

/** The one string every unconfirmed field renders. Said the same way everywhere. */
export const TBA = "TBA";

/* ------------------------------------------------------------------ */
/* 00 — the gate (hero)                                                */
/* ------------------------------------------------------------------ */

/**
 * THE HERO.
 *
 * ─── THE HEADLINE ───────────────────────────────────────────────────────────
 * Goa and Bali both open on the same fixed line: "You've found / the plot."
 * That sentence is the masthead of the brand, not hero copy, and it is the
 * single strongest continuity element between the destination pages.
 *
 * This page keeps the sentence and puts ONE word inside it:
 *
 *     You've found
 *     the EDC plot.
 *
 * That is the whole move. The brand line stays recognisable at a glance, and
 * the thing the trip is actually about is set INSIDE it — not appended to it,
 * not stated above it in small type. `line2` is split into three fields
 * because EDC is typeset differently from the words either side of it: the
 * "the" and the "plot." stay in Permanent Marker, and EDC is set in the
 * display face at a larger size with the page's brightest glow behind it. It
 * is the loudest three letters in the hero, which is the point.
 *
 * `secondary` then answers the h1 rather than decorating it: you've found the
 * EDC plot → NOW FIND THE MAINSTAGE. On Goa that slot holds an emotional hook;
 * here it turns the sentence above it into an instruction.
 *
 * Headline directions considered and rejected — kept here because the next
 * person to touch this will consider them again:
 *   "THAILAND. BUT MAKE IT EDC."  — spent meme format, ages the page.
 *   "EDC THAILAND AWAITS."        — brochure language. Plot Twist doesn't
 *                                   say "awaits".
 *   "THIS ISN'T A THAILAND TRIP." — defensive, and it dismisses Thailand,
 *                                   which BEYOND THE GATES then has to sell
 *                                   back two sections later.
 */
export const gate = {
  eyebrow: `${festival.name} · ${festival.datesShort}`,
  line1: "You've found",
  /** Three fields because EDC is typeset differently from the words around it. */
  line2: { pre: "the", brand: "EDC", post: "plot." },
  /** The floating handwritten note, pinned in open air over the footage. */
  sideNote: {
    headline: "daylight",
    lines: ["is", "optional"],
  },
  cta: { label: "GET ON THE LIST", href: "#pre-register" },
  /**
   * Doing two jobs at once. It is still the line that turns the headline into
   * an instruction — you have found the EDC plot, now find the mainstage — but
   * it lives in the scroll cue rather than in a display-size block over the
   * footage. Same idea, 10px of type instead of a paragraph.
   */
  scrollCue: "NOW FIND THE MAINSTAGE ↓",
} as const;

/** The LED ribbon under the hero. */
export const ribbonTop = [
  `${festival.name} · ${festival.datesShort}`,
  "THAILAND IS JUST WHERE IT HAPPENS",
  `${TRIP.days.value}`,
  "20 SEATS. NO FILLERS.",
  "10/10s ONLY",
  "DO IT FOR THE PLOT",
] as const;

/**
 * "APPLICATIONS ARE READ BY HUMANS" used to be the third item here. It was
 * inherited from the Goa ribbon and it went stale the moment this page became
 * a teaser: Journey 02 does not take applications, and the pre-registration
 * section two screens below says so twice, at full contrast.
 *
 * A marquee is easy to forget when the page's model changes. Anything added
 * here has to still be true of a page that is not selling anything.
 */
export const ribbonBottom = [
  "SEE YOU AFTER DARK",
  "THAILAND → EDC → PLOT TWIST",
  "THE LIST HEARS FIRST",
  "SLEEP? WE'LL DISCUSS THAT LATER",
] as const;

/* ------------------------------------------------------------------ */
/* 01 — the premise                                                    */
/* ------------------------------------------------------------------ */

/**
 * THE PREMISE — the page's one dense reading moment, and the only one.
 *
 * Deliberately type-only and image-free, exactly as Goa's premise is. It
 * kills the single real objection ("I could just buy a ticket myself") on the
 * spot rather than leaving it to fester for six more sections.
 */
export const premise = {
  index: edcIndex("premise"),
  label: "THE PREMISE",
  big: ["YOU COULD", "JUST BUY A TICKET.", "OR YOU COULD MAKE A PLOT OUT OF IT."],
  body: [
    "Anyone can buy a wristband. Anyone can book a room in Phuket.",
    "We bring the right people into the story.",
    "Ten girls. Ten guys. Every one of them picked.",
  ],
  kicker: "You can buy a wristband. You can't buy the nineteen people wearing the other ones.",
  annotation: "that's the whole idea.",
  badge: "20 WRISTBANDS. NO FILLERS.",
} as const;

/* ------------------------------------------------------------------ */
/* 02 — the shape                                                      */
/* ------------------------------------------------------------------ */

/**
 * THE SHAPE — what replaced the day-by-day board.
 *
 * ─── WHY THERE IS NO ITINERARY HERE ─────────────────────────────────────────
 * There was one: five cards on a set-time rail, arrival through after-hours.
 * It was cut on purpose when this page became a teaser (see the note at the
 * top of this file). Publishing a day-by-day does two things a teaser must
 * not do — it invites someone to evaluate a trip that is not on sale, and it
 * commits us in public to days that are not finalised.
 *
 * So the page states only what is genuinely known and genuinely fixed:
 *
 *     7 days · 6 nights
 *     3 of those nights are EDC (18–20 December — the organiser's own dates)
 *     3 are Thailand
 *
 * That is enough for someone to know whether they want in, which is the only
 * decision this page is asking for.
 *
 * DO NOT ADD DAYS BACK until the trip is open. The full board still exists in
 * git history if it is wanted then.
 */
export const shape = {
  index: edcIndex("shape"),
  label: "THE SHAPE",
  headline: ["SEVEN DAYS.", "SIX NIGHTS."],
  sub: "Three of those nights are EDC. The other three are Thailand.",
  annotation: "the rest lands later.",
  /** Three blocks, and nothing under them. */
  blocks: [
    {
      k: "3 NIGHTS",
      v: "EDC THAILAND",
      d: "18–20 December, Rhythm Park, Laguna Phuket. Six stages. The organiser's dates, and the reason the trip exists.",
      accent: "#FF2E7E",
    },
    {
      k: "3 NIGHTS",
      v: "THE ISLAND",
      d: "Water, longtails, night markets, and the last quiet day anyone gets before the gates open.",
      accent: "#FF7FA8",
    },
    {
      k: "20 PEOPLE",
      v: "ONE CREW",
      d: "Ten and ten, picked one at a time. That part does not change whatever the itinerary turns out to be.",
      accent: "#D6CFE6",
    },
  ],
  /** Renders at full contrast. The whole point of the section. */
  withheld: {
    stamp: "DAY-BY-DAY — NOT PUBLIC YET",
    line: "We're not publishing the itinerary while the trip is still being built. Pre-register and you'll get it before it goes anywhere else.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 03 — the drop                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE DROP — the emotional peak, and the section where the page stops
 * behaving like a website.
 *
 * Four announcement lines, then one handwritten aside at a fraction of the
 * size. THAT SCALE DROP IS THE ENTIRE SECTION: the loudest type on the site,
 * immediately followed by a person's handwriting. It is also the thing that
 * keeps this from being a generic EDM splash — no festival site closes its
 * biggest moment in Caveat.
 *
 * Carries no section label and no photograph on purpose. It needs neither,
 * which also makes it the one section that is finished today with no asset
 * dependency.
 */
export const drop = {
  lines: ["ELECTRIC.", "LOUD.", "UNREAL."],
  /** The fourth line, set apart — the festival's name is the payoff. */
  payoff: festival.name,
  /** The whole point. Small, handwritten, off-axis. */
  aside: "and you're going with the plot.",
  meta: `${festival.dates} · ${festival.venue}`,
  cta: { label: "COUNT ME IN", href: "#pre-register" },
} as const;

/* ------------------------------------------------------------------ */
/* 03b — the lineup                                                    */
/* ------------------------------------------------------------------ */

/**
 * THE LINEUP.
 *
 * ─── EVERY NAME BELOW IS PUBLISHED FACT ─────────────────────────────────────
 * VERIFIED 11 SEPTEMBER 2026 against the June 2026 lineup announcement for the
 * December edition: Insomniac Events and Future Vibes revealed a six-stage
 * bill across three nights at Rhythm Park, Laguna Phuket, with these seven
 * named as headliners. Nothing here is predicted, carried over from a previous
 * edition, or padded out with plausible names.
 *
 * THE RULE WHEN THIS CHANGES: a lineup is the organiser's to announce and the
 * organiser's to change. If a name comes off the bill, take it off here — do
 * not leave it up because it looked good on the page. `sourceNote` renders on
 * screen and says the bill is subject to change, because it is.
 *
 * ─── WHY ONLY SEVEN ─────────────────────────────────────────────────────────
 * The full bill runs to dozens of artists and is the festival's own page to
 * host, not ours. Seven headliners plus an honest "and dozens more" makes the
 * scale land without turning this into a directory — and it keeps the page's
 * attention on the trip instead of becoming a lineup mirror.
 *
 * ─── THE AFFILIATION RULE STILL APPLIES ─────────────────────────────────────
 * These are factual references to who is playing an event this trip is built
 * around. No artist and no festival is endorsing anything here. No artist
 * photography, no artist logos, no stage-brand artwork — names as type only.
 */
export const lineup = {
  index: edcIndex("lineup"),
  label: "THE LINEUP",
  headline: ["THE BILL", "IS ABSURD."],
  sub: "Seven headliners. Six stages. Three nights.",
  annotation: "and that's just the top of the poster.",
  headliners: [
    { name: "MARTIN GARRIX", tag: "MAINSTAGE" },
    { name: "TIËSTO", tag: "MAINSTAGE" },
    { name: "CHARLOTTE DE WITTE", tag: "TECHNO" },
    { name: "DJ SNAKE", tag: "MAINSTAGE" },
    { name: "DOM DOLLA", tag: "HOUSE" },
    { name: "ABOVE & BEYOND", tag: "TRANCE" },
    { name: "ANDY C", tag: "DRUM & BASS" },
  ],
  /** The organiser's own six stages, named as fact and set as plain type. */
  stages: ["kineticFIELD", "circuitGROUNDS", "neonGARDEN", "stereoBLOOM", "bionicJUNGLE", "BOOMBOX"],
  more: "GREEN VELVET B2B STEVE ANGELLO · SUBTRONICS · VINTAGE CULTURE · CAMELPHAT · JAMIE JONES · BOYS NOIZE · VTSS · LOCO DICE · ODD MOB · PAUL VAN DYK — AND DOZENS MORE",
  sourceNote:
    "Lineup and stages as announced by the organiser, and subject to their changes. The full bill lives on the festival's own site, not this one.",
  /** The line that hands the page back to Plot Twist. */
  pivot: "You can read a lineup anywhere. You can't pick who you're standing next to.",
} as const;

/* ------------------------------------------------------------------ */
/* 04 — the cast                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE CAST.
 *
 * The shared `WhatsATen` casting board, in `compact` mode — the same
 * component Goa and Bali run, deliberately NOT reinterpreted for this page.
 * It is the master Cast concept for every journey, it already renders on a
 * dark surface with sand type, and its stamp and photo scraps come from
 * journey02.ts through JourneyProvider.
 *
 * Its placement is the point: it lands immediately after THE DROP, so the
 * loudest moment on the page is followed by twenty faces. Festival → people,
 * in one scroll. That order is the argument the whole page is making.
 */
export const cast = {
  bridge: [
    "20 PEOPLE. ONE CREW. ONE FESTIVAL.",
    "The lineup gets announced. The cast gets picked.",
  ] as [string, string],
  composition: {
    title: "10 AND 10.",
    body: "We're looking for the ones who are always up for one more set, one more plan, one more story.",
    disclaimer: "Basically, good vibes only.",
    extra: ["And yes, 10/10s only.", "Not the looks kind. The energy kind."],
  },
} as const;

/* ------------------------------------------------------------------ */
/* 05 — beyond the gates                                               */
/* ------------------------------------------------------------------ */

/**
 * THE ONE BRIGHT SCREEN.
 *
 * Six consecutive black sections would flatten into one long section and the
 * peak at THE DROP would stop reading as a peak. This is the exhale — and the
 * only place Thailand-the-country gets to be beautiful without competing with
 * the festival for attention.
 *
 * ─── THE PHOTOGRAPHY ────────────────────────────────────────────────────────
 * All four slots carry licensed photographs (Pexels License — commercial use
 * and self-hosting permitted, no attribution required). Per-file provenance,
 * the licence check and the photographers are recorded in
 * public/photos/thailand/PHOTOS.md.
 *
 * `LightPlate` still renders its designed plate for any slot set back to null,
 * so the section cannot break while a photograph is being swapped.
 *
 * ─── ALT TEXT DESCRIBES THE FRAME, NOT THE TRIP ─────────────────────────────
 * These are mood photographs, not documentation of a trip that has not
 * happened yet. So no alt line below claims a city, a venue, or that this is
 * where the cast will be — two of the four were not even shot in Thailand.
 * `pass.disclaimer` says the same thing in words, at full contrast, where a
 * visitor reads for facts.
 */
export type Frame = {
  id: string;
  src: string | null;
  alt: string;
  caption: string;
  /** Burned-in disposable-camera timestamp. Decorative; never a real date claim. */
  stamp: string;
  note?: string;
  aspect: string;
};

export const beyond = {
  index: edcIndex("beyond"),
  label: "BEYOND THE GATES",
  headline: ["THE FESTIVAL IS THE REASON.", "IT ISN'T THE WHOLE STORY."],
  sub: "One of the days is EDC. The others are why people book the next one.",
  annotation: "sunlight, briefly.",
  frames: [
    {
      id: "water",
      src: "/photos/thailand/water.jpg",
      alt: "A wooden longtail boat on clear emerald water beneath a limestone cliff",
      caption: "THE WATER",
      stamp: "12:40",
      note: "worth the boat.",
      aspect: "4 / 5",
    },
    {
      id: "streets",
      src: "/photos/thailand/streets.jpg",
      alt: "A night market seen from above, hundreds of lit stall canopies in dense rows",
      caption: "THE STREETS",
      stamp: "21:05",
      aspect: "1 / 1",
    },
    {
      id: "food",
      src: "/photos/thailand/food.jpg",
      alt: "A street vendor grilling skewers over a burst of open flame after dark",
      caption: "THE FOOD",
      stamp: "23:18",
      note: "order the thing you can't pronounce.",
      aspect: "4 / 3",
    },
    {
      id: "recovery",
      src: "/photos/thailand/recovery.jpg",
      alt: "An empty poolside under palms in bright morning light, loungers still folded",
      caption: "THE RECOVERY",
      stamp: "11:52",
      aspect: "3 / 2",
    },
  ] as Frame[],
} as const;

/* ------------------------------------------------------------------ */
/* 06 — the plot                                                       */
/* ------------------------------------------------------------------ */

/**
 * WHY PLOT TWIST — as four credential panels.
 *
 * Written against a hard constraint from the brief: never corporate. No
 * "premium packages", no "personalised service", no "seamless experience".
 * Every panel is a statement about people or about what is deliberately not
 * planned. Nothing below claims a service level that isn't already true
 * elsewhere on the site.
 */
export const plot = {
  index: edcIndex("plot"),
  label: "THE PLOT",
  headline: ["YOU'RE NOT", "JOINING A TOUR."],
  sub: "You're joining a crew that happens to be going to a festival.",
  annotation: "big difference.",
  panels: [
    {
      k: "THE CAST",
      v: "Twenty people, picked one at a time. A real person reads every application — that's also why it isn't instant.",
      accent: "#FF2E7E",
    },
    {
      k: "ONE CHAPTER OF FOUR",
      v: "EDC is the centre of the trip. It isn't the whole trip, and a page that pretended otherwise would be selling you a ticket you can buy yourself.",
      accent: "#FF7FA8",
    },
    {
      k: "HOSTS, NOT GUIDES",
      v: "Plot Twist hosts are in the crowd with you, not holding a flag outside it.",
      accent: "#D6CFE6",
    },
    {
      k: "ROOM FOR THE UNPLANNED",
      v: "Some of it is scheduled. The parts everyone talks about afterwards usually aren't.",
      accent: "#FFF1DC",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 07 — the pass                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE PRICE.
 *
 * `confirmed: false`. Goa's price is public because it ran on Journey 00's
 * performance creative; nothing equivalent exists for this trip, and EDC
 * Thailand ticket tiers are not Plot Twist's to quote. So this renders "NOT
 * ANNOUNCED YET" with a way to ask, exactly as Goa's did before its number
 * was confirmed. Flip the flag; change nothing else.
 */
export const price = {
  confirmed: false,
  amount: "",
  note: "",
  pending: "NOT ANNOUNCED YET",
  /*
    Deliberately NOT "ask us for the number". While this page is a teaser
    there is no number to ask for, and inviting the question would generate a
    conversation we cannot finish. It says when instead of what.
  */
  pendingNote: "Pre-register and you'll hear it first.",
} as const;

/**
 * INCLUSIONS / EXCLUSIONS.
 *
 * `confirmed: false`. Nothing about what this trip covers has been decided —
 * critically, WHETHER THE EDC TICKET ITSELF IS INCLUDED is not settled, and
 * that is the single most consequential thing a visitor would assume. It is
 * therefore called out by name in the pending copy rather than left to
 * inference.
 */
export const inclusions = {
  confirmed: false,
  included: [] as string[],
  excluded: [] as string[],
  pending:
    "Nothing is on sale yet, so there is no included / not-included list to publish — including whether the festival ticket is part of it. Pre-registering costs nothing and commits you to nothing.",
} as const;

export const pass = {
  index: edcIndex("pass"),
  label: "THE PASS",
  headline: ["WHAT WE CAN", "TELL YOU YET."],
  annotation: "more of this soon.",
  /** The credential header — deliberately reads as machine print. */
  credential: {
    holder: "BEARER",
    holderValue: "ONE OF TWENTY",
    gate: "GATE",
    gateValue: "APPLICATION",
    serial: "PT-J02",
  },
  basics: [
    { k: "THE FESTIVAL", v: festival.name },
    { k: "FESTIVAL DATES", v: festival.dates },
    { k: "WHERE", v: festival.venue },
    { k: "TRIP LENGTH", v: TRIP.days.value },
    { k: "THE CAST", v: TRIP.cast },
    { k: "AGES", v: TRIP.ages },
  ],
  selection: { k: "SELECTION", v: "Curated. Every application is read by a real person." },
  stamp: "EVERY APPLICATION READ BY A HUMAN",
  cta: "ASK US ANYTHING →",
  /** Prefilled into WhatsApp. */
  whatsappText: "Hey Plot Twist 👀 put me on the list for the EDC Thailand plot",
  /**
   * MANDATORY. Renders at full contrast, in the plainest section on the page.
   * See the affiliation rule at the top of this file.
   */
  disclaimer:
    "Plot Twist is an independent travel experience built around EDC Thailand. We are not a partner, sponsor, organiser, reseller or affiliate of EDC, EDC Thailand or Insomniac Events, and this page is not endorsed by them. Video and photography on this page is licensed stock — it was not shot at EDC Thailand, it is not the organiser's, and it does not show the actual venues, stays or travellers on this trip. Festival dates and lineup are the organiser's and are subject to their announcements. All EDC and Insomniac names and marks belong to their owners.",
  price,
  inclusions,
} as const;

/* ------------------------------------------------------------------ */
/* 08 — gates open in                                                  */
/* ------------------------------------------------------------------ */

/**
 * THE FINAL BEAT.
 *
 * The countdown runs to `festival.gatesAt`, which is a REAL, sourced date —
 * so it is a real countdown, not a manufactured urgency device. If that date
 * is ever unset, the component falls back to a live Phuket clock and a
 * "GATES — TBA" state rather than counting down to nothing.
 *
 * The emotion here is deliberately not excitement. Excitement makes people
 * bookmark a page; the possibility of being left out makes them act. So the
 * copy directly above the button is about the twenty seats and the fact that
 * a person decides — the festival has already done its job by this point.
 */
export const gatesOpen = {
  eyebrow: "GATES OPEN IN",
  big: ["THE LINEUP GETS ANNOUNCED.", "THE CAST GETS PICKED."],
  body: "One of those two things you can watch from home.",
  seats: "TWENTY WRISTBANDS. YOU WANT ONE.",
  cta: { label: "GET ON THE LIST", href: "#pre-register" },
  note: "see you after dark.",
  /** Shown while the countdown has no target. */
  tbaLabel: "GATES — TBA",
  clockLabel: "PHUKET, LOCAL TIME",
} as const;

/* ------------------------------------------------------------------ */
/* 08 — pre-registration                                               */
/* ------------------------------------------------------------------ */

/**
 * PRE-REGISTRATION — the only thing this page asks anyone to do.
 *
 * ─── WHAT IT IS NOT ─────────────────────────────────────────────────────────
 * Not an application. Not a booking. Not a deposit. Not a waitlist with a
 * position on it. The single biggest risk on this page is that someone fills
 * this in believing they have a seat, so the copy says what it is not, twice:
 * once in `sub`, once in `reassure`, both at full contrast and neither in a
 * footnote.
 *
 * ─── WHY IT ASKS SO LITTLE ──────────────────────────────────────────────────
 * Five short fields, no essay questions. Journey 00's application asks three
 * written questions because it is CASTING — a real person reads the answers
 * and picks twenty people. Nobody is being cast yet, so asking someone to
 * write about themselves for a trip that isn't open would be taking their
 * effort under false pretences.
 *
 * ─── WHERE IT GOES ──────────────────────────────────────────────────────────
 * The same /api/applications endpoint and the same table as every other
 * journey, tagged JOURNEY 02 — one store, one admin, no second system to keep
 * in sync. That endpoint requires three answers, so it is sent `marker`
 * below rather than three invented sentences: it is plainly a system note in
 * the admin, not words put in an applicant's mouth. If pre-registration
 * becomes a permanent fixture, the right fix is a nullable answers column,
 * not a better-sounding placeholder.
 */
export const preRegister = {
  index: edcIndex("preRegister"),
  label: "PRE-REGISTRATION",
  headline: ["GET ON", "THE LIST."],
  sub: "This isn't a booking, and it isn't an application. It's your name, on a list, so you hear first.",
  reassure: [
    "Nothing to pay. Nothing to commit to.",
    "When the twenty seats open, this list gets told before the internet does.",
  ],
  fields: {
    name: { label: "NAME", placeholder: "what people call you" },
    instagram: { label: "INSTAGRAM", placeholder: "@yourhandle" },
    mobile: { label: "MOBILE", placeholder: "we message, we don't spam" },
    city: { label: "CITY", placeholder: "where you're flying from" },
    age: { label: "AGE", placeholder: "18–30" },
  },
  submit: "PUT ME ON THE LIST",
  submitting: "ADDING YOU…",
  note: "no payment. no commitment. no spam.",
  success: {
    stamp: "YOU'RE ON THE LIST",
    line: "That's it. You'll hear from us before anyone else does.",
    note: "see you after dark.",
  },
  error: "That didn't send. Try again, or message us — the tea cup's bottom right.",
  /** See the note above: a system marker, never a fabricated answer. */
  marker: "[PRE-REGISTRATION — no questions asked at this stage]",
} as const;

/**
 * THE STICKERS — the words on the toy layer.
 *
 * Every one of these is a joke, and none of them carries information that
 * isn't said properly somewhere else on the page. That is the test for adding
 * one: if a sticker is the only place a fact appears, it is not a sticker, it
 * is a fact hiding in a toy.
 *
 * They are `aria-hidden` in the component for the same reason — a screen
 * reader gets nothing from a list of loose punchlines.
 *
 * Keep the total low. Six across a page this long is roughly one every screen
 * and a half, which reads as "someone's been sticking things on this" rather
 * than as a decorated surface. Fifteen would read as clutter and would break
 * the one rule that matters: never over running text.
 */
export const stickers = {
  hero: "NO SLEEP TILL PHUKET",
  premise: "10/10s ONLY",
  runOfShow: "DAY 04 = BLUR",
  lineup: "BPM: YES",
  beyond: "SPF, ALLEGEDLY",
  plot: "MAIN CHARACTER ENERGY",
  gates: "SEE YOU AFTER DARK",
} as const;

/** The mobile sticky bar. One action, same as every other CTA on the page. */
export const stickyCta = {
  label: "GET ON THE LIST",
  href: "#pre-register",
  meta: festival.datesShort,
} as const;
