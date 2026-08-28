"use client";

import { motion, useReducedMotion } from "framer-motion";
import { teaser } from "@/content/site";
import { Note, PlotButton, SectionLabel, Stamp } from "./Bits";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Arrow, BrushStroke } from "./Brush";

export function ApplicationTeaser() {
  const reduce = useReducedMotion();

  return (
    <section id="selection" className="paper relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
      <BrushStroke color="#FF4F87" seed={23} className="pointer-events-none absolute -right-20 top-2 h-40 w-72 opacity-25" />

      <SectionLabel index={teaser.index} label={teaser.label} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
        <div>
          <Reveal>
            <h2 className="font-serif text-[clamp(2.7rem,10vw,6.6rem)] leading-[0.9] tracking-[-0.02em] text-ink">
              {teaser.headline[0]}
              <br />
              {/* display face, not brush: the marker's slash reads as a Λ at size */}
              <span className="font-display text-[clamp(2.9rem,11vw,7rem)] uppercase tracking-[-0.01em] text-pink">
                {teaser.headline[1]}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-6 max-w-[42ch] space-y-1.5 text-[clamp(1.05rem,2.5vw,1.3rem)] leading-[1.45] text-ink/85">
              {teaser.body.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative">
          {/* the stamp lands first, then what it's actually judging */}
          <motion.div
            className="inline-block border-[3px] border-pink px-4 py-2"
            style={{ rotate: -3 }}
            initial={reduce ? undefined : { opacity: 0, scale: 0.86, rotate: -12 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 200, damping: 13 }}
          >
            <span className="font-display text-[clamp(1.1rem,3.4vw,1.6rem)] tracking-[0.05em] text-pink">
              {teaser.stamp}
            </span>
          </motion.div>

          <Stagger className="mt-7 space-y-1" gap={0.12}>
            {teaser.judging.map((line, i) => (
              <StaggerItem key={line}>
                <p
                  className="font-display text-[clamp(1.9rem,7vw,3.4rem)] leading-[1] text-ink"
                  style={{ marginLeft: `${i * 0.45}em` }}
                >
                  {line}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Note className="mt-3 block text-[clamp(1.2rem,3.6vw,1.6rem)] text-ocean" rotate={-3}>
            {teaser.judgingNote}
          </Note>

          <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-5">
            <PlotButton href={teaser.cta.href} bg="#FF7A3D" fg="#1A0D0A" shadow="#1A0D0A" event={PLOT_EVENTS.makeYourCase}>
              {teaser.cta.label}
            </PlotButton>
            <Arrow color="#1A0D0A" className="hidden h-12 w-14 rotate-[100deg] opacity-60 sm:block" />
            <Stamp color="#00A9C7" rotate={2}>
              {teaser.badge}
            </Stamp>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
