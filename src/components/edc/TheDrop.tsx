"use client";

import { motion, useReducedMotion } from "framer-motion";
import { drop } from "@/content/thailand";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Note, PlotButton } from "../Bits";
import { Haze, LaserSweep, SoundWave } from "./Neon";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE DROP — the emotional peak, and the section where the page stops
 * behaving like a website.
 *
 * ─── WHAT IS DELIBERATELY MISSING ───────────────────────────────────────────
 * No section label. No section number. No photograph. No body copy. No
 * two-column anything. Every other section on this site announces itself with
 * a slate; this one doesn't, and that absence is what makes it land as a
 * different kind of moment rather than as section 03 of 07.
 *
 * ─── THE SEQUENCE ───────────────────────────────────────────────────────────
 *   1. black, and a hairline of cyan drawing across
 *   2. the soundwave rising from the centre outward
 *   3. ELECTRIC. / LOUD. / UNREAL. — one line at a time, 0.42s apart, which
 *      is nearly five times the site's default 0.09s stagger. An announcement
 *      is paced, not listed.
 *   4. EDC THAILAND — the payoff, at the largest type size on the site
 *   5. a beat of nothing
 *   6. "and you're going with the plot." — handwritten, small, off-axis
 *
 * ─── STEP 6 IS THE ENTIRE SECTION ───────────────────────────────────────────
 * The scale drop from the payoff line to the handwriting is the whole idea:
 * the loudest type on the site, immediately followed by a person's
 * handwriting. Every festival page can do step 4. None of them do step 6, and
 * it is the thing that keeps this unmistakably Plot Twist rather than a
 * generic EDM splash.
 *
 * ─── AND IT NEEDS NO ASSETS ─────────────────────────────────────────────────
 * Which is why this section is finished today while several others carry
 * placeholders. It was designed that way on purpose.
 */
export function TheDrop() {
  const reduce = useReducedMotion();

  const line = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 34, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.75, delay: i * 0.42, ease },
        };

  return (
    <section
      id="the-drop"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0a0414] px-5 py-14 text-center sm:px-8 sm:py-16"
    >
      {/* Two planes here and only here — this is the one section where the
          light is the subject rather than the atmosphere. */}
      <LaserSweep className="left-[-20%] opacity-90" />
      <LaserSweep className="right-[-25%] opacity-70" slow delay={3} />
      <Haze className="left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      <div className="relative w-full max-w-[1100px]">
        {/* 1 — the hairline */}
        <motion.div
          className="mx-auto h-px w-full max-w-[520px]"
          style={{ background: "linear-gradient(90deg,transparent,#8B3DFF,#FF2E7E,transparent)" }}
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease }}
          aria-hidden
        />

        {/* 2 — the wave */}
        <div className="mx-auto mt-6 h-12 w-full max-w-[720px] sm:mt-8 sm:h-20">
          <SoundWave half className="sm:hidden" />
          <SoundWave className="hidden sm:flex" />
        </div>

        {/* 3 — the announcement */}
        <div className="mt-7 sm:mt-10">
          {drop.lines.map((l, i) => (
            <motion.p
              key={l}
              className="font-display text-[clamp(2.1rem,9.5vw,5.2rem)] uppercase leading-[0.9] tracking-[-0.015em] text-sand/85"
              {...line(i)}
            >
              {l}
            </motion.p>
          ))}

          {/* 4 — the payoff. The largest type on the site. */}
          <motion.p
            className="mt-3 font-display text-[clamp(2.5rem,12vw,7rem)] uppercase leading-[0.86] tracking-[-0.02em] text-sand edc-glow-max"
            {...line(drop.lines.length)}
          >
            {drop.payoff}
          </motion.p>
        </div>

        {/* 5/6 — the beat, then the handwriting. The delay is longer than any
            other on the page: the silence is doing work. */}
        <motion.div
          className="mt-7 flex flex-col items-center gap-1"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: (drop.lines.length + 1) * 0.42 + 0.35, ease }}
        >
          <Note className="block text-[clamp(1.5rem,5vw,2.4rem)] text-sand/85" rotate={-4}>
            {drop.aside}
          </Note>
          <span className="edc-meta mt-4 !text-[9px]">{drop.meta}</span>
        </motion.div>

        {/* The CTA at maximum emotion. First person on purpose — the visitor
            says it, we don't. */}
        <motion.div
          className="mt-7 flex justify-center"
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: (drop.lines.length + 1) * 0.42 + 0.7, ease }}
        >
          <PlotButton
            href={drop.cta.href}
            bg="#FF4F87"
            fg="#FFF1DC"
            shadow="#FF2E7E"
            event={PLOT_EVENTS.requestInvite}
          >
            {drop.cta.label}
          </PlotButton>
        </motion.div>
      </div>
    </section>
  );
}
