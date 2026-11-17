import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL } from "./site";

/**
 * Search-engine switch. Until launch the whole site carries noindex, so the
 * new domain doesn't compete with nycclinic.net or get indexed with draft
 * copy. At launch set SITE_INDEXABLE=true in the server env and rebuild.
 *
 * robots.txt stays open either way: Google has to be able to crawl a page to
 * see its noindex.
 */
export const INDEXABLE = process.env.SITE_INDEXABLE === "true";

/**
 * Canonical + hreflang for a page that exists in both languages.
 * `path` is the part after the locale: "" for home, "/about", "/services/x".
 */
export function alternatesFor(
  locale: string,
  path: string,
  only?: readonly string[],
): NonNullable<Metadata["alternates"]> {
  const langs = only ?? locales;
  const url = (l: string) => `${SITE_URL}/${l}${path}`;
  return {
    canonical: url(langs.includes(locale) ? locale : langs[0]),
    languages:
      langs.length > 1
        ? {
            ...Object.fromEntries(langs.map((l) => [l, url(l)])),
            "x-default": url("th"),
          }
        : undefined,
  };
}
