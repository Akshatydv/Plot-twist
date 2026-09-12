"use client";

import { faq } from "@/content/thailand";
import { Reveal } from "../motion";
import { GateSlate, Haze, LaserSweep, NeonRule } from "./Neon";

/**
 * THE FAQ — the only section on this page that exists for a search engine as
 * much as for a visitor, and it earns its place with both.
 *
 * ─── IT IS <details>, NOT STATE ─────────────────────────────────────────────
 * Native disclosure elements, so every answer is in the DOM whether or not it
 * is open, whether or not JavaScript ran, and whether or not the crawler
 * executes anything. A React accordion that mounts answers on click would hide
 * the entire point of the section from the thing it is partly written for —
 * and would break in-page find, which is how people actually use an FAQ.
 *
 * It also means keyboard and screen-reader behaviour is the browser's problem
 * rather than something reimplemented here with aria attributes.
 *
 * ─── THE FIRST ONE IS OPEN ──────────────────────────────────────────────────
 * Only the first, and it is the affiliation question on purpose. If somebody
 * reads one line of this section it should be the one that says we do not run
 * the festival.
 */
export function TheFaq() {
  return (
    <section
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "linear-gradient(180deg, #0a0414 0%, #170727 48%, #0a0414 100%)" }}
      aria-label="Frequently asked questions"
    >
      <LaserSweep className="left-[-28%] opacity-45" slow />
      <Haze className="-right-24 top-16 h-72 w-72 opacity-30" />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-[880px]">
        <GateSlate index={faq.index} label={faq.label} />

        <Reveal>
          <h2 className="mt-3 font-display text-[clamp(2rem,7vw,4rem)] uppercase leading-[0.92] text-sand">
            {faq.headline[0]}{" "}
            <span className="text-[var(--edc-hot)] edc-glow-hot">{faq.headline[1]}</span>
          </h2>
        </Reveal>

        <NeonRule className="mt-8" />

        <div className="mt-8">
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group border-b border-sand/15 py-4 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--edc-hot)] [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[clamp(1rem,3vw,1.3rem)] uppercase leading-[1.15] tracking-[0.01em] text-sand">
                  {item.q}
                </h3>
                {/* rotates with the disclosure — no state, just the open attribute */}
                <span
                  className="mt-[0.15em] shrink-0 text-[1.4rem] leading-none text-[var(--edc-hot)] transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.62] text-sand/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
