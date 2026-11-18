import ConsentBanner from "./ConsentBanner";
import ClickEvents from "./ClickEvents";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CONSENT_KEY } from "./consent";

/**
 * Google Tag Manager + Consent Mode v2 + cookie banner + click events.
 * Rendered only when Site Settings has a GTM ID — otherwise nothing loads.
 *
 * Order inside the one inline script matters: consent defaults (all denied)
 * are set BEFORE gtm.js loads, then a returning visitor's saved choice is
 * applied. Tags inside GTM respect consent, so nothing tracks until the
 * visitor accepts (PDPA).
 *
 * dataLayer events for the SEO team's GTM triggers:
 *   line_click   { link_url, page_path, link_text }   any link to LINE
 *   phone_click  { link_url, page_path, link_text }   any tel: link
 *   consent_update { consent: "granted" | "denied" }
 */
export default function Tracking({
  gtmId,
  t,
  privacyHref,
}: {
  gtmId: string;
  t: Dictionary["consent"];
  privacyHref: string;
}) {
  const id = JSON.stringify(gtmId);
  const key = JSON.stringify(CONSENT_KEY);
  return (
    <>
      {/* Plain inline script in the server HTML: runs as the page is parsed,
          before any tag can fire. (next/script inline scripts are injected
          client-side later — too late for consent defaults.) */}
      <script
        id="gtm"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{var c=localStorage.getItem(${key});if(c==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${id});`,
        }}
      />
      <ConsentBanner t={t} privacyHref={privacyHref} isTH={privacyHref.startsWith("/th")} />
      <ClickEvents />
    </>
  );
}
