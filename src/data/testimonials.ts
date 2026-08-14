import type { TestimonialCard } from "@/types/testimonial";

// TODO: replace with WP fetch
// e.g. const res = await fetch(`${WP_API}/wp/v2/testimonial?per_page=${limit}`);

const DATA = [
  {
    id: "1",
    quote_th:
      "สาวๆ คนไหนอยากมีจมูกสวยๆ แต่ไม่กล้าเสริมจมูก มาร้อยไหมจมูกได้ที่นี้เลยนะคะ คุณหมอใจดีมากๆ ให้คำแนะนำดี ร้อยไหมจมูกเสร็จออกมาถูกใจ สวยมากๆ ชอบมากค่ะ",
    quote_en:
      "If you want a beautiful nose but are afraid of surgery, come try nose thread here! The doctor is very kind and gives great advice. Love the results!",
    name: "คุณปิยาภรณ์",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
  {
    id: "2",
    quote_th:
      "คุณหมอจิ๋ง น่ารักมากๆ คะ มารอบที่ 2 แล้ว น้องๆ ต้อนรับน่ารักและยิ้มแย้มทุกคนเลยคะ นวัตกรรมใหม่ไม่ต้องพักฟื้น ดูเป็นธรรมชาติค่ะ",
    quote_en:
      "Dr. Jing is so sweet! This is my second visit. The staff is welcoming and friendly. New innovation — no downtime and looks natural.",
    name: "คุณอ้อย",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
  {
    id: "3",
    quote_th:
      "ร้อยไหมทรงสวยดูธรรมชาติ สวยคมมีมิติ คุณหมอและพี่ๆ เจ้าหน้าที่น่ารักมากค่ะ บริการดีมาก แนะนำเลยค่ะ",
    quote_en:
      "Natural-looking results with beautiful definition. The doctor and staff are wonderful. Highly recommend!",
    name: "คุณวราลี",
    treatment: "Nose Thread Lift",
    rating: 5,
  },
];

export async function getTestimonials(
  locale: string,
  limit?: number,
): Promise<TestimonialCard[]> {
  const count = limit ?? DATA.length;

  // TODO: fetch from WP and map bilingual fields
  return DATA.slice(0, count).map((item) => ({
    id: item.id,
    quote: locale === "th" ? item.quote_th : item.quote_en,
    name: item.name,
    treatment: item.treatment,
    rating: item.rating,
  }));
}
