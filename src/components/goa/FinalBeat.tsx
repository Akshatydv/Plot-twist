"use client";

import { finalBeat, glimpses } from "@/content/goa";
import { PLOT_EVENTS } from "@/lib/analytics";
import { Note, PlotButton, Stamp } from "../Bits";
import { Reveal } from "../motion";
import { MarkerUnderline } from "../Brush";
import { Glimpse } from "./Glimpse";

/**
 * THE FINAL BEAT — the last thing they feel before the form.
 *
 * The emotion being aimed at here is NOT excitement. Excitement makes people
 * bookmark a page; the possibility of being left out makes them act. So the
 * copy directly above the button is about the twenty seats and the fact that
 * a person decides — not about Goa, which has already done its job.
 *
 * "YOU CAME FOR GOA. YOU'LL LEAVE WITH 19 PEOPLE." closes the loop opened by
 * the hero's "Come alone. Leave with 19 others." — the page ends where it
 * started, which is what makes it a story rather than a scroll.
 */
export function FinalBeat() {
  return (
    <section
      id="final"
      className="relative overflow-hidden px-5 py-20 text-sand sm:px-8 sm:py-24 lg:px-14"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #2c0d28 0%, #190716 55%, #0e0410 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1000px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,8.8vw,5.2rem)] uppercase leading-[0.9] tracking-[-0.01em] text-sand/65">
                {finalBeat.big[0]}
                <br />
                <span className="relative inline-block text-sand">
                  {finalBeat.big[1]}
                  <MarkerUnderline color="#FF4F87" className="absolute -bottom-2 left-0 h-4 w-full" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[36ch] font-serif text-[clamp(1.15rem,3vw,1.55rem)] italic leading-[1.25] text-sand/80">
                {finalBeat.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <Stamp color="#FF7A3D">{finalBeat.seats}</Stamp>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PlotButton
                  href={finalBeat.cta.href}
                  bg="#FF4F87"
                  fg="#FFF1DC"
                  shadow="#FFF1DC"
                  event={PLOT_EVENTS.requestInvite}
                >
                  {finalBeat.cta.label}
                </PlotButton>
                <Note className="block text-[1.4rem] text-sand/60" rotate={-4}>
                  {finalBeat.note}
                </Note>
              </div>
            </Reveal>
          </div>

          <Glimpse
            glimpse={glimpses.closing}
            rotate={2}
            aspect="4 / 5"
            className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none"
            sizes="(max-width: 1024px) 70vw, 32vw"
          />
        </div>
      </div>
    </section>
  );
}
