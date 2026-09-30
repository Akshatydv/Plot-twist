"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { day1, day2, day3, day4, hud, sticky } from "@/content/bir";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { useCalm } from "./Scenery";

/**
 * THE PAGE'S TWO PIECES OF FIXED UI — kept to exactly two, because every
 * fixed element is chrome laid over the film.
 */

/**
 * JOIN THE JOURNEY → — the persistent CTA.
 *
 * Mobile: a 56px bar along the bottom edge, thumb height. Desktop: a small
 * slab in the top-right corner. Both appear once the hero has left and hide
 * over the application form, observed with IntersectionObservers rather
 * than a scroll listener — same rules as the EDC page's StickyCta, including
 * lifting the tea cup clear of the mobile bar through --edc-sticky-lift.
 */
export function JoinCta() {
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
          className={mobile ? "fixed inset-x-0 bottom-0 z-40" : "fixed right-6 top-6 z-40"}
          style={mobile ? { paddingBottom: "env(safe-area-inset-bottom)" } : undefined}
          initial={reduce ? undefined : mobile ? { y: "110%" } : { opacity: 0, y: -12 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : mobile ? { y: "110%" } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {mobile ? (
            <div className="flex items-center gap-3 border-t border-[#EFE9DD]/10 bg-[#101311]/92 px-4 py-3 backdrop-blur-sm">
              <div className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold tracked text-[#E8B48A]">{sticky.meta}</span>
                <span className="mt-0.5 block truncate font-hand text-[1.05rem] leading-none text-[#EFE9DD]/70">{sticky.line}</span>
              </div>
              <a
                href={sticky.href}
                onClick={() => track(PLOT_EVENTS.requestInvite)}
                className="inline-flex min-h-[44px] shrink-0 touch-manipulation items-center gap-2 bg-[#E8793A] px-5 py-3 text-[12px] font-semibold tracked uppercase text-[#101311]"
              >
                {sticky.label}
                <span aria-hidden>→</span>
              </a>
            </div>
          ) : (
            <a
              href={sticky.href}
              onClick={() => track(PLOT_EVENTS.requestInvite)}
              className="group inline-flex items-center gap-3 bg-[#EFE9DD] px-5 py-3 text-[12px] font-semibold tracked uppercase text-[#101311] shadow-[5px_5px_0_0_#E8793A] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
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

type HudKey = keyof typeof hud;

const DAYS = [
  { key: "day1", id: day1.id },
  { key: "day2", id: day2.id },
  { key: "day3", id: day3.id },
  { key: "day4", id: day4.id },
] as const;

/**
 * THE DAY RAIL — the film's running caption, on every screen size: a thin
 * vertical line down the right edge with one stop per day. The line fills as
 * the trip goes on, the current day's stop grows, and a caption beside it
 * says which day and where — always visible while the days scroll by (on
 * desktop it adds the altitude).
 *
 * Tapping a stop jumps to that day's title card. Set in `mix-blend-difference`
 * so it stays legible over pine, sky, paper and fire without a background.
 * Hidden over the hero (the flight is not a day yet) and once the story is
 * over (the cast, recap, details and form are not a place).
 *
 * Driven by `data-hud` on each section and one IntersectionObserver keyed to
 * the middle of the viewport.
 */
export function Hud() {
  const [key, setKey] = useState<HudKey | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-hud]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setKey(e.target.getAttribute("data-hud") as HudKey);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const end = document.getElementById("casting");
    const endIo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) setKey(null);
    });
    if (end) endIo.observe(end);
    return () => {
      io.disconnect();
      endIo.disconnect();
    };
  }, []);

  const active = DAYS.findIndex((d) => d.key === key);
  const show = active >= 0;
  const h = show ? hud[DAYS[active].key] : null;

  return (
    <AnimatePresence>
      {show && h && (
        <motion.nav
          aria-label="Days of the journey"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed right-2 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 text-white mix-blend-difference sm:right-4 lg:right-6 lg:gap-5"
        >
          {/* the caption */}
          <div className="text-right">
            <AnimatePresence mode="wait">
              <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <span className="block text-[9px] font-semibold tracked lg:text-[10px]">{h.day}</span>
                <span className="mt-1 block font-serif text-[1.05rem] leading-none lg:text-[1.35rem]">{h.place}</span>
                <span className="mt-1 hidden text-[9px] tracked opacity-70 lg:block">{h.alt}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* the rail */}
          <ol className="relative flex flex-col items-center gap-5 py-1 lg:gap-7">
            <span aria-hidden className="absolute bottom-2 top-2 left-1/2 w-px -translate-x-1/2 bg-white/35" />
            <motion.span
              aria-hidden
              className="absolute top-2 left-1/2 w-px origin-top -translate-x-1/2 bg-white"
              style={{ bottom: 8 }}
              animate={{ scaleY: active / (DAYS.length - 1) }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {DAYS.map((d, i) => (
              <li key={d.key} className="relative">
                <a
                  href={`#${d.id}`}
                  aria-label={`${hud[d.key].day} · ${hud[d.key].place}`}
                  aria-current={i === active ? "step" : undefined}
                  className="pointer-events-auto -my-1.5 flex h-6 w-6 items-center justify-center"
                >
                  <span
                    className={`block rounded-full bg-white transition-all duration-500 ${
                      i === active ? "h-3 w-3" : i < active ? "h-1.5 w-1.5" : "h-1.5 w-1.5 opacity-40"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
