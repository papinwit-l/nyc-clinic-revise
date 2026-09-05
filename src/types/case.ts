export type CaseCard = {
  slug: string;
  image: string;
  treatment: string;
  /**
   * The specific concern addressed — "Tip extension", "Wing reduction".
   * Optional: cases without one fall back to showing `treatment` as the title.
   */
  focus?: string;
  doctor: string;
  beforeImage?: string;
  afterImage?: string;
};
