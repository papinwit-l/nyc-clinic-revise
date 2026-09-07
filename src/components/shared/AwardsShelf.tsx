"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AWARDS, type Award } from "@/data/awards";
import { sectionHeadings } from "@/i18n/section-headings";

/**
 * Industry recognition, shown two ways from one source.
 *
 *   "shelf"     homepage — all six baseline-aligned. Static on desktop,
 *               swipeable on mobile. No loop: six is a finite set, and a
 *               marquee implies an unbounded one.
 *   "featured"  /about — the most recent award enlarged, the rest beside it.
 *
 * Baseline alignment is deliberate. Trophies are objects that sit on a
 * surface; normalising by height makes them float at inconsistent apparent
 * scales. The aspect spread is wide (0.67 to 1.50), so a shared baseline is
 * what makes the irregular widths read as a shelf rather than a mistake.
 *
 * Band is white, not cream: the photographs were shot on white and their
 * highlights assume it.
 */

type Props = {
  locale: string;
  variant?: "shelf" | "featured";
  /** Homepage sits inside TrustBar and supplies its own spacing. */
  className?: string;
};

function AwardsLabel({
  award,
  isTH,
  small,
}: {
  award: Award;
  isTH: boolean;
  small?: boolean;
}) {
  return (
    <span className="block mt-3 text-center">
      <span
        className={`block text-[var(--color-primary)] leading-tight ${
          small ? "text-[0.8rem]" : "text-[0.9rem]"
        }`}
        style={{
          fontFamily: isTH ? "var(--font-thai-head)" : "var(--font-display)",
          fontWeight: isTH ? 600 : 500,
        }}
      >
        {isTH ? award.titleTh : award.titleEn}
      </span>
      <span
        className="block text-[0.7rem] text-[var(--color-text-subtle)] mt-0.5"
        style={{
          fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
        }}
      >
        {award.year}
      </span>
    </span>
  );
}

export default function AwardsShelf({
  locale,
  variant = "shelf",
  className = "",
}: Props) {
  const isTH = locale === "th";
  const [open, setOpen] = useState<Award | null>(null);

  // Esc closes; body scroll locked while the enlarge view is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const featured = AWARDS[AWARDS.length - 1];
  const rest = AWARDS.slice(0, -1);

  return (
    <div className={className}>
      <p
        className="text-center text-[11px] tracking-[0.28em] uppercase text-[var(--color-accent-dark)] font-semibold mb-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {sectionHeadings.awards.label}
      </p>

      {variant === "featured" ? (
        <div className="grid gap-10 lg:grid-cols-5 lg:items-end">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-center h-[220px] sm:h-[260px]">
              <Image
                src={featured.src}
                alt={featured.engravedEn}
                width={featured.width}
                height={featured.height}
                sizes="(max-width: 1024px) 60vw, 320px"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <AwardsLabel award={featured} isTH={isTH} />
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 lg:items-end">
            {rest.map((a) => (
              <div key={a.slug}>
                <div className="flex items-end justify-center h-[92px] sm:h-[108px]">
                  <Image
                    src={a.src}
                    alt={a.engravedEn}
                    width={a.width}
                    height={a.height}
                    sizes="140px"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <AwardsLabel award={a} isTH={isTH} small />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Shelf — static grid from sm up, swipeable row below it */
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-8 sm:overflow-visible sm:pb-0 sm:items-end">
          {AWARDS.map((a) => (
            <button
              key={a.slug}
              type="button"
              onClick={() => setOpen(a)}
              className="shrink-0 w-[38%] snap-center sm:w-auto group text-left"
              aria-label={`${isTH ? a.titleTh : a.titleEn} — ${isTH ? "ดูรายละเอียด" : "view detail"}`}
            >
              <span className="flex items-end justify-center h-[110px] sm:h-[130px]">
                <Image
                  src={a.src}
                  alt={a.engravedEn}
                  width={a.width}
                  height={a.height}
                  sizes="(max-width: 640px) 38vw, (max-width: 1024px) 30vw, 180px"
                  className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <AwardsLabel award={a} isTH={isTH} />
            </button>
          ))}
        </div>
      )}

      {/* Enlarge view — the engraving is unreadable at shelf size, so the
          awards would otherwise be unlabelled shapes making an unspecified
          claim. Sharp corners: this is structure, not patient-facing content. */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[rgba(15,17,30,0.88)] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[var(--color-primary)] ring-1 ring-[var(--color-accent-border)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[var(--color-on-primary-muted)] hover:text-[var(--color-accent)] transition-colors"
              aria-label={isTH ? "ปิด" : "Close"}
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="flex items-end justify-center h-[280px] sm:h-[340px]">
              <Image
                src={open.src}
                alt={open.engravedEn}
                width={open.width}
                height={open.height}
                sizes="(max-width: 640px) 80vw, 420px"
                className="max-h-full w-auto object-contain"
              />
            </div>

            <p
              className="mt-7 text-center text-[11px] tracking-[0.28em] uppercase text-[var(--color-accent)] font-semibold"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {open.year}
            </p>

            <p
              className="mt-2 text-center text-[var(--color-on-primary-warm)] text-[1.35rem] leading-snug"
              style={{
                fontFamily: isTH
                  ? "var(--font-thai-head)"
                  : "var(--font-display)",
                fontWeight: isTH ? 600 : 400,
              }}
            >
              {isTH ? open.titleTh : open.titleEn}
            </p>

            {/* Diamond divider — brand element, and it separates the label
                from the verbatim engraving. */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <span
                aria-hidden
                className="h-px w-14"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-accent))",
                }}
              />
              <span
                aria-hidden
                className="w-2 h-2 rotate-45 border border-[var(--color-accent)]"
              />
              <span
                aria-hidden
                className="h-px w-14"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent), transparent)",
                }}
              />
            </div>

            <p
              className="mt-5 text-center text-sm leading-[1.8] text-[var(--color-on-primary-muted)]"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              {open.engravedEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
