import type { ServiceCard, Treatment } from "@/types/service";

// ─────────────────────────────────────────────────────────────────────────
// TODO — REVISIT: TREATMENT ROUTING
//
// Treatments are currently ANCHORS inside their category page
// (/services/surgery#rhinoplasty), not pages of their own. That was chosen
// because nothing beyond a one-line description exists for any of the
// seventeen, and seventeen thin pages would compete with each other.
//
// Reconsider once marketing wants to rank for specific treatment queries —
// "เสริมจมูก ราคา", "ตาสองชั้น" and the other surgical terms are high-intent
// and a dedicated page ranks far better than an anchor on a six-procedure
// page. The routing already supports it: /services/[slug] matches any slug,
// so promoting a treatment is a data change, not a routing change.
//
// TWO DESCRIPTIONS PER SERVICE, on purpose:
//   desc     homepage card — a LIST of what's inside the category
//   summary  /services      — prose, because the treatment names are already
//                             listed under the card there
// Thai summaries are verbatim from the old site where it had them; English is
// drafted. Two Pods fields, not one, when this moves to WP.
//
// OTHER OPEN ITEMS
// - No prices anywhere. The brand guide's service-card pattern specifies
//   "฿X,XXX per session" — marketing owes these, or the cards drop the line.
// - EN descriptions are DRAFTED. Thai is verbatim from nycclinic.net/services.
// - Botox sits under Skin Treatments, following the old site. The project
//   reference §3 lists it under Facial Design — that table needs correcting.
//   Facial Design's `desc` still NAMES Botox (kept from the homepage copy),
//   so the card says Botox while the treatment list underneath does not show
//   it. Marketing should pick one.
//
// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/service?per_page=5`);
// ─────────────────────────────────────────────────────────────────────────

const DATA = [
  {
    slug: "nose-thread-lift",
    image: "/images/services/cat-nose-thread.png",
    title_en: "Nose Thread Lift",
    title_th: "ร้อยไหมเสริมจมูก",
    desc_en:
      "Semi-surgery technique for natural-looking nose enhancement without surgery",
    desc_th: "เทคนิคกึ่งศัลยกรรม จมูกสวยเป็นธรรมชาติ ไม่ต้องผ่าตัด",
    summary_en:
      "A semi-surgical technique developed here — around twenty minutes, no downtime.",
    summary_th:
      "เทคนิคกึ่งศัลยกรรมเฉพาะของเรา ใช้เวลาราว 20 นาที ไม่ต้องพักฟื้น",
    signature: true,
    treatments: [],
  },
  {
    slug: "facial-thread-lift",
    image: "/images/services/cat-facial-thread.png",
    title_en: "Facial Thread Lift",
    title_th: "ร้อยไหมหน้า",
    desc_en: "V-shape lifting and collagen stimulation",
    desc_th: "ยกกระชับ ปรับรูปหน้า V-Shape กระตุ้นคอลลาเจน",
    summary_en:
      "Lifts and firms without surgery, stimulating your own collagen.",
    summary_th: "ยกผิวแน่นตึงกระชับไม่ต้องศัลยกรรม",
    treatments: [],
  },
  {
    slug: "facial-design",
    image: "/images/services/cat-facial-design.png",
    title_en: "Facial Design",
    title_th: "ปรับรูปหน้า",
    desc_en: "Filler · SMAS-X collagen lifting · Botox",
    desc_th: "Filler เติมเต็ม · SMAS-X กระตุ้นคอลลาเจน · Botox",
    summary_en: "Filler and collagen lifting, planned around your proportions.",
    summary_th: "ปรับรูปหน้าให้ได้สัดส่วน ด้วยฟิลเลอร์และการกระตุ้นคอลลาเจน",
    treatments: [
      {
        slug: "filler",
        title_en: "Filler",
        title_th: "ฟิลเลอร์",
        desc_en:
          "Under-eye, nasolabial folds, cheeks, temples, forehead and lips",
        desc_th:
          "เติมเต็ม ปรับรูปหน้า ใต้ตา ร่องแก้ม แก้มตอบ ขมับ หน้าผาก ปากอิ่มฟู",
      },
      {
        slug: "smas-x",
        title_en: "SMAS-X",
        title_th: "SMAS-X",
        desc_en:
          "Collagen stimulation for firmer skin, using Spanish technology. No pain, no swelling, no incision.",
        desc_th:
          "กระตุ้นคอลลาเจน ผิวแน่นตึงกระชับ ด้วยเครื่องจากประเทศสเปน ไม่เจ็บ ไม่บวม ไม่มีแผล",
      },
    ],
  },
  {
    slug: "surgery",
    image: "/images/services/cat-surgery.png",
    title_en: "Surgery",
    title_th: "ศัลยกรรม",
    desc_en: "Rhinoplasty, blepharoplasty, chin, lipo, fat transfer",
    desc_th: "เสริมจมูก ตาสองชั้น เสริมคาง ดูดไขมัน ฉีดไขมัน",
    summary_en: "Modern technique, quick recovery.",
    summary_th: "เปลี่ยนคุณเป็นคนใหม่ ด้วยเทคนิคทันสมัยและฟื้นตัวไว",
    treatments: [
      {
        slug: "rhinoplasty",
        title_en: "Rhinoplasty",
        title_th: "เสริมซิลิโคนจมูก",
        desc_en: "Silicone nose augmentation",
        desc_th: "เสริมซิลิโคนจมูก",
      },
      {
        slug: "blepharoplasty",
        title_en: "Blepharoplasty",
        title_th: "ตาสองชั้น",
        desc_en: "Double eyelid surgery",
        desc_th: "ตาสองชั้น",
      },
      {
        slug: "liposuction",
        title_en: "Liposuction",
        title_th: "ดูดไขมัน",
        desc_en: "Body contouring by liposuction",
        desc_th: "ดูดไขมัน",
      },
      {
        slug: "chin-augmentation",
        title_en: "Chin Augmentation",
        title_th: "เสริมซิลิโคนคาง",
        desc_en: "Silicone chin augmentation",
        desc_th: "เสริมซิลิโคนคาง",
      },
      {
        slug: "lip-surgery",
        title_en: "Lip Surgery",
        title_th: "ปากกระจับ",
        desc_en: "Lip reshaping",
        desc_th: "ปากกระจับ",
      },
      {
        slug: "fat-transfer",
        title_en: "Facial Fat Transfer",
        title_th: "ฉีดไขมันหน้าเด็ก",
        desc_en: "Facial fat grafting",
        desc_th: "ฉีดไขมันหน้าเด็ก",
      },
    ],
  },
  {
    slug: "skin-treatments",
    image: "/images/services/cat-skin.png",
    title_en: "Skin Treatments",
    title_th: "ฟื้นฟูผิว",
    desc_en: "Sculptra · Meso Glass Skin · PRP · Placenta · Vitamin Drip",
    desc_th: "Sculptra · Meso Glass Skin · PRP · Placenta · Vitamin Drip",
    summary_en: "Healthy skin, so you stand out.",
    summary_th: "ผิวสวยสุขภาพดี ให้คุณโดดเด่นมีออร่า",
    treatments: [
      {
        slug: "sculptra",
        title_en: "Collagen Biostimulator",
        title_th: "Sculptra กระตุ้นคอลลาเจน",
        desc_en:
          "Stimulates collagen for firm, smooth, resilient and youthful skin",
        desc_th:
          "กระตุ้นการสร้างคอลลาเจน ผิวตึงกระชับ เรียบเนียน ขาวใส ผิวแข็งแรง อ่อนเยาว์",
      },
      {
        slug: "meso-glass-skin",
        title_en: "Meso Glass Skin",
        title_th: "เมโสผิวแก้ว",
        desc_en:
          "Clear, hydrated skin — reduces dark marks, melasma, acne scars and pore size",
        desc_th:
          "ผิวเนียนใส ชุ่มชื่น ฉ่ำวาว ลดรอยดำ ฝ้ากระ รอยสิว กระชับรูขุมขน",
      },
      {
        slug: "prp",
        title_en: "PRP Vita Cell",
        title_th: "PRP VITA CELL",
        desc_en: "For younger, brighter skin — reduces melasma and dark marks",
        desc_th:
          "เพื่อความดูอ่อนเยาว์ ช่วยให้ผิวเนียนกระจ่างใส ลดรอยฝ้ากระ ลดรอยดำ",
      },
      {
        slug: "placenta-gf",
        title_en: "Placenta GF",
        title_th: "Placenta GF",
        desc_en: "Restores tired skin to a quick, healthy glow",
        desc_th:
          "ช่วยฟื้นฟูผิวที่ร่วงโรย ให้กลับมาเปล่งปลั่งสดใสได้อย่างรวดเร็ว",
      },
      {
        slug: "vitamin-drip",
        title_en: "Vitamin Drip",
        title_th: "วิตามินดริป",
        desc_en: "Vitamin therapy for immunity, antioxidants and clearer skin",
        desc_th: "ฉีดวิตามิน เพิ่มภูมิคุ้มกัน ต้านอนุมูลอิสระ ผิวเนียนใส",
      },
      {
        // Under Skin, following the old site. Project reference §3 lists it
        // under Facial Design — that table needs correcting.
        slug: "botox",
        title_en: "Botox",
        title_th: "สารลดริ้วรอย หน้าเรียว",
        desc_en: "Softens lines and slims the jaw and calf muscles",
        desc_th: "ช่วยลดริ้วรอย ลดขนาดกล้ามเนื้อกราม ลดขนาดกล้ามเนื้อน่อง",
      },
    ],
  },
];

function toTreatments(
  items: {
    slug: string;
    title_en: string;
    title_th: string;
    desc_en: string;
    desc_th: string;
  }[],
  isTH: boolean,
): Treatment[] {
  return items.map((tr) => ({
    slug: tr.slug,
    title: isTH ? tr.title_th : tr.title_en,
    desc: isTH ? tr.desc_th : tr.desc_en,
  }));
}

export async function getServices(locale: string): Promise<ServiceCard[]> {
  const isTH = locale === "th";

  // TODO: fetch from WP and map bilingual fields
  return DATA.map((item) => ({
    slug: item.slug,
    image: item.image,
    title: isTH ? item.title_th : item.title_en,
    subtitle: isTH ? item.title_en : item.title_th,
    desc: isTH ? item.desc_th : item.desc_en,
    summary: isTH ? item.summary_th : item.summary_en,
    signature: item.signature,
    treatments: toTreatments(item.treatments, isTH),
  }));
}

/** One category by slug — used by /services/[slug]. */
export async function getService(
  locale: string,
  slug: string,
): Promise<ServiceCard | null> {
  const all = await getServices(locale);
  return all.find((s) => s.slug === slug) ?? null;
}

/** Slugs for generateStaticParams. */
export function getServiceSlugs(): string[] {
  return DATA.map((s) => s.slug);
}
