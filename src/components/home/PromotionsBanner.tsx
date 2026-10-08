import { LINE_URL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { LineIcon } from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Promotion } from "@/types/promotion";
import { sectionHeadings } from "@/i18n/section-headings";


type Props = {
  t: Dictionary["home"]["promotion"];
  locale: string;
  data: Promotion | null;
  /** Active promotions in total. The "view all" link shows only above 1 —
      with a single promo it would lead to the same offer again. */
  total?: number;
};

export default function PromotionsBanner({
  t,
  locale,
  data,
  total = 1,
}: Props) {
  if (!data) return null;
  // Validity is decided by the data layer (getActivePromotion), in Bangkok
  // time. The UTC comparison that was here hid a promo at 07:00 on its last
  // day.
  const validDate = new Date(data.validUntil);

  const isTH = locale === "th";

  const formattedDate = validDate.toLocaleDateString(isTH ? "th-TH" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden">
      {/* Background image — model left, text space right */}
      <Image
        src="/images/banner/promo-banner.png"
        alt=""
        fill
        className="object-cover object-left"
        sizes="100vw"
        quality={70}
        priority
      />

      {/* Ensure text readability on right side */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, transparent 25%, rgba(26,31,58,0.4) 45%, rgba(26,31,58,0.7) 65%, rgba(26,31,58,0.85) 100%)",
        }}
      />

      {/* Content — pushed to the right */}
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 py-20 sm:py-28">
        <div className="ml-auto max-w-lg text-right">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-accent-pale)]"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {sectionHeadings.promotion.label}
          </p>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {data.title}
          </h2>

          {data.subtitle && (
            <p
              className="text-white/80 text-sm sm:text-base mt-2"
              style={{
                fontFamily: isTH ? "var(--font-body)" : "var(--font-thai-body)",
              }}
            >
              {data.subtitle}
            </p>
          )}

          <p
            className="text-xl sm:text-2xl font-semibold text-[var(--color-accent)] mt-4"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {data.offer}
          </p>

          <p
            className="text-white/50 text-xs mt-2"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.validUntil} {formattedDate}
          </p>

          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3 mt-6">
            {/* Secondary on purpose: the LINE button stays the main action. */}
            {total > 1 && (
              <Link
                href={`/${locale}/promotions`}
                className={`text-sm text-[var(--color-accent-pale)] hover:text-white transition-colors ${
                  isTH ? "" : "tracking-[0.04em]"
                }`}
                style={{
                  fontFamily: isTH
                    ? "var(--font-thai-body)"
                    : "var(--font-body)",
                }}
              >
                {t.viewAll.replace("{n}", String(total))}
              </Link>
            )}
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-6 py-3 text-[0.8rem] font-semibold tracking-[0.1em] uppercase hover:bg-[var(--color-accent-pale)] transition-colors"
              style={{
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              <LineIcon className="w-4 h-4" />
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
