/**
 * GOA · SEASON OPENER.
 *
 * Goa's second departure: 18–21 December 2026. It is
 * its own journey — its own id, so its applications and analytics never mix
 * with the New Year's trip — but it borrows Goa's parked mystery fields from
 * JOURNEY_1 (the clue ladder, hero photo and cast stamp are unused by the page
 * variant it renders) so only what is genuinely different is written here.
 *
 * The id is a name, not a number: journeys are named, never numbered.
 */

import { JOURNEY_1 } from "./journey1";
import type { JourneyConfig } from "./types";

export const JOURNEY_GOA_OPENER: JourneyConfig = {
  ...JOURNEY_1,
  id: "GOA-SEASON-OPENER",
  slug: "goa-season-opener",
  displayName: "Goa · Season Opener",
  nav: { label: "GOA · SEASON OPENER", kicker: "18–21 DEC" },
  campaignId: "goa_opener_launch",
  seo: {
    title: "Goa Group Trip, 18–21 Dec: the Season Opener | Plot Twist",
    description:
      "Four days in Goa, 18–21 Dec 2026: Bollywood night, an all-white yacht sunset, South Goa by road and a slow last morning, with a small group of people your age. Apply, and a real person reads every word of it.",
    startDate: "2026-12-18",
    endDate: "2026-12-21",
    destination: "Goa, India",
  },
  pageVariant: "goaopener",
  storageKey: "plottwist.plot.goaopener.v1",
};
