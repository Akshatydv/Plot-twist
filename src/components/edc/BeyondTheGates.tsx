"use client";

import { beyond, stickers } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { GateSlate, LightPlate } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * BEYOND THE GATES — the one bright screen on the page.
 *
 * ─── WHY IT EXISTS ──────────────────────────────────────────────────────────
 * Three reasons, in order of importance:
 *
 *   1. Six consecutive black sections flatten into one long section, and THE
 *      DROP stops reading as a peak. A page needs somewhere to breathe out.
 *      This is the same alternation rule stated at the top of GoaPage.tsx —
 *      light and dark alternate — applied to a page whose default is dark.
 *   2. It delivers the day → night contrast the brief asks for, in one cut.
 *   3. It is the only place Thailand-the-country gets to be beautiful without
 *      competing with the festival for the visitor's attention.
 *
 * It is followed immediately by a hard return to black, so the last thing
 * before the ask is night again.
 *
 * ─── THE PHOTOGRAPHY ────────────────────────────────────────────────────────
 * Every `src` here is null. See public/photos/thailand/PHOTOS.md — nothing in
 * this repo is a licensed Thailand photograph, and guessing is exactly the
 * mistake public/photos/goa/PHOTOS.md exists to prevent. Each slot renders a
 * designed plate carrying its own caption and timestamp; drop in a file, set
 * `src`, and the photograph takes over with no change to this component.
 *
 * The frames are scattered rather than gridded — four different aspect
 * ratios, four different vertical offsets — so that once real photographs
 * land it reads as a pile of prints rather than a card grid. That is the
 * scrapbook logic the Goa home-base board already uses.
 */
export function BeyondTheGates() {
  return (
    <section
      id="beyond"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{
        // The one warm, sunlit surface. Deliberately the site's own sand
        // palette rather than a new one — this is the moment the page rejoins
        // the Goa/Bali world for a screen.
        background:
          "radial-gradient(120% 90% at 18% 0%, #fff1dc 0%, #ffe6c4 46%, #ffd9b0 78%, #f7c9a4 100%)",
      }}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      {/* The one sticker on the light section — filled, so it reads on sand. */}
      <Sticker className="right-[5%] top-[8%] hidden lg:block" rotate={-7} color="#FF2E7E" fg="#FFF1DC">
        {stickers.beyond}
      </Sticker>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-[46rem]">
            {/* The slate goes ink-on-sand here — it is the same element, on
                the one section where the canvas inverts. */}
            <div className="[&_.edc-meta]:!text-ink [&_.edc-meta]:!opacity-60">
              <GateSlate index={beyond.index} label={beyond.label} meta="DAYLIGHT" />
            </div>
            <Reveal>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,6.6vw,3.8rem)] uppercase leading-[0.94] text-ink">
                {beyond.headline[0]}
                <br />
                <span className="text-pink">{beyond.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[46ch] font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-[1.25] text-ink/75">
                {beyond.sub}
              </p>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.4rem)] text-ink/45" rotate={-3}>
            {beyond.annotation}
          </Note>
        </div>

        {/* The pile. Offsets and rotations are per-frame so no two prints sit
            the same way — the imperfection is the point. */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {beyond.frames.map((f, i) => (
            <Reveal
              key={f.id}
              delay={i * 0.07}
              className={i % 2 === 1 ? "lg:mt-12" : i === 2 ? "lg:mt-5" : ""}
            >
              {/*
                `.pin` reserves 2.6rem under the print for the handwritten
                scrap. A note that wraps to two lines needs more than that, and
                without it the second line hangs out of the frame and collides
                with the print below — so a note-bearing print gets a deeper
                bottom margin rather than the note being trimmed to fit.
              */}
              <div
                className="pin relative"
                style={{
                  rotate: `${[-2.2, 1.6, -1.1, 2.4][i % 4]}deg`,
                  paddingBottom: f.note ? "3.4rem" : undefined,
                }}
              >
                <LightPlate
                  src={f.src}
                  alt={f.alt}
                  caption={f.caption}
                  stamp={f.stamp}
                  aspect={f.aspect}
                  seed={i}
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 40vw, 22vw"
                  className="w-full"
                />
                {/* the handwritten scrap on the print's white border */}
                {f.note && (
                  <span className="absolute bottom-2 left-3 right-3 block font-hand text-[0.98rem] leading-[1.15] text-ink/70">
                    {f.note}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
