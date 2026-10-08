import type { FaqItem } from "@/types/faq";

/**
 * FAQ accordion built on native <details>. Server component — no JS, works
 * before hydration, keyboard and screen-reader behaviour for free, and the
 * answers are in the HTML for search engines (same reasoning as rendering
 * case content in the card markup, project reference §5).
 *
 * `name` groups the items so opening one closes the others (browsers without
 * support simply allow several open — a fine fallback).
 *
 * Shared: used on /contact now, /faq later.
 */

type Props = {
  items: FaqItem[];
  locale: string;
  /** Unique per accordion on a page. */
  group?: string;
};

export default function FaqAccordion({ items, locale, group = "faq" }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <div className="border-t border-[var(--color-border-accent)]">
      {items.map((item) => (
        <details
          key={item.slug}
          name={group}
          className="faq-item group border-b border-[var(--color-border-accent)]"
        >
          <summary
            className={`flex items-start justify-between gap-6 py-5 cursor-pointer list-none text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] transition-colors ${
              isTH ? "text-[1rem] leading-[1.7]" : "text-[1.05rem] leading-[1.5]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 500 }}
          >
            <span>{item.q}</span>
            {/* plus → minus */}
            <span
              aria-hidden
              className="relative mt-[0.45em] w-3.5 h-3.5 shrink-0 text-[var(--color-accent)]"
            >
              <span className="absolute left-0 top-1/2 w-full h-px bg-current" />
              <span className="absolute left-0 top-1/2 w-full h-px bg-current rotate-90 transition-transform duration-200 group-open:rotate-0" />
            </span>
          </summary>
          <p
            className={`pb-6 pr-10 text-[0.95rem] text-[var(--color-text-warm)] ${
              isTH ? "leading-[1.95]" : "leading-[1.8]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
