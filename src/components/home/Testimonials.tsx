import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "สาวๆ คนไหนอยากมีจมูกสวยๆ แต่ไม่กล้าเสริมจมูก มาร้อยไหมจมูกได้ที่นี้เลยนะคะ คุณหมอใจดีมากๆ ให้คำแนะนำดี ร้อยไหมจมูกเสร็จออกมาถูกใจ สวยมากๆ ชอบมากค่ะ",
    name: "คุณปิยาภรณ์",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
  {
    quote:
      "คุณหมอจิ๋ง น่ารักมากๆ คะ มารอบที่ 2 แล้ว น้องๆ ต้อนรับน่ารักและยิ้มแย้มทุกคนเลยคะ นวัตกรรมใหม่ไม่ต้องพักฟื้น ดูเป็นธรรมชาติค่ะ",
    name: "คุณอ้อย",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
  {
    quote:
      "ร้อยไหมทรงสวยดูธรรมชาติ สวยคมมีมิติ คุณหมอและพี่ๆ เจ้าหน้าที่น่ารักมากค่ะ บริการดีมาก แนะนำเลยค่ะ",
    name: "คุณวราลี",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-[var(--color-accent)] text-[var(--color-accent)]"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[var(--color-primary)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">What They Say</span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-white mt-3">
            เสียงจากลูกค้า
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, treatment, rating }) => (
            <div
              key={name}
              className="bg-[var(--color-primary-mid)] p-6 sm:p-8 flex flex-col border border-[var(--color-accent-border)]"
            >
              <Stars count={rating} />

              <blockquote className="font-[var(--font-thai-body)] text-[var(--color-on-primary-muted)] text-sm leading-relaxed mt-5 flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="mt-6 pt-5 border-t border-[var(--color-accent-border)]">
                <p className="font-[var(--font-thai-body)] text-white text-sm font-medium">
                  {name}
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-accent)] mt-1">
                  {treatment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
