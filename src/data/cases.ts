import { cache } from "react";
import {
  CaseCard,
  SubcategoryGroup,
  TreatmentGroup,
  UNGROUPED_SLUG,
} from "@/types/case";
import { getServices } from "@/data/services";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { MOCK_CASES } from "./mock/cases";

/**
 * Before & After cases from WordPress (wp-admin → Cases), in drag order.
 * Cache tags: "case" + "doctor" (the caption shows the doctor's name).
 *
 * Grouping comes from the Categories taxonomy (case_treatment):
 *   top-level term   the treatment — its slug MUST match a top-level service
 *                    slug, or the case shows nowhere
 *   child terms      sub-categories, drag-ordered; the FIRST decides the group
 *
 * Without WP_API_URL (local dev) the in-code list is served instead.
 */

type Bi = { th: string; en: string };
type Term = { slug: string } & Bi;

/** A case in both languages — what WordPress and the mock both reduce to. */
export type CaseSource = {
  slug: string;
  image: string;
  treatment: Term;
  subcategories: Term[];
  doctor: Bi | null;
  order: number;
};

/** A reveal in both languages (shared with src/data/reveal.ts). */
export type RevealSource = Omit<CaseSource, "image"> & {
  beforeImage: string;
  afterImage: string;
  title: Bi;
  featured: boolean;
};

export type WpTerm = { slug: string; name_en: string; name_th: string };
export type WpCaseCommon = {
  slug: string;
  menu_order: number;
  treatment: WpTerm | null;
  subcategories: WpTerm[] | null;
  doctor_name: Bi | null;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** English falls back to Thai, and vice versa. */
export const bi = (th: unknown, en: unknown): Bi => {
  const t = str(th);
  const e = str(en);
  return { th: t || e, en: e || t };
};

const term = (t: WpTerm): Term => ({ slug: t.slug, ...bi(t.name_th, t.name_en) });

/** Shared WP → source mapping. Null when no treatment is ticked (shows nowhere). */
export function fromWpCommon(c: WpCaseCommon) {
  if (!c.treatment) return null;
  const doctor = c.doctor_name ? bi(c.doctor_name.th, c.doctor_name.en) : null;
  return {
    slug: c.slug,
    treatment: term(c.treatment),
    subcategories: (c.subcategories ?? []).map(term),
    doctor: doctor && (doctor.th || doctor.en) ? doctor : null,
    order: c.menu_order,
  };
}

type WpCase = WpCaseCommon & { image: { url: string } | null };

const getSources = cache(async (): Promise<CaseSource[]> => {
  if (!wpConfigured()) return MOCK_CASES;
  const all = await wpFetch<WpCase[]>(
    "/wp/v2/case?per_page=100&orderby=menu_order&order=asc" +
      "&_fields=slug,menu_order,image,treatment,subcategories,doctor_name",
    ["case", "doctor"],
  );
  return all.flatMap((c) => {
    const common = fromWpCommon(c);
    // No photo or no treatment → nothing to show.
    return common && c.image?.url ? [{ ...common, image: c.image.url }] : [];
  });
});

function toCard(c: CaseSource, isTH: boolean): CaseCard {
  const pick = (b: Bi) => (isTH ? b.th : b.en);
  const [first, ...rest] = c.subcategories;
  return {
    slug: c.slug,
    image: c.image,
    treatment: pick(c.treatment),
    treatmentSlug: c.treatment.slug,
    subcategory: first ? pick(first) : undefined,
    subcategorySlug: first?.slug,
    tags: rest.length ? rest.map(pick) : undefined,
    doctor: c.doctor ? pick(c.doctor) : "",
    order: c.order,
  };
}

export async function getCases(
  locale: string,
  opts?: { limit?: number },
): Promise<CaseCard[]> {
  const all = await getSources();
  return all.slice(0, opts?.limit ?? all.length).map((c) => toCard(c, locale === "th"));
}

/**
 * Cases for a service page — used by /services/[slug].
 *
 * Matches EITHER field, because the case taxonomy mirrors the service tree:
 *   treatmentSlug     the top-level service   ("surgery")
 *   subcategorySlug   the child service       ("rhinoplasty")
 *
 * ⚠ So a sub-category only shows on a child service page when its term slug
 * equals that service's slug.
 */
export async function getCasesForService(
  locale: string,
  slug: string,
  limit = 3,
): Promise<CaseCard[]> {
  const all = await getCases(locale);
  return all
    .filter((c) => c.treatmentSlug === slug || c.subcategorySlug === slug)
    .slice(0, limit);
}

/**
 * Groups one treatment's cases by sub-category.
 *
 * The ungrouped bucket always sorts last and is dropped when it is the only
 * group — see SubcategoryGroup. Everything else keeps the order cases arrive
 * in (menu_order).
 */
function groupBySubcategory(
  cases: CaseCard[],
  ungroupedTitle: string,
): SubcategoryGroup[] {
  const groups: SubcategoryGroup[] = [];

  for (const c of cases) {
    const slug = c.subcategorySlug ?? UNGROUPED_SLUG;
    const title = c.subcategory ?? ungroupedTitle;
    const existing = groups.find((g) => g.slug === slug);
    if (existing) existing.cases.push(c);
    else groups.push({ slug, title, cases: [c] });
  }

  const named = groups.filter((g) => g.slug !== UNGROUPED_SLUG);
  const ungrouped = groups.find((g) => g.slug === UNGROUPED_SLUG);

  // Only group is the unnamed one → drop the heading entirely.
  if (!named.length) return ungrouped ? [{ ...ungrouped, title: "" }] : [];
  return ungrouped ? [...named, ungrouped] : named;
}

/**
 * Every treatment with cases, each carrying a capped preview set.
 * Used by /before-after.
 *
 * Treatment order follows the SERVICE list, not the case list — so the
 * gallery reads in the same order as /services rather than by whichever case
 * happens to be first. Treatments with no cases are omitted.
 */
export async function getCaseGroups(
  locale: string,
  opts?: { perGroup?: number; ungroupedTitle?: string },
): Promise<TreatmentGroup[]> {
  const perGroup = opts?.perGroup ?? 6;
  const ungroupedTitle =
    opts?.ungroupedTitle ?? (locale === "th" ? "เคสอื่น ๆ" : "More cases");

  const [all, services] = await Promise.all([
    getCases(locale),
    getServices(locale),
  ]);

  return services
    .map((service) => {
      const mine = all.filter((c) => c.treatmentSlug === service.slug);
      return {
        slug: service.slug,
        title: service.title,
        cases: mine.slice(0, perGroup),
        groups: groupBySubcategory(mine, ungroupedTitle),
        total: mine.length,
      };
    })
    .filter((g) => g.total > 0);
}

/**
 * One treatment, grouped by sub-category.
 * Used by /before-after/[treatment].
 *
 * Returns null for a slug that is not a top-level service, so the page can
 * notFound() rather than rendering an empty shell.
 */
export async function getTreatmentGroup(
  locale: string,
  treatmentSlug: string,
  opts?: { ungroupedTitle?: string },
): Promise<TreatmentGroup | null> {
  const ungroupedTitle =
    opts?.ungroupedTitle ?? (locale === "th" ? "เคสอื่น ๆ" : "More cases");

  const [all, services] = await Promise.all([
    getCases(locale),
    getServices(locale),
  ]);

  const service = services.find((s) => s.slug === treatmentSlug);
  if (!service) return null;

  const mine = all.filter((c) => c.treatmentSlug === treatmentSlug);
  return {
    slug: service.slug,
    title: service.title,
    cases: mine,
    groups: groupBySubcategory(mine, ungroupedTitle),
    total: mine.length,
  };
}
