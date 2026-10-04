// ─────────────────────────────────────────────────────────────────────────
// TODO — BEFORE THIS SECTION GOES TO CLIENT / MARKETING REVIEW
//
// 1. IMAGERY MISMATCH. All six images are Nose Thread Lift composites. The
//    treatments below (Facial Thread Lift, Surgery) are placeholders used to
//    exercise the layout against mixed services. The photos do NOT show the
//    treatment named. Must not ship as-is.
//
// 2. SUB-CATEGORY TERMS UNVERIFIED. Values below are drafted, not supplied by
//    the clinic. Marketing owes the real term list per treatment AND its
//    deliberate order — order is functional: the FIRST child term on a case
//    decides which group it renders in (project reference §5).
//
// 3. WP FETCH. Replace with:
//    const res = await fetch(`${WP_API}/wp/v2/case?per_page=${limit}`);
//    REST returns term IDs only — fetch /wp/v2/case_treatment separately for
//    terms + their `parent`, and assemble the grouping here, not in the page.
//    Also needs ?orderby=menu_order&order=asc plus the
//    rest_case_collection_params filter (project reference §5).
// ─────────────────────────────────────────────────────────────────────────

import {
  CaseCard,
  SubcategoryGroup,
  TreatmentGroup,
  UNGROUPED_SLUG,
} from "@/types/case";
import { getServices } from "@/data/services";

const DATA = [
  {
    slug: "nose-thread-natural-look",
    image: "/images/cases/case-nose-thread-natural.jpg",
    treatmentSlug: "nose-thread-lift",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    subcategorySlug: "natural-look",
    subcategory_en: "Natural look",
    subcategory_th: "ทรงธรรมชาติ",
    doctor: "Dr. Jing",
    order: 1,
  },
  {
    slug: "nose-thread-european-look",
    image: "/images/cases/case-nose-thread-european.jpg",
    treatmentSlug: "nose-thread-lift",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    subcategorySlug: "european-look",
    subcategory_en: "European look",
    subcategory_th: "ทรงยุโรป",
    doctor: "Dr. Jing",
    order: 2,
  },
  {
    slug: "facial-thread-v-shape",
    image: "/images/cases/case-facial-thread.jpg",
    treatmentSlug: "facial-thread-lift",
    treatment_en: "Facial Thread Lift",
    treatment_th: "ร้อยไหมหน้า",
    subcategorySlug: "v-shape",
    subcategory_en: "V-shape lifting",
    subcategory_th: "ยกกระชับรูปหน้าวี",
    doctor: "Dr. Jing",
    order: 3,
  },
  {
    slug: "nose-thread-tip-extension",
    image: "/images/cases/case-01.jpg",
    treatmentSlug: "nose-thread-lift",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    subcategorySlug: "tip-extension",
    subcategory_en: "Tip extension",
    subcategory_th: "ยืดปลายพุ่ง",
    doctor: "Dr. Jing",
    order: 4,
  },
  {
    slug: "rhinoplasty-profile",
    image: "/images/cases/case-05.jpg",
    treatmentSlug: "surgery",
    treatment_en: "Surgery",
    treatment_th: "ศัลยกรรม",
    subcategorySlug: "rhinoplasty",
    subcategory_en: "Rhinoplasty",
    subcategory_th: "เสริมจมูก",
    doctor: "Dr. Beer",
    order: 5,
  },
  {
    slug: "blepharoplasty-double-eyelid",
    image: "/images/cases/case-06.jpg",
    treatmentSlug: "surgery",
    treatment_en: "Surgery",
    treatment_th: "ศัลยกรรม",
    subcategorySlug: "blepharoplasty",
    subcategory_en: "Double eyelid",
    subcategory_th: "ตาสองชั้น",
    doctor: "Dr. Lulu",
    order: 6,
  },
];

export async function getCases(
  locale: string,
  opts?: { limit?: number },
): Promise<CaseCard[]> {
  const limit = opts?.limit ?? DATA.length;
  const isTH = locale === "th";

  return DATA.slice(0, limit).map((item) => ({
    slug: item.slug,
    image: item.image,
    treatment: isTH ? item.treatment_th : item.treatment_en,
    treatmentSlug: item.treatmentSlug,
    subcategory: isTH ? item.subcategory_th : item.subcategory_en,
    subcategorySlug: item.subcategorySlug,
    doctor: item.doctor,
    order: item.order,
  }));
}

/**
 * Cases for a service page — used by /services/[slug].
 *
 * Matches EITHER field, because the case taxonomy mirrors the service tree:
 *   treatmentSlug     the top-level service   ("surgery")
 *   subcategorySlug   the child service       ("rhinoplasty")
 *
 * So /services/surgery picks up every surgical case, and
 * /services/rhinoplasty picks up only its own. Matching treatmentSlug alone
 * meant child pages found nothing even when a matching case existed.
 *
 * ⚠ This depends on sub-category terms being named the same as child service
 * slugs. They are today. When both move to WP, `case_treatment`'s child terms
 * and the service CPT's child slugs have to stay in step, or these pages go
 * quietly empty.
 */
export async function getCasesForService(
  locale: string,
  slug: string,
  limit = 3,
): Promise<CaseCard[]> {
  const all = await getCases(locale);
  return all
    .filter((c) => c.treatmentSlug === slug || c.subcategorySlug === slug)
    .slice(0, limit);
}

/**
 * Groups one treatment's cases by sub-category.
 *
 * The ungrouped bucket always sorts last and is dropped when it is the only
 * group — see SubcategoryGroup. Everything else keeps the order cases arrive
 * in, which is `order` (menu_order), so the term list's own sequence is what
 * decides group order.
 */
function groupBySubcategory(
  cases: CaseCard[],
  ungroupedTitle: string,
): SubcategoryGroup[] {
  const groups: SubcategoryGroup[] = [];

  for (const c of cases) {
    const slug = c.subcategorySlug ?? UNGROUPED_SLUG;
    const title = c.subcategory ?? ungroupedTitle;
    const existing = groups.find((g) => g.slug === slug);
    if (existing) existing.cases.push(c);
    else groups.push({ slug, title, cases: [c] });
  }

  const named = groups.filter((g) => g.slug !== UNGROUPED_SLUG);
  const ungrouped = groups.find((g) => g.slug === UNGROUPED_SLUG);

  // Only group is the unnamed one → drop the heading entirely.
  if (!named.length) return ungrouped ? [{ ...ungrouped, title: "" }] : [];
  return ungrouped ? [...named, ungrouped] : named;
}

/**
 * Every treatment with cases, each carrying a capped preview set.
 * Used by /before-after.
 *
 * Treatment order follows the SERVICE list, not the case list — so the
 * gallery reads in the same order as /services rather than by whichever case
 * happens to be first. Treatments with no cases are omitted.
 */
export async function getCaseGroups(
  locale: string,
  opts?: { perGroup?: number; ungroupedTitle?: string },
): Promise<TreatmentGroup[]> {
  const perGroup = opts?.perGroup ?? 6;
  const ungroupedTitle =
    opts?.ungroupedTitle ?? (locale === "th" ? "เคสอื่น ๆ" : "More cases");

  const [all, services] = await Promise.all([
    getCases(locale),
    getServices(locale),
  ]);

  return services
    .map((service) => {
      const mine = all.filter((c) => c.treatmentSlug === service.slug);
      return {
        slug: service.slug,
        title: service.title,
        cases: mine.slice(0, perGroup),
        groups: groupBySubcategory(mine, ungroupedTitle),
        total: mine.length,
      };
    })
    .filter((g) => g.total > 0);
}

/**
 * One treatment, grouped by sub-category.
 * Used by /before-after/[treatment].
 *
 * Returns null for a slug that is not a top-level service, so the page can
 * notFound() rather than rendering an empty shell.
 */
export async function getTreatmentGroup(
  locale: string,
  treatmentSlug: string,
  opts?: { ungroupedTitle?: string },
): Promise<TreatmentGroup | null> {
  const ungroupedTitle =
    opts?.ungroupedTitle ?? (locale === "th" ? "เคสอื่น ๆ" : "More cases");

  const [all, services] = await Promise.all([
    getCases(locale),
    getServices(locale),
  ]);

  const service = services.find((s) => s.slug === treatmentSlug);
  if (!service) return null;

  const mine = all.filter((c) => c.treatmentSlug === treatmentSlug);
  return {
    slug: service.slug,
    title: service.title,
    cases: mine,
    groups: groupBySubcategory(mine, ungroupedTitle),
    total: mine.length,
  };
}
