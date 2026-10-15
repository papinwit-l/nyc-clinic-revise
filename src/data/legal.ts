import { privacyPolicyHtml } from "./privacy-policy";

/**
 * Legal pages — /privacy-policy and /terms. WP static pages when the CMS is
 * connected (project reference §6); `html` is then content.rendered.
 *
 * Privacy policy: full DRAFT text in ./privacy-policy.ts (Oct 2026), with
 * [bracketed] facts still to be supplied by the clinic.
 *
 * Terms: ⚠ PLACEHOLDER. Section SKELETON only — headings website terms
 * commonly carry, with no legal wording; the clinic must supply the text.
 *
 * Neither should be published as-is: `draft: true` keeps both pages out of
 * search results (noindex) until the clinic has signed off the text.
 *
 * TODO: replace with WP fetch — /wp/v2/pages?slug=privacy-policy
 */

export type LegalSlug = "privacy-policy" | "terms";

export type LegalPage = {
  slug: LegalSlug;
  title: string;
  /** YYYY-MM-DD — "last updated" line. */
  updated: string;
  html: string;
  draft: boolean;
};

const PENDING = {
  th: "<p><em>[รอเนื้อหาจากคลินิก]</em></p>",
  en: "<p><em>[Content to be supplied by the clinic]</em></p>",
};

function skeleton(locale: string, headings: string[]): string {
  const p = locale === "th" ? PENDING.th : PENDING.en;
  return headings.map((h, i) => `<h2>${i + 1}. ${h}</h2>${p}`).join("");
}

const PAGES: Record<
  LegalSlug,
  { title_th: string; title_en: string; th: string[]; en: string[] }
> = {
  "privacy-policy": {
    title_th: "นโยบายความเป็นส่วนตัว",
    title_en: "Privacy Policy",
    th: [
      "ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม",
      "วัตถุประสงค์ในการเก็บและใช้ข้อมูล",
      "การเปิดเผยข้อมูลแก่บุคคลอื่น",
      "ระยะเวลาในการเก็บรักษาข้อมูล",
      "สิทธิของเจ้าของข้อมูลส่วนบุคคล",
      "คุกกี้และเครื่องมือวิเคราะห์เว็บไซต์",
      "การเปลี่ยนแปลงนโยบาย",
      "ช่องทางการติดต่อ",
    ],
    en: [
      "Personal data we collect",
      "Why we collect and use it",
      "Sharing with third parties",
      "How long we keep it",
      "Your rights",
      "Cookies and analytics",
      "Changes to this policy",
      "How to contact us",
    ],
  },
  terms: {
    title_th: "ข้อกำหนดการใช้งานเว็บไซต์",
    title_en: "Terms of Use",
    th: [
      "การยอมรับข้อกำหนด",
      "ข้อมูลบนเว็บไซต์และข้อมูลทางการแพทย์",
      "ผลลัพธ์ของการรักษา",
      "ราคาและโปรโมชัน",
      "ทรัพย์สินทางปัญญา",
      "ลิงก์ไปยังเว็บไซต์ภายนอก",
      "การเปลี่ยนแปลงข้อกำหนด",
      "ช่องทางการติดต่อ",
    ],
    en: [
      "Acceptance of these terms",
      "Website and medical information",
      "Treatment results",
      "Prices and promotions",
      "Intellectual property",
      "Links to other websites",
      "Changes to these terms",
      "How to contact us",
    ],
  },
};

export async function getLegalPage(
  locale: string,
  slug: LegalSlug,
): Promise<LegalPage> {
  const page = PAGES[slug];
  const th = locale === "th";
  return {
    slug,
    title: th ? page.title_th : page.title_en,
    updated: "2026-10-16",
    html:
      slug === "privacy-policy"
        ? privacyPolicyHtml(locale)
        : skeleton(locale, th ? page.th : page.en),
    draft: true,
  };
}
