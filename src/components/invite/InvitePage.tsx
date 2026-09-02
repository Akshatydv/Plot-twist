"use client";

import Image from "next/image";
import { contact } from "@/content/site";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Reveal } from "../motion";
import { Logo } from "../Logo";

/**
 * THE INVITE — the link you send instead of a file.
 *
 * ─── WHY THIS EXISTS ────────────────────────────────────────────────────────
 * The invite began as a PDF, which Instagram and Snapchat refuse. Cutting it
 * into story cards was worse: an invitation is ONE object, and a public story
 * is an advert. A link keeps it single and private — the recipient gets a DM,
 * the preview card does the visual work in the thread, and this page is what
 * opens.
 *
 * It is also the only version where the call to action actually works. In a
 * JPEG the WhatsApp button is a dead graphic; here it is a real link.
 *
 * ─── WHAT IS DELIBERATELY ABSENT ────────────────────────────────────────────
 * NO PRICE. The invite withholds it on purpose — "the rest is better told
 * personally" is the whole mechanic, and the number is what the conversation
 * is for. The dossier PDF carries it.
 *
 * NO NAME. This is the general invite: one URL, sent to many, no personalised
 * routes. So nothing here claims the reader was hand-picked. The exclusivity
 * is carried by twenty being a real number and by the pass having no passenger
 * written on it yet.
 *
 * ─── THE SHAPE ──────────────────────────────────────────────────────────────
 * A narrow column, phone-width, centred. Almost everyone opens this from an
 * Instagram DM on a phone; on a desktop it reads as a tall card, which is the
 * right impression anyway. No wide desktop layout, on purpose.
 */

const CHAPTERS = [
  {
    day: "SATURDAY",
    no: "01",
    name: ["BOLLYWOOD", "AFTER DARK"],
    beats: "Check-in · Beach · Adventure sports · Jet ski · Dinner · Get ready · Bollywood night",
    src: "/photos/goa/chapters/bollywood.jpg",
    tint: "text-pink",
  },
  {
    day: "SUNDAY",
    no: "02",
    name: ["WHITE", "FLAMINGO"],
    beats: "Breakfast · Pool · Chapora · Cafés · Get ready · Sunset yacht · Club hopping",
    src: "/photos/goa/chapters/flamingo.jpg",
    tint: "text-[#FFE9A8]",
  },
  {
    day: "MONDAY",
    no: "03",
    name: ["LOST", "IN GOA"],
    beats: "Breakfast · Open jeeps · South Goa · Waterfall · Beaches · Shack · Sunset · Group decides",
    src: "/photos/goa/chapters/lost.jpg",
    tint: "text-[#6FE3A8]",
  },
  {
    day: "TUESDAY",
    no: "04",
    name: ["THE HANGOVER", "CLUB"],
    beats: "Coffee · Pool · Beach · Brunch · One last surprise · One last hang",
    src: "/photos/goa/chapters/hangover.jpg",
    tint: "text-[#e08a2b]",
  },
];

export function InvitePage() {
  const number = contact.whatsappNumber.replace(/[^\d]/g, "");
  const wa = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(
        "I'm in for Goa 🌴 send me the rest of the plot"
      )}`
    : null;

  return (
    <main className="mx-auto w-full max-w-[560px] bg-[#0b0508] text-sand">
      {/* ================= THE OPEN ================= */}
      <section className="grain relative min-h-[100svh] overflow-hidden">
        <Image
          /* the PORTRAIT cove — hero.jpg is landscape 3:2 and crops to bare sky
             in a tall phone frame, which is what made this read as grey haze */
          src="/photos/goa/escape.jpg"
          alt=""
          fill
          priority
          sizes="560px"
          className="object-cover object-[50%_42%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(10,4,10,.76) 0%,rgba(10,4,10,.28) 24%,rgba(12,5,12,.40) 50%,rgba(9,3,9,.82) 80%,rgba(6,2,6,.97) 100%)",
          }}
        />

        <div className="relative flex min-h-[100svh] flex-col items-center px-7 pb-12 pt-12 text-center">
          <Logo className="text-[15px]" />
          <p className="tracked mt-3 text-[10px] font-bold text-sand/70">JOURNEY 00 — GOA</p>

          <div className="mt-auto">
            <Reveal>
              <p className="font-hand text-[clamp(1.5rem,7vw,2rem)] leading-none text-[#FFE9A8]">
                if this reached you,
              </p>
              {/* Two lines, two faces — the established treatment. Set on one
                  Anton line it overflowed the right edge at phone width and lost
                  the pink brush beat the whole brand hangs on. */}
              <h1 className="mt-1 font-display text-[clamp(2.6rem,12vw,3.4rem)] uppercase leading-[0.9] tracking-[-0.01em]">
                THE PLOT
              </h1>
              <p className="mt-0.5 font-brush text-[clamp(2.1rem,9.5vw,2.8rem)] leading-[1.02] text-pink">
                FOUND YOU.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 font-display text-[clamp(0.95rem,3.9vw,1.15rem)] uppercase leading-[1.3]">
                THIS ISN&rsquo;T A GROUP TRIP.
                <br />
                IT&rsquo;S A PLOT WE&rsquo;RE WRITING TOGETHER.
              </p>
              <p className="mt-4 font-hand text-[clamp(1.05rem,4.6vw,1.35rem)] text-[#FFE9A8]">
                And we think you belong in it
              </p>
            </Reveal>
          </div>

          <div className="mt-auto">
            <p className="font-display text-[clamp(0.9rem,4vw,1.1rem)] tracking-[0.02em] text-[#FFE9A8]">
              20 PEOPLE · 4 DAYS · 17–20 OCT 2026
            </p>
            <p className="tracked mt-6 text-[9px] font-bold text-sand/55">THE INVITATION ↓</p>
            <span className="mx-auto mt-4 block h-10 w-px bg-sand/40" />
          </div>
        </div>
      </section>

      {/* ================= 01 · THE PASS ================= */}
      <section className="paper grain relative overflow-hidden px-7 py-12 text-ink">
        <SectionLabel n="01" t="THE PASS" tone="dark" />

        <Reveal>
          <div className="relative mt-6 grid grid-cols-[1fr_34px] bg-[#fffdf7] shadow-[5px_5px_0_0_rgba(26,13,10,0.14)]">
            <div className="p-6">
              <div className="flex items-baseline justify-between text-[8px] font-bold uppercase tracking-[0.24em]">
                <span>PLOT TWIST</span>
                <span className="text-ink/50">JOURNEY 00 · GOA</span>
              </div>

              <div
                className="mt-4 h-7"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,#1a0d0a 0 2px,transparent 2px 4px,#1a0d0a 4px 7px,transparent 7px 9px,#1a0d0a 9px 10px,transparent 10px 14px)",
                }}
              />

              <p className="tracked mt-5 text-[8px] font-bold text-ink/50">DESTINATION</p>
              <p className="font-display text-[2.7rem] uppercase leading-[0.88]">GOA</p>
              <p className="mt-1 font-display text-[1.05rem] tracking-[0.02em] text-pink">
                17–20 OCTOBER 2026
              </p>

              <div className="mt-5 border-t border-ink/20 pt-4">
                <p className="tracked text-[8px] font-bold text-ink/50">PASSENGER</p>
                {/* No name is written here on purpose: this link goes to many
                    people, and an empty seat is a better object than a blank. */}
                <p className="mt-1 font-display text-[1.3rem] uppercase tracking-[0.04em] text-ink/45">
                  TO BE CAST
                </p>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  ["DURATION", "4 DAYS · 3 NIGHTS"],
                  ["THE CAST", "20 PEOPLE"],
                  ["THE SPLIT", "10 GIRLS · 10 GUYS"],
                  ["AGES", "18–30"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="tracked text-[7.5px] font-bold text-ink/50">{k}</dt>
                    <dd className="mt-1 font-display text-[0.95rem] tracking-[0.02em]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/20 pt-4">
                <div>
                  <p className="tracked text-[7.5px] font-bold text-ink/50">SERIAL</p>
                  <p className="mt-1 font-display text-[0.9rem] tracking-[0.06em]">PT-00-GOA-2026</p>
                </div>
                <Stamp />
              </div>
            </div>

            <div className="relative flex items-center justify-center border-l border-dashed border-ink/40">
              <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-[#fff1dc]" />
              <span className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-full bg-[#fff1dc]" />
              <span className="tracked whitespace-nowrap text-[7.5px] font-bold text-ink/50 [writing-mode:vertical-rl] rotate-180">
                ADMIT ONE · INVITATION ONLY
              </span>
            </div>
          </div>
        </Reveal>

        {/* the 10/10 */}
        <Reveal delay={0.1}>
          <div className="mt-14 text-center">
            <p className="font-display text-[1.5rem] uppercase leading-none">ONLY</p>
            <span className="relative my-1 inline-block">
              <svg viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden className="absolute -inset-x-1 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+8px)]">
                <path
                  d="M100 5 C158 5,196 22,196 45 C196 69,156 86,99 85 C43 84,5 68,5 45 C5 22,44 6,100 5 Z"
                  fill="none" stroke="#ff4f87" strokeWidth="3.2" strokeLinecap="round"
                />
              </svg>
              <span className="relative px-8 font-hand text-[3.4rem] font-bold leading-none text-pink">
                10/10
              </span>
            </span>
            <p className="font-display text-[1.5rem] uppercase leading-none">ENERGY.</p>
            <p className="mx-auto mt-5 max-w-[30ch] text-[0.95rem] leading-[1.5] text-ink/72">
              Good stories. Big personalities. People who are always up for one more plan.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ================= 02 · THE GLIMPSE ================= */}
      <section className="grain relative overflow-hidden bg-[#180a14] px-7 py-12">
        <SectionLabel n="02" t="THE GLIMPSE" tone="light" />

        <Reveal>
          <h2 className="mt-5 font-display text-[clamp(1.7rem,8vw,2.2rem)] uppercase leading-[0.94]">
            FOUR DAYS.
            <br />
            <span className="text-[#FFE9A8]">FOUR CHAPTERS.</span>
          </h2>
          <p className="mt-3 font-serif text-[1.05rem] italic leading-[1.3] text-sand/82">
            From first drinks to last coffee — every day has a plot.
          </p>
        </Reveal>

        <div className="mt-7 space-y-6">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.no} delay={0.05 * i}>
              <div className="relative h-[128px] overflow-hidden">
                <Image src={c.src} alt="" fill sizes="560px" className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg,rgba(10,4,10,.88) 0%,rgba(10,4,10,.52) 54%,rgba(10,4,10,.28) 100%)",
                  }}
                />
                <div className="absolute inset-x-5 bottom-4">
                  <p className="tracked text-[8px] font-bold text-sand/75">{c.day}</p>
                  <p className="mt-1 font-display text-[1.35rem] uppercase leading-[0.94]">
                    {c.name[0]}
                    <br />
                    {c.name[1]}
                  </p>
                </div>
                <p className={`absolute bottom-3 right-5 font-display text-[1.9rem] leading-none ${c.tint}`}>
                  {c.no}
                </p>
              </div>
              <p className="tracked mt-2.5 text-[9px] font-medium uppercase leading-[1.7] text-sand/72">
                {c.beats}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-9 font-serif text-[1.05rem] italic leading-[1.3] text-[#FFE9A8]">
            That&rsquo;s the trailer. The film only screens for twenty people.
          </p>
        </Reveal>
      </section>

      {/* ================= 03 · WHO GETS IN ================= */}
      <section className="paper grain relative overflow-hidden px-7 py-12 text-ink">
        <SectionLabel n="03" t="WHO GETS IN" tone="dark" />
        <Reveal>
          <h2 className="mt-5 font-display text-[clamp(1.6rem,7.5vw,2rem)] uppercase leading-[0.96]">
            TWENTY PEOPLE.
            <br />
            <span className="text-pink">NO FILLERS.</span>
          </h2>
          <div className="mt-5 space-y-3 text-[0.98rem] leading-[1.5] text-ink/75">
            <p>Ten girls, ten guys, all somewhere between 18 and 30.</p>
            <p>A real person reads every application — it isn&rsquo;t first-come, and it isn&rsquo;t random.</p>
            <p>We&rsquo;re looking for the ones who say yes before they know the plan.</p>
          </div>
          <p className="mt-5 font-hand text-[1.25rem] text-pink">
            If that sounds like you, you already know.
          </p>
        </Reveal>
      </section>

      {/* ================= 04 · THE FINAL CALL ================= */}
      <section className="grain relative min-h-[100svh] overflow-hidden bg-[#0d0710]">
        <Image
          src="/photos/goa/unexpected.jpg"
          alt=""
          fill
          sizes="560px"
          className="object-cover object-[50%_30%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(10,5,10,.34) 0%,rgba(10,5,10,.74) 26%,rgba(9,4,9,.93) 50%,rgba(7,3,7,.98) 100%)",
          }}
        />

        <div className="relative flex min-h-[100svh] flex-col px-7 pb-10 pt-12">
          <SectionLabel n="04" t="THE FINAL CALL" tone="light" />

          <div className="mt-auto">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,7.5vw,1.95rem)] uppercase leading-[0.98] text-sand/42">
                SOME TRIPS
                <br />
                YOU BOOK.
              </p>
              <p className="mt-3 font-display text-[clamp(1.5rem,7.5vw,1.95rem)] uppercase leading-[0.98]">
                SOME TRIPS
                <br />
                YOU JUST SAY
              </p>
              <span className="relative mt-1 inline-block">
                <span className="font-brush text-[clamp(3rem,16vw,4.2rem)] leading-none text-[#FFE9A8]">
                  YES.
                </span>
                <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden
                     className="absolute -bottom-1 -left-1 h-3 w-[calc(100%+12px)]">
                  <path d="M3 9 C40 4,84 12,128 6 C156 2,178 8,197 5" fill="none"
                        stroke="#ff4f87" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-9 font-display text-[clamp(0.85rem,3.6vw,1rem)] tracking-[0.03em] text-[#FFE9A8]">
                GOA · 17–20 OCTOBER 2026 · 10/10 ENERGY
              </p>
              <p className="mt-2 font-hand text-[1.2rem] text-sand/85">
                20 people. 4 days. One very bad idea.
              </p>

              <div className="mt-7 border-t border-sand/22 pt-6">
                <p className="font-display text-[clamp(0.95rem,4vw,1.1rem)] uppercase leading-tight">
                  THE REST IS BETTER TOLD PERSONALLY.
                </p>
                <p className="mt-2.5 text-[0.95rem] leading-[1.5] text-sand/75">
                  Want the full itinerary?
                  <br />
                  Say the word and we&rsquo;ll send you the rest of the plot.
                </p>
              </div>

              {/* The one element that only works because this is a page and
                  not an image: a live WhatsApp handoff. */}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track(PLOT_EVENTS.contactWhatsapp, { location: "invite" })}
                  className="relative mt-8 inline-block -rotate-[1.5deg] bg-pink px-9 py-4 font-display text-[1.5rem] uppercase leading-none tracking-[0.05em] text-sand shadow-[7px_7px_0_0_rgba(255,241,220,0.92)] transition-transform active:translate-x-[2px] active:translate-y-[2px]"
                >
                  I&rsquo;M IN →
                </a>
              )}

              <p className="mt-7 font-hand text-[1.25rem] text-[#FFE9A8]">See you in Goa.</p>
            </Reveal>
          </div>

          <div className="mt-auto flex items-baseline justify-between gap-5 border-t border-sand/20 pt-5">
            <p className="font-display text-[1rem] uppercase tracking-[0.04em]">DO IT FOR THE PLOT.</p>
            <p className="tracked text-[8px] font-bold text-sand/55">
              <a href="https://www.instagram.com/plottwist.social/" target="_blank" rel="noreferrer">
                @PLOTTWIST.SOCIAL
              </a>
            </p>
          </div>
          <p className="mt-3 font-hand text-[1.1rem] text-sand/50">Go on. You know you want to.</p>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ n, t, tone }: { n: string; t: string; tone: "light" | "dark" }) {
  const c = tone === "light" ? "text-sand/55" : "text-ink/55";
  const bar = tone === "light" ? "bg-sand/30" : "bg-ink/30";
  return (
    <div className={`flex items-center gap-4 ${c}`}>
      <span className={`font-display text-[0.85rem] tracking-[0.1em] ${tone === "light" ? "text-sand" : "text-ink"}`}>
        {n}
      </span>
      <span className={`block h-px w-9 ${bar}`} />
      <span className="tracked text-[9px] font-bold uppercase">{t}</span>
    </div>
  );
}

function Stamp() {
  return (
    <svg width="74" height="74" viewBox="0 0 60 60" aria-hidden>
      <defs>
        <path id="inv-arc-t" d="M30 30 m -19.5 0 a 19.5 19.5 0 1 1 39 0" fill="none" />
        <path id="inv-arc-b" d="M30 30 m 18.5 0 a 18.5 18.5 0 1 1 -37 0" fill="none" />
      </defs>
      <circle cx="30" cy="30" r="25.5" fill="none" stroke="#00a9c7" strokeWidth="1.1" opacity=".85" />
      <circle cx="30" cy="30" r="22.6" fill="none" stroke="#00a9c7" strokeWidth=".5" opacity=".6" />
      <text fontFamily="var(--font-anton)" fontSize="7.2" fill="#00a9c7" letterSpacing="1.8">
        <textPath href="#inv-arc-t" startOffset="50%" textAnchor="middle">PLOT TWIST</textPath>
      </text>
      <text fontFamily="var(--font-anton)" fontSize="6.6" fill="#00a9c7" letterSpacing="1.6">
        <textPath href="#inv-arc-b" startOffset="50%" textAnchor="middle">JOURNEY 00</textPath>
      </text>
      <text x="30" y="29" fontFamily="var(--font-anton)" fontSize="12" fill="#00a9c7"
            textAnchor="middle" dominantBaseline="middle">GOA</text>
      <text x="30" y="38.5" fontFamily="var(--font-anton)" fontSize="5" fill="#00a9c7"
            textAnchor="middle" letterSpacing=".8">OCT 2026</text>
    </svg>
  );
}
