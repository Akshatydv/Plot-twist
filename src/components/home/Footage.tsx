"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { MediaSlot, ReelCut } from "@/content/home";

/**
 * FOOTAGE — one media slot from content/home.ts, rendered full-bleed.
 *
 * Three behaviours, in order of preference:
 *
 *   1. `slot.video` is set → a muted, looping, inline video. Phones get
 *      `srcMobile` when there is one. It is not requested until the slot is
 *      within a screen of the viewport (unless `eager`), and it pauses when
 *      it scrolls away so offscreen footage never costs battery.
 *   2. No video (or it errored) → THE REEL: the slot's cuts, one at a time,
 *      each still pushing in slowly (see .home-push in globals.css), hard
 *      crossfades between them. A `kind: "video"` cut plays inline for its
 *      slot. Only the current and next cut are ever mounted.
 *   3. Reduced motion → the poster, still. No reel, no video.
 *
 * The poster always paints first underneath, so a slow network degrades to a
 * photograph rather than a black box, and nothing shifts when media arrives.
 */
export function Footage({
  slot,
  eager = false,
  className = "",
  onCut,
  paused = false,
  sizes = "100vw",
}: {
  slot: MediaSlot;
  /** The hero: poster is priority and the video starts immediately. */
  eager?: boolean;
  className?: string;
  /** Reports the reel's current cut — the hero uses it for its caption slate. */
  onCut?: (cut: ReelCut, index: number) => void;
  /** Hold the reel on its current cut (e.g. a horizontal panel that's offscreen). */
  paused?: boolean;
  sizes?: string;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(eager);
  const [visible, setVisible] = useState(eager);
  const [videoFailed, setVideoFailed] = useState(false);
  // null until measured: a phone must never start fetching the desktop file
  // and then switch. The poster covers the one frame this costs.
  const [mobile, setMobile] = useState<boolean | null>(null);

  // Is this slot near (load it) and on screen (play it)?
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const useVideo = Boolean(slot.video) && !videoFailed && !reduce;
  const running = visible && !paused && !reduce;

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden bg-[#1a0d0a] ${className}`} aria-hidden>
      {slot.poster && (
        <Image
          quality={90}
          src={slot.poster}
          alt=""
          fill
          priority={eager}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: slot.reel[0]?.focal ?? "50% 50%" }}
        />
      )}

      {useVideo && near && slot.video && mobile !== null && (
        <LoopVideo
          key={mobile ? "m" : "d"}
          src={mobile && slot.video.srcMobile ? slot.video.srcMobile : slot.video.src}
          poster={slot.poster}
          playing={running}
          onError={() => setVideoFailed(true)}
        />
      )}

      {!useVideo && !reduce && slot.reel.length > 1 && near && (
        <Reel slot={slot} running={running} mobile={mobile ?? false} onCut={onCut} sizes={sizes} />
      )}
    </div>
  );
}

function LoopVideo({
  src,
  poster,
  playing,
  onError,
}: {
  src: string;
  poster?: string;
  playing: boolean;
  onError: () => void;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={playing}
      preload="metadata"
      onError={onError}
    />
  );
}

function Reel({
  slot,
  running,
  mobile,
  onCut,
  sizes,
}: {
  slot: MediaSlot;
  running: boolean;
  mobile: boolean;
  onCut?: (cut: ReelCut, index: number) => void;
  sizes: string;
}) {
  const [i, setI] = useState(0);
  // Which cuts have actually arrived. The reel never cuts to a frame that
  // is still loading — it holds the current one a little longer instead,
  // so a slow connection sees a slower film rather than a blank frame.
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const markReady = useCallback((k: number) => setReady((r) => (r.has(k) ? r : new Set(r).add(k))), []);
  const hold = slot.hold ?? 3000;
  const n = slot.reel.length;

  useEffect(() => {
    onCut?.(slot.reel[i], i);
  }, [i, onCut, slot.reel]);

  const next = (i + 1) % n;
  const nextReady = ready.has(next);

  useEffect(() => {
    if (!running || !nextReady) return;
    const cut = slot.reel[i];
    // A clip holds a little longer than a still — it's already moving.
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), cut.kind === "video" ? hold * 1.8 : hold);
    return () => window.clearTimeout(t);
  }, [i, running, nextReady, hold, n, slot.reel]);

  return (
    <>
      {slot.reel.map((cut, k) => {
        // Only the live cut and the one after it exist in the DOM.
        if (k !== i && k !== next) return null;
        const live = k === i;
        const pos = mobile ? (cut.focalMobile ?? cut.focal) : cut.focal;
        return (
          <div
            key={`${cut.src}-${k}`}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: live ? 1 : 0, zIndex: live ? 2 : 1 }}
          >
            {cut.kind === "video" ? (
              <ReelClip cut={cut} live={live && running} onReady={() => markReady(k)} />
            ) : (
              <div className={`absolute inset-0 ${live ? "home-push" : ""}`}>
                <Image
                  src={cut.src}
                  alt=""
                  fill
                  quality={90}
                  sizes={sizes}
                  className="object-cover"
                  style={{ objectPosition: pos ?? "50% 50%" }}
                  onLoad={() => markReady(k)}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function ReelClip({ cut, live, onReady }: { cut: ReelCut; live: boolean; onReady: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (live) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [live]);
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={cut.src}
      poster={cut.poster}
      muted
      playsInline
      preload="auto"
      onCanPlay={onReady}
      onError={onReady}
      style={{ objectPosition: cut.focal ?? "50% 50%" }}
    />
  );
}
