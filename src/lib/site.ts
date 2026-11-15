/**
 * Site-wide settings — phone, LINE, address, hours, map and social URLs.
 * Header widget, Footer, homepage Contact CTA, /contact, page CTAs and the
 * legal pages all use them.
 *
 * Content lives in WordPress: Page Manage → Site Settings. Read it with
 * getSiteSettings() from "@/data/site-settings" (server components), then pass
 * values down to client components as props.
 *
 * This file holds only what is safe to import anywhere: the type, constants
 * that are not CMS content, and the built-in defaults used when WP_API_URL
 * isn't set (local development without the CMS).
 */

/** Absolute site origin — used for canonical URLs. Set NEXT_PUBLIC_SITE_URL in the environment. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nycclinic.net"
).replace(/\/$/, "");

type Bilingual = { th: string; en: string };

export type SiteSettings = {
  lineUrl: string;
  /** Shown wherever the LINE account is named, e.g. "@nycclinic". */
  lineId: string;
  phone: string;
  /** tel: link built from `phone`. */
  phoneHref: string;
  /** Empty string = the clinic has no account there; components skip it. */
  social: { facebook: string; instagram: string; tiktok: string; youtube: string };
  clinic: {
    /** Brand name — not CMS content. */
    name: string;
    branch: Bilingual;
    /** Street address only; components print `name` on its own line above it. */
    address: Bilingual;
    /** Rows, not one string, so /contact can set them as a table and the homepage can join them. */
    hours: { days: Bilingual; time: Bilingual }[];
    mapEmbed: string;
    /** Opens the Maps app / site for directions. */
    mapUrl: string;
  };
};

/** "088-008-7870" → "tel:+66880087870". Numbers already in +international form are kept. */
export function phoneToHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  return `tel:+66${digits.replace(/^0/, "")}`;
}

/** Built-in values — used only when the CMS isn't configured. */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  lineUrl: "https://lin.ee/7oJgymx",
  lineId: "@nycclinic",
  phone: "088-008-7870",
  phoneHref: "tel:+66880087870",
  social: {
    facebook: "https://web.facebook.com/nycclinic",
    instagram: "https://www.instagram.com/nycclinic/",
    tiktok: "https://www.tiktok.com/@nycclinic",
    youtube: "https://www.youtube.com/user/nycnewyorkclinic",
  },
  clinic: {
    name: "NYC Clinic (New York Clinic, GR)",
    branch: { th: "สาขาทองหล่อ", en: "Thonglor" },
    address: {
      th: "136/2 ซ.สุขุมวิท 53 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",
      en: "136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110",
    },
    hours: [
      {
        days: { th: "ทุกวัน", en: "Daily" },
        time: { th: "10:00 – 19:00 น.", en: "10:00 AM – 7:00 PM" },
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.765136181646!2d100.57746967508966!3d13.732664386657037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fab553b23b9%3A0xd3c1330b42d3d1a!5e0!3m2!1sen!2sth!4v1794648229735!5m2!1sen!2sth",
    mapUrl: "https://maps.app.goo.gl/KWeuAr3VuRbGaPE3A",
  },
};
