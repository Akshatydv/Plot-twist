"use client";

import { close, crossings, filmIndex, hero, worlds } from "@/content/chaos";
import { Calm } from "../bir/Scenery";
import { ChaosHero } from "./ChaosHero";
import { World } from "./World";
import { Entry } from "./Entry";
import { Threshold } from "./Threshold";
import { WorldNav } from "./WorldNav";
import { StickyCta } from "./StickyCta";
import { Bill, FinalCta, TheCast, TheDetails, TheFaq } from "./TheClose";
import { Crew, Included, LAST_WORLD, Philosophy } from "./Crew";
import { RecapRitual } from "./Rituals";
import { AtAGlance, DayLog, FestivalGuide, Payments } from "./Ops";
import { PreRegister } from "../edc/PreRegister";
import { Footer } from "@/components/Footer";
import { CrossBleach, CrossBlackout, CrossCountdown, CrossDawn, CrossLightsDown } from "./Crossing";

/**
 * THAILAND: THE CHAOS — the rebuilt Journey 3.
 *
 * Architecture: `docs/thailand-chaos-design.md`. Built alongside the live page,
 * which keeps working at /journey/3; this renders at /thailand so the two can
 * be compared before anything is swapped. Nothing here imports from
 * `components/edc/`.
 *
 * ─── THE RUNNING ORDER, AND WHERE THE TIME GOES ─────────────────────────────
 *
 *   HERO            pushes in, then goes to black as you leave it
 *   ENTRY           420svh — the letter portal, you fly through THE CHAOS
 *   FILM INDEX      seven worlds, one line each, on black
 *   01 LANDFALL     dusk violet
 *    ~ CrossDawn    260svh — night becomes morning, a wake draws
 *   02 THE WATER    deep sea
 *    ~ CrossBleach  200svh — the sea bleaches upward into paper
 *   03 THE DAYLIGHT BONE PAPER   ← the one bright screen, dead centre
 *    ~ CrossBlackout 180svh — the light dies in six stops
 *   04 THE NIGHT BEFORE near-black
 *    ~ CrossCountdown 300svh — 21:00 → 23:59, then the only hard cut
 *   05 THE DROP     void + hot   ← the climax
 *    ~ CrossLightsDown 240svh — lasers out one at a time, dawn behind them
 *   06 AFTER HOURS  gold
 *   07 THE END      black
 *   CLOSE
 *
 * **More of this page is transition than is section**, which is the thing that
 * separates Bir and Sri Lanka from a page with nice photographs on it. A world
 * never ends — it becomes the next one, and there is never a white frame.
 *
 * ─── STILL TO COME ──────────────────────────────────────────────────────────
 * The per-world set pieces (the bill, the montage) and the conversion block.
 */
export function ChaosPage() {
  return (
    <Calm>
      <main className="relative overflow-x-clip bg-[#08060B] text-sand">
        <ChaosHero />
        <Entry />
        <FilmIndex />

        <World world={worlds[0]} priority />
        <CrossDawn from={worlds[0].ground} to={worlds[1].ground} slot={crossings.dawn} />

        <World world={worlds[1]} />
        <CrossBleach from={worlds[1].ground} to={worlds[2].ground} slot={crossings.bleach} />

        <World world={worlds[2]} />
        <CrossBlackout from={worlds[2].ground} to={worlds[3].ground} slot={crossings.blackout} />

        {/* THE THRESHOLD. The page changes language here: everything above is
            serif italic and lowercase, everything below is Anton and capitals.
            See Threshold.tsx for why the change needs one moment that
            acknowledges it rather than just happening. */}
        <Threshold />

        <World world={worlds[3]} />
        <CrossCountdown from={worlds[3].ground} to={worlds[4].ground} slot={crossings.countdown} />

        <World world={worlds[4]} />


        <CrossLightsDown from={worlds[4].ground} to={worlds[5].ground} slot={crossings.lightsDown} />

        <World world={worlds[5]} />
        <World world={worlds[6]} />

        {/* THE RECAP — the week, not a day. A montage belongs to the trip, so
            it closes the seven rather than sitting inside the last one. */}
        <RecapRitual world={LAST_WORLD} />

        {/* THE BILL — the receipt for three nights, after all three. */}
        <Bill />

        {/* The scarcity, argued before the inclusions: anyone can buy an EDC
            ticket, nobody can buy the other fifteen people. */}
        <Crew />

        {/* LAYER 2. The film above sells the week; these three answer the
            careful reader's questions — the trip on one line, the days as a
            working schedule, the festival nights said plainly. See Ops.tsx. */}
        <AtAGlance />
        <Included />
        <DayLog />
        <FestivalGuide />
        <Philosophy />

        {/* ─── the film is over; the product starts ─────────────────────────
            The house order on every one of these pages: the dream, then the
            people, then the plain facts, then the ask. Quiet on purpose — by
            here the reader has been through a portal, seven worlds and a
            festival, and the job is to answer questions rather than impress. */}
        <TheCast />
        <TheDetails />
        <Payments />
        <TheFaq />
        <FinalCta />
        <PreRegister />
        <Footer tone="night" />

        {/* THE NAVIGATOR. Pinned, and only while you are inside the seven —
            the hero and the portal stay clear of page furniture. It mounts
            INSIDE <main> for the reason Sri Lanka mounts its chrome inside
            .sl: fixed chrome then inherits the page colour tokens rather than
            the site defaults. See WorldNav.tsx for why it holds its last world
            across a crossing. */}
        <WorldNav />
        <StickyCta />
      </main>
    </Calm>
  );
}

/**
 * THE FILM INDEX — seven worlds, one line each, before you have seen any of
 * them. Sri Lanka does the same directly after its entry, and it works for a
 * reason that is not navigational: knowing there are seven makes the first one
 * feel like the start of something rather than the whole thing.
 */
function FilmIndex() {
  return (
    <section className="relative bg-[#08060B] px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-sand/55">{filmIndex.label}</p>
        <h2 className="mt-4 font-serif text-[clamp(2.2rem,7vw,4.6rem)] italic leading-[0.94]">
          {filmIndex.title[0]}
          <br />
          <span className="text-sand/45">{filmIndex.title[1]}</span>
        </h2>

        <ol className="mt-12 border-t border-sand/15">
          {worlds.map((w) => (
            <li key={w.id} className="border-b border-sand/15">
              <a
                href={`#world-${w.n}`}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[auto_minmax(0,18ch)_1fr_auto] sm:gap-x-8"
              >
                <span className="font-display text-[clamp(1.3rem,3vw,1.9rem)] leading-none" style={{ color: w.accent }}>
                  {w.n}
                </span>
                <span className="text-[clamp(1rem,2.6vw,1.35rem)] font-medium tracking-[-0.01em] text-sand">
                  {w.name}
                </span>
                <span className="col-span-2 text-[0.95rem] leading-[1.45] text-sand/60 sm:col-span-1">{w.index}</span>
                <span className="hidden text-[10px] tracked text-sand/40 sm:block">{w.date}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

