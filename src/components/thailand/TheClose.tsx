"use client";

import { WhatsATen } from "@/components/WhatsATen";
import { cast, faq, lineup, pass, preRegister } from "@/content/thailand";
import { close } from "@/content/chaos";
import { Focus, MaskLines } from "../bir/Scenery";

/**
 * THE BILL, AND EVERYTHING AFTER THE FILM.
 *
 * ─── WHAT WAS MISSING, AND WHY IT MATTERED MORE THAN THE FILM ───────────────
 * The rebuilt page had seven worlds, five crossings, a portal and no PRODUCT.
 * No lineup, no casting board, no inclusions, no details, no form. A visitor
 * could be moved by it and then have nowhere to go, which makes the whole
 * cinematic half decoration rather than persuasion.
 *
 * The house order, from every one of these pages, is: the dream first, then the
 * plain facts, then the ask. Bir ends on THE RECAP → THE DETAILS → FINAL CTA →
 * THE APPLICATION. Sri Lanka ends on Included → ForWho → the casting board →
 * TheDetails → FinalCta → the form. This is that, for Thailand.
 *
 * ─── WHY THIS SECTION IS VISUALLY QUIET ─────────────────────────────────────
 * Deliberately. By the time anyone reaches it they have been through a portal,
 * seven worlds and a festival; the job here is not to impress them again, it is
 * to answer the questions that are now in their head. Bir's details section is
 * bone paper and plain for exactly this reason. Loud here would read as a sales
 * page trying to close, which is the one register this brand does not use.
 */

/* ------------------------------------------------------------------ */
/* the bill                                                            */
/* ------------------------------------------------------------------ */

/**
 * THE LINEUP — the receipt for the claim World 05 just made.
 *
 * It belongs directly after the three festival nights because seven names a
 * visitor already knows do more to make "EDC THAILAND" concrete than any
 * adjective could, and they land hardest AFTER the emotional claim: putting the
 * bill first would spend the proof before the promise.
 *
 * Set in Anton, because this is inside the festival register — a bill is a
 * poster, and every real lineup drop on earth is typographic.
 */
export function Bill() {
  return (
    <section
      id="bill"
      aria-label="The lineup"
      className="relative overflow-hidden bg-[#0A0414] px-5 py-24 sm:px-8 sm:py-28 lg:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(110% 70% at 50% 0%, rgba(255,46,126,0.16) 0%, rgba(10,4,20,0) 62%)" }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#FF2E7E]">{lineup.label}</p>
        <MaskLines
          lines={lineup.headline}
          as="h2"
          className="mt-4 font-display text-[clamp(2.4rem,9vw,6.4rem)] uppercase leading-[0.88] text-sand"
        />
        <Focus delay={0.15}>
          <p className="mt-5 text-[clamp(1rem,2.4vw,1.15rem)] text-sand/70">{lineup.sub}</p>
        </Focus>

        {/* The headliners, one per line, alternating sides. A centred block is a
            poster; staggered, the eye travels and it reads as a bill being
            called out. */}
        <ol className="mt-14 border-t border-sand/15">
          {lineup.headliners.map((h, i) => (
            <li key={h.name} className="border-b border-sand/15">
              <div className={`flex flex-wrap items-baseline gap-x-5 py-4 ${i % 2 ? "justify-end text-right" : ""}`}>
                <span className="font-display text-[clamp(1.6rem,6vw,3.4rem)] uppercase leading-none text-sand">
                  {h.name}
                </span>
                <span className="text-[9px] tracked text-sand/45">{h.tag}</span>
              </div>
            </li>
          ))}
        </ol>

        <Focus delay={0.2}>
          <p className="mt-10 max-w-[70ch] text-[0.95rem] leading-[1.7] tracking-[0.04em] text-sand/60">{lineup.more}</p>
        </Focus>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {lineup.stages.map((st) => (
            <span key={st} className="text-[10px] tracked text-sand/45">
              {st}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-[64ch] text-[11px] leading-[1.6] text-sand/45">{lineup.sourceNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the facts                                                           */
/* ------------------------------------------------------------------ */

/** What the trip is, plainly, in the order somebody asks. */
export function TheDetails() {
  return (
    <section id="details" className="relative bg-[#0C0910] px-5 py-24 sm:px-8 sm:py-28 lg:px-14">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-sand/55">{pass.label}</p>
        <MaskLines
          lines={["WHAT IT IS,", "PLAINLY."]}
          as="h2"
          className="mt-4 font-serif text-[clamp(2.2rem,7vw,4.6rem)] italic leading-[0.94] text-sand"
        />

        <dl className="mt-12 grid gap-x-12 gap-y-7 border-t border-sand/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {pass.basics.map((b) => (
            <div key={b.k}>
              <dt className="text-[9px] tracked text-sand/45">{b.k}</dt>
              <dd className="mt-2 font-display text-[clamp(1.05rem,2.6vw,1.4rem)] uppercase text-sand">{b.v}</dd>
            </div>
          ))}
          <div>
            <dt className="text-[9px] tracked text-sand/45">{pass.selection.k}</dt>
            <dd className="mt-2 text-[0.98rem] leading-[1.5] text-sand/80">{pass.selection.v}</dd>
          </div>
        </dl>

        {/* Included / not included. The exclusion column is not small print —
            on a page that names a festival, "the ticket is not in this" is the
            single assumption most likely to cost somebody money. */}
        <div className="mt-16 grid gap-10 border-t border-sand/15 pt-10 lg:grid-cols-2">
          <div>
            <p className="text-[9px] tracked text-[#79C8BE]">INCLUDED</p>
            <ul className="mt-5 space-y-3">
              {pass.inclusions.included.map((i) => (
                <li key={i} className="flex gap-3 text-[0.98rem] leading-[1.5] text-sand/85">
                  <span className="text-[#79C8BE]">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] tracked text-[#FF2E7E]">NOT INCLUDED</p>
            <ul className="mt-5 space-y-3">
              {pass.inclusions.excluded.map((i) => (
                <li key={i} className="flex gap-3 text-[0.98rem] leading-[1.5] text-sand/85">
                  <span className="text-[#FF2E7E]">×</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The money line. Nothing is on sale, so this states the status rather
            than a number — the current instruction on this campaign. */}
        <div className="mt-14 border-t border-sand/15 pt-10">
          <p className="font-serif text-[clamp(1.4rem,4vw,2.2rem)] italic text-sand">{close.status}</p>
        </div>

        <p className="mt-12 max-w-[78ch] text-[11px] leading-[1.7] text-sand/40">{pass.disclaimer}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the questions                                                       */
/* ------------------------------------------------------------------ */

/**
 * Every question here is an objection somebody would otherwise have to message
 * to resolve. The three that matter most — not official, nothing on sale,
 * pre-registering books nothing — are the ones a sales page buries.
 */
export function TheFaq() {
  return (
    <section id="faq" className="relative bg-[#08060B] px-5 py-24 sm:px-8 sm:py-28 lg:px-14">
      <div className="mx-auto w-full max-w-[920px]">
        <p className="text-[10px] tracked text-sand/55">{faq.label}</p>
        <MaskLines
          lines={faq.headline}
          as="h2"
          className="mt-4 font-serif text-[clamp(2.2rem,7vw,4.4rem)] italic leading-[0.94] text-sand"
        />

        <dl className="mt-12 border-t border-sand/15">
          {faq.items.map((q) => (
            <div key={q.q} className="border-b border-sand/15 py-7">
              <dt className="font-display text-[clamp(1.05rem,2.8vw,1.45rem)] uppercase leading-[1.15] text-sand">
                {q.q}
              </dt>
              <dd className="mt-3 max-w-[62ch] text-[0.98rem] leading-[1.6] text-sand/70">{q.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the people                                                          */
/* ------------------------------------------------------------------ */

/**
 * THE CASTING BOARD — 10 AND 10, and the 10/10s line.
 *
 * This is the SHARED component Goa, Bali and the live EDC page all run. It is
 * mounted here unchanged, in `night` tone, for the reason stated on every one
 * of those pages: one form, one table, one admin, one casting concept.
 * Reinterpreting it per destination is explicitly the thing not to do.
 *
 * It sits after the festival and before the facts, because the argument this
 * page is making is festival → people → logistics, in that order.
 */
export function TheCast() {
  return <WhatsATen compact composition={cast.composition} bridge={cast.bridge} index="06" tone="night" />;
}

/* ------------------------------------------------------------------ */
/* the ask                                                             */
/* ------------------------------------------------------------------ */

/** The masthead returns, and the only action on the page. */
export function FinalCta() {
  return (
    <section id="pre-register" className="relative bg-[#08060B] px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto w-full max-w-[52rem]">
        <p className="font-serif text-[clamp(2rem,7vw,4.2rem)] italic leading-[0.95] text-sand">
          {close.masthead[0]}
          <br />
          {close.masthead[1]}
        </p>
        <Focus delay={0.15}>
          <p className="mt-8 font-display text-[clamp(1.2rem,3.6vw,1.9rem)] uppercase text-sand">
            {preRegister.headline.join(" ")}
          </p>
          <p className="mx-auto mt-4 max-w-[46ch] text-[clamp(0.98rem,2.3vw,1.1rem)] leading-[1.55] text-sand/70">
            {preRegister.sub}
          </p>
        </Focus>
        <Focus delay={0.3}>
          <ul className="mx-auto mt-7 max-w-[46ch] space-y-2">
            {preRegister.reassure.map((r) => (
              <li key={r} className="text-[0.95rem] text-sand/55">
                {r}
              </li>
            ))}
          </ul>
        </Focus>
        <p className="mt-10 font-serif text-[clamp(1.2rem,3.4vw,1.7rem)] italic text-sand/55">{close.line}</p>
      </div>
    </section>
  );
}
