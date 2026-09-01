"use client";

import { chapters } from "@/content/goa";
import { Note } from "../Bits";
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
 * COMPOSITION — the softest of the four. Where the first three push their type
 * hard into a corner, this one sits low and centred-left with more air above
 * it, so the scroll decelerates into the end of the story rather than
 * finishing on another shout.
 *
 * Its own element is the taped strip — a torn piece of the site's paper laid
 * over the photograph, which is where the scrapbook vocabulary finally lands
 * on top of a scene. It closes on the callback to the hero's promise, and is
 * the last thing before the page turns to asking for something.
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
              <p className="mt-4 max-w-[40ch] text-[clamp(0.95rem,2.3vw,1.08rem)] leading-[1.5] text-sand/80">
                {ch.body[0]}
              </p>
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
