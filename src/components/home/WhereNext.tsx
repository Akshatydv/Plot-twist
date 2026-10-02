"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { whereNext } from "@/content/home";
import type { World } from "@/content/homeWorlds";
import { PLOT_EVENTS, track } from "@/lib/analytics";

/**
 * WHERE SHOULD WE TAKE YOU NEXT — the departures board.
 *
 * The same worlds as CHOOSE YOUR PLOT TWIST, from the same data, now compact
 * enough to compare at a glance. Every row is a link; hovering floods it with
 * that world's colour. A world with no page yet reads COMING SOON and is not
 * a link.
 */
export function WhereNext({ worlds }: { worlds: World[] }) {
  const reduce = useReducedMotion();
  const c = whereNext.columns;

  return (
    <section className="relative overflow-hidden bg-ink px-5 py-24 text-sand sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-sand/60">
          <span className="home-rec block h-1.5 w-1.5 rounded-full bg-tropic" /> {whereNext.eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.8rem,11vw,8rem)] uppercase leading-[0.88]">
          {whereNext.headline[0]}
          <br />
          <span className="text-sunset">{whereNext.headline[1]}</span>
        </h2>

        <div className="mt-14">
          {/* column heads, desktop only */}
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.8fr_1.1fr_auto] gap-6 border-b border-sand/25 pb-3 text-[9px] tracked text-sand/45 lg:grid">
            <span>{c.where}</span>
            <span>{c.when}</span>
            <span>{c.length}</span>
            <span>{c.from}</span>
            <span>{c.status}</span>
            <span className="w-32" />
          </div>

          <ul>
            {worlds.map((w, i) => {
              const row = (
                <>
                  <span
                    className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    style={{ background: w.theme.accent }}
                    aria-hidden
                  />
                  <span className="relative col-span-3 flex items-baseline justify-between gap-4 lg:col-span-1 lg:block">
                    <span className="font-display text-[clamp(2.2rem,8vw,3.6rem)] uppercase leading-none">{w.label.replace(" + ", " + ")}</span>
                    <span className="text-[9px] tracked opacity-60 lg:hidden">{w.status.label}</span>
                  </span>
                  <Cell label={c.when} value={w.datesShort ?? w.dates} />
                  <Cell label={c.length} value={w.duration} />
                  <Cell label={c.from} value={w.price} />
                  <span className="relative hidden items-center gap-2 text-[11px] font-semibold tracked lg:flex">
                    {w.status.open && <span className="home-rec block h-1.5 w-1.5 rounded-full" style={{ background: w.theme.accent }} />}
                    {w.status.label}
                  </span>
                  <span className="relative col-span-3 mt-2 inline-flex items-center whitespace-nowrap lg:w-32 gap-2 text-[11px] font-semibold tracked lg:col-span-1 lg:mt-0 lg:justify-end">
                    {w.href ? (
                      <>
                        {whereNext.cta} <span className="transition-transform group-hover:translate-x-1.5" aria-hidden>→</span>
                      </>
                    ) : (
                      <span className="opacity-50">{whereNext.soon}</span>
                    )}
                  </span>
                </>
              );
              const cls =
                "group relative grid grid-cols-3 items-center gap-x-4 gap-y-3 border-b border-sand/20 py-6 outline-none lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_1.1fr_auto] lg:gap-6 lg:py-7";
              return (
                <motion.li
                  key={w.key}
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w.href ? (
                    <Link
                      href={w.href}
                      className={`${cls} hover:text-ink`}
                      onClick={() => track(PLOT_EVENTS.enterJourney, { journey_id: w.journeyId, from: "departures" })}
                    >
                      {row}
                    </Link>
                  ) : (
                    <div className={`${cls} text-sand/60`}>{row}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string | null }) {
  return (
    <span className="relative">
      <span className="block text-[8px] tracked opacity-50 lg:hidden">{label}</span>
      <span className={`mt-0.5 block text-[clamp(0.8rem,2.6vw,0.95rem)] font-medium uppercase ${value ? "" : "opacity-45"}`}>{value ?? "TBA"}</span>
    </span>
  );
}
