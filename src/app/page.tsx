import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { SetupSection } from "@/components/SetupSection";
import { WhatsATen } from "@/components/WhatsATen";
import { StoryCollage } from "@/components/StoryCollage";
import { BrandStatement } from "@/components/BrandStatement";
import { MysteryPreview } from "@/components/MysteryPreview";
import { ApplicationTeaser } from "@/components/ApplicationTeaser";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { PlotProvider } from "@/components/mystery/PlotProvider";
import { ClueTracker } from "@/components/mystery/ClueTracker";
import { PlotDebug } from "@/components/mystery/PlotDebug";
import { DestinationGuess } from "@/components/mystery/DestinationGuess";

export default function Page() {
  return (
    <PlotProvider>
      <main className="relative">
        <Hero />

        <div className="relative -mt-4 overflow-hidden">
          <Ticker
            items={[
              "20 PEOPLE ARE GOING SOMEWHERE",
              "10/10s ONLY",
              "DO IT FOR THE PLOT",
              "20 SPOTS. NO FILLERS.",
            ]}
            bg="#FF4F87"
            fg="#FFF1DC"
            rotate={-1.6}
          />
        </div>

        <SetupSection />
        <WhatsATen />
        <StoryCollage />
        <BrandStatement />
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

        <ApplicationTeaser />
        <ApplicationForm />
        <Footer />
      </main>

      <ClueTracker />
      <ContactTeaCup />
      {/* Renders nothing outside development — see the component. */}
      <PlotDebug />
    </PlotProvider>
  );
}
