"use client";

import { facts } from "@/content/goa";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note, SectionLabel, Stamp } from "../Bits";
import { Reveal } from "../motion";

/**
 * THE CALL SHEET — the page's least-designed section, on purpose.
 *
 * Everything above this point is trying to make someone feel something. This
 * one is trying to be believed, and the contrast IS the trust signal: after
 * four immersive chapters, a plain document reads as the one section not
 * selling to them.
 *
 * ─── THE RECOMPOSITION ──────────────────────────────────────────────────────
 * It used to run as eight stacked full-width rows — a spec table, and ~450px
 * of one. Now it reads as an actual call sheet:
 *
 *   - the six basics sit in a THREE-COLUMN GRID (two rows, not six), each cell
 *     a small tracked label above its value — the same k/v vocabulary, at a
 *     fraction of the height;
 *   - SELECTION and THE DAMAGE are pulled OUT of the grid as two side-by-side
 *     callouts, because they're the two lines someone actually decides on;
 *   - the inclusions line, the stamp and the WhatsApp CTA collapse into one
 *     footer row instead of three stacked blocks.
 *
 * Same information, same voice, no new facts — roughly half the height.
 *
 * ─── THE TWO UNCONFIRMED FACTS ──────────────────────────────────────────────
 * Price and the included/excluded list do not exist anywhere in this project,
 * so this component renders neither. It shows an honest "not announced yet"
 * with a way to ask instead. Both switch on from content/goa.ts the moment
 * real values exist — no change is needed here.
 * ────────────────────────────────────────────────────────────────────────────
 */
export function TheFacts() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const askHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent("Hey Plot Twist 👀 what's the damage for Goa?")}`
    : null;

  const priceValue =
    facts.price.confirmed && facts.price.amount ? facts.price.amount : facts.price.pending;
  const priceNote =
    facts.price.confirmed && facts.price.amount ? facts.price.note : facts.price.pendingNote;

  return (
    <section id="facts" className="paper relative overflow-hidden px-5 py-11 sm:px-8 sm:py-12 lg:px-14">
      <div className="relative mx-auto max-w-[1000px]">
        {/* masthead — label, headline and aside on ONE line where there's room,
            rather than a stacked block with its own margins */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <SectionLabel index={facts.index} label={facts.label} />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,5.2vw,2.8rem)] uppercase leading-[0.94] text-ink">
                {facts.headline[0]} {facts.headline[1]}
              </h2>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-ink/45" rotate={-2}>
            {facts.annotation}
          </Note>
        </div>

        {/* ---------------- THE SIX BASICS ---------------- */}
        <Reveal delay={0.08}>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t-2 border-ink/20 pt-6 sm:grid-cols-3 sm:gap-x-8">
            {facts.basics.map((row) => (
              <div key={row.k}>
                <dt className="text-[9px] tracked text-ink/45">{row.k}</dt>
                <dd className="mt-1 font-display text-[clamp(1rem,2.8vw,1.25rem)] leading-tight tracking-[0.02em] text-ink">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ---------------- THE TWO THAT MATTER ---------------- */}
        <Reveal delay={0.14}>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* selection */}
            <div className="border-l-2 border-ocean/70 pl-4">
              <span className="text-[9px] tracked text-ocean">{facts.selection.k}</span>
              <p className="mt-1 text-[clamp(0.95rem,2.4vw,1.05rem)] leading-[1.4] text-ink/85">
                {facts.selection.v}
              </p>
            </div>

            {/* the damage */}
            <div className="border-l-2 border-pink/70 pl-4">
              <span className="text-[9px] tracked text-pink">THE DAMAGE</span>
              <p className="mt-1 font-display text-[clamp(1rem,2.8vw,1.25rem)] leading-tight tracking-[0.02em] text-ink">
                {priceValue}
              </p>
              {priceNote && (
                <p className="mt-0.5 text-[0.86rem] leading-tight text-ink/55">{priceNote}</p>
              )}
            </div>
          </div>
        </Reveal>

        {/* ---------------- footer: inclusions + stamp + CTA, one row ---------------- */}
        <Reveal delay={0.2}>
          <div className="mt-7 border-t border-ink/15 pt-5">
            {facts.inclusions.confirmed ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <span className="text-[9px] tracked text-ink/45">INCLUDED</span>
                  <ul className="mt-2 space-y-1.5">
                    {facts.inclusions.included.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[0.95rem] leading-tight text-ink/80">
                        <span className="text-[#1f7a45]" aria-hidden>
                          ✓
                        </span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[9px] tracked text-ink/45">NOT INCLUDED</span>
                  <ul className="mt-2 space-y-1.5">
                    {facts.inclusions.excluded.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[0.95rem] leading-tight text-ink/60">
                        <span className="text-pink" aria-hidden>
                          ×
                        </span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="max-w-[54ch] text-[0.92rem] leading-[1.45] text-ink/60">
                {facts.inclusions.pending}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Stamp color="#00A9C7">{facts.stamp}</Stamp>
              {askHref && (
                <a
                  href={askHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
                  className="text-[11px] font-semibold tracked text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
                >
                  {facts.cta}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
