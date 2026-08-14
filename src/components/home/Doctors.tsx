import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Doctor } from "@/types/doctor";

type Props = {
  t: Dictionary["home"]["doctors"];
  locale: string;
  data: Doctor[];
};

export default function Doctors({ t, locale, data }: Props) {
  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${locale}/doctors#${doc.slug}`}
              className="group text-center"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)]">
                <Image
                  src={doc.image}
                  alt={`${doc.nameEn} — ${doc.nameTh}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/40 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white border border-white/60 px-4 py-1.5">
                    {t.cta.replace(" →", "")}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-[var(--font-display)] text-lg font-semibold">
                  {doc.nameEn}
                </h3>
                <p className="font-[var(--font-thai-head)] text-[var(--color-accent)] text-sm mt-0.5">
                  {doc.nameTh}
                </p>
                <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-xs mt-2 leading-relaxed">
                  {doc.specialtyTh}
                </p>
                <p className="text-[11px] tracking-[0.05em] text-[var(--color-text-subtle)] mt-1">
                  {doc.experience}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/doctors`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
