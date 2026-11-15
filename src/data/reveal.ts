import { cache } from "react";
import type { Reveal } from "@/types/reveal";
import { wpConfigured, wpFetch } from "@/lib/wp";
import {
  bi,
  fromWpCommon,
  type RevealSource,
  type WpCaseCommon,
} from "./cases";
import { MOCK_REVEALS } from "./mock/cases";

/**
 * Before/after slider pairs from WordPress (wp-admin → Reveals), in drag
 * order. Cache tags: "reveal" + "doctor".
 *
 * Same Categories taxonomy as cases: top-level term = treatment (must match a
 * service slug), first child term = sub-category.
 *
 * A reveal needs two single-shot photos of ONE patient with matched framing,
 * lighting and crop — the slider wipes one over the other, so mismatched
 * shots misalign at the handle.
 *
 * Without WP_API_URL (local dev) the in-code list is served instead.
 */

type WpReveal = WpCaseCommon & {
  date_gmt: string;
  before_image: { url: string } | null;
  after_image: { url: string } | null;
  title_th: string;
  title_en: string;
  featured: boolean;
};

type Source = RevealSource & { date: string };

const getSources = cache(async (): Promise<Source[]> => {
  if (!wpConfigured()) return MOCK_REVEALS.map((r) => ({ ...r, date: "" }));
  const all = await wpFetch<WpReveal[]>(
    "/wp/v2/reveal?per_page=100&orderby=menu_order&order=asc" +
      "&_fields=slug,menu_order,date_gmt,before_image,after_image,title_th,title_en,featured,treatment,subcategories,doctor_name",
    ["reveal", "doctor"],
  );
  return all.flatMap((r) => {
    const common = fromWpCommon(r);
    // Both photos and a treatment, or it can't be shown.
    if (!common || !r.before_image?.url || !r.after_image?.url) return [];
    return [
      {
        ...common,
        beforeImage: r.before_image.url,
        afterImage: r.after_image.url,
        title: bi(r.title_th, r.title_en),
        featured: !!r.featured,
        date: r.date_gmt,
      },
    ];
  });
});

function toReveal(r: Source, isTH: boolean): Reveal {
  const pick = (b: { th: string; en: string }) => (isTH ? b.th : b.en);
  return {
    slug: r.slug,
    beforeImage: r.beforeImage,
    afterImage: r.afterImage,
    treatmentSlug: r.treatment.slug,
    subcategorySlug: r.subcategories[0]?.slug,
    title: pick(r.title) || undefined,
    doctor: r.doctor ? pick(r.doctor) : undefined,
    featured: r.featured || undefined,
    order: r.order,
  };
}

/**
 * Homepage pick.
 *   - more than one flagged → newest wins, the rest are ignored (don't render
 *     both, don't throw)
 *   - none flagged → null; the homepage renders its gallery with no reveal.
 *     Deliberately NO fallback to "any reveal" — that shows something nobody
 *     chose.
 */
export async function getFeaturedReveal(
  locale: string,
): Promise<Reveal | null> {
  const isTH = locale === "th";
  const flagged = (await getSources()).filter((r) => r.featured);
  if (!flagged.length) return null;
  // Newest by publish date; ties (and the mock) → last in list order.
  const newest = flagged.reduce((a, b) => (b.date >= a.date ? b : a));
  return toReveal(newest, isTH);
}

/** All reveals for one treatment, ordered. Used by /before-after/[treatment]. */
export async function getRevealsByTreatment(
  locale: string,
  treatmentSlug: string,
): Promise<Reveal[]> {
  const isTH = locale === "th";
  return (await getSources())
    .filter((r) => r.treatment.slug === treatmentSlug)
    .map((r) => toReveal(r, isTH));
}

/**
 * Reveals for a service page — same matching rule as getCasesForService:
 * a parent service gets every reveal in its treatment, a child service only
 * those whose sub-category is that child's slug.
 */
export async function getRevealsForService(
  locale: string,
  slug: string,
): Promise<Reveal[]> {
  const isTH = locale === "th";
  return (await getSources())
    .filter(
      (r) => r.treatment.slug === slug || r.subcategories[0]?.slug === slug,
    )
    .map((r) => toReveal(r, isTH));
}
