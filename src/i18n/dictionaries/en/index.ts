import home from "./home";
import doctor from "./doctor";

const en = {
  nav: {
    home: "Home",
    services: "Services",
    beforeAfter: "Before & After",
    doctors: "Doctors",
    about: "About Us",
    blog: "Blog",
    contact: "Contact",
    addLine: "Add LINE",
  },
  footer: {
    description:
      "Comprehensive aesthetic center by a team of specialists with over 15 years of experience.",
    services: "Services",
    clinic: "Clinic",
    support: "Support",
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms",
    ctaLine: "Add LINE for Free Consult",
  },
  common: {
    learnMore: "Learn More",
    viewAll: "View All →",
    readMore: "Read More →",
    before: "Before",
    after: "After",
    by: "by",
    phone: "Phone",
    location: "Location",
    hours: "Hours",
  },
  home,
  doctor,
} as const;

export default en;
