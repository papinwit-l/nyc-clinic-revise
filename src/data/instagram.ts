import type { InstagramPost } from "@/types/instagram";

const IG_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const API_VERSION = "v25.0";
const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

/**
 * Fetch latest posts from @nycclinic via Instagram Graph API.
 * Called server-side only (ISR). media_url is a temporary CDN link
 * that expires — ISR revalidation keeps them fresh.
 */
export async function getInstagramPosts(
  limit: number = 8,
): Promise<InstagramPost[]> {
  if (!IG_ACCOUNT_ID || !ACCESS_TOKEN) {
    console.warn(
      "[Instagram] Missing INSTAGRAM_BUSINESS_ACCOUNT_ID or INSTAGRAM_ACCESS_TOKEN env vars — returning empty feed.",
    );
    return [];
  }

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${IG_ACCOUNT_ID}/media?fields=${FIELDS}&limit=${limit}&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: refresh every 1 hour
    });

    if (!res.ok) {
      console.error(
        `[Instagram] API returned ${res.status}: ${res.statusText}`,
      );
      console.error(res);
      return [];
    }

    const json = await res.json();
    return (json.data ?? []) as InstagramPost[];
  } catch (err) {
    console.error("[Instagram] Fetch failed:", err);
    return [];
  }
}
