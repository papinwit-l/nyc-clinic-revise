/**
 * Richer body content for a service page.
 *
 * Deliberately a SUBSET of what the old site publishes. Those pages run to
 * thousands of words — thread types, needle gauges, step-by-step procedure,
 * aftercare, reviews, doctor bios. This keeps the blocks a patient actually
 * decides on and drops the rest.
 *
 * Every field is optional so a thin service still renders.
 */
export type ServiceDetail = {
  /** One or two paragraphs. Not the full article. */
  intro?: string[];
  /** Small stat row — duration, downtime, how long results last. */
  facts?: { label: string; value: string }[];
  /** เหมาะกับใครบ้าง — who this suits. */
  goodFor?: string[];
  /** ข้อดี — what makes it worth doing. */
  benefits?: string[];
  /** Areas or variants treated — a short list, not prose. */
  areas?: string[];
  /** Service-specific FAQ. Distinct from the general /faq page. */
  faq?: { q: string; a: string }[];
};

/**
 * One service. FLAT — categories and treatments are the same shape, related
 * by `parent`, not nested.
 *
 * Restructured Sept 2026. Treatments were nested objects rendered as anchored
 * sections. They became pages because:
 *   - twelve of them are already indexed URLs on the live site; redirecting
 *     those to a fragment on a six-procedure page throws away their ranking
 *   - "เสริมจมูก", "ตาสองชั้น" and the other surgical terms are high-intent
 *     queries that a dedicated page ranks for and an anchor does not
 *   - once each carries a real brief, a category page becomes six long
 *     sections of scrolling
 *
 * A record with no `parent` is a top-level service. A record with `parent` is
 * a treatment inside it. Two top-level services (nose-thread-lift,
 * facial-thread-lift) have no children — they ARE single treatments.
 */
export type ServiceCard = {
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  /** Homepage card — a list of what's inside. */
  desc: string;
  /**
   * /services — prose, because the children are already listed under the card
   * there and `desc` would just repeat them.
   */
  summary: string;
  signature?: boolean;
  /** Slug of the parent service. Absent on top-level services. */
  parent?: string;
  /** Resolved at fetch time — the top-level service's children. */
  children?: ServiceCard[];
  detail?: ServiceDetail;
};
