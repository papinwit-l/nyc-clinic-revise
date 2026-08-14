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
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
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
              className="group relative overflow-hidden bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)] hover:-translate-y-1"
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
                <h3 className="font-[var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase">
                  {title}
                </h3>
                <p className="font-[var(--font-thai-body)] text-[var(--color-accent)] text-sm mt-0.5">
                  {subtitle}
                </p>
                <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-sm mt-3 leading-relaxed">
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
