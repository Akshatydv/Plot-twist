"use client";

import { motion } from "framer-motion";
import { birIndex, journey } from "@/content/bir";
import { Note, SectionLabel } from "../Bits";
import { Clouds, Focus, MaskLines, Ridge, useCalm } from "./Scenery";

/**
 * 01 · THE JOURNEY — you've landed. The argument, and the table of contents.
 *
 * Lives on the same pine ground the hero landed on, so the first frame here
 * is the last frame of the descent. The four worlds are the only "overview"
 * the page ever gives, and they are given as a film's chapter list — a name,
 * a place, three words — never as an itinerary.
 */
export function TheJourney() {
  const reduce = useCalm();
  return (
    <section id="the-journey" data-hud="day1" className="relative overflow-hidden bg-[var(--bir-pine)] px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:px-14">
      {/* low fog still hanging from the descent */}
      <Clouds color="rgba(143,177,168,0.14)" banks={3} speed={0.6} className="h-[60%]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel index={birIndex("journey")} label={journey.label} color="#EFE9DD" />

        <MaskLines
          lines={journey.lead}
          className="mt-8 font-serif text-[clamp(2.3rem,7.4vw,6rem)] leading-[0.92] tracking-[-0.02em] text-[var(--bir-bone)]"
        />
        <Focus delay={0.3}>
          <p className="mt-6 font-serif text-[clamp(1.5rem,4.2vw,3rem)] italic leading-[1.05] text-[var(--bir-ember)]">{journey.turn}</p>
        </Focus>
        <Focus delay={0.45}>
          <p className="mt-8 max-w-[52ch] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.6] text-[var(--bir-bone)]/70">{journey.body}</p>
        </Focus>

        {/* the four worlds — a chapter list, not cards */}
        <ol className="mt-16 grid gap-x-8 gap-y-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {journey.worlds.map((w, i) => (
            <motion.li
              key={w.day}
              className="relative pt-5"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-full origin-left"
                style={{ background: w.tone }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[10px] tracked" style={{ color: w.tone }}>
                DAY {w.day} · {w.place.toUpperCase()}
              </span>
              <span className="mt-2 block font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-none text-[var(--bir-bone)]">{w.name}</span>
              <span className="mt-2 block text-[0.95rem] text-[var(--bir-bone)]/55">{w.feel}</span>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 text-right">
          <Note className="text-[1.5rem] text-[var(--bir-river)]" rotate={-4}>
            {journey.scribble}
          </Note>
        </div>
      </div>

      {/* the valley floor, waiting at the bottom edge */}
      <Ridge name="hills" fill="#0b1510" className="h-24 sm:h-36" />
    </section>
  );
}
