import { privacyPolicyHtml } from "./privacy-policy";
import { termsHtml } from "./terms";
import { getSiteSettings } from "./site-settings";

/**
 * Legal pages — /privacy-policy and /terms. WP static pages when the CMS is
 * connected (project reference §6); `html` is then content.rendered.
 *
 * Text: DRAFTS in ./privacy-policy.ts and ./terms.ts (Oct 2026), with
 * [bracketed] facts still to be supplied by the clinic. Neither has been
 * reviewed by a lawyer.
 *
 * `draft: true` keeps both pages out of search results (noindex) until the
 * clinic has filled the brackets and signed off the text.
 *
 * TODO: replace with WP fetch — /wp/v2/pages?slug=privacy-policy
 */

export type LegalSlug = "privacy-policy" | "terms";

export type LegalPage = {
  slug: LegalSlug;
  title: string;
  /** YYYY-MM-DD — "last updated" line. */
  updated: string;
  html: string;
  draft: boolean;
};

const TITLES: Record<LegalSlug, { th: string; en: string }> = {
  "privacy-policy": { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
  terms: { th: "ข้อกำหนดการใช้งานเว็บไซต์", en: "Terms of Use" },
};

export async function getLegalPage(
  locale: string,
  slug: LegalSlug,
): Promise<LegalPage> {
  const th = locale === "th";
  const site = await getSiteSettings();
  return {
    slug,
    title: th ? TITLES[slug].th : TITLES[slug].en,
    updated: "2026-10-16",
    html:
      slug === "privacy-policy"
        ? privacyPolicyHtml(locale, site)
        : termsHtml(locale, `/${locale}/privacy-policy`, site),
    draft: true,
  };
}
