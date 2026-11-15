// ─────────────────────────────────────────────────────────────────────────
// ABOUT PAGE CONTENT — base mock, for marketing to adjust.
//
// TH: lifted VERBATIM from the live site (nycclinic.net/aboutus). These are
//     the clinic's own published words — do not rewrite them.
//
// EN: DRAFTED, not client-approved. The Thai is deliberately florid and does
//     not translate literally ("เพื่อให้คุณมีสุขภาพดีจากภายใน" is literally
//     "so you have good health from within"). The English below carries the
//     same meaning in a register that reads naturally. Needs marketing
//     sign-off before launch.
//
// ⚠ CLAIM TO VERIFY: paragraph 3 states sterile standards equal to leading
//   hospitals ("มาตรฐานเดียวกับโรงพยาบาลชั้นนำ"). It is already published on
//   the live site, but it is a specific comparative claim and Thai medical
//   advertising rules are strict about those. Marketing should confirm it
//   carries over rather than it being inherited silently.
//
// In WordPress: Page Manage → About (story_th / story_en, facility_gallery).
// The text below is the built-in copy, used for local dev without WP and
// when both story boxes in WP are empty.
// ─────────────────────────────────────────────────────────────────────────

import { cache } from "react";
import { wpConfigured } from "@/lib/wp";
import { getSitePayload, getSiteSettings } from "./site-settings";

export type AboutStory = { en: string; th: string };

export const ABOUT_STORY: AboutStory[] = [
  {
    th: "NYC CLINIC ดำเนินธุรกิจด้านความงามและศัลยกรรม มากกว่า 15 ปี NYC CLINIC ให้คำแนะนำพร้อมให้คำปรึกษาอย่างตรงไปตรงมาและจริงใจ โดยแพทย์ผู้ชำนาญการด้านผิวพรรณ ด้านการปรับรูปหน้า และเวชศาสตร์ชะลอวัย และศัลยแพทย์ความงาม",
    en: "NYC Clinic has practised aesthetic medicine and cosmetic surgery for more than fifteen years. Our consultations are direct and honest, led by specialists in skin, facial design, anti-aging medicine and cosmetic surgery.",
  },
  {
    th: "เพื่อให้คุณมีสุขภาพดีจากภายใน รวมทั้งผิวพรรณดี และรูปหน้ามีมิติได้สัดส่วน ด้วยความพิถีพิถันให้บริการทุกขั้นตอน ด้วยผลิตภัณฑ์ปรนนิบัติผิว เพื่อรักษา บำรุง ดูแลและคงความอ่อนเยาว์ เราพร้อมมอบคุณภาพการรักษา เพื่อผลลัพธ์ที่คุณพึงพอใจและสัมผัสได้",
    en: "The aim is health that shows — clear skin and balanced facial proportion — through meticulous care at every step and treatments chosen to restore, nourish and maintain. We are here to deliver results you can see and feel.",
  },
  {
    th: "สถานที่ตั้งคลินิกเดินทางสะดวก คลินิกสะอาดสวยงาม และมั่นใจได้ด้วยมาตรฐานความสะอาดปราศจากเชื้อมาตรฐานเดียวกับโรงพยาบาลชั้นนำ",
    en: "The clinic is easy to reach, calm and immaculately kept, and held to the same sterile standards as a leading hospital.",
  },
];

export type FacilityBranch = {
  slug: string;
  nameEn: string;
  nameTh: string;
  images: string[];
};

// Photographs from the live site's About page.
const MOCK_FACILITY: FacilityBranch[] = [
  {
    slug: "thonglor",
    nameEn: "Thonglor",
    nameTh: "สาขาทองหล่อ",
    images: [
      "/images/facility/thonglor-01.jpg",
      "/images/facility/thonglor-02.jpg",
      "/images/facility/thonglor-03.jpg",
      "/images/facility/thonglor-04.jpg",
      "/images/facility/thonglor-05.jpg",
      "/images/facility/thonglor-06.jpg",
    ],
  },
];

export type AboutContent = {
  /** Paragraphs for each language; English falls back to Thai. */
  story: { th: string[]; en: string[] };
  /** One gallery per branch; empty when WP has no photos. */
  facility: FacilityBranch[];
};

/** Paragraphs split on blank lines. */
const paragraphs = (v: unknown) =>
  typeof v === "string"
    ? v
        .replace(/\r\n?/g, "\n")
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean)
    : [];

const MOCK_STORY = {
  th: ABOUT_STORY.map((p) => p.th),
  en: ABOUT_STORY.map((p) => p.en),
};

/**
 * About page content (Page Manage → About). Cache tag: "site".
 * Without WP_API_URL (local dev) the built-in copy and photos are served.
 */
export const getAbout = cache(async (): Promise<AboutContent> => {
  if (!wpConfigured()) return { story: MOCK_STORY, facility: MOCK_FACILITY };

  const [{ about = {} }, site] = await Promise.all([
    getSitePayload(),
    getSiteSettings(),
  ]);
  const th = paragraphs(about.story_th);
  const en = paragraphs(about.story_en);
  const images = (Array.isArray(about.facility_gallery) ? about.facility_gallery : [])
    .map((img: { url?: unknown }) => (typeof img?.url === "string" ? img.url : ""))
    .filter(Boolean);

  return {
    // Both boxes empty → built-in copy rather than a blank section.
    story: th.length || en.length
      ? { th: th.length ? th : en, en: en.length ? en : th }
      : MOCK_STORY,
    facility: images.length
      ? [
          {
            slug: "main",
            nameTh: site.clinic.branch.th,
            nameEn: site.clinic.branch.en,
            images,
          },
        ]
      : [],
  };
});
