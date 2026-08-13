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
};
