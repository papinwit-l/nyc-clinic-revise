import { cache } from "react";
import type { Doctor } from "@/types/doctor";
import { wpConfigured, wpFetch } from "@/lib/wp";
import { getServiceSlugById } from "./services";
import { MOCK_DOCTORS } from "./mock/doctors";

/**
 * Doctors from WordPress (wp-admin → Doctors), in drag order. Cache tag:
 * "doctor".
 *
 * A Doctor carries both languages (nameEn/nameTh, …); components pick per
 * locale. English falls back to Thai field by field, so a doctor entered in
 * Thai only still shows on /en.
 *
 * Without WP_API_URL (local dev) the in-code list is served instead.
 */

type WpDoctor = {
  slug: string;
  photo: { url: string } | null;
  featured: boolean;
  services: number[] | null;
  credentials: { th: string; en: string }[];
  experience: string;
} & Record<
  `${"name" | "full_name" | "specialty" | "bio"}_${"th" | "en"}`,
  string
>;

const FIELDS = [
  "slug,photo,featured,services,credentials,experience",
  ...["name", "full_name", "specialty", "bio"].flatMap((f) => [`${f}_th`, `${f}_en`]),
].join(",");

const str = (v: unknown) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim() : "";

async function fromWp(d: WpDoctor): Promise<Doctor> {
  const th = (f: "name" | "full_name" | "specialty" | "bio") => str(d[`${f}_th`]);
  const en = (f: "name" | "full_name" | "specialty" | "bio") =>
    str(d[`${f}_en`]) || th(f);
  const slugs = await Promise.all(
    (Array.isArray(d.services) ? d.services : []).map(getServiceSlugById),
  );
  const bioTh = th("bio");
  const bioEn = en("bio");
  return {
    slug: d.slug,
    image: d.photo?.url ?? "",
    nameEn: en("name"),
    nameTh: th("name"),
    fullNameEn: en("full_name"),
    fullNameTh: th("full_name"),
    specialty: en("specialty"),
    specialtyTh: th("specialty"),
    experience: str(d.experience),
    credentials: (d.credentials ?? [])
      .map((c) => ({ th: str(c.th), en: str(c.en) || str(c.th) }))
      .filter((c) => c.th || c.en),
    // A linked service that was later deleted is simply dropped.
    services: slugs.filter((s): s is string => !!s),
    featured: d.featured || undefined,
    bioTh: bioTh || undefined,
    bioEn: bioEn || undefined,
  };
}

/** All doctors, in the admin's drag order. */
export const getDoctors = cache(async (): Promise<Doctor[]> => {
  if (!wpConfigured()) return MOCK_DOCTORS;
  const all = await wpFetch<WpDoctor[]>(
    `/wp/v2/doctor?per_page=100&orderby=menu_order&order=asc&_fields=${FIELDS}`,
    ["doctor"],
  );
  return Promise.all(all.map(fromWp));
});
