"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

type Props = {
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  locale: string;
  index: number;
};

export default function BeforeAfterRevealSlide({
  beforeImage,
  afterImage,
  locale,
  index,
}: Props) {
  const isTH = locale === "th";
  const beforeLabel = isTH ? "ก่อน" : "Before";
  const afterLabel = isTH ? "หลัง" : "After";

  // Handle position, 0–100. Left of the handle shows BEFORE, right shows AFTER.
  const [percent, setPercent] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleRef.current?.focus();
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClientX(e.clientX);
  };
  const endDrag = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPercent(0);
    else if (e.key === "End") setPercent(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative w-full aspect-square overflow-hidden radius-soft bg-[var(--color-accent-pale)] cursor-ew-resize select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* AFTER — base layer, fills the frame */}
      <Image
        src={afterImage.src}
        alt={afterImage.alt}
        fill
        draggable={false}
        className="object-cover pointer-events-none select-none"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* BEFORE — overlay, clipped to the left of the handle */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          fill
          draggable={false}
          className="object-cover pointer-events-none select-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Labels — each fades out as the handle nears its own edge, so neither
          shows on the wrong side (and no half-clipped label mid-drag) */}
      <span
        className={`absolute bottom-3 left-3 z-20 text-[10px] font-semibold tracking-[0.14em] uppercase text-white/90 bg-[rgba(26,31,58,0.55)] backdrop-blur-sm px-2.5 py-1 pointer-events-none transition-opacity duration-200 ${
          percent > 14 ? "opacity-100" : "opacity-0"
        }`}
      >
        {beforeLabel}
      </span>
      <span
        className={`absolute bottom-3 right-3 z-20 text-[10px] font-semibold tracking-[0.14em] uppercase text-white/90 bg-[rgba(26,31,58,0.55)] backdrop-blur-sm px-2.5 py-1 pointer-events-none transition-opacity duration-200 ${
          percent < 86 ? "opacity-100" : "opacity-0"
        }`}
      >
        {afterLabel}
      </span>

      {/* Handle — thin line + circular knob (functional drag affordance,
          an intentional exception to the sharp-edge rule, like ContactWidget) */}
      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label={
          isTH
            ? `เปรียบเทียบก่อน–หลัง เคสที่ ${index + 1}`
            : `Before and after comparison, case ${index + 1}`
        }
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        aria-valuetext={`${Math.round(percent)}% ${beforeLabel}`}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-30 -translate-x-1/2 flex items-center justify-center outline-none group/handle"
        style={{ left: `${percent}%` }}
      >
        {/* vertical divider */}
        <div className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.3)]" />
        {/* knob */}
        <div className="relative w-9 h-9 rounded-full bg-white shadow-[0_2px_10px_rgba(26,31,58,0.35)] flex items-center justify-center ring-2 ring-white/70 group-focus-visible/handle:ring-[var(--color-accent)] transition-[box-shadow]">
          <ChevronsLeftRight
            size={18}
            className="text-[var(--color-primary)]"
          />
        </div>
      </div>
    </div>
  );
}
