"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LineIcon } from "@/components/shared/SocialIcons";
import LangSwitcher from "@/components/shared/LangSwitcher";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

// ─── Constants ──────────────────────────────────────

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";

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
          background: transparent;
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
        .site-header__topbar {
          max-height: 2.25rem;
          opacity: 1;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.2s ease;
        }
        .site-header[data-scrolled="true"] .site-header__topbar {
          max-height: 0;
          opacity: 0;
        }
      `}</style>

      <header
        ref={headerRef}
        className="site-header fixed top-0 left-0 right-0 z-50"
      >
        {/* Top bar */}
        <div className="site-header__topbar hidden lg:block">
          <div className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-end gap-6 h-9 text-[11px] tracking-[0.12em] uppercase">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 text-[var(--color-on-primary-muted)] hover:text-[var(--color-accent-pale)] transition-colors"
            >
              <PhoneIcon className="w-3 h-3" />
              {PHONE}
            </a>
            <span className="w-px h-3 bg-[var(--color-on-primary-muted)]/30" />
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              @nyc-clinic
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-between h-[var(--header-height)]">
          <Link href={localePath("")} className="shrink-0">
            <Image
              src="/images/nyc-clinic-logo.jpg"
              alt="NYC — New York Clinic, GR"
              width={120}
              height={120}
              className="h-16 w-auto"
              priority
            />
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
                {t[key]}
                {isActive(path) && (
                  <span className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-px bg-[var(--color-accent)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Lang + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LangSwitcher locale={locale} />
            </div>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line hidden lg:inline-flex !py-2.5 !px-5 !text-[0.7rem]"
            >
              <LineIcon className="w-4 h-4" />
              {t.addLine}
            </a>
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
            <Image
              src="/images/nyc-clinic-logo.png"
              alt="NYC"
              width={80}
              height={32}
              className="h-7 w-auto"
            />
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
                    <span className="text-sm font-medium tracking-[0.1em] uppercase">
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
              <span className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-primary-muted)]">
                Language
              </span>
              <LangSwitcher locale={locale} />
            </div>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2.5 py-2 text-[var(--color-on-primary-muted)] hover:text-white transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="text-sm tracking-wider">{PHONE}</span>
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line w-full !text-[0.75rem]"
            >
              <LineIcon className="w-4 h-4" />
              {t.addLine}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
