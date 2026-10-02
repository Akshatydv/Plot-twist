"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/content/site";
import { hero } from "@/content/srilanka";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { JourneyMenu } from "../JourneyMenu";
import { useCalm } from "../bir/Scenery";

/**
 * 00 · THE HERO — THE VIDEO IS THE HERO.
 *
 * A full-screen montage (sea → train → jungle → street → surf → sunset →
 * midnight) with almost nothing over it: the name, one line, the dates, one
 * button. Two cuts of the same film — 16:9 for landscape screens and 9:16 for
 * phones, because this page is bought with Instagram ads and a cropped
 * landscape clip on a phone is a postage stamp.
 *
 * ─── LOADING ────────────────────────────────────────────────────────────────
 * The poster (a ~100 KB still, art-directed with <picture>) is the first
 * paint and the LCP element's backdrop. The clip is chosen and mounted after
 * hydration — never both cuts — and fades in once it is actually playing, so
 * a slow connection sees a still, never a black box. Reduced motion gets the
 * still and no clip.
 *
 * ─── THE SCROLL ─────────────────────────────────────────────────────────────
 * 200svh with a sticky frame: as you leave, the camera pushes in and the
 * light goes out, the type lifts and blurs away. The frame ends black — the
 * exact colour the entry sequence starts on — so there is no seam.
 */
export function IslandHero() {
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const reduce = useCalm();
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, 1], [1, 1.32]);
  const dark = useTransform(p, [0.15, 0.95], [0, 1]);
  const textY = useTransform(p, [0, 0.5], [0, -120]);
  const textO = useTransform(p, [0.05, 0.42], [1, 0]);
  const textBlur = useTransform(p, [0.05, 0.42], ["blur(0px)", "blur(12px)"]);
  const cueO = useTransform(p, [0, 0.08], [1, 0]);

  // Pick the cut once, after mount: portrait screens get the 9:16 film.
  useEffect(() => {
    if (reduce) return;
    const tall = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
    setSrc(tall ? hero.video.tall.src : hero.video.wide.src);
  }, [reduce]);

  // Pause while the hero is off screen — it is the heaviest thing on the page.
  useEffect(() => {
    const el = ref.current;
    const v = vid.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const m = <T,>(v: T) => (reduce ? undefined : v);

  return (
    <section id="top" ref={ref} className={reduce ? "relative h-[100svh]" : "relative h-[200svh]"}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--sl-ink)]">
        <motion.div className="absolute inset-0" style={{ scale: m(scale) }}>
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={hero.video.tall.poster} />
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed poster; next/image can't switch crops by orientation */}
            <img src={hero.video.wide.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          {src && (
            <video
              ref={vid}
              key={src}
              src={src}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              aria-label={hero.video.alt}
              onPlaying={() => setPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </motion.div>

        {/* legibility: the type lives bottom-left; the top keeps a little shade for the masthead */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(7,9,10,0.85) 0%, rgba(7,9,10,0.3) 38%, rgba(7,9,10,0) 60%), linear-gradient(to bottom, rgba(7,9,10,0.5), transparent 20%)" }}
        />
        <div className="grain pointer-events-none absolute inset-0" />
        {!reduce && <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-[var(--sl-ink)]" style={{ opacity: dark }} />}

        <motion.div
          className="relative z-10 flex h-full flex-col px-5 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-6 lg:px-14"
          style={{ y: m(textY), opacity: m(textO), filter: m(textBlur) }}
        >
          <header className="flex items-start justify-between gap-4">
            <JourneyMenu tone="night" />
            <div className="pt-2 text-right text-[10px] tracked text-[var(--sl-bone)]/75 sm:text-[11px]">
              {brand.metaNav.join("  /  ")}
              <div className="mt-2 font-hand text-lg normal-case tracking-normal text-[var(--sl-bone)]/65 sm:text-xl">{brand.instagram}</div>
            </div>
          </header>

          <div className="mt-auto">
            <motion.p
              className="text-[10px] font-semibold tracked text-[var(--sl-saffron)] sm:text-[11px]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {hero.kicker}
            </motion.p>

            <h1 className="mt-3 font-display uppercase leading-[0.8] tracking-[-0.01em] text-[var(--sl-bone)]">
              <span className="sr-only">
                {hero.title} — {hero.line}, {hero.dates}
              </span>
              {/* letter by letter, each rising out of its own mask */}
              <span aria-hidden className="flex text-[clamp(5.2rem,21vw,19rem)]">
                {hero.title.split("").map((ch, i) => (
                  <span key={i} className="overflow-hidden">
                    <motion.span
                      className="block"
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.div
              aria-hidden
              className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2"
              initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.95 }}
            >
              <span className="font-serif text-[clamp(1.6rem,4.6vw,3.4rem)] italic leading-none text-[var(--sl-bone)]">{hero.line.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</span>
              <span className="font-display text-[clamp(1.1rem,2.6vw,1.8rem)] tracking-[0.04em] text-[var(--sl-saffron)]">{hero.dates}</span>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25 }}
            >
              <a
                href={hero.cta.href}
                className="group inline-flex min-h-[48px] touch-manipulation items-center gap-3 border border-[var(--sl-bone)]/70 px-6 py-3.5 text-[12px] font-semibold tracked text-[var(--sl-bone)] transition-colors hover:bg-[var(--sl-bone)] hover:text-[#07090a]"
              >
                {hero.cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </a>
              <span className="text-[10px] tracked text-[var(--sl-bone)]/60 sm:text-[11px]">{hero.meta}</span>
              <a
                href={hero.secondary.href}
                onClick={() => track(PLOT_EVENTS.requestInvite)}
                className="text-[11px] font-semibold tracked text-[var(--sl-saffron)] underline decoration-[var(--sl-saffron)]/40 underline-offset-[6px] sm:ml-auto"
              >
                {hero.secondary.label} →
              </a>
            </motion.div>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 sm:block" style={{ opacity: cueO }}>
            <motion.span
              className="block h-10 w-px bg-[var(--sl-bone)]/50"
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
