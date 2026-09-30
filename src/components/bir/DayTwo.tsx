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
import { day1, day2, media, sequences } from "@/content/bir";
import { Plate, ValleyScene } from "./DayOne";
import { Note } from "../Bits";
import { DayCard } from "./DayCard";
import { Clouds, FireGlow, Focus, Footage, FrameStack, Glider, Kicker, MaskLines, PrayerFlags, Ridge, useCalm } from "./Scenery";

/**
 * DAY 02 — THE FLIGHT. A day trip out of Bir: Barot, Billing, the circuit.
 *
 *   the card      → Barot valley from the hillside
 *   morning       → THE RIVER, THE TRAIL (the plates, from DayOne.tsx)
 *   afternoon     → YOU DIDN'T COME ALL THIS WAY… then THE FLIGHT, six
 *                   stages, Billing → Bir, and the scroll IS the flight
 *   evening       → GOLDEN HOUR, landed back in Bir
 */
export function DayTwo() {
  const [river, trail, golden] = day1.plates;
  return (
    <div className="relative">
      <DayCard
        id={day2.id}
        hud="day2"
        day={day2.day}
        emoji={day2.emoji}
        name={day2.name}
        place={day2.place}
        lines={day2.lines}
        ground="#0b1510"
        ink="#EFE9DD"
        accent="#8FB1A8"
        scene={(p) => <ValleyScene p={p} />}
        slot={media.day2}
        tint="linear-gradient(to bottom, rgba(11,21,16,0.55) 0%, rgba(11,21,16,0.45) 45%, rgba(11,21,16,0.92) 100%)"
      />
      {/* morning: Barot */}
      <Plate plate={river} index={0} />
      <Plate plate={trail} index={1} />
      {/* afternoon: up to Billing, and the flight back down to Bir */}
      <FlightHeadline />
      <TheFlight />
      {/* evening: landed */}
      <Plate plate={golden} index={2} />
    </div>
  );
}

export function SkyScene({ p }: { p: MotionValue<number> }) {
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

export function Town() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0.05, 0.95], ["0%", "-66%"]);

  return (
    <section ref={ref} data-hud="day1" className={reduce ? "relative" : "relative h-[320svh]"}>
      <div className={`${reduce ? "relative py-20" : "sticky top-0 h-[100svh]"} flex flex-col justify-center overflow-hidden bg-[#F3EFE6]`}>
        <div className="absolute inset-x-0 top-0">
          <PrayerFlags count={30} sag={30} className="h-16 sm:h-20" y0={8} />
        </div>
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative px-5 sm:px-8 lg:px-14">
          <Kicker color="#24527D">BIR</Kicker>
          <p className="mt-4 max-w-[40ch] font-serif text-[clamp(1.35rem,3.4vw,2.2rem)] italic leading-[1.15] text-[var(--bir-char)]">{day2.intro}</p>
        </div>

        {/* one full-height photograph per word — the word lives on its picture */}
        <motion.ul
          className={`relative mt-8 flex gap-4 px-5 sm:gap-6 sm:px-8 lg:px-14 ${reduce ? "flex-wrap" : "w-max"}`}
          style={{ x: reduce ? undefined : x }}
        >
          {day2.town.map((t, i) => {
            const ph = sequences.town[i];
            return (
              <li
                key={t.word}
                className="relative h-[min(58svh,560px)] w-[min(76vw,440px)] shrink-0 overflow-hidden bg-[#d9d2c3] shadow-[0_18px_40px_rgba(16,19,17,0.22)]"
              >
                <Footage slot={{ image: ph.file, alt: ph.title }} sizes="(max-width: 640px) 76vw, 440px" drift />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101311]/85 via-[#101311]/15 to-transparent" />
                <span aria-hidden className="absolute left-0 top-0 h-full w-2 sm:w-3" style={{ background: FLAG[i % FLAG.length] }} />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="block font-serif text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.9] tracking-[-0.02em] text-[#F3EFE6]">{t.word}</span>
                  <span className="mt-2 block font-hand text-[1.35rem] leading-none text-[#F3EFE6]/75">{t.note}</span>
                </div>
              </li>
            );
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
 *   PREPARE          clip: wings laid out on a launch meadow
 *   WALK TO THE EDGE photo: a launch's edge, the valley beyond
 *   TAKE OFF         clip: a wing fills and lifts its pilot off
 *   FLY              clip: under the canopy over green mountains
 *   LOOK DOWN        photo: Bir from the air
 *   LAND             clip: low over the fields, onto the grass
 *
 * Each stage is a full-bleed frame from content/bir.ts → sequences.flight.
 * Only Bir's aerial is Bir; the clips are Slovenia (CC BY 3.0), credited.
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

  // instruments
  const alt = useTransform(p, [0, S * 2, S * 3.8, S * 5, 1], [2400, 2400, 2620, 2050, 1400]);
  const altText = useTransform(alt, (v) => `± ${Math.round(v / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  const route = useTransform(p, [S * 2, 1], [0, 1]);

  if (reduce) return <FlightStill sref={ref} />;

  const st = day2.flight.stages[stage];

  return (
    <section ref={ref} data-hud="day2" aria-label="The paragliding flight, Billing to Bir" className="relative h-[640svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#8fb9d6]">
        {/* a real frame for every stage: launch, edge, take-off, flight, the valley, the landing */}
        <FrameStack frames={sequences.flight} active={stage} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/55" />
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

export function SocialClub() {
  const reduce = useCalm();
  return (
    <section data-hud="day1" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14" style={{ background: "linear-gradient(to bottom, #e6eef2 0%, #f1dcc2 55%, #e9b48a 100%)" }}>
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


/** SUNSET. MUSIC. STRANGERS. NOT FOR LONG. — one word per screen of scroll, sky darkening under it. */
export function Evening() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = day2.evening.length;
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setI((c) => (c === k ? c : k));
  });

  if (reduce) {
    return (
      <section ref={ref} data-hud="day1" className="bg-[#1a1a33] px-5 py-24 sm:px-8 lg:px-14">
        {day2.evening.map((w) => (
          <p key={w} className="font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.9] text-[#F3EFE6]">{w}</p>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} data-hud="day1" className="relative h-[360svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 sm:px-8 lg:px-14">
        {/* a real photograph per word, the light dropping frame by frame */}
        <FrameStack
          frames={sequences.evening}
          active={i}
          tint="linear-gradient(to bottom, rgba(26,26,51,0.35) 0%, rgba(26,26,51,0.25) 45%, rgba(26,26,51,0.75) 100%)"
        />
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
