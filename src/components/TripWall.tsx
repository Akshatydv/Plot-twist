"use client";

import Image from "next/image";
import { tripWall, type TripShot } from "@/content/tripWall";
import { brand } from "@/content/site";
import { InstagramLink } from "./InstagramLink";

const TILT = [-3, 2.5, -1.5, 3.5, -2.5, 1.5, -4, 2, -1, 3, -2, 4];
const TAPE = ["rgba(232,210,170,.85)", "rgba(255,79,135,.55)", "rgba(127,227,212,.6)", "rgba(232,210,170,.85)"];
const STICKERS: Record<number, { text: string; bg: string; fg: string; rot: number }> = {
  1: { text: "core memory", bg: "#FF4F87", fg: "#FFF1DC", rot: -8 },
  6: { text: "10/10 would sail again", bg: "#1A0D0A", fg: "#FFF1DC", rot: 6 },
  11: { text: "no notes", bg: "#FFE9A8", fg: "#1A0D0A", rot: -5 },
  16: { text: "real trip. real people.", bg: "#FF4F87", fg: "#FFF1DC", rot: 5 },
  21: { text: "main character energy", bg: "#1A0D0A", fg: "#FFE9A8", rot: -6 },
  27: { text: "obsessed", bg: "#FFE9A8", fg: "#1A0D0A", rot: 7 },
  33: { text: "core memory", bg: "#FF4F87", fg: "#FFF1DC", rot: -4 },
};

/**
 * THE CAMERA ROLL — glimpses from our previous trips.
 *
 * Three rows of taped polaroids that drift sideways on a loop, alternating
 * direction, like flicking through a camera roll. Hover or touch holds a row
 * still; reduced-motion users get a plain horizontal scroller instead. The
 * photos live in content/tripWall.ts and are shared by every page that uses it.
 */
export function TripWall({ tone = "warm" }: { tone?: "warm" | "dark" }) {
  const dark = tone === "dark";
  const shots = tripWall.shots;
  const rows = [0, 1, 2].map((r) => shots.filter((_, i) => i % 3 === r));

  return (
    <section
      id="trip-wall"
      className={`relative overflow-hidden py-20 sm:py-28 ${dark ? "bg-[#140b0b] text-sand" : "paper text-ink"}`}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <p className={`flex items-center gap-3 text-[11px] font-medium tracked ${dark ? "text-sand/60" : "text-ink/55"}`}>
          <span className={`h-px w-10 ${dark ? "bg-sand/40" : "bg-ink/30"}`} /> {tripWall.eyebrow}
        </p>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.6rem,10vw,7rem)] uppercase leading-[0.88]">
            {tripWall.headline[0]}
            <br />
            <span className="font-brush normal-case text-pink">{tripWall.headline[1]}</span>
          </h2>
          <p className={`max-w-[30ch] font-serif text-[1.2rem] italic leading-[1.25] ${dark ? "text-sand/70" : "text-ink/65"}`}>{tripWall.note}</p>
        </div>
      </div>

      <div className="roll mt-14 flex flex-col gap-6 sm:gap-10">
        {rows.map((row, r) => (
          <div key={r} className="roll-row group relative overflow-hidden py-4">
            <div
              className={`roll-track flex w-max items-start gap-5 sm:gap-8 ${r % 2 ? "roll-track--rev" : ""}`}
              style={{ animationDuration: `${80 + r * 18}s` }}
            >
              {[...row, ...row].map((s, k) => (
                <Polaroid key={`${s.src}-${k}`} shot={s} i={r * 100 + (k % row.length) * 3 + r} dup={k >= row.length} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-12 flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-8 lg:px-14">
        <InstagramLink
          href={brand.instagramUrl}
          className={`group inline-flex items-center gap-3 border px-6 py-3.5 text-[12px] font-semibold uppercase tracked transition-colors hover:border-pink hover:bg-pink hover:text-sand ${dark ? "border-sand/40" : "border-ink/40"}`}
        >
          See more on {brand.instagram} <span aria-hidden>↗</span>
        </InstagramLink>
        <span className={`-rotate-2 font-hand text-2xl ${dark ? "text-[#FFE9A8]" : "text-ink/70"}`}>the camera roll is dangerous.</span>
      </div>

      <style>{`
        .roll-row{-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
        .roll-track{animation:roll-left linear infinite}
        .roll-track--rev{animation-name:roll-right}
        .roll-row:hover .roll-track,.roll-row:active .roll-track{animation-play-state:paused}
        @keyframes roll-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes roll-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @media (prefers-reduced-motion: reduce){
          .roll-row{overflow-x:auto}
          .roll-track{animation:none}
        }
      `}</style>
    </section>
  );
}

function Polaroid({ shot, i, dup }: { shot: TripShot; i: number; dup: boolean }) {
  const tilt = TILT[i % TILT.length];
  const sticker = dup ? undefined : STICKERS[i % 40];
  const w = shot.shape === "wide" ? "w-[300px] sm:w-[400px]" : shot.shape === "square" ? "w-[230px] sm:w-[300px]" : "w-[200px] sm:w-[260px]";
  const aspect = shot.shape === "wide" ? "aspect-[4/3]" : shot.shape === "square" ? "aspect-square" : "aspect-[4/5]";
  return (
    <figure
      className={`relative shrink-0 transition-transform duration-500 hover:z-20 hover:scale-[1.04] ${w}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden={dup || undefined}
    >
      <div className="bg-[#FFFDF8] p-2 pb-10 shadow-[0_14px_30px_rgba(26,13,10,0.28),0_2px_5px_rgba(26,13,10,0.12)] sm:p-2.5 sm:pb-12">
        <div className={`relative w-full overflow-hidden ${aspect}`}>
          <Image src={shot.src} alt={dup ? "" : shot.alt} fill sizes="(min-width: 640px) 400px, 300px" className="object-cover" style={{ objectPosition: shot.focal }} />
        </div>
        <figcaption className="absolute inset-x-2 bottom-2 truncate text-center font-hand text-[1.1rem] leading-none text-[#3a2a24] sm:bottom-3 sm:text-[1.35rem]">
          {shot.caption}
        </figcaption>
      </div>
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-20"
        style={{ background: TAPE[i % TAPE.length], transform: `translateX(-50%) rotate(${-tilt * 1.5}deg)` }}
      />
      {sticker && (
        <span
          aria-hidden
          className="absolute -right-3 top-5 z-10 whitespace-nowrap rounded-full border-2 border-white px-3 py-1 font-brush text-[0.8rem] shadow-md sm:text-[0.95rem]"
          style={{ background: sticker.bg, color: sticker.fg, transform: `rotate(${sticker.rot}deg)` }}
        >
          {sticker.text}
        </span>
      )}
    </figure>
  );
}
