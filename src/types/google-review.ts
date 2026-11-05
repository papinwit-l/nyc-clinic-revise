export type GoogleReview = {
  /** Google's resource name — stable, used as the React key. */
  id: string;
  /** The reviewer's original text, unedited. */
  text: string;
  /** Language the text is written in — picks the typeface, not the locale. */
  lang: "th" | "en";
  /** 1–5 */
  rating: number;
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  /** Google's relative time, already localised — "2 เดือนที่แล้ว". */
  time: string;
  /** ISO timestamp — for sorting newest first. */
  published: string;
  /** This review on Google Maps. */
  url?: string;
};

export type GoogleReviews = {
  /** Overall rating, e.g. 4.9 */
  rating: number;
  /** Total number of ratings on Google. */
  total: number;
  /** The clinic's Google Maps listing. */
  url: string;
  /** 5-star only, newest first — from the five Google chose. */
  reviews: GoogleReview[];
};
