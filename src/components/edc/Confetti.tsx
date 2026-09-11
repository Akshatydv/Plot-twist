"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * THE CONFETTI — cannons, not a snowfall.
 *
 * ─── WHAT WAS WRONG WITH THE FIRST VERSION ──────────────────────────────────
 * Ninety pieces drifting straight down at a constant speed. Technically
 * confetti; read as falling leaves. Real festival confetti does not fall, it
 * is FIRED — a violent outward burst from cannons at the edges of the stage,
 * which then loses its energy and comes down. The first half-second is the
 * whole effect and it was missing entirely.
 *
 * ─── SO THIS IS BALLISTIC ───────────────────────────────────────────────────
 * Every piece flies a three-stage arc, not a straight line:
 *
 *     1. LAUNCH   fast, outward and steeply up, 0.5s — the bang
 *     2. APEX     it runs out of energy and hangs
 *     3. FALL     gravity takes it, tumbling and fluttering, and it drifts
 *
 * That is expressed as keyframe arrays on x and y with a non-linear `times`
 * distribution, so the piece covers most of its horizontal distance in the
 * first fifth of its life. The easing changes per stage too: the launch is
 * `circOut` (fast then decelerating), the fall is gentle.
 *
 * ─── TWO CANNONS AND A SHOWER ───────────────────────────────────────────────
 * Sixty from the bottom-left, sixty from the bottom-right, angled inward and
 * up — the classic pair flanking a stage. Plus forty dropping from overhead
 * on a delay, which is what fills the middle of the screen once the burst has
 * spread.
 *
 * ─── STILL DETERMINISTIC ────────────────────────────────────────────────────
 * Every value comes from the piece's index through an integer hash, never
 * Math.random(). This renders on the server: random values would differ
 * between passes and throw a hydration mismatch on 160 elements at once. It
 * also means the burst can be art-directed rather than hoped for.
 */

const COLOURS = ["#FF2E7E", "#FF7FA8", "#8B3DFF", "#FFF1DC", "#D6CFE6", "#FF2E7E"];

const CANNON = 60;
const SHOWER = 40;

function rnd(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Piece = {
  kind: "cannon" | "shower";
  fromLeft: boolean;
  x0: number;
  launchX: number;
  apexY: number;
  driftX: number;
  spin: number;
  flutter: number;
  delay: number;
  duration: number;
  colour: string;
  w: number;
  h: number;
  streamer: boolean;
};

function build(): Piece[] {
  const out: Piece[] = [];

  // ---- the two cannons ----
  for (let i = 0; i < CANNON * 2; i++) {
    const fromLeft = i < CANNON;
    const k = i % CANNON;
    const power = 0.45 + rnd(k, 1) * 0.55;
    const streamer = rnd(k, 9) > 0.72;
    out.push({
      kind: "cannon",
      fromLeft,
      x0: fromLeft ? -4 : 104,
      // Fired inward and across — the far side of the screen is reachable.
      launchX: (fromLeft ? 1 : -1) * (40 + power * 78),
      // Steeply up. Negative is up; this is how high it gets before gravity.
      apexY: -(55 + power * 55),
      driftX: (rnd(k, 3) - 0.5) * 26,
      spin: (rnd(k, 4) - 0.5) * 1400,
      flutter: 6 + rnd(k, 10) * 14,
      delay: rnd(k, 5) * 0.16,
      duration: 2.4 + rnd(k, 6) * 1.8,
      colour: COLOURS[Math.floor(rnd(k, 8) * COLOURS.length)],
      w: streamer ? 4 : 7 + Math.floor(rnd(k, 11) * 6),
      h: streamer ? 22 + Math.floor(rnd(k, 12) * 14) : 7 + Math.floor(rnd(k, 13) * 5),
      streamer,
    });
  }

  // ---- the overhead shower, filling in behind the burst ----
  for (let i = 0; i < SHOWER; i++) {
    const streamer = rnd(i, 19) > 0.7;
    out.push({
      kind: "shower",
      fromLeft: true,
      x0: rnd(i, 14) * 100,
      launchX: 0,
      apexY: 0,
      driftX: (rnd(i, 15) - 0.5) * 40,
      spin: (rnd(i, 16) - 0.5) * 1100,
      flutter: 8 + rnd(i, 20) * 16,
      delay: 0.35 + rnd(i, 17) * 1.1,
      duration: 2.8 + rnd(i, 18) * 2,
      colour: COLOURS[Math.floor(rnd(i, 21) * COLOURS.length)],
      w: streamer ? 4 : 7 + Math.floor(rnd(i, 22) * 5),
      h: streamer ? 20 + Math.floor(rnd(i, 23) * 12) : 7 + Math.floor(rnd(i, 24) * 5),
      streamer,
    });
  }

  return out;
}

const PIECES = build();

export function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {PIECES.map((p, i) => {
        const cannon = p.kind === "cannon";
        return (
          <motion.span
            key={i}
            className="absolute block"
            style={{
              left: `${p.x0}%`,
              top: cannon ? "100%" : "-8%",
              width: p.w,
              height: p.h,
              backgroundColor: p.colour,
              borderRadius: p.streamer ? 2 : 1,
            }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={{
              /*
                Most of the horizontal travel happens in the launch. The last
                keyframe adds the slow drift while it falls.
              */
              x: cannon
                ? [0, `${p.launchX * 0.75}vw`, `${p.launchX}vw`, `${p.launchX + p.driftX}vw`]
                : [0, `${p.driftX * 0.4}vw`, `${p.driftX}vw`],
              y: cannon
                ? [0, `${p.apexY}vh`, `${p.apexY * 0.72}vh`, "18vh"]
                : [0, "50vh", "118vh"],
              rotate: [0, p.spin * 0.35, p.spin * 0.7, p.spin],
              // The flutter: it tips edge-on and back as it tumbles, which is
              // what makes a flat piece of foil read as a flat piece of foil.
              scaleX: [1, 0.25, 1, 0.4, 1],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              // Fast out of the barrel, decelerating into the apex, then a
              // plain fall. One easing for the whole flight looks like a lob.
              ease: cannon ? ["circOut", "easeOut", "easeIn"] : ["easeOut", "easeIn"],
              times: cannon ? [0, 0.18, 0.34, 1] : [0, 0.45, 1],
              rotate: { duration: p.duration, delay: p.delay, ease: "linear" },
              scaleX: {
                duration: p.flutter / 10,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: p.duration,
                delay: p.delay,
                times: [0, 0.04, 0.5, 0.86, 1],
              },
            }}
          />
        );
      })}
    </div>
  );
}
