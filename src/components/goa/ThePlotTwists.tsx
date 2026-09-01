"use client";

import { plotTwists } from "@/content/goa";
import { Note, SectionLabel } from "../Bits";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { MarkerUnderline } from "../Brush";

/**
 * THE PLOT TWISTS — transparency and mystery in the same section.
 *
 * The left column lists everything confirmed, plainly and without adjectives,
 * because a cold visitor deciding whether to pay needs to see the actual
 * contents. The right column withholds exactly one thing.
 *
 * The kept mystery is about WHAT happens, never about where — the destination
 * question is settled in the hero and stays settled. It is also never hinted
 * at: a hint invites guessing, and guessing is the mechanic this page
 * deliberately parked.
 *
 * The redaction bar reuses the case-file vocabulary the clue cards used, which
 * is how a parked idea keeps paying rent.
 */
export function ThePlotTwists() {
  return (
    <section
      id="plot-twists"
      className="relative overflow-hidden px-5 py-16 text-sand sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(120% 90% at 80% 0%, #24122b 0%, #170a17 55%, #100409 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1100px]">
        <SectionLabel index={plotTwists.index} label={plotTwists.label} color="#FFF1DC" />

        <Reveal className="mt-7">
          <h2 className="max-w-[20ch] font-display text-[clamp(1.7rem,6vw,3.2rem)] uppercase leading-[0.98] text-sand/70">
            {plotTwists.headline[0]}
            <br />
            <span className="relative inline-block text-sand">
              {plotTwists.headline[1]}
              <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-full" />
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* ---- what's on it ---- */}
          <div>
            <Reveal>
              <span className="text-[10px] tracked text-sand/45">ON THE ITINERARY</span>
            </Reveal>

            <Stagger className="mt-5 grid gap-x-8 gap-y-0 sm:grid-cols-2" gap={0.05}>
              {plotTwists.onIt.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-baseline gap-3 border-b border-sand/12 py-3">
                    <span className="font-display text-[13px] leading-none text-[#36C96F]" aria-hidden>
                      ✓
                    </span>
                    <span className="text-[clamp(0.98rem,2.4vw,1.1rem)] leading-tight text-sand/85">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* ---- what isn't ---- */}
          <Reveal delay={0.1}>
            <div className="relative border-2 border-sand/20 bg-ink/40 p-6 sm:p-8" style={{ rotate: "-1deg" }}>
              <span className="tape absolute -top-3 right-8 h-5 w-16 rotate-3" aria-hidden />

              <span className="text-[10px] tracked text-sand/45">NOT ON IT</span>

              <h3 className="mt-4 font-display text-[clamp(1.8rem,6.5vw,2.8rem)] uppercase leading-none text-[#FFE9A8]">
                {plotTwists.offIt.title}
              </h3>

              <p className="mt-4 max-w-[30ch] text-[clamp(1rem,2.4vw,1.15rem)] leading-[1.45] text-sand/80">
                {plotTwists.offIt.body}
              </p>

              {/*
                The redaction. Rendered as text inside an aria-hidden span with
                a screen-reader alternative beside it, so a non-visual user gets
                "one detail is withheld" rather than a run of block characters.
              */}
              <div className="mt-6 inline-block bg-sand/90 px-3 py-1.5">
                <span className="select-none font-display text-[clamp(0.9rem,3vw,1.15rem)] leading-none tracking-[0.1em] text-ink" aria-hidden>
                  {plotTwists.offIt.redacted}
                </span>
                <span className="sr-only">One experience is deliberately not listed.</span>
              </div>

              <Note className="mt-6 block text-[1.35rem] text-pink" rotate={-2}>
                {plotTwists.offIt.note}
              </Note>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
