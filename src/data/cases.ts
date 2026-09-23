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

import { CaseCard } from "@/types/case";

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

/** Cases for one treatment — used by /services/[slug]. */
export async function getCasesByTreatment(
  locale: string,
  treatmentSlug: string,
  limit = 3,
): Promise<CaseCard[]> {
  const all = await getCases(locale);
  return all.filter((c) => c.treatmentSlug === treatmentSlug).slice(0, limit);
}
