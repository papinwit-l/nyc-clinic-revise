"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Number that rolls up once when scrolled into view.
 *
 * Extracted so Trust Bar and Doctors share one implementation rather than
 * drifting apart. Renders only the numeral (+ optional suffix/unit) — all
 * typography comes from the caller, so it stays neutral.
 *
 * - Fires once, then disconnects. Re-counting on scroll-back feels unstable.
 * - Reduced motion is checked in JS, not just CSS: the global stylesheet rule
 *   only flattens CSS transitions, and this is a JS-driven counter.
 * - Server renders the FINAL value, so the number is never missing or zero if
 *   JS fails; the client resets to 0 and animates after mount.
 */

type Props = {
  to: number;
  /** Appended directly after the numeral, e.g. "+". */
  suffix?: string;
  /** Smaller trailing unit, e.g. "yrs" / "ปี". Styled by the caller. */
  unit?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  durationMs?: number;
};

export default function CountUp({
  to,
  suffix = "",
  unit,
  className = "",
  style,
  durationMs = 1600,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the final value so the server output is correct without JS.
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    // Deferred out of the effect body — a synchronous setState here triggers a
    // cascading render.
    const raf = requestAnimationFrame(() => {
      setValue(0);
      setArmed(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / durationMs, 1);
          // easeOutExpo — fast start, long settle, so big numbers feel earned
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setValue(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed, to, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {value.toLocaleString("en-US")}
      {suffix}
      {unit}
    </span>
  );
}
