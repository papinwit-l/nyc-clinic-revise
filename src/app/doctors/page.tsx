import Image from "next/image";
import { DOCTORS } from "@/data/doctors";
import { LineIcon } from "@/components/shared/SocialIcons";

const LINE_URL = "https://lin.ee/7oJgymx";

export const metadata = {
  title: "Doctors — ทีมแพทย์ผู้เชี่ยวชาญ",
  description: "ทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง NYC Clinic ประสบการณ์กว่า 15 ปี",
};

export default function DoctorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-primary)] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <span className="section-label">Our Team</span>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-semibold text-white mt-3">
            Meet the Doctors
          </h1>
          <p className="font-[var(--font-thai-head)] text-xl text-[var(--color-accent-pale)] mt-2">
            ทีมแพทย์ผู้เชี่ยวชาญ
          </p>
          <p className="text-[var(--color-on-primary-muted)] text-sm mt-4 max-w-lg mx-auto">
            ทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง ประสบการณ์กว่า 15 ปี
            พร้อมให้คำปรึกษาและดูแลคุณ
          </p>
        </div>
      </section>

      {/* Doctor profiles */}
      <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 space-y-16">
          {DOCTORS.map((doc, idx) => (
            <article
              key={doc.slug}
              id={doc.slug}
              className={`grid grid-cols-1 gap-8 lg:gap-14 items-start ${
                idx % 2 === 0
                  ? "lg:grid-cols-[280px_1fr]"
                  : "lg:grid-cols-[1fr_280px]"
              }`}
            >
              {/* Portrait */}
              <div
                className={`relative aspect-[3/4] max-w-[280px] mx-auto lg:mx-0 overflow-hidden bg-[var(--color-surface-dim)] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={doc.image}
                  alt={`${doc.nameEn} — ${doc.nameTh}`}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>

              {/* Info */}
              <div>
                <span className="section-label">{doc.experience}</span>

                <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-semibold mt-2">
                  {doc.nameEn}
                </h2>
                <p className="font-[var(--font-thai-head)] text-lg text-[var(--color-accent)] mt-0.5">
                  {doc.nameTh}
                </p>

                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {doc.fullNameEn}
                </p>
                <p className="font-[var(--font-thai-body)] text-sm text-[var(--color-text-muted)]">
                  {doc.fullNameTh}
                </p>

                <div className="h-px bg-[var(--color-border)] my-5" />

                <ul className="space-y-3">
                  {doc.credentials.map(({ en, th }, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[11px] font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-[var(--font-thai-body)] text-sm">
                          {th}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {en}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary)] py-14 text-center">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="font-[var(--font-thai-head)] text-lg text-white">
            ปรึกษาแพทย์ผู้เชี่ยวชาญ ฟรี ไม่มีค่าใช้จ่าย
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-5 inline-flex"
          >
            <LineIcon className="w-5 h-5" />
            แอดไลน์ปรึกษาฟรี
          </a>
        </div>
      </section>
    </>
  );
}
