import Link from "next/link";
import type { ServiceCard } from "@/types/service";

/**
 * Treatment names under a service.
 *
 * Links to the treatment's ANCHOR on the category page
 * (/services/surgery#rhinoplasty) — treatments are sections there, not pages
 * of their own. See the routing note at the top of src/data/services.ts; that
 * decision is marked for revisiting.
 *
 * Shared by both index layouts so the two can't drift.
 */

type Props = {
  service: ServiceCard;
  locale: string;
  /** Tighter type and spacing, for the card layout. */
  compact?: boolean;
};

export default function TreatmentList({ service, locale, compact }: Props) {
  if (!service.treatments?.length) return null;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <ul
      className={`flex flex-wrap gap-x-5 gap-y-2 ${compact ? "mt-3" : "mt-5"}`}
    >
      {service.treatments.map((tr) => (
        <li key={tr.slug}>
          <Link
            href={`/${locale}/services/${service.slug}#${tr.slug}`}
            className={`inline-flex items-center gap-2 text-[var(--color-text-warm)] hover:text-[var(--color-accent-dark)] transition-colors ${
              compact ? "text-xs" : "text-sm"
            }`}
            style={{ fontFamily: bodyFont }}
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 shrink-0 rotate-45 border border-[var(--color-accent)]"
            />
            {tr.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
