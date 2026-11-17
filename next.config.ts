import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/data/redirects";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return LEGACY_REDIRECTS;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "/**",
      },
      // WordPress Media (articles, and later doctors, services, cases).
      {
        protocol: "https",
        hostname: "cms.nyc-clinic.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Resized + WebP per screen size by `next start` (sharp), cached in
    // .next/cache/images. WP uploads get a new URL when replaced, so a long
    // cache is safe.
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
