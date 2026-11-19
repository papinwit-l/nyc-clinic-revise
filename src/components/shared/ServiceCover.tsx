import Image from "next/image";
import type { CoverFit, CoverPosition } from "@/types/service";

const POSITION: Record<CoverPosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

/**
 * A service image filling its card (parent must be `relative` with a size).
 *
 *   fill  object-cover — position picks which part stays visible
 *   fit   object-contain — the whole image, nothing cropped (images with
 *         text in them); a blurred, enlarged copy fills the rest of the card
 *         so there are no empty bars. Position picks where the image sits.
 *
 * `className` carries hover effects etc. and applies to the main image.
 */
export default function ServiceCover({
  src,
  alt,
  fit = "fill",
  position = "center",
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  fit?: CoverFit;
  position?: CoverPosition;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const pos = POSITION[position];
  if (fit === "fill") {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${pos} ${className}`}
      />
    );
  }
  return (
    <>
      {/* Decorative backdrop — small, blurred; hidden from screen readers. */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="160px"
        className="object-cover scale-125 blur-2xl brightness-90"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-contain ${pos} ${className}`}
      />
    </>
  );
}
