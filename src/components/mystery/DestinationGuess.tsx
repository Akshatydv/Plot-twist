"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { plotHunt } from "@/content/mystery";
import { useJourney } from "./JourneyProvider";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note } from "../Bits";
import { CircleScribble, MarkerUnderline } from "../Brush";
import { usePlot } from "./PlotProvider";
import { RewardReveal } from "./RewardReveal";

const ease = [0.22, 1, 0.36, 1] as const;
const G = plotHunt.guess;

export function DestinationGuess() {
  const journey = useJourney();
  const { guessState, wrongIndex, submitGuess, count, ready } = usePlot();
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const startedRef = useRef(false);

  const solved = guessState === "solved";

  /** Fires once, when they actually start typing a theory. */
  const onFirstType = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track(PLOT_EVENTS.guessStarted, { clue_progress: count });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const right = submitGuess(value);
    if (right) setValue("");
  };

  return (
    <section
      id="guess"
      className="relative overflow-hidden px-5 py-16 text-sand sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(110% 80% at 20% 10%, #2c0d28 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[720px] text-center">
        <AnimatePresence mode="wait">
          {/* ---- guessing ---- */}
          {/*
            No longer gated on clue count — canGuess is always true (see
            PlotProvider). Anyone can try a guess from zero clues on; the
            clue count still decides the reward-odds tier on a correct one.
          */}
          {ready && !solved && (
            <motion.div
              key="open"
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <h2 className="relative inline-block font-display text-[clamp(2rem,7.4vw,4rem)] uppercase leading-[0.92] text-sand">
                {G.title}
                <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-full" />
              </h2>
              <p className="mx-auto mt-5 max-w-[36ch] font-serif text-[clamp(1.05rem,2.6vw,1.35rem)] italic leading-[1.35] text-sand/85">
                {G.body}
              </p>

              <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-[440px] flex-col items-stretch gap-4">
                <label htmlFor="plot-guess" className="sr-only">
                  Your guess for the destination
                </label>
                <input
                  id="plot-guess"
                  name="guess"
                  type="text"
                  autoComplete="off"
                  value={value}
                  onChange={(e) => { onFirstType(); setValue(e.target.value); }}
                  placeholder={G.placeholder}
                  className="w-full border-0 border-b-2 border-sand/30 bg-transparent px-0 py-3 text-center font-display text-[clamp(1.3rem,5vw,2rem)] uppercase tracking-[0.04em] text-sand outline-none transition-colors placeholder:font-sans placeholder:text-[0.6em] placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-sand/30 focus:border-pink"
                />
                <button
                  type="submit"
                  className="group mx-auto inline-flex touch-manipulation items-center gap-3 bg-sand px-8 py-4 text-[13px] font-semibold tracked uppercase text-ink transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
                  style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
                >
                  {G.submit}
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                    →
                  </span>
                </button>
              </form>

              <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  {guessState === "wrong" && (
                    <motion.div
                      key={`wrong-${wrongIndex}`}
                      initial={reduce ? undefined : { opacity: 0, y: 8, rotate: -2 }}
                      animate={{ opacity: 1, y: 0, rotate: -1 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <div className="font-display text-[clamp(1.4rem,5vw,2.2rem)] uppercase leading-none text-[#FF7A3D]">
                        {G.wrong[wrongIndex].big}
                      </div>
                      <Note className="mt-2 inline-block text-[1.25rem] text-sand/70" rotate={-2}>
                        {G.wrong[wrongIndex].small}
                      </Note>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ---- solved ---- */}
          {ready && solved && (
            <motion.div
              key="solved"
              initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.div
                className="font-display text-[clamp(1.1rem,3.4vw,1.5rem)] tracking-[0.14em] text-[#36C96F]"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease }}
              >
                {G.correct.kicker}
              </motion.div>

              <motion.h2
                className="mt-3 font-serif text-[clamp(1.6rem,5vw,2.6rem)] italic leading-[1.1] text-sand"
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease }}
              >
                {G.correct.title}
              </motion.h2>

              {/* the reveal */}
              <motion.div
                className="relative mx-auto mt-7 inline-block px-8 py-3"
                initial={reduce ? undefined : { opacity: 0, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 180, damping: 14 }}
              >
                <CircleScribble
                  color="#FF4F87"
                  className="pointer-events-none absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)]"
                />
                <span className="relative font-brush text-[clamp(3rem,13vw,6.5rem)] leading-[0.9] text-[#FFE9A8]">
                  {journey.destination.name}
                </span>
              </motion.div>

              <motion.p
                className="mx-auto mt-8 max-w-[40ch] text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.5] text-sand/80"
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                {journey.solvedBody}
              </motion.p>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease }}
              >
                <Note className="mt-6 block text-[1.35rem] text-[#FFD75E]" rotate={-3}>
                  {G.correct.note}
                </Note>
              </motion.div>

              {/*
                The reward takes over from here — it carries the MAKE YOUR CASE
                CTA, so the destination reveal no longer ends with its own.
              */}
              <RewardReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
