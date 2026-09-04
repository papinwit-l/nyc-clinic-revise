import Image from "next/image";
import { LineIcon } from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";

// NYC Clinic Thonglor — 136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6!2d100.5794!3d13.7367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee114e6b9a1%3A0x2b5e5c94e4a8b8a0!2sNYC+Clinic!5e0!3m2!1sth!2sth!4v1";

type Props = {
  t: Dictionary["home"]["contact"];
  tCommon: Dictionary["common"];
  locale: string;
};

export default function ContactCTA({ t, tCommon, locale }: Props) {
  const isTH = locale === "th";

  const labelFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label" style={{ fontFamily: labelFont }}>
            {t.label}
          </span>
          <h2
            className="section-heading text-3xl sm:text-4xl mt-3"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — contact info */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                style={{ fontFamily: labelFont }}
              >
                {tCommon.location}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                <span style={{ fontFamily: "var(--font-body)" }}>
                  NYC Clinic (New York Clinic, GR)
                </span>
                <br />
                <span
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                  }}
                >
                  {isTH
                    ? "136/2 ซ.สุขุมวิท 53 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110"
                    : "136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110"}
                </span>
              </p>
            </div>

            <div>
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                style={{ fontFamily: labelFont }}
              >
                {tCommon.phone}
              </h3>
              <a
                href={PHONE_HREF}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {PHONE}
              </a>
            </div>

            <div>
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                style={{ fontFamily: labelFont }}
              >
                {tCommon.hours}
              </h3>
              <p
                className="text-[var(--color-text-muted)] text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: bodyFont }}
              >
                {t.hoursValue}
              </p>
            </div>

            <div>
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                LINE Official
              </h3>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors inline-flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <LineIcon className="w-3.5 h-3.5" />
                @nycclinic
              </a>
            </div>

            <div>
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Instagram
              </h3>
              <a
                href="https://www.instagram.com/nycclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                @nycclinic
              </a>
            </div>
          </div>

          {/* Right — Google Maps */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[250px] bg-[var(--color-surface-dim)]">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
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
