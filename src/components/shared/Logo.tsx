import type { CSSProperties } from "react";

/**
 * Logo — coded wordmark, not a raster image.
 *
 * Matches nyc-clinic-branding-guideV3.html §03 "Logo System" exactly:
 * font, weight, tracking, gradient angle/stops, and per-variant color
 * rules are copied 1:1 from that file's .logo-text-lockup CSS so this
 * component IS the guide, not an approximation of it.
 *
 *   primary     — dark bg, rose-gold gradient (160deg, pale → gold → dark)
 *   light       — light bg, solid navy
 *   reversed    — rose-gold bg, solid white
 *   monochrome  — single-color applications, navy at reduced subline opacity
 *
 * Guide rule: "Never place the rose gold [primary] logo on a light
 * rose-gold background" — use `reversed` there instead.
 *
 * Fonts are pinned to --font-logo / --font-logo-sub, NOT --font-display /
 * --font-body. The wordmark must not change when the heading or body
 * typeface changes. Both resolve to Playfair Display / Montserrat.
 */

type Variant = "primary" | "light" | "reversed" | "monochrome";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  /** "full" shows the subline, "mark" is NYC only (tight header spots). */
  layout?: "full" | "mark";
  className?: string;
};

// Guide reference (.logo-text-lockup .letters) is 52px — treated as `lg`.
const LETTERS_SIZE: Record<Size, string> = {
  sm: "text-[28px]",
  md: "text-[38px]",
  lg: "text-[52px]",
};

// Guide reference (.logo-text-lockup .subline) is 10px — treated as `lg`.
const SUBLINE_SIZE: Record<Size, string> = {
  sm: "text-[8px]",
  md: "text-[9px]",
  lg: "text-[10px]",
};

const SUBLINE_GAP: Record<Size, string> = {
  sm: "mt-1",
  md: "mt-1.5",
  lg: "mt-2",
};

function lettersStyle(variant: Variant): CSSProperties {
  const base: CSSProperties = { fontFamily: "var(--font-logo)" };
  switch (variant) {
    case "primary":
      // .logo-text-lockup.on-dark .letters
      return {
        ...base,
        backgroundImage:
          "linear-gradient(160deg, var(--color-accent-pale) 0%, var(--color-accent) 40%, var(--color-accent-dark) 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      };
    case "reversed":
      // .logo-text-lockup.on-rose .letters
      return { ...base, color: "#ffffff" };
    case "monochrome":
      // .logo-text-lockup.monochrome .letters
      return { ...base, color: "var(--color-primary)" };
    case "light":
    default:
      // .logo-text-lockup.on-light .letters
      return { ...base, color: "var(--color-primary)" };
  }
}

function sublineStyle(variant: Variant): CSSProperties {
  const base: CSSProperties = { fontFamily: "var(--font-logo-sub)" };
  switch (variant) {
    case "primary":
      // .logo-text-lockup.on-dark .subline
      return { ...base, color: "var(--color-accent-pale)" };
    case "reversed":
      // .logo-text-lockup.on-rose .subline
      return { ...base, color: "rgba(255,255,255,0.8)" };
    case "monochrome":
      // .logo-text-lockup.monochrome .subline
      return { ...base, color: "var(--color-primary)", opacity: 0.5 };
    case "light":
    default:
      // .logo-text-lockup.on-light .subline
      return { ...base, color: "var(--color-text-muted)" };
  }
}

export default function Logo({
  variant = "light",
  size = "md",
  layout = "full",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex flex-col items-center text-center leading-none select-none ${className}`}
    >
      <span
        style={lettersStyle(variant)}
        className={`font-normal tracking-[0.08em] ${LETTERS_SIZE[size]}`}
      >
        NYC
      </span>
      {layout === "full" && (
        <span
          style={sublineStyle(variant)}
          className={`font-light tracking-[0.45em] uppercase whitespace-nowrap ${SUBLINE_SIZE[size]} ${SUBLINE_GAP[size]}`}
        >
          New York Clinic, GR
        </span>
      )}
    </span>
  );
}
