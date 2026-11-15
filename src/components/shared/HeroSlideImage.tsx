import Image, { getImageProps } from "next/image";
import type { HeroSlide } from "@/data/hero";

/** Matches the header's lg breakpoint — also where the desktop video starts. */
const DESKTOP_MEDIA = "(min-width: 1024px)";

type Props = {
  slide: HeroSlide;
  priority?: boolean;
  className?: string;
};

/**
 * A full-bleed hero background. With a mobile image it becomes a <picture>
 * (art direction): the browser downloads only the one matching the screen.
 * Without one, a plain cover image.
 */
export default function HeroSlideImage({ slide, priority, className }: Props) {
  const common = { alt: "", fill: true, sizes: "100vw", priority, className };
  if (!slide.mobile) return <Image src={slide.desktop} {...common} alt="" />;

  // Unoptimized images (next.config) come back with src only, no srcSet.
  const desktop = getImageProps({ ...common, src: slide.desktop }).props;
  const { srcSet, ...img } = getImageProps({ ...common, src: slide.mobile }).props;
  const desktopSet = desktop.srcSet ?? desktop.src;
  const mobileSet = srcSet ?? img.src;

  return (
    <picture>
      <source media={DESKTOP_MEDIA} srcSet={desktopSet} />
      <source srcSet={mobileSet} />
      {/* Decorative background — the hero's text carries the meaning. */}
      <img {...img} alt="" />
    </picture>
  );
}
