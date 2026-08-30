"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mystery, type Clue, type FlightClue, type PhotoClue, type TwistClue } from "@/content/site";
import { Note, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { CircleScribble, MarkerUnderline } from "./Brush";
import { PRIMARY_CLUE_IDS, plotHunt, type ClueId } from "@/content/mystery";
import { useJourney } from "./mystery/JourneyProvider";
import { usePlot, type LadderRung } from "./mystery/PlotProvider";
import { HiddenClue } from "./mystery/HiddenClue";
import { PLOT_EVENTS, track } from "@/lib/analytics";

const accents = ["#FF7A3D", "#FF4F87", "#00A9C7"];
const ease = [0.22, 1, 0.36, 1] as const;

function AccentBar({ accent }: { accent: string }) {
  return (
    <span
      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      style={{ background: accent }}
      aria-hidden
    />
  );
}

function ClueHeader({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div>
      <div className="text-[10px] tracked" style={{ color: accent }}>
        {eyebrow}
      </div>
      <div className="mt-1.5 font-display text-[clamp(1.5rem,4.8vw,2.1rem)] leading-none text-sand">{title}</div>
    </div>
  );
}

function PlaneGlyph({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <path d="M12 1 L13.6 8.2 L21 11 L13.4 12.6 L12 23 L10.6 12.6 L3 11 L10.4 8.2 Z" />
    </svg>
  );
}

/** The margin note + earned detail that appear once a clue is cracked. */
function ClueEarned({ found, note, earned }: { found: boolean; note: string; earned: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {found && (
        <motion.div
          className="mt-4 border-t border-dashed border-[#36C96F]/40 pt-3"
          initial={reduce ? undefined : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduce ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="block font-hand text-[1.1rem] leading-tight text-[#36C96F]">{note}</span>
          <span className="mt-1 block text-[0.82rem] leading-[1.35] text-sand/70">{earned}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A primary clue's payoff: whichever rung of the ladder it handed over,
 * decided by when it was found rather than which card it was.
 */
function LadderEarned({ rung }: { rung: LadderRung | null }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {rung && (
        <motion.div
          className="mt-4 border-l-[3px] border-[#36C96F] bg-black/25 py-2.5 pl-3"
          initial={reduce ? undefined : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduce ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="flex items-baseline gap-2">
            <span className="font-display text-[11px] leading-none text-[#36C96F]">CLUE {rung.step}</span>
            <span className="text-[8.5px] tracked text-sand/45">{rung.kicker}</span>
          </span>
          <span className="mt-1.5 block font-hand text-[1.05rem] leading-[1.25] text-sand">{rung.reveal}</span>
          <span className="mt-1 block font-hand text-[0.9rem] leading-none text-[#36C96F]/75">{rung.note}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Only the five primary clues move the tracker; everything else is a bonus
 * find. Stamping both "FOUND" in the same green is what made people believe
 * they were on 3/5 when the tracker said 1/5 — three stamps, one of which
 * counted, and nothing on screen admitting the difference. A bonus still gets
 * a stamp (it's the reward for looking), just not one that claims progress.
 */
function FoundMark({ found, id }: { found: boolean; id: ClueId }) {
  const reduce = useReducedMotion();
  const counts = (PRIMARY_CLUE_IDS as string[]).includes(id);
  const colour = counts ? "#36C96F" : "#FFD75E";

  return (
    <AnimatePresence>
      {found && (
        <motion.span
          className="pointer-events-none absolute -right-2 -top-2.5 border-2 bg-[#150711] px-1.5 py-0.5 font-display text-[9px] tracking-[0.14em]"
          style={{ borderColor: colour, color: colour }}
          initial={reduce ? undefined : { opacity: 0, scale: 1.8, rotate: -26 }}
          animate={{ opacity: 1, scale: 1, rotate: -9 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 15 }}
        >
          {counts ? "FOUND" : "BONUS"}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/**
 * CLUE 01 — the flight. Tapping it makes the destination field almost
 * resolve, then think better of it and lock back to CLASSIFIED. What you
 * actually earn is the shape of the trip, never the name of the place.
 */
function FlightClueCard({ clue, index }: { clue: FlightClue; index: number }) {
  const reduce = useReducedMotion();
  const accent = accents[index % accents.length];
  const { isFound, discover } = usePlot();
  const found = isFound("flight");
  const R = plotHunt.reveals.flight;
  // The scramble teases this destination's shape, so it comes from the journey.
  const scramble = useJourney().flightScramble;

  const [display, setDisplay] = useState(clue.to);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    if (reduce) {
      setDisplay(R.settle);
      discover("flight");
      return;
    }
    setRunning(true);
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(scramble[i % scramble.length]);
      i += 1;
      if (i > scramble.length) {
        clearInterval(timer);
        setDisplay(R.settle);
        setRunning(false);
        discover("flight");
      }
    }, 140);
  };

  return (
    <motion.button
      type="button"
      onClick={run}
      data-clue-id={clue.id}
      aria-label={`${clue.eyebrow}: ${clue.title}. Check the destination.`}
      className="group relative block w-full cursor-pointer touch-manipulation border border-sand/25 bg-white/[0.04] p-5 text-left outline-none transition-colors duration-300 hover:border-sand/55 focus-visible:border-sand sm:p-6"
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease }}
      whileHover={reduce ? undefined : { y: -6, rotate: -1.2 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
    >
      <AccentBar accent={accent} />
      <FoundMark found={found} id="flight" />
      <ClueHeader eyebrow={clue.eyebrow} title={clue.title} accent={accent} />

      <div className="relative mx-auto mt-5 h-24 w-24 sm:h-28 sm:w-28">
        <CircleScribble color={accent} className="absolute inset-0 h-full w-full opacity-60" />
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: running ? 1.6 : 9 }}
        >
          <PlaneGlyph color="#FFF1DC" className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>

      <p className="mt-5 font-serif text-[clamp(1.15rem,3.2vw,1.5rem)] italic leading-[1.2] text-sand">{clue.line}</p>
      <p className="mt-2 font-hand text-[clamp(1rem,2.8vw,1.2rem)] leading-[1.2] text-sand/70">{clue.hint}</p>

      <div className="relative mt-5 border-t border-dashed border-sand/30 pt-4">
        <span className="absolute left-0 top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: accent }} />
        <span className="absolute right-0 top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: accent }} />
        <div className="flex items-center justify-between text-[10px] tracked text-sand/60">
          <div>
            <div className="opacity-60">FROM</div>
            <div className="mt-0.5 text-sand">{clue.from}</div>
          </div>
          <div className="text-center">
            <div className="opacity-60">TO</div>
            <div
              className={`mt-0.5 min-w-[70px] transition-[filter,color] duration-200 ${
                running ? "text-[#FF7A3D] blur-0" : "text-sand blur-[3px]"
              }`}
            >
              {display}
            </div>
          </div>
          <div className="text-right">
            <div className="opacity-60">SEAT</div>
            <div className="mt-0.5 text-sand">{clue.seat}</div>
          </div>
        </div>
      </div>

      <ClueEarned found={found} note={R.note} earned={R.earned} />
    </motion.button>
  );
}

/**
 * CLUE 02 — a detail hidden in a real photograph. Nothing announces it; the
 * hotspot only pulses once you're near it, and the reward is for looking.
 */
function PhotoClueCard({ clue, index }: { clue: PhotoClue; index: number }) {
  const reduce = useReducedMotion();
  const accent = accents[index % accents.length];
  const { isFound, discover, rungFor } = usePlot();
  const found = isFound("landscape");
  const rung = rungFor("landscape");
  const [revealed, setRevealed] = useState(false);

  const open = () => {
    setRevealed((v) => !v);
    discover("landscape");
  };

  return (
    <motion.div
      data-clue-id={clue.id}
      className="group relative border border-sand/25 bg-white/[0.04] p-5 sm:p-6"
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease }}
      whileHover={reduce ? undefined : { y: -6, rotate: 1.2 }}
    >
      <AccentBar accent={accent} />
      <FoundMark found={found} id="landscape" />
      <ClueHeader eyebrow={clue.eyebrow} title={clue.title} accent={accent} />

      <button
        type="button"
        onClick={open}
        aria-pressed={revealed}
        aria-label="Look closer at the photograph"
        className="relative mt-5 block aspect-[4/3] w-full touch-manipulation overflow-hidden border border-sand/20 outline-none focus-visible:border-sand"
      >
        <Image
          src={clue.photo.src}
          alt={clue.photo.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 30vw"
          className="object-cover transition-transform duration-500"
          style={{ transform: revealed ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
        />
        <span className="absolute inset-0 bg-black/10" />

        <motion.span
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
          style={{ left: `${clue.hotspot.x}%`, top: `${clue.hotspot.y}%`, background: accent }}
          animate={reduce ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.span
          className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          style={{
            left: `${clue.hotspot.x}%`,
            top: `${clue.hotspot.y}%`,
            borderColor: accent,
            backgroundImage: `url(${clue.photo.src})`,
            /**
             * Percentages here resolve against the loupe, not the photo, so
             * the old "420%" drew the image ~336px wide — narrower than the
             * card already showed it. The glass magnified nothing. At 760% of
             * a 112px loupe the photo renders ~850px wide, which is a real
             * ~2x over the card and enough to read the roof. `auto` keeps the
             * aspect ratio; the old paired percentages squashed it.
             */
            backgroundSize: "760% auto",
            backgroundPosition: `${clue.hotspot.x}% ${clue.hotspot.y}%`,
          }}
          initial={false}
          animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />

        <span className="absolute bottom-2 right-2 text-[9px] tracked text-white/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
          {revealed ? "GOT IT" : "LOOK CLOSER"}
        </span>
      </button>

      <p className="mt-5 font-serif text-[clamp(1.15rem,3.2vw,1.5rem)] italic leading-[1.2] text-sand">{clue.line}</p>
      <p className="mt-2 font-hand text-[clamp(1rem,2.8vw,1.2rem)] leading-[1.2] text-sand/70">{clue.hint}</p>

      <LadderEarned rung={rung} />
    </motion.div>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scrambleTo(target: string, revealCount: number) {
  return target
    .split("")
    .map((ch, i) => {
      if (i < revealCount) return ch;
      if (ch === "@" || ch === "." || ch === " ") return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

/** Deterministic placeholder mask — server and client must render the same
 * first frame; the actual scramble only starts once mounted in the browser. */
function maskOf(target: string) {
  return target
    .split("")
    .map((ch) => (ch === "@" || ch === "." || ch === " " ? ch : "•"))
    .join("");
}

/**
 * CLUE 03 — the one that isn't here. It decodes itself once scrolled into
 * view, then hands you off to Instagram: the hunt genuinely continues off
 * the site rather than faking it here.
 */
function TwistClueCard({ clue, index }: { clue: TwistClue; index: number }) {
  const reduce = useReducedMotion();
  const accent = accents[index % accents.length];
  const { isFound, discover } = usePlot();
  const found = isFound("last");
  const R = plotHunt.reveals.last;

  const [display, setDisplay] = useState(() => maskOf(clue.reveal));
  const [decoded, setDecoded] = useState(false);
  /** Pointer or keyboard — the artifact reacts to both, so the reveal isn't hover-only. */
  const [hovered, setHovered] = useState(false);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    if (reduce) {
      setDisplay(clue.reveal);
      setDecoded(true);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setDisplay(scrambleTo(clue.reveal, n));
      if (n >= clue.reveal.length) {
        clearInterval(id);
        setDecoded(true);
      }
    }, 70);
  };

  return (
    <motion.a
      href={clue.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        discover("last");
        // The handoff out of the site. It never fired from here — only the
        // footer link did — so the funnel lost every exit that happened at
        // the actual moment of the fourth-wall break.
        track(PLOT_EVENTS.openInstagram);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      data-clue-id={clue.id}
      className="group relative flex flex-col border border-sand/25 bg-white/[0.04] p-5 outline-none transition-colors duration-300 hover:border-sand/60 focus-visible:border-sand sm:p-6"
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      onViewportEnter={start}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease }}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <AccentBar accent={accent} />
      <FoundMark found={found} id="last" />
      <ClueHeader eyebrow={clue.eyebrow} title={clue.title} accent={accent} />

      <p className="mt-4 font-serif text-[clamp(1.15rem,3.2vw,1.5rem)] italic leading-[1.15] text-sand">{clue.line}</p>
      <p className="mt-1.5 font-hand text-[clamp(1rem,2.8vw,1.2rem)] leading-[1.2] text-sand/70">{clue.hint}</p>

      {/*
        THE ARTIFACT. Everything above is the website talking; this is the
        thing it slides across the table. Cream paper on the plum card so it
        reads as physically separate — the one element on the page that isn't
        "of" the site, which is the whole fourth-wall gag.
      */}
      <div className="relative mt-5 grow" style={{ perspective: 700 }}>
        <motion.div
          className="paper relative h-full border border-ink/25 px-3.5 pb-3.5 pt-5 shadow-[0_18px_34px_-18px_rgba(0,0,0,0.85)]"
          initial={{ rotate: -1.4, y: 0 }}
          animate={{ rotate: hovered && !reduce ? -0.3 : -1.4, y: hovered && !reduce ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="grain" aria-hidden />
          <span className="tape absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2" aria-hidden />

          {/* evidence-log metadata, not UI chrome */}
          <span className="block font-mono text-[7.5px] leading-none tracking-[0.14em] text-ink/45">
            {clue.evidence.meta}
          </span>

          {/* the address they're being sent to */}
          <div className="mt-3 border-2 border-dashed border-ink/30 bg-ink/[0.04] px-3 py-2.5">
            <div
              className="font-mono text-[clamp(11px,2.6vw,13px)] leading-none tracking-[0.06em] transition-colors duration-300"
              style={{ color: decoded ? "#1a0d0a" : "rgba(26,13,10,0.45)" }}
            >
              {display}
            </div>
          </div>

          {/* hand-drawn arrow running from the address toward the exit */}
          <svg viewBox="0 0 200 14" className="mt-2 block w-full" aria-hidden>
            <motion.path
              d="M2,8 C60,3 130,11 186,6"
              fill="none"
              stroke="#1a0d0a"
              strokeOpacity="0.45"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0.55 }}
              animate={{ pathLength: reduce ? 0.55 : hovered ? 1 : 0.55 }}
              transition={{ duration: 0.5, ease }}
            />
            <path d="M182,2 L192,6 L182,10" fill="none" stroke="#1a0d0a" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span className="mt-1 block text-right font-hand text-[1.05rem] leading-none text-ink/70">
            {clue.evidence.annotation}
          </span>

          {/* the stamp that says this file was never ours */}
          <span
            className="pointer-events-none absolute bottom-3 left-3 border-2 px-1.5 py-0.5 font-display text-[8px] leading-none tracking-[0.12em] opacity-70"
            style={{ borderColor: accent, color: accent, rotate: "-7deg" }}
          >
            {clue.evidence.stamp}
          </span>
        </motion.div>
      </div>

      <span className="mt-3 block font-hand text-[0.95rem] leading-none text-sand/45">{clue.evidence.micro}</span>

      {/* the exit */}
      <span
        className="mt-3 flex items-center gap-2 text-[10px] tracked transition-colors duration-300"
        style={{ color: accent }}
      >
        <span className="relative">
          {decoded ? clue.evidence.cta : "DECODING…"}
          {/* underline draws itself on approach rather than sitting there */}
          <motion.span
            className="absolute -bottom-1 left-0 block h-px w-full origin-left"
            style={{ background: accent }}
            initial={false}
            animate={{ scaleX: hovered && decoded ? 1 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease }}
            aria-hidden
          />
        </span>
        <motion.span
          animate={reduce ? undefined : { x: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          aria-hidden
        >
          ↗
        </motion.span>
      </span>

      <ClueEarned found={found} note={R.note} earned={R.earned} />
    </motion.a>
  );
}

function ClueCard({ clue, index }: { clue: Clue; index: number }) {
  switch (clue.kind) {
    case "flight":
      return <FlightClueCard clue={clue} index={index} />;
    case "photo":
      return <PhotoClueCard clue={clue} index={index} />;
    case "twist":
      return <TwistClueCard clue={clue} index={index} />;
  }
}

export function MysteryPreview() {
  const journey = useJourney();

  return (
    <section
      id="clues"
      className="relative overflow-hidden px-5 py-14 text-sand sm:px-8 sm:py-16 lg:px-14"
      style={{ background: "radial-gradient(110% 80% at 80% 10%, #33113a 0%, #1d0a1c 55%, #150711 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <SectionLabel index={mystery.index} label={mystery.label} color="#FFF1DC" />

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <Reveal>
            <h2 className="relative font-display text-[clamp(2.5rem,9.5vw,6.2rem)] leading-[0.88] uppercase">
              {mystery.headline[0]}
              <br />
              <span className="relative inline-block text-[#FFD79A]">
                {mystery.headline[1]}
                <MarkerUnderline color="#36C96F" className="absolute -bottom-2 left-0 h-4 w-full" />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            <div className="max-w-[44ch] space-y-1 text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.45] text-sand/80">
              {mystery.body.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            {/* the fifth primary clue — the strongest nudge, right by the guess form */}
            <HiddenClue id="final" className="mt-4 block" noteWidth="17rem">
              <Note className="block text-[clamp(1.3rem,4vw,1.8rem)] text-pink" rotate={-4}>
                {mystery.annotation}
              </Note>
            </HiddenClue>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.clues.map((c, i) => (
            <ClueCard key={c.id} clue={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
