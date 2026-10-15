import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FaqItem } from "@/types/faq";
import SectionHeader from "@/components/shared/SectionHeader";
import FaqAccordion from "@/components/shared/FaqAccordion";

/**
 * Homepage FAQ preview — between Blog Preview and Contact CTA (Oct 2026,
 * marketing's request).
 *
 * Two columns on desktop. Left: the header, a line of copy, and a navy panel
 * that sends people to the full /faq. Right: the featured questions as
 * numbered cards (FaqAccordion variant="card"). On mobile: header →
 * questions → panel.
 *
 * Division of labour with the next section: this one's action is "read more
 * answers" (/faq); Contact CTA's is LINE. An earlier version put a LINE
 * button here too and the two asks sat back to back.
 *
 * Same featured pick as /contact (data/faq.ts `featured`). No FAQPage JSON-LD
 * here — that lives on /faq only, so the questions are marked up once.
 *
 * Ground: surface-dim, its own band between Blog Preview (white) and Contact
 * CTA (surface).
 */

type Props = {
  t: Dictionary["home"]["faq"];
  locale: string;
  data: FaqItem[];
  /** All FAQs, for the "view all N" link. */
  total: number;
};

export default function FaqPreview({ t, locale, data, total }: Props) {
  if (data.length === 0) return null;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-dim)] py-[var(--section-py)]">
      <div className="relative max-w-[var(--container-max)] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] gap-10 lg:gap-x-16 lg:gap-y-9 lg:items-start">
        {/* Mobile order: header → questions → panel. Desktop: header and
            panel stacked on the left, questions spanning both rows right. */}
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeader section="faq" align="left" />
          <span aria-hidden className="block divider-accent mt-5" />
          <p
            className={`pt-5 max-w-md text-[var(--color-text-warm)] ${
              isTH
                ? "text-[0.98rem] leading-[1.95]"
                : "text-base leading-[1.85]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {t.intro}
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <FaqAccordion
            items={data}
            locale={locale}
            group="home-faq"
            variant="card"
          />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          {/* "More questions" panel. Its action is the full /faq, NOT LINE:
              Contact CTA follows directly with the LINE button, and two
              LINE asks back to back competed. Outlined, so the solid
              rose-gold LINE button below stays the page's one loud action. */}
          <div className="relative overflow-hidden bg-[var(--color-primary)] px-7 py-8">
            <span
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent), transparent)",
              }}
            />
            <p
              className={`text-[var(--color-accent-pale)] ${
                isTH ? "text-[1.2rem]" : "text-[1.3rem]"
              }`}
              style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
            >
              {t.askHeading}
            </p>
            <p
              className={`pt-2 text-sm text-[var(--color-on-primary-muted)] ${
                isTH ? "leading-[1.9]" : "leading-[1.75]"
              }`}
              style={{ fontFamily: bodyFont, fontWeight: 300 }}
            >
              {t.askText}
            </p>
            <Link
              href={`/${locale}/faq`}
              className="mt-6 inline-flex items-center justify-center gap-2.5 border border-[var(--color-accent)] text-[var(--color-accent-pale)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3.5 text-[0.95rem] font-medium transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              {t.cta.replace("{n}", String(total))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
