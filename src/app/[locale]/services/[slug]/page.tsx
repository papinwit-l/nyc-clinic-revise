import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getParentService, getServiceSlugs } from "@/data/services";
import { getCasesForService } from "@/data/cases";
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

  const cases = await getCasesForService(locale, slug, 3);

  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const children = service.children ?? [];
  // A child service — one of the fourteen treatments — gets a breadcrumb back
  // to its parent. Without it a visitor arriving from search has no route up.
  const parent = service.parent
    ? await getParentService(locale, service.parent)
    : null;
  const detail = service.detail;

  return (
    <>
      <PageHeader
        label={service.subtitle}
        heading={service.title}
        description={service.summary}
        locale={locale}
      />

      {parent && (
        <div className="bg-[var(--color-surface)] pt-8">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <Link
              href={`/${locale}/services/${parent.slug}`}
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              <span aria-hidden>&larr;</span>
              {t.services.detail.backTo} {parent.title}
            </Link>
          </div>
        </div>
      )}

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

      {/* Detail — intro, facts, who it suits, benefits. A deliberate subset
          of what the old site publishes; see the note on ServiceDetail. */}
      {detail && (
        <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            {/* Two columns: prose and facts left, the lists right. Stacked,
                each block sat alone in a full-width container with the right
                half empty — the text can't simply widen, because a 58ch
                measure is what keeps it readable. */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                {detail.intro?.length ? (
                  <div className="max-w-[58ch] space-y-5">
                    {detail.intro.map((p, i) => (
                      <InView key={i} variant="fade" index={i}>
                        <p
                          className={`text-[var(--color-text-warm)] text-[1.05rem] ${
                            isTH ? "leading-[2]" : "leading-[1.9]"
                          }`}
                          style={{ fontFamily: bodyFont, fontWeight: 300 }}
                        >
                          {p}
                        </p>
                      </InView>
                    ))}
                  </div>
                ) : null}

                {detail.facts?.length ? (
                  <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                    {detail.facts.map((f) => (
                      <div key={f.label}>
                        <p
                          className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-text-subtle)]"
                          style={{ fontFamily: bodyFont }}
                        >
                          {f.label}
                        </p>
                        <p
                          className={`text-[var(--color-primary)] mt-1.5 ${
                            isTH ? "text-[1.15rem]" : "text-[1.25rem]"
                          }`}
                          style={{
                            fontFamily: titleFont,
                            fontWeight: isTH ? 600 : 400,
                          }}
                        >
                          {f.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Right column. goodFor and benefits STACK here rather than
                  sitting in their own two-column grid — Rhinoplasty has no
                  benefits, and a half-filled grid left a visibly empty cell. */}
              <div className="space-y-10">
                {detail.goodFor?.length ? (
                  <div>
                    <h2
                      className={`text-[var(--color-primary)] ${
                        isTH ? "text-[1.2rem]" : "text-[1.3rem]"
                      }`}
                      style={{
                        fontFamily: titleFont,
                        fontWeight: isTH ? 600 : 500,
                      }}
                    >
                      {t.services.detail.goodFor}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {detail.goodFor.map((item) => (
                        <li key={item} className="flex gap-3 items-start">
                          <span
                            aria-hidden
                            className="shrink-0 w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)] mt-2"
                          />
                          <span
                            className={`text-[var(--color-text-warm)] text-[0.95rem] ${
                              isTH ? "leading-[1.9]" : "leading-[1.75]"
                            }`}
                            style={{ fontFamily: bodyFont }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.benefits?.length ? (
                  <div>
                    <h2
                      className={`text-[var(--color-primary)] ${
                        isTH ? "text-[1.2rem]" : "text-[1.3rem]"
                      }`}
                      style={{
                        fontFamily: titleFont,
                        fontWeight: isTH ? 600 : 500,
                      }}
                    >
                      {t.services.detail.benefits}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {detail.benefits.map((item) => (
                        <li key={item} className="flex gap-3 items-start">
                          <span
                            aria-hidden
                            className="shrink-0 w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)] mt-2"
                          />
                          <span
                            className={`text-[var(--color-text-warm)] text-[0.95rem] ${
                              isTH ? "leading-[1.9]" : "leading-[1.75]"
                            }`}
                            style={{ fontFamily: bodyFont }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Service-specific FAQ. Distinct from the general /faq page —
                these questions are about this treatment only. */}
            {detail.faq?.length ? (
              <div className="mt-14 max-w-[70ch]">
                <h2
                  className={`text-[var(--color-primary)] ${
                    isTH ? "text-[1.2rem]" : "text-[1.3rem]"
                  }`}
                  style={{
                    fontFamily: titleFont,
                    fontWeight: isTH ? 600 : 500,
                  }}
                >
                  {t.services.detail.faq}
                </h2>
                <dl className="mt-5 divide-y divide-[var(--color-border)]">
                  {detail.faq.map((item) => (
                    <div key={item.q} className="py-5">
                      <dt
                        className={`text-[var(--color-primary)] ${
                          isTH ? "text-[1rem]" : "text-[1.05rem]"
                        }`}
                        style={{ fontFamily: bodyFont, fontWeight: 600 }}
                      >
                        {item.q}
                      </dt>
                      <dd
                        className={`text-[var(--color-text-warm)] text-[0.95rem] mt-2 ${
                          isTH ? "leading-[1.95]" : "leading-[1.8]"
                        }`}
                        style={{ fontFamily: bodyFont, fontWeight: 300 }}
                      >
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Children — cards linking to their own pages. Until the Sept 2026
          flatten these were anchored sections on this page; see the note on
          ServiceCard. A parent page is now a hub, not a long scroll. */}
      {children.length > 0 && (
        <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <SectionIntro
              label={t.services.detail.treatments}
              heading={t.services.detail.treatmentsHeading}
              locale={locale}
              className="mb-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child, i) => (
                <InView key={child.slug} variant="rise" index={i % 3}>
                  <Link
                    href={`/${locale}/services/${child.slug}`}
                    className="group block h-full bg-white radius-soft ring-1 ring-[var(--color-border)] p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(26,31,58,0.14)]"
                  >
                    <h2
                      className={`text-[var(--color-primary)] leading-tight transition-colors group-hover:text-[var(--color-accent)] ${
                        isTH ? "text-[1.15rem]" : "text-[1.25rem]"
                      }`}
                      style={{
                        fontFamily: titleFont,
                        fontWeight: isTH ? 600 : 500,
                      }}
                    >
                      {child.title}
                    </h2>
                    <p
                      className={`text-[var(--color-text-warm)] text-sm mt-2.5 ${
                        isTH ? "leading-[1.9]" : "leading-[1.75]"
                      }`}
                      style={{ fontFamily: bodyFont, fontWeight: 300 }}
                    >
                      {child.desc}
                    </p>
                  </Link>
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
