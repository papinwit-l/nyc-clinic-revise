import type { SiteSettings } from "./site";
import { SITE_URL } from "./site";
import type { Doctor } from "@/types/doctor";
import type { ServiceCard } from "@/types/service";

/**
 * schema.org data for Google. Everything comes from Site Settings / WP
 * content, so it never disagrees with what the page shows.
 *
 * Doctors are `Person`, not `Physician`: in schema.org a Physician is a
 * practice (an organisation); a person who is a doctor is a Person with a
 * medical job title working for the clinic.
 */

export const CLINIC_ID = `${SITE_URL}/#clinic`;

const abs = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u}`);

/** "…!2d100.577…!3d13.732…" in a Google Maps embed URL → coordinates. */
function geoFromEmbed(embed: string) {
  const lng = embed.match(/!2d(-?\d+(?:\.\d+)?)/)?.[1];
  const lat = embed.match(/!3d(-?\d+(?:\.\d+)?)/)?.[1];
  return lat && lng
    ? { "@type": "GeoCoordinates", latitude: Number(lat), longitude: Number(lng) }
    : undefined;
}

export function clinicLd(site: SiteSettings, locale: string, image: string) {
  const isTH = locale === "th";
  const c = site.clinic;
  // Address fields sometimes start with the clinic name; schema wants the street only.
  const street = (isTH ? c.address.th : c.address.en)
    .replace(c.name, "")
    .replace(/^NYC Clinic\s*(\([^)]*\))?\s*/i, "")
    .trim();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: "NYC Clinic",
    alternateName: "New York Clinic, GR",
    url: `${SITE_URL}/${locale}`,
    image: abs(image),
    telephone: site.phoneHref.replace(/^tel:/, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: isTH ? "กรุงเทพมหานคร" : "Bangkok",
      postalCode: street.match(/\b\d{5}\b/)?.[0],
      addressCountry: "TH",
    },
    geo: geoFromEmbed(c.mapEmbed),
    hasMap: c.mapUrl || undefined,
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function doctorsLd(doctors: Doctor[], locale: string) {
  const isTH = locale === "th";
  return {
    "@context": "https://schema.org",
    "@graph": doctors.map((d) => ({
      "@type": "Person",
      name: isTH ? d.fullNameTh || d.nameTh : d.fullNameEn || d.nameEn,
      alternateName: isTH ? d.nameTh : d.nameEn,
      jobTitle: (isTH ? d.specialtyTh : d.specialty) || undefined,
      image: d.image ? abs(d.image) : undefined,
      worksFor: { "@id": CLINIC_ID },
      url: `${SITE_URL}/${locale}/doctors`,
    })),
  };
}

/** Service page: the procedure + breadcrumb trail. */
export function serviceLd(
  service: ServiceCard,
  locale: string,
  crumbs: { name: string; path: string }[],
) {
  const url = `${SITE_URL}/${locale}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": `${url}#procedure`,
        name: service.title,
        alternateName: service.subtitle || undefined,
        description: service.seoDesc || service.summary || undefined,
        image: service.image ? abs(service.image) : undefined,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}/${locale}${c.path}`,
        })),
      },
    ],
  };
}
