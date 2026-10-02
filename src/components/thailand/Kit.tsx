"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { MediaSlot } from "@/content/bir";
import { Focus, Footage, useCalm } from "../bir/Scenery";

/**
 * THE CHAOS KIT — Thailand's own primitives.
 *
 * Everything environmental (footage slots, blur-to-focus, reduced motion) is
 * borrowed from the Bir kit rather than copied. What lives here is the grammar
 * this page needs that neither of the others has.
 *
 * ─── WHAT WAS LEARNED FROM READING srilanka/Kit.tsx ─────────────────────────
 * Every Sri Lanka world opens the same way and then does something nobody
 * else does. The CARD is the constant — one full screen, the date enormous and
 * outlined behind the chapter name, the frame opening from a letterbox to full
 * bleed as it arrives — and the SET PIECE is the variable. That split is the
 * whole reason seven chapters read as one journey instead of seven pages: the
 * grammar never changes, only the world does.
 *
 * The first build of this page had neither. It had seven flat sections in
 * seven colours, which is why it did not feel like entering anything.
 */

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ------------------------------------------------------------------ */
/* the card every world opens on                                       */
/* ------------------------------------------------------------------ */

/**
 * HOW EVERY WORLD BEGINS.
 *
 * Four things move at four different rates, which is what makes a flat
 * photograph read as a place you are arriving in:
 *
 *   the frame   clip-path opens `inset(14% 9%)` → `inset(0)` — a letterbox
 *               widening to full bleed as the card reaches the top
 *   the media   drifts down slowly behind the frame
 *   the date    slides the OTHER way, enormous and outlined, so it reads as
 *               something painted on the wall behind rather than a label
 *   the name    rises from behind its own overflow — a mask reveal, not a fade
 *
 * Thailand's difference from Sri Lanka's card is the date: this trip's days are
 * 15…21 December, so the big outlined numeral is the DAY OF THE MONTH rather
 * than a chapter number. By World 05 it is reading 18–20 and that is the
 * loudest the number ever gets, which is correct — it is the reason for the week.
 */
export function ChaosCard({
  n,
  date,
  name,
  place,
  lines,
  slot,
  tone,
  ground,
  ink,
  tint,
  register,
}: {
  n: string;
  date: string;
  name: string;
  place: string;
  lines?: readonly string[];
  slot: MediaSlot;
  tone: string;
  ground: string;
  ink: string;
  tint: string;
  /** "island" speaks in serif italic. "festival" speaks in Anton caps. */
  register: "island" | "festival";
}) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(p, [0, 0.42], ["inset(14% 9% 14% 9%)", "inset(0% 0% 0% 0%)"]);
  const mediaY = useTransform(p, [0, 1], ["-6%", "10%"]);
  const dateX = useTransform(p, [0, 1], ["6%", "-12%"]);
  const titleY = useTransform(p, [0.2, 1], ["8%", "-14%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-14"
      style={{ background: ground, color: ink }}
    >
      <motion.div className="absolute inset-0" style={calm ? undefined : { clipPath: clip }}>
        <motion.div className="absolute inset-[-8%_0]" style={calm ? undefined : { y: mediaY }}>
          <Footage slot={slot} drift />
        </motion.div>
        <div className="absolute inset-0" style={{ background: tint }} />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0" />

      {/* the date, enormous, outlined, sliding against the scroll */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-[12%] whitespace-nowrap font-display text-[clamp(7rem,34vw,30rem)] leading-[0.8] tracking-[-0.02em] opacity-90"
        style={{ x: calm ? undefined : dateX, WebkitTextStroke: `1.5px ${tone}`, color: "transparent" }}
      >
        {date}
      </motion.span>

      <motion.div className="relative z-10 w-full" style={{ y: calm ? undefined : titleY }}>
        <Focus>
          <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracked" style={{ color: tone }}>
            <span className="font-display text-[15px] tracking-normal">{n} / 07</span>
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            {date} DEC
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            {place}
          </p>
        </Focus>

        {/* the mask reveal — the name rises from behind its own overflow */}
        {/* THE VOICE CHANGES HERE. The island half is set in the editorial
            serif italic that Bir and Sri Lanka use; the festival half is set in
            Anton, uppercase and tight. Same component, same motion, same
            position — a different language. That is what makes the gate read as
            a gate without a word being spent on it. */}
        <motion.h2
          className={`mt-4 overflow-hidden pb-[0.06em] leading-[0.86] ${
            register === "festival"
              ? "font-display uppercase tracking-[-0.01em]"
              : "font-serif italic tracking-[-0.02em]"
          }`}
          initial={calm ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            className={register === "festival" ? "block text-[clamp(3.4rem,14vw,13rem)]" : "block text-[clamp(3rem,12.5vw,11rem)]"}
            variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.span>
        </motion.h2>

        {lines && (
          <div className="mt-5 max-w-[36ch]">
            {lines.map((l, i) => (
              <Focus key={l} delay={0.3 + i * 0.22}>
                <p
                  className={
                    register === "festival"
                      ? "text-[clamp(0.78rem,2vw,1rem)] font-semibold uppercase tracked leading-[1.6]"
                      : "font-serif text-[clamp(1.3rem,3.4vw,2.3rem)] italic leading-[1.12]"
                  }
                >
                  {l}
                </p>
              </Focus>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the pinned sideways reel                                            */
/* ------------------------------------------------------------------ */

/**
 * VERTICAL SCROLL, SIDEWAYS FILM. The section is as tall as the track is wide;
 * inside it one sticky screen whose track slides left as you scroll down. On a
 * phone that is a swipe-up that moves the story sideways — the gesture
 * Instagram already trained, which is why this page uses it for the two days
 * that are genuinely a sequence of hours rather than a mood.
 *
 * The distance is MEASURED (track width minus viewport), never assumed, so a
 * panel can be any width. Reduced motion gets a native snap scroller instead
 * of a pinned section.
 */
export function Reel({
  children,
  label,
  lead,
  className = "",
}: {
  children: (p: MotionValue<number>) => ReactNode;
  label?: string;
  lead?: (p: MotionValue<number>) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], [0, -dist]);

  useIsoLayout(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      setDist(Math.max(0, el.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (calm) {
    return (
      <section aria-label={label} className={`relative ${className}`}>
        {lead?.(p)}
        <div className="flex snap-x snap-mandatory overflow-x-auto">{children(p)}</div>
      </section>
    );
  }

  return (
    /* height = one screen + the horizontal distance, so a pixel of scroll is a
       pixel of travel and the reel never feels geared. */
    <section ref={ref} aria-label={label} className={`relative ${className}`} style={{ height: vh ? vh + dist : "400svh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {lead?.(p)}
        <motion.div ref={track} className="flex h-full w-max" style={{ x }}>
          {children(p)}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* one beat inside a reel                                              */
/* ------------------------------------------------------------------ */

/* `readonly` throughout: the beats come from a `as const` content object, which
   is what stops anyone mutating copy at render time. The component only ever
   reads them, so the type should say so rather than forcing a copy at the call
   site. */
export type BeatData = {
  readonly key: string;
  /** The hour this happens, set enormous and outlined. */
  readonly time: string;
  readonly title: readonly string[];
  readonly line: string;
  readonly note: string;
  readonly slot: MediaSlot;
};

/**
 * ONE FULL SCREEN INSIDE THE REEL.
 *
 * The time is the loudest thing on it — outlined, 17vw — so the day reads as a
 * timeline you scrub with your thumb rather than a list of activities. Every
 * title is a line somebody would actually say ("GET IN.") rather than a thing
 * to do ("Snorkelling"), which is the rule the Sri Lanka beats follow and the
 * reason they do not read as an itinerary.
 *
 * The footage inside drifts the opposite way to the reel, so the panels feel
 * like windows being passed rather than cards being dealt.
 */
export function Beat({
  b,
  i,
  n,
  p,
  tone,
  ink,
  tint,
  register = "festival",
}: {
  b: BeatData;
  i: number;
  n: number;
  p: MotionValue<number>;
  tone: string;
  ink: string;
  tint: string;
  register?: "island" | "festival";
}) {
  const calm = useCalm();
  const drift = useTransform(
    p,
    [Math.max(0, (i - 1) / Math.max(1, n - 1)), Math.min(1, (i + 1) / Math.max(1, n - 1))],
    ["10%", "-10%"]
  );

  return (
    <article
      className="relative h-[100svh] w-screen shrink-0 snap-start overflow-hidden"
      aria-label={`${b.time} — ${b.title.join(" ")}`}
    >
      <motion.div className="absolute inset-y-0 -inset-x-[12%]" style={calm ? undefined : { x: drift }}>
        <Footage slot={b.slot} sizes="100vw" mounted />
      </motion.div>
      <div className="absolute inset-0" style={{ background: tint }} />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 pt-28 sm:px-10 sm:pb-24 lg:px-16">
        <span
          aria-hidden
          className="font-display text-[clamp(4.5rem,17vw,14rem)] leading-[0.8] tabular-nums"
          style={{ WebkitTextStroke: `1.5px ${tone}`, color: "transparent" }}
        >
          {b.time}
        </span>
        <h3
          className={`mt-3 leading-[0.88] ${
            register === "festival"
              ? "font-display text-[clamp(2.6rem,8vw,7rem)] uppercase tracking-[-0.01em]"
              : "font-serif text-[clamp(2.4rem,7vw,6rem)] italic tracking-[-0.02em]"
          }`}
          style={{ color: ink }}
        >
          {b.title.map((t) => (
            <span key={t} className="block">
              {t}
            </span>
          ))}
        </h3>
        <p
          className={
            register === "festival"
              ? "mt-4 text-[clamp(0.8rem,2.1vw,1.05rem)] font-semibold uppercase tracked"
              : "mt-4 font-serif text-[clamp(1.3rem,3.2vw,2.1rem)] italic"
          }
          style={{ color: tone }}
        >
          {b.line}
        </p>
        <p className="mt-3 max-w-[42ch] text-[0.98rem] leading-[1.55]" style={{ color: `${ink}b3` }}>
          {b.note}
        </p>
      </div>
    </article>
  );
}

/** The reel's own clock, pinned over the track: the hours, and how far in you are. */
export function ReelClock({ beats, p, tone, ink }: { beats: readonly BeatData[]; p: MotionValue<number>; tone: string; ink: string }) {
  const w = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute inset-x-5 bottom-[84px] z-20 sm:inset-x-10 sm:bottom-8 lg:inset-x-16">
      <div className="flex justify-between text-[9px] font-semibold tracked" style={{ color: `${ink}99` }}>
        {beats.map((b) => (
          <span key={b.key}>{b.time}</span>
        ))}
      </div>
      <div className="relative mt-2 h-px bg-white/20">
        <motion.div className="absolute inset-y-0 left-0" style={{ width: w, background: tone }} />
      </div>
    </div>
  );
}
