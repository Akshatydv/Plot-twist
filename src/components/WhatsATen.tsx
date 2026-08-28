"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { casting, type Trait } from "@/content/site";
import { Note, PlotButton, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Arrow, BrushStroke } from "./Brush";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = casting.traits.length;

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
 * The grade itself: handwritten 10/10, circled harder the more the visitor
 * ticks off. The ring is one rough pen stroke whose length tracks the count,
 * so it reads as someone circling — not as a progress meter.
 */
function Grade({ count, verdict }: { count: number; verdict: string | null }) {
  const reduce = useReducedMotion();
  const full = count === TOTAL;
  const progress = count === 0 ? 0 : 0.2 + (count / TOTAL) * 0.8;

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
            stroke="#FF4F87"
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
            stroke="#FF7A3D"
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
              : { scale: full ? 1.04 : 1, rotate: full ? -3 : -1.5, color: full ? "#FFE9A8" : "#FFF1DC" }
          }
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          {casting.headline.replace("?", "")}
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
            <GradeStar color="#FFD75E" className="h-9 w-9 drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] sm:h-12 sm:w-12" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* the tally: six boxes waiting to be ticked */}
      <div className="mt-4 flex items-center gap-2">
        {casting.traits.map((t, i) => (
          <span
            key={t.id}
            className="flex h-5 w-5 items-center justify-center border transition-colors duration-300 sm:h-6 sm:w-6"
            style={{ borderColor: i < count ? `${t.accent}` : "rgba(255,241,220,0.28)" }}
          >
            <span className="block h-3 w-3 sm:h-3.5 sm:w-3.5">
              <Tick color={t.accent} on={i < count} />
            </span>
          </span>
        ))}
      </div>

      {/* margin note that swaps as traits are picked */}
      <div className="mt-2 flex h-7 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={verdict ?? "idle"}
            className="font-hand text-[clamp(1.1rem,3.4vw,1.45rem)] leading-none"
            style={{ color: full ? "#FFD75E" : verdict ? "#FF7EA8" : "rgba(255,241,220,0.5)" }}
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
function TraitGlyph({ id, accent, active }: { id: string; accent: string; active: boolean }) {
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
          <path d="M15,16 L20,20 L30,11" stroke="#24081f" strokeWidth={2.6} fill="none" strokeLinecap="round" />
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
}: {
  trait: Trait;
  active: boolean;
  onToggle: () => void;
  tilt: number;
  className?: string;
  style?: React.CSSProperties;
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
          borderColor: active ? trait.accent : "rgba(255,241,220,0.26)",
          background: active ? `${trait.accent}24` : "rgba(255,255,255,0.05)",
          boxShadow: active ? `4px 4px 0 0 ${trait.accent}` : "4px 4px 0 0 rgba(0,0,0,0.28)",
        }}
      >
        {/* a strip of tape, because it's pinned to a board */}
        <span
          className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-5deg] transition-colors duration-300"
          style={{ background: active ? `${trait.accent}cc` : "rgba(255,241,220,0.5)" }}
          aria-hidden
        />

        <span className="flex items-center gap-2">
          <TraitGlyph id={trait.id} accent={trait.accent} active={active} />
          <span
            className={`font-display leading-none tracking-[0.01em] ${baddie ? "text-[13px] sm:text-[16px]" : "text-[12px] sm:text-[14px]"}`}
            style={{ color: active ? trait.accent : "#FFF1DC" }}
          >
            {trait.name}
          </span>
          <motion.span
            className="ml-auto font-hand text-[15px] leading-none sm:text-[17px]"
            style={{ color: trait.accent }}
            initial={false}
            animate={reduce ? undefined : { scale: active ? [0.5, 1.3, 1] : 1 }}
            transition={{ duration: 0.4, ease }}
          >
            {active ? "✓" : "+1"}
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
  photo: (typeof casting.photos)[number];
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
const NOTES: { top: string; left: string; rotate: number; color: string }[] = [
  { top: "5%", left: "50%", rotate: -3, color: "#FFD75E" },
  { top: "66%", left: "12%", rotate: 5, color: "rgba(255,241,220,0.5)" },
  { top: "34%", left: "10%", rotate: -4, color: "#FF7EA8" },
  { top: "93%", left: "14%", rotate: 4, color: "rgba(255,241,220,0.5)" },
];

export function WhatsATen() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const count = picked.length;
  const last = picked[picked.length - 1];
  const verdict = last ? (casting.traits.find((t) => t.id === last)?.verdict ?? null) : null;

  return (
    <section
      id="casting"
      className="relative overflow-hidden px-5 py-12 text-sand sm:px-8 sm:py-16 lg:px-14"
      style={{ background: "radial-gradient(120% 90% at 20% 0%, #6b1a45 0%, #3d1030 42%, #24081f 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <BrushStroke color="#FF4F87" seed={31} className="pointer-events-none absolute -right-16 top-2 h-32 w-56 opacity-[0.16]" />
      <BrushStroke color="#00A9C7" seed={13} className="pointer-events-none absolute -left-24 bottom-24 h-28 w-56 -rotate-12 opacity-[0.12]" />

      <div className="relative">
        {/* masthead */}
        <div className="flex flex-wrap items-center gap-4">
          <SectionLabel index={casting.index} label={casting.label} color="#FFF1DC" />
          <span className="border border-sand/30 px-2 py-1 text-[9px] tracked text-sand/55">{casting.stamp}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <Reveal>
            <h2 className="font-display uppercase leading-[0.82] tracking-[-0.01em]">
              <span className="block text-[clamp(1.3rem,4.4vw,2rem)] text-sand/70">{casting.eyebrow}</span>
              <span className="block text-[clamp(3.6rem,15vw,8rem)] text-pink">{casting.headline}</span>
            </h2>
            <p className="mt-2 font-display text-[clamp(1.25rem,4vw,2rem)] uppercase leading-[1.05] tracking-[-0.01em] text-sand">
              {casting.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <p className="max-w-[26ch] font-serif text-[clamp(1.05rem,2.6vw,1.3rem)] italic leading-[1.25] text-sand/85">
              {casting.intro}
            </p>
            <Note className="mt-3 block text-[clamp(1.15rem,3.4vw,1.5rem)] text-[#36C96F]" rotate={-4}>
              {casting.annotation}
            </Note>
          </Reveal>
        </div>

        {/* ---------------- DESKTOP BOARD ---------------- */}
        <div className="relative mx-auto mt-6 hidden aspect-[1.75/1] w-full max-w-[1120px] lg:block">
          <PhotoScrap photo={casting.photos[0]} tilt={-8} className="absolute w-[14%] -translate-x-1/2 -translate-y-1/2" style={{ top: "16%", left: "8%" }} />
          <PhotoScrap photo={casting.photos[1]} tilt={7} className="absolute w-[14%] -translate-x-1/2 -translate-y-1/2" style={{ top: "74%", left: "90%" }} />
          <PhotoScrap photo={casting.photos[2]} tilt={-5} className="absolute w-[13%] -translate-x-1/2 -translate-y-1/2" style={{ top: "84%", left: "50%" }} />

          <span className="pointer-events-none absolute left-[86%] top-[18%] -translate-x-1/2 -translate-y-1/2 rotate-[7deg] font-hand text-2xl text-[#FFD75E]">
            {casting.asides[0]}
          </span>

          {/* red-pen margin notes in the gaps */}
          {casting.marginNotes.map((n, i) => {
            const p = NOTES[i];
            return (
              <span
                key={n}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-xl"
                style={{ top: p.top, left: p.left, rotate: `${p.rotate}deg`, color: p.color }}
              >
                {n}
              </span>
            );
          })}

          {/* pen strokes pointing the eye at the grade, drawn in the gaps around it.
              Positioned inline like the notes and photos — one-off percentages
              are safer as styles than as generated utility classes. */}
          <span className="pointer-events-none absolute" style={{ left: "31%", top: "20%", rotate: "18deg" }}>
            <Arrow color="#FF4F87" className="h-16 w-16 opacity-70" />
          </span>
          <span className="pointer-events-none absolute" style={{ left: "70%", top: "58%", rotate: "-150deg" }}>
            <Arrow color="#00A9C7" className="h-16 w-16 opacity-60" />
          </span>

          <div className="absolute left-1/2 top-[48%] w-[30%] -translate-x-1/2 -translate-y-1/2">
            <Grade count={count} verdict={verdict} />
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
                className="absolute w-[20%] -translate-x-1/2 -translate-y-1/2"
                style={{ top: p.top, left: p.left }}
              />
            );
          })}
        </div>

        {/* ---------------- MOBILE / TABLET BOARD ---------------- */}
        <div className="lg:hidden">
          <div className="relative mt-8 flex justify-center">
            <PhotoScrap
              photo={casting.photos[0]}
              tilt={-9}
              className="absolute left-0 top-2 w-[26%] max-w-[110px] sm:w-[20%]"
            />
            <PhotoScrap
              photo={casting.photos[1]}
              tilt={8}
              className="absolute right-0 top-10 w-[24%] max-w-[104px] sm:w-[18%]"
            />
            {/* above the polaroids so the circled grade stays legible */}
            <div className="relative z-10 w-[54%] max-w-[260px] sm:w-[44%]">
              <Grade count={count} verdict={verdict} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-4">
            {casting.traits.map((t, i) => (
              <TraitCard
                key={t.id}
                trait={t}
                tilt={i % 2 ? 2.5 : -2.5}
                active={picked.includes(t.id)}
                onToggle={() => toggle(t.id)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <Note className="block text-lg text-[#FFD75E]" rotate={-4}>
              {casting.asides[0]}
            </Note>
            <PhotoScrap photo={casting.photos[2]} tilt={6} className="w-[24%] max-w-[96px] shrink-0" />
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] tracked text-sand/40">{casting.hint}</p>

        {/* ---------------- THE CUT ---------------- */}
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
            <PlotButton href={casting.cta.href} bg="#FFF1DC" fg="#1A0D0A" shadow="#FF4F87" event={PLOT_EVENTS.makeYourCase}>
              {casting.cta.label}
            </PlotButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
