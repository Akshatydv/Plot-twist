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
import type { JourneyConfig } from "@/content/journeys";

/**
 * ONE PAGE, EVERY JOURNEY.
 *
 * This is the whole site. `/` renders it with the default journey and
 * `/journey/[slug]` renders it with whichever journey the slug names — same
 * components, same order, same animations, same everything. There is no
 * per-journey layout, and there must never be one: if a journey needs a
 * different section here, that is a redesign of Plot Twist, not a new
 * destination.
 *
 * Everything destination-shaped reaches the tree through JourneyProvider.
 */
export function JourneyPage({ journey }: { journey: JourneyConfig }) {
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
