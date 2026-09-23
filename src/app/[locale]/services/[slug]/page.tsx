import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServiceSlugs } from "@/data/services";
import { getCasesByTreatment } from "@/data/cases";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { LineIcon } from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import SectionIntro from "@/components/shared/SectionIntro";
import InView from "@/components/shared/InView";

const LINE_URL = "https://lin.ee/7oJgymx";

/**
 * One service category.
 *
 * Deliberately WITHOUT doctor and FAQ blocks — both have homes elsewhere, and
 * repeating them on five service pages is padding.
 *
 * The closing CTA is a line, not a band: the site already has navy CTA bands
 * on /doctors and /about, and a fourth identical one here would read as
 * repetition. It is also service-specific rather than generic, which is what
 * keeps it from feeling like furniture.
 *
 * Treatments are ANCHORED SECTIONS, not pages. See the routing note at the
 * top of src/data/services.ts — that decision is marked for revisiting.
 */

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(locale, slug);
  if (!service) return {};
  return {
    title: `${service.title} — NYC Clinic`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getDictionary(locale as Locale);
  const isTH = locale === "th";

  const service = await getService(locale, slug);
  if (!service) notFound();

  const cases = await getCasesByTreatment(locale, slug, 3);

  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const hasTreatments = (service.treatments?.length ?? 0) > 0;

  return (
    <>
      <PageHeader
        label={service.subtitle}
        heading={service.title}
        description={service.summary}
        locale={locale}
      />

      {/* Overview — the hero image and the description list. For the two leaf
          services this is the whole page body, so it carries more weight. */}
      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
            <InView variant="rise">
              <div className="relative aspect-[4/3] w-full overflow-hidden radius-soft bg-[var(--color-surface-dim)]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </InView>

            <div>
              <SectionIntro
                label={t.services.detail.overview}
                heading={service.title}
                locale={locale}
              />
              <p
                className={`text-[var(--color-text-warm)] text-[1.05rem] mt-6 max-w-[56ch] ${
                  isTH ? "leading-[2]" : "leading-[1.9]"
                }`}
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
              >
                {service.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments — anchored sections. Skipped entirely for the two leaf
          services, which have no children. */}
      {hasTreatments && (
        <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <SectionIntro
              label={t.services.detail.treatments}
              heading={service.title}
              locale={locale}
              className="mb-12"
            />

            <div className="space-y-10">
              {service.treatments?.map((tr, i) => (
                <InView key={tr.slug} variant="rise">
                  <article
                    id={tr.slug}
                    className="relative scroll-mt-28 pt-10 first:pt-0"
                  >
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 45%, transparent 100%)",
                        }}
                      />
                    )}
                    <h2
                      className={`text-[var(--color-primary)] leading-tight ${
                        isTH ? "text-[1.25rem]" : "text-[1.35rem]"
                      }`}
                      style={{
                        fontFamily: titleFont,
                        fontWeight: isTH ? 600 : 500,
                      }}
                    >
                      {tr.title}
                    </h2>
                    <p
                      className={`text-[var(--color-text-warm)] text-[0.95rem] mt-2.5 max-w-[62ch] ${
                        isTH ? "leading-[1.95]" : "leading-[1.8]"
                      }`}
                      style={{ fontFamily: bodyFont, fontWeight: 300 }}
                    >
                      {tr.desc}
                    </p>
                  </article>
                </InView>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real results — reuses case data that already exists, so a service
          page gains substance without new copy. Renders nothing when this
          treatment has no cases yet. */}
      {cases.length > 0 && (
        <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <SectionIntro
              label={t.services.detail.results}
              heading={service.title}
              locale={locale}
              className="mb-10"
            />

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {cases.map((c, i) => (
                <InView key={c.slug} variant="rise" index={i}>
                  <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden radius-soft bg-white ring-1 ring-[var(--color-border)]">
                    <Image
                      src={c.image}
                      alt={`${c.treatment} — Before & After`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p
                    className={`text-[var(--color-primary)] mt-3 leading-tight ${
                      isTH ? "text-[1rem]" : "text-[1.05rem]"
                    }`}
                    style={{
                      fontFamily: titleFont,
                      fontWeight: isTH ? 600 : 500,
                    }}
                  >
                    {c.subcategory ?? c.treatment}
                  </p>
                </InView>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}/before-after/${service.slug}`}
                className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ fontFamily: bodyFont }}
              >
                {t.services.detail.resultsCta}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Closing line, not a band — see the note at the top of this file. */}
      <section className="bg-[var(--color-surface-dim)] py-14">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 text-center">
          <p
            className={`text-[var(--color-primary)] ${
              isTH ? "text-[1.15rem]" : "text-[1.25rem]"
            }`}
            style={{ fontFamily: titleFont, fontWeight: isTH ? 600 : 400 }}
          >
            {t.services.detail.consult}
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-5 inline-flex"
            style={{ fontFamily: bodyFont }}
          >
            <LineIcon className="w-5 h-5" />
            {t.services.detail.ctaLine}
          </a>
        </div>
      </section>
    </>
  );
}
