"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { soundDesk } from "@/content/thailand";

/**
 * THE SOUND DESK — the soundtrack, and the one control that stops it.
 *
 * ─── IT TRIES TO START ON ARRIVAL, AND OFTEN WILL NOT BE ALLOWED TO ─────────
 * This page wants music playing when you land. Browsers disagree: Chrome,
 * Safari and Firefox all refuse `play()` with sound until the visitor has
 * either interacted with the page or built up enough engagement with the
 * domain for the browser to trust it. That is not a setting a site can turn
 * off, so "autoplay" here means two attempts rather than one:
 *
 *   1. Play immediately on mount. Returning visitors the browser already
 *      trusts get exactly what was asked for — sound from the first frame.
 *   2. If that is refused, arm the FIRST interaction anywhere on the page —
 *      any tap, click or keypress — to start it. Nothing is asked of the
 *      visitor and no "click to enable sound" banner appears; the music simply
 *      comes up the instant they touch anything.
 *
 * Scroll is deliberately not in that list. It does not count as user
 * activation in Chrome, so listening for it would arm a handler that can only
 * fail.
 *
 * ─── OFF IS REMEMBERED, ON IS TOO ───────────────────────────────────────────
 * Turning it off writes a preference and no later visit will try again. A site
 * that re-starts music someone has already switched off once is a site people
 * leave, and it is the single fastest way to make an opt-out feel like a trap.
 *
 * ─── WHY THE CONTROL IS VISIBLE FROM THE FIRST FRAME ────────────────────────
 * It used to fade in after the hero, which was fine while sound was opt-in.
 * It cannot be now: audio that starts on its own and plays for more than three
 * seconds has to come with a way to stop it, available from the start and in
 * the tab order (WCAG 2.1, 1.4.2 Audio Control). It is mounted at the top of
 * <main>, so it is also the first thing a keyboard reaches.
 *
 * Bottom-left because every other corner is taken: the masthead nav owns
 * top-right in the hero, the tea cup owns bottom-right, and the sticky CTA
 * owns the full bottom edge on phones — which is what the raised mobile offset
 * clears.
 *
 * ─── LICENSING ──────────────────────────────────────────────────────────────
 * Licensed stock under the Pixabay Content License: commercial use, no
 * attribution. It is NOT a commercial dance record and must not be replaced
 * with one — that needs sync and master licences Plot Twist does not hold.
 * See public/audio/thailand/AUDIO.md.
 */

const TARGET_VOLUME = 0.34;
const FADE_MS = 700;
const STORAGE_KEY = "pt-edc-sound";
/** Any of these counts as user activation; scroll does not. */
const GESTURES = ["pointerdown", "keydown", "touchstart"] as const;

export function SoundDesk() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const detachRef = useRef<(() => void) | null>(null);

  const clearFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = useCallback((to: number, thenPause = false) => {
    const el = audioRef.current;
    if (!el) return;
    clearFade();
    const steps = Math.round(FADE_MS / 40);
    const from = el.volume;
    let i = 0;
    fadeRef.current = window.setInterval(() => {
      i += 1;
      el.volume = Math.min(1, Math.max(0, from + (to - from) * (i / steps)));
      if (i >= steps) {
        clearFade();
        if (thenPause) el.pause();
      }
    }, 40);
  }, []);

  /** currentTime is only settable once metadata has arrived. */
  const seekToDrop = useCallback((el: HTMLAudioElement) => {
    const go = () => {
      try {
        el.currentTime = soundDesk.startAt;
      } catch {
        /* nothing to do: it will simply start from the top */
      }
    };
    if (el.readyState >= 1) go();
    else el.addEventListener("loadedmetadata", go, { once: true });
  }, []);

  const ensure = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.src = soundDesk.src;
      /*
        NOT el.loop. Native looping always returns to zero, which would drop
        the listener back into the forty-five seconds of build this start
        offset exists to skip. Looping by hand costs a few milliseconds of gap
        at the seam — inaudible under a background bed — and keeps every pass
        starting on the drop.
      */
      el.loop = false;
      el.preload = "auto";
      el.volume = 0;
      el.addEventListener("ended", () => {
        seekToDrop(el);
        void el.play().catch(() => setOn(false));
      });
      audioRef.current = el;
    }
    return audioRef.current;
  }, [seekToDrop]);

  /** Resolves false when the browser refused, rather than throwing. */
  const start = useCallback(async () => {
    const el = ensure();
    try {
      el.volume = 0;
      // Only on a cold start. Resuming after a pause picks up where it was,
      // rather than yanking back to the drop mid-listen.
      if (el.currentTime < soundDesk.startAt) seekToDrop(el);
      await el.play();
      fadeTo(TARGET_VOLUME);
      setOn(true);
      return true;
    } catch {
      return false;
    }
  }, [ensure, fadeTo, seekToDrop]);

  const stop = useCallback(() => {
    fadeTo(0, true);
    setOn(false);
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (on) {
      stop();
      try {
        localStorage.setItem(STORAGE_KEY, "off");
      } catch {
        /* private mode — the session still works, it just won't be remembered */
      }
      return;
    }
    void start().then((ok) => {
      if (!ok) return;
      try {
        localStorage.setItem(STORAGE_KEY, "on");
      } catch {
        /* as above */
      }
    });
  }, [on, start, stop]);

  // ---- arrival ----
  useEffect(() => {
    let off = false;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") return;
    } catch {
      /* storage unavailable; fall through and try to play */
    }

    const detach = () => {
      GESTURES.forEach((g) => window.removeEventListener(g, kick));
      detachRef.current = null;
    };

    // The first gesture starts it — unless that gesture IS the off switch,
    // which would otherwise start the track for the half-second it takes the
    // click handler to stop it again.
    async function kick(event: Event) {
      if (off) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.(".edc-desk")) return;
      if (await start()) detach();
    }

    void start().then((ok) => {
      if (off || ok) return;
      GESTURES.forEach((g) => window.addEventListener(g, kick, { passive: true }));
      detachRef.current = detach;
    });

    return () => {
      off = true;
      detachRef.current?.();
    };
  }, [start]);

  // Nobody wants music coming out of a tab they have switched away from.
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el) return;
      if (document.hidden) {
        clearFade();
        el.pause();
      } else if (on) {
        void el
          .play()
          .then(() => fadeTo(TARGET_VOLUME))
          .catch(() => setOn(false));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [on, fadeTo]);

  useEffect(
    () => () => {
      clearFade();
      detachRef.current?.();
      audioRef.current?.pause();
      audioRef.current = null;
    },
    []
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? soundDesk.a11yOn : soundDesk.a11yOff}
      title={on ? soundDesk.a11yOn : soundDesk.a11yOff}
      className="edc-desk"
    >
      {/* The bars move only while audio is genuinely playing, so the control
          can never claim to be on while the browser is holding it back. */}
      <span className={`edc-desk-eq${on ? " is-on" : ""}`} aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
