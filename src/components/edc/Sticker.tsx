"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * THE STICKERS — the page's toy layer.
 *
 * ─── WHAT THEY ARE ──────────────────────────────────────────────────────────
 * Small rave-flyer stickers, scattered down the page, that a visitor can pick
 * up and throw around. Drag one and it follows; let go and it springs back
 * with a wobble. Tap one and it pops and fires a small burst of light.
 *
 * ─── WHY THEY BELONG ON THIS PAGE SPECIFICALLY ──────────────────────────────
 * Plot Twist's whole visual system is a scrapbook — tape, rotation, red pen,
 * handwriting, things stuck onto things. A sticker is the most literal object
 * in that vocabulary, and it is the one element of it that can be PLAYED with
 * rather than just looked at. On a festival page that matters twice over: the
 * page is asking someone to come and have fun with nineteen strangers, and a
 * page that is itself no fun to touch is arguing against itself.
 *
 * ─── THE RULES THAT KEEP THEM FROM BECOMING CLUTTER ─────────────────────────
 * 1. NEVER over running text. Every placement sits in a margin or in dead
 *    space. A sticker a visitor has to move to read something is a bug.
 * 2. They always spring back. Nothing can be permanently dragged off-screen
 *    or over a CTA, and nothing has to be tidied up.
 * 3. `aria-hidden`. They carry no information — every word on a sticker is a
 *    joke that is said properly somewhere else. A screen reader gets nothing
 *    it needs from them and should not be read a list of loose words.
 * 4. Small. Nothing above ~9rem wide, so a sticker can never compete with a
 *    headline for attention.
 * 5. Reduced motion parks them: no idle wobble, no drag physics, no burst.
 *    They stay as static scraps, which is exactly what they look like anyway.
 * 6. `touch-action: none` only while dragging, so they never steal a scroll on
 *    a phone. Framer handles this, but it is the reason `dragElastic` is low —
 *    a sticker that flies across the viewport under a thumb is a scroll trap.
 */
export function Sticker({
  children,
  className = "",
  rotate = -6,
  color = "#FF2E7E",
  fg = "#0A0414",
  /** "chip" is a filled slab. "outline" is a stamped border, for dark areas. */
  variant = "chip",
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
  fg?: string;
  variant?: "chip" | "outline";
}) {
  const reduce = useReducedMotion();
  const [popped, setPopped] = useState(false);
  const burstTimer = useRef<number | null>(null);

  const pop = () => {
    if (reduce) return;
    setPopped(true);
    if (burstTimer.current) window.clearTimeout(burstTimer.current);
    burstTimer.current = window.setTimeout(() => setPopped(false), 520);
  };

  const filled = variant === "chip";

  const body = (
    <span
      className={`relative inline-flex select-none items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-semibold tracked uppercase leading-none sm:text-[10px] ${
        filled ? "" : "border-2"
      }`}
      style={
        filled
          ? { background: color, color: fg, boxShadow: `0 0 26px -8px ${color}` }
          : { borderColor: color, color, boxShadow: `0 0 22px -10px ${color}` }
      }
    >
      {children}
    </span>
  );

  if (reduce) {
    return (
      <span aria-hidden className={`pointer-events-none absolute ${className}`} style={{ rotate: `${rotate}deg` }}>
        {body}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden
      className={`edc-sticker-idle absolute z-20 cursor-grab active:cursor-grabbing ${className}`}
      style={{ ["--r" as string]: `${rotate}deg` }}
      drag
      dragElastic={0.14}
      dragMomentum={false}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
      onTap={pop}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      {/*
        THE BURST — one ring, expanding once, on tap. Not confetti and not a
        particle system: a single ring is legible at this size, costs one
        element, and cannot leave anything behind on the page.
      */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `2px solid ${color}` }}
        initial={false}
        animate={
          popped
            ? { width: 120, height: 120, opacity: [0.9, 0] }
            : { width: 8, height: 8, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {body}
    </motion.span>
  );
}
