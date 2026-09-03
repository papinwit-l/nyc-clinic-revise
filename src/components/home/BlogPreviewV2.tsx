import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { PostCard } from "@/types/post";

type Props = {
  t: Dictionary["home"]["blog"];
  locale: string;
  data: PostCard[];
};

export default function BlogPreviewV2({ t, locale, data }: Props) {
  const isTH = locale === "th";

  // Title follows locale language, subtitle is the other language
  const titleFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const subtitleFont = isTH ? "var(--font-body)" : "var(--font-thai-body)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  if (!data.length) return null;

  const featured = data[0];
  const rest = data.slice(1);

  const fmtDate = (date: string) =>
    new Date(date).toLocaleDateString(isTH ? "th-TH" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label" style={{ fontFamily: bodyFont }}>
            {t.label}
          </span>
          <h2
            className="section-heading text-3xl sm:text-4xl mt-3"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {t.heading}
          </h2>
        </div>

        {/* Editorial journal — featured lead + compact list of the rest */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
          {/* Featured lead */}
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className={`group block ${rest.length ? "" : "lg:col-span-2"}`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span
                className="absolute top-3 left-3 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[var(--color-accent)] text-white px-2.5 py-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featured.category}
              </span>
            </div>
            <div className="pt-5">
              <p
                className="text-[11px] text-[var(--color-text-subtle)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {fmtDate(featured.date)}
              </p>
              <h3
                className="text-xl sm:text-2xl font-medium leading-snug mt-2 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: titleFont }}
              >
                {featured.title}
              </h3>
              <p
                className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-prose"
                style={{ fontFamily: subtitleFont }}
              >
                {featured.subtitle}
              </p>
              <span
                className="inline-block mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ fontFamily: bodyFont }}
              >
                {t.cta}
              </span>
            </div>
          </Link>

          {/* The rest — compact horizontal list rows */}
          {rest.length > 0 && (
            <div className="flex flex-col">
              {rest.map(({ slug, image, title, category, date }, i) => (
                <Link
                  key={slug}
                  href={`/${locale}/blog/${slug}`}
                  className={`group flex gap-4 py-5 ${
                    i === 0 ? "lg:pt-0" : ""
                  } ${
                    i < rest.length - 1
                      ? "border-b border-[var(--color-border)]"
                      : ""
                  }`}
                >
                  <div className="relative w-28 sm:w-32 aspect-[4/3] shrink-0 overflow-hidden bg-[var(--color-surface-dim)]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <p
                      className="text-[10px] tracking-[0.1em] uppercase text-[var(--color-accent)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {category} · {fmtDate(date)}
                    </p>
                    <h3
                      className="text-sm font-medium leading-snug mt-1.5 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-3"
                      style={{ fontFamily: titleFont }}
                    >
                      {title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
