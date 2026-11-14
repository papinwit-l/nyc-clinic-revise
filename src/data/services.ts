import { cache } from "react";
import type { ServiceCard, ServiceDetail } from "@/types/service";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { getServiceFaqs } from "./faq";
import { MOCK_SERVICES } from "./mock/services";

/**
 * Services from WordPress (wp-admin → Services). Cache tags: "service", plus
 * "faq" for each service page's FAQ block.
 *
 * One record per service, categories and treatments alike, related by the
 * native WordPress parent (see ServiceCard in types/service.ts). Order is the
 * drag order in wp-admin (menu_order).
 *
 * Field map (config/pods.json → service):
 *   title, desc, summary, points, intro, good_for, benefits, areas   TH/EN pairs
 *   facts, showcase                    repeaters, both languages per row
 *   image, signature                   shared
 *   subtitle                           not a field: the other language's title
 *   detail.faq                         FAQ entries ticked onto this service
 *
 * ⚠ CONTENT WARNINGS (claims deliberately removed for Thai medical-advertising
 * rules, unresolved clinical figures) live at the top of
 * data/mock/services.ts and in cms/README.md. Read them before restoring any
 * copy from the old site.
 *
 * Without WP_API_URL (local dev) the old in-code content is served instead.
 */

type Lang = "th" | "en";

/** One service, both languages, normalised from WordPress or the mock. */
type Source = {
  /** WordPress ID — 0 for mock data. Links service FAQs. */
  id: number;
  slug: string;
  parent: string;
  image: string;
  signature: boolean;
  text: Record<Lang, {
    title: string;
    desc: string;
    summary: string;
    points: string[];
    detail?: ServiceDetail;
  }>;
};

// ── WordPress ──────────────────────────────────────────────────────────────

type WpImage = { url: string } | null;
type WpService = {
  id: number;
  slug: string;
  parent: number;
  image: WpImage;
  signature: boolean;
  facts: { label_th: string; label_en: string; value_th: string; value_en: string }[];
  showcase: { title_th: string; title_en: string; image: WpImage }[];
} & Record<
  `${"title" | "desc" | "summary" | "intro"}_${Lang}`,
  string
> &
  Record<`${"points" | "good_for" | "benefits" | "areas"}_${Lang}`, string[] | null>;

const FIELDS = [
  "id,slug,parent,image,signature,facts,showcase",
  ...["title", "desc", "summary", "intro", "points", "good_for", "benefits", "areas"].flatMap(
    (f) => [`${f}_th`, `${f}_en`],
  ),
].join(",");

const str = (v: unknown) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim() : "";
/** Pods returns an empty repeatable field as [""] — drop blanks. */
const list = (v: unknown) =>
  Array.isArray(v) ? v.map(str).filter(Boolean) : [];
/** Prefer the asked language, fall back to the other (Thai-only still shows on /en). */
const pick = <T,>(want: T, other: T, empty: (x: T) => boolean) =>
  empty(want) ? other : want;

function fromWp(s: WpService, slugById: Map<number, string>): Source {
  const lang = (l: Lang) => {
    const o: Lang = l === "th" ? "en" : "th";
    const t = (f: "title" | "desc" | "summary" | "intro") =>
      pick(str(s[`${f}_${l}`]), str(s[`${f}_${o}`]), (x) => !x);
    const l2 = (f: "points" | "good_for" | "benefits" | "areas") =>
      pick(list(s[`${f}_${l}`]), list(s[`${f}_${o}`]), (x) => !x.length);

    const detail: ServiceDetail = {};
    const intro = t("intro").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (intro.length) detail.intro = intro;
    const facts = (s.facts ?? [])
      .map((f) => ({
        label: str(f[`label_${l}`]) || str(f[`label_${o}`]),
        value: str(f[`value_${l}`]) || str(f[`value_${o}`]),
      }))
      .filter((f) => f.label || f.value);
    if (facts.length) detail.facts = facts;
    const goodFor = l2("good_for");
    if (goodFor.length) detail.goodFor = goodFor;
    const benefits = l2("benefits");
    if (benefits.length) detail.benefits = benefits;
    const areas = l2("areas");
    if (areas.length) detail.areas = areas;
    const showcase = (s.showcase ?? [])
      .map((c) => {
        const title = str(c[`title_${l}`]) || str(c[`title_${o}`]);
        return c.image?.url ? { title, image: c.image.url } : { title };
      })
      .filter((c) => c.title);
    if (showcase.length) detail.showcase = showcase;

    return {
      title: t("title"),
      desc: t("desc"),
      summary: t("summary"),
      points: l2("points"),
      detail: Object.keys(detail).length ? detail : undefined,
    };
  };
  return {
    id: s.id,
    slug: s.slug,
    parent: s.parent ? (slugById.get(s.parent) ?? "") : "",
    image: s.image?.url ?? "",
    signature: !!s.signature,
    text: { th: lang("th"), en: lang("en") },
  };
}

// ── Mock fallback (no CMS configured) ──────────────────────────────────────

function fromMock(m: (typeof MOCK_SERVICES)[number]): Source {
  return {
    id: 0,
    slug: m.slug,
    parent: "parent" in m ? (m.parent as string) : "",
    image: m.image,
    signature: "signature" in m ? !!m.signature : false,
    text: {
      th: {
        title: m.title_th,
        desc: m.desc_th,
        summary: m.summary_th,
        points: m.points_th,
        detail: "detail_th" in m ? (m.detail_th as ServiceDetail) : undefined,
      },
      en: {
        title: m.title_en,
        desc: m.desc_en,
        summary: m.summary_en,
        points: m.points_en,
        detail: "detail_en" in m ? (m.detail_en as ServiceDetail) : undefined,
      },
    },
  };
}

// ── Load ───────────────────────────────────────────────────────────────────

/** Every service in drag order. One request — the whole set is small. */
const getSources = cache(async (): Promise<Source[]> => {
  if (!wpConfigured()) return MOCK_SERVICES.map(fromMock);
  const all = await wpFetch<WpService[]>(
    `/wp/v2/service?per_page=100&orderby=menu_order&order=asc&_fields=${FIELDS}`,
    ["service"],
  );
  const slugById = new Map(all.map((s) => [s.id, s.slug]));
  return all.map((s) => fromWp(s, slugById));
});

async function toCard(src: Source, locale: string): Promise<ServiceCard> {
  const isTH = locale === "th";
  const own = isTH ? src.text.th : src.text.en;
  const other = isTH ? src.text.en : src.text.th;

  let detail = own.detail;
  if (src.id) {
    // WordPress: the FAQ block comes from FAQ entries ticked onto this service.
    const faq = await getServiceFaqs(locale, src.id);
    if (faq.length) detail = { ...detail, faq: faq.map(({ q, a }) => ({ q, a })) };
  }

  return {
    slug: src.slug,
    image: src.image,
    title: own.title,
    // The subtitle is the same name in the other language.
    subtitle: other.title,
    desc: own.desc,
    points: own.points,
    summary: own.summary,
    signature: src.signature || undefined,
    parent: src.parent || undefined,
    detail,
  };
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Top-level services only, each with its children resolved. */
export async function getServices(locale: string): Promise<ServiceCard[]> {
  const all = await Promise.all((await getSources()).map((s) => toCard(s, locale)));
  return all
    .filter((s) => !s.parent)
    .map((s) => ({ ...s, children: all.filter((c) => c.parent === s.slug) }));
}

/** One service by slug — parent or child. Children of a parent are resolved. */
export async function getService(
  locale: string,
  slug: string,
): Promise<ServiceCard | null> {
  const sources = await getSources();
  const src = sources.find((s) => s.slug === slug);
  if (!src) return null;
  const card = await toCard(src, locale);
  if (card.parent) return card;
  return {
    ...card,
    children: await Promise.all(
      sources.filter((c) => c.parent === slug).map((c) => toCard(c, locale)),
    ),
  };
}

/** The parent of a child service, for breadcrumbs and back-links. */
export async function getParentService(
  locale: string,
  parentSlug: string,
): Promise<ServiceCard | null> {
  const src = (await getSources()).find((s) => s.slug === parentSlug);
  return src ? toCard(src, locale) : null;
}

/** Every slug — parents AND children — for generateStaticParams. */
export async function getServiceSlugs(): Promise<string[]> {
  return (await getSources()).map((s) => s.slug);
}
