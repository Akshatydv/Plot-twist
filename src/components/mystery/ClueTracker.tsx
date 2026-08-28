"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { plotHunt } from "@/content/mystery";
import { usePlot } from "./PlotProvider";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A margin note that follows you down the page — not a HUD. Sits bottom-left,
 * compact enough to keep clear of content and the CTA buttons.
 */
export function ClueTracker() {
  const { count, total, ready, guessState } = usePlot();
  const reduce = useReducedMotion();

  // Once the destination is out, the tally has done its job — get it off screen.
  if (!ready || guessState === "solved") return null;

  const line = [...plotHunt.tracker.lines].reverse().find((l) => count >= l.min)?.text ?? "";

  return (
    <motion.aside
      className="pointer-events-none fixed bottom-3 left-3 z-40 sm:bottom-5 sm:left-5"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease }}
      aria-live="polite"
    >
      <div
        className="relative flex items-center gap-2.5 border border-sand/25 bg-[#1a0812]/80 px-2.5 py-1.5 backdrop-blur-sm sm:gap-3 sm:px-3 sm:py-2"
        style={{ rotate: "-1.5deg" }}
      >
        <span className="text-[8px] tracked text-sand/50 sm:text-[9px]">{plotHunt.tracker.label}</span>

        <span className="flex items-baseline gap-0.5">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              className="font-display text-[15px] leading-none text-pink sm:text-[17px]"
              initial={reduce ? undefined : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
            >
              {String(count).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="font-display text-[13px] leading-none text-sand/45 sm:text-[15px]">
            /{String(total).padStart(2, "0")}
          </span>
        </span>

        <span className="hidden h-3 w-px bg-sand/20 sm:block" aria-hidden />
        <span className="hidden max-w-[15ch] font-hand text-[13px] leading-tight text-sand/65 sm:block">{line}</span>
      </div>
    </motion.aside>
  );
}
