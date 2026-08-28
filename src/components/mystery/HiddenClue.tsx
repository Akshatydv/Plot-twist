"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { plotHunt, type ClueId } from "@/content/mystery";
import { usePlot } from "./PlotProvider";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Wraps an existing decorative element and quietly makes it findable.
 *
 * Deliberately not announced: no icon, no "click me". It reads as ordinary
 * page furniture until you hover, focus or tap it. Keyboard-reachable so the
 * hunt doesn't depend on hover, which phones don't have.
 */
export function HiddenClue({
  id,
  children,
  className = "",
  noteClassName = "",
  align = "left",
  /** Inline style, not a Tailwind class — a real cap the primary clues'
   * full-sentence reveals actually need, immune to utility-order ambiguity. */
  noteWidth = "13rem",
}: {
  id: ClueId;
  children: React.ReactNode;
  className?: string;
  noteClassName?: string;
  align?: "left" | "right";
  noteWidth?: string;
}) {
  const { isFound, discover, rungFor } = usePlot();
  const reduce = useReducedMotion();
  const found = isFound(id);

  // Primary clues hand over a rung of the ladder (chosen by discovery order);
  // bonus finds just get a wisecrack.
  const rung = rungFor(id);
  const bonusNote = plotHunt.bonus[id];

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => discover(id)}
        data-clue-id={id}
        aria-label={found ? "Clue already found" : "Something here. Take a closer look."}
        className="group relative block cursor-pointer touch-manipulation border-0 bg-transparent p-0 text-left outline-none"
      >
        {/* the only tell: a faint mark that surfaces on hover or focus */}
        <motion.span
          className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 border border-dashed"
          style={{ borderColor: found ? "rgba(54,201,111,0.55)" : "rgba(255,79,135,0.55)" }}
          initial={false}
          animate={{ opacity: found ? 0.5 : 0 }}
          whileHover={reduce ? undefined : { opacity: 0.85 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        />
        <span className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 border border-dashed border-pink/0 opacity-0 transition-opacity duration-300 group-hover:border-pink/60 group-hover:opacity-100 group-focus-visible:border-pink/80 group-focus-visible:opacity-100" aria-hidden />
        {children}
      </button>

      <AnimatePresence>
        {found && (rung || bonusNote) && (
          <motion.span
            className={`pointer-events-none absolute top-full z-30 mt-2 block ${
              align === "right" ? "right-0" : "left-0"
            } ${noteClassName}`}
            style={{ width: "max-content", maxWidth: noteWidth }}
            initial={reduce ? undefined : { opacity: 0, y: -6, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            {rung ? (
              /* a torn scrap of the casting file, not a tooltip */
              <span className="block border-l-[3px] border-[#36C96F] bg-[#150711]/92 px-3 py-2 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.85)] backdrop-blur-[2px]">
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-[11px] leading-none text-[#36C96F]">CLUE {rung.step}</span>
                  <span className="text-[8.5px] tracked text-sand/45">{rung.kicker}</span>
                </span>
                <span className="mt-1.5 block font-hand text-[1.05rem] leading-[1.25] text-sand">{rung.reveal}</span>
                <span className="mt-1 block font-hand text-[0.9rem] leading-none text-[#36C96F]/75">{rung.note}</span>
              </span>
            ) : (
              <span className="block font-hand text-[0.95rem] leading-[1.15] text-[#36C96F]">{bonusNote}</span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
