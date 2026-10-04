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

/**
 * One sub-category's cases within a treatment. Built by the data layer, not
 * assembled in the page — see the grouping rule on CaseCard: a case belongs to
 * its FIRST child term only, so it can never appear in two groups.
 *
 * Cases with no sub-category collect in a final group whose slug is
 * UNGROUPED_SLUG, titled "More cases" / "เคสอื่น ๆ". It always sorts last,
 * regardless of term order, because an unnamed group should not sit above
 * named ones — and it is dropped entirely when it is the only group, since a
 * lone group called "More cases" reads as a bug.
 */
export type SubcategoryGroup = {
  slug: string;
  title: string;
  cases: CaseCard[];
};

/** The slug used for cases that carry no sub-category term. */
export const UNGROUPED_SLUG = "__ungrouped";

/**
 * A treatment and everything shown under it.
 *
 * `cases` is the flat preview set used by /before-after — capped per block so
 * that page stays light however many cases exist. `groups` is the grouped set
 * used by /before-after/[treatment]. `total` is the real count, so the block
 * CTA can say "View all 34" rather than implying six is everything.
 */
export type TreatmentGroup = {
  slug: string;
  title: string;
  cases: CaseCard[];
  groups: SubcategoryGroup[];
  total: number;
};
