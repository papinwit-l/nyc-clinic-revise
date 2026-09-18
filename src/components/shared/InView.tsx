"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entrance animation on scroll. JS only toggles a class — the motion itself
 * lives in globals.css, so it is already covered by the global
 * prefers-reduced-motion rule.
 *
 * Deliberate choices:
 *
 * - **Server renders the VISIBLE state.** The hidden state is added on the
 *   client after mount. If JS fails or is slow, content is never invisible —
 *   the worst case is no animation, not missing text.
 * - **Fires once**, then disconnects. Re-animating on scroll-back makes a page
 *   feel unstable when someone scrolls up to re-read.
 * - **Reduced motion is checked in JS too**, not just CSS: skip straight to
 *   the visible state so nothing depends on the stylesheet alone.
 * - `rootMargin` pulls the trigger 10% up from the bottom edge — firing on the
 *   first visible pixel means the animation finishes before anyone looks.
 * - Animates opacity/transform only (see .in-view-* in globals.css). Anything
 *   else triggers layout and janks scroll on mid-range Android.
 */

type Props = {
  children: React.ReactNode;
  /** Stagger index — multiplied by 60ms. For sets, e.g. the awards shelf. */
  index?: number;
  /** Extra classes on the wrapper. */
  className?: string;
  /** Animation variant; matches a .in-view-<name> class in globals.css. */
  variant?: "fade" | "rise" | "scale";
};

export default function InView({
  children,
  index = 0,
  className = "",
  variant = "rise",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Starts armed=false so the server output carries no hidden state.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    // Deferred out of the effect body: a synchronous setState here triggers a
    // cascading render. One frame is imperceptible, and anything already in
    // view resolves to `shown` on the observer's first callback anyway.
    const raf = requestAnimationFrame(() => setArmed(true));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`in-view-${variant} ${armed && !shown ? "is-hidden" : ""} ${className}`}
      style={index ? { transitionDelay: `${index * 60}ms` } : undefined}
    >
      {children}
    </div>
  );
}
