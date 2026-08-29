import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ServiceCard } from "@/types/service";

type Props = {
  t: Dictionary["home"]["services"];
  tCommon: Dictionary["common"];
  locale: string;
  data: ServiceCard[];
};

export default function ServicesOverview({ t, tCommon, locale, data }: Props) {
  const isTH = locale === "th";

  // Font follows the TEXT's language, not the page locale.
  // In EN mode: title=EN, subtitle=TH → subtitle needs Thai font
  // In TH mode: title=TH, subtitle=EN → title needs Thai font
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-body)";
  const subtitleFont = isTH ? "var(--font-body)" : "var(--font-thai-head)";
  const descFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ slug, image, title, subtitle, desc, signature }) => (
            <Link
              key={slug}
              href={`/${locale}/services/${slug}`}
              className="group relative overflow-hidden bg-white radius-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {signature && (
                  <span className="badge absolute top-4 left-4">Signature</span>
                )}
              </div>
              <div className="p-6">
                <h3
                  className="text-sm font-semibold tracking-[0.1em] uppercase"
                  style={{ fontFamily: titleFont }}
                >
                  {title}
                </h3>
                <p
                  className="text-[var(--color-accent)] text-sm mt-0.5"
                  style={{ fontFamily: subtitleFont }}
                >
                  {subtitle}
                </p>
                <p
                  className="text-[var(--color-text-muted)] text-sm mt-3 leading-relaxed"
                  style={{ fontFamily: descFont }}
                >
                  {desc}
                </p>
                <span className="inline-block mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)] transition-colors">
                  {tCommon.learnMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/services`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
