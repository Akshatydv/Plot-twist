"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { soundDesk } from "@/content/thailand";

/**
 * THE SOUND DESK — the only way audio ever starts on this page.
 *
 * ─── IT NEVER AUTOPLAYS, AND THAT IS NOT A BROWSER LIMITATION ───────────────
 * The brief for this page said "no unnecessary autoplay audio" before any
 * browser policy was considered, and the reason stands on its own: a travel
 * page that starts playing music at someone reading it on a train is a page
 * they close. Chrome and Safari would block it anyway, but this would be
 * built the same way if they didn't.
 *
 * So sound is strictly opt-in, it is off on every page load, and turning it
 * on is a single obvious control rather than something buried.
 *
 * ─── THE FILE IS NOT FETCHED UNTIL SOMEBODY ASKS FOR IT ─────────────────────
 * `src` is deliberately absent from the element until the first tap. A visitor
 * who never turns sound on downloads zero bytes of audio, which matters a lot
 * on a page that already carries a self-hosted video. Everything after the
 * first tap is served from cache.
 *
 * ─── IT FADES, AND IT STOPS WHEN YOU LOOK AWAY ──────────────────────────────
 * Volume ramps over ~700ms in both directions, because audio that cuts in at
 * full level reads as a mistake. And the track pauses when the tab is hidden:
 * music continuing to play out of a tab somebody switched away from is the
 * single most annoying thing a website can do.
 *
 * ─── LICENSING ──────────────────────────────────────────────────────────────
 * The track is licensed stock under the Pixabay Content License, which permits
 * commercial use and requires no attribution. It is NOT a commercial dance
 * record, and it must not be replaced with one: putting a released track on
 * this page would need sync and master licences that Plot Twist does not hold.
 * Provenance is recorded in public/audio/thailand/AUDIO.md.
 */

const TARGET_VOLUME = 0.34;
const FADE_MS = 700;

export function SoundDesk() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  /**
   * Held back until the hero is behind you.
   *
   * Top-right is the only corner free on a phone — the tea cup owns
   * bottom-right and the sticky CTA owns the whole bottom edge — but in the
   * hero that corner belongs to the masthead nav, and the two overlapped.
   * Rather than move the control somewhere worse, it arrives when the masthead
   * scrolls away. Which is also the right moment for it: the offer to turn the
   * music on belongs after you have walked in, not on the doorstep.
   */
  const [shown, setShown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const clearFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  /** Ramps to a level and optionally pauses once it gets there. */
  const fadeTo = useCallback((to: number, thenPause = false) => {
    const el = audioRef.current;
    if (!el) return;
    clearFade();
    const steps = Math.round(FADE_MS / 40);
    const from = el.volume;
    let i = 0;
    fadeRef.current = window.setInterval(() => {
      i += 1;
      const v = from + (to - from) * (i / steps);
      el.volume = Math.min(1, Math.max(0, v));
      if (i >= steps) {
        clearFade();
        if (thenPause) el.pause();
      }
    }, 40);
  }, []);

  const toggle = useCallback(async () => {
    let el = audioRef.current;

    // First tap: this is where the file is actually requested.
    if (!el) {
      el = new Audio();
      el.src = soundDesk.src;
      el.loop = true;
      el.preload = "auto";
      el.volume = 0;
      audioRef.current = el;
    }

    if (on) {
      fadeTo(0, true);
      setOn(false);
      return;
    }

    try {
      el.volume = 0;
      await el.play();
      fadeTo(TARGET_VOLUME);
      setOn(true);
      setReady(true);
    } catch {
      // Blocked, offline, or the file is missing. Stay visibly off rather than
      // claiming to play something that isn't playing.
      setOn(false);
    }
  }, [on, fadeTo]);

  // Nobody wants music coming out of a tab they switched away from.
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el) return;
      if (document.hidden) {
        clearFade();
        el.pause();
      } else if (on) {
        void el.play().then(() => fadeTo(TARGET_VOLUME)).catch(() => setOn(false));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [on, fadeTo]);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      clearFade();
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
      /* Hidden from pointer AND from the tab order while it is off-screen —
         a control faded to zero that still takes focus is a trap. */
      tabIndex={shown ? undefined : -1}
      aria-hidden={!shown}
      className={`edc-desk${shown ? " is-shown" : ""}`}
    >
      {/* Four bars that move only while something is actually playing, so the
          control reports the true state rather than decorating itself. */}
      <span className={`edc-desk-eq${on ? " is-on" : ""}`} aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="edc-desk-label" aria-hidden>
        {on ? soundDesk.on : ready ? soundDesk.off : soundDesk.idle}
      </span>
    </button>
  );
}
