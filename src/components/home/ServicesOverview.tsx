import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    href: "/services/nose-thread-lift",
    image: "/images/services/cat-nose-thread.png",
    titleEn: "Nose Thread Lift",
    titleTh: "ร้อยไหมเสริมจมูก",
    desc: "เทคนิคกึ่งศัลยกรรม จมูกสวยเป็นธรรมชาติ ไม่ต้องผ่าตัด",
    signature: true,
  },
  {
    href: "/services/facial-thread-lift",
    image: "/images/services/cat-facial-thread.png",
    titleEn: "Facial Thread Lift",
    titleTh: "ร้อยไหมหน้า",
    desc: "ยกกระชับ ปรับรูปหน้า V-Shape กระตุ้นคอลลาเจน",
    signature: false,
  },
  {
    href: "/services/facial-design",
    image: "/images/services/cat-facial-design.png",
    titleEn: "Facial Design",
    titleTh: "ปรับรูปหน้า",
    desc: "Filler เติมเต็ม · SMAS-X กระตุ้นคอลลาเจน · Botox",
    signature: false,
  },
  {
    href: "/services/surgery",
    image: "/images/services/cat-surgery.png",
    titleEn: "Surgery",
    titleTh: "ศัลยกรรม",
    desc: "เสริมจมูก ตาสองชั้น เสริมคาง ดูดไขมัน ฉีดไขมัน",
    signature: false,
  },
  {
    href: "/services/skin-treatments",
    image: "/images/services/cat-skin.png",
    titleEn: "Skin Treatments",
    titleTh: "ฟื้นฟูผิว",
    desc: "Sculptra · Meso Glass Skin · PRP · Placenta · Vitamin Drip",
    signature: false,
  },
] as const;

export default function ServicesOverview() {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Our Services</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            บริการของเรา
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto">
            NYC Clinic ศูนย์ความงามครบวงจร โดยทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง
          </p>
        </div>

        {/* Grid — top row: 2 cards, bottom row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(
            ({ href, image, titleEn, titleTh, desc, signature = false }) => (
              <Link
                key={href}
                href={href}
                className={`
                group relative overflow-hidden bg-white
                shadow-[var(--shadow-card)]
                transition-all duration-300
                hover:shadow-[0_4px_28px_rgba(15,18,37,0.12)]
                hover:-translate-y-1
                ${signature ? "sm:col-span-2 lg:col-span-1" : ""}
              `}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {signature && (
                    <span className="badge absolute top-4 left-4">
                      Signature
                    </span>
                  )}
                </div>

                {/* Copy */}
                <div className="p-6">
                  <h3 className="font-[var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase">
                    {titleEn}
                  </h3>
                  <p className="font-[var(--font-thai-body)] text-[var(--color-accent)] text-sm mt-0.5">
                    {titleTh}
                  </p>
                  <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-sm mt-3 leading-relaxed">
                    {desc}
                  </p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)] transition-colors">
                    Learn More →
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
