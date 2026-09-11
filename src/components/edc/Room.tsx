"use client";

import { useReducedMotion } from "framer-motion";

/**
 * THE ROOM — the lighting the rest of the page is standing in.
 *
 * Below the crossing every section was a vertical gradient with one static
 * haze and one laser sweep, and it read as blank: correct colours, no room.
 * The festival stopped at the gate.
 *
 * ─── ONE LAYER, NOT TWELVE ──────────────────────────────────────────────────
 * The obvious fix — give every section its own lights — is the wrong one. A
 * dozen independent light rigs make a dozen rooms, and scrolling between them
 * reads as a slideshow. There is only one room here, so there is one layer,
 * pinned to the viewport, and the sections scroll THROUGH it. That is also why
 * the mirrorball stays put while the copy moves past it, which is what
 * actually happens when you walk across a floor.
 *
 * ─── WHY IT CANNOT DARKEN ANYTHING ──────────────────────────────────────────
 * The whole layer is `mix-blend-mode: screen`, so it is arithmetically
 * incapable of making any pixel darker than it already was — it can only add
 * light. Two things follow for free:
 *
 *   1. Type legibility is safe by construction. Nothing here can dim sand type
 *      on a dark panel, because screen never darkens.
 *   2. The two bright sections look after themselves. Over BEYOND THE GATES
 *      (daylight) and the casting board (magenta), screen against an already
 *      light surface is very nearly a no-op, so the specks simply vanish
 *      rather than needing to be switched off per section.
 *
 * ─── THE SPECKS ARE THE BALL ────────────────────────────────────────────────
 * Every fleck lives inside ONE slowly rotating container, so they all sweep
 * together in arcs rather than drifting independently. Independent drift reads
 * as dust or as a starfield; a shared rotation reads as a mirrorball, because
 * a shared rotation is precisely what a mirrorball is. It is also one animated
 * transform for forty-four elements instead of forty-four of them.
 *
 * Each fleck varies in size, softness and brightness, for the same reason the
 * confetti does: uniform sprites read as clip-art, and depth is what stops
 * them doing that.
 *
 * ─── THE BEAT, AND THE LIMIT ON IT ──────────────────────────────────────────
 * The room breathes on the bar length defined once in globals.css — roughly
 * 0.54Hz. That is deliberately nowhere near the ~3Hz photosensitive-seizure
 * threshold this page's motion rules already rule out for the house flash, and
 * it is a slow swell in brightness rather than a flash. "Flashing lights" is
 * the right instinct for a festival and the wrong thing to literally build.
 *
 * Reduced motion gets the room with nothing moving in it: the light is part of
 * the design, the movement is the part that is optional.
 */

/** Deterministic — this renders on the server, so Math.random() would throw a
 *  hydration mismatch across forty-four elements at once. */
function rnd(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const FLECKS = 44;

/**
 * Placed in polar coordinates about the centre of the rotating field, so the
 * rotation sweeps each one along its own arc. Laid out on a square grid they
 * would rotate as a visible lattice.
 */
const field = Array.from({ length: FLECKS }, (_, i) => {
  const angle = rnd(i, 1) * Math.PI * 2;
  // sqrt keeps the distribution even across the disc instead of crowding the
  // middle, which is where a linear radius would pile them up
  const radius = Math.sqrt(rnd(i, 2)) * 48;
  const depth = rnd(i, 3);
  return {
    left: Math.round((50 + Math.cos(angle) * radius) * 100) / 100,
    top: Math.round((50 + Math.sin(angle) * radius) * 100) / 100,
    size: Math.round((3.5 + depth * depth * 13) * 10) / 10,
    a0: Math.round((0.05 + depth * 0.1) * 100) / 100,
    a1: Math.round((0.2 + depth * 0.42) * 100) / 100,
    twinkle: Math.round((2.8 + rnd(i, 4) * 6.5) * 100) / 100,
    delay: Math.round(rnd(i, 5) * -9 * 100) / 100,
    // A quarter of them are blush rather than sand, so the field is not one
    // flat colour of light.
    blush: rnd(i, 6) > 0.74,
  };
});

export function Room() {
  const reduce = useReducedMotion();

  return (
    <div className="edc-room" aria-hidden>
      <div className="edc-room-in">
        {/* the swell — brightness on the bar, never a flash */}
        {!reduce && <div className="edc-room-beat" />}

        {/* the ball itself, high and small. Drawn only as the light coming off
            it: on a screen-blended layer there are no darks to shade a sphere
            with, so the falloff is a mask rather than a fill. */}
        <div className="edc-ball">
          <div className={`edc-ball-facets${reduce ? " edc-still" : ""}`} />
        </div>
        <div className="edc-ball-glow" />

        {/* what the ball is doing to the room */}
        <div className={`edc-spin${reduce ? " edc-still" : ""}`}>
          {field.map((f, i) => (
            <span
              key={i}
              className={`edc-fleck${f.blush ? " edc-fleck--blush" : ""}`}
              style={
                {
                  left: `${f.left}%`,
                  top: `${f.top}%`,
                  width: f.size,
                  height: f.size,
                  opacity: reduce ? f.a1 * 0.6 : undefined,
                  "--a0": f.a0,
                  "--a1": f.a1,
                  "--t": `${f.twinkle}s`,
                  animationDelay: `${f.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
