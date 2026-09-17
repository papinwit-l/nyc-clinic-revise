import type { ReactNode } from "react";

/**
 * Section intro for inner pages: diamond + eyebrow + rule on one row, heading
 * on its own line beneath.
 *
 * Extracted after /about grew three sections using two different heading
 * treatments. Distinct from SectionHeader, which is the homepage's centred
 * eyebrow + h2 — inner-page sections are left-aligned and sit above narrower
 * content, where centred flanking rules look wrong.
 *
 * The diamond and rule share a row with the EYEBROW, not with the whole block.
 * When all three were flex children of a two-line block, items-center put the
 * diamond and rule between the two lines, attached to neither.
 */

type Props = {
  label: string;
  heading: string;
  /** Optional third line, e.g. a branch name under a gallery heading. */
  meta?: ReactNode;
  locale: string;
  className?: string;
};

export default function SectionIntro({
  label,
  heading,
  meta,
  locale,
  className = "",
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="w-2.5 h-2.5 shrink-0 rotate-45 border border-[var(--color-accent)]"
        />
        <span className="section-label shrink-0">{label}</span>
        <span
          aria-hidden
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, var(--color-border-accent), transparent)",
          }}
        />
      </div>

      <p
        className={`text-[var(--color-primary)] mt-3 ${
          isTH ? "text-[1.35rem]" : "text-[1.5rem]"
        }`}
        style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 500 }}
      >
        {heading}
      </p>

      {meta && (
        <p
          className="text-[var(--color-text-subtle)] text-xs tracking-[0.2em] uppercase mt-2"
          style={{ fontFamily: bodyFont, fontWeight: 500 }}
        >
          {meta}
        </p>
      )}
    </div>
  );
}
