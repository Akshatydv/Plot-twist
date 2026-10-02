"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { notATour } from "@/content/home";

/**
 * THIS ISN'T A TRIP. — the hand-off from the hero into the world.
 *
 * A pinned, scroll-scrubbed sequence (the only one on the page that plays
 * with type at this scale):
 *
 *   1. THIS ISN'T / A TRIP.       — and a pink line strikes out A TRIP.
 *   2. IT'S A / PLOT TWIST.       — the second line is cut out of footage
 *   3. the camera flies THROUGH the letters of PLOT TWIST. into the photo
 *   4. the two sentences that explain the brand land over that photo
 *
 * Scrubbed, not triggered: the visitor controls the speed, and scrolling back
 * plays it backwards. Reduced motion gets the same four beats stacked flat.
 */
export function NotATour() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 1 — THIS ISN'T A TRIP.
  const aOpacity = useTransform(p, [0, 0.04, 0.3, 0.37], [0.2, 1, 1, 0]);
  const aY = useTransform(p, [0.28, 0.37], ["0%", "-18%"]);
  const strike = useTransform(p, [0.12, 0.24], [0, 1]);

  // 2 — IT'S A PLOT TWIST.
  // Faded out and unmounted from paint once we're through the letters: a
  // background-clipped layer at 8× is enormous, and leaving it composited
  // behind the photo blanks the whole frame on some GPUs.
  const bOpacity = useTransform(p, [0.36, 0.44, 0.72, 0.78], [0, 1, 1, 0]);
  const bVisibility = useTransform(p, (v) => (v > 0.34 && v < 0.79 ? "visible" : "hidden"));
  const bScale = useTransform(p, [0.36, 0.46, 0.6, 0.78], [0.86, 1, 1, 8]);
  const leadOpacity = useTransform(p, [0.4, 0.46, 0.58, 0.63], [0, 1, 1, 0]);
  const bgPos = useTransform(p, [0.36, 0.7], ["30% 40%", "70% 60%"]);

  // 3 — through the letters
  const revealOpacity = useTransform(p, [0.66, 0.78], [0, 1]);
  const revealScale = useTransform(p, [0.66, 1], [1.25, 1]);

  // 4 — the explanation
  const bodyOpacity = useTransform(p, [0.8, 0.88], [0, 1]);
  const bodyY = useTransform(p, [0.8, 0.9], [40, 0]);

  if (reduce) return <Static />;

  return (
    <section ref={ref} id="about" className="relative h-[340vh] bg-[#1a0d0a] text-sand" aria-label="This isn't a trip. It's a plot twist.">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 z-30" />

        {/* 1 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center" style={{ opacity: aOpacity, y: aY }}>
          <p className="font-display text-[20vw] uppercase sm:text-[clamp(3.4rem,16vw,12rem)] leading-[0.86] tracking-[-0.01em]">{notATour.a[0]}</p>
          <p className="relative font-display text-[20vw] uppercase sm:text-[clamp(3.4rem,16vw,12rem)] leading-[0.86] tracking-[-0.01em] text-sand/90">
            {notATour.a[1]}
            <motion.span
              className="absolute left-[-4%] top-[48%] h-[0.09em] w-[108%] origin-left -rotate-[4deg] bg-pink"
              style={{ scaleX: strike }}
              aria-hidden
            />
          </p>
        </motion.div>

        {/* 2 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center" style={{ opacity: bOpacity, visibility: bVisibility }}>
          <motion.p className="mb-2 font-brush text-[clamp(1.8rem,7vw,4rem)] leading-none text-[#FFE9A8]" style={{ opacity: leadOpacity }}>
            {notATour.b[0]}
          </motion.p>
          <motion.p
            className="font-display text-[31vw] uppercase leading-[0.82] tracking-[-0.02em] sm:text-[clamp(4rem,19vw,15rem)]"
            style={{
              scale: bScale,
              backgroundImage: `linear-gradient(180deg,rgba(255,79,135,0.15),rgba(255,122,61,0.2)),url(${notATour.image})`,
              backgroundSize: "cover",
              backgroundPosition: bgPos,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,241,220,0.25)",
            }}
          >
            {/* two lines on phones, one on anything wider */}
            {notATour.b[1].split(" ")[0]}
            <br className="sm:hidden" /> {notATour.b[1].split(" ").slice(1).join(" ")}
          </motion.p>
        </motion.div>

        {/* 3 */}
        <motion.div className="absolute inset-0 z-10" style={{ opacity: revealOpacity, scale: revealScale }}>
          <Image src={notATour.reveal} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,13,10,0.35)_0%,rgba(26,13,10,0.55)_45%,rgba(26,13,10,0.92)_100%)]" />
        </motion.div>

        {/* 4 */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 px-5 pb-[12svh] sm:px-8 lg:px-14"
          style={{ opacity: bodyOpacity, y: bodyY }}
        >
          <p className="font-display text-[clamp(1rem,3vw,1.3rem)] tracking-[0.1em] text-[#FFE9A8]">{notATour.b.join(" ")}</p>
          <div className="mt-5 max-w-[34rem] space-y-4">
            {notATour.body.map((line) => (
              <p key={line} className="font-serif text-[clamp(1.35rem,4.4vw,2.2rem)] leading-[1.15]">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 -rotate-3 font-hand text-[1.6rem] leading-none text-pink">{notATour.note}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Static() {
  return (
    <section id="about" className="relative bg-[#1a0d0a] px-5 py-24 text-sand sm:px-8 lg:px-14">
      <p className="font-display text-[clamp(3rem,14vw,9rem)] uppercase leading-[0.88]">{notATour.a[0]}</p>
      <p className="font-display text-[clamp(3rem,14vw,9rem)] uppercase leading-[0.88] text-sand/50 line-through decoration-pink">
        {notATour.a[1]}
      </p>
      <p className="mt-10 font-brush text-[clamp(1.8rem,7vw,3.6rem)] text-[#FFE9A8]">{notATour.b[0]}</p>
      <p className="font-display text-[clamp(3rem,14vw,9rem)] uppercase leading-[0.88] text-pink">{notATour.b[1]}</p>
      <div className="mt-10 max-w-[34rem] space-y-4">
        {notATour.body.map((line) => (
          <p key={line} className="font-serif text-[clamp(1.3rem,4vw,2rem)] leading-[1.15]">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
