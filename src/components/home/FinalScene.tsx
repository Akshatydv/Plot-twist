"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { finalScene, MEDIA } from "@/content/home";
import { brand } from "@/content/site";
import { InstagramLink } from "../InstagramLink";
import { Footage } from "./Footage";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE LAST SCENE — the end of the film, not a "ready to travel?" box.
 *
 * Full-screen footage. As you scroll into it the type settles from oversized
 * to its resting size; as you scroll out, letterbox bars close in from top
 * and bottom like the end of a picture, and the footer rolls on as credits.
 */
export function FinalScene() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigScale = useTransform(p, [0.1, 0.5], [1.25, 1]);
  const bigOpacity = useTransform(p, [0.15, 0.4], [0, 1]);
  const bars = useTransform(p, [0.55, 0.95], ["0%", "34%"]);
  const mediaY = useTransform(p, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black text-sand">
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduce ? undefined : { y: mediaY }}>
        <Footage slot={MEDIA.FINAL_CTA_VIDEO} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,4,10,0.55)_0%,rgba(10,4,10,0.35)_40%,rgba(10,4,10,0.85)_100%)]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-8">
        <motion.h2
          className="font-display text-[clamp(3.4rem,15vw,12rem)] uppercase leading-[0.86] tracking-[-0.02em]"
          style={reduce ? undefined : { scale: bigScale, opacity: bigOpacity }}
        >
          {finalScene.big[0]}
          <br />
          <span className="text-[#FFE9A8]">{finalScene.big[1]}</span>
        </motion.h2>

        <motion.p
          className="mt-8 font-serif text-[clamp(1.3rem,4vw,2.1rem)] italic leading-[1.15] text-sand/90"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          {finalScene.line[0]}
          <br />
          <span className="not-italic font-brush text-pink">{finalScene.line[1]}</span>
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          <a
            href={finalScene.primary.href}
            className="group inline-flex touch-manipulation items-center gap-3 bg-sand px-7 py-4 text-[13px] font-semibold uppercase tracked text-ink shadow-[6px_6px_0_0_#FF4F87] transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            {finalScene.primary.label} <span className="transition-transform group-hover:translate-x-1.5" aria-hidden>→</span>
          </a>
          <InstagramLink
            href={brand.instagramUrl}
            className="border-b border-sand/50 pb-1 text-[12px] font-medium uppercase tracked text-sand/90 transition-colors hover:border-pink"
          >
            {finalScene.secondary.label} →
          </InstagramLink>
        </motion.div>
      </div>

      {!reduce && (
        <>
          <motion.div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-black" style={{ height: bars }} aria-hidden />
          <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-start justify-center bg-black" style={{ height: bars }} aria-hidden>
            <span className="mt-6 text-[10px] tracked text-sand/50">{finalScene.credit}</span>
          </motion.div>
        </>
      )}
    </section>
  );
}
