"use client";

import { chapters } from "@/content/goa";
import { Note, Stamp } from "../Bits";
import { Reveal } from "../motion";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[3];

/**
 * CHAPTER 04 — THE HANGOVER CLUB. The end credits.
 *
 * THE SCENE: empty poolside loungers in warm hazy light. Chosen for the EMPTY
 * chairs specifically — that is what makes it read as the morning after rather
 * than as a resort advert.
 *
 * COMPOSITION — still the softest of the four, unchanged in spirit: type sits
 * low with air above it, so the scroll decelerates into the end of the story.
 * What's new is two closing exchanges (the "leaving." reveal, the "same
 * people next time?" callback) between the details grid and the taped strip —
 * same moment/Stamp treatment White Flamingo and Lost in Goa already use, so
 * the three story-heavy chapters read as one family.
 *
 * The taped strip stays the true final element — a torn piece of the site's
 * paper laid over the photograph, the one place the scrapbook vocabulary
 * lands directly on top of a scene. It's the last thing before the page turns
 * to asking for something.
 */
export function ChapterHangoverClub() {
  return (
    <Scene scene={ch.scene} chapterId={ch.id}>
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14">
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.3rem,11.5vw,6.4rem)] uppercase leading-[0.86] tracking-[-0.015em] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
                {ch.titleLines[0]}
                <br />
                <span className="text-[#FFC46B]">{ch.titleLines[1]}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[22ch] font-serif text-[clamp(1.25rem,4.2vw,2rem)] italic leading-[1.14] text-[#FFE9A8] drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                {ch.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-4 max-w-[40ch] space-y-2.5 text-[clamp(0.95rem,2.3vw,1.08rem)] leading-[1.5] text-sand/80">
                {ch.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
              {ch.details.map((d) => (
                <SceneDetail key={d.k} k={d.k} v={d.v} accent="#FFC46B" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------------- the two closing exchanges ---------------- */}
        {ch.story && ch.story.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-9 space-y-6 border-t border-sand/20 pt-7">
              {ch.story.map((beat, i) =>
                beat.kind === "moment" ? (
                  <div key={i} className="flex flex-col items-center gap-3 text-center">
                    <p className="max-w-[34ch] font-serif text-[clamp(1.15rem,3.6vw,1.6rem)] italic leading-[1.2] text-sand">
                      {beat.line}
                    </p>
                    {beat.reply && (
                      <Stamp color="#FFC46B" rotate={i % 2 ? 3 : -3}>
                        {beat.reply}
                      </Stamp>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </Reveal>
        )}

        {/*
          THE TAPED STRIP — the one place the site's paper lands directly on
          top of a photograph. The end-credit line, torn out and stuck on.
        */}
        <Reveal delay={0.1}>
          <div className="relative mt-10 inline-block max-w-full">
            <div
              className="paper grain relative px-6 py-4 shadow-[0_20px_44px_-24px_rgba(0,0,0,0.85)] sm:px-9 sm:py-5"
              style={{ rotate: "-1.2deg" }}
            >
              <span className="tape absolute -top-3 left-8 h-5 w-16 -rotate-3" aria-hidden />
              <span className="tape absolute -bottom-3 right-10 h-5 w-14 rotate-2" aria-hidden />
              <Note className="block text-[clamp(1.3rem,5vw,2.3rem)] text-ink" rotate={0}>
                {ch.note}
              </Note>
            </div>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
