import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { PostCard } from "@/types/post";
import PostCardItem from "@/components/blog/PostCardItem";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  t: Dictionary["home"]["blog"];
  locale: string;
  data: PostCard[];
};

export default function BlogPreview({ t, locale, data }: Props) {
  const isTH = locale === "th";

  // Cards are the shared PostCardItem — same card as /blog, one source.
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <SectionHeader section="blog" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {data.map((post) => (
            <PostCardItem key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
