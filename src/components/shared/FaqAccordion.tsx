import type { FaqItem } from "@/types/faq";

/**
 * FAQ accordion built on native <details>. Server component — no JS, works
 * before hydration, keyboard and screen-reader behaviour for free, and the
 * answers are in the HTML for search engines.
 *
 * `name` groups the items so opening one closes the others (browsers without
 * support simply allow several open — a fine fallback).
 *
 * Variants:
 *   "list"  hairline-separated rows — /faq and /contact
 *   "card"  numbered white cards; the open one gains a rose-gold edge and a
 *           shadow. Homepage FAQ preview, where the section has to hold its
 *           own between two image-led sections.
 */

type Props = {
  items: FaqItem[];
  locale: string;
  /** Unique per accordion on a page. */
  group?: string;
  variant?: "list" | "card";
};

export default function FaqAccordion({
  items,
  locale,
  group = "faq",
  variant = "list",
}: Props) {
  const isTH = locale === "th";
  const isCard = variant === "card";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <div
      className={
        isCard ? "space-y-3" : "border-t border-[var(--color-border-accent)]"
      }
    >
      {items.map((item, i) => (
        <details
          key={item.slug}
          name={group}
          className={`faq-item group ${
            isCard
              ? "bg-[var(--color-surface-white)] border border-[var(--color-border-accent)] border-l-2 open:border-l-[var(--color-accent)] open:shadow-[0_14px_36px_rgba(26,31,58,0.10)] transition-shadow"
              : "border-b border-[var(--color-border-accent)]"
          }`}
        >
          <summary
            className={`flex items-start justify-between gap-6 cursor-pointer list-none text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] transition-colors ${
              isCard ? "px-5 sm:px-7 py-5" : "py-5"
            } ${
              isTH
                ? "text-[1rem] leading-[1.7]"
                : "text-[1.05rem] leading-[1.5]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 500 }}
          >
            <span className="flex items-start gap-4 sm:gap-5">
              {isCard && (
                <span
                  aria-hidden
                  className="shrink-0 w-7 text-[1.35rem] leading-[1.15] text-[var(--color-accent)]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span>{item.q}</span>
            </span>
            {/* plus → minus */}
            <span
              aria-hidden
              className="relative mt-[0.45em] w-3.5 h-3.5 shrink-0 text-[var(--color-accent)]"
            >
              <span className="absolute left-0 top-1/2 w-full h-px bg-current" />
              <span className="absolute left-0 top-1/2 w-full h-px bg-current rotate-90 transition-transform duration-200 group-open:rotate-0" />
            </span>
          </summary>
          <div
            className={`text-[0.95rem] text-[var(--color-text-warm)] ${
              isCard ? "pb-6 pr-10 pl-5 sm:pl-[4.75rem]" : "pb-6 pr-10"
            } ${isTH ? "leading-[1.95]" : "leading-[1.8]"}`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {/* Answers can run to several paragraphs (blank-line separated) */}
            {item.a.split(/\n\s*\n/).map((para, k) => (
              <p key={k} className={k > 0 ? "pt-3" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
