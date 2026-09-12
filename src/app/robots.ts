import type { MetadataRoute } from "next";

/* Same fallback as app/layout.tsx. These two files defaulted to
   plottwist.social while the layout defaulted to plotwist.in — harmless today
   because NEXT_PUBLIC_SITE_URL is set in production, and a sitemap advertising
   a different hostname than the canonical tags the moment it is not. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotwist.in";

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
