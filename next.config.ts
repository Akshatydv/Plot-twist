import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin the workspace root; a stray lockfile in the home directory otherwise wins
  turbopack: { root: import.meta.dirname },
  images: {
    // Photography is self-hosted in /public/photos. Routing a full-bleed hero
    // through the optimizer to a third-party CDN timed out on the large
    // variants (1920/3840) and dropped the image entirely.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
