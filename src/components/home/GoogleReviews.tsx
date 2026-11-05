import { Star } from "lucide-react";
import type { GoogleReviews as GoogleReviewsData } from "@/types/google-review";
import SectionHeader from "@/components/shared/SectionHeader";

/**
 * §07 — live Google rating and reviews (data/google-reviews.ts).
 *
 * Same ground and card shell as the old Testimonials section, so the
 * homepage rhythm doesn't change. Differences forced by Google's display
 * terms: author photo + name + Google's relative time on every card, text
 * shown unedited (clamped, with a link to the full review), and Google Maps
 * attribution beside a link to the listing.
 *
 * Renders nothing without data — see the note in the fetcher.
 */

type Props = {
  locale: string;
  data: GoogleReviewsData | null;
  t: {
    basedOn: string;
    readMore: string;
    seeAll: string;
    source: string;
  };
  /** Cards to show — Google returns at most five. */
  limit?: number;
};

function Stars({ value, size }: { value: number; size: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={
            i < Math.round(value)
              ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
              : "text-[var(--color-border-strong)]"
          }
        />
      ))}
    </div>
  );
}

export default function GoogleReviews({ locale, data, t, limit = 3 }: Props) {
  if (!data) return null;

  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const reviews = data.reviews.slice(0, limit);
  const total = data.total.toLocaleString(isTH ? "th-TH" : "en-US");

  return (
    <section
      className="py-[var(--section-py)]"
      // surface-deep — see the note in Testimonials.tsx.
      style={{ backgroundColor: "var(--color-surface-deep)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <SectionHeader section="testimonials" className="mb-8" />

        {/* Overall rating */}
        <div className="flex flex-col items-center gap-2.5 mb-12">
          <div className="flex items-center gap-4">
            <span
              className="text-[var(--color-primary)] text-[2.75rem] leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {data.rating.toFixed(1)}
            </span>
            <Stars value={data.rating} size={18} />
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-warm)] hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.basedOn.replace("{n}", total)}
          </a>
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="bg-white radius-soft p-6 sm:p-8 flex flex-col"
              >
                <Stars value={r.rating} size={14} />

                {/* Quote — typeface follows the review's language */}
                <blockquote
                  lang={r.lang}
                  className={`text-[var(--color-primary)] mt-5 line-clamp-7 ${
                    r.lang === "th"
                      ? "text-[1.05rem] leading-[1.85]"
                      : "text-[1.2rem] leading-[1.5] italic"
                  }`}
                  style={{
                    fontFamily:
                      r.lang === "th"
                        ? "var(--font-thai-serif)"
                        : "var(--font-accent)",
                    fontWeight: 300,
                  }}
                >
                  &ldquo;{r.text}&rdquo;
                </blockquote>

                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: bodyFont }}
                  >
                    {t.readMore}
                  </a>
                )}

                <div className="mt-auto pt-6">
                  <div className="pt-5 border-t border-[var(--color-border)] flex items-center gap-3">
                    {r.authorPhoto ? (
                      // Plain <img>: Google's avatar host needs no-referrer,
                      // and the site serves images unoptimised anyway.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.authorPhoto}
                        alt=""
                        width={40}
                        height={40}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold text-white"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      >
                        {r.author.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <a
                        href={r.authorUrl ?? r.url ?? data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-[var(--color-primary)] text-sm hover:text-[var(--color-accent)] transition-colors"
                        style={{
                          fontFamily: "var(--font-thai-body)",
                          fontWeight: 600,
                        }}
                      >
                        {r.author}
                      </a>
                      <p
                        className="text-xs text-[var(--color-text-subtle)] mt-1"
                        style={{ fontFamily: bodyFont }}
                      >
                        {r.time}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Link to all reviews + attribution required by Google */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors ${
              isTH ? "" : "tracking-[0.1em] uppercase"
            }`}
            style={{ fontFamily: bodyFont }}
          >
            {t.seeAll}
          </a>
          <span
            className="text-[11px] text-[var(--color-text-subtle)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.source}
          </span>
        </div>
      </div>
    </section>
  );
}
