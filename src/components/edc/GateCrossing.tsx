"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { crossing } from "@/content/thailand";
import { Note } from "../Bits";
import { StageArch } from "./StageArch";
import { Confetti } from "./Confetti";
import { HouseFlash, LaserFan, ScanSheets, StageLights } from "./StageLights";

/**
 * THE CROSSING — you scroll, and the gates open.
 *
 * ─── WHY THIS SECTION EXISTS ────────────────────────────────────────────────
 * The page's whole metaphor is a credential: the hero is THE GATE, the facts
 * are THE PASS, every section slate is a gate slate. Until this existed the
 * page SAID that and never made you do it. Scrolling through a set of opening
 * gates turns the metaphor into something that happens to you — and it costs
 * the visitor nothing, because they were going to scroll anyway.
 *
 * It sits between the hero and the LED ribbon on purpose. You come off the
 * footage, walk through the gate, and the first thing inside is the venue's
 * ribbon board. That order is the narrative.
 *
 * ─── HOW IT WORKS ───────────────────────────────────────────────────────────
 * This is the only section on the site driven by scroll POSITION rather than
 * by entering the viewport. A tall outer section provides the scroll distance;
 * an inner `sticky` screen holds still while you move through it. Everything
 * derives from one `useScroll` progress value, 0 → 1:
 *
 *     0.00  gates shut, one seam of light, reader waiting
 *     0.22  reader reads
 *     0.20  the leaves begin to part
 *     0.40  the wash rig strikes, one pair at a time — the build
 *     0.44  ACCESS GRANTED
 *     0.58  THE DROP: house flash and the whole laser fan on one frame
 *     0.72  confetti
 *     0.85  YOU'RE IN.
 *
 * ─── EVERY MOVE IS TRANSFORM OR OPACITY ─────────────────────────────────────
 * The leaves translate, the light scales, the type fades. Nothing animates a
 * property that triggers layout, so the whole sequence stays on the
 * compositor. The gate surfaces themselves are static CSS — see the block at
 * the bottom of globals.css.
 *
 * ─── REDUCED MOTION ─────────────────────────────────────────────────────────
 * The section collapses to a short, already-open state: no sticky, no scroll
 * binding, no movement. Someone who has asked for less motion should not be
 * handed a scroll-jacked corridor, and the payoff line still reads.
 */

/** Where the leaves end up. Past the viewport edge, so no sliver remains. */
const OPEN = 108;

export function GateCrossing() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  /*
    "start start" → the top of the section meets the top of the viewport.
    "end end"     → the bottom of the section meets the bottom.
    Between those two the sticky child is pinned, which is exactly the
    window in which the gates should be moving.
  */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The leaves hold shut for the first fifth, so the closed gate registers
  // before anything moves. Nothing worse than a gate already opening.
  const leftX = useTransform(scrollYProgress, [0.2, 0.9], ["0%", `-${OPEN}%`]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.9], ["0%", `${OPEN}%`]);

  const beyondOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0.35, 1]);

  // The signage on the closed gates goes as the gates go.
  const signOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

  // The payoff arrives last and stays.
  const payoffOpacity = useTransform(scrollYProgress, [0.68, 0.88], [0, 1]);
  const payoffY = useTransform(scrollYProgress, [0.68, 0.88], [26, 0]);
  const asideOpacity = useTransform(scrollYProgress, [0.82, 0.96], [0, 1]);

  /*
    THE CONFETTI, FIRED ONCE.

    Armed when the gates are essentially open, at the same moment the payoff
    line arrives. It is a state flag rather than another useTransform because
    confetti is an EVENT — it happens, it falls, it is gone — where everything
    else in this section is a position you can scrub back and forth.

    `popped` is latched and never reset: scrolling up and back down does not
    re-fire it. A celebration that happens every time you pass a point stops
    being a celebration and becomes wallpaper. It also unmounts itself after
    the last piece has fallen, so ninety animating elements do not ride along
    for the rest of the page.
  */
  const [popped, setPopped] = useState(false);
  const clearAt = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.72 || popped || reduce) return;
    setPopped(true);
    clearAt.current = window.setTimeout(() => setPopped(false), 6000);
  });

  /* ---------------- reduced motion: the open state, and nothing else ------- */
  if (reduce) {
    return (
      <section className="relative overflow-hidden bg-[#0a0414] px-5 py-20 text-center sm:px-8">
        <div className="edc-gate-beyond absolute inset-0" aria-hidden />
        <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative">
          <span className="edc-meta !text-[9px]">{crossing.scan.granted}</span>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,10vw,5.5rem)] uppercase leading-[0.9] text-sand edc-glow-max">
            {crossing.payoff}
          </h2>
          <Note className="mt-4 block text-[1.35rem] text-sand/70" rotate={-3}>
            {crossing.aside}
          </Note>
          <span className="edc-meta mt-5 block !text-[9px]">{crossing.meta}</span>
        </div>
      </section>
    );
  }

  return (
    /*
      118vh: one pinned screen plus about a fifth of a screen of travel.

      It has been cut twice — 180vh, then 130vh, now this. Both earlier values
      held the viewport long enough that the section stopped reading as a beat
      and started reading as the page having jammed. At 118vh the whole
      sequence lands inside a single unhurried swipe, which is what it should
      have been: a moment you pass through, not a place you get stuck.
    */
    <section ref={ref} className="relative h-[118vh] bg-[#0a0414]" aria-label="Entering the festival">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* ---------- what is through the gate ---------- */}
        <motion.div className="edc-gate-beyond" style={{ opacity: beyondOpacity }} aria-hidden />

        {/*
          THE LIGHT SHOW — build, then drop.

          The soft wash beams strike one pair at a time from 0.40, which is the
          build. At 0.58 the house flash and the whole laser fan hit on a single
          frame together, which is the drop. Everything holds lit after that so
          you are walking through a rig that is already on.

          The three static CSS beams that used to live here were replaced by
          this: they scaled up smoothly and evenly, which read as a gradient
          growing rather than lights coming on.
        */}
        <StageLights progress={scrollYProgress} />
        <LaserFan progress={scrollYProgress} />
        <ScanSheets progress={scrollYProgress} />
        <HouseFlash progress={scrollYProgress} />

        {/*
          THE CONFETTI, IN THE BACKGROUND.

          It sits here — above the light, below the gate structure, the reader
          and the payoff — so it falls BEHIND everything you have to read. When
          it rendered on top it crossed "YOU'RE IN." and cost that line most of
          its contrast, which is exactly the trade a page should never make for
          a decoration.
        */}
        {popped && <Confetti />}

        {/* ---------- the two halves of the stage ----------
            Each leaf is the same <StageArch/>, the right one mirrored, so the
            closed state is one symmetrical structure rather than two panels
            that happen to touch. See StageArch.tsx for why it is generic
            festival architecture and not a particular stage. */}
        <motion.div className="edc-gate-leaf edc-gate-leaf--left" style={{ x: leftX }} aria-hidden>
          <StageArch className="absolute inset-0 h-full w-full" />
        </motion.div>
        <motion.div className="edc-gate-leaf edc-gate-leaf--right" style={{ x: rightX }} aria-hidden>
          <StageArch className="absolute inset-0 h-full w-full -scale-x-100" />
        </motion.div>


        {/* ---------- signage on the closed gates ---------- */}
        {/*
          Gate signage on its own board.

          It used to sit bare between the owl's eyes, which are the two
          brightest objects on the structure — the type had nothing to hold
          against. Real gate signage is a panel bolted to the frame, so this is
          one, and it solves the contrast problem by being the thing it
          actually is.
        */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[7%] flex justify-center"
          style={{ opacity: signOpacity }}
        >
          <span className="edc-reader flex flex-col items-center gap-1.5 px-6 py-2.5">
            <span className="font-display text-[clamp(1rem,3.4vw,1.7rem)] uppercase tracking-[0.22em] text-sand">
              {crossing.gateMark}
            </span>
            <span className="edc-meta !text-[9px]">{crossing.approach}</span>
          </span>
        </motion.div>

        {/* ---------- the wristband reader ---------- */}
        <ScanReader progress={scrollYProgress} />

        {/*
          A dark pool under the payoff.

          The light beyond the gates is at its brightest exactly where this
          text lands, and sand-on-magenta at that brightness has almost no
          separation — "YOU'RE IN." came out looking grey and washed. This is
          one soft radial, fading in with the line it protects, which restores
          the contrast without putting a visible box on the screen.
        */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%]"
          style={{
            opacity: payoffOpacity,
            background:
              "radial-gradient(70% 100% at 50% 78%, rgba(10,4,20,0.82) 0%, rgba(10,4,20,0.45) 45%, transparent 78%)",
          }}
          aria-hidden
        />

        {/* ---------- the payoff, once you are through ---------- */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[18%] flex flex-col items-center px-5 text-center"
          style={{ opacity: payoffOpacity, y: payoffY }}
        >
          <h2 className="font-display text-[clamp(2.6rem,12vw,7rem)] uppercase leading-[0.88] text-sand edc-glow-max">
            {crossing.payoff}
          </h2>
          <motion.div style={{ opacity: asideOpacity }}>
            <Note className="mt-3 block text-[clamp(1.2rem,4vw,1.7rem)] text-sand/75" rotate={-3}>
              {crossing.aside}
            </Note>
            <span className="edc-meta mt-4 block !text-[9px]">{crossing.meta}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The reader bolted to the gate, stepping through its three states as you
 * approach. It is deliberately NOT interactive: this one scans you because you
 * arrived, which is what a gate reader does. The wristband you can actually
 * play with lives further down the page.
 */
function ScanReader({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  /*
    The three windows barely overlap — 0.03 of crossfade, about 15px of scroll.

    They used to overlap by 0.06 each, which looked fine in the abstract and
    was unreadable in practice: three different-length strings stacked at the
    same position, two of them half-visible, reading as "READING GRANTED". A
    reader that says two things at once is not a reader.
  */
  const waiting = useTransform(progress, [0, 0.19, 0.22], [1, 1, 0]);
  const reading = useTransform(progress, [0.22, 0.25, 0.41, 0.44], [0, 1, 1, 0]);
  const granted = useTransform(progress, [0.44, 0.47, 0.95, 1], [0, 1, 1, 0.85]);

  // The scan line sweeping the reader window while it reads.
  const lineY = useTransform(progress, [0.2, 0.48], ["-120%", "120%"]);
  const readerGlow = useTransform(progress, [0.42, 0.52], [0.35, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: readerGlow }}
      aria-hidden
    >
      <div className="edc-reader relative w-[168px] px-3 py-3 sm:w-[196px]">
        {/* the reader window */}
        <div className="relative h-10 overflow-hidden border border-sand/15 bg-[#05020c]">
          <motion.div
            className="absolute inset-x-0 h-6"
            style={{
              y: lineY,
              background:
                "linear-gradient(180deg, transparent, rgba(255,46,126,0.85), transparent)",
            }}
          />
        </div>

        {/*
          The three states, stacked and cross-faded so the box never resizes.

          Each one is a motion wrapper carrying ONLY the animated opacity, with
          the styling on a plain child. That split is load-bearing: `edc-meta`
          sets its own opacity and the Tailwind opacity utilities compile to
          `!important`, either of which silently overrides framer's inline
          style. Putting both on one element made all three states visible at
          once — the granted line bled through the waiting one.
        */}
        <div className="relative mt-2.5 h-4">
          <motion.span className="absolute inset-0" style={{ opacity: waiting }}>
            <span className="edc-meta !text-[9px]">{crossing.scan.waiting}</span>
          </motion.span>
          <motion.span className="absolute inset-0" style={{ opacity: reading }}>
            <span className="edc-meta !text-[9px]">{crossing.scan.reading}</span>
          </motion.span>
          <motion.span className="absolute inset-0" style={{ opacity: granted }}>
            <span className="edc-meta !text-[9px]" style={{ color: "#FF2E7E", opacity: 1 }}>
              {crossing.scan.granted}
            </span>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
