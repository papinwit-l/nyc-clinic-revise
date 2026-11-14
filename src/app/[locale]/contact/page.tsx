import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedFaqs } from "@/data/faq";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getSiteSettings } from "@/data/site-settings";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import PageHeader from "@/components/shared/PageHeader";
import SectionIntro from "@/components/shared/SectionIntro";
import FaqAccordion from "@/components/shared/FaqAccordion";

/**
 * Contact.
 *
 *   channels  — LINE (the primary, larger), phone, hours
 *   location  — address + directions link + socials | map
 *   FAQ       — short pick from the faq data; full list is /faq
 *
 * No form: every conversion goes through LINE or phone (project reference §7).
 * No closing CTA band either — LINE is the first thing on the page and the
 * floating widget is always present; a third ask would be furniture.
 *
 * Every value comes from Site Settings (getSiteSettings). Nothing about the
 * clinic is typed here.
 * Sharp corners throughout: structural content (radius policy).
 */

// An account left blank in Site Settings is skipped.
const SOCIALS = [
  { label: "Facebook", key: "facebook", Icon: FacebookIcon },
  { label: "Instagram", key: "instagram", Icon: InstagramIcon },
  { label: "TikTok", key: "tiktok", Icon: TiktokIcon },
  { label: "LINE", key: "line", Icon: LineIcon },
  { label: "YouTube", key: "youtube", Icon: YoutubeIcon },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  return {
    title: `${t.contact.hero.heading} — NYC Clinic`,
    description: t.contact.hero.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, faqs, site] = await Promise.all([
    getDictionary(locale as Locale),
    getFeaturedFaqs(locale),
    getSiteSettings(),
  ]);
  const CLINIC = site.clinic;
  const socials = SOCIALS.map((s) => ({
    ...s,
    href: s.key === "line" ? site.lineUrl : site.social[s.key],
  })).filter((s) => s.href);
  const c = t.contact;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const enFont = "var(--font-body)";

  const cardText = `text-[0.95rem] text-[var(--color-text-warm)] ${
    isTH ? "leading-[1.9]" : "leading-[1.75]"
  }`;

  return (
    <>
      <PageHeader
        label={c.hero.label}
        heading={c.hero.heading}
        description={c.hero.description}
        locale={locale}
      />

      {/* ── Channels ── */}
      <section className="bg-[var(--color-surface)] pt-14 pb-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-5">
            {/* LINE — primary */}
            <div className="bg-[var(--color-primary)] p-8 sm:p-10 flex flex-col">
              <span className="section-label">{c.line.label}</span>
              <p
                className="text-[1.75rem] leading-tight text-[var(--color-accent-pale)] pt-3"
                style={{ fontFamily: enFont, fontWeight: 500 }}
              >
                {site.lineId}
              </p>
              <p
                className={`pt-3 text-[0.95rem] text-[var(--color-on-primary-muted)] ${
                  isTH ? "leading-[1.9]" : "leading-[1.75]"
                }`}
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
              >
                {c.line.text}
              </p>
              <div className="mt-auto pt-7">
                <a
                  href={site.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 text-sm font-semibold transition-colors ${
                    isTH ? "" : "tracking-[0.12em] uppercase"
                  }`}
                  style={{ fontFamily: bodyFont }}
                >
                  <LineIcon className="w-5 h-5" />
                  {c.line.button}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[var(--color-surface-white)] border border-[var(--color-border-accent)] p-8 flex flex-col">
              <span className="section-label">{c.phone.label}</span>
              <a
                href={site.phoneHref}
                className="text-[1.75rem] leading-tight text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] transition-colors pt-3"
                style={{ fontFamily: enFont, fontWeight: 500 }}
              >
                {site.phone}
              </a>
              <p
                className={`pt-3 ${cardText}`}
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
              >
                {c.phone.text}
              </p>
            </div>

            {/* Hours */}
            <div className="bg-[var(--color-surface-white)] border border-[var(--color-border-accent)] p-8">
              <span className="section-label">{c.hours.label}</span>
              <dl className="pt-4 divide-y divide-[var(--color-border)]">
                {CLINIC.hours.map((h) => (
                  <div
                    key={h.days.en}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <dt
                      className="text-[0.95rem] text-[var(--color-text-warm)]"
                      style={{ fontFamily: bodyFont, fontWeight: 300 }}
                    >
                      {isTH ? h.days.th : h.days.en}
                    </dt>
                    <dd
                      className="text-[0.95rem] text-[var(--color-primary)] whitespace-nowrap"
                      style={{ fontFamily: bodyFont, fontWeight: 500 }}
                    >
                      {isTH ? h.time.th : h.time.en}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-stretch">
            <div className="flex flex-col">
              <SectionIntro
                label={c.location.label}
                heading={`NYC Clinic ${isTH ? CLINIC.branch.th : CLINIC.branch.en}`}
                locale={locale}
              />

              <address className="not-italic pt-6">
                <span
                  className="block text-sm text-[var(--color-text-subtle)]"
                  style={{ fontFamily: enFont }}
                >
                  {CLINIC.name}
                </span>
                <span
                  className={`block pt-1.5 text-[1.05rem] text-[var(--color-text-warm)] ${
                    isTH ? "leading-[1.9]" : "leading-[1.7]"
                  }`}
                  style={{ fontFamily: bodyFont }}
                >
                  {isTH ? CLINIC.address.th : CLINIC.address.en}
                </span>
              </address>

              <div className="pt-6">
                <a
                  href={CLINIC.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: bodyFont }}
                >
                  {c.location.directions}
                </a>
              </div>

              <div className="mt-auto pt-10">
                <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-3">
                  <span
                    className={`text-xs font-semibold text-[var(--color-text)] mr-1 ${
                      isTH ? "" : "tracking-[0.15em] uppercase"
                    }`}
                    style={{ fontFamily: bodyFont }}
                  >
                    {c.location.follow}
                  </span>
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-colors"
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-[380px] lg:min-h-[460px] bg-[var(--color-surface-dim)]">
              <iframe
                src={CLINIC.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 380, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={c.location.mapTitle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
          <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
            <div className="max-w-[760px] mx-auto">
              <SectionIntro
                label={c.faq.label}
                heading={c.faq.heading}
                locale={locale}
                className="mb-8"
              />
              <FaqAccordion items={faqs} locale={locale} group="contact-faq" />
              <div className="pt-8">
                <Link
                  href={`/${locale}/faq`}
                  className="text-sm font-medium text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: bodyFont }}
                >
                  {c.faq.viewAll}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
