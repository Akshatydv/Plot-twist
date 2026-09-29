"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { birIndex, credits, details, finalCta, footage, media, photos, recap, scenes, trip } from "@/content/bir";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note, PlotButton, SectionLabel } from "../Bits";
import { Reveal } from "../motion";
import { Focus, Footage, MaskLines, useCalm } from "./Scenery";

/* ------------------------------------------------------------------ */
/* the recap                                                           */
/* ------------------------------------------------------------------ */

/**
 * THE MONTAGE — the whole trip again, fast. Ten words, ten worlds, a frame
 * per tenth of the scroll, with a film strip counting along the bottom. The
 * speed is the point: it's the feeling of flicking back through your camera
 * roll on the drive home.
 */
export function Recap() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = recap.frames.length;
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setI((c) => (c === k ? c : k));
  });
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section ref={ref} className="bg-[var(--bir-char)] px-5 py-20 sm:px-8 lg:px-14">
        <p className="font-serif text-[clamp(2rem,6vw,4rem)] leading-[1.05] text-[var(--bir-bone)]">{recap.frames.map((f) => f.word).join(" ")}</p>
      </section>
    );
  }

  const f = recap.frames[i];
  return (
    <section ref={ref} aria-label="The journey, in ten frames" className="relative h-[320svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden transition-colors duration-300" style={{ background: f.tone }}>
        {/* one image at a time — the old frame is replaced, never kept around to fade */}
        {f.image && (
          <motion.div
            key={f.image}
            className="absolute inset-0"
            initial={{ opacity: 0.4, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={f.image} alt="" fill sizes="100vw" quality={70} className="bir-grade object-cover" />
            <div className="absolute inset-0" style={{ background: `${f.tone}8c` }} />
          </motion.div>
        )}
        <div className="grain pointer-events-none absolute inset-0" />
        <AnimatePresence mode="popLayout">
          <motion.p
            key={i}
            className="relative px-5 text-center font-serif text-[clamp(3.4rem,15vw,13rem)] leading-none tracking-[-0.03em]"
            style={{ color: f.ink }}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {f.word}
          </motion.p>
        </AnimatePresence>
        {/* film strip */}
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-14">
          <div className="flex gap-1">
            {recap.frames.map((fr, k) => (
              <span key={fr.word} className="h-6 flex-1 border transition-opacity duration-300" style={{ background: fr.tone, borderColor: f.ink, opacity: k <= i ? 1 : 0.25 }} />
            ))}
          </div>
          <div className="mt-2 h-px w-full" style={{ background: `${f.ink}33` }}>
            <motion.div className="h-px" style={{ width: bar, background: f.ink }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the details                                                         */
/* ------------------------------------------------------------------ */

/**
 * THE DETAILS — deliberately the least cinematic section on the page, for
 * the reason Goa's call sheet is: after everything above, a plain document
 * reads as the one section not selling. Information is secondary to the
 * story, so it arrives LAST — but it is all here, and none of it is vague.
 */
export function TheDetails() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const askHref = number ? `https://wa.me/${number}?text=${encodeURIComponent(details.whatsapp)}` : null;
  const priceValue = details.price.confirmed && details.price.amount ? details.price.amount : details.price.pending;
  const priceNote = details.price.confirmed && details.price.amount ? details.price.note : details.price.pendingNote;

  return (
    <section id="details" className="relative overflow-hidden bg-[var(--bir-bone)] px-5 py-16 text-[var(--bir-char)] sm:px-8 sm:py-24 lg:px-14">
      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel index={birIndex("details")} label={details.label} color="#101311" />
          <Note className="text-[1.3rem] text-[#101311]/45" rotate={-2}>
            {details.scribble}
          </Note>
        </div>

        <Reveal>
          <h2 className="mt-8 font-serif text-[clamp(2.4rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em]">{details.headline[0]}</h2>
        </Reveal>

        {/* the route, as a line */}
        <Reveal delay={0.1}>
          <ol className="mt-8 flex items-center gap-2 sm:gap-4" aria-label={details.headline[1]}>
            {trip.route.map((stop, i) => (
              <li key={`${stop}-${i}`} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-4">
                <span className="flex flex-col items-start">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 || i === trip.route.length - 1 ? "bg-[#101311]" : "bg-[#E8793A]"}`} />
                  <span className="mt-2 text-[10px] font-semibold tracked sm:text-[12px]">{stop}</span>
                </span>
                {i < trip.route.length - 1 && <span aria-hidden className="mb-5 h-px flex-1 bg-[#101311]/25" />}
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-[56ch] font-serif text-[clamp(1.1rem,2.6vw,1.5rem)] italic leading-snug text-[#101311]/70">{details.routeNote}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t-2 border-[#101311]/15 pt-8 sm:grid-cols-3">
            {details.basics.map((row) => (
              <div key={row.k}>
                <dt className="text-[9px] tracked text-[#101311]/45">{row.k}</dt>
                <dd className="mt-1 font-serif text-[clamp(1.3rem,3vw,1.8rem)] leading-tight">{row.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-hand text-[1.2rem] text-[#101311]/50">{trip.datesNote}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-8">
            <div className="border-l-2 border-[#2c4436] pl-4">
              <span className="text-[9px] tracked text-[#2c4436]">SELECTION</span>
              <p className="mt-1 leading-[1.45] text-[#101311]/85">{details.selection}</p>
            </div>
            <div className="border-l-2 border-[#E8793A] pl-4">
              <span className="text-[9px] tracked text-[#A95F38]">THE DAMAGE</span>
              <p className="mt-1 font-serif text-[1.6rem] leading-tight">{priceValue}</p>
              {priceNote && <p className="mt-0.5 text-[0.9rem] text-[#101311]/55">{priceNote}</p>}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 border-t border-[#101311]/15 pt-8">
            {details.inclusions.confirmed ? (
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <span className="text-[9px] tracked text-[#101311]/45">INCLUDED</span>
                  <ul className="mt-3 space-y-2">
                    {details.inclusions.included.map((it) => (
                      <li key={it} className="flex gap-3 leading-tight text-[#101311]/85">
                        <span className="text-[#2c4436]" aria-hidden>
                          ✓
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[9px] tracked text-[#101311]/45">NOT INCLUDED</span>
                  <ul className="mt-3 space-y-2">
                    {details.inclusions.excluded.map((it) => (
                      <li key={it} className="flex gap-3 leading-tight text-[#101311]/60">
                        <span className="text-[#E8793A]" aria-hidden>
                          ×
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="max-w-[54ch] text-[#101311]/60">{details.inclusions.pending}</p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <PlotButton href="#apply" bg="#101311" fg="#EFE9DD" shadow="#E8793A" event={PLOT_EVENTS.requestInvite}>
                JOIN THE JOURNEY
              </PlotButton>
              {askHref && (
                <a
                  href={askHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track(PLOT_EVENTS.contactWhatsapp)}
                  className="text-[11px] font-semibold tracked text-[#101311]/60 underline decoration-[#101311]/25 underline-offset-4 hover:text-[#101311]"
                >
                  {details.ask}
                </a>
              )}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/**
 * THE CREDITS — every photograph and clip on the page, its author and its
 * licence. Not decoration: CC BY and BY-SA are only licences on the
 * condition that the author, the source and the licence are named where the
 * work is shown. Kept small and folded, at the very end, above the footer.
 */
export function PhotoCredits() {
  const all = [...Object.values(photos), ...Object.values(scenes), ...Object.values(footage)];
  return (
    <section className="bg-[#101311] px-5 py-6 sm:px-8 lg:px-14">
      <details className="group mx-auto max-w-[1200px] text-[#EFE9DD]/45">
        <summary className="cursor-pointer list-none text-[9px] font-semibold tracked hover:text-[#EFE9DD]/70">
          {credits.label} <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </summary>
        <p className="mt-3 max-w-[80ch] text-[0.7rem] leading-[1.5]">{credits.note}</p>
        <ul className="mt-2 columns-1 gap-8 text-[0.65rem] leading-[1.5] sm:columns-2 lg:columns-3">
          {all.map((c) => (
            <li key={c.file} className="break-inside-avoid">
              <a href={c.source} target="_blank" rel="noreferrer" className="underline decoration-[#EFE9DD]/20 underline-offset-2 hover:text-[#EFE9DD]">
                {c.title}
              </a>{" "}
              — {c.author},{" "}
              <a href={c.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-[#EFE9DD]/20 underline-offset-2 hover:text-[#EFE9DD]">
                {c.license}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the final cta                                                       */
/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#0b1510] px-5 py-24 sm:px-8 lg:px-14">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #05080c 0%, #0b1510 70%)" }} />
      <Footage slot={media.final} drift />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05080c]/85 via-[#05080c]/50 to-[#05080c]/20" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <MaskLines
          lines={finalCta.headline}
          className="font-serif text-[clamp(3.2rem,12.5vw,10.5rem)] leading-[0.86] tracking-[-0.03em] text-[var(--bir-bone)]"
        />
        <Focus delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <PlotButton href={finalCta.primary.href} bg="#E8793A" fg="#101311" shadow="#EFE9DD" event={PLOT_EVENTS.requestInvite}>
              {finalCta.primary.label}
            </PlotButton>
            <a href={finalCta.secondary.href} className="text-[11px] font-semibold tracked text-[var(--bir-bone)]/75 underline decoration-[var(--bir-bone)]/30 underline-offset-[6px] hover:text-[var(--bir-bone)]">
              {finalCta.secondary.label} <span aria-hidden>↑</span>
            </a>
          </div>
        </Focus>
        <div className="mt-10">
          <Note className="text-[1.6rem] text-[var(--bir-river)]" rotate={-3}>
            {finalCta.scribble}
          </Note>
        </div>
      </div>
    </section>
  );
}
