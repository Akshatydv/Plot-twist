"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { MediaSlot } from "@/content/srilanka";
import { Focus, Footage, useCalm } from "../bir/Scenery";

/**
 * THE ISLAND KIT — the Sri Lanka page's own primitives. Everything
 * environmental (footage slots, the mask reveal, blur-to-focus, reduced
 * motion) is borrowed from the Bir kit rather than copied; what lives here is
 * what this page does that Bir doesn't: a chapter card per day, the pinned
 * horizontal reel, and the midnight burst.
 */

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ------------------------------------------------------------------ */
/* the chapter card                                                    */
/* ------------------------------------------------------------------ */

/**
 * HOW EVERY WORLD BEGINS — one full screen that belongs to one day.
 *
 * The date is set enormous in condensed type behind the chapter's name, and
 * the frame OPENS as it arrives: the footage starts as a letterboxed window
 * and its clip-path widens to full bleed as the card reaches the top of the
 * screen. The same card opens all seven days so the grammar never changes —
 * only the world does.
 */
export function WorldCard({
  n,
  date,
  name,
  place,
  lines,
  slot,
  tone,
  tint = "linear-gradient(to bottom, rgba(7,9,10,0.35) 0%, rgba(7,9,10,0.15) 40%, rgba(7,9,10,0.82) 100%)",
  ground = "#07090a",
  ink = "#F4EDE1",
}: {
  n: string;
  date: string;
  name: string;
  place: string;
  lines?: readonly string[];
  slot: MediaSlot;
  tone: string;
  tint?: string;
  ground?: string;
  ink?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(p, [0, 0.42], ["inset(14% 9% 14% 9%)", "inset(0% 0% 0% 0%)"]);
  const mediaY = useTransform(p, [0, 1], ["-6%", "10%"]);
  const dateX = useTransform(p, [0, 1], ["6%", "-10%"]);
  const titleY = useTransform(p, [0.2, 1], ["8%", "-14%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-14" style={{ background: ground, color: ink }}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: clip }}>
        <motion.div className="absolute inset-[-8%_0]" style={reduce ? undefined : { y: mediaY }}>
          <Footage slot={slot} drift />
        </motion.div>
        <div className="absolute inset-0" style={{ background: tint }} />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0" />

      {/* the date, enormous, sliding slowly against the scroll */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-[12%] whitespace-nowrap font-display text-[clamp(7rem,34vw,30rem)] leading-[0.8] tracking-[-0.02em] opacity-[0.9]"
        style={{ x: reduce ? undefined : dateX, WebkitTextStroke: `1.5px ${tone}`, color: "transparent" }}
      >
        {date}
      </motion.span>

      <motion.div className="relative z-10 w-full" style={{ y: reduce ? undefined : titleY }}>
        <Focus>
          <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracked" style={{ color: tone }}>
            <span className="font-display text-[15px] tracking-normal">{n} / 07</span>
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            {date}
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            {place}
          </p>
        </Focus>
        <motion.h2
          className="mt-4 overflow-hidden pb-[0.06em] font-serif leading-[0.86] tracking-[-0.02em]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            className="block text-[clamp(3.4rem,13.5vw,12rem)]"
            variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.span>
        </motion.h2>
        {lines && (
          <div className="mt-5 max-w-[36ch]">
            {lines.map((l, i) => (
              <Focus key={l} delay={0.3 + i * 0.22}>
                <p className="font-serif text-[clamp(1.3rem,3.4vw,2.3rem)] italic leading-[1.12]">{l}</p>
              </Focus>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the pinned horizontal reel                                          */
/* ------------------------------------------------------------------ */

/**
 * VERTICAL SCROLL, SIDEWAYS FILM. The section is as tall as the reel is
 * wide; inside it, one sticky screen whose track slides left as you scroll
 * down. On a phone that is a swipe-up that moves the story sideways, which
 * is exactly the gesture Instagram trained.
 *
 * The distance is MEASURED (track width minus viewport) rather than assumed,
 * so panels can be any width. Reduced motion gets a native horizontal
 * scroller with snap points instead of a pinned section.
 *
 * `children` receives the reel's progress (0–1), for anything that wants to
 * move with it — a route line, a counter.
 */
export function HorizontalReel({
  children,
  className = "",
  trackClassName = "",
  label,
  lead,
}: {
  children: (p: MotionValue<number>) => ReactNode;
  className?: string;
  trackClassName?: string;
  label?: string;
  /** Rendered pinned above the track (inside the sticky screen), e.g. a progress line. */
  lead?: (p: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], [0, -dist]);

  useIsoLayout(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      setDist(Math.max(0, el.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (reduce) {
    return (
      <section aria-label={label} className={`relative ${className}`}>
        {lead?.(p)}
        <div className={`sl-reel flex snap-x snap-mandatory overflow-x-auto ${trackClassName}`}>{children(p)}</div>
      </section>
    );
  }

  return (
    // height = one screen + the horizontal distance, so a pixel of scroll is a pixel of travel
    <section ref={ref} aria-label={label} className={`relative ${className}`} style={{ height: vh ? vh + dist : "400svh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {lead?.(p)}
        <motion.div ref={track} className={`flex h-full w-max ${trackClassName}`} style={{ x }}>
          {children(p)}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the midnight burst                                                  */
/* ------------------------------------------------------------------ */

/**
 * Fireworks on a canvas — fired once each time `fire` flips true, runs for a
 * few seconds and stops its own loop. Never runs under reduced motion. Same
 * discipline as Bir's embers: one rAF loop, and only while there is
 * something to draw.
 */
export function Burst({ fire, className = "" }: { fire: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useCalm();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce || !fire) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colours = ["255,214,140", "255,79,109", "63,208,191", "255,255,255", "242,162,58"];
    const mobile = w < 640;
    type S = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string };
    const sparks: S[] = [];
    const shell = (cx: number, cy: number) => {
      const n = mobile ? 46 : 80;
      const c = colours[Math.floor(Math.random() * colours.length)];
      const speed = (mobile ? 2.6 : 3.6) * (0.8 + Math.random() * 0.4);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const s = speed * (0.6 + Math.random() * 0.5);
        sparks.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 70 + Math.random() * 40, c });
      }
    };
    const plan = [0, 260, 520, 900, 1250, 1600];
    const timers = plan.map((t) => window.setTimeout(() => shell(w * (0.2 + Math.random() * 0.6), h * (0.18 + Math.random() * 0.35)), t));

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const s of sparks) {
        if (s.life > s.max) continue;
        s.life++;
        s.vx *= 0.975;
        s.vy = s.vy * 0.975 + 0.035;
        s.x += s.vx;
        s.y += s.vy;
        const k = 1 - s.life / s.max;
        ctx.fillStyle = `rgba(${s.c},${k})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.3 + k, 0, Math.PI * 2);
        ctx.fill();
      }
      if (now - start < 4200) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    };
  }, [fire, reduce]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/** A tiny tracked label with a rule, in the world's colour. */
export function Tag({ children, color, className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[10px] font-semibold tracked sm:text-[11px] ${className}`} style={{ color }}>
      <span className="h-px w-8 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}
