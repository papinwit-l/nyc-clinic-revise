import type { GoogleReviews, GoogleReview } from "@/types/google-review";

/**
 * Google rating + reviews for the clinic — Places API (New), Place Details.
 *
 * Env (server only — never NEXT_PUBLIC_):
 *   GOOGLE_PLACES_API_KEY   key restricted to "Places API (New)"
 *   GOOGLE_PLACE_ID         ChIJuSM7Vauf4jARGj0ttDATPA0 (NYC Clinic)
 *
 * COST: requesting `reviews` bills the "Place Details Enterprise + Atmosphere"
 * SKU — 1,000 free requests a month. Cached for a day per locale, so ~60 a
 * month. The cache is what keeps this free: never call this from a client
 * component or a route that opts out of caching. A daily quota cap (100) is
 * set in Google Cloud as the backstop.
 *
 * WHAT GOOGLE RETURNS: the overall rating and count, and at most FIVE reviews
 * of Google's choosing ("most relevant"). They can't be picked or paged.
 *
 * DISPLAY TERMS: show the reviews as returned — text unedited, with author
 * name, photo and time — plus Google attribution and a link to the listing.
 *
 * SELECTION (clinic's decision, Nov 2026): of the five, only 5-star reviews
 * with text are shown, newest first. Usually that leaves 2–4; on a day with
 * none, the section shows the rating badge alone. The overall rating and
 * count are NOT affected — they cover every review on Google.
 *
 * Failure → null, and the homepage hides the section. Deliberately no
 * fallback to hand-written testimonials.
 */

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const FIELDS = "rating,userRatingCount,googleMapsUri,reviews";

type ApiReview = {
  name: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text: string; languageCode?: string };
  originalText?: { text: string; languageCode?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  publishTime?: string;
  googleMapsUri?: string;
};

type ApiPlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: ApiReview[];
};

function toReview(r: ApiReview): GoogleReview | null {
  // The reviewer's own words, not Google's machine translation. The card sets
  // the typeface from `lang` (font follows language, not page locale).
  const source = r.originalText ?? r.text;
  const text = source?.text?.trim();
  if (!text) return null;

  return {
    id: r.name,
    text,
    lang: source?.languageCode?.startsWith("th") ? "th" : "en",
    rating: Math.round(r.rating ?? 0),
    author: r.authorAttribution?.displayName ?? "Google user",
    authorUrl: r.authorAttribution?.uri,
    authorPhoto: r.authorAttribution?.photoUri,
    time: r.relativePublishTimeDescription ?? "",
    published: r.publishTime ?? "",
    url: r.googleMapsUri,
  };
}

export async function getGoogleReviews(
  locale: string,
): Promise<GoogleReviews | null> {
  if (!API_KEY || !PLACE_ID) {
    console.warn(
      "[Google reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — section hidden.",
    );
    return null;
  }

  try {
    // languageCode only affects the relative time ("2 months ago" /
    // "2 เดือนที่แล้ว") and the translated `text`, which isn't used.
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${locale === "th" ? "th" : "en"}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": FIELDS,
        },
        next: { revalidate: 86400, tags: ["google-reviews"] },
      },
    );

    if (!res.ok) {
      // Log Google's message only — never the request, which carries the key.
      const body = await res.json().catch(() => null);
      console.error(
        `[Google reviews] ${res.status}: ${body?.error?.message ?? res.statusText}`,
      );
      return null;
    }

    const place = (await res.json()) as ApiPlace;
    if (!place.rating || !place.userRatingCount) return null;

    return {
      rating: place.rating,
      total: place.userRatingCount,
      url: place.googleMapsUri ?? "",
      reviews: (place.reviews ?? [])
        .map(toReview)
        .filter((r): r is GoogleReview => r !== null && r.rating === 5)
        .sort((a, b) => b.published.localeCompare(a.published)),
    };
  } catch (err) {
    console.error(
      "[Google reviews] fetch failed:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}
