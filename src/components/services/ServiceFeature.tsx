import Image from "next/image";
import Link from "next/link";
import type { ServiceCard } from "@/types/service";
import InView from "@/components/shared/InView";
import TreatmentList from "./TreatmentList";

/**
 * Editorial layout — a large image alternating left/right against the text.
 *
 * Answers the "directory lacks visual" feedback without going back to cards:
 * the 220px thumbnail in ServiceRow was too small to carry a service, but a
 * card grid hides the treatment names that make this page worth visiting.
 *
 * Alternation reuses the DoctorCard pattern rather than inventing one. Five
 * services is enough for it to read as rhythm; three would look accidental.
 *
 * Below lg the grid stacks and the image always comes first — a reversed
 * stack would put a name above a service with no image in view yet.
 *
 * Each block is its own FULL-BLEED section with an alternating ground. The
 * page deliberately does NOT wrap this layout in a container — earlier
 * attempts to escape one with negative margins (cancels padding only) and
 * then w-screen (clipped by the overflow-hidden guard) both left the band
 * stopping short and reading as a floating panel.
 *
 * Inside
 * one shared container the tint would stop at the container edge and read as a
 * mistake. Two tones only — a third would compete with the navy page header.
 *
 * Note this produces a checkerboard: the image side flips AND the background
 * flips. If that reads busy, fix the image side and alternate only the ground.
 */

type Props = {
  service: ServiceCard;
  locale: string;
  index: number;
  signatureLabel: string;
};

export default function ServiceFeature({
  service,
  locale,
  index,
  signatureLabel,
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const flipped = index % 2 === 1;

  return (
    <section
      className={`py-14 sm:py-20 ${
        flipped ? "bg-[var(--color-surface-dim)]" : "bg-[var(--color-surface)]"
      }`}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <InView variant="rise">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <Link
              href={`/${locale}/services/${service.slug}`}
              className={`group relative block aspect-[4/3] overflow-hidden radius-soft bg-[var(--color-surface-dim)] lg:col-span-5 ${
                flipped ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {service.signature && (
                <span className="badge absolute top-4 left-4">
                  {signatureLabel}
                </span>
              )}
            </Link>

            <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
              <h2
                className={`text-[var(--color-primary)] leading-tight ${
                  isTH ? "text-[1.6rem]" : "text-[1.85rem]"
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
                className="text-[var(--color-accent)] text-sm mt-1.5"
                style={{
                  fontFamily: isTH
                    ? "var(--font-body)"
                    : "var(--font-thai-head)",
                }}
              >
                {service.subtitle}
              </p>

              <div
                aria-hidden
                className="h-px w-14 mt-4"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent), var(--color-border-accent))",
                }}
              />

              <p
                className={`text-[var(--color-text-warm)] text-[1rem] mt-4 max-w-[52ch] ${
                  isTH ? "leading-[1.95]" : "leading-[1.85]"
                }`}
                style={{ fontFamily: bodyFont, fontWeight: 300 }}
              >
                {service.summary}
              </p>

              <TreatmentList service={service} locale={locale} />
            </div>
          </article>
        </InView>
      </div>
    </section>
  );
}
