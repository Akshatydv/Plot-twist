"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { casting, CASTING_MAX_SCORE, type Trait } from "@/content/site";
import { useJourney } from "./mystery/JourneyProvider";
import { Note, PlotButton, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Arrow, BrushStroke } from "./Brush";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* red-pen marks                                                       */
/* ------------------------------------------------------------------ */

/** A ticked checkmark, drawn the way you'd scratch one in a margin. */
function Tick({ color, on }: { color: string; on: boolean }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 20 18" className="h-full w-full" aria-hidden>
      <motion.path
        d="M2,9 C4,11 6,13 7.5,15.5 C10,10 13.5,5 18,1.5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.18 }}
        transition={reduce ? { duration: 0 } : { duration: 0.4, ease }}
      />
    </svg>
  );
}

/** Teacher's star. Deliberately lopsided. */
function GradeStar({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 58" className={className} aria-hidden>
      <path
        d="M30,2 L37,20 L56,21.5 L41,33.5 L46,52 L29.5,41 L13,51 L18.5,33 L4,20.5 L23,19.5 Z"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The grade itself: handwritten score-out-of-10, circled harder the closer
 * it gets. The ring is one rough pen stroke whose length tracks the score
 * (not the tick count — a +2 trait should visibly move the needle further
 * than a +1 one), so it reads as someone circling, not a progress meter.
 *
 * `score` is the sum of picked traits' weights, always 0–10 by construction
 * (see CASTING_MAX_SCORE and the weight-sum assertion in content/site.ts).
 */
function Grade({
  score,
  count,
  verdict,
  tone,
}: {
  score: number;
  count: number;
  verdict: string | null;
  tone: CastTone;
}) {
  const reduce = useReducedMotion();
  const full = score === CASTING_MAX_SCORE;
  const progress = score === 0 ? 0 : 0.2 + (score / CASTING_MAX_SCORE) * 0.8;

  return (
    <div className="relative flex flex-col items-center">
      {/* the mark */}
      <div className="relative px-[14%] py-[16%]">
        {/* preserveAspectRatio="none" so the ring wraps the box it's drawn around */}
        <svg
          viewBox="0 0 320 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {/* the score is always circled — the pink pass just presses harder */}
          <path
            d="M168,18 C252,20 306,58 303,100 C300,146 232,182 156,182 C80,182 16,148 18,100 C20,52 84,16 166,16 C190,16 214,22 232,32"
            stroke="#FFF1DC"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.24"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d="M168,18 C252,20 306,58 303,100 C300,146 232,182 156,182 C80,182 16,148 18,100 C20,52 84,16 166,16 C190,16 214,22 232,32"
            stroke={tone.brushA}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ pathLength: progress }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease }}
          />
          {/* second pass once every box is ticked — emphatic double circle */}
          <motion.path
            d="M176,30 C246,34 288,64 286,100 C284,138 226,166 158,167 C92,168 34,140 36,100 C38,62 96,32 168,30"
            stroke={tone.gold}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ pathLength: full ? 1 : 0, opacity: full ? 0.9 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease, delay: 0.1 }}
          />
        </svg>

        {/*
          Caveat, not the marker face: Permanent Marker renders "/" as a Λ at
          display size, and this mark has to read as "10/10" above all else.
          A pen also suits a graded score better than a marker.
        */}
        <motion.div
          className="relative font-hand font-bold leading-[0.8] tracking-[-0.01em] text-sand"
          style={{ fontSize: "clamp(4.4rem,17vw,8.5rem)" }}
          animate={
            reduce
              ? undefined
              : { scale: full ? 1.04 : 1, rotate: full ? -3 : -1.5, color: full ? tone.cream : "#FFF1DC" }
          }
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          {/*
            Was a static "10/10" regardless of what was picked — the central
            mark and the cards were telling two different stories. Now it's
            the one thing that actually reads the score.
          */}
          {score}/10
        </motion.div>
      </div>

      {/* star, awarded on the full set */}
      <AnimatePresence>
        {full && (
          <motion.div
            className="absolute -right-[6%] -top-[10%]"
            initial={reduce ? undefined : { opacity: 0, scale: 0.3, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 240, damping: 13 }}
          >
            <GradeStar color={tone.gold} className="h-9 w-9 drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] sm:h-12 sm:w-12" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* the tally: six boxes waiting to be ticked */}
      <div className="mt-4 flex items-center gap-2">
        {casting.traits.map((trait, i) => {
          const accent = tone.accents?.[trait.id] ?? trait.accent;
          return (
            <span
              key={trait.id}
              className="flex h-5 w-5 items-center justify-center border transition-colors duration-300 sm:h-6 sm:w-6"
              style={{ borderColor: i < count ? accent : "rgba(255,241,220,0.28)" }}
            >
              <span className="block h-3 w-3 sm:h-3.5 sm:w-3.5">
                <Tick color={accent} on={i < count} />
              </span>
            </span>
          );
        })}
      </div>

      {/* margin note that swaps as traits are picked */}
      <div className="mt-2 flex h-7 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={verdict ?? "idle"}
            className="font-hand text-[clamp(1.1rem,3.4vw,1.45rem)] leading-none"
            style={{ color: full ? tone.gold : verdict ? tone.blush : "rgba(255,241,220,0.5)" }}
            initial={reduce ? undefined : { opacity: 0, y: 6, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          >
            {full ? casting.marks.full : (verdict ?? casting.marks.idle)}
          </motion.span>
        </AnimatePresence>
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* traits                                                              */
/* ------------------------------------------------------------------ */

/** Each trait gets its own drawn mark — never the same icon twice. */
function TraitGlyph({ id, accent, active, ink }: { id: string; accent: string; active: boolean; ink: string }) {
  const reduce = useReducedMotion();
  const dim = active ? 1 : 0.55;
  const common = { stroke: accent, strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const };

  return (
    <motion.svg
      viewBox="0 0 44 32"
      className="h-6 w-8 shrink-0 sm:h-7 sm:w-10"
      animate={reduce ? undefined : { opacity: dim, y: active ? -1 : 0 }}
      transition={{ duration: 0.3, ease }}
      aria-hidden
    >
      {id === "face" && (
        <>
          {/* viewfinder brackets */}
          <path d="M6,11 L6,5 L13,5 M38,11 L38,5 L31,5 M6,21 L6,27 L13,27 M38,21 L38,27 L31,27" {...common} />
          <motion.circle
            cx="22"
            cy="16"
            r="5.5"
            {...common}
            animate={reduce ? undefined : { r: active ? 6.4 : 5.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          />
        </>
      )}
      {id === "charm" && (
        <>
          <path d="M13,16 C13,10 17,7 20,10 C23,7 27,10 27,16 C27,21 20,26 20,26 C20,26 13,21 13,16 Z" {...common} />
          <path d="M33,7 L33,13 M30,10 L36,10 M8,20 L8,25 M5.5,22.5 L10.5,22.5" {...common} strokeWidth={2} />
        </>
      )}
      {id === "energy" && (
        <motion.path
          d="M5,22 C10,6 14,28 19,14 C24,2 28,26 33,16 C36,10 38,14 40,12"
          {...common}
          animate={reduce ? undefined : { d: active ? "M5,24 C10,2 14,30 19,12 C24,0 28,28 33,15 C36,8 38,15 40,11" : "M5,22 C10,6 14,28 19,14 C24,2 28,26 33,16 C36,10 38,14 40,12" }}
          transition={{ duration: 0.5, ease }}
        />
      )}
      {id === "personality" && (
        <>
          <path d="M7,7 L37,7 L37,22 L19,22 L12,28 L13,22 L7,22 Z" {...common} />
          <path d="M14,14 L30,14 M14,18 L25,18" {...common} strokeWidth={1.8} />
        </>
      )}
      {id === "stories" && (
        <>
          <path d="M4,9 L20,5 L24,21 L8,25 Z" {...common} />
          <path d="M22,6 L39,8 L37,25 L20,23" {...common} />
          <path d="M25,12 L34,13" {...common} strokeWidth={1.8} />
        </>
      )}
      {id === "baddies" && (
        <>
          <motion.path
            d="M22,4 C31,4 38,9 38,16 C38,23 31,28 22,28 C13,28 6,23 6,16 C6,9 13,4 22,4 Z"
            fill={accent}
            stroke={accent}
            strokeWidth={2}
            animate={reduce ? undefined : { rotate: active ? 8 : 0 }}
            style={{ transformOrigin: "22px 16px" }}
            transition={{ type: "spring", stiffness: 240, damping: 12 }}
          />
          <path d="M15,16 L20,20 L30,11" stroke={ink} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        </>
      )}
    </motion.svg>
  );
}

function TraitCard({
  trait,
  active,
  onToggle,
  tilt,
  className = "",
  style,
  accent,
  ink,
}: {
  trait: Trait;
  active: boolean;
  onToggle: () => void;
  tilt: number;
  className?: string;
  style?: React.CSSProperties;
  /** Resolved by the tone — falls back to the trait’s own accent. */
  accent: string;
  ink: string;
}) {
  const reduce = useReducedMotion();
  const baddie = trait.id === "baddies";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      data-trait={trait.id}
      className={`group touch-manipulation text-left outline-none ${className}`}
      style={style}
      initial={reduce ? undefined : { opacity: 0, y: 18, rotate: tilt * 2 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: active ? 0 : tilt }}
      viewport={{ once: true, amount: 0.4 }}
      animate={reduce ? undefined : { rotate: active ? 0 : tilt, y: active ? -4 : 0 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -5 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      <span
        className="relative block border-2 px-3 py-2.5 transition-colors duration-300 sm:px-3.5 sm:py-3"
        style={{
          borderColor: active ? accent : "rgba(255,241,220,0.26)",
          background: active ? `${accent}24` : "rgba(255,255,255,0.05)",
          boxShadow: active ? `4px 4px 0 0 ${accent}` : "4px 4px 0 0 rgba(0,0,0,0.28)",
        }}
      >
        {/* a strip of tape, because it's pinned to a board */}
        <span
          className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-5deg] transition-colors duration-300"
          style={{ background: active ? `${accent}cc` : "rgba(255,241,220,0.5)" }}
          aria-hidden
        />

        <span className="flex items-center gap-2">
          <TraitGlyph id={trait.id} accent={accent} active={active} ink={ink} />
          <span
            className={`font-display leading-none tracking-[0.01em] ${baddie ? "text-[13px] sm:text-[16px]" : "text-[12px] sm:text-[14px]"}`}
            style={{ color: active ? accent : "#FFF1DC" }}
          >
            {trait.name}
          </span>
          <motion.span
            className="ml-auto font-hand text-[15px] leading-none sm:text-[17px]"
            style={{ color: accent }}
            initial={false}
            animate={reduce ? undefined : { scale: active ? [0.5, 1.3, 1] : 1 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Every card said "+1" regardless of what it was actually worth. */}
            {active ? "✓" : `+${trait.weight}`}
          </motion.span>
        </span>

        <span className="mt-1.5 block font-serif text-[11.5px] italic leading-[1.25] text-sand/80 sm:text-[13px]">
          {trait.line}
        </span>
      </span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* photography                                                         */
/* ------------------------------------------------------------------ */

function PhotoScrap({
  photo,
  className = "",
  style,
  tilt,
}: {
  photo: { src: string; alt: string; note: string };
  className?: string;
  style?: React.CSSProperties;
  tilt: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      className={`pointer-events-none ${className}`}
      style={style}
      initial={reduce ? undefined : { opacity: 0, y: 24, rotate: tilt * 2.4, scale: 0.94 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease }}
    >
      <span className="relative block bg-[#fffaf2] p-1.5 pb-6 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.8)]">
        <span className="tape -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-6deg]" aria-hidden />
        <span className="relative block aspect-[4/5] w-full overflow-hidden bg-ink/20">
          <Image src={photo.src} alt={photo.alt} fill sizes="220px" className="object-cover" loading="lazy" />
        </span>
        <figcaption className="absolute inset-x-1.5 bottom-1 font-hand text-[11px] leading-none text-ink/65">
          {photo.note}
        </figcaption>
      </span>
    </motion.figure>
  );
}

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

/** Desktop board positions — centre points, deliberately uneven. */
const BOARD: Record<string, { top: string; left: string; tilt: number }> = {
  face: { top: "14%", left: "30%", tilt: -3.5 },
  charm: { top: "12%", left: "72%", tilt: 3 },
  energy: { top: "47%", left: "84%", tilt: -2.5 },
  personality: { top: "80%", left: "70%", tilt: 3.5 },
  stories: { top: "82%", left: "30%", tilt: -3 },
  baddies: { top: "47%", left: "16%", tilt: 4 },
};

/**
 * Margin notes, tucked into the gaps the cards leave behind. Positions are
 * centre points, kept clear of the grade circle and the polaroids.
 */
const NOTES: { top: string; left: string; rotate: number; ink: "gold" | "blush" | "muted" }[] = [
  { top: "5%", left: "50%", rotate: -3, ink: "gold" },
  { top: "66%", left: "12%", rotate: 5, ink: "muted" },
  { top: "34%", left: "10%", rotate: -4, ink: "blush" },
  { top: "93%", left: "14%", rotate: 4, ink: "muted" },
];

/**
 * THE CASTING BOARD — the master Cast section, shared across every journey.
 *
 * `compact` is the reveal-page mode (Journey 00 / Goa). It changes nothing
 * about the concept, the board, the six traits, the grading, the photo scraps
 * or the interaction — only the vertical footprint:
 *
 *   - drops the closing "THE CUT" block, which is both the tallest single
 *     piece of the section AND a CTA pointing at `#clues`, an anchor that
 *     does not exist on the reveal page. Reusing it verbatim there would have
 *     shipped a dead link.
 *   - flattens the desktop board (1.75:1 → 2.3:1), which is what actually
 *     costs the height: the board is sized by aspect ratio, so making it wider
 *     makes it shorter without shrinking a single card.
 *   - tightens the section padding and the gaps around the board.
 *
 * `composition` is the 10-and-10 line. Optional and journey-supplied so this
 * component stays journey-agnostic — Journey 01 passes nothing and renders
 * exactly what it always did.
 */
/**
 * THE TWO TONES THIS BOARD CAN BE LIT IN.
 *
 * ─── WHY THIS EXISTS ────────────────────────────────────────────────────────
 * This is the master Cast section and it is shared by every journey, which is
 * exactly right — the casting concept must not be reinterpreted per
 * destination. But its COLOURS were hardcoded to the Goa/Bali palette: gold,
 * cyan, green, orange, and a warm magenta-brown ground.
 *
 * On Journey 02 that made it the loudest off-palette moment on the page. That
 * page runs one narrow arc — violet → magenta → blush, no cool accent and no
 * warm one either — and this board was dropping four banned hues into the
 * middle of it.
 *
 * ─── WHAT CHANGED, AND WHAT DID NOT ─────────────────────────────────────────
 * Nothing about the board's structure, copy, interaction, weights or grading.
 * Only which colours it is painted in. "warm" reproduces the previous values
 * EXACTLY and is the default, so Goa and Bali render identically and neither
 * page needed an edit.
 *
 * `accents` remaps the six trait colours, which otherwise come from
 * `casting.traits` in content/site.ts. It is keyed by trait id rather than by
 * position, so reordering the traits cannot silently recolour them.
 */
type CastTone = {
  surface: string;
  /** The grade, the star, the loud handwritten asides. */
  gold: string;
  /** The solved-state heading. */
  cream: string;
  /** The part-way verdict colour. */
  blush: string;
  brushA: string;
  brushB: string;
  noteA: string;
  noteB: string;
  arrowA: string;
  arrowB: string;
  /** The dark drawn ON TOP of an accent fill — must match the surface. */
  ink: string;
  /** null = use each trait's own accent from content/site.ts. */
  accents: Record<string, string> | null;
};

const CAST_TONES: Record<"warm" | "night", CastTone> = {
  /** Goa and Bali. Every value here is the literal this file used before. */
  warm: {
    surface: "radial-gradient(120% 90% at 20% 0%, #6b1a45 0%, #3d1030 42%, #24081f 100%)",
    gold: "#FFD75E",
    cream: "#FFE9A8",
    blush: "#FF7EA8",
    brushA: "#FF4F87",
    brushB: "#00A9C7",
    noteA: "#36C96F",
    noteB: "#FFD75E",
    arrowA: "#FF4F87",
    arrowB: "#00A9C7",
    ink: "#24081f",
    accents: null,
  },
  /**
   * Journey 02. Inside the arc, and separated by LIGHTNESS rather than hue —
   * magenta, blush, chrome — the same trick the two LED ribbons use. Six
   * traits in six different hues is what made this board shout; six traits in
   * three weights of one hue still reads as six distinct cards.
   */
  night: {
    surface: "radial-gradient(120% 90% at 20% 0%, #2a0d4d 0%, #170727 44%, #0a0414 100%)",
    gold: "#FF7FA8",
    cream: "#FFF1DC",
    blush: "#FF7FA8",
    brushA: "#FF2E7E",
    brushB: "#8B3DFF",
    noteA: "#FF7FA8",
    noteB: "#FF7FA8",
    arrowA: "#FF2E7E",
    arrowB: "#8B3DFF",
    ink: "#0a0414",
    accents: {
      face: "#FF2E7E",
      charm: "#FF7FA8",
      energy: "#FF2E7E",
      personality: "#FF7FA8",
      stories: "#D6CFE6",
      baddies: "#FF2E7E",
    },
  },
};

export function WhatsATen({
  compact = false,
  composition,
  index,
  bridge,
  tone = "warm",
}: {
  compact?: boolean;
  /** Which palette to light the board in. "warm" is Goa/Bali, and is unchanged. */
  tone?: "warm" | "night";
  composition?: { title: string; body: string; disclaimer: string; extra?: readonly string[] };
  /**
   * Section number beside the label. Defaults to `casting.index`, which is
   * this section's position in JOURNEY 01's running order — correct there and
   * wrong anywhere the sections come in a different order, so the reveal page
   * passes its own. See GOA_SECTION_ORDER in content/goa.ts.
   */
  index?: string;
  /**
   * The two-line bridge under the stamp. Defaults to `casting.bridge`, which
   * is Journey 01's copy — the reveal page passes its own so this shared
   * component's wording can differ per journey without a second copy of the
   * whole board.
   */
  bridge?: readonly [string, string];
} = {}) {
  // Only the stamp and the three photo scraps are per-journey — the six
  // traits, the grading and the 10/10 are brand-level and shared.
  const journey = useJourney();
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const count = picked.length;
  const last = picked[picked.length - 1];
  const verdict = last ? (casting.traits.find((t) => t.id === last)?.verdict ?? null) : null;
  /**
   * The actual grade: each picked trait's own weight, summed. Never the flat
   * "+1 per card" the tally row implies — a card can be worth more than
   * another, same as it would on a real casting sheet.
   */
  const score = picked.reduce((sum, id) => sum + (casting.traits.find((t) => t.id === id)?.weight ?? 0), 0);

  /** Resolved once; every colour below reads from here rather than a literal. */
  const ct = CAST_TONES[tone];
  const accentOf = (id: string, fallback: string) => ct.accents?.[id] ?? fallback;

  return (
    <section
      id="casting"
      className={`relative overflow-hidden px-5 text-sand sm:px-8 lg:px-14 ${
        compact ? "py-10 sm:py-12" : "py-12 sm:py-16"
      }`}
      style={{ background: ct.surface }}
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <BrushStroke color={ct.brushA} seed={31} className="pointer-events-none absolute -right-16 top-2 h-32 w-56 opacity-[0.16]" />
      <BrushStroke color={ct.brushB} seed={13} className="pointer-events-none absolute -left-24 bottom-24 h-28 w-56 -rotate-12 opacity-[0.12]" />

      <div className="relative">
        {/* masthead */}
        <div className="flex flex-wrap items-center gap-4">
          <SectionLabel index={index ?? casting.index} label={casting.label} color="#FFF1DC" />
          <span className="border border-sand/30 px-2 py-1 text-[9px] tracked text-sand/55">{journey.casting.stamp}</span>
        </div>

        {/*
          Says why this section exists before it starts grading anything.
          Without it the trait board reads as a quiz about the visitor.
        */}
        <Reveal>
          <p
            className={`max-w-[42ch] font-serif text-[clamp(1.05rem,2.7vw,1.35rem)] leading-[1.35] text-sand/75 ${
              compact ? "mt-3.5" : "mt-5"
            }`}
          >
            {(bridge ?? casting.bridge)[0]}
            <br />
            {(bridge ?? casting.bridge)[1]}
          </p>
        </Reveal>

        <div
          className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${compact ? "mt-3.5" : "mt-5"}`}
        >
          <Reveal>
            <h2 className="font-display uppercase leading-[0.82] tracking-[-0.01em]">
              <span className="block text-[clamp(1.3rem,4.4vw,2rem)] text-sand/70">{casting.eyebrow}</span>
              {/* The single tallest element in the section. Still the dominant
                  mark in compact mode, just not 128px of it. */}
              <span
                className={`block text-pink ${
                  compact ? "text-[clamp(3rem,11vw,5.4rem)]" : "text-[clamp(3.6rem,15vw,8rem)]"
                }`}
              >
                {casting.headline}
              </span>
            </h2>
            <p className="mt-2 font-display text-[clamp(1.25rem,4vw,2rem)] uppercase leading-[1.05] tracking-[-0.01em] text-sand">
              {casting.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <p className="max-w-[26ch] font-serif text-[clamp(1.05rem,2.6vw,1.3rem)] italic leading-[1.25] text-sand/85">
              {casting.intro}
            </p>
            <Note className="mt-3 block text-[clamp(1.15rem,3.4vw,1.5rem)]" color={ct.noteA} rotate={-4}>
              {casting.annotation}
            </Note>
          </Reveal>
        </div>

        {/* ---------------- DESKTOP BOARD ---------------- */}
        {/* The board is sized by ASPECT RATIO, so widening it is what shortens
            it — every card, photo and margin note keeps its size and relative
            position, the canvas just gets less tall. */}
        <div
          className={`relative mx-auto hidden w-full max-w-[1120px] lg:block ${
            compact ? "mt-2 aspect-[2.9/1]" : "mt-6 aspect-[1.75/1]"
          }`}
        >
          <PhotoScrap photo={journey.casting.photos[0]} tilt={-8} className="absolute w-[14%] -translate-x-1/2 -translate-y-1/2" style={{ top: "16%", left: "8%" }} />
          <PhotoScrap photo={journey.casting.photos[1]} tilt={7} className="absolute w-[14%] -translate-x-1/2 -translate-y-1/2" style={{ top: "74%", left: "90%" }} />
          <PhotoScrap photo={journey.casting.photos[2]} tilt={-5} className="absolute w-[13%] -translate-x-1/2 -translate-y-1/2" style={{ top: "84%", left: "50%" }} />

          <span className="pointer-events-none absolute left-[86%] top-[18%] -translate-x-1/2 -translate-y-1/2 rotate-[7deg] font-hand text-2xl" style={{ color: ct.noteB }}>
            {casting.asides[0]}
          </span>

          {/* red-pen margin notes in the gaps */}
          {casting.marginNotes.map((n, i) => {
            const p = NOTES[i];
            return (
              <span
                key={n}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-xl"
                style={{
                  top: p.top,
                  left: p.left,
                  rotate: `${p.rotate}deg`,
                  color:
                    p.ink === "gold" ? ct.gold : p.ink === "blush" ? ct.blush : "rgba(255,241,220,0.5)",
                }}
              >
                {n}
              </span>
            );
          })}

          {/* pen strokes pointing the eye at the grade, drawn in the gaps around it.
              Positioned inline like the notes and photos — one-off percentages
              are safer as styles than as generated utility classes. */}
          <span className="pointer-events-none absolute" style={{ left: "31%", top: "20%", rotate: "18deg" }}>
            <Arrow color={ct.arrowA} className="h-16 w-16 opacity-70" />
          </span>
          <span className="pointer-events-none absolute" style={{ left: "70%", top: "58%", rotate: "-150deg" }}>
            <Arrow color={ct.arrowB} className="h-16 w-16 opacity-60" />
          </span>

          <div className="absolute left-1/2 top-[48%] w-[30%] -translate-x-1/2 -translate-y-1/2">
            <Grade score={score} count={count} verdict={verdict} tone={ct} />
          </div>

          {casting.traits.map((t) => {
            const p = BOARD[t.id];
            return (
              <TraitCard
                key={t.id}
                trait={t}
                tilt={p.tilt}
                active={picked.includes(t.id)}
                onToggle={() => toggle(t.id)}
                accent={accentOf(t.id, t.accent)}
                ink={ct.ink}
                className="absolute w-[20%] -translate-x-1/2 -translate-y-1/2"
                style={{ top: p.top, left: p.left }}
              />
            );
          })}
        </div>

        {/* ---------------- MOBILE / TABLET BOARD ---------------- */}
        <div className="lg:hidden">
          <div className={`relative flex justify-center ${compact ? "mt-5" : "mt-8"}`}>
            {/*
              Below 640px the old max-w-[110px]/[104px] caps didn't shrink
              with the viewport, so the polaroids stayed wide enough to run
              under the grade's tally row and margin note — visible as text
              overlapping a photo corner on narrow phones. sm: and up were
              never affected (that cap doesn't bind once w-[20%]/[18%] take
              over), so only the base sizes needed pulling in.
            */}
            <PhotoScrap
              photo={journey.casting.photos[0]}
              tilt={-9}
              className="absolute left-0 top-2 w-[15%] max-w-[58px] sm:w-[20%] sm:max-w-none"
            />
            <PhotoScrap
              photo={journey.casting.photos[1]}
              tilt={8}
              className="absolute right-0 top-10 w-[14%] max-w-[58px] sm:w-[18%] sm:max-w-none"
            />
            {/* above the polaroids so the circled grade stays legible */}
            <div
              className={`relative z-10 sm:w-[44%] ${
                compact ? "w-[46%] max-w-[212px]" : "w-[54%] max-w-[260px]"
              }`}
            >
              <Grade score={score} count={count} verdict={verdict} tone={ct} />
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-x-3 ${compact ? "mt-4 gap-y-3" : "mt-8 gap-y-4"}`}>
            {casting.traits.map((t, i) => (
              <TraitCard
                key={t.id}
                trait={t}
                tilt={i % 2 ? 2.5 : -2.5}
                active={picked.includes(t.id)}
                onToggle={() => toggle(t.id)}
                accent={accentOf(t.id, t.accent)}
                ink={ct.ink}
              />
            ))}
          </div>

          <div className={`flex items-start justify-between gap-4 ${compact ? "mt-3" : "mt-4"}`}>
            <Note className="block text-lg" color={ct.noteB} rotate={-4}>
              {casting.asides[0]}
            </Note>
            <PhotoScrap
              photo={journey.casting.photos[2]}
              tilt={6}
              className={compact ? "w-[20%] max-w-[78px] shrink-0" : "w-[24%] max-w-[96px] shrink-0"}
            />
          </div>
        </div>

        <p className={`text-center text-[10px] tracked text-sand/40 ${compact ? "mt-4" : "mt-6"}`}>
          {casting.hint}
        </p>

        {/* ----------- COMPOSITION (compact mode) -----------
            One line, and the reason the section can end here: it states who
            the twenty are, and closes the dating-show read in a single dry
            aside rather than a paragraph defending against it. */}
        {compact && composition && (
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-col gap-2 border-t-2 border-sand/20 pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-[clamp(1.6rem,5.6vw,2.6rem)] uppercase leading-none" style={{ color: ct.cream }}>
                  {composition.title}
                </h3>
                <p className="text-[clamp(0.95rem,2.4vw,1.15rem)] leading-tight text-sand/80">{composition.body}</p>
              </div>
              <p className="shrink-0 font-hand text-[clamp(1.15rem,3.6vw,1.5rem)] leading-none text-sand/50">
                {composition.disclaimer}
              </p>
            </div>

            {/* Optional trailer lines, set in the same smaller supporting-copy
                style as composition.body directly above. */}
            {composition.extra && composition.extra.length > 0 && (
              <div className="mt-2">
                {composition.extra.map((line) => (
                  <p key={line} className="text-[clamp(0.95rem,2.4vw,1.15rem)] leading-tight text-sand/80">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </Reveal>
        )}

        {/* ---------------- THE CUT ----------------
            Hidden in compact mode: it is the tallest block in the section, and
            its CTA points at #clues — an anchor the reveal page doesn't have. */}
        {!compact && (
          <div className="relative mt-10 text-center sm:mt-12">
            <Note className="mb-3 block text-[clamp(1.15rem,3.6vw,1.6rem)] text-sand/55" rotate={-2}>
              {casting.asides[1]}
            </Note>
            <Reveal>
              <h3 className="font-display text-[clamp(2.1rem,7.6vw,4.2rem)] uppercase leading-[0.9] text-sand">
                {casting.outro.line}
              </h3>
            </Reveal>
            <Note className="mt-2 inline-block text-[clamp(1.15rem,3.4vw,1.5rem)] text-pink" rotate={3}>
              {casting.outro.annotation}
            </Note>
            <Reveal delay={0.1} className="mt-6 flex justify-center">
              <PlotButton href={casting.cta.href} bg="#FFF1DC" fg="#1A0D0A" shadow={ct.brushA} event={PLOT_EVENTS.viewClues}>
                {casting.cta.label}
              </PlotButton>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
