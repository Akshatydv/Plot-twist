"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { threshold } from "@/content/chaos";
import { useCalm } from "../bir/Scenery";

/**
 * THE THRESHOLD — where the page stops being a holiday.
 *
 * It sits between World 03 (the last afternoon, bone paper, serif italic) and
 * World 04 (the first night, near-black, Anton caps). Everything before it is
 * lowercase and has air; nothing after it is either, until the morning.
 *
 * ─── WHY THIS EXISTS AT ALL ─────────────────────────────────────────────────
 * The two halves of this trip were legible as different colours and not as
 * different places. Changing the typeface at the gate does most of the work,
 * but a reader needs ONE moment where the change is acknowledged, or it reads
 * as an inconsistency rather than a decision. This is that moment: the only
 * place on the page that talks about the page.
 *
 * ─── THE MECHANISM ──────────────────────────────────────────────────────────
 * Four lines, each arriving on its own, each in Anton — the first Anton on the
 * page. They stack as you scroll, so by the end you are looking at a block of
 * capitals where a minute ago there was an empty beach at 3pm. The last thing
 * to arrive is the gates time, in the tracked metadata style the festival half
 * uses for everything.
 *
 * The background does nothing. No footage, no gradient drama — this is the one
 * screen where the type is the entire event, which is also why it is the only
 * section on the page with nothing behind it.
 */
export function Threshold() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  /* The violet rises out of the floor as the lines land — the same colour the
     countdown crossing is about to use, so the two read as one movement. */
  const glow = useTransform(p, [0.2, 0.75], [0, 0.55]);

  return (
    <section
      ref={ref}
      aria-label={threshold.big.join(" ")}
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#07040D] px-5 py-24 sm:px-8 lg:px-14"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          opacity: calm ? 0.3 : glow,
          background: "linear-gradient(0deg, rgba(139,61,255,0.5) 0%, rgba(139,61,255,0.08) 62%, rgba(139,61,255,0) 100%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <motion.p
          className="text-[10px] font-semibold tracked text-[#FF2E7E] sm:text-[11px]"
          initial={calm ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          {threshold.small}
        </motion.p>

        {/* The first Anton on the page. From here it is the only face used
            until the sun comes up in World 06. */}
        {/* THE OBSERVER GOES ON THE PARENT, NOT THE LINES.
            Each line starts translated 105% down inside its own
            `overflow-hidden` wrapper — which means it is clipped to nothing, so
            an IntersectionObserver attached to the LINE reports a ratio of ~0
            and `amount` is never satisfied. The animation then simply never
            fires and the headline is invisible.

            So `whileInView` watches the <h2>, which is visible, and the lines
            animate by variant propagation. This is the same construction
            WorldCard and MaskLines use, for the same reason. */}
        <motion.h2
          className="mt-7 font-display uppercase leading-[0.86] tracking-[-0.01em] text-sand"
          initial={calm ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {threshold.big.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block text-[clamp(2.2rem,9vw,7rem)]"
                variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                transition={{ duration: 1.05, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          className="mt-10 text-[10px] tracked text-sand/55"
          initial={calm ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          {threshold.foot}
        </motion.p>
      </div>
    </section>
  );
}
