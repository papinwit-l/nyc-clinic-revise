import Hero from "@/components/home/Hero";
import SignatureSpotlight from "@/components/home/SignatureSpotlight";
import ServicesOverview from "@/components/home/ServicesOverview";
import TrustBar from "@/components/home/Trustbar";
import BeforeAfter from "@/components/home/BeforeAfter";
import Doctors from "@/components/home/Doctors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SignatureSpotlight />
      <ServicesOverview />
      <BeforeAfter />
      <Doctors />
    </>
  );
}
