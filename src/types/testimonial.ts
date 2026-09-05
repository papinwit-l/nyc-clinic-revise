export type TestimonialCard = {
  id: string;
  quote: string;
  name: string;
  treatment: string;
  rating: number;
  /** Reviewer's face — shows initial when absent */
  avatar?: string;
  /** Result photo, clinic visit, etc. — hidden when absent */
  reviewImage?: string;
};
