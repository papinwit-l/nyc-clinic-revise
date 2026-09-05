// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/case?per_page=${limit}`);
//
// PLACEHOLDER DATA — all six images are Nose Thread Lift composites. The
// treatments below are varied deliberately so the layout is exercised against
// mixed services; the imagery does NOT match the stated treatment yet.
// focus_en / focus_th are drafted from the slugs and need marketing review
// before this is shown to anyone outside the team.

import { CaseCard } from "@/types/case";

const DATA = [
  {
    slug: "nose-thread-tip-extension",
    image: "/images/cases/case-01.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    focus_en: "Tip extension",
    focus_th: "ยืดปลายพุ่ง",
    doctor: "Dr. Jing",
    // Placeholder pair — these are two different patients' composites.
    // Needs two single-shot photos of ONE patient, matched framing/lighting.
    beforeImage: "/images/cases/case-01.jpg",
    afterImage: "/images/cases/case-02.jpg",
  },
  {
    slug: "nose-thread-wing-reduction",
    image: "/images/cases/case-02.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    focus_en: "Wing reduction",
    focus_th: "ปีกจมูกกระชับ",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-hump-correction",
    image: "/images/cases/case-03.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก",
    focus_en: "Hump correction",
    focus_th: "ปรับสันจมูกให้เรียบ",
    doctor: "Dr. Jing",
  },
  {
    slug: "facial-thread-v-shape",
    image: "/images/cases/case-04.jpg",
    treatment_en: "Facial Thread Lift",
    treatment_th: "ร้อยไหมหน้า",
    focus_en: "V-shape lifting",
    focus_th: "ยกกระชับรูปหน้าวี",
    doctor: "Dr. Jing",
  },
  {
    slug: "rhinoplasty-profile",
    image: "/images/cases/case-05.jpg",
    treatment_en: "Surgery",
    treatment_th: "ศัลยกรรม",
    focus_en: "Rhinoplasty",
    focus_th: "เสริมจมูก",
    doctor: "Dr. Beer",
  },
  {
    slug: "blepharoplasty-double-eyelid",
    image: "/images/cases/case-06.jpg",
    treatment_en: "Surgery",
    treatment_th: "ศัลยกรรม",
    focus_en: "Double eyelid",
    focus_th: "ตาสองชั้น",
    doctor: "Dr. Lulu",
  },
];

export async function getCases(
  locale: string,
  opts?: { limit?: number },
): Promise<CaseCard[]> {
  const limit = opts?.limit ?? DATA.length;
  const isTH = locale === "th";

  // TODO: fetch from WP and map bilingual fields
  return DATA.slice(0, limit).map((item) => ({
    slug: item.slug,
    image: item.image,
    treatment: isTH ? item.treatment_th : item.treatment_en,
    focus: isTH ? item.focus_th : item.focus_en,
    doctor: item.doctor,
    beforeImage: item.beforeImage,
    afterImage: item.afterImage,
  }));
}
