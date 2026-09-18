import Image from "next/image";
import Link from "next/link";
import type { ServiceCard } from "@/types/service";
import InView from "@/components/shared/InView";
import TreatmentList from "./TreatmentList";

/**
 * Card layout — image on top, summary and treatment list inside.
 *
 * Keeps imagery, so it sits closer to the homepage than the directory does —
 * but the arrangement differs (three-up grid rather than hero + 2x2) and the
 * treatment names give it detail the homepage grid has no room for.
 */

type Props = {
  service: ServiceCard;
  locale: string;
  index: number;
  signatureLabel: string;
};

export default function ServiceCardItem({
  service,
  locale,
  index,
  signatureLabel,
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <InView variant="rise" index={index % 3}>
      <article className="h-full flex flex-col overflow-hidden bg-white radius-soft ring-1 ring-[var(--color-border)]">
        <Link
          href={`/${locale}/services/${service.slug}`}
          className="group relative aspect-[4/3] block overflow-hidden"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {service.signature && (
            <span className="badge absolute top-3 left-3">
              {signatureLabel}
            </span>
          )}
        </Link>

        <div className="p-6 flex flex-col flex-1">
          <h2
            className={`text-[var(--color-primary)] leading-tight ${
              isTH ? "text-[1.15rem]" : "text-[1.25rem]"
            }`}
            style={{ fontFamily: titleFont, fontWeight: isTH ? 600 : 500 }}
          >
            <Link
              href={`/${locale}/services/${service.slug}`}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              {service.title}
            </Link>
          </h2>
          <p
            className="text-[var(--color-accent)] text-sm mt-1"
            style={{
              fontFamily: isTH ? "var(--font-body)" : "var(--font-thai-head)",
            }}
          >
            {service.subtitle}
          </p>
          <p
            className={`text-[var(--color-text-warm)] text-sm mt-3 ${
              isTH ? "leading-[1.9]" : "leading-[1.75]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {service.summary}
          </p>

          <TreatmentList service={service} locale={locale} compact />
        </div>
      </article>
    </InView>
  );
}
