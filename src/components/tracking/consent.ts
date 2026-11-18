/**
 * Cookie consent, shared by the banner and the footer link.
 * Stored per browser in localStorage; storage can throw (private mode,
 * blocked storage) — then the banner simply asks again next visit.
 */

export const CONSENT_KEY = "nyc-consent";
export const OPEN_EVENT = "nyc:consent-open";

export type ConsentChoice = "granted" | "denied";

export function readConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

type Gtag = (...args: unknown[]) => void;

/** Save the choice and tell Google tags (Consent Mode v2). */
export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* not stored — asked again next visit */
  }
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  w.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  w.dataLayer?.push({ event: "consent_update", consent: choice });
}
