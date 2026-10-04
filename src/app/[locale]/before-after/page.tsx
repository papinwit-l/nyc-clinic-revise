import type { Metadata } from "next";
import Link from "next/link";
import { getCaseGroups } from "@/data/cases";
import { getRevealsByTreatment } from "@/data/reveal";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/shared/PageHeader";
import SectionIntro from "@/components/shared/SectionIntro";
import BeforeAfterRevealSlide from "@/components/home/BeforeAfterRevealSlide";
import CaseGallery from "@/components/home/CaseGallery";

/**
 * One block per treatment: reveal, a capped set of cases, and a CTA into that
 * treatment's own page.
 *
 * ONE reveal per block, deliberately. The block is a preview — the case grid
 * and the CTA carry the depth, and a carousel here would say "more inside" at
 * exactly the moment the CTA should be doing that job. The carousel lives on
 * /before-after/[treatment], where someone has already committed.
 *
 * Cases open in a modal rather than navigating: a case is two photos and a
 * label, too thin to justify a page (project reference §5).
 */

const PER_BLOCK = 6;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.beforeAfter.hero.heading} — NYC Clinic`,
    description: t.beforeAfter.hero.description,
  };
}

export default async function BeforeAfterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  const groups = await getCaseGroups(locale, {
    perGroup: PER_BLOCK,
    ungroupedTitle: t.beforeAfter.ungrouped,
  });

  // One reveal per treatment — the first by order, or none.
  const reveals = await Promise.all(
    groups.map((g) => getRevealsByTreatment(locale, g.slug)),
  );

  return (
    <>
      <PageHeader
        label={t.beforeAfter.hero.label}
        heading={t.beforeAfter.hero.heading}
        description={t.beforeAfter.hero.description}
        locale={locale}
      />

      {groups.map((group, i) => {
        const reveal = reveals[i]?.[0];
        const hasMore = group.total > group.cases.length;

        return (
          <section
            key={group.slug}
            id={group.slug}
            className={`scroll-mt-28 py-[var(--section-py)] ${
              i % 2 === 1
                ? "bg-[var(--color-surface-dim)]"
                : "bg-[var(--color-surface)]"
            }`}
          >
            <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
              <SectionIntro
                label={t.beforeAfter.hero.label}
                heading={group.title}
                meta={`${group.total} ${t.beforeAfter.cases}`}
                locale={locale}
                className="mb-10"
              />

              {reveal && (
                <div className="mx-auto w-full max-w-3xl mb-12">
                  <BeforeAfterRevealSlide
                    beforeImage={{
                      src: reveal.beforeImage,
                      alt: `${reveal.title ?? group.title} — ${isTH ? "ก่อน" : "Before"}`,
                    }}
                    afterImage={{
                      src: reveal.afterImage,
                      alt: `${reveal.title ?? group.title} — ${isTH ? "หลัง" : "After"}`,
                    }}
                    locale={locale}
                    index={i}
                    aspect="4/3"
                  />
                </div>
              )}

              <CaseGallery
                tCommon={t.common}
                locale={locale}
                cases={group.cases}
              />

              {/* CTA only when the block is genuinely a preview — with six or
                  fewer cases there is nothing more to show, and "View all 3"
                  would be a link to the same thing. */}
              {hasMore && (
                <div className="mt-10 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--color-border-accent))",
                    }}
                  />
                  <Link
                    href={`/${locale}/before-after/${group.slug}`}
                    className="shrink-0 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    style={{ fontFamily: bodyFont }}
                  >
                    {t.beforeAfter.viewAll} {group.total} {t.beforeAfter.cases}
                  </Link>
                  <span
                    aria-hidden
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-border-accent), transparent)",
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
