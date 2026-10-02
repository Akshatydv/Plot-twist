"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { worldsIntro } from "@/content/home";
import type { World } from "@/content/homeWorlds";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { MarkerUnderline } from "../Brush";
import { Footage } from "./Footage";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * CHOOSE YOUR PLOT TWIST — the journeys, as worlds.
 *
 * ─── TWO LAYOUTS, ONE SET OF PANELS ─────────────────────────────────────────
 * DESKTOP (≥1024px, fine pointer, motion allowed): the section pins and the
 *   worlds travel past horizontally as you scroll down. Each world holds for
 *   a beat when it's centred, so you "arrive" rather than skim. Media drifts
 *   against the panel (parallax), the destination name arrives faster than
 *   its world, and a cursor label says ENTER.
 * PHONES / everything else: each world is a full-screen vertical story that
 *   pins and is covered by the next one — a stack of worlds, no sideways
 *   scrolling to fight. This is the layout the server renders.
 *
 * ─── EVERY WORLD SAYS THE SAME SIX THINGS ───────────────────────────────────
 * Destination, dates, duration, vibe, price, status — and the whole panel is
 * the link. Anything not confirmed says TBA rather than being guessed.
 *
 * ─── TRAVELLING BETWEEN WORLDS ──────────────────────────────────────────────
 * Clicking a world washes the screen in that world's colour with its name,
 * then navigates — a scene transition rather than a page load. Modifier-
 * clicks (new tab) skip it and behave like a normal link.
 */
export function Worlds({ worlds }: { worlds: World[] }) {
  const reduce = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);
  const [warp, setWarp] = useState<World | null>(null);
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const set = () => setHorizontal(mq.matches && !reduce);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [reduce]);

  const enter = (w: World, e: ReactMouseEvent<HTMLAnchorElement>) => {
    track(PLOT_EVENTS.enterJourney, { journey_id: w.journeyId, from: "worlds" });
    if (!w.href || reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setWarp(w);
    router.prefetch(w.href);
    window.setTimeout(() => router.push(w.href!), 700);
  };

  return (
    <section id="journeys" className="relative bg-[#1a0d0a] text-sand">
      <Intro worlds={worlds} />
      {horizontal ? <Horizontal worlds={worlds} onEnter={enter} /> : <Stacked worlds={worlds} onEnter={enter} />}

      <AnimatePresence>
        {warp && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: warp.theme.bg, color: warp.theme.fg }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          >
            <motion.span
              className="font-display text-[clamp(4rem,18vw,14rem)] uppercase leading-none"
              initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              {warp.name}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Intro({ worlds }: { worlds: World[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <p className="flex items-center gap-3 text-[11px] font-medium tracked text-sand/60">
        <span className="h-px w-10 bg-sand/40" /> {worldsIntro.eyebrow}
      </p>
      <h2 className="mt-6 font-display text-[clamp(3.4rem,15vw,11rem)] uppercase leading-[0.86] tracking-[-0.015em]">
        {worldsIntro.headline.map((l, i) => (
          <motion.span
            key={l}
            className={`block ${i === 1 ? "text-pink" : ""}`}
            initial={reduce ? undefined : { opacity: 0, x: i === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
          >
            {l}
          </motion.span>
        ))}
      </h2>
      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-[26ch] font-serif text-[clamp(1.3rem,4vw,2rem)] italic leading-[1.15] text-sand/85">{worldsIntro.sub}</p>
        {/* the table of contents — one word per world, each in its own world's colour */}
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {worlds.map((w, i) => (
            <li key={w.key} className="font-display text-[clamp(1.2rem,3.4vw,1.8rem)] uppercase" style={{ color: w.theme.accent }}>
              <span className="mr-1.5 align-top text-[10px] tracked text-sand/40">{String(i + 1).padStart(2, "0")}</span>
              {w.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-10 hidden -rotate-2 font-hand text-2xl text-[#FFE9A8] lg:block">{worldsIntro.hint}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* desktop: pinned, horizontal                                         */
/* ------------------------------------------------------------------ */

function Horizontal({ worlds, onEnter }: { worlds: World[]; onEnter: (w: World, e: ReactMouseEvent<HTMLAnchorElement>) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const n = worlds.length;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  // Plateaus: each world holds while it's centred, then travels.
  const hold = 0.06;
  const input: number[] = [];
  const output: string[] = [];
  worlds.forEach((_, i) => {
    const c = i / (n - 1);
    input.push(Math.max(0, c - hold), Math.min(1, c + hold));
    output.push(`${-i * 100}vw`, `${-i * 100}vw`);
  });
  const x = useTransform(p, input, output);

  useMotionValueEvent(p, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * i) / (n - 1), behavior: "smooth" });
  };

  // the cursor label
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 380, damping: 32 });
  const sy = useSpring(cy, { stiffness: 380, damping: 32 });
  const [hovering, setHovering] = useState(false);
  const cur = worlds[active];

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 110}vh` }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onPointerMove={(e) => {
          cx.set(e.clientX);
          cy.set(e.clientY);
        }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <motion.div className="flex h-full" style={{ x, width: `${n * 100}vw` }}>
          {worlds.map((w, i) => (
            <Panel key={w.key} world={w} index={i} total={n} progress={p} onEnter={onEnter} horizontal />
          ))}
        </motion.div>

        {/* the HUD — which world you're in, and a way to jump to any other */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 px-14 pb-6 transition-colors duration-500"
          style={{ color: cur.theme.fg }}
        >
          <ol className="pointer-events-auto flex gap-2">
            {worlds.map((w, i) => (
              <li key={w.key}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  className="group flex flex-col items-start gap-2 text-[10px] tracked"
                  aria-label={`Go to ${w.label}`}
                  aria-current={i === active}
                >
                  <span
                    className="block h-[2px] w-16 transition-all duration-500"
                    style={{ background: i === active ? w.theme.accent : "currentColor", opacity: i === active ? 1 : 0.3 }}
                  />
                  <span className={`transition-opacity ${i === active ? "opacity-100" : "opacity-45 group-hover:opacity-80"}`}>{w.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold tracked"
          style={{ x: sx, y: sy, background: cur.theme.accent, color: "#FFF1DC" }}
          animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          {cur.href ? worldsIntro.cursor : worldsIntro.soonCursor} →
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* phones: a stack of full-screen worlds                               */
/* ------------------------------------------------------------------ */

function Stacked({ worlds, onEnter }: { worlds: World[]; onEnter: (w: World, e: ReactMouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <div className="relative">
      {worlds.map((w, i) => (
        <div key={w.key} className="sticky top-0 h-[100svh]">
          <Panel world={w} index={i} total={worlds.length} onEnter={onEnter} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* one world                                                           */
/* ------------------------------------------------------------------ */

function Panel({
  world: w,
  index,
  total,
  progress,
  onEnter,
  horizontal = false,
}: {
  world: World;
  index: number;
  total: number;
  progress?: MotionValue<number>;
  onEnter: (w: World, e: ReactMouseEvent<HTMLAnchorElement>) => void;
  horizontal?: boolean;
}) {
  const reduce = useReducedMotion();
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const c = total > 1 ? index / (total - 1) : 0;
  const step = total > 1 ? 1 / (total - 1) : 1;
  // Media lags the panel; the name overtakes it. Only meaningful sideways.
  const mediaX = useTransform(p, [c - step, c, c + step], ["-18%", "0%", "18%"]);
  const nameX = useTransform(p, [c - step, c, c + step], ["45%", "0%", "-45%"]);

  const t = w.theme;
  const top = t.fg;
  const external = !w.href;
  const href = w.href ?? w.followHref;

  const facts: { k: string; v: string | null }[] = [
    { k: "DATES", v: w.dates },
    { k: "DURATION", v: w.duration },
    { k: "FROM", v: w.price ? `${w.price} / person` : null },
    { k: "STATUS", v: w.status.label },
  ];

  const body = (
    <>
      {/* the world */}
      <motion.div className="absolute inset-y-0 -left-[12%] -right-[12%]" style={horizontal && !reduce ? { x: mediaX } : undefined}>
        <Footage slot={w.media} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: t.scrim }} />
      {t.type === "neon" && <div className="edc-haze pointer-events-none absolute inset-0 opacity-60" />}
      <div className="grain pointer-events-none absolute inset-0" />

      <div className={`relative z-10 flex h-full flex-col px-5 pt-24 sm:px-8 lg:px-14 ${horizontal ? "pb-20" : "pb-8"}`}>
        {/* slate */}
        <div className="flex items-center justify-between gap-4 text-[10px] tracked" style={{ color: top }}>
          <span className="flex items-center gap-3">
            <span className="font-display text-[15px] tracking-normal opacity-70">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-8 sm:w-14" style={{ background: top, opacity: 0.4 }} />
            <span>{w.kicker}</span>
          </span>
          <span
            className="hidden items-center gap-2 border px-2.5 py-1 sm:flex"
            style={{ borderColor: w.status.open ? t.accent : `${top}55`, color: w.status.open ? t.accent : top }}
          >
            {w.status.open && <span className="home-rec block h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />}
            {w.status.label}
          </span>
        </div>

        <div className="mt-auto" style={{ color: t.fg }}>
          <p className="font-display text-[clamp(0.8rem,2.4vw,1.05rem)] tracking-[0.2em]" style={{ color: t.accent2 }}>
            {w.vibes.join("  •  ")}
          </p>

          <motion.h3 className="relative mt-2" style={horizontal && !reduce ? { x: nameX } : undefined}>
            <WorldName world={w} />
          </motion.h3>

          <p className="mt-4 max-w-[30ch] font-serif text-[clamp(1.15rem,3.6vw,1.7rem)] italic leading-[1.15] opacity-90">{w.tagline}</p>

          <dl className="mt-6 grid max-w-[46rem] grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="border-t pt-2" style={{ borderColor: `${t.accent}80` }}>
                <dt className="text-[9px] tracked" style={{ color: t.accent }}>
                  {f.k}
                </dt>
                <dd className={`mt-1 text-[clamp(0.85rem,2.4vw,1rem)] font-medium uppercase leading-tight ${f.v ? "" : "opacity-50"}`}>
                  {f.v ?? "TBA"}
                </dd>
              </div>
            ))}
          </dl>

          <span
            className="mt-7 inline-flex items-center gap-3 px-7 py-4 text-[13px] font-semibold uppercase tracked transition-transform duration-200 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]"
            style={{
              background: t.fg,
              color: t.bg,
              boxShadow: `6px 6px 0 0 ${t.accent}`,
            }}
          >
            {external ? "Follow the story" : "Enter journey"}
            <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
              {external ? "↗" : "→"}
            </span>
          </span>
        </div>
      </div>
    </>
  );

  const cls = `group relative block h-full shrink-0 overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-inset ${
    horizontal ? "w-screen cursor-none" : "w-full"
  }`;
  const label = `${w.name} — ${w.kicker}. ${external ? "Coming soon: follow the story on Instagram" : "Enter journey"}`;

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls} style={{ background: t.bg }} aria-label={label} onClick={(e) => onEnter(w, e)}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls} style={{ background: t.bg }} aria-label={label} onClick={(e) => onEnter(w, e)}>
      {body}
    </Link>
  );
}

/** The name is the world's identity — each one is set in its own voice. */
function WorldName({ world: w }: { world: World }) {
  const t = w.theme;
  const size = "text-[clamp(4.6rem,24vw,15rem)]";
  switch (t.type) {
    case "brush":
      return (
        <span className={`relative inline-block font-brush ${size} leading-[0.95]`} style={{ color: t.accent2 }}>
          {w.name.charAt(0) + w.name.slice(1).toLowerCase()}
          <MarkerUnderline color={t.accent} className="absolute -bottom-1 left-0 h-5 w-[85%]" />
        </span>
      );
    case "serif": {
      // "BIR × BAROT" -> "Bir × Barot": capitalise each word, leave the sign alone.
      const pretty = w.name
        .split(" ")
        .map((word) => (/^[A-Z]{2,}$/.test(word) ? word.charAt(0) + word.slice(1).toLowerCase() : word))
        .join(" ");
      // Two words is wider than one place name; step the size down so it never overflows a phone.
      const serifSize = w.name.length > 8 ? "text-[clamp(3.2rem,15vw,10rem)]" : size;
      return (
        <span className={`block font-serif ${serifSize} leading-[0.85] tracking-[-0.03em] ${w.key === "bir" ? "" : "italic"}`}>
          {pretty}
          <span style={{ color: t.accent }}>.</span>
        </span>
      );
    }
    case "neon":
      return (
        <span
          className="block font-display text-[clamp(3.6rem,17vw,13rem)] uppercase leading-[0.86] tracking-[-0.01em]"
          style={{ textShadow: `0 0 18px ${t.accent}, 0 0 48px rgba(139,61,255,0.8), 0 0 90px ${t.accent}` }}
        >
          {w.name}
        </span>
      );
    default:
      // A two-word name ("SRI LANKA") is wider than a one-word one; step the size
      // down so it wraps tidily to two lines instead of overflowing a phone.
      return (
        <span
          className={`block font-display ${w.name.length > 8 ? "text-[clamp(3.6rem,17vw,12rem)]" : size} uppercase leading-[0.86]`}
        >
          {w.name}
        </span>
      );
  }
}
