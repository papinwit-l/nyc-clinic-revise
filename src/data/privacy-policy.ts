import { CLINIC, LINE_ID, PHONE } from "@/lib/site";

/**
 * Privacy policy text (TH + EN), drafted Oct 2026 against Thailand's Personal
 * Data Protection Act B.E. 2562 (PDPA).
 *
 * ⚠ DRAFT — NOT LEGAL ADVICE. Written by Claude from what the site and clinic
 * actually do (no web forms; contact via LINE, phone and social media;
 * treatment records and before/after photos at the clinic). It must be
 * reviewed by the clinic and whoever advises it on PDPA before it goes live.
 *
 * Items in [square brackets] are facts only the clinic can supply:
 *   - the legal entity that operates NYC Clinic
 *   - a contact email and the person handling data requests (DPO, if any)
 *   - retention periods
 *   - analytics / ad-tracking tools, if any are added to the site
 *
 * Contact details (address, phone, LINE) come from lib/site.ts so they can't
 * drift from the rest of the site.
 */

const P = (s: string) => `<em>[${s}]</em>`;

export function privacyPolicyHtml(locale: string): string {
  return locale === "th" ? th() : en();
}

function th(): string {
  return `
<p>${P("ชื่อนิติบุคคลผู้ดำเนินกิจการ")} ผู้ดำเนินกิจการ ${CLINIC.name} (“คลินิก” หรือ “เรา”) ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ นโยบายนี้อธิบายว่าเราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณอย่างไร ทั้งเมื่อคุณใช้เว็บไซต์นี้ ติดต่อเราผ่านช่องทางออนไลน์ และเข้ารับบริการที่คลินิก ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</p>

<h2>1. ผู้ควบคุมข้อมูลส่วนบุคคล</h2>
<p>${P("ชื่อนิติบุคคลผู้ดำเนินกิจการ")}<br>${CLINIC.address.th}<br>โทรศัพท์ ${PHONE} · LINE ${LINE_ID} · อีเมล ${P("อีเมลสำหรับติดต่อเรื่องข้อมูลส่วนบุคคล")}</p>

<h2>2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</h2>
<p>เว็บไซต์นี้ไม่มีแบบฟอร์มให้กรอกข้อมูล การติดต่อสอบถามและนัดหมายทำผ่าน LINE โทรศัพท์ และโซเชียลมีเดีย เราอาจเก็บรวบรวมข้อมูลดังต่อไปนี้</p>
<ul>
<li><strong>ข้อมูลเมื่อคุณติดต่อเรา</strong> เช่น ชื่อ เบอร์โทรศัพท์ ชื่อบัญชี LINE หรือโซเชียลมีเดีย ข้อความ และรูปภาพที่คุณส่งมาเพื่อขอคำปรึกษา</li>
<li><strong>ข้อมูลเมื่อเข้ารับบริการ</strong> เช่น ชื่อ-นามสกุล วันเดือนปีเกิด เลขประจำตัวประชาชนหรือหนังสือเดินทาง ที่อยู่ และข้อมูลการชำระเงิน</li>
<li><strong>ข้อมูลอ่อนไหว</strong> ได้แก่ ข้อมูลสุขภาพ ประวัติการรักษา โรคประจำตัว ยาที่ใช้ ประวัติการแพ้ยา และภาพถ่ายใบหน้าก่อนและหลังการรักษา</li>
<li><strong>ข้อมูลการใช้งานเว็บไซต์</strong> เช่น หมายเลข IP ประเภทเบราว์เซอร์และอุปกรณ์ หน้าที่เข้าชม และข้อมูลจากคุกกี้</li>
</ul>

<h2>3. วัตถุประสงค์และฐานทางกฎหมายในการประมวลผล</h2>
<ul>
<li><strong>ตอบคำถาม ให้คำปรึกษาเบื้องต้น และนัดหมาย</strong> เพื่อดำเนินการตามคำขอของคุณก่อนเข้ารับบริการ</li>
<li><strong>ให้บริการทางการแพทย์</strong> รวมถึงการประเมิน วางแผนการรักษา และติดตามผล เพื่อปฏิบัติตามสัญญาการให้บริการ โดยข้อมูลสุขภาพจะประมวลผลเมื่อได้รับความยินยอมโดยชัดแจ้งจากคุณ หรือตามที่กฎหมายอนุญาต</li>
<li><strong>จัดทำและเก็บรักษาเวชระเบียน</strong> เพื่อปฏิบัติตามกฎหมายว่าด้วยสถานพยาบาล</li>
<li><strong>เผยแพร่ภาพก่อนและหลังการรักษา</strong> บนเว็บไซต์และโซเชียลมีเดียของคลินิก เฉพาะเมื่อได้รับความยินยอมโดยชัดแจ้งจากคุณเท่านั้น และคุณสามารถถอนความยินยอมได้ทุกเมื่อ</li>
<li><strong>แจ้งข่าวสารและโปรโมชัน</strong> เมื่อได้รับความยินยอมจากคุณ</li>
<li><strong>ดูแลความปลอดภัยและปรับปรุงเว็บไซต์</strong> โดยอาศัยประโยชน์โดยชอบด้วยกฎหมายของคลินิก</li>
</ul>

<h2>4. การเปิดเผยข้อมูลส่วนบุคคล</h2>
<p>เราไม่ขายข้อมูลส่วนบุคคลของคุณ เราอาจเปิดเผยข้อมูลเท่าที่จำเป็นแก่</p>
<ul>
<li>แพทย์และบุคลากรของคลินิกที่เกี่ยวข้องกับการให้บริการแก่คุณ</li>
<li>ผู้ให้บริการที่ช่วยในการดำเนินงาน เช่น ผู้ให้บริการโฮสติ้งเว็บไซต์ ระบบนัดหมาย ระบบชำระเงิน และแพลตฟอร์มสื่อสาร เช่น LINE</li>
<li>โรงพยาบาลหรือสถานพยาบาลอื่น เมื่อจำเป็นต่อการรักษาหรือในกรณีฉุกเฉิน</li>
<li>หน่วยงานของรัฐหรือผู้มีอำนาจตามกฎหมาย เมื่อกฎหมายกำหนด</li>
</ul>

<h2>5. การส่งข้อมูลไปต่างประเทศ</h2>
<p>ผู้ให้บริการบางราย เช่น ผู้ให้บริการโฮสติ้งเว็บไซต์และแพลตฟอร์มสื่อสาร อาจจัดเก็บหรือประมวลผลข้อมูลบนเซิร์ฟเวอร์นอกประเทศไทย ในกรณีดังกล่าว เราจะดำเนินการให้มีมาตรการคุ้มครองข้อมูลที่เหมาะสมตามที่กฎหมายกำหนด</p>

<h2>6. ระยะเวลาในการเก็บรักษาข้อมูล</h2>
<ul>
<li>เวชระเบียนและข้อมูลการรักษา: ${P("ระยะเวลาตามที่กฎหมายกำหนดและที่คลินิกกำหนด")}</li>
<li>ข้อมูลการติดต่อสอบถามของผู้ที่ไม่ได้เข้ารับบริการ: ${P("ระยะเวลาที่คลินิกกำหนด")}</li>
<li>ภาพที่ได้รับความยินยอมให้เผยแพร่: จนกว่าคุณจะถอนความยินยอม</li>
</ul>
<p>เมื่อพ้นระยะเวลาดังกล่าว เราจะลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้</p>

<h2>7. สิทธิของเจ้าของข้อมูลส่วนบุคคล</h2>
<p>คุณมีสิทธิตามที่กฎหมายกำหนด ได้แก่</p>
<ul>
<li>สิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคล</li>
<li>สิทธิขอให้แก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน</li>
<li>สิทธิขอให้ลบหรือทำลายข้อมูล</li>
<li>สิทธิขอให้ระงับการใช้ข้อมูล</li>
<li>สิทธิคัดค้านการประมวลผลข้อมูล</li>
<li>สิทธิขอให้โอนย้ายข้อมูล</li>
<li>สิทธิถอนความยินยอม โดยไม่กระทบการประมวลผลที่ได้ดำเนินการไปแล้วก่อนการถอนความยินยอม</li>
<li>สิทธิร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</li>
</ul>
<p>คุณสามารถใช้สิทธิได้โดยติดต่อเราตามช่องทางในข้อ 12 เราอาจขอข้อมูลเพื่อยืนยันตัวตนก่อนดำเนินการ และจะตอบกลับภายในระยะเวลาที่กฎหมายกำหนด ทั้งนี้ สิทธิบางประการอาจถูกจำกัดตามกฎหมาย เช่น การเก็บรักษาเวชระเบียน</p>

<h2>8. คุกกี้และบริการจากผู้ให้บริการภายนอก</h2>
<p>เว็บไซต์ใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ บางหน้าแสดงเนื้อหาจากผู้ให้บริการภายนอก เช่น แผนที่ Google Maps โพสต์จาก Instagram และวิดีโอจาก YouTube ซึ่งอาจตั้งค่าคุกกี้ของตนเองตามนโยบายของผู้ให้บริการนั้น ${P("หากติดตั้งเครื่องมือวิเคราะห์หรือโฆษณา เช่น Google Analytics หรือ Meta Pixel ให้ระบุที่นี่")} คุณสามารถตั้งค่าเบราว์เซอร์เพื่อปฏิเสธหรือลบคุกกี้ได้ ซึ่งอาจทำให้บางส่วนของเว็บไซต์ทำงานได้ไม่สมบูรณ์</p>

<h2>9. การรักษาความปลอดภัยของข้อมูล</h2>
<p>เราใช้มาตรการรักษาความปลอดภัยทางเทคนิคและการบริหารจัดการที่เหมาะสม เพื่อป้องกันการเข้าถึง ใช้ เปลี่ยนแปลง หรือเปิดเผยข้อมูลโดยไม่ได้รับอนุญาต และจำกัดการเข้าถึงข้อมูลเฉพาะบุคลากรที่จำเป็น</p>

<h2>10. ผู้เยาว์</h2>
<p>สำหรับผู้ที่ยังไม่บรรลุนิติภาวะ การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลต้องได้รับความยินยอมจากผู้ใช้อำนาจปกครองตามที่กฎหมายกำหนด</p>

<h2>11. การเปลี่ยนแปลงนโยบาย</h2>
<p>เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว โดยจะแสดงวันที่ปรับปรุงล่าสุดไว้ที่ด้านบนของหน้านี้</p>

<h2>12. ช่องทางการติดต่อ</h2>
<p>หากมีคำถามเกี่ยวกับนโยบายนี้หรือต้องการใช้สิทธิของคุณ กรุณาติดต่อ ${P("ชื่อผู้รับผิดชอบหรือเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO) หากมี")}</p>
<p>${CLINIC.address.th}<br>โทรศัพท์ ${PHONE} · LINE ${LINE_ID} · อีเมล ${P("อีเมลสำหรับติดต่อเรื่องข้อมูลส่วนบุคคล")}</p>
`;
}

function en(): string {
  return `
<p>${P("Legal name of the operating entity")}, which operates ${CLINIC.name} (“the clinic”, “we”), is committed to protecting your personal data. This policy explains how we collect, use and disclose your personal data when you use this website, contact us online, and receive treatment at the clinic, in accordance with Thailand's Personal Data Protection Act B.E. 2562 (2019).</p>

<h2>1. Data controller</h2>
<p>${P("Legal name of the operating entity")}<br>${CLINIC.address.en}<br>Phone ${PHONE} · LINE ${LINE_ID} · Email ${P("Contact email for personal data matters")}</p>

<h2>2. Personal data we collect</h2>
<p>This website has no forms. Enquiries and appointments happen over LINE, phone and social media. We may collect the following:</p>
<ul>
<li><strong>When you contact us:</strong> your name, phone number, LINE or social media account name, messages, and any photos you send for a consultation.</li>
<li><strong>When you receive treatment:</strong> your full name, date of birth, national ID or passport number, address, and payment details.</li>
<li><strong>Sensitive data:</strong> health information, treatment history, medical conditions, medication, drug allergies, and before-and-after photos of your face.</li>
<li><strong>Website usage data:</strong> IP address, browser and device type, pages viewed, and cookie data.</li>
</ul>

<h2>3. Purposes and legal bases</h2>
<ul>
<li><strong>Answering questions, initial consultation and appointments</strong>, to act on your request before you receive treatment.</li>
<li><strong>Providing medical treatment</strong>, including assessment, treatment planning and follow-up, to perform our service agreement with you. Health data is processed with your explicit consent or as otherwise permitted by law.</li>
<li><strong>Keeping medical records</strong>, to comply with the laws governing medical facilities.</li>
<li><strong>Publishing before-and-after photos</strong> on the clinic's website and social media, only with your explicit consent, which you may withdraw at any time.</li>
<li><strong>Sending news and promotions</strong>, with your consent.</li>
<li><strong>Keeping the website secure and improving it</strong>, based on the clinic's legitimate interests.</li>
</ul>

<h2>4. Disclosure of personal data</h2>
<p>We do not sell your personal data. We may share it, only as far as necessary, with:</p>
<ul>
<li>the clinic's doctors and staff involved in your care;</li>
<li>service providers that help us operate, such as website hosting, appointment and payment systems, and messaging platforms such as LINE;</li>
<li>hospitals or other medical facilities, where needed for your treatment or in an emergency;</li>
<li>government authorities or other bodies, where the law requires it.</li>
</ul>

<h2>5. Transfers outside Thailand</h2>
<p>Some service providers, such as website hosting and messaging platforms, may store or process data on servers outside Thailand. Where this happens, we will ensure appropriate safeguards are in place as required by law.</p>

<h2>6. How long we keep your data</h2>
<ul>
<li>Medical records and treatment data: ${P("period required by law and set by the clinic")}</li>
<li>Enquiries from people who did not go on to receive treatment: ${P("period set by the clinic")}</li>
<li>Photos you consented to publish: until you withdraw your consent</li>
</ul>
<p>After that, we will delete or destroy the data, or make it anonymous.</p>

<h2>7. Your rights</h2>
<p>Under the law, you have the right to:</p>
<ul>
<li>access your personal data and obtain a copy;</li>
<li>have it corrected and kept up to date;</li>
<li>have it deleted or destroyed;</li>
<li>restrict its use;</li>
<li>object to its processing;</li>
<li>have it transferred;</li>
<li>withdraw your consent, without affecting processing carried out before the withdrawal;</li>
<li>complain to the Personal Data Protection Committee.</li>
</ul>
<p>To exercise these rights, contact us using the details in section 12. We may ask you to verify your identity first, and will respond within the time required by law. Some rights may be limited by law, for example where we must keep medical records.</p>

<h2>8. Cookies and third-party services</h2>
<p>This website uses cookies that are necessary for it to work. Some pages show content from third parties, such as Google Maps, Instagram posts and YouTube videos, which may set their own cookies under those providers' policies. ${P("If analytics or advertising tools such as Google Analytics or Meta Pixel are added, list them here")} You can set your browser to refuse or delete cookies, though parts of the website may then not work fully.</p>

<h2>9. Data security</h2>
<p>We use appropriate technical and organisational measures to protect your data against unauthorised access, use, alteration or disclosure, and limit access to the staff who need it.</p>

<h2>10. Minors</h2>
<p>For anyone who has not yet reached legal age, collecting and using their personal data requires the consent of a parent or legal guardian, as the law requires.</p>

<h2>11. Changes to this policy</h2>
<p>We may update this policy from time to time. The date of the latest update is shown at the top of this page.</p>

<h2>12. Contact us</h2>
<p>For questions about this policy, or to exercise your rights, please contact ${P("Name of the person responsible, or Data Protection Officer if appointed")}.</p>
<p>${CLINIC.address.en}<br>Phone ${PHONE} · LINE ${LINE_ID} · Email ${P("Contact email for personal data matters")}</p>
`;
}
