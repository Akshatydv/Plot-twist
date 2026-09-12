import type { MetadataRoute } from "next";
import { DEFAULT_JOURNEY, JOURNEYS } from "@/content/journeys";
import { edcAloneGuide } from "@/content/guides/edcThailandAlone";
import { soloFestivalGuide } from "@/content/guides/soloFestivalTrips";

/* Same fallback as app/layout.tsx. These two files defaulted to
   plottwist.social while the layout defaulted to plotwist.in — harmless today
   because NEXT_PUBLIC_SITE_URL is set in production, and a sitemap advertising
   a different hostname than the canonical tags the moment it is not. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotwist.in";

const GUIDES = [edcAloneGuide, soloFestivalGuide];

/**
 * One entry per journey, plus the guides.
 *
 * The default journey is listed at the root, which is the URL it canonicalises
 * to; the rest are listed at /journey/<slug>.
 *
 * Campaign URLs are these same pages with UTM parameters, so they're
 * deliberately not listed — they'd be duplicate entries pointing at the same
 * canonical.
 *
 * ─── ON lastModified ────────────────────────────────────────────────────────
 * The journeys use `new Date()` because they are rebuilt on every deploy and
 * there is no better signal available. The guides use their own `modified`
 * date, which is a real one. Stamping a hand-written article with "now" on
 * every unrelated deploy trains a crawler to ignore the field, and it is the
 * one field here that is supposed to mean something.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const journeys = JOURNEYS.map((j) => ({
    url: j.id === DEFAULT_JOURNEY.id ? SITE_URL : `${SITE_URL}/journey/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: j.id === DEFAULT_JOURNEY.id ? 1 : 0.9,
  }));

  const guides = GUIDES.map((g) => ({
    url: `${SITE_URL}/${g.slug}`,
    lastModified: new Date(g.modified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...journeys, ...guides];
}
