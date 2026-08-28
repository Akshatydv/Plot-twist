"use client";

import { setup } from "@/content/site";
import { Note, PlotButton, SectionLabel, Stamp } from "./Bits";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { Arrow, BrushStroke, Squiggle } from "./Brush";
import { HiddenClue } from "./mystery/HiddenClue";

export function SetupSection() {
  return (
    <section id="setup" className="paper relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-14">
      {/* painted marks in the margins */}
      <BrushStroke color="#FF7A3D" seed={11} className="pointer-events-none absolute -right-16 top-6 h-36 w-56 opacity-25 sm:h-52 sm:w-80" />
      <BrushStroke color="#00A9C7" seed={4} className="pointer-events-none absolute -left-28 bottom-16 h-32 w-64 -rotate-[14deg] opacity-[0.18]" />

      <SectionLabel index={setup.index} label={setup.label} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          {/* "10/10s ONLY" carries the strongest weight of the three — bigger, pink, underlined */}
          <Stagger className="space-y-0" gap={0.08}>
            {setup.big.map((line, i) => (
              <StaggerItem key={line}>
                <h2
                  className={
                    i === 2
                      ? "font-display text-[clamp(3.3rem,14.5vw,9.6rem)] leading-[0.84] tracking-[-0.01em] text-ink"
                      : "font-display text-[clamp(2.9rem,12.5vw,8.5rem)] leading-[0.86] tracking-[-0.01em] text-ink"
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

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-5">
            <PlotButton href={setup.cta.href} bg="#1A0D0A" fg="#FFF1DC" shadow="#00A9C7">
              {setup.cta.label}
            </PlotButton>
            <Arrow color="#1A0D0A" className="hidden h-11 w-12 rotate-[8deg] opacity-70 sm:block" />
            <Stamp color="#FF4F87">{setup.badge}</Stamp>
          </Reveal>

          {/* the age range — visible, not dominant */}
          <Reveal delay={0.16} className="mt-4 flex flex-wrap items-center gap-3">
            <Stamp color="#00A9C7" rotate={2}>
              {setup.ageRange}
            </Stamp>
            <Note className="block text-lg text-ink/50" rotate={-3}>
              {setup.ageNote}
            </Note>
          </Reveal>
        </div>

        <div className="relative lg:pt-6">
          <Stagger className="space-y-3 text-[clamp(1.05rem,2.6vw,1.4rem)] leading-[1.4] text-ink/85" gap={0.06}>
            {setup.body.map((line) => (
              <StaggerItem key={line}>
                <p>{line}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-8 border-l-[3px] border-pink pl-5">
            <p className="text-[clamp(1.05rem,2.6vw,1.4rem)] leading-[1.4] text-ink/85">{setup.withhold.lead}</p>
            {/* editorial serif, not brush — this is a statement, not an annotation */}
            <p className="mt-2 font-serif text-[clamp(1.9rem,6.5vw,3.2rem)] italic leading-[1.05] text-ink">
              {setup.withhold.reveal}
            </p>
          </Reveal>

          <HiddenClue id="place" className="mt-7 block" noteWidth="15rem">
            <Note className="block text-[clamp(1.4rem,4.5vw,2rem)] text-sunset" rotate={-4}>
              {setup.annotation}
            </Note>
          </HiddenClue>
        </div>
      </div>
    </section>
  );
}
