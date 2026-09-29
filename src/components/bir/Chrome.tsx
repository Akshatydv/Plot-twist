"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hud, sticky } from "@/content/bir";
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

/**
 * THE HUD — the film's running caption: which day, which place, roughly how
 * high. Right edge, vertically centred — the one strip no section puts copy in. Desktop only (on a phone each world's title card does this job), and
 * set in `mix-blend-difference` so it stays legible over pine, sky, paper
 * and fire without a background of its own.
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
    // leave the HUD once the story is over — the cast, recap, details and form are not a place
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

  const h = key ? hud[key] : null;

  return (
    <div aria-hidden className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 text-right text-white mix-blend-difference lg:block">
      <AnimatePresence mode="wait">
        {h && (
          <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
            <span className="block text-[10px] font-semibold tracked">{h.day}</span>
            <span className="mt-1 block font-serif text-[1.35rem] leading-none">{h.place}</span>
            <span className="mt-1 block text-[9px] tracked opacity-70">{h.alt}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
