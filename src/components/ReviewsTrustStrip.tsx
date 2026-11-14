"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Stars } from "./reviews/Stars";

/**
 * "★ 4.6 · 23 reviews — Read what the cast said →", at the top of every footer.
 *
 * Client-side on purpose: the Footer is shared by server AND client pages and
 * can't await data. It stays invisible until the numbers arrive, and renders
 * nothing at all when there are no reviews yet — no "0 reviews", no placeholder
 * stars. The numbers are the plain average and count of every review.
 */
export function ReviewsTrustStrip({ accent }: { accent: string }) {
  const [s, setS] = useState<{ count: number; average: number } | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/reviews/summary")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (live && d && d.count > 0 && typeof d.average === "number") setS(d);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  if (!s) return null;

  return (
    <Link
      href="/reviews"
      className="group mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-sand/15 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
    >
      <span className="font-display text-[1.8rem] leading-none">{s.average.toFixed(1)}</span>
      <Stars rating={s.average} size={16} color={accent} empty="rgba(255,241,220,0.22)" label={false} />
      <span className="text-[11px] uppercase tracking-[0.2em] text-sand/70">
        {s.count} review{s.count > 1 ? "s" : ""} from the cast
      </span>
      <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.2em] text-sand transition-transform group-hover:translate-x-1">
        Read what they said →
      </span>
    </Link>
  );
}
