import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ServiceCard } from "@/types/service";

type Props = {
  t: Dictionary["home"]["services"];
  tCommon: Dictionary["common"];
  locale: string;
  data: ServiceCard[];
};

export default function ServicesOverviewV2({
  t,
  tCommon,
  locale,
  data,
}: Props) {
  const isTH = locale === "th";

  // Font follows the TEXT's language, not the page locale.
  const titleFont = isTH ? "var(--font-thai-head)" : "var(--font-body)";
  const subtitleFont = isTH ? "var(--font-body)" : "var(--font-thai-head)";
  const descFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  // Hero tile uses the DISPLAY face for its title (Playfair / Anuphan) —
  // the small cards keep the compact uppercase label. That scale gap is
  // what signals "flagship" vs "the rest".
  const heroTitleFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  // Signature service leads as the large tile; the rest fill the 2×2.
  const hero = data.find((s) => s.signature) ?? data[0];
  const rest = data.filter((s) => s.slug !== hero.slug);

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label" style={{ fontFamily: bodyFont }}>
            {t.label}
          </span>
          <h2
            className="section-heading text-3xl sm:text-4xl mt-3"
            style={{
              fontFamily: isTH
                ? "var(--font-thai-head)"
                : "var(--font-display)",
            }}
          >
            {t.heading}
          </h2>
        </div>

        {/* Bento: signature hero tile (1/2) + 2×2 of the rest (1/2) on desktop.
            On mobile the hero stacks above a 2-col grid of the rest. */}
        <div className="grid gap-5 lg:grid-cols-4 items-stretch">
          {/* ── Signature hero tile — immersive, text over image ── */}
          <Link
            href={`/${locale}/services/${hero.slug}`}
            className="group relative lg:col-span-2 aspect-[4/5] lg:aspect-auto overflow-hidden radius-soft bg-[var(--color-surface-dim)]"
          >
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* navy gradient — lightened; the flagship photo is already dark
                and carries most of the contrast on its own. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,31,58,0.75) 0%, rgba(26,31,58,0.4) 42%, rgba(26,31,58,0.03) 78%)",
              }}
            />
            <span className="badge absolute top-4 left-4">Signature</span>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <h3
                className="text-2xl font-semibold leading-tight text-white"
                style={{ fontFamily: heroTitleFont }}
              >
                {hero.title}
              </h3>
              <p
                className="text-[var(--color-accent-pale)] text-sm sm:text-base mt-1"
                style={{ fontFamily: subtitleFont }}
              >
                {hero.subtitle}
              </p>
              <p
                className="text-white/75 text-sm mt-3 leading-relaxed max-w-sm line-clamp-2"
                style={{ fontFamily: descFont }}
              >
                {hero.desc}
              </p>
              <span
                className="inline-block mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent-pale)] group-hover:text-white transition-colors"
                style={{ fontFamily: bodyFont }}
              >
                {tCommon.learnMore} →
              </span>
            </div>
          </Link>

          {/* ── The rest — clean image-top cards in a 2×2 ── */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-5">
            {rest.map(({ slug, image, title, subtitle, desc }) => (
              <Link
                key={slug}
                href={`/${locale}/services/${slug}`}
                className="group relative flex flex-col overflow-hidden bg-white radius-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3
                    className="text-sm font-semibold tracking-[0.1em] uppercase"
                    style={{ fontFamily: titleFont }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[var(--color-accent)] text-sm mt-0.5"
                    style={{ fontFamily: subtitleFont }}
                  >
                    {subtitle}
                  </p>
                  <p
                    className="text-[var(--color-text-muted)] text-sm mt-3 leading-relaxed"
                    style={{ fontFamily: descFont }}
                  >
                    {desc}
                  </p>
                  <span
                    className="inline-block mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)] transition-colors"
                    style={{ fontFamily: bodyFont }}
                  >
                    {tCommon.learnMore} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/services`}
            className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
