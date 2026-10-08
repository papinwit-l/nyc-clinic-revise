"use client";

import { useState } from "react";
import type { PostCard, PostCategory } from "@/types/post";
import PostCardItem from "./PostCardItem";

/**
 * /blog listing: category chips, lead card, paged grid.
 *
 * Rules (mockup approved Oct 2026):
 *  - Lead card only from 4 posts up, and only on page 1 of "All". With 3
 *    posts a lead + 2 leaves a hole in the grid; 3 cards fill one row.
 *  - Chips only for categories that have posts; no chip row at all while
 *    everything is in one category.
 *  - Paged, not "show more"; no URL state; no scroll on page change — a short
 *    fade signals the swap. Same reasoning as the B&A treatment page
 *    (project reference §5).
 */

const PER_PAGE = 9;
const LEAD_MIN = 4;

type Props = {
  posts: PostCard[];
  locale: string;
  t: {
    all: string;
    read: string;
    prev: string;
    next: string;
    empty: string;
  };
};

export default function BlogIndex({ posts, locale, t }: Props) {
  const [filter, setFilter] = useState<PostCategory | "all">("all");
  const [page, setPage] = useState(1);

  const uiFont = locale === "th" ? "var(--font-thai-body)" : "var(--font-body)";
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const hasLead = filter === "all" && posts.length >= LEAD_MIN;
  const lead = hasLead ? filtered[0] : null;
  const rest = hasLead ? filtered.slice(1) : filtered;
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const visible = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const choose = (next: PostCategory | "all") => {
    setFilter(next);
    setPage(1);
  };

  if (posts.length === 0) {
    return (
      <p
        className="text-center text-[var(--color-text-warm)]"
        style={{ fontFamily: uiFont }}
      >
        {t.empty}
      </p>
    );
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {(["all", ...categories] as const).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => choose(c)}
                className={`text-sm px-[18px] py-2 border transition-colors cursor-pointer ${
                  active
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    : "border-[var(--color-border-accent)] text-[var(--color-primary)] hover:border-[var(--color-accent)]"
                }`}
                style={{
                  fontFamily: c === "all" ? uiFont : "var(--font-body)",
                }}
              >
                {c === "all" ? t.all : c}
              </button>
            );
          })}
        </div>
      )}

      {lead && page === 1 && (
        <div className="mb-14 pb-14 border-b border-[var(--color-border-accent)]">
          <PostCardItem
            post={lead}
            locale={locale}
            variant="lead"
            readLabel={t.read}
            as="h2"
          />
        </div>
      )}

      {/* key remounts the grid on every swap, which replays the fade */}
      <div
        key={`${filter}-${page}`}
        className="blog-grid-fade grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
      >
        {visible.map((post) => (
          <PostCardItem key={post.slug} post={post} locale={locale} as="h2" />
        ))}
      </div>

      {pages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-5 mt-14 text-sm text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <button
            type="button"
            aria-label={t.prev}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-10 h-10 border border-[var(--color-border-accent)] disabled:opacity-30 enabled:hover:border-[var(--color-accent)] enabled:cursor-pointer transition-colors"
          >
            ‹
          </button>
          <span aria-live="polite">
            {page} / {pages}
          </span>
          <button
            type="button"
            aria-label={t.next}
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
            className="w-10 h-10 border border-[var(--color-border-accent)] disabled:opacity-30 enabled:hover:border-[var(--color-accent)] enabled:cursor-pointer transition-colors"
          >
            ›
          </button>
        </nav>
      )}
    </>
  );
}
