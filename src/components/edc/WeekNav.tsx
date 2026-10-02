"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { week } from "@/content/thailand";
import { useCalm } from "../bir/Scenery";

/**
 * THE WEEK NAVIGATOR — `03 / 07 · THE CALM BEFORE THE STORM · 17 DEC`.
 *
 * Directly modelled on components/srilanka/Chrome.tsx, and that is the point
 * rather than a shortcut: a visitor who sees the Sri Lanka page and this one
 * should recognise the same object in the same place doing the same job. The
 * house pattern is a pinned bar with a chapter counter, the chapter's own name,
 * its date, and a seven-segment scrubber that fills as you move through.
 *
 * ─── WHAT IS DIFFERENT HERE, AND WHY ────────────────────────────────────────
 * Sri Lanka's chapters are one continuous run, so its navigator is on screen
 * for most of the page. This page's seven chapters are SPLIT either side of THE
 * DROP — days 01–03 above it, the three festival nights and the morning after
 * below — with the drop, the lineup and a casting board in between. A bar that
 * vanished for three sections and came back would read as a bug.
 *
 * So the active chapter is held through the gap: once you have entered day 01
 * the bar stays, and while you are between chapters it keeps showing the LAST
 * chapter you were in rather than disappearing. It only leaves when you go back
 * above the week or come out the far end of it.
 *
 * ─── IT DOES NOT APPEAR ON THE HERO ─────────────────────────────────────────
 * Same rule as Sri Lanka's. The first screen is a video and a gate, and the one
 * thing it must not have is page furniture floating over it.
 *
 * Positioning dodges the two things this page already pins: the LED ribbon at
 * the very top edge (2px, so the bar clears it), and on phones the sticky CTA
 * and the crew radio at the bottom — which is why this sits at the TOP on every
 * breakpoint rather than following Sri Lanka's exact offsets.
 */
export function WeekNav() {
  const calm = useCalm();
  const [active, setActive] = useState(-1);
  const [fill, setFill] = useState(0);
  const [inWeek, setInWeek] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;

      /* The week's full extent: the top of chapter 01 to the bottom of 07.
         Anywhere inside that band the bar stays up, including the stretch
         between the two halves where there is no chapter under the midline. */
      const first = document.getElementById("day-01");
      const last = document.getElementById("day-07");
      if (first && last) {
        const a = first.getBoundingClientRect();
        const b = last.getBoundingClientRect();
        setInWeek(a.top <= mid && b.bottom > mid);
      }

      week.chapters.forEach((c, i) => {
        const el = document.getElementById(`day-${c.n}`);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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

  const show = inWeek && active >= 0;
  const c = show ? week.chapters[active] : null;

  const jump = (n: string) => {
    document.getElementById(`day-${n}`)?.scrollIntoView({
      behavior: calm ? "auto" : "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {show && c && (
        <motion.nav
          ref={wrap}
          aria-label="The week, chapter by chapter"
          className="fixed inset-x-3 top-3 z-40 sm:inset-x-auto sm:left-1/2 sm:top-5 sm:w-[min(30rem,calc(100vw-22rem))] sm:-translate-x-1/2"
          initial={calm ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="edc-week-list"
            className="flex w-full touch-manipulation flex-col gap-2 border border-white/10 bg-[#07040d]/75 px-4 py-2.5 text-left backdrop-blur-md"
          >
            <span className="flex w-full items-center gap-3">
              <span className="font-display text-[15px] tabular-nums leading-none" style={{ color: c.accent }}>
                {c.n}
                <span className="text-white/35"> / 07</span>
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.span
                  key={c.id}
                  className="min-w-0 flex-1 truncate text-[11px] font-semibold tracked text-sand"
                  initial={calm ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {c.kicker}
                </motion.span>
              </AnimatePresence>
              <span className="shrink-0 text-[10px] tracked text-white/50">{c.date.replace(" DECEMBER", " DEC")}</span>
              <motion.span aria-hidden className="text-[9px] text-white/50" animate={{ rotate: open ? 180 : 0 }}>
                ▼
              </motion.span>
            </span>

            {/* the scrubber: chapters behind you full, this one filling, the
                rest empty. Seven segments, so the shape of the week is legible
                at a glance — three, then a gap you cannot see, then four. */}
            <span className="flex w-full gap-1" aria-hidden>
              {week.chapters.map((ch, i) => (
                <span key={ch.id} className="relative h-[2px] flex-1 overflow-hidden bg-white/15">
                  <span
                    className="absolute inset-y-0 left-0 transition-[width] duration-150"
                    style={{
                      width: i < active ? "100%" : i === active ? `${fill * 100}%` : "0%",
                      background: i === active ? ch.accent : "rgba(255,255,255,0.7)",
                    }}
                  />
                </span>
              ))}
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ol
                id="edc-week-list"
                className="mt-1 border border-white/10 bg-[#07040d]/92 py-2 backdrop-blur-md"
                initial={calm ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {week.chapters.map((ch, i) => (
                  <li key={ch.id}>
                    <button
                      type="button"
                      onClick={() => jump(ch.n)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-white/5"
                    >
                      <span
                        className="font-display text-[12px] tabular-nums leading-none"
                        style={{ color: i === active ? ch.accent : "rgba(255,255,255,0.45)" }}
                      >
                        {ch.n}
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-[11px] tracked ${
                          i === active ? "font-semibold text-sand" : "text-white/65"
                        }`}
                      >
                        {ch.kicker}
                      </span>
                      <span className="shrink-0 text-[9px] tracked text-white/40">
                        {ch.date.replace(" DECEMBER", " DEC")}
                      </span>
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
