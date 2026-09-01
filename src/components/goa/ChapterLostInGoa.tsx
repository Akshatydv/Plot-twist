"use client";

import { chapters, route } from "@/content/goa";
import { Note } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Arrow } from "../Brush";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[2];

/**
 * CHAPTER 03 — LOST IN GOA.
 *
 * THE SCENE: shot through a windscreen on a palm-lined coast road, so the
 * viewer is IN the car rather than looking at a picture of one.
 *
 * COMPOSITION — bottom-RIGHT weighted, mirroring Bollywood's bottom-left, so
 * two dark-ish chapters two apart don't sit in the same place on screen. The
 * road in the photograph runs up the middle, and the copy deliberately keeps
 * clear of it.
 *
 * Its own element is the ROUTE, drawn here as a horizontal road across the
 * bottom of the frame rather than the vertical list this chapter used before —
 * horizontal because the scene is already a road running away from you, and a
 * vertical list fought it.
 */
export function ChapterLostInGoa() {
  return (
    <Scene scene={ch.scene} chapterId={ch.id}>
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        <div className="mt-4 grid gap-7 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-14">
          {/* details first on desktop — pushes the title right, off the road */}
          <Reveal delay={0.18} className="order-2 lg:order-1">
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
              {ch.details.map((d) => (
                <SceneDetail key={d.k} k={d.k} v={d.v} accent="#5FD9A8" />
              ))}
            </div>
            <Note className="mt-6 block text-[1.3rem] text-sand/60" rotate={-2}>
              {ch.note}
            </Note>
          </Reveal>

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

            <Reveal delay={0.18}>
              <p className="mt-4 max-w-[42ch] text-[clamp(0.95rem,2.3vw,1.08rem)] leading-[1.5] text-sand/80 lg:ml-auto">
                {ch.body[0]}
              </p>
            </Reveal>
          </div>
        </div>

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
      </div>
    </Scene>
  );
}
