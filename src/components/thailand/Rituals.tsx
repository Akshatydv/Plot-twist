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
 * It has to be the thing that day actually IS. Two days are a ROUTE, so they
 * draw one. The Krabi day is deliberately unscheduled, so its device is a list
 * of options with air around it rather than a timetable. The first festival day
 * is really about the hours before the gates, so it is a group chat. The last
 * night is a choice between six stages. The morning is the sun coming up.
 *
 * ─── COST ───────────────────────────────────────────────────────────────────
 * Scroll-driven transform and opacity only, on a handful of elements each. No
 * canvas, no blur on full-screen layers, nothing on a timer. Under reduced
 * motion every one renders as a plain static list — the information is never
 * inside the animation.
 */

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
/* 01 and 05 — THE ROUTES                                              */
/* ------------------------------------------------------------------ */

type Stop = { readonly k: string; readonly v: string; readonly t: string };

/**
 * The line draws as you scroll and each stop lights when it reaches them.
 *
 * ONE COMPONENT, TWO DAYS — day 01 (Phuket → Krabi → Railay) and day 05 (Kata →
 * Old Town → Karon Viewpoint). They are the only two days where the point is
 * that you moved; everywhere else is a place you stayed in. Sharing the device
 * between exactly those two is what makes it mean "today is a journey" instead
 * of being decoration.
 */
export function RouteRitual({ world, which }: { world: World; which: "begins" | "phuket" }) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const draw = useTransform(p, [0, 0.9], [0, 1]);
  const r = rituals.routes[which];

  return (
    <Stage world={world} label={r.label}>
      <div ref={ref} className="mt-10">
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

        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {r.stops.map((s: Stop, i: number) => (
            <StopItem key={s.k} s={s} at={(i + 0.5) / r.stops.length} p={draw} world={world} calm={calm} />
          ))}
        </ol>
      </div>
    </Stage>
  );
}

function StopItem({
  s,
  at,
  p,
  world,
  calm,
}: {
  s: Stop;
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
/* 03 — THE DAY, LOOSELY                                               */
/* ------------------------------------------------------------------ */

/**
 * The Krabi day, written as OPTIONS rather than a schedule.
 *
 * The brief for this day is explicitly "do not make it feel like we are
 * cramming attractions in" — so the device is a list with air around it and a
 * line underneath saying so. A timetable here would contradict the day.
 */
export function LooselyRitual({ world }: { world: World }) {
  const r = rituals.loosely;
  return (
    <Stage world={world} label={r.label}>
      <p className="mt-6 max-w-[46ch] text-[clamp(1rem,2.4vw,1.14rem)]" style={{ color: `${world.ink}b3` }}>
        {r.note}
      </p>
      <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {r.options.map((o: string, i: number) => (
          <motion.li
            key={o}
            className="flex gap-4 border-t pt-4 text-[clamp(0.98rem,2.3vw,1.08rem)] leading-[1.45]"
            style={{ borderColor: `${world.ink}1f` }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <span style={{ color: world.accent }}>—</span>
            {o}
          </motion.li>
        ))}
      </ul>
      <p className="mt-10 max-w-[40ch] font-serif text-[clamp(1.3rem,3.6vw,2rem)] italic">{r.close}</p>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — THE GROUP CHAT                                                 */
/* ------------------------------------------------------------------ */

/**
 * The hours before the first festival night happen in a group chat, so that is
 * what this screen is. Nobody is named: the sixteen are not picked yet, so
 * inventing participants would be inventing people. "someone" and "you" is also
 * how a chat you have not joined yet actually reads.
 */
export function GroupChatRitual({ world }: { world: World }) {
  const r = rituals.groupChat;
  return (
    <Stage world={world} label={r.label}>
      <ul className="mt-10 flex max-w-[34rem] flex-col gap-2.5">
        {r.messages.map((m: { who: string; text: string }, i: number) => {
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
/* 06 — THE SIX STAGES                                                 */
/* ------------------------------------------------------------------ */

/**
 * On the last night, the six stages stop being a feature and become a problem:
 * you cannot see all of them and this is the final chance. The only list in the
 * week that is a genuine choice rather than a plan.
 */
export function StagesRitual({ world }: { world: World }) {
  const r = rituals.stages;
  return (
    <Stage world={world} label={r.label}>
      <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-3">
        {r.names.map((n: string, i: number) => (
          <motion.div
            key={n}
            className="border-t pt-4"
            style={{ borderColor: world.accent }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
          >
            <span className="font-display text-[clamp(1.1rem,3.2vw,1.6rem)] uppercase">{n}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-9 text-[11px] leading-[1.6]" style={{ color: `${world.ink}80` }}>
        {r.note}
      </p>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — THE SUNRISE                                                    */
/* ------------------------------------------------------------------ */

/**
 * A sun that rises as you scroll, and the only screen on the page that gets
 * BRIGHTER the further down you go. Everything since the gates has been getting
 * darker; this is where that reverses.
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
            {r.beats.map((b: { t: string; v: string }, i: number) => (
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
/* THE RECAP — the week, not a day                                     */
/* ------------------------------------------------------------------ */

/**
 * Ten words scrubbed by scroll, fast, then it stops on the last line.
 *
 * It mounts AFTER world 07 rather than inside it, because a montage belongs to
 * the trip and not to a morning. Scroll-scrubbed rather than timed, so it runs
 * at the reader's pace and can be run backwards — which is also what stops it
 * being a splash screen.
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
          {r.words.map((w: string) => (
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
    <section
      ref={ref}
      className="relative h-[320svh]"
      aria-label={`${r.label}. ${r.close}`}
      style={{ background: world.ground }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <p className="absolute left-5 top-6 text-[10px] tracked sm:left-8" style={{ color: world.accent }}>
          {r.label}
        </p>
        {r.words.map((w: string, i: number) => (
          <RecapWord key={w} word={w} i={i} n={r.words.length} p={p} ink={world.ink} />
        ))}
        <Closer p={p} text={r.close} ink={world.ink} accent={world.accent} />
      </div>
    </section>
  );
}

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
