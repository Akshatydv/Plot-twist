"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { nav } from "@/content/home";
import { Logo } from "../Logo";

const ease = [0.22, 1, 0.36, 1] as const;

export type NavWorld = { key: string; name: string; kicker: string; href: string | null; journeyId: string | null };

/**
 * THE HOMEPAGE NAV.
 *
 * Over the hero it is nothing but the mark and one button, laid straight onto
 * the footage. Past the hero it becomes a thin ink bar; scrolling down tucks
 * it away, the smallest scroll up brings it back. The journey pages keep
 * their logo-as-menu (JourneyMenu) — this page is the one place a real nav
 * belongs, because its whole job is routing people somewhere else.
 *
 * On phones the links live behind MENU, in a full-screen sheet that also
 * lists every world, so the fastest route to a journey is two taps.
 */
export function HomeNav({ worlds }: { worlds: NavWorld[] }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const heroEnd = typeof window !== "undefined" ? window.innerHeight * 0.85 : 700;
    setSolid(y > heroEnd);
    setHidden(y > heroEnd && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-sand"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.45, ease }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid ? "border-b border-sand/10 bg-[#1a0d0a]/88 backdrop-blur-md" : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            className={`mx-auto flex items-center justify-between gap-6 px-5 transition-[padding] duration-500 sm:px-8 lg:px-14 ${
              solid ? "py-2.5" : "py-5"
            }`}
            aria-label="Main"
          >
            <Link href="#top" aria-label="Plot Twist — back to the top" className="shrink-0">
              <Logo className={`transition-[font-size] duration-500 ${solid ? "text-[12px] sm:text-[14px]" : "text-[14px] sm:text-[18px]"}`} />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group relative text-[11px] font-medium uppercase tracked text-sand/80 transition-colors hover:text-sand">
                    {l.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-pink transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={nav.cta.href}
                className="hidden touch-manipulation items-center gap-2 bg-sand px-4 py-2.5 text-[11px] font-semibold uppercase tracked text-ink shadow-[4px_4px_0_0_#FF4F87] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] sm:inline-flex"
              >
                {nav.cta.label} <span aria-hidden>↓</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="home-menu"
                className="flex touch-manipulation items-center gap-2 py-2 text-[11px] font-semibold tracked lg:hidden"
              >
                <span className="flex flex-col gap-[5px]" aria-hidden>
                  <span className="block h-[1.5px] w-5 bg-sand" />
                  <span className="block h-[1.5px] w-3.5 bg-sand" />
                </span>
                {nav.menu}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="home-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grain fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#1a0d0a] px-5 pb-10 pt-5 text-sand sm:px-8"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center justify-between">
              <Logo className="text-[14px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="touch-manipulation py-2 text-[11px] font-semibold tracked"
                autoFocus
              >
                {nav.close} ✕
              </button>
            </div>

            <ul className="mt-12 space-y-1">
              {nav.links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? undefined : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-[clamp(2.6rem,13vw,4.5rem)] uppercase leading-[1.02] tracking-[-0.01em] active:text-pink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pt-12">
              <p className="text-[10px] tracked text-sand/45">THE WORLDS</p>
              <ul className="mt-3 divide-y divide-sand/12 border-y border-sand/12">
                {worlds.map((w) => (
                  <li key={w.key}>
                    {w.href ? (
                      <Link href={w.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3">
                        <span className="font-display text-2xl uppercase">{w.name}</span>
                        <span className="text-[9px] tracked text-sand/55">{w.kicker} →</span>
                      </Link>
                    ) : (
                      <div className="flex items-baseline justify-between py-3 text-sand/45">
                        <span className="font-display text-2xl uppercase">{w.name}</span>
                        <span className="text-[9px] tracked">SOON</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
