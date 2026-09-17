import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import Image from "next/image";
import { ABOUT_STORY, FACILITY } from "@/data/about";
import { DOCTORS } from "@/data/doctors";
import PageHeader from "@/components/shared/PageHeader";
import InView from "@/components/shared/InView";
import SectionIntro from "@/components/shared/SectionIntro";
import FacilityGallery from "@/components/about/FacilityGallery";
import AwardsShelf from "@/components/shared/AwardsShelf";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.about.hero.heading} — NYC Clinic`,
    description: t.about.hero.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";

  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <>
      <PageHeader
        label={t.about.hero.label}
        heading={t.about.hero.heading}
        description={t.about.hero.description}
        locale={locale}
      />

      {/* ── Story ──
          The homepage About section is a condensed version of this. Here the
          three paragraphs run in full, set at an editorial measure rather
          than full container width — this is the page's only long-form prose
          and it should read like prose, not like a column of copy. */}
      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="max-w-[58ch] mx-auto">
            <SectionIntro
              label={t.about.story.label}
              heading={t.about.story.heading}
              locale={locale}
            />

            <div className="mt-8 space-y-6">
              {ABOUT_STORY.map((p, i) => (
                <InView key={i} variant="fade" index={i}>
                  <p
                    className={`text-[var(--color-text-warm)] ${
                      isTH
                        ? "text-[1.05rem] leading-[2]"
                        : "text-[1.05rem] leading-[1.9]"
                    }`}
                    style={{ fontFamily: bodyFont, fontWeight: 300 }}
                  >
                    {isTH ? p.th : p.en}
                  </p>
                </InView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {FACILITY.map((branch) => (
        <FacilityGallery
          key={branch.slug}
          branch={branch}
          locale={locale}
          label={t.about.facility.label}
          heading={t.about.facility.heading}
        />
      ))}

      {/* Industry recognition — the "featured" variant, written for this page:
          the most recent award enlarged with the other five beside it. The
          homepage uses the "shelf" variant of the same component, so the two
          can't drift. */}
      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <SectionIntro
            label={t.about.awards.label}
            heading={t.about.awards.heading}
            locale={locale}
            className="mb-12"
          />
          <AwardsShelf locale={locale} variant="featured" showLabel={false} />
        </div>
      </section>

      {/* Team — portraits and names only, no credentials. /doctors owns the
          detail; this exists because someone reading About is deciding whether
          to trust the clinic, and faces do that faster than prose. */}
      <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <SectionIntro
            label={t.about.team.label}
            heading={t.about.team.heading}
            locale={locale}
            className="mb-10"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {DOCTORS.map((doc, i) => (
              <InView key={doc.slug} variant="rise" index={i}>
                <Link
                  href={`/${locale}/doctors#${doc.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-white ring-1 ring-[var(--color-border)] radius-soft">
                    <Image
                      src={doc.image}
                      alt={`${doc.nameEn} — ${doc.nameTh}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <p
                    className="text-[var(--color-primary)] text-base sm:text-lg leading-tight mt-3 transition-colors group-hover:text-[var(--color-accent)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                    }}
                  >
                    {doc.nameEn}
                  </p>
                  <p
                    className="text-[var(--color-accent)] text-xs sm:text-sm mt-0.5"
                    style={{ fontFamily: "var(--font-thai-head)" }}
                  >
                    {doc.nameTh}
                  </p>
                  <p
                    className="text-[var(--color-text-subtle)] text-[11px] sm:text-xs mt-1.5 leading-relaxed"
                    style={{ fontFamily: bodyFont }}
                  >
                    {isTH ? doc.specialtyTh : doc.specialty}
                  </p>
                </Link>
              </InView>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <span
              aria-hidden
              className="h-px flex-1 opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-border-accent))",
              }}
            />
            <Link
              href={`/${locale}/doctors`}
              className="shrink-0 text-sm font-semibold tracking-[0.1em] uppercase underline text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              {t.about.team.cta}
            </Link>
            <span
              aria-hidden
              className="h-px flex-1 opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-border-accent), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
