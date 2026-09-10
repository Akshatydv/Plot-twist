import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { SetupSection } from "@/components/SetupSection";
import { WhatsATen } from "@/components/WhatsATen";
import { StoryCollage } from "@/components/StoryCollage";
import { BrandStatement } from "@/components/BrandStatement";
import { MysteryPreview } from "@/components/MysteryPreview";
import { TrustStrip } from "@/components/TrustStrip";
import { ApplicationTeaser } from "@/components/ApplicationTeaser";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { JourneyProvider } from "@/components/mystery/JourneyProvider";
import { PlotProvider } from "@/components/mystery/PlotProvider";
import { ClueTracker } from "@/components/mystery/ClueTracker";
import { PlotDebug } from "@/components/mystery/PlotDebug";
import { DestinationGuess } from "@/components/mystery/DestinationGuess";
import { GoaPage } from "@/components/goa/GoaPage";
import { EdcPage } from "@/components/edc/EdcPage";
import type { JourneyConfig } from "@/content/journeys";

/**
 * ONE PAGE PER VARIANT, EVERY JOURNEY.
 *
 * A journey renders one of three compositions, chosen by `pageVariant`:
 *
 *   "mystery" (below) — the original. Destination withheld, five clues hidden
 *                       down the page, a guess box, a reward. Journey 01.
 *   "reveal"          — destination stated, the four days are the story.
 *                       Journey 00 / Goa. See components/goa/GoaPage.tsx.
 *   "edc"             — the festival page. Built around an embedded official
 *                       festival video on a near-black neon canvas.
 *                       Journey 02 / EDC Thailand. See components/edc/EdcPage.tsx.
 *
 * This used to say that a journey needing different sections is a redesign
 * rather than a destination, and that is still true — which is exactly why the
 * split is a named, typed variant rather than a quiet fork inside a component.
 * Everything below is unchanged, and every journey on the mystery path still
 * gets the identical tree it always did.
 *
 * Everything destination-shaped reaches the tree through JourneyProvider,
 * which wraps BOTH variants — the application form, the tea cup and the
 * analytics journey id work the same on either page.
 */
export function JourneyPage({ journey }: { journey: JourneyConfig }) {
  /*
    THE FESTIVAL PAGE — Journey 02. Same wrapper contract as the reveal page
    below: JourneyProvider carries the destination-shaped values into the
    shared casting board and tea cup, and PlotProvider owns the analytics
    journey id, campaign attribution and the page_view signal that
    ApplicationForm reads. Neither is optional, even though nothing on this
    page hunts a clue — dropping PlotProvider would silently break attribution
    on a page taking paid traffic.
  */
  if (journey.pageVariant === "edc") {
    return (
      <JourneyProvider journey={journey}>
        <PlotProvider>
          <EdcPage />
        </PlotProvider>
      </JourneyProvider>
    );
  }

  if (journey.pageVariant === "reveal") {
    return (
      <JourneyProvider journey={journey}>
        {/*
          PlotProvider still wraps the reveal page even though nothing on it
          hunts clues: it owns the journey's analytics id, campaign attribution
          capture and the page_view signal, and ApplicationForm reads its
          `count`/`reward` context. Dropping it would silently break
          attribution on the only page taking cold traffic.
        */}
        <PlotProvider>
          <GoaPage />
        </PlotProvider>
      </JourneyProvider>
    );
  }

  return (
    <JourneyProvider journey={journey}>
      <PlotProvider>
        <main className="relative">
          <Hero />

          <div className="relative -mt-4 overflow-hidden">
            <Ticker
              items={["20 SPOTS. ONE VERY BAD IDEA.", "10/10s ONLY", "DO IT FOR THE PLOT"]}
              bg="#FF4F87"
              fg="#FFF1DC"
              rotate={-1.6}
            />
          </div>

          {/*
            Order carries the story. Setup says what the trip is; the collage
            shows what it feels like; the statement says the people are the
            point — and only then does casting explain how those people get
            picked. Casting used to run second, which asked visitors to judge
            themselves before they'd seen the trip.
          */}
          <SetupSection />
          <StoryCollage />
          <BrandStatement />
          <WhatsATen />
          <MysteryPreview />
          <DestinationGuess />

          <div className="relative -mt-4 overflow-hidden">
            <Ticker
              items={["YES, WE ARE JUDGING", "10/10s ONLY", "20 SEATS", "APPLICATIONS ARE READ BY HUMANS"]}
              bg="#1A0D0A"
              fg="#FFF1DC"
              rotate={1.4}
            />
          </div>

          {/* Who's behind this, right before the form asks for a phone number. */}
          <TrustStrip />
          <ApplicationTeaser />
          <ApplicationForm />
          <Footer />
        </main>

        <ClueTracker />
        <ContactTeaCup />
        {/* Renders nothing outside development — see the component. */}
        <PlotDebug />
      </PlotProvider>
    </JourneyProvider>
  );
}
