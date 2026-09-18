import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/data/services";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { ServiceCard } from "@/types/service";
import PageHeader from "@/components/shared/PageHeader";
import InView from "@/components/shared/InView";

/**
 * TWO LAYOUTS, for marketing to choose between. Flip VERSION.
 *
 *   "directory"  Five blocks stacked: name, summary, then the treatments
 *                listed beneath. Dense and scannable, clearly different from
 *                the homepage. Answers "which one do I need?".
 *
 *   "cards"      Five cards keeping their imagery, treatments listed inside
 *                each. More visual; closer to the homepage but not the same
 *                arrangement.
 *
 * Both deliberately DROP the signature hero tile. The homepage already gives
 * Nose Thread Lift a large tile with a SIGNATURE badge — repeating it here
 * would be the most duplicative element on the page. It still leads the list
 * and still carries the badge.
 *
 * No closing CTA on this page, also deliberate: the cards ARE the call to
 * action. A LINE button here short-circuits the funnel — index converts to a
 * service page, the service page converts to LINE.
 */
const VERSION: "directory" | "cards" = "cards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.services.hero.heading} — NYC Clinic`,
    description: t.services.hero.description,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";
  const services = await getServices(locale);

  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  /** Treatment names. Linked to their anchor on the category page — the
   *  treatments are sections there, not pages (see src/data/services.ts). */
  const TreatmentList = ({
    service,
    compact,
  }: {
    service: ServiceCard;
    compact?: boolean;
  }) => {
    if (!service.treatments?.length) return null;
    return (
      <ul
        className={`flex flex-wrap gap-x-5 gap-y-2 ${compact ? "mt-3" : "mt-5"}`}
      >
        {service.treatments.map((tr) => (
          <li key={tr.slug}>
            <Link
              href={`/${locale}/services/${service.slug}#${tr.slug}`}
              className={`inline-flex items-center gap-2 text-[var(--color-text-warm)] hover:text-[var(--color-accent-dark)] transition-colors ${
                compact ? "text-xs" : "text-sm"
              }`}
              style={{ fontFamily: bodyFont }}
            >
              <span
                aria-hidden
                className="w-1.5 h-1.5 shrink-0 rotate-45 border border-[var(--color-accent)]"
              />
              {tr.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <PageHeader
        label={t.services.hero.label}
        heading={t.services.hero.heading}
        description={t.services.hero.description}
        locale={locale}
      />

      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          {VERSION === "directory" ? (
            <div className="space-y-12 sm:space-y-14">
              {services.map((s, i) => (
                <InView key={s.slug} variant="rise">
                  <article
                    className={`grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 sm:gap-10 items-start pt-12! first:pt-0 ${
                      i > 0 ? "relative" : ""
                    }`}
                  >
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 right-0 h-px sm:col-span-2"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 45%, transparent 100%)",
                        }}
                      />
                    )}

                    <div className="max-w-[60ch]">
                      {s.signature && (
                        <span className="badge mb-3 inline-block">
                          {t.services.signature}
                        </span>
                      )}
                      <h2
                        className={`text-[var(--color-primary)] leading-tight ${
                          isTH ? "text-[1.5rem]" : "text-[1.7rem]"
                        }`}
                        style={{
                          fontFamily: titleFont,
                          fontWeight: isTH ? 600 : 400,
                        }}
                      >
                        <Link
                          href={`/${locale}/services/${s.slug}`}
                          className="hover:text-[var(--color-accent)] transition-colors"
                        >
                          {s.title}
                        </Link>
                      </h2>
                      <p
                        className="text-[var(--color-accent)] text-sm mt-1"
                        style={{
                          fontFamily: isTH
                            ? "var(--font-body)"
                            : "var(--font-thai-head)",
                        }}
                      >
                        {s.subtitle}
                      </p>
                      <p
                        className={`text-[var(--color-text-warm)] text-[0.95rem] mt-3 ${
                          isTH ? "leading-[1.9]" : "leading-[1.8]"
                        }`}
                        style={{ fontFamily: bodyFont, fontWeight: 300 }}
                      >
                        {s.summary}
                      </p>

                      <TreatmentList service={s} />
                    </div>

                    <Link
                      href={`/${locale}/services/${s.slug}`}
                      className="relative w-full sm:w-[220px] aspect-[4/3] shrink-0 overflow-hidden radius-soft bg-[var(--color-surface-dim)] group"
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 220px"
                      />
                    </Link>
                  </article>
                </InView>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <InView key={s.slug} variant="rise" index={i % 3}>
                  <article className="h-full flex flex-col overflow-hidden bg-white radius-soft ring-1 ring-[var(--color-border)]">
                    <Link
                      href={`/${locale}/services/${s.slug}`}
                      className="group relative aspect-[4/3] block overflow-hidden"
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {s.signature && (
                        <span className="badge absolute top-3 left-3">
                          {t.services.signature}
                        </span>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-1">
                      <h2
                        className={`text-[var(--color-primary)] leading-tight ${
                          isTH ? "text-[1.15rem]" : "text-[1.25rem]"
                        }`}
                        style={{
                          fontFamily: titleFont,
                          fontWeight: isTH ? 600 : 500,
                        }}
                      >
                        <Link
                          href={`/${locale}/services/${s.slug}`}
                          className="hover:text-[var(--color-accent)] transition-colors"
                        >
                          {s.title}
                        </Link>
                      </h2>
                      <p
                        className="text-[var(--color-accent)] text-sm mt-1"
                        style={{
                          fontFamily: isTH
                            ? "var(--font-body)"
                            : "var(--font-thai-head)",
                        }}
                      >
                        {s.subtitle}
                      </p>
                      <p
                        className={`text-[var(--color-text-warm)] text-sm mt-3 ${
                          isTH ? "leading-[1.9]" : "leading-[1.75]"
                        }`}
                        style={{ fontFamily: bodyFont, fontWeight: 300 }}
                      >
                        {s.summary}
                      </p>

                      <TreatmentList service={s} compact />
                    </div>
                  </article>
                </InView>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
