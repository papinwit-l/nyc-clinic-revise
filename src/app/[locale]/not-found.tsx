"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import th from "@/i18n/dictionaries/th/notFound";
import en from "@/i18n/dictionaries/en/notFound";

/**
 * Locale-aware 404, rendered inside the [locale] layout (header, footer,
 * fonts). not-found files receive no params, so the locale comes from the
 * path — hence a client component. Both dictionaries are tiny and imported
 * directly for the same reason.
 *
 * Navy ground: the fixed header's scrim is built for dark grounds, and a 404
 * reads better as a single composed screen than as a page with a header band.
 * Next adds noindex to 404 responses automatically.
 */

const LINKS = [
  { key: "services", path: "/services" },
  { key: "beforeAfter", path: "/before-after" },
  { key: "doctors", path: "/doctors" },
  { key: "contact", path: "/contact" },
] as const;

export default function NotFound() {
  const pathname = usePathname() ?? "";
  const locale = pathname.split("/")[1] === "en" ? "en" : "th";
  const t = locale === "en" ? en : th;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] min-h-[80vh] flex items-center pt-32 pb-20">
      {/* Rose-gold hairline at the foot: the footer is navy too, and without
          it the two run together into one block. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent) 50%, transparent)",
        }}
      />
      <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto px-6 sm:px-12 text-center">
        <p
          aria-hidden
          className="text-[clamp(6rem,18vw,11rem)] leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            backgroundImage:
              "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent-pale) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </p>

        <div
          aria-hidden
          className="flex items-center justify-center gap-3 mt-6"
        >
          <span
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent))",
            }}
          />
          <span className="w-2 h-2 rotate-45 border border-[var(--color-accent)]" />
          <span
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent), transparent)",
            }}
          />
        </div>

        <h1
          className={`pt-7 text-[var(--color-on-primary)] ${
            isTH ? "text-[1.6rem]" : "text-[1.8rem]"
          }`}
          style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
        >
          {t.heading}
        </h1>
        <p
          className={`pt-3 max-w-md mx-auto text-[var(--color-on-primary-muted)] ${
            isTH ? "leading-[1.95]" : "leading-[1.8]"
          }`}
          style={{ fontFamily: bodyFont, fontWeight: 300 }}
        >
          {t.text}
        </p>

        <div className="pt-9">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-3.5 text-[0.95rem] font-medium transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.home}
          </Link>
        </div>

        <nav
          aria-label={t.linksLabel}
          className="pt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          {LINKS.map(({ key, path }) => (
            <Link
              key={key}
              href={`/${locale}${path}`}
              className="text-sm text-[var(--color-accent-pale)] hover:text-white transition-colors"
              style={{ fontFamily: bodyFont }}
            >
              {t.links[key]}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
