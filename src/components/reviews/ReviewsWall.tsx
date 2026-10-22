"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { REVIEW_TRIPS, tripLabel, type PublicReview } from "@/lib/reviews";
import { ReviewCard } from "./ReviewCard";

/**
 * THE WALL — every approved review as a pinned collage, with a photo lightbox.
 *
 * Masonry is plain CSS columns (no layout JS, no reflow jank); cards declare
 * break-inside-avoid. Trip filter chips only appear once reviews exist for more
 * than one trip, so a one-trip wall has no pointless controls.
 */
export function ReviewsWall({ reviews }: { reviews: PublicReview[] }) {
  const [trip, setTrip] = useState<string>("all");
  const [box, setBox] = useState<{ review: PublicReview; i: number } | null>(null);

  const tripsWithReviews = useMemo(() => REVIEW_TRIPS.filter((t) => reviews.some((r) => r.tripId === t.id)), [reviews]);
  const shown = trip === "all" ? reviews : reviews.filter((r) => r.tripId === trip);

  return (
    <div>
      {tripsWithReviews.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by trip">
          {[{ id: "all", label: "All trips" }, ...tripsWithReviews.map((t) => ({ id: t.id, label: tripLabel(t.id) }))].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTrip(t.id)}
              aria-pressed={trip === t.id}
              className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                trip === t.id ? "border-ink bg-ink text-sand" : "border-ink/25 text-ink hover:border-ink/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {shown.map((r, i) => (
          <ReviewCard key={r.id} review={r} index={i} onOpenPhoto={(review, idx) => setBox({ review, i: idx })} />
        ))}
      </div>

      {box && <Lightbox review={box.review} start={box.i} onClose={() => setBox(null)} />}
    </div>
  );
}

function Lightbox({ review, start, onClose }: { review: PublicReview; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const n = review.photos.length;

  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    opener.current = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      // Keep Tab inside the dialog: it only holds three buttons.
      if (e.key === "Tab") {
        const btns = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox] button"));
        if (!btns.length) return;
        const first = btns[0];
        const last = btns[btns.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [go, onClose]);

  return (
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photos from ${review.name}’s review`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0d0508]/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full border border-sand/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sand hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-sand sm:right-8 sm:top-6">
        Close ✕
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={review.photos[i]}
        alt={`Photo ${i + 1} of ${n} shared by ${review.name}`}
        className="max-h-[82vh] max-w-full rounded-[3px] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {n > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-sand/40 px-4 py-3 text-sand hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-sand sm:left-8">
            ←
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-sand/40 px-4 py-3 text-sand hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-sand sm:right-8">
            →
          </button>
          <p className="absolute bottom-5 text-[12px] tracking-[0.2em] text-sand/70" aria-live="polite">
            {i + 1} / {n}
          </p>
        </>
      )}
    </div>
  );
}
