"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { homeHero, MEDIA } from "@/content/home";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { MarkerUnderline } from "../Brush";
import { Footage } from "./Footage";

/** What the hero needs to know about a trip to offer it — derived from WORLDS, never typed here. */
export type HeroTrip = {
  key: string;
  /** "GOA", "BIR × BAROT", "THAILAND + EDC", "SRI LANKA". */
  label: string;
  href: string | null;
  /** For analytics. Never the destination name. */
  journeyId: string | null;
};

/**
 * "BIR × BAROT" -> "Bir × Barot". The labels are stored in capitals (they are
 * also set that way on the cards and the board); in running serif type that
 * reads as shouting, so each word is sentence-cased. EDC stays an acronym, and
 * the × and + are left alone.
 */
function titleCase(label: string): string {
  return label
    .split(" ")
    .map((w) => (w === "EDC" || !/^[A-Z]+$/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE COLD OPEN — the trailer for the whole universe.
 *
 * The footage does the talking; the type is three things and two buttons.
 * It opens like a film: a black frame, a production slate, then the
 * letterbox bars part onto the footage and the wordmark lands. That intro is
 * under a second, and reduced-motion visitors skip it entirely.
 *
 * "Travel differently." is set in the brush face with the pink marker
 * underline — the exact treatment the Goa hero gives "the plot." — so the
 * first thing this page does is rhyme with the journey pages.
 *
 * As the hero scrolls away the footage pushes in and the type lifts off,
 * handing over to THIS ISN'T A TRIP rather than just ending.
 */
export function HomeHero({ trips }: { trips: HeroTrip[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [alt, setAlt] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // The alternate lines rotate slowly under the wordmark.
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setAlt((v) => (v + 1) % homeHero.alternates.length), 4200);
    return () => window.clearInterval(t);
  }, [reduce]);

  const intro = (d: number, y = 28) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } };

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black text-sand">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: mediaScale }}>
        <Footage slot={MEDIA.HERO_VIDEO} eager />
      </motion.div>

      {/* scrims — the headline sits low-left, so that's where it's darkest */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(10,4,10,0.55) 0%,rgba(10,4,10,0.05) 22%,rgba(10,4,10,0.1) 45%,rgba(10,4,10,0.86) 100%),linear-gradient(90deg,rgba(10,4,10,0.45) 0%,transparent 60%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* the letterbox parting — pure decoration, gone after the intro */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-black"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.7, 0, 0.2, 1] }}
            style={{ originY: 0 }}
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2 bg-black"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.7, 0, 0.2, 1] }}
            style={{ originY: 1 }}
          />
          <motion.p
            className="pointer-events-none absolute inset-x-0 top-1/2 z-40 -translate-y-1/2 text-center text-[10px] tracked text-sand/80 sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, times: [0, 0.25, 0.6, 1] }}
          >
            {homeHero.slate}
          </motion.p>
        </>
      )}

      <motion.div
        className="relative z-10 flex h-full flex-col px-5 pb-6 pt-24 sm:px-8 sm:pb-8 lg:px-14"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="mt-auto">
          <h1 className="relative">
            <motion.span
              className="block font-display text-[29vw] uppercase leading-[0.8] tracking-[-0.02em] sm:text-[clamp(4.6rem,23vw,17rem)]"
              {...intro(1.05, 60)}
            >
              <span className="sr-only">Plot Twist — </span>
              <span aria-hidden>
                PLOT <span className="inline-block origin-bottom-left -rotate-[3deg] text-[#FFE9A8]">TWIST</span>
              </span>
            </motion.span>
            <motion.span
              className="relative mt-3 inline-block font-brush text-[clamp(2rem,8.5vw,4.6rem)] leading-none text-pink [text-shadow:0_2px_18px_rgba(10,4,10,0.55)] sm:mt-4"
              {...intro(1.3)}
            >
              {homeHero.line}
              <MarkerUnderline color="#FFF1DC" className="absolute -bottom-2 left-0 h-4 w-[80%]" />
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-[30ch] font-serif text-[clamp(1.15rem,3.6vw,1.6rem)] italic leading-[1.2] text-sand/85"
            {...intro(1.45)}
          >
            {homeHero.support}
          </motion.p>

          {/*
            WHERE TO? — the trips, by name, on the first screen.

            The hero's job used to be mood alone and the journeys only appeared
            after a scroll; anyone who already knew where they wanted to go had
            to hunt for it. Each name is a straight link to that trip's page.
            Read from WORLDS, so a new trip appears here the moment it is added
            there — and the row can never drift out of step with the cards below.

            AN INDEX, NOT BUTTONS. Two earlier versions are why this is so plain:
            thin outlines on dark glass read as a row of pale bullet points, and
            solid coloured stickers fought the hero's own quiet. This borrows the
            hero's existing language instead — the serif of the line above it,
            the tracked numerals of its slate — and adds nothing else: four names
            on hairlines, and a single pink line that draws across on hover.
          */}
          <motion.nav className="mt-7" aria-label={homeHero.pick} {...intro(1.5)}>
            <p className="mb-3 text-[10px] font-semibold tracked text-sand/60">{homeHero.pick}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:flex sm:flex-wrap sm:gap-x-9">
              {trips.map((t, i) => {
                const inner = (
                  <>
                    {/* the hairline, and the pink line that draws across it */}
                    <span className="absolute inset-x-0 top-0 h-px bg-sand/30" aria-hidden />
                    <span
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-pink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      aria-hidden
                    />
                    <span className="flex items-baseline gap-2 whitespace-nowrap pt-2.5">
                      <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-sand/55">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-[clamp(1.15rem,4.6vw,1.45rem)] leading-none text-sand">{titleCase(t.label)}</span>
                      <span
                        className="text-sm leading-none text-pink opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </>
                );
                const cls = "group relative block touch-manipulation outline-none";
                return (
                  <li key={t.key}>
                    {t.href ? (
                      <Link
                        href={t.href}
                        className={cls}
                        onClick={() => track(PLOT_EVENTS.enterJourney, { journey_id: t.journeyId, from: "hero" })}
                      >
                        {inner}
                      </Link>
                    ) : (
                      // No page yet: the card further down says so, so this scrolls to it.
                      <a href="#journeys" className={cls}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.nav>

          <motion.div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" {...intro(1.6)}>
            <a
              href={homeHero.primary.href}
              className="group inline-flex touch-manipulation items-center gap-3 bg-sand px-7 py-4 text-[13px] font-semibold uppercase tracked text-ink shadow-[6px_6px_0_0_#FF4F87] transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
            >
              {homeHero.primary.label}
              <span className="transition-transform duration-200 group-hover:translate-y-1" aria-hidden>
                ↓
              </span>
            </a>
            <a
              href={homeHero.secondary.href}
              className="touch-manipulation border-b border-sand/50 pb-1 text-[12px] font-medium uppercase tracked text-sand/90 transition-colors hover:border-pink hover:text-sand"
            >
              {homeHero.secondary.label}
            </a>
          </motion.div>
        </div>

        {/* the slate row — a caption burned in beside the REC light, like a dailies reel */}
        <motion.div
          className="mt-8 flex items-end justify-between gap-4 border-t border-sand/15 pt-4 sm:mt-10"
          {...intro(1.75, 0)}
        >
          <div className="flex min-w-0 items-center gap-3 text-[10px] tracked text-sand/70">
            <span className="flex items-center gap-1.5 text-pink">
              <span className="home-rec block h-1.5 w-1.5 rounded-full bg-pink" /> REC
            </span>
            <span className="truncate font-hand text-[15px] normal-case tracking-normal text-sand/85">{homeHero.caption}</span>
          </div>

          <div className="hidden text-right sm:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={alt}
                className="font-serif text-[1rem] italic text-sand/70"
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                {homeHero.alternates[alt]}
              </motion.p>
            </AnimatePresence>
          </div>

          <a href="#about" className="flex shrink-0 items-center gap-2 text-[10px] tracked text-sand/70 hover:text-sand sm:hidden">
            {homeHero.scrollCue}
            <motion.span
              className="block h-6 w-px bg-sand/60"
              animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
