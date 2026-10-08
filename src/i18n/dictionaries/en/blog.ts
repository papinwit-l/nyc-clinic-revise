const blog = {
  hero: {
    label: "Blog",
    heading: "Articles",
    description:
      "Guides on nose thread lifts, facial design and aftercare, from the doctors at NYC Clinic.",
  },
  all: "All",
  read: "Read article →",
  prev: "Previous page",
  next: "Next page",
  empty: "No articles yet",
  back: "← All articles",
  minRead: "{n} min read",
  // Shown on /en when an article has no English version.
  thaiOnly: "This article is currently available in Thai only.",
  relatedLabel: "Read next",
  relatedHeading: "More articles",
  // Shared CTA at the foot of every article — see ArticleCTA.
  // TODO(marketing): `text` is placeholder copy, not yet approved.
  cta: {
    heading: "Free consultation on LINE",
    text: "Send us your photos for an initial assessment by our doctors before you visit.",
    button: "Add LINE @nyc-clinic",
  },
} as const;

export default blog;
