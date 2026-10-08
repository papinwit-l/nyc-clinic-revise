import type { Metadata } from "next";
import { DOCTORS } from "@/data/doctors";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { LineIcon } from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import DoctorLead from "@/components/doctors/DoctorLead";
import DoctorTeamCard from "@/components/doctors/DoctorTeamCard";
import TeamLayoutReview from "@/components/doctors/TeamLayoutReview";
import { LINE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.doctor.hero.heading} — NYC Clinic`,
    description: t.doctor.hero.description,
  };
}

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";

  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const lead = DOCTORS.find((d) => d.featured) ?? DOCTORS[0];
  // Dr. Jing does not repeat in the team section — decided Sept 2026.
  const team = DOCTORS.filter((d) => d.slug !== lead.slug);

  return (
    <>
      <PageHeader
        label={t.doctor.hero.label}
        heading={t.doctor.hero.heading}
        description={t.doctor.hero.description}
        locale={locale}
      />

      {/* Lead specialist — on --color-surface, the brighter ground */}
      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <DoctorLead doctor={lead} t={t.doctor} locale={locale} />
        </div>
      </section>

      {/* Rest of the team — surface-dim, so the lead block above reads as the
          primary moment */}
      <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          {/* A real section header. This was a small line of text between
              two rules and read as a footnote, for the section that
              introduces three of the four doctors. No diamond: the page
              header already has one. */}
          <div className="text-center mb-12 sm:mb-14">
            <span
              className={
                isTH ? "section-label section-label-thai" : "section-label"
              }
              style={{ fontFamily: bodyFont }}
            >
              {t.doctor.team.label}
            </span>
            <h2
              className="pt-3 text-[clamp(1.7rem,3.2vw,2rem)] leading-[1.35] text-[var(--color-primary)]"
              style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
            >
              {t.doctor.team.heading}
            </h2>
          </div>

          {/* TEMPORARY: two layouts for marketing to choose between.
              Add ?team=a or ?team=b to the URL — see TeamLayoutReview. */}
          <TeamLayoutReview
            a={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                {team.map((doc) => (
                  <DoctorTeamCard
                    key={doc.slug}
                    doctor={doc}
                    locale={locale}
                    layout="grid"
                  />
                ))}
              </div>
            }
            b={
              <div className="grid gap-6">
                {team.map((doc) => (
                  <DoctorTeamCard
                    key={doc.slug}
                    doctor={doc}
                    locale={locale}
                    layout="row"
                  />
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* Closing CTA — flanking hairlines rather than the diamond divider:
          the page header already uses the diamond, and twice on one page makes
          it a tic. This is the same rule–text–rule treatment as the homepage's
          Before & After closing CTA, so "closing CTA" gets one pattern. */}
      <section className="bg-[var(--color-primary)] py-16 text-center">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="flex items-center gap-5 sm:gap-8">
            <span
              aria-hidden
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent))",
              }}
            />
            <p
              className={`shrink-0 text-[var(--color-on-primary-warm)] ${
                isTH ? "text-[1.15rem]" : "text-[1.25rem]"
              }`}
              style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
            >
              {t.doctor.cta.consult}
            </p>
            <span
              aria-hidden
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent), transparent)",
              }}
            />
          </div>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-6 inline-flex"
            style={{ fontFamily: bodyFont }}
          >
            <LineIcon className="w-5 h-5" />
            {t.doctor.cta.ctaLine}
          </a>
        </div>
      </section>
    </>
  );
}
