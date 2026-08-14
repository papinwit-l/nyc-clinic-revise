import { Star } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { TestimonialCard } from "@/types/testimonial";

type Props = {
  t: Dictionary["home"]["testimonials"];
  data: TestimonialCard[];
};

export default function Testimonials({ t, data }: Props) {
  return (
    <section className="bg-[var(--color-primary)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-white mt-3">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(({ quote, name, treatment, rating }) => (
            <div
              key={name}
              className="bg-[var(--color-primary-mid)] p-6 sm:p-8 flex flex-col border border-[var(--color-accent-border)]"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>
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
