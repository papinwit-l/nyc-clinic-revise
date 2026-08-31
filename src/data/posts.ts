import type { PostCard } from "@/types/post";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/posts?per_page=${limit}&_embed`);

const DATA = [
  {
    slug: "nose-thread-lift-guide",
    image: "/images/blog/blog-01.svg",
    title_th: "ร้อยไหมจมูกกึ่งศัลยกรรม คืออะไร? ต่างจากเสริมจมูกอย่างไร?",
    title_en: "Semi-Surgery Nose Thread Lift — What Is It?",
    category: "Guides",
    date: "2026-07-15",
  },
  {
    slug: "filler-vs-thread-lift",
    image: "/images/blog/blog-02.svg",
    title_th: "ฟิลเลอร์ vs ร้อยไหม เลือกแบบไหนดี?",
    title_en: "Filler vs Thread Lift — Which One?",
    category: "Tips",
    date: "2026-07-02",
  },
  {
    slug: "post-thread-lift-care",
    image: "/images/blog/blog-03.svg",
    title_th: "ดูแลตัวเองอย่างไร หลังร้อยไหมจมูก",
    title_en: "Post Thread Lift Aftercare Guide",
    category: "Guides",
    date: "2026-06-20",
  },
  // ── FAQ posts ──
  {
    slug: "faq-booking-consultation",
    image: "/images/blog/blog-faq-01.svg",
    title_th: "วิธีจองคิวและปรึกษาแพทย์ก่อนทำหัตถการ",
    title_en: "How to Book & What to Expect at Your Consultation",
    category: "FAQ",
    date: "2026-06-10",
  },
  {
    slug: "faq-pricing-packages",
    image: "/images/blog/blog-faq-02.svg",
    title_th: "ราคาร้อยไหมจมูกเท่าไหร่? มีแพ็กเกจอะไรบ้าง?",
    title_en: "How Much Does Nose Thread Lift Cost? Packages & Pricing",
    category: "FAQ",
    date: "2026-06-05",
  },
  {
    slug: "faq-aftercare-recovery",
    image: "/images/blog/blog-faq-03.svg",
    title_th: "หลังร้อยไหมจมูก ทำอะไรได้บ้าง? พักฟื้นกี่วัน?",
    title_en: "After Nose Thread Lift — Recovery Timeline & Dos and Don'ts",
    category: "FAQ",
    date: "2026-05-28",
  },
  {
    slug: "faq-safety-credentials",
    image: "/images/blog/blog-faq-04.svg",
    title_th: "ร้อยไหมจมูกปลอดภัยไหม? ใช้ไหมอะไร?",
    title_en: "Is Nose Thread Lift Safe? Materials, Certifications & Standards",
    category: "FAQ",
    date: "2026-05-20",
  },
  {
    slug: "faq-first-visit",
    image: "/images/blog/blog-faq-05.svg",
    title_th: "มาครั้งแรกต้องเตรียมตัวอย่างไร?",
    title_en: "Your First Visit — What to Bring & How to Prepare",
    category: "FAQ",
    date: "2026-05-15",
  },
];

export async function getLatestPosts(
  locale: string,
  limit?: number,
): Promise<PostCard[]> {
  const count = limit ?? DATA.length;

  // TODO: fetch from WP and map bilingual fields
  return DATA.slice(0, count).map((item) => ({
    slug: item.slug,
    image: item.image,
    title: locale === "th" ? item.title_th : item.title_en,
    subtitle: locale === "th" ? item.title_en : item.title_th,
    category: item.category,
    date: item.date,
  }));
}
