import type { Metadata } from "next";
import { getLegalPage, type LegalSlug } from "@/data/legal";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/shared/PageHeader";
import ArticleBody from "@/components/blog/ArticleBody";

/**
 * Shared template for /privacy-policy and /terms. Same body styling and
 * server-side sanitising as blog articles (ArticleBody), so WP page HTML can
 * drop straight in.
 */

export async function legalMetadata(
  locale: string,
  slug: LegalSlug,
): Promise<Metadata> {
  const page = await getLegalPage(locale, slug);
  return {
    title: `${page.title} — NYC Clinic`,
    // Keep placeholder skeletons out of search results.
    robots: page.draft ? { index: false, follow: true } : undefined,
  };
}

export default async function LegalPageView({
  locale,
  slug,
}: {
  locale: string;
  slug: LegalSlug;
}) {
  const [t, page] = await Promise.all([
    getDictionary(locale as Locale),
    getLegalPage(locale, slug),
  ]);
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const updated = new Date(page.updated).toLocaleDateString(
    isTH ? "th-TH" : "en-US",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );

  return (
    <>
      <PageHeader label={t.legal.label} heading={page.title} locale={locale} />
      <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="max-w-[720px] mx-auto">
            <p
              className="pb-10 text-sm text-[var(--color-text-muted)]"
              style={{ fontFamily: bodyFont }}
            >
              {t.legal.updated} {updated}
            </p>
            <ArticleBody html={page.html} lang={isTH ? "th" : "en"} />
          </div>
        </div>
      </section>
    </>
  );
}
