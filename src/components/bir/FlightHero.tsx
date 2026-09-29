"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/content/site";
import { hero, media } from "@/content/bir";
import { PLOT_EVENTS } from "@/lib/analytics";
import { JourneyMenu } from "../JourneyMenu";
import { PlotButton } from "../Bits";
import { Clouds, Footage, Glider, PanRidge, Ridge, useCalm } from "./Scenery";

/**
 * 00 · THE HERO — FLY INTO HIMACHAL, THEN LAND.
 *
 * One sticky frame, 230svh tall. The hero and the transition into Day 01 are
 * the same component because they are the same shot: there is no cut between
 * flying and landing, so there is no section boundary either.
 *
 *   0.00–0.30  flying. Ranges stream past at three airspeeds, the glider
 *              hangs in the thermals, the title holds.
 *   0.20–0.60  descent. The title lifts and blurs away; the whole scene
 *              scales up and rises — the ground is coming toward you.
 *   0.45–0.85  a cloud bank crosses the lens. "COMING DOWN INTO THE VALLEY."
 *   0.70–1.00  pine-dark ground fills the frame. That colour IS the first
 *              frame of the next section, so the hand-off has no seam.
 *
 * With a hero clip in content/bir.ts → media.hero, the footage plays over the
 * illustrated flight and the descent choreography runs over the footage
 * unchanged. Reduced motion gets one still screen and no descent.
 */
export function FlightHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const sceneScale = useTransform(p, [0, 0.3, 0.85], [1, 1.06, 1.75]);
  const sceneY = useTransform(p, [0, 0.3, 0.85], ["0%", "-2%", "-18%"]);
  const textOpacity = useTransform(p, [0, 0.12, 0.3], [1, 1, 0]);
  const textY = useTransform(p, [0, 0.3], [0, -90]);
  const textBlur = useTransform(p, [0.08, 0.3], ["blur(0px)", "blur(10px)"]);
  const cloud = useTransform(p, [0.4, 0.55, 0.72, 0.86], [0, 1, 1, 0]);
  const cloudScale = useTransform(p, [0.4, 0.86], [0.9, 1.6]);
  const ground = useTransform(p, [0.62, 0.96], ["135%", "0%"]);
  const words = useTransform(p, [0.46, 0.56, 0.74, 0.84], [0, 1, 1, 0]);
  const wordsY = useTransform(p, [0.46, 0.84], [40, -40]);
  const cue = useTransform(p, [0, 0.08], [1, 0]);

  const m = <T,>(v: T) => (reduce ? undefined : v);

  return (
    <section
      id="top"
      ref={ref}
      data-hud="hero"
      className={reduce ? "relative h-[100svh]" : "relative h-[230svh]"}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--bir-pine)]">
        {/* ── the camera ── */}
        <motion.div className="absolute inset-0" style={{ scale: m(sceneScale), y: m(sceneY), transformOrigin: "50% 80%" }}>
          <Footage slot={media.hero} eager drift>
            {/* sky: high-altitude morning, cold at the top and warm at the haze line */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, #6f93ad 0%, #a9cbe0 38%, #e6dccb 62%, #c9b89d 72%)" }}
            />
            <div
              className="absolute left-[64%] top-[16%] h-[40vmin] w-[40vmin] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,244,222,0.95) 0%, rgba(255,230,190,0.35) 30%, transparent 65%)" }}
            />

            {/* three airspeeds */}
            <PanRidge name="peaks" fill="#c7d3dc" duration={220} className="h-[62%]" />
            <PanRidge name="wide" fill="#8ea6b6" duration={150} className="h-[52%]" />
            <Clouds color="rgba(245,240,230,0.55)" banks={3} speed={2.2} className="top-[30%]" />
            <PanRidge name="mid" fill="#4d6a5c" duration={80} className="h-[40%]" />
            <PanRidge name="near" fill="#2c4436" duration={42} className="h-[30%]" />
            <PanRidge name="front" fill="#172a20" duration={22} className="h-[22%]" />

            {/* the glider — hanging, bobbing in the thermals */}
            <motion.div
              className="absolute left-[58%] top-[24%] w-[28vw] max-w-[220px] min-w-[110px] sm:left-[62%]"
              animate={reduce ? undefined : { y: [0, -14, 4, -8, 0], rotate: [-3, 2, -1, 3, -3] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Glider />
            </motion.div>

            <Clouds color="rgba(255,255,255,0.5)" banks={2} speed={4} className="top-[-10%]" />
          </Footage>
          {/* over the photograph: live cloud, so a still frame still moves like flight */}
          {media.hero.image && <Clouds color="rgba(255,255,255,0.28)" banks={3} speed={2.4} className="top-[10%]" />}
        </motion.div>

        {/* legibility: the type sits bottom-left, over the darkest ground */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,16,12,0.82) 0%, rgba(10,16,12,0.35) 40%, rgba(10,16,12,0) 62%), linear-gradient(to bottom, rgba(10,16,12,0.45), transparent 22%)" }}
        />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* ── the descent ── */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-[-20%]"
              style={{
                opacity: cloud,
                scale: cloudScale,
                background:
                  "radial-gradient(40% 35% at 30% 45%, #f3efe6 0%, transparent 70%), radial-gradient(45% 40% at 70% 55%, #e9e4d8 0%, transparent 72%), radial-gradient(60% 50% at 50% 50%, rgba(233,228,216,0.95) 0%, rgba(233,228,216,0.6) 50%, transparent 80%)",
              }}
            />
            <motion.div className="absolute inset-0" style={{ y: ground }} aria-hidden>
              <Ridge name="hills" fill="var(--bir-pine)" className="h-[30%]" style={{ bottom: "calc(100% - 1px)" }} />
              <div className="absolute inset-0 bg-[var(--bir-pine)]" />
            </motion.div>
            <motion.p
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif text-[clamp(2rem,8vw,5.5rem)] italic leading-[0.95] text-[var(--bir-char)]"
              style={{ opacity: words, y: wordsY }}
            >
              {hero.descent[0]}
              <br />
              {hero.descent[1]}
            </motion.p>
          </>
        )}

        {/* ── the type ── */}
        <motion.div
          className="relative z-10 flex h-full flex-col px-5 pb-10 pt-6 sm:px-8 sm:pb-12 lg:px-14"
          style={{ opacity: m(textOpacity), y: m(textY), filter: m(textBlur) }}
        >
          <header className="flex items-start justify-between gap-4">
            <JourneyMenu tone="night" />
            <div className="pt-2 text-right text-[10px] tracked text-[var(--bir-bone)]/80 sm:text-[11px]">
              {brand.metaNav.join("  /  ")}
              <div className="mt-2 font-hand text-lg normal-case tracking-normal text-[var(--bir-bone)]/70 sm:text-xl">{brand.instagram}</div>
            </div>
          </header>

          <div className="mt-auto">
            <motion.p
              className="text-[10px] font-semibold tracked text-[var(--bir-bone)]/75 sm:text-[11px]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {hero.kicker}
            </motion.p>

            <h1 className="mt-3 font-serif leading-[0.82] tracking-[-0.03em] text-[var(--bir-bone)]">
              <span className="sr-only">
                {hero.title[0]} × {hero.title[1]} — {hero.line}
              </span>
              <span aria-hidden className="flex flex-wrap items-baseline gap-x-[0.18em]">
                {[hero.title[0], "×", hero.title[1]].map((w, i) => (
                  <span key={i} className="overflow-hidden">
                    <motion.span
                      className={`block ${i === 1 ? "text-[clamp(2.4rem,9vw,6.5rem)] italic text-[var(--bir-ember)]" : "text-[clamp(4.6rem,20vw,15rem)]"}`}
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.2, delay: 0.35 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              aria-hidden
              className="mt-4 text-[clamp(1.05rem,3.6vw,1.9rem)] font-semibold tracked text-[var(--bir-bone)]"
              initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.95 }}
            >
              {hero.line}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2 }}
            >
              <span className="text-[11px] tracked text-[var(--bir-bone)]/70">{hero.meta}</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <PlotButton href={hero.cta.href} bg="#EFE9DD" fg="#101311" shadow="#E8793A" event={PLOT_EVENTS.requestInvite}>
                  {hero.cta.label}
                </PlotButton>
                <a href={hero.secondary.href} className="text-[11px] font-semibold tracked text-[var(--bir-bone)]/80 underline decoration-[var(--bir-bone)]/30 underline-offset-[6px] hover:text-[var(--bir-bone)]">
                  {hero.secondary.label} <span aria-hidden>↓</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-4 right-5 z-10 flex flex-col items-center gap-2 text-[9px] tracked text-[var(--bir-bone)]/60 sm:right-8 lg:right-14"
            style={{ opacity: cue }}
          >
            <span className="font-hand text-base normal-case tracking-normal">{hero.scribble}</span>
            <motion.span
              className="block h-10 w-px bg-[var(--bir-bone)]/50"
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
