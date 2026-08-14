"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

const LABELS: Record<Locale, string> = {
  th: "TH",
  en: "EN",
};

type Props = {
  locale: Locale;
};

export default function LangSwitcher({ locale }: Props) {
  const pathname = usePathname();

  // Replace current locale prefix with target locale
  const getLocalePath = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/");
  };

  return (
    <div className="flex items-center border border-[var(--color-accent-border)]">
      {locales.map((code) => (
        <Link
          key={code}
          href={getLocalePath(code)}
          className={`
            px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase
            transition-all duration-200
            ${
              code === locale
                ? "bg-[var(--color-accent)] text-white"
                : "bg-transparent text-[var(--color-on-primary-muted)] hover:text-white hover:bg-white/5"
            }
          `}
          aria-label={`Switch to ${LABELS[code]}`}
          aria-current={code === locale ? "true" : undefined}
        >
          {LABELS[code]}
        </Link>
      ))}
    </div>
  );
}
