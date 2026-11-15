import { cache } from "react";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { getSitePayload } from "./site-settings";

/**
 * Hero imagery for the homepage hero and the service page header.
 *
 *   slides  wp-admin → Hero Slides (drag order). Cache tag "hero_slide".
 *           Each has a desktop image (16:9) and an optional mobile one
 *           (9:16); without it, phones get the desktop image cropped.
 *   video   Page Manage → Home → Intro video (desktop). Cache tag "site".
 *           Plays once on desktop, then the slides take over. null = none.
 *
 * WP with no slides yet → the built-in ones, so the hero is never empty.
 * Without WP_API_URL (local dev) everything below is served.
 */

export type HeroSlide = { desktop: string; mobile: string | null };
export type HeroContent = { slides: HeroSlide[]; video: string | null };

const MOCK_SLIDES: HeroSlide[] = [
  { desktop: "/images/banner/banner-c.png", mobile: null },
  { desktop: "/images/banner/banner-c_backup.png", mobile: null },
];
const MOCK_VIDEO = "/videos/hero-intro.mp4";

type WpFile = { url?: string } | null;
type WpSlide = { desktop_image: WpFile; mobile_image: WpFile };

const urlOf = (f: unknown) =>
  f && typeof (f as WpFile)?.url === "string" ? ((f as { url: string }).url || null) : null;

export const getHero = cache(async (): Promise<HeroContent> => {
  if (!wpConfigured()) return { slides: MOCK_SLIDES, video: MOCK_VIDEO };

  const [rows, { home = {} }] = await Promise.all([
    wpFetch<WpSlide[]>(
      "/wp/v2/hero_slide?per_page=100&orderby=menu_order&order=asc&_fields=desktop_image,mobile_image",
      ["hero_slide"],
    ),
    getSitePayload(),
  ]);
  const slides = rows.flatMap((r) => {
    const desktop = urlOf(r.desktop_image);
    return desktop ? [{ desktop, mobile: urlOf(r.mobile_image) }] : [];
  });
  return {
    slides: slides.length ? slides : MOCK_SLIDES,
    video: urlOf(home.hero_video),
  };
});
