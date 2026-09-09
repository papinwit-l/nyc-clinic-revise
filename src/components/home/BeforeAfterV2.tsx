import Image from "next/image";
import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";
import BeforeAfterRevealSlide from "./BeforeAfterRevealSlide";
import SectionHeader from "@/components/shared/SectionHeader";
import { sectionHeadings } from "@/i18n/section-headings";

/**
 * Backing plate behind the reveal.
 *   tone      "navy" matches About's block · "dim" is quieter · "none" off
 *   offset    "down" reads as the frame lifting off the page — right for a
 *             centred element · "diagonal" matches About, but About's image
 *             sits in a right-hand column so the direction means something
 *             there and less here
 */
const REVEAL_BACKING: {
  tone: "navy" | "dim" | "none";
  offset: "down" | "diagonal";
  goldCounter?: boolean;
} = {
  tone: "navy",
  offset: "diagonal",
  goldCounter: false,
};

const BACKING_BG = {
  navy: "bg-[var(--color-primary)]",
  dim: "bg-[var(--color-surface-dim)]",
  none: "",
};

type Props = {
  t: Dictionary["home"]["results"];
  tCommon: Dictionary["common"];
  locale: string;
  data: CaseCard[];
};

export default function BeforeAfterV2({ t, tCommon, locale, data }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  if (!data.length) return null;

  const featured = data[0];
  const gallery = data.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] py-[var(--section-py)]">
      {/* Vertical gradient lines — the guide's third design element, unused
          until now. They sit at z-0, so the gallery band (which paints inside
          the z-10 content wrapper) covers them: the lines show only in the
          cream reveal half, the part of the section with no furniture of its
          own. Desktop only — below lg there is no margin to put them in. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      >
        {[
          { left: "11%", opacity: 0.8 },
          { left: "14.5%", opacity: 0.5 },
          { left: "85.5%", opacity: 0.5 },
          { left: "89%", opacity: 0.8 },
        ].map((line) => (
          <span
            key={line.left}
            className="absolute top-[8%] bottom-[30%] w-px"
            style={{
              left: line.left,
              opacity: line.opacity,
              background:
                "linear-gradient(180deg, transparent 0%, var(--color-border-accent) 22%, var(--color-border-accent) 62%, transparent 100%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
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

        {/* TODO: the reveal is showing a placeholder pair (two different
            patients). See src/data/cases.ts header. */}
        {featured.beforeImage && featured.afterImage && (
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20 gap-8">
            {/* Diamond divider — marks the reveal as the section's focal
                moment, and reuses the mark from the gallery sub-heading. */}
            <div aria-hidden className="flex items-center gap-3 -mb-2">
              <span
                className="h-px w-16"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-accent))",
                }}
              />
              <span className="w-2 h-2 rotate-45 border border-[var(--color-accent)]" />
              <span
                className="h-px w-16"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent), transparent)",
                }}
              />
            </div>

            <div className="relative w-full max-w-3xl">
              {REVEAL_BACKING.goldCounter &&
                REVEAL_BACKING.offset === "diagonal" && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-y-3 -translate-x-3"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent-pale) 100%)",
                    }}
                  />
                )}

              {REVEAL_BACKING.tone !== "none" && (
                <span
                  aria-hidden
                  className={`absolute inset-0 ${BACKING_BG[REVEAL_BACKING.tone]} ${
                    REVEAL_BACKING.offset === "diagonal"
                      ? "translate-y-4 translate-x-4"
                      : "translate-y-5"
                  }`}
                />
              )}

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

              {/* Border as an overlay, not a prop on the slide — the slide is
                  shared and stays visually neutral. Rose-gold hairline rather
                  than navy: navy would merge into the plate behind it. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-40 ring-1 ring-[var(--color-border-accent)]"
                style={{ borderRadius: "var(--radius-soft)" }}
              />
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
                <h3
                  className={`text-[var(--color-primary)] leading-[1.2] ${
                    isTH
                      ? "text-[1.45rem]"
                      : "text-[clamp(1.5rem,2.4vw,1.95rem)]"
                  }`}
                  style={{
                    fontFamily: titleFont,
                    fontWeight: isTH ? 600 : 400,
                  }}
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

            <div className="relative z-10 lg:hidden text-center mt-10">
              <Link
                href={`/${locale}/before-after`}
                className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ fontFamily: bodyFont }}
              >
                {t.cta}
              </Link>
            </div>
          </div>
        )}

        {/* Airy lookbook gallery — image-forward, no card chrome.
            Full-bleed surface-dim band behind the gallery only. */}
        {gallery.length > 0 && (
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 w-screen top-[-3rem] bottom-[calc(-1*var(--section-py))] bg-[var(--color-surface-dim)]"
            />

            <div className="relative z-10 flex items-center gap-4 mb-8">
              <span
                aria-hidden
                className="w-2.5 h-2.5 shrink-0 rotate-45 border border-[var(--color-accent)] bg-[var(--color-surface-dim)]"
              />
              <h3
                className={`shrink-0 text-[var(--color-primary)] ${
                  isTH ? "text-[1.25rem]" : "text-[1.35rem]"
                }`}
                style={{
                  fontFamily: titleFont,
                  fontWeight: isTH ? 600 : 500,
                  letterSpacing: isTH ? "0" : "-0.005em",
                }}
              >
                {sectionHeadings.results.galleryHeading}
              </h3>
              <span
                aria-hidden
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 40%, transparent 100%)",
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
                    <h4
                      className={`text-[var(--color-primary)] leading-[1.3] transition-colors group-hover:text-[var(--color-accent)] ${
                        isTH ? "text-[1.05rem]" : "text-[1.15rem]"
                      }`}
                      style={{
                        fontFamily: titleFont,
                        fontWeight: isTH ? 600 : 500,
                      }}
                    >
                      {focus ?? treatment}
                    </h4>
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
          </div>
        )}
      </div>
    </section>
  );
}
