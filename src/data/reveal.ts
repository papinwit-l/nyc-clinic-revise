// ─────────────────────────────────────────────────────────────────────────
// TODO — REVEAL PAIRS ARE PLACEHOLDERS
//
// beforeImage/afterImage below are two DIFFERENT patients' composites, so the
// slider currently wipes between four faces. A real reveal needs two
// single-shot photos of ONE patient — matched framing, lighting and crop
// (object-cover crops each layer independently, so mismatched framing
// misaligns at the handle). This is a shooting instruction, not fixable in
// code later.
//
// WP: `reveal` CPT sharing the hierarchical `case_treatment` taxonomy.
// ─────────────────────────────────────────────────────────────────────────

import type { Reveal } from "@/types/reveal";

const DATA = [
  {
    slug: "nose-thread-signature",
    beforeImage: "/images/cases/case-01.jpg",
    afterImage: "/images/cases/case-02.jpg",
    treatmentSlug: "nose-thread-lift",
    title_en: "Nose Thread Lift",
    title_th: "ร้อยไหมจมูก",
    doctor: "Dr. Jing",
    featured: true,
    order: 1,
  },
  {
    slug: "nose-thread-natural",
    beforeImage: "/images/cases/case-03.jpg",
    afterImage: "/images/cases/case-04.jpg",
    treatmentSlug: "nose-thread-lift",
    subcategorySlug: "natural-look",
    title_en: "Natural look",
    title_th: "ทรงธรรมชาติ",
    doctor: "Dr. Jing",
    order: 2,
  },
];

function toReveal(item: (typeof DATA)[number], isTH: boolean): Reveal {
  return {
    slug: item.slug,
    beforeImage: item.beforeImage,
    afterImage: item.afterImage,
    treatmentSlug: item.treatmentSlug,
    subcategorySlug: item.subcategorySlug,
    title: isTH ? item.title_th : item.title_en,
    doctor: item.doctor,
    featured: item.featured,
    order: item.order,
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
  const flagged = DATA.filter((r) => r.featured);
  if (!flagged.length) return null;
  // "Newest" = last in source order here; with WP this is by date desc.
  return toReveal(flagged[flagged.length - 1], isTH);
}

/** All reveals for one treatment, ordered. Used by /before-after/[treatment]. */
export async function getRevealsByTreatment(
  locale: string,
  treatmentSlug: string,
): Promise<Reveal[]> {
  const isTH = locale === "th";
  return DATA.filter((r) => r.treatmentSlug === treatmentSlug)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((r) => toReveal(r, isTH));
}
