import Image from "next/image";
import Link from "next/link";

const CASES = [
  {
    slug: "nose-thread-tip-extension",
    image: "/images/cases/case-01.jpg",
    treatment: "Nose Thread Lift",
    treatmentTh: "ร้อยไหมจมูก",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-wing-reduction",
    image: "/images/cases/case-02.jpg",
    treatment: "Rhinoplasty",
    treatmentTh: "ศัลยกรรมเสริมจมูก",
    doctor: "Dr. Beer",
  },
  {
    slug: "nose-thread-hump-correction",
    image: "/images/cases/case-03.jpg",
    treatment: "Facial Thread Lift",
    treatmentTh: "ร้อยไหมหน้า V-Shape",
    doctor: "Dr. Pek",
  },
  {
    slug: "nose-thread-male",
    image: "/images/cases/case-04.jpg",
    treatment: "Blepharoplasty",
    treatmentTh: "ตาสองชั้น",
    doctor: "Dr. Lulu",
  },
  {
    slug: "nose-thread-semi-surgery",
    image: "/images/cases/case-05.jpg",
    treatment: "Facial Design — Filler",
    treatmentTh: "ฟิลเลอร์ปรับรูปหน้า",
    doctor: "Dr. Jing",
  },
  {
    slug: "fat-transfer",
    image: "/images/cases/case-06.jpg",
    treatment: "Fat Transfer",
    treatmentTh: "ฉีดไขมันหน้า",
    doctor: "Dr. Jing",
  },
] as const;

export default function BeforeAfter() {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Real Results</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            ผลงานจริง
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-md mx-auto">
            ผลลัพธ์จริงจากคนไข้ของเรา โดยทีมแพทย์ผู้เชี่ยวชาญ
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map(({ slug, image, treatment, treatmentTh, doctor }) => (
            <Link
              key={slug}
              href={`/before-after/${slug}`}
              className="group bg-white shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Composite B&A image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image}
                  alt={`${treatment} — Before & After`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-[var(--font-body)] text-sm font-semibold tracking-[0.05em]">
                  {treatment}
                </h3>
                <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-sm mt-0.5">
                  {treatmentTh}
                </p>
                <p className="text-xs text-[var(--color-text-subtle)] mt-2">
                  by {doctor}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/before-after"
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            View Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
