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
};

export default function PromoBannerImage({
  src,
  alt,
  priority,
  enlargeLabel,
  closeLabel,
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
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
        />
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
