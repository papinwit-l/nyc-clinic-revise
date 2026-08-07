import Image from "next/image";
import Link from "next/link";

const DOCTORS = [
  {
    slug: "dr-jing",
    image: "/images/doctors/dr-jing.png",
    nameEn: "Dr. Jing",
    nameTh: "หมอจิ๋ง",
    fullName: "แพทย์หญิงอิสรีย์ เมืองมณี",
    specialty: "Nose Thread Lift · Facial Design",
    specialtyTh: "ร้อยไหมจมูก · ปรับรูปหน้า",
    experience: "20+ yrs · 40,000+ cases",
  },
  {
    slug: "dr-beer",
    image: "/images/doctors/dr-beer.png",
    nameEn: "Dr. Beer",
    nameTh: "หมอเบียร์",
    fullName: "นายแพทย์พัทยา ตันธนาธิป",
    specialty: "Plastic Surgery",
    specialtyTh: "ศัลยกรรมตกแต่ง · เสริมจมูก · ตาสองชั้น",
    experience: "15+ yrs",
  },
  {
    slug: "dr-lulu",
    image: "/images/doctors/dr-lulu.png",
    nameEn: "Dr. Lulu",
    nameTh: "หมอลู่ลู่",
    fullName: "แพทย์หญิง รังรอง ศรีวรรักษ์",
    specialty: "Surgery — Eyes · Lips · Sub-brow Lift",
    specialtyTh: "ศัลยกรรมตา · ปาก · ยกคิ้ว",
    experience: "15+ yrs",
  },
  {
    slug: "dr-pek",
    image: "/images/doctors/dr-pek.png",
    nameEn: "Dr. Pek",
    nameTh: "หมอเป๊ก",
    fullName: "นายแพทย์พิชิต สุขสราญจิต",
    specialty: "Lipo · Fat Transfer · Nose Thread",
    specialtyTh: "ดูดไขมัน · ฉีดไขมัน · ร้อยไหมจมูก",
    experience: "15+ yrs",
  },
] as const;

export default function Doctors() {
  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Meet the Doctors</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            ทีมแพทย์ผู้เชี่ยวชาญ
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map(
            ({
              slug,
              image,
              nameEn,
              nameTh,
              fullName,
              specialty,
              specialtyTh,
              experience,
            }) => (
              <Link
                key={slug}
                href={`/doctors/${slug}`}
                className="group text-center"
              >
                {/* Portrait */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)]">
                  <Image
                    src={image}
                    alt={`${nameEn} — ${nameTh}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/40 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white border border-white/60 px-4 py-1.5">
                      View Profile
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold">
                    {nameEn}
                  </h3>
                  <p className="font-[var(--font-thai-head)] text-[var(--color-accent)] text-sm mt-0.5">
                    {nameTh}
                  </p>
                  <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-xs mt-2 leading-relaxed">
                    {specialtyTh}
                  </p>
                  <p className="text-[11px] tracking-[0.05em] text-[var(--color-text-subtle)] mt-1">
                    {experience}
                  </p>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/doctors"
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            View All Doctors →
          </Link>
        </div>
      </div>
    </section>
  );
}
