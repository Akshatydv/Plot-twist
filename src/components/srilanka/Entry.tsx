"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { chapters, entry, slIndex } from "@/content/srilanka";
import { Note, SectionLabel } from "../Bits";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";

/**
 * ~~ THE ENTRY — the moment you go IN.
 *
 * One pinned screen, three beats, and the only effect on the page that is
 * allowed to be a show-off:
 *
 *   0.00–0.22  "Forget what you think a group trip looks like."  (black)
 *   0.22–0.40  "This one has a plot."                            (black)
 *   0.40–1.00  WELCOME TO SRI LANKA. — set in white on black, with the black
 *              layer multiplied over the jungle footage, so the island is
 *              only visible THROUGH the letters. Then the letters grow until
 *              you fall through them and the black is gone: you're inside.
 *
 * `mix-blend-mode: multiply` on one full-screen layer is the whole trick:
 * white × footage = footage, black × footage = black. No SVG mask, no canvas,
 * and it composites on a phone.
 *
 * Reduced motion: the welcome is shown flat over the footage, no flight.
 */
export function Entry() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const l1 = useTransform(p, [0.02, 0.08, 0.17, 0.22], [0, 1, 1, 0]);
  const l1y = useTransform(p, [0.02, 0.22], [24, -24]);
  const l2 = useTransform(p, [0.22, 0.28, 0.36, 0.41], [0, 1, 1, 0]);
  const l2s = useTransform(p, [0.22, 0.41], [0.94, 1.06]);
  const welcomeIn = useTransform(p, [0.4, 0.48], [0, 1]);
  const zoom = useTransform(p, [0.55, 0.92], [1, 26]);
  const black = useTransform(p, [0.8, 0.95], [1, 0]);

  if (reduce) {
    return (
      <section id="entry" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 sm:px-8 lg:px-14">
        <Footage slot={entry.inside} />
        <div className="absolute inset-0 bg-[#07090a]/55" />
        <div className="relative">
          <p className="font-serif text-[clamp(1.4rem,4vw,2.6rem)] italic text-[var(--sl-bone)]/85">{entry.lines.join(" ")}</p>
          <h2 className="mt-6 font-display text-[clamp(3.4rem,14vw,12rem)] leading-[0.85] text-[var(--sl-bone)]">
            {entry.welcome[0]} {entry.welcome[1]}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="entry" ref={ref} aria-label={`${entry.lines.join(" ")} ${entry.welcome.join(" ")}`} className="relative h-[420svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#07090a]">
        {/* the island, waiting behind the black */}
        <motion.div className="absolute inset-0" style={{ opacity: welcomeIn }}>
          <Footage slot={entry.inside} />
        </motion.div>

        {/* the knockout: black with white letters, multiplied over the footage */}
        <motion.div aria-hidden className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply" style={{ opacity: black }}>
          <motion.div className="text-center font-display uppercase leading-[0.82] text-white" style={{ scale: zoom, opacity: welcomeIn }}>
            <span className="block text-[clamp(2rem,8vw,6rem)] tracking-[0.02em]">{entry.welcome[0]}</span>
            <span className="block text-[clamp(4.2rem,19vw,17rem)] tracking-[-0.01em]">{entry.welcome[1]}</span>
          </motion.div>
        </motion.div>

        {/* the two lines before it */}
        <motion.p
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center font-serif text-[clamp(1.8rem,5.4vw,4.4rem)] italic leading-[1.05] text-[var(--sl-bone)] sm:inset-x-16"
          style={{ opacity: l1, y: l1y }}
        >
          {entry.lines[0]}
        </motion.p>
        <motion.p
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(2.6rem,9vw,8rem)] uppercase leading-[0.9] text-[var(--sl-saffron)]"
          style={{ opacity: l2, scale: l2s }}
        >
          {entry.lines[1]}
        </motion.p>
      </div>
    </section>
  );
}

/**
 * 01 · THE FILM — the only overview the page gives, and it's a chapter list,
 * not an itinerary. Seven rows; each one is a door into its world.
 */
export function FilmIndex() {
  const reduce = useCalm();
  return (
    <section className="relative overflow-hidden bg-[var(--sl-jungle)] px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel index={slIndex("film")} label={entry.index.label} color="#F4EDE1" />
        <MaskLines lines={[entry.index.lead]} className="mt-8 font-serif text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.02em] text-[var(--sl-bone)]" />
        <Focus delay={0.3}>
          <p className="mt-6 max-w-[54ch] text-[clamp(1rem,2.2vw,1.18rem)] leading-[1.6] text-[var(--sl-bone)]/70">{entry.index.body}</p>
        </Focus>

        <ol className="mt-14 border-t border-white/10 sm:mt-20">
          {chapters.map((c, i) => (
            <motion.li
              key={c.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-white/10"
            >
              <a href={`#${c.id}`} className="group relative grid grid-cols-[3.2rem_1fr_auto] items-baseline gap-x-4 py-5 sm:grid-cols-[5rem_7rem_1fr_auto] sm:py-6">
                {/* the row fills with the world's colour on hover */}
                <span aria-hidden className="absolute inset-y-0 left-0 w-0 opacity-15 transition-all duration-500 group-hover:w-full" style={{ background: c.tone }} />
                <span className="relative font-display text-[clamp(1.4rem,3vw,2rem)] tabular-nums" style={{ color: c.tone }}>
                  {c.n}
                </span>
                <span className="relative hidden text-[11px] font-semibold tracked text-white/55 sm:block">{c.date}</span>
                <span className="relative">
                  <span className="block font-serif text-[clamp(1.7rem,4.6vw,3.4rem)] leading-none text-[var(--sl-bone)] transition-transform duration-500 group-hover:translate-x-2">{c.name}</span>
                  <span className="mt-1.5 block text-[10px] tracked text-white/45 sm:text-[11px]">
                    <span className="sm:hidden">{c.date} · </span>
                    {c.place} · {c.feel}
                  </span>
                </span>
                <span aria-hidden className="relative text-white/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 text-right">
          <Note className="text-[1.5rem] text-[var(--sl-tea)]" rotate={-4}>
            {entry.index.scribble}
          </Note>
        </div>
      </div>
    </section>
  );
}
