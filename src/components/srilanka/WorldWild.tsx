"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { world2 } from "@/content/srilanka";
import { Note } from "../Bits";
import { Footage, useCalm } from "../bir/Scenery";
import { HorizontalReel, WorldCard } from "./Kit";

/**
 * WORLD 02 — 30 DEC — THE WILD SIDE. Ella.
 *
 * The adventure chapter, and the only one told entirely sideways: five
 * full-screen beats on one pinned reel, each opened by the time it happens
 * in huge outlined type — 08:40, 10:15, 12:30, 15:00, 21:00 — so the day
 * reads as a timeline you scrub with your thumb, not a list of activities.
 *
 * Every beat is a line someone would actually say ("LOOK DOWN.") rather than
 * a thing to do ("Zipline"). The footage inside each panel drifts against
 * the reel (parallax), so the frames feel like windows, not cards.
 */
export function WorldWild() {
  return (
    <div id={world2.id} data-world={world2.id} className="relative bg-[var(--sl-jungle)]">
      <WorldCard
        n={world2.n}
        date={world2.date}
        name={world2.name}
        place={world2.place}
        lines={world2.lines}
        slot={world2.slot}
        tone={world2.tone}
        ground="#0c2219"
        tint="linear-gradient(to bottom, rgba(12,34,25,0.25) 0%, rgba(12,34,25,0.1) 45%, rgba(12,34,25,0.9) 100%)"
      />
      <HorizontalReel label="Day two in Ella" lead={(p) => <DayClock p={p} />}>
        {(p) => world2.beats.map((b, i) => <Beat key={b.key} b={b} i={i} p={p} />)}
      </HorizontalReel>
      <div className="bg-[var(--sl-jungle)] px-5 pb-8 pt-4 text-right sm:px-8 lg:px-14">
        <Note className="text-[1.4rem] text-[var(--sl-tea)]" rotate={-3}>
          {world2.scribble}
        </Note>
      </div>
    </div>
  );
}

type BeatT = (typeof world2.beats)[number];

function Beat({ b, i, p }: { b: BeatT; i: number; p: MotionValue<number> }) {
  const reduce = useCalm();
  const n = world2.beats.length;
  // the frame inside drifts the other way as the reel passes it
  const drift = useTransform(p, [Math.max(0, (i - 1) / (n - 1)), Math.min(1, (i + 1) / (n - 1))], ["10%", "-10%"]);
  const zip = b.key === "zip";

  return (
    <article className="relative h-[100svh] w-screen shrink-0 snap-start overflow-hidden" aria-label={`${b.time} — ${b.title.join(" ")}`}>
      <motion.div className="absolute inset-y-0 -inset-x-[12%]" style={reduce ? undefined : { x: drift }}>
        <Footage slot={b.slot} sizes="100vw" mounted />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: zip
            ? "linear-gradient(to bottom, rgba(5,10,8,0.55), rgba(5,10,8,0.15) 40%, rgba(5,10,8,0.85))"
            : "linear-gradient(100deg, rgba(5,12,9,0.85) 0%, rgba(5,12,9,0.45) 45%, rgba(5,12,9,0.1) 75%), linear-gradient(to top, rgba(5,12,9,0.7), transparent 40%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className={`relative z-10 flex h-full flex-col justify-end px-5 pb-36 pt-28 sm:px-10 sm:pb-24 lg:px-16 ${zip ? "items-center text-center" : ""}`}>
        <span
          aria-hidden
          className="font-display text-[clamp(4.5rem,17vw,14rem)] leading-[0.8] tabular-nums"
          style={{ WebkitTextStroke: "1.5px #7FC48A", color: "transparent" }}
        >
          {b.time}
        </span>
        <h3 className={`mt-3 font-serif leading-[0.88] tracking-[-0.02em] text-[var(--sl-bone)] ${zip ? "text-[clamp(4.5rem,20vw,17rem)]" : "text-[clamp(2.4rem,7vw,6rem)]"}`}>
          {b.title.map((t) => (
            <span key={t} className="block">
              {t}
            </span>
          ))}
        </h3>
        <p className="mt-4 font-serif text-[clamp(1.3rem,3.2vw,2.1rem)] italic text-[var(--sl-tea)]">{b.line}</p>
        <p className={`mt-3 max-w-[42ch] text-[0.98rem] leading-[1.55] text-[var(--sl-bone)]/70 ${zip ? "mx-auto" : ""}`}>{b.note}</p>
      </div>
    </article>
  );
}

/** The day's progress bar, pinned at the top of the reel: dawn on the left, night on the right. */
function DayClock({ p }: { p: MotionValue<number> }) {
  const w = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute inset-x-5 bottom-[92px] z-20 sm:bottom-8 sm:inset-x-10 lg:inset-x-16">
      <div className="flex justify-between text-[9px] font-semibold tracked text-[var(--sl-bone)]/60">
        {world2.beats.map((b) => (
          <span key={b.key}>{b.time}</span>
        ))}
      </div>
      <div className="relative mt-2 h-px bg-white/20">
        <motion.div className="absolute inset-y-0 left-0 bg-[var(--sl-tea)]" style={{ width: w }} />
      </div>
    </div>
  );
}
