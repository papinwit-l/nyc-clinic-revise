export type CaseCard = {
  slug: string;
  image: string;
  /** Resolved parent-term label, e.g. "Nose Thread Lift". */
  treatment: string;
  treatmentSlug: string;
  /**
   * Resolved label of the FIRST child term — this is the grouping key.
   * A case may hold several child terms; only the first decides its group.
   * Optional: cases without one fall back to showing `treatment` as the title
   * and collect in the "More cases" group.
   */
  subcategory?: string;
  subcategorySlug?: string;
  /** Any further child terms. Display only — they never create a second group. */
  tags?: string[];
  doctor: string;
  /** menu_order. Explicit sequence: publish-date order shifts as cases are added. */
  order?: number;
};
