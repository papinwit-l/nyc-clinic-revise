/**
 * Promotions — LOCAL-DEV FALLBACK only (used when WP_API_URL isn't set).
 * The live promotions are in wp-admin → Promotions.
 *
 * ⚠ PLACEHOLDER DATA. The first item is the original mock promo; the other
 * two exist only so /promotions can be reviewed as a stack. Titles, offers and
 * dates are invented and the banners are generated placeholders.
 */

export type RawPromotion = {
  slug: string;
  image: string;
  title_en: string;
  title_th: string;
  offer_en: string;
  offer_th: string;
  condition_en?: string;
  condition_th?: string;
  textOverImage?: boolean;
  serviceSlug?: string;
  validFrom: string;
  validUntil: string;
};

export const MOCK_PROMOTIONS: RawPromotion[] = [
  {
    slug: "summer-nose-thread-2026",
    // Same mock photo the homepage banner uses. It has no offer in the
    // artwork, so /promotions draws the text over it (textOverImage).
    image: "/images/banner/promo-banner.png",
    textOverImage: true,
    title_en: "Nose Thread Lift Promotion",
    title_th: "จองด่วน ร้อยไหมจมูก",
    offer_en: "20% off",
    offer_th: "ลด 20%",
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
