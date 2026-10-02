"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { world6 } from "@/content/srilanka";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";
import { Tag, WorldCard } from "./Kit";

/**
 * WORLD 06 — 3 JAN — ONE LAST NIGHT. Mirissa → Colombo.
 *
 *   the card    → Colombo at night, doubled in the water
 *   the drive   → the coast road home, and the trip so far landing on top of
 *                 itself as a pile of prints — one per stretch of scroll
 *   the supper  → THE LAST SUPPER: the evening as a printed menu, and six
 *                 award cards that flip when tapped, every winner sealed
 *                 until the night itself
 *
 * Violet: the colour of the end of something good. Nostalgic, not sad.
 */
export function WorldLastNight() {
  return (
    <div id={world6.id} data-world={world6.id} className="relative bg-[var(--sl-violet)]">
      <WorldCard
        n={world6.n}
        date={world6.date}
        name={world6.name}
        place={world6.place}
        lines={world6.lines}
        slot={world6.slot}
        tone={world6.tone}
        ground="#2a1640"
        tint="linear-gradient(to bottom, rgba(42,22,64,0.3) 0%, rgba(42,22,64,0.1) 45%, rgba(42,22,64,0.9) 100%)"
      />
      <Drive />
      <Supper />
    </div>
  );
}

function Drive() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const M = world6.memories;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [count, setCount] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const c = Math.min(M.length, Math.floor(v * (M.length + 0.6)));
    setCount((x) => (x === c ? x : c));
  });
  const shown = reduce ? M.length : count;

  return (
    <section ref={ref} aria-label={world6.road.note} className={reduce ? "relative" : "relative h-[300svh]"}>
      <div className={`${reduce ? "relative min-h-[100svh] py-20" : "sticky top-0 h-[100svh]"} overflow-hidden bg-[#160b24]`}>
        <div className="absolute inset-0 opacity-45">
          <Footage slot={{ video: "/videos/srilanka/road.mp4", image: "/videos/srilanka/road-poster.jpg", alt: "A road curving through hills under low cloud" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#160b24]/80 via-[#2a1640]/40 to-[#160b24]/90" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col px-5 pt-24 sm:px-8 lg:px-14">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracked text-[var(--sl-dusk)]">
            <span>{world6.road.from}</span>
            <span className="relative h-px w-24 bg-white/20 sm:w-48">
              <motion.span className="absolute inset-y-0 left-0 bg-[var(--sl-dusk)]" style={{ width: `${(shown / M.length) * 100}%` }} />
            </span>
            <span>{world6.road.to}</span>
          </div>
          <p className="mt-4 max-w-[30ch] font-serif text-[clamp(1.4rem,3.6vw,2.4rem)] italic leading-[1.1] text-[var(--sl-bone)]/85">{world6.road.note}</p>

          {/* the pile */}
          <div className="relative mx-auto mt-6 w-[min(70vw,24rem)] flex-1">
            {M.map((m, i) => {
              const r = ((i * 37) % 17) - 8;
              const dx = ((i * 53) % 61) - 30;
              return (
                <motion.figure
                  key={m.caption}
                  className="absolute left-1/2 top-[6%] w-full bg-[#f4ede1] p-2.5 pb-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]"
                  style={{ zIndex: i }}
                  initial={false}
                  animate={i < shown ? { opacity: 1, x: `calc(-50% + ${dx}px)`, y: 0, rotate: r, scale: 1 } : { opacity: 0, x: "-50%", y: 80, rotate: r * 2, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#d9cfe6]">
                    <Image src={m.image} alt="" fill sizes="24rem" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 font-hand text-[1.2rem] leading-none text-[#1b1712]/80">{m.caption}</figcaption>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Supper() {
  const S = world6.supper;
  return (
    <section className="relative overflow-hidden">
      {/* the sunset, then the table */}
      <div className="relative h-[70svh] min-h-[26rem] overflow-hidden">
        <Footage slot={S.slot} drift />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2a1640]/20 to-[#2a1640]" />
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-14">
          <Tag color="#C9A7FF">{S.kicker}</Tag>
          <MaskLines lines={S.title} className="mt-4 font-serif text-[clamp(3.8rem,14vw,12rem)] leading-[0.82] tracking-[-0.03em] text-[var(--sl-bone)]" />
        </div>
      </div>

      <div className="relative px-5 pb-24 pt-10 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Focus>
              <p className="max-w-[40ch] font-serif text-[clamp(1.4rem,3.2vw,2.1rem)] italic leading-[1.2] text-[var(--sl-bone)]/90">{S.body}</p>
            </Focus>
            {/* the evening, as a printed menu */}
            <ol className="mt-10 border-y border-[var(--sl-dusk)]/30 py-6">
              {S.courses.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex items-baseline gap-4 py-1.5"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <span className="w-8 font-serif text-[1rem] italic text-[var(--sl-dusk)]">{["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"][i]}.</span>
                  <span className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] leading-tight text-[var(--sl-bone)]">{c}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <Awards />
        </div>
      </div>
    </section>
  );
}

function Awards() {
  const A = world6.supper.awards;
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (i: number) => setFlipped((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Tag color="#C9A7FF">{A.label}</Tag>
        <span className="font-hand text-[1.2rem] text-[var(--sl-bone)]/55">{A.hint}</span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        {A.items.map((a, i) => {
          const on = flipped.includes(i);
          return (
            <li key={a} className="[perspective:900px]">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                aria-label={`${a} — winner ${on ? "sealed until 3 January" : "hidden"}`}
                className="relative block aspect-[4/3] w-full touch-manipulation text-left"
              >
                {/* a two-step turn: edge-on, swap the face, back round — no reliance on 3D backfaces */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={on ? "back" : "front"}
                    className={`absolute inset-0 flex flex-col p-3 sm:p-4 ${on ? "items-center justify-center gap-2 bg-[var(--sl-dusk)] text-center text-[#1d0f2e]" : "justify-between border border-[var(--sl-dusk)]/40 bg-[#1d0f2e]"}`}
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    {on ? (
                      <>
                        <span className="font-display text-[clamp(2.4rem,6vw,3.4rem)] leading-none">?</span>
                        <span className="text-[10px] font-semibold tracked">{A.sealed}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-[12px] text-[var(--sl-dusk)]">★ {String(i + 1).padStart(2, "0")}</span>
                        <span className="font-serif text-[clamp(1.05rem,2.4vw,1.45rem)] leading-[1.1] text-[var(--sl-bone)]">{a}</span>
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
