import { cache } from "react";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { MOCK_AWARDS } from "./mock/awards";

/**
 * Industry recognition — supplier and distributor awards, from WordPress
 * (wp-admin → Awards), in drag order (oldest first). Cache tag: "award".
 *
 * The LAST award is the one AwardsShelf shows large on /about; the Awards
 * screen description in wp-admin says so.
 *
 * NOTE ON WORDING: most are engraved "Valued Customer" or "Exclusive
 * Customer" — they recognise the clinic as a significant purchaser, not as
 * holding a clinical qualification. Headings and labels must not imply
 * accreditation.
 *
 * Files are PNG with alpha — the CMS field only accepts PNG, because the
 * transparency is what lets them sit on the band without white boxes.
 *
 * Without WP_API_URL (local dev) the in-code list is served instead.
 */

export type Award = {
  slug: string;
  src: string;
  year: string;
  /** Short label under the image. Bilingual: awarding body / programme. */
  titleEn: string;
  titleTh: string;
  /** Full engraved text — used for alt and the enlarge view. */
  engravedEn: string;
  /** Intrinsic size, for correct aspect reservation. */
  width: number;
  height: number;
};

type WpAward = {
  slug: string;
  image: { url: string; width: number; height: number } | null;
  year: string;
  title_th: string;
  title_en: string;
  engraved_en: string;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const getAwards = cache(async (): Promise<Award[]> => {
  if (!wpConfigured()) return MOCK_AWARDS;
  const all = await wpFetch<WpAward[]>(
    "/wp/v2/award?per_page=100&orderby=menu_order&order=asc&_fields=slug,image,year,title_th,title_en,engraved_en",
    ["award"],
  );
  return all
    .filter((a) => a.image?.url) // an award is its photo
    .map((a) => ({
      slug: a.slug,
      src: a.image!.url,
      year: str(a.year),
      titleTh: str(a.title_th),
      titleEn: str(a.title_en) || str(a.title_th),
      engravedEn: str(a.engraved_en),
      width: a.image!.width,
      height: a.image!.height,
    }));
});
