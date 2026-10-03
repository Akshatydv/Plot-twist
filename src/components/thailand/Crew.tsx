"use client";

import { crew, included, philosophy, worlds } from "@/content/chaos";
import { Focus, MaskLines } from "../bir/Scenery";

/**
 * THE THREE SECTIONS THAT TURN THE FILM INTO AN OFFER.
 *
 * They sit between the last world and the commercial block, in this order:
 *
 *   THE CREW      sixteen people — the thing that is actually scarce
 *   WHAT'S IN     everything the week includes, grouped rather than listed
 *   THE PLOT      the closing argument
 *
 * ─── WHY THE CREW COMES FIRST ───────────────────────────────────────────────
 * Anyone can buy a ticket to EDC Thailand. Nobody can buy the other four days,
 * and nobody can buy the fifteen other people. The scarcity on this trip is the
 * group, so the group is argued before the inclusions rather than listed inside
 * them — a line item cannot carry it.
 */

/* ------------------------------------------------------------------ */
/* the crew                                                            */
/* ------------------------------------------------------------------ */

export function Crew() {
  return (
    <section
      id="crew"
      aria-label={crew.big.join(" ")}
      className="relative overflow-hidden bg-[#0E0A14] px-5 py-24 text-sand sm:px-8 sm:py-28 lg:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(100% 60% at 50% 0%, rgba(255,158,122,0.12) 0%, rgba(14,10,20,0) 64%)" }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#FF9E7A]">{crew.label}</p>
        <MaskLines
          lines={crew.big}
          as="h2"
          className="mt-4 font-display text-[clamp(2.6rem,11vw,7.5rem)] uppercase leading-[0.86]"
        />

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,34ch)_minmax(0,44ch)]">
          <Focus>
            <ul className="space-y-2">
              {crew.lines.map((l) => (
                <li key={l} className="text-[clamp(1.1rem,3vw,1.5rem)] leading-[1.3] text-sand/80">
                  {l}
                </li>
              ))}
            </ul>
          </Focus>
          <Focus delay={0.15}>
            <p className="text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.6] text-sand/85">{crew.body}</p>
            {/* The ceiling is stated, and stated as a ceiling. */}
            <p className="mt-6 text-[11px] leading-[1.5] text-sand/45">{crew.caveat}</p>
          </Focus>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* what's included                                                     */
/* ------------------------------------------------------------------ */

/**
 * GROUPED, NOT LISTED.
 *
 * Fifteen ticks in one column is a packing list and reads as less than it is.
 * Four headed groups — the stay, the moving, the water, the rest — are read as
 * four kinds of thing, which is what makes the week feel full. The festival
 * sits apart from all four because it is the only line somebody might wrongly
 * assume includes a ticket.
 */
export function Included() {
  return (
    <section
      id="included"
      className="relative overflow-hidden bg-[#0C1418] px-5 py-24 text-sand sm:px-8 sm:py-28 lg:px-14"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#79C8BE]">{included.label}</p>
        <MaskLines
          lines={included.title}
          as="h2"
          className="mt-4 font-serif text-[clamp(2rem,6.4vw,4.4rem)] italic leading-[0.96]"
        />
        <Focus delay={0.1}>
          <p className="mt-5 max-w-[52ch] text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.55] text-sand/75">
            {included.sub}
          </p>
        </Focus>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {included.groups.map((g, i) => (
            <Focus key={g.k} delay={0.1 + i * 0.08}>
              <div className="border-t border-sand/25 pt-5">
                <p className="text-[9px] tracked text-[#79C8BE]">{g.k}</p>
                <ul className="mt-4 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.98rem] leading-[1.45] text-sand/90">
                      <span className="text-[#79C8BE]">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Focus>
          ))}
        </div>

        {/* The festival, set apart and in the page's hot colour. */}
        <Focus delay={0.25}>
          <div className="mt-14 border border-[#FF2E7E]/55 bg-[#FF2E7E]/10 px-6 py-7 sm:px-8">
            <p className="text-[9px] tracked text-[#FF2E7E]">{included.festival.k}</p>
            <p className="mt-3 font-display text-[clamp(1.2rem,4vw,2.1rem)] uppercase leading-[1.05]">
              {included.festival.item}
            </p>
            <p className="mt-5 max-w-[64ch] text-[0.95rem] leading-[1.55] text-sand/80">{included.passNote}</p>
          </div>
        </Focus>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the plot twist                                                      */
/* ------------------------------------------------------------------ */

/**
 * The closing argument, and the loudest plain statement on the page. No
 * photograph behind it on purpose: every other section has been a place, and
 * this one is the reason, so it gets nothing to look at except the sentence.
 */
export function Philosophy() {
  return (
    <section
      id="the-plot"
      aria-label={philosophy.lines.join(" ")}
      className="relative overflow-hidden bg-[#08060B] px-5 py-28 text-sand sm:px-8 sm:py-36 lg:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(90% 60% at 50% 50%, rgba(255,46,126,0.14) 0%, rgba(139,61,255,0.08) 45%, rgba(8,6,11,0) 76%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#FF2E7E]">{philosophy.label}</p>

        <MaskLines
          lines={philosophy.lines}
          as="h2"
          className="mt-6 font-serif text-[clamp(2.2rem,8vw,5.6rem)] italic leading-[0.98]"
        />

        <Focus delay={0.2}>
          <div className="mt-12 max-w-[46ch] space-y-1.5">
            {philosophy.body.map((b) => (
              <p key={b} className="text-[clamp(1.05rem,2.8vw,1.35rem)] leading-[1.35] text-sand/80">
                {b}
              </p>
            ))}
          </div>
        </Focus>

        <Focus delay={0.35}>
          <div className="mt-16 border-t border-sand/20 pt-10">
            <p className="text-[10px] tracked text-sand/60">{philosophy.dates}</p>
            <p className="mt-4 font-display text-[clamp(2.4rem,10vw,7rem)] uppercase leading-[0.88]">
              {philosophy.lockup}
            </p>
            <p className="mt-8 max-w-[34ch] font-serif text-[clamp(1.3rem,3.8vw,2.1rem)] italic text-sand/85">
              {philosophy.close}
            </p>
          </div>
        </Focus>
      </div>
    </section>
  );
}

/** The last world, re-exported for the recap's colours. */
export const LAST_WORLD = worlds[worlds.length - 1];
