"use client";

import { shape, stickers } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { CredChip, GateSlate, Haze, HoloPanel, LaserSweep, NeonRule } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * THE SHAPE — what replaced the day-by-day board.
 *
 * ─── WHAT WAS HERE BEFORE ───────────────────────────────────────────────────
 * A five-card set-time board: arrival, two Phuket days, the three festival
 * nights, after-hours. It was built, and then cut, when this page became a
 * teaser rather than a sales page.
 *
 * ─── WHY CUTTING IT WAS RIGHT ───────────────────────────────────────────────
 * A published itinerary does two things a teaser must not do. It invites
 * someone to evaluate a trip that is not on sale — which turns a "do I want
 * this?" moment into a "is this worth it?" moment far too early — and it
 * commits us in public to days that are not finalised.
 *
 * So this section states only what is genuinely known AND genuinely fixed:
 * seven days, six nights, three of those nights are the festival on the
 * organiser's own published dates, and twenty people. That is enough to decide
 * whether you want in, and wanting in is the only decision this page asks for.
 *
 * ─── THE WITHHELD BLOCK IS THE POINT ────────────────────────────────────────
 * It renders at full contrast, not as a footnote. Saying "we're not publishing
 * this yet, and here's how to get it first" is a stronger reason to
 * pre-register than any of the three blocks above it — and it is honest, which
 * a vague itinerary would not have been.
 *
 * DO NOT ADD DAYS BACK until the trip is open. The full board is in git.
 */
export function TheShape() {
  return (
    <section
      id="shape"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #170727 44%, #0a0414 100%)" }}
    >
      <LaserSweep className="left-[-25%] opacity-50" />
      <Haze className="-left-20 top-1/3 h-80 w-80 opacity-30" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <Sticker className="right-[6%] top-[9%] hidden lg:block" rotate={-9} color="#FF2E7E">
        {stickers.runOfShow}
      </Sticker>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <GateSlate index={shape.index} label={shape.label} meta="MORE TO COME" />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.4vw,4.4rem)] uppercase leading-[0.9] text-sand">
                {shape.headline[0]}
                <br />
                <span className="text-[var(--edc-hot)] edc-glow-hot">{shape.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[44ch] font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-[1.25] text-sand/75">
                {shape.sub}
              </p>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-sand/45" rotate={-2}>
            {shape.annotation}
          </Note>
        </div>

        <NeonRule className="mt-8" />

        {/* three blocks, and nothing under them */}
        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {shape.blocks.map((b, i) => (
            <Reveal key={b.v} delay={i * 0.08}>
              <HoloPanel accent={b.accent} className="h-full p-5 sm:p-6">
                <span
                  className="edc-meta !text-[9px] !opacity-100"
                  style={{ color: b.accent }}
                >
                  {b.k}
                </span>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,4.6vw,2.3rem)] uppercase leading-[0.95] text-sand">
                  {b.v}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-[1.45] text-sand/75">{b.d}</p>
              </HoloPanel>
            </Reveal>
          ))}
        </div>

        {/* ---------------- what we're not telling you yet ---------------- */}
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col gap-4 border-t border-sand/12 pt-7 sm:flex-row sm:items-start sm:gap-8">
            <CredChip color="#D6CFE6" glow={false} rotate={-1.5} className="shrink-0">
              {shape.withheld.stamp}
            </CredChip>
            <p className="max-w-[58ch] text-[clamp(0.98rem,2.4vw,1.1rem)] leading-[1.45] text-sand/80">
              {shape.withheld.line}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
