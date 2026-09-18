import Image from "next/image";
import Link from "next/link";
import type { ServiceCard } from "@/types/service";
import InView from "@/components/shared/InView";
import TreatmentList from "./TreatmentList";

/**
 * Directory layout — one service as a stacked row: name, summary, treatments,
 * with a thumbnail to the side.
 *
 * Dense and scannable. Answers "which one do I need?", which is what someone
 * on /services wants — they have already seen the five categories on the
 * homepage.
 */

type Props = {
  service: ServiceCard;
  locale: string;
  index: number;
  signatureLabel: string;
};

export default function ServiceRow({
  service,
  locale,
  index,
  signatureLabel,
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <InView variant="rise">
      <article className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 sm:gap-10 items-start pt-12 first:pt-0">
        {index > 0 && (
          <span
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 45%, transparent 100%)",
            }}
          />
        )}

        <div className="max-w-[60ch]">
          {service.signature && (
            <span className="badge mb-3 inline-block">{signatureLabel}</span>
          )}
          <h2
            className={`text-[var(--color-primary)] leading-tight ${
              isTH ? "text-[1.5rem]" : "text-[1.7rem]"
            }`}
            style={{ fontFamily: titleFont, fontWeight: isTH ? 600 : 400 }}
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
            className={`text-[var(--color-text-warm)] text-[0.95rem] mt-3 ${
              isTH ? "leading-[1.9]" : "leading-[1.8]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {service.summary}
          </p>

          <TreatmentList service={service} locale={locale} />
        </div>

        <Link
          href={`/${locale}/services/${service.slug}`}
          className="group relative w-full sm:w-[220px] aspect-[4/3] shrink-0 overflow-hidden radius-soft bg-[var(--color-surface-dim)]"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 220px"
          />
        </Link>
      </article>
    </InView>
  );
}
