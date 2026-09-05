const home = {
  hero: {
    tagline: "Where Art Meets Aesthetic Precision",
    ctaLine: "Add LINE",
    ctaServices: "View Services",
    scroll: "Scroll",
  },
  trust: {
    experience: "Years Experience",
    cases: "Nose Thread Cases",
    specialists: "Specialists",
    certified: "Board-Certified",
  },
  about: {
    // Quote is DRAFT — pending Dr. Jing's approval (it's attributed to her).
    quote:
      "Every face is unique — so nose thread lift takes real experience, from a specialist of more than 15 years.",
    quoteName: "Dr. Jing (Isreey Muangmanee, M.D.)",
    quoteRole:
      "Lead Specialist · Pioneer of NYC Clinic's semi-surgical nose thread technique",
    // Bio paraphrased from the old site's About page — placeholder for marketing.
    bio: "NYC Clinic has practiced aesthetic medicine in Thonglor, led by specialists in skin, facial design, and cosmetic surgery. Care is unhurried and meticulous at every step, in a space kept to hospital-grade sterile standards — for results that look natural and genuinely your own.",
    cta: "Read our story →",
    pillars: [
      {
        title: "Semi-surgical technique",
        desc: "Our own method, exclusive to NYC Clinic.",
      },
      {
        title: "No surgery, no downtime",
        desc: "Around 20 minutes — back to life the same day.",
      },
      {
        title: "Natural, tailored results",
        desc: "Designed to suit each individual face.",
      },
    ],
  },
  signature: {
    title: "Nose Thread Lift",
    subtitle: "Semi-Surgery Nose Thread Technique",
    description:
      "An exclusive technique pioneered by Dr. Jing, Thailand's first nose thread specialist, with over 15 years of experience and more than 10,000 cases — achieving natural-looking results without surgery.",
    benefits: [
      "Semi-surgery technique — natural-looking results",
      "Quick recovery, minimal downtime",
      "Pioneer & inventor of the technique in Thailand",
      "Adjustable & reversible",
    ],
  },
  services: {
    cta: "View All Services →",
  },
  results: {
    subtitle: "Real results from our patients, by our specialist team.",
    cta: "View Full Gallery →",
  },
  doctors: {
    badge: "Lead Specialist",
    cta: "View All Doctors →",
  },
  promotion: {
    validUntil: "Valid until",
    cta: "Get Promotion",
    details: "View Details",
  },
  blog: {
    cta: "Read More →",
  },
  contact: {
    hoursValue: "Mon – Sat 10:00 AM – 7:00 PM\nSun 10:00 AM – 5:00 PM",
    readyTitle: "Ready to Transform?",
    readySubtitle: "Free consultation — no obligation",
    ctaLine: "Add LINE for Free Consult",
  },
} as const;

export default home;
