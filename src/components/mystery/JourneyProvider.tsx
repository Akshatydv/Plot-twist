"use client";

import { createContext, useContext } from "react";
import type { JourneyConfig } from "@/content/journeys";

/**
 * WHICH JOURNEY AM I?
 *
 * Every component below this reads its destination-specific content from
 * here instead of importing it. That single indirection is what makes one
 * set of components serve every journey: there is no `if (journey === …)`
 * anywhere in the tree, and adding Journey 02 touches no component at all.
 *
 * Deliberately separate from PlotProvider. The journey is static
 * configuration decided by the route; the plot is mutable state discovered by
 * the visitor. Keeping them apart means a re-render of the hunt never
 * pretends the destination changed.
 */

const JourneyContext = createContext<JourneyConfig | null>(null);

export function useJourney() {
  const journey = useContext(JourneyContext);
  if (!journey) throw new Error("useJourney must be used inside <JourneyProvider>");
  return journey;
}

export function JourneyProvider({
  journey,
  children,
}: {
  journey: JourneyConfig;
  children: React.ReactNode;
}) {
  // No memo: `journey` is a module-level constant chosen by the route, so its
  // identity is already stable for the life of the page.
  return <JourneyContext.Provider value={journey}>{children}</JourneyContext.Provider>;
}
