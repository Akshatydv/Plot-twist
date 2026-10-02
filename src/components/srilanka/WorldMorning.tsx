"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { world4 } from "@/content/srilanka";
import { Note } from "../Bits";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";
import { Tag } from "./Kit";

/**
 * WORLD 04 — 1 JAN — THE MORNING AFTER.
 *
 * The sharpest cut on the page: from 2027 in fireworks to warm paper and
 * white space. No chapter card over footage here — the date sits small, the
 * lines arrive one at a time with a screen of nothing between them, and the
 * only moving picture is a small window of a palm against the sun, as if
 * seen from a sunlounger.
 *
 * Then the slowest morning of the year as a scatter of prints you can push
 * around the table (they're draggable; nothing depends on it), and the first
 * swim, revealed through a circle that opens as you scroll — like opening
 * your eyes.
 */
export function WorldMorning() {
  return (
    <div id={world4.id} data-world={world4.id} className="relative bg-[var(--sl-sand)] text-[#1b1712]">
      <Slow />
      <Prints />
      <FirstSwim />
    </div>
  );
}

function Slow() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const winY = useTransform(p, [0, 1], ["10%", "-25%"]);
  const winScale = useTransform(p, [0.1, 0.5], [0.86, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-14">
      {/* the morning light itself: a warm bloom from the top right */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 50% at 85% 0%, rgba(246,215,160,0.9) 0%, rgba(247,239,226,0) 70%)" }} />
      <div className="relative mx-auto max-w-[1200px]">
        <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracked text-[#9a6b1f]">
          <span className="font-display text-[15px] tracking-normal">{world4.n} / 07</span>
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {world4.date}
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {world4.place}
        </p>
        <MaskLines lines={["THE MORNING", "AFTER"]} className="mt-5 font-serif text-[clamp(3.4rem,13vw,11rem)] leading-[0.86] tracking-[-0.03em]" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div className="space-y-[18svh] pb-[10svh] pt-[6svh]">
            {world4.lines.map((l) => (
              <Focus key={l}>
                <p className="font-serif text-[clamp(2rem,6vw,4.4rem)] italic leading-[1.02]">{l}</p>
              </Focus>
            ))}
            <div>
              {world4.turn.map((l, i) => (
                <Focus key={l} delay={i * 0.4}>
                  <p className={`font-serif leading-[0.98] tracking-[-0.02em] ${i === 0 ? "text-[clamp(2.6rem,8vw,6rem)]" : "text-[clamp(2.6rem,8vw,6rem)] italic text-[#c4862c]"}`}>{l}</p>
                </Focus>
              ))}
            </div>
          </div>

          {/* the window: a palm against the sun, framed small, drifting up slower than the words */}
          <div className="relative lg:pt-24">
            <motion.div className="sticky top-[18svh] aspect-[4/5] w-full overflow-hidden" style={reduce ? undefined : { y: winY, scale: winScale }}>
              <Footage slot={world4.slot} sizes="(min-width: 1024px) 40vw, 90vw" />
              <div className="absolute inset-0 bg-[#f6d7a0]/10 mix-blend-soft-light" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Prints() {
  const reduce = useCalm();
  const table = useRef<HTMLDivElement>(null);
  return (
    <section className="relative px-5 pb-24 pt-10 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between gap-4">
          <Tag color="#9a6b1f">AHANGAMA · 11:00-ISH</Tag>
          <Note className="hidden text-[1.3rem] text-[#1b1712]/50 sm:inline" rotate={-3}>
            (move them around. it's a holiday.)
          </Note>
        </div>
        <div ref={table} className="relative mt-8 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {world4.moments.map((m, i) => (
            <motion.figure
              key={m.caption}
              drag={!reduce}
              dragConstraints={table}
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, zIndex: 20, rotate: 0 }}
              initial={reduce ? false : { opacity: 0, y: 40, rotate: m.tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: m.tilt }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative cursor-grab touch-pan-y bg-white p-2.5 pb-3 shadow-[0_18px_40px_-18px_rgba(60,40,10,0.45)] active:cursor-grabbing sm:p-3 sm:pb-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eadfcd]">
                <Image src={m.image} alt={m.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="pointer-events-none object-cover" draggable={false} />
              </div>
              <figcaption className="mt-2 font-hand text-[1.05rem] leading-tight text-[#1b1712]/75 sm:text-[1.25rem]">{m.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FirstSwim() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const S = world4.swim;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const circle = useTransform(p, [0, 0.55], ["circle(9% at 50% 55%)", "circle(80% at 50% 55%)"]);
  const textO = useTransform(p, [0.4, 0.6], [0, 1]);
  const textY = useTransform(p, [0.4, 0.7], [40, 0]);

  return (
    <section ref={ref} aria-label={S.title.join(" ")} className={reduce ? "relative" : "relative h-[240svh]"}>
      <div className={`${reduce ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden bg-[var(--sl-sand)]`}>
        <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: circle }}>
          <Footage slot={S.slot} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a08]/80 via-transparent to-transparent" />
        </motion.div>
        <motion.div className="absolute inset-x-5 bottom-14 z-10 text-[var(--sl-sand)] sm:inset-x-8 lg:inset-x-14" style={reduce ? undefined : { opacity: textO, y: textY }}>
          <Tag color="#F6D7A0">{S.kicker}</Tag>
          <h3 className="mt-4 font-serif text-[clamp(3.6rem,13vw,11rem)] leading-[0.84] tracking-[-0.03em]">
            {S.title[0]}
            <br />
            <span className="italic text-[var(--sl-gold)]">{S.title[1]}</span>
          </h3>
          <p className="mt-5 max-w-[46ch] text-[clamp(1rem,2.2vw,1.2rem)] leading-[1.6] text-[var(--sl-sand)]/85">{S.body}</p>
          <div className="mt-6">
            <Note className="text-[1.5rem] text-[var(--sl-gold)]" rotate={-3}>
              {S.scribble}
            </Note>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
