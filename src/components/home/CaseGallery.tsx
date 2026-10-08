"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";
import Lightbox from "@/components/shared/Lightbox";

/**
 * Gallery grid + case modal.
 *
 * Cases have no route (project reference §5) — a case is two photos, a
 * sub-category label and a doctor, too thin to justify a page. Cards are
 * buttons that open a modal; the content still renders server-side in the card
 * markup, so nothing is hidden from search.
 *
 * Extracted from BeforeAfter so that section stays a server component — only
 * the grid needs client state.
 *
 * Modal state is keyed by SLUG, never by array index. Deep-linking (`?case=`)
 * is deliberately not built, but keying by slug is what keeps it cheap to add
 * later.
 */

type Props = {
  tCommon: Dictionary["common"];
  locale: string;
  cases: CaseCard[];
  /**
   * What the surrounding page already says, so the card doesn't repeat it:
   *   "none"        homepage — the card carries everything (default)
   *   "treatment"   /before-after — the block heading names the treatment
   *   "subcategory" /before-after/[treatment] — the page names the treatment
   *                 AND the group heading names the sub-category
   * The modal always shows the full caption; it is read out of context.
   */
  context?: "none" | "treatment" | "subcategory";
};

export default function CaseGallery({
  tCommon,
  locale,
  cases,
  context = "none",
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = cases.find((c) => c.slug === openSlug) ?? null;

  return (
    <>
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {cases.map(({ slug, image, treatment, subcategory, doctor }) => {
          // Title: the most specific thing the page hasn't already said.
          const title =
            context === "subcategory"
              ? null
              : context === "treatment"
                ? (subcategory ?? null)
                : (subcategory ?? treatment);
          const showTreatment = context === "none" && !!subcategory;

          return (
            <button
              key={slug}
              type="button"
              onClick={() => setOpenSlug(slug)}
              className="group block relative text-left transition-transform duration-300 hover:-translate-y-1 hover:z-10"
              aria-label={`${subcategory ?? treatment} — ${isTH ? "ดูภาพขยาย" : "view larger"}`}
            >
              <span className="block relative aspect-square sm:aspect-[4/3] overflow-hidden radius-soft bg-white ring-1 ring-[var(--color-border)] transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.03] group-hover:ring-[var(--color-border-accent)] group-hover:shadow-[0_18px_45px_rgba(26,31,58,0.22)]">
                <Image
                  src={image}
                  alt={`${treatment} — Before & After`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </span>

              <span className={`block ${title ? "pt-4" : "pt-3"}`}>
                {title && (
                  <span
                    className={`block text-[var(--color-primary)] leading-[1.3] transition-colors group-hover:text-[var(--color-accent)] ${
                      isTH ? "text-[1.05rem]" : "text-[1.15rem]"
                    }`}
                    style={{
                      fontFamily: titleFont,
                      fontWeight: isTH ? 600 : 500,
                    }}
                  >
                    {title}
                  </span>
                )}
                <span
                  className={`flex items-center gap-2.5 ${title ? "mt-2" : ""}`}
                >
                  <span
                    aria-hidden
                    className="h-px w-4 shrink-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-8"
                  />
                  <span
                    className="text-xs text-[var(--color-text-subtle)]"
                    style={{ fontFamily: bodyFont }}
                  >
                    {showTreatment ? `${treatment} · ` : ""}
                    {tCommon.by} {doctor}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Lightbox
        open={open !== null}
        onClose={() => setOpenSlug(null)}
        closeLabel={tCommon.close}
        size="lg"
      >
        {open && (
          <>
            <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden bg-white">
              <Image
                src={open.image}
                alt={`${open.treatment} — Before & After`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 720px"
              />
            </div>

            <p
              className="mt-7 text-center text-[11px] tracking-[0.28em] uppercase text-[var(--color-accent)] font-semibold"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {open.treatment}
            </p>

            <p
              className="mt-2 text-center text-[var(--color-on-primary-warm)] text-[1.35rem] leading-snug"
              style={{
                fontFamily: titleFont,
                fontWeight: isTH ? 600 : 400,
              }}
            >
              {open.subcategory ?? open.treatment}
            </p>

            {/* Extra sub-category terms are display-only tags — they never
                create a second group (project reference §5). */}
            {open.tags && open.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {open.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 ring-1 ring-[var(--color-accent-border)] text-[var(--color-on-primary-muted)]"
                    style={{ fontFamily: bodyFont }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p
              className="mt-5 text-center text-sm text-[var(--color-on-primary-muted)]"
              style={{ fontFamily: bodyFont, fontWeight: 300 }}
            >
              {tCommon.by} {open.doctor}
            </p>
          </>
        )}
      </Lightbox>
    </>
  );
}
