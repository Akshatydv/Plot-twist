"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trust } from "@/content/site";
import { Note } from "./Bits";
import { Reveal } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * THE TRUST STRIP.
 *
 * Not an About Us section — a casting-file artifact, the size of a margin
 * note, that answers "who is actually reading this" right before the form
 * asks for a phone number. No names, no photos, no claims we can't back (no
 * background checks — we don't run them). Two small stamped cards, not a
 * company page.
 */
export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink px-5 py-10 text-sand sm:px-8 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[880px]">
        <Reveal>
          <p className="text-center text-[10px] tracked text-sand/45">{trust.eyebrow}</p>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* who's reading this */}
          <motion.div
            className="border border-sand/20 bg-white/[0.03] p-5"
            style={{ rotate: -1 }}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
          >
            <Note className="block text-[1.3rem] text-[#00A9C7]" rotate={-2}>
              {trust.who.title}
            </Note>
            <p className="mt-2.5 text-[14.5px] leading-[1.5] text-sand/70">{trust.who.body}</p>
          </motion.div>

          {/* the boring stuff */}
          <motion.div
            className="border border-sand/20 bg-white/[0.03] p-5"
            style={{ rotate: 1 }}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
          >
            <Note className="block text-[1.3rem] text-[#FF7A3D]" rotate={2}>
              {trust.safety.title}
            </Note>
            <ul className="mt-2.5 space-y-1.5">
              {trust.safety.points.map((point) => (
                <li key={point} className="flex gap-2 text-[13.5px] leading-[1.45] text-sand/70">
                  <span className="text-sand/35" aria-hidden>
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
