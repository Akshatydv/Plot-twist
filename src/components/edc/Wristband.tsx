"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wristband } from "@/content/thailand";
import { Note } from "../Bits";

/**
 * THE WRISTBAND — the page's one properly playable object.
 *
 * The stickers can be thrown around; this one can be USED. Tap it and the
 * loose end swings shut, the RFID chip lights, a ring fires off it, and the
 * label changes. It is the only element on the site that holds a state the
 * visitor put it in.
 *
 * ─── WHY A WRISTBAND ────────────────────────────────────────────────────────
 * It is the object this entire page is built around — the credential, the
 * thing that means you are inside. Fastening one is also the most recognisable
 * physical gesture of going to a festival, and it is irreversible in real
 * life, which is the joke the copy lands on.
 *
 * ─── IT IS A TOY, AND MUST STAY ONE ─────────────────────────────────────────
 * It submits nothing, gates nothing, and no other part of the page reads its
 * state. That restraint is deliberate rather than laziness: the moment someone
 * could believe fastening it had registered them for something, it stops being
 * a toy and becomes a dark pattern — on a page whose whole job is to be clear
 * that nothing here is a booking.
 *
 * For the same reason it is a real <button> with `aria-pressed`, not a div
 * with a click handler. A screen reader gets a labelled toggle that plainly
 * does nothing else.
 *
 * ─── REDUCED MOTION ─────────────────────────────────────────────────────────
 * Still tappable, still changes state and lights the chip. Only the swing, the
 * spring and the burst are dropped — the toy survives, the motion doesn't.
 */
export function Wristband({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  const [burst, setBurst] = useState(0);
  const timer = useRef<number | null>(null);

  const toggle = () => {
    const next = !on;
    setOn(next);
    if (next && !reduce) {
      // Keyed remount of the ring, so a fast double-tap re-fires it cleanly
      // instead of the animation being ignored while already running.
      setBurst((b) => b + 1);
      if (timer.current) window.clearTimeout(timer.current);
    }
  };

  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? wristband.fastened : wristband.idle}
        className="group relative touch-manipulation outline-none"
      >
        {/* the ring that fires off it on fasten */}
        {burst > 0 && !reduce && (
          <motion.span
            key={burst}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--edc-hot)]"
            initial={{ width: 40, height: 40, opacity: 0.85 }}
            animate={{ width: 260, height: 260, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            aria-hidden
          />
        )}

        <span className={`edc-band ${on ? "edc-band--on" : ""} relative flex items-center gap-3 px-4 py-3`}>
          {/* the RFID chip */}
          <span className="edc-band-chip block h-5 w-7 shrink-0 sm:h-6 sm:w-8" aria-hidden />

          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-[10px] uppercase tracking-[0.18em] text-[#0a0414]/75 sm:text-[11px]">
              {wristband.label}
            </span>
            <span className="mt-1 font-display text-[13px] uppercase tracking-[0.08em] text-[#0a0414] sm:text-[15px]">
              {on ? wristband.fastened : wristband.idle}
            </span>
          </span>

          {/*
            THE LOOSE END. It is a separate span so it can swing independently
            of the band — hinged at its left edge, sticking out when open and
            folding flush when fastened. That hinge is the whole illusion: a
            band that merely changed colour would read as a button.
          */}
          <motion.span
            className="block h-7 w-9 shrink-0 rounded-r-[3px] sm:h-8 sm:w-11"
            style={{
              originX: 0,
              background:
                "repeating-linear-gradient(115deg, rgba(10,4,20,0.18) 0 3px, transparent 3px 7px), linear-gradient(90deg, var(--edc-blush), var(--edc-hot))",
            }}
            animate={reduce ? undefined : { rotate: on ? 0 : -34, x: on ? 0 : 3 }}
            transition={{ type: "spring", stiffness: 320, damping: 17 }}
            aria-hidden
          />

          <span className="edc-meta ml-1 shrink-0 !text-[8px] !text-[#0a0414] !opacity-55">
            {wristband.serial}
          </span>
        </span>
      </button>

      {/*
        The punchline only lands once it is on — but its SPACE is reserved
        whether it is showing or not. Mounting it on tap grew the container and
        pushed everything below it down, which on a phone means the thing you
        just touched moves under your thumb. A toy is not allowed to shift the
        page.
      */}
      <div className="h-6" aria-hidden={!on}>
        {on && (
          <Note className="block text-[1.15rem] text-sand/65" rotate={-3}>
            {wristband.note}
          </Note>
        )}
      </div>
    </div>
  );
}
