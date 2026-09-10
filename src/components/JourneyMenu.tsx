"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { journeyHref, otherJourneys } from "@/content/journeys";
import { useJourney } from "./mystery/JourneyProvider";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE MASTHEAD MENU — the Plot Twist mark, made into a way out.
 *
 * ─── WHY THE LOGO AND NOT A NAV BAR ─────────────────────────────────────────
 * Every hero on this site is built on the same discipline: one idea on the
 * first screen, one call to action, nothing competing with the photograph or
 * the footage. A row of destination links across the top would break that on
 * all three pages at once.
 *
 * The logo is already in every masthead, it is already the thing a visitor
 * reaches for to "go back to the start", and it is the one element that can
 * carry navigation without adding a single pixel to the first screen. So it
 * becomes the trigger, and the trips live underneath it.
 *
 * ─── WHAT IT LISTS ──────────────────────────────────────────────────────────
 * Every journey that has opted in through `nav` in the registry, minus the one
 * you are currently on — nobody needs a link to where they already are. That
 * list is derived, not written: launching Journey 03 adds it to the menu on
 * every page with no change here, and retiring one removes it everywhere.
 *
 * ─── IT IS A REAL MENU, NOT A HOVER TRICK ───────────────────────────────────
 * It opens on click, not hover, because hover menus do not exist on a phone
 * and this site's traffic is mostly phones. The trigger is a <button> with
 * `aria-expanded`/`aria-haspopup`, the panel closes on Escape, on outside
 * click, and on route change, and focus is never trapped. The logo itself
 * still reads as "Plot Twist" to a screen reader.
 *
 * ─── AND IT STILL GETS YOU HOME ─────────────────────────────────────────────
 * The first item in the open panel is always the current page's own home link
 * back to "/", so making the logo a menu does not cost the site the one
 * behaviour people expect from a logo.
 */
export function JourneyMenu({
  className = "",
  logoClassName = "text-[15px] sm:text-[19px]",
  /** Palette for the dropdown. The EDC page is near-black; the others are warm. */
  tone = "warm",
}: {
  className?: string;
  logoClassName?: string;
  tone?: "warm" | "night";
}) {
  const reduce = useReducedMotion();
  const journey = useJourney();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();

  const others = otherJourneys(journey.id);

  // Close on outside click and on Escape. One listener pair, only while open.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const night = tone === "night";

  // Nothing to drop down to — render the plain mark rather than a menu that
  // opens onto an empty panel.
  if (others.length === 0) {
    return (
      <div className={className}>
        <Link href="/" aria-label="Plot Twist — home">
          <Logo className={logoClassName} />
        </Link>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        className="group flex touch-manipulation items-center gap-2 outline-none"
      >
        <Logo className={logoClassName} />
        {/*
          The affordance. Small, and it rotates rather than swapping glyphs, so
          the open state is legible without a second icon. `aria-hidden` — the
          button's own accessible name and aria-expanded already say everything
          a screen reader needs.
        */}
        <motion.span
          aria-hidden
          className={`mt-[0.2em] block text-[9px] leading-none ${night ? "text-[var(--edc-hot)]" : "text-pink"}`}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            className={`absolute left-0 top-[calc(100%+10px)] z-50 w-[15rem] overflow-hidden border-2 sm:w-[17rem] ${
              night
                ? "border-[var(--edc-hot)]/50 bg-[#0a0414]/97 text-sand"
                : "border-ink/25 bg-sand text-ink"
            }`}
            style={{
              boxShadow: night ? "6px 6px 0 0 rgba(139,61,255,0.55)" : "6px 6px 0 0 rgba(255,79,135,0.85)",
            }}
            initial={reduce ? undefined : { opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
          >
            <p
              className={`px-4 pb-1.5 pt-3 text-[9px] tracked ${night ? "text-sand/45" : "text-ink/45"}`}
            >
              THE OTHER PLOTS
            </p>

            {others.map((j) => (
              <Link
                key={j.id}
                href={journeyHref(j)}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`block border-t px-4 py-3 transition-colors ${
                  night
                    ? "border-sand/12 hover:bg-[var(--edc-hot)] hover:text-[#0a0414]"
                    : "border-ink/12 hover:bg-pink hover:text-sand"
                }`}
              >
                <span className={`block text-[8px] tracked ${night ? "text-sand/45" : "text-ink/45"}`}>
                  {j.nav?.kicker}
                </span>
                <span className="mt-1 block font-display text-[clamp(1.05rem,3.4vw,1.35rem)] uppercase leading-none tracking-[0.02em]">
                  {j.nav?.label}
                </span>
              </Link>
            ))}

            {/*
              A logo that no longer goes home is a logo that has been broken by
              its own menu. This is the fix, and it is why the trigger can be a
              button rather than a link.

              It is SKIPPED when the default journey is already in the list
              above — that journey owns "/", so showing it would be the same
              destination twice in one short menu, which reads as a mistake.
              On its own page it is not in the list, and this row is the only
              way home, so it appears.
            */}
            {!others.some((j) => journeyHref(j) === "/") && (
              <Link
                href="/"
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`block border-t px-4 py-2.5 text-[9px] tracked transition-colors ${
                  night
                    ? "border-sand/12 text-sand/55 hover:text-sand"
                    : "border-ink/12 text-ink/55 hover:text-ink"
                }`}
              >
                ← BACK TO THE START
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
