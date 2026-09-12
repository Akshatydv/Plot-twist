"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * THE LIGHTING CUE — the rig striking as you come through the gate.
 *
 * Nine beams hanging off the header, fanned symmetrically, each one snapping
 * on a beat after the last. They do not fade up: real fixtures STRIKE, and the
 * difference between a 40ms snap and a 400ms fade is the entire difference
 * between a lighting cue and a CSS transition.
 *
 * ─── THE SHAPE OF EACH POP ──────────────────────────────────────────────────
 *     off  →  full  →  settle
 *      0      1.0      0.72
 *   over a progress window about 0.05 wide, of which the strike is 0.012.
 *
 * That overshoot-and-settle is what makes it read as a lamp igniting rather
 * than an element appearing. The beams then hold at 0.72 so the opening stays
 * lit while you walk through it.
 *
 * ─── WHY THEY FIRE OUTWARD FROM THE CENTRE ──────────────────────────────────
 * Beam 0 is the middle one, and the pairs either side of it strike together
 * working outward. A left-to-right sweep would read as a wave; symmetrical
 * outward firing reads as a rig cue, which is what a stage actually does when
 * the gates open.
 *
 * ─── PERFORMANCE ────────────────────────────────────────────────────────────
 * Nine elements, each a clipped gradient. Opacity and transform only, blended
 * screen so they add light rather than paint over the structure. The blur is
 * on a static element and never animates, so it is rasterised once.
 */

/** Angles, centre outward. Index order IS the firing order. */
const BEAMS = [0, -16, 16, -31, 31, -45, 45, -58, 58];

export function StageLights({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {BEAMS.map((angle, i) => (
        <Beam key={angle} angle={angle} order={i} progress={progress} />
      ))}
    </div>
  );
}

function Beam({
  angle,
  order,
  progress,
}: {
  angle: number;
  order: number;
  progress: MotionValue<number>;
}) {
  /*
    The rig starts striking just before the gates are wide enough to see
    through, so the light is already there when the opening arrives rather
    than arriving late behind it. Pairs share a beat: 0, then ±1, then ±2…
  */
  const t = 0.38 + Math.ceil(order / 2) * 0.042;

  /*
     HELD LOW ON PURPOSE, SINCE THE SCENE BECAME A PHOTOGRAPH.
     These used to strike to full and hold at 0.72, because behind them was a
     flat gradient and they were the only thing selling "lit". There is a real
     rig in the frame now, with real beams in real haze, and nine blurred
     rectangles at 0.72 sat ON TOP of it as a pink wash — flattening the very
     photograph they were supposed to be lighting. They still strike, because
     the cue is the point; they just settle to a fifth of the old level and
     add light to the scene rather than replacing it.
  */
  const opacity = useTransform(
    progress,
    [t, t + 0.012, t + 0.05, 1],
    [0, 0.46, 0.2, 0.2],
  );
  // A short lengthening as it strikes — the beam reaching for the floor.
  const scaleY = useTransform(progress, [t, t + 0.09], [0.55, 1]);
  // The outer beams drift a few degrees, so the fan is never quite static.
  const drift = useTransform(progress, [t, 1], [angle, angle + (order % 2 ? 3.5 : -3.5)]);

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-[135%] w-[26%]"
      style={{
        opacity,
        scaleY,
        rotate: drift,
        x: "-50%",
        originX: 0.5,
        originY: 0,
        mixBlendMode: "screen",
        /*
          HALVED, FOR FRAME TIME. Blur cost scales with radius, and these nine
          elements are blurred WHILE being scaled and rotated, so each one is
          re-rasterised every frame rather than cached. 7px still reads as a
          shaft in haze rather than an edged wedge; 15px just cost twice as
          much to say the same thing.
        */
        filter: "blur(7px)",
        // Narrow at the lamp, wide at the floor.
        clipPath: "polygon(47.5% 0%, 52.5% 0%, 100% 100%, 0% 100%)",
        background:
          "linear-gradient(180deg, rgba(255,241,220,0.4) 0%, rgba(255,46,126,0.2) 32%, rgba(139,61,255,0.12) 70%, rgba(139,61,255,0) 100%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* the lasers                                                          */
/* ------------------------------------------------------------------ */

/**
 * THE LASER FAN — the drop.
 *
 * ─── LASERS ARE NOT BEAMS, AND THE DIFFERENCE IS THE POINT ──────────────────
 * The wash beams above are soft, wide, blurred and staggered — they build.
 * These are the opposite in every property, because that contrast is what
 * makes a drop land:
 *
 *              wash beams          lasers
 *   width      26% of screen       2px
 *   edge       9px blur            1px, essentially hard
 *   colour     warm, desaturated   saturated magenta / violet
 *   timing     one at a time       ALL AT ONCE
 *
 * Everything fires on a single frame at `DROP`, together with the house
 * flash. A laser fan that eases in is just a gradient; the whole effect is
 * that nothing is there, and then all of it is.
 *
 * ─── THE FAN ────────────────────────────────────────────────────────────────
 * They start stacked almost on top of each other and sweep apart over the
 * following moment — a rig opening its scan angle. After that they keep
 * drifting a couple of degrees so the fan never freezes into a static graphic.
 */
const DROP = 0.58;

/** Sixteen lines, symmetrical, tightest in the middle. */
const LASERS = Array.from({ length: 16 }, (_, i) => (i - 7.5) * 7.6);

export function LaserFan({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {LASERS.map((angle, i) => (
        <LaserLine key={angle} angle={angle} index={i} progress={progress} />
      ))}
    </div>
  );
}

function LaserLine({
  angle,
  index,
  progress,
}: {
  angle: number;
  index: number;
  progress: MotionValue<number>;
}) {
  // Every line snaps on in the same 0.01 of scroll. No stagger, on purpose.
  const opacity = useTransform(
    progress,
    [DROP, DROP + 0.01, DROP + 0.18, 1],
    [0, 0.8, 0.42, 0.34],
  );

  /*
    Closed to open: the fan starts at a quarter of its final spread and opens
    out. Alternating lines overshoot slightly differently so the sweep has some
    life in it rather than moving as one rigid object.
  */
  const spread = useTransform(
    progress,
    [DROP, DROP + 0.16, 1],
    [angle * 0.25, angle, angle * (index % 2 ? 1.06 : 0.94)],
  );

  /*
    TWO NESTED TRANSFORMS, AND THAT IS THE WHOLE TRICK.

    The outer element is driven by SCROLL — it owns whether the laser is on and
    how far the fan has opened. The inner element is driven by a CSS keyframe on
    its own clock, and it owns the sweep.

    They have to be separate elements because they are both `rotate` and one
    would overwrite the other. Nesting composes them instead: the fan opens to
    where the scroll says, and the beam keeps scanning around that position
    whether or not anyone is scrolling. A laser that only moves while you scroll
    is a diagram of a laser.
  */
  return (
    <motion.div
      className="absolute left-1/2 top-0 h-[150%] w-[2px]"
      style={{ opacity, rotate: spread, x: "-50%", originX: 0.5, originY: 0 }}
    >
      <div
        className={`h-full w-full ${index % 2 ? "edc-scan-a" : "edc-scan-b"}`}
        style={{ transformOrigin: "50% 0%" }}
      >
        <div
          className="edc-throb h-full w-full"
          style={{
            // Staggered so the rig throbs as a crowd of lamps, not in unison.
            animationDelay: `${(index % 5) * 0.11}s`,
            mixBlendMode: "screen",
            // 1px keeps the edge hard while giving it the bloom a real beam has
            // in haze. Any more and it stops being a laser.
            filter: "blur(1px)",
            background:
              index % 3 === 0
                ? "linear-gradient(180deg, rgba(255,241,220,1) 0%, rgba(255,46,126,0.95) 18%, rgba(255,46,126,0.12) 86%, transparent 100%)"
                : "linear-gradient(180deg, rgba(255,127,168,0.98) 0%, rgba(139,61,255,0.9) 22%, rgba(139,61,255,0.1) 86%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/**
 * THE SCAN SHEETS — flat planes of light sweeping down across the crowd.
 *
 * Two of them, on different periods so they never pair up into a pattern. This
 * is the one laser move that reads instantly as a rig rather than as graphics,
 * and it costs two elements.
 */
export function ScanSheets({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [DROP, DROP + 0.02, 1], [0, 0.55, 0.4]);
  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity }} aria-hidden>
      <div className="edc-sheet" style={{ top: 0 }} />
      <div className="edc-sheet" style={{ top: 0, animationDelay: "-3.3s", animationDuration: "8.6s" }} />
    </motion.div>
  );
}

/**
 * THE HOUSE FLASH — one frame of white as the rig hits full.
 *
 * Deliberately a single short pop, not a strobe. Repeated flashing above
 * roughly 3Hz is a photosensitive-seizure risk and is ruled out by the motion
 * rules for this page; one bloom is the theatrical beat without the hazard.
 */
export function HouseFlash({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.56, 0.585, 0.65], [0, 0.3, 0]);
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity, background: "radial-gradient(70% 60% at 50% 45%, #FFF1DC 0%, #FF7FA8 55%, transparent 80%)" }}
      aria-hidden
    />
  );
}
