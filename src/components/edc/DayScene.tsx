"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { WeekChapter } from "@/content/thailand";
import { useCalm } from "../bir/Scenery";

/**
 * A DAY SCENE — the full-bleed environment one chapter of the week happens in.
 *
 * This is the EDC page's answer to components/goa/Scene.tsx, and the rule it
 * enforces is the same one: THE BACKGROUND IS THE SECTION. Copy is laid into
 * the environment, not placed beside a picture of it, so there is no
 * "text column + image card" shape available to fall back into.
 *
 * ─── WHY THIS IS A SEPARATE FILE FROM GOA'S Scene ───────────────────────────
 * Goa's Scene is typed against `@/content/goa` and pulls in that page's
 * chapter-seen hook. Widening it to serve both pages would mean editing a
 * component Goa and Bali are running in production to add a feature only this
 * page uses — and this page needs one thing Goa's does not: the wash.
 *
 * Layers, bottom to top:
 *   1. the photograph, two crops of one file (portrait focal on phones)
 *   2. the wash — greyscale × a violet/magenta ramp, per-scene strength
 *   3. the scrim — darkest where this chapter's copy sits
 *   4. grain, so the photograph joins the rest of the page
 *   5. the content, positioned by the chapter itself
 *
 * ─── THE WASH, AND WHY IT IS MULTIPLY AND NOT A HUE FILTER ──────────────────
 * `hue-rotate` and `mix-blend-mode: hue` both CLIP. Push a blown stage lamp
 * through either and it comes back yellow-green — this project already lost an
 * afternoon to exactly that on the teaser carousel. Greyscale first, then
 * multiply a light ramp over it, cannot clip: multiply can only ever darken
 * toward the ramp, so highlights roll into the violet instead of breaking.
 *
 * Opacity does the blending, so `wash: 0` costs nothing and renders the
 * photograph untouched. That is why Krabi and the morning after look like
 * Thailand and the three nights look like this page.
 *
 * ─── SIZING ─────────────────────────────────────────────────────────────────
 * `svh` not `vh` on mobile: `vh` ignores iOS browser chrome and pushes the
 * bottom of every scene under the address bar, which on a page whose traffic
 * is mostly Instagram-on-a-phone would hide the bottom of all seven chapters.
 */
export function DayScene({
  chapter,
  children,
  className = "",
  priority = false,
}: {
  chapter: WeekChapter;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const sc = chapter.scene;
  const ref = useRef<HTMLElement>(null);
  /* `useCalm` rather than `useReducedMotion` directly: it is the page-family's
     own hook and it returns false until mount, so the server and the first
     client paint agree and the drift cannot cause a hydration mismatch. */
  const calm = useCalm();

  /* "start end" → "end start" covers the whole time this section is anywhere in
     the viewport, so the drift spreads across the entire pass instead of
     lurching as the section enters. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      ref={ref}
      id={`day-${chapter.n}`}
      /* `isolate` is load-bearing, not decoration. The wash below uses
         mix-blend-mode: multiply, which blends against the BACKDROP — and
         without a new stacking context that backdrop is everything painted
         beneath this section, including the mirrorball layer that spans the
         whole page. Isolating it means a chapter's wash can only ever affect
         that chapter's own photograph, which is the only thing it should. */
      className={`relative isolate flex min-h-[92svh] w-full items-stretch overflow-hidden text-sand lg:min-h-[94vh] ${className}`}
    >
      {/* ---- 1. the photograph, greyscaled in place by the wash ---- */}
      {/* The filter goes on this wrapper rather than on a backdrop-filter layer
          above it: backdrop-filter forces the compositor to re-read the whole
          painted area every frame and is the kind of thing that turns a
          scrolling page into 20fps on a mid-range Android. A static filter on
          an image is rasterised once. */}
      {/* THE DRIFT. inset-[-9%] gives the translate somewhere to travel: a frame
          that exactly filled its box would expose an edge at one end. The
          photograph moves slower than the copy laid over it, so a scene is
          revealed rather than cut to — this is the difference between scrolling
          THROUGH a chapter and scrolling PAST a slide. Off entirely when the OS
          asks for reduced motion; parallax is a real vertigo trigger. */}
      <motion.div
        className="absolute inset-[-9%]"
        style={{
          ...(sc.wash > 0 ? { filter: `grayscale(${sc.wash})` } : null),
          ...(calm ? null : { y }),
        }}
        aria-hidden
      >
        {/* Two crops of one file. Only one is ever in the layout, so the phone
            never downloads a frame composed for a desktop viewport. */}
        <Image
          src={sc.poster}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover lg:hidden"
          style={{ objectPosition: sc.focalMobile }}
        />
        <Image
          src={sc.poster}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="hidden object-cover lg:block"
          style={{ objectPosition: sc.focal }}
        />
      </motion.div>

      {/* ---- 2. the wash: the violet ramp, multiplied over the greyscale ---- */}
      {sc.wash > 0 ? (
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            opacity: sc.wash,
            background: "linear-gradient(168deg, #cbb0ff 0%, #af6ef0 44%, #ff9ec6 100%)",
          }}
          aria-hidden
        />
      ) : null}

      {/* ---- 3. the scrim ---- */}
      <div className="absolute inset-0" style={{ background: sc.scrim }} aria-hidden />

      {/* ---- 3b. the seams ----
          Top and bottom feathers in the page's own void colour, so every chapter
          begins and ends on the same value and two photographs meet THROUGH
          black rather than edge to edge.

          Seven full-bleed frames butted together read as a slideshow however
          good each one is: the eye gets a hard horizontal line every 94vh and
          calls it "next slide". The Bir and Sri Lanka pages avoid that by
          alternating saturated worlds against near-black, so every seam there is
          a deliberate tonal slam. These seven are all night-ish and cannot do
          that yet, so the seam is handled directly — and it rescues the hardest
          one in the set, where night 03's near-black meets the daylight of the
          morning after. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[13svh]"
        style={{ background: "linear-gradient(180deg, #05020b 0%, rgba(5,2,11,0) 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[16svh]"
        style={{ background: "linear-gradient(0deg, #05020b 0%, rgba(5,2,11,0) 100%)" }}
        aria-hidden
      />

      {/* ---- 4. grain ---- */}
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      {/* ---- 4b. the seam numeral ----
          An outlined day number sitting ON the boundary, half in the chapter
          above and half in this one. It stitches two scenes into one object and
          says where you are in the week without a progress bar or a stepper.
          Outlined, not filled: a solid numeral this size would be a graphic
          sitting ON the photograph, where a hairline outline reads as something
          scored INTO it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-0 z-[5] -translate-y-1/2 select-none font-display leading-none text-[18vw] lg:text-[11vw]"
        style={{ color: "transparent", WebkitTextStroke: `1px ${chapter.accent}55` }}
      >
        {chapter.n}
      </span>

      {/* The photograph is decorative — the copy carries the meaning — but a
          non-visual reader should still be told what the scene is. */}
      <span className="sr-only">{sc.alt}</span>

      {/* ---- 5. the content ---- */}
      <div className="relative z-10 flex w-full flex-col px-5 py-14 sm:px-8 sm:py-16 lg:px-14">{children}</div>
    </section>
  );
}

/**
 * The slate every chapter opens with: date, rule, chapter number. Small,
 * consistent across all seven, and the single element that says these seven
 * very different-looking screens are one series.
 *
 * Directly modelled on Goa's SceneSlate, which does the same job for the same
 * reason — that continuity is deliberate and should survive edits to either.
 */
export function DaySlate({ date, n, accent }: { date: string; n: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracked text-sand/75 sm:text-[11px]">
      <span style={{ color: accent }}>{date}</span>
      <span className="h-px w-8 bg-sand/40 sm:w-14" />
      <span>DAY {n}</span>
    </div>
  );
}

/**
 * A labelled detail written onto the scene. Deliberately NOT a card: a hairline
 * rule and two lines of type, so it reads as a note on the photograph rather
 * than a UI element sitting on top of it.
 */
export function DayDetail({ k, v, accent }: { k: string; v: string; accent: string }) {
  return (
    <div className="border-t pt-2.5" style={{ borderColor: `${accent}66` }}>
      <div className="text-[9px] tracked" style={{ color: accent }}>
        {k}
      </div>
      <div className="mt-1 text-[clamp(0.9rem,2.4vw,1.05rem)] font-medium leading-tight text-sand/95">{v}</div>
    </div>
  );
}
