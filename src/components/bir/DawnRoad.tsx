"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { dawnRoad } from "@/content/bir";
import { Ridge, Stars, useCalm } from "./Scenery";

const SKIES = [
  "linear-gradient(to bottom, #04070c 0%, #0a1320 70%)",
  "linear-gradient(to bottom, #1d2a4a 0%, #4a3f5c 70%)",
  "linear-gradient(to bottom, #e0925e 0%, #f3c98a 70%)",
  "linear-gradient(to bottom, #8fb9d6 0%, #dde9ef 70%)",
];

const ROAD_D = "M-20,380 C160,360 240,300 380,300 S560,330 640,270 S780,170 880,190 S980,150 1020,140";

/**
 * ~~ DAY 01 → DAY 02: NIGHT → SUNRISE → ROAD → BIR.
 *
 * One sticky frame, one continuous change of light. The sky interpolates
 * night → blue hour → gold → morning; the stars die in the first third; a
 * sun lifts behind the ridge; and a road draws itself across the valley to
 * a pin. The clock in the corner is the only text that moves on its own.
 *
 * The night ridge and the day ridge are two layers crossfaded, rather than
 * one ridge with an animated fill — opacity is free on the compositor,
 * colour is not.
 */
export function DawnRoad() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // four skies stacked and crossfaded — opacity only, no per-frame repaint
  const blue = useTransform(p, [0.1, 0.3], [0, 1]);
  const gold = useTransform(p, [0.35, 0.55], [0, 1]);
  const morning = useTransform(p, [0.65, 0.85], [0, 1]);
  const stars = useTransform(p, [0, 0.28], [1, 0]);
  const sunY = useTransform(p, [0.25, 0.85], ["70%", "8%"]);
  const sunO = useTransform(p, [0.22, 0.4], [0, 1]);
  const night = useTransform(p, [0.3, 0.6], [1, 0]);
  const road = useTransform(p, [0.5, 0.92], [0, 1]);
  const pin = useTransform(p, [0.86, 0.94], [0, 1]);

  const [beat, setBeat] = useState(reduce ? 3 : 0);
  useMotionValueEvent(p, "change", (v) => {
    const b = v < 0.2 ? 0 : v < 0.4 ? 1 : v < 0.7 ? 2 : 3;
    setBeat((c) => (c === b ? c : b));
  });
  const shown = reduce ? 3 : beat;

  return (
    <section ref={ref} data-hud="day2" aria-label="Night into morning, Barot to Bir" className={reduce ? "relative" : "relative h-[260svh]"}>
      <div className={`${reduce ? "relative h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        <div className="absolute inset-0" style={{ background: SKIES[0] }} />
        <motion.div className="absolute inset-0" style={{ background: SKIES[1], opacity: reduce ? 0 : blue }} />
        <motion.div className="absolute inset-0" style={{ background: SKIES[2], opacity: reduce ? 0 : gold }} />
        <motion.div className="absolute inset-0" style={{ background: SKIES[3], opacity: reduce ? 1 : morning }} />
        {!reduce && <Stars opacity={stars} />}
        <motion.div
          className="absolute left-[30%] h-[36vmin] w-[36vmin] -translate-x-1/2 rounded-full"
          style={{
            top: reduce ? "8%" : sunY,
            opacity: reduce ? 1 : sunO,
            background: "radial-gradient(circle, #fff4d6 0%, #ffd08a 30%, rgba(255,170,90,0.35) 55%, transparent 70%)",
          }}
        />

        {/* day ridges underneath, night ridges crossfading off the top of them */}
        <Ridge name="peaks" fill="#9cb3c4" className="h-[62%]" />
        <Ridge name="mid" fill="#5f7d86" className="h-[46%]" />
        <Ridge name="front" fill="#3c5a4c" className="h-[30%]" />
        {!reduce && (
          <motion.div className="absolute inset-0" style={{ opacity: night }}>
            <Ridge name="peaks" fill="#0f1a24" className="h-[62%]" />
            <Ridge name="mid" fill="#0a1216" className="h-[46%]" />
            <Ridge name="front" fill="#070d0b" className="h-[30%]" />
          </motion.div>
        )}

        {/* the road */}
        <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[34%] w-full" aria-hidden>
          <path d={ROAD_D} stroke="rgba(16,19,17,0.35)" strokeWidth="18" fill="none" strokeLinecap="round" />
          <motion.path d={ROAD_D} stroke="#EFE9DD" strokeWidth="3" strokeDasharray="10 12" fill="none" style={{ pathLength: reduce ? 1 : road }} />
        </svg>
        <motion.div
          className="absolute right-[4%] top-[58%] flex flex-col items-center sm:right-[6%]"
          style={{ opacity: reduce ? 1 : pin }}
        >
          <span className="bg-[var(--bir-char)] px-3 py-1.5 text-[11px] font-semibold tracked text-[var(--bir-bone)]">{dawnRoad.pin}</span>
          <span className="h-6 w-px bg-[var(--bir-char)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--bir-fire)]" />
        </motion.div>
        <div className="grain pointer-events-none absolute inset-0" />

        {/* the clock and the line */}
        <div className="relative z-10 px-5 pt-16 sm:px-8 lg:px-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={shown}
              initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.6 }}
            >
              <span className={`block font-serif text-[clamp(3.5rem,14vw,9rem)] leading-none tabular-nums ${shown < 2 ? "text-[var(--bir-bone)]" : "text-[var(--bir-char)]"}`}>
                {dawnRoad.times[shown]}
              </span>
              <span className={`mt-3 block font-serif text-[clamp(1.4rem,4vw,2.6rem)] italic ${shown < 2 ? "text-[var(--bir-bone)]/80" : "text-[var(--bir-char)]/80"}`}>
                {dawnRoad.lines[shown]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
