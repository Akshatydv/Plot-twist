"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE TEA CUP — a small prop someone left in the casting room.
 *
 * "Tea" is the gossip, not the drink. The joke only lands if the cup reads as
 * an object rather than a widget, so it is drawn rather than styled: a
 * straight-sided enamel mug (more room for two lines of copy than a flared
 * teacup, and more travel-scrapbook than porcelain) with an uneven rim, a
 * chipped edge, and an outline gone over twice — the way the rest of the page
 * treats paper and ink.
 *
 * Deliberately small. It is an Easter egg, not a call to action, and must lose
 * every competition with the hero, the clues and the application CTA.
 *
 * The supporting line is not printed on the cup — there is no room, and a
 * cup crammed with copy stops being an object. It is revealed on hover and
 * focus as a taped slip, the same vocabulary as every other annotation here.
 */
export function ContactTeaCup() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  /** Hover OR keyboard focus reveals the supporting line. Driven by state rather
   *  than a CSS group variant so pointer and keyboard behave identically. */
  const [hinting, setHinting] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(contact.prefill)}`;

  /* Collapse the mobile slip on an outside tap or Escape. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Unset number — render nothing rather than a cup that opens a dead chat.
  if (!number) return null;

  /** Fires only on the click that genuinely leaves for WhatsApp. */
  const leaving = () => track(PLOT_EVENTS.contactWhatsapp);

  const onCupClick = (e: React.MouseEvent) => {
    // Below sm there is no room for the slip beside the cup, so the first tap
    // opens it instead of navigating. Read at click time — never during
    // render, which would differ between server and client.
    if (!window.matchMedia("(min-width: 640px)").matches) {
      e.preventDefault();
      setOpen((o) => !o);
      return;
    }
    leaving();
  };

  return (
    <div
      ref={wrapRef}
      /*
        `pt-teacup` is a hook, not a style: it carries no rules of its own here.
        A page that puts a fixed bar along the bottom edge — currently only the
        EDC page's mobile CTA — needs to lift the cup clear of it, and this is
        what that rule targets. See the `--edc-sticky-lift` block in
        globals.css. Nothing changes on the Goa or Bali pages, which never set
        the variable.
      */
      className="pt-teacup fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-out sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)", paddingRight: "env(safe-area-inset-right)" }}
    >
      <div className="relative">
        {/* ---------------- the slip (mobile, on tap) ---------------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="slip"
              className="absolute bottom-0 right-[calc(100%+8px)] w-[172px] sm:hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: 8 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0, rotate: -1.4 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, x: 6, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{ transformOrigin: "bottom right" }}
            >
              <div className="paper relative border-2 border-ink/25 px-3 pb-3 pt-4 shadow-[0_16px_30px_-14px_rgba(43,15,28,0.7)]">
                <span className="tape absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3" aria-hidden />

                <p className="font-brush text-[15px] leading-none text-ink">{contact.headline.join(" ")}</p>
                <p className="mt-1.5 font-hand text-[15px] font-semibold leading-[1.2] text-ink">
                  {contact.sub[0]}
                  <br />
                  <span className="marker-underline">{contact.sub[1]}</span>
                </p>

                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={leaving}
                  className="mt-2.5 flex items-center justify-center gap-1.5 border-2 border-ink/30 py-1.5 text-[9px] font-semibold tracked uppercase text-ink transition-colors hover:bg-ink/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
                >
                  <WhatsAppMark className="h-3 w-3 text-[#36c96f]" />
                  {contact.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- the cup ---------------- */}
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={onCupClick}
          aria-label={contact.aria}
          aria-expanded={open}
          onMouseEnter={() => setHinting(true)}
          onMouseLeave={() => setHinting(false)}
          onFocus={() => setHinting(true)}
          onBlur={() => setHinting(false)}
          className="group relative block rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
          initial={reduce ? { opacity: 0, rotate: -3 } : { opacity: 0, y: 12, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          // Lands after the clue tracker; two things arriving at once reads as
          // a page wearing widgets.
          transition={{ duration: 0.7, delay: 1.7, ease }}
          whileHover={reduce ? undefined : { y: -4, rotate: 0, scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          {/*
            The supporting line — a taped slip, revealed on hover AND keyboard
            focus. Plain state rather than a `group-hover:` variant, so pointer
            and keyboard behave identically (variants alone missed focus).
          */}
          <span
            className="pointer-events-none absolute bottom-[10px] right-[calc(100%+7px)] hidden w-[144px] text-right transition-[opacity,transform] duration-300 sm:block"
            style={{ opacity: hinting ? 1 : 0, transform: hinting ? "translateX(0)" : "translateX(6px)" }}
            aria-hidden
          >
            <span
              className="paper relative inline-block border-2 border-ink/25 px-2.5 py-2 shadow-[0_12px_22px_-12px_rgba(43,15,28,0.75)]"
              style={{ rotate: "-1.5deg" }}
            >
              <span className="tape absolute -top-2 right-3 h-3.5 w-10 rotate-[6deg]" aria-hidden />
              <span className="block font-hand text-[15px] font-semibold leading-[1.18] text-ink">
                {contact.sub[0]}
                <br />
                <span className="marker-underline">{contact.sub[1]}</span>
              </span>
            </span>
          </span>

          <span className="relative block w-[54px] sm:w-[104px]">
            <CupDrawing />

            {/* NEED / THE TEA? — the dominant element on the object */}
            <span className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[30%]">
              <span className="max-w-[84%] text-center font-brush leading-[1.05] tracking-tight text-ink text-[6.5px] sm:text-[11px]">
                {contact.headline[0]}
                <br />
                {contact.headline[1]}
              </span>
            </span>

            {/* small and secondary — a maker's mark, not a logo */}
            <WhatsAppMark className="pointer-events-none absolute bottom-[16%] right-[16%] h-[7px] w-[7px] text-ink/35 transition-colors group-hover:text-[#36c96f] sm:h-[12px] sm:w-[12px]" />
          </span>
        </motion.a>
      </div>
    </div>
  );
}

/**
 * Drawn, not styled. Straighter-sided than a teacup (more enamel camp mug),
 * which is both more room for two lines of copy and more travel-scrapbook.
 * The outline is stroked twice with a slight offset — a pen going over a line
 * it wasn't happy with — and the rim is deliberately uneven with a chip on
 * the left, so it never resolves into a stock icon.
 */
function CupDrawing() {
  const ink = "#1a0d0a";
  const cream = "#fff1dc";

  // A real flat-ish base rather than a V that pinches to a point — the point
  // was leaving the two-line headline nowhere to sit without spilling past
  // the drawn silhouette. Tall enough that the sides stay wide well past
  // where the headline's second line ends.
  const body =
    "M13.5,20 C13.7,36 15,54 17,66 C19,73 23,76 30,76 L78,76 C85,76 89,73 91,66 C93,54 94.2,36 94.5,20";
  const saucer = "M20,85 C20,90.5 35,94 54,94 C73,94 88,90.5 88,85";
  const handle = "M93,32 C106,29.5 112,40 108,48.5 C104.5,55.5 96,58.5 91,55";

  return (
    <span className="grain relative block">
      <svg
        viewBox="0 0 124 100"
        className="block w-full drop-shadow-[0_9px_12px_rgba(43,15,28,0.45)]"
        aria-hidden
        focusable="false"
      >
        <defs>
          <radialGradient id="tc-body" cx="32%" cy="14%" r="90%">
            <stop offset="0%" stopColor="#fff8ec" />
            <stop offset="62%" stopColor={cream} />
            <stop offset="100%" stopColor="#f0dcc0" />
          </radialGradient>
          <linearGradient id="tc-tea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c07636" />
            <stop offset="100%" stopColor="#9d4f1d" />
          </linearGradient>
        </defs>

        {/* ghost stroke — the first attempt, left showing */}
        <g
          stroke={ink}
          strokeOpacity="0.16"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          transform="translate(1.4,1.8)"
        >
          <path d={body} />
          <path d={handle} />
        </g>

        {/* handle sits behind the body */}
        <path d={handle} fill="none" stroke={ink} strokeOpacity="0.72" strokeWidth="2.6" strokeLinecap="round" />

        {/* body */}
        <path d={`${body} L94.5,20 L13.5,20 Z`} fill="url(#tc-body)" />
        <path d={body} fill="none" stroke={ink} strokeOpacity="0.72" strokeWidth="2.4" strokeLinecap="round" />

        {/* hand-drawn cross-hatch shading, lower-left — an editorial-illustration habit, not a gradient */}
        <g stroke={ink} strokeOpacity="0.14" strokeWidth="1.3" strokeLinecap="round">
          <path d="M22,56 L30,64" />
          <path d="M25,50 L34,59" />
          <path d="M29,44 L38,53" />
        </g>

        {/* rim — flared slightly past the body, like a rolled enamel lip, and
            intentionally not a perfect ellipse */}
        <path
          d="M8,20 C11,12 32,7 54,7 C76,7 97,12 100,20 C97,27.5 76,32 54,32 C32,32 11,27.5 8,20 Z"
          fill="#f6e6cd"
          stroke={ink}
          strokeOpacity="0.72"
          strokeWidth="2.2"
        />

        {/* the tea */}
        <ellipse cx="54" cy="19.4" rx="37" ry="7.8" fill="url(#tc-tea)" opacity="0.82" />
        {/* one highlight, so it reads as liquid rather than a hole */}
        <ellipse cx="40" cy="16.8" rx="9" ry="2.2" fill="#ffd9a6" opacity="0.4" />

        {/* chipped rim, left — the imperfection that stops it looking stock */}
        <path
          d="M21,15 C24,13.4 27.5,12.7 30.5,13.3"
          fill="none"
          stroke={cream}
          strokeOpacity="0.85"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* saucer, drawn as a line rather than a slab */}
        <path d={saucer} fill="none" stroke={ink} strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d={saucer}
          fill="none"
          stroke={ink}
          strokeOpacity="0.13"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform="translate(1.2,1.4)"
        />
      </svg>
    </span>
  );
}

/** Monochrome by default — it takes its colour from the parent, not from Meta. */
function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
