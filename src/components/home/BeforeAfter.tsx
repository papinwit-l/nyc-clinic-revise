import Image from "next/image";
import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";
import BeforeAfterRevealSlide from "./BeforeAfterRevealSlide";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  t: Dictionary["home"]["results"];
  tCommon: Dictionary["common"];
  locale: string;
  data: CaseCard[];
};

export default function BeforeAfter({ t, tCommon, locale, data }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  // Treatment names are Card Titles — display face, per the guide. Previously
  // every name in this section was set in the body face.
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  if (!data.length) return null;

  // First case leads as the interactive reveal; the rest fill the gallery.
  const featured = data[0];
  // One full row of three. More reads as too much unless the cases span
  // several services — revisit when the gallery genuinely diversifies.
  const gallery = data.slice(1, 4);

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Magazine header row — heading left, CTA top-right on desktop. */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <SectionHeader section="results" align="left" />
            <p
              className={`text-[var(--color-text-warm)] text-[1.05rem] mt-3.5 ${
                isTH ? "leading-[1.95]" : "leading-[1.85]"
              }`}
              style={{ fontFamily: bodyFont, fontWeight: 300 }}
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

        {/* ── Featured interactive reveal — slider on top, copy beneath,
            centered as the section's focal moment. The slider is NOT wrapped
            in a link (dragging must not navigate); the "view case" link lives
            in the copy. ── */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 gap-8">
          <div className="w-full max-w-3xl">
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
                aspect="4/3"
              />
            )}
          </div>

          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-dark)]"
              style={{ fontFamily: bodyFont }}
            >
              <ChevronsLeftRight size={15} />
              {isTH ? "ลากเพื่อเปรียบเทียบ" : "Drag to compare"}
            </span>

            <p
              className={`text-[var(--color-text-warm)] text-base sm:text-lg mt-4 ${
                isTH ? "leading-[1.95]" : "leading-[1.8]"
              }`}
              style={{ fontFamily: bodyFont, fontWeight: 300 }}
            >
              {isTH
                ? "เลื่อนแถบเพื่อดูความเปลี่ยนแปลงก่อนและหลังจากผลงานจริง"
                : "Slide the handle to reveal the change — a real result, before and after."}
            </p>

            <div className="mt-6">
              {/* Focus leads — it's what differs between cases. Treatment and
                  doctor sit beneath: currently near-constant, but the card
                  stays self-describing and needs no rework as data varies. */}
              <h3
                className={`text-[var(--color-primary)] leading-[1.2] ${
                  isTH ? "text-[1.45rem]" : "text-[clamp(1.5rem,2.4vw,1.95rem)]"
                }`}
                style={{ fontFamily: titleFont, fontWeight: isTH ? 600 : 400 }}
              >
                {featured.focus ?? featured.treatment}
              </h3>
              <div className="flex items-center gap-2.5 mt-2 justify-center">
                <span className="h-px w-4 bg-[var(--color-accent)]" />
                <p
                  className="text-xs text-[var(--color-text-subtle)]"
                  style={{ fontFamily: bodyFont }}
                >
                  {featured.focus ? `${featured.treatment} · ` : ""}
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
            {gallery.map(({ slug, image, treatment, focus, doctor }) => (
              <Link
                key={slug}
                href={`/${locale}/before-after/${slug}`}
                className="group block relative transition-transform duration-300 hover:-translate-y-1 hover:z-10"
              >
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden radius-soft bg-white ring-1 ring-[var(--color-border)] transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.03] group-hover:ring-[var(--color-border-accent)] group-hover:shadow-[0_18px_45px_rgba(26,31,58,0.22)]">
                  <Image
                    src={image}
                    alt={`${treatment} — Before & After`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="pt-4">
                  <h3
                    className={`text-[var(--color-primary)] leading-[1.3] transition-colors group-hover:text-[var(--color-accent)] ${
                      isTH ? "text-[1.05rem]" : "text-[1.15rem]"
                    }`}
                    style={{
                      fontFamily: titleFont,
                      fontWeight: isTH ? 600 : 500,
                    }}
                  >
                    {focus ?? treatment}
                  </h3>
                  <div className="flex items-center gap-2.5 mt-2">
                    <span className="h-px w-4 shrink-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-8" />
                    <p
                      className="text-xs text-[var(--color-text-subtle)]"
                      style={{ fontFamily: bodyFont }}
                    >
                      {focus ? `${treatment} · ` : ""}
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
