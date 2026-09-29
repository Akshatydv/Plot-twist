import { ApplicationForm } from "@/components/ApplicationForm";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { Footer } from "@/components/Footer";
import { WhatsATen } from "@/components/WhatsATen";
import { birIndex, cast } from "@/content/bir";
import { FlightHero } from "./FlightHero";
import { TheJourney } from "./TheJourney";
import { DayOne } from "./DayOne";
import { DawnRoad } from "./DawnRoad";
import { DayTwo } from "./DayTwo";
import { DayThree } from "./DayThree";
import { DayFour } from "./DayFour";
import { FinalCta, PhotoCredits, Recap, TheDetails } from "./TheClose";
import { Hud, JoinCta } from "./Chrome";
import { Calm } from "./Scenery";

/**
 * THE MOUNTAIN PAGE — Journey 03, Bir × Barot.
 *
 * Goa is a film. Bali is a mystery. Thailand is a gate. This one is a
 * descent: one continuous camera move from the sky above the Dhauladhar,
 * down into Barot, back up over Bir, into the forest, up to a view, and
 * away down the road. The full architecture — every world, every scroll
 * transition, where footage goes — is in docs/bir-barot-design.md.
 *
 * ─── THE RHYTHM ─────────────────────────────────────────────────────────────
 *
 *   sky (hero) → pine → pine/fire → dawn → SKY → dusk → night
 *   → cloud/forest → earth → fire → paper → pine (cast) → montage
 *   → bone (details) → night (close) → paper (form)
 *
 * The brightest chapter (Day 02) sits dead centre, between the two darkest
 * moments (the bonfire, the forest). Day 04 is the only paper-light chapter
 * because it is where the page exhales. Information arrives last, and plain.
 *
 * ─── WHAT IS SHARED, AND STAYS SHARED ───────────────────────────────────────
 * The casting board, the application form, the footer and the tea cup are
 * the same components every journey runs. The board and footer are lit in an
 * `alpine` tone — the same mechanism the EDC page used for `night` — and
 * nothing about their structure changes.
 */
export function BirPage() {
  return (
    <Calm>
      <main className="bir relative overflow-x-clip">
        <FlightHero />
        <TheJourney />
        <DayOne />
        <DawnRoad />
        <DayTwo />
        <DayThree />
        <DayFour />

        <WhatsATen compact composition={cast.composition} index={birIndex("cast")} bridge={cast.bridge} tone="alpine" />

        <Recap />
        <TheDetails />
        <FinalCta />
        <ApplicationForm index={birIndex("application")} />
        <PhotoCredits />
        <Footer tone="alpine" />
      </main>

      <Hud />
      <JoinCta />
      <ContactTeaCup />
    </Calm>
  );
}
