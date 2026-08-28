import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plottwist.social";

/**
 * The landing page is meant to be found. The casting panel and the submission
 * endpoint are not — neither holds anything a crawler should index, and
 * /admin holds applicant data behind auth.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
