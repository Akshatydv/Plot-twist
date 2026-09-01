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
 * ─── THE TWO UNCONFIRMED FACTS ──────────────────────────────────────────────
 * Price and the included/excluded list do not exist anywhere in this project,
 * so this component renders neither. It shows an honest "not announced yet"
 * with a way to ask instead.
 *
 * That is a deliberate product decision, not an oversight: a plausible-looking
 * number on a page that asks for a phone number would be an invented
 * commitment. Both switch on from content/goa.ts the moment real values exist
 * — no change is needed here.
 * ────────────────────────────────────────────────────────────────────────────
 */
export function TheFacts() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const askHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent("Hey Plot Twist 👀 what's the damage for Goa?")}`
    : null;

  return (
    <section id="facts" className="paper relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
      <div className="relative mx-auto max-w-[1000px]">
        <SectionLabel index={facts.index} label={facts.label} />

        <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,7.6vw,4rem)] uppercase leading-[0.92] text-ink">
              {facts.headline[0]}
              <br />
              {facts.headline[1]}
            </h2>
          </Reveal>
          <Note className="text-[clamp(1.15rem,3.4vw,1.5rem)] text-ink/45" rotate={-2}>
            {facts.annotation}
          </Note>
        </div>

        {/* the confirmed rows — a document, not a card grid */}
        <Reveal delay={0.1}>
          <dl className="mt-10 border-t-2 border-ink/20">
            {facts.rows.map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 border-b border-ink/12 py-4 sm:flex-row sm:items-baseline sm:gap-8 sm:py-3.5"
              >
                <dt className="shrink-0 text-[10px] tracked text-ink/45 sm:w-[9.5rem]">{row.k}</dt>
                <dd className="font-display text-[clamp(1.05rem,3vw,1.35rem)] leading-tight tracking-[0.02em] text-ink">
                  {row.v}
                </dd>
              </div>
            ))}

            {/* ---- price ---- */}
            <div className="flex flex-col gap-1 border-b border-ink/12 py-4 sm:flex-row sm:items-baseline sm:gap-8 sm:py-3.5">
              <dt className="shrink-0 text-[10px] tracked text-ink/45 sm:w-[9.5rem]">THE DAMAGE</dt>
              <dd className="font-display text-[clamp(1.05rem,3vw,1.35rem)] leading-tight tracking-[0.02em] text-ink">
                {facts.price.confirmed && facts.price.amount ? (
                  <>
                    {facts.price.amount}
                    {facts.price.note && (
                      <span className="ml-2 font-sans text-[0.8em] font-normal tracking-normal text-ink/55">
                        {facts.price.note}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-ink/55">
                    {facts.price.pending}
                    <span className="ml-2 font-sans text-[0.8em] font-normal tracking-normal text-ink/45">
                      {facts.price.pendingNote}
                    </span>
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* ---- inclusions ---- */}
        <Reveal delay={0.16}>
          {facts.inclusions.confirmed ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <span className="text-[10px] tracked text-ink/45">INCLUDED</span>
                <ul className="mt-3 space-y-2">
                  {facts.inclusions.included.map((i) => (
                    <li key={i} className="flex gap-2.5 text-[0.98rem] leading-tight text-ink/80">
                      <span className="text-[#1f7a45]" aria-hidden>✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] tracked text-ink/45">NOT INCLUDED</span>
                <ul className="mt-3 space-y-2">
                  {facts.inclusions.excluded.map((i) => (
                    <li key={i} className="flex gap-2.5 text-[0.98rem] leading-tight text-ink/60">
                      <span className="text-pink" aria-hidden>×</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="mt-8 max-w-[52ch] text-[0.98rem] leading-[1.5] text-ink/60">
              {facts.inclusions.pending}
            </p>
          )}
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Stamp color="#00A9C7">{facts.rows[6]?.v ? "EVERY APPLICATION READ BY A HUMAN" : "CURATED"}</Stamp>
          {askHref && (
            <a
              href={askHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
              className="text-[11px] font-semibold tracked text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              ASK US ANYTHING →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
