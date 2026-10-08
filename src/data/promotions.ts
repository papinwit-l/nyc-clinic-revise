import type { Promotion } from "@/types/promotion";

/**
 * Promotions — the `promotion` CPT. ONE source for both the homepage
 * PromotionsBanner (first active item) and /promotions (all active items).
 *
 * Rules, agreed Oct 2026:
 *  - Array order = the admin's drag order (menu_order). No "featured" flag:
 *    the first ACTIVE promotion is the homepage one, so the two can't disagree
 *    and an expired promo hands over to the next automatically.
 *  - Shown only between validFrom and validUntil, both inclusive, compared as
 *    calendar dates in BANGKOK time — not as UTC instants. (`new Date(
 *    "2026-09-30") < new Date()` hid a promo at 07:00 on its last day.)
 *  - No quota counter: bookings happen in LINE, so the site can't count.
 *    `condition_*` carries any "limited to N" wording; the admin ends a promo
 *    early by changing validUntil.
 *
 * ⚠ PLACEHOLDER DATA. The first item is the original mock promo; the other
 * two exist only so /promotions can be reviewed as a stack. Titles, offers and
 * dates are invented and the banners are generated placeholders.
 *
 * TODO: replace with WP fetch — /wp/v2/promotion?orderby=menu_order&order=asc
 */

type RawPromotion = {
  slug: string;
  image: string;
  title_en: string;
  title_th: string;
  offer_en: string;
  offer_th: string;
  condition_en?: string;
  condition_th?: string;
  serviceSlug?: string;
  validFrom: string;
  validUntil: string;
};

const DATA: RawPromotion[] = [
  {
    slug: "summer-nose-thread-2026",
    image: "/images/promotions/placeholder-01.svg",
    title_en: "Summer Special — Nose Thread Lift",
    title_th: "โปรร้อยไหมจมูก ต้อนรับซัมเมอร์",
    offer_en: "20% off Semi-Surgery Nose Thread Lift",
    offer_th: "ลด 20% สำหรับร้อยไหมจมูกกึ่งศัลยกรรม",
    condition_en: "Placeholder condition: limited to the first 20 patients.",
    condition_th: "เงื่อนไขตัวอย่าง: จำกัด 20 ท่านแรก",
    serviceSlug: "nose-thread-lift",
    validFrom: "2026-09-01",
    validUntil: "2026-12-31",
  },
  {
    slug: "placeholder-promo-02",
    image: "/images/promotions/placeholder-02.svg",
    title_en: "Placeholder Promotion 02",
    title_th: "โปรโมชันตัวอย่าง 02",
    offer_en: "Placeholder offer line",
    offer_th: "ข้อความข้อเสนอตัวอย่าง",
    serviceSlug: "skin-treatments",
    validFrom: "2026-10-01",
    validUntil: "2026-11-30",
  },
  {
    slug: "placeholder-promo-03",
    image: "/images/promotions/placeholder-03.svg",
    title_en: "Placeholder Promotion 03",
    title_th: "โปรโมชันตัวอย่าง 03",
    offer_en: "Placeholder offer line",
    offer_th: "ข้อความข้อเสนอตัวอย่าง",
    validFrom: "2026-10-01",
    validUntil: "2026-12-15",
  },
];

/** Today's calendar date in Bangkok, as YYYY-MM-DD. */
export function bangkokToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
  }).format(new Date());
}

/** Whole days from today (Bangkok) to the last valid day. 0 = ends today. */
export function daysLeft(validUntil: string): number {
  const ms = Date.parse(validUntil) - Date.parse(bangkokToday());
  return Math.round(ms / 86_400_000);
}

function resolve(raw: RawPromotion, locale: string): Promotion {
  const th = locale === "th";
  return {
    slug: raw.slug,
    image: raw.image,
    title: th ? raw.title_th : raw.title_en,
    subtitle: th ? raw.title_en : raw.title_th,
    offer: th ? raw.offer_th : raw.offer_en,
    condition: th ? raw.condition_th : raw.condition_en,
    serviceSlug: raw.serviceSlug,
    validUntil: raw.validUntil,
  };
}

/** All promotions valid today, in admin order — /promotions. */
export async function getActivePromotions(
  locale: string,
): Promise<Promotion[]> {
  const today = bangkokToday();
  // YYYY-MM-DD strings compare correctly as text.
  return DATA.filter((p) => p.validFrom <= today && today <= p.validUntil).map(
    (raw) => resolve(raw, locale),
  );
}

/** The first active promotion, or null — homepage PromotionsBanner. */
export async function getActivePromotion(
  locale: string,
): Promise<Promotion | null> {
  const [first] = await getActivePromotions(locale);
  return first ?? null;
}
