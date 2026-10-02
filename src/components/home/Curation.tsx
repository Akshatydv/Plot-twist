"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { curation } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * WE DON'T TAKE EVERYONE — the brand's loudest section, on purpose.
 *
 * Full-bleed pink, ink type, no photographs: it's the one place on the page
 * the footage steps aside and the statement is the image. The casting sheet
 * is the same paper-and-tape vocabulary as the journey pages' casting board,
 * with the boxes ticking themselves as it scrolls in.
 *
 * It ends on the two lines that carry the whole idea, sliding past each other
 * in opposite directions as you scroll — the destination drifts off, the
 * people drift in.
 */
export function Curation() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["-30%", "6%"]);

  return (
    <section id="the-casting" className="relative overflow-hidden bg-pink text-ink">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:px-14">
        <p className="flex items-center gap-3 text-[11px] font-semibold tracked text-ink/70">
          <span className="h-px w-10 bg-ink/50" /> {curation.eyebrow}
        </p>

        {/*
          A MASK REVEAL, NOT A CLIP-PATH ONE.

          The headline used to animate its own clip-path from fully clipped, and
          whileInView watches the element it is set on — a fully clipped element
          never counts as in view, so it never started and the section opened
          on a screen of blank pink. The observed element is now the h2 itself,
          which is never clipped; each line slides up out of its own overflow
          mask, so the same effect plays and nothing can hide the trigger.
        */}
        <motion.h2
          className="mt-5 font-display text-[clamp(3.6rem,17vw,13rem)] uppercase leading-[0.84] tracking-[-0.02em]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {curation.headline.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 1 ? "text-sand" : ""}`}
                variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.9, ease } } }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-20">
          <div className="max-w-[36rem] space-y-5">
            {curation.body.map((b, i) => (
              <p key={b} className={i === 0 ? "font-serif text-[clamp(1.5rem,4.8vw,2.4rem)] leading-[1.1]" : "text-[clamp(1.05rem,2.8vw,1.2rem)] leading-[1.5] text-ink/80"}>
                {b}
              </p>
            ))}
            <p className="border-l-2 border-ink pl-4 text-[clamp(1rem,2.6vw,1.1rem)] font-medium leading-[1.45]">{curation.isnt}</p>
          </div>

          {/* the casting sheet */}
          <motion.div
            className="relative bg-sand p-6 pb-8 shadow-[0_24px_50px_-20px_rgba(43,15,28,0.6)] sm:p-8"
            style={{ rotate: 2 }}
            initial={reduce ? undefined : { opacity: 0, y: 40, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xl tracking-[0.04em]">{curation.lookFor.title}</p>
              <span className="border-2 border-pink px-2 py-0.5 text-[9px] font-semibold tracked text-pink -rotate-6">{curation.lookFor.stamp}</span>
            </div>
            <ul className="mt-5 space-y-3">
              {curation.lookFor.items.map((it, i) => (
                <li key={it} className="flex items-center gap-3 border-b border-dashed border-ink/20 pb-2.5">
                  <span className="relative block h-5 w-5 shrink-0 border-2 border-ink" aria-hidden>
                    <motion.svg viewBox="0 0 24 24" className="absolute -left-1 -top-2 h-7 w-7 text-pink">
                      <motion.path
                        d="M4 13 L10 19 L22 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={reduce ? undefined : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                  <span className="font-hand text-[1.55rem] leading-none">{it}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 -rotate-2 text-right font-hand text-xl text-pink">{curation.lookFor.note}</p>
          </motion.div>
        </div>
      </div>

      {/* the statement */}
      <div ref={ref} className="relative overflow-hidden border-t-2 border-ink bg-ink py-10 text-sand sm:py-14" aria-label={curation.statement.join(" ")}>
        <motion.p
          className="whitespace-nowrap font-display text-[clamp(3.4rem,13vw,11rem)] uppercase leading-[0.95] text-transparent [-webkit-text-stroke:1.5px_rgba(255,241,220,0.7)]"
          style={reduce ? undefined : { x: leftX }}
          aria-hidden
        >
          {curation.statement[0]} {curation.statement[0]}
        </motion.p>
        <motion.p
          className="whitespace-nowrap font-display text-[clamp(3.4rem,13vw,11rem)] uppercase leading-[0.95] text-pink"
          style={reduce ? undefined : { x: rightX }}
          aria-hidden
        >
          {curation.statement[1]} {curation.statement[1]}
        </motion.p>
      </div>
    </section>
  );
}
