import { sectionHeadings, type SectionKey } from "@/i18n/section-headings";

type Props = {
  section: SectionKey;
  /** Text alignment only — spacing is the call site's job (see className). */
  align?: "center" | "left";
  /**
   * Overrides the constant's heading. Only for sections whose title is
   * genuinely localised copy — ContactCTA's readyTitle. Do NOT use this
   * to pass dictionary strings for ordinary section headers; that's the
   * drift this file exists to prevent.
   */
  heading?: string;
  /** Extra classes on the <h2> — size/colour variations. */
  headingClassName?: string;
  /** Wrapper classes — this is where the section's margin goes. */
  className?: string;
};

export default function SectionHeader({
  section,
  align = "center",
  heading,
  headingClassName = "",
  className = "",
}: Props) {
  const s = sectionHeadings[section];
  const resolved = heading ?? ("heading" in s ? s.heading : undefined);

  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <span className="section-label" style={{ fontFamily: "var(--font-body)" }}>
        {s.label}
      </span>

      {resolved && (
        <h2
          className={`section-heading text-3xl sm:text-4xl mt-3 text-[var(--color-primary)] ${headingClassName}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {resolved}
        </h2>
      )}
    </div>
  );
}
