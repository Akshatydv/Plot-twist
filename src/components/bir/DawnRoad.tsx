"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { dawnRoad, sequences } from "@/content/bir";
import { FrameStack, useCalm } from "./Scenery";


const ROAD_D = "M-20,380 C160,360 240,300 380,300 S560,330 640,270 S780,170 880,190 S980,150 1020,140";

/**
 * ~~ DAY 01 → DAY 02: NIGHT → SUNRISE → ROAD → BIR.
 *
 * One sticky frame, one continuous change of light. The sky interpolates
 * night → blue hour → gold → morning; the stars die in the first third; a
 * sun lifts behind the ridge; and a road draws itself across the valley to
 * a pin. The clock in the corner is the only text that moves on its own.
 *
 * The light is photographed, not drawn: stars over a camp, a Himalayan
 * sunrise, a road in morning mist (content/bir.ts → sequences.dawn).
 */
export function DawnRoad() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

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
        {/* real light, frame by frame: the stars over camp, the sunrise, the road out */}
        <FrameStack
          frames={sequences.dawn}
          active={[0, 1, 1, 2][shown]}
          tint="linear-gradient(to bottom, rgba(8,10,14,0.55) 0%, rgba(8,10,14,0.15) 45%, rgba(8,10,14,0.5) 100%)"
        />

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
              <span className={`block font-serif text-[clamp(3.5rem,14vw,9rem)] leading-none tabular-nums text-[var(--bir-bone)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]`}>
                {dawnRoad.times[shown]}
              </span>
              <span className={`mt-3 block font-serif text-[clamp(1.4rem,4vw,2.6rem)] italic text-[var(--bir-bone)]/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]`}>
                {dawnRoad.lines[shown]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
