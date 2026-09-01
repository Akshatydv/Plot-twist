"use client";

import { chapters } from "@/content/goa";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[1];

/**
 * CHAPTER 02 — WHITE FLAMINGO. The premium one.
 *
 * THE SCENE: a white deck curving out toward a coral sunset over open water.
 *
 * COMPOSITION — CENTRED, and the only centred chapter of the four. Bollywood
 * before it is bottom-left and dense; this is middle-of-frame and sparse, so
 * scrolling from one to the other feels like stepping out of a club into
 * daylight. That contrast is the strongest transition on the page.
 *
 * It also carries the LEAST copy of any chapter — one line, two details, no
 * card row — because the brief for this one is to let it breathe. Adding a
 * third element here would cost more than it added.
 *
 * Its scrim is the lightest of the four (see content/goa.ts): this is the one
 * scene whose whole point is that it stays bright.
 */
export function ChapterFlamingo() {
  return (
    <Scene scene={ch.scene} chapterId={ch.id} className="justify-center">
      <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col items-center justify-center py-6 text-center">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        <Reveal delay={0.06}>
          <FlamingoMark className="mx-auto mt-7 h-12 w-auto text-[#FF8FB0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:h-16" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,13.5vw,7.8rem)] uppercase leading-[0.84] tracking-[-0.015em] text-sand drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
            {ch.titleLines[0]}
            <br />
            {ch.titleLines[1]}
          </h2>
        </Reveal>

        {/* the one line — the most spaced-out type on the page */}
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-[20ch] font-serif text-[clamp(1.3rem,5vw,2.3rem)] italic leading-[1.12] text-[#FFE9A8] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            {ch.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mx-auto mt-5 max-w-[44ch] text-[clamp(0.95rem,2.3vw,1.1rem)] leading-[1.5] text-sand/85">
            {ch.body[0]}
          </p>
        </Reveal>

        {/* two details only, centred, wide apart */}
        <Reveal delay={0.28}>
          <div className="mx-auto mt-10 grid w-full max-w-[34rem] gap-6 text-left sm:grid-cols-2 sm:gap-10">
            {ch.details.map((d) => (
              <SceneDetail key={d.k} k={d.k} v={d.v} accent="#FFE9A8" />
            ))}
          </div>
        </Reveal>

        <Note className="mx-auto mt-8 block max-w-[30ch] text-[clamp(1.05rem,3vw,1.3rem)] text-sand/60" rotate={-2}>
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
