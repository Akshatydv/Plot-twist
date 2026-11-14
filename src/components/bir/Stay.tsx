"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { stay } from "@/content/bir";
import { Reveal } from "../motion";
import { Kicker, MaskLines } from "./Scenery";

/**
 * THE STAY — the property as part of the getaway, not a footnote to it.
 *
 * It arrives straight after the road into Bir (Day 01's route ends at "home
 * for the next three nights"), on a paper-light ground so it reads as the
 * page exhaling: one large editorial photograph, then a quiet mosaic.
 *
 * Every word and every photograph is in content/bir.ts (`stay`). The copy
 * claims only what the photographs show, and the property is unnamed. Add a
 * photograph to `stay.photos` and the mosaic takes it: after the first, the
 * layout cycles 7/5, 5/7 columns on desktop and full/half/half/full on a phone.
 */

/**
 * Layout for every photograph after the first, cycled. The desktop ratios are
 * the inverse of the column widths (7 and 5 of 12), so the two photographs in a
 * row always end on the same line.
 */
const MOSAIC = [
  { cell: "col-span-2 lg:col-span-7", ratio: "aspect-[4/3]" },
  { cell: "lg:col-span-5", ratio: "aspect-[4/5] lg:aspect-[19/20]" },
  { cell: "lg:col-span-5", ratio: "aspect-[4/5] lg:aspect-[19/20]" },
  { cell: "col-span-2 lg:col-span-7", ratio: "aspect-[4/3]" },
] as const;

export function TheStay() {
  const reduce = useReducedMotion();
  const [lead, ...rest] = stay.photos;

  return (
    <section
      id={stay.id}
      data-hud="day1"
      aria-label="The stay"
      className="relative overflow-hidden bg-[var(--bir-dawn)] px-5 py-24 text-[var(--bir-char)] sm:px-8 sm:py-32 lg:px-14"
    >
      <div className="mx-auto max-w-[1200px]">
        <Kicker color="#A95F38">{stay.kicker}</Kicker>
        <MaskLines
          lines={stay.headline}
          className="mt-6 font-serif text-[clamp(3rem,10.5vw,8.5rem)] leading-[0.9] tracking-[-0.03em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[46ch] text-[clamp(1.02rem,2.2vw,1.2rem)] leading-[1.6] text-[var(--bir-char)]/75">{stay.body}</p>
        </Reveal>

        {/* the lead photograph: opens from an inset window to the full frame */}
        <motion.figure
          className="mt-14 sm:mt-20"
          initial={reduce ? false : { clipPath: "inset(7% 5% round 28px)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% 0% round 0px)", opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9]">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: lead.focus }}
            />
          </div>
          <figcaption className="mt-3 font-hand text-[1.25rem] text-[var(--bir-char)]/55">{lead.caption}</figcaption>
        </motion.figure>

        {/* the rest of the stay */}
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-12">
          {rest.map((p, i) => {
            const m = MOSAIC[i % MOSAIC.length];
            return (
              <Reveal key={p.src} delay={(i % 2) * 0.08} y={30} amount={0.2} className={m.cell}>
                <figure className="group">
                  <div className={`relative overflow-hidden ${m.ratio}`}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      quality={78}
                      className="object-cover transition-transform duration-[1200ms] ease-out lg:group-hover:scale-[1.04]"
                      style={{ objectPosition: p.focus }}
                    />
                  </div>
                  <figcaption className="mt-3 font-hand text-[1.2rem] text-[var(--bir-char)]/55">{p.caption}</figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
