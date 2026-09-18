/** A treatment within a service category. */
export type Treatment = {
  slug: string;
  title: string;
  desc: string;
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
   * the card there and `desc` would just repeat them. Falls back to `desc`.
   */
  summary: string;
  signature?: boolean;
  /**
   * Treatments inside this category. Empty for the two leaf services
   * (nose-thread-lift, facial-thread-lift) — those ARE single treatments.
   */
  treatments?: Treatment[];
};
