"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * THE FESTIVAL VOCABULARY.
 *
 * Every piece below is a straight translation of something the site already
 * has — that is the whole reason this page still reads as Plot Twist:
 *
 *   Goa's SceneSlate (DAY · CHAPTER 01)  →  GateSlate (SET TIME · STAGE 01)
 *   Goa's Stamp (bordered, rotated)      →  CredChip (same shape, neon edge)
 *   Goa's `.rule`                        →  NeonRule
 *   Goa's `.pin` polaroid                →  LightPlate / Flash (timestamped)
 *
 * THE COLOUR RULE, ENFORCED HERE: `--edc-violet` (#7B2CFF) is ~3.2:1 on the
 * page canvas and fails AA, so it is used as a LIGHT SOURCE only — glows,
 * sweeps, fills — and never as a text colour. Type is only ever set in magenta,
 * sunset, gold or sand, which are the four steps of the one arc this page runs.
 * There is no cool accent anywhere on this page, deliberately: see the long
 * palette note in globals.css.
 */

/* ------------------------------------------------------------------ */
/* light                                                               */
/* ------------------------------------------------------------------ */

/**
 * ONE laser plane per section. Two is where a festival page starts looking
 * like a screensaver, so this is deliberately not composable into a stack.
 *
 * It is `pointer-events: none`, blended screen (so it adds light rather than
 * painting over a photograph), and animates on transform alone. It must never
 * be positioned so that it crosses running text.
 */
export function LaserSweep({
  className = "",
  slow = false,
  delay = 0,
}: {
  className?: string;
  slow?: boolean;
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={`edc-sweep ${slow ? "edc-sweep--slow" : ""} ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    />
  );
}

/** The bloom that sits BEHIND headline type — never on the glyph itself. */
export function Haze({ className = "", color }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={`edc-haze ${className}`}
      style={
        color
          ? { background: `radial-gradient(closest-side, ${color}, transparent 72%)` }
          : undefined
      }
    />
  );
}

/** The page's only rule style. Draws itself in when scrolled to. */
export function NeonRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`edc-rule ${className}`}
      initial={reduce ? undefined : { scaleX: 0, originX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* credentials                                                         */
/* ------------------------------------------------------------------ */

/**
 * The section slate. Same job and same position as Goa's SceneSlate: it is
 * the one element that says "these differently-shaped sections are the same
 * series". Only the fields changed.
 */
export function GateSlate({
  index,
  label,
  meta,
  className = "",
}: {
  index: string;
  label: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      <span className="font-display text-[15px] leading-none text-[var(--edc-blush)]">{index}</span>
      <span className="h-px w-8 bg-[var(--edc-hot)]/40 sm:w-14" />
      <span className="edc-meta !text-[10px] !text-[#FFF1DC] !opacity-90 sm:!text-[11px]">{label}</span>
      {meta && (
        <>
          <span className="h-px w-5 bg-[var(--edc-chrome)]/25" />
          <span className="edc-meta">{meta}</span>
        </>
      )}
    </div>
  );
}

/**
 * Goa's `Stamp`, wearing a laminate. Identical geometry — 2px border, tight
 * tracked type, a rotation, a spring on entry — so it is recognisably the
 * same element of the same design system, just lit from behind.
 */
export function CredChip({
  children,
  color = "#FF2E7E",
  className = "",
  rotate = -2,
  glow = true,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
  rotate?: number;
  glow?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 text-[11px] font-semibold tracked ${className}`}
      style={{
        borderColor: color,
        color,
        rotate,
        boxShadow: glow ? `0 0 22px -6px ${color}` : undefined,
      }}
      initial={reduce ? undefined : { opacity: 0, scale: 0.88, rotate: rotate - 6 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 220, damping: 15 }}
    >
      {children}
    </motion.span>
  );
}

/** A laminate panel — translucent stock, neon edge, one foil sheen. */
export function HoloPanel({
  children,
  className = "",
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`edc-holo ${className}`}
      style={accent ? { borderColor: `${accent}47` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* photography, and its absence                                        */
/* ------------------------------------------------------------------ */

/**
 * THE LIGHT PLATE — what a photo slot renders when there is no photograph.
 *
 * Not a grey box and not a "coming soon" apology: a composed panel of stage
 * light carrying the frame's own caption and timestamp, so the section reads
 * as finished rather than as a layout with a hole in it. It is the same
 * posture Goa's `homeBase` already takes with its null slots.
 *
 * WHY IT EXISTS AT ALL: no Thailand or festival photograph in this repo is
 * licensed. public/photos/goa/PHOTOS.md was written specifically because
 * sourcing images without verifying their licence is a mistake this project
 * has already come close to shipping — two otherwise-perfect candidates were
 * rejected on licence grounds alone. So nothing is guessed at here. The shot
 * list lives in public/photos/thailand/PHOTOS.md; drop a file in, set `src`
 * in content/thailand.ts, and the photograph replaces the plate with no
 * change to any component.
 */
export function LightPlate({
  src,
  alt,
  caption,
  stamp,
  aspect = "4 / 5",
  className = "",
  sizes = "(max-width: 768px) 90vw, 40vw",
  seed = 0,
}: {
  src?: string | null;
  alt: string;
  caption?: string;
  stamp?: string;
  aspect?: string;
  className?: string;
  sizes?: string;
  /** Shifts the plate's light so a grid of them doesn't come out identical. */
  seed?: number;
}) {
  const angles = [118, 62, 152, 28];
  const a = angles[seed % angles.length];

  return (
    <figure className={`relative overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(120% 90% at ${20 + seed * 13}% ${12 + seed * 9}%, rgba(139,61,255,0.34) 0%, transparent 58%),
                radial-gradient(90% 70% at ${85 - seed * 11}% ${88 - seed * 7}%, rgba(255,46,126,0.26) 0%, transparent 62%),
                radial-gradient(70% 55% at ${50 + seed * 9}% 100%, rgba(139,61,255,0.20) 0%, transparent 60%),
                linear-gradient(${a}deg, #170727 0%, #0a0414 62%, #170727 100%)`,
            }}
          />
          {/* one light beam, static — a moving one inside a grid of four is noise */}
          <div
            aria-hidden
            className="absolute -inset-y-1/3 left-1/2 w-[38%] opacity-60"
            style={{
              transform: `skewX(-16deg) translateX(${-40 + seed * 22}%)`,
              mixBlendMode: "screen",
              background:
                "linear-gradient(90deg, transparent, rgba(255,46,126,0.12) 42%, rgba(255,127,168,0.10) 58%, transparent)",
            }}
          />
          <div className="grain pointer-events-none absolute inset-0 opacity-90" aria-hidden />
          {/* Says plainly that this is not a photograph. Honest, and small. */}
          <span className="edc-meta absolute bottom-2.5 right-3 !text-[9px] !opacity-45">
            IMAGE TO COME
          </span>
          <span className="sr-only">{alt}</span>
        </>
      )}

      {/* The burned-in corner stamp — the disposable-camera tell. Decorative;
          never a claim about when anything was shot. */}
      {stamp && (
        <span
          aria-hidden
          className="absolute bottom-2.5 left-3 font-display text-[13px] tracking-[0.08em] text-[var(--edc-blush)] [text-shadow:0_0_12px_rgba(255,127,168,0.6)]"
        >
          {stamp}
        </span>
      )}

      {caption && (
        <figcaption className="edc-meta absolute left-3 top-3 !text-[9px] !text-[#FFF1DC] !opacity-70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* sound                                                               */
/* ------------------------------------------------------------------ */

/**
 * THE SOUNDWAVE — 64 bars, from a FIXED array.
 *
 * Deterministic on purpose. No Web Audio, no randomness, no requestAnimationFrame
 * loop: the same shape renders on every load and on the server, so there is no
 * hydration mismatch and no audio permission prompt. It is a graphic that
 * behaves like a waveform, not a visualiser — which is also why it can't drift
 * into the "cheesy EDM equalizer" the brief ruled out.
 *
 * The envelope is centre-weighted so it reads as one shape rather than 64
 * independent bars.
 */
const WAVE = [
  12, 18, 9, 26, 34, 21, 44, 30, 52, 38, 61, 47, 70, 55, 82, 64, 91, 73, 100, 84, 96, 78, 88, 69,
  94, 80, 100, 86, 92, 74, 99, 88, 100, 90, 97, 79, 93, 71, 100, 83, 89, 66, 95, 76, 85, 62, 79,
  54, 72, 48, 66, 41, 58, 35, 50, 29, 43, 24, 36, 19, 28, 15, 21, 11,
];

export function SoundWave({
  className = "",
  color = "#FF2E7E",
  /** Phones render every other bar — 64 hairlines at 375px is a smear. */
  half = false,
}: {
  className?: string;
  color?: string;
  half?: boolean;
}) {
  const reduce = useReducedMotion();
  const bars = half ? WAVE.filter((_, i) => i % 2 === 0) : WAVE;

  return (
    <div className={`flex h-full w-full items-center justify-center gap-[2px] ${className}`} aria-hidden>
      {bars.map((h, i) => {
        // Centre-weighted envelope: the shape peaks in the middle of the run.
        const t = i / (bars.length - 1);
        const envelope = 0.35 + 0.65 * Math.sin(Math.PI * t);
        // Rounded to 2dp deliberately. React serialises a raw float to full
        // precision on the server and the browser rounds it in the computed
        // style, which is a guaranteed hydration mismatch on 64 elements.
        const height = Math.max(3, h * envelope).toFixed(2);
        return (
          <motion.span
            key={i}
            // origin-bottom as a class rather than framer's `originY`, for the
            // same reason: framer writes `transform-origin: 50% 100% 0` on the
            // client and the server markup has no origin at all.
            className="block w-[2px] shrink-0 origin-bottom rounded-full sm:w-[3px]"
            style={{
              height: `${height}%`,
              backgroundColor: color,
              boxShadow: `0 0 8px -2px ${color}`,
            }}
            initial={reduce ? undefined : { scaleY: 0.06, opacity: 0.25 }}
            whileInView={reduce ? undefined : { scaleY: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.55,
              delay: Math.abs(t - 0.5) * 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </div>
  );
}
