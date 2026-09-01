"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/content/site";
import { goaHero } from "@/content/goa";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Logo } from "../Logo";
import { SunsetBackdrop } from "../SunsetBackdrop";
import { Note, PlotButton } from "../Bits";
import { MarkerUnderline } from "../Brush";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE COLD OPEN.
 *
 * Structurally the same hero as Journey 01's — same backdrop, same masthead,
 * same headline proportions, same button. Two deliberate differences, and they
 * are the whole point of this page:
 *
 * 1. The eyebrow states GOA · OCTOBER 2026 outright, in the highest-attention
 *    slot on the site. The mystery hero withholds it; this one leads with it.
 * 2. A four-fact strip sits under the headline, so a visitor arriving cold
 *    from an ad knows the cast size, the length, the split and the age range
 *    before they have scrolled a single pixel.
 *
 * The CTA is the real one — REQUEST YOUR INVITE — rather than a scroll nudge.
 * Someone who already knows they want in should not have to hunt for the way.
 */
export function GoaHero() {
  const reduce = useReducedMotion();
  const inFrom = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: d, ease },
        };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden text-sand" id="top">
      <SunsetBackdrop />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 lg:px-14">
        {/* masthead — unchanged from the shared hero */}
        <header className="flex items-start justify-between gap-4">
          <motion.div {...inFrom(0.05)}>
            <Logo className="text-[15px] sm:text-[19px]" />
          </motion.div>
          <motion.div className="pt-2 text-right" {...inFrom(0.18)}>
            <div className="flex flex-wrap justify-end gap-x-2 gap-y-1 text-[10px] tracked text-sand/80 sm:text-[11px]">
              {brand.metaNav.map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {item}
                  {i < brand.metaNav.length - 1 && <span className="pl-2 text-sand/45">/</span>}
                </span>
              ))}
            </div>
            <div className="mt-2 font-hand text-lg leading-none text-sand/70 sm:text-xl">{brand.instagram}</div>
          </motion.div>
        </header>

        {/* headline block */}
        <div className="mt-auto max-w-[22rem] pt-16 sm:max-w-[32rem] sm:pt-20 lg:max-w-[48rem]">
          {/* THE REVEAL — destination and date, stated flat, before anything else */}
          <motion.p
            className="mb-4 font-display text-[clamp(0.95rem,3.4vw,1.35rem)] tracking-[0.14em] text-[#FFE9A8]"
            {...inFrom(0.28)}
          >
            {goaHero.eyebrow}
          </motion.p>

          <h1 className="relative">
            <motion.span
              className="block font-serif text-[clamp(3rem,11.5vw,7.5rem)] leading-[0.88] tracking-[-0.02em]"
              {...inFrom(0.38)}
            >
              {goaHero.line1}
            </motion.span>
            <motion.span
              className="relative block pl-[0.04em] font-brush text-[clamp(3.1rem,12vw,7.8rem)] leading-[0.98] text-[#FFE9A8]"
              {...inFrom(0.5)}
            >
              {goaHero.line2}
              <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-[72%]" />
            </motion.span>
            <motion.span
              className="mt-6 block font-serif text-[clamp(1.2rem,3.4vw,2.1rem)] italic leading-[1.1] text-sand/95"
              {...inFrom(0.64)}
            >
              {goaHero.sub}
            </motion.span>
          </h1>

          {/*
            THE FACT STRIP — the entire offer in four chips. Wraps to two rows
            on the narrowest phones rather than scrolling sideways, which is
            why it's a flex-wrap and not a single nowrap line.
          */}
          <motion.ul
            className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:gap-x-3"
            {...inFrom(0.74)}
          >
            {goaHero.facts.map((fact) => (
              <li
                key={fact}
                className="border border-sand/30 bg-ink/25 px-2.5 py-1.5 text-[9.5px] font-semibold tracked text-sand/90 backdrop-blur-sm sm:px-3 sm:text-[10.5px]"
              >
                {fact}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* footer row */}
        <div className="mt-8 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.div className="flex flex-col gap-5" {...inFrom(0.84)}>
            <p className="font-display text-[clamp(1rem,3.6vw,1.5rem)] tracking-[0.02em] text-sand">
              {goaHero.support}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <PlotButton
                href={goaHero.cta.href}
                bg="#FFF1DC"
                fg="#1A0D0A"
                shadow="#FF4F87"
                event={PLOT_EVENTS.requestInvite}
              >
                {goaHero.cta.label}
              </PlotButton>
              <Note className="block text-[1.25rem] text-[#FFE9A8]" rotate={-4}>
                {goaHero.annotation}
              </Note>
            </div>
          </motion.div>

          <motion.a
            href="#chapters"
            className="flex items-center gap-3 self-start text-[10px] tracked text-sand/70 transition-colors hover:text-sand sm:self-end"
            {...inFrom(0.94)}
          >
            {goaHero.scrollCue}
            <motion.span
              className="block h-8 w-px bg-sand/60"
              animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
