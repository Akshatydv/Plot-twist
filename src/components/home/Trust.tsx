"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trustSection } from "@/content/home";
import { brand, contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { InstagramLink } from "../InstagramLink";
import { Stamp } from "../Bits";

const ease = [0.22, 1, 0.36, 1] as const;

/** One trip, as the ledger prints it. Derived from WORLDS on the server — see HomePage. */
export type LedgerRow = {
  key: string;
  label: string;
  href: string | null;
  journeyId: string | null;
  /** "OCT 2026" / "20–24 NOV 2026" — null prints as TBA. */
  dates: string | null;
  duration: string | null;
  /** "₹14,999" — null prints as TBA. */
  price: string | null;
  status: { label: string; open: boolean };
  /** The trip's own footnote, verbatim from its page. */
  fineprint: string | null;
};

/**
 * THE SMALL PRINT, PRINTED LARGE — the landing page's trust section.
 *
 * ─── WHAT IT DELIBERATELY DOES NOT HAVE ─────────────────────────────────────
 * No faces, no star ratings, no "1,000+ travellers", no testimonials. None of
 * that is true yet and this site's rule is that nothing is invented. A brand
 * with no track record earns trust a different way: by being unusually
 * specific about how it works, in the open, before anyone has paid anything.
 *
 * ─── WHAT IT HAS INSTEAD ────────────────────────────────────────────────────
 * Left: five plain promises about how applying works, each in the site's own
 * words (content/site.ts `trust`). Right: a RECEIPT — every trip's published
 * dates, length and price, plus the footnote that trip's own page carries
 * ("flights aren't included", "you buy the festival pass from the organiser").
 * Showing the exclusions loudly is the trust move: it is what a business that
 * has nothing to hide does and a brochure does not. The receipt is built from
 * the same data as the journey cards, so it cannot disagree with them.
 *
 * Paper, ink and one pink: after four full-bleed worlds the page needs to be
 * plain on purpose, and plainness is what reads as honest.
 */
export function Trust({ ledger }: { ledger: LedgerRow[] }) {
  const reduce = useReducedMotion();
  const t = trustSection;

  // The WhatsApp link only exists if a number is configured: a button that
  // opens an empty chat is worse than no button (same rule as the tea cup).
  const wa = contact.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.prefill)}`
    : null;

  return (
    <section id={t.id} className="paper relative overflow-hidden px-5 py-24 text-ink sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-ink/60">
          <span className="h-px w-10 bg-ink/40" /> {t.eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.8rem,10vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">
          {t.headline[0]}
          <br />
          <span className="font-serif normal-case italic tracking-[-0.02em] text-pink">{t.headline[1]}</span>
        </h2>
        <p className="mt-6 max-w-[34ch] font-serif text-[clamp(1.2rem,3.4vw,1.6rem)] leading-[1.25] text-ink/75">{t.intro}</p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_27rem] lg:items-start lg:gap-20">
          {/* ---------------------------------------------------- the promises */}
          <ol className="border-t border-ink/20">
            {t.promises.map((p, i) => (
              <motion.li
                key={p.n}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-dashed border-ink/25 py-7 sm:gap-x-8 sm:py-8"
                initial={reduce ? undefined : { opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease, delay: i * 0.04 }}
              >
                <span className="font-display text-[clamp(1.6rem,5vw,2.6rem)] leading-none text-pink">{p.n}</span>
                <div>
                  <h3 className="flex items-start justify-between gap-4 font-display text-[clamp(1.3rem,4.2vw,2.1rem)] uppercase leading-[1.02]">
                    {p.title}
                    <Tick delay={0.25 + i * 0.04} reduce={Boolean(reduce)} />
                  </h3>
                  <p className="mt-2.5 max-w-[44ch] text-[clamp(1rem,2.6vw,1.1rem)] leading-[1.5] text-ink/72">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* ------------------------------------------------------ the receipt */}
          <motion.div
            className="relative mx-auto w-full max-w-[27rem] lg:sticky lg:top-24"
            initial={reduce ? undefined : { opacity: 0, y: -36, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.2 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          >
            <div
              className="relative bg-[#fffaf2] px-6 pb-4 pt-8 shadow-[0_28px_50px_-22px_rgba(43,15,28,0.55)] sm:px-7"
              style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.05), 0 28px 50px -22px rgba(43,15,28,0.55)" }}
            >
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden />

              <header className="border-b-2 border-ink pb-4 text-center">
                <p className="font-display text-[1.7rem] leading-none tracking-[0.04em]">{brand.name}</p>
                <p className="mt-2 text-[10px] font-semibold tracked text-ink/60">{t.ledger.title}</p>
                <p className="mt-1 font-serif text-[0.95rem] italic text-ink/65">{t.ledger.sub}</p>
              </header>

              <ul>
                {ledger.map((row, i) => {
                  const body = (
                    <>
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-[1.35rem] uppercase leading-none tracking-[0.02em] transition-colors group-hover:text-pink">
                          {row.label}
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5 text-[9px] font-semibold tracked text-ink/55">
                          {row.status.open && <span className="block h-1.5 w-1.5 rounded-full bg-pink" aria-hidden />}
                          {row.status.label}
                        </span>
                      </span>

                      <span className="mt-2.5 grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 text-[12px] font-medium uppercase tracking-[0.12em] tabular-nums">
                        <span className="text-ink/60">{row.dates ?? "TBA"}</span>
                        <span className="text-right text-ink/60">{row.duration ?? "TBA"}</span>
                        <span className="text-ink/60">PER PERSON</span>
                        <span className={`text-right font-display text-[1.25rem] tracking-[0.02em] ${row.price ? "text-ink" : "text-ink/35"}`}>
                          {row.price ?? "TBA"}
                        </span>
                      </span>

                      {row.fineprint && (
                        <span className="mt-2.5 block border-l-2 border-pink pl-3 font-serif text-[0.95rem] italic leading-[1.35] text-ink/72">
                          {row.fineprint}
                        </span>
                      )}
                    </>
                  );
                  const cls = "group block py-4 outline-none";
                  return (
                    <motion.li
                      key={row.key}
                      className={i < ledger.length - 1 ? "border-b border-dashed border-ink/30" : ""}
                      initial={reduce ? undefined : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.12 }}
                    >
                      {row.href ? (
                        <Link
                          href={row.href}
                          className={cls}
                          onClick={() => track(PLOT_EVENTS.enterJourney, { journey_id: row.journeyId, from: "ledger" })}
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className={cls}>{body}</div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <footer className="border-t-2 border-ink pt-4 text-center">
                <p className="font-hand text-[1.4rem] leading-none text-pink">{t.ledger.footnote}</p>
                <Barcode />
              </footer>

              {/* the torn edge */}
              <span
                className="absolute inset-x-0 -bottom-[9px] h-[10px]"
                style={{
                  background:
                    "linear-gradient(135deg,#fffaf2 5px,transparent 0) 0 0/14px 10px repeat-x, linear-gradient(225deg,#fffaf2 5px,transparent 0) 0 0/14px 10px repeat-x",
                }}
                aria-hidden
              />
            </div>

            <div className="pointer-events-none absolute -right-3 top-24 z-10 sm:-right-6">
              <Stamp rotate={9} color="#FF4F87" className="bg-[#fffaf2]/85 text-[12px] backdrop-blur-[1px]">
                {t.ledger.stamp}
              </Stamp>
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------- the ask */}
        <div className="mt-24 flex flex-col gap-8 border-t-2 border-ink pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-[clamp(2rem,6vw,3.6rem)] uppercase leading-[0.92]">
              {t.ask.headline[0]}
              <br />
              <span className="text-pink">{t.ask.headline[1]}</span>
            </h3>
            <p className="mt-3 max-w-[32ch] font-serif text-[1.15rem] italic leading-[1.25] text-ink/70">{t.ask.sub}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
                className="group inline-flex touch-manipulation items-center gap-3 bg-ink px-7 py-4 text-[13px] font-semibold uppercase tracked text-sand shadow-[6px_6px_0_0_#FF4F87] transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
              >
                {t.ask.whatsapp}
                <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                  ↗
                </span>
              </a>
            )}
            <InstagramLink
              href={brand.instagramUrl}
              className="border-b border-ink/50 pb-1 text-[12px] font-medium uppercase tracked text-ink transition-colors hover:border-pink hover:text-pink"
            >
              {t.ask.instagram} {brand.instagram} →
            </InstagramLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A hand-drawn tick that draws itself — the same device as the casting sheet's checkboxes. */
function Tick({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-pink sm:h-7 sm:w-7" aria-hidden>
      <motion.path
        d="M3 13 L9 19 L21 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

/** Decorative: a receipt ends in a barcode. It encodes nothing and is hidden from assistive tech. */
function Barcode() {
  const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2];
  return (
    <div className="mx-auto mt-4 flex h-9 items-stretch justify-center gap-[2px]" aria-hidden>
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w }} />
      ))}
    </div>
  );
}
