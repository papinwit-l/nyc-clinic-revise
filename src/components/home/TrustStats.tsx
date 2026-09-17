"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * Stats strip — the one place on the homepage where the guide's "rose-gold
 * gradient on dark backgrounds for maximum impact" belongs. It was flat
 * accent at 36px/700; Playfair's thick/thin contrast only shows at scale and
 * lighter weight, so the numerals are now ~70px at 400 with the gradient fill
 * (same background-clip technique as .shimmer-text on the hero logo).
 *
 * Count-up runs once when the strip enters view. Respects
 * prefers-reduced-motion by rendering the final value immediately — the
 * global CSS rule only covers CSS animation, not a JS counter.
 *
 * Dropped from four stats to three: "board-certified" was a tick standing
 * where a number should be, and at this scale it reads as a placeholder.
 * That claim is carried by the awards band directly below.
 */

type Props = {
  t: Dictionary["home"]["trust"];
  locale: string;
};

type Stat = {
  to: number;
  suffix?: string;
  unit?: string;
  label: string;
};

const GRADIENT =
  "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent-pale) 100%)";

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    // Reduced motion: land on the final value, but still defer out of the
    // effect body — a synchronous setState here triggers a cascading render.
    if (reduced) {
      frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle, so big numbers feel earned
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function StatItem({
  stat,
  active,
  isTH,
}: {
  stat: Stat;
  active: boolean;
  isTH: boolean;
}) {
  const value = useCountUp(stat.to, active);

  return (
    <div className="text-center lg:px-8">
      <p
        className="stat-number text-[clamp(2.25rem,4.6vw,3.25rem)]"
        style={{
          fontWeight: 400,
          backgroundImage: GRADIENT,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value.toLocaleString("en-US")}
        {stat.suffix}
        {stat.unit && (
          <span
            className="text-[0.4em] font-normal ml-1.5 tracking-normal align-middle"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {stat.unit}
          </span>
        )}
      </p>
      <p
        className={`mt-3 text-[var(--color-on-primary-muted)] ${
          isTH
            ? "text-[0.85rem] font-normal"
            : "text-[11px] tracking-[0.16em] uppercase font-medium"
        }`}
        style={{
          fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function TrustStats({ t, locale }: Props) {
  const isTH = locale === "th";
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const stats: Stat[] = [
    { to: 15, suffix: "+", unit: isTH ? "ปี" : "yrs", label: t.experience },
    { to: 10000, suffix: "+", label: t.cases },
    { to: 4, label: t.specialists },
  ];

  return (
    <div className="bg-[var(--color-primary)] border-y border-[var(--color-accent-border)]">
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 py-12 sm:py-14"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-[var(--color-accent-border)]">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} active={active} isTH={isTH} />
          ))}
        </div>
      </div>
    </div>
  );
}
