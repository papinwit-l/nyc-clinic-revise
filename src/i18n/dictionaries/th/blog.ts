const blog = {
  hero: {
    label: "Blog",
    heading: "บทความ",
    description:
      "ความรู้เรื่องร้อยไหมจมูก ปรับรูปหน้า และการดูแลตัวเอง จากทีมแพทย์ NYC Clinic",
  },
  all: "ทั้งหมด",
  read: "อ่านบทความ →",
  prev: "หน้าก่อนหน้า",
  next: "หน้าถัดไป",
  empty: "ยังไม่มีบทความ",
  back: "← บทความทั้งหมด",
  minRead: "อ่าน {n} นาที",
  thaiOnly: "",
  relatedLabel: "Read next",
  relatedHeading: "บทความอื่น ๆ",
  // Shared CTA at the foot of every article — see ArticleCTA.
  // TODO(marketing): `text` is placeholder copy, not yet approved.
  cta: {
    heading: "ปรึกษาแพทย์ฟรี ผ่าน LINE",
    text: "ส่งรูปของคุณ ให้แพทย์ประเมินเบื้องต้นก่อนเข้ามาที่คลินิก",
    button: "แอดไลน์ @nyc-clinic",
  },
} as const;

export default blog;
