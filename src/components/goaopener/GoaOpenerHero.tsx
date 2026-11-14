"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/content/site";
import { goaOpenerHero } from "@/content/goaOpener";
import { PLOT_EVENTS } from "@/lib/analytics";
import { JourneyMenu } from "../JourneyMenu";
import { Note, PlotButton } from "../Bits";
import { MarkerUnderline } from "../Brush";
import { GoaSwitcher } from "./GoaEditions";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE SEASON OPENER'S COLD OPEN.
 *
 * Same masthead, same type system and same button as the New Year's hero, so
 * the two Goa pages are plainly one family. The ground is what changes: New
 * Year's is a sunset and a party; this is a real photograph from the October
 * trip in daylight, under the same warm scrim, because the opener is the
 * daytime Goa. Nothing here states a date as fixed — the window is the date.
 */
export function GoaOpenerHero() {
  const reduce = useReducedMotion();
  const inFrom = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#1a0d0a] text-sand" id="top">
      <Image
        src={goaOpenerHero.photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: goaOpenerHero.photo.focal }}
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(26,13,10,.55) 0%,rgba(26,13,10,.12) 34%,rgba(26,13,10,.5) 62%,rgba(26,13,10,.94) 100%),linear-gradient(90deg,rgba(43,15,28,.5) 0%,transparent 62%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 lg:px-14">
        <header className="flex items-start justify-between gap-4">
          <motion.div {...inFrom(0.05)}>
            <JourneyMenu tone="warm" />
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

        <motion.div
          className="pointer-events-none absolute right-5 top-[22%] max-w-[8.5rem] -rotate-[4deg] text-right sm:right-8 sm:top-[19%] sm:max-w-[10.5rem] lg:right-14 lg:top-[17%] lg:max-w-[12rem]"
          initial={reduce ? undefined : { opacity: 0, y: 14, rotate: -9 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.8, delay: 0.56, ease }}
        >
          <span className="block font-brush text-[clamp(1.5rem,4.6vw,2.4rem)] leading-none text-[#FFE9A8] [text-shadow:0_2px_16px_rgba(10,2,10,0.6)]">
            {goaOpenerHero.ageNote.headline}
          </span>
          <span className="mt-1.5 block font-hand text-[clamp(0.85rem,1.9vw,1.05rem)] leading-[1.15] text-sand/90 [text-shadow:0_2px_12px_rgba(10,2,10,0.55)]">
            {goaOpenerHero.ageNote.line}
          </span>
        </motion.div>

        <div className="mt-auto max-w-[22rem] pt-16 sm:max-w-[32rem] sm:pt-20 lg:max-w-[48rem]">
          <motion.p className="mb-4 font-display text-[clamp(0.95rem,3.4vw,1.35rem)] tracking-[0.14em] text-[#FFE9A8]" {...inFrom(0.28)}>
            {goaOpenerHero.eyebrow}
          </motion.p>
          <h1 className="relative">
            <motion.span className="block font-serif text-[clamp(3rem,11.5vw,7.5rem)] leading-[0.88] tracking-[-0.02em]" {...inFrom(0.38)}>
              {goaOpenerHero.line1}
            </motion.span>
            <motion.span className="relative block pl-[0.04em] font-brush text-[clamp(3.1rem,12vw,7.8rem)] leading-[0.98] text-[#FFE9A8]" {...inFrom(0.5)}>
              {goaOpenerHero.line2}
              <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-[72%]" />
            </motion.span>
          </h1>
          <motion.p
            className="mt-5 max-w-[26ch] font-display text-[clamp(1.3rem,4.4vw,2.3rem)] uppercase leading-[1.05] tracking-[-0.005em] text-sand sm:max-w-[34ch]"
            {...inFrom(0.6)}
          >
            {goaOpenerHero.secondary}
          </motion.p>
          <motion.p className="mt-3 font-serif text-[clamp(1.05rem,2.6vw,1.4rem)] italic leading-[1.2] text-sand/70" {...inFrom(0.7)}>
            {goaOpenerHero.subheading}
          </motion.p>
          <motion.div className="relative mt-6 max-w-[30rem]" {...inFrom(0.78)}>
            <p className="font-display text-[clamp(1.05rem,3.4vw,1.5rem)] uppercase tracking-[0.03em] text-sand">{goaOpenerHero.tripLine}</p>
          </motion.div>
          <motion.div {...inFrom(0.82)}>
            <GoaSwitcher current="opener" />
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div className="flex flex-wrap items-center gap-x-5 gap-y-3" {...inFrom(0.9)}>
            <PlotButton href={goaOpenerHero.cta.href} bg="#FFF1DC" fg="#1A0D0A" shadow="#FF4F87" event={PLOT_EVENTS.requestInvite}>
              {goaOpenerHero.cta.label}
            </PlotButton>
            <Note className="block text-[1.25rem] text-[#FFE9A8]" rotate={-4}>
              {goaOpenerHero.annotation}
            </Note>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
