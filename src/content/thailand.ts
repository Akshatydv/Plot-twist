/**
 * EDC THAILAND — JOURNEY 3'S PAGE.
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
 *   2. PLOT TWIST'S OWN FACTS. Confirmed so far: the trip dates (15–21 Dec
 *      2026) and its length (7D/6N). Still unconfirmed and therefore still
 *      rendering an honest "not announced yet": the price, the inclusions,
 *      the stay, and the day-by-day itinerary.
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
  "faq",
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
 * These are EDC's dates, not Plot Twist's trip dates — the trip runs 15–21
 * December and lives in `TRIP.dates` below. The festival's three nights sit
 * inside that window; the two sets are related but neither is derived from the
 * other, so edit them independently and re-check that they still agree.
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
 * /videos/thailand/edc-hero.mp4 — a 24-second silent loop cut from Insomniac's
 * official "EDC Thailand 2026 Trailer", self-hosted.
 *
 * Because it is served from our own origin, the hero is a plain muted <video>:
 * first frame on paint, no third-party script, no player chrome, no spinner,
 * no pause affordance, nothing to boot.
 *
 * ─── READ THIS BEFORE YOU TOUCH IT ──────────────────────────────────────────
 * THIS FILE IS NOT LICENSED TO US. It is a copy of a copyrighted work
 * published by Insomniac, hosted on a commercial site. That is the position,
 * stated plainly so nobody later assumes it was cleared:
 *
 *   - The site owner obtained the source and directed this use on
 *     11 September 2026, after the risk was raised and explained.
 *   - "Publicly viewable on YouTube" is not a licence to copy. Embedding plays
 *     the publisher's file from the publisher's servers through the player
 *     they provide for it; this does not.
 *   - The realistic consequence is a takedown, and potentially more.
 *
 * TWO SAFE EXITS ARE KEPT READY, and both are one field:
 *   1. Point `selfHosted` at "/videos/thailand/festival-night.mp4" — the
 *      licensed Pexels clip, still in the repo, still documented in VIDEOS.md.
 *   2. Set `selfHosted` to null — the component falls straight back to the
 *      OFFICIAL YouTube embed of the same trailer, credit line and all, which
 *      is the lawful way to show this footage.
 *
 * ─── THE EMBED THAT IS BEING BYPASSED ───────────────────────────────────────
 * `videoId` below is the same trailer, and it was verified official before it
 * ever shipped: YouTube's oEmbed endpoint reported `author_name` "Insomniac",
 * `author_url` youtube.com/@Insomniac. A candidate titled "EDC Thailand 2026 |
 * Aftermovie" was REJECTED on that same check because oEmbed reported its
 * channel as "DemoDrops EDM", a fan re-upload. That verification still stands
 * and the embed path still works.
 *
 * ─── WHAT THE PAGE MUST STILL NOT CLAIM ─────────────────────────────────────
 * Playing the organiser's trailer does not make us the organiser. Nothing may
 * imply partnership, sponsorship or endorsement — `pass.disclaimer` carries
 * that, and it is mandatory copy.
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
  selfHosted: "/videos/thailand/edc-hero.mp4" as string | null,
  /**
   * A real first frame this time. The previous clip was flat enough that the
   * painted plate underneath was a good enough poster; this footage opens on a
   * lit stage and a ferris wheel, and a CSS gradient standing in for that for
   * even 200ms reads as the video failing rather than loading.
   */
  selfHostedPoster: "/videos/thailand/edc-hero-poster.jpg" as string | null,
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
  /**
   * THE GROUP. Moved from twenty to a maximum of sixteen by the site owner,
   * 2 Oct 2026, and the gender split is REMOVED rather than halved — a split
   * the trip might not hold to is worse than no split at all.
   *
   * `castNote` is mandatory wherever the number is set large. Sixteen is a
   * ceiling and an intention, not a promise.
   */
  cast: "16 PEOPLE",
  castNote: "*The final group size can vary and is not guaranteed.",
  ages: "18–30",
  days: { confirmed: true, value: "7 DAYS · 6 NIGHTS" },
  /**
   * THE TRIP'S OWN DATES. Confirmed by the site owner, 11 September 2026.
   *
   * ─── THEY AGREE WITH EVERYTHING ELSE, AND THAT WAS CHECKED ────────────────
   * 15–21 December is seven days and six nights, which is what `days` already
   * said. The six nights are 15–20; the 21st is a departure day and has no
   * night. The festival's own three nights — 18, 19 and 20 December — are the
   * LAST three, which leaves 15, 16 and 17 as the other three. So the
   * "3 nights EDC / 3 nights the island" split in `shape` is not a rounding:
   * it is exactly what these dates produce.
   *
   * ─── WHY THIS IS BETTER THAN THE 16–22 IT REPLACES ────────────────────────
   * Under 16–22 the three non-festival nights were 16, 17 and 21 — a split
   * run, with one stranded night AFTER the festival. Under 15–21 they are
   * consecutive and they all sit BEFORE it, so the trip has an actual shape:
   * three nights of Thailand building to three nights of EDC, then you fly
   * home. The page's whole escalation depends on that being true.
   *
   * If any of these four values is ever edited, re-check the other three. The
   * whole page's arithmetic rests on them lining up.
   */
  dates: { confirmed: true, value: "15–21 DECEMBER 2026", short: "DEC 15–21" },
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
  /**
   * One extra line in a hero that was deliberately cut to four elements —
   * justified because "when do I actually fly" is a top-tier question on a
   * travel page and the eyebrow above it answers a different one (when the
   * FESTIVAL is). It renders at metadata size, not display size, so it costs
   * the footage almost nothing.
   */
  tripDates: `THE TRIP · ${TRIP.dates.value}`,
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
  `TRIP · ${TRIP.dates.value}`,
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
/* 00b — the crossing                                                  */
/* ------------------------------------------------------------------ */

/**
 * THE CROSSING — the moment you walk through the gate.
 *
 * ─── WHAT IT IS ─────────────────────────────────────────────────────────────
 * A scroll-driven beat between the hero and the rest of the page. Two gate
 * panels part as you scroll, light floods the gap, a wristband scans, and you
 * come out the other side. It is the only section on the site that is
 * controlled by scroll POSITION rather than triggered when it enters view.
 *
 * ─── WHY IT EARNS A WHOLE SCREEN ────────────────────────────────────────────
 * The page's entire metaphor is a credential — the hero is called THE GATE,
 * the facts are THE PASS, the slates are gate slates. Until now the page said
 * that; it never made you DO it. Scrolling through a set of opening gates is
 * the one interaction that turns the metaphor into an experience, and it costs
 * the visitor nothing: they were going to scroll anyway.
 *
 * ─── THE COPY IS FOUR WORDS AND A SIGN ──────────────────────────────────────
 * Everything here has to read in the half-second it is on screen while moving.
 * That means gate signage, not sentences: a gate letter, a scan state, a
 * payoff. Anything longer would be unreadable and would turn a moment into a
 * section.
 */
export const crossing = {
  /**
   * ─── WHY THIS IS NOT "GATE A / SCAN TO ENTER" ANY MORE ────────────────────
   * It used to be, because the section used to have a wristband reader in the
   * middle of it that stepped through WAITING → READING → ACCESS GRANTED. That
   * reader was removed — it sat on top of the owl's face and read as an
   * unexplained badge — and the moment it went, the scan copy was describing a
   * mechanic that no longer existed. "SCAN TO ENTER" with nothing to scan is
   * just a sentence.
   *
   * So the board is what it should have been: VENUE SIGNAGE. The kind bolted
   * over an entrance telling you where you are and whether the gates are open.
   * It says where you are going and it counts the gates open as you scroll,
   * which is a thing the section is actually doing.
   */
  sign: "NOW ENTERING",
  /** Stepped through as the halves part. Sign states, not puzzle states. */
  states: {
    approach: `${festival.name} · ${TRIP.city}`,
    opening: "GATES OPENING",
    open: "● GATES OPEN",
  },
  /**
   * THE BANNER — strung across the entrance, unfurling as you come through.
   *
   * It exists because the top of the frame was empty once the gates parted:
   * the sign board had cleared and the payoff sits low, leaving a screen's
   * worth of bare gradient overhead. A banner is what is actually strung above
   * a festival entrance, so it fills the space with the right object rather
   * than with decoration.
   *
   * The line is the hero's old tagline. It was cut from the first screen when
   * that got stripped back to four elements, and it was too good to lose —
   * this is the right place for it, because it is the first thing you read
   * once you are inside rather than the fifth thing you read before you are.
   */
  banner: "GOOD PEOPLE · LOUD MUSIC · QUESTIONABLE DECISIONS",

  /** The payoff, once you are through. The largest type in the section. */
  payoff: "YOU'RE IN.",
  /** Handwritten, small, after the payoff. */
  aside: "no turning back now.",
  meta: `${festival.ground} · ${festival.dates}`,
} as const;

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
  /** Now that the window is confirmed, the section leads with it. */
  dateline: TRIP.dates.value,
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
      d: "15–17 December. Krabi, Railay, Phi Phi and Maya Bay — water, longtails and night markets, and the last quiet day anyone gets before the gates open.",
      accent: "#FF7FA8",
    },
    {
      k: "16 PEOPLE",
      v: "ONE CREW",
      d: "Ten and ten, picked one at a time. That part does not change whatever the itinerary turns out to be.",
      accent: "#D6CFE6",
    },
  ],
  /** Renders at full contrast. The whole point of the section. */
  /**
   * This block used to read "DAY-BY-DAY — NOT PUBLIC YET". The day-by-day is
   * now published (see `week` below), so the stamp had to change or the page
   * would be withholding something a visitor can read two sections later.
   *
   * It was not deleted, because the slot is doing structural work: it is the
   * hand-off from the summary into the week itself. It now points DOWN the
   * page instead of pointing at a form.
   */
  withheld: {
    stamp: "THE FULL WEEK — PUBLISHED BELOW",
    line: "Seven days, start to finish, is further down this page. Nothing is hidden behind the form — the form is only how you get a seat when sixteen of them open.",
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
 * journey3.ts through JourneyProvider.
 *
 * Its placement is the point: it lands immediately after THE DROP, so the
 * loudest moment on the page is followed by sixteen faces. Festival → people,
 * in one scroll. That order is the argument the whole page is making.
 */
export const cast = {
  bridge: [
    "16 PEOPLE. ONE CREW. ONE FESTIVAL.",
    "The lineup gets announced. The cast gets picked.",
  ] as [string, string],
  composition: {
    title: "10 AND 10.",
    body: "We're looking for the ones who are always up for one more set, one more plan, one more story.",
    disclaimer: "Basically, good vibes only.",
    /* The "10 and 10" split is gone with the move to a maximum of sixteen, so
       the 10/10s line goes with it — it only ever worked as a pun on the split.
       The ceiling is stated instead, because sixteen is an intention and not a
       promise, and a page that implies otherwise writes a cheque the trip has
       to cash. */
    extra: ["Sixteen of you. That is the whole point.", "*The final group size can vary and is not guaranteed."],
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
      v: "Maximum sixteen, picked one at a time. A real person reads every application — that's also why it isn't instant.",
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
/* the week — seven chapters                                           */
/* ------------------------------------------------------------------ */

/**
 * THE WEEK. Confirmed itinerary, published by the site owner 27 September 2026.
 *
 * ─── THIS IS NOT A DAY-BY-DAY TABLE, AND THE DATA SHAPE ENFORCES THAT ───────
 * There is no `activities: string[]` on these objects, because the moment one
 * exists somebody renders it as bullets and the section becomes the itinerary
 * grid this page spent its whole design avoiding. Each chapter gets ONE
 * paragraph of prose and one `beat` — a single short line that lands alone.
 * If a day needs bullets to be understood, the prose is wrong.
 *
 * ─── THE SPLIT IS THE STRUCTURE ─────────────────────────────────────────────
 * Chapters 01–03 render BEFORE THE DROP. Chapters 04–07 render after it. That
 * is not a layout convenience: THE DROP is this page's "and then…", and the
 * three festival nights have to arrive on the far side of it, or the page
 * reveals its own climax inside an itinerary list three sections early.
 * `phase` carries the split so both mounts come from one array — see
 * components/edc/TheWeek.tsx.
 *
 * ─── EVERY CHAPTER IS A FULL-BLEED PHOTOGRAPH ───────────────────────────────
 * The first build of this section had no photography at all: seven gradient
 * surfaces with type laid on them. It was defensible on page-weight grounds
 * and it was wrong. The Goa page — the benchmark this whole page is measured
 * against — works because THE BACKGROUND IS THE SECTION: you are put inside
 * each day rather than shown a caption describing it. Seven gradients cannot
 * do that, and the days all felt like the same day in different tints.
 *
 * So each chapter now carries a `scene`, exactly as Goa's chapters do: a
 * photograph, two focal points (one for phones), a scrim tuned so it is
 * darkest where that chapter's copy actually sits, and alt text.
 *
 * ─── `wash` IS THE TROPICAL-TO-ELECTRIC ARC ─────────────────────────────────
 * The stock photographs arrive in seven unrelated colour worlds — green
 * lasers, orange pyro, turquoise sea. Left alone they would look like seven
 * stock photographs, which is the single easiest way to look cheap.
 *
 * `wash` is how far each frame is pulled into the page's violet: 0 keeps the
 * photograph as shot, 1 takes it fully into the palette. It runs 0 → 0.12 →
 * 0.5 → 0.86 → 0.92 → 0.9 → 0, which is the arc stated as a number. Krabi and
 * Phi Phi stay tropical because they ARE tropical; day 03 is half-washed
 * because it is the hinge; the three nights are almost entirely the page's own
 * violet and magenta; and the morning after drops back to zero, because the
 * point of that chapter is that the colour comes back.
 *
 * It is applied as greyscale plus a multiply ramp rather than a hue rotation —
 * forcing a hue onto blown stage lamps clips them yellow-green, which is a
 * lesson this project has already paid for once. See components/edc/DayScene.tsx.
 *
 * ─── ACCURACY NOTES, LEFT HERE ON PURPOSE ───────────────────────────────────
 * MAYA BAY: chapter 02 names it and does NOT say anyone swims in it. Maya Bay
 * reopened under restrictions and the swimming in that bay is not the
 * free-for-all the photographs imply, so the swimming is attributed to "the
 * stops nobody photographs" instead — true, and it still sells the day. If the
 * ground operator confirms otherwise this can be loosened. It must not be
 * tightened in the other direction by guesswork.
 *
 * NO HOTEL IS NAMED. "4-star" is confirmed; which properties is not. A named
 * hotel here would be the one invented fact on an otherwise sourced page.
 *
 * NO ARRIVAL OR DEPARTURE TIMES. Flights are not included in the trip, so
 * every traveller's day 01 and day 07 start at a different hour.
 */
export const week = {
  label: "THE WEEK",
  /**
   * NOT "SEVEN DAYS. SEVEN WORLDS.", which is what this said first. THE SHAPE
   * sits directly above and its headline is "SEVEN DAYS. SIX NIGHTS." — two
   * consecutive h2s opening on the same two words read as a copy-paste error
   * rather than as a motif. Only the second line was worth keeping.
   */
  headline: ["ONE WEEK.", "SEVEN WORLDS."],
  sub: "Every day on this trip is a different film. Here is all of it.",
  annotation: "no bullet points. sorry.",
  /** Rendered above chapter 04, on the far side of THE DROP. */
  nightsIntro: {
    stamp: "AND THEN — THREE NIGHTS",
    line: "Three days of Thailand were the setup. This is the thing they were setting up.",
  },
  chapters: [
    {
      id: "arrival",
      phase: "before",
      n: "01",
      date: "15 DECEMBER",
      kicker: "THE PLOT TWIST BEGINS",
      title: "LAND IN PHUKET. HEAD FOR KRABI.",
      body:
        "You land in Phuket and you do not stay there. The crew is waiting with premium group transfers — no taxis, no luggage to drag, no logistics. Straight to Krabi, into the hotel, then back out for Railay and Ao Nang: limestone standing in turquoise water, and the first Thai sunset of the week. Then the first night, which is the one that turns a group into a crew.",
      beat: "By tomorrow this stops being strangers.",
      where: "PHUKET → KRABI · STAY: KRABI",
      accent: "#FFC9A8",
      scene: {
        poster: "/photos/thailand/days/day-01.jpg",
        alt: "A limestone sea stack off a Krabi beach at low sun, one wooden longtail boat moored in shallow green water",
        focal: "50% 46%",
        focalMobile: "44% 42%",
        /* Content sits bottom-left, so the scrim is weighted there and the sky
           is left almost untouched — this is the last frame on the page that
           gets to look like daylight. */
        scrim:
          "linear-gradient(160deg, rgba(10,4,20,0.10) 0%, rgba(10,4,20,0.18) 42%, rgba(10,4,20,0.78) 78%, rgba(6,2,12,0.95) 100%)",
        /* 0 = the photograph as shot. 1 = fully in the page's violet.
           This is the tropical-to-electric arc; see the note above. */
        wash: 0,
      },
    },
    {
      id: "islands",
      phase: "before",
      n: "02",
      date: "16 DECEMBER",
      kicker: "PHI PHI, BUT MAKE IT A DAY",
      title: "THE WATER IS THE POINT.",
      body:
        "Breakfast, then out onto the Andaman for the biggest day of the first half. Phi Phi, the hidden bays, and Maya Bay — the one you have already seen a hundred times and will still look at properly. Swimming, snorkelling, island hopping. Not a sightseeing run on a schedule: music on the boat, cold drinks, and your own corner of it. Back to Krabi around sunset, then Ao Nang at an easy pace.",
      beat: "Island hopping, but make it chaotic.",
      where: "PHI PHI · MAYA BAY · STAY: KRABI",
      accent: "#9FE8DA",
      scene: {
        poster: "/photos/thailand/days/day-02.jpg",
        alt: "An aerial view of the Phi Phi islands: limestone cliffs, dense green, and turquoise water with small boats",
        focal: "50% 52%",
        focalMobile: "56% 50%",
        scrim:
          "linear-gradient(180deg, rgba(8,3,18,0.44) 0%, rgba(8,3,18,0.12) 34%, rgba(8,3,18,0.62) 74%, rgba(6,2,12,0.94) 100%)",
        wash: 0.12,
      },
    },
    {
      id: "loading",
      phase: "before",
      n: "03",
      date: "17 DECEMBER",
      kicker: "THE CALM BEFORE THE STORM",
      title: "NO FESTIVAL ALARMS TODAY.",
      body:
        "A whole day for Krabi, and deliberately not a checklist. Emerald Pool and the jungle around it, beaches, viewpoints, Ao Nang, Railay — as much or as little as the day wants. Explore, swim, eat, shoot, sit down, repeat. There is breathing room in this day on purpose, because of what the next one turns into. One last Krabi sunset before the whole energy of the week changes.",
      beat: "Tomorrow, everything changes.",
      where: "KRABI · STAY: KRABI",
      accent: "#FF9EC6",
      scene: {
        poster: "/photos/thailand/days/day-03.jpg",
        alt: "A resort pool at dusk under tall palms, windows lit warm against a pink and blue sky",
        focal: "50% 54%",
        focalMobile: "52% 48%",
        scrim:
          "linear-gradient(180deg, rgba(8,3,18,0.52) 0%, rgba(8,3,18,0.26) 30%, rgba(8,3,18,0.74) 70%, rgba(5,2,11,0.97) 100%)",
        /* The hinge. Half-washed, because this is the day the page stops being
           a beach holiday and starts being a festival. */
        wash: 0.5,
      },
    },
    {
      id: "night-one",
      phase: "after",
      n: "04",
      date: "18 DECEMBER",
      kicker: "THE ELECTRIC SKY",
      title: "TONIGHT, WE GO TO EDC.",
      body:
        "Bags packed, premium transfers back to Phuket, and into the stay for the rest of the week. Shower, pool, eat, sleep if you are sensible. Then everything the week has been building toward: gates at Rhythm Park, the first time a mainstage that size is in front of you rather than on a screen, and the specific silence of sixteen people realising at once that this is actually happening.",
      beat: "Nothing is ever the first time twice.",
      where: "KRABI → PHUKET · EDC NIGHT 01 · STAY: PHUKET",
      accent: "#FF2E7E",
      scene: {
        poster: "/photos/thailand/days/day-04.jpg",
        alt: "A single searchlight beam cutting through heavy haze above a curved stage truss studded with lights",
        focal: "50% 62%",
        focalMobile: "50% 68%",
        scrim:
          "linear-gradient(180deg, rgba(5,2,11,0.58) 0%, rgba(5,2,11,0.22) 34%, rgba(5,2,11,0.76) 72%, rgba(5,2,11,0.97) 100%)",
        wash: 0.86,
      },
    },
    {
      id: "night-two",
      phase: "after",
      n: "05",
      date: "19 DECEMBER",
      kicker: "PHUKET × EDC",
      title: "DIFFERENT STAGE. SAME CREW.",
      body:
        "The morning after, which is its own experience. Breakfast, then Phuket properly: Kata and Karon, the Sino-Portuguese streets and cafés of the Old Town, Karon Viewpoint, and the coast at Promthep Cape. Back for the pool, the shower, the outfit and the pre-game. Then night two, which everybody says is the one that gets away from them.",
      beat: "The crew is fully in.",
      where: "PHUKET OLD TOWN · VIEWPOINTS · EDC NIGHT 02",
      accent: "#FF2E7E",
      scene: {
        poster: "/photos/thailand/days/day-05.jpg",
        alt: "A fan of laser beams filling the dark above a crowd, two heads silhouetted in the foreground",
        focal: "50% 44%",
        focalMobile: "50% 40%",
        scrim:
          "linear-gradient(180deg, rgba(5,2,11,0.40) 0%, rgba(5,2,11,0.14) 38%, rgba(5,2,11,0.70) 74%, rgba(5,2,11,0.96) 100%)",
        wash: 0.92,
      },
    },
    {
      id: "night-three",
      phase: "after",
      n: "06",
      date: "20 DECEMBER",
      kicker: "ONE LAST ADVENTURE",
      title: "ONE LAST DANCE.",
      body:
        "You have survived two nights, barely, and the last day is not getting wasted. Breakfast, then one more proper adventure — ATV, the water, the viewpoints, the spots that are not on anybody's list — and a final sunset with the crew. Back to the hotel. Final outfit, final pre-game, final night. The last night of the festival and of the trip, which is a great deal to put inside one evening.",
      beat: "Three nights. Six stages. One last night.",
      where: "PHUKET · EDC NIGHT 03 · STAY: PHUKET",
      accent: "#FF2E7E",
      scene: {
        poster: "/photos/thailand/days/day-06.jpg",
        alt: "Rows of pyrotechnic fountains firing across a festival mainstage above a crowd with their hands up",
        focal: "50% 48%",
        focalMobile: "50% 44%",
        /* Heaviest scrim in the set. The source frame was shot with a bright
           overcast sky behind the rig, and this is the last night of the trip
           — an overcast afternoon at the top of the frame would undo it. */
        scrim:
          "linear-gradient(180deg, rgba(5,2,11,0.80) 0%, rgba(5,2,11,0.34) 36%, rgba(5,2,11,0.78) 72%, rgba(5,2,11,0.98) 100%)",
        wash: 0.9,
      },
    },
    {
      id: "morning-after",
      phase: "after",
      n: "07",
      date: "21 DECEMBER",
      kicker: "THE MORNING AFTER",
      title: "NOBODY SAYS MUCH AT BREAKFAST.",
      body:
        "No alarms. No eight o'clock sightseeing. Just breakfast, coffee and six days of stories, with everybody exhausted and nobody willing to say it is over. One last group breakfast, one last poolside hour, one last round of photos. Then the transfers to the airport, and that is Thailand. The group chat, on the other hand, is only getting started.",
      beat: "You came for EDC. You left with fifteen other people.",
      where: "PHUKET → HOME",
      accent: "#D6CFE6",
      scene: {
        poster: "/photos/thailand/days/day-07.jpg",
        alt: "An empty tropical beach early in the morning, footprints in wet sand and a calm sea under broken cloud",
        focal: "50% 56%",
        focalMobile: "56% 58%",
        /* The lightest scrim on the page. Every chapter before this one got
           darker than the last; this is where somebody turns the lights on. */
        scrim:
          "linear-gradient(180deg, rgba(10,8,20,0.30) 0%, rgba(10,8,20,0.06) 30%, rgba(8,5,16,0.55) 72%, rgba(6,3,13,0.92) 100%)",
        wash: 0,
      },
    },
  ],
  /** The last line of the section, and of the trip. It sits alone. */
  signoff: "UNTIL THE NEXT PLOT TWIST.",
} as const;

export type WeekChapter = (typeof week.chapters)[number];

/* ------------------------------------------------------------------ */
/* 07 — the pass                                                       */
/* ------------------------------------------------------------------ */

/**
 * THE PRICE. Confirmed and published by the site owner, 27 September 2026.
 *
 * ─── THE ONE THING THIS BLOCK EXISTS TO PREVENT ─────────────────────────────
 * A visitor reading "₹49,999" next to the words EDC THAILAND will assume the
 * festival ticket is in it. It is not. That assumption is the single most
 * expensive misunderstanding this page can create — it ends in a refund
 * conversation and a screenshot — so the exclusion is not left to the
 * inclusions list further down the section. It is stated in `note`, directly
 * under the number, where the number is read.
 *
 * It is also the honest position rather than merely the safe one: Plot Twist
 * does not resell EDC tickets and marking one up would make this the ticket
 * agency the whole page disclaims being. We curate the trip; EDC sells the
 * ticket, at EDC's price.
 *
 * `pending` and `pendingNote` are kept even though nothing renders them now.
 * If this trip is ever pulled back to teaser posture, flipping `confirmed`
 * restores the old behaviour with no second edit — which is how it got
 * published this cleanly in the first place.
 */
export const price = {
  confirmed: true,
  amount: "₹74,999",
  note: "Early bird, per person, until 15 October — EDC Thailand 3-day GA ticket included. ₹79,999 from 16 Oct; ₹84,999 from 16 Nov. Flights are additional.",
  /**
   * THE ALL-IN NUMBER, AND WHY IT IS STATED.
   *
   * A page that prints ₹49,999 under the words EDC THAILAND and leaves the
   * ticket unmentioned is technically accurate and practically misleading:
   * somebody budgets fifty and arrives needing eighty. Both halves are stated
   * together, in the same breath, every time the number appears.
   *
   * `allIn` is the figure to quote; `passNote` is the sentence that stops it
   * reading as a package price.
   */
  allIn: "The trip doesn't change. The price does.",
  passNote: "₹74,999 early bird, with the EDC 3-day GA ticket included. Only flights are additional.",
  pending: "NOT ANNOUNCED YET",
  pendingNote: "Pre-register and you'll hear it first.",
} as const;

/**
 * INCLUSIONS / EXCLUSIONS. Confirmed by the site owner, 27 September 2026.
 *
 * ─── THE EXCLUSION LIST IS THE IMPORTANT ONE ────────────────────────────────
 * Most travel pages bury exclusions. Here the first excluded line is the
 * festival pass, stated before flights, because it is the thing a visitor is
 * most likely to have already assumed they were buying. Putting it anywhere
 * other than first would be a choice to let the assumption survive a scan.
 *
 * ─── WHAT IS NOT ON EITHER LIST, AND WHY ────────────────────────────────────
 * Nothing here was inferred from what a trip like this "usually" includes.
 * Meals, room occupancy, snorkelling gear and airport-shuttle timings are all
 * things a reader would expect to find and are all absent, because they were
 * not in the confirmed brief and a plausible guess printed as a fact is still
 * an invented fact. Two specifically:
 *
 *   ROOM OCCUPANCY. "4-star stays" is confirmed; whether ₹49,999 is a twin-
 *   share rate is not. Twin sharing is the industry default and would be the
 *   easy assumption to print — and if it is wrong it is a pricing error, not
 *   a copy error. It stays off the page until it is confirmed.
 *
 *   THE FESTIVAL SHUTTLE. Phrased as a conditional — "if the organiser sells
 *   them" — because an official EDC Thailand shuttle for the 2026 edition is
 *   not something this project has verified. The conditional is true whether
 *   or not the shuttle exists; an announcement of one would not be.
 */
export const inclusions = {
  confirmed: true,
  included: [
    "Six nights, seven days — premium hotels in Krabi and Phuket",
    "Breakfast every single day",
    "Premium group transfers throughout, airport transfers included",
    "Phuket → Krabi on arrival, Krabi → Phuket before the festival",
    "Phi Phi and Maya Bay by boat, with island hopping and water experiences",
    "Krabi experiences and a curated Phuket exploration",
    "A Phuket adventure experience",
    "Planned group experiences all week",
    "Group transfers to and from EDC on all three nights",
    "EDC Thailand 3-day GA ticket",
    "A dedicated Plot Twist trip leader, on the trip with you",
    "A curated group of 16*",
  ],
  excluded: [
    "Flights to and from Thailand",
    "Visa and travel insurance",
    "Meals outside the planned experiences",
    "Anything the festival sells separately, including shuttles if the organiser sells them",
  ],
  pending:
    "Nothing is on sale yet, so there is no included / not-included list to publish — including whether the festival ticket is part of it. Pre-registering costs nothing and commits you to nothing.",
} as const;

export const pass = {
  index: edcIndex("pass"),
  label: "THE PASS",
  /**
   * This read "WHAT WE CAN / TELL YOU YET." with the note "more of this soon."
   * while the price and the inclusions were both withheld. Both are published
   * now, so that headline had become a promise the section immediately breaks
   * — it sat directly above a number and two full lists.
   *
   * The replacement puts the exclusion in the headline rather than leaving it
   * to the NOT INCLUDED column further down. The festival pass not being in
   * the price is the one thing a reader must not miss, and a headline is read
   * by people who will never reach a list.
   */
  headline: ["WHAT IT COSTS.", "AND WHAT IT DOESN'T."],
  annotation: "read this bit properly.",
  /** The credential header — deliberately reads as machine print. */
  credential: {
    holder: "BEARER",
    holderValue: "ONE OF SIXTEEN",
    gate: "GATE",
    gateValue: "APPLICATION",
    serial: "PT-J02",
  },
  basics: [
    { k: "THE FESTIVAL", v: festival.name },
    { k: "FESTIVAL DATES", v: festival.dates },
    { k: "WHERE", v: festival.venue },
    { k: "THE TRIP", v: `${TRIP.dates.value} · ${TRIP.days.value}` },
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
    "Plot Twist is an independent travel experience built around EDC Thailand. We are not a partner, sponsor, organiser or affiliate of EDC, EDC Thailand or Insomniac Events, and this page is not endorsed by them. The package price includes a standard EDC Thailand 3-day GA ticket. The hero video is festival footage from EDC Thailand's own trailer and belongs to its makers, not to us. The photography is licensed stock and does not show the actual venues, stays or travellers on this trip. Festival dates and lineup are the organiser's and are subject to their announcements. All EDC and Insomniac names and marks belong to their owners.",
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
 * copy directly above the button is about the sixteen seats and the fact that
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
 * and picks sixteen people. Nobody is being cast yet, so asking someone to
 * write about themselves for a trip that isn't open would be taking their
 * effort under false pretences.
 *
 * ─── WHERE IT GOES ──────────────────────────────────────────────────────────
 * The same /api/applications endpoint and the same table as every other
 * journey, tagged JOURNEY 3 — one store, one admin, no second system to keep
 * in sync. That endpoint requires three answers, so it is sent `marker`
 * below rather than three invented sentences: it is plainly a system note in
 * the admin, not words put in an applicant's mouth. If pre-registration
 * becomes a permanent fixture, the right fix is a nullable answers column,
 * not a better-sounding placeholder.
 */
export const preRegister = {
  index: edcIndex("preRegister"),
  label: "BOOK YOUR SPOT",
  headline: ["GET INTO", "THE PLOT."],
  sub: "Leave your details and we'll message you to confirm. ₹15,000 booking + ₹30,000 towards your EDC ticket confirms your spot — or WhatsApp us on +91 70655 55549.",
  reassure: [
    "₹74,999 early bird until 15 October — EDC ticket included · ₹79,999 from 16 Oct · ₹84,999 from 16 Nov.",
    "To confirm: ₹15,000 booking + ₹30,000 EDC ticket. Balance by 2 December. Flights additional.",
  ],
  fields: {
    name: { label: "NAME", placeholder: "what people call you" },
    instagram: { label: "INSTAGRAM", placeholder: "@yourhandle" },
    mobile: { label: "MOBILE", placeholder: "we message, we don't spam" },
    city: { label: "CITY", placeholder: "where you're flying from" },
    age: { label: "AGE", placeholder: "18–30" },
  },
  submit: "BOOK MY SPOT",
  submitting: "SENDING…",
  note: "we'll message you. no payment until you confirm.",
  success: {
    stamp: "WE'VE GOT YOU",
    line: "We'll message you shortly to confirm your spot.",
    note: "see you after dark.",
  },
  error: "That didn't send. Try again, or message us — the tea cup's bottom right.",
  /** See the note above: a system marker, never a fabricated answer. */
  marker: "[PRE-REGISTRATION — no questions asked at this stage]",
} as const;

/**
 * THE WRISTBAND — the page's one properly playable object.
 *
 * The stickers can be thrown around; this can be USED. Tap it and it fastens,
 * the chip lights, and the label changes. It is the only element on the site
 * that holds a state the visitor put it in.
 *
 * ─── WHY A WRISTBAND AND NOT A BUTTON ───────────────────────────────────────
 * It is the object this whole page is built around — the credential, the thing
 * that means you are inside. Fastening one is also the single most recognisable
 * physical gesture of going to a festival, and it is irreversible in real life,
 * which is the joke the copy lands on.
 *
 * ─── WHAT IT DOES NOT DO ────────────────────────────────────────────────────
 * It is not a CTA and must never become one. It does not submit anything, does
 * not gate anything, and nothing on the page depends on its state. The moment
 * a visitor could believe that fastening it registered them for something, it
 * stops being a toy and starts being a dark pattern — on a page whose entire
 * job is to be clear that nothing here is a booking.
 */
/**
 * THE SOUND DESK — the copy on the one control that starts audio.
 *
 * The label is a STATE, never an instruction. "Sound on" tells you what is
 * true; "Turn on sound" nags. The idle label says SOUND rather than PLAY
 * because this is a room you can turn up, not a track you start.
 *
 * The track is licensed stock under the Pixabay Content License. It is not a
 * commercial dance record and must not be swapped for one — a released track
 * would need sync and master licences Plot Twist does not hold. Provenance
 * lives in public/audio/thailand/AUDIO.md.
 */
export const soundDesk = {
  src: "/audio/thailand/mainstage.mp3",
  /**
   * Start five seconds BEFORE the drop, not on it.
   *
   * MEASURED, NOT GUESSED. The energy envelope was sampled every half second:
   * the track runs a breakdown from ~40s (level falling 0.59 -> 0.55 -> 0.34)
   * and then hits its single loudest point at 45.5s.
   *
   * The first version started at 45.5 and opened mid-drop, which lands wrong —
   * a drop is only a drop because of the bar of tension in front of it. Coming
   * in at 40.5 gives five seconds of breakdown, so the drop HITS a moment
   * after you arrive instead of already being underway. Still nowhere near the
   * forty-five seconds of build at the top of the track, which is the wrong
   * half for somebody who has just landed.
   *
   * The loop returns HERE rather than to zero, so the intro is never heard and
   * every pass runs breakdown into drop.
   */
  startAt: 40.5,
  idle: "SOUND",
  on: "SOUND ON",
  off: "SOUND OFF",
  a11yOff: "Turn on the festival soundtrack",
  a11yOn: "Turn off the festival soundtrack",
} as const;

/**
 * THE CREW RADIO — this page version of the tea cup.
 *
 * The cup is a casting-room prop and a joke about gossip. It is exactly right
 * on Goa and Bali and lands on nothing here: an enamel mug of tea in a field
 * at 2am reads as a different brand, and the cream paper slip it opens is the
 * one warm surface on a page built entirely out of night.
 *
 * A handheld radio replaces it, because it solves both halves at once. It is
 * literally a communication device, so it reads as "talk to somebody" without
 * needing to be explained — and every person working a festival carries one,
 * so it belongs here the way the cup belongs in a casting room.
 *
 * CH 02 on its screen is the journey number. That is the whole reason the
 * detail is there: it makes the object belong to THIS trip rather than being
 * festival set-dressing bolted onto a contact button.
 *
 * Same number, same WhatsApp, same behaviour. Only the object changed.
 */
export const crew = {
  /** Reads as the visitor opening the conversation, not filing a ticket. */
  prefill: "Hey Plot Twist 👀 about Journey 3...",
  headline: ["ASK", "THE CREW"],
  sub: ["Talk to the humans", "running this →"],
  channel: "CH 02",
  cta: "WhatsApp",
  aria: "Ask the crew: contact Plot Twist on WhatsApp",
} as const;

/**
 * THE FAQ — the objections, answered on the page.
 *
 * ─── WHY THIS EXISTS, IN BOTH DIRECTIONS ────────────────────────────────────
 * Search: "is X an official package", "what does it cost", "are tickets
 * included" are real queries with real volume, and answering them plainly is
 * the only way this page can appear for them. It is also the one place on the
 * site where FAQPage structured data is honest, because these questions are
 * VISIBLE on the page — marking up questions a visitor cannot see is a manual
 * action waiting to happen, which is why the panels in `plot` are not
 * marked up as an FAQ despite superficially looking like one.
 *
 * Conversion: every question below is something somebody would otherwise have
 * to message to find out, and the three that matter most are the ones a sales
 * page would bury. Answering "no, this is not official" and "no, the price is
 * not announced" up front loses the people who were never going to be happy
 * and keeps the ones who were.
 *
 * ─── THE RULE FOR ADDING ONE ────────────────────────────────────────────────
 * Only questions answerable from a CONFIRMED fact already in this file. No
 * invented policy — if the honest answer is "not decided yet", either say that
 * or leave the question out. Several below say exactly that on purpose; a
 * teaser that answers everything is not a teaser, it is a brochure that is
 * making things up.
 */
export const faq = {
  index: edcIndex("faq"),
  label: "STRAIGHT ANSWERS",
  headline: ["THE BIT WHERE", "WE STOP BEING COY."],
  items: [
    {
      q: "Is this an official EDC Thailand package?",
      a: "No. Plot Twist is an independent travel company and is not a partner, sponsor, organiser or affiliate of EDC, EDC Thailand or Insomniac Events. We run a trip built around their festival, and your 3-day GA ticket is included in the package. Anything to do with the festival itself — lineup, entry, rules — is theirs, not ours.",
    },
    {
      q: "Are festival tickets included?",
      a: "Yes. A standard EDC Thailand 3-day GA ticket is included in the package price. Flights are the only big thing that's additional.",
    },
    {
      q: "What does it cost?",
      a: "It depends on when you book — same trip at every price. Early bird ₹74,999 per person until 15 October, ₹79,999 from 16 October to 15 November, and ₹84,999 from 16 November. That covers the stays, the transfers, the boat day, the experiences, the trip leader — and the EDC Thailand 3-day GA ticket. Flights are your own. To confirm: ₹15,000 booking amount plus ₹30,000 towards your EDC ticket; the balance is due by 2 December.",
    },
    {
      q: "How do I book?",
      a: "Leave your details in the form below or message us on WhatsApp (+91 70655 55549). We'll come back to you; ₹15,000 booking + ₹30,000 towards your EDC ticket confirms your spot. Filling in the form on its own holds nothing until that payment is made.",
    },
    {
      q: "When is the trip, and how long is it?",
      a: `Seven days and six nights, ${TRIP.dates.value}. The festival itself runs ${festival.dates} at ${festival.ground}, which sits inside that window — the trip is deliberately longer than the festival, because the other four days are the point.`,
    },
    {
      q: "Who else is going?",
      a: "Sixteen people, aged 18 to 30, most of whom will not know each other beforehand. A real person reads every application and picks the mix one at a time, which is why it is not instant and why it is not simply whoever paid first.",
    },
    {
      q: "Where is the day-by-day itinerary?",
      a: "On this page, all seven days of it. Krabi and Railay on the 15th, Phi Phi and Maya Bay on the 16th, a guided Krabi day on the 17th, back to Phuket for the first festival night on the 18th, then two more nights and a slow morning on the 21st. Nothing is held back behind the form.",
    },
  ],
} as const;

export const wristband = {
  label: "JOURNEY 3 · EDC THAILAND",
  serial: "PT—02",
  idle: "TAP TO FASTEN",
  fastened: "ON. THAT'S PERMANENT.",
  note: "you can't put it back.",
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
