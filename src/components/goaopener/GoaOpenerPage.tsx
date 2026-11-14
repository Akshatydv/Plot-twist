import { Ticker } from "@/components/Ticker";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { TripWall } from "@/components/TripWall";
import { goaOpenerFacts, goaOpenerPremise } from "@/content/goaOpener";
import { GoaOpenerHero } from "./GoaOpenerHero";
import { GoaStrip } from "./GoaEditions";

/**
 * THE SEASON OPENER PAGE — Goa's second departure.
 *
 * Deliberately shorter than the New Year's page: that one sells four planned
 * days; this one sells a trip whose plan is still being written, so it sells
 * the idea (a small group, a good start to the season), shows the real photos
 * of the last Goa, states plainly what is still pending, and takes the
 * application. Same wrapper contract as the other variants (JourneyPage).
 */
export function GoaOpenerPage() {
  return (
    <>
      <main className="relative">
        <GoaOpenerHero />

        <div className="relative -mt-4 overflow-hidden">
          <Ticker
            items={["GOA · SEASON OPENER", "18–21 DEC", "18–30 ONLY", "APPLICATIONS ARE READ BY HUMANS", "DO IT FOR THE PLOT"]}
            bg="#FF4F87"
            fg="#FFF1DC"
            rotate={-1.6}
          />
        </div>

        <section className="paper relative overflow-hidden px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-14">
          <div className="mx-auto max-w-[1100px]">
            <p className="flex items-center gap-3 text-[11px] font-medium tracked text-ink/55">
              <span className="h-px w-10 bg-ink/30" /> {goaOpenerPremise.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,10vw,6.4rem)] uppercase leading-[0.88]">
              {goaOpenerPremise.headline[0]}
              <br />
              <span className="font-brush normal-case text-pink">{goaOpenerPremise.headline[1]}</span>
            </h2>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {goaOpenerPremise.points.map((p) => (
                <li key={p.k} className="border-t-2 border-ink pt-4">
                  <span className="text-[11px] font-semibold tracked text-pink">{p.k}</span>
                  <p className="mt-2 font-display text-[1.6rem] uppercase leading-[1]">{p.t}</p>
                  <p className="mt-2 font-serif text-[1.1rem] italic leading-[1.3] text-ink/70">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TripWall />

        <section className="relative overflow-hidden bg-ink px-5 py-20 text-sand sm:px-8 sm:py-24 lg:px-14">
          <div className="mx-auto max-w-[900px]">
            <p className="flex items-center gap-3 text-[11px] font-medium tracked text-sand/60">
              <span className="h-px w-10 bg-sand/40" /> {goaOpenerFacts.eyebrow}
            </p>
            <dl className="mt-10">
              {goaOpenerFacts.rows.map((r) => (
                <div key={r.k} className="flex flex-col gap-1 border-t border-sand/25 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <dt className="text-[11px] font-semibold tracked text-sand/60">{r.k}</dt>
                  <dd className={`font-display text-[clamp(1.3rem,4.4vw,2rem)] uppercase leading-none ${r.pending ? "text-[#FFE9A8]" : "text-sand"}`}>{r.v}</dd>
                </div>
              ))}
              <div className="border-t border-sand/25" />
            </dl>
            <p className="mt-6 font-serif text-[1.05rem] italic text-sand/65">{goaOpenerFacts.note}</p>
          </div>
        </section>

        <GoaStrip current="opener" />

        <ApplicationForm index="05" />
        <Footer />
      </main>

      <ContactTeaCup />
    </>
  );
}
