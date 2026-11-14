import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin the workspace root; a stray lockfile in the home directory otherwise wins
  turbopack: { root: import.meta.dirname },
  images: {
    // Photography is self-hosted in /public/photos. Routing a full-bleed hero
    // through the optimizer to a third-party CDN timed out on the large
    // variants (1920/3840) and dropped the image entirely.
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves qualities on this list. 75 is the default the whole
    // site uses; 90 is for the full-bleed panels on the brand homepage, where a
    // soft sky or a banded gradient is the first thing anyone notices.
    qualities: [75, 90],
  },

  /**
   * THE OLD JOURNEY URLS.
   *
   * Journeys were /journey/00 (Goa), /journey/03 (Bir × Barot), /journey/02
   * (Thailand) and /journey/01 (Bali); they are now /journey/1, /2 and /3.
   * Every ad, QR code, DM, saved tab and search result that carries an old URL
   * has to keep landing somewhere useful, and /journey/02 in particular is the
   * only page on the site that search engines have ranked — a permanent
   * redirect is what carries that ranking to /journey/3.
   *
   * Query strings (UTM tags on ads) pass through untouched.
   *
   * Bali's redirect is temporary on purpose: the journey is paused, not gone.
   * If it comes back, delete this line and the `retired` flag and nothing has
   * been cached against it.
   */
  async redirects() {
    return [
      // Journeys are named, never numbered. Every numbered URL the site has ever
      // had lands on the named one in a single hop.
      { source: "/journey/00", destination: "/journey/goa-new-years", permanent: true },
      { source: "/journey/1", destination: "/journey/goa-new-years", permanent: true },
      { source: "/journey/03", destination: "/journey/bir-barot", permanent: true },
      { source: "/journey/2", destination: "/journey/bir-barot", permanent: true },
      { source: "/journey/02", destination: "/journey/thailand-edc", permanent: true },
      { source: "/journey/3", destination: "/journey/thailand-edc", permanent: true },
      { source: "/journey/4", destination: "/journey/sri-lanka", permanent: true },
      { source: "/journey/01", destination: "/", permanent: false },
      // Thailand x EDC and Bir x Barot are off the site (their code is kept). Temporary redirects, so bringing them back is deleting these lines.
      { source: "/going-to-edc-thailand-alone", destination: "/", permanent: false },
      { source: "/festival-trips-for-solo-travellers", destination: "/", permanent: false },
      { source: "/thailand", destination: "/", permanent: false },
      { source: "/journey/thailand-edc", destination: "/", permanent: false },
      { source: "/journey/bir-barot", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
