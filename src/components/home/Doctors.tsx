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
  const isTH = locale === "th";
  const featured = data.find((d) => d.featured) ?? data[0];
  const team = data.filter((d) => d.slug !== featured.slug);

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        {/* ── Featured doctor (Dr. Jing) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Photo */}
          <Link
            href={`/${locale}/doctors#${featured.slug}`}
            className="group relative aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full overflow-hidden bg-[var(--color-surface-dim)] radius-soft"
          >
            <Image
              src={featured.image}
              alt={`${featured.nameEn} — ${featured.nameTh}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </Link>

          {/* Info */}
          <div className="text-center lg:text-left">
            <span className="badge">{t.badge}</span>

            <h3
              className="font-[var(--font-display)] text-2xl sm:text-3xl font-semibold mt-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featured.fullNameEn}
            </h3>
            <p
              className={`text-[var(--color-accent)] text-base sm:text-lg mt-1 ${
                isTH ? "font-[var(--font-thai-head)]" : ""
              }`}
              style={isTH ? { fontFamily: "var(--font-thai-head)" } : undefined}
            >
              {featured.fullNameTh}
            </p>

            <div className="divider-accent mt-4 mb-4 mx-auto lg:mx-0" />

            <p
              className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={isTH ? { fontFamily: "var(--font-thai-body)" } : undefined}
            >
              {isTH
                ? (featured.bioTh ?? featured.specialtyTh)
                : (featured.bioEn ?? featured.specialty)}
            </p>

            {/* Quick stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
              <div className="text-center">
                <p className="stat-number text-2xl text-[var(--color-accent)]">
                  15+
                </p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-muted)] mt-1 font-medium">
                  {isTH ? "ปีประสบการณ์" : "yrs experience"}
                </p>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="text-center">
                <p className="stat-number text-2xl text-[var(--color-accent)]">
                  10,000+
                </p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-muted)] mt-1 font-medium">
                  {isTH ? "เคส" : "cases"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary doctors ── */}
        <div>
          <p className="text-center text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-subtle)] font-semibold mb-8">
            {t.teamHeading}
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {team.map((doc) => (
              <Link
                key={doc.slug}
                href={`/${locale}/doctors#${doc.slug}`}
                className="group text-center"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)] radius-soft">
                  <Image
                    src={doc.image}
                    alt={`${doc.nameEn} — ${doc.nameTh}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 33vw, 20vw"
                  />
                </div>
                <div className="mt-3">
                  <h3
                    className="text-sm sm:text-base font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {doc.nameEn}
                  </h3>
                  <p
                    className="text-[var(--color-accent)] text-xs sm:text-sm mt-0.5"
                    style={
                      isTH ? { fontFamily: "var(--font-thai-head)" } : undefined
                    }
                  >
                    {doc.nameTh}
                  </p>
                  <p
                    className="text-[var(--color-text-muted)] text-[11px] sm:text-xs mt-1"
                    style={
                      isTH ? { fontFamily: "var(--font-thai-body)" } : undefined
                    }
                  >
                    {isTH ? doc.specialtyTh : doc.specialty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12">
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
