import type { Post, PostCard } from "@/types/post";
import { MOCK_POSTS, type RawPost } from "./mock/posts";

// TODO: replace MOCK_POSTS with a WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/posts?per_page=100&_embed`);
// Everything below resolve() stays the same.

/**
 * Locale fallback, decided Oct 2026: marketing writes in Thai only. A post
 * with no English fields is served in Thai on /en too, rather than hidden —
 * `lang` tells the components which typefaces to use, and the article page
 * points its canonical at /th so the two URLs don't compete.
 */
function resolve(raw: RawPost, locale: string): Post {
  const useEN = locale === "en" && !!raw.title_en && !!raw.content_en;
  const content = useEN ? raw.content_en! : raw.content_th;

  return {
    slug: raw.slug,
    image: raw.image,
    category: raw.category,
    date: raw.date,
    lang: useEN ? "en" : "th",
    title: useEN ? raw.title_en! : raw.title_th,
    excerpt: useEN ? (raw.excerpt_en ?? "") : raw.excerpt_th,
    content,
    readingMinutes: readingMinutes(content, useEN ? "en" : "th"),
  };
}

/** Thai has no word spaces, so count characters; English counts words. */
function readingMinutes(html: string, lang: "th" | "en"): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const minutes =
    lang === "th"
      ? text.replace(/\s/g, "").length / 900
      : text.split(/\s+/).filter(Boolean).length / 220;
  return Math.max(1, Math.round(minutes));
}

function toCard(post: Post): PostCard {
  const { slug, image, title, excerpt, category, date, lang } = post;
  return { slug, image, title, excerpt, category, date, lang };
}

function sorted(): RawPost[] {
  return [...MOCK_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

/** All posts, newest first — /blog. */
export async function getPosts(locale: string): Promise<PostCard[]> {
  return sorted().map((raw) => toCard(resolve(raw, locale)));
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
  const raw = MOCK_POSTS.find((p) => p.slug === slug);
  return raw ? resolve(raw, locale) : null;
}

/** Same category first, then newest. Never includes the current post. */
export async function getRelatedPosts(
  locale: string,
  slug: string,
  limit = 2,
): Promise<PostCard[]> {
  const current = MOCK_POSTS.find((p) => p.slug === slug);
  const others = sorted().filter((p) => p.slug !== slug);
  const ranked = [
    ...others.filter((p) => p.category === current?.category),
    ...others.filter((p) => p.category !== current?.category),
  ];
  return ranked.slice(0, limit).map((raw) => toCard(resolve(raw, locale)));
}

export async function getPostSlugs(): Promise<string[]> {
  return MOCK_POSTS.map((p) => p.slug);
}
