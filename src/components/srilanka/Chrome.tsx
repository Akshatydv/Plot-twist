"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chapters, sticky } from "@/content/srilanka";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { useCalm } from "../bir/Scenery";

/**
 * THE PAGE'S TWO PIECES OF FIXED UI — the chapter navigator and the CTA.
 * Kept to exactly two for the reason Bir gives: every fixed element is
 * chrome laid over the film.
 */

/* ------------------------------------------------------------------ */
/* the chapter navigator                                               */
/* ------------------------------------------------------------------ */

/**
 * `01 / 07 · THE ESCAPE` — the film's running title card, pinned to the top
 * of the screen while the seven worlds play, hidden over the hero and once
 * the story is over.
 *
 * Seven segments underneath fill as you move through each world, so the bar
 * is also the scrubber: it says how far through THIS chapter you are, not
 * just which one. Tapping it opens the chapter list; tapping a chapter jumps.
 *
 * Driven by `data-world` on each world's wrapper. One passive scroll listener,
 * throttled to a frame, reading seven rects — cheaper than seven observers
 * that would each have to report progress anyway.
 */
export function ChapterNav() {
  const reduce = useCalm();
  const [active, setActive] = useState(-1);
  const [fill, setFill] = useState(0);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let found = -1;
      let frac = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          found = i;
          frac = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        }
      });
      setActive(found);
      setFill(frac);
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

  // Close the list on outside tap and on Escape.
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

  const show = active >= 0;
  const c = show ? chapters[active] : null;

  return (
    <AnimatePresence>
      {show && c && (
        <motion.nav
          ref={wrap}
          aria-label="Chapters of the journey"
          className="fixed inset-x-3 top-3 z-40 sm:inset-x-auto sm:left-1/2 sm:top-5 sm:w-[min(30rem,calc(100vw-22rem))] sm:-translate-x-1/2"
          initial={reduce ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sl-chapter-list"
            className="flex w-full touch-manipulation flex-col gap-2 border border-white/10 bg-[#07090a]/70 px-4 py-2.5 text-left backdrop-blur-md"
          >
            <span className="flex w-full items-center gap-3">
              <span className="font-display text-[15px] tabular-nums leading-none" style={{ color: c.tone }}>
                {c.n}
                <span className="text-white/35"> / 07</span>
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.span
                  key={c.id}
                  className="min-w-0 flex-1 truncate text-[11px] font-semibold tracked text-[var(--sl-bone)]"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {c.short}
                </motion.span>
              </AnimatePresence>
              <span className="shrink-0 text-[10px] tracked text-white/50">{c.date}</span>
              <motion.span aria-hidden className="text-[9px] text-white/50" animate={{ rotate: open ? 180 : 0 }}>
                ▼
              </motion.span>
            </span>
            {/* the scrubber: past chapters full, this one filling, the rest empty */}
            <span className="flex w-full gap-1" aria-hidden>
              {chapters.map((ch, i) => (
                <span key={ch.id} className="relative h-[2px] flex-1 overflow-hidden bg-white/15">
                  <span
                    className="absolute inset-y-0 left-0 transition-[width] duration-150"
                    style={{ width: i < active ? "100%" : i === active ? `${fill * 100}%` : "0%", background: i === active ? ch.tone : "rgba(255,255,255,0.7)" }}
                  />
                </span>
              ))}
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ol
                id="sl-chapter-list"
                className="mt-1 border border-white/10 bg-[#07090a]/92 py-2 backdrop-blur-md"
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {chapters.map((ch, i) => (
                  <li key={ch.id}>
                    <a
                      href={`#${ch.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={i === active ? "step" : undefined}
                      className="group flex items-baseline gap-3 px-4 py-2 hover:bg-white/5"
                    >
                      <span className="font-display text-[13px] tabular-nums" style={{ color: ch.tone }}>
                        {ch.n}
                      </span>
                      <span className={`flex-1 text-[12px] font-semibold tracked ${i === active ? "text-white" : "text-white/65 group-hover:text-white"}`}>{ch.name}</span>
                      <span className="text-[10px] tracked text-white/40">{ch.date}</span>
                    </a>
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

/* ------------------------------------------------------------------ */
/* the CTA                                                             */
/* ------------------------------------------------------------------ */

/**
 * I'M IN → — the persistent CTA. Same rules as Bir's JoinCta: a thumb-height
 * bar on phones, a small slab top-right on desktop; appears once the hero has
 * gone and hides over the form; lifts the tea cup clear of the mobile bar
 * through --edc-sticky-lift.
 */
export function StickyCta() {
  const reduce = useCalm();
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const obs: IntersectionObserver[] = [];
    const hero = document.getElementById("top");
    const form = document.getElementById("apply");
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: "-60% 0px 0px 0px" });
      io.observe(hero);
      obs.push(io);
    }
    if (form) {
      const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
      io.observe(form);
      obs.push(io);
    }
    return () => {
      mq.removeEventListener("change", sync);
      obs.forEach((o) => o.disconnect());
    };
  }, []);

  const show = pastHero && !atForm;

  useEffect(() => {
    document.documentElement.style.setProperty("--edc-sticky-lift", show && mobile ? "68px" : "0px");
    return () => {
      document.documentElement.style.removeProperty("--edc-sticky-lift");
    };
  }, [show, mobile]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={mobile ? "bar" : "slab"}
          className={mobile ? "fixed inset-x-0 bottom-0 z-40" : "fixed right-6 top-5 z-40"}
          style={mobile ? { paddingBottom: "env(safe-area-inset-bottom)" } : undefined}
          initial={reduce ? undefined : mobile ? { y: "110%" } : { opacity: 0, y: -12 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : mobile ? { y: "110%" } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {mobile ? (
            <div className="flex items-center gap-3 border-t border-white/10 bg-[#07090a]/92 px-4 py-3 backdrop-blur-sm">
              <div className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold tracked text-[var(--sl-saffron)]">{sticky.meta}</span>
                <span className="mt-0.5 block truncate font-hand text-[1.05rem] leading-none text-[var(--sl-bone)]/70">{sticky.line}</span>
              </div>
              <a
                href={sticky.href}
                onClick={() => track(PLOT_EVENTS.requestInvite)}
                className="inline-flex min-h-[44px] shrink-0 touch-manipulation items-center gap-2 bg-[var(--sl-saffron)] px-5 py-3 text-[12px] font-semibold tracked uppercase text-[#07090a]"
              >
                {sticky.label}
                <span aria-hidden>→</span>
              </a>
            </div>
          ) : (
            <a
              href={sticky.href}
              onClick={() => track(PLOT_EVENTS.requestInvite)}
              className="group inline-flex items-center gap-3 bg-[var(--sl-bone)] px-5 py-3 text-[12px] font-semibold tracked uppercase text-[#07090a] shadow-[5px_5px_0_0_#F2A23A] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
            >
              {sticky.label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
