import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { PostCard } from "@/types/post";

type Props = {
  t: Dictionary["home"]["blog"];
  locale: string;
  data: PostCard[];
};

export default function BlogPreview({ t, locale, data }: Props) {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(({ slug, image, title, subtitle, category, date }) => (
            <Link
              key={slug}
              href={`/${locale}/blog/${slug}`}
              className="group bg-white shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[var(--color-accent)] text-white px-2.5 py-1">
                  {category}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] text-[var(--color-text-subtle)]">
                  {new Date(date).toLocaleDateString(
                    locale === "th" ? "th-TH" : "en-US",
                    { day: "numeric", month: "short", year: "numeric" },
                  )}
                </p>
                <h3 className="font-[var(--font-thai-body)] text-sm font-medium leading-relaxed mt-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {title}
                </h3>
                <p className="font-[var(--font-body)] text-xs text-[var(--color-text-muted)] mt-1">
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
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
