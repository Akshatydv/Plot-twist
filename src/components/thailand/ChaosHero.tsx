"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/content/chaos";
import { useCalm } from "../bir/Scenery";

/**
 * 00 · THE HERO — THE VIDEO IS THE HERO.
 *
 * ─── WHAT READING srilanka/IslandHero.tsx CHANGED ───────────────────────────
 * The first version of this hero was a photograph with type on it and a
 * push-in. That is not what the other pages do. IslandHero does SIX things at
 * once, and the difference between one of them and six is the whole reason it
 * feels like a film starting:
 *
 *   1. the poster paints first, the clip mounts after hydration and fades in
 *      only once it is genuinely playing — a slow connection sees a still,
 *      never a black box
 *   2. the camera pushes in across the whole scroll (scale 1 → 1.32)
 *   3. a black layer ramps 0 → 1 so the hero ENDS on the exact colour the next
 *      section starts on. There is no seam, because there is no cut
 *   4. the type lifts, fades AND blurs out — three properties, not one
 *   5. the title arrives LETTER BY LETTER, each character rising out of its own
 *      overflow on a 50ms stagger
 *   6. everything else enters on its own delay afterwards: kicker, then title,
 *      then the line, then the button. Nothing arrives at the same time as
 *      anything else
 *
 * ─── WHAT IS THAILAND'S AND NOT SRI LANKA'S ─────────────────────────────────
 * Sri Lanka's title is one word set in the display face. Thailand's is two
 * lines in the editorial serif, and the second line is the page's whole
 * argument — so the letters of THAILAND arrive first and settle, and THE CHAOS
 * arrives after them, in the hot pink, from a longer stagger. The place, then
 * what happens to it.
 *
 * The scroll cue says IT STARTS IN THE DARK, which is the only instruction on
 * the page and is also literally true: the next thing that happens is the
 * screen going black and a word opening in it.
 */
export function ChaosHero() {
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const calm = useCalm();
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, 1], [1, 1.32]);
  const dark = useTransform(p, [0.15, 0.95], [0, 1]);
  const textY = useTransform(p, [0, 0.5], [0, -120]);
  const textO = useTransform(p, [0.05, 0.42], [1, 0]);
  const textBlur = useTransform(p, [0.05, 0.42], ["blur(0px)", "blur(12px)"]);
  const cueO = useTransform(p, [0, 0.08], [1, 0]);

  /* Pick the cut once, after mount: portrait screens get the 9:16 film, and
     the phone never downloads the landscape one. Never under reduced motion —
     the poster carries it. */
  useEffect(() => {
    if (calm) return;
    const tall = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
    setSrc(tall ? hero.video.tall.src : hero.video.wide.src);
  }, [calm]);

  /* Pause while off screen — it is the heaviest thing on the page. */
  useEffect(() => {
    const el = ref.current;
    const v = vid.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const m = <T,>(v: T) => (calm ? undefined : v);

  return (
    <section id="top" ref={ref} className={calm ? "relative h-[100svh]" : "relative h-[200svh]"}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: m(scale) }}>
          {/* An ART-DIRECTED poster: <picture> switches the crop by orientation,
              which next/image cannot do. It is the first paint and the LCP
              element's backdrop, so it must not wait on anything. */}
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={hero.video.tall.poster} />
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed; next/image cannot switch crops by orientation */}
            <img
              src={hero.video.wide.poster}
              alt=""
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </motion.div>

        {/* legibility: the type lives bottom-left, so the floor is dark and the
            middle of the frame is left alone for the footage */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,6,11,0.88) 0%, rgba(8,6,11,0.32) 40%, rgba(8,6,11,0) 62%), linear-gradient(to bottom, rgba(8,6,11,0.55), transparent 22%)",
          }}
        />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* the hero ends on the colour the portal begins on — no seam */}
        {!calm && <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-[#08060B]" style={{ opacity: dark }} />}

        <motion.div
          className="relative z-10 flex h-full flex-col px-5 pb-10 pt-6 sm:px-8 sm:pb-12 lg:px-14"
          style={{ y: m(textY), opacity: m(textO), filter: m(textBlur) }}
        >
          <div className="mt-auto">
            <motion.p
              className="text-[10px] font-semibold tracked text-[#FF9E7A] sm:text-[11px]"
              initial={calm ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {hero.eyebrow}
            </motion.p>

            <h1 className="mt-3 font-serif italic leading-[0.82] tracking-[-0.02em] text-sand">
              <span className="sr-only">
                {hero.title.join(" — ")}. {hero.line} {hero.dateline}
              </span>
              <Letters word={hero.title[0]} calm={calm} delay={0.3} />
              <Letters word={hero.title[1]} calm={calm} delay={0.72} color="#FF2E7E" />
            </h1>

            <motion.div
              aria-hidden
              className="mt-5 flex flex-wrap items-baseline gap-x-7 gap-y-2"
              initial={calm ? false : { opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 1.25 }}
            >
              <span className="max-w-[40ch] text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.45] text-sand/85">{hero.line}</span>
              <span className="text-[10px] tracked text-sand/60">{hero.dateline}</span>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={calm ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.55 }}
            >
              <a
                href="#pre-register"
                className="group inline-flex min-h-[48px] touch-manipulation items-center gap-3 border border-sand/70 px-6 py-3.5 text-[12px] font-semibold tracked text-sand transition-colors hover:bg-sand hover:text-[#08060B]"
              >
                {hero.cta}
                <span aria-hidden className="transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {!calm && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-center sm:block"
            style={{ opacity: cueO }}
          >
            <span className="mb-3 block text-[9px] tracked text-sand/50">{hero.scroll}</span>
            <motion.span
              className="mx-auto block h-10 w-px bg-sand/50"
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * One line of the title, letter by letter, each character rising out of its own
 * overflow box. The stagger is 50ms — fast enough to read as one movement,
 * slow enough that you see it happen.
 *
 * `overflow-hidden` on the per-letter wrapper is what makes this a MASK rather
 * than a fade: the letter is genuinely hidden below its own box and travels up
 * into view, which is why it reads as type being set rather than type appearing.
 */
function Letters({
  word,
  calm,
  delay,
  color,
}: {
  word: string;
  calm: boolean;
  delay: number;
  color?: string;
}) {
  return (
    <span aria-hidden className="flex text-[clamp(3.4rem,19vw,10.5rem)]" style={color ? { color } : undefined}>
      {word.split("").map((ch, i) => (
        <span key={`${ch}-${i}`} className="overflow-hidden">
          <motion.span
            className="block"
            initial={calm ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
