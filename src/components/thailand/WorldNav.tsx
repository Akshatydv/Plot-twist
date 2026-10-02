"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { worlds } from "@/content/chaos";
import { useCalm } from "../bir/Scenery";

/**
 * THE WORLD NAVIGATOR — `03 / 07 · THE DAYLIGHT · 17 DEC`.
 *
 * The house pattern, from components/srilanka/Chrome.tsx: a pinned bar with a
 * chapter counter, the chapter's name, its date, and a seven-segment scrubber
 * that fills as you move through. A visitor who has seen the Sri Lanka page
 * should find the same object in the same place doing the same job.
 *
 * ─── THE TWO THINGS THIS ONE DOES THAT SRI LANKA'S DOES NOT ─────────────────
 *
 * 1. IT HOLDS THROUGH THE CROSSINGS. Sri Lanka's worlds run back to back, so
 *    there is always a chapter under the midline. This page spends more of its
 *    height on transitions than on sections — five crossings, a threshold and
 *    the bill all sit BETWEEN worlds — and a bar that vanished for 2,000px of
 *    countdown would read as a bug. So the active world is held: once you are
 *    inside the run, the bar keeps showing the last world you were in until the
 *    next one takes over. It only leaves when you exit the run at either end.
 *
 * 2. IT CHANGES VOICE WITH THE PAGE. The island worlds are named in the
 *    editorial serif; the festival worlds are named in Anton, uppercase. The
 *    page changes language at the threshold and the chrome changes with it —
 *    if the navigator kept one voice it would quietly contradict the thing the
 *    whole middle of the page is built to do.
 *
 * It never appears over the hero or the portal: the first two screens are a
 * film starting, and the one thing they must not have is page furniture on top.
 */
export function WorldNav() {
  const calm = useCalm();
  const [active, setActive] = useState(-1);
  const [fill, setFill] = useState(0);
  const [inRun, setInRun] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;

      /* the whole run: the top of world 01 to the bottom of world 07 */
      const first = document.getElementById("world-01");
      const last = document.getElementById("world-07");
      if (first && last) {
        const a = first.getBoundingClientRect();
        const b = last.getBoundingClientRect();
        setInRun(a.top <= mid && b.bottom > mid);
      }

      /* only UPDATE when a world is under the midline — never clear. That is
         what holds the bar across a crossing. */
      worlds.forEach((w, i) => {
        const el = document.getElementById(`world-${w.n}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          setActive(i);
          setFill(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    /* Read once more after layout settles. `read()` on mount runs before
       lazy media has mounted and before a restored or anchored scroll position
       has been applied, so a visitor who lands mid-page — from a #world-03
       link, or a browser restoring where they were — would otherwise see no
       chrome at all until they happened to scroll. */
    const settle = window.setTimeout(read, 350);
    const onLoad = () => read();
    window.addEventListener("load", onLoad);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = inRun && active >= 0;
  const w = show ? worlds[active] : null;

  const jump = (n: string) => {
    document.getElementById(`world-${n}`)?.scrollIntoView({
      behavior: calm ? "auto" : "smooth",
      block: "start",
    });
    setOpen(false);
  };

  /** The island half is named in serif; the festival half in Anton. */
  const voice = (reg: string, on: boolean) =>
    reg === "festival"
      ? `font-display uppercase ${on ? "text-sand" : "text-white/65"}`
      : `font-serif italic ${on ? "text-sand" : "text-white/65"}`;

  return (
    <AnimatePresence>
      {show && w && (
        <motion.nav
          ref={wrap}
          aria-label="The seven worlds"
          className="fixed inset-x-3 top-3 z-40 sm:inset-x-auto sm:left-1/2 sm:top-5 sm:w-[min(31rem,calc(100vw-20rem))] sm:-translate-x-1/2"
          initial={calm ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="chaos-world-list"
            className="flex w-full touch-manipulation flex-col gap-2 border border-white/10 bg-[#07040d]/75 px-4 py-2.5 text-left backdrop-blur-md"
          >
            <span className="flex w-full items-center gap-3">
              <span className="font-display text-[15px] tabular-nums leading-none" style={{ color: w.accent }}>
                {w.n}
                <span className="text-white/35"> / 07</span>
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.span
                  key={w.id}
                  className={`min-w-0 flex-1 truncate text-[13px] ${voice(w.register, true)}`}
                  initial={calm ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {w.name}
                </motion.span>
              </AnimatePresence>
              <span className="shrink-0 text-[10px] tracked text-white/50">{w.date}</span>
              <motion.span aria-hidden className="text-[9px] text-white/50" animate={{ rotate: open ? 180 : 0 }}>
                ▼
              </motion.span>
            </span>

            {/* the scrubber: worlds behind you full, this one filling, the rest
                empty. Seven segments, so the shape of the week is legible at a
                glance — three light, then the three dark ones, then home. */}
            <span className="flex w-full gap-1" aria-hidden>
              {worlds.map((ww, i) => (
                <span key={ww.id} className="relative h-[2px] flex-1 overflow-hidden bg-white/15">
                  <span
                    className="absolute inset-y-0 left-0 transition-[width] duration-150"
                    style={{
                      width: i < active ? "100%" : i === active ? `${fill * 100}%` : "0%",
                      background: i === active ? ww.accent : "rgba(255,255,255,0.7)",
                    }}
                  />
                </span>
              ))}
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ol
                id="chaos-world-list"
                className="mt-1 border border-white/10 bg-[#07040d]/92 py-2 backdrop-blur-md"
                initial={calm ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {worlds.map((ww, i) => (
                  <li key={ww.id}>
                    <button
                      type="button"
                      onClick={() => jump(ww.n)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-white/5"
                    >
                      <span
                        className="font-display text-[12px] tabular-nums leading-none"
                        style={{ color: i === active ? ww.accent : "rgba(255,255,255,0.45)" }}
                      >
                        {ww.n}
                      </span>
                      <span className={`min-w-0 flex-1 truncate text-[12px] ${voice(ww.register, i === active)}`}>
                        {ww.name}
                      </span>
                      <span className="shrink-0 text-[9px] tracked text-white/40">{ww.date}</span>
                    </button>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
