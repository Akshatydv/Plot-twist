"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { day4, media, sequences } from "@/content/bir";

/** The same sunrise the Day 01→02 transition uses: one morning, seen twice. */
const dawnSlot = sequences.dawn[1];
import { DayCard } from "./DayCard";
import { Embers, Focus, Footage, MaskLines, Ridge, useCalm } from "./Scenery";

/**
 * DAY 04 — THE WAY HOME. The epilogue.
 *
 * World: nostalgic, reflective. Dawn paper, peach, slate.
 * Motion: decelerating. Everything here moves slower than anything above
 * it, and the page gets MORE spacious, not less — the exhale.
 *
 *   embers → dawn   the ritual's fire rises into the morning
 *   the card        a pale sunrise over ranges already going soft
 *   the moments     slow morning … the road — one line at a time, lots of air
 *   the end         EVERY GOOD JOURNEY HAS AN END. / BUT YOU DON'T GO HOME THE SAME.
 *   the road        the mountains shrink in the back window
 */
export function DayFour() {
  return (
    <div className="relative">
      <EmberDawn />
      <DayCard
        id={day4.id}
        hud="day4"
        day={day4.day}
        emoji={day4.emoji}
        name={day4.name}
        ground="#F1E6D6"
        ink="#3b464c"
        accent="#A95F38"
        scene={(p) => <DawnScene p={p} />}
        slot={media.day4}
        tint="linear-gradient(to bottom, rgba(241,230,214,0.5) 0%, rgba(241,230,214,0.45) 45%, rgba(241,230,214,0.95) 100%)"
      />
      <Moments />
      <TheEnd />
      <RoadHome />
    </div>
  );
}

/** ~~ Day 03 → 04: campfire → embers → sunrise → road. */
function EmberDawn() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const blue = useTransform(p, [0.2, 0.5], [0, 1]);
  const dawn = useTransform(p, [0.45, 0.85], [0, 1]);
  const embers = useTransform(p, [0.3, 0.65], [1, 0]);

  if (reduce) return <section ref={ref} className="h-24 bg-[#F1E6D6]" aria-hidden />;

  return (
    <section ref={ref} data-hud="day4" aria-label="The fire burns down into morning" className="relative h-[200svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#140a06]">
        <motion.div className="absolute inset-0" style={{ opacity: blue, background: "linear-gradient(to bottom, #2b3550 0%, #6b5a6a 70%, #8a6a5a 100%)" }} />
        <motion.div className="absolute inset-0" style={{ opacity: dawn }}>
          {/* the fire burns down and the next morning comes up — a real sunrise */}
          <Footage slot={dawnSlot} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F1E6D6]" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: embers }}>
          <Embers density={1.2} />
        </motion.div>
        <div className="grain pointer-events-none absolute inset-0" />
      </div>
    </section>
  );
}

function DawnScene({ p }: { p: MotionValue<number> }) {
  const far = useTransform(p, [0, 1], ["0%", "10%"]);
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #e3e6e4 0%, #f1e6d6 50%, #f1e6d6 100%)" }} />
      <Ridge name="peaks" fill="#d8d9d4" className="h-[52%]" y={far} />
      <Ridge name="mid" fill="#c4c6c0" className="h-[36%]" y={far} />
      <Ridge name="front" fill="#e6d7c2" className="h-[20%]" />
    </>
  );
}

/**
 * The epilogue's moments, one photograph each, alternating sides with a lot
 * of air between them — the page slowing down, frame by frame.
 */
function Moments() {
  const reduce = useCalm();
  return (
    <section data-hud="day4" className="relative bg-[#F1E6D6] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      <ul className="mx-auto max-w-[1100px] space-y-[10svh] sm:space-y-[14svh]">
        {day4.moments.map((m, i) => {
          const ph = sequences.home[i];
          return (
            <motion.li
              key={m}
              className={`flex flex-col gap-5 sm:items-end sm:gap-10 ${i % 2 ? "sm:flex-row-reverse" : "sm:flex-row"}`}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e3d6c3] sm:w-[58%]">
                {ph?.image && (
                  <Image src={ph.image} alt={ph.alt ?? ""} fill sizes="(max-width: 640px) 100vw, 640px" className="bir-grade object-cover [filter:saturate(0.8)_sepia(0.12)]" style={{ objectPosition: ph.focus }} />
                )}
              </div>
              <p className={`font-serif text-[clamp(1.8rem,5.5vw,4rem)] italic leading-none text-[#3b464c] ${i % 2 ? "sm:text-right" : ""}`}>{m}</p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

function TheEnd() {
  return (
    <section data-hud="day4" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#2b2622] px-5 py-24 sm:px-8 lg:px-14">
      <Footage slot={media.end} drift />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1916]/90 via-[#1c1916]/40 to-[#1c1916]/30" />
      <div className="grain pointer-events-none absolute inset-0" />
      <MaskLines lines={day4.end} className="relative font-serif text-[clamp(2.6rem,9vw,8rem)] leading-[0.9] tracking-[-0.025em] text-[#F1E6D6]" />
      <Focus delay={0.6}>
        <p className="relative mt-10 text-[clamp(1rem,2.6vw,1.6rem)] font-semibold tracked text-[#E8B48A]">{day4.turn}</p>
      </Focus>
    </section>
  );
}

/**
 * The back window. Mountains shrink and sink into the haze as the road runs
 * toward you; a small progress line runs BIR → DELHI underneath.
 */
function RoadHome() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const shrink = useTransform(p, [0, 1], [1, 0.45]);
  const sink = useTransform(p, [0, 1], ["0%", "22%"]);
  const haze = useTransform(p, [0.2, 1], [0, 0.85]);
  const dash = useTransform(p, [0, 1], [0, -600]);
  const trip = useTransform(p, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section ref={ref} data-hud="day4" aria-label="The road back to Delhi" className={reduce ? "relative h-[100svh]" : "relative h-[240svh]"}>
      <div className={`${reduce ? "relative" : "sticky top-0"} h-[100svh] overflow-hidden bg-[#F1E6D6]`}>
        <Footage slot={media.road}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #dfe3e2 0%, #f1e6d6 58%, #e6d4bc 100%)" }} />
          <motion.div className="absolute inset-x-0 bottom-[36%] top-0" style={{ scaleY: reduce ? undefined : shrink, y: reduce ? undefined : sink, transformOrigin: "50% 100%" }}>
            <Ridge name="wide" fill="#c3c9cb" className="h-[80%]" />
            <Ridge name="peaks" fill="#a4aeb2" className="h-[62%]" />
            <Ridge name="mid" fill="#7f8b90" className="h-[44%]" />
          </motion.div>
          <motion.div className="absolute inset-x-0 bottom-[36%] top-0 bg-[#F1E6D6]" style={{ opacity: reduce ? 0.3 : haze }} />
          {/* the road, running toward the camera */}
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[36%] w-full" aria-hidden>
            <path d="M470,0 L530,0 L1000,400 L0,400 Z" fill="#5D6B73" />
            <path d="M0,0 L1000,0 L1000,6 L0,6 Z" fill="#c9bfae" />
            <motion.path d="M500,0 L500,400" stroke="#F1E6D6" strokeWidth="10" strokeDasharray="30 40" style={{ strokeDashoffset: reduce ? 0 : dash }} />
          </svg>
        </Footage>
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />

        {/* a paper wash across the top so the caption reads over a photograph too */}
        {media.road.image && <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[45%] bg-gradient-to-b from-[#F1E6D6]/85 to-transparent" />}
        {/* over the pale sky, not the road — slate on paper stays legible */}
        <div className="absolute inset-x-0 top-0 z-10 px-5 pt-16 sm:px-8 sm:pt-20 lg:px-14">
          <p className="max-w-[30ch] font-serif text-[clamp(1.4rem,3.6vw,2.4rem)] italic leading-[1.1] text-[#3b464c]">{day4.road.note}</p>
          <div className="mt-6 flex max-w-[520px] items-center gap-3 text-[10px] font-semibold tracked text-[#3b464c]">
            <span>{day4.road.from}</span>
            <span className="relative h-px flex-1 bg-[#3b464c]/30">
              <motion.span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8B48A]" style={{ left: reduce ? "100%" : trip }} />
            </span>
            <span>{day4.road.to}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
