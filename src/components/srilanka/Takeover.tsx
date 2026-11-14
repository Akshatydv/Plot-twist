"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { bases, lineup, strangers, tonight, type NightStatus } from "@/content/srilanka";
import { Note } from "../Bits";
import { Focus, Footage, MaskLines, useCalm } from "../bir/Scenery";

/**
 * THE TAKEOVER'S OWN SECTIONS — what makes this a party-first page rather
 * than an itinerary with a night out bolted on:
 *
 *   Lineup     the six nights, set like a festival poster, each row a door
 *              into its chapter
 *   Bases      the three places you wake up, as a route you can tap along
 *   Tonight    the night out that closes a chapter: full-bleed footage, the
 *              venue's name, and its honest status
 *   Strangers  the people — real Plot Twist crews, never stock
 *
 * Everything reads its words from content/srilanka.ts. Party footage is mood,
 * not the named venue, and every Tonight block says so on screen.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_COLOR: Record<NightStatus, string> = {
  PLANNED: "#7CE3A0",
  PROPOSED: "#F6C35B",
  "SUBJECT TO EVENT CONFIRMATION": "#FF9F6B",
  "PICKED CLOSER TO THE DATE": "#9FC7FF",
};

/** The venue's status, said out loud. Never decoration: it is the honesty line. */
export function StatusPill({ status, className = "" }: { status: NightStatus; className?: string }) {
  const c = STATUS_COLOR[status];
  return (
    <span className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[9px] font-semibold tracked sm:text-[10px] ${className}`} style={{ color: c, borderColor: `${c}88` }}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {status}
    </span>
  );
}

/** Five bars that move like a level meter. Decoration only; still under reduced motion. */
function Meter({ color }: { color: string }) {
  const reduce = useCalm();
  const heights = [0.5, 0.9, 0.35, 0.75, 0.55];
  return (
    <span aria-hidden className="inline-flex h-4 items-end gap-[3px]">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[3px] origin-bottom"
          style={{ background: color, height: "100%", scaleY: h }}
          animate={reduce ? undefined : { scaleY: [h, 1, 0.25, h] }}
          transition={{ duration: 0.9 + i * 0.13, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* the lineup                                                          */
/* ------------------------------------------------------------------ */

export function Lineup() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleX = useTransform(p, [0, 1], ["4%", "-8%"]);

  return (
    <section ref={ref} id="lineup" className="relative overflow-hidden bg-[#0a0616] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="absolute inset-0 opacity-40">
        <Footage slot={lineup.slot} />
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,6,22,0.72) 0%, rgba(10,6,22,0.93) 34%, #0a0616 70%)" }} />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1200px]">
        <Focus>
          <p className="flex items-center gap-3 text-[10px] font-semibold tracked text-[var(--sl-hibiscus)] sm:text-[11px]">
            <Meter color="#FF4F6D" />
            {lineup.kicker}
          </p>
        </Focus>
        <motion.h2 className="mt-4 whitespace-nowrap font-display text-[clamp(4.6rem,19vw,17rem)] leading-[0.8] text-[var(--sl-bone)]" style={{ x: reduce ? undefined : titleX }}>
          {lineup.title}
        </motion.h2>
        <Focus delay={0.15}>
          <p className="mt-4 font-serif text-[clamp(1.4rem,3.6vw,2.4rem)] italic leading-tight text-[var(--sl-hibiscus)]">{lineup.sub}</p>
        </Focus>

        <ol className="mt-12 border-t border-white/12 sm:mt-16">
          {lineup.nights.map((n, i) => (
            <motion.li
              key={n.date}
              className="border-b border-white/12"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            >
              <a href={n.href} className="group relative grid grid-cols-[3.6rem_1fr] items-center gap-x-4 gap-y-2 py-5 sm:grid-cols-[6rem_1fr] sm:gap-x-8 sm:py-6">
                <span aria-hidden className="absolute inset-y-0 left-0 w-0 opacity-[0.14] transition-all duration-500 group-hover:w-full" style={{ background: n.tone }} />
                <span className="relative">
                  <span className="block font-display text-[clamp(1.5rem,3.4vw,2.4rem)] leading-none" style={{ color: n.tone }}>
                    {n.day}
                  </span>
                  <span className="mt-1 block text-[9px] tracked text-white/50 sm:text-[10px]">{n.date}</span>
                </span>
                <span className="relative min-w-0">
                  <span className="block text-[9px] font-semibold tracked text-white/50 sm:text-[10px]">{n.where}</span>
                  <span className="mt-1 block font-display text-[clamp(1.55rem,5.4vw,3.6rem)] uppercase leading-[0.92] text-[var(--sl-bone)] transition-transform duration-500 group-hover:translate-x-2">{n.act}</span>
                  <span className="mt-1.5 block font-serif text-[clamp(1rem,2.2vw,1.3rem)] italic leading-tight text-white/65">{n.sub}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ol>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* the bases                                                           */
/* ------------------------------------------------------------------ */

/**
 * THREE PLACES YOU WAKE UP — the route as a line you tap along. Each stop
 * swaps the frame: a stay photograph (labelled as inspiration, because no
 * hotel is booked yet), the place itself, and the two chapters it holds.
 */
export function Bases() {
  const reduce = useCalm();
  const [active, setActive] = useState(0);
  const stop = bases.stops[active];

  return (
    <section id="route" className="relative overflow-hidden bg-[var(--sl-sand)] px-5 py-20 text-[#14110d] sm:px-8 sm:py-28 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[10px] font-semibold tracked text-[#c4862c] sm:text-[11px]">{bases.kicker}</p>
        <MaskLines lines={bases.title} className="mt-5 font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.84]" />
        <Focus delay={0.2}>
          <p className="mt-6 max-w-[52ch] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.6] text-[#14110d]/70">{bases.body}</p>
        </Focus>

        {/* the route line: three stops, the plane on either end */}
        <div role="tablist" aria-label="Where you stay" className="mt-12 flex items-start">
          {bases.stops.map((s, i) => {
            const on = i === active;
            return (
              <div key={s.key} className="flex flex-1 items-start last:flex-none">
                <button
                  type="button"
                  role="tab"
                  id={`base-tab-${s.key}`}
                  aria-selected={on}
                  aria-controls="base-panel"
                  onClick={() => setActive(i)}
                  className="group flex touch-manipulation flex-col items-start text-left"
                >
                  <span className="flex h-5 items-center">
                    <span className="block h-3 w-3 rounded-full border-2 transition-all duration-300" style={{ borderColor: on ? s.tone : "#14110d", background: on ? s.tone : "transparent", transform: on ? "scale(1.5)" : undefined }} />
                  </span>
                  <span className={`mt-2 font-display text-[clamp(1.25rem,4.4vw,2.6rem)] leading-none transition-opacity ${on ? "opacity-100" : "opacity-35 group-hover:opacity-70"}`}>{s.name}</span>
                  <span className={`mt-1 text-[9px] font-semibold tracked sm:text-[10px] ${on ? "opacity-70" : "opacity-35"}`}>{s.nights}</span>
                </button>
                {i < bases.stops.length - 1 && <span aria-hidden className="mx-2 mt-[9px] h-px flex-1 bg-[#14110d]/25 sm:mx-5" />}
              </div>
            );
          })}
        </div>

        <div id="base-panel" role="tabpanel" aria-labelledby={`base-tab-${stop.key}`} className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#14110d] sm:aspect-[16/10]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={stop.key}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Footage slot={stop.slot} mounted />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-3 right-3 font-display text-[clamp(2.4rem,7vw,5rem)] leading-none text-white/90">{String(active + 1).padStart(2, "0")}</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stop.key}
              className="flex flex-col"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[10px] font-semibold tracked" style={{ color: "#c4862c" }}>
                {stop.kind} · {stop.nights}
              </p>
              <h3 className="mt-3 font-serif text-[clamp(2rem,4.6vw,3.4rem)] italic leading-[0.98] tracking-[-0.01em]">{stop.line}</h3>
              <p className="mt-4 max-w-[44ch] leading-[1.6] text-[#14110d]/70">{stop.body}</p>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-[#14110d] sm:h-24 sm:w-36">
                  <Footage slot={stop.place} mounted sizes="160px" />
                </div>
                <p className="font-hand text-[1.25rem] leading-tight text-[#14110d]/60">{stop.placeCap.toLowerCase()}. the real one.</p>
              </div>

              <ul className="mt-7 border-t border-[#14110d]/15">
                {stop.days.map((d) => (
                  <li key={d.n} className="border-b border-[#14110d]/15">
                    <a href={d.href} className="group flex items-baseline gap-4 py-3.5">
                      <span className="font-display text-[1.05rem] text-[#c4862c]">{d.n}</span>
                      <span className="flex-1 font-serif text-[1.3rem] leading-none transition-transform duration-300 group-hover:translate-x-1.5">{d.label}</span>
                      <span aria-hidden className="text-[#14110d]/40 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[10px] font-semibold tracked text-[#c4862c]">ALSO ON THE ROUTE FROM HERE</p>
              <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
                {stop.visits.map((v) => (
                  <li key={v[0]} className="border-b border-[#14110d]/12 py-2.5">
                    <span className="block font-display text-[1.05rem] uppercase leading-none">{v[0]}</span>
                    <span className="mt-1 block text-[9px] font-semibold tracked text-[#14110d]/55">{v[1]}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* tonight                                                             */
/* ------------------------------------------------------------------ */

/**
 * HOW EVERY DAY ENDS — the night out, given a full screen of its own so the
 * parties are never a footnote under an itinerary. The word TONIGHT slides
 * across in outline; the venue's name sits in display type over the footage;
 * the status pill says exactly how confirmed it is.
 */
export function Tonight({ id }: { id: keyof typeof tonight }) {
  const t = tonight[id];
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(p, [0, 1], ["12%", "-32%"]);
  const mediaY = useTransform(p, [0, 1], ["-7%", "7%"]);
  const stills = "stills" in t ? t.stills : null;
  const caption = "caption" in t ? t.caption : "";

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-14" style={{ background: t.ground, color: "#F4EDE1" }}>
      <motion.div className="absolute inset-[-8%_0]" style={reduce ? undefined : { y: mediaY }}>
        <Footage slot={t.slot} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, ${t.ground} 0%, ${t.ground}55 16%, ${t.ground}22 42%, ${t.ground}cc 74%, ${t.ground} 100%)` }} />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-[9%] whitespace-nowrap font-display text-[clamp(7rem,32vw,28rem)] leading-[0.8]"
        style={{ x: reduce ? undefined : wordX, WebkitTextStroke: `1.5px ${t.tone}`, color: "transparent", opacity: 0.85 }}
      >
        TONIGHT
      </motion.span>

      {stills && (
        <div className="sl-reel relative z-10 -mx-5 mb-8 flex snap-x gap-3 overflow-x-auto px-5 sm:mx-0 sm:mb-10 sm:justify-end sm:gap-5 sm:overflow-visible sm:px-0">
          {stills.map((s, i) => (
            <motion.div
              key={s.image}
              className="relative aspect-[4/5] w-[46vw] shrink-0 snap-center overflow-hidden border border-white/15 sm:w-[min(17vw,15rem)]"
              initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: i % 2 ? 18 : 0, rotate: [-2.5, 1.5, -1][i % 3] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <Footage slot={{ image: s.image, alt: s.alt }} sizes="(max-width: 640px) 46vw, 17vw" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <Focus>
          <p className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracked sm:text-[11px]" style={{ color: t.tone }}>
            <Meter color={t.tone} />
            {t.kicker}
          </p>
        </Focus>
        <motion.h3
          className="mt-4 overflow-hidden pb-[0.05em] font-display uppercase leading-[0.84]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span className="block text-[clamp(3.2rem,12.5vw,11rem)]" variants={{ hidden: { y: "100%" }, show: { y: "0%" } }} transition={{ duration: 1.1, ease: EASE }}>
            {t.venue}
          </motion.span>
        </motion.h3>
        <Focus delay={0.25}>
          <p className="mt-5 max-w-[46ch] font-serif text-[clamp(1.2rem,2.8vw,1.75rem)] italic leading-[1.22] text-[#F4EDE1]/90">{t.line}</p>
        </Focus>
        <Focus delay={0.4}>
          {caption && <div className="mt-6 text-[8px] tracked text-white/45 sm:text-[9px]">{caption}</div>}
        </Focus>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* come as strangers                                                   */
/* ------------------------------------------------------------------ */

export function Strangers() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowX = useTransform(p, [0, 1], ["6%", "-10%"]);

  return (
    <section ref={ref} id="people" className="relative overflow-hidden bg-[var(--sl-violet)] py-20 sm:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-14">
        <p className="text-[10px] font-semibold tracked text-[var(--sl-dusk)] sm:text-[11px]">{strangers.kicker}</p>
        <MaskLines lines={strangers.title} className="mt-5 font-display text-[clamp(2.7rem,9.4vw,8rem)] uppercase leading-[0.86] text-[var(--sl-bone)]" />
        <Focus delay={0.25}>
          <p className="mt-6 max-w-[48ch] font-serif text-[clamp(1.25rem,3vw,1.9rem)] italic leading-[1.25] text-[var(--sl-bone)]/85">{strangers.body}</p>
        </Focus>
      </div>

      {/* a strip of prints that drifts against the scroll; swipeable on a phone */}
      <motion.div className="sl-reel relative mt-12 flex gap-4 overflow-x-auto px-5 pb-6 sm:mt-16 sm:justify-center sm:gap-7 sm:overflow-visible sm:px-8" style={{ x: reduce ? undefined : rowX }}>
        {strangers.photos.map((ph, i) => (
          <motion.figure
            key={ph.src}
            className="relative w-[62vw] shrink-0 bg-[var(--sl-bone)] p-2 pb-8 shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:w-[min(23vw,19rem)] sm:p-2.5 sm:pb-10"
            initial={reduce ? false : { opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: i % 2 ? 22 : 0, rotate: ph.tilt }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.03 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#14110d]">
              <Footage slot={{ image: ph.src, alt: ph.alt, focus: "50% 40%" }} sizes="(max-width: 640px) 62vw, 23vw" />
            </div>
          </motion.figure>
        ))}
      </motion.div>

      <div className="relative mx-auto mt-10 max-w-[1200px] px-5 sm:mt-16 sm:px-8 lg:px-14">
        <Note className="text-[1.35rem] text-[var(--sl-dusk)]" rotate={-2}>
          {strangers.caption}
        </Note>
        <dl className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
          {strangers.facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[9px] tracked text-[var(--sl-dusk)]">{f.k}</dt>
              <dd className="mt-1.5 font-serif text-[clamp(1.5rem,3.2vw,2.2rem)] leading-tight text-[var(--sl-bone)]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
