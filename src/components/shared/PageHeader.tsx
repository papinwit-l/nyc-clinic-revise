import type { ReactNode } from "react";

/**
 * Inner-page header. First used on /doctors; intended for /services,
 * /before-after, /blog and /contact too.
 *
 * Navy ground with a rose-gold gradient heading — the guide's "rose-gold
 * gradient on dark backgrounds for maximum impact", using the same
 * background-clip technique as the hero logo and the Trust Bar numerals.
 *
 * Deliberately NOT parameterised beyond strings. No variant/align/background
 * props until a second page actually needs something different — guessing at
 * those now produces options nobody uses.
 *
 * `pt` accounts for the fixed header.
 */

/** Thai script takes neither tracking nor uppercase — see .section-label-thai. */
const HAS_THAI = /[\u0E00-\u0E7F]/;

type Props = {
  /** Small tracked eyebrow above the heading. */
  label: string;
  heading: string;
  description?: ReactNode;
  locale: string;
};

export default function PageHeader({
  label,
  heading,
  description,
  locale,
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Vertical gradient lines — the guide's third design element.
          Desktop only: below lg there is no margin to put them in. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {["12%", "15.5%", "84.5%", "88%"].map((left, i) => (
          <span
            key={left}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left,
              opacity: i === 0 || i === 3 ? 0.5 : 0.25,
              background:
                "linear-gradient(180deg, transparent 0%, var(--color-accent) 30%, var(--color-accent) 70%, transparent 100%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 sm:px-12 text-center">
        <span
          className={
            HAS_THAI.test(label)
              ? "section-label section-label-thai"
              : "section-label"
          }
          style={{
            fontFamily: HAS_THAI.test(label)
              ? "var(--font-thai-body)"
              : "var(--font-body)",
          }}
        >
          {label}
        </span>

        <h1
          className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.15] mt-4"
          style={{
            fontFamily: headFont,
            fontWeight: isTH ? 600 : 400,
            letterSpacing: isTH ? "0" : "-0.01em",
            backgroundImage:
              "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent-pale) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {heading}
        </h1>

        {/* Diamond divider — the brand element, gradient rules either side */}
        <div
          aria-hidden
          className="flex items-center justify-center gap-3 mt-6"
        >
          <span
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent))",
            }}
          />
          <span className="w-2 h-2 rotate-45 border border-[var(--color-accent)]" />
          <span
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent), transparent)",
            }}
          />
        </div>

        {description && (
          <p
            className={`text-[var(--color-on-primary-muted)] mt-6 max-w-xl mx-auto ${
              isTH
                ? "text-[0.95rem] leading-[1.95]"
                : "text-base leading-[1.85]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
