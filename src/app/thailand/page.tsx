import type { Metadata } from "next";
import { JOURNEY_3 } from "@/content/journeys/journey3";
import { JourneyProvider } from "@/components/mystery/JourneyProvider";
import { ChaosPage } from "@/components/thailand/ChaosPage";

/**
 * THE REBUILD, PREVIEWABLE — /thailand.
 *
 * The live Journey 3 keeps working at /journey/3 for the whole of this build;
 * this route exists so the two can be opened side by side before anything is
 * swapped. When the rebuild wins, `pageVariant: "edc"` points at `ChaosPage`
 * and this route goes away.
 *
 * ─── WHY THE PROVIDER IS HERE ───────────────────────────────────────────────
 * The casting board is the SHARED component — the same one Goa, Bali and the
 * live EDC page run — and it reads the destination's stamp and photo scraps
 * through `useJourney()`. On /journey/3 that context comes from JourneyPage;
 * a standalone route has to supply it, or the board throws at prerender. It is
 * the same `journey3` config either way, so the board behaves identically on
 * both URLs rather than quietly differing.
 *
 * `noindex` until the swap: two URLs describing one trip splits a search
 * result in half, and this page's SEO already lives on /journey/3.
 */
export const metadata: Metadata = {
  title: "Thailand: The Chaos — preview | Plot Twist",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <JourneyProvider journey={JOURNEY_3}>
      <ChaosPage />
    </JourneyProvider>
  );
}
