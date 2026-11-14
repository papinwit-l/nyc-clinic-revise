import { cache } from "react";
import type { FaqCategory, FaqItem } from "@/types/faq";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { MOCK_FAQS } from "./mock/faq";

/**
 * FAQ from WordPress (wp-admin → FAQ). One list for every FAQ on the site
 * (admin doc v2 §0, Option A):
 *
 *   /faq, homepage preview   entries with "Show on FAQ page" ticked AND a category
 *   /contact, homepage pick  entries ticked "Featured"
 *   service pages            entries whose "Services" include that service
 *                            (read by data/services.ts via getServiceFaqs)
 *
 * Order is the drag order in wp-admin (menu_order). Cache tag: "faq".
 * Without WP_API_URL (local dev) the old mock list is served instead.
 */

const CATEGORIES: FaqCategory[] = ["nose", "face", "safety", "care"];

/** One FAQ entry, both languages. */
export type FaqSource = {
  slug: string;
  category: FaqCategory | "";
  featured: boolean;
  showOnFaqPage: boolean;
  /** WordPress IDs of the services this question appears on. */
  serviceIds: number[];
  q_th: string;
  q_en: string;
  a_th: string;
  a_en: string;
};

type WpFaq = {
  slug: string;
  category: string;
  featured: boolean;
  show_on_faq_page: boolean;
  services: number[] | null;
  q_th: string;
  q_en: string;
  a_th: string;
  a_en: string;
};

const FIELDS =
  "slug,category,featured,show_on_faq_page,services,q_th,q_en,a_th,a_en";

/** Answers are plain text; Windows line breaks from the textarea become \n. */
const text = (v: unknown) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim() : "";

/** Every FAQ entry in drag order. Shared by /faq, /contact, home and services. */
export const getFaqSources = cache(async (): Promise<FaqSource[]> => {
  if (!wpConfigured()) {
    return MOCK_FAQS.map((f) => ({
      slug: f.slug,
      category: f.category,
      featured: !!f.featured,
      showOnFaqPage: true,
      serviceIds: [],
      q_th: f.q_th,
      q_en: f.q_en,
      a_th: f.a_th,
      a_en: f.a_en,
    }));
  }
  const all: WpFaq[] = [];
  for (let page = 1; ; page++) {
    const batch = await wpFetch<WpFaq[]>(
      `/wp/v2/faq?per_page=100&page=${page}&orderby=menu_order&order=asc&_fields=${FIELDS}`,
      ["faq"],
    );
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all
    .map((f) => ({
      slug: f.slug,
      category: (CATEGORIES as string[]).includes(f.category)
        ? (f.category as FaqCategory)
        : ("" as const),
      featured: !!f.featured,
      showOnFaqPage: !!f.show_on_faq_page,
      serviceIds: Array.isArray(f.services) ? f.services : [],
      q_th: text(f.q_th),
      q_en: text(f.q_en),
      a_th: text(f.a_th),
      a_en: text(f.a_en),
    }))
    .filter((f) => f.q_th || f.q_en);
});

/** English falls back to Thai (project rule: Thai-only content still shows on /en). */
export function resolveFaq(src: FaqSource, locale: string): FaqItem {
  const th = locale === "th";
  const q = th ? src.q_th || src.q_en : src.q_en || src.q_th;
  const a = th ? src.a_th || src.a_en : src.a_en || src.a_th;
  // category is "" only for service-only questions, which never reach /faq.
  return { slug: src.slug, category: src.category as FaqCategory, q, a };
}

/** The /faq list — also the homepage preview's source. */
export async function getFaqs(locale: string): Promise<FaqItem[]> {
  return (await getFaqSources())
    .filter((f) => f.showOnFaqPage && f.category)
    .map((f) => resolveFaq(f, locale));
}

/** The short pick for /contact and the homepage. Same source as /faq, just filtered. */
export async function getFeaturedFaqs(
  locale: string,
  limit = 5,
): Promise<FaqItem[]> {
  return (await getFaqSources())
    .filter((f) => f.featured)
    .slice(0, limit)
    .map((f) => resolveFaq(f, locale));
}

/** Questions ticked onto one service (by WordPress ID), in drag order. */
export async function getServiceFaqs(
  locale: string,
  serviceId: number,
): Promise<FaqItem[]> {
  return (await getFaqSources())
    .filter((f) => f.serviceIds.includes(serviceId))
    .map((f) => resolveFaq(f, locale));
}
