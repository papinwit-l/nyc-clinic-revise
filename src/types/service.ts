/** A treatment within a service category. */
export type Treatment = {
  slug: string;
  title: string;
  desc: string;
};

/**
 * Richer body content for /services/[slug].
 *
 * Deliberately a SUBSET of what the old site publishes. Those pages run to
 * thousands of words — thread types, needle gauges, step-by-step procedure,
 * aftercare, reviews, doctor bios. This keeps the blocks a patient actually
 * decides on and drops the rest:
 *
 *   dropped   procedure steps, preparation, aftercare, thread-material
 *             explainers, on-page reviews, doctor bios (all have homes
 *             elsewhere, or belong in an article rather than a service page)
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
  /** Service-specific FAQ. Distinct from the general /faq page. */
  faq?: { q: string; a: string }[];
};

export type ServiceCard = {
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  /** Homepage card — a list of what's inside the category. */
  desc: string;
  /**
   * /services — prose, because the treatment names are already listed under
   * the card there and `desc` would just repeat them.
   */
  summary: string;
  signature?: boolean;
  /**
   * Treatments inside this category. Empty for the two leaf services
   * (nose-thread-lift, facial-thread-lift) — those ARE single treatments.
   */
  treatments?: Treatment[];
  detail?: ServiceDetail;
};
