import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  t: Dictionary["home"]["about"];
  locale: string;
};

export default function About({ t, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  // Quote uses the brand's quote face: Cormorant italic (EN) / Mitr (TH).
  const quoteFont = isTH ? "var(--font-thai-serif)" : "var(--font-accent)";

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-dim)] py-[var(--section-py)]">
      {/* Concentric-circle brand motif — large, soft backdrop behind the copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full right-[-18%] top-1/2 -translate-y-1/2 w-[min(60vw,780px)] aspect-square opacity-70"
        style={{
          border: "1px solid var(--color-border-accent)",
          boxShadow:
            "inset 0 0 0 60px rgba(196,149,106,0.04), inset 0 0 0 61px rgba(196,149,106,0.10), inset 0 0 0 170px rgba(196,149,106,0.03), inset 0 0 0 171px rgba(196,149,106,0.08)",
        }}
      />

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6">
        <SectionHeader section="about" align="left" />
        <div className="divider-accent mt-4" />

        {/* Two even columns, vertically centred so neither side is top-heavy */}
        <div className="grid gap-x-10 lg:gap-x-16 gap-y-10 lg:grid-cols-2 items-center mt-10 sm:mt-12">
          {/* Quote — the hero, sized to fill its column */}
          <figure className="relative">
            <span
              aria-hidden
              className="absolute -top-8 -left-1 text-[4rem] leading-none text-[var(--color-border-accent)] select-none"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              &ldquo;
            </span>
            <blockquote
              className="relative text-[clamp(1.9rem,3.6vw,2rem)] leading-[1.3] text-[var(--color-primary)]"
              style={{
                fontFamily: quoteFont,
                fontStyle: isTH ? "normal" : "italic",
              }}
            >
              {t.quote}
            </blockquote>

            <figcaption className="mt-7 pt-5 border-t border-[var(--color-border)]">
              <p
                className="font-semibold text-[var(--color-primary)]"
                style={{
                  fontFamily: isTH
                    ? "var(--font-thai-head)"
                    : "var(--font-body)",
                }}
              >
                {t.quoteName}
              </p>
              <p
                className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-1"
                style={{ fontFamily: bodyFont }}
              >
                {t.quoteRole}
              </p>
            </figcaption>
          </figure>

          {/* Clinic bio — supporting, centred against the quote block */}
          <div className="lg:pl-6">
            <p
              className="text-[var(--color-text-muted)] text-[1.05rem] leading-loose max-w-[46ch]"
              style={{ fontFamily: bodyFont }}
            >
              {t.bio}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              {t.cta}
            </Link>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-[var(--color-border)] grid gap-8 sm:grid-cols-3">
          {t.pillars.map((p) => (
            <div key={p.title}>
              <span
                aria-hidden
                className="block w-2.5 h-2.5 border border-[var(--color-accent)] rotate-45 mb-4"
              />
              <h3
                className="text-base font-semibold text-[var(--color-primary)]"
                style={{
                  fontFamily: isTH
                    ? "var(--font-thai-head)"
                    : "var(--font-body)",
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-1.5"
                style={{ fontFamily: bodyFont }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
