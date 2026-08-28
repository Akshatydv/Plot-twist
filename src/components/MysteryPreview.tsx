"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mystery, type Clue, type FlightClue, type PhotoClue, type TwistClue } from "@/content/site";
import { Note, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { CircleScribble, MarkerUnderline } from "./Brush";
import { plotHunt } from "@/content/mystery";
import { usePlot, type LadderRung } from "./mystery/PlotProvider";
import { HiddenClue } from "./mystery/HiddenClue";

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

/** A found clue gets stamped, so progress is legible at a glance. */
function FoundMark({ found }: { found: boolean }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {found && (
        <motion.span
          className="pointer-events-none absolute -right-2 -top-2.5 border-2 border-[#36C96F] bg-[#150711] px-1.5 py-0.5 font-display text-[9px] tracking-[0.14em] text-[#36C96F]"
          initial={reduce ? undefined : { opacity: 0, scale: 1.8, rotate: -26 }}
          animate={{ opacity: 1, scale: 1, rotate: -9 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 15 }}
        >
          FOUND
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
      setDisplay(R.scramble[i % R.scramble.length]);
      i += 1;
      if (i > R.scramble.length) {
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
      <FoundMark found={found} />
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
      <FoundMark found={found} />
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
          className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          style={{
            left: `${clue.hotspot.x}%`,
            top: `${clue.hotspot.y}%`,
            borderColor: accent,
            backgroundImage: `url(${clue.photo.src})`,
            backgroundSize: "420% 420%",
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
      onClick={() => discover("last")}
      data-clue-id={clue.id}
      className="group relative block border border-sand/25 bg-white/[0.04] p-5 outline-none transition-colors duration-300 hover:border-sand/60 focus-visible:border-sand sm:p-6"
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      onViewportEnter={start}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease }}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <AccentBar accent={accent} />
      <FoundMark found={found} />
      <ClueHeader eyebrow={clue.eyebrow} title={clue.title} accent={accent} />

      <p className="mt-5 font-serif text-[clamp(1.15rem,3.2vw,1.5rem)] italic leading-[1.2] text-sand">{clue.line}</p>
      <p className="mt-2 font-hand text-[clamp(1rem,2.8vw,1.2rem)] leading-[1.2] text-sand/70">{clue.hint}</p>

      <div className="mt-5 border border-sand/20 bg-black/25 px-4 py-3">
        <div
          className="font-mono text-[13px] tracking-[0.1em] transition-colors duration-300"
          style={{ color: decoded ? accent : "rgba(255,241,220,0.55)" }}
        >
          {display}
        </div>
      </div>

      <span
        className="mt-5 flex items-center gap-2 text-[10px] tracked transition-colors duration-300"
        style={{ color: accent }}
      >
        {decoded ? "OPEN INSTAGRAM" : "DECODING…"}
        <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
          ↗
        </span>
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
          {mystery.clues.map((c, i) => (
            <ClueCard key={c.id} clue={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
