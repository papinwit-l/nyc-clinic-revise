import home from "./home";
import doctor from "./doctor";

const th = {
  nav: {
    home: "หน้าแรก",
    services: "บริการ",
    beforeAfter: "ผลงาน",
    doctors: "ทีมแพทย์",
    about: "เกี่ยวกับเรา",
    blog: "บทความ",
    contact: "ติดต่อเรา",
    addLine: "แอดไลน์",
  },
  footer: {
    description:
      "ศูนย์ความงามครบวงจร โดยทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง กว่า 15 ปี",
    services: "บริการ",
    clinic: "คลินิก",
    support: "ช่วยเหลือ",
    rights: "สงวนลิขสิทธิ์",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "ข้อกำหนด",
    ctaLine: "แอดไลน์ปรึกษาฟรี",
  },
  common: {
    learnMore: "ดูเพิ่มเติม",
    viewAll: "ดูทั้งหมด →",
    readMore: "อ่านต่อ →",
    before: "ก่อน",
    after: "หลัง",
    by: "โดย",
    phone: "โทรศัพท์",
    location: "ที่อยู่",
    hours: "เวลาทำการ",
  },
  home,
  doctor,
} as const;

export default th;
