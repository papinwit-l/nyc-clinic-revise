import type { Metadata } from "next";
import Link from "next/link";
import { daysLeft, getActivePromotions } from "@/data/promotions";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { LINE_URL } from "@/lib/site";
import { LineIcon } from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import PromoBannerImage from "@/components/promotions/PromoBannerImage";

/**
 * Promotions — every promotion valid today, as a stack of full-width banners
 * in the admin's order. Same data as the homepage PromotionsBanner, which
 * shows only the first.
 *
 * A stack, not a grid: the artwork has the offer baked in, and three columns
 * would shrink that text past reading on a phone.
 *
 * No /promotions/[slug]: a promotion is a banner, a title, a date and a LINE
 * button — too thin for a page (same reasoning as cases, project reference §5).
 *
 * `revalidate`: validity is date-based, so the page must rebuild without a
 * deploy. Hourly means an expired promo lingers for at most an hour.
 *
 * No closing CTA band — every promotion carries its own LINE button.
 */

export const revalidate = 3600;

/** Show the "N days left" tag in the final week. */
const ENDING_SOON_DAYS = 7;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.promotions.hero.heading} — NYC Clinic`,
    description: t.promotions.hero.description,
  };
}

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, promos] = await Promise.all([
    getDictionary(locale as Locale),
    getActivePromotions(locale),
  ]);
  const p = t.promotions;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const lineButton = `inline-flex items-center justify-center gap-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-7 py-3.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors`;

  return (
    <>
      <PageHeader
        label={p.hero.label}
        heading={p.hero.heading}
        description={p.hero.description}
        locale={locale}
      />

      <section className="bg-[var(--color-surface)] pt-14 pb-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          {promos.length === 0 ? (
            <div className="max-w-[560px] mx-auto text-center py-10">
              <h2
                className="text-2xl text-[var(--color-primary)]"
                style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 500 }}
              >
                {p.empty.heading}
              </h2>
              <p
                className="pt-2.5 pb-7 text-[var(--color-text-warm)] leading-[1.9]"
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
              >
                {p.empty.text}
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={lineButton}
                style={{ fontFamily: bodyFont }}
              >
                <LineIcon className="w-5 h-5" />
                {p.empty.button}
              </a>
            </div>
          ) : (
            <div className="max-w-[960px] mx-auto divide-y divide-[var(--color-border-accent)]">
              {promos.map((promo, i) => {
                const left = daysLeft(promo.validUntil);
                const until = new Date(promo.validUntil).toLocaleDateString(
                  isTH ? "th-TH" : "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  },
                );

                return (
                  <article
                    key={promo.slug}
                    id={promo.slug}
                    className="scroll-mt-28 py-16 first:pt-0 last:pb-0"
                  >
                    <PromoBannerImage
                      src={promo.image}
                      alt={promo.title}
                      priority={i === 0}
                      enlargeLabel={p.enlarge}
                      closeLabel={t.common.close}
                    />

                    <div className="pt-[22px] grid gap-5 md:grid-cols-[1fr_auto] md:gap-10 md:items-start">
                      <div>
                        <h2
                          className="text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.4] text-[var(--color-primary)]"
                          style={{
                            fontFamily: headFont,
                            fontWeight: isTH ? 600 : 500,
                          }}
                        >
                          {promo.title}
                        </h2>
                        {promo.offer && (
                          <p
                            className="pt-1.5 text-[1.05rem] text-[var(--color-accent-dark)]"
                            style={{ fontFamily: bodyFont, fontWeight: 500 }}
                          >
                            {promo.offer}
                          </p>
                        )}

                        <p
                          className="flex flex-wrap items-center gap-2.5 pt-2.5 text-[0.92rem] text-[var(--color-primary)]"
                          style={{ fontFamily: bodyFont }}
                        >
                          <span
                            aria-hidden
                            className="w-[5px] h-[5px] rotate-45 border border-[var(--color-accent)]"
                          />
                          {p.validUntil} {until}
                          {left <= ENDING_SOON_DAYS && (
                            <span className="text-[0.78rem] font-medium text-white bg-[var(--color-accent-dark)] px-2.5 py-[3px]">
                              {left === 0
                                ? p.endsToday
                                : p.daysLeft.replace("{n}", String(left))}
                            </span>
                          )}
                        </p>

                        {promo.condition && (
                          <p
                            className="pt-2 text-[0.88rem] leading-[1.8] text-[var(--color-text-muted)]"
                            style={{ fontFamily: bodyFont }}
                          >
                            {promo.condition}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 md:items-end">
                        <a
                          href={LINE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={lineButton}
                          style={{ fontFamily: bodyFont }}
                        >
                          <LineIcon className="w-5 h-5" />
                          {p.ask}
                        </a>
                        {promo.serviceSlug && (
                          <Link
                            href={`/${locale}/services/${promo.serviceSlug}`}
                            className="text-[0.88rem] text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
                            style={{ fontFamily: bodyFont }}
                          >
                            {p.service}
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
