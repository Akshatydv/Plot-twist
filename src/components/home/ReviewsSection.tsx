"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PublicReview } from "@/lib/reviews";
import { ReviewCard } from "../reviews/ReviewCard";
import { Stars } from "../reviews/Stars";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE LANDING PAGE'S REVIEWS — a drag-or-swipe strip of pinned cards.
 *
 * ─── THE HONESTY RULE ───────────────────────────────────────────────────────
 * Rendered by HomePage only when at least one APPROVED review exists. Until
 * then the section is simply absent — no "coming soon" box, no placeholder
 * quotes — matching content/home.ts's rule that `voices` is real or empty.
 *
 * Dark and warm after the paper-white trust section, so the page keeps
 * alternating light and dark; the cards are the only bright things in it.
 */
export function ReviewsSection({ reviews, count, average }: { reviews: PublicReview[]; count: number; average: number | null }) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#1a0d0a] py-24 text-sand sm:py-32" aria-labelledby="reviews-h">
      <div className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(32rem 32rem at 0% 8%, rgba(255,79,135,0.16), transparent 70%)" }} />

      <div className="relative px-5 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/65">
              <span className="h-px w-10 bg-sand/40" /> From the cast
            </p>
            <motion.h2
              id="reviews-h"
              className="mt-5 font-display text-[clamp(2.8rem,10vw,7rem)] uppercase leading-[0.9] tracking-[-0.01em]"
              initial={reduce ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease }}
            >
              Don’t take
              <br />
              <span className="font-serif normal-case italic tracking-[-0.02em] text-[#FF4F87]">our word for it.</span>
            </motion.h2>
          </div>

          {average !== null && (
            <div className="flex items-center gap-4" aria-label={`Average rating ${average} out of 5 from ${count} review${count > 1 ? "s" : ""}`}>
              <span className="font-display text-[clamp(3rem,8vw,4.5rem)] leading-none">{average.toFixed(1)}</span>
              <div>
                <Stars rating={average} size={20} empty="rgba(255,241,220,0.22)" label={false} />
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-sand/65">
                  from {count} traveller{count > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* the strip */}
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Reviews from travellers — scroll sideways"
        className="relative mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto px-5 pb-4 pt-6 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sand sm:px-8 lg:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <li key={r.id} className="w-[17.5rem] shrink-0 snap-start sm:w-[21rem]">
            <ReviewCard review={r} index={i} compact />
          </li>
        ))}
        {/* trailing invitation */}
        <li className="flex w-[15rem] shrink-0 snap-start items-center sm:w-[18rem]">
          <Link href="/reviews#share" className="group block -rotate-2 border-2 border-dashed border-sand/40 p-7 text-center transition hover:rotate-0 hover:border-sand/80">
            <span className="font-hand text-[2rem] leading-[1] text-[#FF4F87]">your story next?</span>
            <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/70 group-hover:text-sand">Add your review →</span>
          </Link>
        </li>
      </ul>

      <div className="relative mt-10 flex flex-wrap items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <Link
          href="/reviews"
          className="inline-flex min-h-12 items-center gap-2 bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[5px_5px_0_0_#FF4F87] transition hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand motion-reduce:transition-none"
        >
          Read every story <span aria-hidden="true">→</span>
        </Link>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scrollBy(d)}
              aria-label={d === -1 ? "Scroll reviews left" : "Scroll reviews right"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-sand/40 text-[18px] transition hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              <span aria-hidden="true">{d === -1 ? "←" : "→"}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
