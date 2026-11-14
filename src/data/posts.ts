import { cache } from "react";
import type { Post, PostCard, PostCategory } from "@/types/post";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { MOCK_POSTS } from "./mock/posts";

/**
 * Blog articles from WordPress (wp-admin → Blog).
 *
 * Source: /wp/v2/posts — Pods fields title_/excerpt_/content_ (th, en) plus
 * featured_image, category_slug and languages added by the mu-plugin
 * (cms/mu-plugins/nyc-clinic-core/inc/rest.php). Cache tag: "post".
 *
 * Two fetches, on purpose: lists take titles/excerpts only, and an article's
 * body is fetched on its own page. Next.js won't cache a single fetch over
 * 2 MB, which an "everything" list would reach as the blog grows.
 *
 * Without WP_API_URL (local dev) the old mock articles are served instead.
 *
 * LANGUAGE RULE (both ways, decided Nov 2026): an article can exist in Thai,
 * English or both. A page shows the article in its own locale when it exists,
 * otherwise in the language it does have. `lang` tells components which
 * typefaces to use (font follows language, not page locale), and the article
 * page uses it for the "available in … only" note and its canonical URL.
 */

type Lang = "th" | "en";
type Languages = Lang | "both" | "";

/** One article, both languages, as this module stores it. */
type Source = {
  slug: string;
  image: string;
  category: PostCategory;
  date: string;
  languages: Languages;
  title_th: string;
  title_en: string;
  excerpt_th: string;
  excerpt_en: string;
  /** Only present when fetched for the article page. */
  content_th?: string;
  content_en?: string;
};

/** Shown on cards when an article has no featured image yet. */
const FALLBACK_IMAGE = "/images/blog/blog-01.svg";

const CATEGORY_BY_SLUG: Record<string, PostCategory> = {
  guides: "Guides",
  tips: "Tips",
  news: "News",
};

// ── WordPress ──────────────────────────────────────────────────────────────

type WpPost = {
  slug: string;
  date: string;
  featured_image: { url: string } | null;
  category_slug: string;
  languages: Languages;
  title_th: string;
  title_en: string;
  excerpt_th: string;
  excerpt_en: string;
  content_th?: string;
  content_en?: string;
};

const LIST_FIELDS =
  "slug,date,featured_image,category_slug,languages,title_th,title_en,excerpt_th,excerpt_en";
const FULL_FIELDS = `${LIST_FIELDS},content_th,content_en`;
const PER_PAGE = 100;

function fromWp(p: WpPost): Source {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    slug: p.slug,
    image: p.featured_image?.url || FALLBACK_IMAGE,
    category: CATEGORY_BY_SLUG[p.category_slug] ?? "Guides",
    // WP gives site-local time ("2026-10-06T10:00:00"); the date part is all we show.
    date: p.date.slice(0, 10),
    languages: p.languages,
    title_th: text(p.title_th),
    title_en: text(p.title_en),
    excerpt_th: text(p.excerpt_th),
    excerpt_en: text(p.excerpt_en),
    content_th: p.content_th === undefined ? undefined : text(p.content_th),
    content_en: p.content_en === undefined ? undefined : text(p.content_en),
  };
}

/** Every published article (no bodies), newest first. Pages through 100 at a time. */
const listSources = cache(async (): Promise<Source[]> => {
  if (!wpConfigured()) return mockSources();
  const all: WpPost[] = [];
  for (let page = 1; ; page++) {
    const batch = await wpFetch<WpPost[]>(
      `/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&orderby=date&order=desc&_fields=${LIST_FIELDS}`,
      ["post"],
    );
    all.push(...batch);
    if (batch.length < PER_PAGE) break;
  }
  return all.filter((p) => p.languages).map(fromWp);
});

/** One article with its body, or null. */
const fullSource = cache(async (slug: string): Promise<Source | null> => {
  if (!wpConfigured()) return mockSources().find((s) => s.slug === slug) ?? null;
  const found = await wpFetch<WpPost[]>(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=${FULL_FIELDS}`,
    ["post"],
  );
  const post = found[0];
  return post && post.languages ? fromWp(post) : null;
});

// ── Mock fallback (no CMS configured) ──────────────────────────────────────

function mockSources(): Source[] {
  return MOCK_POSTS.map((m) => {
    const th = !!m.title_th && !!m.content_th;
    const en = !!m.title_en && !!m.content_en;
    return {
      slug: m.slug,
      image: m.image,
      category: m.category,
      date: m.date,
      languages: th && en ? "both" : th ? "th" : en ? "en" : "",
      title_th: m.title_th,
      title_en: m.title_en ?? "",
      excerpt_th: m.excerpt_th,
      excerpt_en: m.excerpt_en ?? "",
      content_th: m.content_th,
      content_en: m.content_en ?? "",
    } satisfies Source;
  }).sort((a, b) => b.date.localeCompare(a.date));
}

// ── Resolve to the page's language ────────────────────────────────────────

/** The language this article is shown in on a page of `locale`. */
function langFor(src: Source, locale: string): Lang {
  const want: Lang = locale === "en" ? "en" : "th";
  const has = (l: Lang) => src.languages === "both" || src.languages === l;
  if (has(want)) return want;
  return want === "en" ? "th" : "en";
}

function toCard(src: Source, locale: string): PostCard {
  const lang = langFor(src, locale);
  return {
    slug: src.slug,
    image: src.image,
    category: src.category,
    date: src.date,
    lang,
    title: lang === "en" ? src.title_en : src.title_th,
    excerpt: lang === "en" ? src.excerpt_en : src.excerpt_th,
  };
}

function toPost(src: Source, locale: string): Post {
  const card = toCard(src, locale);
  const content = (card.lang === "en" ? src.content_en : src.content_th) ?? "";
  return { ...card, content, readingMinutes: readingMinutes(content, card.lang) };
}

/** Thai has no word spaces, so count characters; English counts words. */
function readingMinutes(html: string, lang: Lang): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const minutes =
    lang === "th"
      ? text.replace(/\s/g, "").length / 900
      : text.split(/\s+/).filter(Boolean).length / 220;
  return Math.max(1, Math.round(minutes));
}

// ── Public API (unchanged signatures) ─────────────────────────────────────

/** All posts, newest first — /blog. */
export async function getPosts(locale: string): Promise<PostCard[]> {
  return (await listSources()).map((s) => toCard(s, locale));
}

/** Newest N — homepage Blog Preview. Same source as /blog. */
export async function getLatestPosts(
  locale: string,
  limit?: number,
): Promise<PostCard[]> {
  const posts = await getPosts(locale);
  return limit ? posts.slice(0, limit) : posts;
}

export async function getPostBySlug(
  locale: string,
  slug: string,
): Promise<Post | null> {
  const src = await fullSource(slug);
  return src ? toPost(src, locale) : null;
}

/** Same category first, then newest. Never includes the current post. */
export async function getRelatedPosts(
  locale: string,
  slug: string,
  limit = 2,
): Promise<PostCard[]> {
  const all = await listSources();
  const current = all.find((s) => s.slug === slug);
  const others = all.filter((s) => s.slug !== slug);
  const ranked = [
    ...others.filter((s) => s.category === current?.category),
    ...others.filter((s) => s.category !== current?.category),
  ];
  return ranked.slice(0, limit).map((s) => toCard(s, locale));
}

/** Slugs to pre-render at build. Articles published later render on first visit. */
export async function getPostSlugs(): Promise<string[]> {
  return (await listSources()).map((s) => s.slug);
}
