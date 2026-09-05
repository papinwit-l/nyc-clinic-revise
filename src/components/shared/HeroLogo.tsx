/**
 * HeroLogo — the hero-scale animated wordmark.
 *
 * Deliberately NOT the same component as `Logo.tsx`. That one is the
 * canonical brand lockup from nyc-clinic-branding-guideV3.html §03 and is
 * left untouched. This is the hero-only treatment: heavier weight, wider
 * letter tracking, tighter subline tracking, and the sweeping rose-gold
 * shimmer. Values below are carried over verbatim from Hero.tsx.
 *
 * Fonts are pinned to --font-logo / --font-logo-sub rather than
 * --font-display / --font-body, so a change of heading typeface cannot
 * restyle the wordmark.
 *
 * Note: Hero previously also set `text-white` on the letters. It was dead —
 * `.shimmer-text` sets -webkit-text-fill-color: transparent and supplies its
 * own gradient. Dropped here rather than carried over.
 *
 * Reduced motion is handled globally in globals.css.
 */

type Props = {
  /** Rendered on the wrapper — Hero passes hero-text-shadow. */
  className?: string;
};

export default function HeroLogo({ className = "" }: Props) {
  return (
    <span className={`block ${className}`}>
      <span
        className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-[0.1em] leading-none shimmer-text"
        style={{ fontFamily: "var(--font-logo)" }}
      >
        NYC
      </span>
      <span
        className="block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-on-primary-muted)] mt-3"
        style={{ fontFamily: "var(--font-logo-sub)" }}
      >
        New York Clinic, GR
      </span>
    </span>
  );
}
