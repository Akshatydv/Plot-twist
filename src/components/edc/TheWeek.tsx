"use client";

import { week, type WeekChapter } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { CredChip, GateSlate, Haze, NeonRule } from "./Neon";
import { DayDetail, DayScene, DaySlate } from "./DayScene";

/**
 * THE WEEK — the published itinerary, as seven full-bleed chapters.
 *
 * ─── THE REWRITE THIS FILE IS ───────────────────────────────────────────────
 * The first version of this section was ONE layout rendered seven times over
 * seven gradient backgrounds. It was compact, it was cheap, and every day felt
 * like the same day in a different tint — which is the exact opposite of what
 * the section is for.
 *
 * The Goa page is the benchmark and it does two things this now copies:
 *
 *   1. THE BACKGROUND IS THE SECTION. Each chapter is a photograph you are
 *      standing inside, not a caption describing a place. See DayScene.tsx.
 *   2. EVERY CHAPTER IS ITS OWN COMPOSITION. Goa has four chapters and four
 *      hand-built layouts — the Flamingo chapter splits day from night either
 *      side of a stamp; the others do something else entirely. None of them
 *      share a template, and that is why they read as four different worlds.
 *
 * So there is no generic <Chapter/> in this file any more. There are seven
 * functions, and each one is allowed to be different from the others. That is
 * more code than a loop over an array, and it is the whole point: a loop can
 * only ever produce variations on one idea.
 *
 * ─── WHAT IS SHARED, DELIBERATELY ───────────────────────────────────────────
 * Three things, because seven unrelated screens would stop being a sequence:
 *   · DaySlate — date, rule, DAY 0X — opens every chapter, same size, same place
 *   · the beat — one italic serif line, always the last thing in a chapter
 *   · the wash — the violet arc that makes seven stock photographs one set
 *
 * ─── THE SPLIT ──────────────────────────────────────────────────────────────
 * `phase: "before"` (01–03) mounts above THE DROP; `phase: "after"` (04–07)
 * mounts below it. THE DROP is the page's "and then…", and the festival nights
 * have to land on the far side of it or the page spoils its own climax inside
 * an itinerary. One array, two mounts, so a chapter cannot drift between them.
 */
export function TheWeek({ phase }: { phase: "before" | "after" }) {
  const c = Object.fromEntries(week.chapters.map((ch) => [ch.id, ch])) as Record<string, WeekChapter>;

  if (phase === "before") {
    return (
      <div id="week" className="relative">
        <WeekHeader />
        <Arrival c={c.arrival} />
        <Islands c={c.islands} />
        <Loading c={c.loading} />
      </div>
    );
  }

  return (
    <div id="nights" className="relative">
      <NightsHeader />
      <NightOne c={c["night-one"]} />
      <NightTwo c={c["night-two"]} />
      <NightThree c={c["night-three"]} />
      <MorningAfter c={c["morning-after"]} />
    </div>
  );
}

/* ================================================================== */
/* shared parts                                                        */
/* ================================================================== */

/** The one italic line each chapter ends on — Plot Twist's own voice, as
 *  opposed to the prose above it, which describes. Always last, always this. */
function Beat({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <p
      className="mt-7 max-w-[32ch] border-t pt-5 font-serif text-[clamp(1.2rem,3.6vw,1.75rem)] italic leading-[1.2] text-sand drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
      style={{ borderColor: `${accent}55` }}
    >
      {children}
    </p>
  );
}

/** Standard prose block. Capped at 44ch because it sits over photography and a
 *  long line over a busy frame is where legibility actually breaks. */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 max-w-[44ch] text-[clamp(1rem,2.5vw,1.12rem)] leading-[1.5] text-sand/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
      {children}
    </p>
  );
}

/** The three festival nights share one mark so they read as a set inside the
 *  set — NIGHT, then the number, stacked and enormous. */
function NightMark({ n, accent }: { n: string; accent: string }) {
  return (
    <div className="flex items-end gap-3">
      <span className="font-display text-[clamp(0.85rem,2.4vw,1.05rem)] uppercase tracking-[0.34em]" style={{ color: accent }}>
        NIGHT
      </span>
      <span
        className="font-display text-[clamp(3.4rem,13vw,7rem)] leading-[0.72] text-sand"
        style={{ textShadow: `0 0 34px ${accent}aa, 0 0 90px ${accent}55` }}
      >
        {n}
      </span>
    </div>
  );
}

/* ================================================================== */
/* 01 — THE ARRIVAL                                                    */
/* ================================================================== */

/**
 * The route chapter. Its own idea is the ROUTE CHAIN: three place names with
 * arrows between them, because this is the only day of the trip that is
 * genuinely about movement — you land in one province and sleep in another.
 * No other chapter gets it, which is what makes it this chapter's.
 *
 * Content is bottom-left and the sky is left alone: this is the last frame on
 * the page that is allowed to look like a holiday.
 */
function Arrival({ c }: { c: WeekChapter }) {
  const stops = c.where.split("→").map((s) => s.trim());

  return (
    <DayScene chapter={c} className="justify-end" priority>
      <div className="mt-auto w-full max-w-[1100px]">
        <Reveal>
          <DaySlate date={c.date} n={c.n} accent={c.accent} />
        </Reveal>

        {/* the route */}
        <Reveal delay={0.05}>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {stops.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 ? <span className="text-sand/45">→</span> : null}
                <span className="border-b border-sand/30 pb-1 font-display text-[clamp(0.95rem,2.8vw,1.2rem)] uppercase tracking-[0.12em] text-sand/90">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 font-display text-[clamp(0.9rem,2.6vw,1.1rem)] uppercase tracking-[0.3em]" style={{ color: c.accent }}>
            {c.kicker}
          </p>
          <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,9vw,5.4rem)] uppercase leading-[0.86] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
            {c.title}
          </h3>
        </Reveal>

        <Reveal delay={0.16}>
          <Body>{c.body}</Body>
          <Beat accent={c.accent}>{c.beat}</Beat>
        </Reveal>
      </div>
    </DayScene>
  );
}

/* ================================================================== */
/* 02 — ISLAND MODE                                                    */
/* ================================================================== */

/**
 * The widest, brightest frame of the seven, and the only chapter whose title
 * is allowed to run to the edge of the measure. Its own idea is the TWO-UP
 * DETAIL ROW: this is the one day with a genuine shape to it — out on the
 * water, then out at night — so it gets stated as two labelled halves.
 */
function Islands({ c }: { c: WeekChapter }) {
  return (
    <DayScene chapter={c} className="justify-end">
      <div className="mt-auto w-full max-w-[1100px]">
        <Reveal>
          <DaySlate date={c.date} n={c.n} accent={c.accent} />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 font-display text-[clamp(0.9rem,2.6vw,1.1rem)] uppercase tracking-[0.3em]" style={{ color: c.accent }}>
            {c.kicker}
          </p>
          <h3 className="mt-3 max-w-[13ch] font-display text-[clamp(2.6rem,10vw,6rem)] uppercase leading-[0.84] text-sand drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            {c.title}
          </h3>
        </Reveal>

        <Reveal delay={0.12}>
          <Body>{c.body}</Body>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 grid max-w-[46rem] gap-6 sm:grid-cols-2">
            <DayDetail k="ON THE WATER" v="Phi Phi, Maya Bay, and the stops without a name" accent={c.accent} />
            <DayDetail k="AFTER DARK" v="Back late, and then out later" accent={c.accent} />
          </div>
          <Beat accent={c.accent}>{c.beat}</Beat>
        </Reveal>
      </div>
    </DayScene>
  );
}

/* ================================================================== */
/* 03 — PHUKET LOADING…                                                */
/* ================================================================== */

/**
 * THE HINGE, and the chapter with the most deliberate idea in the section.
 *
 * The title is already "PHUKET LOADING…", so the chapter renders an actual
 * LOADING BAR under it — nearly full, labelled with how long is left before
 * the gates. It is the one literal device in the week and it earns its place
 * by doing the thing the copy only says: the page stops describing a holiday
 * here and starts counting down to a festival.
 *
 * The frame is half-washed for the same reason. This is the screen where the
 * photography leaves Thailand and joins the page.
 */
function Loading({ c }: { c: WeekChapter }) {
  return (
    <DayScene chapter={c} className="justify-end">
      <div className="mt-auto w-full max-w-[1100px]">
        <Reveal>
          <DaySlate date={c.date} n={c.n} accent={c.accent} />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 font-display text-[clamp(0.9rem,2.6vw,1.1rem)] uppercase tracking-[0.3em]" style={{ color: c.accent }}>
            {c.kicker}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2.4rem,9.4vw,5.6rem)] uppercase leading-[0.86] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
            {c.title}
          </h3>
        </Reveal>

        {/* the bar */}
        <Reveal delay={0.12}>
          <div className="mt-7 max-w-[34rem]">
            <div className="flex items-baseline justify-between text-[10px] tracked text-sand/70">
              <span>KRABI → PHUKET</span>
              <span style={{ color: c.accent }}>T‑MINUS ONE DAY</span>
            </div>
            <div className="mt-2.5 h-[7px] w-full overflow-hidden rounded-full bg-sand/15">
              {/* 86%, not 100%: there is still a day to go, and a full bar
                  under the word LOADING would be saying the opposite. */}
              <div
                className="h-full rounded-full"
                style={{
                  width: "86%",
                  background: "linear-gradient(90deg, #8b3dff 0%, #ff2e7e 70%, #ff9ec6 100%)",
                  boxShadow: "0 0 18px rgba(255,46,126,0.8)",
                }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <Body>{c.body}</Body>
          <Beat accent={c.accent}>{c.beat}</Beat>
        </Reveal>
      </div>
    </DayScene>
  );
}

/* ================================================================== */
/* 04 / 05 / 06 — the three nights                                     */
/* ================================================================== */

/**
 * NIGHT 01. The stage rig, seen from underneath through haze — the first thing
 * you actually see, before you can see the crowd. Content sits bottom-left,
 * low and heavy, so the beam has the top of the frame to itself.
 */
function NightOne({ c }: { c: WeekChapter }) {
  return (
    <DayScene chapter={c} className="justify-end">
      <div className="mt-auto w-full max-w-[1100px]">
        <Reveal>
          <DaySlate date={c.date} n={c.n} accent={c.accent} />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6">
            <NightMark n="01" accent={c.accent} />
          </div>
          <h3 className="mt-4 font-display text-[clamp(2.2rem,8.4vw,5rem)] uppercase leading-[0.86] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
            {c.title}
          </h3>
        </Reveal>
        <Reveal delay={0.12}>
          <Body>{c.body}</Body>
          <Beat accent={c.accent}>{c.beat}</Beat>
        </Reveal>
      </div>
    </DayScene>
  );
}

/**
 * NIGHT 02. The only chapter in the week that is CENTRED, and the only one
 * with the copy in the middle of the frame rather than at the bottom of it.
 * The photograph is lasers directly overhead with two heads silhouetted at the
 * edges, so centring puts the reader between them — which is what the chapter
 * is about. "The crew is fully in" does not work read from the touchline.
 */
function NightTwo({ c }: { c: WeekChapter }) {
  return (
    <DayScene chapter={c} className="justify-center">
      <div className="m-auto w-full max-w-[52rem] text-center">
        <Reveal>
          <div className="flex justify-center">
            <DaySlate date={c.date} n={c.n} accent={c.accent} />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-7 flex justify-center">
            <NightMark n="02" accent={c.accent} />
          </div>
          <h3 className="mt-4 font-display text-[clamp(2.4rem,9.6vw,5.6rem)] uppercase leading-[0.86] text-sand drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)]">
            {c.title}
          </h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[44ch] text-[clamp(1rem,2.5vw,1.12rem)] leading-[1.5] text-sand/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
            {c.body}
          </p>
          <p
            className="mx-auto mt-8 max-w-[30ch] border-t pt-5 font-serif text-[clamp(1.2rem,3.6vw,1.75rem)] italic leading-[1.2] text-sand"
            style={{ borderColor: `${c.accent}55` }}
          >
            {c.beat}
          </p>
        </Reveal>
      </div>
    </DayScene>
  );
}

/**
 * NIGHT 03. The largest type in the week, because it is the last night of both
 * the festival and the trip. Its own element is the FINAL NIGHT chip on the
 * slate line — the only chapter that flags itself as an ending, which is what
 * sets up the morning after underneath it.
 */
function NightThree({ c }: { c: WeekChapter }) {
  return (
    <DayScene chapter={c} className="justify-end">
      <div className="mt-auto w-full max-w-[1100px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <DaySlate date={c.date} n={c.n} accent={c.accent} />
            <CredChip color={c.accent} rotate={-2}>
              FINAL NIGHT
            </CredChip>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6">
            <NightMark n="03" accent={c.accent} />
          </div>
          <h3 className="mt-4 font-display text-[clamp(2.8rem,11vw,7rem)] uppercase leading-[0.82] text-sand drop-shadow-[0_4px_34px_rgba(0,0,0,0.65)]">
            {c.title}
          </h3>
        </Reveal>
        <Reveal delay={0.12}>
          <Body>{c.body}</Body>
          <Beat accent={c.accent}>{c.beat}</Beat>
        </Reveal>
      </div>
    </DayScene>
  );
}

/* ================================================================== */
/* 07 — THE MORNING AFTER                                              */
/* ================================================================== */

/**
 * The quietest screen on the page, and the only one below the gate with no
 * wash on it at all — the colour comes back, which is the point.
 *
 * Its own idea is the TALLY: seven days, four destinations, three nights,
 * twenty strangers, set as four figures in a row. The beat for this chapter is
 * that sentence, so rather than printing it as prose it is broken into the
 * numbers it is made of. It is the only chapter that counts anything, because
 * it is the only one looking backwards.
 *
 * The sign-off then gets the screen after this one, alone.
 */
function MorningAfter({ c }: { c: WeekChapter }) {
  const tally = [
    { n: "7", k: "DAYS" },
    { n: "4", k: "DESTINATIONS" },
    { n: "3", k: "FESTIVAL NIGHTS" },
    { n: "20", k: "WHO WERE STRANGERS" },
  ];

  return (
    <>
      <DayScene chapter={c} className="justify-end">
        <div className="mt-auto w-full max-w-[1100px]">
          <Reveal>
            <DaySlate date={c.date} n={c.n} accent={c.accent} />
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-6 font-display text-[clamp(0.9rem,2.6vw,1.1rem)] uppercase tracking-[0.3em]" style={{ color: c.accent }}>
              {c.kicker}
            </p>
            <h3 className="mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,8vw,4.6rem)] uppercase leading-[0.88] text-sand drop-shadow-[0_4px_26px_rgba(0,0,0,0.6)]">
              {c.title}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <Body>{c.body}</Body>
          </Reveal>

          {/* the tally */}
          <Reveal delay={0.18}>
            <div className="mt-9 grid max-w-[54rem] grid-cols-2 gap-x-6 gap-y-6 border-t border-sand/20 pt-7 sm:grid-cols-4">
              {tally.map((t) => (
                <div key={t.k}>
                  <div className="font-display text-[clamp(2rem,6vw,3rem)] leading-[0.82] text-sand">{t.n}</div>
                  <div className="mt-2 text-[9px] tracked text-sand/70">{t.k}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </DayScene>

      <SignOff />
    </>
  );
}

/**
 * The sign-off gets a screen of its own with nothing else on it. At the bottom
 * of chapter 07 it would have been the last sentence of a paragraph about
 * breakfast; alone, on black, after the one frame where daylight came back, it
 * is the end of the film.
 */
function SignOff() {
  return (
    <section
      className="relative flex min-h-[52svh] items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-8"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #1a0824 55%, #0a0414 100%)" }}
    >
      <Haze className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Reveal>
        <h2 className="relative font-display text-[clamp(1.9rem,6.8vw,3.8rem)] uppercase leading-[0.95] text-sand edc-glow-hot">
          {week.signoff}
        </h2>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* the two openings                                                    */
/* ================================================================== */

function WeekHeader() {
  return (
    <section
      className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #1e0f26 100%)" }}
    >
      <Haze className="-right-16 top-0 h-72 w-72 opacity-25" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* No sticker here. `stickers.runOfShow` is the one that fits and it is
          already on THE SHAPE two sections up; the same scrap twice in one
          scroll reads as a template rather than as a scrapbook. */}

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <GateSlate index="—" label={week.label} meta="ALL SEVEN DAYS" />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.4vw,4.4rem)] uppercase leading-[0.9] text-sand">
                {week.headline[0]}
                <br />
                <span className="text-[var(--edc-blush)] edc-glow-hot">{week.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[44ch] font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-[1.25] text-sand/75">
                {week.sub}
              </p>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-sand/45" rotate={3}>
            {week.annotation}
          </Note>
        </div>
        <NeonRule className="mt-8" />
      </div>
    </section>
  );
}

/**
 * Deliberately much smaller than WeekHeader. The page has just had THE DROP,
 * and a second full masthead immediately after the loudest moment would flatten
 * the thing that made it land. One chip, one line.
 */
function NightsHeader() {
  return (
    <section className="relative overflow-hidden bg-[#0a0414] px-5 py-12 sm:px-8 sm:py-14 lg:px-14">
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        <CredChip color="#FF2E7E" rotate={-1.5} className="shrink-0">
          {week.nightsIntro.stamp}
        </CredChip>
        <p className="max-w-[54ch] text-[clamp(0.98rem,2.4vw,1.1rem)] leading-[1.45] text-sand/80">
          {week.nightsIntro.line}
        </p>
      </div>
    </section>
  );
}
