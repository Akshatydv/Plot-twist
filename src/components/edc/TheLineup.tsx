"use client";

import { festival, lineup, stickers } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { CredChip, GateSlate, Haze, LaserSweep, NeonRule } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * THE LINEUP — the proof, placed immediately after the peak.
 *
 * ─── WHY IT SITS HERE ───────────────────────────────────────────────────────
 * THE DROP is pure feeling: three words and a festival name. This section is
 * the receipt for it. Seven names a visitor already knows do more to make
 * "EDC THAILAND" concrete than any adjective could, and they land hardest
 * directly after the emotional claim rather than before it — putting the
 * lineup ahead of THE DROP would spend the proof before the promise.
 *
 * It then hands straight to THE CAST, whose bridge line reads "The lineup gets
 * announced. The cast gets picked." That handoff is the whole reason this
 * section ends on `pivot` rather than on a CTA: lineup → but you can't pick
 * the people → here's how we do. Three sections, one argument.
 *
 * ─── THE TYPOGRAPHY IS THE POSTER ───────────────────────────────────────────
 * A festival bill is set as a stacked wall of names in one condensed face at
 * one size, and that stack IS the recognisable object. So this is not a grid
 * of artist cards with photos: it is a name wall in the display face, each
 * name on its own line, with a hairline between and a tiny genre tag in the
 * margin. No artist photography and no artist logos — see the affiliation
 * note in content/thailand.ts.
 *
 * ─── AND IT IS ALL FACT ─────────────────────────────────────────────────────
 * Every name, the stage count and the stage names come from the organiser's
 * own announcement, verified before this shipped. `sourceNote` renders on
 * screen and says plainly that the bill is theirs and subject to change.
 */
export function TheLineup() {
  return (
    <section
      id="lineup"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #170727 46%, #0a0414 100%)" }}
    >
      <LaserSweep className="right-[-30%] opacity-60" slow />
      <Haze className="-left-24 top-16 h-80 w-80 opacity-40" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <Sticker className="right-[7%] top-[7%] hidden lg:block" rotate={8} color="#FF7FA8" variant="outline">
        {stickers.lineup}
      </Sticker>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <GateSlate index={lineup.index} label={lineup.label} meta={festival.ground} />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.4vw,4.4rem)] uppercase leading-[0.9] text-sand">
                {lineup.headline[0]}{" "}
                <span className="text-[var(--edc-hot)] edc-glow-hot">{lineup.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 font-serif text-[clamp(1.05rem,2.6vw,1.35rem)] italic text-sand/70">
                {lineup.sub}
              </p>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-sand/45" rotate={-2}>
            {lineup.annotation}
          </Note>
        </div>

        <NeonRule className="mt-8" />

        {/* ---------------- the name wall ---------------- */}
        <Stagger className="mt-2" gap={0.07}>
          {lineup.headliners.map((a) => (
            <StaggerItem key={a.name}>
              <div className="group flex items-baseline justify-between gap-4 border-b border-sand/10 py-3 sm:py-4">
                <span className="font-display text-[clamp(1.5rem,6.4vw,3.6rem)] uppercase leading-[1] tracking-[-0.01em] text-sand transition-colors duration-300 group-hover:text-[var(--edc-hot)]">
                  {a.name}
                </span>
                <span className="edc-meta shrink-0 !text-[8px] sm:!text-[9px]">{a.tag}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* the rest of the bill, at the size the rest of the bill deserves */}
        <Reveal delay={0.1}>
          <p className="edc-meta mt-6 !text-[9px] !leading-[2] sm:!text-[10px]">{lineup.more}</p>
        </Reveal>

        {/* ---------------- the six stages ---------------- */}
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-sand/12 pt-6">
            <span className="edc-meta !text-[9px] !text-[var(--edc-hot)] !opacity-100">
              {lineup.stages.length} STAGES
            </span>
            {lineup.stages.map((st) => (
              <span
                key={st}
                className="font-display text-[clamp(0.85rem,2.2vw,1.1rem)] tracking-[0.04em] text-sand/70"
              >
                {st}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ---------------- the handoff ---------------- */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal delay={0.16}>
            {/*
              THE PIVOT — the sentence that stops this being a lineup mirror
              and turns it back into a Plot Twist page. It is set in the serif
              italic, the same treatment every other section gives its one
              emotional line, and it is the last thing read before THE CAST.
            */}
            <p className="max-w-[34ch] border-l-2 border-[var(--edc-hot)]/60 pl-5 font-serif text-[clamp(1.2rem,3.2vw,1.75rem)] italic leading-[1.22] text-sand">
              {lineup.pivot}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <CredChip color="#FF7FA8" glow={false} rotate={-1.5}>
              {festival.edition}
            </CredChip>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <p className="mt-6 max-w-[70ch] text-[0.82rem] leading-[1.5] text-sand/45">
            {lineup.sourceNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
