"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FacilityBranch } from "@/data/about";
import SectionIntro from "@/components/shared/SectionIntro";

/**
 * Facility gallery — one large current image with a thumbnail strip beneath.
 *
 * A clinic interior needs size to read: at one-third column width a room is
 * unrecognisable. The thumbnail strip keeps the whole set visible, so nothing
 * is hidden behind a control the way a bare carousel would hide it.
 *
 * PLACEHOLDER MODE is on: the eleven photos on the live site are 2023 uploads
 * with mixed aspect ratios (two square, the rest landscape), and marketing is
 * expected to supply a curated set — six to eight, one session, consistent
 * orientation. Flip SHOW_PLACEHOLDER once they land in
 * public/images/facility/.
 *
 * Arrows sit outside the frame, flanking the counter below it — the same
 * placement decided for the reveal carousel, and for the same reason: arrows
 * over the image make an edge tap ambiguous.
 */

const SHOW_PLACEHOLDER = true;

type Props = {
  branch: FacilityBranch;
  locale: string;
  label: string;
  heading: string;
};

export default function FacilityGallery({
  branch,
  locale,
  label,
  heading,
}: Props) {
  const isTH = locale === "th";

  // Index, not slug: an ordered set with no identity of its own, and stepping
  // needs position. (Cases use slug — those are addressable.)
  const [current, setCurrent] = useState(0);
  const total = branch.images.length;
  const step = (delta: number) =>
    setCurrent((i) => (i + delta + total) % total);

  // Keep the active thumbnail in view. Without this the strip is wider than
  // the viewport, so stepping with the arrows moves the highlight off-screen
  // and nothing appears to change.
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelector<HTMLElement>(
      `[data-index="${current}"]`,
    );
    if (!strip || !thumb) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // scrollLeft on the strip, not scrollIntoView — the latter also scrolls
    // the page vertically to bring the element into view, which yanks the
    // viewport away from the gallery.
    const target =
      thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({
      left: Math.max(0, target),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [current]);

  return (
    <section className="bg-[var(--color-surface-dim)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <SectionIntro
          label={label}
          heading={heading}
          meta={isTH ? branch.nameTh : branch.nameEn}
          locale={locale}
          className="mb-10"
        />

        {/* Current image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] radius-soft">
          {SHOW_PLACEHOLDER ? (
            <span className="absolute inset-0 grid place-items-center text-[var(--color-text-subtle)] text-sm tracking-[0.25em] uppercase">
              {String(current + 1).padStart(2, "0")}
            </span>
          ) : (
            <Image
              src={branch.images[current]}
              alt=""
              fill
              priority={current === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1180px"
            />
          )}
        </div>

        {/* Arrows + counter, below the frame */}
        <div className="mt-5 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => step(-1)}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={isTH ? "ก่อนหน้า" : "Previous"}
          >
            <ChevronLeft size={20} />
          </button>
          <span
            className="text-xs tracking-[0.2em] text-[var(--color-text-subtle)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {current + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={isTH ? "ถัดไป" : "Next"}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Thumbnail strip — scrolls horizontally rather than wrapping, so the
            strip stays one line however many photos there are. */}
        <div
          ref={stripRef}
          className="mt-5 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {branch.images.map((src, i) => {
            const active = i === current;
            return (
              <button
                key={src}
                type="button"
                data-index={i}
                onClick={() => setCurrent(i)}
                aria-label={`${isTH ? branch.nameTh : branch.nameEn} — ${i + 1}/${total}`}
                aria-current={active}
                className={`relative shrink-0 w-[100px] sm:w-[200px] aspect-[4/3] overflow-hidden radius-soft transition-[opacity,box-shadow] duration-200 ${
                  active
                    ? "opacity-100 ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-surface-dim)] shadow-[0_8px_20px_rgba(26,31,58,0.14)]"
                    : "opacity-55 ring-1 ring-[var(--color-border)] hover:opacity-100"
                }`}
              >
                {SHOW_PLACEHOLDER ? (
                  <span className="absolute inset-0 grid place-items-center bg-[var(--color-surface)] text-[var(--color-text-subtle)] text-[10px] tracking-[0.15em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : (
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="104px"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
