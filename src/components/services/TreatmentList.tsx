import Link from "next/link";
import type { ServiceCard } from "@/types/service";

/**
 * Child services under a top-level service.
 *
 * Links to each child's OWN page (/services/rhinoplasty). They were anchors on
 * the parent page until the Sept 2026 flatten — see the note on ServiceCard
 * for why that changed.
 *
 * Shared by all three index layouts so they can't drift.
 */

type Props = {
  service: ServiceCard;
  locale: string;
  /** Tighter type and spacing, for the card layout. */
  compact?: boolean;
};

export default function TreatmentList({ service, locale, compact }: Props) {
  if (!service.children?.length) return null;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <ul
      className={`flex flex-wrap gap-x-5 gap-y-2 ${compact ? "mt-3" : "mt-5"}`}
    >
      {service.children.map((child) => (
        <li key={child.slug}>
          <Link
            href={`/${locale}/services/${child.slug}`}
            className={`inline-flex items-center gap-2 text-[var(--color-text-warm)] hover:text-[var(--color-accent-dark)] transition-colors ${
              compact ? "text-xs" : "text-sm"
            }`}
            style={{ fontFamily: bodyFont }}
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 shrink-0 rotate-45 border border-[var(--color-accent)]"
            />
            {child.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
