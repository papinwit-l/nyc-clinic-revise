import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { wpConfigured } from "./wp";
import { SITE_URL } from "./site";
import { getSitePayload } from "@/data/site-settings";

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

/** Built-in share image (public/og.jpg) — used when Site Settings has none. */
const BUILT_IN_SHARE_IMAGE = { url: "/og.jpg", width: 1200, height: 630 };

/** Page Manage → Site Settings → Default share image, or the built-in one. */
export async function getDefaultShareImage(): Promise<{
  url: string;
  width?: number;
  height?: number;
}> {
  if (!wpConfigured()) return BUILT_IN_SHARE_IMAGE;
  const settings = (await getSitePayload()).settings as Record<string, unknown> | undefined;
  const img = settings?.share_image as
    | { url?: string; width?: number; height?: number }
    | null
    | undefined;
  return img?.url ? { url: img.url, width: img.width, height: img.height } : BUILT_IN_SHARE_IMAGE;
}

const SITE_NAME = "NYC Clinic";

/**
 * Everything a page's <head> needs, built one way for every page:
 * title (the layout template adds " | NYC Clinic"), description, canonical +
 * hreflang, and Open Graph / Twitter cards for LINE and Facebook previews.
 *
 * `image` — the page's own share picture (service image, article cover);
 * without one, the default share image.
 */
export async function pageMeta(
  locale: string,
  path: string,
  opts: {
    title?: string;
    /** Share-card title when `title` is empty (home: the layout default). */
    shareTitle?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
    publishedTime?: string;
    /** Override (blog articles in one language). */
    alternates?: Metadata["alternates"];
  },
): Promise<Metadata> {
  const alternates = opts.alternates ?? alternatesFor(locale, path);
  const shareTitle = opts.title ? `${opts.title} | ${SITE_NAME}` : opts.shareTitle;
  const images = opts.image ? [{ url: opts.image }] : [await getDefaultShareImage()];
  return {
    ...(opts.title ? { title: opts.title } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    alternates,
    openGraph: {
      type: opts.type ?? "website",
      siteName: SITE_NAME,
      locale: locale === "th" ? "th_TH" : "en_US",
      url: typeof alternates?.canonical === "string" ? alternates.canonical : undefined,
      ...(shareTitle ? { title: shareTitle } : {}),
      ...(opts.description ? { description: opts.description } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      ...(shareTitle ? { title: shareTitle } : {}),
      ...(opts.description ? { description: opts.description } : {}),
      images: images.map((i) => i.url),
    },
  };
}
