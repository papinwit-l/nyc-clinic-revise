import { cache } from "react";
import type { Promotion } from "@/types/promotion";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { getServiceSlugById } from "./services";
import { MOCK_PROMOTIONS } from "./mock/promotions";

/**
 * Promotions from WordPress (wp-admin → Promotions). ONE source for both the
 * homepage PromotionsBanner (first active item) and /promotions (all active
 * items), plus the offer strip on service pages. Cache tag: "promotion".
 *
 * Rules, agreed Oct 2026:
 *  - Order = the admin's drag order (menu_order). No "featured" flag: the
 *    first ACTIVE promotion is the homepage one, so the two can't disagree
 *    and an expired promo hands over to the next automatically.
 *  - Shown only between validFrom and validUntil, both inclusive, compared as
 *    calendar dates in BANGKOK time — not as UTC instants. (`new Date(
 *    "2026-09-30") < new Date()` hid a promo at 07:00 on its last day.)
 *    "Valid from" may be left empty in wp-admin: then it's live at once.
 *  - No quota counter: bookings happen in LINE, so the site can't count.
 *    `condition` carries any "limited to N" wording; the admin ends a promo
 *    early by changing validUntil.
 *
 * Validity is checked when a page renders. Pages showing promotions refresh at
 * least hourly, so an expired promo drops off within the hour after midnight
 * without anyone saving anything.
 *
 * Without WP_API_URL (local dev) the placeholder promotions are served instead.
 */

/** One promotion, both languages, as this module stores it. */
type Source = {
  slug: string;
  image: string;
  textOverImage: boolean;
  serviceSlug?: string;
  /** YYYY-MM-DD; "" = no start date. */
  validFrom: string;
  /** YYYY-MM-DD, inclusive. */
  validUntil: string;
  title_th: string;
  title_en: string;
  offer_th: string;
  offer_en: string;
  condition_th: string;
  condition_en: string;
};

type WpPromotion = {
  slug: string;
  image: { url: string } | null;
  text_over_image: boolean;
  service: number | null;
  valid_from: string;
  valid_until: string;
  title_th: string;
  title_en: string;
  offer_th: string;
  offer_en: string;
  condition_th: string;
  condition_en: string;
};

const FIELDS =
  "slug,image,text_over_image,service,valid_from,valid_until,title_th,title_en,offer_th,offer_en,condition_th,condition_en";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
/** Pods dates arrive as "YYYY-MM-DD" (empty dates as "" or "0000-00-00"). */
const day = (v: unknown) => {
  const d = str(v).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) && d !== "0000-00-00" ? d : "";
};

const getSources = cache(async (): Promise<Source[]> => {
  if (!wpConfigured()) {
    return MOCK_PROMOTIONS.map((m) => ({
      slug: m.slug,
      image: m.image,
      textOverImage: !!m.textOverImage,
      serviceSlug: m.serviceSlug,
      validFrom: m.validFrom,
      validUntil: m.validUntil,
      title_th: m.title_th,
      title_en: m.title_en,
      offer_th: m.offer_th,
      offer_en: m.offer_en,
      condition_th: m.condition_th ?? "",
      condition_en: m.condition_en ?? "",
    }));
  }
  const all = await wpFetch<WpPromotion[]>(
    `/wp/v2/promotion?per_page=100&orderby=menu_order&order=asc&_fields=${FIELDS}`,
    ["promotion"],
  );
  return Promise.all(
    all.map(async (p) => ({
      slug: p.slug,
      image: p.image?.url ?? "",
      textOverImage: !!p.text_over_image,
      // A linked service that was deleted simply drops the link.
      serviceSlug: p.service ? ((await getServiceSlugById(p.service)) ?? undefined) : undefined,
      validFrom: day(p.valid_from),
      validUntil: day(p.valid_until),
      title_th: str(p.title_th),
      title_en: str(p.title_en),
      offer_th: str(p.offer_th),
      offer_en: str(p.offer_en),
      condition_th: str(p.condition_th),
      condition_en: str(p.condition_en),
    })),
  );
});

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

/** English falls back to Thai (project rule: Thai-only content still shows on /en). */
function resolve(src: Source, locale: string): Promotion {
  const th = locale === "th";
  const pick = (t: string, e: string) => (th ? t || e : e || t);
  const condition = pick(src.condition_th, src.condition_en);
  return {
    slug: src.slug,
    image: src.image,
    title: pick(src.title_th, src.title_en),
    // The subtitle is the same name in the other language.
    subtitle: th ? src.title_en : src.title_th,
    offer: pick(src.offer_th, src.offer_en),
    condition: condition || undefined,
    serviceSlug: src.serviceSlug,
    textOverImage: src.textOverImage || undefined,
    validUntil: src.validUntil,
  };
}

/** All promotions valid today, in admin order — /promotions. */
export async function getActivePromotions(
  locale: string,
): Promise<Promotion[]> {
  const today = bangkokToday();
  // YYYY-MM-DD strings compare correctly as text. No end date = not shown:
  // "Valid until" is required in wp-admin, so a blank one is a mistake.
  return (await getSources())
    .filter(
      (p) =>
        p.validUntil &&
        (!p.validFrom || p.validFrom <= today) &&
        today <= p.validUntil,
    )
    .map((src) => resolve(src, locale));
}

/** The first active promotion, or null — homepage PromotionsBanner. */
export async function getActivePromotion(
  locale: string,
): Promise<Promotion | null> {
  const [first] = await getActivePromotions(locale);
  return first ?? null;
}
