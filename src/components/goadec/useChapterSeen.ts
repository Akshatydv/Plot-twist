"use client";

import { useEffect, useRef } from "react";
import { PLOT_EVENTS, track } from "@/lib/analytics";

/**
 * Reports a chapter the first time it genuinely scrolls into view — once per
 * page load, never on re-entry.
 *
 * This is the ONLY thing the four chapters share. Their layouts deliberately
 * have nothing in common: a shared chapter component is exactly how four
 * "different worlds" collapse back into four passes of one template.
 *
 * `once: true` semantics are enforced by the ref rather than by the observer,
 * because IntersectionObserver fires again on every scroll back up and the
 * funnel needs "did they reach Saturday", not "how many times".
 */
export function useChapterSeen(chapterId: string) {
  const ref = useRef<HTMLElement | null>(null);
  const reported = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reported.current) return;

    // No IntersectionObserver (very old browsers, some test runners) — skip
    // the event rather than blocking the section from rendering.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !reported.current) {
            reported.current = true;
            track(PLOT_EVENTS.chapterViewed, { chapter: chapterId });
            observer.disconnect();
          }
        }
      },
      /**
       * Fires when the section reaches the middle band of the viewport.
       *
       * NOT a ratio threshold: intersectionRatio is visible-area ÷ ELEMENT-area,
       * so a chapter taller than the viewport can never reach a high ratio at
       * all. Bollywood is ~1536px; on an 812px phone its ceiling is 0.53, and
       * on anything shorter it's lower still — a 0.35 threshold silently never
       * fired on short viewports, which is exactly how this was caught.
       *
       * Collapsing the root to a horizontal band 30% of the viewport tall makes
       * the trigger "did this section reach the middle of the screen", which is
       * both what we actually mean by viewed and independent of how tall either
       * the section or the device happens to be.
       */
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [chapterId]);

  return ref;
}
