"use client";

import { plot, stickers } from "@/content/thailand";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { GateSlate, Haze, HoloPanel, LaserSweep } from "./Neon";
import { Sticker } from "./Sticker";

/**
 * THE PLOT — why Plot Twist, as four credentials.
 *
 * ─── THE COPY CONSTRAINT ────────────────────────────────────────────────────
 * The brief was explicit that this must never read corporate: no "premium
 * packages", no "personalised service", no "seamless experience". So every
 * panel is a statement about people, or about what is deliberately NOT
 * planned. Nothing here claims a service level that isn't already true
 * elsewhere on this site.
 *
 * The second panel is the one that earns the section. It says out loud that
 * EDC is one chapter of four and that a page pretending otherwise would be
 * selling a ticket the visitor can buy themselves. Conceding that is what
 * makes the other three panels believable — it is the same move Goa's call
 * sheet makes by being the plainest section on its page.
 *
 * ─── WHY PANELS AND NOT A GRID OF CARDS ─────────────────────────────────────
 * A laminate has an edge, a sheen and translucency; a card has a background.
 * The distinction matters here because this is the section most at risk of
 * collapsing into a generic four-up feature grid, which is the shape the rest
 * of the site spends its whole design system avoiding.
 */
export function ThePlot() {
  return (
    <section
      id="why"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #170727 55%, #0a0414 100%)" }}
    >
      <LaserSweep className="right-[-28%] opacity-55" slow />
      <Haze className="-left-16 bottom-10 h-72 w-72 opacity-30" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <Sticker className="left-[4%] bottom-[8%] hidden lg:block" rotate={-11} color="#FF7FA8" variant="outline">
        {stickers.plot}
      </Sticker>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <GateSlate index={plot.index} label={plot.label} meta="ACCESS: ALL AREAS" />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.4vw,4.4rem)] uppercase leading-[0.9] text-sand">
                {plot.headline[0]}
                <br />
                <span className="text-[var(--edc-hot)] edc-glow-hot">{plot.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[42ch] font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-[1.25] text-sand/75">
                {plot.sub}
              </p>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-sand/45" rotate={-2}>
            {plot.annotation}
          </Note>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {plot.panels.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.07}>
              <HoloPanel accent={p.accent} className="h-full p-5 sm:p-6">
                <div className="relative flex items-start gap-3">
                  <span
                    className="mt-[0.45em] h-px w-6 shrink-0"
                    style={{ background: p.accent }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3
                      className="font-display text-[clamp(1rem,2.6vw,1.25rem)] uppercase leading-tight tracking-[0.04em]"
                      style={{ color: p.accent }}
                    >
                      {p.k}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.45] text-sand/80">{p.v}</p>
                  </div>
                </div>
                {/* credential serial, bottom-right — the small technical tell */}
                <span className="edc-meta absolute bottom-2.5 right-3 !text-[8px] !opacity-35">
                  {String(i + 1).padStart(2, "0")} / {String(plot.panels.length).padStart(2, "0")}
                </span>
              </HoloPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
