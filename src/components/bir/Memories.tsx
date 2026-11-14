"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { birIndex, memories } from "@/content/bir";
import { SectionLabel } from "../Bits";
import { Reveal } from "../motion";
import { MaskLines } from "./Scenery";

/**
 * INSIDE PLOT TWIST — the memories wall.
 *
 * Real photographs from previous Plot Twist trips, set as an asymmetric
 * editorial collage rather than a feed: a big landscape and a tall one side by
 * side, then a row of three. They are labelled as previous trips and never as
 * Bir or Barot.
 *
 * Content lives in content/bir.ts (`memories`). The wall takes any number of
 * photographs: after the fifth the pattern simply repeats, so adding more is
 * adding entries and files, nothing here.
 *
 * Motion is two things only: each frame lifts in once as it enters, and on a
 * pointer device the photograph eases slightly closer and its caption appears.
 * On a phone the captions are always visible (there is no hover).
 */

/** [phone, desktop] classes for each frame, cycled. Desktop is a 12-column grid. */
const LAYOUT = [
  "col-span-2 aspect-[4/3] lg:aspect-auto lg:col-span-7 lg:row-span-4",
  "aspect-[4/5] lg:aspect-auto lg:col-span-5 lg:row-span-4",
  "aspect-[4/5] lg:aspect-auto lg:col-span-4 lg:row-span-3",
  "aspect-[4/5] lg:aspect-auto lg:col-span-4 lg:row-span-3",
  "col-span-2 aspect-[4/3] lg:aspect-auto lg:col-span-4 lg:row-span-3",
] as const;

export function MemoriesWall() {
  const reduce = useReducedMotion();

  return (
    <section
      id="inside-plot-twist"
      aria-label="Inside Plot Twist"
      className="relative overflow-hidden bg-[var(--bir-char)] px-5 py-24 text-[var(--bir-bone)] sm:px-8 sm:py-32 lg:px-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionLabel index={birIndex("memories")} label={memories.kicker} color="#EFE9DD" />

        <div role="heading" aria-level={2} className="mt-8 font-serif text-[clamp(2.1rem,6.6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]">
          <span className="sr-only">{memories.headline.join(" ")}</span>
          <span aria-hidden>
            <MaskLines lines={[memories.headline[0]]} as="p" />
            <MaskLines lines={[memories.headline[1]]} as="p" lineClassName="italic text-[var(--bir-ember)]" delay={0.18} />
          </span>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[40ch] font-serif text-[clamp(1.2rem,2.6vw,1.7rem)] italic leading-[1.25] text-[var(--bir-bone)]/70">
            {memories.line}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-2.5 sm:gap-3 lg:mt-20 lg:auto-rows-[clamp(4.6rem,7.2vw,7.2rem)] lg:grid-cols-12 lg:gap-4">
          {memories.photos.map((p, i) => (
            <motion.figure
              key={p.src}
              className={`group relative overflow-hidden bg-[#1c1f1d] ${LAYOUT[i % LAYOUT.length]}`}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                quality={80}
                className="object-cover transition-transform duration-[1400ms] ease-out lg:group-hover:scale-[1.04]"
                style={{ objectPosition: p.focus }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 font-hand text-[1.15rem] leading-tight text-white opacity-100 transition-opacity duration-500 sm:p-4 sm:text-[1.3rem] lg:opacity-0 lg:group-hover:opacity-100">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-8 text-[10px] font-semibold tracked text-[var(--bir-bone)]/45">{memories.note}</p>
      </div>
    </section>
  );
}
