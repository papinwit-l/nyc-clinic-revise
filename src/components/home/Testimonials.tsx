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
  // The guide's Pull Quote role: Cormorant Garamond Light Italic (EN) /
  // Mitr Light (TH — no italic in Thai, so weight and leading carry it).
  const quoteFont = isTH ? "var(--font-thai-serif)" : "var(--font-accent)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <section
      className="py-[var(--section-py)]"
      // surface-dim, not accent-pale: a full-bleed section in the rose-gold
      // family spent most of the 10% accent budget in one place. Rose-gold now
      // reads where the guide wants it — stars, treatment labels, CTAs.
      style={{ backgroundColor: "var(--color-surface-dim)" }}
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
                  className={`text-[var(--color-primary)] mt-5 flex-1 ${
                    isTH
                      ? "text-[1.05rem] leading-[1.85]"
                      : "text-[1.25rem] leading-[1.5]"
                  }`}
                  style={{
                    fontFamily: quoteFont,
                    fontStyle: isTH ? "normal" : "italic",
                    fontWeight: 300,
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
                      {name.replace(/^(คุณ|นางสาว|นาง|นาย)\s*/, "").charAt(0)}
                    </span>
                  )}
                  <div>
                    {/* Name — always Thai font (names are Thai) */}
                    <p
                      className="text-[var(--color-primary)] text-sm"
                      style={{
                        fontFamily: "var(--font-thai-body)",
                        fontWeight: 600,
                      }}
                    >
                      {name}
                    </p>
                    {/* Treatment — always English */}
                    <p
                      className="text-xs text-[var(--color-accent-dark)] mt-1"
                      style={{ fontFamily: bodyFont, fontWeight: 500 }}
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
