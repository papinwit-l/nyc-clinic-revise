"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Reveal } from "@/types/reveal";
import BeforeAfterRevealSlide from "@/components/home/BeforeAfterRevealSlide";

/**
 * Reveals for one treatment.
 *
 * Buttons, never swipe: a horizontal swipe gesture would fight the reveal's
 * own horizontal drag, which is the failure that matters most on touch.
 *
 * Arrows sit OUTSIDE the frame on desktop and below it on mobile, flanking the
 * counter — arrows over the image make an edge tap ambiguous against the drag
 * handle.
 *
 * Dots under ~8 reveals, a fraction above: dots show the total at a glance and
 * allow jumping, but stop being readable once the count exceeds what someone
 * holds in their head.
 *
 * No auto-advance, ever. Advancing while someone is mid-drag is hostile.
 *
 * A single reveal renders with no controls at all — one slide needs no
 * carousel chrome.
 */

const DOTS_MAX = 8;

type Props = {
  reveals: Reveal[];
  locale: string;
  /** Fallback alt/label when a reveal has no title of its own. */
  treatmentTitle: string;
};

export default function RevealCarousel({
  reveals,
  locale,
  treatmentTitle,
}: Props) {
  const isTH = locale === "th";
  const [current, setCurrent] = useState(0);

  if (!reveals.length) return null;

  const total = reveals.length;
  const reveal = reveals[current];
  const label = reveal.title ?? treatmentTitle;
  const step = (d: number) => setCurrent((i) => (i + d + total) % total);

  return (
    <div>
      <div className="flex items-center gap-4 sm:gap-6">
        {total > 1 && (
          <button
            type="button"
            onClick={() => step(-1)}
            className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={isTH ? "ก่อนหน้า" : "Previous"}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <BeforeAfterRevealSlide
            // Remount on change so the drag handle resets to centre rather
            // than carrying the previous slide's position.
            key={reveal.slug}
            beforeImage={{
              src: reveal.beforeImage,
              alt: `${label} — ${isTH ? "ก่อน" : "Before"}`,
            }}
            afterImage={{
              src: reveal.afterImage,
              alt: `${label} — ${isTH ? "หลัง" : "After"}`,
            }}
            locale={locale}
            index={current}
            aspect="4/3"
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={() => step(1)}
            className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={isTH ? "ถัดไป" : "Next"}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {(reveal.title || reveal.doctor) && (
        <p
          className="mt-4 text-center text-sm text-[var(--color-text-subtle)]"
          style={{
            fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
          }}
        >
          {reveal.title}
          {reveal.title && reveal.doctor ? " · " : ""}
          {reveal.doctor}
        </p>
      )}

      {total > 1 && (
        <div className="mt-5 flex items-center justify-center gap-5">
          {/* Mobile arrows live here, beside the counter, so the frame above
              keeps its full width. */}
          <button
            type="button"
            onClick={() => step(-1)}
            className="sm:hidden w-9 h-9 flex items-center justify-center text-[var(--color-text-subtle)]"
            aria-label={isTH ? "ก่อนหน้า" : "Previous"}
          >
            <ChevronLeft size={20} />
          </button>

          {total <= DOTS_MAX ? (
            <div className="flex items-center gap-2.5">
              {reveals.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={i === current}
                  className={`w-2 h-2 rotate-45 border transition-colors ${
                    i === current
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-border-strong)] hover:border-[var(--color-accent)]"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span
              className="text-xs tracking-[0.2em] text-[var(--color-text-subtle)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {current + 1} / {total}
            </span>
          )}

          <button
            type="button"
            onClick={() => step(1)}
            className="sm:hidden w-9 h-9 flex items-center justify-center text-[var(--color-text-subtle)]"
            aria-label={isTH ? "ถัดไป" : "Next"}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
