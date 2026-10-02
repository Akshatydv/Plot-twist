"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { secret, world7 } from "@/content/srilanka";
import { PLOT_EVENTS } from "@/lib/analytics";
import { PlotButton } from "../Bits";
import { Logo } from "../Logo";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";
import { Tag } from "./Kit";

/**
 * WORLD 07 — 4 JAN — THE END?
 *
 * Not a checkout page: the end of a film. The whole trip rolls past as fast
 * as a camera roll on the flight home — one word, one frame, a strip of
 * film counting along the bottom — and then the screen goes to the closing
 * line over a surfer walking out of the sea, the sign-off, and the button.
 */
export function WorldEnd() {
  return (
    <div id={world7.id} data-world={world7.id} className="relative bg-[#07090a]">
      <Roll />
      <Close />
    </div>
  );
}

function Roll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const R = world7.roll;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(R.length - 1, Math.max(0, Math.floor(v * R.length)));
    setI((c) => (c === k ? c : k));
  });

  if (reduce) {
    return (
      <section className="px-5 py-20 sm:px-8 lg:px-14">
        <p className="font-serif text-[clamp(2rem,6vw,4rem)] leading-[1.05]">{R.map((f) => f.word).join(" ")}</p>
      </section>
    );
  }

  const f = R[i];
  return (
    <section ref={ref} aria-label={`The trip, again: ${R.map((x) => x.word).join(" ")}`} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-black">
        <p className="absolute left-5 top-20 z-10 flex items-center gap-3 text-[11px] font-semibold tracked text-[var(--sl-bone)]/70 sm:left-8 lg:left-14">
          <span className="font-display text-[15px] tracking-normal">{world7.n} / 07</span>
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {world7.date} · {world7.name}
        </p>
        <motion.div key={f.image} className="absolute inset-0" initial={{ opacity: 0.35, scale: 1.1 }} animate={{ opacity: 1, scale: 1.02 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <Image src={f.image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
        <div className="grain pointer-events-none absolute inset-0" />
        <AnimatePresence mode="popLayout">
          <motion.p
            key={i}
            className="relative px-5 text-center font-serif text-[clamp(3.2rem,14vw,12rem)] leading-none tracking-[-0.03em] text-[var(--sl-bone)]"
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {f.word}
          </motion.p>
        </AnimatePresence>
        {/* the film strip */}
        <div className="absolute inset-x-5 bottom-8 flex gap-1 sm:inset-x-8 lg:inset-x-14">
          {R.map((x, k) => (
            <span key={x.word} className="relative h-7 flex-1 overflow-hidden border border-white/40 transition-opacity duration-300" style={{ opacity: k <= i ? 1 : 0.25 }}>
              <Image src={x.image} alt="" fill sizes="80px" className="object-cover" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-28 sm:px-8 lg:px-14">
      <Footage slot={world7.slot} drift />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <MaskLines lines={world7.close} className="font-serif text-[clamp(2.4rem,7.6vw,6.8rem)] leading-[0.94] tracking-[-0.02em] text-[var(--sl-bone)]" />
        <Focus delay={0.6}>
          <div className="mt-14 flex flex-wrap items-end gap-x-6 gap-y-3">
            <span className="text-[clamp(1.4rem,3.6vw,2.4rem)]"><Logo /></span>
            <span className="font-hand text-[1.8rem] leading-none text-[var(--sl-saffron)]">{world7.signoff}</span>
          </div>
        </Focus>
        <Focus delay={0.9}>
          <div className="mt-12">
            <PlotButton href={world7.cta.href} bg="#F2A23A" fg="#07090a" shadow="#F4EDE1" event={PLOT_EVENTS.requestInvite}>
              {world7.cta.label}
            </PlotButton>
          </div>
        </Focus>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the post-credits scene                                              */
/* ------------------------------------------------------------------ */

/**
 * THERE'S ONE MORE PLOT TWIST — sat after the credits, where the stingers go.
 *
 * A frame behind frosted glass that you can try to peek through: press and
 * hold, a ring fills, and at the top the lock shivers and says no. Every
 * attempt gets a different refusal. The footage behind is blurred past
 * recognition on purpose — it's texture, not a clue, because nothing about
 * the secret is decided enough to hint at.
 */
export function Secret() {
  const reduce = useCalm();
  const [holding, setHolding] = useState(false);
  const [tries, setTries] = useState(0);
  const [shake, setShake] = useState(false);
  const timer = useRef<number | null>(null);

  const release = () => {
    setHolding(false);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const press = () => {
    setHolding(true);
    timer.current = window.setTimeout(() => {
      setTries((t) => t + 1);
      setShake(true);
      setHolding(false);
    }, reduce ? 10 : 1200);
  };
  useEffect(() => {
    if (!shake) return;
    const id = window.setTimeout(() => setShake(false), 460);
    return () => window.clearTimeout(id);
  }, [shake]);
  useEffect(() => () => release(), []);

  const denied = tries > 0 ? secret.denied[(tries - 1) % secret.denied.length] : null;

  return (
    <section id="secret" className="relative overflow-hidden bg-[#050506] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Tag color="#FF4F6D">{secret.kicker}</Tag>
          <MaskLines lines={[secret.title]} className="mt-6 font-display text-[clamp(2.8rem,8vw,6.4rem)] uppercase leading-[0.9] text-[var(--sl-bone)]" />
          {secret.body.map((l, i) => (
            <Focus key={l} delay={0.25 + i * 0.25}>
              <p className={`mt-4 font-serif text-[clamp(1.35rem,3.2vw,2.1rem)] italic leading-[1.15] ${i === 1 ? "text-[var(--sl-hibiscus)]" : "text-[var(--sl-bone)]/85"}`}>{l}</p>
            </Focus>
          ))}
        </div>

        <div className={`relative aspect-[4/5] w-full overflow-hidden border border-white/10 sm:aspect-[5/4] ${shake ? "sl-shake" : ""}`}>
          <div className="absolute inset-0 scale-125 blur-[28px] saturate-150">
            <Footage slot={secret.slot} />
          </div>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
            <button
              type="button"
              onPointerDown={press}
              onPointerUp={release}
              onPointerLeave={release}
              onPointerCancel={release}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !holding && press()}
              onKeyUp={release}
              onContextMenu={(e) => e.preventDefault()}
              aria-label={`${secret.hold}. ${secret.lock}.`}
              className="relative flex h-28 w-28 touch-manipulation select-none items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-sm"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="#FF4F6D"
                  strokeWidth="3"
                  initial={false}
                  animate={{ pathLength: holding ? 1 : 0 }}
                  transition={{ duration: holding ? 1.2 : 0.3, ease: "linear" }}
                />
              </svg>
              {/* the lock */}
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-[var(--sl-bone)]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="5" y="11" width="14" height="9" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </button>
            <span className="text-[10px] font-semibold tracked text-[var(--sl-bone)]/80">{secret.hold}</span>
            <span className="border border-[var(--sl-hibiscus)] px-3 py-1.5 text-[11px] font-semibold tracked text-[var(--sl-hibiscus)]">{secret.lock}</span>
            <AnimatePresence mode="wait">
              {denied && (
                <motion.span
                  key={tries}
                  role="status"
                  className="font-hand text-[1.6rem] leading-none text-[var(--sl-bone)]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {denied}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
