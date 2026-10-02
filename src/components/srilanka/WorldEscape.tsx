"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { world1 } from "@/content/srilanka";
import { Note } from "../Bits";
import { Footage, MaskLines, Stars, useCalm } from "../bir/Scenery";
import { HorizontalReel, Tag, WorldCard } from "./Kit";

/**
 * WORLD 01 — 29 DEC — THE ESCAPE.
 *
 *   the card       → the wing coming down over a green coast
 *   the board      → DEPARTURES: every city flips to COLOMBO
 *   the roadtrip   → a sideways reel up into the hills, a route line filling under it
 *   ella at sunset → one pinned frame: the sky burns, the clock runs, night falls
 *
 * The chapter is warm (saffron) because it is the beginning: everything is
 * still daylight and adrenaline. It ends dark on purpose — the next world
 * starts at dawn.
 */
export function WorldEscape() {
  return (
    <div id={world1.id} data-world={world1.id} className="relative">
      <WorldCard n={world1.n} date={world1.date} name={world1.name} place={world1.place} lines={world1.lines} slot={world1.slot} tone={world1.tone} />
      <DepartureBoard />
      <RoadTrip />
      <EllaSunset />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* the board                                                           */
/* ------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789→·";

/**
 * One split-flap cell row: the text riffles through random glyphs and settles
 * left to right, the way a real board does. Starts when the board scrolls
 * into view; under reduced motion it is simply the final text.
 */
function Flap({ text, start, delay = 0, className = "" }: { text: string; start: boolean; delay?: number; className?: string }) {
  const reduce = useCalm();
  const [shown, setShown] = useState(text.replace(/[^ ]/g, " "));

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setShown(text);
      return;
    }
    let frame = 0;
    let id = 0;
    const begin = window.setTimeout(() => {
      id = window.setInterval(() => {
        frame++;
        const settled = Math.floor(frame / 2);
        setShown(
          text
            .split("")
            .map((ch, i) => (ch === " " || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
        if (settled >= text.length) window.clearInterval(id);
      }, 45);
    }, delay);
    return () => {
      window.clearTimeout(begin);
      window.clearInterval(id);
    };
  }, [start, text, delay, reduce]);

  return (
    <span className={`inline-flex ${className}`} aria-hidden>
      {shown.split("").map((ch, i) => (
        <span key={i} className="relative mr-[2px] inline-block min-w-[0.68em] bg-[#121514] px-[0.06em] text-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)]">
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function DepartureBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const b = world1.board;

  return (
    <section className="relative overflow-hidden bg-[#0b0d0c] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Tag color="#F2A23A">{b.kicker}</Tag>
          <Note className="text-[1.4rem] text-[var(--sl-bone)]/60" rotate={-3}>
            {b.scribble}
          </Note>
        </div>

        <div ref={ref} className="mt-8 overflow-x-auto border border-white/10 bg-[#050606] p-3 sm:p-5">
          <table className="w-full min-w-[34rem] border-separate border-spacing-y-2 font-display text-[clamp(1rem,2.4vw,1.7rem)] uppercase text-[#F6C35A]">
            <caption className="sr-only">
              Departures to {b.to}: {b.rows.map((r) => r.from).join(", ")}. Status: {b.status}.
            </caption>
            <thead>
              <tr className="text-left font-sans text-[9px] font-semibold tracked text-white/40 sm:text-[10px]">
                <th className="pb-1 font-semibold">FROM</th>
                <th className="pb-1 font-semibold">TO</th>
                <th className="pb-1 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={r.code}>
                  <td className="pr-4">
                    <Flap text={r.code} start={seen} delay={i * 260} />
                  </td>
                  <td className="pr-4">
                    <Flap text={b.to} start={seen} delay={i * 260 + 120} />
                  </td>
                  <td>
                    <Flap text={b.status} start={seen} delay={i * 260 + 260} className={i === b.rows.length - 1 ? "text-[var(--sl-hibiscus)]" : "text-[var(--sl-tea)]"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-[60ch] text-[0.95rem] leading-[1.55] text-[var(--sl-bone)]/60">{b.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the roadtrip                                                        */
/* ------------------------------------------------------------------ */

function RoadTrip() {
  const r = world1.road;
  return (
    <div className="relative bg-[#0b0d0c]">
      <div className="px-5 pb-12 pt-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <Tag color="#F2A23A">{r.kicker}</Tag>
          <MaskLines lines={r.title} className="mt-6 font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.86] text-[var(--sl-bone)]" />
          <p className="mt-6 max-w-[48ch] font-serif text-[clamp(1.25rem,3vw,1.9rem)] italic leading-[1.2] text-[var(--sl-bone)]/80">{r.body}</p>
        </div>
      </div>

      <HorizontalReel
        label={r.kicker}
        trackClassName="items-center gap-4 pl-5 pr-[12vw] sm:gap-6 sm:pl-8 lg:pl-14"
        lead={(p) => <RouteLine p={p} />}
      >
        {() =>
          r.frames.map((f, i) => (
            <figure key={f.word} className="relative h-[60svh] w-[84vw] shrink-0 snap-center sm:h-[68svh] overflow-hidden sm:w-[58vw] lg:w-[46vw]">
              <Footage slot={f.slot} sizes="(min-width: 1024px) 46vw, 84vw" mounted />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
              <span className="absolute left-4 top-4 font-display text-[13px] text-[var(--sl-saffron)]">0{i + 1}</span>
              <figcaption className="absolute inset-x-4 bottom-5 sm:inset-x-6 sm:bottom-7">
                <span className="block font-serif text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.9] text-[var(--sl-bone)]">{f.word}</span>
                <span className="mt-2 block font-hand text-[1.35rem] leading-tight text-[var(--sl-bone)]/75">{f.note}</span>
              </figcaption>
            </figure>
          ))
        }
      </HorizontalReel>
    </div>
  );
}

/** COLOMBO ●━━━━━● ELLA, filling as the reel travels. Pinned to the top of the reel's screen. */
function RouteLine({ p }: { p: import("framer-motion").MotionValue<number> }) {
  const w = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute inset-x-5 bottom-[96px] z-10 flex items-center sm:bottom-[6svh] gap-3 text-[10px] font-semibold tracked text-[var(--sl-bone)] sm:inset-x-8 lg:inset-x-14">
      <span>COLOMBO</span>
      <span className="relative h-px flex-1 bg-white/20">
        <motion.span className="absolute inset-y-0 left-0 bg-[var(--sl-saffron)]" style={{ width: w }} />
        <motion.span className="absolute -top-[5px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-[var(--sl-saffron)]" style={{ left: w }} />
      </span>
      <span className="text-[var(--sl-saffron)]">ELLA</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ella at sunset                                                      */
/* ------------------------------------------------------------------ */

/**
 * One pinned frame, one change of light. The clock runs, a line per beat,
 * the photograph sinks into a night wash, and the stars come out. The
 * transition into Day 02 is the dark itself.
 */
function EllaSunset() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const s = world1.sunset;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const night = useTransform(p, [0.35, 0.95], [0, 0.88]);
  const stars = useTransform(p, [0.7, 1], [0, 1]);
  const scale = useTransform(p, [0, 1], [1.12, 1]);
  const [beat, setBeat] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const b = Math.min(3, Math.floor(v * 4.2));
    setBeat((c) => (c === b ? c : b));
  });
  const shown = reduce ? 3 : beat;

  return (
    <section ref={ref} aria-label={s.title} className={reduce ? "relative" : "relative h-[280svh]"}>
      <div className={`${reduce ? "relative h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden bg-[#07090a]`}>
        <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
          <Footage slot={s.slot} />
        </motion.div>
        <motion.div className="absolute inset-0 bg-[#05070d]" style={{ opacity: reduce ? 0.5 : night }} />
        <motion.div className="absolute inset-0" style={{ opacity: reduce ? 1 : stars }}>
          <Stars />
        </motion.div>
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-12 pt-24 sm:px-8 lg:px-14">
          <div>
            <Tag color="#F2A23A">{s.kicker}</Tag>
            <AnimatePresence mode="wait">
              <motion.div
                key={shown}
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55 }}
                className="mt-5"
              >
                <span className="block font-display text-[clamp(3.8rem,15vw,11rem)] leading-none tabular-nums text-[var(--sl-bone)]">{s.times[shown]}</span>
                <span className="mt-2 block font-serif text-[clamp(1.5rem,4vw,2.8rem)] italic text-[var(--sl-bone)]/85">{s.lines[shown]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <h3 className="font-serif text-[clamp(3rem,11vw,9.5rem)] leading-[0.88] tracking-[-0.02em] text-[var(--sl-saffron)]">{s.title}</h3>
        </div>
      </div>
    </section>
  );
}
