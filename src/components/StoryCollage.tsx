"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Frame } from "@/content/site";
import { story } from "@/content/site";
import { Note, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { Arrow, Squiggle, Star } from "./Brush";
import { HiddenClue } from "./mystery/HiddenClue";

/** Desktop pin positions — deliberately uneven, like a physical wall. */
const layout: Record<string, { left: string; top: string; width: string; rotate: number; z: number }> = {
  escape: { left: "0%", top: "6%", width: "25%", rotate: -6.5, z: 3 },
  experience: { left: "22%", top: "40%", width: "22%", rotate: 4, z: 2 },
  people: { left: "41%", top: "0%", width: "26%", rotate: -2.5, z: 4 },
  plot: { left: "64%", top: "34%", width: "27%", rotate: 5.5, z: 3 },
  unexpected: { left: "5%", top: "62%", width: "21%", rotate: 2.5, z: 5 },
};

function Photo({ frame }: { frame: Frame }) {
  return (
    <div className="pin relative">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" aria-hidden />
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/10">
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          sizes="(max-width: 1024px) 66vw, 26vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-x-4 bottom-3">
        {/* handwritten scale only — the brush face stays an annotation face */}
        <div className="font-brush text-[clamp(0.9rem,2.2vw,1.15rem)] leading-none text-ink">{frame.title}</div>
        <div className="mt-1 text-[10px] tracked text-ink/50">{frame.caption}</div>
      </div>
      {frame.note && frame.clueId && (
        <HiddenClue id={frame.clueId} className="absolute -right-2 top-6" noteWidth="15rem">
          <span className="block rotate-[8deg] font-hand text-lg text-pink">{frame.note}</span>
        </HiddenClue>
      )}
      {frame.note && !frame.clueId && (
        <span className="absolute -right-2 top-6 rotate-[8deg] font-hand text-lg text-pink">{frame.note}</span>
      )}
    </div>
  );
}

export function StoryCollage() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="paper relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-14">
      <SectionLabel index={story.index} label={story.label} />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="font-display text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.86] text-ink">
            {story.headline[0]}
            <br />
            <span className="text-ocean">{story.headline[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="relative w-full sm:w-auto">
          <Note className="block max-w-[16ch] text-[clamp(1.3rem,4vw,1.9rem)] text-pink" rotate={-5}>
            {story.annotation}
          </Note>
        </Reveal>
      </div>

      {/* MOBILE / TABLET — swipeable stack of pinned photos */}
      <div className="no-scrollbar snap-x-strip -mx-5 mt-8 flex gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden">
        {story.frames.map((f, i) => (
          <motion.div
            key={f.key}
            className="w-[62vw] shrink-0 sm:w-[42vw]"
            style={{ rotate: i % 2 ? 2.2 : -2.4 }}
            initial={reduce ? undefined : { opacity: 0, y: 26 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Photo frame={f} />
          </motion.div>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 lg:hidden">
        <Note className="text-lg text-ink/45" rotate={0}>
          swipe the wall →
        </Note>
        <HiddenClue id="culture" align="right" noteWidth="14rem">
          <Note className="block text-lg text-ocean" rotate={2}>
            screenshot-worthy. we know.
          </Note>
        </HiddenClue>
      </div>

      {/* DESKTOP — pinned wall */}
      <div className="relative mx-auto mt-8 hidden h-[820px] w-full max-w-[1180px] lg:block">
        {story.frames.map((f, i) => {
          const p = layout[f.key];
          return (
            <motion.div
              key={f.key}
              className="absolute"
              style={{ left: p.left, top: p.top, width: p.width, zIndex: p.z }}
              initial={reduce ? undefined : { opacity: 0, y: 50, rotate: p.rotate * 2.6, scale: 0.94 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: p.rotate, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { rotate: 0, scale: 1.035, zIndex: 20 }}
            >
              <Photo frame={f} />
            </motion.div>
          );
        })}

        {/* wall annotations */}
        <Arrow color="#FF4F87" className="absolute left-[28%] top-[10%] z-10 h-20 w-20 -rotate-[24deg]" />
        <Squiggle color="#00A9C7" className="absolute left-[36%] top-[86%] z-10 h-12 w-36 rotate-6" />
        <Star color="#36C96F" className="absolute right-[8%] top-[14%] z-10 h-10 w-10" />
        <Star color="#FF7A3D" className="absolute left-[2%] top-[54%] z-10 h-7 w-7" />
        <HiddenClue id="culture" className="absolute right-[3%] top-[80%] z-10" align="right" noteWidth="16rem">
          <span className="block rotate-[-8deg] font-hand text-3xl text-ink/70">the plot thickens</span>
        </HiddenClue>
        <span className="absolute left-[30%] top-[24%] z-10 rotate-[3deg] font-hand text-2xl text-ocean">
          ...still not telling you
        </span>
      </div>
    </section>
  );
}
