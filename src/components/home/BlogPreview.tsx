import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { PostCard } from "@/types/post";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  t: Dictionary["home"]["blog"];
  locale: string;
  data: PostCard[];
};

export default function BlogPreview({ t, locale, data }: Props) {
  const isTH = locale === "th";

  // Post titles are Card Titles — display face (Playfair / Anuphan), per the
  // guide. They were set in the body face at 14px, smaller than the page's
  // body copy. Subtitle takes the opposite language's face, as elsewhere.
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const subtitleFont = isTH ? "var(--font-body)" : "var(--font-thai-head)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <SectionHeader section="blog" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(({ slug, image, title, subtitle, category, date }) => (
            <Link
              key={slug}
              href={`/${locale}/blog/${slug}`}
              className="group bg-white overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--color-accent)] text-white px-3 py-1.5"
                  style={{ fontFamily: bodyFont }}
                >
                  {category}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <p
                  className="text-xs text-[var(--color-text-subtle)]"
                  style={{ fontFamily: bodyFont }}
                >
                  {new Date(date).toLocaleDateString(isTH ? "th-TH" : "en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3
                  className={`text-[var(--color-primary)] mt-2.5 leading-[1.3] group-hover:text-[var(--color-accent)] transition-colors ${
                    isTH ? "text-[1.1rem]" : "text-[1.2rem]"
                  }`}
                  style={{
                    fontFamily: titleFont,
                    fontWeight: isTH ? 600 : 500,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm text-[var(--color-text-warm)] mt-1.5 leading-relaxed"
                  style={{ fontFamily: subtitleFont, fontWeight: 400 }}
                >
                  {subtitle}
                </p>
              </div>
            </Link>
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
