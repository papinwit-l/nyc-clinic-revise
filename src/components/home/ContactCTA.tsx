import { LineIcon } from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.56!3d13.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzI0LjAiTiAxMDDCsDMzJzM2LjAiRQ!5e0!3m2!1sth!2sth!4v1";

type Props = {
  t: Dictionary["home"]["contact"];
  tCommon: Dictionary["common"];
};

export default function ContactCTA({ t, tCommon }: Props) {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                {tCommon.location}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                NYC Clinic (New York Clinic, GR)
                <br />
                กรุงเทพมหานคร
              </p>
            </div>
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                {tCommon.phone}
              </h3>
              <a
                href={PHONE_HREF}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
              >
                {PHONE}
              </a>
            </div>
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                {tCommon.hours}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed whitespace-pre-line">
                {t.hoursValue}
              </p>
            </div>
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                LINE Official
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                @nyc-clinic
              </p>
            </div>

            <div className="bg-[var(--color-primary)] p-6 sm:p-8 text-center">
              <p className="font-[var(--font-thai-head)] text-lg text-white font-medium">
                {t.readyTitle}
              </p>
              <p className="font-[var(--font-accent)] text-[var(--color-accent-pale)] italic text-sm mt-1">
                {t.readySubtitle}
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line mt-5 inline-flex"
              >
                <LineIcon className="w-5 h-5" />
                {t.ctaLine}
              </a>
            </div>
          </div>

          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-[var(--color-surface-dim)]">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NYC Clinic Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
