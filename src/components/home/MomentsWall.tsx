"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { wall, type WallItem } from "@/content/home";
import { brand } from "@/content/site";
import { InstagramLink } from "../InstagramLink";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * WHAT DOES A PLOT TWIST LOOK LIKE — the wall.
 *
 * Columns of moments drifting past each other in opposite directions, like a
 * wall of screens in a club. Hover (or touch) holds a column still.
 *
 * ─── HONESTY ────────────────────────────────────────────────────────────────
 * Every frame on it today is stock, so the header says MOODBOARD and the
 * captions describe a feeling, never a trip. When real footage lands it goes
 * in `wall.items` with `source: "trip"`, `wall.mode` flips to "trips", and
 * the header changes with it. `wall.voices` renders real quotes only.
 */
export function MomentsWall() {
  const reduce = useReducedMotion();

  return (
    <section id="moments" className="relative overflow-hidden bg-[#0f0707] text-sand">
      <div className="relative z-10 px-5 pt-24 sm:px-8 sm:pt-32 lg:px-14">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-sand/60">
          <span className="h-px w-10 bg-sand/40" /> {wall.eyebrow}
        </p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.8rem,11vw,8rem)] uppercase leading-[0.88]">
            {wall.headline[0]}
            <br />
            <span className="font-brush normal-case text-[#FFE9A8]">{wall.headline[1].charAt(0) + wall.headline[1].slice(1).toLowerCase()}</span>
          </h2>
          <p className="max-w-[28ch] font-serif text-[1.15rem] italic leading-[1.25] text-sand/65">
            {wall.mode === "moodboard" ? wall.moodboardNote : wall.tripsNote}
          </p>
        </div>
      </div>

      {/* phones get two columns, desktop four — each its own set, so every frame is on the wall either way */}
      <Columns cols={distribute(wall.items, 2)} className="grid grid-cols-2 lg:hidden" />
      <Columns cols={distribute(wall.items, 4)} className="hidden grid-cols-4 lg:grid" />

      {wall.voices.length > 0 && (
        <ul className="relative z-10 grid gap-8 px-5 pt-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-14">
          {wall.voices.map((v) => (
            <li key={v.quote}>
              <p className="font-serif text-[1.6rem] leading-[1.15]">“{v.quote}”</p>
              <p className="mt-3 text-[10px] tracked text-sand/55">
                {v.name} · {v.journey}
              </p>
            </li>
          ))}
        </ul>
      )}

      <motion.div
        className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-3 px-5 pb-24 pt-12 sm:px-8 lg:px-14"
        initial={reduce ? undefined : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <InstagramLink
          href={brand.instagramUrl}
          className="group inline-flex items-center gap-3 border border-sand/40 px-6 py-3.5 text-[12px] font-semibold uppercase tracked transition-colors hover:border-pink hover:bg-pink"
        >
          {wall.follow.label} {brand.instagram} <span aria-hidden>↗</span>
        </InstagramLink>
        <span className="-rotate-2 font-hand text-xl text-[#FFE9A8]">{wall.follow.note}</span>
      </motion.div>
    </section>
  );
}

function Columns({ cols, className }: { cols: WallItem[][]; className: string }) {
  const fade = "linear-gradient(180deg,transparent 0%,#000 12%,#000 88%,transparent 100%)";
  return (
    <div
      className={`relative mt-12 h-[115svh] gap-3 overflow-hidden px-3 sm:gap-4 sm:px-4 lg:h-[125vh] ${className}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      {cols.map((col, ci) => (
        <div key={ci} className="relative">
          <div className={`home-col flex flex-col gap-3 sm:gap-4 ${ci % 2 ? "home-col--down" : ""}`} style={{ animationDuration: `${70 + ci * 12}s` }}>
            {/* twice, so the loop is seamless */}
            {[...col, ...col].map((item, k) => (
              <Tile key={`${item.src}-${k}`} item={item} dup={k >= col.length} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Tile({ item, dup }: { item: WallItem; dup: boolean }) {
  return (
    <figure className={`group relative w-full overflow-hidden bg-[#1a0d0a] ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} aria-hidden={dup || undefined}>
      {item.kind === "video" ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={item.src} poster={item.poster} muted loop playsInline autoPlay preload="none" />
      ) : (
        <Image
          src={item.src}
          alt={dup ? "" : item.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,4,10,0.75)_100%)]" />
      {item.caption && (
        <figcaption className="absolute bottom-2.5 left-3 right-3 font-hand text-[1.2rem] leading-none text-sand sm:text-[1.4rem]">{item.caption}</figcaption>
      )}
    </figure>
  );
}

/** Round-robin into columns so each column mixes tall and wide frames. */
function distribute<T>(items: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  items.forEach((it, i) => cols[i % n].push(it));
  return cols;
}
