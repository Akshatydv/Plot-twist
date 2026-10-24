"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Stars } from "./Stars";

const ease = [0.22, 1, 0.36, 1] as const;

type Shot = { src: string; name: string };

/**
 * THE REVIEWS HERO — dark, grainy, a little theatrical.
 *
 * Right-hand side is a stack of taped polaroids made from REAL approved review
 * photos. When there are none yet, the same three frames appear empty and
 * dashed with a handwritten "your photo here" — the honest version of a
 * placeholder (nothing is faked; it reads as an invitation, not a gap).
 *
 * The average and count are printed only when they exist.
 */
export function ReviewsHero({ count, average, shots, googleUrl }: { count: number; average: number | null; shots: Shot[]; googleUrl?: string | null }) {
  const reduce = useReducedMotion();
  const slots = [0, 1, 2].map((i) => shots[i] ?? null);
  const poses = [
    { rotate: -7, x: 0, y: 0, w: "w-[15rem] sm:w-[17rem]", z: 10 },
    { rotate: 5, x: 5.5, y: 6.5, w: "w-[12.5rem] sm:w-[14rem]", z: 20 },
    { rotate: -2, x: -1, y: 15, w: "w-[11rem] sm:w-[12.5rem]", z: 30 },
  ];

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay } };

  return (
    <section
      className="relative isolate overflow-hidden px-5 pb-24 pt-6 text-sand sm:px-8 lg:px-14"
      style={{ background: "radial-gradient(110% 90% at 25% 0%, #4a1238 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      {/* soft light leaks — radial gradients, not blurred divs: same look, a fraction of the paint cost on phones */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(34rem 34rem at 88% 22%, rgba(255,79,135,0.22), transparent 70%), radial-gradient(30rem 30rem at 0% 100%, rgba(255,122,61,0.18), transparent 70%)" }} />

      <header className="flex items-center justify-between">
        <a href="/" aria-label="Plot Twist — home" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">
          <Logo className="text-[12px] sm:text-[15px]" />
        </a>
        <a href="/" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/70 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">
          ← Back to the plot
        </a>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1300px] items-center gap-16 lg:mt-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p {...rise(0)} className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/70">
            <span className="h-px w-10 bg-sand/50" /> The cast speaks
          </motion.p>

          <motion.h1 {...rise(0.08)} className="mt-6 font-display text-[clamp(3.2rem,12vw,9rem)] uppercase leading-[0.86] tracking-[-0.01em]">
            From the
            <br />
            <span className="font-serif normal-case italic tracking-[-0.025em] text-[#FF4F87]">cast.</span>
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-7 max-w-[30ch] font-serif text-[clamp(1.3rem,3.6vw,1.9rem)] leading-[1.25] text-sand/85">
            No brochure words. Just what people actually said after the trip.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            {average !== null && count > 0 && (
              <div className="flex items-center gap-4" aria-label={`Average rating ${average} out of 5 from ${count} review${count > 1 ? "s" : ""}`}>
                <span className="font-display text-[3.4rem] leading-none">{average.toFixed(1)}</span>
                <div>
                  <Stars rating={average} size={20} color="#FF4F87" empty="rgba(255,241,220,0.22)" label={false} />
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-sand/65">
                    from {count} traveller{count > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <a
                href={count > 0 ? "#wall" : "#share"}
                className="inline-flex min-h-12 items-center gap-2 bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[5px_5px_0_0_#FF4F87] transition hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand motion-reduce:transition-none"
              >
                {count > 0 ? "Read the stories" : "Be the first"} <span aria-hidden="true">↓</span>
              </a>
              {count > 0 && (
                <a
                  href="#share"
                  className="inline-flex min-h-12 items-center border border-sand/45 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  Add yours
                </a>
              )}
            </div>
          </motion.div>
          {googleUrl && (
            <motion.p {...rise(0.36)} className="mt-6 text-[0.9rem] text-sand/70">
              Want an outside opinion?{" "}
              <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-sand underline decoration-[#FF4F87] decoration-2 underline-offset-4 hover:decoration-sand">
                Read our Google reviews ↗
              </a>
            </motion.p>
          )}
        </div>

        {/* polaroid stack */}
        <div className="relative mx-auto h-[30rem] w-full max-w-[28rem] sm:h-[34rem]" aria-hidden={shots.length === 0 ? true : undefined}>
          {slots.map((s, i) => {
            const p = poses[i];
            return (
              <motion.div
                key={i}
                className={`pin absolute ${p.w}`}
                style={{ left: `${p.x * 6}%`, top: `${p.y * 4}%`, zIndex: p.z, rotate: `${p.rotate}deg` }}
                initial={reduce ? undefined : { opacity: 0, y: 60, rotate: p.rotate * 2 }}
                animate={reduce ? undefined : { opacity: 1, y: 0, rotate: p.rotate }}
                transition={{ duration: 1, ease, delay: 0.25 + i * 0.14 }}
              >
                <span className="tape" style={{ top: -12, left: "calc(50% - 42px)", transform: `rotate(${-p.rotate}deg)` }} />
                {s ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.src} alt={`Photo shared by ${s.name}`} className="aspect-[4/5] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center border-2 border-dashed border-ink/25 bg-ink/[0.04] p-4 text-center">
                    <span className="font-hand text-[1.5rem] leading-none text-ink/45">
                      your photo
                      <br />
                      here
                    </span>
                  </div>
                )}
                <p className="mt-3 text-center font-hand text-[1.3rem] leading-none text-ink/70">{s ? s.name : ["goa, oct ’26", "the whole cast", "golden hour"][i]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
