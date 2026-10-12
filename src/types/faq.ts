export type FaqCategory = "nose" | "face" | "safety" | "care";

export type FaqItem = {
  slug: string;
  category: FaqCategory;
  q: string;
  /** May hold several paragraphs separated by a blank line ("\n\n"). */
  a: string;
};
