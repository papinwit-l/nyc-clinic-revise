import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FaqItem } from "@/types/faq";
import SectionHeader from "@/components/shared/SectionHeader";
import FaqAccordion from "@/components/shared/FaqAccordion";

/**
 * Homepage FAQ preview — added Oct 2026 at marketing's request, between Blog
 * Preview and Contact CTA.
 *
 * The same featured pick /contact shows (data/faq.ts `featured`), in the same
 * accordion, plus a link to the full /faq. Server component: the accordion is
 * native <details>, so no client JS.
 *
 * No FAQPage JSON-LD here: the structured data lives on /faq only, so search
 * engines see one canonical FAQ page rather than the same questions marked up
 * on three URLs.
 *
 * Ground: surface-dim, so it reads as its own band between Blog Preview
 * (white) and Contact CTA (surface).
 */

type Props = {
  t: Dictionary["home"]["faq"];
  locale: string;
  data: FaqItem[];
};

export default function FaqPreview({ t, locale, data }: Props) {
  if (data.length === 0) return null;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <SectionHeader section="faq" className="mb-10 sm:mb-12" />

        <div className="max-w-[760px] mx-auto">
          <FaqAccordion items={data} locale={locale} group="home-faq" />
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/faq`}
            className={`text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors ${
              isTH ? "" : "tracking-[0.1em] uppercase"
            }`}
            style={{ fontFamily: bodyFont }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
