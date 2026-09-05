import Image from "next/image";
import { Star } from "lucide-react";
import type { TestimonialCard } from "@/types/testimonial";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  locale: string;
  data: TestimonialCard[];
};

export default function Testimonials({ locale, data }: Props) {
  const isTH = locale === "th";

  return (
    <section
      className="py-[var(--section-py)]"
      style={{ backgroundColor: "var(--color-accent-pale)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <SectionHeader section="testimonials" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(
            ({ id, quote, name, treatment, rating, avatar, reviewImage }) => (
              <div
                key={id}
                className="bg-white radius-soft p-6 sm:p-8 flex flex-col"
              >
                {/* Review photo — optional */}
                {reviewImage && (
                  <div className="relative aspect-[4/3] -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden rounded-t-[var(--radius-soft)]">
                    <Image
                      src={reviewImage}
                      alt={`${name} — ${treatment}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                {/* Stars — rose-gold */}
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                    />
                  ))}
                </div>

                {/* Quote — font follows text language */}
                <blockquote
                  className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-5 flex-1"
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Reviewer info */}
                <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center gap-3">
                  {/* Avatar or initial */}
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <span
                      className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      {name.replace(/^คุณ/, "").charAt(0)}
                    </span>
                  )}
                  <div>
                    {/* Name — always Thai font (names are Thai) */}
                    <p
                      className="text-[var(--color-primary)] text-sm font-medium"
                      style={{ fontFamily: "var(--font-thai-body)" }}
                    >
                      {name}
                    </p>
                    {/* Treatment — always English */}
                    <p
                      className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-accent)] mt-0.5"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {treatment}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
