"use client";

import { difference } from "@/content/goa";
import { Note, SectionLabel } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { CircleScribble } from "../Brush";

/**
 * THE DIFFERENCE — the value argument, immediately before the price.
 *
 * Position is doing as much work here as copy. This is the section that has to
 * make a number feel reasonable, so it sits directly above the call sheet and
 * directly below the four chapters: they have just seen everything they'd be
 * paying for, and this tells them what they'd actually be buying.
 *
 * "WE PLANNED THE TRIP. NOT THE PEOPLE." is unchanged from the original
 * BrandStatement — on the mystery page it was an aside in position 03; here
 * it is the thesis, and everything above it has been evidence for it.
 *
 * The three bookable lines strike through one at a time, then the fourth
 * doesn't. That is the entire argument, made visually.
 */
export function TheDifference() {
  return (
    <section
      id="difference"
      className="relative overflow-hidden px-5 py-20 text-sand sm:px-8 sm:py-24 lg:px-14"
      style={{ background: "radial-gradient(115% 85% at 25% 15%, #33122c 0%, #1c0819 55%, #120510 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1100px]">
        <SectionLabel index={difference.index} label={difference.label} color="#FFF1DC" />

        <Reveal className="mt-8">
          <h2 className="font-display text-[clamp(2.3rem,9.5vw,6rem)] uppercase leading-[0.88] tracking-[-0.01em] text-sand">
            {difference.big[0]}
            <br />
            <span className="relative inline-block">
              <span className="text-pink">{difference.big[1]}</span>
              <CircleScribble
                color="#FF7A3D"
                className="pointer-events-none absolute -inset-x-5 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] opacity-70"
              />
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* the list: three struck through, one not */}
          <div>
            <Stagger gap={0.1}>
              {difference.bookable.map((line) => (
                <StaggerItem key={line}>
                  <p className="py-2 font-display text-[clamp(1.3rem,4.6vw,2.1rem)] uppercase leading-tight text-sand/35 line-through decoration-pink/70 decoration-[3px]">
                    {line}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.32}>
              <p className="mt-4 border-t-2 border-sand/20 pt-5 font-display text-[clamp(1.45rem,5.2vw,2.4rem)] uppercase leading-tight text-[#FFE9A8]">
                {difference.unbookable}
              </p>
            </Reveal>
          </div>

          <div className="lg:pt-3">
            <Reveal delay={0.12}>
              <p className="max-w-[42ch] font-serif text-[clamp(1.15rem,2.9vw,1.5rem)] italic leading-[1.3] text-sand/85">
                {difference.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Note className="mt-9 block text-[clamp(1.6rem,5vw,2.2rem)] text-pink" rotate={-3}>
                {difference.signature}
              </Note>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
