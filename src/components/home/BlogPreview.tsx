import Image from "next/image";
import Link from "next/link";

// TODO: fetch latest 3 posts from WP
const POSTS = [
  {
    slug: "nose-thread-lift-guide",
    image: "/images/blog/blog-01.jpg",
    titleTh: "ร้อยไหมจมูกกึ่งศัลยกรรม คืออะไร? ต่างจากเสริมจมูกอย่างไร?",
    titleEn: "Semi-Surgery Nose Thread Lift — What Is It?",
    category: "Guides",
    date: "2026-07-15",
  },
  {
    slug: "filler-vs-thread-lift",
    image: "/images/blog/blog-02.jpg",
    titleTh: "ฟิลเลอร์ vs ร้อยไหม เลือกแบบไหนดี?",
    titleEn: "Filler vs Thread Lift — Which One?",
    category: "Tips",
    date: "2026-07-02",
  },
  {
    slug: "post-thread-lift-care",
    image: "/images/blog/blog-03.jpg",
    titleTh: "ดูแลตัวเองอย่างไร หลังร้อยไหมจมูก",
    titleEn: "Post Thread Lift Aftercare Guide",
    category: "Guides",
    date: "2026-06-20",
  },
] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPreview() {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Latest Articles</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            บทความล่าสุด
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map(({ slug, image, titleTh, titleEn, category, date }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group bg-white shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={image}
                  alt={titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[var(--color-accent)] text-white px-2.5 py-1">
                  {category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[11px] text-[var(--color-text-subtle)]">
                  {formatDate(date)}
                </p>
                <h3 className="font-[var(--font-thai-body)] text-sm font-medium leading-relaxed mt-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {titleTh}
                </h3>
                <p className="font-[var(--font-body)] text-xs text-[var(--color-text-muted)] mt-1">
                  {titleEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </section>
  );
}
