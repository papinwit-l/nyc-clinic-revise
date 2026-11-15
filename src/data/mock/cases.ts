import type { CaseSource, RevealSource } from "@/data/cases";

/**
 * Built-in cases for local dev without WP_API_URL — the same set the one-time
 * import puts into WordPress (cms/tools/import-content.php).
 *
 * Only real Nose Thread Lift photos, all by Dr. Jing. Sub-category labels on
 * the first three are drafts; the clinic's real list replaces them in wp-admin.
 */

const NOSE = {
  slug: "nose-thread-lift",
  th: "ร้อยไหมจมูก",
  en: "Nose Thread Lift",
};
const JING = { th: "หมอจิ๋ง", en: "Dr. Jing" };

const sub = (slug: string, en: string, th: string) => [{ slug, en, th }];

export const MOCK_CASES: CaseSource[] = [
  {
    slug: "nose-thread-natural-look",
    image: "/images/cases/case-nose-thread-natural.jpg",
    treatment: NOSE,
    subcategories: sub("natural-look", "Natural look", "ทรงธรรมชาติ"),
    doctor: JING,
    order: 1,
  },
  {
    slug: "nose-thread-european-look",
    image: "/images/cases/case-nose-thread-european.jpg",
    treatment: NOSE,
    subcategories: sub("european-look", "European look", "ทรงยุโรป"),
    doctor: JING,
    order: 2,
  },
  {
    slug: "nose-thread-tip-extension",
    image: "/images/cases/case-01.jpg",
    treatment: NOSE,
    subcategories: sub("tip-extension", "Tip extension", "ยืดปลายพุ่ง"),
    doctor: JING,
    order: 3,
  },
  ...[
    "case-02.jpg",
    "case-03.jpg",
    "case-04.jpg",
    "case-05.jpg",
    "case-06.jpg",
    "case-facial-thread.jpg",
  ].map((file, i) => ({
    slug: `nose-thread-case-${i + 4}`,
    image: `/images/cases/${file}`,
    treatment: NOSE,
    subcategories: [],
    doctor: JING,
    order: i + 4,
  })),
];

/** One real matched pair (same patient, same framing). */
export const MOCK_REVEALS: RevealSource[] = [
  {
    slug: "nose-thread-signature",
    beforeImage: "/images/cases/reveal/case-01-before.jpg",
    afterImage: "/images/cases/reveal/case-01-after.jpg",
    treatment: NOSE,
    subcategories: [],
    title: { th: "ร้อยไหมจมูก", en: "Nose Thread Lift" },
    doctor: JING,
    featured: true,
    order: 1,
  },
];
