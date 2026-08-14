import Link from "next/link";
import Image from "next/image";
import { LineIcon } from "@/components/shared/SocialIcons";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const LINE_URL = "https://lin.ee/7oJgymx";

type Props = {
  t: Dictionary["home"]["hero"];
  locale: string;
};

export default function Hero({ t, locale }: Props) {
  return (
    <section className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      <div className="absolute inset-0">
        <Image
          src="/images/banner/banner-c.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="overlay-gradient absolute inset-0" />
      </div>

      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[15%] rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[30%] rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[45%] rounded-full border border-[var(--color-accent)]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="hero-text-shadow">
          <span className="block font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-bold tracking-[0.1em] text-white leading-none shimmer-text">
            NYC
          </span>
          <span className="block font-[var(--font-body)] text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-on-primary-muted)] mt-3">
            New York Clinic, GR
          </span>
        </h1>

        <div className="divider-diamond my-6 sm:my-8">
          <span />
        </div>

        <p className="tagline text-lg sm:text-xl md:text-2xl text-[var(--color-accent-pale)] hero-text-shadow-sm">
          {t.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full sm:w-auto"
          >
            <LineIcon className="w-4 h-4" />
            {t.ctaLine}
          </a>
          <Link
            href={`/${locale}/services`}
            className="btn-ghost w-full sm:w-auto"
          >
            {t.ctaServices}
          </Link>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <span>{t.scroll}</span>
        <ChevronDown size={16} className="scroll-indicator__arrow" />
      </div>
    </section>
  );
}
