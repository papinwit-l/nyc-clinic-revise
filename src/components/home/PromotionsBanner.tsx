import Link from "next/link";
import { LineIcon } from "@/components/shared/SocialIcons";

const LINE_URL = "https://lin.ee/7oJgymx";

export type Promotion = {
  slug: string;
  titleEn: string;
  titleTh: string;
  offer: string;
  validUntil: string; // ISO date string
};

// In production, fetch active promo from WP Promotions CPT
// and pass as prop. If null → section doesn't render.

export default function PromotionsBanner({
  promo,
}: {
  promo: Promotion | null;
}) {
  if (!promo) return null;

  const validDate = new Date(promo.validUntil);
  const now = new Date();
  if (validDate < now) return null;

  const formattedDate = validDate.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="bg-gradient-to-r from-[var(--color-accent-dark)] via-[var(--color-accent)] to-[var(--color-accent-dark)] py-10 sm:py-14">
      <div className="max-w-[var(--container-max)] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Copy */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">
            Promotion
          </p>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white mt-1">
            {promo.titleTh}
          </h2>
          <p className="text-white/90 text-sm mt-1">{promo.titleEn}</p>
          <p className="font-[var(--font-thai-body)] text-lg sm:text-xl font-semibold text-white mt-3">
            {promo.offer}
          </p>
          <p className="font-[var(--font-thai-body)] text-white/60 text-xs mt-2">
            ถึงวันที่ {formattedDate}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-accent-dark)] px-6 py-3 text-[0.8rem] font-semibold tracking-[0.1em] uppercase hover:bg-white/90 transition-colors"
          >
            <LineIcon className="w-4 h-4" />
            รับโปรโมชัน
          </a>
          <Link
            href={`/promotions/${promo.slug}`}
            className="text-white/80 text-xs tracking-[0.1em] uppercase hover:text-white transition-colors underline underline-offset-4"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </section>
  );
}
