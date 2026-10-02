"use client";

import { motion } from "framer-motion";
import { credits, details, finalCta, footage, forWho, included, photos, slIndex, trip } from "@/content/srilanka";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note, PlotButton, SectionLabel } from "../Bits";
import { Reveal } from "../motion";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";

/**
 * THE CONVERSION — after the film, plainly.
 *
 * The brief's order is the visitor's order: "I want to be there" (the seven
 * worlds) → "who's going?" (who it's for, then the casting board) → "how
 * much?" (the details) → "I'm booking" (the form). Information arrives last,
 * and it arrives calm: paper ground, no motion beyond a reveal, nothing
 * pretending to be cinema.
 */

/* ------------------------------------------------------------------ */
/* what's included                                                     */
/* ------------------------------------------------------------------ */

export function Included() {
  const reduce = useCalm();
  return (
    <section id="included" className="relative bg-[var(--sl-sand)] px-5 py-20 text-[#14110d] sm:px-8 sm:py-28 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel index={slIndex("included")} label={included.label} color="#14110d" />
        <MaskLines lines={[included.headline]} className="mt-8 max-w-[18ch] font-serif text-[clamp(2.4rem,6.6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]" />

        <dl className="mt-14 grid border-t border-[#14110d]/15 sm:grid-cols-2">
          {included.items.map((it, i) => (
            <motion.div
              key={it.k}
              className="flex gap-5 border-b border-[#14110d]/15 py-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
            >
              <span className="font-display text-[1.1rem] leading-none text-[#c4862c]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <dt className="text-[11px] font-semibold tracked">{it.k}</dt>
                <dd className="mt-1.5 text-[1.02rem] leading-[1.5] text-[#14110d]/70">{it.v}</dd>
              </div>
            </motion.div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {!included.confirmed && <p className="max-w-[52ch] font-hand text-[1.3rem] leading-tight text-[#14110d]/55">{included.pending}</p>}
          <p className="text-[12px] leading-[1.6] text-[#14110d]/55">
            <span className="font-semibold tracked text-[#14110d]/70">NOT INCLUDED · </span>
            {included.excluded.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* who is this for                                                     */
/* ------------------------------------------------------------------ */

export function ForWho() {
  return (
    <section className="relative overflow-hidden bg-[#07090a] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel index={slIndex("for")} label={forWho.label} color="#F4EDE1" />
        <MaskLines
          lines={[forWho.lead]}
          className="mt-8 max-w-[20ch] font-serif text-[clamp(2.6rem,7.4vw,6.2rem)] italic leading-[0.95] tracking-[-0.02em] text-[var(--sl-bone)]"
        />
        <ul className="mt-14 space-y-1">
          {forWho.lines.map((l, i) => (
            <Focus key={l} delay={i * 0.06}>
              <li className="border-b border-white/10 py-5 font-serif text-[clamp(1.35rem,3.2vw,2.3rem)] leading-[1.15] text-[var(--sl-bone)]/85">
                <span className="mr-4 font-display text-[0.75em] text-[var(--sl-saffron)]">→</span>
                {l}
              </li>
            </Focus>
          ))}
        </ul>
        <p className="mt-10 max-w-[60ch] font-hand text-[1.5rem] leading-tight text-[var(--sl-bone)]/55">{forWho.not}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the details                                                         */
/* ------------------------------------------------------------------ */

export function TheDetails() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const askHref = number ? `https://wa.me/${number}?text=${encodeURIComponent(details.whatsapp)}` : null;
  const P = details.price;

  return (
    <section id="details" className="relative overflow-hidden bg-[var(--sl-bone)] px-5 py-20 text-[#07090a] sm:px-8 sm:py-28 lg:px-14">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel index={slIndex("details")} label={details.label} color="#07090a" />
          <Note className="text-[1.3rem] text-[#07090a]/45" rotate={-2}>
            {details.scribble}
          </Note>
        </div>

        <Reveal>
          <h2 className="mt-8 font-display text-[clamp(3.6rem,15vw,13rem)] leading-[0.82] tracking-[-0.01em]">{details.headline}</h2>
          <p className="mt-3 text-[11px] font-semibold tracked text-[#07090a]/55">{details.sub}</p>
        </Reveal>

        {/* the route, as a line */}
        <Reveal delay={0.08}>
          <ol className="mt-10 flex items-center gap-1.5 sm:gap-3" aria-label={`Route: ${trip.route.join(", ")}`}>
            {trip.route.map((stop, i) => (
              <li key={`${stop}-${i}`} className="flex flex-1 items-center gap-1.5 last:flex-none sm:gap-3">
                <span className="flex flex-col items-start">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 || i === trip.route.length - 1 ? "bg-[#07090a]" : "bg-[#F2A23A]"}`} />
                  <span className="mt-2 text-[8px] font-semibold tracked sm:text-[11px]">{stop}</span>
                </span>
                {i < trip.route.length - 1 && <span aria-hidden className="mb-5 h-px flex-1 bg-[#07090a]/25" />}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t-2 border-[#07090a]/15 pt-8 sm:grid-cols-3">
            {details.basics.map((row) => (
              <div key={row.k}>
                <dt className="text-[9px] tracked text-[#07090a]/45">{row.k}</dt>
                <dd className="mt-1 font-serif text-[clamp(1.2rem,2.6vw,1.7rem)] leading-tight">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 grid gap-8 border-t border-[#07090a]/15 pt-10 sm:grid-cols-[1.2fr_1fr] sm:items-end">
            <div>
              <span className="text-[9px] tracked text-[#c4862c]">THE DAMAGE</span>
              <p className="mt-2 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.85]">{P.confirmed && P.amount ? P.amount : P.pending}</p>
              <p className="mt-3 max-w-[44ch] text-[0.98rem] leading-[1.5] text-[#07090a]/60">{P.confirmed && P.amount ? P.note : P.pendingNote}</p>
            </div>
            <div className="border-l-2 border-[#1f4d3a] pl-4">
              <span className="text-[9px] tracked text-[#1f4d3a]">SELECTION</span>
              <p className="mt-1 leading-[1.45] text-[#07090a]/85">{details.selection}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <PlotButton href="#apply" bg="#07090a" fg="#F4EDE1" shadow="#F2A23A" event={PLOT_EVENTS.requestInvite}>
              {details.cta}
            </PlotButton>
            {askHref && (
              <a
                href={askHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
                className="text-[11px] font-semibold tracked text-[#07090a]/60 underline decoration-[#07090a]/25 underline-offset-4 hover:text-[#07090a]"
              >
                {details.ask}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the final cta                                                       */
/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-24 sm:px-8 lg:px-14">
      <Footage slot={finalCta.slot} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07090a]/85 via-[#07090a]/45 to-[#07090a]/15" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <MaskLines lines={finalCta.headline} className="font-display text-[clamp(3.6rem,13vw,11.5rem)] uppercase leading-[0.84] text-[var(--sl-bone)]" />
        <Focus delay={0.4}>
          <p className="mt-6 max-w-[40ch] font-serif text-[clamp(1.3rem,3vw,2rem)] italic text-[var(--sl-bone)]/85">{finalCta.sub}</p>
        </Focus>
        <Focus delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <PlotButton href={finalCta.primary.href} bg="#F2A23A" fg="#07090a" shadow="#F4EDE1" event={PLOT_EVENTS.requestInvite}>
              {finalCta.primary.label}
            </PlotButton>
            <a href={finalCta.secondary.href} className="text-[11px] font-semibold tracked text-[var(--sl-bone)]/75 underline decoration-[var(--sl-bone)]/30 underline-offset-[6px] hover:text-[var(--sl-bone)]">
              {finalCta.secondary.label} <span aria-hidden>↑</span>
            </a>
          </div>
        </Focus>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the credits                                                         */
/* ------------------------------------------------------------------ */

/**
 * Every photograph and clip on the page, its author and its licence. Not
 * decoration: CC BY and BY-SA are only licences on the condition that the
 * author, source and licence are named where the work is shown.
 */
export function PhotoCredits() {
  const all = [...Object.values(photos), ...Object.values(footage)];
  return (
    <section className="bg-[#07090a] px-5 py-6 sm:px-8 lg:px-14">
      <details className="group mx-auto max-w-[1200px] text-[#F4EDE1]/45">
        <summary className="cursor-pointer list-none text-[9px] font-semibold tracked hover:text-[#F4EDE1]/70">
          {credits.label} <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </summary>
        <p className="mt-3 max-w-[80ch] text-[0.7rem] leading-[1.5]">{credits.note}</p>
        <ul className="mt-2 columns-1 gap-8 text-[0.65rem] leading-[1.5] sm:columns-2 lg:columns-3">
          {all.map((c) => (
            <li key={c.file} className="break-inside-avoid">
              <a href={c.source} target="_blank" rel="noreferrer" className="underline decoration-[#F4EDE1]/20 underline-offset-2 hover:text-[#F4EDE1]">
                {c.title}
              </a>{" "}
              — {c.author},{" "}
              <a href={c.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-[#F4EDE1]/20 underline-offset-2 hover:text-[#F4EDE1]">
                {c.license}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
