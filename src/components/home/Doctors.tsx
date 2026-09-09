import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Doctor } from "@/types/doctor";
import SectionHeader from "@/components/shared/SectionHeader";
import { sectionHeadings } from "@/i18n/section-headings";

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
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        {/* Section header */}
        <SectionHeader section="doctors" className="mb-12 sm:mb-16" />

        {/* ── Featured doctor (Dr. Jing) ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 lg:items-start mb-14 sm:mb-16">
          {/* Concentric rings — behind the portrait, bleeding off the
              top-left. A ring behind a face reads as a halo, not the spa
              ripple that got them removed from About.

              Three nested elements, each a 1px border. NOT inset box-shadows:
              those stack rather than mask, so a "transparent" inner shadow
              doesn't cut a hole — it renders as a solid band. */}
          <div
            aria-hidden
            className="pointer-events-none absolute z-0 hidden lg:block left-[-9rem] top-[-6rem] w-[26rem] aspect-square"
          >
            {[
              { inset: "0", opacity: 0.55 },
              { inset: "14%", opacity: 0.38 },
              { inset: "30%", opacity: 0.24 },
            ].map((ring) => (
              <span
                key={ring.inset}
                className="absolute rounded-full border border-[var(--color-accent)]"
                style={{ inset: ring.inset, opacity: ring.opacity }}
              />
            ))}
          </div>

          {/* Photo */}
          <Link
            href={`/${locale}/doctors#${featured.slug}`}
            className="group relative z-10 aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full overflow-hidden bg-[var(--color-surface-dim)] radius-soft"
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
          <div className="relative z-10 text-center lg:text-left lg:col-span-2 lg:pt-4">
            <span className="badge">{t.badge}</span>

            {/* EN name — always Playfair Display */}
            <h3
              className="text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.15] mt-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
            >
              {featured.fullNameEn}
            </h3>
            {/* TH name — always Anuphan */}
            <p
              className="text-[var(--color-accent)] text-base sm:text-lg mt-1.5"
              style={{ fontFamily: "var(--font-thai-head)", fontWeight: 500 }}
            >
              {featured.fullNameTh}
            </p>

            <div className="divider-accent mt-4 mb-4 mx-auto lg:mx-0" />

            {/* Bio — font follows the text's language */}
            <p
              className={`text-[var(--color-text-warm)] text-[0.95rem] sm:text-base mx-auto lg:mx-0 max-w-[54ch] ${
                isTH ? "leading-[1.95]" : "leading-[1.85]"
              }`}
              style={{
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
                fontWeight: 300,
              }}
            >
              {isTH
                ? (featured.bioTh ?? featured.specialtyTh)
                : (featured.bioEn ?? featured.specialty)}
            </p>

            {/* Quick stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
              <div className="text-center">
                <p
                  className="stat-number text-[clamp(2.2rem,4.2vw,3rem)] text-[var(--color-accent)]"
                  style={{ fontWeight: 400 }}
                >
                  15+
                </p>
                <p
                  className="text-xs text-[var(--color-text-warm)] mt-2"
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                    fontWeight: 400,
                  }}
                >
                  {isTH ? "ปีประสบการณ์" : "yrs experience"}
                </p>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="text-center">
                <p
                  className="stat-number text-[clamp(2.2rem,4.2vw,3rem)] text-[var(--color-accent)]"
                  style={{ fontWeight: 400 }}
                >
                  10,000+
                </p>
                <p
                  className="text-xs text-[var(--color-text-warm)] mt-2"
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                    fontWeight: 400,
                  }}
                >
                  {isTH ? "เคส" : "cases"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary doctors ── */}
        <div>
          <p
            className="text-center text-[1.15rem] text-[var(--color-text-warm)] mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {sectionHeadings.doctors.teamHeading}
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
                  {/* EN name — always Playfair */}
                  <h3
                    className="text-base sm:text-lg leading-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                    }}
                  >
                    {doc.nameEn}
                  </h3>
                  {/* TH name — always Anuphan */}
                  <p
                    className="text-[var(--color-accent)] text-xs sm:text-sm mt-0.5"
                    style={{ fontFamily: "var(--font-thai-head)" }}
                  >
                    {doc.nameTh}
                  </p>
                  {/* Specialty — font follows text language */}
                  <p
                    className="text-[var(--color-text-warm)] text-[11px] sm:text-xs mt-1.5 leading-relaxed"
                    style={{
                      fontFamily: isTH
                        ? "var(--font-thai-body)"
                        : "var(--font-body)",
                    }}
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
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
