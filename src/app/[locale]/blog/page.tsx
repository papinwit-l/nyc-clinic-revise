import type { Metadata } from "next";
import { getPosts } from "@/data/posts";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/shared/PageHeader";
import BlogIndex from "@/components/blog/BlogIndex";

/**
 * Article index. All posts are passed to the client component, which filters
 * and pages them in state — right while the count is small. If the blog ever
 * passes ~60 posts, paging should fetch instead (same UI, different plumbing).
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.blog.hero.heading} — NYC Clinic`,
    description: t.blog.hero.description,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const posts = await getPosts(locale);

  return (
    <>
      <PageHeader
        label={t.blog.hero.label}
        heading={t.blog.hero.heading}
        description={t.blog.hero.description}
        locale={locale}
      />

      <section className="bg-[var(--color-surface)] pt-14 pb-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <BlogIndex
            posts={posts}
            locale={locale}
            t={{
              all: t.blog.all,
              read: t.blog.read,
              prev: t.blog.prev,
              next: t.blog.next,
              empty: t.blog.empty,
            }}
          />
        </div>
      </section>
    </>
  );
}
