"use client";

import { premise, stickers } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { CredChip, GateSlate, Haze, LaserSweep } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * THE PREMISE — the page's one dense reading moment, and the only one.
 *
 * Structurally this is Goa's ThePremise, on black. Same two-column split,
 * same big-type stack on the left, same body-then-kicker-then-stamp column on
 * the right, same handwritten note in the same place. It earns the immersion
 * that follows by doing the argumentative work first: name the concept, then
 * kill the obvious objection ("I could just buy a ticket myself") on the spot
 * rather than leaving it to fester for six more sections.
 *
 * Deliberately image-free — exactly as Goa's is. A photograph here would
 * soften the argument and make it read as another travel section. On this
 * page it would also be the third full-bleed image in a row, straight after
 * the hero, which is how a festival page turns into a slideshow.
 */
export function ThePremise() {
  return (
    <section
      id="premise"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #170727 52%, #0a0414 100%)" }}
    >
      {/* One laser plane, kept to the right margin so it never crosses the
          reading column. See the rule in Neon.tsx. */}
      <LaserSweep className="right-[-30%] opacity-70" slow />
      <Haze className="-right-24 top-10 h-72 w-72 opacity-40" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative">
        {/* In the right margin, clear of the reading column — the one rule
            the stickers must never break. */}
        <Sticker className="right-[4%] top-[6%] hidden lg:block" rotate={7} color="#FF7FA8" variant="outline">
          {stickers.premise}
        </Sticker>

        <GateSlate index={premise.index} label={premise.label} meta="PHUKET · 7.88° N" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Stagger className="space-y-0" gap={0.08}>
              {premise.big.map((line, i) => (
                <StaggerItem key={line}>
                  <h2
                    className={
                      i === 2
                        ? "font-display text-[clamp(2.4rem,10vw,6.4rem)] leading-[0.86] tracking-[-0.01em] text-sand"
                        : "font-display text-[clamp(2.2rem,9vw,5.6rem)] leading-[0.88] tracking-[-0.01em] text-sand/45"
                    }
                    style={{ marginLeft: i === 1 ? "0.06em" : i === 2 ? "0.12em" : 0 }}
                  >
                    {i === 2 ? (
                      <span className="relative inline-block text-[var(--edc-hot)] edc-glow-hot">{line}</span>
                    ) : (
                      line
                    )}
                  </h2>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.12}>
              <Note className="mt-8 block text-[clamp(1.2rem,3.6vw,1.6rem)] text-sand/55" rotate={-2}>
                {premise.annotation}
              </Note>
            </Reveal>
          </div>

          <div className="lg:pt-6">
            <Reveal delay={0.1}>
              <div className="max-w-[44ch] space-y-3 text-[clamp(1.05rem,2.5vw,1.3rem)] leading-[1.45] text-sand/85">
                {premise.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>

            {/* THE KICKER — the objection, answered. Set apart with a rule and
                the serif italic so it reads as the conclusion of the paragraph
                above rather than one more line of it. */}
            <Reveal delay={0.2}>
              <p className="mt-8 border-t-2 border-[var(--edc-hot)]/30 pt-6 font-serif text-[clamp(1.25rem,3.4vw,1.85rem)] italic leading-[1.2] text-sand">
                {premise.kicker}
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-8">
              <CredChip color="#FF4F87">{premise.badge}</CredChip>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
