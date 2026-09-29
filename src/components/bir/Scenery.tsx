"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { MotionConfig, motion, useReducedMotion, type MotionValue } from "framer-motion";
import type { MediaSlot } from "@/content/bir";
import { pinesPath, ridgePath, starField } from "./art";

/**
 * THE SCENERY KIT — every environmental layer the Bir × Barot page is built
 * from. Sections compose these; none of them holds copy.
 *
 * All motion here is either CSS keyframes (clouds, flags, stars — time-driven,
 * compositor-only) or a MotionValue handed in by the section that owns the
 * scroll. Nothing in this file listens to scroll itself.
 */

/* ------------------------------------------------------------------ */
/* reduced motion                                                      */
/* ------------------------------------------------------------------ */

/**
 * `useReducedMotion`, made hydration-safe.
 *
 * Framer's hook answers from the media query on the client's FIRST render,
 * but the server can't know it — so any component that renders a different
 * tree under reduced motion (a still instead of a sticky sequence, a
 * different clock time) mismatched on hydration for exactly the visitors who
 * asked for less happening. This answers `false` until mounted, then the
 * truth: the server tree hydrates, and the calm version replaces it.
 */
export function useCalm(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}

/** Tells every framer animation on the page to honour the OS setting. */
export function Calm({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ------------------------------------------------------------------ */
/* ridgelines                                                          */
/* ------------------------------------------------------------------ */

/**
 * Precomputed at module load. Named by depth, not by day — the same far range
 * is lit pine-dark in Barot and powder-blue in Bir, which is what makes the
 * four worlds read as one landscape seen at four times of day.
 */
export const RIDGES = {
  peaks: ridgePath({ seed: 11, base: 0.42, amp: 0.55, rough: 0.62 }),
  far: ridgePath({ seed: 23, base: 0.5, amp: 0.42, rough: 0.6 }),
  mid: ridgePath({ seed: 37, base: 0.58, amp: 0.34, rough: 0.56 }),
  near: ridgePath({ seed: 51, base: 0.66, amp: 0.26, rough: 0.52 }),
  front: ridgePath({ seed: 67, base: 0.78, amp: 0.16, rough: 0.48 }),
  hills: ridgePath({ seed: 83, base: 0.7, amp: 0.14, rough: 0.42 }),
  wide: ridgePath({ seed: 97, base: 0.36, amp: 0.6, rough: 0.64 }),
} as const;

export type RidgeName = keyof typeof RIDGES;

/** One range. Full-bleed, anchored to the bottom, stretched to the frame. */
export function Ridge({
  name,
  fill,
  className = "",
  style,
  y,
  scale,
  x,
  opacity,
}: {
  name: RidgeName;
  fill: string;
  className?: string;
  style?: CSSProperties;
  y?: MotionValue<string> | MotionValue<number>;
  x?: MotionValue<string> | MotionValue<number>;
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1600 400"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full ${className}`}
      style={{ ...style, y, x, scale, opacity, transformOrigin: "50% 100%" }}
    >
      <path d={RIDGES[name]} fill={fill} />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/* sky                                                                 */
/* ------------------------------------------------------------------ */

const STARS = starField(7, 90);
const STARS_SPARSE = starField(19, 40, 55);

export function Stars({ sparse = false, className = "", opacity }: { sparse?: boolean; className?: string; opacity?: MotionValue<number> }) {
  const set = sparse ? STARS_SPARSE : STARS;
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} style={{ opacity }}>
      {set.map((s, i) => (
        <span
          key={i}
          className="bir-twinkle absolute rounded-full bg-[#F3EFE6]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.r * 2}px`,
            height: `${s.r * 2}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * Drifting cloud / fog banks. Each bank is a pre-blurred radial gradient —
 * blur is baked into the gradient's falloff rather than applied with
 * `filter`, because an animated full-width blur is the single most expensive
 * thing a phone can be asked to composite.
 */
export function Clouds({
  color = "rgba(239,233,221,0.55)",
  className = "",
  banks = 5,
  speed = 1,
  style,
}: {
  color?: string;
  className?: string;
  banks?: number;
  speed?: number;
  style?: CSSProperties;
}) {
  const layout = [
    { top: "8%", w: "70%", h: "34%", dur: 70, delay: -10 },
    { top: "28%", w: "90%", h: "40%", dur: 95, delay: -40 },
    { top: "52%", w: "80%", h: "36%", dur: 80, delay: -25 },
    { top: "70%", w: "110%", h: "42%", dur: 110, delay: -60 },
    { top: "18%", w: "60%", h: "30%", dur: 60, delay: -5 },
    { top: "44%", w: "75%", h: "30%", dur: 88, delay: -70 },
  ].slice(0, banks);
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={style}>
      {layout.map((b, i) => (
        <span
          key={i}
          className="bir-drift absolute left-0"
          style={{
            top: b.top,
            width: b.w,
            height: b.h,
            background: `radial-gradient(50% 50% at 50% 50%, ${color} 0%, transparent 70%)`,
            animationDuration: `${b.dur / speed}s`,
            animationDelay: `${b.delay / speed}s`,
          }}
        />
      ))}
    </div>
  );
}

/** A horizontal fog band, static. Sits between ridges to separate depth. */
export function FogBand({ color, className = "" }: { color: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${className}`}
      style={{ background: `linear-gradient(to bottom, transparent, ${color} 45%, ${color} 55%, transparent)` }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* prayer flags                                                        */
/* ------------------------------------------------------------------ */

const FLAG_COLOURS = ["#2F6DB3", "#F3EFE6", "#C8412F", "#3F8A4F", "#E5B637"];

/**
 * A string of lungta across the frame, sagging on a catenary. Each flag sways
 * on its own delay so the line never moves in lockstep.
 */
export function PrayerFlags({ count = 22, sag = 60, className = "", y0 = 20 }: { count?: number; sag?: number; className?: string; y0?: number }) {
  const W = 1000;
  const at = (t: number) => y0 + sag * 4 * t * (1 - t);
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return { x: t * W, y: at(t), c: FLAG_COLOURS[i % 5], d: (i * 0.37) % 2.4 };
  });
  const line = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return `${t * W},${at(t)}`;
  }).join(" L");
  const fw = (W / count) * 0.78;
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${y0 + sag + 70}`} preserveAspectRatio="none" className={`pointer-events-none w-full ${className}`}>
      <path d={`M${line}`} stroke="rgba(16,19,17,0.5)" strokeWidth="1.2" fill="none" />
      {flags.map((f, i) => (
        <g key={i} transform={`translate(${f.x - fw / 2} ${f.y})`}>
          <rect
            className="bir-flutter"
            width={fw}
            height={fw * 1.15}
            fill={f.c}
            opacity={0.92}
            style={{ animationDelay: `${-f.d}s`, transformBox: "fill-box", transformOrigin: "50% 0%" }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* fire                                                                */
/* ------------------------------------------------------------------ */

/**
 * Rising embers on a canvas. One rAF loop per instance, which is why there
 * are never more than two on the page and why each one stops the moment it
 * leaves the viewport. Reduced motion gets a still glow and no loop at all.
 */
export function Embers({
  className = "",
  density = 1,
  color = "255,179,107",
}: {
  className?: string;
  density?: number;
  /** r,g,b */
  color?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useCalm();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const N = Math.round((mobile ? 34 : 70) * density);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };
    const ps: P[] = [];
    const spawn = (p?: P): P => {
      const q = p ?? ({} as P);
      q.x = w * (0.3 + Math.random() * 0.4);
      q.y = h * (0.85 + Math.random() * 0.15);
      q.vx = (Math.random() - 0.5) * 0.5;
      q.vy = -(0.5 + Math.random() * 1.3);
      q.life = 0;
      q.max = 90 + Math.random() * 160;
      q.r = 0.6 + Math.random() * 1.8;
      return q;
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < N; i++) {
      const p = spawn();
      p.life = Math.random() * p.max;
      p.y -= Math.random() * h * 0.6;
      ps.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of ps) {
        p.life++;
        p.x += p.vx + Math.sin((p.life + p.r * 40) / 22) * 0.35;
        p.y += p.vy;
        const k = 1 - p.life / p.max;
        if (k <= 0 || p.y < -10) spawn(p);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${Math.max(0, k) * 0.9})`;
        ctx.arc(p.x, p.y, p.r * (0.5 + k * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce, density, color]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/** The glow a fire throws on the ground and on faces. Pure CSS, flickers. */
export function FireGlow({ className = "", intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div
      aria-hidden
      className={`bir-flicker pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(50% 50% at 50% 60%, rgba(255,150,70,${0.55 * intensity}) 0%, rgba(232,121,58,${0.28 * intensity}) 35%, transparent 70%)`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* footage                                                             */
/* ------------------------------------------------------------------ */

/**
 * A media slot. The illustrated scene (`children`) ALWAYS renders — it is the
 * poster, the fallback, and the colour under the footage. If the slot in
 * content/bir.ts carries a video or an image, it is layered over the top.
 *
 * Video is mounted only once the slot is within a screen of the viewport,
 * plays only while visible, and is never mounted under reduced motion (the
 * still, if any, is shown instead).
 */
export function Footage({
  slot,
  children,
  className = "",
  mediaClassName = "",
  eager = false,
  drift = false,
  sizes = "100vw",
}: {
  slot: MediaSlot;
  children?: ReactNode;
  className?: string;
  mediaClassName?: string;
  /** The hero only: mount immediately rather than on approach. */
  eager?: boolean;
  /** A slow push-in on a still, so a photograph still feels like a shot. */
  drift?: boolean;
  sizes?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const reduce = useCalm();
  const [near, setNear] = useState(eager);
  const [ready, setReady] = useState(false);
  const wantsVideo = Boolean(slot.video) && !reduce;

  useEffect(() => {
    const el = wrap.current;
    if (!el || !wantsVideo) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        const v = vid.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wantsVideo, near]);

  // The hero's clip is server-rendered and autoplays before hydration, so its
  // first `playing` event can fire before React is listening. Check the
  // element itself, and listen natively, rather than trusting onPlaying alone.
  useEffect(() => {
    const v = vid.current;
    if (!v || !near) return;
    const on = () => setReady(true);
    if (!v.paused && v.readyState >= 3) on();
    v.addEventListener("playing", on);
    return () => v.removeEventListener("playing", on);
  }, [near]);

  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden ${className}`}>
      {children}
      {slot.image && (!wantsVideo || !ready) && (
        <Image
          src={slot.image}
          alt={slot.alt ?? ""}
          fill
          sizes={sizes}
          priority={eager}
          quality={80}
          className={`bir-grade object-cover ${drift ? "bir-kenburns" : ""} ${mediaClassName}`}
          style={{ objectPosition: slot.focus }}
        />
      )}
      {wantsVideo && near && (
        <video
          ref={vid}
          poster={slot.image}
          muted
          loop
          playsInline
          autoPlay
          preload={eager ? "auto" : "none"}
          aria-label={slot.alt}
          onPlaying={() => setReady(true)}
          className={`bir-grade absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${mediaClassName}`}
          style={{ objectPosition: slot.focus }}
        >
          {slot.webm && <source src={slot.webm} type="video/webm" />}
          <source src={slot.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* type                                                                */
/* ------------------------------------------------------------------ */

/** The small tracked label every world uses above its headline. */
export function Kicker({ children, className = "", color }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[10px] font-semibold tracked sm:text-[11px] ${className}`} style={{ color }}>
      <span className="h-px w-8 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}

/**
 * A headline that arrives line by line from behind a mask — the page's
 * signature text reveal. Never a plain fade.
 *
 * The in-view trigger sits on the HEADLINE, never on the moving line: a line
 * that starts translated out of its overflow-hidden mask has zero visible
 * area, so an observer on the line itself would never fire.
 */
const MASK_PARENT = { hidden: {}, show: {} };
const MASK_LINE = {
  hidden: { y: "105%", opacity: 0.2 },
  show: (i: number) => ({ y: "0%", opacity: 1, transition: { duration: 1.05, delay: i, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as = "h2",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={MASK_PARENT}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${lineClassName}`} variants={MASK_LINE} custom={delay + i * 0.12}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Blur → focus on enter. Blur is on a small text element only, never a full-screen layer. */
export function Focus({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 12 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* flight                                                              */
/* ------------------------------------------------------------------ */

/**
 * A ridge that streams past forever — the "flying" layer. Four tiles,
 * alternately mirrored so every seam meets itself, panned by exactly two
 * tiles so the loop point is invisible. `duration` sets the airspeed: far
 * ranges slow, near ranges fast, which is where the sense of height comes from.
 */
export function PanRidge({
  name,
  fill,
  duration = 60,
  className = "",
  reverse = false,
}: {
  name: RidgeName;
  fill: string;
  duration?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}>
      <div
        className="bir-pan flex h-full w-[600%] sm:w-[400%]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <svg
            key={i}
            viewBox="0 0 1600 400"
            preserveAspectRatio="none"
            className="h-full w-1/4 shrink-0"
            style={{ transform: i % 2 ? "scaleX(-1)" : undefined }}
          >
            <path d={RIDGES[name]} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** Attachment points along the canopy's trailing edge (the quadratic below). */
const GLIDER_LINES = [0, 1, 2, 3, 4, 5, 6].map((i) => {
  const t = i / 6;
  const u = 1 - t;
  return [u * u * 20 + 2 * u * t * 100 + t * t * 180, u * u * 56 + 2 * u * t * 14 + t * t * 56] as const;
});

/**
 * A tandem paraglider, drawn: a ram-air canopy, its lines, and two figures in
 * one harness. Deliberately a silhouette — against a bright sky that is what
 * a glider actually looks like from the ground.
 */
export function Glider({ className = "", color = "#101311", canopy = "#E8793A" }: { className?: string; color?: string; canopy?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 170" className={className}>
      <path d="M12 44 Q100 -6 188 44 L180 56 Q100 14 20 56 Z" fill={canopy} />
      <path d="M20 56 Q100 14 180 56" stroke={color} strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
      {GLIDER_LINES.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={100 + (x - 100) * 0.06} y2="128" stroke={color} strokeOpacity="0.55" strokeWidth="0.8" />
      ))}
      {/* pilot behind, passenger in front */}
      <g fill={color}>
        <circle cx="94" cy="130" r="5" />
        <path d="M88 136 h12 l3 16 h-18 z" />
        <circle cx="108" cy="138" r="5" />
        <path d="M102 144 h12 l6 12 l-4 3 l-5 -7 l-2 10 h-8 z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* forest                                                              */
/* ------------------------------------------------------------------ */

export const PINES = {
  far: pinesPath({ seed: 5, count: 80, baseY: 330, minH: 40, maxH: 90 }),
  mid: pinesPath({ seed: 9, count: 46, baseY: 370, minH: 90, maxH: 180 }),
  near: pinesPath({ seed: 14, count: 22, baseY: 410, minH: 200, maxH: 340 }),
} as const;

/** A forest layer. Same contract as <Ridge/>. */
export function Pines({
  name,
  fill,
  className = "",
  style,
  y,
  x,
}: {
  name: keyof typeof PINES;
  fill: string;
  className?: string;
  style?: CSSProperties;
  y?: MotionValue<string> | MotionValue<number>;
  x?: MotionValue<string> | MotionValue<number>;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1600 400"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full ${className}`}
      style={{ ...style, y, x }}
    >
      <path d={PINES[name]} fill={fill} />
    </motion.svg>
  );
}

/** Three flame tongues, flickering at different rates. */
export function Flames() {
  return (
    <div className="absolute inset-x-0 bottom-[6%] flex h-[70%] items-end justify-center">
      {[
        { w: "18%", h: "90%", c: "#ff8a3d", d: "1.3s" },
        { w: "26%", h: "100%", c: "#ffb36b", d: "1.7s" },
        { w: "16%", h: "75%", c: "#e8793a", d: "1.1s" },
      ].map((f, i) => (
        <span
          key={i}
          className="bir-flicker -mx-[3%] block"
          style={{
            width: f.w,
            height: f.h,
            background: `radial-gradient(50% 60% at 50% 80%, ${f.c} 0%, rgba(232,121,58,0.6) 40%, transparent 72%)`,
            borderRadius: "50% 50% 45% 45% / 70% 70% 30% 30%",
            animationDuration: f.d,
            transformOrigin: "50% 100%",
          }}
        />
      ))}
      <span className="absolute bottom-0 h-3 w-[40%] rounded-full bg-[#1a0f08]" />
    </div>
  );
}
