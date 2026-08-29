"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LineIcon } from "@/components/shared/SocialIcons";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const LINE_URL = "https://lin.ee/7oJgymx";

// Plays once on desktop, then hands off to the slideshow below. No loop.
const HERO_VIDEO_SRC = "/videos/hero-intro.mp4";

// Crossfading background slides — used on mobile always, and on
// desktop after the intro video finishes. Add more paths here as
// assets come in; a single entry just renders as a static image.
const HERO_SLIDES = [
  "/images/banner/banner-c.png",
  "/images/banner/banner-c_backup.png",
];

// Matches the header's lg breakpoint (1024px) — below this, video
// never loads, mobile gets the image slideshow only.
const DESKTOP_QUERY = "(min-width: 1024px)";

const SLIDE_INTERVAL_MS = 6000;

type Props = {
  t: Dictionary["home"]["hero"];
  locale: string;
};

export default function Hero({ t, locale }: Props) {
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
      setShowVideo(mql.matches);
    };

    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Slideshow auto-advance — only runs while the video isn't showing.
  useEffect(() => {
    if (showVideo || HERO_SLIDES.length < 2) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [showVideo]);

  const handleVideoEnded = () => {
    videoPlayedRef.current = true;
    setShowVideo(false);
  };

  return (
    <section className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            key="hero-video"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={HERO_VIDEO_SRC}
            poster={HERO_SLIDES[0]}
            autoPlay
            muted
            playsInline
            preload="auto"
            // Intentionally no `loop` — plays once, then hands off
            // to the image slideshow via onEnded.
            onEnded={handleVideoEnded}
          />
        ) : (
          HERO_SLIDES.map((src, i) => (
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
          ))
        )}
        <div className="overlay-gradient absolute inset-0" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 55%, rgba(26,31,58,0.5) 0%, rgba(26,31,58,0.2) 55%, transparent 80%)",
        }}
      />

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
            className="btn-ghost-on-primary w-full sm:w-auto"
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
