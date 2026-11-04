"use client";

import { HERO_SLIDES, LINE_URL } from "@/lib/site";
import Image from "next/image";
import { Fragment, useState, type ReactNode } from "react";
import HeroLogo from "./HeroLogo";
import { LineIcon } from "./SocialIcons";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * Inner-page header. First used on /doctors; intended for /services,
 * /before-after, /blog and /contact too.
 *
 * Navy ground with a rose-gold gradient heading — the guide's "rose-gold
 * gradient on dark backgrounds for maximum impact", using the same
 * background-clip technique as the hero logo and the Trust Bar numerals.
 *
 * Deliberately NOT parameterised beyond strings. No variant/align/background
 * props until a second page actually needs something different — guessing at
 * those now produces options nobody uses.
 *
 * `pt` accounts for the fixed header.
 */

/** Thai script takes neither tracking nor uppercase — see .section-label-thai. */
const HAS_THAI = /[\u0E00-\u0E7F]/;

type Props = {
  /** Small tracked eyebrow above the heading. */
  label: string;
  heading: string;
  description?: ReactNode;
  locale: string;
};

function phraseWrap(text: string, isTH: boolean) {
  if (!isTH) return text;
  const parts = text.split(/\s+/).filter(Boolean);
  return parts.map((phrase, i) => (
    <Fragment key={`${phrase}-${i}`}>
      {/* Space BETWEEN the boxes, not inside one — a trailing space within an
          inline-block is trimmed, so it renders no gap and creates no break
          opportunity. */}
      {i > 0 && " "}
      <span className="inline-block">{phrase}</span>
    </Fragment>
  ));
}

export default function PageHeaderEnhance({
  label,
  heading,
  description,
  locale,
}: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <section className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      <div className="absolute inset-0">
        {HERO_SLIDES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div className="overlay-gradient absolute inset-0" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        // style={{
        //   background:
        //     "radial-gradient(ellipse 55% 60% at 50% 55%, rgba(26,31,58,0.5) 0%, rgba(26,31,58,0.2) 55%, transparent 80%)",
        // }}
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 55%, rgba(26,31,58,0.5) 0%, rgba(26,31,58,0.2) 10%, transparent 20%)",
        }}
      />

      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[15%] rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[30%] rounded-full border border-[var(--color-accent)]" />
        <div className="absolute inset-[45%] rounded-full border border-[var(--color-accent)]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* <h1>
          <HeroLogo className="hero-text-shadow" />
        </h1>

        <div className="divider-diamond my-6 sm:my-8">
          <span />
        </div> */}

        <p
          className={`text-lg sm:text-xl md:text-2xl text-[var(--color-accent-pale)] hero-text-shadow-sm text-balance ${
            isTH ? "leading-[1.7]" : ""
          }`}
          style={{
            fontFamily: isTH ? "var(--font-thai-serif)" : "var(--font-accent)",
            fontWeight: 300,
            fontStyle: isTH ? "normal" : "italic",
            letterSpacing: isTH ? "0.01em" : "0.03em",
          }}
        >
          {/* {phraseWrap(t.tagline, isTH)} */}
        </p>

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 sm:px-12 text-center">
          <span
            className={
              HAS_THAI.test(label)
                ? "section-label section-label-thai"
                : "section-label"
            }
            style={{
              fontFamily: HAS_THAI.test(label)
                ? "var(--font-thai-body)"
                : "var(--font-body)",
            }}
          >
            {label}
          </span>

          <h1
            className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.15] mt-4"
            style={{
              fontFamily: headFont,
              fontWeight: isTH ? 600 : 400,
              letterSpacing: isTH ? "0" : "-0.01em",
              backgroundImage:
                "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent-pale) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {heading}
          </h1>

          {/* Diamond divider — the brand element, gradient rules either side */}
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

          {description && (
            <p
              className={`text-[var(--color-on-primary-muted)] mt-6 max-w-xl mx-auto ${
                isTH
                  ? "text-[0.95rem] leading-[1.95]"
                  : "text-base leading-[1.85]"
              }`}
              style={{ fontFamily: bodyFont, fontWeight: 300 }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full sm:w-auto"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            <LineIcon className="w-4 h-4" />
            {isTH ? "แอดไลน์ปรึกษาฟรี" : "ASK ON LINE"}
          </a>
        </div>
      </div>
    </section>
  );
}
