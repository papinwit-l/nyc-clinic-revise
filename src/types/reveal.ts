/**
 * A matched before/after PAIR for the drag-to-compare slider.
 *
 * Deliberately NOT fields on `case`. A gallery case is one composite image; a
 * reveal is two single-shot photos of one patient with matched framing and
 * lighting — a different artefact, produced on purpose. Keeping them together
 * would put two optional fields on every case that almost none use, and let an
 * image upload silently promote a case to hero.
 *
 * A treatment (or sub-category) may have several reveals, or none.
 */
export type Reveal = {
  slug: string;
  beforeImage: string;
  afterImage: string;
  /** Required — which treatment this demonstrates. */
  treatmentSlug: string;
  /** Optional — narrows it to one sub-category group. */
  subcategorySlug?: string;
  title?: string;
  doctor?: string;
  /** Homepage pick. Multiple flagged → newest wins; none → homepage shows none. */
  featured?: boolean;
  order?: number;
};
