import type { MetadataRoute } from "next";
import { DEFAULT_JOURNEY, JOURNEYS } from "@/content/journeys";

/* Same fallback as app/layout.tsx. These two files defaulted to
   plottwist.social while the layout defaulted to plotwist.in — harmless today
   because NEXT_PUBLIC_SITE_URL is set in production, and a sitemap advertising
   a different hostname than the canonical tags the moment it is not. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotwist.in";

/**
 * One entry per journey. The default journey is listed at the root, which is
 * the URL it canonicalises to; the rest are listed at /journey/<slug>.
 *
 * Campaign URLs are these same pages with UTM parameters, so they're
 * deliberately not listed — they'd be duplicate entries pointing at the same
 * canonical.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return JOURNEYS.map((j) => ({
    url: j.id === DEFAULT_JOURNEY.id ? SITE_URL : `${SITE_URL}/journey/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: j.id === DEFAULT_JOURNEY.id ? 1 : 0.9,
  }));
}
