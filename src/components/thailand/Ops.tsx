"use client";

import { atAGlance, dayLog, festivalGuide, payments } from "@/content/thailand-ops";
import { Focus, MaskLines } from "../bir/Scenery";

/**
 * LAYER 2 — THE PRACTICAL HALF OF THE ITINERARY.
 *
 * The seven worlds above sell the week and are deliberately free of logistics.
 * These three sections are what a careful reader goes looking for after they
 * have been sold: the whole trip on one line, the days as a working schedule,
 * and the festival nights said plainly.
 *
 * ─── WHY THEY LOOK NOTHING LIKE A TRAVEL-AGENCY TABLE ────────────────────────
 * A competitor's itinerary puts "INCLUDED TODAY" chips on every page and it
 * works because it answers the question. The chip is not the lesson; the
 * answer is. So the answers are here, and the form is this page's own:
 *
 *   AT A GLANCE   a ruled ledger set in Anton, like a boarding card
 *   THE LOG       the only BONE-PAPER section after the film — a printed
 *                 itinerary, the one object people actually fold and carry
 *   THE NIGHTS    four plain columns on black, because the festival nights are
 *                 the part of this trip that is serious
 *
 * Every word is in content/thailand-ops.ts. Nothing here is typed in a
 * component, and nothing there is invented — see the note at the top of it.
 */

/* ------------------------------------------------------------------ */
/* at a glance                                                         */
/* ------------------------------------------------------------------ */

export function AtAGlance() {
  return (
    <section
      id="at-a-glance"
      aria-label={atAGlance.label}
      className="relative overflow-hidden bg-[#0B0910] px-5 py-20 sm:px-8 sm:py-24 lg:px-14"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#FF9E7A]">{atAGlance.label}</p>

        <dl className="mt-8 grid border-t border-sand/25 sm:grid-cols-2 lg:grid-cols-3">
          {atAGlance.items.map((it, i) => (
            <Focus key={it.k} delay={0.04 * (i % 4)}>
              <div className="border-b border-sand/15 py-5 sm:pr-6">
                <dt className="text-[9px] tracked text-sand/45">{it.k}</dt>
                <dd className="mt-2 font-display text-[clamp(1.05rem,2.4vw,1.45rem)] uppercase leading-[1.1] text-sand">
                  {it.v}
                </dd>
              </div>
            </Focus>
          ))}
        </dl>

        <p className="mt-5 text-[11px] leading-[1.5] text-sand/45">{atAGlance.caveat}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the day log                                                         */
/* ------------------------------------------------------------------ */

/** One labelled cell of a day: MORNING / AFTERNOON / EVENING. */
function Part({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[9px] tracked text-[#1B1B1B]/50">{k}</p>
      <p className="mt-2 text-[0.95rem] leading-[1.55] text-[#1B1B1B]/85">{v}</p>
    </div>
  );
}

/** A footer chip: STAY / MOVES / MEALS. */
function Chip({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] tracked text-[#1B1B1B]/45">{k}</p>
      <p className="mt-1 text-[0.9rem] leading-[1.4] text-[#1B1B1B]">{v}</p>
    </div>
  );
}

export function DayLog() {
  return (
    <section
      id="the-log"
      aria-label={dayLog.headline.join(" ")}
      className="relative overflow-hidden bg-[#F1E9DC] px-5 py-24 text-[#1B1B1B] sm:px-8 sm:py-28 lg:px-14"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#1B1B1B]/55">{dayLog.label}</p>
        <MaskLines
          lines={dayLog.headline}
          as="h2"
          className="mt-4 font-serif text-[clamp(2.2rem,7vw,4.8rem)] italic leading-[0.94]"
        />
        <Focus delay={0.1}>
          <p className="mt-5 max-w-[56ch] text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.55] text-[#1B1B1B]/75">
            {dayLog.sub}
          </p>
        </Focus>
        <p className="mt-3 font-hand text-[clamp(1.1rem,3vw,1.5rem)] text-[#1B1B1B]/55">{dayLog.annotation}</p>

        <ol className="mt-12 border-t-2 border-[#1B1B1B]">
          {dayLog.days.map((d) => (
            <li key={d.n} className="border-b border-[#1B1B1B]/25 py-8">
              <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
                {/* the day, ruled like a boarding card */}
                <div>
                  <div className="flex items-baseline gap-4 lg:block">
                    <span className="font-display text-[clamp(2.6rem,8vw,4.4rem)] leading-[0.82] text-[#1B1B1B]/20 lg:block">
                      {d.n}
                    </span>
                    <span className="text-[10px] tracked text-[#1B1B1B]/60 lg:mt-3 lg:block">{d.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[clamp(1.4rem,3.6vw,2rem)] italic leading-[1.02]">{d.name}</h3>
                </div>

                <div>
                  <div className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
                    <Part k="MORNING" v={d.morning} />
                    <Part k="AFTERNOON" v={d.afternoon} />
                    <Part k="EVENING" v={d.evening} />
                  </div>

                  <div className="mt-6 grid gap-x-8 gap-y-4 border-t border-[#1B1B1B]/20 pt-5 sm:grid-cols-3">
                    <Chip k="STAY" v={d.stay} />
                    <Chip k="MOVING" v={d.moves} />
                    {"meals" in d && d.meals ? <Chip k="MEALS" v={d.meals} /> : <Chip k="MEALS" v="Arrival day" />}
                  </div>

                  {/* INCLUDED TODAY / NOT INCLUDED TODAY — the answer a reader
                      reaches for on every day: what is mine and what is not. */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span className="text-[9px] tracked text-[#1B1B1B]/70">INCLUDED TODAY</span>
                    {d.included.map((it) => (
                      <span key={it} className="text-[0.88rem] leading-[1.4] text-[#1B1B1B]/85">
                        <span aria-hidden className="mr-1.5 text-[#2F7A6F]">✓</span>
                        {it}
                      </span>
                    ))}
                  </div>
                  {"notIncluded" in d && d.notIncluded && (
                    <p className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                      <span className="text-[9px] tracked text-[#1B1B1B]/70">NOT INCLUDED</span>
                      <span className="text-[0.88rem] leading-[1.4] text-[#1B1B1B]/85">
                        <span aria-hidden className="mr-1.5 text-[#C2185B]">×</span>
                        {d.notIncluded}
                      </span>
                    </p>
                  )}

                  {"note" in d && d.note && (
                    <p className="mt-5 text-[0.85rem] leading-[1.5] text-[#1B1B1B]/60">
                      <span className="tracked mr-2 text-[9px] text-[#1B1B1B]/70">NOTE</span>
                      {d.note}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[70ch] text-[11px] leading-[1.6] text-[#1B1B1B]/55">{dayLog.timesNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the festival nights                                                 */
/* ------------------------------------------------------------------ */

function Col({
  k,
  items,
  tone,
  note,
}: {
  k: string;
  items: readonly string[];
  tone: string;
  note?: string;
}) {
  return (
    <div className="border-t border-sand/25 pt-5">
      <p className="text-[9px] tracked" style={{ color: tone }}>
        {k}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[0.95rem] leading-[1.45] text-sand/85">
            <span aria-hidden style={{ color: tone }}>
              ·
            </span>
            {it}
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 text-[0.85rem] leading-[1.5] text-sand/55">{note}</p>}
    </div>
  );
}

export function FestivalGuide() {
  const g = festivalGuide;
  return (
    <section
      id="festival-nights"
      aria-label={g.headline.join(" ")}
      className="relative overflow-hidden bg-[#08030F] px-5 py-24 sm:px-8 sm:py-28 lg:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(90% 55% at 80% 0%, rgba(139,61,255,0.16) 0%, rgba(8,3,15,0) 66%)" }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#8B3DFF]">{g.label}</p>
        <MaskLines
          lines={g.headline}
          as="h2"
          className="mt-4 font-display text-[clamp(2.4rem,9vw,6.4rem)] uppercase leading-[0.88] text-sand"
        />
        <Focus delay={0.1}>
          <p className="mt-5 max-w-[52ch] text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.55] text-sand/70">{g.sub}</p>
        </Focus>

        <div className="mt-12 grid gap-x-10 gap-y-10 lg:grid-cols-3">
          <Focus delay={0.05}>
            <Col k={g.trip.k} items={g.trip.items} tone="#79C8BE" />
          </Focus>
          <Focus delay={0.12}>
            <Col k={g.organiser.k} items={g.organiser.items} tone="#FF2E7E" note={g.organiser.note} />
          </Focus>
          <Focus delay={0.19}>
            <Col k={g.advice.k} items={g.advice.items} tone="#FF9E7A" />
          </Focus>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* payment and cancellation                                            */
/* ------------------------------------------------------------------ */

/**
 * HOW YOU PAY, AND WHAT CHANGING YOUR MIND COSTS.
 *
 * Set as two halves, in the order they happen: the two payments, then the
 * three cancellation windows. The windows are a ladder that darkens as it goes
 * — teal, amber, pink — so the reader sees the cost rising before they read a
 * single percentage, which is the whole job of a cancellation table.
 *
 * Deliberately plain and not stern. This is the part of the page a careful
 * reader checks before they commit, and the brand's answer to that reader is
 * to say it straight, once, with the dates written out.
 */
const LADDER: Record<string, string> = { soft: "#79C8BE", firm: "#E8B48A", hard: "#FF2E7E" };

export function Payments() {
  const p = payments;
  return (
    <section
      id="payments"
      aria-label={p.headline.join(" ")}
      className="relative overflow-hidden bg-[#0C0910] px-5 py-24 sm:px-8 sm:py-28 lg:px-14"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <p className="text-[10px] tracked text-[#E8B48A]">{p.label}</p>
        <MaskLines
          lines={p.headline}
          as="h2"
          className="mt-4 font-serif text-[clamp(2.2rem,7vw,4.6rem)] italic leading-[0.94]"
        />
        <Focus delay={0.1}>
          <p className="mt-5 max-w-[56ch] text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.55] text-sand/70">{p.sub}</p>
        </Focus>

        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {/* the two payments */}
          <div className="border-t border-sand/25">
            {p.steps.map((s, i) => (
              <Focus key={s.k} delay={0.08 * i}>
                <div className="border-b border-sand/15 py-7">
                  <p className="text-[9px] tracked text-sand/45">{s.k}</p>
                  <p className="mt-3 font-display text-[clamp(2rem,6vw,3.4rem)] uppercase leading-[0.9] text-sand">
                    {s.v}
                  </p>
                  <p className="mt-3 max-w-[44ch] text-[0.95rem] leading-[1.55] text-sand/70">{s.note}</p>
                </div>
              </Focus>
            ))}
            <p className="mt-6 max-w-[48ch] text-[0.85rem] leading-[1.55] text-sand/55">{p.passNote}</p>
          </div>

          {/* the cancellation ladder */}
          <div>
            <p className="text-[9px] tracked text-sand/45">{p.cancelLabel}</p>
            <ol className="mt-4 border-t border-sand/25">
              {p.cancellations.map((c, i) => (
                <li key={c.when} className="border-b border-sand/15">
                  <Focus delay={0.08 * i}>
                    <div className="grid grid-cols-[4px_1fr] gap-x-5 py-6">
                      <span aria-hidden className="block h-full w-1" style={{ background: LADDER[c.tone] }} />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <div>
                          <p className="text-[0.98rem] leading-[1.4] text-sand">{c.when}</p>
                          <p className="mt-1 text-[10px] tracked text-sand/50">{c.cutoff}</p>
                        </div>
                        <p
                          className="font-display text-[clamp(1.2rem,3.6vw,1.7rem)] uppercase leading-none"
                          style={{ color: LADDER[c.tone] }}
                        >
                          {c.fee}
                        </p>
                      </div>
                    </div>
                  </Focus>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.85rem] leading-[1.55] text-sand/55">{p.feeNote}</p>
            <p className="mt-2 text-[0.85rem] leading-[1.55] text-sand/55">{p.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
