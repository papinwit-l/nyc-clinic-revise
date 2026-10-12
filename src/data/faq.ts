import type { FaqCategory, FaqItem } from "@/types/faq";

/**
 * General FAQ — the `faq` CPT. Shown on /contact (a short pick) and in full
 * on /faq. Distinct from the service-specific FAQ in data/services.ts.
 *
 * Thai copy is marketing's (Oct 2026), unchanged apart from removing stray
 * markdown. ⚠ The English is Claude's translation of it and has not been
 * reviewed — marketing or the clinic should check it before launch,
 * especially the clinical claims.
 *
 * Answers may hold several paragraphs, separated by a blank line ("\n\n").
 * FaqAccordion renders each as its own <p>.
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
  // ── Nose thread lift ──
  {
    slug: "nose-thread-lift-what-is",
    category: "nose",
    featured: true,
    q_th: "ร้อยไหมจมูกคืออะไร? ช่วยให้จมูกโด่งและปลายพุ่งได้อย่างไร?",
    q_en: "What is a nose thread lift, and how does it raise the bridge and lift the tip?",
    a_th: "การร้อยไหมจมูกเป็นหัตถการปรับรูปทรงจมูกโดยใช้ไหมละลาย เช่น PDO ร้อยเข้าไปในชั้นเนื้อเยื่อที่เหมาะสม เพื่อช่วยเสริมสันจมูกและปรับรูปทรงให้ดูมีมิติมากขึ้น พร้อมกระตุ้นการสร้างคอลลาเจนบริเวณที่ร้อยไหม ที่ NYC Clinic ให้ความสำคัญกับการประเมินโครงสร้างจมูกและเลือกเทคนิคให้เหมาะกับรูปหน้าของแต่ละบุคคล เพื่อผลลัพธ์ที่ดูเป็นธรรมชาติ ทั้งนี้ผลลัพธ์ขึ้นอยู่กับแต่ละบุคคล",
    a_en: "A nose thread lift reshapes the nose using dissolvable threads, such as PDO, placed in the appropriate tissue layer. The threads support the bridge and give the nose more definition, while stimulating collagen production where they are placed. At NYC Clinic, we assess the structure of each nose and choose a technique to suit the individual face, for a natural-looking result. Results vary from person to person.",
  },
  {
    slug: "nose-thread-lift-semi-surgery",
    category: "nose",
    q_th: "ร้อยไหมจมูกกึ่งศัลยกรรม (Semi Surgery) ที่ NYC Clinic มีข้อดีอย่างไร?",
    q_en: "What are the benefits of the Semi-Surgery nose thread lift at NYC Clinic?",
    a_th: "เทคนิค Semi Surgery ของ NYC Clinic เน้นการปรับรูปทรงและสัดส่วนจมูกให้รับกับใบหน้า โดยไม่ต้องผ่าตัดใหญ่ ใช้เวลาทำประมาณ 20 นาที มีแผลขนาดเล็กจากร้อยไหมตรงปลายจมูก และใช้เวลาพักฟื้นน้อยกว่าการผ่าตัด เทคนิคการร้อยไหมจมูกกึ่งศัลยกรรม จะช่วยปรับโครงสร้างของทรงจมูกให้สันจมูกโด่งขึ้นและเรียวขึ้น และยังช่วยให้ปลายจมูกเรียวพุ่ง เก็บปีกจมูก ได้ใกล้เคียงกับการทำศัลยกรรมเสริมจมูกแบบปกติถึง 70% ทำให้จมูกดูสวยในทุกมิติ ดูเป็นธรรมชาติเข้ากับรูปหน้า",
    a_en: "NYC Clinic's Semi-Surgery technique reshapes the nose and refines its proportions to suit the face, without major surgery. The procedure takes about 20 minutes, leaves only a small entry point at the tip of the nose, and needs less recovery time than surgery. It restructures the nose so the bridge looks higher and slimmer, refines and lifts the tip, and narrows the nostrils, with results up to 70% similar to conventional surgical rhinoplasty. The nose looks good from every angle and natural with the rest of the face.",
  },
  {
    slug: "nose-thread-lift-pain-recovery",
    category: "nose",
    featured: true,
    q_th: "ร้อยไหมจมูกเจ็บไหม? ต้องพักฟื้นกี่วัน?",
    q_en: "Does a nose thread lift hurt? How long is the recovery?",
    a_th: "การร้อยไหมจมูกอาจรู้สึกเจ็บเล็กน้อย โดยแพทย์จะใช้ยาชาเพื่อช่วยลดความเจ็บ เป็นหัตถการที่ไม่ต้องผ่าตัดใหญ่ และโดยทั่วไปใช้เวลาพักฟื้นไม่นาน สามารถกลับไปทำกิจวัตรประจำวันได้ตามความเหมาะสม ที่ NYC Clinic เราให้ความสำคัญกับการดูแลและประเมินโดยแพทย์ เพื่อให้การร้อยไหมจมูกเหมาะสมกับแต่ละบุคคล ทั้งนี้อาจมีอาการบวมหรือช้ำหลังทำได้",
    a_en: "You may feel slight discomfort; the doctor uses local anesthetic to reduce it. The procedure involves no major surgery and recovery is generally short, so you can return to your daily routine as appropriate. At NYC Clinic, every nose thread lift is assessed and overseen by a doctor so that it suits the individual. Some swelling or bruising may occur afterward.",
  },
  {
    slug: "nose-thread-lift-longevity",
    category: "nose",
    featured: true,
    q_th: "ร้อยไหมจมูกอยู่ได้นานแค่ไหน? ต้องทำซ้ำหรือไม่?",
    q_en: "How long does a nose thread lift last? Will I need to repeat it?",
    a_th: "การร้อยไหมจมูกด้วยไหมละลาย PDO ผลลัพธ์อยู่ได้นานประมาณ 2-3 ปี ทั้งนี้ขึ้นอยู่กับชนิดของไหม เทคนิคที่ใช้ และสภาพเนื้อเยื่อของแต่ละบุคคล ที่ NYC Clinic เราให้ความสำคัญกับการเลือกขนาดไหมและเทคนิคที่เหมาะสมกับโครงสร้างจมูก เพื่อให้ได้รูปทรงที่ดูเป็นธรรมชาติ โดยสามารถปรึกษาแพทย์เพื่อประเมินความเหมาะสมในการทำซ้ำได้",
    a_en: "With dissolvable PDO threads, results last around 2–3 years, depending on the type of thread, the technique used and each person's tissue. At NYC Clinic, we choose the thread size and technique to suit the structure of your nose, for a natural-looking shape. You can consult the doctor to assess whether a repeat treatment is right for you.",
  },
  {
    slug: "nose-thread-lift-downtime",
    category: "nose",
    q_th: "การร้อยไหมจมูกต้องพักฟื้นไหม?",
    q_en: "Is there any downtime after a nose thread lift?",
    a_th: "การร้อยไหมจมูกจะไม่มีการผ่าตัดใดๆ ดังนั้น แผลจึงเล็กเท่าปลายปากกาบริเวณปลายจมูก ส่งผลให้แผลหายไว ไม่บวม ไม่ต้องพักฟื้นเลย หลังจากทำกลับบ้านไป อีกวันสามารถไปทำงานได้ตามปกติเลยค่ะ",
    a_en: "A nose thread lift involves no surgical incision, so the entry point at the tip of the nose is no bigger than the tip of a pen. It heals quickly, with no swelling and no downtime at all. You can go home right after the procedure and return to work as usual the next day.",
  },

  // ── Face thread lift ──
  {
    slug: "face-thread-lift-what-is",
    category: "face",
    q_th: "ร้อยไหมหน้าคืออะไร? ช่วยยกกระชับใบหน้าได้อย่างไร?",
    q_en: "What is a face thread lift, and how does it lift the face?",
    a_th: "การร้อยไหมหน้า (Thread Lift) คือหัตถการยกกระชับใบหน้าโดยใช้ไหมละลายสอดเข้าใต้ผิวหนัง เพื่อช่วยพยุงผิวที่หย่อนคล้อย ปรับกรอบหน้าให้ดูชัดขึ้น และกระตุ้นการสร้างคอลลาเจน โดยไม่ต้องผ่าตัดใหญ่ ที่ NYC Clinic แพทย์จะประเมินโครงหน้าและเลือกเทคนิคการร้อยไหมให้เหมาะสมกับแต่ละบุคคล เพื่อผลลัพธ์ที่ดูเป็นธรรมชาติ ทั้งนี้ผลลัพธ์แตกต่างกันในแต่ละบุคคล",
    a_en: "A face thread lift is a lifting procedure in which dissolvable threads are inserted under the skin to support sagging skin, define the facial contour and stimulate collagen production, without major surgery. At NYC Clinic, the doctor assesses your facial structure and chooses a threading technique to suit you, for a natural-looking result. Results vary from person to person.",
  },
  {
    slug: "thread-lift-benefits",
    category: "face",
    q_th: "ร้อยไหมมีข้อดีอย่างไร? ช่วยยกกระชับผิวและลดริ้วรอยได้จริงไหม?",
    q_en: "What are the benefits of a thread lift? Does it really firm the skin and reduce wrinkles?",
    a_th: "การร้อยไหมช่วยยกกระชับผิว ลดความหย่อนคล้อยและริ้วรอยบางประเภท พร้อมกระตุ้นการสร้างคอลลาเจน โดยไม่ต้องผ่าตัดใหญ่ สามารถทำได้หลายบริเวณ เช่น ใบหน้าและกรอบหน้า โดยอาจเห็นผลยกกระชับเบื้องต้นหลังทำ ทั้งนี้ผลลัพธ์ขึ้นอยู่กับสภาพผิวและแต่ละบุคคล ที่ NYC Clinic ให้ความสำคัญกับการประเมินและเลือกเทคนิคการร้อยไหมให้เหมาะสมกับแต่ละบุคคล",
    a_en: "A thread lift lifts and firms the skin, reduces sagging and some types of wrinkles, and stimulates collagen production, all without major surgery. It can be done on several areas, such as the face and jawline, and an initial lifting effect may be visible right after the procedure. Results depend on your skin and vary from person to person. At NYC Clinic, we assess each patient and choose the threading technique that suits them.",
  },

  // ── Safety & side effects ──
  {
    slug: "thread-lift-safety",
    category: "safety",
    featured: true,
    q_th: "ร้อยไหมอันตรายไหม? ปลอดภัยหรือไม่?",
    q_en: "Is a thread lift dangerous? Is it safe?",
    a_th: "การร้อยไหมเป็นหัตถการที่มีความเสี่ยง แต่สามารถลดความเสี่ยงได้เมื่อทำโดยแพทย์ที่มีประสบการณ์ ใช้ไหมที่ได้มาตรฐาน และวางไหมในชั้นผิวที่เหมาะสม ที่ NYC Clinic เราให้ความสำคัญกับการประเมินรูปหน้าและวางแผนการรักษาเฉพาะบุคคล เพื่อช่วยลดความเสี่ยงและดูแลความปลอดภัยของผู้เข้ารับบริการ",
    a_en: "A thread lift is a procedure that carries risks, but they can be reduced when it is performed by an experienced doctor, using threads that meet medical standards, placed in the right skin layer. At NYC Clinic, we assess each face and plan treatment individually to help reduce risk and keep our patients safe.",
  },
  {
    slug: "thread-lift-pros-cons",
    category: "safety",
    q_th: "ข้อดี ข้อเสีย และผลข้างเคียงจากการร้อยไหม",
    q_en: "The pros, cons and side effects of a thread lift",
    a_th: "ข้อดีของการร้อยไหม คือ ช่วยกระตุ้นการสร้างคอลลาเจนและอิลาสติน ให้ผิวแน่นตึง ยกกระชับ ลดริ้วรอย ร่องลึก โดยไม่ต้องผ่าตัดศัลยกรรม สามารถทำได้หลายบริเวณ แก้ปัญหาได้หลากหลาย เห็นผลลัพธ์ทันทีโดยไม่ต้องพักฟื้น ค่อนข้างปลอดภัยถ้าทำโดยแพทย์ผู้เชี่ยวชาญ และคลินิกที่ได้มาตรฐาน และใช้ไหมที่คุณภาพดีมีมาตรฐาน\n\nข้อเสียของการร้อยไหม การร้อยไหมอาจทำให้ได้ผลลัพธ์ที่ไม่ดี ไม่ได้ตามความคาดหมาย ถ้าไม่ได้ร้อยกับแพทย์ผู้เชี่ยวชาญที่มีประสบการณ์ เพราะต้องวางไหมให้อยู่ในชั้นผิวหนังที่เหมาะสมเพื่อให้ได้ผลลัพธ์ที่ดีและไม่เกิดผลข้างเคียงตามมา และอยู่ที่ความเชี่ยวชาญของแพทย์ในการประเมินโครงหน้า และรูปหน้าของแต่ละท่าน เพื่อเลือกใช้ไหมที่เหมาะสมกับปัญหาเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด และคุณภาพของไหมถ้าไม่ได้มาตรฐานก็อาจจะทำให้การร้อยไหมไม่เห็นผลค่ะ",
    a_en: "The benefits: a thread lift stimulates collagen and elastin production, so the skin becomes firmer and lifted, with fewer wrinkles and deep lines, without cosmetic surgery. It can be done on many areas and address a range of concerns, with results visible immediately and no downtime. It is relatively safe when performed by a specialist doctor at an accredited clinic, using good-quality threads that meet medical standards.\n\nThe drawbacks: a thread lift may give a poor or unexpected result if it isn't done by an experienced specialist, because the threads must sit in the right skin layer to work well without side effects. It also depends on the doctor's skill in assessing each person's facial structure and shape, to choose the threads that suit the concern. And if the threads are substandard, the treatment may show no result at all.",
  },
  {
    slug: "thread-lift-side-effects",
    category: "safety",
    q_th: "ร้อยไหมมีผลข้างเคียงอะไรบ้าง? อันตรายหรือไม่?",
    q_en: "What side effects can a thread lift cause? Are they dangerous?",
    a_th: "ผลข้างเคียงปกติที่เกิดขึ้นได้ ไม่เป็นอันตราย อาจจะมีอาการบวม หรือเขียวช้ำ และตึงบริเวณที่ร้อยไหม ซึ่งจะเป็นไม่มาก และจะค่อยๆ ดีขึ้นและหายไปเองได้ใน 7 – 14 วัน\n\nสำหรับผลข้างเคียงที่อันตราย เช่น เกิดการอักเสบของเนื้อเยื่อ ติดเชื้อ ผลข้างเคียงเหล่านี้มักจะเกิดจากการร้อยไหมกับหมอเถื่อน คลินิกเถื่อน ไม่ได้ใช้ไหมที่ปลอดภัย ดังนั้นก่อนตัดสินใจ ร้อยไหม ควรพิถีพิถันในการเลือกคลินิกที่ได้มาตรฐานและหมอที่มีประสบการณ์เท่านั้นนะคะ",
    a_en: "Normal side effects, which are not dangerous, can include mild swelling, bruising and tightness where the threads were placed. These gradually improve and go away on their own within 7–14 days.\n\nDangerous side effects, such as tissue inflammation or infection, usually come from treatment by unlicensed practitioners or clinics that don't use safe threads. So before deciding on a thread lift, take care to choose an accredited clinic and an experienced doctor.",
  },
  {
    slug: "thread-lift-medical-conditions",
    category: "safety",
    q_th: "มีโรคประจำตัวสามารถร้อยไหมได้ไหม?",
    q_en: "Can I have a thread lift if I have an underlying medical condition?",
    a_th: "ผู้ที่มีโรคประจำตัวอาจสามารถร้อยไหมได้ ขึ้นอยู่กับชนิดของโรค ความรุนแรง อาการ และยาที่ใช้อยู่ ควรปรึกษาแพทย์ผู้รักษาโรคประจำตัวก่อนเข้ารับบริการ ที่ NYC Clinic เราให้ความสำคัญกับการซักประวัติสุขภาพและประเมินความเหมาะสมโดยแพทย์เป็นรายบุคคล เพื่อช่วยลดความเสี่ยงและเพิ่มความปลอดภัยในการร้อยไหม",
    a_en: "People with an underlying condition may be able to have a thread lift, depending on the type and severity of the condition, its symptoms and the medication being taken. Please consult the doctor treating your condition before your appointment. At NYC Clinic, we take a full health history and a doctor assesses each patient's suitability individually, to help reduce risk and make the treatment safer.",
  },

  // ── Before & aftercare ──
  {
    slug: "thread-lift-preparation",
    category: "care",
    featured: true,
    q_th: "ก่อนร้อยไหมต้องเตรียมตัวอย่างไร?",
    q_en: "How should I prepare before a thread lift?",
    a_th: "ก่อนร้อยไหมควรแจ้งแพทย์เกี่ยวกับโรคประจำตัว ยาที่ใช้ วิตามิน และอาหารเสริมทุกชนิด โดยเฉพาะยาต้านการแข็งตัวของเลือดและแอสไพริน ซึ่งอาจเพิ่มความเสี่ยงต่อการเกิดรอยช้ำ ที่ NYC Clinic มีการให้คำปรึกษาจากแพทย์ก่อนทำหัตถการ เพื่อประเมินความเหมาะสมและวางแผนการเตรียมตัวอย่างปลอดภัย ไม่ควรหยุดยาเองโดยไม่ได้รับคำแนะนำจากแพทย์",
    a_en: "Before a thread lift, tell the doctor about any medical conditions and every medicine, vitamin and supplement you take, especially blood thinners and aspirin, which can increase the risk of bruising. At NYC Clinic, a doctor consults with you before the procedure to assess suitability and plan your preparation safely. Do not stop any medication on your own without your doctor's advice.",
  },
  {
    slug: "thread-lift-aftercare",
    category: "care",
    q_th: "หลังร้อยไหมต้องดูแลตัวเองอย่างไร? มีข้อห้ามอะไรบ้าง?",
    q_en: "How should I look after myself after a thread lift? What should I avoid?",
    a_th: "หลังร้อยไหมควรรักษาความสะอาดบริเวณแผล หลีกเลี่ยงการสัมผัสหรือกดนวดบริเวณที่ร้อยไหม และดูแลแผลตามคำแนะนำของแพทย์ โดยอาจต้องหลีกเลี่ยงการให้แผลโดนน้ำในช่วง 1–3 วันแรก รวมถึงงดเครื่องดื่มแอลกอฮอล์และการสูบบุหรี่ประมาณ 5–7 วัน ที่ NYC Clinic เราให้ความสำคัญกับการแนะนำวิธีดูแลหลังร้อยไหมให้เหมาะสมกับแต่ละบุคคล เพื่อช่วยลดความเสี่ยงและส่งเสริมการฟื้นตัวอย่างเหมาะสม",
    a_en: "After a thread lift, keep the treated area clean, avoid touching, pressing or massaging it, and care for the entry points as your doctor advises. You may need to keep them dry for the first 1–3 days, and avoid alcohol and smoking for about 5–7 days. At NYC Clinic, we give aftercare advice suited to each patient, to help reduce risk and support a good recovery.",
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
