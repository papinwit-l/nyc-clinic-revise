import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, ShieldCheck, Repeat } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ServiceCard } from "@/types/service";

const ICONS = [Sparkles, Clock, ShieldCheck, Repeat];

type Props = {
  t: Dictionary["home"]["signature"];
  tCommon: Dictionary["common"];
  locale: string;
  data: ServiceCard;
};

export default function SignatureSpotlight({
  t,
  tCommon,
  locale,
  data,
}: Props) {
  return (
    <section className="bg-[var(--color-primary)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-primary)] to-transparent pt-16 pb-6 px-6">
              <span className="badge">10,000+ Cases</span>
            </div>
          </div>

          <div>
            <span className="section-label">{t.label}</span>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-white mt-3 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h2>
            <p className="text-[var(--color-accent)] text-lg mt-1">
              {t.subtitle}
            </p>
            <p className="text-[var(--color-on-primary-muted)] mt-6 leading-relaxed">
              {t.description}
            </p>

            <ul className="mt-8 space-y-5">
              {t.benefits.map((text, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <p className="text-white text-sm font-medium pt-2.5">
                      {text}
                    </p>
                  </li>
                );
              })}
            </ul>

            <Link
              href={`/${locale}/services/${data.slug}`}
              className="btn-cta mt-10 inline-flex"
              style={{
                fontFamily:
                  locale === "th"
                    ? "var(--font-thai-body)"
                    : "var(--font-body)",
              }}
            >
              {tCommon.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
