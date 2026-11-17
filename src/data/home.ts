import { cache } from "react";
import { wpConfigured } from "@/lib/wp";
import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getSitePayload } from "./site-settings";

/**
 * Page Manage → Home: Trust Bar numbers and the clinic intro (homepage About
 * section). Cache tag "site". Hero lives in src/data/hero.ts.
 *
 * Fallbacks, per item:
 *   - English empty → Thai (and the other way round)
 *   - both empty    → the built-in text in the dictionary
 *   - a stat with no number, or a pillar with no title → that whole item is
 *     the built-in one, so the section always has three
 */

export type TrustStat = {
  to: number;
  suffix?: string;
  unit?: string;
  label: string;
};

/** Homepage About section text — the dictionary's shape, as plain strings. */
export type HomeAbout = {
  quote: string;
  quoteName: string;
  quoteRole: string;
  bio: string;
  cta: string;
  pillars: { title: string; desc: string }[];
};

export type HomeContent = {
  stats: TrustStat[];
  about: HomeAbout;
};

const builtInStats = (t: Dictionary["home"]["trust"], isTH: boolean): TrustStat[] => [
  { to: 20, suffix: "+", unit: isTH ? "ปี" : "yrs", label: t.experience },
  { to: 50000, suffix: "+", label: t.cases },
  { to: 4, label: t.specialists },
];

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const getHome = cache(async (locale: string): Promise<HomeContent> => {
  const isTH = locale === "th";
  const t = (await getDictionary(locale as Locale)).home;
  const stats = builtInStats(t.trust, isTH);
  if (!wpConfigured())
    return { stats, about: { ...t.about, pillars: [...t.about.pillars] } };

  const { home = {} } = await getSitePayload();
  /** This locale's text for a TH/EN pair, the other language as fallback. */
  const pick = (base: string) => {
    const th = str(home[`${base}_th`]);
    const en = str(home[`${base}_en`]);
    return isTH ? th || en : en || th;
  };

  const wpStats = stats.map((builtIn, i): TrustStat => {
    const n = home[`stat_${i + 1}_value`];
    if (typeof n !== "number" || !Number.isFinite(n)) return builtIn;
    const p = `stat_${i + 1}`;
    return {
      to: n,
      suffix: str(home[`${p}_suffix`]) || undefined,
      unit: pick(`${p}_unit`) || undefined,
      label: pick(`${p}_label`) || builtIn.label,
    };
  });

  const a: HomeAbout = { ...t.about, pillars: [...t.about.pillars] };
  return {
    stats: wpStats,
    about: {
      ...a,
      quote: pick("quote") || a.quote,
      quoteName: pick("quote_name") || a.quoteName,
      quoteRole: pick("quote_role") || a.quoteRole,
      bio: pick("bio") || a.bio,
      pillars: a.pillars.map((builtIn, i) => {
        const title = pick(`pillar_${i + 1}_title`);
        return title ? { title, desc: pick(`pillar_${i + 1}_desc`) } : builtIn;
      }),
    },
  };
});
