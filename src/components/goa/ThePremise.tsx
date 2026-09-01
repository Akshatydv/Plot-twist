"use client";

import { premise } from "@/content/goa";
import { Note, SectionLabel, Stamp } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { BrushStroke, Squiggle } from "../Brush";

/**
 * THE PREMISE — the page's one dense reading moment, and the only one.
 *
 * It earns the imagery that follows by doing the argumentative work first:
 * name the concept, then kill the obvious objection ("I could just book Goa")
 * on the spot rather than leaving it to fester for eight more sections.
 *
 * Deliberately text-dominant. Putting a photograph here would soften the
 * argument and make it read as another travel section.
 */
export function ThePremise() {
  return (
    <section id="premise" className="paper relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
      <BrushStroke
        color="#FF7A3D"
        seed={11}
        className="pointer-events-none absolute -right-16 top-6 h-36 w-56 opacity-25 sm:h-52 sm:w-80"
      />

      <SectionLabel index={premise.index} label={premise.label} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Stagger className="space-y-0" gap={0.08}>
            {premise.big.map((line, i) => (
              <StaggerItem key={line}>
                <h2
                  className={
                    i === 2
                      ? "font-display text-[clamp(2.6rem,11vw,7rem)] leading-[0.86] tracking-[-0.01em] text-ink"
                      : "font-display text-[clamp(2.4rem,10vw,6.2rem)] leading-[0.88] tracking-[-0.01em] text-ink/70"
                  }
                  style={{ marginLeft: i === 1 ? "0.06em" : i === 2 ? "0.12em" : 0 }}
                >
                  {i === 2 ? (
                    <span className="relative inline-block">
                      <span className="text-pink">{line}</span>
                      <Squiggle color="#FF7A3D" className="absolute -bottom-3 left-0 h-5 w-[62%]" />
                    </span>
                  ) : (
                    line
                  )}
                </h2>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.12}>
            <Note className="mt-8 block text-[clamp(1.2rem,3.6vw,1.6rem)] text-ink/55" rotate={-2}>
              {premise.annotation}
            </Note>
          </Reveal>
        </div>

        <div className="lg:pt-6">
          <Reveal delay={0.1}>
            <div className="max-w-[44ch] space-y-3 text-[clamp(1.05rem,2.5vw,1.3rem)] leading-[1.45] text-ink/85">
              {premise.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>

          {/*
            THE KICKER — the objection, answered. Set apart with a rule and the
            serif italic so it reads as the conclusion of the paragraph above
            rather than one more line of it.
          */}
          <Reveal delay={0.2}>
            <p className="mt-8 border-t-2 border-ink/15 pt-6 font-serif text-[clamp(1.25rem,3.4vw,1.85rem)] italic leading-[1.2] text-ink">
              {premise.kicker}
            </p>
          </Reveal>

          <Reveal delay={0.28} className="mt-8">
            <Stamp color="#FF4F87">{premise.badge}</Stamp>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
