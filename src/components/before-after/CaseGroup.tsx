"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { SubcategoryGroup } from "@/types/case";
import CaseGallery from "@/components/home/CaseGallery";

/**
 * One sub-category group, paginated.
 *
 * PAGED, not "show more": paging swaps the mounted cards, so only ever six are
 * in the DOM however deep someone goes. "Show more" accumulates, and four
 * clicks in you have forty cards mounted — which matters on the mid-range
 * Android that most of this traffic uses.
 *
 * NO URL state and NO sessionStorage. Six groups would mean six page params
 * and an unreadable URL, and the back button would step through page changes
 * rather than navigation. Restoring from storage costs a hydration mismatch —
 * server renders page 1, client jumps to page 3 — which means either a visible
 * flash or a blank grid on first paint. Plain component state; it already
 * survives opening and closing a case modal, which is the only case that
 * happens in practice.
 *
 * NO auto-scroll on page change: it is disruptive. A short fade on the grid
 * gives someone paging from below the fold a signal that something changed.
 *
 * Groups of six or fewer show no pager at all. That inconsistency between
 * groups is correct, not a bug.
 */

const PER_PAGE = 6;

type Props = {
  group: SubcategoryGroup;
  tCommon: Dictionary["common"];
  locale: string;
  /** "cases" / "เคส" — shown as a count beside the group heading. */
  casesLabel: string;
};

export default function CaseGroup({
  group,
  tCommon,
  locale,
  casesLabel,
}: Props) {
  const isTH = locale === "th";
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);

  const pages = Math.ceil(group.cases.length / PER_PAGE);
  const visible = group.cases.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const goTo = (next: number) => {
    if (next === page) return;
    setFading(true);
    // One frame of fade, then swap. Short enough not to feel like a wait.
    window.setTimeout(() => {
      setPage(next);
      setFading(false);
    }, 150);
  };

  return (
    <div>
      {group.title && (
        <div className="flex items-center gap-4 mb-6">
          <span
            aria-hidden
            className="w-2 h-2 shrink-0 rotate-45 border border-[var(--color-accent)]"
          />
          <h3
            className={`shrink-0 text-[var(--color-primary)] ${
              isTH ? "text-[1.3rem]" : "text-[1.45rem]"
            }`}
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
              fontWeight: isTH ? 600 : 500,
            }}
          >
            {group.title}
          </h3>
          {/* Count — tells a 12-case group from a 3-case one before paging */}
          <span
            className="shrink-0 text-sm text-[var(--color-text-muted)]"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {group.cases.length} {casesLabel}
          </span>
          <span
            aria-hidden
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, var(--color-border-accent), transparent)",
            }}
          />
        </div>
      )}

      <div
        className={`transition-opacity duration-150 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <CaseGallery
          tCommon={tCommon}
          locale={locale}
          cases={visible}
          context={group.title ? "subcategory" : "treatment"}
        />
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === page}
              aria-label={`${i + 1} / ${pages}`}
              className={`w-11 h-11 text-sm transition-colors ${
                i === page
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-subtle)] ring-1 ring-[var(--color-border-strong)] hover:ring-[var(--color-accent)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
