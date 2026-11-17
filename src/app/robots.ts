import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Open to crawlers before AND after launch — pre-launch the pages themselves
 * say noindex (src/lib/seo.ts), which Google only sees if it may crawl them.
 * /_next/ must stay crawlable: Google needs the CSS/JS to render pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
