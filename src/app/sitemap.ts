import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plottwist.social";

/**
 * One public page. Campaign URLs are the same page with UTM parameters, so
 * they deliberately aren't listed — they'd be duplicate entries pointing at
 * the same canonical.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
