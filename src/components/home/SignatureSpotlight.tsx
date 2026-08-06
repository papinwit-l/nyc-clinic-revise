import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, ShieldCheck, Repeat } from "lucide-react";

const BENEFITS = [
  {
    icon: Sparkles,
    textEn: "Semi-surgery technique",
    textTh: "เทคนิคกึ่งศัลยกรรม จมูกสวยเป็นธรรมชาติ",
  },
  {
    icon: Clock,
    textEn: "Quick recovery, minimal downtime",
    textTh: "ฟื้นตัวเร็ว ไม่มีแผลผ่าตัด",
  },
  {
    icon: ShieldCheck,
    textEn: "Pioneer & inventor of the technique in Thailand",
    textTh: "ผู้คิดค้นเทคนิคร้อยไหมจมูกกึ่งศัลยกรรม",
  },
  {
    icon: Repeat,
    textEn: "Adjustable & reversible",
    textTh: "ปรับแก้ไขได้ ไม่ถาวร ปลอดภัย",
  },
] as const;

export default function SignatureSpotlight() {
  return (
    <section className="bg-[var(--color-primary)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden">
            <Image
              src="/images/services/nose-thread-lift.png"
              alt="Nose Thread Lift at NYC Clinic"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Badge overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-primary)] to-transparent pt-16 pb-6 px-6">
              <span className="badge">10,000+ Cases</span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="section-label">Signature Service</span>

            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-white mt-3 leading-tight">
              Nose Thread Lift
            </h2>
            <p className="font-[var(--font-thai-head)] text-xl text-[var(--color-accent)] mt-1">
              ร้อยไหมเสริมจมูกแบบกึ่งศัลยกรรม
            </p>

            <p className="text-[var(--color-on-primary-muted)] mt-6 leading-relaxed">
              เทคนิคเฉพาะที่คิดค้นโดยอาจารย์หมอจิ๋ง
              แพทย์ผู้บุกเบิกการร้อยไหมจมูกในประเทศไทย ผ่านประสบการณ์กว่า 15 ปี
              และมากกว่า 10,000 เคส ให้จมูกสวยเป็นธรรมชาติ โดยไม่ต้องผ่าตัด
            </p>

            {/* Benefits */}
            <ul className="mt-8 space-y-5">
              {BENEFITS.map(({ icon: Icon, textEn, textTh }) => (
                <li key={textEn} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{textEn}</p>
                    <p className="font-[var(--font-thai-body)] text-[var(--color-on-primary-muted)] text-sm mt-0.5">
                      {textTh}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/services/nose-thread-lift"
              className="btn-cta mt-10 inline-flex"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
