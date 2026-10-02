"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { MediaSlot } from "@/content/bir";
import { Footage, useCalm } from "../bir/Scenery";

/**
 * THE CROSSINGS — the scroll sequences BETWEEN worlds.
 *
 * The house rule, from `docs/bir-barot-design.md` §3: **there is never a white
 * frame, and a world never "ends" — it becomes the next one.** Bir spends 220vh
 * descending out of its hero and 240vh turning night into morning. Those
 * sequences are not decoration between the real sections; they ARE the reason
 * the page reads as one continuous camera move instead of a stack of slides.
 *
 * Each crossing is a sticky frame that the page scrolls past while the frame
 * itself changes. They are transform, opacity and colour only — no animated
 * `filter: blur()` on a full-screen layer, which is the one thing Bir §5 bans
 * outright because it is what kills this kind of page on a mid-range Android.
 *
 * Under reduced motion every crossing collapses to a short flat band in the
 * destination's colour: no pinning, no scrubbing, no vertigo, and the page
 * still gets from one world to the next without a seam.
 */

type CrossingProps = {
  /** The colour the world above ends on. */
  from: string;
  /** The colour the world below starts on. */
  to: string;
  /** How tall the scroll sequence is. Longer = slower = more deliberate. */
  vh?: number;
  /**
   * THE FOOTAGE UNDER THE TRANSITION — and the reason these stopped reading as
   * blank screens.
   *
   * The first build drove every crossing with gradients and nothing else. On
   * paper that is "a sky interpolating"; on screen it is a flat colour for two
   * hundred vertical hundredths of a viewport, which is indistinguishable from
   * a section that failed to load. Bir's transitions are never empty — they are
   * illustrated environments, ridges and cloud and embers — and Sri Lanka's run
   * over footage. A transition with nothing in it is not a transition, it is a
   * gap.
   *
   * So every crossing now carries a clip, graded by the sequence rather than
   * replaced by it. The gradients still do the work; they just do it to
   * something.
   */
  slot?: MediaSlot;
};

/* ------------------------------------------------------------------ */
/* the shell every crossing shares                                     */
/* ------------------------------------------------------------------ */

function Pinned({
  vh = 240,
  from,
  to,
  slot,
  children,
}: CrossingProps & { children: (p: MotionValue<number>) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} style={{ height: `${vh}svh`, background: to }} aria-hidden>
      {/* height:0 + an absolutely positioned inner frame: the sticky layer costs
          the layout nothing, so it cannot push the sections either side around
          while it is being measured. */}
      <div className="sticky top-0 h-0">
        <div className="relative h-[100svh] w-full overflow-hidden" style={{ background: from }}>
          {slot ? (
            <div className="absolute inset-0" aria-hidden>
              <Footage slot={slot} className="h-full w-full" mediaClassName="h-full w-full object-cover" />
            </div>
          ) : null}
          {children(scrollYProgress)}
        </div>
      </div>
    </div>
  );
}

/** Reduced motion, every crossing: a short band that simply gets there. */
function Flat({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      className="h-[28svh] w-full"
      style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 01 → 02   LAST LIGHT becomes OPEN WATER                             */
/* ------------------------------------------------------------------ */

/**
 * The sky interpolates night → blue hour → white morning while a boat wake
 * draws itself across the lower third and the horizon pulls flat. A clock in
 * the corner ticks 23:40 → 08:10, which is the only place on the page that
 * says out loud how long the night was.
 *
 * Directly modelled on Bir's Day 01 → Day 02, which does the same job with a
 * road instead of a wake.
 */
export function CrossDawn({ from, to, vh = 260, slot }: CrossingProps) {
  const calm = useCalm();
  if (calm) return <Flat from={from} to={to} />;

  return (
    <Pinned from={from} to={to} vh={vh} slot={slot}>
      {(p) => <DawnFrame p={p} to={to} />}
    </Pinned>
  );
}

function DawnFrame({ p, to }: { p: MotionValue<number>; to: string }) {
  /* Four stops, not two: a straight fade from night to morning goes through a
     flat grey that looks like a bug. Blue hour and the gold are what make it
     read as a sunrise rather than as an opacity change. */
  const sky = useTransform(
    p,
    [0, 0.3, 0.62, 1],
    ["#2A1330", "#2B3A63", "#C98A6B", to]
  );
  const starsOut = useTransform(p, [0, 0.32], [0.55, 0]);
  const sunY = useTransform(p, [0.25, 0.85], ["64%", "34%"]);
  const sunOpacity = useTransform(p, [0.22, 0.45, 0.95], [0, 0.9, 0.25]);
  const wake = useTransform(p, [0.45, 1], [0, 1]);
  const horizon = useTransform(p, [0, 1], [1.12, 1]);
  /* The sea was painted at full opacity over the footage by the end, so the
     last third of this crossing was a flat block of colour. It now thins out,
     and the morning you arrive in is the footage rather than the fill. */
  const seaFade = useTransform(p, [0.55, 1], [1, 0.25]);
  const mins = useTransform(p, [0, 1], [23 * 60 + 40, 32 * 60 + 10]);
  const clock = useTransform(mins, (m) => {
    const t = Math.round(m) % (24 * 60);
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  });

  return (
    /* mix-blend-multiply rather than a flat fill: the sky now GRADES the
       footage instead of hiding it, which is the whole difference between a
       transition and a blank screen. */
    <motion.div className="absolute inset-0 mix-blend-multiply" style={{ background: sky }}>
      {/* stars, dying in the first third */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: starsOut,
          backgroundImage:
            "radial-gradient(1.4px 1.4px at 14% 22%, #fff 50%, transparent 51%), radial-gradient(1.2px 1.2px at 68% 14%, #fff 50%, transparent 51%), radial-gradient(1.6px 1.6px at 41% 33%, #fff 50%, transparent 51%), radial-gradient(1.2px 1.2px at 86% 28%, #fff 50%, transparent 51%), radial-gradient(1.3px 1.3px at 27% 9%, #fff 50%, transparent 51%)",
        }}
      />
      {/* the sun, rising behind the horizon rather than onto it */}
      <motion.div
        className="absolute left-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 rounded-full"
        style={{
          top: sunY,
          opacity: sunOpacity,
          background: "radial-gradient(circle, #FFD9A8 0%, #FF9E7A 42%, rgba(255,158,122,0) 70%)",
        }}
      />
      {/* the sea, flattening */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[42%] origin-bottom"
        style={{ scaleY: horizon, opacity: seaFade, background: `linear-gradient(180deg, ${to}cc 0%, ${to} 100%)` }}
      />
      {/* the wake */}
      <svg className="absolute inset-x-0 bottom-[16%] h-[18%] w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <motion.path
          d="M -2 16 C 22 15, 38 11, 56 9 C 72 7, 86 6, 102 5"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.5"
          pathLength={1}
          style={{ pathLength: wake }}
        />
      </svg>
      <motion.span className="absolute bottom-6 left-5 text-[10px] tracked text-white/70 sm:left-8">
        {clock}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 → 03   THE WATER bleaches to PAPER                               */
/* ------------------------------------------------------------------ */

/**
 * The only transition on the page that gets BRIGHTER, and the reason World 03
 * reads as an exhale rather than a lull. The sea desaturates from the bottom
 * of the frame upward until the whole screen is paper — a wipe that travels,
 * not a crossfade, so it feels like the light arriving rather than the picture
 * changing.
 */
export function CrossBleach({ from, to, vh = 150, slot }: CrossingProps) {
  const calm = useCalm();
  if (calm) return <Flat from={from} to={to} />;

  return (
    <Pinned from={from} to={to} vh={vh} slot={slot}>
      {(p) => <BleachFrame p={p} from={from} to={to} />}
    </Pinned>
  );
}

function BleachFrame({ p, from, to }: { p: MotionValue<number>; from: string; to: string }) {
  const rise = useTransform(p, [0, 0.82], ["0%", "-100%"]);
  const sat = useTransform(p, [0.1, 0.8], [1, 0]);
  /* THE WASH NEVER REACHES FLAT.
     It used to run to opacity 1 on a solid colour, which meant the last two
     fifths of this crossing were a block of bone with nothing in it — the
     single worst blank on the page. Capped at 0.78, the footage is always
     still there underneath, and the handover to World 03 happens on a picture
     rather than on a painted rectangle. */
  const wash = useTransform(p, [0.5, 0.82], [0, 0.78]);
  /* the paper is a WIPE, not a fill: it is translucent, so the sea is visible
     through it as it passes and the transition reads as light arriving */
  const paper = useTransform(p, [0, 0.4], [0.95, 0.72]);

  return (
    <div className="absolute inset-0">
      {/* the sea losing its colour */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: useTransform(sat, (v) => 1 - v * 0.55),
          background: `linear-gradient(180deg, ${from} 0%, #1C6E6B 55%, #79C8BE 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      {/* the paper, arriving from below */}
      <motion.div className="absolute inset-0" style={{ y: rise, opacity: paper, background: to }} />
      {/* and the last of the colour going — but never all of it */}
      <motion.div className="absolute inset-0" style={{ opacity: wash, background: to }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 → 04   the light dies, one stop at a time                        */
/* ------------------------------------------------------------------ */

/**
 * Deliberately mechanical, and the only crossing on the page that is stepped
 * rather than continuous: six hard stops, each a little faster than the last,
 * like someone killing a lighting rig channel by channel. Paper → black.
 *
 * It is stepped because the two worlds either side of it are the page's
 * brightest and its darkest, and a smooth 200vh fade between them would spend
 * the whole sequence in the beige nowhere in the middle.
 */
export function CrossBlackout({ from, to, vh = 180, slot }: CrossingProps) {
  const calm = useCalm();
  if (calm) return <Flat from={from} to={to} />;

  return (
    <Pinned from={from} to={to} vh={vh} slot={slot}>
      {(p) => <BlackoutFrame p={p} from={from} to={to} />}
    </Pinned>
  );
}

function BlackoutFrame({ p, from, to }: { p: MotionValue<number>; from: string; to: string }) {
  /* Six stops, accelerating: the gaps between them shorten, so the dark arrives
     faster than you expect even though the scroll is linear. */
  const stops = [0, 0.26, 0.47, 0.64, 0.78, 0.89, 1];
  const level = useTransform(p, stops, [0, 1, 2, 3, 4, 5, 6]);
  const bg = useTransform(level, (l) => {
    const i = Math.min(6, Math.floor(l));
    return ["#F1E9DC", "#CFC6BA", "#9A9188", "#5F5A57", "#332F36", "#14101C", to][i];
  });
  const ink = useTransform(level, (l) => (l < 3 ? "#1B1B1B" : "#EFE9DD"));
  const count = useTransform(level, (l) => `${Math.min(6, Math.floor(l))} / 6`);

  return (
    <motion.div className="absolute inset-0" style={{ background: bg, mixBlendMode: "multiply" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span className="font-serif text-[clamp(1.6rem,5vw,3rem)] italic" style={{ color: ink }}>
          house lights
        </motion.span>
      </div>
      <motion.span className="absolute bottom-6 left-5 text-[10px] tracked sm:left-8" style={{ color: ink }}>
        {count}
      </motion.span>
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(180deg, ${from}00 0%, ${from}00 85%, ${to}cc 100%)` }} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 → 05   the countdown, and the only hard cut on the page          */
/* ------------------------------------------------------------------ */

/**
 * The clock scrubs 21:00 → 23:59 while violet rises from the floor of the
 * frame. Then one frame of absolute nothing — no type, no texture, no colour —
 * and the drop lands at full size on the far side of it.
 *
 * **The silence is the effect.** Every other crossing on this page is
 * continuous; this is the only hard cut, which is exactly what makes it work.
 * If a second one is ever added, this one stops being a cut and becomes a
 * style.
 */
export function CrossCountdown({ from, to, vh = 240, slot }: CrossingProps) {
  const calm = useCalm();
  if (calm) return <Flat from={from} to={to} />;

  return (
    <Pinned from={from} to={to} vh={vh} slot={slot}>
      {(p) => <CountdownFrame p={p} from={from} />}
    </Pinned>
  );
}

function CountdownFrame({ p, from }: { p: MotionValue<number>; from: string }) {
  /* 21:00 → 23:59 over the first 82%, then nothing at all. */
  const mins = useTransform(p, [0, 0.88], [21 * 60, 23 * 60 + 59]);
  const clock = useTransform(mins, (m) => {
    const t = Math.min(23 * 60 + 59, Math.round(m));
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  });
  const rise = useTransform(p, [0, 0.88], ["0%", "72%"]);
  const glow = useTransform(p, [0.3, 0.88], [0, 1]);
  /* THE CUT, AND WHY IT IS SHORT.
     This ran 0.84 → 1.0, which at 300svh is over 400px of scrolling on an
     empty frame — long enough to read as a section that failed to load rather
     than as a beat of silence. A cut is a MOMENT. It now goes dark at 0.90,
     holds for about 3% of the sequence, and the far side of it is the
     brightest frame in the crossing rather than more nothing. */
  const alive = useTransform(p, [0.86, 0.9], [1, 0]);
  /* the wash lifts off the footage after the cut, so you arrive INSIDE the
     venue at full brightness instead of in the dark */
  const veil = useTransform(p, [0.9, 0.93, 1], [0.7, 0.7, 0]);
  const arrive = useTransform(p, [0.93, 1], [1, 1.08]);
  const scale = useTransform(p, [0, 0.88], [1, 1.14]);

  return (
    <div className="absolute inset-0">
      {/* the night, dimmed but never erased — and the dimming comes off on the
          far side of the cut, which is what makes the arrival read as arrival */}
      <motion.div className="absolute inset-0" style={{ background: from, opacity: veil }} />
      {/* the violet, rising out of the floor */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: rise,
          opacity: glow,
          background: "linear-gradient(0deg, rgba(139,61,255,0.85) 0%, rgba(139,61,255,0.12) 60%, rgba(139,61,255,0) 100%)",
        }}
      />
      <motion.div className="absolute inset-0 origin-center" style={{ scale: arrive }} aria-hidden />
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-6" style={{ opacity: alive, scale }}>
        <motion.span className="font-display text-[clamp(4rem,20vw,13rem)] leading-none tabular-nums text-sand">
          {clock}
        </motion.span>
        <span className="text-[10px] tracked text-sand/55">GATES · RHYTHM PARK</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 → 06   the lasers stop, one at a time                            */
/* ------------------------------------------------------------------ */

/**
 * The inverse of the countdown and deliberately slow. Eight beams go out one
 * after another, and the sky behind the rig has already been getting lighter
 * for most of a screen before anyone notices it happening. Nobody leaves a
 * festival in one movement.
 */
export function CrossLightsDown({ from, to, vh = 240, slot }: CrossingProps) {
  const calm = useCalm();
  if (calm) return <Flat from={from} to={to} />;

  return (
    <Pinned from={from} to={to} vh={vh} slot={slot}>
      {(p) => <LightsDownFrame p={p} to={to} />}
    </Pinned>
  );
}

function LightsDownFrame({ p, to }: { p: MotionValue<number>; to: string }) {
  const sky = useTransform(p, [0.1, 0.72, 1], ["#0A0414", "#3A2230", to]);
  const beams = [0.08, 0.16, 0.25, 0.33, 0.42, 0.5, 0.58, 0.66];
  const dawn = useTransform(p, [0.5, 1], [0, 0.85]);

  return (
    <motion.div className="absolute inset-0" style={{ background: sky, mixBlendMode: "multiply" }}>
      {/* first light, behind everything */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          opacity: dawn,
          background: "linear-gradient(0deg, #E8B48A 0%, rgba(232,180,138,0.35) 45%, rgba(232,180,138,0) 100%)",
        }}
      />
      {beams.map((t, i) => (
        <Beam key={t} p={p} out={t} index={i} />
      ))}
    </motion.div>
  );
}

function Beam({ p, out, index }: { p: MotionValue<number>; out: number; index: number }) {
  const opacity = useTransform(p, [out, out + 0.06], [0.5, 0]);
  const left = 8 + index * 11.6;
  return (
    <motion.div
      className="absolute top-0 origin-top"
      style={{
        opacity,
        left: `${left}%`,
        width: "3%",
        height: "88%",
        transform: `rotate(${(index - 3.5) * 4}deg)`,
        background: "linear-gradient(180deg, rgba(255,46,126,0.9) 0%, rgba(255,46,126,0) 100%)",
        filter: "blur(6px)",
      }}
    />
  );
}
