import { ApplicationForm } from "@/components/ApplicationForm";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { Footer } from "@/components/Footer";
import { WhatsATen } from "@/components/WhatsATen";
import { cast, slIndex } from "@/content/srilanka";
import { Calm } from "../bir/Scenery";
import { ChapterNav, StickyCta } from "./Chrome";
import { IslandHero } from "./IslandHero";
import { Entry, FilmIndex } from "./Entry";
import { WorldEscape } from "./WorldEscape";
import { WorldWild } from "./WorldWild";
import { WorldCountdown } from "./WorldCountdown";
import { WorldMorning } from "./WorldMorning";
import { WorldSaltSun } from "./WorldSaltSun";
import { WorldLastNight } from "./WorldLastNight";
import { Secret, WorldEnd } from "./WorldEnd";
import { FinalCta, ForWho, Included, PhotoCredits, TheDetails } from "./TheClose";

/**
 * THE ISLAND PAGE — Journey 4, Sri Lanka over New Year's Eve.
 *
 * Goa is a film. Bir is a descent. This one is a TRAILER: you are not shown
 * a destination, you're walked through seven days of a story, one world per
 * day, with the New Year as the climax. Full architecture, the world-by-world
 * palette and every transition: docs/sri-lanka-design.md.
 *
 * ─── THE RHYTHM ─────────────────────────────────────────────────────────────
 *
 *   video (hero) → black → THROUGH THE LETTERS → jungle (index)
 *   → saffron (escape) → green (the wild) → black/hibiscus (countdown, the peak)
 *   → PAPER (morning after — the one light chapter) → turquoise (salt & sun)
 *   → violet (last night) → black (credits) → black (post-credits)
 *   → paper (included) → black (who) → magenta (cast) → bone (details)
 *   → video (final) → paper (form)
 *
 * The darkest, loudest moment (midnight) is followed directly by the
 * quietest, brightest one (January 1). That cut IS the emotional argument.
 *
 * ─── WHAT IS SHARED, AND STAYS SHARED ───────────────────────────────────────
 * The casting board, the application form, the footer and the tea cup are
 * the same components every journey runs — the board and footer in their
 * `night` tone, the same mechanism EDC and Bir use. The application IS the
 * waitlist: one form, one table, one admin.
 */
export function SriLankaPage() {
  return (
    <Calm>
      <main className="sl relative overflow-x-clip">
        <IslandHero />
        <Entry />
        <FilmIndex />

        <WorldEscape />
        <WorldWild />
        <WorldCountdown />
        <WorldMorning />
        <WorldSaltSun />
        <WorldLastNight />
        <WorldEnd />
        <Secret />

        <Included />
        <ForWho />
        <WhatsATen compact composition={cast.composition} index={slIndex("cast")} bridge={cast.bridge} tone="night" />
        <TheDetails />
        <FinalCta />
        <ApplicationForm index={slIndex("application")} />
        <PhotoCredits />
        <Footer tone="night" />

        {/* Fixed chrome lives INSIDE .sl so it inherits the page's colour tokens. */}
        <ChapterNav />
        <StickyCta />
      </main>

      <ContactTeaCup />
    </Calm>
  );
}
