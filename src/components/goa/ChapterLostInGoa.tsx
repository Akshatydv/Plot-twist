"use client";

import { chapters, route, theNight } from "@/content/goa";
import { Note, Stamp } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Arrow } from "../Brush";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[2];

/**
 * CHAPTER 03 — LOST IN GOA.
 *
 * THE SCENE, THE ASYMMETRY, THE QUICK ROUTE STRIP — all unchanged. This
 * chapter now carries a full day (a narrative, five stop cards, a whole
 * unplanned-night beat), so what changed is what happens BELOW the header:
 *
 *   - the story reads left-aligned prose inside a column that itself sits on
 *     the right of the frame (`lg:ml-auto`) — the same "right-weighted
 *     asymmetric layout, ordinary-reading-direction type" the header already
 *     used, just carried down into the new copy;
 *   - the two moments that ask for emphasis reuse exactly the treatment built
 *     for White Flamingo's — a bordered pull-quote for the place-name run,
 *     and a Stamp for the "Nobody argues." punchline — so the two
 *     story-heavy chapters read as one family rather than two inventions;
 *   - THE ROUTE keeps its existing horizontal scroll mechanic untouched, now
 *     seven stops instead of five, with the same five stops elaborated
 *     underneath as SceneDetail cards — a quick chain, then the detail;
 *   - THE NIGHT is new: its own labelled beat, deliberately unresolved
 *     (a stack of questions, not answers) because the day itself is.
 */
export function ChapterLostInGoa() {
  return (
    <Scene scene={ch.scene} chapterId={ch.id}>
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        <div className="mt-4 grid gap-7 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-14">
          {/* No details row here any more — Sunday prescribes nothing, and
              the tagline already carries "No dress code". The column is kept
              so the headline stays pushed right, off the road in the photo. */}
          {ch.details.length > 0 && (
            <Reveal delay={0.18} className="order-2 lg:order-1">
              <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {ch.details.map((d) => (
                  <SceneDetail key={d.k} k={d.k} v={d.v} accent="#5FD9A8" />
                ))}
              </div>
            </Reveal>
          )}

          <div className="order-1 lg:order-2 lg:text-right">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.6rem,13vw,7.2rem)] uppercase leading-[0.84] tracking-[-0.015em] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
                {ch.titleLines[0]}
                <br />
                <span className="text-[#5FD9A8]">{ch.titleLines[1]}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 font-serif text-[clamp(1.2rem,4vw,1.9rem)] italic leading-[1.16] text-[#FFE9A8] drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] lg:ml-auto lg:max-w-[22ch]">
                {ch.tagline}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---------------- THE DAY, AS A STORY ---------------- */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-7 max-w-[46ch] space-y-4 lg:ml-auto lg:mr-0">
            {ch.story?.map((beat, i) => {
              if (beat.kind === "p") {
                return (
                  <p key={i} className="text-left text-[clamp(0.95rem,2.3vw,1.08rem)] leading-[1.55] text-sand/80">
                    {beat.text}
                  </p>
                );
              }

              // the drive/reply exchange — same Stamp treatment as White Flamingo's punchline
              if (beat.reply) {
                return (
                  <div key={i} className="flex flex-col items-center gap-3 py-1 text-center">
                    <p className="font-serif text-[clamp(1.2rem,3.6vw,1.6rem)] italic leading-[1.15] text-sand">
                      {beat.line}
                    </p>
                    <Stamp color="#5FD9A8" rotate={2}>
                      {beat.reply}
                    </Stamp>
                  </div>
                );
              }

              // the place-name run — a bordered pull-quote, same language as Flamingo's Chapora line
              return (
                <div key={i} className="border-l-2 border-[#5FD9A8]/70 py-0.5 pl-4 text-left sm:pl-5">
                  <p className="font-serif text-[clamp(1.05rem,3vw,1.3rem)] italic leading-[1.35] text-[#5FD9A8]">
                    {beat.line}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ---------------- THE ROUTE, as a road ---------------- */}
        <Reveal delay={0.1}>
          <div className="mt-9 border-t border-sand/20 pt-6">
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracked text-[#5FD9A8]">THE ROUTE</span>
              <Arrow color="#5FD9A8" className="h-6 w-8 rotate-[100deg] opacity-60" />
            </div>

            {/* scrolls rather than wraps — a route that wraps is a list again */}
            <div className="-mx-5 mt-4 sm:-mx-8 lg:mx-0">
              <Stagger
                className="flex items-center gap-2 overflow-x-auto px-5 pb-2 sm:gap-3 sm:px-8 lg:px-0 [&::-webkit-scrollbar]:hidden"
                gap={0.07}
              >
                {route.map((stop, i) => (
                  <StaggerItem key={stop} className="shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="whitespace-nowrap font-display text-[clamp(0.85rem,2.8vw,1.15rem)] uppercase leading-none text-sand">
                        {stop}
                      </span>
                      {i < route.length - 1 && (
                        <span className="block w-5 border-t-2 border-dashed border-sand/45 sm:w-8" aria-hidden />
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>

        {/* ---------------- THE NIGHT — deliberately unresolved ----------------
            Two lines. The options read as one shrug rather than a stacked
            menu, because nobody has decided them yet — that's the joke. */}
        <Reveal delay={0.12}>
          <div className="mt-8 border-t border-sand/20 pt-6 lg:text-right">
            <span className="text-[9px] tracked text-[#5FD9A8]">{theNight.label}</span>

            <p className="mt-3 font-display text-[clamp(1.05rem,3.2vw,1.45rem)] uppercase leading-tight text-sand/85 lg:ml-auto lg:max-w-[34ch]">
              {theNight.options}
            </p>

            <p className="mt-2.5 font-serif text-[clamp(1rem,2.8vw,1.25rem)] italic leading-[1.3] text-[#FFE9A8] lg:ml-auto lg:max-w-[34ch]">
              {theNight.resolve}
            </p>
          </div>
        </Reveal>

        <Note className="mt-6 block text-center text-[clamp(1.15rem,3.4vw,1.5rem)] text-sand/60" rotate={-2}>
          {ch.note}
        </Note>
      </div>
    </Scene>
  );
}
