import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/data/posts";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleCTA from "@/components/blog/ArticleCTA";
import PostCardItem, { formatPostDate } from "@/components/blog/PostCardItem";

/**
 * Single article.
 *
 * Header is cream, not the navy PageHeader: a long Thai title in the rose-gold
 * gradient on navy reads poorly, and the cover banner already carries a
 * designed headline. The site header's scrim is built for dark/media grounds,
 * so a navy strip the height of the header sits behind it — the nav stays
 * legible without the Header needing a light variant.
 *
 * Text faces follow `post.lang` (the language the article is written in);
 * UI chrome (back link, date, labels) follows the page locale.
 */

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  // A Thai-only article on /en is the same document as /th — point the
  // canonical at /th so the two URLs don't compete.
  const canonicalLocale = post.lang === "th" ? "th" : locale;

  return {
    title: `${post.title} — NYC Clinic`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/${canonicalLocale}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: `${SITE_URL}${post.image}` }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [t, post, related] = await Promise.all([
    getDictionary(locale as Locale),
    getPostBySlug(locale, slug),
    getRelatedPosts(locale, slug, 2),
  ]);
  if (!post) notFound();

  const isTH = locale === "th";
  const textTH = post.lang === "th";
  const uiFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const uiHeadFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const titleFont = textTH ? "var(--font-thai-head)" : "var(--font-display)";
  const standfirstFont = textTH
    ? "var(--font-thai-serif)"
    : "var(--font-accent)";
  const fallbackNote = locale !== post.lang ? t.blog.thaiOnly : "";

  return (
    <article>
      {/* Ground for the fixed site header — see note above */}
      <div
        aria-hidden
        className="bg-[var(--color-primary)] h-[var(--header-height)]"
      />

      <header className="bg-[var(--color-surface)] pt-10 sm:pt-14">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="max-w-[720px] mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="text-sm text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: uiFont }}
            >
              {t.blog.back}
            </Link>

            <p
              className="flex flex-wrap items-center gap-2.5 mt-7 text-sm text-[var(--color-text-subtle)]"
              style={{ fontFamily: uiFont }}
            >
              <span
                className="text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--color-accent)] text-white px-2.5 py-[5px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {post.category}
              </span>
              <time dateTime={post.date}>
                {formatPostDate(post.date, locale)}
              </time>
              <span
                aria-hidden
                className="w-[3px] h-[3px] rotate-45 bg-[var(--color-accent)]"
              />
              <span>
                {t.blog.minRead.replace("{n}", String(post.readingMinutes))}
              </span>
            </p>

            <h1
              lang={post.lang}
              className="text-[var(--color-primary)] mt-3.5 text-[clamp(1.8rem,4.4vw,2.75rem)] leading-[1.3]"
              style={{
                fontFamily: titleFont,
                fontWeight: textTH ? 600 : 500,
              }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p
                lang={post.lang}
                className={`text-[var(--color-primary)] mt-5 ${
                  textTH
                    ? "text-[1.15rem] leading-[1.85]"
                    : "text-[1.4rem] leading-[1.6] italic"
                }`}
                style={{ fontFamily: standfirstFont, fontWeight: 300 }}
              >
                {post.excerpt}
              </p>
            )}

            {fallbackNote && (
              <p
                className="mt-6 border-l-2 border-[var(--color-accent)] pl-4 text-sm text-[var(--color-text-warm)]"
                style={{ fontFamily: uiFont }}
              >
                {fallbackNote}
              </p>
            )}
          </div>

          {/* Cover — full 16:9, never cropped: the banner has baked-in type */}
          <div className="relative z-10 max-w-[960px] mx-auto mt-10 aspect-[16/9] bg-[var(--color-surface-dim)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>
        </div>
      </header>

      {/* White body slides up under the cover */}
      <div className="bg-[var(--color-surface-white)] -mt-16 sm:-mt-[120px] pt-28 sm:pt-[168px] pb-[72px]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="max-w-[720px] mx-auto">
            <ArticleBody html={post.content} lang={post.lang} />
            <ArticleCTA t={t.blog.cta} locale={locale} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-[var(--color-surface)] pt-[72px] pb-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <div className="flex flex-col gap-2.5 mb-9">
              <span className="section-label">{t.blog.relatedLabel}</span>
              <h2
                className="text-[var(--color-primary)] text-[1.6rem]"
                style={{ fontFamily: uiHeadFont, fontWeight: isTH ? 600 : 400 }}
              >
                {t.blog.relatedHeading}
              </h2>
            </div>
            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-x-6 gap-y-10">
              {related.map((p) => (
                <PostCardItem key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
