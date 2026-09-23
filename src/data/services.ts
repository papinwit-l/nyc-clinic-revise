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
// ⚠ THE LIVE SITE CONTRADICTS ITSELF ON CLINICAL FACTS. The nose thread page
//   states the procedure takes 20, 30 AND 15–20 minutes, and that results last
//   3–5 years, "2 years or more", and 1–1.5 years — plus per-thread figures of
//   1–2 and 5–6 years. The `facts` below use the most conservative of each
//   (20 minutes, 2 years or more). These are clinical claims: marketing and
//   Dr. Jing should confirm the real figures before launch.
//
// ⚠ DR. JING'S NUMBERS DIFFER AGAIN. That page says 20+ years / 40,000+ cases
//   in one place and 10+ years / 10,000 cases in another; the homepage says
//   15+ / 10,000. Three different sets. Not used here, but it needs settling.
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
    detail_th: {
      intro: [
        "เทคนิคกึ่งศัลยกรรมของ NYC Clinic ปรับโครงสร้างจมูกได้ทั้งทรง โดยไม่ต้องผ่าตัด ไม่ต้องพักฟื้น มีแผลเพียงรูเข็มเล็กประมาณ 2 มิลลิเมตร",
        "จมูกที่สวยไม่ใช่แค่โด่ง แต่ต้องรับกับรูปหน้า เราจึงออกแบบทรงเฉพาะบุคคล ปรับสันให้เรียวคม เก็บปีก ยืดปลายพุ่ง ให้ใบหน้าดูมีมิติขึ้นในทุกมุม",
      ],
      facts: [
        { label: "ใช้เวลา", value: "ประมาณ 20 นาที" },
        { label: "พักฟื้น", value: "ไม่ต้องพักฟื้น" },
        { label: "ผลลัพธ์", value: "2 ปีขึ้นไป" },
      ],
      goodFor: [
        "อยากมีจมูกโด่งสวย แต่ไม่อยากผ่าตัด",
        "ไม่มีเวลาพักฟื้น ต้องใช้หน้าต่อทันที",
        "เนื้อจมูกน้อย เสริมซิลิโคนไม่ได้",
        "เคยเสริมซิลิโคนแล้วไม่โด่ง เบี้ยว หรือปลายไม่พุ่ง",
        "อยากลองทรงก่อนตัดสินใจเสริมซิลิโคน",
      ],
      benefits: [
        "ปรับโครงสร้างจมูกได้ใกล้เคียงการเสริมซิลิโคน แต่ทรงดูละมุนเป็นธรรมชาติกว่า",
        "ไม่มีความเสี่ยงปลายทะลุ และดูแลง่ายกว่าการผ่าตัด",
        "ใช้ไหมเกรดพรีเมียมหลายชนิดร่วมกัน เลือกให้เหมาะกับเนื้อจมูกแต่ละคน",
        "เทคนิคเฉพาะของ NYC Clinic ที่เดียว",
      ],
      faq: [
        {
          q: "ร้อยไหมจมูกเจ็บไหม",
          a: "เจ็บน้อยมากเมื่อเทียบกับการผ่าตัด เพราะไม่มีการผ่าตัดเลย ใช้ยาชาเฉพาะจุด และแทบไม่บวม กลับไปทำงานได้ในวันถัดไป",
        },
        {
          q: "เนื้อจมูกน้อย ทำได้ไหม",
          a: "ทำได้ เพราะเส้นไหมมีขนาดเล็ก สอดเข้าไปได้ ต่างจากซิลิโคนที่อาจมีปัญหาในคนที่เนื้อจมูกน้อย",
        },
        {
          q: "ต้องพักฟื้นไหม",
          a: "ไม่ต้อง แผลเล็กเท่าปลายเข็มบริเวณปลายจมูก หายไว ไม่บวม กลับบ้านได้ทันที",
        },
        {
          q: "ไหมเส้นใหญ่กว่าโด่งกว่าไหม",
          a: "ไม่เกี่ยว ขนาดไหมไม่ได้กำหนดความโด่ง สิ่งที่สำคัญคือการเลือกชนิดและวางไหมให้เหมาะกับเนื้อจมูกแต่ละคน",
        },
      ],
    },
    detail_en: {
      intro: [
        "NYC Clinic's semi-surgical technique reshapes the whole nose without surgery and without downtime — the only mark is a needle point around 2mm across.",
        "A good nose isn't just a high one. The shape has to suit the face, so each is designed individually: a finer bridge, narrower wings, a lifted tip, more definition from every angle.",
      ],
      facts: [
        { label: "Time", value: "About 20 minutes" },
        { label: "Downtime", value: "None" },
        { label: "Results last", value: "2 years or more" },
      ],
      goodFor: [
        "You want a defined nose but don't want surgery",
        "You have no time to recover and need to be seen the next day",
        "You have little nasal tissue and can't take an implant",
        "A previous implant left the nose low, crooked, or the tip flat",
        "You want to try the shape before committing to an implant",
      ],
      benefits: [
        "Reshapes close to what an implant achieves, with a softer and more natural result",
        "No risk of tip perforation, and far simpler to look after than surgery",
        "Several grades of premium thread used together, chosen for your tissue",
        "A technique developed here — available at NYC Clinic only",
      ],
      faq: [
        {
          q: "Does it hurt?",
          a: "Far less than surgery, because nothing is cut. Local anaesthetic is used, there is almost no swelling, and most people are back at work the next day.",
        },
        {
          q: "Can it be done if I have little nasal tissue?",
          a: "Yes. The threads are fine enough to place where an implant would cause problems.",
        },
        {
          q: "Is there any downtime?",
          a: "No. The entry point is the size of a needle tip, heals quickly and doesn't swell. You can go home straight after.",
        },
        {
          q: "Do thicker threads give a higher nose?",
          a: "No. Thickness doesn't determine height. What matters is choosing the right thread and placing it correctly for your tissue.",
        },
      ],
    },
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
    detail_th: {
      intro: [
        "ร้อยไหมยกกระชับใบหน้า ด้วยไหมละลายที่มีเงี่ยงเล็กๆ ยึดเกาะกับเนื้อเยื่อใต้ผิวหนัง ยกผิวขึ้นพร้อมกระตุ้นการสร้างคอลลาเจนและอิลาสติน",
      ],
      facts: [
        { label: "พักฟื้น", value: "ไม่ต้องพักฟื้น" },
        { label: "เห็นผล", value: "ทันทีหลังทำ" },
      ],
      goodFor: [
        "ผิวหน้าเริ่มหย่อนคล้อย อยากยกกระชับโดยไม่ผ่าตัด",
        "อยากปรับรูปหน้าให้เรียวได้สัดส่วน",
        "มีริ้วรอยแรกเริ่มถึงปานกลาง",
        "แก้มตก ร่องแก้มลึก หรือใต้คางหย่อนคล้อย",
      ],
      benefits: [
        "ยกกระชับได้หลายบริเวณ ทั้งแก้ม คาง กรอบหน้า คิ้ว และลำคอ",
        "กระตุ้นคอลลาเจนและอิลาสติน ให้ผิวแน่นตึงขึ้นในระยะยาว",
        "ไหมละลายได้เองตามธรรมชาติ ไม่ทิ้งสารตกค้าง",
      ],
      faq: [
        {
          q: "ร้อยไหมอันตรายไหม",
          a: "ค่อนข้างปลอดภัย หากทำโดยแพทย์ผู้เชี่ยวชาญ วางไหมในชั้นผิวที่ถูกต้อง และใช้ไหมที่ได้มาตรฐาน อย.",
        },
        {
          q: "เหมาะกับอายุเท่าไร",
          a: "ส่วนใหญ่อยู่ในช่วง 30–60 ปี ที่เริ่มมีผิวหย่อนคล้อย แต่ขึ้นอยู่กับสภาพผิวแต่ละบุคคล ควรให้แพทย์ประเมินก่อน",
        },
      ],
    },
    detail_en: {
      intro: [
        "Absorbable threads with fine barbs anchor into the tissue beneath the skin, lifting it while stimulating your own collagen and elastin.",
      ],
      facts: [
        { label: "Downtime", value: "None" },
        { label: "Results", value: "Visible immediately" },
      ],
      goodFor: [
        "Skin has begun to sag and you'd rather not have surgery",
        "You want a slimmer, better-proportioned face shape",
        "Early to moderate lines",
        "Flattened cheeks, deep nasolabial folds, or a soft jawline",
      ],
      benefits: [
        "Works across several areas — cheeks, chin, jawline, brows and neck",
        "Stimulates collagen and elastin, so skin firms over time as well",
        "Threads absorb naturally and leave nothing behind",
      ],
      faq: [
        {
          q: "Is thread lifting safe?",
          a: "Largely, when performed by an experienced doctor who places the threads at the correct depth and uses FDA-approved materials.",
        },
        {
          q: "What age is it for?",
          a: "Most patients are between 30 and 60, when skin begins to sag — but it depends on your skin rather than your age, so it's assessed individually.",
        },
      ],
    },
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
    detail: isTH
      ? "detail_th" in item
        ? item.detail_th
        : undefined
      : "detail_en" in item
        ? item.detail_en
        : undefined,
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
