import Image from "next/image";
import { LineIcon, InstagramIcon } from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";
const IG_URL = "https://www.instagram.com/nycclinic/";

// NYC Clinic Thonglor — 136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6!2d100.5794!3d13.7367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee114e6b9a1%3A0x2b5e5c94e4a8b8a0!2sNYC+Clinic!5e0!3m2!1sth!2sth!4v1";

type Props = {
  t: Dictionary["home"]["contact"];
  tCommon: Dictionary["common"];
  locale: string;
};

export default function ContactCTAV2({ t, tCommon, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* LEFT — the pitch + the action (left-aligned, conversion-first) */}
          <div className="flex flex-col">
            <span className="section-label" style={{ fontFamily: bodyFont }}>
              {t.label}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <div className="flex-1">
                <h2
                  className="section-heading text-3xl sm:text-4xl mt-3 text-[var(--color-primary)]"
                  style={{ fontFamily: headFont }}
                >
                  {t.readyTitle}
                </h2>
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
              </div>

              {/* LINE QR — intrinsic size, white pad for scannability, sharp per rule */}
              <div className="shrink-0 self-center sm:self-start">
                <Image
                  src="/images/line-qr.png"
                  alt={isTH ? "คิวอาร์โค้ด LINE" : "LINE QR code"}
                  width={144}
                  height={144}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain bg-white p-2 border border-[var(--color-border)]"
                />
                <p
                  className="text-[11px] text-center text-[var(--color-text-subtle)] mt-2"
                  style={{ fontFamily: bodyFont }}
                >
                  {isTH ? "สแกนเพื่อแอดไลน์" : "Scan to add LINE"}
                </p>
              </div>
            </div>
            {/* Supporting details — demoted below the action */}
            <div className="mt-auto pt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3
                  className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2"
                  style={{ fontFamily: bodyFont }}
                >
                  {tCommon.location}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  <span style={{ fontFamily: "var(--font-body)" }}>
                    NYC Clinic (New York Clinic, GR)
                  </span>
                  <br />
                  <span style={{ fontFamily: bodyFont }}>
                    {isTH
                      ? "136/2 ซ.สุขุมวิท 53 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110"
                      : "136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110"}
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
                  {t.hoursValue}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <LineIcon className="w-3.5 h-3.5" />
                    @nycclinic
                  </a>
                  <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    @nycclinic
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Google Maps, fills the column height on desktop */}
          <div className="min-h-[360px] lg:min-h-full bg-[var(--color-surface-dim)]">
            <iframe
              src={MAP_EMBED}
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
