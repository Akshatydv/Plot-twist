"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { entry } from "@/content/chaos";
import { Footage, useCalm } from "../bir/Scenery";

/**
 * THE ENTRY — the portal between the hero and the week.
 *
 * ─── THE MECHANISM, AND WHY IT IS THE HOUSE'S ───────────────────────────────
 * A black layer in `mix-blend-mode: multiply` with WHITE letters in it, sitting
 * over footage. Multiply keeps black as black and lets white through, so the
 * footage is visible ONLY inside the letterforms. Then the type scales ×26 and
 * you pass through the word into the thing behind it.
 *
 * This is lifted deliberately from `components/srilanka/Entry.tsx`. It is the
 * single most recognisable move on that page and copying the MECHANISM is what
 * makes these two feel like one brand — the same way both pages share a
 * navigator and a casting board.
 *
 * ─── WHAT IS THAILAND'S, AND NOT SRI LANKA'S ────────────────────────────────
 * What shows through the letters. Sri Lanka reveals an island, because the
 * island is a secret being let out. Thailand is not a secret — THAILAND =
 * LIGHT — so what comes through the type is the rig: lasers, a mainstage, a
 * crowd. You are not flying into a country, you are flying into the lights,
 * and the frame on the far side of the word is the loudest on the page.
 *
 * The word you fly through is THE CHAOS rather than the destination, for the
 * same reason: the place is not the reveal.
 *
 * ─── THE SHAPE ──────────────────────────────────────────────────────────────
 * 420svh of scroll driving a 100svh sticky frame:
 *
 *   0.02 – 0.22   line one, fading up and drifting past
 *   0.22 – 0.41   line two, scaling, louder
 *   0.00 – 0.12   the black seals over the rig — the screen is never empty
 *   0.34 – 0.46   the knockout letters arrive, overlapping line two
 *   0.55 – 0.92   the letters scale 1 → 26 — the fly-through
 *   0.80 – 0.95   the black lifts and you are inside it
 *
 * Under reduced motion none of this happens: it becomes one flat screen with
 * the same words on it, which is the house rule for every pinned sequence.
 */
export function Entry() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const l1 = useTransform(p, [0, 0.06, 0.17, 0.22], [0, 1, 1, 0]);
  const l1y = useTransform(p, [0.02, 0.22], [24, -24]);
  const l2 = useTransform(p, [0.22, 0.28, 0.36, 0.41], [0, 1, 1, 0]);
  const l2s = useTransform(p, [0.22, 0.41], [0.94, 1.08]);
  /* what you can see behind the black — never zero */
  const rigBg = useTransform(p, [0, 0.34, 0.46], [0.9, 0.9, 1]);
  /* the knockout letters, which must not be readable before their moment */
  const rigIn = useTransform(p, [0.34, 0.46], [0, 1]);
  const zoom = useTransform(p, [0.55, 0.92], [1, 26]);
  /* Opens at 0.72 so the first screen is never a void — see the note above
     the markup. Seals by 12%, holds, then lifts for the fly-through. */
  const black = useTransform(p, [0, 0.12, 0.8, 0.95], [0.72, 1, 1, 0]);
  /* The rig brightens as you approach it, so the fly-through ends on the
     brightest frame the page has shown so far rather than on a flat still. */
  const glow = useTransform(p, [0.55, 0.95], [0.4, 1]);

  if (calm) {
    return (
      <section
        id="entry"
        className="relative flex min-h-[100svh] items-center overflow-hidden px-5 sm:px-8 lg:px-14"
      >
        <Footage slot={entry.inside} className="absolute inset-0" mediaClassName="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#08060B]/70" />
        <div className="relative">
          <p className="font-serif text-[clamp(1.4rem,4vw,2.6rem)] italic text-sand/85">{entry.lines.join(" ")}</p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,13vw,10rem)] italic leading-[0.86] text-sand">
            {entry.welcome[0]} {entry.welcome[1]}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      id="entry"
      ref={ref}
      aria-label={`${entry.lines.join(" ")} ${entry.welcome.join(" ")}`}
      className="relative h-[420svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#08060B]">
        {/* the rig, waiting behind the black */}
        <motion.div className="absolute inset-0" style={{ opacity: rigBg }}>
          <Footage slot={entry.inside} className="h-full w-full" mediaClassName="h-full w-full object-cover" />
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: glow,
              background:
                "radial-gradient(90% 60% at 50% 52%, rgba(255,46,126,0.42) 0%, rgba(139,61,255,0.22) 48%, rgba(8,6,11,0) 78%)",
            }}
          />
        </motion.div>

        {/* THE KNOCKOUT. Black, multiplied, with white type in it — the footage
            is only ever visible inside these letterforms. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply"
          style={{ opacity: black }}
        >
          <motion.div
            className="text-center font-serif italic uppercase leading-[0.8] text-white"
            style={{ scale: zoom, opacity: rigIn }}
          >
            <span className="block text-[clamp(1.6rem,6vw,4.4rem)] tracking-[0.04em]">{entry.welcome[0]}</span>
            <span className="block text-[clamp(4rem,19vw,17rem)] tracking-[-0.02em]">{entry.welcome[1]}</span>
          </motion.div>
        </motion.div>

        {/* the two lines that come before it */}
        <motion.p
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center font-serif text-[clamp(1.6rem,5vw,4rem)] italic leading-[1.05] text-sand sm:inset-x-16"
          style={{ opacity: l1, y: l1y }}
        >
          {entry.lines[0]}
          <br />
          {entry.lines[1]}
        </motion.p>
        <motion.p
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center font-serif text-[clamp(2.4rem,9vw,7.5rem)] italic uppercase leading-[0.9] text-[#FF2E7E] sm:inset-x-16"
          style={{ opacity: l2, scale: l2s }}
        >
          {entry.lines[2]}
        </motion.p>
      </div>
    </section>
  );
}
