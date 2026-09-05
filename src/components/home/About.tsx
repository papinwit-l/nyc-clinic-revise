import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  t: Dictionary["home"]["about"];
  locale: string;
};

export default function About({ t, locale }: Props) {
  const isTH = locale === "th";

  // Thai type assignment for this section:
  //   quote            Mitr 300      (pairs with Cormorant italic)
  //   pillar titles    Anuphan 600   (the only true heading here)
  //   everything else  Prompt, weight carries the role
  const quoteFont = isTH ? "var(--font-thai-serif)" : "var(--font-accent)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const pillarTitleFont = isTH
    ? "var(--font-thai-head)"
    : "var(--font-display)";

  return (
    <section
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        // Tonal split — quote sits in the darker tone, pillars land on cream.
        background:
          "linear-gradient(180deg, var(--color-surface-dim) 0%, var(--color-surface-dim) 26%, var(--color-surface) 58%, var(--color-surface) 100%)",
      }}
    >
      {/* No backdrop ornament. Variant 4 — the tonal split and the image
          column are carrying the section on their own. Panel + gradient-line
          variant preserved in git history if this reads as too bare. */}

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6">
        <SectionHeader section="about" align="left" />
        <div className="divider-accent mt-4" />

        {/* Editorial column spans 2 of 3; the image column fills the third. */}
        <div className="mt-10 sm:mt-12 grid gap-10 lg:gap-14 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2 lg:order-1">
            <figure className="relative">
              <span
                aria-hidden
                className="absolute -top-9 -left-1.5 text-[4.5rem] leading-none text-[var(--color-border-accent)] select-none"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className={`relative text-[var(--color-primary)] ${
                  isTH
                    ? "text-[clamp(1.55rem,3.6vw,2.1rem)] leading-[1.65]"
                    : "text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.22]"
                }`}
                style={{
                  fontFamily: quoteFont,
                  fontStyle: isTH ? "normal" : "italic",
                  fontWeight: 300,
                  letterSpacing: isTH ? "0.01em" : "0.005em",
                }}
              >
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 pt-4 border-t border-[var(--color-border)]">
                <p
                  className={`text-[var(--color-primary)] ${
                    isTH ? "text-[0.95rem]" : "text-[0.9rem] tracking-[0.04em]"
                  }`}
                  style={{ fontFamily: bodyFont, fontWeight: 600 }}
                >
                  {t.quoteName}
                </p>
                <p
                  className={`text-[var(--color-accent-dark)] leading-relaxed mt-1.5 ${
                    isTH ? "text-[0.82rem]" : "text-[0.78rem] tracking-[0.05em]"
                  }`}
                  style={{ fontFamily: bodyFont, fontWeight: isTH ? 400 : 500 }}
                >
                  {t.quoteRole}
                </p>
              </figcaption>
            </figure>

            <div className="mt-9 sm:mt-11">
              <p
                className={`text-[var(--color-text-warm)] text-[1.05rem] ${
                  isTH ? "leading-[2]" : "leading-[1.9]"
                }`}
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
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

          {/* Facility image — 2:3 portrait. Sharp corners: the radius system
              reserves soft/7px for Doctors, Services, B&A and Testimonials. */}
          <div className="lg:col-span-1 lg:order-2">
            <div
              aria-hidden
              className="relative w-full aspect-[2/3] overflow-hidden bg-[var(--color-surface-dim)] border border-[var(--color-border)]"
            >
              {/* TODO: swap for <Image src="/about-facility.jpg" fill sizes="(min-width:1024px) 33vw, 100vw" alt="" className="object-cover" /> */}
              <span className="absolute inset-0 grid place-items-center text-[var(--color-text-subtle)] text-xs tracking-[0.2em] uppercase">
                Facility 2:3
              </span>
            </div>
          </div>
        </div>

        {/* Pillars — each column carries the brand's diamond divider: a
            hairline rule with the diamond sitting astride it, knocking out
            the line behind. Replaces the bare rotate-45 square, which quoted
            only half the element. */}
        <div className="mt-14 sm:mt-16 grid gap-8 sm:gap-10 sm:grid-cols-3">
          {t.pillars.map((p) => (
            <div key={p.title} className="relative pt-9">
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 45%, transparent 100%)",
                }}
              />
              <span
                aria-hidden
                className="absolute -top-[5px] left-0 w-2.5 h-2.5 rotate-45 border border-[var(--color-accent)] bg-[var(--color-surface)]"
              />
              <h3
                className={`text-[var(--color-primary)] leading-[1.4] ${
                  isTH ? "text-[1.15rem]" : "text-[1.25rem]"
                }`}
                style={{
                  fontFamily: pillarTitleFont,
                  fontWeight: isTH ? 600 : 500,
                }}
              >
                {p.title}
              </h3>
              <p
                className={`text-[var(--color-text-warm)] text-sm mt-2 ${
                  isTH ? "leading-[1.9]" : "leading-[1.75]"
                }`}
                style={{ fontFamily: bodyFont, fontWeight: 400 }}
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
