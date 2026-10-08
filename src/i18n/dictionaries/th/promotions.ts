const promotions = {
  hero: {
    label: "Promotions",
    heading: "โปรโมชัน",
    description:
      "โปรโมชันที่เปิดให้จองอยู่ตอนนี้ สอบถามรายละเอียดและจองคิวได้ทางไลน์",
  },
  validUntil: "ถึงวันที่",
  endsToday: "วันสุดท้าย",
  daysLeft: "เหลืออีก {n} วัน",
  ask: "สอบถามโปรนี้ทางไลน์",
  service: "ดูรายละเอียดบริการ →",
  enlarge: "ดูภาพขยาย",
  empty: {
    heading: "ยังไม่มีโปรโมชันในขณะนี้",
    text: "สอบถามราคาและโปรโมชันรอบถัดไปได้ทางไลน์",
    button: "แอดไลน์สอบถาม",
  },
} as const;

export default promotions;
