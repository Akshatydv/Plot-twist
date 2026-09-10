"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { festival, gatesOpen, stickers } from "@/content/thailand";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Note, PlotButton } from "../Bits";
import { Reveal } from "../motion";
import { MarkerUnderline } from "../Brush";
import { CredChip, Haze, LaserSweep } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * GATES OPEN IN — the final beat.
 *
 * ─── THE COUNTDOWN IS REAL, AND THAT WAS A DECISION ─────────────────────────
 * It counts to `festival.gatesAt`, which is a VERIFIED date — Insomniac's own
 * press release puts the December edition of EDC Thailand at 18–20 December
 * 2026 in Phuket. So this is a real countdown to a real published date, not a
 * manufactured urgency device, and the source is linked from THE PASS.
 *
 * If that target is ever cleared, the component does NOT invent one. It falls
 * back to a live Phuket clock and a "GATES — TBA" label: still ticking, still
 * alive, still lying about nothing. That fallback is the whole reason the
 * target is nullable.
 *
 * ─── HYDRATION ──────────────────────────────────────────────────────────────
 * Time is not rendered on the server. The digits mount empty and fill on the
 * client, because a server-rendered clock is guaranteed to disagree with the
 * client one and React will complain about it — and because a countdown baked
 * into a statically generated page would be wrong the moment it was cached.
 *
 * ─── THE EMOTION ────────────────────────────────────────────────────────────
 * Deliberately not excitement. Excitement makes people bookmark a page; the
 * possibility of being left out makes them act. So the copy directly above
 * the button is about the twenty seats and the fact that a person decides —
 * the festival has already done its job by this point in the scroll.
 */

type Parts = { d: string; h: string; m: string; s: string } | null;

function partsUntil(targetIso: string | null): Parts {
  if (!targetIso) return null;
  const ms = new Date(targetIso).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  return {
    d: String(Math.floor(total / 86400)).padStart(2, "0"),
    h: String(Math.floor((total % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    s: String(total % 60).padStart(2, "0"),
  };
}

/** Local Phuket time — the fallback when there is no target to count to. */
function phuketClock() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function GatesOpen() {
  const reduce = useReducedMotion();
  const [parts, setParts] = useState<Parts>(null);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setParts(partsUntil(festival.gatesAt));
      setClock(phuketClock());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: { k: string; v: string }[] = parts
    ? [
        { k: "DAYS", v: parts.d },
        { k: "HRS", v: parts.h },
        { k: "MIN", v: parts.m },
        { k: "SEC", v: parts.s },
      ]
    : [];

  return (
    <section
      id="gates"
      className="relative overflow-hidden px-5 py-20 text-sand sm:px-8 sm:py-24 lg:px-14"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #12093a 0%, #170727 52%, #0a0414 100%)" }}
    >
      <LaserSweep className="left-[-22%] opacity-75" />
      <Haze className="left-1/2 top-0 h-[46vmin] w-[70vmin] -translate-x-1/2 opacity-50" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <Sticker className="right-[6%] top-[14%] hidden lg:block" rotate={9} color="#FF2E7E">
        {stickers.gates}
      </Sticker>

      <div className="relative mx-auto max-w-[1000px]">
        {/* ---------------- the clock ---------------- */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="edc-meta !text-[10px] !text-[var(--edc-hot)] !opacity-100">
              {parts ? gatesOpen.eyebrow : gatesOpen.tbaLabel}
            </span>
            <span className="h-px w-10 bg-[var(--edc-hot)]/40" />
            <span className="edc-meta">{festival.dates}</span>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-4 sm:gap-x-8">
          {units.length > 0 ? (
            units.map((u) => (
              <div key={u.k} className="min-w-[3.4em]">
                {/* One digit group per unit. The AnimatePresence swap is the
                    "flip" from the motion system — a translate, not a 3D card
                    rotation, which at this size would just read as noise. */}
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={u.v}
                      className="block font-display text-[clamp(2.8rem,13vw,6.5rem)] leading-[0.86] tracking-[-0.02em] text-sand edc-glow-max"
                      initial={reduce ? undefined : { y: "40%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={reduce ? undefined : { y: "-40%", opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {u.v}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="edc-meta mt-1 block !text-[9px]">{u.k}</span>
              </div>
            ))
          ) : (
            /* No target, or the gates already opened. A live local clock —
               honest, and still alive. */
            <div>
              <span className="block font-display text-[clamp(2.4rem,11vw,5.5rem)] leading-[0.86] tracking-[-0.02em] text-sand edc-glow-max tabular-nums">
                {clock ?? "--:--:--"}
              </span>
              <span className="edc-meta mt-1 block !text-[9px]">{gatesOpen.clockLabel}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="edc-meta !text-[9px]">{festival.venue}</span>
          <span className="edc-meta !text-[9px]">{festival.coordinates}</span>
          {clock && parts && <span className="edc-meta !text-[9px]">PHUKET {clock}</span>}
        </div>

        {/* ---------------- the close ---------------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,7.4vw,4.4rem)] uppercase leading-[0.9] tracking-[-0.01em] text-sand/60">
                {gatesOpen.big[0]}
                <br />
                <span className="relative inline-block text-sand">
                  {gatesOpen.big[1]}
                  <MarkerUnderline color="#FF2E7E" className="absolute -bottom-2 left-0 h-4 w-full" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[38ch] font-serif text-[clamp(1.15rem,3vw,1.55rem)] italic leading-[1.25] text-sand/80">
                {gatesOpen.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <CredChip color="#FF4F87">{gatesOpen.seats}</CredChip>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PlotButton
                  href={gatesOpen.cta.href}
                  bg="#FF2E7E"
                  fg="#0A0414"
                  shadow="#FF4F87"
                  event={PLOT_EVENTS.requestInvite}
                >
                  {gatesOpen.cta.label}
                </PlotButton>
                <Note className="block text-[1.5rem] text-sand/70" rotate={-4}>
                  {gatesOpen.note}
                </Note>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
