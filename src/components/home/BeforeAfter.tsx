import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";

type Props = {
  t: Dictionary["home"]["results"];
  tCommon: Dictionary["common"];
  locale: string;
  data: CaseCard[];
};

export default function BeforeAfter({ t, tCommon, locale, data }: Props) {
  const isTH = locale === "th";

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
          <p
            className="text-[var(--color-text-muted)] mt-3 max-w-md mx-auto"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ slug, image, treatment, doctor }) => (
            <Link
              key={slug}
              href={`/${locale}/before-after/${slug}`}
              className="group bg-white radius-soft overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image}
                  alt={`${treatment} — Before & After`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                {/* Treatment name — font follows text language */}
                <h3
                  className="text-sm font-semibold tracking-[0.05em]"
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                  }}
                >
                  {treatment}
                </h3>
                <p
                  className="text-xs text-[var(--color-text-subtle)] mt-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tCommon.by} {doctor}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/before-after`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
