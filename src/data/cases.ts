import type { CaseCard } from "@/types/case";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/case?per_page=${limit}`);

const DATA = [
  {
    slug: "nose-thread-tip-extension",
    image: "/images/cases/case-01.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก · ยืดปลายพุ่ง",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-wing-reduction",
    image: "/images/cases/case-02.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก · เก็บปีกจมูก",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-hump-correction",
    image: "/images/cases/case-03.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก · แก้ทรงจมูกมีฮัมพ์",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-male",
    image: "/images/cases/case-04.jpg",
    treatment_en: "Nose Thread Lift — Male",
    treatment_th: "ร้อยไหมจมูก · ทรงจมูกผู้ชาย",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-semi-surgery",
    image: "/images/cases/case-05.jpg",
    treatment_en: "Semi Surgery Thread Nose",
    treatment_th: "ร้อยไหมจมูกกึ่งศัลยกรรม",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-low-tissue",
    image: "/images/cases/case-06.jpg",
    treatment_en: "Nose Thread Lift",
    treatment_th: "ร้อยไหมจมูก · ทรงจมูกเนื้อน้อย",
    doctor: "Dr. Jing",
  },
];

export async function getCases(
  locale: string,
  opts?: { limit?: number },
): Promise<CaseCard[]> {
  const limit = opts?.limit ?? DATA.length;

  // TODO: fetch from WP and map bilingual fields
  return DATA.slice(0, limit).map((item) => ({
    slug: item.slug,
    image: item.image,
    treatment: locale === "th" ? item.treatment_th : item.treatment_en,
    doctor: item.doctor,
  }));
}
