"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { stickyCta } from "@/content/thailand";
import { PLOT_EVENTS, track } from "@/lib/analytics";

/**
 * THE STICKY CTA — the one piece of UI this page adds that Goa and Bali
 * don't have.
 *
 * ─── WHY IT EARNS ITS PLACE HERE ────────────────────────────────────────────
 * This page is substantially longer and more immersive than the other two,
 * and its peak moment (THE DROP) sits in the middle. Someone convinced at
 * that point should not have to scroll past four more sections to act. The
 * brief asked for a sticky CTA where appropriate; this is where.
 *
 * ─── THE TWO RULES IT KEEPS ─────────────────────────────────────────────────
 * 1. IT IS MOBILE-ONLY (`sm:hidden`). On desktop there is always a CTA within
 *    a screen or so, and a persistent bar there is just chrome over the
 *    design.
 * 2. IT NEVER COLLIDES WITH THE TEA CUP. The cup is `fixed ... z-50`, bottom
 *    right. This bar is z-40 and, while it is visible, sets a CSS custom
 *    property that lifts the cup above it — see EdcPage.tsx, where the class
 *    that reads it is applied. Two overlapping fixed elements in the corner
 *    of a phone is the classic version of this component going wrong.
 *
 * ─── WHEN IT SHOWS ──────────────────────────────────────────────────────────
 * After the hero has left the viewport, and never over the application form:
 * a floating "apply" button on top of the apply form is noise, and it covers
 * the last field on a small screen. Both are observed with one
 * IntersectionObserver each, so there is no scroll listener on this page.
 */
export function StickyCta() {
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("apply");

    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting),
        { rootMargin: "-40% 0px 0px 0px" },
      );
      io.observe(hero);
      observers.push(io);
    }

    if (form) {
      const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), {
        rootMargin: "0px 0px -20% 0px",
      });
      io.observe(form);
      observers.push(io);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !atForm;

  // Lifts the tea cup while the bar is up. Set on <html> so it is readable
  // from anywhere without threading state through the tree.
  useEffect(() => {
    document.documentElement.style.setProperty("--edc-sticky-lift", show ? "68px" : "0px");
    return () => {
      document.documentElement.style.removeProperty("--edc-sticky-lift");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 sm:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={reduce ? undefined : { y: "110%" }}
          animate={{ y: "0%" }}
          exit={reduce ? undefined : { y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="edc-rule" aria-hidden />
          <div className="flex items-center gap-3 bg-[#0a0414]/95 px-4 py-3 backdrop-blur-sm">
            <div className="min-w-0 flex-1">
              <span className="edc-meta block !text-[9px] !text-[var(--edc-hot)] !opacity-100">
                {stickyCta.meta}
              </span>
              <span className="mt-0.5 block truncate font-hand text-[1.05rem] leading-none text-sand/70">
                twenty wristbands.
              </span>
            </div>
            {/*
              Not <PlotButton>: that component's 6px offset shadow and hover
              translate are designed to sit inside a page, and inside a 56px
              bar they clip. Same colours, same tracked uppercase type, same
              event — a flush variant of the one button style, not a new one.
            */}
            <a
              href={stickyCta.href}
              onClick={() => track(PLOT_EVENTS.requestInvite)}
              className="inline-flex shrink-0 touch-manipulation items-center gap-2 bg-[var(--edc-hot)] px-5 py-3 text-[12px] font-semibold tracked uppercase text-[#0A0414]"
            >
              {stickyCta.label}
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
