"use client";

import { useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { day2, media, townPhotos } from "@/content/bir";
import Image from "next/image";
import { Note } from "../Bits";
import { DayCard } from "./DayCard";
import { Clouds, FireGlow, Focus, Footage, Glider, Kicker, MaskLines, PanRidge, PrayerFlags, Ridge, useCalm } from "./Scenery";

/**
 * DAY 02 — THE FLIGHT. Bir.
 *
 * World: free, social, high-energy. Sky blue, prayer-flag colour, cream.
 * Motion: fast and lateral — the only chapter where things move sideways.
 *
 *   the card       → morning sky, flags, tiny gliders already up
 *   the town       → a horizontal drift of what Bir is, scrubbed by scroll
 *   the headline   → YOU DIDN'T COME ALL THIS WAY TO STAY ON THE GROUND.
 *   THE FLIGHT     → six stages, and the scroll IS the flight
 *   social club    → the day slows down
 *   the evening    → SUNSET. MUSIC. STRANGERS. NOT FOR LONG. — one per screen
 *   social night   → the private night
 */
export function DayTwo() {
  return (
    <div className="relative">
      <DayCard
        id={day2.id}
        hud="day2"
        day={day2.day}
        emoji={day2.emoji}
        name={day2.name}
        place={day2.place}
        ground="#a9cbe0"
        ink="#F3EFE6"
        accent="#F3EFE6"
        scene={(p) => <SkyScene p={p} />}
        slot={media.day2}
        tint="linear-gradient(to bottom, rgba(36,82,125,0.35) 0%, rgba(16,19,17,0.15) 40%, rgba(16,19,17,0.65) 100%)"
      />
      <Town />
      <FlightHeadline />
      <TheFlight />
      <SocialClub />
      <Evening />
      <SocialNight />
    </div>
  );
}

function SkyScene({ p }: { p: MotionValue<number> }) {
  const g1 = useTransform(p, [0, 1], ["10%", "-40%"]);
  const g2 = useTransform(p, [0, 1], ["60%", "-10%"]);
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #6f9fc4 0%, #a9cbe0 50%, #e6eef2 100%)" }} />
      <Clouds color="rgba(255,255,255,0.7)" banks={5} speed={1.4} />
      <Ridge name="peaks" fill="#bfd1dd" className="h-[46%]" />
      <Ridge name="mid" fill="#8fadbf" className="h-[32%]" />
      <Ridge name="front" fill="#58788a" className="h-[18%]" />
      <motion.div className="absolute left-[70%] top-[18%] w-16 sm:w-24" style={{ y: g1 }}>
        <Glider canopy="#C8412F" />
      </motion.div>
      <motion.div className="absolute left-[14%] top-[34%] w-10 opacity-80 sm:w-14" style={{ y: g2 }}>
        <Glider canopy="#2F6DB3" />
      </motion.div>
      <div className="absolute inset-x-0 top-0">
        <PrayerFlags count={26} sag={50} className="h-24 sm:h-32" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* the town — horizontal drift                                         */
/* ------------------------------------------------------------------ */

const FLAG = ["#2F6DB3", "#C8412F", "#3F8A4F", "#E5B637", "#24527D", "#A95F38"];

function Town() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0.05, 0.95], ["0%", "-78%"]);

  return (
    <section ref={ref} data-hud="day2" className={reduce ? "relative" : "relative h-[320svh]"}>
      <div className={`${reduce ? "relative py-20" : "sticky top-0 h-[100svh]"} flex flex-col justify-center overflow-hidden bg-[#F3EFE6]`}>
        <div className="absolute inset-x-0 top-0">
          <PrayerFlags count={30} sag={30} className="h-16 sm:h-20" y0={8} />
        </div>
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative px-5 sm:px-8 lg:px-14">
          <Kicker color="#24527D">BIR</Kicker>
          <p className="mt-4 max-w-[40ch] font-serif text-[clamp(1.35rem,3.4vw,2.2rem)] italic leading-[1.15] text-[var(--bir-char)]">{day2.intro}</p>
        </div>

        <motion.ul
          className={`relative mt-10 flex gap-10 px-5 sm:gap-16 sm:px-8 lg:px-14 ${reduce ? "flex-wrap" : "w-max"}`}
          style={{ x: reduce ? undefined : x }}
        >
          {day2.town.flatMap((t, i) => {
            const word = (
              <li key={t.word} className="flex shrink-0 items-end gap-5">
                <span aria-hidden className="mb-3 block h-[clamp(5rem,16vw,11rem)] w-2 sm:w-3" style={{ background: FLAG[i % FLAG.length] }} />
                <span>
                  <span className="block whitespace-nowrap font-serif text-[clamp(3rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--bir-char)]">
                    {t.word}
                  </span>
                  <span className="mt-2 block font-hand text-[1.35rem] leading-none text-[var(--bir-char)]/55">{t.note}</span>
                </span>
              </li>
            );
            const ph = townPhotos.find((x) => x.after === i);
            if (!ph) return [word];
            return [
              word,
              <li key={ph.file} className="relative shrink-0 self-center">
                <div
                  className="relative h-[clamp(11rem,34vw,20rem)] w-[clamp(8.5rem,26vw,15rem)] overflow-hidden bg-[#d9d2c3] shadow-[0_14px_30px_rgba(16,19,17,0.18)]"
                  style={{ rotate: `${[-3, 2, -2][townPhotos.indexOf(ph)]}deg` }}
                >
                  <Image src={ph.file} alt={ph.alt} fill sizes="(max-width: 640px) 40vw, 240px" className="bir-grade object-cover" />
                </div>
              </li>,
            ];
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the flight                                                          */
/* ------------------------------------------------------------------ */

function FlightHeadline() {
  return (
    <section data-hud="day2" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#24527D] px-5 py-24 sm:px-8 lg:px-14">
      <Clouds color="rgba(255,255,255,0.16)" banks={4} speed={2} />
      {/* real flight, washed into the day's blue so the headline owns the frame */}
      <Footage slot={media.above} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#16304d]/85 via-[#24527D]/55 to-[#24527D]/20" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <Kicker color="#A9CBE0">{day2.flight.kicker}</Kicker>
        <MaskLines
          lines={day2.flight.headline}
          className="mt-6 font-serif text-[clamp(2.7rem,9.4vw,8rem)] leading-[0.9] tracking-[-0.025em] text-[#F3EFE6]"
        />
        <Focus delay={0.5}>
          <p className="mt-8 max-w-[44ch] text-[1rem] leading-[1.55] text-[#F3EFE6]/70">{day2.flight.note}</p>
        </Focus>
      </div>
    </section>
  );
}

const S = 1 / 6;
const FLIGHT_PATH = "M40,40 C120,50 150,120 210,130 S300,90 330,150 S380,230 460,250";

/**
 * THE FLIGHT — the biggest interactive moment on the page.
 *
 * 640svh of scroll, pinned. Scroll is airspeed: stop scrolling and the glider
 * hangs. Six stages, each a sixth of the run:
 *
 *   PREPARE          on the launch, canopy up, nothing moving yet
 *   WALK TO THE EDGE the hill slides away left; the valley opens beyond it
 *   TAKE OFF         the ground falls out from under the frame
 *   FLY              ranges stream past; the altimeter climbs on a thermal
 *   LOOK DOWN        the sky tilts out of frame; the valley floor fills it
 *   LAND             the landing field comes up to meet you
 *
 * The flight path (BILLING → BIR) and the altimeter are live the whole way.
 * The altitudes are the approximate launch and landing heights and a
 * notional thermal between them — illustrative, and labelled with a ±.
 */
function TheFlight() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const s = Math.min(5, Math.max(0, Math.floor(v / S)));
    setStage((c) => (c === s ? c : s));
  });

  // the launch hill: slides left on the walk, drops on take-off
  const hillX = useTransform(p, [S * 0.6, S * 2], ["0%", "-38%"]);
  const hillY = useTransform(p, [S * 2, S * 2.8], ["0%", "110%"]);
  // the airborne world tilts up out of frame when you look down, then returns
  const skyY = useTransform(p, [S * 4, S * 4.5, S * 4.9, S * 5.3], ["0%", "-62%", "-62%", "0%"]);
  const below = useTransform(p, [S * 3.9, S * 4.4, S * 4.9, S * 5.25], [0, 1, 1, 0]);
  const belowScale = useTransform(p, [S * 3.9, S * 5], [1.35, 1]);
  // the landing field
  const fieldY = useTransform(p, [S * 5, 1], ["100%", "0%"]);
  // you
  const gY = useTransform(p, [0, S * 2, S * 3, S * 4, S * 5, 1], ["52%", "52%", "26%", "20%", "24%", "58%"]);
  const gX = useTransform(p, [0, S * 2, S * 3, 1], ["54%", "62%", "44%", "46%"]);
  const gR = useTransform(p, [S * 2, S * 2.4, S * 3, S * 5.6, 1], [0, -10, 2, -4, 0]);
  const gS = useTransform(p, [0, S * 2, S * 3, S * 4.2, S * 4.8, 1], [0.8, 0.9, 1, 1, 0.7, 0.9]);
  // instruments
  const alt = useTransform(p, [0, S * 2, S * 3.8, S * 5, 1], [2400, 2400, 2620, 2050, 1400]);
  const altText = useTransform(alt, (v) => `± ${Math.round(v / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  const route = useTransform(p, [S * 2, 1], [0, 1]);

  if (reduce) return <FlightStill sref={ref} />;

  const st = day2.flight.stages[stage];

  return (
    <section ref={ref} data-hud="day2" aria-label="The paragliding flight, Billing to Bir" className="relative h-[640svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#8fb9d6]">
        <Footage slot={media.flight}>
          {/* the airborne world */}
          <motion.div className="absolute inset-0" style={{ y: skyY }}>
            <div className="absolute inset-0 h-[170%]" style={{ background: "linear-gradient(to bottom, #5d8fb7 0%, #a9cbe0 35%, #e8eef0 55%, #b9c9b0 70%, #5f7a55 100%)" }} />
            <PanRidge name="peaks" fill="#c5d4de" duration={200} className="h-[60%]" />
            <Clouds color="rgba(255,255,255,0.6)" banks={3} speed={2.5} className="top-[20%]" />
            <PanRidge name="wide" fill="#93adbd" duration={120} className="h-[50%]" />
            <PanRidge name="mid" fill="#6c8a6c" duration={60} className="h-[38%]" />
            <PanRidge name="near" fill="#46603f" duration={30} className="h-[26%]" />
          </motion.div>

          {/* look down: the valley floor, top-down */}
          <motion.div className="absolute inset-0" style={{ opacity: below, scale: belowScale }}>
            <Footage slot={media.lookDown}>
              <ValleyFloor />
            </Footage>
          </motion.div>

          {/* the launch */}
          <motion.div className="absolute inset-0" style={{ x: hillX, y: hillY }}>
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[46%] w-[150%]" aria-hidden>
              <path d="M0,400 L0,120 C300,90 700,100 1000,150 L1060,170 L1080,400 Z" fill="#6b7a3f" />
              <path d="M0,130 C300,100 700,110 1000,158 L1060,176" stroke="#8a9a55" strokeWidth="8" fill="none" />
              {/* a windsock at the edge */}
              <line x1="980" y1="150" x2="980" y2="70" stroke="#101311" strokeWidth="3" />
              <path className="bir-flutter" d="M980,72 L1030,80 L1030,92 L980,98 Z" fill="#E8793A" style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }} />
            </svg>
          </motion.div>

          {/* the landing field */}
          <motion.div className="absolute inset-x-0 bottom-0 h-[34%]" style={{ y: fieldY }}>
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
              <path d="M0,400 L0,90 Q800,40 1600,90 L1600,400 Z" fill="#5f7a3f" />
              <path d="M200,400 L700,90 M900,90 L1400,400" stroke="#7d9650" strokeWidth="6" opacity="0.5" />
              <circle cx="800" cy="170" r="60" fill="none" stroke="#F3EFE6" strokeWidth="6" opacity="0.7" />
            </svg>
          </motion.div>

          {/* you */}
          <motion.div
            className="absolute w-[34vw] min-w-[130px] max-w-[260px] -translate-x-1/2 -translate-y-1/2"
            style={{ top: gY, left: gX, rotate: gR, scale: gS }}
          >
            <Glider canopy="#E8793A" />
          </motion.div>
        </Footage>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30" />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* the stage */}
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-14 sm:px-8 lg:px-14">
          <div>
            <ol className="flex gap-1.5" aria-hidden>
              {day2.flight.stages.map((s, i) => (
                <li key={s.n} className="h-[3px] w-7 transition-colors duration-500 sm:w-10" style={{ background: i <= stage ? "#F3EFE6" : "rgba(243,239,230,0.3)" }} />
              ))}
            </ol>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
                aria-live="polite"
              >
                <span className="text-[11px] font-semibold tracked text-[#F3EFE6]/80">{st.n} / 06</span>
                <span className="mt-2 block font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.86] tracking-[-0.025em] text-[#F3EFE6] [text-shadow:0_2px_30px_rgba(16,19,17,0.35)]">
                  {st.word}
                </span>
                <span className="mt-3 block max-w-[30ch] text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.45] text-[#F3EFE6]/90 [text-shadow:0_1px_12px_rgba(16,19,17,0.5)]">
                  {st.line}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* instruments */}
          <div className="flex items-end justify-between gap-4">
            <div className="text-[#F3EFE6]">
              <span className="block text-[9px] tracked opacity-70">ALT · M</span>
              <motion.span className="block font-serif text-[clamp(1.8rem,5vw,3rem)] leading-none tabular-nums">{altText}</motion.span>
              <Note className="mt-2 block text-[1.2rem] text-[#F3EFE6]/80" rotate={-3}>
                {day2.flight.scribble}
              </Note>
            </div>
            <div className="w-[48vw] max-w-[320px] bg-[#101311]/35 p-3 backdrop-blur-[2px] sm:p-4">
              <div className="flex justify-between text-[9px] font-semibold tracked text-[#F3EFE6]">
                <span>{day2.flight.path.from}</span>
                <span>{day2.flight.path.to}</span>
              </div>
              <svg viewBox="0 0 500 280" className="mt-1 w-full" aria-hidden>
                <path d={FLIGHT_PATH} stroke="rgba(243,239,230,0.3)" strokeWidth="3" strokeDasharray="4 8" fill="none" />
                <motion.path d={FLIGHT_PATH} stroke="#E8B48A" strokeWidth="4" fill="none" strokeLinecap="round" style={{ pathLength: route }} />
                <circle cx="40" cy="40" r="7" fill="#F3EFE6" />
                <circle cx="460" cy="250" r="9" fill="#E8793A" />
              </svg>
              <div className="flex justify-between text-[9px] tracked text-[#F3EFE6]/70">
                <span>± {day2.flight.path.fromAlt.toLocaleString("en-IN")} M</span>
                <span>± {day2.flight.path.toAlt.toLocaleString("en-IN")} M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Top-down valley: a patchwork of terraces, a river, a village. */
function ValleyFloor() {
  const cells = Array.from({ length: 70 }, (_, i) => ({
    x: (i % 10) * 10 + ((i * 7) % 3),
    y: Math.floor(i / 10) * 15 + ((i * 11) % 4),
    w: 8 + ((i * 13) % 4),
    h: 11 + ((i * 5) % 5),
    c: ["#6f8a4a", "#8aa05a", "#a7a863", "#58703c", "#9a8a55", "#7c9a5a"][i % 6],
    r: ((i * 17) % 9) - 4,
  }));
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="100" height="100" fill="#4f6a38" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} fill={c.c} transform={`rotate(${c.r} ${c.x + c.w / 2} ${c.y + c.h / 2})`} opacity="0.9" />
      ))}
      <path d="M-5,20 C20,30 30,50 50,52 S80,70 105,85" stroke="#a9cbe0" strokeWidth="2.4" fill="none" />
      <path d="M-5,20 C20,30 30,50 50,52 S80,70 105,85" stroke="#e8f1f5" strokeWidth="0.6" fill="none" />
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={60 + (i % 6) * 2.2} y={30 + Math.floor(i / 6) * 2.4} width="1.4" height="1.4" fill={i % 5 ? "#efe9dd" : "#c8412f"} />
      ))}
    </svg>
  );
}

/** Reduced motion: the six stages as a still, readable sequence. */
function FlightStill({ sref }: { sref: RefObject<HTMLElement | null> }) {
  return (
    <section ref={sref} data-hud="day2" className="relative bg-[#8fb9d6] px-5 py-20 sm:px-8 lg:px-14">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {day2.flight.stages.map((s) => (
          <li key={s.n}>
            <span className="text-[11px] font-semibold tracked text-[#101311]/60">{s.n} / 06</span>
            <span className="mt-1 block font-serif text-[2.4rem] leading-none text-[#101311]">{s.word}</span>
            <span className="mt-2 block text-[#101311]/75">{s.line}</span>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-[11px] font-semibold tracked text-[#101311]">
        {day2.flight.path.from} → {day2.flight.path.to}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the social club, the evening, the night                             */
/* ------------------------------------------------------------------ */

function SocialClub() {
  const reduce = useCalm();
  return (
    <section data-hud="day2" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14" style={{ background: "linear-gradient(to bottom, #e6eef2 0%, #f1dcc2 55%, #e9b48a 100%)" }}>
      <div className="absolute inset-x-0 top-0">
        <PrayerFlags count={20} sag={40} className="h-16 sm:h-24" />
      </div>
      <Footage slot={media.social} className="[mask-image:linear-gradient(to_left,#000_35%,transparent_85%)]" />
      {/* a paper wash behind the copy so it reads over the sunset on a phone */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f1e6d6]/90 via-[#f1e6d6]/55 to-transparent sm:via-[#f1e6d6]/30" />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1200px]">
        <Kicker color="#A95F38">{day2.social.kicker}</Kicker>
        <MaskLines lines={day2.social.title} className="mt-5 font-serif text-[clamp(3rem,11vw,8.5rem)] leading-[0.86] tracking-[-0.03em] text-[var(--bir-char)]" />
        <Focus delay={0.3}>
          <p className="mt-6 max-w-[42ch] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.55] text-[var(--bir-char)]/75">{day2.social.body}</p>
        </Focus>
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
          {day2.social.items.map((it, i) => (
            <motion.li
              key={it}
              className="font-serif text-[clamp(1.5rem,4vw,2.4rem)] italic text-[var(--bir-char)]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              {it}
              {i < day2.social.items.length - 1 && <span className="pl-6 not-italic text-[var(--bir-clay)]">·</span>}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const DUSK = ["#e9b48a", "#c9705a", "#6b3a5a", "#1a1a33"];

/** SUNSET. MUSIC. STRANGERS. NOT FOR LONG. — one word per screen of scroll, sky darkening under it. */
function Evening() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = day2.evening.length;
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setI((c) => (c === k ? c : k));
  });
  const l1 = useTransform(p, [0.15, 0.3], [0, 1]);
  const sunO = useTransform(p, [0, 0.2, 0.3], [1, 1, 0]);
  const l2 = useTransform(p, [0.4, 0.55], [0, 1]);
  const l3 = useTransform(p, [0.65, 0.8], [0, 1]);

  if (reduce) {
    return (
      <section ref={ref} data-hud="day2" className="bg-[#1a1a33] px-5 py-24 sm:px-8 lg:px-14">
        {day2.evening.map((w) => (
          <p key={w} className="font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.9] text-[#F3EFE6]">{w}</p>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} data-hud="day2" className="relative h-[360svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 sm:px-8 lg:px-14">
        <div className="absolute inset-0" style={{ background: DUSK[0] }} />
        {/* SUNSET. is the real one — Bir, a glider crossing the sun */}
        <motion.div className="absolute inset-0" style={{ opacity: sunO }}>
          <Footage slot={media.sunset} drift />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a33]/70 via-transparent to-[#e9b48a]/20" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ background: DUSK[1], opacity: l1 }} />
        <motion.div className="absolute inset-0" style={{ background: DUSK[2], opacity: l2 }} />
        <motion.div className="absolute inset-0" style={{ background: DUSK[3], opacity: l3 }} />
        <Ridge name="mid" fill="rgba(16,19,17,0.35)" className="h-[30%]" />
        <div className="grain pointer-events-none absolute inset-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            className={`relative font-serif leading-[0.86] tracking-[-0.03em] text-[#F3EFE6] ${i === n - 1 ? "text-[clamp(3.4rem,15vw,12rem)] italic" : "text-[clamp(4rem,19vw,15rem)]"}`}
            initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {day2.evening[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SocialNight() {
  const reduce = useCalm();
  return (
    <section data-hud="day2" className="relative overflow-hidden bg-[#1a1a33] px-5 pb-28 pt-10 sm:px-8 sm:pb-36 lg:px-14">
      <Footage slot={media.socialNight} drift />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a1a33] via-[#1a1a33]/60 to-[#1a1a33]/30" />
      <FireGlow className="-bottom-1/3 left-1/2 h-[80%] w-[120%] -translate-x-1/2" intensity={0.7} />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px]">
        <Kicker color="#E8B48A">{day2.night.kicker}</Kicker>
        <MaskLines lines={[day2.night.title]} className="mt-5 font-serif text-[clamp(3rem,11vw,8.5rem)] leading-[0.86] tracking-[-0.03em] text-[#F3EFE6]" />
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
          {day2.night.items.map((it, i) => (
            <motion.span
              key={it}
              className="border border-[#F3EFE6]/25 px-4 py-2 text-[12px] font-semibold tracked text-[#F3EFE6]"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              {it}
            </motion.span>
          ))}
        </div>
        <Focus delay={0.4}>
          <p className="mt-10 max-w-[44ch] font-serif text-[clamp(1.3rem,3vw,1.9rem)] italic leading-[1.25] text-[#F3EFE6]/85">{day2.night.body}</p>
        </Focus>
      </div>
    </section>
  );
}
