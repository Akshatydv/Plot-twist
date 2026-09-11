"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { heroVideo } from "@/content/thailand";

/**
 * THE HERO FOOTAGE — official EDC Thailand video, embedded and untouched.
 *
 * ─── WHAT THIS COMPONENT IS ALLOWED TO DO ───────────────────────────────────
 * Mount YouTube's own iframe player, pointed at Insomniac's official "EDC
 * Thailand 2026 Trailer", size it to cover the viewport, and start it on the
 * festival rather than on the landscape intro.
 *
 * ─── WHAT IT MUST NEVER DO ──────────────────────────────────────────────────
 * Host, download, re-encode, cut, stitch, colour-grade, speed-ramp, filter or
 * apply ANY visual effect to the footage. There is deliberately no `filter`,
 * no `mix-blend-mode` and no opacity on the iframe or any ancestor of it. The
 * legibility scrim is a SEPARATE sibling layer above the player — an overlay
 * on the page, not a modification of the video.
 *
 * Scaling to `cover` is framing, not editing: the source is 16:9 and the hero
 * is a tall viewport, so the player is sized to the larger of (100vw × 9/16)
 * and (100svh × 16/9) and centred. Nothing is stretched — the aspect ratio is
 * preserved exactly; the frame simply crops.
 *
 * ─── THE START POINT ────────────────────────────────────────────────────────
 * The trailer opens on ~30s of Thailand landscape before it reaches the
 * festival, which is the wrong first three seconds for this page. So playback
 * starts at the crowd — see the timestamp note on `heroVideo` in
 * content/thailand.ts, including how the window was found.
 *
 * That window is held by the YouTube IFrame Player API rather than by the
 * `start`/`end` URL parameters alone, because `loop=1` restarts a video at
 * 0:00 and would drop the visitor back into the landscape intro every two
 * minutes. The API lets the loop return to the crowd instead. `start`/`end`
 * are still passed, so the FIRST frame is correct even before the API script
 * has loaded and taken over.
 *
 * ─── PROVENANCE ─────────────────────────────────────────────────────────────
 * Channel and embeddability were both verified against YouTube's oEmbed
 * endpoint before this shipped — see the long note on `heroVideo`, including
 * the fan-channel candidate that was rejected on that same check. The
 * on-screen credit is not optional.
 *
 * ─── PERFORMANCE ────────────────────────────────────────────────────────────
 * Neither the iframe nor the API script is in the first paint. A painted
 * stage-light plate renders immediately (so the hero has something to be, and
 * the LCP element is text), and both mount on the next idle callback.
 *
 * ─── SOUND ──────────────────────────────────────────────────────────────────
 * `mute` is not configurable and autoplay is only ever requested alongside it.
 * No page on this site plays audio at a visitor. Anyone who wants sound has
 * the credit link, which opens the video on YouTube.
 *
 * ─── REDUCED MOTION ─────────────────────────────────────────────────────────
 * `prefers-reduced-motion` gets the plate and no player at all. Autoplaying
 * festival footage is precisely the content that setting exists to suppress.
 */

/** The slice of the YouTube IFrame API this file actually uses. */
type YTPlayer = {
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  mute: () => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  destroy: () => void;
};

/** YouTube's player states. -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering. */
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

/** One script tag for the whole document, however many players ask for it. */
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${API_SRC}"]`);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (existing) return;
    const s = document.createElement("script");
    s.src = API_SRC;
    s.async = true;
    document.head.appendChild(s);
  });
}

export function HeroVideo() {
  const reduce = useReducedMotion();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);

  /*
    THE SELF-HOSTED PATH.
    When `selfHosted` is set, none of the YouTube machinery below runs at all:
    the hero renders a native muted <video>, which has no player chrome, no
    third-party script and no buffering spinner. That is the genuinely seamless
    version — see the long note on `heroVideo.selfHosted` for what has to be
    true before a file may go there.
  */
  const native = heroVideo.selfHosted;

  useEffect(() => {
    if (native || reduce || !heroVideo.videoId) return;

    let cancelled = false;
    let loopTimer: number | null = null;
    let revealTimer: number | null = null;

    /*
      MOUNTED IMMEDIATELY, NOT ON IDLE.

      This used to wait for requestIdleCallback so the iframe stayed out of the
      LCP path. That was the right trade for a decorative background and the
      wrong one here: the hero IS the footage, and a second of painted gradient
      before it appears reads as the page being slow rather than as a designed
      first frame.

      The cost is bounded — the plate underneath means there is never an empty
      state, the player is still hidden until real frames flow, and the LCP
      element is still the headline text, which paints from the server HTML
      long before any of this runs.
    */
    const idle = window.setTimeout(async () => {
      await loadYouTubeApi();
      if (cancelled || !mountRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: heroVideo.videoId,
        playerVars: {
          // Background footage, silent. Never one without the other.
          autoplay: 1,
          mute: 1,
          // Correct first frame even before the API takes over the loop.
          start: heroVideo.startAt,
          /*
            `end` IS DELIBERATELY NOT PASSED, and this is the fix for the
            play/pause glyph that kept appearing over the hero.

            When a player reaches its `end` timestamp, YouTube does not loop —
            it PAUSES, and a paused player draws its big centre pause/replay
            affordance over the picture. Because the old loop check ran once a
            second, that glyph was visible for up to a second every twenty
            seconds, which is exactly what a visitor was seeing.

            So the player is never given an end point and is never allowed to
            reach a paused state at all. The window is held below by seeking
            while playback continues uninterrupted, which YouTube renders with
            no overlay of any kind.
          */
          // A background plate, not a player the visitor operates. The credit
          // link is the route to the real video.
          controls: 0,
          disablekb: 1,
          // iOS otherwise takes the video fullscreen the moment it plays.
          playsinline: 1,
          modestbranding: 1,
          // No end-screen grid of unrelated videos over the hero.
          rel: 0,
          iv_load_policy: 3,
          // no captions track, no fullscreen button, no annotations
          cc_load_policy: 0,
          fs: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            if (cancelled) return;
            e.target.mute();
            e.target.seekTo(heroVideo.startAt, true);
            e.target.playVideo();

            /*
              REVEAL ON PICTURE, NOT ON READY.

              `onReady` fires before a single frame has decoded. Fading the
              player in there is what produced the visible seam: a black box,
              then YouTube's spinner, then the title card, then finally the
              crowd. So the player stays at opacity 0 — with the painted stage
              plate showing through underneath — until playback has actually
              advanced past the start point, which only happens once real
              frames are on screen. By then the title bar has faded too.

              The visitor never sees a buffering state; they see a lit stage
              that becomes a crowd.
            */
            const reveal = window.setInterval(() => {
              const p = playerRef.current;
              if (!p) return;
              const playing = p.getPlayerState() === YT_PLAYING;
              if (playing && p.getCurrentTime() > heroVideo.startAt + 0.25) {
                window.clearInterval(reveal);
                if (!cancelled) setReady(true);
              }
            }, 80);
            revealTimer = reveal;

            /*
              THE LOOP.
              The player has no end point and `loop=1` would rewind to 0:00 —
              back into the landscape intro — so the window is held here. Five
              times a second: if the player has fallen out of PLAYING, or run
              past the end of the window, seek back to the crowd. Seeking a
              PLAYING player keeps it playing, which is what makes the loop
              invisible. One interval, no rAF, no scroll listener.
            */
            loopTimer = window.setInterval(() => {
              const p = playerRef.current;
              if (!p) return;

              /*
                Anything other than "playing" is a state that draws YouTube
                furniture over the picture, so it is corrected immediately
                rather than waited out.
              */
              const state = p.getPlayerState();
              if (state === YT_PAUSED || state === YT_ENDED) {
                p.seekTo(heroVideo.startAt, true);
                p.playVideo();
                return;
              }

              const t = p.getCurrentTime();
              if (t >= heroVideo.endAt || t < heroVideo.startAt - 1) {
                // seekTo on a PLAYING player keeps it playing — no pause, no
                // overlay, no visible seam at the loop point.
                p.seekTo(heroVideo.startAt, true);
              }
            }, 200);
          },
        },
      });
    }, 0);

    return () => {
      cancelled = true;
      if (loopTimer) window.clearInterval(loopTimer);
      if (revealTimer) window.clearInterval(revealTimer);
      window.clearTimeout(idle);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [native, reduce]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0414]">
      {/*
        THE PAINTED STAGE — under the player, always. A slow, blocked or
        removed video degrades to this rather than to a black hole, which is
        the same contract SunsetBackdrop honours on the other two heroes.

        It runs the page's own arc — violet haze low, magenta from the left,
        gold punching through on the right — so even the fallback state looks
        like a stage rather than a placeholder.
      */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 80% at 50% 96%, rgba(255,127,168,0.30) 0%, transparent 55%),
            radial-gradient(100% 70% at 18% 22%, rgba(139,61,255,0.55) 0%, transparent 62%),
            radial-gradient(90% 62% at 86% 30%, rgba(255,46,126,0.38) 0%, transparent 60%),
            linear-gradient(180deg, #170727 0%, #0a0414 58%, #0a0414 100%)`,
        }}
      />

      {native ? (
        /*
          THE SEAMLESS PATH — a native muted video. No third-party script, no
          player chrome, no spinner, no title card, first frame on paint.
          Renders only when `heroVideo.selfHosted` points at a file we have the
          right to host; see the note on that field.
        */
        <video
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
          src={native}
          poster={heroVideo.selfHostedPoster ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          style={{
            width: "max(100vw, calc(100svh * 16 / 9))",
            height: "max(100svh, calc(100vw * 9 / 16))",
            pointerEvents: "none",
          }}
        />
      ) : (
        /*
          COVER SIZING, WITH OVERSCAN.

          The API replaces the inner div with its iframe in place, so the sizing
          lives on this wrapper and the generated iframe inherits it at 100%.

          ─── WHY IT IS SCALED PAST THE VIEWPORT ─────────────────────────────
          YouTube paints its own furniture into fixed zones of the player: the
          video title along the top edge, a control strip along the bottom.
          `controls=0` and `modestbranding=1` reduce that furniture but do not
          reliably remove all of it, and none of it can be styled from outside
          a cross-origin iframe.

          So the player is sized ~1.28× larger than the area it has to fill and
          centred, which puts those top and bottom bands OUTSIDE the visible
          frame entirely. Nothing is stretched — the 16:9 ratio is preserved
          exactly and the picture simply crops, which is framing, not editing.

          The centre play/pause affordance is handled by the reveal logic
          rather than by cropping: the player is invisible until frames are
          actually flowing, so the paused state is never on screen. Combined
          with `pointer-events: none` — clicks belong to the page underneath —
          there is no state in which a control is both visible and reachable.
        */
        <div
          aria-hidden
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: "calc(max(100vw, calc(100svh * 16 / 9)) * 1.28)",
            height: "calc(max(100svh, calc(100vw * 9 / 16)) * 1.28)",
            // The player is scenery. Clicks belong to the page underneath it.
            pointerEvents: "none",
          }}
        >
          <div ref={mountRef} className="h-full w-full" />
        </div>
      )}

      {/*
        ---- THE SCRIM ----
        A sibling layer ABOVE the player, never a filter on it. Kept as light
        as legibility allows and weighted to the two places type actually sits
        (the lower-left headline block and the top masthead row), so the middle
        of the frame — the stage, the crowd — stays as close to untouched as a
        readable page permits.
      */}
      {/*
        Tuned UP slightly when the hero footage changed. The previous clip was
        flatter and darker; this one is a graded trailer full of confetti,
        pyro and white stage light, and the headline block sits lower-left
        directly over the busiest part of it.

        The increase is deliberately confined to the two bands type actually
        occupies — the lower edge and the left column. The centre stops are
        untouched at 0.18/0.06, so the middle of the frame, where the stage and
        the crowd are, stays as close to untouched as a readable page allows.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,4,20,0.70)_0%,rgba(10,4,20,0.18)_22%,rgba(10,4,20,0.06)_44%,rgba(10,4,20,0.80)_84%,rgba(10,4,20,0.96)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,4,20,0.82)_0%,rgba(10,4,20,0.36)_42%,transparent_74%)]"
      />

      {/* Grain, so the footage joins the rest of the site's world rather than
          sitting on top of it. Same role it plays on every Goa scene. */}
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <span className="sr-only">{heroVideo.description}</span>
    </div>
  );
}

/**
 * THE CREDIT.
 *
 * Rendered on the hero, in the page's smallest type, linking to the full video
 * on YouTube. Not decoration and not optional: this is footage published by
 * the festival's organiser, embedded by an unaffiliated third party, played
 * from a start point of our choosing. The page says all of that where a
 * visitor can see it. The affiliation disclaimer in THE PASS carries the rest.
 */
export function VideoCredit({ className = "" }: { className?: string }) {
  // Nothing to credit on the self-hosted path: the Pexels License requires no
  // attribution, and a credit line under this hero would imply the footage is
  // EDC's, which it is not. The honest statement is in THE PASS instead.
  if (heroVideo.selfHosted) return null;
  if (!heroVideo.videoId) return null;
  return (
    <a
      href={heroVideo.watchUrl}
      target="_blank"
      rel="noreferrer"
      className={`edc-meta !text-[7px] !tracking-[0.22em] transition-opacity hover:!opacity-90 sm:!text-[8px] ${className}`}
      style={{ opacity: 0.28 }}
    >
      {heroVideo.credit}
    </a>
  );
}
