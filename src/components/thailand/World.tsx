"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { beats as REELS, type World as WorldData } from "@/content/chaos";
import { Note } from "../Bits";
import { Focus, MaskLines, useCalm } from "../bir/Scenery";
import { Beat, ChaosCard, Reel, ReelClock } from "./Kit";
import { GroupChatRitual, LooselyRitual, RouteRitual, StagesRitual, SunriseRitual } from "./Rituals";

/**
 * ONE WORLD — a place the camera is, never a card about a place.
 *
 * ─── THE GRAMMAR, LEARNED FROM READING srilanka/World*.tsx ──────────────────
 * Every Sri Lanka world is built the same way and it is the reason seven
 * chapters read as one journey:
 *
 *     <WorldCard />        the constant — one full screen that opens
 *     <its own set piece>  the variable — a reel, a sequence, a ritual
 *     <Note />             the human aside, handwritten, once per world
 *
 * The grammar never changes; only the world does. The first build of this page
 * had no card and no set piece — seven flat sections in seven colours — which
 * is exactly why it did not feel like entering anything.
 *
 * ─── WHICH WORLDS GET A REEL, AND WHY MOST DO NOT ───────────────────────────
 * Two. A pinned sideways reel is the loudest device on this page after the
 * portal, and seven of them would be a carousel of carousels. 02 THE WATER and
 * 05 THE DROP get one because they are the only days that are genuinely a run
 * of hours you can scrub. 01 is a journey, 03 is a mood, 04 is a wait, and 06
 * and 07 are a feeling — none of those have times on them.
 *
 * Worlds without a reel get a PLATE instead: one spacious screen where the
 * prose is the set piece and the composition carries it.
 */
/**
 * WHAT EACH WORLD DOES AFTER ITS CARD.
 *
 * Two have a reel, five have a ritual, none has both — a world with two set
 * pieces has no shape, and the page would stop being able to tell you which
 * day mattered. The plate is the fallback for anything without either, and
 * nothing currently uses it, which is the point: every world now does
 * something only it does.
 */
const RITUALS: Record<string, (p: { world: WorldData }) => React.ReactNode> = {
  begins: (p) => <RouteRitual world={p.world} which="begins" />,
  calm: LooselyRitual,
  electric: GroupChatRitual,
  phuket: (p) => <RouteRitual world={p.world} which="phuket" />,
  last: StagesRitual,
  morning: SunriseRitual,
};

export function World({ world, priority = false }: { world: WorldData; priority?: boolean }) {
  const reel = world.id === "water" ? REELS.water : null;
  const Ritual = RITUALS[world.id];

  return (
    <div id={`world-${world.n}`} data-world={world.id} className="relative" style={{ background: world.ground }}>
      <ChaosCard
        n={world.n}
        date={world.cardDate}
        name={world.name}
        place={world.where}
        lines={world.lines}
        slot={world.media}
        tone={world.accent}
        ground={world.ground}
        ink={world.ink}
        tint={world.tint}
        register={world.register}
      />

      {reel ? (
        <Reel
          label={`${world.name}, hour by hour`}
          lead={(p) => <ReelClock beats={reel} p={p} tone={world.accent} ink={world.ink} />}
        >
          {(p) =>
            reel.map((b, i) => (
              <Beat
                key={b.key}
                b={b}
                i={i}
                n={reel.length}
                p={p}
                tone={world.accent}
                ink={world.ink}
                tint={beatTint(world.ground)}
                register={world.register}
              />
            ))
          }
        </Reel>
      ) : Ritual ? (
        <>
          <Plate world={world} priority={priority} />
          <Ritual world={world} />
        </>
      ) : (
        <Plate world={world} priority={priority} />
      )}
    </div>
  );
}

/**
 * THE PLATE — the set piece for a world that is a mood rather than a timetable.
 *
 * One screen, a lot of air, and the prose doing the work. It is deliberately
 * the quietest thing on the page: five of the seven worlds use it, so if it
 * were loud the page would have no dynamic range left for the two that are.
 *
 * `layout` decides where the type sits and how big it gets. Each value is used
 * exactly once across the seven — read down the maps at the bottom of this file
 * to check that no two worlds share a frame.
 */
function Plate({ world, priority }: { world: WorldData; priority?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className={`relative isolate flex min-h-[86svh] w-full overflow-hidden ${ALIGN[world.layout]}`}
      style={{ background: world.ground, color: world.ink }}
    >
      <motion.div className="absolute inset-0 opacity-[0.22]" style={calm ? undefined : { y }} aria-hidden>
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(120% 80% at 50% 40%, ${world.accent}33 0%, ${world.ground}00 70%)`,
          }}
        />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div className={`relative z-10 w-full px-5 sm:px-8 lg:px-14 ${FRAME[world.layout]}`}>
        <div className={`mx-auto w-full max-w-[1180px] ${BLOCK[world.layout]}`}>
          <MaskLines
            lines={world.title}
            as="h3"
            className={`leading-[0.92] ${
              world.register === "festival"
                ? "font-display uppercase tracking-[-0.005em]"
                : "font-serif italic tracking-[-0.01em]"
            } ${TITLE[world.layout]}`}
          />

          <div className={`mt-7 grid gap-x-12 gap-y-6 ${GRID[world.layout]}`}>
            <Focus delay={0.15}>
              <p className="text-[clamp(1rem,2.4vw,1.14rem)] leading-[1.55]" style={{ color: `${world.ink}e6` }}>
                {world.body}
              </p>
            </Focus>
            <Focus delay={0.3}>
              <p
                className={`self-end border-t pt-5 leading-[1.2] ${
                  world.register === "festival"
                    ? "font-display text-[clamp(1.1rem,3vw,1.5rem)] uppercase tracking-[0.01em]"
                    : "font-serif text-[clamp(1.2rem,3.4vw,1.7rem)] italic"
                }`}
                style={{ borderColor: `${world.accent}55` }}
              >
                {world.beat}
              </p>
            </Focus>
          </div>

          <div className="mt-10">
            {world.register === "festival" ? (
              <span className="text-[10px] tracked" style={{ color: `${world.ink}80` }}>
                {world.where}
              </span>
            ) : (
              <Note className="text-[1.3rem]" color={world.accent} rotate={world.layout === "drift" ? 3 : -3}>
                {world.where.toLowerCase()}
              </Note>
            )}
          </div>
        </div>
      </div>
      {priority ? null : null}
    </section>
  );
}

/** A beat's wash, built from its world's ground so a reel never leaves the world. */
function beatTint(ground: string) {
  return `linear-gradient(100deg, ${ground}d9 0%, ${ground}73 45%, ${ground}1a 75%), linear-gradient(to top, ${ground}b3, transparent 42%)`;
}

/* ------------------------------------------------------------------ */
/* the seven compositions                                              */
/* ------------------------------------------------------------------ */

/**
 * One row per world. Read down a column to see a single world's frame; read
 * across to check that no two share one. That is the only thing keeping this
 * from collapsing back into a template with seven skins.
 */

const ALIGN: Record<string, string> = {
  anchor: "items-end",
  float: "items-start",
  void: "items-center",
  held: "items-center",
  blast: "items-end",
  drift: "items-end",
  credits: "items-center",
};

const FRAME: Record<string, string> = {
  anchor: "pb-16 pt-24 sm:pb-20",
  float: "pb-24 pt-24 sm:pt-28",
  void: "py-28 sm:py-32",
  held: "py-32",
  blast: "pb-14 pt-24 sm:pb-16",
  drift: "pb-20 pt-24 sm:pb-24",
  credits: "py-28",
};

const BLOCK: Record<string, string> = {
  anchor: "",
  float: "",
  void: "max-w-[22ch] text-center",
  held: "max-w-[34ch] text-center",
  blast: "",
  drift: "flex flex-col items-end text-right",
  credits: "max-w-[30ch] text-center",
};

const TITLE: Record<string, string> = {
  anchor: "max-w-[16ch] text-[clamp(2.6rem,9vw,6.4rem)]",
  float: "max-w-[14ch] text-[clamp(2.6rem,9vw,6.8rem)]",
  void: "text-[clamp(3rem,11vw,8rem)]",
  held: "text-[clamp(1.8rem,5.4vw,3.4rem)]",
  blast: "max-w-none text-[clamp(4rem,17vw,13rem)] leading-[0.82]",
  drift: "max-w-[15ch] text-[clamp(2.4rem,8vw,5.6rem)]",
  credits: "text-[clamp(2.2rem,8vw,5rem)]",
};

const GRID: Record<string, string> = {
  anchor: "lg:grid-cols-[minmax(0,46ch)_minmax(0,32ch)]",
  float: "lg:grid-cols-[minmax(0,40ch)_minmax(0,28ch)]",
  void: "mx-auto max-w-[46ch]",
  held: "mx-auto max-w-[38ch]",
  blast: "lg:grid-cols-[minmax(0,42ch)_minmax(0,34ch)]",
  drift: "w-full lg:grid-cols-[minmax(0,30ch)_minmax(0,40ch)]",
  credits: "mx-auto max-w-[40ch]",
};
