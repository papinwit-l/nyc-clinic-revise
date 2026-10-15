import { CLINIC, LINE_ID, PHONE } from "@/lib/site";

/**
 * Website terms of use (TH + EN), drafted Oct 2026.
 *
 * ⚠ DRAFT — NOT LEGAL ADVICE. Written by Claude from how the site and clinic
 * work (information site, no online booking or payment; appointments and
 * prices handled over LINE and phone; before/after photos and promotions
 * shown on the site). The clinic and its legal adviser must review it before
 * it goes live — in particular the liability section and anything touching
 * Thai rules on medical-facility advertising.
 *
 * Items in [square brackets] are facts only the clinic can supply:
 *   - the legal entity that operates NYC Clinic
 *   - the medical facility licence number (and advertising approval number,
 *     if the clinic's ads require one)
 *   - a contact email
 *
 * Contact details come from lib/site.ts.
 */

const P = (s: string) => `<em>[${s}]</em>`;

export function termsHtml(locale: string, privacyHref: string): string {
  return locale === "th" ? th(privacyHref) : en(privacyHref);
}

function th(privacyHref: string): string {
  return `
<p>ข้อกำหนดนี้ใช้กับการเข้าชมและใช้งานเว็บไซต์ของ ${CLINIC.name} (“คลินิก” หรือ “เรา”) ซึ่งดำเนินกิจการโดย ${P("ชื่อนิติบุคคลผู้ดำเนินกิจการ")} การเข้าใช้งานเว็บไซต์นี้ถือว่าคุณได้อ่านและยอมรับข้อกำหนดนี้แล้ว หากคุณไม่ยอมรับ กรุณางดใช้งานเว็บไซต์</p>

<h2>1. เกี่ยวกับคลินิกและเว็บไซต์</h2>
<p>${CLINIC.name} เป็นสถานพยาบาลที่ได้รับอนุญาต เลขที่ใบอนุญาตประกอบกิจการสถานพยาบาล ${P("เลขที่ใบอนุญาต")} ตั้งอยู่ที่ ${CLINIC.address.th}</p>
<p>เว็บไซต์นี้มีไว้เพื่อให้ข้อมูลเกี่ยวกับคลินิก ทีมแพทย์ บริการ และช่องทางการติดต่อ เว็บไซต์ไม่มีระบบนัดหมายหรือชำระเงินออนไลน์ การนัดหมายทำผ่าน LINE หรือโทรศัพท์ และจะมีผลเมื่อเจ้าหน้าที่ของคลินิกยืนยันแล้วเท่านั้น</p>

<h2>2. ข้อมูลบนเว็บไซต์ไม่ใช่คำแนะนำทางการแพทย์</h2>
<p>บทความ คำถามที่พบบ่อย และเนื้อหาอื่นบนเว็บไซต์เป็นข้อมูลทั่วไปเพื่อประกอบการตัดสินใจ ไม่ใช่การวินิจฉัย การรักษา หรือคำแนะนำทางการแพทย์สำหรับบุคคลใดบุคคลหนึ่ง ความเหมาะสมของหัตถการขึ้นอยู่กับการประเมินโดยแพทย์เป็นรายบุคคล กรุณาปรึกษาแพทย์ก่อนตัดสินใจเข้ารับการรักษา</p>

<h2>3. ผลลัพธ์ของการรักษา</h2>
<p>ผลลัพธ์ของหัตถการแตกต่างกันในแต่ละบุคคล ขึ้นอยู่กับโครงสร้างใบหน้า สภาพผิว สุขภาพ และการดูแลตัวเองหลังการรักษา ภาพก่อนและหลังการรักษาบนเว็บไซต์เป็นผลลัพธ์ของผู้รับบริการจริงที่ให้ความยินยอมในการเผยแพร่ แต่ไม่ได้เป็นการรับประกันว่าผู้รับบริการรายอื่นจะได้ผลลัพธ์เช่นเดียวกัน ทุกหัตถการมีความเสี่ยงและผลข้างเคียงที่อาจเกิดขึ้น ซึ่งแพทย์จะอธิบายให้ทราบก่อนการรักษา</p>

<h2>4. ราคาและโปรโมชัน</h2>
<ul>
<li>ราคาและรายละเอียดบริการอาจเปลี่ยนแปลงได้ ราคาที่ใช้จริงคือราคาที่คลินิกยืนยันกับคุณก่อนเข้ารับบริการ</li>
<li>โปรโมชันมีผลเฉพาะในช่วงเวลาที่ระบุ และเป็นไปตามเงื่อนไขของแต่ละโปรโมชัน</li>
<li>หากรายละเอียดบนเว็บไซต์คลาดเคลื่อนจากที่คลินิกยืนยัน ให้ถือตามที่คลินิกยืนยันเป็นหลัก</li>
</ul>

<h2>5. ทรัพย์สินทางปัญญา</h2>
<p>เนื้อหาบนเว็บไซต์ทั้งหมด รวมถึงข้อความ ภาพถ่าย ภาพก่อนและหลังการรักษา โลโก้ และการออกแบบ เป็นของคลินิกหรือเจ้าของสิทธิ์ที่อนุญาตให้คลินิกใช้ ห้ามคัดลอก ดัดแปลง เผยแพร่ หรือนำไปใช้เพื่อการค้าโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร โดยเฉพาะภาพของผู้รับบริการซึ่งได้รับความยินยอมให้เผยแพร่บนช่องทางของคลินิกเท่านั้น</p>

<h2>6. การใช้งานเว็บไซต์</h2>
<p>คุณตกลงที่จะไม่ใช้เว็บไซต์ในทางที่ผิดกฎหมาย หรือกระทำการใดที่อาจสร้างความเสียหายต่อเว็บไซต์ ระบบ หรือผู้ใช้งานอื่น รวมถึงการพยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</p>

<h2>7. ลิงก์และบริการภายนอก</h2>
<p>เว็บไซต์มีลิงก์และเนื้อหาจากผู้ให้บริการภายนอก เช่น LINE, Facebook, Instagram, TikTok, YouTube และ Google Maps ซึ่งอยู่ภายใต้ข้อกำหนดและนโยบายของผู้ให้บริการนั้น คลินิกไม่ได้ควบคุมและไม่รับผิดชอบต่อเนื้อหาหรือการดำเนินงานของบริการภายนอกเหล่านั้น</p>

<h2>8. ข้อจำกัดความรับผิด</h2>
<p>เราพยายามดูแลให้ข้อมูลบนเว็บไซต์ถูกต้องและเป็นปัจจุบัน แต่ไม่รับประกันว่าข้อมูลทั้งหมดจะถูกต้องครบถ้วนตลอดเวลา หรือว่าเว็บไซต์จะใช้งานได้โดยไม่หยุดชะงัก ภายในขอบเขตที่กฎหมายอนุญาต คลินิกไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้หรือการอ้างอิงข้อมูลบนเว็บไซต์เพียงอย่างเดียวโดยไม่ได้ปรึกษาแพทย์ ทั้งนี้ ข้อนี้ไม่จำกัดความรับผิดใดที่ไม่อาจจำกัดได้ตามกฎหมาย</p>

<h2>9. ข้อมูลส่วนบุคคล</h2>
<p>การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของคุณเป็นไปตาม<a href="${privacyHref}">นโยบายความเป็นส่วนตัว</a>ของคลินิก</p>

<h2>10. การเปลี่ยนแปลงข้อกำหนด</h2>
<p>เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว โดยจะแสดงวันที่ปรับปรุงล่าสุดไว้ที่ด้านบนของหน้านี้ การใช้งานเว็บไซต์ต่อไปหลังการปรับปรุงถือว่าคุณยอมรับข้อกำหนดฉบับใหม่</p>

<h2>11. กฎหมายที่ใช้บังคับ</h2>
<p>ข้อกำหนดนี้อยู่ภายใต้และตีความตามกฎหมายแห่งราชอาณาจักรไทย</p>

<h2>12. ช่องทางการติดต่อ</h2>
<p>${CLINIC.address.th}<br>โทรศัพท์ ${PHONE} · LINE ${LINE_ID} · อีเมล ${P("อีเมลสำหรับติดต่อ")}</p>
`;
}

function en(privacyHref: string): string {
  return `
<p>These terms apply to your use of the website of ${CLINIC.name} (“the clinic”, “we”), operated by ${P("Legal name of the operating entity")}. By using this website you confirm that you have read and accept these terms. If you do not accept them, please do not use the website.</p>

<h2>1. About the clinic and this website</h2>
<p>${CLINIC.name} is a licensed medical facility, licence no. ${P("Medical facility licence number")}, located at ${CLINIC.address.en}.</p>
<p>This website provides information about the clinic, our doctors, our services and how to contact us. It has no online booking or payment. Appointments are made over LINE or by phone, and are only confirmed once the clinic's staff confirm them.</p>

<h2>2. Website content is not medical advice</h2>
<p>Articles, FAQs and other content on this website are general information to help you decide. They are not a diagnosis, treatment or medical advice for any individual. Whether a procedure is right for you depends on an individual assessment by a doctor. Please consult a doctor before deciding on treatment.</p>

<h2>3. Treatment results</h2>
<p>Results vary from person to person, depending on facial structure, skin condition, health and aftercare. Before-and-after photos on this website show real patients who consented to their publication, but they do not guarantee that anyone else will get the same result. Every procedure carries risks and possible side effects, which the doctor will explain before treatment.</p>

<h2>4. Prices and promotions</h2>
<ul>
<li>Prices and service details may change. The price that applies is the one the clinic confirms with you before treatment.</li>
<li>Promotions are valid only during the stated period and are subject to each promotion's conditions.</li>
<li>If anything on the website differs from what the clinic confirms with you, what the clinic confirms applies.</li>
</ul>

<h2>5. Intellectual property</h2>
<p>All content on this website, including text, photos, before-and-after images, logos and design, belongs to the clinic or to rights holders who have licensed it to the clinic. You may not copy, modify, publish or use it commercially without written permission. This applies especially to patient images, which are published with consent for the clinic's own channels only.</p>

<h2>6. Use of the website</h2>
<p>You agree not to use the website unlawfully or in any way that could damage the website, its systems or other users, including attempting to gain unauthorised access.</p>

<h2>7. Links and third-party services</h2>
<p>The website contains links to and content from third parties such as LINE, Facebook, Instagram, TikTok, YouTube and Google Maps, which are governed by those providers' own terms and policies. The clinic does not control and is not responsible for their content or operation.</p>

<h2>8. Limitation of liability</h2>
<p>We work to keep the information on this website accurate and up to date, but we do not guarantee that it is always complete and correct, or that the website will be available without interruption. To the extent permitted by law, the clinic is not liable for loss arising from use of, or reliance on, information on the website alone without consulting a doctor. Nothing in this section limits any liability that cannot be limited by law.</p>

<h2>9. Personal data</h2>
<p>How we collect and use your personal data is set out in the clinic's <a href="${privacyHref}">Privacy Policy</a>.</p>

<h2>10. Changes to these terms</h2>
<p>We may update these terms from time to time. The date of the latest update is shown at the top of this page. Continuing to use the website after an update means you accept the updated terms.</p>

<h2>11. Governing law</h2>
<p>These terms are governed by and interpreted under the laws of the Kingdom of Thailand.</p>

<h2>12. Contact us</h2>
<p>${CLINIC.address.en}<br>Phone ${PHONE} · LINE ${LINE_ID} · Email ${P("Contact email")}</p>
`;
}
