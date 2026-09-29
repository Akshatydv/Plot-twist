"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { day1, media } from "@/content/bir";
import { Note } from "../Bits";
import { DayCard } from "./DayCard";
import { Clouds, Embers, FireGlow, Flames, FogBand, Footage, Kicker, MaskLines, Pines, Ridge, Stars, useCalm } from "./Scenery";

/**
 * DAY 01 — THE ESCAPE. Barot.
 *
 * World: wild, mysterious, intimate. Deep pine, river-grey, one fire.
 * Motion: slow. Everything drifts; nothing snaps.
 *
 *   the card     → you're in a hidden valley at night-ish blue
 *   the route    → DELHI → BAROT, drawn by your scroll, the land changing under it
 *   three plates → THE RIVER / THE TRAIL / GOLDEN HOUR, each opened by a mask
 *   the bonfire  → TONIGHT, WE DISAPPEAR. — seven things lit one at a time
 */
export function DayOne() {
  return (
    <div className="relative">
      <DayCard
        id={day1.id}
        hud="day1"
        day={day1.day}
        emoji={day1.emoji}
        name={day1.name}
        place={day1.place}
        lines={day1.lines}
        ground="#0b1510"
        ink="#EFE9DD"
        accent="#8FB1A8"
        scene={(p) => <ValleyScene p={p} />}
      />
      <Route />
      {day1.plates.map((plate, i) => (
        <Plate key={plate.key} plate={plate} index={i} />
      ))}
      <Bonfire />
    </div>
  );
}

function ValleyScene({ p }: { p: MotionValue<number> }) {
  const far = useTransform(p, [0, 1], ["6%", "-6%"]);
  const mid = useTransform(p, [0, 1], ["14%", "-10%"]);
  const near = useTransform(p, [0, 1], ["26%", "-14%"]);
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a1420 0%, #13262a 55%, #0b1510 100%)" }} />
      <Stars sparse />
      <Ridge name="peaks" fill="#18302e" className="h-[70%]" y={far} />
      <FogBand color="rgba(143,177,168,0.16)" className="bottom-[34%] h-[18%]" />
      <Ridge name="mid" fill="#10231c" className="h-[52%]" y={mid} />
      <Clouds color="rgba(143,177,168,0.12)" banks={3} speed={0.5} className="top-[40%]" />
      <Pines name="mid" fill="#0a1812" className="h-[34%]" y={near} />
      <Pines name="near" fill="#060e0a" className="h-[26%]" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* DELHI → BAROT                                                       */
/* ------------------------------------------------------------------ */

/**
 * Two drawings of the same road: a wide one for landscape screens and a tall
 * one for phones, so the route fills the frame either way instead of
 * shrinking to a scribble in the middle of a portrait screen.
 */
const ROUTE_WIDE = {
  d: "M60,330 C170,332 220,300 300,288 S460,270 520,236 S640,150 700,160 S800,96 850,110 S930,66 950,58",
  box: "0 0 1000 400",
};
const ROUTE_TALL = {
  d: "M60,560 C130,548 120,480 180,452 S310,410 270,340 S120,262 190,200 S330,150 300,100 S340,52 350,40",
  box: "0 0 400 600",
};

/**
 * The route draws itself as you scroll, and the land under it changes from
 * city to highway to hills to valley. The van is ON the line — its position
 * is read from the path itself, so it can never drift off the road.
 */
function Route() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const draw = useTransform(p, [0.08, 0.88], [0, 1]);
  const [reached, setReached] = useState(0);

  useMotionValueEvent(draw, "change", (v) => {
    const n = day1.route.stops.filter((s) => v >= s.at - 0.001).length;
    setReached((r) => (r === n ? r : n));
  });

  // the land, city → valley
  const city = useTransform(p, [0.05, 0.3], [1, 0]);
  const highway = useTransform(p, [0.2, 0.35, 0.55, 0.68], [0, 1, 1, 0]);
  const hills = useTransform(p, [0.5, 0.65, 0.8, 0.9], [0, 1, 1, 0.4]);
  const valley = useTransform(p, [0.78, 0.95], [0, 1]);
  const bg = useTransform(p, [0, 0.35, 0.7, 1], ["#17181a", "#1b1f1d", "#12211a", "#0b1510"]);

  const shown = reduce ? day1.route.stops.length : reached;

  return (
    <section ref={ref} data-hud="day1" className={reduce ? "relative" : "relative h-[280svh]"}>
      <motion.div
        className={`${reduce ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} flex flex-col overflow-hidden px-5 py-16 sm:px-8 lg:px-14`}
        style={{ background: reduce ? "#0b1510" : bg }}
      >
        {/* the land */}
        <div className="absolute inset-x-0 bottom-0 h-[42%]">
          <motion.div className="absolute inset-0" style={{ opacity: reduce ? 0 : city }}>
            <CitySkyline />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: reduce ? 0 : highway }}>
            <Highway />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: reduce ? 0 : hills }}>
            <Ridge name="hills" fill="#1d3228" className="h-[80%]" />
            <Ridge name="front" fill="#12231a" className="h-[55%]" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: reduce ? 1 : valley }}>
            <Ridge name="peaks" fill="#1a302b" className="h-full" />
            <Pines name="mid" fill="#0a1812" className="h-[60%]" />
          </motion.div>
        </div>
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10">
          <Kicker color="#8FB1A8">{day1.route.kicker}</Kicker>
          <p className="mt-4 max-w-[30ch] font-serif text-[clamp(1.5rem,4.2vw,2.8rem)] italic leading-[1.08] text-[var(--bir-bone)]">
            {day1.route.caption}
          </p>
        </div>

        {/* the map */}
        <div className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <RouteMap route={ROUTE_TALL} draw={draw} shown={shown} reduce={!!reduce} className="sm:hidden" />
            <RouteMap route={ROUTE_WIDE} draw={draw} shown={shown} reduce={!!reduce} className="hidden sm:block" />
          </div>

          {/* stop labels as HTML so they stay crisp and wrap on a phone */}
          <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {day1.route.stops.map((s, i) => (
              <li key={s.name} className="transition-opacity duration-700" style={{ opacity: i < shown ? 1 : 0.2 }}>
                <span className={`block text-[11px] font-semibold tracked ${i === 3 ? "text-[var(--bir-fire)]" : "text-[var(--bir-bone)]"}`}>
                  {String(i + 1).padStart(2, "0")} · {s.name}
                </span>
                <span className="mt-1 block font-hand text-[1.2rem] leading-none text-[var(--bir-bone)]/60">{s.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}

function RouteMap({
  route,
  draw,
  shown,
  reduce,
  className,
}: {
  route: { d: string; box: string };
  draw: MotionValue<number>;
  shown: number;
  reduce: boolean;
  className: string;
}) {
  const path = useRef<SVGPathElement>(null);
  const [stops, setStops] = useState<{ x: number; y: number }[]>([]);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    const L = el.getTotalLength();
    setLen(L);
    setStops(
      day1.route.stops.map((s) => {
        const pt = el.getPointAtLength(s.at * L);
        return { x: pt.x, y: pt.y };
      }),
    );
  }, []);

  const vanX = useTransform(draw, (v) => (len && path.current ? path.current.getPointAtLength(v * len).x : 0));
  const vanY = useTransform(draw, (v) => (len && path.current ? path.current.getPointAtLength(v * len).y : 0));

  return (
    <svg viewBox={route.box} className={`absolute inset-0 h-full w-full ${className}`} preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path d={route.d} fill="none" stroke="rgba(239,233,221,0.14)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <motion.path ref={path} d={route.d} fill="none" stroke="#E8B48A" strokeWidth="3" strokeLinecap="round" style={{ pathLength: reduce ? 1 : draw }} />
      {stops.map((s, i) => (
        <g key={i} opacity={i < shown ? 1 : 0.25} style={{ transition: "opacity 0.6s" }}>
          <circle cx={s.x} cy={s.y} r={i === stops.length - 1 ? 9 : 6} fill={i === stops.length - 1 ? "#E8793A" : "#EFE9DD"} />
          {i === stops.length - 1 && i < shown && (
            <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="#E8793A" strokeWidth="2">
              <animate attributeName="r" from="9" to="28" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
      {!reduce && len > 0 && <motion.circle r="7" fill="#EFE9DD" stroke="#101311" strokeWidth="3" cx={vanX} cy={vanY} />}
    </svg>
  );
}

function CitySkyline() {
  // A band of blocks with lit windows. Deterministic, so SSR and client agree.
  const blocks = Array.from({ length: 34 }, (_, i) => {
    const h = 40 + ((i * 37) % 7) * 18 + ((i * 13) % 5) * 8;
    return { x: i * 48, w: 36 + ((i * 7) % 3) * 6, h };
  });
  return (
    <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={400 - b.h * 1.6} width={b.w} height={b.h * 1.6} fill="#232426" />
          {Array.from({ length: Math.floor(b.h / 14) }, (_, j) => (
            <rect key={j} x={b.x + 8 + ((i + j) % 3) * 9} y={400 - b.h * 1.6 + 12 + j * 22} width="4" height="6" fill={(i + j) % 4 ? "#6b5a3d" : "#e8b48a"} opacity="0.7" />
          ))}
        </g>
      ))}
    </svg>
  );
}

function Highway() {
  return (
    <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <path d="M0,400 L760,150 L840,150 L1600,400 Z" fill="#1c1e1c" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = i / 6;
        const y = 150 + Math.pow(t, 1.6) * 250;
        const h = 6 + t * 30;
        return <rect key={i} x={797 - t * 6} y={y} width={6 + t * 12} height={h} fill="#e8b48a" opacity={0.6} />;
      })}
      <path d="M0,160 Q400,120 800,150 T1600,160 L1600,150 L0,150 Z" fill="#2a2d2a" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* THE RIVER / THE TRAIL / GOLDEN HOUR                                 */
/* ------------------------------------------------------------------ */

type PlateCopy = (typeof day1.plates)[number];

/**
 * A full-bleed plate, opened by a mask: it enters as an inset, rounded
 * window and widens to the full frame as it reaches the top — image masking
 * as the transition, not a fade.
 */
function Plate({ plate, index }: { plate: PlateCopy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(p, [0, 1], [14, 0]);
  const radius = useTransform(p, [0, 1], [28, 0]);
  const clip = useTransform([inset, radius], ([i, r]: number[]) => `inset(${i}% ${i * 0.6}% round ${r}px)`);
  const { scrollYProgress: q } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(q, [0, 1], ["0%", "12%"]);
  const sun = useTransform(q, [0, 1], ["0%", "60%"]);

  return (
    <section ref={ref} data-hud="day1" className="relative h-[100svh] bg-[#0b1510]">
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: reduce ? undefined : clip }}>
        <motion.div className="absolute inset-[-6%]" style={{ y: reduce ? undefined : drift }}>
          <Footage slot={media[plate.key]}>
            {plate.key === "river" && <RiverScene />}
            {plate.key === "trail" && <TrailScene />}
            {plate.key === "goldenHour" && <GoldenScene sun={sun} />}
          </Footage>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className={`absolute inset-x-0 bottom-0 z-10 px-5 pb-14 sm:px-8 sm:pb-20 lg:px-14 ${index % 2 ? "sm:text-right" : ""}`}>
          <Kicker color="#EFE9DD" className={index % 2 ? "sm:flex-row-reverse" : ""}>
            {plate.kicker}
          </Kicker>
          <MaskLines
            lines={[plate.title]}
            as="h3"
            className={`mt-4 max-w-[16ch] font-serif text-[clamp(2.4rem,7.6vw,6rem)] leading-[0.92] tracking-[-0.02em] text-[var(--bir-bone)] ${index % 2 ? "sm:ml-auto" : ""}`}
          />
          <p className={`mt-4 max-w-[40ch] text-[clamp(0.98rem,2.2vw,1.12rem)] leading-[1.55] text-[var(--bir-bone)]/75 ${index % 2 ? "sm:ml-auto" : ""}`}>
            {plate.body}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function RiverScene() {
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #9fb6b4 0%, #5f7f7c 35%, #2b4540 60%, #142520 100%)" }} />
      <Ridge name="peaks" fill="#6e8886" className="h-[78%]" />
      <FogBand color="rgba(220,232,228,0.35)" className="bottom-[46%] h-[16%]" />
      <Ridge name="mid" fill="#3c5a50" className="h-[62%]" />
      <Pines name="far" fill="#22392f" className="h-[48%]" />
      {/* the water: a V of valley floor with a bright, moving thread */}
      <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full" aria-hidden>
        <path d="M0,400 L0,120 Q400,200 700,210 T1600,130 L1600,400 Z" fill="#132720" />
        <path d="M640,400 C700,330 820,300 780,250 S760,215 800,205" stroke="#cfe3dc" strokeWidth="46" fill="none" opacity="0.5" />
        <path
          className="bir-flow"
          d="M640,400 C700,330 820,300 780,250 S760,215 800,205"
          stroke="#f3f8f5"
          strokeWidth="10"
          fill="none"
          strokeDasharray="14 36"
          opacity="0.6"
        />
      </svg>
      <Pines name="near" fill="#0a1510" className="h-[34%]" />
      <Clouds color="rgba(220,232,228,0.22)" banks={3} speed={0.6} className="top-[25%]" />
    </>
  );
}

function TrailScene() {
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #6f8a6a 0%, #2d4633 45%, #13241a 100%)" }} />
      <Pines name="far" fill="#3f5b44" className="h-[80%]" />
      {/* light shafts through the canopy */}
      <div
        className="bir-flicker absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,240,200,0.18) 24%, transparent 30%, transparent 44%, rgba(255,240,200,0.12) 47%, transparent 52%, transparent 66%, rgba(255,240,200,0.14) 70%, transparent 76%)",
          animationDuration: "7s",
        }}
      />
      <Pines name="mid" fill="#1f3526" className="h-[70%]" />
      <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[30%] w-full" aria-hidden>
        <path d="M0,400 L0,160 Q800,120 1600,170 L1600,400 Z" fill="#16261b" />
        <path d="M720,400 C760,320 900,300 860,240 S800,190 840,160" stroke="#d9c7a6" strokeWidth="22" fill="none" opacity="0.45" strokeLinecap="round" />
      </svg>
      <Pines name="near" fill="#08120c" className="h-[62%]" />
    </>
  );
}

function GoldenScene({ sun }: { sun: MotionValue<string> }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #2c3e5c 0%, #8a6a73 30%, #e59a5a 55%, #f3c27a 66%, #6b4a3a 100%)" }} />
      <motion.div
        className="absolute left-1/2 top-[40%] h-[34vmin] w-[34vmin] -translate-x-1/2 rounded-full"
        style={{ y: sun, background: "radial-gradient(circle, #fff1cf 0%, #ffcf8a 35%, rgba(255,160,80,0.4) 55%, transparent 70%)" }}
      />
      <Ridge name="wide" fill="#8a5a4a" className="h-[60%]" />
      <FogBand color="rgba(255,200,140,0.25)" className="bottom-[30%] h-[14%]" />
      <Ridge name="mid" fill="#5a3a34" className="h-[46%]" />
      <Ridge name="near" fill="#35231f" className="h-[34%]" />
      <Pines name="near" fill="#1a110e" className="h-[28%]" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* THE BONFIRE                                                         */
/* ------------------------------------------------------------------ */

/**
 * TONIGHT, WE DISAPPEAR.
 *
 * The scene starts EMPTY — a black valley — and every element in the list
 * switches its own layer on as you reach it: the fire lights, the mountains
 * appear against the sky, the fairy lights come on, and the stars arrive
 * last. You build the night by scrolling through it.
 */
function Bonfire() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = day1.bonfire.elements.length;
  const [lit, setLit] = useState(reduce ? n : 0);
  useMotionValueEvent(p, "change", (v) => {
    const next = Math.max(0, Math.min(n, Math.floor(((v - 0.14) / 0.74) * n) + 1));
    setLit((c) => (c === next ? c : next));
  });
  const on = (word: string) => {
    const i = day1.bonfire.elements.findIndex((e) => e.word === word);
    return (reduce ? n : lit) > i;
  };
  const headline = useTransform(p, [0, 0.12, 0.2], [1, 1, 0.22]);

  return (
    <section ref={ref} data-hud="day1" className={reduce ? "relative" : "relative h-[340svh]"}>
      <div className={`${reduce ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden bg-[#05080a]`}>
        {/* sky */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #04070c 0%, #0a1320 55%, #0b0f10 100%)" }} />
        <Transition show={on("Stars")}>
          <Stars />
        </Transition>
        <Transition show={on("Mountains")}>
          <Ridge name="peaks" fill="#101b22" className="h-[62%]" />
          <Ridge name="mid" fill="#0a1214" className="h-[46%]" />
        </Transition>
        <Pines name="mid" fill="#050907" className="h-[36%]" />

        {/* fairy lights, strung between the pines */}
        <Transition show={on("Fairy lights")}>
          <FairyLights />
        </Transition>

        {/* the fire */}
        <Transition show={on("Fire")}>
          <FireGlow className="bottom-[-20%] left-1/2 h-[80%] w-[140%] -translate-x-1/2" />
          <Footage slot={media.bonfire} className="!top-auto !right-auto !bottom-0 !left-1/2 h-[46%] w-[70%] -translate-x-1/2 [mask-image:radial-gradient(50%_60%_at_50%_70%,#000_40%,transparent_75%)]">
            <Flames />
          </Footage>
          <Embers className="bottom-0" />
        </Transition>
        <div className="grain pointer-events-none absolute inset-0" />

        {/* the words */}
        <div className="relative z-10 flex h-full flex-col px-5 py-16 sm:px-8 lg:px-14">
          <Kicker color="#FFB36B">{day1.bonfire.kicker}</Kicker>
          <motion.div style={{ opacity: reduce ? 1 : headline }}>
            <MaskLines
              lines={day1.bonfire.headline}
              className="mt-5 font-serif text-[clamp(3rem,12vw,9.5rem)] leading-[0.86] tracking-[-0.03em] text-[var(--bir-bone)]"
            />
          </motion.div>

          <ul className="mt-auto grid gap-x-8 gap-y-3 sm:max-w-[640px] sm:grid-cols-2">
            {day1.bonfire.elements.map((e, i) => {
              const isOn = (reduce ? n : lit) > i;
              return (
                <li
                  key={e.word}
                  className="flex items-baseline gap-3 transition-all duration-700"
                  style={{ opacity: isOn ? 1 : 0.14, transform: isOn ? "none" : "translateY(8px)" }}
                >
                  <span aria-hidden className="text-lg">
                    {e.icon}
                  </span>
                  <span>
                    <span className="block font-serif text-[1.45rem] leading-none text-[var(--bir-bone)]">{e.word}</span>
                    <span className="block text-[0.85rem] leading-snug text-[var(--bir-bone)]/55">{e.line}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Note className="text-[1.4rem] text-[var(--bir-ember)]" rotate={-3}>
              {day1.bonfire.scribble}
            </Note>
          </div>
        </div>
      </div>
    </section>
  );
}

function Transition({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FairyLights() {
  const bulbs = Array.from({ length: 26 }, (_, i) => {
    const t = i / 25;
    return { x: t * 100, y: 30 + Math.sin(t * Math.PI) * 9 + Math.sin(t * 9) * 1.2, d: (i * 0.53) % 3 };
  });
  return (
    <div className="absolute inset-x-0 top-[26%] h-[20%]">
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d={`M${bulbs.map((b) => `${b.x},${b.y}`).join(" L")}`} stroke="rgba(255,220,160,0.25)" strokeWidth="0.15" fill="none" />
      </svg>
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="bir-twinkle absolute h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ffd79a] shadow-[0_0_12px_4px_rgba(255,190,110,0.55)]"
          style={{ left: `${b.x}%`, top: `${(b.y / 50) * 100}%`, animationDelay: `${b.d}s`, animationDuration: "3s" }}
        />
      ))}
    </div>
  );
}
