import type { ServiceCard } from "@/types/service";

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
// ⚠⚠ PLACENTA — MAJOR CLAIMS REMOVED. The old placenta page states the
//   treatment helps with autoimmune disease (rheumatoid arthritis, lupus),
//   HIV/AIDS, tuberculosis, diabetes complications, osteoporosis, dementia,
//   migraine, menopause and andropause symptoms, and erectile dysfunction.
//   Those are claims to treat named diseases and must not appear on a clinic
//   site — Thai medical advertising rules are explicit about this, and the
//   exposure is legal, not just reputational. The entry below covers SKIN
//   only. Flag to marketing before anyone reinstates the old copy.
//
// ⚠ CLAIMS DELIBERATELY NOT CARRIED OVER from the old blepharoplasty page:
//   "ชั้นตาคงรูปได้นานเกิน 3 ปี ไม่มีตก ไม่ต้องแก้" (a crease lasting 3+ years
//   with no drop and no revision) and "รับประกันคุณภาพ" (a quality guarantee).
//   Both are outcome guarantees. Marketing should decide whether to restate
//   them rather than having them inherited silently in a rebuild.
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
  },
  {
    slug: "filler",
    parent: "facial-design",
    image: "/images/services/cat-facial-design.png",
    title_en: "Filler",
    title_th: "ฟิลเลอร์",
    desc_en: "Under-eye, nasolabial folds, cheeks, temples, forehead and lips",
    desc_th:
      "เติมเต็ม ปรับรูปหน้า ใต้ตา ร่องแก้ม แก้มตอบ ขมับ หน้าผาก ปากอิ่มฟู",
    summary_en:
      "Under-eye, nasolabial folds, cheeks, temples, forehead and lips",
    summary_th:
      "เติมเต็ม ปรับรูปหน้า ใต้ตา ร่องแก้ม แก้มตอบ ขมับ หน้าผาก ปากอิ่มฟู",
  },
  {
    slug: "smas-x",
    parent: "facial-design",
    image: "/images/services/cat-facial-design.png",
    title_en: "SMAS-X",
    title_th: "SMAS-X",
    desc_en:
      "Collagen stimulation for firmer skin, using Spanish technology. No pain, no swelling, no incision.",
    desc_th:
      "กระตุ้นคอลลาเจน ผิวแน่นตึงกระชับ ด้วยเครื่องจากประเทศสเปน ไม่เจ็บ ไม่บวม ไม่มีแผล",
    summary_en:
      "Collagen stimulation for firmer skin, using Spanish technology. No pain, no swelling, no incision.",
    summary_th:
      "กระตุ้นคอลลาเจน ผิวแน่นตึงกระชับ ด้วยเครื่องจากประเทศสเปน ไม่เจ็บ ไม่บวม ไม่มีแผล",
  },
  {
    slug: "rhinoplasty",
    parent: "surgery",
    summary_en:
      "A permanent result, shaped to the face rather than to a standard.",
    summary_th: "ผลลัพธ์ถาวร ออกแบบทรงให้เข้ากับใบหน้า ไม่ใช่ทรงสำเร็จรูป",
    detail_th: {
      intro: [
        "การเสริมจมูกด้วยซิลิโคนให้ผลลัพธ์ที่ชัดเจนและอยู่ได้ถาวร เหมาะกับผู้ที่ต้องการปรับโครงสร้างจมูกอย่างแท้จริง ไม่ใช่แค่ปรับรูปทรงชั่วคราว",
        "ศัลยแพทย์จะประเมินโครงหน้า ความหนาของผิว และความสูงของสันจมูกเดิม ก่อนเลือกทรงและขนาดซิลิโคนที่เหมาะสม เพื่อให้จมูกรับกับใบหน้าโดยรวม",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "ผลลัพธ์", value: "ถาวร" },
      ],
      goodFor: [
        "ต้องการผลลัพธ์ที่ชัดเจนและอยู่ได้ถาวร",
        "สันจมูกแบน ต้องการเพิ่มความโด่ง",
        "เคยร้อยไหมแล้วต้องการผลลัพธ์ที่มากกว่า",
      ],
      faq: [
        {
          q: "เสริมจมูกกับร้อยไหม ต่างกันอย่างไร",
          a: "เสริมซิลิโคนให้ผลถาวรและปรับความโด่งได้มากกว่า แต่ต้องผ่าตัดและพักฟื้น ส่วนร้อยไหมไม่ต้องผ่าตัด ไม่ต้องพักฟื้น แต่ผลลัพธ์อยู่ได้เป็นช่วงเวลา แพทย์จะช่วยประเมินว่าแบบไหนเหมาะกับคุณ",
        },
        {
          q: "พักฟื้นนานไหม",
          a: "ขึ้นอยู่กับแต่ละบุคคล แพทย์จะแจ้งระยะเวลาที่ชัดเจนในวันปรึกษา หลังประเมินเคสของคุณแล้ว",
        },
      ],
    },
    detail_en: {
      intro: [
        "Silicone augmentation gives a defined, permanent result. It suits anyone who wants the nose genuinely restructured rather than temporarily reshaped.",
        "Your surgeon assesses the bone structure, skin thickness and existing bridge height before choosing the implant shape and size — so the nose sits with the face rather than on it.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Results", value: "Permanent" },
      ],
      goodFor: [
        "You want a defined result that lasts",
        "A flat bridge you want more height on",
        "You've had thread lifting and want more than it can give",
      ],
      faq: [
        {
          q: "How does this differ from a thread lift?",
          a: "An implant is permanent and can add more height, but it involves surgery and recovery. Thread lifting needs neither, but the result lasts a period rather than indefinitely. Your surgeon will advise which suits you.",
        },
        {
          q: "How long is recovery?",
          a: "It varies by person. Your surgeon will give you a clear timeframe at the consultation, once your case has been assessed.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Rhinoplasty",
    title_th: "เสริมซิลิโคนจมูก",
    desc_en: "Silicone nose augmentation",
    desc_th: "เสริมซิลิโคนจมูก",
  },
  {
    slug: "blepharoplasty",
    parent: "surgery",
    summary_en:
      "Upper and lower eyelid surgery — a defined crease, or under-eye bags removed.",
    summary_th:
      "ผ่าตัดหนังตาบนและล่าง สร้างชั้นตาที่ชัดเจน หรือเก็บถุงไขมันใต้ตา",
    detail_th: {
      intro: [
        "การผ่าตัดเปลือกตาแบ่งได้เป็นสองกลุ่ม คือผู้ที่มีตาชั้นเดียวและต้องการทำตาสองชั้น กับผู้ที่หนังตาเริ่มหย่อนตามวัยจนบังชั้นตาและมีถุงไขมันใต้ตา หลักการผ่าตัดเหมือนกัน ต่างกันที่ปริมาณผิวหนังที่ต้องตัดออก",
        "เอกลักษณ์ของการทำตาที่ NYC Clinic คือชั้นตาที่เรียวยาวเท่ากันตั้งแต่หัวตาถึงหางตา และเทคนิคการเย็บซ่อนแผลของศัลยแพทย์ ทำให้ดูแลแผลง่ายหลังผ่าตัด และลดปัญหาบวมหรืออักเสบ",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "ตัดไหม", value: "5–7 วัน" },
      ],
      goodFor: [
        "ไม่มีชั้นตาชัดเจน หรือชั้นตาสองข้างไม่เท่ากัน",
        "เปลือกตาอูม มีถุงไขมันใต้เปลือกตา",
        "หนังตาหย่อนปิดดวงตา โดยเฉพาะหางตา จนลานสายตาแคบลง",
        "มีถุงไขมันใต้ตาล่างจากพันธุกรรมหรือวัยที่มากขึ้น",
      ],
      faq: [
        {
          q: "ผ่าตัดหนังตาบนกับหนังตาล่าง ต่างกันอย่างไร",
          a: "หนังตาบนคือการกำหนดแนวชั้นตาและตัดผิวหนังกับไขมันส่วนเกินออก ส่วนหนังตาล่างคือการจัดการถุงไขมันใต้ตาและกระชับกล้ามเนื้อรอบตาล่าง เป็นคนละปัญหากัน แพทย์จะประเมินว่าควรทำอย่างไหน",
        },
        {
          q: "แผลหายนานไหม",
          a: "แพทย์จะนัดตัดไหมประมาณ 5–7 วันหลังผ่าตัด หลังตัดไหมยังบวมอยู่ราว 2–4 สัปดาห์ และจะดูเป็นธรรมชาติประมาณ 1 เดือน",
        },
        {
          q: "ต้องเตรียมตัวอย่างไร",
          a: "แจ้งประวัติสุขภาพ โรคประจำตัว และยาที่ใช้อยู่กับแพทย์อย่างละเอียด งดยาและอาหารเสริมบางชนิดก่อนผ่าตัด และควรมีคนสนิทมารับกลับบ้าน แพทย์จะให้รายละเอียดทั้งหมดในวันปรึกษา",
        },
      ],
    },
    detail_en: {
      intro: [
        "Eyelid surgery divides into two groups: people with a single eyelid who want a defined crease, and people whose lids have begun to drop with age, hiding the crease and leaving under-eye bags. The approach is the same; the amount of skin removed differs.",
        "What distinguishes eyelid surgery at NYC Clinic is a crease that runs evenly from the inner to the outer corner, and a hidden-suture technique that makes the wound easier to care for and reduces swelling and inflammation.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Sutures out", value: "5–7 days" },
      ],
      goodFor: [
        "No defined crease, or creases that differ between the eyes",
        "Puffy lids with fat beneath them",
        "Lids drooping over the eye — particularly at the outer corner — narrowing your field of vision",
        "Under-eye bags, whether inherited or age-related",
      ],
      faq: [
        {
          q: "What's the difference between upper and lower eyelid surgery?",
          a: "Upper surgery sets the crease line and removes excess skin and fat. Lower surgery deals with under-eye fat and tightens the muscle beneath the eye. They address different problems — your surgeon will assess which applies.",
        },
        {
          q: "How long does healing take?",
          a: "Sutures come out around 5–7 days. Swelling continues for roughly 2–4 weeks after that, and the result looks natural at about a month.",
        },
        {
          q: "How should I prepare?",
          a: "Give your surgeon a full account of your health, any conditions and any medication you take; some medicines and supplements are stopped beforehand. Arrange for someone to take you home. Full instructions are given at the consultation.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Blepharoplasty",
    title_th: "ตาสองชั้น",
    desc_en: "Double eyelid surgery",
    desc_th: "ตาสองชั้น",
  },
  {
    slug: "liposuction",
    parent: "surgery",
    summary_en:
      "Removes subcutaneous fat from specific areas — shaping, not weight loss.",
    summary_th:
      "กำจัดไขมันใต้ผิวหนังเฉพาะจุด เพื่อรูปร่างที่ได้สัดส่วน ไม่ใช่การลดน้ำหนัก",
    detail_th: {
      intro: [
        "การดูดไขมันคือการกำจัดไขมันส่วนเกินในชั้นไขมันใต้ผิวหนังออกจากร่างกายเฉพาะจุด ทำให้รูปร่างบริเวณนั้นเล็กลงและได้สัดส่วนมากขึ้น เป็นไขมันใต้ผิวหนังเท่านั้น ไม่ใช่ไขมันในช่องท้องหรืออวัยวะภายใน",
        "การดูดไขมันมุ่งไปที่ไขมันที่ไม่ตอบสนองต่อการออกกำลังกายและการควบคุมอาหาร จึงเหมาะกับผู้ที่ร่างกายแข็งแรงและน้ำหนักตัวไม่มากจนเกินไป เพราะไม่ใช่วิธีลดน้ำหนัก แต่เป็นการปรับสัดส่วนให้พอใจในรูปร่างของตัวเองมากขึ้น",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "เป้าหมาย", value: "ปรับสัดส่วน ไม่ใช่ลดน้ำหนัก" },
      ],
      areas: [
        "เหนียง",
        "ต้นแขน",
        "หน้าท้อง",
        "เอว",
        "ต้นขา",
        "สะโพก",
        "ปีกหลัง",
        "ปีกนางฟ้า",
        "นมน้อย",
      ],
      goodFor: [
        "มีไขมันเฉพาะจุดที่ออกกำลังกายและคุมอาหารแล้วไม่ลดลง",
        "ร่างกายแข็งแรง น้ำหนักตัวไม่มากจนเกินไป",
        "ต้องการปรับสัดส่วนเฉพาะบริเวณ ไม่ใช่การลดน้ำหนักทั้งตัว",
      ],
      faq: [
        {
          q: "ดูดไขมันช่วยลดน้ำหนักไหม",
          a: "ไม่ใช่วิธีลดน้ำหนัก เป็นการปรับสัดส่วนเฉพาะจุดที่ไขมันสะสมและไม่ตอบสนองต่อการออกกำลังกาย ผู้ที่เหมาะสมที่สุดคือผู้ที่น้ำหนักตัวอยู่ในเกณฑ์อยู่แล้ว",
        },
        {
          q: "ดูดได้บริเวณไหนบ้าง",
          a: "เหนียง ต้นแขน หน้าท้อง เอว ต้นขา สะโพก ปีกหลัง ปีกนางฟ้า และนมน้อย แพทย์จะประเมินว่าบริเวณใดเหมาะกับคุณในวันปรึกษา",
        },
      ],
    },
    detail_en: {
      intro: [
        "Liposuction removes excess fat from the layer beneath the skin in specific areas, making that part of the body smaller and better proportioned. It targets subcutaneous fat only — not fat inside the abdomen or around the organs.",
        "It addresses fat that doesn't respond to exercise or diet, so it suits people who are in good health and not significantly overweight. This is not a weight-loss method; it is a way to be happier with your proportions.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Purpose", value: "Contouring, not weight loss" },
      ],
      areas: [
        "Under the chin",
        "Upper arms",
        "Abdomen",
        "Waist",
        "Thighs",
        "Hips",
        "Back",
        "Bra line",
        "Chest",
      ],
      goodFor: [
        "Localised fat that hasn't shifted with exercise or diet",
        "You're in good health and not significantly overweight",
        "You want to reshape a specific area rather than lose weight overall",
      ],
      faq: [
        {
          q: "Will liposuction help me lose weight?",
          a: "No — it reshapes specific areas where fat has settled and won't respond to exercise. It suits people whose weight is already in a healthy range.",
        },
        {
          q: "Which areas can be treated?",
          a: "Under the chin, upper arms, abdomen, waist, thighs, hips, back, bra line and chest. Your surgeon will assess which apply to you at the consultation.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Liposuction",
    title_th: "ดูดไขมัน",
    desc_en: "Body contouring by liposuction",
    desc_th: "ดูดไขมัน",
  },
  {
    slug: "chin-augmentation",
    parent: "surgery",
    summary_en:
      "A silicone implant that lengthens the chin — the fastest route to a slimmer face.",
    summary_th:
      "เสริมซิลิโคนคาง ต่อคางให้ยาวขึ้น ใบหน้าเรียวขึ้นโดยไม่ต้องตัดกราม",
    detail_th: {
      intro: [
        "คางเปลี่ยน หน้าก็เปลี่ยน โบท็อกซ์หรือร้อยไหมช่วยเรื่องรูปหน้าได้ แต่ถ้าคางไม่รับกับใบหน้า แก้ม และกราม ก็ยากที่ใบหน้าจะเรียวได้อย่างที่ต้องการ การเสริมคางแก้ปัญหาคางสั้น คางตัด และคางผิดรูปโดยตรง",
        "ศัลยแพทย์จะเลือกความยาวและความแหลมให้เหมาะกับแต่ละบุคคล ซิลิโคนที่ใช้ต้องรับกับคางและกรามเดิม หลังทำคางจะยาวขึ้นและยื่นไปด้านหน้า ใบหน้าจึงเรียวขึ้นโดยไม่ต้องตัดกราม",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "ผลลัพธ์", value: "อยู่ได้นานกว่าการฉีดฟิลเลอร์" },
      ],
      goodFor: [
        "คางสั้น คางตัด หรือคางผิดรูป",
        "ใบหน้าดูไม่เรียวเพราะคางไม่รับกับกราม",
        "เคยฉีดฟิลเลอร์เสริมคางแล้วต้องการผลลัพธ์ที่อยู่ได้นานกว่า",
      ],
      faq: [
        {
          q: "เสริมคางกับฉีดฟิลเลอร์ ต่างกันอย่างไร",
          a: "การเสริมซิลิโคนให้ผลลัพธ์ที่อยู่ได้นานกว่าการฉีดฟิลเลอร์ และปรับความยาวคางได้มากกว่า แต่เป็นการผ่าตัดและต้องพักฟื้น แพทย์จะช่วยประเมินว่าแบบไหนเหมาะกับคุณ",
        },
        {
          q: "ต้องตัดกรามด้วยไหม",
          a: "ไม่จำเป็น เมื่อคางยาวขึ้นและยื่นไปด้านหน้า มิติของใบหน้าโดยรวมจะเปลี่ยน ทำให้หน้าดูเรียวขึ้นได้โดยไม่ต้องตัดกราม",
        },
      ],
    },
    detail_en: {
      intro: [
        "Change the chin and the face changes. Botox and thread lifting both help with face shape, but if the chin doesn't sit with the cheeks and jaw, a slim profile is hard to achieve. Chin augmentation addresses a short, flat or misshapen chin directly.",
        "Your surgeon chooses the length and point to suit you, and the implant has to work with your existing chin and jaw. Afterwards the chin is longer and projects further forward, so the face reads slimmer without the jaw being cut.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Results", value: "Longer-lasting than filler" },
      ],
      goodFor: [
        "A short, flat or misshapen chin",
        "A face that doesn't read as slim because the chin doesn't match the jaw",
        "You've had chin filler and want something that lasts longer",
      ],
      faq: [
        {
          q: "How does this compare to chin filler?",
          a: "An implant lasts considerably longer and can add more length, but it is surgery and involves recovery. Your surgeon will advise which suits you.",
        },
        {
          q: "Do I need jaw reduction as well?",
          a: "Usually not. Once the chin is longer and projects forward, the proportions of the whole face change — so it reads slimmer without the jaw being cut.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Chin Augmentation",
    title_th: "เสริมซิลิโคนคาง",
    desc_en: "Silicone chin augmentation",
    desc_th: "เสริมซิลิโคนคาง",
  },
  {
    slug: "lip-surgery",
    parent: "surgery",
    summary_en:
      "Reshapes a full lip into a defined line. Considered, because it can't be undone.",
    summary_th:
      "ตกแต่งริมฝีปากให้ได้รูป เรียวเป็นทรงกระจับ ตัดสินใจอย่างรอบคอบ เพราะแก้คืนไม่ได้",
    detail_th: {
      intro: [
        "ศัลยกรรมริมฝีปาก หรือที่เรียกกันว่าทำปากบางหรือปากกระจับ คือการตัดเนื้ออ่อนด้านในบางส่วนออก เพื่อให้ริมฝีปากได้รูปขึ้นและเรียวเป็นทรงที่ต้องการ",
        "ปากบางกับปากกระจับใช้เทคนิคการผ่าตัดแบบเดียวกัน ต่างกันที่ตำแหน่งของเนื้อเยื่อที่ตัดออกเล็กน้อย และที่สำคัญคือวิธีการเย็บ ซึ่งเป็นตัวกำหนดรูปทรงของแต่ละแบบ",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "พักฟื้น", value: "นานกว่าหัตถการอื่น" },
      ],
      goodFor: [
        "ริมฝีปากหนาหรืออวบเกินกว่าที่ต้องการ",
        "ริมฝีปากไม่ได้รูป ต้องการให้เรียวเป็นทรง",
      ],
      faq: [
        {
          q: "แก้กลับได้ไหมถ้าไม่พอใจ",
          a: "แก้ไขภายหลังทำได้ยาก เพราะเนื้อเยื่อบางส่วนถูกตัดออกไปแล้วและไม่สามารถนำกลับมาได้ จึงควรปรึกษาและตัดสินใจอย่างรอบคอบกับศัลยแพทย์ก่อน",
        },
        {
          q: "พักฟื้นนานไหม",
          a: "นานกว่าศัลยกรรมอื่นหลายอย่าง เพราะริมฝีปากเป็นบริเวณที่ต้องขยับตลอดเวลาตามธรรมชาติ และเป็นการผ่าตัดในเนื้อเยื่ออ่อน การดูแลแผลตามคำแนะนำจะช่วยให้แผลเข้าที่เร็วขึ้น",
        },
        {
          q: "จะมีรอยแผลเป็นไหม",
          a: "ขึ้นอยู่กับความปราณีตของการตัดและการเย็บ จึงควรทำกับศัลยแพทย์ที่มีความชำนาญโดยตรง",
        },
      ],
    },
    detail_en: {
      intro: [
        "Lip surgery removes a portion of the soft tissue inside the lip so it takes a more defined shape.",
        "The thinner and the classic curved shape use the same surgical technique — what differs is slightly where tissue is taken from, and above all how it is sutured, which is what determines the final shape.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Recovery", value: "Longer than most procedures" },
      ],
      goodFor: [
        "Lips fuller than you'd like",
        "Lips you'd like brought into a more defined shape",
      ],
      faq: [
        {
          q: "Can it be reversed if I'm unhappy?",
          a: "Not easily. Tissue that has been removed cannot be put back, so this is worth discussing carefully with your surgeon before you decide.",
        },
        {
          q: "How long is recovery?",
          a: "Longer than for many procedures. The lips move constantly by nature, and this is surgery in soft tissue. Following the aftercare instructions closely is what shortens it.",
        },
        {
          q: "Will there be scarring?",
          a: "It depends on the precision of both the excision and the suturing, which is why it should be done by a surgeon experienced in it specifically.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Lip Surgery",
    title_th: "ปากกระจับ",
    desc_en: "Lip reshaping",
    desc_th: "ปากกระจับ",
  },
  {
    slug: "fat-transfer",
    parent: "surgery",
    summary_en:
      "Your own fat, placed in fine layers — fills hollows and softens the face.",
    summary_th:
      "ใช้ไขมันตัวเอง วางเป็นชั้นละเอียด เติมเต็มร่องลึก ใบหน้าดูละมุนอ่อนเยาว์",
    detail_th: {
      intro: [
        "การฉีดไขมันหน้าคือการนำไขมันของตัวเองจากต้นขา หน้าท้อง หรือสะโพก มาคัดเซลล์ที่แข็งแรง แล้วเติมกลับเข้าไปในใบหน้า ช่วยแก้ปัญหาหน้าตอบ แก้มตอบ และใบหน้าที่ดูโทรมจากไขมันที่หายไปตามวัย",
        "เทคนิคของ NYC Clinic คือการปั่นคัดเซลล์ไขมันจนเป็นโมเลกุลเล็ก แล้ววางไขมันเป็นจุดเล็ก ๆ กระจายในหลายระดับชั้นผิว ไม่ฉีดอัดแน่น จึงไม่เป็นก้อนแข็ง ผิวสัมผัสนิ่มและยืดหยุ่นเหมือนผิวปกติ",
      ],
      facts: [
        { label: "ประเภท", value: "ศัลยกรรม" },
        { label: "บวม", value: "3–5 วัน" },
        { label: "เขียวช้ำ", value: "7–14 วัน" },
      ],
      areas: [
        "หน้าผาก + ขมับ",
        "เปลือกตา + เบ้าตา",
        "ใต้ตา",
        "ยกหน้าแก้ม",
        "แก้มตอบ",
        "ร่องแก้ม",
        "ร่องน้ำหมาก",
        "คาง",
      ],
      goodFor: [
        "ใบหน้าตอบ แก้มตอบ ทั้งจากธรรมชาติหรือจากการจัดฟัน",
        "อายุมากขึ้นจนไขมันบนใบหน้าหายไป ต้องการเติมเต็มให้ดูเด็กลง",
        "โครงหน้าใหญ่ โหนกแก้มหรือกรามเด่น ต้องการให้ใบหน้าดูละมุนลง",
        "อยากเติมเต็มใบหน้า แต่ไม่ต้องการสารเติมเต็มสังเคราะห์",
      ],
      faq: [
        {
          q: "ต่างจากการฉีดฟิลเลอร์อย่างไร",
          a: "ใช้ไขมันของตัวเองแทนสารสังเคราะห์ เติมได้หลายบริเวณในครั้งเดียว และผลลัพธ์อยู่ได้นานกว่า แต่เป็นการผ่าตัดเล็กที่ต้องดูดไขมันจากร่างกายก่อน และมีช่วงบวมช้ำ",
        },
        {
          q: "ต้องดูแลตัวเองอย่างไรหลังทำ",
          a: "สามเดือนแรกสำคัญที่สุดต่อการติดของไขมัน แพทย์จะแนะนำให้งดออกกำลังกาย งดบุหรี่และแอลกอฮอล์ เลี่ยงความร้อนโดยตรงที่ใบหน้า และไม่ลดน้ำหนักในช่วงนี้ รายละเอียดทั้งหมดแพทย์จะให้ในวันปรึกษา",
        },
        {
          q: "บวมนานไหม",
          a: "อาการบวมประมาณ 3–5 วันแล้วค่อย ๆ ดีขึ้น ส่วนรอยเขียวช้ำขึ้นอยู่กับแต่ละบุคคล ประมาณ 7–14 วัน",
        },
      ],
    },
    detail_en: {
      intro: [
        "Facial fat transfer takes your own fat — from the thigh, abdomen or hip — selects the viable cells, and places it back into the face. It addresses hollow cheeks and the tired look that comes as facial fat is lost with age.",
        "The technique here separates the fat into fine cells and places it in small deposits across several skin layers rather than packing it in. That's what keeps it soft and flexible to the touch rather than firm or lumpy.",
      ],
      facts: [
        { label: "Type", value: "Surgical" },
        { label: "Swelling", value: "3–5 days" },
        { label: "Bruising", value: "7–14 days" },
      ],
      areas: [
        "Forehead + temples",
        "Upper eyelid + socket",
        "Under-eye",
        "Mid-face",
        "Hollow cheeks",
        "Nasolabial folds",
        "Marionette lines",
        "Chin",
      ],
      goodFor: [
        "Hollow cheeks, whether natural or after orthodontic treatment",
        "Facial fat lost with age, leaving the face looking drawn",
        "A strong bone structure — prominent cheekbones or jaw — you'd like softened",
        "You want volume restored but would rather not use a synthetic filler",
      ],
      faq: [
        {
          q: "How does this differ from filler?",
          a: "It uses your own fat rather than a synthetic gel, treats several areas in one session, and lasts considerably longer. But it is minor surgery — fat has to be harvested first — and there is a swelling and bruising period.",
        },
        {
          q: "What does aftercare involve?",
          a: "The first three months matter most for how much fat survives. Your surgeon will advise avoiding exercise, smoking, alcohol and direct heat on the face, and not dieting during that period. Full instructions come at the consultation.",
        },
        {
          q: "How long does swelling last?",
          a: "Around 3–5 days, easing gradually. Bruising varies by person — roughly 7–14 days.",
        },
      ],
    },
    image: "/images/services/cat-surgery.png",
    title_en: "Facial Fat Transfer",
    title_th: "ฉีดไขมันหน้าเด็ก",
    desc_en: "Facial fat grafting",
    desc_th: "ฉีดไขมันหน้าเด็ก",
  },
  {
    slug: "sculptra",
    parent: "skin-treatments",
    summary_en:
      "A collagen biostimulator — rebuilds skin structure from within, over two years.",
    summary_th:
      "สารกระตุ้นคอลลาเจน ฟื้นฟูโครงสร้างผิวจากภายใน ผลลัพธ์นานถึง 2 ปี",
    detail_th: {
      intro: [
        "Sculptra คืออนุภาคของสาร Poly-L-Lactic acid (PLLA) สารกระตุ้นการสร้างคอลลาเจนตามธรรมชาติตัวแรกของโลก ไม่ใช่การเติมเต็มโดยตรง แต่เป็นการกระตุ้นให้ผิวสร้างคอลลาเจนขึ้นมาเอง ทดแทนส่วนที่สูญเสียไปตามอายุ",
        "PLLA เป็นสารเดียวกับที่ใช้ผลิตไหมละลายทางการแพทย์ ย่อยสลายได้ในร่างกาย ผ่านการรับรองจาก US FDA และ อย.ไทย และใช้ทางการแพทย์มาตั้งแต่ปี 1999",
      ],
      facts: [
        { label: "ประเภท", value: "กระตุ้นคอลลาเจน" },
        { label: "ผลลัพธ์", value: "นานถึง 2 ปี" },
      ],
      areas: [
        "แก้ม",
        "หน้าแก้ม",
        "ร่องแก้ม",
        "ร่องน้ำหมาก",
        "แนวกราม",
        "ขมับ",
        "ใต้ตา",
        "คอ",
      ],
      goodFor: [
        "ผิวหย่อนคล้อย ไม่กระชับ ขาดความยืดหยุ่น",
        "ริ้วรอยที่เห็นได้ชัดจากอายุที่มากขึ้น",
        "ต้องการฟื้นฟูผิวจากโครงสร้างภายใน ไม่ใช่แค่ผิวชั้นบน",
        "รูขุมขนกว้าง ผิวไม่กระชับ",
        "ต้องการผลลัพธ์ที่อยู่ได้นาน ไม่ต้องทำบ่อย",
      ],
      faq: [
        {
          q: "ต่างจากฟิลเลอร์อย่างไร",
          a: "ฟิลเลอร์คือการเติมเต็มโดยตรง เห็นผลทันที ส่วน Sculptra คือการกระตุ้นให้ผิวสร้างคอลลาเจนขึ้นมาเอง จึงค่อย ๆ เห็นผลและอยู่ได้นานกว่า",
        },
        {
          q: "ต้องฉีดกี่ครั้ง",
          a: "ขึ้นอยู่กับสภาพผิวและปริมาณคอลลาเจนใต้ผิวของแต่ละคน โดยทั่วไปฉีดซ้ำได้ทุก 1–2 เดือน แพทย์จะวางแผนคอร์สให้หลังประเมินผิวของคุณ",
        },
        {
          q: "หลังฉีดต้องดูแลอย่างไร",
          a: "อาจมีบวมเล็กน้อยและรู้สึกตึงจากยาชาที่ผสมอยู่ ซึ่งจะค่อย ๆ หายไปเอง ใช้ชีวิตประจำวันได้ตามปกติ และแพทย์จะแนะนำวิธีนวดหลังฉีดเพื่อให้ตัวยากระจายได้ทั่ว",
        },
      ],
    },
    detail_en: {
      intro: [
        "Sculptra is poly-L-lactic acid (PLLA) — the original collagen biostimulator. It isn't a filler: rather than adding volume directly, it prompts the skin to build its own collagen to replace what age has taken.",
        "PLLA is the same material used to make absorbable surgical sutures. It breaks down naturally in the body, is approved by the US FDA and Thai FDA, and has been in medical use since 1999.",
      ],
      facts: [
        { label: "Type", value: "Collagen stimulator" },
        { label: "Results last", value: "Up to 2 years" },
      ],
      areas: [
        "Cheeks",
        "Mid-face",
        "Nasolabial folds",
        "Marionette lines",
        "Jawline",
        "Temples",
        "Under-eye",
        "Neck",
      ],
      goodFor: [
        "Skin that has begun to sag and lost its elasticity",
        "Visible lines that have come with age",
        "You want to rebuild skin structure, not just treat the surface",
        "Open pores and skin that lacks firmness",
        "You want a long-lasting result rather than frequent sessions",
      ],
      faq: [
        {
          q: "How does it differ from filler?",
          a: "Filler adds volume directly and you see it immediately. Sculptra prompts your skin to make its own collagen, so it appears gradually and lasts considerably longer.",
        },
        {
          q: "How many sessions will I need?",
          a: "It depends on your skin and how much collagen you still have. Sessions are generally repeated every one to two months; your doctor will plan a course after assessing your skin.",
        },
        {
          q: "What happens afterwards?",
          a: "There may be mild swelling and a tight feeling from the anaesthetic mixed into it, which settles on its own. You can carry on as normal, and your doctor will show you how to massage the area so it spreads evenly.",
        },
      ],
    },
    image: "/images/services/cat-skin.png",
    title_en: "Collagen Biostimulator",
    title_th: "Sculptra กระตุ้นคอลลาเจน",
    desc_en:
      "Stimulates collagen for firm, smooth, resilient and youthful skin",
    desc_th:
      "กระตุ้นการสร้างคอลลาเจน ผิวตึงกระชับ เรียบเนียน ขาวใส ผิวแข็งแรง อ่อนเยาว์",
  },
  {
    slug: "meso-glass-skin",
    parent: "skin-treatments",
    summary_en:
      "Mesotherapy for clear, hydrated skin — the programme is chosen to fit the problem.",
    summary_th:
      "เมโสฟื้นฟูผิว ผิวเนียนใส ชุ่มชื้น เลือกโปรแกรมตามปัญหาผิวของแต่ละคน",
    detail_th: {
      intro: [
        "เมโสผิวแก้วคือการฟื้นฟูผิวด้วยสารบำรุงที่ส่งเข้าสู่ชั้นผิวโดยตรง ช่วยลดเลือนริ้วรอย รอยดำ ฝ้ากระ รอยแผลเป็นหลุมสิว รอยแดงรอยดำจากสิว พร้อมกระชับรูขุมขนและเพิ่มความชุ่มชื้น",
        "มีหลายโปรแกรมให้เลือก แพทย์จะประเมินสภาพผิวและปัญหาของคุณก่อน แล้วจึงเลือกสูตรที่เหมาะสมที่สุด",
      ],
      areas: [
        "Meso Chanel",
        "Rejuran",
        "Meso Celeb",
        "Meso P-Cell",
        "Meso Hayyan",
        "ASCE Exosome",
      ],
      goodFor: [
        "ผิวหมองคล้า ขาดความชุ่มชื้น",
        "รอยดำ ฝ้ากระ รอยแดงรอยดำจากสิว",
        "รอยแผลเป็นหลุมสิว",
        "รูขุมขนกว้าง",
      ],
      faq: [
        {
          q: "มีโปรแกรมอะไรบ้าง",
          a: "Meso Chanel, Rejuran, Meso Celeb, Meso P-Cell, Meso Hayyan และ ASCE Exosome แต่ละสูตรเหมาะกับปัญหาผิวที่ต่างกัน แพทย์จะแนะนำหลังประเมินผิวของคุณ",
        },
      ],
    },
    detail_en: {
      intro: [
        "Glass-skin mesotherapy delivers active ingredients directly into the skin layers — softening lines, dark marks, melasma, acne scarring and post-acne redness, while tightening pores and restoring moisture.",
        "Several programmes are available. Your doctor assesses your skin and its specific problems first, then chooses the formulation that fits.",
      ],
      areas: [
        "Meso Chanel",
        "Rejuran",
        "Meso Celeb",
        "Meso P-Cell",
        "Meso Hayyan",
        "ASCE Exosome",
      ],
      goodFor: [
        "Dull skin that has lost its moisture",
        "Dark marks, melasma, post-acne redness and pigmentation",
        "Acne scarring",
        "Open pores",
      ],
      faq: [
        {
          q: "Which programmes are available?",
          a: "Meso Chanel, Rejuran, Meso Celeb, Meso P-Cell, Meso Hayyan and ASCE Exosome. Each suits different skin problems — your doctor will recommend one after assessing your skin.",
        },
      ],
    },
    image: "/images/services/cat-skin.png",
    title_en: "Meso Glass Skin",
    title_th: "เมโสผิวแก้ว",
    desc_en:
      "Clear, hydrated skin — reduces dark marks, melasma, acne scars and pore size",
    desc_th: "ผิวเนียนใส ชุ่มชื่น ฉ่ำวาว ลดรอยดำ ฝ้ากระ รอยสิว กระชับรูขุมขน",
  },
  {
    slug: "prp",
    parent: "skin-treatments",
    summary_en:
      "Growth factors concentrated from your own blood, returned to the skin.",
    summary_th:
      "สกัด Growth Factor เข้มข้นจากเลือดของตัวเอง แล้วฉีดกลับคืนสู่ผิว",
    detail_th: {
      intro: [
        "PRP (Platelet-Rich Plasma) คือการนำ Growth Factor เข้มข้นจากเกล็ดเลือดของเราเอง มาฉีดกลับเข้าไปในบริเวณที่ต้องการ เพื่อกระตุ้นการสร้างคอลลาเจนและเสริมให้ผิวแข็งแรงขึ้น",
        "เกล็ดเลือดมี Growth Factor หลายชนิด เช่น FGF, PDGF, TGF-β, EGF, VEGF และ IGF ซึ่งกระตุ้นการสร้างเนื้อเยื่อใหม่ กระตุ้น Fibroblast ที่สร้างคอลลาเจน และช่วยให้ผิวสมานตัวได้เร็วขึ้น",
      ],
      facts: [
        { label: "ที่มา", value: "เลือดของตัวเอง" },
        { label: "เห็นผล", value: "ประมาณ 1 สัปดาห์" },
        { label: "คอร์ส", value: "ทั่วไป 3–9 ครั้ง" },
      ],
      goodFor: [
        "ผิวหมองคล้า ต้องการให้เนียนกระจ่างใสขึ้น",
        "ริ้วรอย ผิวขาดความกระชับ",
        "รอยดำ ฝ้ากระ",
        "รอยแผลเป็นหลุมสิว",
        "รูขุมขนกว้าง",
      ],
      faq: [
        {
          q: "PRP ทำงานอย่างไร",
          a: "Growth Factor จากเกล็ดเลือดจะกระตุ้นการแบ่งเซลล์ใหม่ กระตุ้นการสร้างคอลลาเจนในชั้นผิว และกระตุ้นการสร้างหลอดเลือดใหม่ไปเลี้ยงเซลล์ให้ดีขึ้น",
        },
        {
          q: "ต้องทำกี่ครั้ง",
          a: "โดยทั่วไปประมาณ 3–9 ครั้ง ขึ้นอยู่กับปัญหาผิวของแต่ละท่าน และแนะนำให้ทำต่อเนื่องทุก 2–4 สัปดาห์",
        },
        {
          q: "ปลอดภัยไหม",
          a: "ใช้เลือดของตัวเอง จึงไม่มีสารแปลกปลอมจากภายนอก ทำภายใต้เทคนิคปลอดเชื้อของคลินิก",
        },
      ],
    },
    detail_en: {
      intro: [
        "PRP — platelet-rich plasma — concentrates the growth factors from your own platelets and returns them to the area being treated, prompting collagen production and strengthening the skin.",
        "Platelets carry growth factors including FGF, PDGF, TGF-β, EGF, VEGF and IGF. These stimulate new tissue, activate the fibroblasts that make collagen, and help skin repair itself faster.",
      ],
      facts: [
        { label: "Source", value: "Your own blood" },
        { label: "Visible", value: "About 1 week" },
        { label: "Course", value: "Typically 3–9 sessions" },
      ],
      goodFor: [
        "Dull skin you'd like clearer and more even",
        "Lines and skin that has lost firmness",
        "Dark marks and melasma",
        "Acne scarring",
        "Open pores",
      ],
      faq: [
        {
          q: "How does PRP work?",
          a: "The growth factors prompt new cell division, stimulate collagen in the skin layers, and encourage new blood vessels to better supply the cells.",
        },
        {
          q: "How many sessions?",
          a: "Typically three to nine, depending on what you're treating, spaced every two to four weeks.",
        },
        {
          q: "Is it safe?",
          a: "It uses your own blood, so nothing foreign is introduced, and it's carried out under the clinic's sterile protocol.",
        },
      ],
    },
    image: "/images/services/cat-skin.png",
    title_en: "PRP Vita Cell",
    title_th: "PRP VITA CELL",
    desc_en: "For younger, brighter skin — reduces melasma and dark marks",
    desc_th:
      "เพื่อความดูอ่อนเยาว์ ช่วยให้ผิวเนียนกระจ่างใส ลดรอยฝ้ากระ ลดรอยดำ",
  },
  {
    slug: "placenta-gf",
    parent: "skin-treatments",
    summary_en: "Placenta-derived peptides and growth factors, for tired skin.",
    summary_th: "เปปไทด์และ Growth Factor สกัดจากรก สำหรับผิวที่ร่วงโรย",
    detail_th: {
      intro: [
        "Placenta คือสารสกัดจากรก ซึ่งอุดมไปด้วยกรดอะมิโน เปปไทด์ วิตามิน และ Growth Factor หลายชนิด ทางการแพทย์จึงนำมาสกัดเพื่อใช้ฟื้นฟูเซลล์ผิว",
        "สารสกัดจากรกกระตุ้นการสร้าง FGF และ EGF ซึ่งทำให้เซลล์ในชั้นหนังแท้ผลิตคอลลาเจน อิลาสติน และกรดไฮยาลูโรนิคเพิ่มขึ้น ช่วยฟื้นฟูผิวที่เสียหายให้กลับมาดูสดใสและชุ่มชื้น",
      ],
      goodFor: [
        "ผิวร่วงโรย ขาดความชุ่มชื้น",
        "ผิวโทรมจากการพักผ่อนไม่เพียงพอหรือความเครียดสะสม",
        "ริ้วรอยเล็ก ๆ รอบดวงตาและรอบปาก",
        "ผิวเสื่อมสภาพจากแสงแดดและมลภาวะ",
      ],
      faq: [
        {
          q: "Placenta คืออะไร",
          a: "สารสกัดจากรก ประกอบด้วยกรดอะมิโน เปปไทด์ และ Growth Factor ที่ร่างกายสร้างได้น้อยลงเมื่ออายุมากขึ้น",
        },
        {
          q: "เหมาะกับใคร",
          a: "ผู้ที่ผิวดูโทรม ขาดความชุ่มชื้น หรือพักผ่อนไม่เพียงพอจนผิวไม่สดใส ควรให้แพทย์ประเมินก่อนว่าเหมาะสมหรือไม่",
        },
      ],
    },
    detail_en: {
      intro: [
        "Placenta extract is rich in amino acids, peptides, vitamins and growth factors, and is used in aesthetic medicine to help skin cells recover.",
        "It prompts FGF and EGF production, which in turn leads cells in the dermis to make more collagen, elastin and hyaluronic acid — helping tired skin look brighter and better hydrated.",
      ],
      goodFor: [
        "Tired skin that has lost its moisture",
        "Dullness from poor sleep or accumulated stress",
        "Fine lines around the eyes and mouth",
        "Skin showing the effects of sun and pollution",
      ],
      faq: [
        {
          q: "What is it?",
          a: "An extract from placenta, containing amino acids, peptides and growth factors — substances the body produces less of with age.",
        },
        {
          q: "Who is it for?",
          a: "People whose skin looks tired, dry or dull. Whether it suits you is assessed by a doctor first.",
        },
      ],
    },
    image: "/images/services/cat-skin.png",
    title_en: "Placenta GF",
    title_th: "Placenta GF",
    desc_en: "Restores tired skin to a quick, healthy glow",
    desc_th: "ช่วยฟื้นฟูผิวที่ร่วงโรย ให้กลับมาเปล่งปลั่งสดใสได้อย่างรวดเร็ว",
  },
  {
    slug: "vitamin-drip",
    parent: "skin-treatments",
    image: "/images/services/cat-skin.png",
    title_en: "Vitamin Drip",
    title_th: "วิตามินดริป",
    desc_en: "Vitamin therapy for immunity, antioxidants and clearer skin",
    desc_th: "ฉีดวิตามิน เพิ่มภูมิคุ้มกัน ต้านอนุมูลอิสระ ผิวเนียนใส",
    summary_en: "Vitamin therapy for immunity, antioxidants and clearer skin",
    summary_th: "ฉีดวิตามิน เพิ่มภูมิคุ้มกัน ต้านอนุมูลอิสระ ผิวเนียนใส",
  },
  {
    slug: "botox",
    parent: "skin-treatments",
    image: "/images/services/cat-skin.png",
    title_en: "Botox",
    title_th: "สารลดริ้วรอย หน้าเรียว",
    desc_en: "Softens lines and slims the jaw and calf muscles",
    desc_th: "ช่วยลดริ้วรอย ลดขนาดกล้ามเนื้อกราม ลดขนาดกล้ามเนื้อน่อง",
    summary_en: "Softens lines and slims the jaw and calf muscles",
    summary_th: "ช่วยลดริ้วรอย ลดขนาดกล้ามเนื้อกราม ลดขนาดกล้ามเนื้อน่อง",
  },
];

function toCard(item: (typeof DATA)[number], isTH: boolean): ServiceCard {
  return {
    slug: item.slug,
    image: item.image,
    title: isTH ? item.title_th : item.title_en,
    subtitle: isTH ? item.title_en : item.title_th,
    desc: isTH ? item.desc_th : item.desc_en,
    summary: isTH ? item.summary_th : item.summary_en,
    signature: "signature" in item ? item.signature : undefined,
    parent: "parent" in item ? item.parent : undefined,
    detail: isTH
      ? "detail_th" in item
        ? item.detail_th
        : undefined
      : "detail_en" in item
        ? item.detail_en
        : undefined,
  };
}

/** Top-level services only, each with its children resolved. */
export async function getServices(locale: string): Promise<ServiceCard[]> {
  const isTH = locale === "th";
  const all = DATA.map((item) => toCard(item, isTH));
  return all
    .filter((s) => !s.parent)
    .map((s) => ({
      ...s,
      children: all.filter((c) => c.parent === s.slug),
    }));
}

/** One service by slug — parent or child. Children of a parent are resolved. */
export async function getService(
  locale: string,
  slug: string,
): Promise<ServiceCard | null> {
  const isTH = locale === "th";
  const raw = DATA.find((s) => s.slug === slug);
  if (!raw) return null;
  const card = toCard(raw, isTH);
  if (card.parent) return card;
  return {
    ...card,
    children: DATA.filter((c) => "parent" in c && c.parent === slug).map((c) =>
      toCard(c, isTH),
    ),
  };
}

/** The parent of a child service, for breadcrumbs and back-links. */
export async function getParentService(
  locale: string,
  parentSlug: string,
): Promise<ServiceCard | null> {
  const isTH = locale === "th";
  const raw = DATA.find((s) => s.slug === parentSlug);
  return raw ? toCard(raw, isTH) : null;
}

/** Every slug — parents AND children — for generateStaticParams. */
export function getServiceSlugs(): string[] {
  return DATA.map((s) => s.slug);
}
