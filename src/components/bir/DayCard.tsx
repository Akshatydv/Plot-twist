"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { MediaSlot } from "@/content/bir";
import { Focus, Footage, useCalm } from "./Scenery";

/**
 * THE CHAPTER CARD — how every day begins.
 *
 * A full screen that belongs entirely to one world: its ground colour, its
 * scene, its name set enormous. The same component opens all four days so
 * the grammar is consistent — only the world changes, which is the point.
 *
 * The scene is a render prop that receives this card's scroll progress
 * (0 as the card enters from below, 1 as it leaves at the top), so each day
 * can move its own layers at its own speeds without re-owning the scroll.
 */
export function DayCard({
  id,
  hud,
  day,
  emoji,
  name,
  place,
  lines,
  ground,
  ink,
  accent,
  scene,
  slot,
  tint,
  className = "",
}: {
  id: string;
  hud: string;
  day: string;
  emoji: string;
  name: string;
  place?: string;
  lines?: readonly string[];
  ground: string;
  ink: string;
  accent: string;
  scene: (p: MotionValue<number>) => ReactNode;
  /** A photograph of this world, laid over the scene and tinted into its palette. */
  slot?: MediaSlot;
  /** The wash that pulls a photograph into the day's colours and keeps the title legible. */
  tint?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(p, [0, 1], ["18%", "-18%"]);
  const letter = useTransform(p, [0.1, 0.5], ["0.2em", "-0.02em"]);
  const photoY = useTransform(p, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id={id}
      ref={ref}
      data-hud={hud}
      className={`relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-14 ${className}`}
      style={{ background: ground, color: ink }}
    >
      <div className="absolute inset-0">{scene(p)}</div>
      {slot?.image && (
        <motion.div className="absolute inset-[-10%_0]" style={{ y: reduce ? undefined : photoY }}>
          <Footage slot={slot} drift />
          <div className="absolute inset-0" style={{ background: tint }} />
        </motion.div>
      )}
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div className="relative z-10 w-full" style={{ y: reduce ? undefined : titleY }}>
        <Focus>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracked" style={{ color: accent }}>
            <span aria-hidden className="text-base">
              {emoji}
            </span>
            {day}
            {place && (
              <>
                <span className="h-px w-8 bg-current opacity-50" aria-hidden />
                {place}
              </>
            )}
          </p>
        </Focus>
        {/* the trigger is on the h2, not the span: see MaskLines for why */}
        <motion.h2
          className="mt-4 overflow-hidden font-serif leading-[0.84]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="block text-[clamp(3.6rem,17vw,13rem)]"
            style={{ letterSpacing: reduce ? "-0.02em" : letter }}
            variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.span>
        </motion.h2>
        {lines && (
          <div className="mt-6 max-w-[34ch]">
            {lines.map((l, i) => (
              <Focus key={l} delay={0.35 + i * 0.25}>
                <p className="font-serif text-[clamp(1.35rem,3.6vw,2.4rem)] italic leading-[1.12]">{l}</p>
              </Focus>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
