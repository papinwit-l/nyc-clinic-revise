import { CLINIC, LINE_URL, PHONE, PHONE_HREF, SOCIAL_URLS } from "@/lib/site";
import Image from "next/image";
import {
  LineIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TiktokIcon,
} from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";
import SectionHeader from "@/components/shared/SectionHeader";


// Match the Footer's social set + URLs exactly.
const SOCIALS = [
  {
    label: "Facebook",
    href: SOCIAL_URLS.facebook,
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: SOCIAL_URLS.instagram,
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: SOCIAL_URLS.tiktok,
    Icon: TiktokIcon,
  },
  { label: "LINE", href: LINE_URL, Icon: LineIcon },
  {
    label: "YouTube",
    href: SOCIAL_URLS.youtube,
    Icon: YoutubeIcon,
  },
];

type Props = {
  t: Dictionary["home"]["contact"];
  tCommon: Dictionary["common"];
  locale: string;
};

export default function ContactCTA({ t, tCommon, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* LEFT — the pitch + the action (left-aligned, conversion-first) */}
          <div className="flex flex-col">
            <SectionHeader
              section="contact"
              align="left"
              heading={t.readyTitle}
            />
            <p
              className="text-[var(--color-text-muted)] mt-3 max-w-md"
              style={{ fontFamily: bodyFont }}
            >
              {t.readySubtitle}
            </p>

            {/* Primary CTA — rose-gold accent, the section's focal action */}
            <div className="mt-7">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 text-sm font-semibold tracking-[0.12em] uppercase transition-colors"
                style={{ fontFamily: bodyFont }}
              >
                <LineIcon className="w-5 h-5" />
                {t.ctaLine}
              </a>
              <p
                className="text-sm text-[var(--color-text-subtle)] mt-3"
                style={{ fontFamily: bodyFont }}
              >
                {isTH ? "หรือโทร " : "or call "}
                <a
                  href={PHONE_HREF}
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {PHONE}
                </a>
              </p>
            </div>

            {/* Supporting details — demoted below the action */}
            <div className="mt-auto pt-8 border-t border-[var(--color-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                    style={{ fontFamily: bodyFont }}
                  >
                    {tCommon.location}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    <span style={{ fontFamily: "var(--font-body)" }}>
                      {CLINIC.name}
                    </span>
                    <br />
                    <span style={{ fontFamily: bodyFont }}>
                      {isTH ? CLINIC.address.th : CLINIC.address.en}
                    </span>
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                    style={{ fontFamily: bodyFont }}
                  >
                    {tCommon.hours}
                  </h3>
                  <p
                    className="text-[var(--color-text-muted)] text-sm leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: bodyFont }}
                  >
                    {CLINIC.hours
                      .map(
                        (h) =>
                          `${isTH ? h.days.th : h.days.en} ${isTH ? h.time.th : h.time.en}`,
                      )
                      .join("\n")}
                  </p>
                </div>
              </div>

              {/* Social channels */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mr-1"
                  style={{ fontFamily: bodyFont }}
                >
                  {isTH ? "ติดตามเรา" : "Follow us"}
                </span>
                {SOCIALS.map(({ label, href, Icon }) => (
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

          {/* RIGHT — Google Maps, fills the column height on desktop */}
          <div className="min-h-[360px] lg:min-h-full bg-[var(--color-surface-dim)]">
            <iframe
              src={CLINIC.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={
                isTH
                  ? "แผนที่ NYC Clinic ทองหล่อ"
                  : "NYC Clinic Thonglor Location"
              }
            />
          </div>

          {/* Full-width clinic photo */}
          <div className="lg:col-span-2 relative aspect-[16/9] overflow-hidden">
            <Image
              src="/images/contact-clinic-image.jpg"
              alt={
                isTH
                  ? "บรรยากาศภายใน NYC Clinic ทองหล่อ"
                  : "NYC Clinic Thonglor interior"
              }
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, var(--container-max)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
