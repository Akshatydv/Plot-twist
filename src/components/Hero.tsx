"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { brand, hero } from "@/content/site";
import { INTERNATIONAL_JOURNEY } from "@/content/journeys";
import { useJourney } from "./mystery/JourneyProvider";
import { JourneyMenu } from "./JourneyMenu";
import { SunsetBackdrop } from "./SunsetBackdrop";
import { Note, PlotButton } from "./Bits";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Arrow, MarkerUnderline } from "./Brush";
import { HiddenClue } from "./mystery/HiddenClue";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const journey = useJourney();
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
        {/* masthead */}
        <header className="flex items-start justify-between gap-4">
          <motion.div {...inFrom(0.05)}>
            {/* The mark is the menu — see components/JourneyMenu.tsx for why the
                navigation lives here rather than in a nav bar. */}
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
            {/* Hidden on the international journey itself — nobody needs a link to where they already are. */}
            {journey.id !== INTERNATIONAL_JOURNEY.id && (
              <Link
                href={`/journey/${INTERNATIONAL_JOURNEY.slug}`}
                className="mt-2 inline-block whitespace-nowrap text-[10px] font-semibold tracked text-pink underline decoration-pink/40 underline-offset-4 transition-colors hover:text-sand sm:text-[11px]"
              >
                GO INTERNATIONAL →
              </Link>
            )}
          </motion.div>
        </header>

        {/* written straight onto the photograph — an editorial statement, not a UI block */}
        <div className="pointer-events-none absolute right-5 top-[21%] max-w-[11.5rem] text-right sm:right-8 sm:top-[19%] sm:max-w-[14rem] lg:right-14 lg:top-[17%] lg:max-w-[16.5rem]">
          <Note
            className="block text-[clamp(1.5rem,5.6vw,2.5rem)] leading-[0.98] text-sand [text-shadow:0_2px_16px_rgba(10,2,10,0.6)]"
            rotate={-2}
          >
            {journey.hero.sideNote.big[0]}
          </Note>
          <Note
            className="relative mt-0.5 block text-[clamp(1.5rem,5.6vw,2.5rem)] leading-[0.98] text-sand [text-shadow:0_2px_16px_rgba(10,2,10,0.6)]"
            rotate={2}
          >
            {journey.hero.sideNote.big[1]}
            <MarkerUnderline color="#FF4F87" className="absolute -bottom-1.5 right-0 h-3 w-[85%]" />
          </Note>

          <Note
            className="relative mt-4 block text-[clamp(1.15rem,3.8vw,1.55rem)] leading-[1.05] text-sand [text-shadow:0_2px_12px_rgba(10,2,10,0.55)]"
            rotate={3}
          >
            {journey.hero.sideNote.invite}
          </Note>
        </div>

        {/* headline block */}
        <div className="mt-auto max-w-[22rem] pt-16 sm:max-w-[32rem] sm:pt-20 lg:max-w-[48rem]">
          <motion.p className="mb-4 text-[9px] tracked text-sand/70 sm:text-[11px]" {...inFrom(0.3)}>
            {journey.hero.eyebrow}
          </motion.p>

          <h1 className="relative">
            <motion.span
              className="block font-serif text-[clamp(3rem,11.5vw,7.5rem)] leading-[0.88] tracking-[-0.02em]"
              {...inFrom(0.38)}
            >
              {hero.line1}
            </motion.span>
            <motion.span
              className="relative block pl-[0.04em] font-brush text-[clamp(3.1rem,12vw,7.8rem)] leading-[0.98] text-[#FFE9A8]"
              {...inFrom(0.5)}
            >
              {hero.line2}
              <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-[72%]" />
            </motion.span>
            <motion.span
              className="mt-6 block font-serif text-[clamp(1.2rem,3.4vw,2.1rem)] italic leading-[1.1] text-sand/95"
              {...inFrom(0.64)}
            >
              {hero.sub}
            </motion.span>
          </h1>
        </div>

        {/* footer row */}
        <div className="mt-8 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.div className="flex flex-col gap-6" {...inFrom(0.78)}>
            <p className="font-display text-[clamp(1rem,3.6vw,1.5rem)] tracking-[0.02em] text-sand">
              {hero.support}
            </p>
            <div className="relative flex items-center">
              <PlotButton href={hero.cta.href} bg="#FFF1DC" fg="#1A0D0A" shadow="#FF4F87" event={PLOT_EVENTS.startPlot}>
                {hero.cta.label}
              </PlotButton>
              <div className="relative ml-4 hidden sm:block">
                <Arrow color="#FFE9A8" className="h-12 w-16 -scale-x-100 opacity-90" />
                <HiddenClue id="hero-annotation" className="absolute left-16 top-2 w-40">
                  <Note className="block text-xl text-[#FFE9A8]" rotate={-7}>
                    {hero.annotation}
                  </Note>
                </HiddenClue>
              </div>
            </div>
            <HiddenClue id="hero-annotation" className="sm:hidden">
              <Note className="block text-xl text-[#FFE9A8]" rotate={-4}>
                ↑ {hero.annotation}
              </Note>
            </HiddenClue>
          </motion.div>

          <motion.div className="flex items-center gap-3 self-start sm:self-end" {...inFrom(0.9)}>
            <span className="text-[10px] tracked text-sand/70">{hero.scrollHint}</span>
            <motion.span
              className="block h-8 w-px bg-sand/60"
              animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
