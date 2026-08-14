import type { PostCard } from "@/types/post";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/posts?per_page=${limit}&_embed`);

const DATA = [
  {
    slug: "nose-thread-lift-guide",
    image: "/images/blog/blog-01.jpg",
    title_th: "ร้อยไหมจมูกกึ่งศัลยกรรม คืออะไร? ต่างจากเสริมจมูกอย่างไร?",
    title_en: "Semi-Surgery Nose Thread Lift — What Is It?",
    category: "Guides",
    date: "2026-07-15",
  },
  {
    slug: "filler-vs-thread-lift",
    image: "/images/blog/blog-02.jpg",
    title_th: "ฟิลเลอร์ vs ร้อยไหม เลือกแบบไหนดี?",
    title_en: "Filler vs Thread Lift — Which One?",
    category: "Tips",
    date: "2026-07-02",
  },
  {
    slug: "post-thread-lift-care",
    image: "/images/blog/blog-03.jpg",
    title_th: "ดูแลตัวเองอย่างไร หลังร้อยไหมจมูก",
    title_en: "Post Thread Lift Aftercare Guide",
    category: "Guides",
    date: "2026-06-20",
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
