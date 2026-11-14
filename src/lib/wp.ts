/**
 * WordPress (headless CMS at cms.nyc-clinic.com) — the one way the site reads it.
 *
 * Every fetch is cached and TAGGED. Saving in wp-admin makes the CMS call
 * /api/revalidate with the tags that changed (mu-plugin nyc-clinic-core,
 * inc/revalidate.php), so edits show on the next page load. The hourly
 * revalidate below is only a safety net for a missed webhook.
 *
 * Server only: reads WP_API_URL from the environment.
 *
 * Env:
 *   WP_API_URL   https://cms.nyc-clinic.com/wp-json   (no trailing slash needed)
 */

/** Cache tags — one per content type, plus "site" for the Page Manage screens. Must match the CMS. */
export const WP_TAGS = [
  "site",
  "post",
  "page",
  "faq",
  "promotion",
  "doctor",
  "award",
  "service",
  "case",
  "reveal",
] as const;
export type WpTag = (typeof WP_TAGS)[number];

/** Safety-net refresh, in seconds. Webhooks make changes live much sooner. */
const REVALIDATE_SECONDS = 3600;

const API_URL = process.env.WP_API_URL?.replace(/\/+$/, "") ?? "";

/** True when WP_API_URL is set. Fetchers fall back to their built-in content when it isn't (local dev without the CMS). */
export function wpConfigured(): boolean {
  return API_URL !== "";
}

export class WpError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "WpError";
  }
}

/**
 * GET a WordPress REST path, e.g. wpFetch("/nyc/v1/site", ["site"]).
 *
 * Throws on any failure. That is deliberate: during ISR a thrown fetch keeps
 * the last good page online, whereas returning empty data would publish an
 * empty page.
 */
export async function wpFetch<T>(path: string, tags: WpTag[]): Promise<T> {
  if (!API_URL) {
    throw new WpError("WP_API_URL is not set");
  }
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { tags, revalidate: REVALIDATE_SECONDS },
    });
  } catch (err) {
    throw new WpError(`WordPress unreachable: ${url} (${String(err)})`);
  }
  if (!res.ok) {
    throw new WpError(`WordPress ${res.status} for ${url}`, res.status);
  }
  return (await res.json()) as T;
}
