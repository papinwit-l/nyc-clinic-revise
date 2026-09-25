/**
 * Redirects from the old nycclinic.net site.
 *
 * WHY THIS MATTERS: every source below is an indexed URL with whatever search
 * ranking it has accumulated. Losing them means losing that. This is also the
 * reason treatments became pages rather than anchors — a 301 to a fragment on
 * a six-procedure page passes on very little (see the note on ServiceCard).
 *
 * The old site is Thai-only, so every destination points at /th. Someone
 * arriving from a Thai search result should land in Thai.
 *
 * `permanent: true` issues a 308. Correct here: these moves are final, and a
 * permanent redirect is what transfers ranking.
 *
 * ⚠ NOT YET VERIFIED. This list was assembled from the pages we worked
 * through, not from a crawl of the old site. Before launch, export the full
 * URL list from the old WordPress (or a Search Console coverage report) and
 * check nothing is missing — blog posts and any campaign landing pages in
 * particular, which were never part of this work.
 */

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const LEGACY_REDIRECTS: Redirect[] = [
  // ─── Top-level pages ───
  { source: "/aboutus", destination: "/th/about", permanent: true },
  { source: "/services", destination: "/th/services", permanent: true },

  // ─── Services: the two leaf treatments ───
  {
    source: "/services/surgerythreadnose",
    destination: "/th/services/nose-thread-lift",
    permanent: true,
  },

  // ─── Services: Facial Design ───
  {
    source: "/services/filler",
    destination: "/th/services/filler",
    permanent: true,
  },

  // ─── Services: Surgery ───
  {
    source: "/services/rhinoplasty",
    destination: "/th/services/rhinoplasty",
    permanent: true,
  },
  {
    source: "/services/blepharoplasty",
    destination: "/th/services/blepharoplasty",
    permanent: true,
  },
  {
    // old slug was "lipo"
    source: "/services/lipo",
    destination: "/th/services/liposuction",
    permanent: true,
  },
  {
    source: "/services/chin-augmentation",
    destination: "/th/services/chin-augmentation",
    permanent: true,
  },
  {
    // old slug was "lip-reduction"
    source: "/services/lip-reduction",
    destination: "/th/services/lip-surgery",
    permanent: true,
  },
  {
    // old slug was "grafting-fat"
    source: "/services/grafting-fat",
    destination: "/th/services/fat-transfer",
    permanent: true,
  },

  // ─── Services: Skin ───
  {
    // NOTE: at the ROOT on the old site, not under /services
    source: "/sculptra",
    destination: "/th/services/sculptra",
    permanent: true,
  },
  {
    // NOTE: at the ROOT on the old site, not under /services
    source: "/meso-glass-skin",
    destination: "/th/services/meso-glass-skin",
    permanent: true,
  },
  {
    source: "/services/prp",
    destination: "/th/services/prp",
    permanent: true,
  },
  {
    // old slug was "placenta"
    source: "/services/placenta",
    destination: "/th/services/placenta-gf",
    permanent: true,
  },
  {
    // old slug was "vitamin-iv-drip-therapy"
    source: "/services/vitamin-iv-drip-therapy",
    destination: "/th/services/vitamin-drip",
    permanent: true,
  },
  {
    // Botox. The old slug is a percent-encoded THAI string —
    // "สารลดริ้วรอย-หน้าเรียว". Next matches the DECODED path, so the source
    // below is written decoded; do not re-encode it.
    source: "/services/สารลดริ้วรอย-หน้าเรียว",
    destination: "/th/services/botox",
    permanent: true,
  },
];
