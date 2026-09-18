import type { Metadata } from "next";
import { getServices } from "@/data/services";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/shared/PageHeader";
import ServicesIndex from "@/components/services/ServicesIndex";

/**
 * No closing CTA here, deliberately: the cards ARE the call to action. A LINE
 * button on the index short-circuits the funnel — index converts to a service
 * page, the service page converts to LINE.
 *
 * No signature hero tile either. The homepage already gives Nose Thread Lift a
 * large tile with a SIGNATURE badge; repeating it would be the most
 * duplicative element on the page. It still leads the list and keeps the badge.
 */

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
  const services = await getServices(locale);

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
          {/* ⚠ ServicesIndex is a REVIEW AID holding the layout toggle.
              Once marketing chooses, delete it and map over the chosen
              layout component here — both are server components. */}
          <ServicesIndex
            services={services}
            locale={locale}
            signatureLabel={t.services.signature}
          />
        </div>
      </section>
    </>
  );
}
