import Image from "next/image";
import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";
import BeforeAfterRevealSlide from "./BeforeAfterRevealSlide";

type Props = {
  t: Dictionary["home"]["results"];
  tCommon: Dictionary["common"];
  locale: string;
  data: CaseCard[];
};

export default function BeforeAfterV2({ t, tCommon, locale, data }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  if (!data.length) return null;

  // First case leads as the interactive reveal; the rest fill the gallery.
  const featured = data[0];
  const gallery = data.slice(1);

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Magazine header row — heading left, CTA top-right on desktop.
            Deliberately breaks the centered-eyebrow → centered-CTA rhythm
            the other sections share. */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="section-label" style={{ fontFamily: bodyFont }}>
              {t.label}
            </span>
            <h2
              className="section-heading text-3xl sm:text-4xl mt-3"
              style={{ fontFamily: headFont }}
            >
              {t.heading}
            </h2>
            <p
              className="text-[var(--color-text-muted)] mt-3"
              style={{ fontFamily: bodyFont }}
            >
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/before-after`}
            className="hidden lg:inline-flex shrink-0 items-center text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.cta}
          </Link>
        </div>

        {/* ── Featured interactive reveal — the slider is NOT wrapped in a link
            (dragging must not navigate); the "view case" link lives in the copy. ── */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center mb-16 sm:mb-20">
          <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
            {featured.beforeImage && featured.afterImage && (
              <BeforeAfterRevealSlide
                beforeImage={{
                  src: featured.beforeImage,
                  alt: `${featured.treatment} — ${isTH ? "ก่อน" : "Before"}`,
                }}
                afterImage={{
                  src: featured.afterImage,
                  alt: `${featured.treatment} — ${isTH ? "หลัง" : "After"}`,
                }}
                locale={locale}
                index={0}
              />
            )}
          </div>

          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-dark)]"
              style={{ fontFamily: bodyFont }}
            >
              <ChevronsLeftRight size={15} />
              {isTH ? "ลากเพื่อเปรียบเทียบ" : "Drag to compare"}
            </span>

            <p
              className="text-[var(--color-text-muted)] text-base sm:text-lg leading-relaxed mt-4"
              style={{ fontFamily: bodyFont }}
            >
              {isTH
                ? "เลื่อนแถบเพื่อดูความเปลี่ยนแปลงก่อนและหลังจากผลงานจริง"
                : "Slide the handle to reveal the change — a real result, before and after."}
            </p>

            <div className="mt-6">
              <h3
                className="text-lg font-medium text-[var(--color-primary)]"
                style={{ fontFamily: bodyFont }}
              >
                {featured.treatment}
              </h3>
              <div className="flex items-center gap-2.5 mt-1.5 justify-center lg:justify-start">
                <span className="h-px w-4 bg-[var(--color-accent)]" />
                <p
                  className="text-xs text-[var(--color-text-subtle)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tCommon.by} {featured.doctor}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}/before-after/${featured.slug}`}
              className="inline-flex items-center mt-6 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              {isTH ? "ดูเคสนี้ →" : "View this case →"}
            </Link>
          </div>
        </div>

        {/* Airy lookbook gallery — image-forward, no card chrome */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {gallery.map(({ slug, image, treatment, doctor }) => (
              <Link
                key={slug}
                href={`/${locale}/before-after/${slug}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden radius-soft bg-[var(--color-surface-dim)]">
                  <Image
                    src={image}
                    alt={`${treatment} — Before & After`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* small proof marker — universal to this section, so meaningful
                      rather than the redundant per-card treatment repetition */}
                  <span
                    className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.14em] uppercase text-white/90 bg-[rgba(26,31,58,0.55)] backdrop-blur-sm px-2.5 py-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Before / After
                  </span>
                </div>

                <div className="pt-4">
                  {/* Treatment — font follows text language */}
                  <h3
                    className="text-base font-medium text-[var(--color-primary)]"
                    style={{ fontFamily: bodyFont }}
                  >
                    {treatment}
                  </h3>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    <span className="h-px w-4 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-8" />
                    <p
                      className="text-xs text-[var(--color-text-subtle)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tCommon.by} {doctor}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA — mobile only (desktop CTA lives in the header row) */}
        <div className="lg:hidden text-center mt-10">
          <Link
            href={`/${locale}/before-after`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
