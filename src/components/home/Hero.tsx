"use client";

import HeroSlideImage from "@/components/shared/HeroSlideImage";
import type { HeroContent } from "@/data/hero";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LineIcon } from "@/components/shared/SocialIcons";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import HeroLogo from "@/components/shared/HeroLogo";


// Matches the header's lg breakpoint (1024px) — below this, video
// never loads, mobile gets the image slideshow only.
const DESKTOP_QUERY = "(min-width: 1024px)";

const SLIDE_INTERVAL_MS = 6000;

/**
 * Thai has no spaces between words, so a browser breaks Thai text at its own
 * algorithmic boundaries — which split "ทางการแพทย์" across two lines here.
 * The spaces in our Thai strings are deliberate PHRASE separators, so make
 * them the only break opportunity: each phrase becomes an inline-block, which
 * can't be broken internally unless it alone exceeds the line.
 *
 * Latin text is returned untouched — normal word wrapping is correct there.
 */
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

type Props = {
  t: Dictionary["home"]["hero"];
  locale: string;
  /** From Site Settings — this is a client component. */
  lineUrl: string;
  /** From getHero(): Hero Slides + the optional desktop intro video. */
  hero: HeroContent;
};

export default function Hero({ t, locale, lineUrl, hero }: Props) {
  const { slides, video } = hero;
  const isTH = locale === "th";
  // Server/first client render always renders the slideshow — this
  // avoids any hydration mismatch. The video is only swapped in
  // client-side, after mount, on desktop viewports.
  const [showVideo, setShowVideo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const videoPlayedRef = useRef(false);

  // Decide desktop vs mobile, and react if the viewport crosses the
  // breakpoint (e.g. rotating a tablet) — but never replay the video
  // once it has already finished once this session.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);

    const apply = () => {
      if (videoPlayedRef.current) {
        setShowVideo(false);
        return;
      }
      setShowVideo(!!video && mql.matches);
    };

    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [video]);

  // Slideshow auto-advance — only runs while the video isn't showing.
  useEffect(() => {
    if (showVideo || slides.length < 2) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [showVideo, slides.length]);

  const handleVideoEnded = () => {
    videoPlayedRef.current = true;
    setShowVideo(false);
  };

  return (
    <section className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      <div className="absolute inset-0">
        {showVideo && video ? (
          <video
            key="hero-video"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={video}
            poster={slides[0]?.desktop}
            autoPlay
            muted
            playsInline
            preload="auto"
            // Intentionally no `loop` — plays once, then hands off
            // to the image slideshow via onEnded.
            onEnded={handleVideoEnded}
          />
        ) : (
          slides.map((slide, i) => (
            <HeroSlideImage
              key={slide.desktop}
              slide={slide}
              priority={i === 0}
              className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        )}
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
        <h1>
          <HeroLogo className="hero-text-shadow" />
        </h1>

        <div className="divider-diamond my-6 sm:my-8">
          <span />
        </div>

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
          {phraseWrap(t.tagline, isTH)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full sm:w-auto"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            <LineIcon className="w-4 h-4" />
            {t.ctaLine}
          </a>
          <Link
            href={`/${locale}/services`}
            className="btn-ghost-on-primary w-full sm:w-auto"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
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
