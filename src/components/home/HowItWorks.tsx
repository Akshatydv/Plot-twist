"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { howItWorks } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * HOW A PLOT TWIST WORKS — a route, not a feature list.
 *
 * Four stops on a line that draws itself as you scroll, with a marker riding
 * the tip of it. Each stop is labelled like an airport code (DEP → ARR), and
 * lights up as the line reaches it. Phones run the line down the left edge;
 * desktop runs it down the middle with the stops alternating sides.
 */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const top = useTransform(p, (v) => `${v * 100}%`);

  return (
    <section id="how" className="relative overflow-hidden bg-dusk px-5 py-24 text-sand sm:px-8 sm:py-32 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-sand/60">
          <span className="h-px w-10 bg-sand/40" /> {howItWorks.eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.8rem,11vw,8rem)] uppercase leading-[0.88]">
          {howItWorks.headline[0]}
          <br />
          <span className="text-sunset">{howItWorks.headline[1]}</span>
        </h2>

        <div className="relative mt-16 pl-10 lg:mx-auto lg:max-w-5xl lg:pl-0">
          {/* the route */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-sand/15 lg:left-1/2" aria-hidden>
            <motion.div className="absolute inset-x-0 top-0 origin-top bg-sunset" style={{ height: reduce ? "100%" : top, width: 2, marginLeft: -0.5 }} />
            {!reduce && (
              <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
                <span className="block h-4 w-4 rotate-45 border-2 border-sunset bg-dusk shadow-[0_0_24px_rgba(255,122,61,0.8)]" />
              </motion.div>
            )}
          </div>

          <ol ref={ref} className="relative space-y-16 sm:space-y-24">
          {howItWorks.steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <motion.li
                key={s.n}
                className={`relative lg:w-1/2 ${right ? "lg:ml-auto lg:pl-16" : "lg:pr-16 lg:text-right"}`}
                initial={reduce ? undefined : { opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.7, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 0.6, ease }}
              >
                {/* the stop */}
                <span
                  className={`absolute top-3 block h-3.5 w-3.5 rounded-full border-2 border-sunset bg-dusk -left-10 lg:left-auto ${
                    right ? "lg:-left-[7px]" : "lg:-right-[7px]"
                  }`}
                  aria-hidden
                />
                <div className={`flex items-baseline gap-4 ${right ? "" : "lg:justify-end"}`}>
                  <span className="font-display text-[clamp(3.4rem,12vw,6.5rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,241,220,0.7)]">{s.code}</span>
                  <span className="font-display text-[15px] text-sunset">{s.n}</span>
                </div>
                <h3 className="mt-2 font-display text-[clamp(1.7rem,5.4vw,2.8rem)] uppercase leading-none">{s.title}</h3>
                <p className={`mt-3 max-w-[30ch] font-serif text-[clamp(1.15rem,3.4vw,1.45rem)] leading-[1.25] text-sand/80 ${right ? "" : "lg:ml-auto"}`}>
                  {s.body}
                </p>
                <p className={`mt-3 inline-block font-hand text-[1.35rem] leading-none text-[#FFE9A8] ${right ? "-rotate-2" : "rotate-2"}`}>{s.note}</p>
              </motion.li>
            );
          })}
          </ol>
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href={howItWorks.cta.href}
            className="group inline-flex touch-manipulation items-center gap-3 bg-sand px-7 py-4 text-[13px] font-semibold uppercase tracked text-ink shadow-[6px_6px_0_0_#FF7A3D] transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            {howItWorks.cta.label} <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}
