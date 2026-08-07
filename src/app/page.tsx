import Hero from "@/components/home/Hero";
import SignatureSpotlight from "@/components/home/SignatureSpotlight";
import ServicesOverview from "@/components/home/ServicesOverview";
import BeforeAfter from "@/components/home/BeforeAfter";
import Doctors from "@/components/home/Doctors";
import Testimonials from "@/components/home/Testimonials";
import PromotionsBanner, {
  type Promotion,
} from "@/components/home/PromotionsBanner";

// TODO: fetch from WP Promotions CPT
const ACTIVE_PROMO: Promotion | null = {
  slug: "summer-nose-thread-2026",
  titleEn: "Summer Special — Nose Thread Lift",
  titleTh: "โปรร้อยไหมจมูก ต้อนรับซัมเมอร์",
  offer: "ลด 20% สำหรับร้อยไหมจมูกกึ่งศัลยกรรม",
  validUntil: "2026-09-30",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureSpotlight />
      <ServicesOverview />
      <BeforeAfter />
      <Doctors />
      <Testimonials />
      <PromotionsBanner promo={ACTIVE_PROMO} />
    </>
  );
}
