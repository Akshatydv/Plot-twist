"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { rituals, type World } from "@/content/chaos";
import { useCalm } from "../bir/Scenery";

/**
 * THE RITUALS — one per world that has no reel.
 *
 * Sri Lanka gives every chapter something only that chapter does: a light ramp,
 * a scrubbed countdown, a floating sunset, a press-and-hold secret. Bir does
 * the same — scroll IS the flight, the bonfire lights element by element, you
 * tap a card and it burns. Without them a page is seven photographs with
 * captions, however good the photographs are.
 *
 * ─── THE RULE EACH ONE FOLLOWS ──────────────────────────────────────────────
 * It has to be the thing that day actually IS, not an effect borrowed from
 * somewhere else. The route draws because day one is the only day about
 * movement. The clock empties because day three is the only day with nothing
 * in it. The chat fills because the night before a festival genuinely happens
 * in a group chat. The sun rises because that is the only time on the trip the
 * light comes back. The recap runs because it is the only chapter looking
 * backwards.
 *
 * ─── COST ───────────────────────────────────────────────────────────────────
 * All five are scroll-driven transform and opacity only, on a handful of
 * elements each. No canvas, no blur on full-screen layers, nothing animating
 * on a timer. Under reduced motion every one of them renders as a plain static
 * list — the information is never inside the animation.
 */

/* A shared frame so the five sit in their world rather than on top of it. */
function Stage({
  world,
  label,
  children,
  className = "",
}: {
  world: World;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 ${className}`}
      style={{ background: world.ground, color: world.ink }}
      aria-label={label}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked" style={{ color: world.accent }}>
          {label}
        </p>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — THE ROUTE                                                      */
/* ------------------------------------------------------------------ */

/**
 * The road draws itself as you scroll and each stop lights when the line
 * reaches it. Day one is the only day of this trip that is genuinely about
 * movement — you land in one province and sleep in another — so it is the only
 * one that gets a map.
 */
export function RouteRitual({ world }: { world: World }) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const draw = useTransform(p, [0, 0.9], [0, 1]);
  const r = rituals.route;

  return (
    <Stage world={world} label={r.label}>
      <div ref={ref} className="mt-10">
        {/* the line */}
        <div className="relative">
          <svg className="h-[3px] w-full" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden>
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke={`${world.ink}26`} strokeWidth="1" />
            <motion.line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke={world.accent}
              strokeWidth="1"
              pathLength={1}
              style={{ pathLength: calm ? 1 : draw }}
            />
          </svg>
        </div>

        <ol className="mt-0 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {r.stops.map((s, i) => {
            const at = (i + 0.5) / r.stops.length;
            return <Stop key={s.k} s={s} at={at} p={draw} world={world} calm={calm} />;
          })}
        </ol>
      </div>
    </Stage>
  );
}

function Stop({
  s,
  at,
  p,
  world,
  calm,
}: {
  s: { k: string; v: string; t: string };
  at: number;
  p: MotionValue<number>;
  world: World;
  calm: boolean;
}) {
  const on = useTransform(p, [at - 0.12, at], [0, 1]);
  return (
    <li className="relative pt-7">
      <motion.span
        aria-hidden
        className="absolute -top-[7px] left-0 block h-[11px] w-[11px] rounded-full"
        style={{ background: world.accent, opacity: calm ? 1 : on }}
      />
      <motion.div style={{ opacity: calm ? 1 : on }}>
        <p className="text-[9px] tracked" style={{ color: `${world.ink}80` }}>
          {s.t}
        </p>
        <p className="mt-2 font-display text-[clamp(1.2rem,3.4vw,1.8rem)] uppercase">{s.k}</p>
        <p className="mt-2 max-w-[30ch] text-[0.95rem] leading-[1.5]" style={{ color: `${world.ink}b3` }}>
          {s.v}
        </p>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — THE EMPTY HOURS                                                */
/* ------------------------------------------------------------------ */

/**
 * The hour hand keeps moving and the plan keeps getting shorter. Day three is
 * the only day on this trip with nothing scheduled, and the joke only works if
 * the page is willing to spend a whole screen saying so.
 */
export function EmptyHoursRitual({ world }: { world: World }) {
  const r = rituals.emptyHours;
  return (
    <Stage world={world} label={r.label}>
      <ol className="mt-10 border-t" style={{ borderColor: `${world.ink}1f` }}>
        {r.hours.map((h, i) => (
          <motion.li
            key={h.t}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b py-5"
            style={{ borderColor: `${world.ink}1f` }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          >
            <span className="font-display text-[clamp(1.4rem,4vw,2.2rem)] tabular-nums" style={{ color: world.accent }}>
              {h.t}
            </span>
            <span className="text-[clamp(0.98rem,2.4vw,1.1rem)]">{h.v}</span>
          </motion.li>
        ))}
      </ol>
      <p className="mt-8 max-w-[44ch] font-serif text-[clamp(1.1rem,3vw,1.5rem)] italic" style={{ color: `${world.ink}b3` }}>
        {r.close}
      </p>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — THE GROUP CHAT                                                 */
/* ------------------------------------------------------------------ */

/**
 * The night before a festival happens in a group chat, so that is what this
 * screen is. Messages land one at a time as it comes into view.
 *
 * Nobody in it is named. The twenty are not picked yet, so inventing
 * participants would be inventing people — they are "someone" and "you", which
 * is also how a chat you have not joined yet actually reads.
 */
export function GroupChatRitual({ world }: { world: World }) {
  const r = rituals.groupChat;
  return (
    <Stage world={world} label={r.label}>
      <ul className="mt-10 flex max-w-[34rem] flex-col gap-2.5">
        {r.messages.map((m, i) => {
          const mine = m.who === "you";
          return (
            <motion.li
              key={`${m.who}-${m.text}`}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.45, delay: i * 0.16 }}
            >
              <span
                className="max-w-[82%] px-4 py-2.5 text-[0.95rem] leading-[1.4]"
                style={
                  mine
                    ? { background: world.accent, color: "#0b0612", borderRadius: "14px 14px 3px 14px" }
                    : { background: `${world.ink}14`, color: world.ink, borderRadius: "14px 14px 14px 3px" }
                }
              >
                {m.text}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — THE SUNRISE                                                    */
/* ------------------------------------------------------------------ */

/**
 * A sun that actually rises as you scroll, and the only screen on the page
 * that gets BRIGHTER the further down you go. Everything from the threshold
 * onwards has been getting darker; this is where that reverses, which is the
 * whole emotional move of World 06.
 */
export function SunriseRitual({ world }: { world: World }) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sunY = useTransform(p, [0.1, 0.9], ["86%", "26%"]);
  const glow = useTransform(p, [0.1, 0.9], [0.25, 0.9]);
  const sky = useTransform(p, [0.1, 0.6, 1], ["#140C14", "#3A2230", "#6B4336"]);
  const r = rituals.sunrise;

  return (
    <div ref={ref} className="relative">
      <motion.section
        className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-28 lg:px-14"
        style={{ background: calm ? world.ground : sky, color: world.ink }}
        aria-label={r.label}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 rounded-full"
          style={{
            top: calm ? "40%" : sunY,
            opacity: calm ? 0.7 : glow,
            background: `radial-gradient(circle, #FFD9A8 0%, ${world.accent} 44%, rgba(232,180,138,0) 72%)`,
          }}
        />
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1180px]">
          <p className="text-[10px] tracked" style={{ color: world.accent }}>
            {r.label}
          </p>
          <ol className="mt-10 max-w-[32rem]">
            {r.beats.map((b, i) => (
              <motion.li
                key={b.t}
                className="border-b py-5"
                style={{ borderColor: `${world.ink}1f` }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, delay: i * 0.14 }}
              >
                <span className="text-[9px] tracked" style={{ color: `${world.ink}80` }}>
                  {b.t}
                </span>
                <p className="mt-2 font-serif text-[clamp(1.2rem,3.6vw,1.9rem)] italic">{b.v}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — THE RECAP                                                      */
/* ------------------------------------------------------------------ */

/**
 * Ten words, scrubbed by scroll, fast — then it stops and the last line sits
 * on black. Bir ends the same way and for the same reason: a montage is what
 * turns seven separate days into one week you have already had.
 *
 * Scroll-scrubbed rather than timed, so it runs at the reader's pace and can
 * be run backwards — which is also what stops it being a splash screen.
 */
export function RecapRitual({ world }: { world: World }) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const r = rituals.recap;

  if (calm) {
    return (
      <Stage world={world} label={r.label}>
        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {r.words.map((w) => (
            <li key={w} className="font-display text-[clamp(1.4rem,5vw,2.6rem)] uppercase">
              {w}
            </li>
          ))}
        </ol>
        <p className="mt-10 font-serif text-[clamp(1.3rem,4vw,2.2rem)] italic">{r.close}</p>
      </Stage>
    );
  }

  return (
    <section ref={ref} className="relative h-[320svh]" aria-label={`${r.label}. ${r.close}`} style={{ background: world.ground }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <p className="absolute left-5 top-6 text-[10px] tracked sm:left-8" style={{ color: world.accent }}>
          {r.label}
        </p>
        {r.words.map((w, i) => (
          <RecapWord key={w} word={w} i={i} n={r.words.length} p={p} ink={world.ink} />
        ))}
        <Closer p={p} text={r.close} ink={world.ink} accent={world.accent} />
      </div>
    </section>
  );
}

/** One word, alive for a tenth of the scroll and gone. */
function RecapWord({
  word,
  i,
  n,
  p,
  ink,
}: {
  word: string;
  i: number;
  n: number;
  p: MotionValue<number>;
  ink: string;
}) {
  /* The words share the first 72% of the sequence; the last 28% is the line. */
  const span = 0.72 / n;
  const a = i * span;
  const opacity = useTransform(p, [a, a + span * 0.18, a + span * 0.8, a + span], [0, 1, 1, 0]);
  const scale = useTransform(p, [a, a + span], [0.94, 1.06]);
  return (
    <motion.span
      aria-hidden
      className="absolute px-5 text-center font-display text-[clamp(2.6rem,13vw,9rem)] uppercase leading-[0.9]"
      style={{ opacity, scale, color: ink }}
    >
      {word}
    </motion.span>
  );
}

function Closer({ p, text, ink, accent }: { p: MotionValue<number>; text: string; ink: string; accent: string }) {
  const opacity = useTransform(p, [0.76, 0.86], [0, 1]);
  const y = useTransform(p, [0.76, 1], [18, 0]);
  return (
    <motion.p
      className="absolute mx-auto max-w-[22ch] px-5 text-center font-serif text-[clamp(1.5rem,5.4vw,3.2rem)] italic leading-[1.1]"
      style={{ opacity, y, color: ink, textShadow: `0 0 40px ${accent}55` }}
    >
      {text}
    </motion.p>
  );
}
