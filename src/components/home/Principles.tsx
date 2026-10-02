"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { principles } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/** Each principle's second line gets a different hand — variation is the point. */
const HANDS = [
  "font-brush text-pink",
  "font-serif italic normal-case text-sunset",
  "text-transparent [-webkit-text-stroke:1.5px_#1A0D0A]",
  "font-brush text-ocean",
  "font-serif italic normal-case text-pink",
] as const;

/**
 * WHY PLOT TWIST — five principles, set like the contents page of a magazine.
 *
 * No icons, no cards. Each principle is a huge two-line title across the
 * page; its second line is set in a different hand every time. On desktop,
 * hovering a row pulls its photograph out under the cursor like a print
 * pulled from a pile; on phones the print sits beside the title, pinned.
 *
 * Paper-coloured on purpose: after four full-bleed worlds, the page needs to
 * exhale before it explains anything.
 */
export function Principles() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28 });
  const y = useSpring(my, { stiffness: 260, damping: 28 });

  return (
    <section className="paper relative overflow-hidden px-5 py-24 text-ink sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-ink/60">
          <span className="h-px w-10 bg-ink/40" /> {principles.eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,10vw,7rem)] uppercase leading-[0.9] tracking-[-0.01em]">
          {principles.headline[0]}
          <br />
          <span className="font-serif italic normal-case tracking-[-0.02em] text-pink">{principles.headline[1].toLowerCase()}</span>
        </h2>

        <ol
          className="mt-16 border-t border-ink/20"
          onPointerMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {principles.items.map((item, i) => (
            <motion.li
              key={item.n}
              className="group relative grid grid-cols-[1fr_auto] gap-x-4 border-b border-ink/20 py-8 sm:py-10 lg:grid-cols-[4rem_1fr_22rem] lg:gap-x-10"
              onPointerEnter={() => setHover(i)}
              initial={reduce ? undefined : { opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="col-span-2 mb-2 font-display text-[15px] text-pink lg:col-span-1 lg:mb-0 lg:pt-3">{item.n}</span>

              <h3 className="font-display text-[clamp(2.1rem,8.4vw,5.6rem)] uppercase leading-[0.9] tracking-[-0.01em] transition-transform duration-500 lg:group-hover:translate-x-4">
                {item.title[0]}
                <br />
                <span className={HANDS[i % HANDS.length]}>{item.title[1]}</span>
              </h3>

              {/* phones: the print, pinned beside the title */}
              <div className="pin relative mt-2 w-[6.5rem] shrink-0 self-start sm:w-[8.5rem] lg:hidden" style={{ rotate: `${i % 2 ? 4 : -4}deg` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={item.image} alt="" fill sizes="140px" className="object-cover" />
                </div>
                <span className="absolute inset-x-0 bottom-2 text-center font-hand text-[0.95rem] leading-none text-ink/80">{item.note}</span>
              </div>

              <p className="col-span-2 mt-4 max-w-[34ch] text-[clamp(1rem,2.8vw,1.15rem)] leading-[1.45] text-ink/75 lg:col-span-1 lg:mt-0 lg:self-end">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* desktop: the print that follows the cursor */}
      {!reduce && (
        <motion.div className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block" style={{ x, y }} aria-hidden>
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={hover}
                className="pin absolute -translate-x-1/2 -translate-y-[60%]"
                initial={{ opacity: 0, scale: 0.8, rotate: -8, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, scale: 1, rotate: hover % 2 ? 5 : -5, clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease }}
              >
                <div className="relative h-[17rem] w-[14rem] overflow-hidden">
                  <Image src={principles.items[hover].image} alt="" fill sizes="224px" className="object-cover" />
                </div>
                <span className="absolute inset-x-0 bottom-3 text-center font-hand text-[1.3rem] leading-none text-ink/85">
                  {principles.items[hover].note}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
