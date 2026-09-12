"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact } from "@/content/site";
import { crew } from "@/content/thailand";
import { PLOT_EVENTS, track } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE CREW RADIO — Journey 02's contact affordance, in place of the tea cup.
 *
 * ─── WHY THE CUP HAD TO GO, ON THIS PAGE ONLY ───────────────────────────────
 * The tea cup is a casting-room prop and a joke about gossip, and it is exactly
 * right on Goa and Bali. Here it fails twice over: an enamel mug of tea in a
 * field at 2am reads as a different brand entirely, and the cream paper slip it
 * opens is the one warm surface on a page built out of nothing but night.
 *
 * A handheld radio solves both halves at once. It is literally a communication
 * device, so it reads as "talk to somebody" with no explaining, and every
 * person working a festival carries one — it belongs here the way the cup
 * belongs in a casting room. CH 02 on its screen is the journey number, which
 * is what stops it being generic set-dressing bolted onto a contact button.
 *
 * ContactTeaCup is untouched and still ships on every other page.
 *
 * ─── THE INTERACTION IS DELIBERATELY DUPLICATED ─────────────────────────────
 * Outside-tap dismissal, Escape, the mobile-tap-opens/desktop-tap-leaves split
 * and the hover-or-focus hint are all reimplemented here rather than shared
 * with the cup. Extracting a hook would have meant editing the component two
 * live pages depend on, to no visible benefit — the brief was to leave the cup
 * alone. If a third variant ever appears, that is the point to extract it.
 *
 * Behaviour is otherwise identical to the cup: same number, same WhatsApp,
 * same analytics event, same "render nothing if the number is unset" rule.
 */
export function CrewRadio() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  /** Hover OR keyboard focus reveals the supporting line, so pointer and
   *  keyboard behave identically. */
  const [hinting, setHinting] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(crew.prefill)}`;

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

  // Unset number — render nothing rather than an object that opens a dead chat.
  if (!number) return null;

  const leaving = () => track(PLOT_EVENTS.contactWhatsapp);

  const onRadioClick = (e: React.MouseEvent) => {
    // Below sm there is no room for the slip beside the radio, so the first tap
    // opens it instead of navigating. Read at click time, never during render.
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
      className="edc-radio-dock fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)", paddingRight: "env(safe-area-inset-right)" }}
    >
      <div className="relative">
        {/* ---------------- the slip (mobile, on tap) ---------------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="slip"
              className="absolute bottom-0 right-[calc(100%+8px)] w-[176px] sm:hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: 8 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, x: 6, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{ transformOrigin: "bottom right" }}
            >
              {/* edc-reader, not `paper`: the cup's cream slip is the one warm
                  surface this page does not have. */}
              <div className="edc-reader px-3 pb-3 pt-3">
                <p className="font-display text-[15px] uppercase leading-none tracking-[0.06em] text-sand">
                  {crew.headline.join(" ")}
                </p>
                <p className="mt-2 font-hand text-[15px] leading-[1.2] text-sand/80">
                  {crew.sub[0]}
                  <br />
                  {crew.sub[1]}
                </p>

                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={leaving}
                  className="mt-3 flex items-center justify-center gap-1.5 border border-[var(--edc-hot)]/60 py-1.5 text-[9px] font-semibold tracked uppercase text-sand transition-colors hover:bg-[var(--edc-hot)]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--edc-hot)]"
                >
                  <WhatsAppMark className="h-3 w-3 text-[#25D366]" />
                  {crew.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- the radio ---------------- */}
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={onRadioClick}
          aria-label={crew.aria}
          aria-expanded={open}
          onMouseEnter={() => setHinting(true)}
          onMouseLeave={() => setHinting(false)}
          onFocus={() => setHinting(true)}
          onBlur={() => setHinting(false)}
          className="group relative block rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--edc-hot)]"
          initial={reduce ? { opacity: 0, rotate: -4 } : { opacity: 0, y: 12, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.7, delay: 1.5, ease }}
          whileHover={reduce ? undefined : { y: -4, rotate: 0, scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          {/* the supporting line, on hover AND keyboard focus */}
          <span
            className="pointer-events-none absolute bottom-[14px] right-[calc(100%+10px)] hidden w-[152px] text-right transition-[opacity,transform] duration-300 sm:block"
            style={{ opacity: hinting ? 1 : 0, transform: hinting ? "translateX(0)" : "translateX(6px)" }}
            aria-hidden
          >
            <span className="edc-reader inline-block px-2.5 py-2">
              <span className="block font-hand text-[15px] leading-[1.18] text-sand/85">
                {crew.sub[0]}
                <br />
                {crew.sub[1]}
              </span>
            </span>
          </span>

          <span className="relative block w-[52px] sm:w-[74px]">
            <RadioDrawing channel={crew.channel} label={crew.headline} />
          </span>
        </motion.a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The object. Drawn rather than styled, the same way the cup is — a widget
 * with rounded corners would read as a chat bubble in a festival costume.
 *
 * THE LETTERING IS INSIDE THE SVG, not overlaid in HTML. It was an absolutely
 * positioned span first, and "CH 02" landed off-centre from its own screen,
 * because the span was centred against the whole 74-unit canvas while the
 * screen sits at x 12–50. Text in the drawing is positioned in the same
 * coordinate space as the thing it is printed on, so it cannot drift — and it
 * scales with the object instead of needing a size per breakpoint.
 *
 * The status LED is the one animated part, breathing on the page's own bar
 * length so the radio sits on the same clock as the LED strip and the room.
 */
function RadioDrawing({ channel, label }: { channel: string; label: readonly string[] }) {
  return (
    <svg viewBox="0 0 74 108" className="block w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id="cr-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#241036" />
          <stop offset="52%" stopColor="#160a24" />
          <stop offset="100%" stopColor="#0d0518" />
        </linearGradient>
        <linearGradient id="cr-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7fa8" />
          <stop offset="100%" stopColor="#ff2e7e" />
        </linearGradient>
      </defs>

      {/* antenna */}
      <rect x="12" y="2" width="5" height="20" rx="2.5" fill="#2c1742" />
      <rect x="13.2" y="3.4" width="2.6" height="12" rx="1.3" fill="#4a2a6b" />

      {/* body */}
      <rect x="4" y="18" width="66" height="88" rx="9" fill="url(#cr-body)" />
      <rect
        x="4"
        y="18"
        width="66"
        height="88"
        rx="9"
        fill="none"
        stroke="rgba(255,241,220,0.22)"
        strokeWidth="1.6"
      />
      {/* a highlight down one edge, so it reads as a moulded object */}
      <path d="M9 26 L9 98" stroke="rgba(255,241,220,0.14)" strokeWidth="1.4" strokeLinecap="round" />

      {/* status LED — the only moving part */}
      <circle cx="58" cy="27" r="3.6" fill="#ff2e7e" className="edc-radio-led" />

      {/* screen, and the channel printed on it — both centred on x=31 */}
      <rect x="12" y="28" width="38" height="15" rx="2.5" fill="url(#cr-screen)" />
      <rect x="12" y="28" width="38" height="15" rx="2.5" fill="none" stroke="rgba(10,4,20,0.45)" strokeWidth="1" />
      <text
        x="31"
        y="39.4"
        textAnchor="middle"
        fill="#0a0414"
        fontFamily="var(--font-display), sans-serif"
        fontSize="9"
        letterSpacing="0.6"
      >
        {channel}
      </text>

      {/* speaker grille */}
      <g fill="rgba(255,241,220,0.3)">
        <rect x="14" y="50" width="46" height="2.6" rx="1.3" />
        <rect x="14" y="56" width="46" height="2.6" rx="1.3" />
        <rect x="14" y="62" width="46" height="2.6" rx="1.3" />
        <rect x="14" y="68" width="46" height="2.6" rx="1.3" />
      </g>

      {/* the label, on the body below the grille */}
      <g
        fill="rgba(255,241,220,0.92)"
        fontFamily="var(--font-display), sans-serif"
        fontSize="10"
        textAnchor="middle"
        letterSpacing="0.4"
      >
        <text x="37" y="86">{label[0]}</text>
        <text x="37" y="97">{label[1]}</text>
      </g>

      {/* push-to-talk, on the side where your thumb goes */}
      <rect x="0" y="44" width="5" height="20" rx="2.5" fill="#2c1742" />
    </svg>
  );
}

function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
