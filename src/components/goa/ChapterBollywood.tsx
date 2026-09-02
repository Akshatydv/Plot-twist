"use client";

import { motion, useReducedMotion } from "framer-motion";
import { bollywoodLook, chapters, roleCall } from "@/content/goa";
import { Note, Stamp } from "../Bits";
import { Reveal } from "../motion";
import { Scene, SceneDetail, SceneSlate } from "./Scene";

const ch = chapters[0];

/**
 * CHAPTER 01 — BOLLYWOOD AFTER DARK.
 *
 * THE SCENE: a red club, crowd in silhouette. Everything is laid onto it.
 *
 * COMPOSITION — bottom-left weighted, the way a film title card is. The scene
 * photograph carries its light in the upper middle, so the copy stacks from
 * the bottom edge upward and never fights it. The Role Call cards run along
 * the bottom as a single scrolling row rather than a grid, because a grid
 * would read as a UI panel dropped on a photo.
 *
 * This is the only chapter with the alter-ego cards. See the other three for
 * how differently each one is composed — that difference is the whole point.
 */
export function ChapterBollywood() {
  const reduce = useReducedMotion();

  return (
    <Scene scene={ch.scene} chapterId={ch.id}>
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <SceneSlate day={ch.day} index={ch.index} />
        </Reveal>

        {/* the title, set as large as the frame allows */}
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,13vw,7.4rem)] uppercase leading-[0.84] tracking-[-0.015em] text-sand drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
            {ch.titleLines[0]}
            <br />
            <span className="text-[#FF6B96]">{ch.titleLines[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-7 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[24ch] font-serif text-[clamp(1.2rem,4vw,1.95rem)] italic leading-[1.16] text-[#FFE9A8] drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                {ch.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-4 max-w-[40ch] space-y-2.5 text-[clamp(0.95rem,2.3vw,1.08rem)] leading-[1.5] text-sand/80">
                {ch.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>

            <Note className="mt-5 block text-[1.3rem] text-sand/60" rotate={-3}>
              {ch.note}
            </Note>
          </div>

          {/* the details, written into the scene rather than boxed — with the
              dress code stamped above them, the same device White Flamingo
              uses for ALL WHITE */}
          <Reveal delay={0.2}>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Stamp color="#FF6B96" rotate={-3}>
                  {bollywoodLook.stamp}
                </Stamp>
                <span className="font-hand text-[clamp(1.05rem,3vw,1.3rem)] leading-none text-sand/65">
                  {bollywoodLook.line}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6">
                {ch.details.map((d) => (
                  <SceneDetail key={d.k} k={d.k} v={d.v} accent="#FF6B96" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- THE ROLE CALL ---------------- */}
        <Reveal delay={0.1}>
          <div className="mt-9 border-t border-sand/20 pt-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-[clamp(1.1rem,4vw,1.6rem)] uppercase leading-none text-[#FFE9A8]">
                {roleCall.title}
              </h3>
              <p className="font-hand text-[clamp(1.05rem,3vw,1.3rem)] leading-none text-sand/65">{roleCall.sub}</p>
            </div>

            {/*
              One horizontal row that scrolls on small screens instead of
              wrapping into a block — a wrapped grid of six reads as a card
              deck pasted over the photo, a single row reads as a strip of
              names inside the scene. Scrollbar hidden, edge faded.
            */}
            <div className="relative mt-4 -mx-5 sm:-mx-8 lg:mx-0">
              <div className="flex gap-2.5 overflow-x-auto px-5 pb-2 sm:gap-3 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {roleCall.roles.map((role, i) => (
                  <motion.span
                    key={role}
                    className="shrink-0 whitespace-nowrap border border-sand/35 bg-ink/35 px-3 py-2 font-display text-[clamp(0.75rem,2.4vw,0.95rem)] uppercase tracking-[0.05em] text-sand backdrop-blur-sm"
                    style={{ rotate: [-2, 1.5, -1, 2, -1.5, 1][i % 6] }}
                    whileHover={reduce ? undefined : { y: -3, rotate: 0, borderColor: "rgba(255,107,150,0.95)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
