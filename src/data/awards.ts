// Industry recognition — supplier and distributor awards.
//
// NOTE ON WORDING: four of the six are engraved "Valued Customer" or
// "Exclusive Customer" — they recognise the clinic as a significant purchaser,
// not as holding a clinical qualification. Headings and labels must not imply
// accreditation. Training/professional certificates are a separate set and
// belong under their own heading once the client supplies real scans.
//
// Files are PNG with alpha — do NOT convert to JPG, the transparency is what
// lets them sit on the band without white boxes.

export type Award = {
  slug: string;
  src: string;
  year: string;
  /** Short label under the image. Bilingual: awarding body / programme. */
  titleEn: string;
  titleTh: string;
  /** Full engraved text — used for alt and the enlarge view. */
  engravedEn: string;
  /** Intrinsic size, for correct aspect reservation. */
  width: number;
  height: number;
};

export const AWARDS: Award[] = [
  {
    slug: "2014-thread-lift",
    src: "/images/awards/award-2014-thread-lift.png",
    year: "2014",
    titleEn: "Thread Lift",
    titleTh: "ร้อยไหม",
    engravedEn:
      "Certified Thread Lift — Valued Customer 2014, presented to Dr. Isreey Muangmanee",
    width: 1312,
    height: 1199,
  },
  {
    slug: "2015-nose-thread-lift",
    src: "/images/awards/award-2015-nose-thread-lift.png",
    year: "2015",
    titleEn: "Nose Thread Lift",
    titleTh: "ร้อยไหมจมูก",
    engravedEn:
      "Certified Nose Thread Lift — Valued Customer 2015, presented to Dr. Isreey Muangmanee",
    width: 1312,
    height: 1199,
  },
  {
    slug: "2018-hifu",
    src: "/images/awards/award-2018-hifu-star-of-excellence.png",
    year: "2018",
    titleEn: "HIFU — Star of Excellence",
    titleTh: "HIFU — Star of Excellence",
    engravedEn: "HIFU — NYC New York Clinic 2018, The Star of Excellence Award",
    width: 1025,
    height: 1535,
  },
  {
    slug: "2019-aestec-pharma",
    src: "/images/awards/award-2019-aestec-pharma.png",
    year: "2019",
    titleEn: "Aestec Pharma",
    titleTh: "Aestec Pharma",
    engravedEn:
      "Aestec Pharma — NYC New York Clinic, Exclusive Customer Award 2019",
    width: 1025,
    height: 1535,
  },
  {
    slug: "2022-innovation-beauty",
    src: "/images/awards/award-2022-innovation-beauty.png",
    year: "2022",
    titleEn: "Innovation Beauty",
    titleTh: "Innovation Beauty",
    engravedEn:
      "Innovation Beauty — Valued Customer Award 2022, presented to NYC Clinic",
    width: 1025,
    height: 1535,
  },
  {
    slug: "2023-innovation-beauty",
    src: "/images/awards/award-2023-innovation-beauty-excellence.png",
    year: "2023",
    titleEn: "Honoring Excellence",
    titleTh: "Honoring Excellence",
    engravedEn:
      "Innovation Beauty — Honoring Excellence Award 2023, presented to NYC Clinic",
    width: 1534,
    height: 1025,
  },
];
