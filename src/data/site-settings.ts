import { cache } from "react";
import { wpConfigured, wpFetch } from "@/lib/wp";
import {
  DEFAULT_SITE_SETTINGS,
  phoneToHref,
  type SiteSettings,
} from "@/lib/site";

/**
 * Site Settings from WordPress (Page Manage → Site Settings).
 *
 * Source: GET /wp-json/nyc/v1/site → `settings` (mu-plugin, inc/rest.php).
 * Cache tag: "site".
 *
 * Wrapped in React cache(): the header widget, footer and page body all ask
 * for it during one render, and they share one result.
 *
 * Without WP_API_URL (local dev) it returns DEFAULT_SITE_SETTINGS.
 */

/** Field names exactly as the CMS sends them (config/pods.json → nyc_site). */
type RawSiteSettings = {
  line_url: string;
  line_id: string;
  phone: string;
  address_th: string;
  address_en: string;
  hours_1_days_th: string;
  hours_1_days_en: string;
  hours_1_time_th: string;
  hours_1_time_en: string;
  hours_2_days_th: string;
  hours_2_days_en: string;
  hours_2_time_th: string;
  hours_2_time_en: string;
  map_embed: string;
  map_url: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  gtm_id: string;
};

/** Trimmed text; Windows line breaks from the textarea become plain spaces. */
const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/\s*\r?\n\s*/g, " ").trim() : "";

/** English falls back to Thai (project rule: Thai-only content still shows on /en). */
const pair = (th: unknown, en: unknown) => {
  const t = clean(th);
  return { th: t, en: clean(en) || t };
};

/** Required values fall back to the built-in default rather than render blank. */
const orDefault = (v: unknown, fallback: string) => clean(v) || fallback;

function toSiteSettings(raw: Partial<RawSiteSettings>): SiteSettings {
  const d = DEFAULT_SITE_SETTINGS;
  const phone = orDefault(raw.phone, d.phone);

  const hours = ([1, 2] as const)
    .map((n) => ({
      days: pair(raw[`hours_${n}_days_th`], raw[`hours_${n}_days_en`]),
      time: pair(raw[`hours_${n}_time_th`], raw[`hours_${n}_time_en`]),
    }))
    .filter((row) => row.days.th || row.time.th);

  const address = pair(raw.address_th, raw.address_en);

  return {
    lineUrl: orDefault(raw.line_url, d.lineUrl),
    lineId: orDefault(raw.line_id, d.lineId),
    phone,
    phoneHref: phoneToHref(phone),
    social: {
      facebook: clean(raw.facebook),
      instagram: clean(raw.instagram),
      tiktok: clean(raw.tiktok),
      youtube: clean(raw.youtube),
    },
    gtmId: /^GTM-[A-Z0-9]{4,}$/i.test(clean(raw.gtm_id)) ? clean(raw.gtm_id).toUpperCase() : "",
    clinic: {
      name: d.clinic.name,
      branch: d.clinic.branch,
      address: address.th ? address : d.clinic.address,
      hours: hours.length ? hours : d.clinic.hours,
      mapEmbed: orDefault(raw.map_embed, d.clinic.mapEmbed),
      mapUrl: orDefault(raw.map_url, d.clinic.mapUrl),
    },
  };
}

/**
 * The whole /nyc/v1/site payload — Site Settings, Home and About in one
 * request, shared by every fetcher that reads a Page Manage screen.
 * Only call when wpConfigured().
 */
export const getSitePayload = cache(() =>
  wpFetch<{
    settings?: Partial<RawSiteSettings>;
    home?: Record<string, unknown>;
    about?: Record<string, unknown>;
  }>("/nyc/v1/site", ["site"]),
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!wpConfigured()) return DEFAULT_SITE_SETTINGS;
  const data = await getSitePayload();
  return toSiteSettings(data.settings ?? {});
});
