"use client";

import { chapters, flamingoLook } from "@/content/goa";
import { Note, Stamp } from "../Bits";
import { Reveal } from "../motion";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[1];

/**
 * CHAPTER 02 — WHITE FLAMINGO. The signature chapter.
 *
 * THE SCENE: a white deck curving out toward a coral sunset — unchanged.
 *
 * COMPOSITION — this chapter is the one that has to feel expensive, so it
 * carries the LEAST copy of the four, not the most. An earlier pass ran the
 * whole Saturday as eight prose beats and it read as an itinerary; this is
 * the rewrite of that.
 *
 * Its own idea — no other chapter does this — is the DAY / NIGHT SPLIT: the
 * day genuinely divides at the moment everyone changes into white, so the
 * two halves sit either side of a centre rule with the ALL WHITE stamp on the
 * seam. That single device replaces a seven-stop arrow chain, three detail
 * boxes and five paragraphs, and says the same thing.
 *
 * Everything else stays centred and airy exactly as before: slate, mark,
 * dominant WHITE / FLAMINGO, one-line hook, one moment, one handwritten note.
 */
export function ChapterFlamingo() {
  const moment = ch.story?.[0];

  return (
    <Scene scene={ch.scene} chapterId={ch.id} className="justify-center">
      <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col items-center justify-center py-8 text-center">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        <Reveal delay={0.06}>
          <FlamingoMark className="mx-auto mt-7 h-11 w-auto text-[#FF8FB0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:h-14" />
        </Reveal>

        {/* the dominant mark on the page */}
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,13.5vw,7.8rem)] uppercase leading-[0.84] tracking-[-0.015em] text-sand drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
            {ch.titleLines[0]}
            <br />
            {ch.titleLines[1]}
          </h2>
        </Reveal>

        {/* the whole day, in one line */}
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-[26ch] font-serif text-[clamp(1.3rem,4.6vw,2.1rem)] italic leading-[1.15] text-[#FFE9A8] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            {ch.tagline}
          </p>
        </Reveal>

        {/* ---------------- THE DAY / NIGHT SPLIT ---------------- */}
        <Reveal delay={0.24}>
          <div className="mx-auto mt-12 w-full max-w-[46rem]">
            <div className="grid items-start gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-7">
              <div className="text-left sm:text-right">
                <SceneDetail k={ch.details[0].k} v={ch.details[0].v} accent="#FFE9A8" />
              </div>

              {/* the seam — where everyone changes into white */}
              <div className="flex flex-row items-center justify-center gap-4 sm:flex-col sm:gap-3 sm:self-stretch">
                <span className="hidden w-px flex-1 bg-sand/25 sm:block" aria-hidden />
                <Stamp color="#FFE9A8" rotate={-3} className="shrink-0">
                  {flamingoLook.stamp}
                </Stamp>
                <span className="hidden w-px flex-1 bg-sand/25 sm:block" aria-hidden />
              </div>

              <div className="text-left">
                <SceneDetail k={ch.details[1].k} v={ch.details[1].v} accent="#FFE9A8" />
              </div>
            </div>

            <p className="mt-6 text-[clamp(0.9rem,2.2vw,1rem)] leading-tight text-sand/60">{flamingoLook.line}</p>
          </div>
        </Reveal>

        {/* the one moment — the Dil Chahta Hai beat */}
        {moment?.kind === "moment" && (
          <Reveal delay={0.3}>
            <p className="mx-auto mt-11 max-w-[30ch] font-serif text-[clamp(1.1rem,3.2vw,1.45rem)] italic leading-[1.3] text-sand">
              {moment.line}
            </p>
          </Reveal>
        )}

        <Note className="mx-auto mt-7 block max-w-[34ch] text-[clamp(1.05rem,3vw,1.3rem)] text-sand/60" rotate={-2}>
          {ch.note}
        </Note>
      </div>
    </Scene>
  );
}

/**
 * Drawn, not iconographic — one continuous body line, a bent neck, a heavy
 * beak and two legs that don't quite match. Stroked rather than filled so it
 * sits in the same ink-on-paper family as the Brush marks.
 */
function FlamingoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 110" className={className} fill="none" aria-hidden focusable="false">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 62 C14 52 18 38 32 35 C46 32 58 40 58 52 C58 62 48 70 36 70 L26 70" />
        <path d="M34 35 C33 24 36 14 45 11 C53 8 60 12 60 18 C60 23 55 26 50 24" />
        <path d="M60 18 L70 22 L58 25" />
        <path d="M33 70 L31 96 L24 100" />
        <path d="M45 69 L49 92" />
      </g>
      <circle cx="54" cy="17" r="1.8" fill="currentColor" />
    </svg>
  );
}
