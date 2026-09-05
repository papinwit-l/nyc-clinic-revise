"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Doctor } from "@/types/doctor";

type Props = {
  t: Dictionary["home"]["doctors"];
  locale: string;
  data: Doctor[];
};

// Hero case count for the featured spread.
// NOTE: matches bioEn/credentials/project-reference (15+ yrs · 10,000+ cases).
// The Doctor.experience field currently reads "20+ yrs · 40,000+ cases" — a data
// conflict flagged for the client to reconcile. Hardcoded here, as the old card was.
const CASE_COUNT = 10000;

export default function Doctors({ t, locale, data }: Props) {
  const isTH = locale === "th";
  const featured = data.find((d) => d.featured) ?? data[0];
  const team = data.filter((d) => d.slug !== featured.slug);

  // Specialty tags derived from real data (dot-separated string → chips).
  const tags = (isTH ? featured.specialtyTh : featured.specialty)
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  // ── One orchestrated reveal + count-up. Progressive enhancement:
  // without JS (or with reduced motion) everything renders visible and the
  // number shows its final value immediately. ──
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animEnabled, setAnimEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(CASE_COUNT);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // leave content visible, count at final value
    }
    setAnimEnabled(true);

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setInView(true);

          // count-up from 0 → CASE_COUNT (easeOutCubic)
          const dur = 1400;
          const start = performance.now();
          setCount(0);
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * CASE_COUNT));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(CASE_COUNT);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (i: number) =>
    ({
      className: `jd-reveal${inView ? " in" : ""}`,
      style: { transitionDelay: `${i * 100}ms` },
    }) as const;

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      {/* Reveal + count styles — scoped, follows the TrustBar inline-<style> pattern.
          Base state is visible; the hidden-then-reveal only applies under
          .jd-anim, which is added on the client when motion is allowed. */}
      <style>{`
        .jd-anim .jd-reveal {
          opacity: 0;
          transform: translateY(14px);
        }
        .jd-anim .jd-portrait {
          transform: translateX(-24px);
        }
        .jd-anim .jd-reveal.in {
          opacity: 1;
          transform: none;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .jd-anim .jd-reveal,
          .jd-anim .jd-portrait { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Section header — left-aligned on desktop to share the editorial left spine */}
        <div className="text-center lg:text-left mb-12 sm:mb-16">
          <span
            className="section-label"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.label}
          </span>
          <h2
            className="section-heading text-3xl sm:text-4xl mt-3"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {t.heading}
          </h2>
        </div>

        {/* ── Featured doctor (Dr. Jing) — editorial spread ── */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 lg:grid-cols-[minmax(280px,42%)_1fr] gap-8 lg:gap-16 items-center mb-16 sm:mb-24 ${
            animEnabled ? "jd-anim" : ""
          }`}
        >
          {/* Portrait — soft radius (patient-facing) with an offset navy block
              behind it: sharp navy vs. soft photo embodies the radius rule. */}
          <div
            {...reveal(0)}
            className={`${reveal(0).className} jd-portrait relative max-w-md w-full mx-auto lg:mx-0`}
          >
            <div
              aria-hidden
              className="absolute -left-4 -bottom-4 w-[62%] h-[62%] bg-[var(--color-primary)] z-0"
            />
            <Link
              href={`/${locale}/doctors#${featured.slug}`}
              className="group relative z-[1] block aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)] radius-soft shadow-[0_20px_50px_rgba(26,31,58,0.18)]"
            >
              <Image
                src={featured.image}
                alt={`${featured.nameEn} — ${featured.nameTh}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </Link>
          </div>

          {/* Editorial column — left-aligned, breaks the centered rhythm */}
          <div className="text-center lg:text-left">
            {/* Role — quiet inline label, not a centered all-caps eyebrow */}
            <span
              {...reveal(1)}
              className={`${reveal(1).className} inline-flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent-dark)] before:content-[''] before:w-6 before:h-px before:bg-[var(--color-accent)]`}
              style={{
                ...reveal(1).style,
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {t.badge}
            </span>

            {/* Display name — brand name at real display scale (font by language) */}
            <h3
              {...reveal(2)}
              className={`${reveal(2).className} font-semibold leading-[1.02] tracking-[-0.01em] text-[var(--color-primary)] mt-3 text-[clamp(2.4rem,5.5vw,4.25rem)]`}
              style={{
                ...reveal(2).style,
                fontFamily: isTH
                  ? "var(--font-thai-head)"
                  : "var(--font-display)",
              }}
            >
              {isTH ? featured.nameTh : featured.nameEn}
            </h3>

            {/* Formal names — Thai (Anuphan) + English (Playfair), identity not copy */}
            <div {...reveal(3)} className={reveal(3).className}>
              <p
                className="text-[var(--color-accent-dark)] text-base sm:text-lg mt-1.5"
                style={{ fontFamily: "var(--font-thai-head)" }}
              >
                {featured.fullNameTh}
              </p>
              <p
                className="text-[var(--color-text-subtle)] text-sm mt-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured.fullNameEn}
              </p>
            </div>

            {/* Hero graphic — the one bold element: oversized case count */}
            <div {...reveal(4)} className={`${reveal(4).className}`}>
              <div
                className="block font-bold leading-[1] tracking-[-0.03em] text-[var(--color-primary)] text-[clamp(4rem,13vw,10rem)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span>{count.toLocaleString()}</span>
                <span className="text-[var(--color-accent)]">+</span>
              </div>
              <span
                className="block text-[clamp(0.7rem,1.1vw,0.82rem)] font-semibold tracking-[0.22em] uppercase text-[var(--color-text-muted)] mt-3"
                style={{
                  fontFamily: isTH
                    ? "var(--font-thai-body)"
                    : "var(--font-body)",
                }}
              >
                {isTH ? "เคสร้อยไหมจมูก" : "Nose thread lift cases"}
              </span>
            </div>

            <div className="divider-accent mt-6 mb-6 mx-auto lg:mx-0" />

            {/* Bio — narrow measure, font follows text language */}
            <p
              {...reveal(5)}
              className={`${reveal(5).className} text-[var(--color-text-muted)] text-sm sm:text-base font-light leading-relaxed max-w-[46ch] mx-auto lg:mx-0`}
              style={{
                ...reveal(5).style,
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {isTH
                ? (featured.bioTh ?? featured.specialtyTh)
                : (featured.bioEn ?? featured.specialty)}
            </p>

            {/* Specialty tags — sharp (structural labels) */}
            <div
              {...reveal(6)}
              className={`${reveal(6).className} flex flex-wrap gap-2.5 mt-6 justify-center lg:justify-start`}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.72rem] font-medium tracking-[0.06em] text-[var(--color-primary)] px-3.5 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface)]"
                  style={{
                    fontFamily: isTH
                      ? "var(--font-thai-body)"
                      : "var(--font-body)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA — sharp navy, no arrow */}
            <Link
              {...reveal(7)}
              href={`/${locale}/doctors#${featured.slug}`}
              className={`${reveal(7).className} inline-flex items-center mt-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-[var(--color-accent-pale)] px-9 py-3.5 text-[0.78rem] font-semibold tracking-[0.15em] uppercase transition-colors`}
              style={{
                ...reveal(7).style,
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {isTH ? `ดูประวัติ${featured.nameTh}` : `Meet ${featured.nameEn}`}
            </Link>
          </div>
        </div>

        {/* ── Secondary doctors — supporting cast: left-aligned on desktop,
            portraits muted until hover so the hierarchy reads as a choice,
            not just a size downgrade. ── */}
        <div>
          <p
            className="text-center lg:text-left text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-subtle)] font-semibold mb-8"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.teamHeading}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto lg:mx-0">
            {team.map((doc) => (
              <Link
                key={doc.slug}
                href={`/${locale}/doctors#${doc.slug}`}
                className="group text-center lg:text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)] radius-soft">
                  <Image
                    src={doc.image}
                    alt={`${doc.nameEn} — ${doc.nameTh}`}
                    fill
                    // Muted only on hover-capable devices (desktop); touch shows
                    // full colour since there's no hover to restore it.
                    className="object-cover object-top transition-[transform,filter] duration-500 group-hover:scale-105 [@media(hover:hover)]:grayscale-[0.5] [@media(hover:hover)]:group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
                <div className="mt-3">
                  <h3
                    className="text-sm sm:text-base font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {doc.nameEn}
                  </h3>
                  <p
                    className="text-[var(--color-accent)] text-xs sm:text-sm mt-0.5"
                    style={{ fontFamily: "var(--font-thai-head)" }}
                  >
                    {doc.nameTh}
                  </p>
                  <p
                    className="text-[var(--color-text-muted)] text-[11px] sm:text-xs mt-1"
                    style={{
                      fontFamily: isTH
                        ? "var(--font-thai-body)"
                        : "var(--font-body)",
                    }}
                  >
                    {isTH ? doc.specialtyTh : doc.specialty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section CTA — aligned to the same left spine on desktop */}
        <div className="text-center lg:text-left mt-10 sm:mt-12">
          <Link
            href={`/${locale}/doctors`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
