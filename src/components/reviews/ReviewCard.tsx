"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tripLabel, type PublicReview } from "@/lib/reviews";
import { Stars } from "./Stars";

/**
 * ONE REVIEW, AS A THING YOU'D PIN TO A WALL.
 *
 * A review with photos is a taped polaroid; one without is a coloured note
 * card with an oversized quote mark. Both tilt a hair, straighten and lift on
 * hover, and settle in as they scroll into view. Tones rotate by index so a
 * wall of them reads as a collage instead of a table.
 *
 * Text is rendered as text (React escapes it) — never as HTML — because it is
 * public input that an admin approved by reading, not by sanitising.
 */

const TONES = [
  { bg: "#FFFAF2", fg: "#1A0D0A", accent: "#FF4F87", muted: "rgba(26,13,10,0.6)" },
  { bg: "#1A0D0A", fg: "#FFF1DC", accent: "#FFB4CB", muted: "rgba(255,241,220,0.65)" },
  { bg: "#FF4F87", fg: "#1A0D0A", accent: "#FFF1DC", muted: "rgba(26,13,10,0.72)" },
  { bg: "#FF7A3D", fg: "#1A0D0A", accent: "#FFF1DC", muted: "rgba(26,13,10,0.72)" },
  { bg: "#00A9C7", fg: "#1A0D0A", accent: "#FFF1DC", muted: "rgba(26,13,10,0.72)" },
] as const;

const TILTS = [-1.8, 1.4, -0.8, 2, -1.2, 0.9, -2, 1.1];

export function ReviewCard({
  review,
  index,
  onOpenPhoto,
  compact = false,
}: {
  review: PublicReview;
  index: number;
  /** Open this review's photo `photoIndex` in the lightbox. */
  onOpenPhoto?: (review: PublicReview, photoIndex: number) => void;
  /** Landing-page carousel: clamp long reviews. */
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];
  const tone = TONES[(index + (review.photos.length ? 0 : 1)) % TONES.length];
  const hasPhoto = review.photos.length > 0;

  const meta = [review.city, tripLabel(review.tripId)].filter(Boolean).join(" · ");

  const footer = (
    <footer className="mt-5 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-display text-[1.05rem] uppercase leading-none tracking-[0.03em]">{review.name}</p>
        <p className="mt-1.5 truncate text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: hasPhoto ? "rgba(26,13,10,0.55)" : tone.muted }}>
          {meta}
        </p>
      </div>
      {review.verified && (
        <span
          className="flex shrink-0 -rotate-6 items-center gap-1 border-2 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-[0.14em]"
          style={{ borderColor: hasPhoto ? "#36C96F" : tone.accent, color: hasPhoto ? "#1d8a4b" : tone.accent }}
          title="This reviewer is on the guest list for the trip"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Verified guest
        </span>
      )}
    </footer>
  );

  const quote = (
    <blockquote className={`font-serif leading-[1.32] ${compact ? "line-clamp-[9]" : ""} whitespace-pre-line`} style={{ fontSize: review.body.length > 320 ? "1.12rem" : "1.3rem" }}>
      {review.body}
    </blockquote>
  );

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 36, rotate: tilt * 1.6 },
        whileInView: { opacity: 1, y: 0, rotate: tilt },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: (index % 3) * 0.06 },
        whileHover: { rotate: 0, y: -6, transition: { duration: 0.25 } },
      };

  if (hasPhoto) {
    const [first, ...rest] = review.photos;
    return (
      <motion.article
        {...motionProps}
        style={reduce ? { transform: `rotate(${tilt}deg)` } : undefined}
        className="pin relative mb-8 break-inside-avoid text-ink"
      >
        <span className="tape" style={{ top: -12, left: "calc(50% - 42px)", transform: `rotate(${tilt * -2}deg)` }} aria-hidden="true" />
        <button
          type="button"
          onClick={() => onOpenPhoto?.(review, 0)}
          className="group relative block w-full overflow-hidden bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
          aria-label={`Open ${review.photos.length > 1 ? `${review.photos.length} photos` : "photo"} from ${review.name}’s review`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={first} alt={`Photo shared by ${review.name}`} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
          {rest.length > 0 && (
            <span className="absolute bottom-2 right-2 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-sand backdrop-blur">
              +{rest.length}
            </span>
          )}
        </button>
        <div className="px-1.5 pt-4">
          <Stars rating={review.rating} size={16} />
          <div className="mt-2.5">{quote}</div>
          {footer}
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      {...motionProps}
      style={{ background: tone.bg, color: tone.fg, ...(reduce ? { transform: `rotate(${tilt}deg)` } : {}) }}
      className="relative mb-8 break-inside-avoid overflow-hidden rounded-[3px] px-6 pb-6 pt-7 shadow-[0_18px_40px_-18px_rgba(43,15,28,0.55)]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-6 select-none font-serif text-[9rem] leading-none opacity-[0.16]" style={{ color: tone.accent }}>
        ”
      </span>
      <Stars rating={review.rating} size={16} color={tone.accent} empty="rgba(128,128,128,0.35)" />
      <div className="relative mt-3">{quote}</div>
      {footer}
    </motion.article>
  );
}
