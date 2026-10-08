import type { FaqCategory, FaqItem } from "@/types/faq";

/**
 * General FAQ — the `faq` CPT. Shown on /contact (a short pick) and, later,
 * in full on /faq. Distinct from the service-specific FAQ in data/services.ts,
 * which is about one treatment only.
 *
 * ⚠ PLACEHOLDER COPY. Drafted only from facts already on the site (LINE
 * booking, free consultation, address, hours, the doctors' specialties).
 * Nothing clinical or about price is stated. Marketing must review and
 * replace before launch.
 *
 * TODO: replace with WP fetch — /wp/v2/faq?_fields=...&orderby=menu_order
 */

type RawFaq = {
  slug: string;
  category: FaqCategory;
  /** Appears in the short list on /contact. */
  featured?: boolean;
  q_th: string;
  q_en: string;
  a_th: string;
  a_en: string;
};

const DATA: RawFaq[] = [
  {
    slug: "how-to-book",
    category: "booking",
    featured: true,
    q_th: "จองคิวปรึกษาแพทย์ได้อย่างไร?",
    q_en: "How do I book a consultation?",
    a_th: "แอดไลน์ @nyc-clinic แล้วแจ้งหัตถการที่สนใจและวันเวลาที่สะดวก เจ้าหน้าที่จะยืนยันคิวให้ทางไลน์ หรือโทร 088-008-7870 ในเวลาทำการ",
    a_en: "Add us on LINE at @nyc-clinic and tell us which treatment you're interested in and when you'd like to come. Our team confirms your appointment in the chat. You can also call 088-008-7870 during opening hours.",
  },
  {
    slug: "consultation-fee",
    category: "booking",
    featured: true,
    q_th: "การปรึกษามีค่าใช้จ่ายไหม?",
    q_en: "Is the consultation free?",
    a_th: "ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทั้งทางไลน์และที่คลินิก",
    a_en: "Yes. Consultations are free, both on LINE and at the clinic.",
  },
  {
    slug: "pricing",
    category: "booking",
    featured: true,
    q_th: "ราคาแต่ละหัตถการเท่าไหร่?",
    q_en: "How much do treatments cost?",
    a_th: "ราคาขึ้นอยู่กับหัตถการและแผนการรักษาที่แพทย์ประเมินให้เหมาะกับแต่ละบุคคล สอบถามราคาและโปรโมชันปัจจุบันได้ทางไลน์",
    a_en: "It depends on the treatment and the plan the doctor recommends for you. Message us on LINE for current prices and promotions.",
  },
  {
    slug: "which-doctor",
    category: "treatment",
    featured: true,
    q_th: "จะได้พบแพทย์ท่านไหน?",
    q_en: "Which doctor will I see?",
    a_th: "ขึ้นอยู่กับหัตถการที่สนใจ คลินิกมีแพทย์เฉพาะทาง 4 ท่าน โดยร้อยไหมจมูกดูแลโดยคุณหมอจิ๋ง แจ้งความประสงค์ตอนจองคิวได้เลย",
    a_en: "It depends on the treatment. The clinic has four specialists; nose thread lifts are led by Dr. Jing. Let us know your preference when you book.",
  },
  {
    slug: "location-hours",
    category: "visit",
    featured: true,
    q_th: "คลินิกอยู่ที่ไหน เปิดวันไหนบ้าง?",
    q_en: "Where is the clinic and when is it open?",
    a_th: "136/2 ซ.สุขุมวิท 53 (ทองหล่อ) เขตวัฒนา กรุงเทพฯ เปิดจันทร์–เสาร์ 10:00–19:00 น. และอาทิตย์ 10:00–17:00 น.",
    a_en: "136/2 Sukhumvit 53 (Thonglor), Watthana, Bangkok. Open Monday to Saturday 10:00 AM – 7:00 PM, and Sunday 10:00 AM – 5:00 PM.",
  },
];

function resolve(raw: RawFaq, locale: string): FaqItem {
  const th = locale === "th";
  return {
    slug: raw.slug,
    category: raw.category,
    q: th ? raw.q_th : raw.q_en,
    a: th ? raw.a_th : raw.a_en,
  };
}

/** All FAQs, in order — /faq. */
export async function getFaqs(locale: string): Promise<FaqItem[]> {
  return DATA.map((raw) => resolve(raw, locale));
}

/** The short pick for /contact. Same source as /faq, just filtered. */
export async function getFeaturedFaqs(
  locale: string,
  limit = 5,
): Promise<FaqItem[]> {
  return DATA.filter((f) => f.featured)
    .slice(0, limit)
    .map((raw) => resolve(raw, locale));
}
