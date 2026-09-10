"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/content/site";
import { gate, stickers } from "@/content/thailand";
import { PLOT_EVENTS } from "@/lib/analytics";
import { JourneyMenu } from "../JourneyMenu";
import { Note, PlotButton } from "../Bits";
import { MarkerUnderline } from "../Brush";
import { HeroVideo, VideoCredit } from "./HeroVideo";
import { Sticker } from "./Sticker";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE GATE — the cold open.
 *
 * ─── WHAT IS UNCHANGED, AND WHY IT MATTERS MOST ─────────────────────────────
 * The masthead row, the marker underline, the floating handwritten note, the
 * single PlotButton and the scroll cue all sit in the same slots as Goa's and
 * Bali's heroes. Read this file next to GoaHero.tsx: the skeleton is the same.
 *
 * That is the entire reason this page can go as far as it does everywhere else.
 * A visitor arriving from the Goa page recognises the site in the first
 * half-second, and only then notices that everything behind it has changed.
 *
 * ─── THE ONE WORD THAT IS DIFFERENT ─────────────────────────────────────────
 * The other two heroes read "You've found / the plot." This one reads "You've
 * found / the EDC plot." — the brand's own sentence with the festival set
 * INSIDE it, in the display face, in sand with the page's brightest bloom
 * behind it.
 *
 * That is a bigger move than it looks. EDC is not announced above the headline
 * or appended after it; it is in the sentence the brand always says, which is
 * what makes this read as a Plot Twist chapter rather than a festival
 * microsite wearing a logo.
 *
 * ─── AND THE TYPE IS SMALLER THAN ANY OTHER HERO ON THE SITE ────────────────
 * Deliberate inversion, and the thing most likely to get "fixed" by someone
 * who has not read this. Goa's headline runs to 7.5rem because it has to
 * carry the screen alone. Here the FOOTAGE carries the screen, so the headline
 * only has to name the thing and get out of the way. Scaling it back up would
 * bury the crowd behind the copy, which is the one failure mode this hero has.
 *
 * ─── WHAT IS DELIBERATELY ABSENT FROM THE FIRST SCREEN ──────────────────────
 * Price, itinerary, inclusions, a nav bar, a second CTA, social proof. Same
 * discipline as both existing heroes. The footage is the dominant element and
 * nothing is allowed to compete with it.
 */
export function GateHero() {
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
      <HeroVideo />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 lg:px-14">
        {/* masthead — unchanged from the shared hero */}
        <header className="flex items-start justify-between gap-4">
          <motion.div {...inFrom(0.05)}>
            {/* The mark is the menu — see components/JourneyMenu.tsx for why the
                navigation lives here rather than in a nav bar. `night` gives it
                this page's palette instead of the sand-and-ink one. */}
            <JourneyMenu tone="night" />
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
          THE HANDWRITTEN NOTE — same slot as Goa's 18–30 note and Bali's side
          note: pinned in open air over the photography, on its own, not
          folded into the fact line below.

          On this page it is also the single most important element for brand
          identity. Caveat and Permanent Marker over festival footage is a
          combination no EDM site ships, and it is what stops the first screen
          reading as a generic rave splash.
        */}
        <motion.div
          className="pointer-events-none absolute right-5 top-[21%] max-w-[8.5rem] -rotate-[5deg] text-right sm:right-8 sm:top-[18%] sm:max-w-[10.5rem] lg:right-14 lg:top-[16%] lg:max-w-[12rem]"
          initial={reduce ? undefined : { opacity: 0, y: 14, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.8, delay: 0.56, ease }}
        >
          <span className="block font-brush text-[clamp(1.5rem,4.6vw,2.4rem)] leading-none text-[var(--edc-hot)] [text-shadow:0_0_24px_rgba(255,46,126,0.7),0_2px_16px_rgba(10,4,20,0.85)]">
            {gate.sideNote.headline}
          </span>
          <span className="mt-1.5 block font-hand text-[clamp(0.9rem,2vw,1.15rem)] leading-[1.15] text-sand/90 [text-shadow:0_2px_12px_rgba(5,5,10,0.85)]">
            {gate.sideNote.lines[0]} {gate.sideNote.lines[1]}
          </span>
        </motion.div>

        {/* The hero's one sticker. Mid-right, in open footage, well clear of
            both the headline block and the handwritten note above it. */}
        <Sticker className="right-[8%] top-[46%] hidden md:block" rotate={-8} color="#FF2E7E">
          {stickers.hero}
        </Sticker>

        {/*
          THE HEADLINE BLOCK — three elements, and nothing else.

          ─── HOW LITTLE IS HERE, AND WHY ────────────────────────────────────
          This hero has been cut twice. It began with the Goa stack: eyebrow,
          h1, secondary headline, subheading, fact line, tagline, CTA,
          annotation, scroll cue. Then it lost the subheading, the fact line
          and the tagline. Now it is down to:

              the eyebrow  ·  the headline  ·  the button

          The reason is one structural difference from every other page on this
          site: THE OTHER HEROES SIT OVER A STILL PHOTOGRAPH. This one sits
          over moving footage of a crowd. A still image is a backdrop and can
          carry type across it; footage is the content, and every line of copy
          laid over it is a line the visitor reads INSTEAD of watching.

          The type is also smaller than any other hero on the site — deliberate
          inversion. Goa's headline runs to 7.5rem because it has to carry the
          screen on its own. Here the footage carries it, so the headline only
          has to name the thing and get out of the way.

          ─── WHERE THE CUT COPY WENT ────────────────────────────────────────
          Nothing was thrown away; it was rehoused where it costs nothing:
            · "NOW FIND THE MAINSTAGE" is now the SCROLL CUE at the bottom of
              this screen — still the line that turns the headline into an
              instruction, now doing a navigational job at 10px instead of
              occupying a display-size block.
            · the cast size, split and ages → the LED ribbon, immediately below
              the hero, at full volume.
            · "Thailand is just where it happens." → BEYOND THE GATES, which is
              the section that argument actually belongs to.
        */}
        <div className="mt-auto max-w-[22rem] pt-10 sm:max-w-[30rem] sm:pt-14 lg:max-w-[42rem]">
          {/* The festival and its dates, stated flat. Both verified — see
              `festival` in content/thailand.ts. */}
          <motion.p
            className="mb-3 font-display text-[clamp(0.8rem,2.4vw,1rem)] tracking-[0.16em] text-[var(--edc-hot)]"
            {...inFrom(0.28)}
          >
            {gate.eyebrow}
          </motion.p>

          <h1 className="relative">
            <motion.span
              className="block font-serif text-[clamp(2rem,6.4vw,3.6rem)] leading-[0.94] tracking-[-0.02em] text-sand/90"
              {...inFrom(0.38)}
            >
              {gate.line1}
            </motion.span>
            {/*
              "the EDC plot." — three spans, because EDC is set in a different
              face at a different size from the words either side of it:
              Permanent Marker for "the" and "plot.", the display face for EDC.

              EDC stays the loudest thing in the block even at this reduced
              scale — sand type with the bloom sitting BEHIND the letterform
              rather than as a shadow on it. `items-baseline` is what keeps two
              faces at two sizes on one line instead of stair-stepping.
            */}
            <motion.span
              className="relative flex flex-wrap items-baseline gap-x-[0.2em]"
              {...inFrom(0.5)}
            >
              <span className="font-brush text-[clamp(2.1rem,6.8vw,3.9rem)] leading-[1.02] text-sand">
                {gate.line2.pre}
              </span>

              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="edc-haze edc-haze--hot -inset-x-3 -inset-y-1 opacity-80"
                />
                <span className="relative font-display text-[clamp(2.5rem,8.2vw,4.7rem)] leading-[0.92] tracking-[-0.01em] text-sand edc-glow-max">
                  {gate.line2.brand}
                </span>
              </span>

              <span className="font-brush text-[clamp(2.1rem,6.8vw,3.9rem)] leading-[1.02] text-sand">
                {gate.line2.post}
              </span>

              <MarkerUnderline color="#FF2E7E" className="absolute -bottom-1.5 left-0 h-3 w-[70%]" />
            </motion.span>
          </h1>
        </div>

        {/* footer row */}
        <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          {/* ONE button. No annotation beside it, no fact strip under it. */}
          <motion.div className="flex flex-col gap-3" {...inFrom(0.9)}>
            <PlotButton
              href={gate.cta.href}
              bg="#FF2E7E"
              fg="#0A0414"
              shadow="#FF4F87"
              event={PLOT_EVENTS.requestInvite}
            >
              {gate.cta.label}
            </PlotButton>
            {/*
              Attribution for the embedded footage. Not optional — see
              HeroVideo.tsx and the affiliation rule in content/thailand.ts.

              Bottom-LEFT on purpose: the tea cup is `fixed bottom-6 right-6
              z-50` on every page, so the hero's bottom-right corner is
              permanently spoken for. A credit with a floating button sitting
              on top of it is not a credit.
            */}
            {/* Renders nothing while the hero is the self-hosted licensed clip —
                that licence requires no attribution, and captioning stock footage
                here would read as "this is EDC", which it is not. It returns
                automatically if the official-trailer path is ever switched back
                on. See HeroVideo.tsx. */}
            <VideoCredit className="max-w-[20rem]" />
          </motion.div>

          <motion.div className="flex flex-col items-start gap-2.5 sm:items-end" {...inFrom(0.94)}>
            {/*
              THE SCROLL CUE — and the page's twist line, in the same element.

              This used to read "GATES THIS WAY ↓" while "NOW FIND THE
              MAINSTAGE." occupied a display-size block under the headline.
              Merging them is the whole point: the line still turns the
              headline into an instruction ("You've found the EDC plot" → "now
              find the mainstage"), it now also tells you what scrolling does,
              and it costs 10px of type over the footage instead of a block.
            */}
            <a
              href="#premise"
              className="flex items-center gap-3 pr-0 text-[10px] tracked text-sand/75 transition-colors hover:text-sand sm:pr-14"
            >
              {gate.scrollCue}
              <motion.span
                className="block h-7 w-px bg-[var(--edc-hot)]/70"
                animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
