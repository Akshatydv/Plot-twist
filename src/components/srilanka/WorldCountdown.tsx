"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { world3 } from "@/content/srilanka";
import { Focus, Footage, FrameStack, MaskLines, useCalm } from "../bir/Scenery";
import { Burst, Tag, WorldCard } from "./Kit";

/**
 * WORLD 03 — 31 DEC — THE COUNTDOWN. The centre of the film.
 *
 *   the card       → the Ella Gap, last look at the mountains
 *   the light ramp → ONE pinned frame for the whole evening. Ten stages, ten
 *                    photographs, a clock that RUNS (it interpolates minute
 *                    by minute between the stages, it doesn't jump), and a
 *                    wash that gets darker and hotter the further you go.
 *                    Ends on MIDNIGHT.
 *   the party      → MIDNIGHT IN PARADISE — the night's running order,
 *                    escalating in size until 2027 is the biggest type on the page
 *   the countdown  → 23:59:50 → 00:00:00, one second per slice of scroll,
 *                    then the fireworks footage, a canvas burst, and 2027.
 *
 * The page gets darker and more electric the whole way down this chapter on
 * purpose. The next world is the only light-ground chapter, so the contrast
 * lands as a hangover should.
 */
export function WorldCountdown() {
  return (
    <div id={world3.id} data-world={world3.id} className="relative bg-[#07090a]">
      <WorldCard n={world3.n} date={world3.date} name={world3.name} place={world3.place} lines={world3.lines} slot={world3.slot} tone={world3.tone} />
      <LightRamp />
      <Party />
      <Countdown />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* the light ramp                                                      */
/* ------------------------------------------------------------------ */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (mins: number) => {
  const h = Math.floor(mins / 60) % 24;
  const m = Math.floor(mins % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

function LightRamp() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const R = world3.ramp;
  const n = R.length;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [stage, setStage] = useState(0);
  const [clock, setClock] = useState<string>(R[0].at);
  const [midnight, setMidnight] = useState(false);

  useMotionValueEvent(p, "change", (v) => {
    // the last 8% of the scroll is MIDNIGHT itself
    const t = Math.min(0.9999, v / 0.92);
    const f = t * n;
    const i = Math.min(n - 1, Math.floor(f));
    setStage((c) => (c === i ? c : i));
    const from = toMin(R[i].at);
    const to = i < n - 1 ? toMin(R[i + 1].at) : toMin("23:59");
    const next = fmt(from + (to - from) * (f - i));
    setClock((c) => (c === next ? c : next));
    setMidnight(v > 0.93);
  });

  // darker and hotter as the evening goes
  const wash = useTransform(p, [0, 0.3, 0.55, 0.92], [0.15, 0.3, 0.5, 0.62]);
  const heat = useTransform(p, [0.3, 0.6, 0.92], [0, 0.35, 0.55]);

  if (reduce) {
    return (
      <section className="px-5 py-20 sm:px-8 lg:px-14">
        <ol className="space-y-6">
          {R.map((s) => (
            <li key={s.word}>
              <span className="font-display text-[2rem] text-[var(--sl-hibiscus)]">{s.at}</span> <span className="font-serif text-[2rem]">{s.word}</span>
              <p className="text-white/70">{s.line}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 font-display text-[4rem]">{world3.midnightWord}</p>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="New Year's Eve, from the last breakfast in the hills to midnight on the beach" className="relative" style={{ height: `${n * 75 + 60}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#07090a]">
        <FrameStack frames={R.map((s) => s.slot)} active={stage} />
        <motion.div className="absolute inset-0 bg-[#07050d]" style={{ opacity: wash }} />
        <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ opacity: heat, background: "radial-gradient(80% 70% at 50% 100%, #ff4f6d 0%, #2a1640 70%)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* the clock */}
        <div className="absolute left-5 top-20 z-10 sm:left-8 sm:top-24 lg:left-14">
          <Tag color="#FF4F6D">31 DEC · THE LAST DAY OF THE YEAR</Tag>
          <span className="mt-3 block font-display text-[clamp(4.6rem,18vw,14rem)] leading-[0.82] tabular-nums text-[var(--sl-bone)]">{midnight ? "23:59" : clock}</span>
        </div>

        {/* the stage timeline down the right edge */}
        <ol aria-hidden className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 space-y-2 text-right sm:block lg:right-14">
          {R.map((s, i) => (
            <li key={s.word} className="text-[10px] font-semibold tracked transition-all duration-500" style={{ color: i === stage ? "#FF4F6D" : i < stage ? "rgba(244,237,225,0.55)" : "rgba(244,237,225,0.2)" }}>
              {s.word} <span className="ml-2 font-display tabular-nums">{s.at}</span>
            </li>
          ))}
        </ol>

        {/* the word, and its line */}
        <div className="absolute inset-x-5 bottom-14 z-10 sm:inset-x-8 sm:bottom-16 lg:inset-x-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={midnight ? "midnight" : stage}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {midnight ? (
                <span className="block font-display text-[clamp(4.4rem,19vw,16rem)] leading-[0.82] text-[var(--sl-hibiscus)]">{world3.midnightWord}</span>
              ) : (
                <>
                  <span className="block font-serif text-[clamp(3.4rem,12vw,10rem)] leading-[0.86] tracking-[-0.02em] text-[var(--sl-bone)]">{R[stage].word}</span>
                  <span className="mt-3 block max-w-[30ch] font-serif text-[clamp(1.25rem,3.2vw,2.2rem)] italic leading-[1.15] text-[var(--sl-bone)]/80">{R[stage].line}</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* a thin progress line, the evening running out */}
        <motion.div className="absolute bottom-0 left-0 z-10 h-[3px] origin-left bg-[var(--sl-hibiscus)]" style={{ width: "100%", scaleX: p }} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* midnight in paradise                                                */
/* ------------------------------------------------------------------ */

function Party() {
  const P = world3.party;
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14" style={{ background: "radial-gradient(120% 80% at 50% 0%, #2a1640 0%, #07090a 70%)" }}>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Tag color="#FF4F6D">{P.kicker}</Tag>
          <MaskLines lines={P.title} className="mt-6 font-serif text-[clamp(3.6rem,12vw,10rem)] leading-[0.84] tracking-[-0.03em] text-[var(--sl-bone)]" />
          <Focus delay={0.3}>
            <p className="mt-8 max-w-[44ch] text-[clamp(1.02rem,2.2vw,1.2rem)] leading-[1.6] text-[var(--sl-bone)]/75">{P.body}</p>
          </Focus>
        </div>

        {/* the programme — each line bigger than the last */}
        <ol className="flex flex-col items-start lg:items-end">
          {P.programme.map((item, i) => {
            const isTime = /\d/.test(item);
            const size = ["1.6rem", "1.9rem", "2.3rem", "3.4rem", "4.6rem", "7.5rem"][i];
            return (
              <motion.li
                key={item}
                className="flex flex-col items-start lg:items-end"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`${isTime ? "font-display tabular-nums" : "font-semibold tracked"} leading-none`}
                  style={{ fontSize: `clamp(${isTime ? "2rem" : "1rem"}, ${i * 1.4 + 3}vw, ${size})`, color: i === P.programme.length - 1 ? "#FF4F6D" : "#F4EDE1" }}
                >
                  {item}
                </span>
                {i < P.programme.length - 1 && (
                  <span aria-hidden className="my-2 text-[1.1rem] text-white/30">
                    ↓
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the countdown                                                       */
/* ------------------------------------------------------------------ */

/**
 * Scroll IS the countdown. Four lines arrive, then ten seconds tick off one
 * per slice of scroll — 23:59:50 down to 00:00:00 — and on zero the frame
 * cuts to fireworks, the canvas fires, and 2027 slams in. Scrolling back up
 * un-happens it, which people will do, which is the point.
 */
function Countdown() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const C = world3.countdown;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [lead, setLead] = useState(0);
  const [sec, setSec] = useState(10);
  const [fired, setFired] = useState(false);

  useMotionValueEvent(p, "change", (v) => {
    const l = Math.min(4, Math.floor((v / 0.32) * 4));
    setLead((c) => (c === l ? c : l));
    const s = v < 0.34 ? 10 : Math.max(0, 10 - Math.floor(((v - 0.34) / 0.36) * 11));
    setSec((c) => (c === s ? c : s));
    const f = v >= 0.7;
    setFired((c) => (c === f ? c : f));
  });

  const ring = useTransform(p, [0.34, 0.7], [0, 1]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
        <Footage slot={C.slot} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative">
          {C.lead.map((l) => (
            <p key={l} className="font-serif text-[1.8rem] italic">
              {l}
            </p>
          ))}
          <p className="mt-6 font-display text-[8rem] leading-none text-[var(--sl-hibiscus)]">{C.year}</p>
          <p className="mt-4 text-white/80">{C.after}</p>
        </div>
      </section>
    );
  }

  const time = sec === 0 ? "00:00:00" : `23:59:${String(60 - sec).padStart(2, "0")}`;

  return (
    <section ref={ref} aria-label={`${C.lead.join(" ")} ${C.year}. ${C.after}`} className="relative h-[420svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-[#050407]">
        {/* the payoff, waiting */}
        <motion.div className="absolute inset-0" initial={false} animate={{ opacity: fired ? 1 : 0 }} transition={{ duration: 0.25 }}>
          <Footage slot={C.slot} eager={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
        </motion.div>
        <Burst fire={fired} />
        <div className="grain pointer-events-none absolute inset-0" />

        <AnimatePresence mode="wait">
          {!fired ? (
            <motion.div key="count" className="relative z-10 flex flex-col items-center px-5 text-center" exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.25 }}>
              {/* the four lines, stacking */}
              <div className="min-h-[9.5rem] sm:min-h-[12rem]">
                {C.lead.map((l, i) => (
                  <motion.p
                    key={l}
                    className={`font-serif italic leading-[1.1] ${i === 3 ? "mt-2 text-[clamp(1.7rem,4.8vw,3.4rem)] text-[var(--sl-bone)]" : "text-[clamp(1.4rem,3.6vw,2.5rem)] text-[var(--sl-bone)]/70"}`}
                    initial={false}
                    animate={{ opacity: i < lead ? 1 : 0, y: i < lead ? 0 : 14, filter: i < lead ? "blur(0px)" : "blur(6px)" }}
                    transition={{ duration: 0.5 }}
                  >
                    {l}
                  </motion.p>
                ))}
              </div>

              {/* the clock and its ring */}
              <div className="relative mt-10 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="absolute h-[min(78vw,26rem)] w-[min(78vw,26rem)] -rotate-90" aria-hidden>
                  <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <motion.circle cx="100" cy="100" r="94" fill="none" stroke="#FF4F6D" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: ring }} />
                </svg>
                <div className="flex h-[min(78vw,26rem)] w-[min(78vw,26rem)] flex-col items-center justify-center">
                  <span className="font-display text-[clamp(2.6rem,11vw,6.2rem)] leading-none tabular-nums text-[var(--sl-bone)]">{time}</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={sec}
                      className="mt-2 font-display text-[clamp(3.4rem,14vw,7rem)] leading-none tabular-nums text-[var(--sl-hibiscus)]"
                      initial={{ opacity: 0, scale: 1.6 }}
                      animate={{ opacity: sec < 10 ? 1 : 0.25, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {sec}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="year" className="relative z-10 px-5 text-center" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 160, damping: 14 }}>
              <span className="block font-display text-[clamp(7rem,36vw,30rem)] leading-[0.8] tracking-[-0.02em] text-[var(--sl-bone)] [text-shadow:0_0_60px_rgba(255,79,109,0.55)]">{C.year}</span>
              <motion.span className="mt-6 block font-serif text-[clamp(1.4rem,3.6vw,2.6rem)] italic text-[var(--sl-bone)]/90" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
                {C.after}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

