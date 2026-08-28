"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/**
 * A painted stroke. The ragged edge comes from displacing a soft blob with
 * fractal noise — so every seed gives a genuinely different stroke rather
 * than a repeated vector shape.
 */
export function BrushStroke({
  color,
  seed = 3,
  className = "",
  scale = 22,
  title,
}: {
  color: string;
  seed?: number;
  className?: string;
  scale?: number;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 150"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <filter id={`r${id}`} x="-20%" y="-30%" width="140%" height="165%">
          <feTurbulence type="fractalNoise" baseFrequency="0.021 0.075" numOctaves="4" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* dry-brush streaks: thin gaps where the bristles skipped */}
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="150">
          <rect width="240" height="150" fill="#fff" />
          <path d="M28,56 C88,44 156,48 214,58" stroke="#000" strokeWidth="2.2" fill="none" opacity="0.34" />
          <path d="M34,96 C94,108 154,102 208,92" stroke="#000" strokeWidth="1.8" fill="none" opacity="0.24" />
          <path d="M64,76 C112,70 152,74 192,78" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.18" />
        </mask>
      </defs>
      <g filter={`url(#r${id})`} mask={`url(#m${id})`}>
        {/* the loaded swipe */}
        <path
          d="M26,84 C66,50 170,46 212,72"
          stroke={color}
          strokeWidth="58"
          strokeLinecap="round"
          fill="none"
        />
        {/* build-up where the brush pressed hardest */}
        <path d="M48,76 C94,56 152,56 196,72" stroke={color} strokeWidth="34" strokeLinecap="round" fill="none" />
        {/* flick off the end */}
        <path d="M204,76 C218,80 224,86 228,96" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** A hand-drawn underline that draws itself when scrolled into view. */
export function MarkerUnderline({ color = "#FF4F87", className = "" }: { color?: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 22" className={className} preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M4,14 C58,4 108,18 152,10 C198,2 250,16 296,7"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Rough circular flight-path ring — the logo motif, reused as an annotation. */
export function CircleScribble({ color = "#FF7A3D", className = "" }: { color?: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 140" className={className} preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M124,8 C196,6 236,38 234,72 C232,110 178,132 118,133 C56,134 8,112 7,72 C6,36 52,10 124,8"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 0"
        fill="none"
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Arrow({ color = "#1A0D0A", className = "" }: { color?: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden>
      <motion.g
        initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.path d="M8,10 C36,26 62,46 84,74" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <motion.path d="M84,74 L58,68 M84,74 L80,46" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
      </motion.g>
    </svg>
  );
}

export function Squiggle({ color = "#FF4F87", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 140 40" className={className} aria-hidden>
      <path
        d="M4,26 C18,4 30,4 42,24 C54,44 66,44 78,24 C90,4 102,4 114,24 C122,37 130,38 136,30"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Star({ color = "#00A9C7", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <path
        d="M30,4 C33,22 38,27 56,30 C38,33 33,38 30,56 C27,38 22,33 4,30 C22,27 27,22 30,4 Z"
        fill={color}
      />
    </svg>
  );
}
