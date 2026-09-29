"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { day3, intoForest, media } from "@/content/bir";
import { Note } from "../Bits";
import { contourRings, trekProfile } from "./art";
import { DayCard } from "./DayCard";
import { Clouds, Embers, FireGlow, Flames, Focus, Footage, Kicker, MaskLines, Pines, Ridge, useCalm } from "./Scenery";

/**
 * DAY 03 — THE WILD. The trail.
 *
 * World: raw, adventurous. Earth, clay, trail-dust; contour lines everywhere.
 * Motion: vertical — this is the chapter that climbs.
 *
 *   into the forest  → down through the cloud, into the trees
 *   the card         → LEAVE THE ROAD. FIND THE TRAIL. on a topo map
 *   the challenge    → a walker climbs an elevation profile: START / ASCEND / DISCOVER / ARRIVE
 *   the reveal       → SOME VIEWS HAVE TO BE EARNED. — a keyhole opens onto the range
 *   the last night   → shower → clothes → sunset → dinner → fire; the long table
 *   leave it behind  → the ritual, and you can do it right here
 */
export function DayThree() {
  return (
    <div className="relative">
      <IntoForest />
      <DayCard
        id={day3.id}
        hud="day3"
        day={day3.day}
        emoji={day3.emoji}
        name={day3.name}
        lines={day3.headline}
        ground="#2e2119"
        ink="#D9C7A6"
        accent="#E8B48A"
        scene={(p) => <TopoScene p={p} />}
      />
      <Challenge />
      <Summit />
      <LastNight />
      <Ritual />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ~~ clouds → aerial → forest                                         */
/* ------------------------------------------------------------------ */

function IntoForest() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const cloudY = useTransform(p, [0.05, 0.5], ["60%", "-120%"]);
  const cloudO = useTransform(p, [0.05, 0.2, 0.42, 0.52], [0, 1, 1, 0]);
  const rangeS = useTransform(p, [0.2, 0.75], [1, 2.6]);
  const rangeY = useTransform(p, [0.2, 0.75], ["0%", "30%"]);
  const canopy = useTransform(p, [0.45, 0.72], [0, 1]);
  const pinesY = useTransform(p, [0.45, 0.9], ["70%", "0%"]);
  const earth = useTransform(p, [0.82, 1], [0, 1]);
  // arrives from Social Night, so it starts at night and brightens into morning
  const night = useTransform(p, [0, 0.14], [1, 0]);
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = v < 0.34 ? 0 : v < 0.62 ? 1 : 2;
    setI((c) => (c === k ? c : k));
  });

  if (reduce) return <section ref={ref} className="h-24 bg-[#2e2119]" aria-hidden />;

  return (
    <section ref={ref} data-hud="day3" aria-label="Down through the clouds into the forest" className="relative h-[240svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #7fa9c8 0%, #d7e5ec 60%, #c7d5c0 100%)" }} />
        <motion.div className="absolute inset-0" style={{ scale: rangeS, y: rangeY, transformOrigin: "50% 100%" }}>
          <Ridge name="peaks" fill="#b5c7cf" className="h-[60%]" />
          <Ridge name="mid" fill="#6e8b76" className="h-[44%]" />
          <Ridge name="near" fill="#3d5a43" className="h-[30%]" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-[#1f3526]" style={{ opacity: canopy }} />
        <motion.div className="absolute inset-0" style={{ y: pinesY }}>
          <Pines name="far" fill="#2c4a34" className="h-[90%]" />
          <Pines name="mid" fill="#1a2e21" className="h-[80%]" />
          <Pines name="near" fill="#0e1a12" className="h-[70%]" />
        </motion.div>
        <motion.div
          className="absolute inset-[-10%]"
          style={{
            y: cloudY,
            opacity: cloudO,
            background:
              "radial-gradient(45% 30% at 30% 40%, #fff 0%, transparent 70%), radial-gradient(50% 35% at 70% 55%, #f3f5f4 0%, transparent 72%), radial-gradient(70% 40% at 50% 70%, rgba(243,245,244,0.95) 0%, transparent 75%)",
          }}
        />
        <motion.div className="absolute inset-0 bg-[#2e2119]" style={{ opacity: earth }} />
        <motion.div className="absolute inset-0 bg-[#1a1a33]" style={{ opacity: night }} />
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="relative z-10 flex h-full items-center px-5 sm:px-8 lg:px-14">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              className={`font-serif text-[clamp(2rem,7vw,5rem)] italic leading-[1] ${i === 0 ? "text-[#101311]" : "text-[#EFE9DD]"}`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.55 }}
            >
              {intoForest.lines[i]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the card's world: a topo map                                        */
/* ------------------------------------------------------------------ */

const RINGS_A = contourRings({ seed: 3, cx: 1150, cy: 260, rings: 11, r0: 24, gap: 30 });
const RINGS_B = contourRings({ seed: 8, cx: 260, cy: 620, rings: 8, r0: 20, gap: 34 });

function TopoScene({ p }: { p: MotionValue<number> }) {
  const reduce = useCalm();
  const [drawn, setDrawn] = useState(false);
  const y = useTransform(p, [0, 1], ["-4%", "8%"]);
  // Drawn with a plain dash-offset transition in absolute units, longer than
  // the longest ring, rather than framer's normalised pathLength — the
  // normalised form rendered these rings as scattered ticks in Chromium.
  const draw = (delay: number, dash = DRAW) => ({
    strokeDasharray: dash,
    strokeDashoffset: reduce || drawn ? 0 : DRAW,
    transition: `stroke-dashoffset 2.6s ease-in-out ${delay}s`,
  });
  return (
    <>
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 70% 20%, #3b2a1e 0%, #2e2119 55%, #231812 100%)" }} />
      <motion.svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ y }}
        onViewportEnter={() => setDrawn(true)}
        viewport={{ once: true, amount: 0.2 }}
        aria-hidden
      >
        {[...RINGS_A, ...RINGS_B].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#D9C7A6"
            strokeOpacity={i % 5 === 0 ? 0.42 : 0.2}
            strokeWidth={i % 5 === 0 ? 1.6 : 1}
            style={draw((i % 11) * 0.12)}
          />
        ))}
        {/* a dashed trail across the map — revealed by a mask so it keeps its dashes */}
        <mask id="bir-trail-mask">
          <path d={TRAIL_D} fill="none" stroke="#fff" strokeWidth="8" style={draw(0.6)} />
        </mask>
        <path d={TRAIL_D} fill="none" stroke="#E8793A" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" mask="url(#bir-trail-mask)" />
        <text x="1172" y="248" fill="#E8B48A" fontSize="20" letterSpacing="4" fontFamily="var(--font-dm)">▲ VIEWPOINT</text>
      </motion.svg>
      <Ridge name="front" fill="#1d140e" className="h-[20%]" />
    </>
  );
}

const DRAW = 2400;
const TRAIL_D = "M-20,820 C200,760 300,640 520,600 S820,520 900,420 S1080,300 1150,260";

/* ------------------------------------------------------------------ */
/* the mountain challenge                                              */
/* ------------------------------------------------------------------ */

const PROFILE = trekProfile(42);
const BEAT_AT = [0.04, 0.34, 0.66, 0.97];
const PRINTS = Array.from({ length: 34 }, (_, i) => (i + 0.5) / 34);

/**
 * Don't say "10 km, 4 hours". Draw the climb.
 *
 * The elevation profile draws as you scroll, a walker climbs it, footprints
 * appear behind them, and the four beats plant flags where they happen.
 * The walker's position is computed from the same sampler that drew the
 * line, so the walker is always ON the trail.
 */
function Challenge() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const walk = useTransform(p, [0.06, 0.92], [0, 1]);
  const wx = useTransform(walk, (v) => PROFILE.at(v)[0]);
  const wy = useTransform(walk, (v) => PROFILE.at(v)[1]);
  const [prog, setProg] = useState(reduce ? 1 : 0);
  useMotionValueEvent(walk, "change", (v) => {
    const q = Math.round(v * 60) / 60;
    setProg((c) => (c === q ? c : q));
  });
  const done = reduce ? 1 : prog;
  const beat = Math.max(0, BEAT_AT.filter((b) => done >= b - 0.02).length - 1);
  const b = day3.challenge.beats[beat];

  return (
    <section ref={ref} data-hud="day3" className={reduce ? "relative" : "relative h-[440svh]"}>
      <div className={`${reduce ? "relative py-20" : "sticky top-0 h-[100svh]"} flex flex-col overflow-hidden bg-[#2e2119] px-5 py-14 sm:px-8 lg:px-14`}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-60" aria-hidden>
          {RINGS_A.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#D9C7A6" strokeOpacity="0.14" />
          ))}
        </svg>
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10">
          <Kicker color="#E8B48A">{day3.challenge.kicker}</Kicker>
          <AnimatePresence mode="wait">
            <motion.div
              key={beat}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              aria-live="polite"
            >
              <span className="block font-serif text-[clamp(3.2rem,13vw,10rem)] leading-[0.85] tracking-[-0.03em] text-[#EFE9DD]">{b.word}</span>
              <span className="mt-3 flex flex-wrap gap-x-4 font-serif text-[clamp(1.2rem,3.2vw,2rem)] italic text-[#D9C7A6]">
                {b.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the profile */}
        <div className="relative z-10 mt-auto">
          <svg viewBox="0 0 1000 300" className="w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
            <path d={PROFILE.area} fill="rgba(217,199,166,0.06)" />
            <path d={PROFILE.d} fill="none" stroke="rgba(217,199,166,0.22)" strokeWidth="2" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
            <motion.path d={PROFILE.d} fill="none" stroke="#D9C7A6" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : walk }} />
            {PRINTS.filter((t) => t < done).map((t, i) => {
              const [x, y] = PROFILE.at(t);
              return <ellipse key={t} cx={x} cy={y - 10 + (i % 2) * 5} rx="3.5" ry="2" fill="#A95F38" opacity="0.8" />;
            })}
            {BEAT_AT.map((t, i) => {
              const [x, y] = PROFILE.at(t);
              const reached = done >= t - 0.02;
              return (
                <g key={i} opacity={reached ? 1 : 0.28} style={{ transition: "opacity 0.5s" }}>
                  <line x1={x} y1={y} x2={x} y2={y - 46} stroke="#EFE9DD" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path d={`M${x},${y - 46} l22,7 l-22,7 z`} fill={i === 3 ? "#E8793A" : "#D9C7A6"} />
                </g>
              );
            })}
            {!reduce && <motion.circle r="8" fill="#E8793A" stroke="#EFE9DD" strokeWidth="3" cx={wx} cy={wy} />}
          </svg>
          <div className="mt-3 flex items-end justify-between gap-4 text-[#D9C7A6]">
            <div className="grid grid-cols-4 gap-2 text-[9px] font-semibold tracked sm:text-[11px]">
              {day3.challenge.beats.map((x, i) => (
                <span key={x.word} className="transition-opacity duration-500" style={{ opacity: i <= beat ? 1 : 0.3 }}>
                  {x.word}
                </span>
              ))}
            </div>
            <div className="text-right">
              <span className="block text-[9px] tracked opacity-60">THE TRAIL</span>
              <span className="font-serif text-[1.8rem] leading-none tabular-nums">{Math.round(done * 100)}%</span>
            </div>
          </div>
          <div className="mt-2">
            <Note className="text-[1.3rem] text-[#E8B48A]" rotate={-2}>
              {day3.challenge.scribble}
            </Note>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the reveal                                                          */
/* ------------------------------------------------------------------ */

/**
 * SOME VIEWS HAVE TO BE EARNED.
 *
 * The biggest reveal on the page. It opens as a small keyhole in the earth
 * — a glimpse of the range — and the keyhole widens with scroll until the
 * whole panorama is the screen, zooming OUT as it opens so the range seems
 * to get bigger the more of it you see.
 */
function Summit() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const r = useTransform(p, [0.12, 0.72], [9, 120]);
  const clip = useTransform(r, (v) => `circle(${v}% at 50% 56%)`);
  const zoom = useTransform(p, [0.12, 0.85], [1.45, 1]);
  const head = useTransform(p, [0.1, 0.4], [1, 0]);
  const headY = useTransform(p, [0.1, 0.4], [0, -60]);
  const cap = useTransform(p, [0.75, 0.9], [0, 1]);

  return (
    <section ref={ref} data-hud="day3" className={reduce ? "relative h-[100svh]" : "relative h-[260svh]"}>
      <div className={`${reduce ? "relative" : "sticky top-0"} h-[100svh] overflow-hidden bg-[#2e2119]`}>
        <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
          <motion.div className="absolute inset-0" style={{ scale: reduce ? undefined : zoom }}>
            <Footage slot={media.summit}>
              <Panorama />
            </Footage>
          </motion.div>
        </motion.div>
        <div className="grain pointer-events-none absolute inset-0" />

        {!reduce && (
          <motion.div className="absolute inset-x-0 top-0 z-10 px-5 pt-16 text-center sm:px-8 lg:px-14" style={{ opacity: head, y: headY }}>
            <MaskLines lines={day3.reveal.headline} className="font-serif text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.025em] text-[#EFE9DD]" />
          </motion.div>
        )}
        <motion.div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-14 sm:px-8 lg:px-14" style={{ opacity: reduce ? 1 : cap }}>
          {reduce && <p className="font-serif text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9] text-[#EFE9DD]">{day3.reveal.headline.join(" ")}</p>}
          <p className="font-serif text-[clamp(2rem,6vw,4.5rem)] italic text-[#EFE9DD] [text-shadow:0_2px_30px_rgba(16,19,17,0.5)]">{day3.reveal.caption}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Panorama() {
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #3f6a93 0%, #9cc0d8 38%, #f2dcc0 58%, #e9b48a 70%, #7a5a4a 100%)" }} />
      <div className="absolute left-[72%] top-[30%] h-[30vmin] w-[30vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, #fff6df 0%, rgba(255,220,170,0.5) 35%, transparent 70%)" }} />
      <Ridge name="wide" fill="#eef2f4" className="h-[74%]" />
      <Ridge name="peaks" fill="#b9c8d3" className="h-[62%]" />
      {/* a sea of cloud in the valley — you're above it */}
      <Clouds color="rgba(255,248,238,0.85)" banks={4} speed={0.4} className="top-[46%] h-[40%]" />
      <Ridge name="mid" fill="#6f7f86" className="h-[42%]" />
      <Ridge name="near" fill="#4a3d36" className="h-[28%]" />
      <Ridge name="front" fill="#2a1f19" className="h-[16%]" />
      {/* twenty people on the viewpoint, silhouetted */}
      <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[10%] h-[8%] w-full" aria-hidden>
        {Array.from({ length: 20 }, (_, i) => {
          const x = 560 + i * 24 + ((i * 7) % 5) * 3;
          const h = 150 + ((i * 13) % 5) * 14;
          return (
            <g key={i} fill="#1a120e">
              <circle cx={x} cy={400 - h - 24} r="16" />
              <rect x={x - 12} y={400 - h} width="24" height={h} rx="8" />
            </g>
          );
        })}
      </svg>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* the last night                                                      */
/* ------------------------------------------------------------------ */

function LastNight() {
  const reduce = useCalm();
  const ln = day3.lastNight;
  return (
    <section data-hud="day3" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14" style={{ background: "linear-gradient(to bottom, #2e2119 0%, #3a1a0e 40%, #140a06 100%)" }}>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px]">
        {/* after the trek: warmth, in order */}
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {ln.sequence.map((s, i) => (
            <motion.li
              key={s}
              className="flex items-center gap-3 text-[11px] font-semibold tracked sm:text-[12px]"
              style={{ color: i === ln.sequence.length - 1 ? "#FFB36B" : "#D9C7A6" }}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.22 }}
            >
              {s.toUpperCase()}
              {i < ln.sequence.length - 1 && <span aria-hidden className="text-[#D9C7A6]/40">→</span>}
            </motion.li>
          ))}
        </ol>

        <MaskLines lines={[ln.title]} className="mt-10 font-serif text-[clamp(3.4rem,13vw,10rem)] leading-[0.86] tracking-[-0.03em] text-[#EFE9DD]" />
        <Focus delay={0.3}>
          <p className="mt-6 max-w-[44ch] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.6] text-[#EFE9DD]/70">{ln.body}</p>
        </Focus>

        {/* the long table */}
        <div className="relative mt-14 h-[38svh] min-h-[240px] overflow-hidden">
          <Footage slot={media.lastNight}>
            <LongTable />
          </Footage>
        </div>

        {/* disposable-camera prints */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
          {ln.polaroids.map((ph, i) => (
            <motion.figure
              key={ph.caption}
              className="w-[min(72vw,260px)] bg-[#F3EFE6] p-3 pb-12 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: [-5, 3, -2][i] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-square overflow-hidden" style={{ background: `radial-gradient(80% 80% at 50% 70%, ${ph.tone} 0%, #2a150b 70%, #0d0704 100%)` }}>
                {ph.image && (
                  <Image src={ph.image} alt="" fill sizes="260px" className="object-cover [filter:saturate(1.15)_contrast(1.1)_sepia(0.15)]" />
                )}
                {/* flash bloom + bokeh */}
                <span className="absolute left-1/2 top-[40%] h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-[#fff2d8]/20 blur-2xl" aria-hidden />
                {[12, 34, 58, 76, 88].map((x, k) => (
                  <span key={k} className="absolute h-3 w-3 rounded-full bg-[#ffd79a]/60 blur-[2px]" style={{ left: `${x}%`, top: `${14 + ((k * 23) % 30)}%` }} aria-hidden />
                ))}
                <span className="absolute bottom-2 right-2 font-mono text-[11px] tracking-wider text-[#ff8a3d] [text-shadow:0_0_6px_rgba(255,120,40,0.8)]">{ln.stamp}</span>
              </div>
              <figcaption className="mt-3 text-center font-hand text-[1.35rem] leading-none text-[#101311]/80">{ph.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LongTable() {
  const candles = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div className="absolute inset-0 bg-[#140a06]">
      <FireGlow className="-left-[10%] bottom-[-30%] h-[120%] w-[60%]" intensity={0.9} />
      <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* the table, in perspective */}
        <path d="M430,150 L570,150 L900,400 L100,400 Z" fill="#3a2214" />
        <path d="M430,150 L570,150 L580,158 L420,158 Z" fill="#4c2d1a" />
        {/* people along both sides */}
        {Array.from({ length: 8 }, (_, i) => {
          const t = i / 7;
          const y = 170 + t * 200;
          const s = 0.5 + t * 0.9;
          return (
            <g key={i} fill="#0b0604">
              <circle cx={420 - t * 330} cy={y - 40 * s} r={16 * s} />
              <rect x={420 - t * 330 - 18 * s} y={y - 26 * s} width={36 * s} height={60 * s} rx={10 * s} />
              <circle cx={580 + t * 330} cy={y - 40 * s} r={16 * s} />
              <rect x={580 + t * 330 - 18 * s} y={y - 26 * s} width={36 * s} height={60 * s} rx={10 * s} />
            </g>
          );
        })}
      </svg>
      {candles.map((i) => {
        const t = i / (candles.length - 1);
        return (
          <span
            key={i}
            className="bir-flicker absolute -translate-x-1/2 rounded-full"
            style={{
              left: `${50 + (i % 2 ? 1 : -1) * (4 + t * 22)}%`,
              top: `${40 + t * 50}%`,
              width: `${6 + t * 14}px`,
              height: `${6 + t * 14}px`,
              background: "radial-gradient(circle, #fff1c9 0%, #ffb36b 40%, transparent 70%)",
              boxShadow: `0 0 ${14 + t * 30}px ${4 + t * 8}px rgba(255,170,90,0.35)`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* leave it behind                                                     */
/* ------------------------------------------------------------------ */

type Slip = { id: number; text: string };

/**
 * THE RITUAL — and the one place on the page the visitor does something
 * with their hands.
 *
 * Pick what you'd leave behind (or write it), burn it, and it curls down
 * into the fire. Nothing is stored, sent or tracked: a slip's text never
 * leaves component state, and the moment you burn it, it leaves that too.
 */
function Ritual() {
  const r = day3.ritual;
  const reduce = useCalm();
  const [picked, setPicked] = useState<Slip[]>([]);
  const [draft, setDraft] = useState("");
  const [burning, setBurning] = useState(false);
  const [burnt, setBurnt] = useState(false);
  const [nextId, setNextId] = useState(1);

  const toggle = (text: string) => {
    setBurnt(false);
    setPicked((cur) => (cur.some((s) => s.text === text) ? cur.filter((s) => s.text !== text) : [...cur, { id: nextId, text }]));
    setNextId((n) => n + 1);
  };
  const add = () => {
    const t = draft.trim().slice(0, 60);
    if (!t) return;
    setBurnt(false);
    setPicked((cur) => [...cur, { id: nextId, text: t }]);
    setNextId((n) => n + 1);
    setDraft("");
  };
  const burn = () => {
    if (!picked.length) return;
    setBurning(true);
    setPicked([]);
    window.setTimeout(() => {
      setBurning(false);
      setBurnt(true);
    }, reduce ? 50 : 1400);
  };

  return (
    <section data-hud="day3" className="relative overflow-hidden bg-[#140a06] px-5 pb-[46svh] pt-20 sm:px-8 sm:pt-28 lg:px-14">
      {/* the fire, at the foot of the section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52svh]">
        <FireGlow className="bottom-[-30%] left-1/2 h-[120%] w-[140%] -translate-x-1/2" intensity={burning ? 1.6 : 1} />
        <div className="absolute bottom-0 left-1/2 h-[70%] w-[min(90vw,520px)] -translate-x-1/2">
          <motion.div className="absolute inset-0" animate={burning && !reduce ? { scale: [1, 1.25, 1.05] } : { scale: 1 }} transition={{ duration: 1.2 }} style={{ transformOrigin: "50% 100%" }}>
            <Flames />
          </motion.div>
        </div>
        <Embers density={burning ? 2 : 1} />
      </div>
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[900px] text-center">
        <Kicker color="#FFB36B" className="justify-center">
          {r.kicker}
        </Kicker>
        <MaskLines lines={[r.title]} className="mt-5 font-serif text-[clamp(3rem,11vw,8rem)] leading-[0.88] tracking-[-0.03em] text-[#EFE9DD]" />
        <Focus delay={0.2}>
          <p className="mx-auto mt-6 max-w-[42ch] text-[clamp(1rem,2.2vw,1.12rem)] leading-[1.6] text-[#EFE9DD]/70">{r.body}</p>
        </Focus>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {r.prompts.map((t) => {
            const on = picked.some((s) => s.text === t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggle(t)}
                aria-pressed={on}
                className={`min-h-[44px] touch-manipulation border px-4 py-2 font-hand text-[1.35rem] leading-none transition-colors ${
                  on ? "border-[#FFB36B] bg-[#FFB36B] text-[#140a06]" : "border-[#EFE9DD]/30 text-[#EFE9DD] hover:border-[#EFE9DD]/70"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <form
          className="mx-auto mt-5 flex max-w-[420px] gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <label className="sr-only" htmlFor="bir-ritual">
            {r.input}
          </label>
          <input
            id="bir-ritual"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={60}
            autoComplete="off"
            placeholder={r.input}
            className="min-h-[44px] flex-1 border-b border-[#EFE9DD]/30 bg-transparent px-1 font-hand text-[1.4rem] text-[#EFE9DD] placeholder:text-[#EFE9DD]/35 focus:border-[#FFB36B] focus:outline-none"
          />
          <button type="submit" className="min-h-[44px] px-3 text-[11px] font-semibold tracked text-[#EFE9DD]/70 hover:text-[#EFE9DD]">
            ADD
          </button>
        </form>
        <p className="mt-2 text-[10px] tracked text-[#EFE9DD]/35">{r.privacy}</p>

        {/* the slips, waiting */}
        <div className="mt-8 flex min-h-[72px] flex-wrap justify-center gap-3">
          <AnimatePresence>
            {picked.map((s, i) => (
              <motion.span
                key={s.id}
                layout={!reduce}
                className="inline-block bg-[#F3EFE6] px-4 py-2 font-hand text-[1.4rem] leading-none text-[#101311] shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                initial={reduce ? false : { opacity: 0, y: -12, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: ((i * 7) % 9) - 4 }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : {
                        y: "36svh",
                        scale: 0.2,
                        rotate: 40 - i * 17,
                        opacity: 0,
                        backgroundColor: "#FFB36B",
                        transition: { duration: 1.2, delay: i * 0.08, ease: [0.55, 0, 0.85, 0.35] },
                      }
                }
              >
                {s.text}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex min-h-[64px] items-center justify-center">
          {burnt ? (
            <Note className="text-[1.8rem] text-[#FFB36B]" rotate={-2}>
              {r.after}
            </Note>
          ) : (
            <button
              type="button"
              onClick={burn}
              disabled={!picked.length || burning}
              className="min-h-[48px] touch-manipulation bg-[#E8793A] px-7 py-3 text-[13px] font-semibold tracked text-[#140a06] shadow-[6px_6px_0_0_#EFE9DD] transition-all disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
            >
              {r.burn} 🔥
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
