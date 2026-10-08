import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getServices } from "@/data/services";
import { getCases } from "@/data/cases";
import { getDoctors } from "@/data/doctors";
import { getTestimonials } from "@/data/testimonials";
import { getLatestPosts } from "@/data/posts";
import { getActivePromotions } from "@/data/promotions";
import { getInstagramPosts } from "@/data/instagram";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import About from "@/components/home/About";
import Doctors from "@/components/home/Doctors";
import Testimonials from "@/components/home/Testimonials";
import PromotionsBanner from "@/components/home/PromotionsBanner";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCTA from "@/components/home/ContactCTA";
import InstagramFeed from "@/components/home/InstagramFeed";
import BeforeAfter from "@/components/home/BeforeAfter";
import ServicesOverview from "@/components/home/ServicesOverview";
import { getFeaturedReveal } from "@/data/reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  const [
    services,
    cases,
    featuredReveal,
    doctors,
    testimonials,
    posts,
    promos,
    igPosts,
  ] = await Promise.all([
    getServices(locale),
    getCases(locale, { limit: 6 }),
    getFeaturedReveal(locale),
    getDoctors(),
    getTestimonials(locale, 3),
    getLatestPosts(locale, 3),
    getActivePromotions(locale),
    getInstagramPosts(8),
  ]);

  return (
    <>
      <Hero t={t.home.hero} locale={locale} />
      <TrustBar t={t.home.trust} locale={locale} />
      <About t={t.home.about} locale={locale} />
      <Doctors t={t.home.doctors} locale={locale} data={doctors} />
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
        reveal={featuredReveal}
      />
      <Testimonials locale={locale} data={testimonials} />
      <InstagramFeed locale={locale} data={igPosts} />
      <PromotionsBanner
        t={t.home.promotion}
        locale={locale}
        data={promos[0] ?? null}
        total={promos.length}
      />
      <BlogPreview t={t.home.blog} locale={locale} data={posts} />
      <ContactCTA t={t.home.contact} tCommon={t.common} locale={locale} />
    </>
  );
}
