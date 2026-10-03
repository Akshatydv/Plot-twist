"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { close } from "@/content/chaos";
import { useCalm } from "../bir/Scenery";
import { bookLink } from "@/content/thailand-ops";

/**
 * THE STANDING OFFER — a bar on phones, a corner slab on desktop.
 *
 * The house pattern, from Bir §7 and the live EDC page: 56px tall, thumb
 * height, pinned to the bottom on a phone where the thumb already is. This
 * page is bought with Instagram ads, so the whole journey is read one-handed
 * and the only action on it should never be more than a reach away.
 *
 * ─── THE THREE RULES IT FOLLOWS ─────────────────────────────────────────────
 *
 * 1. NOT OVER THE HERO OR THE PORTAL. The first two screens are a film
 *    starting. It appears once the worlds begin, the same moment the navigator
 *    does, so the chrome arrives as one thing rather than in pieces.
 *
 * 2. IT HIDES OVER THE FORM. A floating "pre-register" button on top of the
 *    pre-registration form is the single most common way this pattern goes
 *    wrong: it covers the thing it is asking for, and on a phone it covers the
 *    submit button. An observer on the form turns it off.
 *
 * 3. IT SAYS THE STATUS, NOT A PRICE. Nothing is on sale, so the bar carries
 *    the same line the page does — the list hears first.
 */
export function StickyCta() {
  const calm = useCalm();
  const [show, setShow] = useState(false);

  /* A SCROLL READ, NOT AN INTERSECTION THRESHOLD.
     The first version used IntersectionObserver with threshold 0 on the first
     world. It never fired usefully: once that section is far above the
     viewport it has stopped intersecting and nothing re-reports, so the bar
     stayed hidden for the whole page. Reading positions on scroll is what
     WorldNav already does on this page, it is cheap behind rAF, and it cannot
     get stuck in a stale state. */
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const start = document.getElementById("world-01");
      const form = document.getElementById("pre-register");
      if (!start) return;
      const past = start.getBoundingClientRect().top < window.innerHeight * 0.4;
      const overForm = form
        ? form.getBoundingClientRect().top < window.innerHeight * 0.8 &&
          form.getBoundingClientRect().bottom > 0
        : false;
      setShow(past && !overForm);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
          initial={calm ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
            className="flex min-h-[56px] w-full touch-manipulation items-center justify-between gap-4 border-t border-white/15 bg-[#07040d]/92 px-5 backdrop-blur-md sm:min-h-0 sm:w-auto sm:rounded-none sm:border sm:px-6 sm:py-4"
          >
            <span className="flex flex-col">
              <span className="font-display text-[13px] uppercase tracking-[0.02em] text-sand">{close.cta}</span>
              <span className="text-[9px] tracked text-white/50">{close.status}</span>
            </span>
            <span aria-hidden className="text-[#FF2E7E]">
              →
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
