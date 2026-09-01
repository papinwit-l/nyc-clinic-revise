"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import LangSwitcher from "@/components/shared/LangSwitcher";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

// ─── Constants ──────────────────────────────────────
// No LINE/phone CTA in the header — that's handled by the
// persistent floating widget (see header-widget-mockup.html).
// Header is nav-only.

const NAV_KEYS = [
  { key: "home" as const, path: "" },
  { key: "about" as const, path: "/about" },
  { key: "doctors" as const, path: "/doctors" },
  { key: "services" as const, path: "/services" },
  { key: "beforeAfter" as const, path: "/before-after" },
  { key: "blog" as const, path: "/blog" },
  { key: "contact" as const, path: "/contact" },
];

// ─── Component ──────────────────────────────────────

type Props = {
  locale: Locale;
  t: Dictionary["nav"];
};

export default function Header({ locale, t }: Props) {
  const isTH = locale === "th";
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll → data attribute (no re-render)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const check = () => {
      const isScrolled = window.scrollY > 40;
      if (el.dataset.scrolled !== String(isScrolled)) {
        el.dataset.scrolled = String(isScrolled);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, []);

  const localePath = (path: string) => `/${locale}${path}`;

  const isActive = (path: string) => {
    const full = localePath(path);
    return full === `/${locale}` && path === ""
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(full);
  };

  return (
    <>
      <style>{`
        .site-header {
          /* Permanent scrim, not just on scroll — nav text needs to stay
             legible over whatever the hero media happens to be (dark
             portrait photo, bright interior render, video frame, etc.),
             not only after the solid background kicks in. */
          background: linear-gradient(
            180deg,
            rgba(26, 31, 58, 0.30) 0%,
            rgba(26, 31, 58, 0.55) 100%
          );
          border-bottom: 1px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .site-header[data-scrolled="true"] {
          background: rgba(26, 31, 58, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom-color: var(--color-accent-border);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <header
        ref={headerRef}
        className="site-header fixed top-0 left-0 right-0 z-50"
      >
        {/* Main nav */}
        <div className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-between h-[var(--header-height)]">
          <Link
            href={localePath("")}
            className="shrink-0"
            aria-label="NYC Clinic — home"
          >
            <Logo variant="primary" size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_KEYS.map(({ key, path }) => (
              <Link
                key={key}
                href={localePath(path)}
                className={`
                  relative px-3 xl:px-4 py-2
                  text-[0.75rem] font-medium tracking-[0.1em] uppercase
                  transition-colors duration-200
                  ${
                    isActive(path)
                      ? "text-[var(--color-accent)]"
                      : "text-white/80 hover:text-white"
                  }
                `}
              >
                <span
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                    fontSize: isTH ? "0.9rem" : "0.75rem",
                  }}
                >
                  {t[key]}
                </span>
                {isActive(path) && (
                  <span className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-px bg-[var(--color-accent)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Lang + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LangSwitcher locale={locale} />
            </div>
            <button
              type="button"
              onClick={openMobile}
              className="lg:hidden p-2 -mr-2 text-white hover:text-[var(--color-accent)] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 z-[60] lg:hidden transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="absolute inset-0 bg-black/60" onClick={closeMobile} />
        <div
          className={`
            absolute top-0 right-0 bottom-0 w-full max-w-sm
            bg-[var(--color-primary)] flex flex-col
            transition-transform duration-300 ease-out
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between px-6 h-[var(--header-height-mobile)]">
            <Logo variant="primary" size="sm" layout="mark" />
            <button
              type="button"
              onClick={closeMobile}
              className="p-2 -mr-2 text-[var(--color-on-primary-muted)] hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="mx-6 h-px bg-[var(--color-accent-border)]" />

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-1">
              {NAV_KEYS.map(({ key, path }) => (
                <li key={key}>
                  <Link
                    href={localePath(path)}
                    onClick={closeMobile}
                    className={`
                      flex items-center py-3.5
                      border-b border-[var(--color-accent-border)]/30
                      transition-colors duration-200
                      ${
                        isActive(path)
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-on-primary-muted)] hover:text-white"
                      }
                    `}
                  >
                    <span
                      className="text-sm font-medium tracking-[0.1em] uppercase"
                      style={{
                        fontFamily: isTH
                          ? "var(--font-thai-body)"
                          : "var(--font-body)",
                      }}
                    >
                      {t[key]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8 space-y-4">
            <div className="h-px bg-[var(--color-accent-border)]" />
            <div className="flex items-center justify-between py-2">
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-primary-muted)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Language
              </span>
              <LangSwitcher locale={locale} />
            </div>
            <p
              className="text-xs text-[var(--color-on-primary-muted)]/70 leading-relaxed"
              style={{
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {isTH
                ? "ใช้ปุ่ม LINE / โทร ที่มุมหน้าจอเพื่อติดต่อเราได้ตลอดเวลา"
                : "Use the LINE / call button in the corner to reach us anytime."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
