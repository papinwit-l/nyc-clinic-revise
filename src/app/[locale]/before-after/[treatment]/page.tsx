import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTreatmentGroup } from "@/data/cases";
import { getRevealsByTreatment } from "@/data/reveal";
import { getServices } from "@/data/services";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { LineIcon } from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import RevealCarousel from "@/components/before-after/RevealCarousel";
import CaseGroup from "@/components/before-after/CaseGroup";

const LINE_URL = "https://lin.ee/7oJgymx";

/**
 * One treatment's cases, grouped by sub-category.
 *
 * Page shape, decided Sept 2026 (project reference §5):
 *   reveal carousel  — ALL of this treatment's reveals, above everything
 *   group 1..n       — heading + paginated grid
 *   "More cases"     — always last, only when it has members
 *
 * The carousel sits above the groups rather than one per group: interleaving
 * carousels with paginated grids makes the page long and rhythmically messy.
 *
 * [treatment] is a TOP-LEVEL service slug. getTreatmentGroup returns null for
 * anything else, including child services, so /before-after/rhinoplasty is a
 * 404 by design — cases for a child are reached through its service page.
 */

export async function generateStaticParams() {
  // Only treatments that actually have cases get a page.
  const services = await getServices("en");
  return services.filter((s) => !s.parent).map((s) => ({ treatment: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; treatment: string }>;
}): Promise<Metadata> {
  const { locale, treatment } = await params;
  const t = await getDictionary(locale as Locale);
  const group = await getTreatmentGroup(locale, treatment, {
    ungroupedTitle: t.beforeAfter.ungrouped,
  });
  if (!group) return {};
  return {
    title: `${group.title} — ${t.beforeAfter.hero.heading} | NYC Clinic`,
    description: t.beforeAfter.hero.description,
  };
}

export default async function TreatmentGalleryPage({
  params,
}: {
  params: Promise<{ locale: string; treatment: string }>;
}) {
  const { locale, treatment } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const group = await getTreatmentGroup(locale, treatment, {
    ungroupedTitle: t.beforeAfter.ungrouped,
  });
  if (!group) notFound();

  const reveals = await getRevealsByTreatment(locale, treatment);

  return (
    <>
      <PageHeader
        label={t.beforeAfter.hero.label}
        heading={group.title}
        description={`${group.total} ${t.beforeAfter.cases}`}
        locale={locale}
      />

      {/* Back to the full gallery — someone arriving from search has no other
          route up, since the nav only reaches /before-after. */}
      <div className="bg-[var(--color-surface)] py-4">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <Link
            href={`/${locale}/before-after`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            <span aria-hidden>&larr;</span>
            {t.beforeAfter.hero.heading}
          </Link>
        </div>
      </div>

      {reveals.length > 0 && (
        <section className="bg-[var(--color-surface)] pt-10 pb-[var(--section-py)]">
          <div className="max-w-3xl mx-auto px-6 sm:px-12">
            <RevealCarousel
              reveals={reveals}
              locale={locale}
              treatmentTitle={group.title}
            />
          </div>
        </section>
      )}

      <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 space-y-16">
          {group.groups.map((g) => (
            <CaseGroup
              key={g.slug}
              group={g}
              tCommon={t.common}
              locale={locale}
            />
          ))}
        </div>
      </section>

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
              {t.beforeAfter.consult}
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
            {t.beforeAfter.ctaLine}
          </a>
        </div>
      </section>
    </>
  );
}
