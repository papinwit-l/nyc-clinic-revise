import type { Metadata } from "next";
import Link from "next/link";
import { getCaseGroups } from "@/data/cases";
import { getRevealsByTreatment } from "@/data/reveal";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/shared/PageHeader";
import ConsultBand from "@/components/shared/ConsultBand";
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
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

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
              {/* Block header. Not SectionIntro: its "Real Results" eyebrow
                  repeated on all five blocks under a page header that already
                  says it, and its heading was sized for a sub-section — these
                  are the page's main sections. */}
              <div className="flex items-end gap-4 sm:gap-6 mb-10">
                <h2
                  className="text-[clamp(1.6rem,3vw,2rem)] leading-[1.3] text-[var(--color-primary)]"
                  style={{
                    fontFamily: headFont,
                    fontWeight: isTH ? 600 : 400,
                  }}
                >
                  {group.title}
                </h2>
                <span
                  aria-hidden
                  className="h-px flex-1 mb-[0.6em]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-border-accent), transparent)",
                  }}
                />
                <span
                  className="shrink-0 text-sm text-[var(--color-text-muted)] mb-[0.2em]"
                  style={{ fontFamily: bodyFont }}
                >
                  {group.total} {t.beforeAfter.cases}
                </span>
              </div>

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
                context="treatment"
              />

              {/* CTA only when the block is genuinely a preview — with six or
                  fewer cases there is nothing more to show, and "View all 3"
                  would be a link to the same thing. */}
              {hasMore && (
                <div className="mt-12 text-center">
                  {/* A button, not tracked text between rules: this is the
                      only route from here into the treatment page. */}
                  <Link
                    href={`/${locale}/before-after/${group.slug}`}
                    className="btn-ghost"
                    style={{
                      fontFamily: bodyFont,
                      ...(isTH ? { letterSpacing: 0, fontSize: "0.9rem" } : {}),
                    }}
                  >
                    {t.beforeAfter.viewAll} {group.total} {t.beforeAfter.cases}
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <ConsultBand
        text={t.beforeAfter.consult}
        button={t.beforeAfter.ctaLine}
        locale={locale}
      />
    </>
  );
}
