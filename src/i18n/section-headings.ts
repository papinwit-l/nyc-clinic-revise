/**
 * Section headers are brand chrome, NOT translated content.
 * Per marketing (Sept 2026), the eyebrow + h2 block renders English
 * on every locale. Localised copy that happens to sit near a header
 * (taglines, subtitles, body) stays in dictionaries/{locale}/.
 */
export const sectionHeadings = {
  about:        { label: "About NYC Clinic" },
  signature:    { label: "Signature Service" },
  services:     { label: "Our Services",     heading: "What We Offer" },
  results:      { label: "Real Results",     heading: "Before & After" },
  doctors:      { label: "Meet the Doctors", heading: "Our Specialists",
                  teamHeading: "Also On Our Team" },
  testimonials: { label: "What They Say",    heading: "Client Reviews" },
  instagram:    { label: "Follow Us",        heading: "@nycclinic" },
  promotion:    { label: "Promotion" },
  blog:         { label: "Latest Articles",  heading: "From Our Blog" },
  contact:      { label: "Contact Us" },
} as const;

export type SectionKey = keyof typeof sectionHeadings;
