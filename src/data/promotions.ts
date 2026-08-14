import type { Promotion } from "@/types/promotion";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/promotion?status=active`);

const DATA = {
  slug: "summer-nose-thread-2026",
  title_en: "Summer Special — Nose Thread Lift",
  title_th: "โปรร้อยไหมจมูก ต้อนรับซัมเมอร์",
  offer_en: "20% off Semi-Surgery Nose Thread Lift",
  offer_th: "ลด 20% สำหรับร้อยไหมจมูกกึ่งศัลยกรรม",
  validUntil: "2026-09-30",
};

export async function getActivePromotion(
  locale: string,
): Promise<Promotion | null> {
  // TODO: fetch from WP, check date validity server-side
  if (!DATA) return null;

  const validDate = new Date(DATA.validUntil);
  if (validDate < new Date()) return null;

  return {
    slug: DATA.slug,
    title: locale === "th" ? DATA.title_th : DATA.title_en,
    subtitle: locale === "th" ? DATA.title_en : DATA.title_th,
    offer: locale === "th" ? DATA.offer_th : DATA.offer_en,
    validUntil: DATA.validUntil,
  };
}
