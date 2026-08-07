import Image from "next/image";
import Link from "next/link";

const CASES = [
  {
    slug: "nose-thread-lift-case-01",
    before: "/images/cases/case-01-before.jpg",
    after: "/images/cases/case-01-after.jpg",
    image: "/images/cases/case-01-after.jpg",
    treatment: "Nose Thread Lift",
    treatmentTh: "ร้อยไหมจมูกกึ่งศัลยกรรม",
    doctor: "Dr. Jing",
  },
  {
    slug: "nose-thread-lift-case-02",
    before: "/images/cases/case-02-before.jpg",
    after: "/images/cases/case-02-after.jpg",
    treatment: "Nose Thread Lift",
    treatmentTh: "ร้อยไหมจมูก · เก็บปีกจมูก",
    doctor: "Dr. Jing",
  },
  {
    slug: "rhinoplasty-case-01",
    before: "/images/cases/case-03-before.jpg",
    after: "/images/cases/case-03-after.jpg",
    treatment: "Rhinoplasty",
    treatmentTh: "ศัลยกรรมเสริมจมูก",
    doctor: "Dr. Beer",
  },
  {
    slug: "facial-thread-lift-case-01",
    before: "/images/cases/case-04-before.jpg",
    after: "/images/cases/case-04-after.jpg",
    treatment: "Facial Thread Lift",
    treatmentTh: "ร้อยไหมหน้า V-Shape",
    doctor: "Dr. Pek",
  },
  {
    slug: "blepharoplasty-case-01",
    before: "/images/cases/case-05-before.jpg",
    after: "/images/cases/case-05-after.jpg",
    treatment: "Blepharoplasty",
    treatmentTh: "ตาสองชั้น",
    doctor: "Dr. Lulu",
  },
  {
    slug: "facial-design-case-01",
    before: "/images/cases/case-06-before.jpg",
    after: "/images/cases/case-06-after.jpg",
    treatment: "Facial Design — Filler",
    treatmentTh: "ฟิลเลอร์ปรับรูปหน้า",
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
          {CASES.map(
            ({ slug, before, after, treatment, treatmentTh, doctor }) => (
              <Link
                key={slug}
                href={`/before-after/${slug}`}
                className="group bg-white shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Side-by-side photos */}
                <div className="relative grid grid-cols-2">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={before}
                      alt={`${treatment} — Before`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                    />
                    <span className="absolute bottom-2 left-2 text-[9px] font-semibold tracking-[0.15em] uppercase bg-black/50 text-white px-2 py-0.5">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={after}
                      alt={`${treatment} — After`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                    />
                    <span className="absolute bottom-2 right-2 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[var(--color-accent)] text-white px-2 py-0.5">
                      After
                    </span>
                  </div>
                  {/* Center divider */}
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/60" />
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
            ),
          )}
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
