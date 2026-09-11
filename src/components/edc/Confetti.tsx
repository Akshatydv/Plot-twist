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

/* Weighted toward the arc. The near-whites are the most sticker-like pieces on
   screen, so there are now two of them in the bag rather than four. */
const COLOURS = ["#FF2E7E", "#FF7FA8", "#8B3DFF", "#FF2E7E", "#C04BFF", "#FFF1DC", "#FF7FA8", "#D6CFE6"];

const CANNON = 60;
const SHOWER = 40;

function rnd(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * DEPTH, AND WHY THE FIRST VERSION READ AS CLIP-ART.
 *
 * Every piece used to be 7-13px, fully opaque, hard-edged and flat-filled —
 * which is to say every piece was the same distance away. A real burst has
 * some paper a few feet from your face and some of it fifty metres back over
 * the crowd, and the eye reads that difference through THREE cues at once:
 * size, focus and contrast. Change one and it still looks fake; change all
 * three together and it stops looking like anything at all, which is the goal.
 *
 *   far   tiny, sharp, dim        — specks over the crowd
 *   mid   small, barely soft
 *   near  larger, properly blurred, bright — it is moving fast and close
 *
 * The blur is the part that matters most. Confetti is travelling several
 * metres a second; a camera never freezes it, so a perfectly crisp edge is
 * the single biggest tell that something was drawn rather than photographed.
 */
function size(i: number, streamer: boolean, salt: number) {
  const depth = rnd(i, 40 + salt);
  const scale = 0.42 + depth * depth * 1.05;
  const base = streamer ? 3.2 : 5.4 + rnd(i, 43 + salt) * 4.2;
  return {
    depth,
    w: Math.max(2, Math.round(base * scale * 10) / 10),
    h: Math.max(2, Math.round((streamer ? base * (5 + rnd(i, 44 + salt) * 3) : base * (0.8 + rnd(i, 45 + salt) * 0.6)) * scale * 10) / 10),
    blur: Math.round(depth * depth * 1.5 * 100) / 100,
    alpha: Math.round((0.42 + depth * 0.58) * 100) / 100,
    sheen: Math.round(rnd(i, 46 + salt) * 360),
  };
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
  /** 0 = far across the field, 1 = right past your face. Drives all three of
   *  size, blur and opacity together, which is what actually reads as depth. */
  depth: number;
  blur: number;
  alpha: number;
  /** Angle of the foil sheen, so no two pieces catch the light the same way. */
  sheen: number;
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
      delay: rnd(k, 5) * 0.22,
      // ~25% longer than the first pass. The burst was reading as a flicker
      // rather than a flight — you want to watch a piece travel.
      duration: 3.1 + rnd(k, 6) * 2.2,
      colour: COLOURS[Math.floor(rnd(k, 8) * COLOURS.length)],
      ...size(k, streamer, 1),
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
      delay: 0.45 + rnd(i, 17) * 1.3,
      duration: 3.6 + rnd(i, 18) * 2.4,
      colour: COLOURS[Math.floor(rnd(i, 21) * COLOURS.length)],
      ...size(i, streamer, 2),
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
              /*
                FOIL, NOT PAINT. A flat fill is a coloured rectangle; real
                confetti is shiny stock that is bright down one edge and dark
                down the other as it tumbles. One gradient per piece, at its own
                angle, is the whole difference between paper and a div.
              */
              backgroundImage: `linear-gradient(${p.sheen}deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.05) 42%, rgba(0,0,0,0.42) 100%)`,
              borderRadius: p.streamer ? 2 : 0.5,
              filter: p.blur > 0.05 ? `blur(${p.blur}px)` : undefined,
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
              opacity: [0, p.alpha, p.alpha, p.alpha, 0],
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
