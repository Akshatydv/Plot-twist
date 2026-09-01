"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Glimpse as GlimpseData } from "@/content/goa";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A GLIMPSE — one small taped scrap of the trip.
 *
 * Renders a short muted loop when footage exists, and the poster photograph
 * when it doesn't. Both take the identical scrapbook treatment — tape, grain,
 * a rotation, a handwritten scrap — so the page never has a "video-shaped
 * hole" waiting to be filled, and never looks like a stock-video block either.
 *
 * There is no Journey 00 footage yet, so every glimpse currently renders its
 * photo. See content/goa.ts for how to switch one on.
 *
 * Motion: the loop is muted, inline and autoplaying, which is the only
 * combination mobile Safari will play without a tap. `useReducedMotion`
 * downgrades it to the still frame — a looping video is exactly the kind of
 * thing that setting exists to stop.
 */
export function Glimpse({
  glimpse,
  className = "",
  rotate = -1.5,
  priority = false,
  /** 3/4 for a portrait scrap, 4/3 or 16/9 for a landscape one. Mixed on purpose. */
  aspect = "4 / 3",
  sizes = "(max-width: 640px) 90vw, 40vw",
}: {
  glimpse: GlimpseData;
  className?: string;
  rotate?: number;
  priority?: boolean;
  aspect?: string;
  sizes?: string;
}) {
  const reduce = useReducedMotion();
  const showVideo = Boolean(glimpse.video) && !reduce;

  return (
    <motion.figure
      className={`relative ${className}`}
      style={{ rotate }}
      initial={reduce ? undefined : { opacity: 0, y: 22, rotate: rotate - 3 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* the scrap itself — paper border, not a rounded card */}
      <div className="grain relative overflow-hidden border-[3px] border-sand/15 bg-ink/40 shadow-[0_22px_44px_-24px_rgba(10,2,10,0.9)]">
        <div className="relative w-full" style={{ aspectRatio: aspect }}>
          {showVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={glimpse.video ?? undefined}
              poster={glimpse.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={glimpse.alt}
            />
          ) : (
            <Image
              src={glimpse.poster}
              alt={glimpse.alt}
              fill
              className="object-cover"
              sizes={sizes}
              priority={priority}
            />
          )}
        </div>
      </div>

      {/* tape, off-centre — the same imperfection the rest of the site uses */}
      <span className="tape absolute -top-3 left-6 h-5 w-16 -rotate-3" aria-hidden />

      {glimpse.note && (
        <figcaption className="mt-2 block text-right font-hand text-[1.15rem] leading-none text-sand/60">
          {glimpse.note}
        </figcaption>
      )}
    </motion.figure>
  );
}
