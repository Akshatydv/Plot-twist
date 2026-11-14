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

            <h1 className="mt-5 font-display uppercase leading-[0.86] tracking-[-0.005em] text-[var(--sl-bone)]">
              <span className="sr-only">{hero.title.join(" ")}</span>
              {/* line by line, each rising out of its own mask; the last line carries the accent */}
              <span aria-hidden className="block text-[clamp(3.1rem,min(12.4vw,17.5svh),11rem)]">
                {hero.title.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.04em]">
                    <motion.span
                      className={`block ${i === hero.title.length - 1 ? "text-[var(--sl-saffron)]" : ""}`}
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              className="mt-5 max-w-[44ch] font-serif text-[clamp(1.1rem,2.5vw,1.6rem)] italic leading-[1.25] text-[var(--sl-bone)]/90"
              initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.95 }}
            >
              {hero.line}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={hero.cta.href}
                  onClick={() => track(PLOT_EVENTS.requestInvite)}
                  className="group inline-flex min-h-[52px] touch-manipulation items-center justify-center gap-3 bg-[var(--sl-saffron)] px-7 py-3.5 text-[12px] font-semibold tracked text-[#07090a] shadow-[5px_5px_0_0_#F4EDE1] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  {hero.cta.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={hero.secondary.href}
                  className="group inline-flex min-h-[48px] touch-manipulation items-center justify-center gap-3 border border-[var(--sl-bone)]/60 px-6 py-3 text-[12px] font-semibold tracked text-[var(--sl-bone)] transition-colors hover:bg-[var(--sl-bone)] hover:text-[#07090a]"
                >
                  {hero.secondary.label}
                  <span aria-hidden className="transition-transform group-hover:translate-y-1">
                    ↓
                  </span>
                </a>
              </div>

              {/* the date and the price: present, never louder than the headline */}
              <dl className="flex items-stretch gap-5 pr-16 sm:pr-0 border-l border-[var(--sl-bone)]/30 pl-5 sm:ml-4">
                <div>
                  <dt className="text-[9px] tracked text-[var(--sl-bone)]/55">WHEN</dt>
                  <dd className="mt-1 font-display text-[clamp(1rem,2vw,1.35rem)] tracking-[0.03em] text-[var(--sl-bone)]">{hero.dates}</dd>
                </div>
                <div>
                  <dt className="text-[9px] tracked text-[var(--sl-bone)]/55">{hero.priceNote}</dt>
                  <dd className="mt-1 font-display text-[clamp(1rem,2vw,1.35rem)] tracking-[0.03em] text-[var(--sl-saffron)]">{hero.price}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute bottom-3 right-5 z-10 flex flex-col items-center gap-2 sm:bottom-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2" style={{ opacity: cueO }}>
            <motion.span
              className="block h-8 w-px bg-[var(--sl-bone)]/60 sm:h-10"
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
