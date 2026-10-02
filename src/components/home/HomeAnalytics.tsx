"use client";

import { useEffect } from "react";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * WHAT A JOURNEY PAGE'S PlotProvider DOES ON LANDING, MINUS THE JOURNEY.
 *
 * "/" is the front door now, so it is where Instagram traffic arrives first.
 * Without this, a visitor who lands here from a campaign link and applies on a
 * journey page later would arrive there with no recorded source, and the Meta
 * pixel would never see the visit at all.
 *
 * It deliberately does NOT set an analytics journey id: the homepage belongs
 * to no single journey, and tagging it as one would credit every visit to it.
 * Renders nothing.
 */
export function HomeAnalytics() {
  useEffect(() => {
    captureAttribution();
    track(PLOT_EVENTS.pageView);
  }, []);
  return null;
}
