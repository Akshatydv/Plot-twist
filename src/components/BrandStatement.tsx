"use client";

import { motion, useReducedMotion } from "framer-motion";
import { statement } from "@/content/site";
import { SectionLabel } from "./Bits";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { BrushStroke, CircleScribble } from "./Brush";
import { HiddenClue } from "./mystery/HiddenClue";

/**
 * A band, not a chapter. It carries the philosophy in one breath and hands
 * the reader straight on to the mystery.
 */
export function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden px-5 py-14 text-sand sm:px-8 sm:py-16 lg:px-14"
      style={{ background: "#FF4F87" }}
    >
      {/* a single painted wash rather than a gradient field */}
      <div
        className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[180%] w-[80%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, #FF7A3D 0%, rgba(255,122,61,0.62) 34%, rgba(255,122,61,0) 66%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" />
      <BrushStroke color="#00A9C7" seed={19} className="pointer-events-none absolute -left-20 top-2 h-32 w-64 opacity-25" />

      <div className="relative">
        <SectionLabel index={statement.index} label={statement.label} color="#FFF1DC" />

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-12">
          <div>
            {/* heavy condensed sans, two-tone: what we plan, then the part we can't */}
            <Stagger className="space-y-0" gap={0.1}>
              <StaggerItem>
                <h2 className="font-display text-[clamp(2.5rem,10.5vw,7rem)] leading-[0.86] tracking-[-0.01em] text-sand">
                  {statement.big[0]}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <h2
                  className="font-display text-[clamp(2.5rem,10.5vw,7rem)] leading-[0.86] tracking-[-0.01em] text-ink"
                  style={{ marginLeft: "0.06em" }}
                >
                  {statement.big[1]}
                </h2>
              </StaggerItem>
            </Stagger>

            <Reveal delay={0.12}>
              <div className="mt-6 max-w-[52ch] space-y-1.5 text-[clamp(1rem,2.3vw,1.25rem)] leading-[1.4] text-sand/95">
                {statement.body.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="relative lg:justify-self-end">
            <motion.div
              className="relative inline-block px-5 py-4"
              style={{ background: "#1A0D0A" }}
              initial={reduce ? undefined : { rotate: -4, scale: 0.94, opacity: 0 }}
              whileInView={reduce ? undefined : { rotate: -2.2, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
            >
              <HiddenClue id="signature">
                <span className="block font-display text-[clamp(1.3rem,4.5vw,2.3rem)] tracking-[0.02em] text-sand">
                  {statement.signature}
                </span>
              </HiddenClue>
              <CircleScribble
                color="#FFF1DC"
                className="pointer-events-none absolute -inset-x-5 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] opacity-80"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
