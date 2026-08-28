"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track, type PlotEvent } from "@/lib/analytics";

export function SectionLabel({
  index,
  label,
  color = "#1A0D0A",
  className = "",
}: {
  index: string;
  label: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracked font-medium ${className}`} style={{ color }}>
      <span className="font-display text-[15px] tracking-normal opacity-70">{index}</span>
      <span className="h-px w-8 sm:w-14" style={{ background: color, opacity: 0.4 }} />
      <span>{label}</span>
    </div>
  );
}

/**
 * Small recurring stamp for the "20 spots, no fillers" motif — quality over
 * quantity, repeated across sections rather than stated once and forgotten.
 */
export function Stamp({
  children,
  color = "#FF4F87",
  className = "",
  rotate = -3,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 text-[11px] font-semibold tracked ${className}`}
      style={{ borderColor: color, color, rotate }}
      initial={reduce ? undefined : { opacity: 0, scale: 0.88, rotate: rotate - 6 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 220, damping: 15 }}
    >
      {children}
    </motion.span>
  );
}

/** Hand-written margin note. */
export function Note({
  children,
  className = "",
  color,
  rotate = -6,
}: {
  children: ReactNode;
  className?: string;
  /** Leave unset to inherit the colour from a Tailwind class on `className`. */
  color?: string;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`font-hand leading-[0.95] ${className}`}
      style={{ color, rotate }}
      initial={reduce ? undefined : { opacity: 0, y: 10, rotate: rotate - 4 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

/**
 * The only button style on the site: a painted slab that shifts off its
 * shadow on press. No pills, no gradients.
 */
export function PlotButton({
  href,
  children,
  bg = "#1A0D0A",
  fg = "#FFF1DC",
  shadow = "#FF4F87",
  className = "",
  event,
}: {
  href: string;
  children: ReactNode;
  bg?: string;
  fg?: string;
  shadow?: string;
  className?: string;
  /** Optional funnel event. Every CTA is this component, so tracking lives here. */
  event?: PlotEvent;
}) {
  return (
    <a
      href={href}
      onClick={event ? () => track(event) : undefined}
      className={`group relative inline-flex touch-manipulation items-center gap-3 px-7 py-4 text-[13px] font-semibold tracked uppercase transition-transform duration-200 ease-out will-change-transform hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 ${className}`}
      style={{ background: bg, color: fg, boxShadow: `6px 6px 0 0 ${shadow}` }}
    >
      <span>{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
        →
      </span>
    </a>
  );
}
