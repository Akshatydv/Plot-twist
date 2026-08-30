import type { MetadataRoute } from "next";
import { DEFAULT_JOURNEY, JOURNEYS } from "@/content/journeys";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plottwist.social";

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
