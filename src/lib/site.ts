/**
 * Site-wide settings — the ONE place phone, LINE, address, hours, map and
 * social URLs are written. Header widget, Footer, homepage Contact CTA and
 * /contact all read from here.
 *
 * This is the code-side stand-in for the WP "Site Settings" screen (admin
 * architecture doc §3/§5). When that exists, getSiteSettings() fetches it and
 * returns this same shape — components don't change.
 */

/** Absolute site origin — used for canonical URLs. Set NEXT_PUBLIC_SITE_URL on Vercel. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nycclinic.net"
).replace(/\/$/, "");

export const LINE_URL = "https://lin.ee/7oJgymx";
export const LINE_ID = "@nyc-clinic";
export const PHONE = "088-008-7870";
export const PHONE_HREF = "tel:+66880087870";

export const SOCIAL_URLS = {
  facebook: "https://web.facebook.com/nycclinic",
  instagram: "https://www.instagram.com/nycclinic/",
  tiktok: "https://www.tiktok.com/@nycclinic",
  youtube: "https://www.youtube.com/user/nycnewyorkclinic",
} as const;

export const CLINIC = {
  name: "NYC Clinic (New York Clinic, GR)",
  branch: { th: "สาขาทองหล่อ", en: "Thonglor" },
  address: {
    th: "136/2 ซ.สุขุมวิท 53 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",
    en: "136/2 Sukhumvit 53 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110",
  },
  // Rows, not one string, so /contact can set them as a table and the
  // homepage can join them.
  hours: [
    {
      days: { th: "จันทร์ – เสาร์", en: "Mon – Sat" },
      time: { th: "10:00 – 19:00 น.", en: "10:00 AM – 7:00 PM" },
    },
    {
      days: { th: "อาทิตย์", en: "Sun" },
      time: { th: "10:00 – 17:00 น.", en: "10:00 AM – 5:00 PM" },
    },
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6!2d100.5794!3d13.7367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee114e6b9a1%3A0x2b5e5c94e4a8b8a0!2sNYC+Clinic!5e0!3m2!1sth!2sth!4v1",
  // Opens the Maps app / site for directions.
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=NYC+Clinic+136%2F2+Sukhumvit+53+Bangkok",
} as const;
