import type { Doctor } from "@/types/doctor";

export const DOCTORS: Doctor[] = [
  {
    slug: "dr-jing",
    image: "/images/doctors/dr-jing.png",
    nameEn: "Dr. Jing",
    nameTh: "หมอจิ๋ง",
    fullNameEn: "Isreey Muangmanee M.D.",
    fullNameTh: "แพทย์หญิงอิสรีย์ เมืองมณี",
    specialty: "Nose Thread Lift · Facial Design",
    specialtyTh: "ร้อยไหมจมูก · ปรับรูปหน้า",
    experience: "20+ yrs · 40,000+ cases",
    credentials: [
      {
        en: "Nose Thread Lifting Specialist",
        th: "ชำนาญการด้านการร้อยไหมจมูก Nose Thread Lifting",
      },
      {
        en: "Facial Design Specialist (Filler, Thread Lifting)",
        th: "ชำนาญการด้านการปรับรูปหน้า Facial Design (Filler, Thread Lifting)",
      },
      {
        en: "Aesthetic Dermatology",
        th: "ชำนาญการด้านผิวพรรณความงาม Aesthetic",
      },
      {
        en: "15+ years in aesthetic medicine",
        th: "ประสบการณ์ด้านผิวพรรณความงามมากกว่า 15 ปี",
      },
      {
        en: "10,000+ nose thread cases",
        th: "ประสบการณ์ร้อยไหมจมูกมามากกว่า 10,000 เคส",
      },
    ],
    services: ["nose-thread-lift", "facial-thread-lift", "facial-design"],
    featured: true,
    // Placeholder bio — rephrased from credential bullets on nycclinic.net/doctor/.
    // Nothing invented. Flag for client edit/approval before final build.
    bioEn:
      "Dr. Jing specializes in nose thread lift and facial design, with over 15 years of experience in aesthetic medicine and more than 10,000 documented nose thread lift cases performed to date.",
    bioTh:
      "หมอจิ๋งเชี่ยวชาญด้านร้อยไหมจมูกและออกแบบรูปหน้า ด้วยประสบการณ์กว่า 15 ปีในสาขาเวชศาสตร์ความงาม และผลงานร้อยไหมจมูกมากกว่า 10,000 เคส",
  },
  {
    slug: "dr-beer",
    image: "/images/doctors/dr-beer.png",
    nameEn: "Dr. Beer",
    nameTh: "หมอเบียร์",
    fullNameEn: "Pattaya Tanthanatip M.D.",
    fullNameTh: "นายแพทย์พัทยา ตันธนาธิป",
    specialty: "Plastic Surgery",
    specialtyTh: "ศัลยกรรมตกแต่ง",
    experience: "15+ yrs",
    credentials: [
      {
        en: "Board-Certified Plastic Surgeon",
        th: "ศัลยแพทย์ตกแต่งเฉพาะทาง Plastic Surgeon",
      },
      {
        en: "Member, Royal College of Surgeons of Thailand",
        th: "สมาชิกราชวิทยาลัยศัลยแพทย์ตกแต่งแห่งประเทศไทย",
      },
      {
        en: "Rhinoplasty Specialist",
        th: "ชำนาญการด้านศัลยกรรมจมูก Rhinoplasty",
      },
      {
        en: "Blepharoplasty, Chin Augmentation, Breast Augmentation, Face Lift",
        th: "ศัลยกรรมตา, ศัลยกรรมคาง, ศัลยกรรมหน้าอก, ดึงหน้า",
      },
      {
        en: "15+ years of experience",
        th: "ประสบการณ์มากกว่า 15 ปี",
      },
    ],
    services: ["surgery"],
  },
  {
    slug: "dr-lulu",
    image: "/images/doctors/dr-lulu.png",
    nameEn: "Dr. Lulu",
    nameTh: "หมอลู่ลู่",
    fullNameEn: "Rangrong Sriworarak M.D.",
    fullNameTh: "แพทย์หญิง รังรอง ศรีวรรักษ์",
    specialty: "Surgery — Eyes · Lips · Sub-brow Lift",
    specialtyTh: "ศัลยกรรมตา · ปาก · ยกคิ้ว",
    experience: "15+ yrs",
    credentials: [
      {
        en: "Surgeon",
        th: "ศัลยแพทย์ Surgeon",
      },
      {
        en: "Eye Surgery Specialist (Blepharoplasty, Under Eye, Sub-brow Lift)",
        th: "ชำนาญการด้านการทำศัลยกรรมตา Blepharoplasty, Under Eye Surgery, Sub-brows Lift",
      },
      {
        en: "Lip Surgery Specialist",
        th: "ชำนาญการด้านศัลยกรรมปาก Lips Surgery",
      },
      {
        en: "Aesthetic Dermatology",
        th: "ชำนาญการด้านผิวพรรณความงาม Aesthetic",
      },
      {
        en: "15+ years of experience",
        th: "ประสบการณ์มากกว่า 15 ปี",
      },
    ],
    services: ["surgery"],
  },
  {
    slug: "dr-pek",
    image: "/images/doctors/dr-pek.png",
    nameEn: "Dr. Pek",
    nameTh: "หมอเป๊ก",
    fullNameEn: "Pichit Sooksaranjit M.D.",
    fullNameTh: "นายแพทย์พิชิต สุขสราญจิต",
    specialty: "Lipo · Fat Transfer · Nose Thread",
    specialtyTh: "ดูดไขมัน · ฉีดไขมัน · ร้อยไหมจมูก",
    experience: "15+ yrs",
    credentials: [
      {
        en: "Liposuction Specialist",
        th: "ชำนาญการด้านศัลยกรรมดูดไขมัน Liposuction",
      },
      {
        en: "Fat Transfer Specialist",
        th: "ชำนาญการด้านการเติมไขมัน Fat Transfer",
      },
      {
        en: "Nose Thread Lifting Specialist",
        th: "ชำนาญการด้านการร้อยไหมจมูก Nose Thread Lifting",
      },
      {
        en: "Facial Design Specialist (Filler, Thread Lifting)",
        th: "ชำนาญการด้านการปรับรูปหน้า Facial Design (Filler, Thread Lifting)",
      },
      {
        en: "Aesthetic Dermatology",
        th: "ชำนาญการด้านผิวพรรณความงาม Aesthetic",
      },
    ],
    services: ["surgery", "nose-thread-lift", "facial-design"],
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((d) => d.slug === slug);
}

// TODO: replace with WP fetch
export async function getDoctors(): Promise<Doctor[]> {
  return DOCTORS;
}
