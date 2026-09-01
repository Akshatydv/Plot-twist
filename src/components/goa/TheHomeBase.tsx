"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { homeBase } from "@/content/goa";
import { Note, SectionLabel, Stamp } from "../Bits";
import { Reveal } from "../motion";
import { BrushStroke, MarkerUnderline } from "../Brush";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE HOME BASE — the cast's base between the chapters.
 *
 * COMPOSITION: a pinned board, not a gallery. The prints are absolutely
 * positioned at deliberate angles and overlap each other, with the
 * handwritten notes and tape doing the work a caption row would otherwise do.
 *
 * ADAPTIVE BY DESIGN: it renders only the shots that actually have a file and
 * lays them out from a table of compositional roles, so the same component is
 * a single editorial print with one photo and an overlapping collage with
 * four. That matters here more than usual — the properties are still being
 * chosen, so the section has to look finished at every count rather than
 * waiting on a full set. Adding a photo is one line in content/goa.ts.
 *
 * The disclaimer is not optional and not a footnote: it sits directly under
 * the statement, understated but plainly legible, because the photographs are
 * a standard rather than a booking.
 */

/**
 * Where each print sits once it exists. Index = how many photos are present,
 * so a one-photo board is a composition in its own right rather than a
 * four-photo board with three holes in it.
 */
const LAYOUTS: Record<number, { w: string; top: string; left: string; tilt: number; z: number }[]> = {
  // 62% of a 900px board ≈ 558px rendered — deliberately under the 600px
  // width of the only photo supplied so far, so the single-print composition
  // is never upscaled. Revisit if a higher-resolution original arrives.
  1: [{ w: "62%", top: "50%", left: "50%", tilt: -2, z: 3 }],
  2: [
    { w: "62%", top: "44%", left: "38%", tilt: -2.5, z: 3 },
    { w: "42%", top: "64%", left: "76%", tilt: 3.5, z: 2 },
  ],
  3: [
    { w: "56%", top: "42%", left: "33%", tilt: -2.5, z: 3 },
    { w: "38%", top: "24%", left: "78%", tilt: 3, z: 2 },
    { w: "34%", top: "74%", left: "72%", tilt: -4, z: 4 },
  ],
  // Widths are tuned against these four specific frames — one of which is
  // PORTRAIT. A print's height is its width ÷ its own aspect, so the portrait
  // slot is kept narrow deliberately: at the width the landscape prints use it
  // would stand taller than the board.
  4: [
    { w: "46%", top: "42%", left: "34%", tilt: -2.5, z: 3 },
    { w: "23%", top: "33%", left: "68%", tilt: 3, z: 4 },
    { w: "32%", top: "72%", left: "78%", tilt: -3.5, z: 2 },
    { w: "27%", top: "76%", left: "26%", tilt: 4, z: 5 },
  ],
};

/**
 * The board's own proportions, by photo count. Four mixed-format prints need
 * appreciably more room than one; a single fixed ratio either crops the
 * four-up or leaves the one-up stranded in white space.
 */
const BOARD_ASPECT: Record<number, string> = {
  1: "2.75 / 1",
  2: "2.4 / 1",
  3: "2.1 / 1",
  4: "1.72 / 1",
};

/**
 * Annotation anchors, in the OUTER container's coordinates — the board is
 * 720px inside 1080px, so roughly 8% either side is clear margin at every
 * width. Two right, one left, staggered so they don't read as a column.
 */
const NOTE_SPOTS: { top: string; left: string; rotate: number; align: "left" | "right" }[] = [
  { top: "16%", left: "92%", rotate: -4, align: "left" },
  { top: "50%", left: "7%", rotate: 3, align: "right" },
  { top: "82%", left: "91%", rotate: -2.5, align: "left" },
];

export function TheHomeBase() {
  const reduce = useReducedMotion();
  const shots = homeBase.shots.filter((s) => s.src);
  const count = Math.min(shots.length, 4);
  const layout = LAYOUTS[count] ?? LAYOUTS[1];
  const boardAspect = BOARD_ASPECT[count] ?? BOARD_ASPECT[1];

  return (
    <section
      id="home-base"
      className="paper relative overflow-hidden px-5 py-12 sm:px-8 sm:py-14 lg:px-14"
    >
      <BrushStroke
        color="#00A9C7"
        seed={17}
        className="pointer-events-none absolute -left-20 top-10 h-32 w-60 -rotate-[10deg] opacity-[0.14]"
      />
      <BrushStroke
        color="#FF4F87"
        seed={29}
        className="pointer-events-none absolute -right-16 bottom-12 h-32 w-56 opacity-[0.13]"
      />

      <div className="relative mx-auto max-w-[1100px]">
        <SectionLabel index={homeBase.index} label={homeBase.label} />

        {/* ---- headline ---- */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,10vw,5.6rem)] uppercase leading-[0.86] tracking-[-0.01em] text-ink">
              {homeBase.headline[0]}
              <br />
              <span className="relative inline-block">
                {homeBase.headline[1]}
                <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-full" />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[30ch] font-serif text-[clamp(1.15rem,3vw,1.65rem)] italic leading-[1.2] text-ink/80">
              {homeBase.sub}
            </p>
          </Reveal>
        </div>

        {/* ---------------- THE BOARD (md+) ----------------
            The prints live in an inner board; the annotations live in the
            MARGINS either side of it. Threading them between the photographs
            was the obvious first attempt and it doesn't survive four prints —
            every note landed on an image. Margin notes are also truer to the
            rest of the site, which writes in the margins rather than over the
            evidence. */}
        <div className="relative mx-auto mt-8 hidden w-full max-w-[1080px] md:block">
          <div
            className="relative mx-auto w-full max-w-[680px]"
            style={{ aspectRatio: boardAspect }}
          >
            {shots.map((shot, i) => {
              const p = layout[i];
              if (!p) return null;
              return (
                <Print
                  key={shot.id}
                  shot={shot}
                  tilt={p.tilt}
                  delay={i * 0.1}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ width: p.w, top: p.top, left: p.left, zIndex: p.z }}
                />
              );
            })}
          </div>

          {/* annotations, in the gutters the board leaves either side */}
          {homeBase.annotations.map((a, i) => {
            const s = NOTE_SPOTS[i];
            if (!s) return null;
            return (
              <motion.span
                key={a}
                className="pointer-events-none absolute z-[6] block max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 font-hand text-[clamp(1.05rem,1.9vw,1.35rem)] leading-[1.05] text-ink/70"
                style={{ top: s.top, left: s.left, textAlign: s.align }}
                initial={reduce ? undefined : { opacity: 0, y: 8, rotate: s.rotate - 4 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: s.rotate }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.14, ease }}
              >
                {a}
              </motion.span>
            );
          })}
        </div>

        {/* ---------------- THE BOARD (mobile) ----------------
            TWO COLUMNS, staggered — not a single vertical stack.

            A stack of four prints ran to roughly 790px of photographs alone,
            which made this the tallest section on the page by a wide margin on
            the device most of the traffic uses. Two columns halve that at the
            same print sizes.

            It is still a board rather than a grid: every print keeps its own
            angle and aspect, the second column is pushed down so the four
            never line up in rows, and the columns are pulled together so the
            prints overlap across the gutter. */}
        <div className="mt-8 md:hidden">
          <div className="relative mx-auto max-w-[23rem]">
            <div className="grid grid-cols-2 items-start gap-x-1 gap-y-3">
              {shots.map((shot, i) => (
                <Print
                  key={shot.id}
                  shot={shot}
                  tilt={[-3, 2.5, 3, -2][i % 4]}
                  delay={i * 0.08}
                  className={[
                    "relative",
                    // right column starts lower, so the two never read as rows
                    i % 2 ? "mt-7" : "",
                    // pull the columns into each other a little
                    i % 2 ? "-ml-3 z-[2]" : "-mr-3 z-[3]",
                    // the widest print leads; the rest step down slightly
                    i === 0 ? "w-full" : i === 1 ? "w-[92%]" : i === 2 ? "w-[88%]" : "w-[84%]",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* annotations, alternating sides under the board */}
            <div className="mt-6 space-y-2.5">
              {homeBase.annotations.map((a, i) => (
                <Note
                  key={a}
                  className={`block text-[1.2rem] text-ink/70 ${i === 1 ? "text-right" : ""}`}
                  rotate={i % 2 ? 2 : -2.5}
                >
                  {a}
                </Note>
              ))}
            </div>
          </div>
        </div>

        {/* ---- the statement ---- */}
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[24ch] text-center font-display text-[clamp(1.5rem,5.4vw,2.8rem)] uppercase leading-[1.02] tracking-[-0.01em] text-ink">
            {homeBase.statement}
          </p>
        </Reveal>

        {/* ---- transparency: understated, never hidden ---- */}
        <Reveal delay={0.14}>
          <div className="mt-6 flex flex-col items-center gap-3.5">
            <Stamp color="#00A9C7">{homeBase.stamp}</Stamp>
            <p className="max-w-[62ch] text-center text-[0.82rem] leading-[1.5] text-ink/55">
              {homeBase.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One printed snapshot — a photo lab print, not a card: a thick white border,
 * a heavier lip at the bottom for the handwriting, tape holding it down, and
 * a drop shadow that says it is lying ON the paper rather than composited
 * into it.
 */
function Print({
  shot,
  tilt,
  delay = 0,
  className = "",
  style,
}: {
  shot: { src: string | null; alt: string; note: string; aspect?: string };
  tilt: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (!shot.src) return null;

  return (
    <motion.figure
      className={className}
      style={{ ...style, rotate: `${tilt}deg` }}
      initial={reduce ? undefined : { opacity: 0, y: 26, rotate: tilt * 2.6, scale: 0.95 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease }}
      whileHover={reduce ? undefined : { rotate: 0, y: -6, scale: 1.02, zIndex: 9 }}
    >
      <span className="relative block bg-[#fffaf2] p-2 pb-7 shadow-[0_22px_44px_-20px_rgba(43,15,28,0.75)] sm:p-2.5 sm:pb-8">
        <span className="tape absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-[5deg]" aria-hidden />
        <span
          className="grain relative block w-full overflow-hidden bg-ink/15"
          style={{ aspectRatio: shot.aspect ?? "3 / 2" }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 80vw, 45vw"
            className="object-cover"
          />
        </span>
        {shot.note && (
          <figcaption className="absolute inset-x-2 bottom-1 text-center font-hand text-[1rem] leading-none text-ink/60 sm:text-[1.15rem]">
            {shot.note}
          </figcaption>
        )}
      </span>
    </motion.figure>
  );
}
