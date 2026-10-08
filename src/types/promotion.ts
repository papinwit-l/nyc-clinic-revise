export type Promotion = {
  slug: string;
  title: string;
  subtitle: string;
  offer: string;
  /** Last day the offer is valid, YYYY-MM-DD, inclusive, Bangkok time. */
  validUntil: string;
  /** 16:9 banner artwork — stacked on /promotions. The homepage banner does
      not use it; that section sets the text fields over its own photo. */
  image: string;
  /** True when `image` is a plain photo with no offer in the artwork — the
      page then sets title + offer over it, as the homepage banner does. */
  textOverImage?: boolean;
  /** Optional small print, e.g. "limited to 20 people". */
  condition?: string;
  /** Optional top-level or child service slug — links to /services/[slug]. */
  serviceSlug?: string;
};
