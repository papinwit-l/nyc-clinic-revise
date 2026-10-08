import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/types/post";

/**
 * The one article card — used by /blog, the article page's "read next", and
 * the homepage Blog Preview.
 *
 * The category badge sits UNDER the image, not over it. Marketing's covers are
 * finished 16:9 banners with the logo and headline baked in, so any overlay
 * lands on artwork. Same reason the image is never cropped to another ratio.
 *
 * Fonts follow `post.lang`, not the page locale: a Thai-only article shown on
 * /en is still Thai text.
 */

type Props = {
  post: PostCard;
  locale: string;
  /** "lead" = wide two-column card for the newest post on /blog. */
  variant?: "grid" | "lead";
  /** Shown on the lead card only. */
  readLabel?: string;
  as?: "h2" | "h3";
};

export function formatPostDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostCardItem({
  post,
  locale,
  variant = "grid",
  readLabel,
  as: Heading = "h3",
}: Props) {
  const { slug, image, title, excerpt, category, date, lang } = post;
  const isLead = variant === "lead";
  const textTH = lang === "th";
  const titleFont = textTH ? "var(--font-thai-head)" : "var(--font-display)";
  const textFont = textTH ? "var(--font-thai-body)" : "var(--font-body)";
  const uiFont = locale === "th" ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className={`group block ${
        isLead ? "lg:grid lg:grid-cols-[7fr_5fr] lg:gap-12 lg:items-center" : ""
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-dim)]">
        <Image
          src={image}
          alt={title}
          fill
          priority={isLead}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={
            isLead
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>

      <div className={isLead ? "pt-5 lg:pt-0" : "pt-[18px]"}>
        <p
          className="flex items-center gap-2.5 text-xs text-[var(--color-text-subtle)]"
          style={{ fontFamily: uiFont }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--color-accent)] text-white px-2.5 py-[5px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {category}
          </span>
          <time dateTime={date}>{formatPostDate(date, locale)}</time>
        </p>

        <Heading
          className={`text-[var(--color-primary)] mt-2.5 transition-colors group-hover:text-[var(--color-accent-dark)] ${
            isLead
              ? "text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.35]"
              : textTH
                ? "text-[1.1rem] leading-[1.45]"
                : "text-[1.2rem] leading-[1.3]"
          }`}
          style={{ fontFamily: titleFont, fontWeight: textTH ? 600 : 500 }}
        >
          {title}
        </Heading>

        {excerpt && (
          <p
            className={`text-[var(--color-text-warm)] mt-2 ${
              isLead
                ? "text-[0.95rem] leading-[1.8] line-clamp-3"
                : "text-sm leading-[1.8] line-clamp-2"
            }`}
            style={{ fontFamily: textFont, fontWeight: 300 }}
          >
            {excerpt}
          </p>
        )}

        {isLead && readLabel && (
          <span
            className="inline-block mt-5 text-sm font-medium text-[var(--color-accent-dark)]"
            style={{ fontFamily: uiFont }}
          >
            {readLabel}
          </span>
        )}
      </div>
    </Link>
  );
}
