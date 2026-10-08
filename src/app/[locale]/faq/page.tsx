import type { Metadata } from "next";
import { getFaqs } from "@/data/faq";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { FaqCategory } from "@/types/faq";
import { LINE_URL } from "@/lib/site";
import { LineIcon } from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import SectionIntro from "@/components/shared/SectionIntro";
import FaqAccordion from "@/components/shared/FaqAccordion";

/**
 * Full FAQ — every item from data/faq.ts, grouped by category. /contact shows
 * a short pick from the same source.
 *
 * General questions only. Treatment-specific questions live on each service
 * page (data/services.ts) and are deliberately not repeated here.
 *
 * Category order is fixed below, not derived from the data, so the page reads
 * in the order a new patient asks: how do I book → how do I get there → who
 * treats me. A category with no items is skipped; the jump links only appear
 * when more than one category has content.
 *
 * Emits FAQPage JSON-LD. The answers are also in the HTML (native <details>),
 * so the structured data describes what is visibly on the page.
 */

const CATEGORY_ORDER: FaqCategory[] = ["booking", "visit", "treatment"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.faq.hero.heading} — NYC Clinic`,
    description: t.faq.hero.description,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, faqs] = await Promise.all([
    getDictionary(locale as Locale),
    getFaqs(locale),
  ]);
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    title: t.faq.categories[category],
    items: faqs.filter((f) => f.category === category),
  })).filter((g) => g.items.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // "<" escaped so answer text can never close the script tag
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        label={t.faq.hero.label}
        heading={t.faq.hero.heading}
        description={t.faq.hero.description}
        locale={locale}
      />

      <section className="bg-[var(--color-surface)] pt-14 pb-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="max-w-[760px] mx-auto">
            {groups.length > 1 && (
              <nav
                aria-label={t.faq.hero.heading}
                className="flex flex-wrap gap-2 mb-14"
              >
                {groups.map((g) => (
                  <a
                    key={g.category}
                    href={`#${g.category}`}
                    className="text-sm px-[18px] py-2 border border-[var(--color-border-accent)] text-[var(--color-primary)] hover:border-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: bodyFont }}
                  >
                    {g.title}
                  </a>
                ))}
              </nav>
            )}

            <div className="space-y-16">
              {groups.map((g) => (
                <div key={g.category} id={g.category} className="scroll-mt-28">
                  <SectionIntro
                    label={t.faq.hero.label}
                    heading={g.title}
                    locale={locale}
                    className="mb-6"
                  />
                  <FaqAccordion
                    items={g.items}
                    locale={locale}
                    group={`faq-${g.category}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing line — where to go when the answer isn't here */}
      <section className="bg-[var(--color-surface-dim)] py-16">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 text-center">
          <p
            className={`text-[var(--color-primary)] ${
              isTH ? "text-[1.35rem]" : "text-[1.5rem]"
            }`}
            style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 500 }}
          >
            {t.faq.more.heading}
          </p>
          <p
            className="pt-2 text-[0.95rem] text-[var(--color-text-warm)]"
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {t.faq.more.text}
          </p>
          <div className="pt-7">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 text-sm font-semibold transition-colors ${
                isTH ? "" : "tracking-[0.12em] uppercase"
              }`}
              style={{ fontFamily: bodyFont }}
            >
              <LineIcon className="w-5 h-5" />
              {t.faq.more.button}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
