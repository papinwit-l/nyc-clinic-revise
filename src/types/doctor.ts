export type Doctor = {
  slug: string;
  image: string;
  nameEn: string;
  nameTh: string;
  fullNameEn: string;
  fullNameTh: string;
  specialty: string;
  specialtyTh: string;
  experience: string;
  credentials: { en: string; th: string }[];
  services: string[];
  /** Homepage featured card — only Dr. Jing should be true */
  featured?: boolean;
  /** Short bio for featured card — placeholder, needs client review */
  bioEn?: string;
  bioTh?: string;
};
