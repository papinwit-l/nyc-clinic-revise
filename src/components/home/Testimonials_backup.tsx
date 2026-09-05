import Image from "next/image";
import { Star } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { TestimonialCard } from "@/types/testimonial";

type Props = {
  t: Dictionary["home"]["testimonials"];
  locale: string;
  data: TestimonialCard[];
};

export default function Testimonials({ t, locale, data }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  // Quote face follows the text's language — the brand's quote pairing:
  // Cormorant Garamond (EN) / Mitr (TH), via .tagline / .tagline-th.
  const quoteClass = isTH ? "tagline-th" : "tagline";

  return (
    <section
      className="py-[var(--section-py)]"
      style={{ backgroundColor: "var(--color-accent-pale)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-4">
          <span className="section-label" style={{ fontFamily: bodyFont }}>
            {t.label}
          </span>
          <h2
            className="section-heading text-3xl sm:text-4xl mt-3 text-[var(--color-primary)]"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {t.heading}
          </h2>
        </div>

        {/* Brand diamond motif — used once, sparingly, as this section's signature */}
        <div className="divider-diamond mb-10" aria-hidden>
          <span />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(({ id, quote, name, treatment, rating, avatar }) => (
            <figure
              key={id}
              className="relative bg-white radius-soft p-7 sm:p-8 flex flex-col overflow-hidden"
            >
              {/* Oversized decorative quotation mark — editorial signature */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-5 text-[6rem] leading-none select-none"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "rgba(196,149,106,0.16)",
                }}
              >
                &ldquo;
              </span>

              {/* Quote — brand quote face, pull-quote size */}
              <blockquote
                className={`${quoteClass} relative z-10 text-lg text-[var(--color-text)] mt-6 flex-1`}
              >
                {quote}
              </blockquote>

              {/* Reviewer footer — reviewer left, rating right */}
              <figcaption className="relative z-10 mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
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
                  <div className="min-w-0">
                    {/* Name — Thai font (reviewer names are Thai) */}
                    <p
                      className="text-[var(--color-primary)] text-sm font-medium truncate"
                      style={{ fontFamily: "var(--font-thai-body)" }}
                    >
                      {name}
                    </p>
                    {/* Treatment — English label */}
                    <p
                      className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-accent)] mt-0.5 truncate"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {treatment}
                    </p>
                  </div>
                </div>

                {/* Stars — rose-gold */}
                <div
                  className="flex gap-0.5 shrink-0"
                  aria-label={`${rating} / 5`}
                >
                  {Array.from({ length: rating }, (_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                    />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
