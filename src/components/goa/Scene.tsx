"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Scene as SceneData } from "@/content/goa";
import { useChapterSeen } from "./useChapterSeen";

/**
 * A SCENE — the full-bleed environment a chapter happens inside.
 *
 * THE RULE THIS ENFORCES: the background is the section. Content is layered
 * into the environment rather than placed beside a picture of it, so there is
 * no "text column + photo card" shape available to fall back into.
 *
 * Structure, bottom to top:
 *   1. the photograph (or muted loop), cropped by a per-scene focal point
 *   2. a scrim tuned per scene — darkest where that scene's copy sits
 *   3. grain, so the photo joins the rest of the site's paper/ink world
 *   4. children, positioned by the chapter itself
 *
 * SIZING: min-h-[88svh] on mobile, 92vh desktop, capped so a tall phone can't
 * stretch a chapter into a page of its own. `svh` not `vh` on mobile — `vh`
 * ignores the browser chrome on iOS and pushes the bottom of every scene under
 * the address bar.
 *
 * The mobile crop is a separate object-position rather than a separate image:
 * one file, two focal points, so a wide sunset still has its subject on screen
 * when the frame goes portrait.
 */
export function Scene({
  scene,
  chapterId,
  children,
  className = "",
  priority = false,
}: {
  scene: SceneData;
  chapterId: string;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useChapterSeen(chapterId);
  const showVideo = Boolean(scene.video) && !reduce;

  return (
    <section
      ref={ref}
      id={`chapter-${chapterId}`}
      className={`relative flex min-h-[88svh] w-full items-stretch overflow-hidden text-sand md:min-h-[92vh] ${className}`}
    >
      {/* ---- 1. the environment ---- */}
      <div className="absolute inset-0" aria-hidden>
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            src={scene.video ?? undefined}
            poster={scene.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ objectPosition: scene.focal }}
          />
        ) : (
          <>
            {/* Two crops of one file: the portrait focal point on phones, the
                wide one from md up. Only one is ever in the layout. */}
            <Image
              src={scene.poster}
              alt=""
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover md:hidden"
              style={{ objectPosition: scene.focalMobile }}
            />
            <Image
              src={scene.poster}
              alt=""
              fill
              priority={priority}
              sizes="100vw"
              className="hidden object-cover md:block"
              style={{ objectPosition: scene.focal }}
            />
          </>
        )}
      </div>

      {/* ---- 2. the scrim ---- */}
      <div className="absolute inset-0" style={{ background: scene.scrim }} aria-hidden />

      {/* ---- 3. grain, so the photograph joins the rest of the site ---- */}
      <div className="grain pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      {/* The photo is decorative (alt="") because the copy above it carries the
          meaning — but a non-visual reader should still know what the scene is. */}
      <span className="sr-only">{scene.alt}</span>

      {/* ---- 4. the content, laid into the scene ---- */}
      <div className="relative z-10 flex w-full flex-col justify-end px-5 py-12 sm:px-8 sm:py-14 lg:px-14">
        {children}
      </div>
    </section>
  );
}

/**
 * The clapperboard line every chapter opens with — day, rule, chapter number.
 * Small, top-left, consistent across all four: it is the one element that says
 * "these four different-looking things are the same series".
 */
export function SceneSlate({ day, index }: { day: string; index: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracked text-sand/70 sm:text-[11px]">
      <span>{day}</span>
      <span className="h-px w-8 bg-sand/40 sm:w-14" />
      <span>CHAPTER {index}</span>
    </div>
  );
}

/**
 * A labelled detail laid into the scene — dress code, running order.
 * Deliberately NOT a card: a hairline rule and two lines of type, so it reads
 * as a note written onto the photograph rather than a UI element sitting on it.
 */
export function SceneDetail({ k, v, accent = "#FF4F87" }: { k: string; v: string; accent?: string }) {
  return (
    <div className="border-t pt-2.5" style={{ borderColor: `${accent}66` }}>
      <div className="text-[9px] tracked" style={{ color: accent }}>
        {k}
      </div>
      <div className="mt-1 text-[clamp(0.9rem,2.4vw,1.05rem)] font-medium leading-tight text-sand/95">{v}</div>
    </div>
  );
}
