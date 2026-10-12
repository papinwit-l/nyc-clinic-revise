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
    q_en: "What is a nose thread lift, and how can it enhance the nasal bridge and tip?",
    a_th: "การร้อยไหมจมูกเป็นหัตถการปรับรูปทรงจมูกโดยใช้ไหมละลาย เช่น PDO ร้อยเข้าไปในชั้นเนื้อเยื่อที่เหมาะสม เพื่อช่วยเสริมสันจมูกและปรับรูปทรงให้ดูมีมิติมากขึ้น พร้อมกระตุ้นการสร้างคอลลาเจนบริเวณที่ร้อยไหม ที่ NYC Clinic ให้ความสำคัญกับการประเมินโครงสร้างจมูกและเลือกเทคนิคให้เหมาะกับรูปหน้าของแต่ละบุคคล เพื่อผลลัพธ์ที่ดูเป็นธรรมชาติ ทั้งนี้ผลลัพธ์ขึ้นอยู่กับแต่ละบุคคล",
    a_en: "A nose thread lift is a procedure that reshapes the nose using dissolvable threads, such as PDO threads, placed in an appropriate tissue layer. The threads help support the nasal bridge, enhance definition, and stimulate collagen production around the treated area. At NYC Clinic, we assess each patient's nasal structure and select a suitable technique based on their facial features, aiming for a natural-looking result. Results vary from person to person.",
  },
  {
    slug: "nose-thread-lift-semi-surgery",
    category: "nose",
    q_th: "ร้อยไหมจมูกกึ่งศัลยกรรม (Semi Surgery) ที่ NYC Clinic มีข้อดีอย่างไร?",
    q_en: "What are the benefits of NYC Clinic's Semi-Surgery nose thread lift?",
    a_th: "เทคนิค Semi Surgery ของ NYC Clinic เน้นการปรับรูปทรงและสัดส่วนจมูกให้รับกับใบหน้า โดยไม่ต้องผ่าตัดใหญ่ ใช้เวลาทำประมาณ 20 นาที มีแผลขนาดเล็กจากร้อยไหมตรงปลายจมูก และใช้เวลาพักฟื้นน้อยกว่าการผ่าตัด เทคนิคการร้อยไหมจมูกกึ่งศัลยกรรม จะช่วยปรับโครงสร้างของทรงจมูกให้สันจมูกโด่งขึ้นและเรียวขึ้น และยังช่วยให้ปลายจมูกเรียวพุ่ง เก็บปีกจมูก ได้ใกล้เคียงกับการทำศัลยกรรมเสริมจมูกแบบปกติถึง 70% ทำให้จมูกดูสวยในทุกมิติ ดูเป็นธรรมชาติเข้ากับรูปหน้า",
    a_en: "NYC Clinic's Semi-Surgery technique aims to refine the shape and proportions of the nose to complement the face without major surgery. The procedure takes approximately 20 minutes and involves a small entry point at the tip of the nose. Recovery time is generally shorter than that of surgical rhinoplasty. The technique aims to enhance the nasal bridge, refine and lift the tip, and make the nostrils appear narrower. According to the clinic's stated comparison, the results can be up to 70% similar to those of conventional surgical rhinoplasty. The aim is to achieve a balanced, natural-looking result that complements the patient's facial features.",
  },
  {
    slug: "nose-thread-lift-pain-recovery",
    category: "nose",
    featured: true,
    q_th: "ร้อยไหมจมูกเจ็บไหม? ต้องพักฟื้นกี่วัน?",
    q_en: "Is a nose thread lift painful? How long does recovery take?",
    a_th: "การร้อยไหมจมูกอาจรู้สึกเจ็บเล็กน้อย โดยแพทย์จะใช้ยาชาเพื่อช่วยลดความเจ็บ เป็นหัตถการที่ไม่ต้องผ่าตัดใหญ่ และโดยทั่วไปใช้เวลาพักฟื้นไม่นาน สามารถกลับไปทำกิจวัตรประจำวันได้ตามความเหมาะสม ที่ NYC Clinic เราให้ความสำคัญกับการดูแลและประเมินโดยแพทย์ เพื่อให้การร้อยไหมจมูกเหมาะสมกับแต่ละบุคคล ทั้งนี้อาจมีอาการบวมหรือช้ำหลังทำได้",
    a_en: "You may experience some discomfort during the procedure. Local anaesthesia is used to help minimise pain. As the procedure does not involve major surgery, recovery is generally relatively short, and you may be able to resume daily activities as appropriate. At NYC Clinic, a doctor assesses each patient to determine whether the procedure is suitable. Some swelling or bruising may occur afterward.",
  },
  {
    slug: "nose-thread-lift-longevity",
    category: "nose",
    featured: true,
    q_th: "ร้อยไหมจมูกอยู่ได้นานแค่ไหน? ต้องทำซ้ำหรือไม่?",
    q_en: "How long does a nose thread lift last? Will I need repeat treatment?",
    a_th: "การร้อยไหมจมูกด้วยไหมละลาย PDO ผลลัพธ์อยู่ได้นานประมาณ 2-3 ปี ทั้งนี้ขึ้นอยู่กับชนิดของไหม เทคนิคที่ใช้ และสภาพเนื้อเยื่อของแต่ละบุคคล ที่ NYC Clinic เราให้ความสำคัญกับการเลือกขนาดไหมและเทคนิคที่เหมาะสมกับโครงสร้างจมูก เพื่อให้ได้รูปทรงที่ดูเป็นธรรมชาติ โดยสามารถปรึกษาแพทย์เพื่อประเมินความเหมาะสมในการทำซ้ำได้",
    a_en: "Results from a nose thread lift using dissolvable PDO threads may last approximately 2–3 years, depending on the type of thread, the technique used, and each patient's tissue characteristics. At NYC Clinic, we select thread sizes and techniques based on the patient's nasal structure to aim for a natural-looking result. You can consult a doctor to determine whether repeat treatment is appropriate for you.",
  },
  {
    slug: "nose-thread-lift-downtime",
    category: "nose",
    q_th: "การร้อยไหมจมูกต้องพักฟื้นไหม?",
    q_en: "Is there any downtime after a nose thread lift?",
    a_th: "การร้อยไหมจมูกจะไม่มีการผ่าตัดใดๆ ดังนั้น แผลจึงเล็กเท่าปลายปากกาบริเวณปลายจมูก ส่งผลให้แผลหายไว ไม่บวม ไม่ต้องพักฟื้นเลย หลังจากทำกลับบ้านไป อีกวันสามารถไปทำงานได้ตามปกติเลยค่ะ",
    a_en: "A nose thread lift uses a small entry point at the tip of the nose rather than a conventional surgical incision. The entry point is approximately the size of a pen tip. Healing time and recovery vary from person to person. Some patients may be able to return to work the following day, depending on their condition and the doctor's advice.",
  },

  // ── Face thread lift ──
  {
    slug: "face-thread-lift-what-is",
    category: "face",
    q_th: "ร้อยไหมหน้าคืออะไร? ช่วยยกกระชับใบหน้าได้อย่างไร?",
    q_en: "What is a face thread lift, and how does it lift and tighten the face?",
    a_th: "การร้อยไหมหน้า (Thread Lift) คือหัตถการยกกระชับใบหน้าโดยใช้ไหมละลายสอดเข้าใต้ผิวหนัง เพื่อช่วยพยุงผิวที่หย่อนคล้อย ปรับกรอบหน้าให้ดูชัดขึ้น และกระตุ้นการสร้างคอลลาเจน โดยไม่ต้องผ่าตัดใหญ่ ที่ NYC Clinic แพทย์จะประเมินโครงหน้าและเลือกเทคนิคการร้อยไหมให้เหมาะสมกับแต่ละบุคคล เพื่อผลลัพธ์ที่ดูเป็นธรรมชาติ ทั้งนี้ผลลัพธ์แตกต่างกันในแต่ละบุคคล",
    a_en: "A face thread lift is a lifting procedure in which dissolvable threads are inserted beneath the skin to help support sagging tissue, define the facial contour, and stimulate collagen production without major surgery. At NYC Clinic, a doctor assesses each patient's facial structure and selects a suitable technique to achieve a natural-looking result. Results vary from person to person.",
  },
  {
    slug: "thread-lift-benefits",
    category: "face",
    q_th: "ร้อยไหมมีข้อดีอย่างไร? ช่วยยกกระชับผิวและลดริ้วรอยได้จริงไหม?",
    q_en: "What are the benefits of a thread lift? Can it help firm the skin and reduce wrinkles?",
    a_th: "การร้อยไหมช่วยยกกระชับผิว ลดความหย่อนคล้อยและริ้วรอยบางประเภท พร้อมกระตุ้นการสร้างคอลลาเจน โดยไม่ต้องผ่าตัดใหญ่ สามารถทำได้หลายบริเวณ เช่น ใบหน้าและกรอบหน้า โดยอาจเห็นผลยกกระชับเบื้องต้นหลังทำ ทั้งนี้ผลลัพธ์ขึ้นอยู่กับสภาพผิวและแต่ละบุคคล ที่ NYC Clinic ให้ความสำคัญกับการประเมินและเลือกเทคนิคการร้อยไหมให้เหมาะสมกับแต่ละบุคคล",
    a_en: "A thread lift can help lift and firm the skin, improve certain types of wrinkles, and reduce the appearance of sagging while stimulating collagen production, without major surgery. It can be performed on various areas, including the face and jawline. Some lifting effects may be visible immediately after the procedure. Results depend on each person's skin condition and individual characteristics. At NYC Clinic, we assess each patient and select an appropriate technique based on their needs.",
  },

  // ── Safety & side effects ──
  {
    slug: "thread-lift-safety",
    category: "safety",
    featured: true,
    q_th: "ร้อยไหมอันตรายไหม? ปลอดภัยหรือไม่?",
    q_en: "Is a thread lift dangerous? Is it safe?",
    a_th: "การร้อยไหมเป็นหัตถการที่มีความเสี่ยง แต่สามารถลดความเสี่ยงได้เมื่อทำโดยแพทย์ที่มีประสบการณ์ ใช้ไหมที่ได้มาตรฐาน และวางไหมในชั้นผิวที่เหมาะสม ที่ NYC Clinic เราให้ความสำคัญกับการประเมินรูปหน้าและวางแผนการรักษาเฉพาะบุคคล เพื่อช่วยลดความเสี่ยงและดูแลความปลอดภัยของผู้เข้ารับบริการ",
    a_en: "A thread lift carries certain risks. These risks may be reduced when the procedure is performed by an experienced, qualified doctor using medical-grade threads and placing them in the appropriate tissue layer. At NYC Clinic, we assess each patient's facial structure and develop an individual treatment plan to help minimise risks and support patient safety.",
  },
  {
    slug: "thread-lift-pros-cons",
    category: "safety",
    q_th: "ข้อดี ข้อเสีย และผลข้างเคียงจากการร้อยไหม",
    q_en: "What are the advantages, disadvantages, and possible side effects of a thread lift?",
    a_th: "ข้อดีของการร้อยไหม คือ ช่วยกระตุ้นการสร้างคอลลาเจนและอิลาสติน ให้ผิวแน่นตึง ยกกระชับ ลดริ้วรอย ร่องลึก โดยไม่ต้องผ่าตัดศัลยกรรม สามารถทำได้หลายบริเวณ แก้ปัญหาได้หลากหลาย เห็นผลลัพธ์ทันทีโดยไม่ต้องพักฟื้น ค่อนข้างปลอดภัยถ้าทำโดยแพทย์ผู้เชี่ยวชาญ และคลินิกที่ได้มาตรฐาน และใช้ไหมที่คุณภาพดีมีมาตรฐาน\n\nข้อเสียของการร้อยไหม การร้อยไหมอาจทำให้ได้ผลลัพธ์ที่ไม่ดี ไม่ได้ตามความคาดหมาย ถ้าไม่ได้ร้อยกับแพทย์ผู้เชี่ยวชาญที่มีประสบการณ์ เพราะต้องวางไหมให้อยู่ในชั้นผิวหนังที่เหมาะสมเพื่อให้ได้ผลลัพธ์ที่ดีและไม่เกิดผลข้างเคียงตามมา และอยู่ที่ความเชี่ยวชาญของแพทย์ในการประเมินโครงหน้า และรูปหน้าของแต่ละท่าน เพื่อเลือกใช้ไหมที่เหมาะสมกับปัญหาเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด และคุณภาพของไหมถ้าไม่ได้มาตรฐานก็อาจจะทำให้การร้อยไหมไม่เห็นผลค่ะ",
    a_en: "Advantages: A thread lift may help stimulate collagen and elastin production, firm the skin, improve sagging, and reduce the appearance of certain wrinkles and deep lines without major surgery. It can be performed on different areas to address various concerns. Some results may be visible immediately, and recovery is generally relatively short. Safety depends on factors such as the doctor's expertise, the clinic's standards, and the quality of the threads used.\\n\\nDisadvantages: Results may be unsatisfactory or differ from expectations if the procedure is not performed by an experienced, qualified doctor. Correct thread placement and proper assessment of each patient's facial structure are important when selecting an appropriate technique. The quality and suitability of the threads may also affect the outcome. As with any medical procedure, complications can occur.",
  },
  {
    slug: "thread-lift-side-effects",
    category: "safety",
    q_th: "ร้อยไหมมีผลข้างเคียงอะไรบ้าง? อันตรายหรือไม่?",
    q_en: "What side effects can a thread lift cause? Are they dangerous?",
    a_th: "ผลข้างเคียงปกติที่เกิดขึ้นได้ ไม่เป็นอันตราย อาจจะมีอาการบวม หรือเขียวช้ำ และตึงบริเวณที่ร้อยไหม ซึ่งจะเป็นไม่มาก และจะค่อยๆ ดีขึ้นและหายไปเองได้ใน 7 – 14 วัน\n\nสำหรับผลข้างเคียงที่อันตราย เช่น เกิดการอักเสบของเนื้อเยื่อ ติดเชื้อ ผลข้างเคียงเหล่านี้มักจะเกิดจากการร้อยไหมกับหมอเถื่อน คลินิกเถื่อน ไม่ได้ใช้ไหมที่ปลอดภัย ดังนั้นก่อนตัดสินใจ ร้อยไหม ควรพิถีพิถันในการเลือกคลินิกที่ได้มาตรฐานและหมอที่มีประสบการณ์เท่านั้นนะคะ",
    a_en: "Common side effects may include mild swelling, bruising, and tightness in the treated area. These symptoms often improve gradually and may resolve within 7–14 days.\\n\\nMore serious complications can include tissue inflammation and infection. The risk may be affected by factors such as the practitioner's qualifications, the treatment environment, the technique used, and the quality of the threads. Before undergoing a thread lift, choose a licensed clinic and a qualified, experienced doctor.",
  },
  {
    slug: "thread-lift-medical-conditions",
    category: "safety",
    q_th: "มีโรคประจำตัวสามารถร้อยไหมได้ไหม?",
    q_en: "Can I have a thread lift if I have an underlying medical condition?",
    a_th: "ผู้ที่มีโรคประจำตัวอาจสามารถร้อยไหมได้ ขึ้นอยู่กับชนิดของโรค ความรุนแรง อาการ และยาที่ใช้อยู่ ควรปรึกษาแพทย์ผู้รักษาโรคประจำตัวก่อนเข้ารับบริการ ที่ NYC Clinic เราให้ความสำคัญกับการซักประวัติสุขภาพและประเมินความเหมาะสมโดยแพทย์เป็นรายบุคคล เพื่อช่วยลดความเสี่ยงและเพิ่มความปลอดภัยในการร้อยไหม",
    a_en: "People with underlying medical conditions may be suitable for a thread lift, depending on the condition, its severity, current symptoms, and medications. Consult the doctor who manages your condition before undergoing the procedure. At NYC Clinic, we take a medical history and have a doctor assess each patient's suitability individually to help minimise risks and support safer treatment.",
  },

  // ── Before & aftercare ──
  {
    slug: "thread-lift-preparation",
    category: "care",
    featured: true,
    q_th: "ก่อนร้อยไหมต้องเตรียมตัวอย่างไร?",
    q_en: "How should I prepare for a thread lift?",
    a_th: "ก่อนร้อยไหมควรแจ้งแพทย์เกี่ยวกับโรคประจำตัว ยาที่ใช้ วิตามิน และอาหารเสริมทุกชนิด โดยเฉพาะยาต้านการแข็งตัวของเลือดและแอสไพริน ซึ่งอาจเพิ่มความเสี่ยงต่อการเกิดรอยช้ำ ที่ NYC Clinic มีการให้คำปรึกษาจากแพทย์ก่อนทำหัตถการ เพื่อประเมินความเหมาะสมและวางแผนการเตรียมตัวอย่างปลอดภัย ไม่ควรหยุดยาเองโดยไม่ได้รับคำแนะนำจากแพทย์",
    a_en: "Before your procedure, inform your doctor about any medical conditions and all medications, vitamins, and supplements you take. This is particularly important for blood-thinning medications and aspirin, which may increase the risk of bruising. At NYC Clinic, a doctor will assess your suitability and advise you on how to prepare safely. Do not stop taking any medication without first consulting your doctor.",
  },
  {
    slug: "thread-lift-aftercare",
    category: "care",
    q_th: "หลังร้อยไหมต้องดูแลตัวเองอย่างไร? มีข้อห้ามอะไรบ้าง?",
    q_en: "How should I care for myself after a thread lift? What should I avoid?",
    a_th: "หลังร้อยไหมควรรักษาความสะอาดบริเวณแผล หลีกเลี่ยงการสัมผัสหรือกดนวดบริเวณที่ร้อยไหม และดูแลแผลตามคำแนะนำของแพทย์ โดยอาจต้องหลีกเลี่ยงการให้แผลโดนน้ำในช่วง 1–3 วันแรก รวมถึงงดเครื่องดื่มแอลกอฮอล์และการสูบบุหรี่ประมาณ 5–7 วัน ที่ NYC Clinic เราให้ความสำคัญกับการแนะนำวิธีดูแลหลังร้อยไหมให้เหมาะสมกับแต่ละบุคคล เพื่อช่วยลดความเสี่ยงและส่งเสริมการฟื้นตัวอย่างเหมาะสม",
    a_en: "Keep the treated area clean, avoid touching, pressing, or massaging the area where the threads were placed, and follow your doctor's wound-care instructions. You may be advised to keep the entry points dry for the first 1–3 days and avoid alcohol and smoking for approximately 5–7 days. At NYC Clinic, we provide individualised aftercare guidance to help minimise risks and support recovery.",
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
