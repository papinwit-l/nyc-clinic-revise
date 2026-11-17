import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { getServiceSlugs } from "@/data/services";
import { getPosts } from "@/data/posts";
import { getCaseGroups } from "@/data/cases";
import { getLegalPage } from "@/data/legal";

/**
 * sitemap.xml — every indexable page in both languages, each entry linking
 * its other-language version. Built from WordPress, so it follows content
 * changes (cache tags of the fetchers it calls).
 *
 * Left out: draft legal pages (noindex), the 404 catch-all, and Before &
 * After treatments with no cases yet.
 */

type Entry = MetadataRoute.Sitemap[number];

const url = (locale: string, path: string) => `${SITE_URL}/${locale}${path}`;

/** One entry per language, each with hreflang alternates. */
function both(path: string, priority: number): Entry[] {
  const languages = Object.fromEntries(locales.map((l) => [l, url(l, path)]));
  return locales.map((l) => ({
    url: url(l, path),
    alternates: { languages },
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, postsTh, postsEn, caseGroups, privacy, terms] =
    await Promise.all([
      getServiceSlugs(),
      getPosts("th"),
      getPosts("en"),
      getCaseGroups("th"),
      getLegalPage("th", "privacy-policy"),
      getLegalPage("th", "terms"),
    ]);

  const pages: Entry[] = [
    ...both("", 1),
    ...both("/services", 0.9),
    ...serviceSlugs.flatMap((s) => both(`/services/${s}`, 0.9)),
    ...both("/before-after", 0.8),
    ...caseGroups
      .filter((g) => g.total > 0)
      .flatMap((g) => both(`/before-after/${g.slug}`, 0.7)),
    ...both("/doctors", 0.8),
    ...both("/about", 0.6),
    ...both("/contact", 0.7),
    ...both("/promotions", 0.6),
    ...both("/faq", 0.6),
    ...both("/blog", 0.6),
  ];

  // Blog: an article in one language is one document (its canonical is that
  // language), so it gets one entry; a bilingual article gets both.
  const langsBySlug = new Map<string, Set<string>>();
  for (const p of [...postsTh, ...postsEn]) {
    const set = langsBySlug.get(p.slug) ?? new Set<string>();
    set.add(p.lang);
    langsBySlug.set(p.slug, set);
  }
  for (const [slug, langs] of langsBySlug) {
    if (langs.size > 1) pages.push(...both(`/blog/${slug}`, 0.5));
    else pages.push({ url: url([...langs][0], `/blog/${slug}`), priority: 0.5 });
  }

  for (const legal of [privacy, terms]) {
    if (!legal.draft) pages.push(...both(`/${legal.slug}`, 0.2));
  }
  return pages;
}
