"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { world5 } from "@/content/srilanka";
import { Note } from "../Bits";
import { Footage, FrameStack, useCalm } from "../bir/Scenery";
import { Tag, WorldCard } from "./Kit";

/**
 * WORLD 05 — 2 JAN — SALT & SUN. Ahangama → Mirissa.
 *
 *   the card    → open water from above, a wake heading for an island
 *   the hops    → five places down the coast as five enormous words. The
 *                 screen behind them is whichever one you're on (or hovering,
 *                 on desktop) — the coast changes under the type.
 *   the boat    → THE FLOATING SUNSET. A pinned screen at sea: the horizon
 *                 rocks a degree either way as you scroll, a sun sinks
 *                 through the frame, and the words float up out of the water
 *                 one by one, bobbing, never in step.
 *
 * Turquoise and deep sea-blue: the brightest saturated chapter, sitting
 * between the paper morning and the violet last night.
 */
export function WorldSaltSun() {
  return (
    <div id={world5.id} data-world={world5.id} className="relative bg-[var(--sl-deep)]">
      <WorldCard
        n={world5.n}
        date={world5.date}
        name={world5.name}
        place={world5.place}
        lines={world5.lines}
        slot={world5.slot}
        tone={world5.tone}
        ground="#062b33"
        tint="linear-gradient(to bottom, rgba(6,43,51,0.15) 0%, rgba(6,43,51,0.05) 45%, rgba(6,43,51,0.85) 100%)"
      />
      <Hops />
      <FloatingSunset />
    </div>
  );
}

function Hops() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative" aria-label="Beach-hopping down the south coast">
      {/* the coast behind the words, pinned while they pass */}
      <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden">
        <FrameStack frames={world5.hops.map((h) => h.slot)} active={active} tint="linear-gradient(90deg, rgba(4,30,36,0.82) 0%, rgba(4,30,36,0.45) 55%, rgba(4,30,36,0.15) 100%)" />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-10 px-5 py-[30svh] sm:px-8 lg:px-14">
        <Tag color="#3FD0BF" className="mb-10">
          BEACH-HOPPING · THE SOUTH COAST
        </Tag>
        <ol>
          {world5.hops.map((h, i) => (
            <li
              key={h.word}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              onMouseEnter={() => setActive(i)}
              className="py-[9svh]"
            >
              <span
                className="block font-display text-[clamp(3rem,11vw,9.5rem)] uppercase leading-[0.86] transition-all duration-500"
                style={i === active ? { color: "#F4EDE1" } : { color: "transparent", WebkitTextStroke: "1.2px rgba(244,237,225,0.45)" }}
              >
                {h.word}
              </span>
              <span className={`mt-2 block font-hand text-[1.4rem] leading-tight transition-opacity duration-500 sm:text-[1.7rem] ${i === active ? "text-[var(--sl-lagoon)] opacity-100" : "opacity-0"}`}>{h.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FloatingSunset() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const F = world5.floating;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const tilt = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [-1.2, 1, -0.8, 1.1, 0]);
  const sunY = useTransform(p, [0, 1], ["18%", "62%"]);
  const sunO = useTransform(p, [0.75, 1], [1, 0.3]);
  const titleO = useTransform(p, [0, 0.12, 0.2], [1, 1, 0]);
  const dusk = useTransform(p, [0.5, 1], [0, 0.55]);
  const [word, setWord] = useState(-1);
  useMotionValueEvent(p, "change", (v) => {
    const w = v < 0.18 ? -1 : Math.min(F.words.length - 1, Math.floor(((v - 0.18) / 0.75) * F.words.length));
    setWord((c) => (c === w ? c : w));
  });

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 sm:px-8 lg:px-14">
        <Footage slot={F.slot} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative">
          <h3 className="font-serif text-[4rem] leading-none">{F.title.join(" ")}</h3>
          <p className="mt-4 font-serif text-[1.5rem] italic">{F.words.join(" ")}</p>
          <p className="mt-4 max-w-[46ch] text-white/75">{F.note}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={`${F.title.join(" ")}. ${F.words.join(" ")}`} className="relative h-[380svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#1a0d10]">
        {/* the sea, rocking */}
        <motion.div className="absolute -inset-[6%]" style={{ rotate: tilt }}>
          <Footage slot={F.slot} />
        </motion.div>
        {/* the sun, sinking through the frame */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 rounded-full mix-blend-screen"
          style={{ top: sunY, opacity: sunO, background: "radial-gradient(circle, rgba(255,214,150,0.95) 0%, rgba(255,140,80,0.45) 32%, rgba(255,106,61,0) 68%)" }}
        />
        <motion.div className="absolute inset-0 bg-[#1a0716]" style={{ opacity: dusk }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="grain pointer-events-none absolute inset-0" />

        <motion.div className="absolute inset-x-5 top-24 z-10 sm:inset-x-8 lg:inset-x-14" style={{ opacity: titleO }}>
          <Tag color="#FFB37A">{F.kicker}</Tag>
          <h3 className="mt-4 font-serif text-[clamp(3.6rem,13vw,11rem)] leading-[0.84] tracking-[-0.03em] text-[var(--sl-bone)]">
            {F.title[0]}
            <br />
            <span className="italic text-[#FFB37A]">{F.title[1]}</span>
          </h3>
        </motion.div>

        {/* the words, floating up out of the water; earlier ones drift off above */}
        <div className="absolute inset-0 z-10">
          {F.words.map((w, i) => {
            const state = i === word ? "now" : i < word ? "gone" : "wait";
            return (
              <motion.p
                key={w}
                className="absolute inset-x-5 top-1/2 text-center sm:inset-x-16"
                initial={false}
                animate={{
                  opacity: state === "now" ? 1 : 0,
                  y: state === "now" ? "-50%" : state === "gone" ? "-160%" : "60%",
                  x: state === "now" ? "0%" : state === "gone" ? (i % 2 ? "-6%" : "6%") : "0%",
                }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="sl-bob inline-block font-serif text-[clamp(2.2rem,7vw,5.6rem)] italic leading-[1.02] text-[var(--sl-bone)] [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]" style={{ animationDelay: `${-i * 1.3}s` }}>
                  {w}
                </span>
              </motion.p>
            );
          })}
        </div>

        <div className="absolute inset-x-5 bottom-[92px] z-10 flex flex-col gap-3 sm:bottom-10 sm:inset-x-8 sm:flex-row sm:items-end sm:justify-between lg:inset-x-14">
          <p className="max-w-[40ch] text-[0.95rem] leading-[1.5] text-[var(--sl-bone)]/75">{F.note}</p>
          <Note className="text-[1.4rem] text-[#FFB37A]" rotate={-3}>
            {F.scribble}
          </Note>
        </div>
      </div>
    </section>
  );
}
