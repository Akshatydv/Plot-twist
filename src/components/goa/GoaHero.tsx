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
 * 2. Below the (unchanged) YOU'VE FOUND THE PLOT. heading, a full copy
 *    hierarchy carries the offer: a secondary headline (the emotional hook),
 *    a lighter subheading, one branded trip-details line with its own
 *    tagline, and a floating handwritten 18–30 note — see goaHero in
 *    content/goa.ts for why each is its own field rather than one paragraph.
 *
 * NONE of this copy frames the cast as strangers or leans on the fact that
 * they haven't met — that framing (the old "20 people who haven't met yet",
 * "Come alone. Leave with 19 others.") was deliberately removed. The hero
 * leads with Goa, the trip and the people, not with the social premise.
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

        {/*
          THE 18–30 NOTE — written straight onto the photograph in the open
          space between the masthead and the headline block, the same slot
          Journey 01's hero uses for its handwritten side note. Deliberately
          NOT part of the trip-details cluster below: pinned in open air, on
          its own, is what makes it read as a scrapbook aside rather than a
          fifth statistic bolted onto the fact line.
        */}
        <motion.div
          className="pointer-events-none absolute right-5 top-[22%] max-w-[8.5rem] -rotate-[4deg] text-right sm:right-8 sm:top-[19%] sm:max-w-[10.5rem] lg:right-14 lg:top-[17%] lg:max-w-[12rem]"
          initial={reduce ? undefined : { opacity: 0, y: 14, rotate: -9 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.8, delay: 0.56, ease }}
        >
          <span className="block font-brush text-[clamp(1.5rem,4.6vw,2.4rem)] leading-none text-[#FFE9A8] [text-shadow:0_2px_16px_rgba(10,2,10,0.6)]">
            {goaHero.ageNote.headline}
          </span>
          <span className="mt-1.5 block font-hand text-[clamp(0.85rem,1.9vw,1.05rem)] leading-[1.15] text-sand/90 [text-shadow:0_2px_12px_rgba(10,2,10,0.55)]">
            {goaHero.ageNote.lines[0]}
            <br />
            {goaHero.ageNote.lines[1]}
          </span>
        </motion.div>

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
          </h1>

          {/* THE SECONDARY HEADLINE — the emotional hook, large but clearly
              subordinate to the h1 above it. */}
          <motion.p
            className="mt-5 max-w-[26ch] font-display text-[clamp(1.3rem,4.4vw,2.3rem)] uppercase leading-[1.05] tracking-[-0.005em] text-sand sm:max-w-[34ch]"
            {...inFrom(0.6)}
          >
            {goaHero.secondary}
          </motion.p>

          {/* THE SUBHEADING — lighter, smaller, a confident aside with room to breathe. */}
          <motion.p
            className="mt-3 font-serif text-[clamp(1.05rem,2.6vw,1.4rem)] italic leading-[1.2] text-sand/70"
            {...inFrom(0.7)}
          >
            {goaHero.subheading}
          </motion.p>

          {/*
            THE TRIP DETAILS — one branded line and a playful tagline, not a
            row of stat chips. The 18–30 note floats beside/over it rather than
            joining the line as a fifth statistic, which is what keeps it
            reading as a scrapbook aside instead of another data point.
          */}
          <motion.div className="relative mt-8 max-w-[30rem]" {...inFrom(0.82)}>
            <p className="font-display text-[clamp(1.05rem,3.4vw,1.5rem)] uppercase tracking-[0.03em] text-sand">
              {goaHero.tripLine}
            </p>
            <p className="mt-1.5 font-serif text-[clamp(0.95rem,2.3vw,1.15rem)] italic text-sand/70">
              {goaHero.tripTagline}
            </p>
          </motion.div>
        </div>

        {/* footer row */}
        <div className="mt-8 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.div className="flex flex-wrap items-center gap-x-5 gap-y-3" {...inFrom(0.9)}>
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
