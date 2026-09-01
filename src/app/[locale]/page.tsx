import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getServices } from "@/data/services";
import { getCases } from "@/data/cases";
import { getDoctors } from "@/data/doctors";
import { getTestimonials } from "@/data/testimonials";
import { getLatestPosts } from "@/data/posts";
import { getActivePromotion } from "@/data/promotions";
import { getInstagramPosts } from "@/data/instagram";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import SignatureSpotlight from "@/components/home/SignatureSpotlight";
import ServicesOverview from "@/components/home/ServicesOverview";
import BeforeAfter from "@/components/home/BeforeAfter";
import Doctors from "@/components/home/Doctors";
import Testimonials from "@/components/home/Testimonials";
import PromotionsBanner from "@/components/home/PromotionsBanner";
import InstagramFeed from "@/components/home/InstagramFeed";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCTA from "@/components/home/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  const [services, cases, doctors, testimonials, posts, promo, igPosts] =
    await Promise.all([
      getServices(locale),
      getCases(locale, { limit: 6 }),
      getDoctors(),
      getTestimonials(locale, 3),
      getLatestPosts(locale, 3),
      getActivePromotion(locale),
      getInstagramPosts(8),
    ]);

  return (
    <>
      <Hero t={t.home.hero} locale={locale} />
      <TrustBar t={t.home.trust} locale={locale} />
      <Doctors t={t.home.doctors} locale={locale} data={doctors} />
      {/* <SignatureSpotlight
        t={t.home.signature}
        tCommon={t.common}
        locale={locale}
        data={services.find((s) => s.signature) ?? services[0]}
      /> */}
      <ServicesOverview
        t={t.home.services}
        tCommon={t.common}
        locale={locale}
        data={services}
      />
      <BeforeAfter
        t={t.home.results}
        tCommon={t.common}
        locale={locale}
        data={cases}
      />
      <Testimonials
        t={t.home.testimonials}
        locale={locale}
        data={testimonials}
      />
      <InstagramFeed t={t.home.instagram} data={igPosts} />
      <PromotionsBanner t={t.home.promotion} locale={locale} data={promo} />
      <BlogPreview t={t.home.blog} locale={locale} data={posts} />
      <ContactCTA t={t.home.contact} tCommon={t.common} locale={locale} />
    </>
  );
}
