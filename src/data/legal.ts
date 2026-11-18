import { cache } from "react";
import { privacyPolicyHtml } from "./privacy-policy";
import { termsHtml } from "./terms";
import { getSiteSettings } from "./site-settings";
import { wpConfigured, wpFetch } from "@/lib/wp";
import type { SiteSettings } from "@/lib/site";

/**
 * Legal pages — /privacy-policy and /terms.
 *
 * WordPress: Pages with slug privacy-policy / terms (tag "page"): Title,
 * Content TH / EN (WYSIWYG), Last updated, Not reviewed yet.
 * Built-in fallback: the DRAFTS in ./privacy-policy.ts and ./terms.ts (Oct
 * 2026) — used without WP_API_URL, and if the WP page is missing or empty, so
 * the URL never 404s.
 *
 * Contact codes in the text — {clinic} {address} {phone} {line} — are filled
 * from Site Settings, so the legal text can't drift from the rest of the site.
 *
 * `draft` (WP: "Not reviewed yet", on by default) keeps the page noindex and
 * out of the sitemap until the clinic and its lawyer sign off.
 */

export type LegalSlug = "privacy-policy" | "terms";

export type LegalPage = {
  slug: LegalSlug;
  title: string;
  /** YYYY-MM-DD — "last updated" line. */
  updated: string;
  html: string;
  /** Language of `html` — Thai on /en when there's no English text. */
  lang: "th" | "en";
  draft: boolean;
};

const TITLES: Record<LegalSlug, { th: string; en: string }> = {
  "privacy-policy": { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
  terms: { th: "ข้อกำหนดการใช้งานเว็บไซต์", en: "Terms of Use" },
};

/** Site Settings values for the contact codes, HTML-escaped. */
function contactCodes(site: SiteSettings, isTH: boolean): Record<string, string> {
  const esc = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return {
    clinic: esc(site.clinic.name),
    address: esc(isTH ? site.clinic.address.th : site.clinic.address.en),
    phone: esc(site.phone),
    line: esc(site.lineId),
  };
}

const fillCodes = (html: string, codes: Record<string, string>) =>
  html.replace(/\{(clinic|address|phone|line)\}/g, (_, k: string) => codes[k]);

/** The built-in drafts with codes instead of values — what the import loads. */
export function builtInLegalSource(slug: LegalSlug, locale: string): string {
  const codes = {
    phone: "{phone}",
    lineId: "{line}",
    clinic: { name: "{clinic}", address: { th: "{address}", en: "{address}" } },
  } as unknown as SiteSettings;
  return slug === "privacy-policy"
    ? privacyPolicyHtml(locale, codes)
    : termsHtml(locale, `/${locale}/privacy-policy`, codes);
}

export const BUILT_IN_LEGAL = { titles: TITLES, updated: "2026-10-16" };

type WpPage = {
  slug: string;
  title_th: string;
  title_en: string;
  content_th: string;
  content_en: string;
  updated: string | null;
  not_reviewed: boolean;
};

const getWpPages = cache(async () => {
  const pages = await wpFetch<WpPage[]>(
    "/wp/v2/pages?slug=privacy-policy,terms&_fields=slug,title_th,title_en,content_th,content_en,updated,not_reviewed",
    ["page"],
  );
  return new Map(pages.map((p) => [p.slug, p]));
});

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const hasText = (html: string) => html.replace(/<[^>]*>/g, "").trim() !== "";

export async function getLegalPage(
  locale: string,
  slug: LegalSlug,
): Promise<LegalPage> {
  const isTH = locale === "th";
  const site = await getSiteSettings();
  const codes = contactCodes(site, isTH);

  const wp = wpConfigured() ? (await getWpPages()).get(slug) : undefined;
  if (wp) {
    const th = text(wp.content_th);
    const en = text(wp.content_en);
    const useEn = isTH ? !hasText(th) && hasText(en) : hasText(en);
    const html = useEn ? en : th;
    if (hasText(html)) {
      const title = isTH
        ? text(wp.title_th) || text(wp.title_en)
        : text(wp.title_en) || text(wp.title_th);
      return {
        slug,
        title: title || (isTH ? TITLES[slug].th : TITLES[slug].en),
        updated: text(wp.updated) || BUILT_IN_LEGAL.updated,
        html: fillCodes(html, codes),
        lang: useEn ? "en" : "th",
        // Only an explicit "false" counts as reviewed.
        draft: wp.not_reviewed !== false,
      };
    }
  }

  // Built-in draft.
  return {
    slug,
    title: isTH ? TITLES[slug].th : TITLES[slug].en,
    updated: BUILT_IN_LEGAL.updated,
    html: fillCodes(builtInLegalSource(slug, locale), codes),
    lang: isTH ? "th" : "en",
    draft: true,
  };
}
