"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { finePrint, founder, howItWorks } from "@/content/goa";
import { Note, SectionLabel } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Arrow, MarkerUnderline } from "../Brush";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE FINE PRINT + BEHIND THE PLOT — the last reassurance before the ask.
 *
 * REPLACES <TrustStrip/> on the reveal page. That component still exists and
 * still runs on Journey 01; two trust sections back to back in the same slot
 * would have been exactly the heavy trust block this was meant not to be. Its
 * four vetted commitments are carried into the pillars below rather than
 * rewritten.
 *
 * WHY IT LOOKS DIFFERENT FROM THE REST OF THE PAGE: this is the one moment the
 * brand steps back and a person speaks. So it is the only section set on plain
 * paper with no photographic environment behind it, the founder note is a
 * literal taped sheet, and the type is smaller and quieter throughout. The
 * chapters shout; this one talks.
 *
 * NO INVENTED PROOF — no testimonials, counts, ratings, press or awards. None
 * of that exists yet, and a fabricated badge here would undo precisely the
 * thing the section is for.
 */
export function TheFinePrint() {
  const reduce = useReducedMotion();

  return (
    <section id="fine-print" className="paper relative overflow-hidden px-5 py-11 sm:px-8 sm:py-12 lg:px-14">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionLabel index={finePrint.index} label={finePrint.label} />

        {/* ---- header ---- */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,7vw,3.6rem)] uppercase leading-[0.88] tracking-[-0.01em] text-ink">
              {finePrint.headline[0]}
              <br />
              <span className="relative inline-block">
                {finePrint.headline[1]}
                <MarkerUnderline color="#FF4F87" className="absolute -bottom-1.5 left-0 h-3.5 w-full" />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Note className="block max-w-[26ch] text-[clamp(1.2rem,3.4vw,1.6rem)] text-ink/60" rotate={-2}>
              {finePrint.sub}
            </Note>
          </Reveal>
        </div>

        {/* ---- the four pillars: hairline rules, not cards ---- */}
        <Stagger className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 sm:gap-x-8 lg:grid-cols-4" gap={0.07}>
          {finePrint.pillars.map((p) => (
            <StaggerItem key={p.k}>
              <div className="border-t-2 pt-3" style={{ borderColor: p.accent }}>
                <h3 className="font-display text-[clamp(0.95rem,2.6vw,1.1rem)] uppercase tracking-[0.03em] text-ink">
                  {p.k}
                </h3>
                <p className="mt-1.5 text-[0.92rem] leading-[1.45] text-ink/70">{p.v}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ---------------- BEHIND THE PLOT ----------------
            A letter with photographs stuck to it, not a bio with a headshot.

            The prints FLOAT INSIDE the text rather than sitting in their own
            sidebar column. That's the difference between compact and not: as
            a column they had to match the letter's height and added ~340px of
            dead space beside it; floated, the text wraps around them and they
            cost almost nothing. It also puts them where they were asked to be
            — one by the opening, one by the travel line, one by the sign-off.

            Below sm they clear out to a small scattered row so the letter
            never gets squeezed into a two-word column on a phone. */}
        <div className="mt-10 border-t-2 border-ink/15 pt-8">
          <Reveal>
            <div className="max-w-[80ch]">
              <p className="text-[10px] tracked text-ink/45">{founder.eyebrow}</p>

              <h3 className="mt-3 font-brush text-[clamp(1.85rem,6vw,2.9rem)] leading-[1] text-ink">
                {founder.greeting}
              </h3>

              {/* by the opening */}
              <FounderPrint i={0} className="mb-3 ml-5 hidden w-[9rem] sm:float-right sm:block" />

              <p className="mt-3 font-serif text-[clamp(1.05rem,2.8vw,1.3rem)] italic leading-[1.3] text-ink">
                {founder.opening}
              </p>

              {/* by the travel line */}
              <FounderPrint i={1} className="mb-3 mr-5 mt-2 hidden w-[9rem] sm:float-left sm:block" />

              <div className="mt-3 space-y-2 text-[clamp(0.95rem,2.3vw,1.05rem)] leading-[1.5] text-ink/75">
                {founder.story.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {/* the pivot — the line the whole company is built on */}
              <p className="mt-4 max-w-[24ch] font-display text-[clamp(1.15rem,4vw,1.85rem)] uppercase leading-[1.05] text-pink">
                {founder.pivot}
              </p>

              <div className="mt-4 space-y-2 text-[clamp(0.95rem,2.3vw,1.05rem)] leading-[1.5] text-ink/75">
                {founder.after.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {/* by the sign-off */}
              <FounderPrint i={2} className="mb-3 ml-5 mt-2 hidden w-[9rem] sm:float-right sm:block" />

              <p className="mt-4 max-w-[46ch] font-serif text-[clamp(1.05rem,2.8vw,1.3rem)] italic leading-[1.3] text-ink">
                {founder.kicker}
              </p>

              {/* the signature — clears the floats so it always sits on its own line */}
              <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:clear-both">
                <div>
                  <Note className="block text-[clamp(1.5rem,4.6vw,2rem)] text-pink" rotate={-3}>
                    {founder.signature}
                  </Note>
                  <p className="mt-1.5 text-[10px] tracked text-ink/45">{founder.role}</p>
                </div>
                <FounderMarks />
              </div>

              {/* phones: the three prints as one small scattered row instead */}
              <div className="mt-7 flex flex-wrap justify-center gap-3 sm:hidden">
                {founder.photos.map((_, i) => (
                  <FounderPrint key={i} i={i} className="w-[7.5rem]" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- AND THEN WHAT HAPPENS ---------------- */}
        <div className="mt-9 border-t-2 border-ink/15 pt-7">
          <Reveal>
            <p className="text-[10px] tracked text-ink/45">{howItWorks.eyebrow}</p>
          </Reveal>

          {/*
            Number + label only, one line each. The per-step descriptions were
            cut deliberately: every one of them restated something the pillars
            above already say ("a real person reads it"), and carrying them
            made this the tallest section on the page for no new information.
            Three labels and two arrows is also what the brief actually drew.
          */}
          <Stagger className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4" gap={0.08}>
            {howItWorks.steps.map((s, i) => (
              <StaggerItem key={s.n}>
                <div className="relative flex items-baseline gap-3 sm:pr-9">
                  <span className="font-display text-[clamp(1.3rem,4vw,1.7rem)] leading-none text-pink">{s.n}</span>
                  <h4 className="font-display text-[clamp(0.9rem,2.4vw,1.02rem)] uppercase leading-tight tracking-[0.03em] text-ink">
                    {s.t}
                  </h4>

                  {/* hand-drawn connector between steps — desktop only */}
                  {i < howItWorks.steps.length - 1 && (
                    <Arrow
                      color="#1A0D0A"
                      className="pointer-events-none absolute -right-2 top-0 hidden h-5 w-7 opacity-25 sm:block"
                    />
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}


/**
 * THE MARKS — three small torn tickets, sat beside the signature.
 *
 * Selective on purpose: four badges in a row started to read as a stats
 * bar, which is the corporate register this section exists to avoid.
 */
function FounderMarks() {
  const reduce = useReducedMotion();
  const tilts = [-3, 2.5, -1.5];

  return (
    <div className="flex flex-wrap gap-2">
      {founder.marks.map((m, i) => (
        <motion.span
          key={m}
          className="border-2 border-ink/25 px-2.5 py-1.5 text-[9px] font-semibold tracked text-ink/65"
          style={{ rotate: tilts[i % 3] }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.86, rotate: tilts[i % 3] - 6 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: tilts[i % 3] }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.2 + i * 0.08 }}
        >
          {m}
        </motion.span>
      ))}
    </div>
  );
}
/**
 * ONE SCRAPBOOK MOMENT — a small taped print, floated into the letter.
 *
 * Deliberately small (10rem) so it reads as something stuck to the page
 * rather than as a photograph being presented. Each keeps its own aspect
 * ratio, so three prints aren't three identical rectangles, and each gets its
 * own tilt and tape position.
 */
function FounderPrint({ i, className = "" }: { i: number; className?: string }) {
  const reduce = useReducedMotion();
  const p = founder.photos[i];
  if (!p) return null;

  const tilts = [-3, 2.5, -2];
  const tilt = tilts[i % 3];

  return (
    <motion.figure
      /* Width comes from the call site — hardcoding one here collided with
         the mobile row's smaller width (two w-* classes, undefined winner). */
      className={className}
      style={{ rotate: `${tilt}deg` }}
      initial={reduce ? undefined : { opacity: 0, y: 18, rotate: tilt - 6 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
      whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
    >
      <span className="relative block bg-[#fffaf2] p-1.5 pb-6 shadow-[0_18px_36px_-18px_rgba(43,15,28,0.6)]">
        <span
          className={`tape absolute -top-2.5 h-4 w-11 ${i % 2 ? "right-4 rotate-3" : "left-4 -rotate-3"}`}
          aria-hidden
        />
        <span
          className="grain relative block w-full overflow-hidden bg-ink/15"
          style={{ aspectRatio: p.aspect }}
        >
          <Image src={p.src} alt={p.alt} fill sizes="10rem" className="object-cover" />
        </span>
        <figcaption className="absolute inset-x-1.5 bottom-1 text-center font-hand text-[0.95rem] leading-none text-ink/60">
          {p.note}
        </figcaption>
      </span>
    </motion.figure>
  );
}
