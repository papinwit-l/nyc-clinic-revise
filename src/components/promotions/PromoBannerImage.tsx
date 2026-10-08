"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/shared/Lightbox";

/**
 * A promotion banner that opens larger on tap — the artwork has the offer
 * baked in, and small print is hard to read at phone width.
 *
 * Always the full 16:9, never cropped. Sharp corners: promotional/structural
 * content, not patient-facing (radius policy).
 */

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  enlargeLabel: string;
  closeLabel: string;
  /** Set for artwork with no offer baked in: drawn over the right side,
      matching the homepage PromotionsBanner. */
  overlay?: { title: string; offer: string; headFont: string };
};

export default function PromoBannerImage({
  src,
  alt,
  priority,
  enlargeLabel,
  closeLabel,
  overlay,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — ${enlargeLabel}`}
        className="block relative w-full aspect-[16/9] overflow-hidden bg-[var(--color-surface-dim)] cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={overlay ? "object-cover object-left" : "object-cover"}
          sizes="(max-width: 1024px) 100vw, 960px"
        />
        {overlay && (
          <>
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 30%, rgba(26,31,58,0.55) 60%, rgba(26,31,58,0.85) 100%)",
              }}
            />
            <span className="absolute inset-y-0 right-0 w-[58%] flex flex-col justify-center items-end text-right px-[5%]">
              <span
                className="text-white font-bold leading-tight text-[clamp(1rem,3.4vw,2.1rem)]"
                style={{ fontFamily: overlay.headFont }}
              >
                {overlay.title}
              </span>
              <span
                className="pt-[0.5em] text-[var(--color-accent)] font-semibold text-[clamp(0.8rem,2.2vw,1.35rem)]"
                style={{ fontFamily: overlay.headFont }}
              >
                {overlay.offer}
              </span>
            </span>
          </>
        )}
      </button>

      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        closeLabel={closeLabel}
        size="lg"
      >
        <div className="relative w-full aspect-[16/9] bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 960px"
          />
        </div>
      </Lightbox>
    </>
  );
}
