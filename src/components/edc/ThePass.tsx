"use client";

import { festival, pass, TBA } from "@/content/thailand";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { CredChip, GateSlate } from "./Neon";

/**
 * THE PASS — the page's least-designed section, on purpose.
 *
 * This is Goa's THE CALL SHEET, and it works for exactly the same reason:
 * everything above it is trying to make someone feel something; this one is
 * trying to be believed, and the CONTRAST is the trust signal. After the
 * hero, the board, the drop and the daylight break, a plain document reads as
 * the one section not selling to them.
 *
 * So there is no laser here, no sweep, no haze, and no glow. That absence is
 * the design.
 *
 * ─── THE THREE UNCONFIRMED THINGS ───────────────────────────────────────────
 * Trip length, price and inclusions do not exist yet, and this component
 * renders none of them. It shows an honest "not announced yet" with a way to
 * ask. All three switch on from content/thailand.ts the moment real values
 * exist — no change is needed in here.
 *
 * On inclusions specifically: whether the EDC ticket itself is part of the
 * package is unsettled, and it is the single most consequential thing a
 * visitor would otherwise assume. It is therefore named in the pending copy
 * rather than left to inference.
 *
 * ─── THE DISCLAIMER ─────────────────────────────────────────────────────────
 * MANDATORY, and it renders here rather than in the footer because this is
 * the section a visitor actually reads for facts. It states plainly that Plot
 * Twist is not a partner, sponsor, organiser, reseller or affiliate of EDC,
 * EDC Thailand or Insomniac. Do not move it, shrink it below this size, or
 * drop its contrast.
 */
export function ThePass() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const askHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(pass.whatsappText)}`
    : null;

  const priceValue = pass.price.confirmed && pass.price.amount ? pass.price.amount : pass.price.pending;
  const priceNote = pass.price.confirmed && pass.price.amount ? pass.price.note : pass.price.pendingNote;

  return (
    <section id="pass" className="relative overflow-hidden bg-[#0a0414] px-5 py-14 sm:px-8 lg:px-14">
      <div className="relative mx-auto max-w-[1000px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <GateSlate index={pass.index} label={pass.label} />
            <Reveal>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,5.2vw,2.8rem)] uppercase leading-[0.94] text-sand">
                {pass.headline[0]} {pass.headline[1]}
              </h2>
            </Reveal>
          </div>
          <Note className="text-[clamp(1.05rem,3vw,1.35rem)] text-sand/45" rotate={-2}>
            {pass.annotation}
          </Note>
        </div>

        {/* ---------------- the stub ---------------- */}
        <Reveal delay={0.06}>
          <div className="mt-8 border border-sand/15 bg-[#170727]">
            {/* credential header — machine print, deliberately flat */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-dashed border-sand/20 px-4 py-3 sm:px-6">
              <span className="edc-meta">
                {pass.credential.holder} — <span className="text-sand/85">{pass.credential.holderValue}</span>
              </span>
              <span className="edc-meta">
                {pass.credential.gate} — <span className="text-sand/85">{pass.credential.gateValue}</span>
              </span>
              <span className="edc-meta">
                {pass.credential.serial} · {festival.coordinates}
              </span>
            </div>

            <div className="px-4 py-6 sm:px-6 sm:py-7">
              {/* ---------------- the six basics ---------------- */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-x-8">
                {pass.basics.map((row) => (
                  <div key={row.k}>
                    <dt className="edc-meta !text-[9px]">{row.k}</dt>
                    <dd
                      className={`mt-1 font-display text-[clamp(0.95rem,2.6vw,1.2rem)] leading-tight tracking-[0.02em] ${
                        // Any unconfirmed value in the grid greys out rather than
                        // sitting at the same weight as a fact. Nothing is TBA in here
                        // today, but the moment a field goes back to pending it reads
                        // as pending without a second edit.
                        String(row.v) === TBA ? "text-sand/40" : "text-sand"
                      }`}
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* ---------------- the two that matter ---------------- */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="border-l-2 border-[var(--edc-hot)]/70 pl-4">
                  <span className="edc-meta !text-[9px] !text-[var(--edc-hot)] !opacity-100">
                    {pass.selection.k}
                  </span>
                  <p className="mt-1 text-[clamp(0.95rem,2.4vw,1.05rem)] leading-[1.4] text-sand/85">
                    {pass.selection.v}
                  </p>
                </div>

                <div className="border-l-2 border-pink/70 pl-4">
                  <span className="edc-meta !text-[9px] !text-pink !opacity-100">THE DAMAGE</span>
                  <p className="mt-1 font-display text-[clamp(1rem,2.8vw,1.25rem)] leading-tight tracking-[0.02em] text-sand/60">
                    {priceValue}
                  </p>
                  {priceNote && <p className="mt-0.5 text-[0.86rem] leading-tight text-sand/50">{priceNote}</p>}
                </div>
              </div>

              {/* ---------------- inclusions ---------------- */}
              <div className="mt-7 border-t border-sand/12 pt-5">
                {pass.inclusions.confirmed ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="edc-meta !text-[9px]">INCLUDED</span>
                      <ul className="mt-2 space-y-1.5">
                        {pass.inclusions.included.map((i) => (
                          <li key={i} className="flex gap-2.5 text-[0.95rem] leading-tight text-sand/80">
                            <span className="text-[var(--edc-blush)]" aria-hidden>
                              ✓
                            </span>
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="edc-meta !text-[9px]">NOT INCLUDED</span>
                      <ul className="mt-2 space-y-1.5">
                        {pass.inclusions.excluded.map((i) => (
                          <li key={i} className="flex gap-2.5 text-[0.95rem] leading-tight text-sand/60">
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
                  <p className="max-w-[62ch] text-[0.92rem] leading-[1.5] text-sand/65">
                    {pass.inclusions.pending}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <CredChip color="#FF2E7E">{pass.stamp}</CredChip>
                  {askHref && (
                    <a
                      href={askHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
                      className="text-[11px] font-semibold tracked text-sand/65 underline decoration-sand/25 underline-offset-4 transition-colors hover:text-sand"
                    >
                      {pass.cta}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* the tear edge — what makes this a stub rather than a card */}
            <div className="edc-perf" aria-hidden />
          </div>
        </Reveal>

        {/* ---------------- the affiliation disclaimer ----------------
            Full contrast, plain type, directly under the facts. Mandatory —
            see the affiliation rule at the top of content/thailand.ts. */}
        <Reveal delay={0.12}>
          <div className="mt-6 border-l-2 border-sand/25 pl-4">
            <p className="max-w-[78ch] text-[0.85rem] leading-[1.55] text-sand/60">{pass.disclaimer}</p>
            <a
              href={festival.source.href}
              target="_blank"
              rel="noreferrer"
              className="edc-meta mt-2 inline-block !text-[9px] underline underline-offset-4 hover:!opacity-100"
            >
              {festival.source.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
