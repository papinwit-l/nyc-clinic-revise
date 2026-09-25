import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, isValidLocale } from "@/i18n/config";

/**
 * Locale prefixing. Sends a bare path to the locale the visitor's browser asks
 * for, falling back to Thai.
 *
 * ── COST NOTES (Vercel bills per invocation) ──────────────────────────────
 *
 * The matcher below is doing the real work. A broad matcher with an early
 * `return NextResponse.next()` inside the function does NOT save anything —
 * the function has already been invoked and billed. Anything that should be
 * free has to be excluded in the matcher, so it never runs at all.
 *
 * Excluded there: _next, api, static folders, favicon, and — importantly —
 * any path containing a dot. That covers robots.txt, sitemap.xml,
 * site.webmanifest and every crawler request for an asset path, all of which
 * previously invoked this function just to return early.
 *
 * What still costs an invocation: a real page request with no locale prefix,
 * e.g. /about. That costs one invocation plus a redirect, so two round trips
 * before anything renders.
 *
 * NOT handled here on purpose: the legacy redirects from the old site. Those
 * live in next.config.ts, and Next's routing order is
 *   headers → redirects → proxy
 * so they resolve at the routing layer without invoking this at all. Keep new
 * redirects there rather than adding them here.
 *
 * If invocation volume becomes a problem, the lever is dropping
 * Accept-Language detection: a fixed /<path> → /th/<path> redirect can live in
 * next.config.ts and costs nothing. That trades a correct first guess for
 * English-speaking visitors against the invocation. Worth measuring before
 * deciding — the site's audience is predominantly Thai.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed — nothing to do.
  const firstSegment = pathname.split("/")[1];
  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Accept-Language: take the first supported language the browser lists.
  // Region subtags are ignored ("th-TH" → "th").
  const detected = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => locales.includes(code as (typeof locales)[number]));

  const url = request.nextUrl.clone();
  url.pathname = `/${detected ?? defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Everything EXCEPT:
     *   _next        build output
     *   api          route handlers
     *   images       public assets
     *   anything with a dot — robots.txt, sitemap.xml, favicon.ico,
     *                         site.webmanifest, and every asset path a
     *                         crawler tries
     *
     * The dot exclusion is the one that matters for cost: those requests used
     * to invoke the function and return early.
     */
    "/((?!_next|api|images|.*\\.).*)",
  ],
};
