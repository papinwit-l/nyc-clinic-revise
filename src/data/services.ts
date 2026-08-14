import type { ServiceCard } from "@/types/service";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/service?per_page=5`);

const DATA = [
  {
    slug: "nose-thread-lift",
    image: "/images/services/cat-nose-thread.png",
    title_en: "Nose Thread Lift",
    title_th: "ร้อยไหมเสริมจมูก",
    desc_en:
      "Semi-surgery technique for natural-looking nose enhancement without surgery",
    desc_th: "เทคนิคกึ่งศัลยกรรม จมูกสวยเป็นธรรมชาติ ไม่ต้องผ่าตัด",
    signature: true,
  },
  {
    slug: "facial-thread-lift",
    image: "/images/services/cat-facial-thread.png",
    title_en: "Facial Thread Lift",
    title_th: "ร้อยไหมหน้า",
    desc_en: "V-shape lifting and collagen stimulation",
    desc_th: "ยกกระชับ ปรับรูปหน้า V-Shape กระตุ้นคอลลาเจน",
  },
  {
    slug: "facial-design",
    image: "/images/services/cat-facial-design.png",
    title_en: "Facial Design",
    title_th: "ปรับรูปหน้า",
    desc_en: "Filler · SMAS-X collagen lifting · Botox",
    desc_th: "Filler เติมเต็ม · SMAS-X กระตุ้นคอลลาเจน · Botox",
  },
  {
    slug: "surgery",
    image: "/images/services/cat-surgery.png",
    title_en: "Surgery",
    title_th: "ศัลยกรรม",
    desc_en: "Rhinoplasty, blepharoplasty, chin, lipo, fat transfer",
    desc_th: "เสริมจมูก ตาสองชั้น เสริมคาง ดูดไขมัน ฉีดไขมัน",
  },
  {
    slug: "skin-treatments",
    image: "/images/services/cat-skin.png",
    title_en: "Skin Treatments",
    title_th: "ฟื้นฟูผิว",
    desc_en: "Sculptra · Meso Glass Skin · PRP · Placenta · Vitamin Drip",
    desc_th: "Sculptra · Meso Glass Skin · PRP · Placenta · Vitamin Drip",
  },
];

export async function getServices(locale: string): Promise<ServiceCard[]> {
  // TODO: fetch from WP and map bilingual fields
  return DATA.map((item) => ({
    slug: item.slug,
    image: item.image,
    title: locale === "th" ? item.title_th : item.title_en,
    subtitle: locale === "th" ? item.title_en : item.title_th,
    desc: locale === "th" ? item.desc_th : item.desc_en,
    signature: item.signature,
  }));
}
