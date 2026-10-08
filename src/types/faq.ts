export type FaqCategory = "booking" | "visit" | "treatment";

export type FaqItem = {
  slug: string;
  category: FaqCategory;
  q: string;
  a: string;
};
