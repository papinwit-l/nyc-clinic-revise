import AwardsShelf from "@/components/shared/AwardsShelf";
import { getAwards } from "@/data/awards";
import { getHome } from "@/data/home";
import TrustStats from "./TrustStats";

type Props = {
  locale: string;
};

export default async function TrustBar({ locale }: Props) {
  const [awards, { stats }] = await Promise.all([getAwards(), getHome(locale)]);
  return (
    <section>
      {/* Stats strip — own client component: the count-up needs an
          IntersectionObserver, and keeping it isolated leaves the rest of
          TrustBar on the server. */}
      <TrustStats stats={stats} locale={locale} />

      {/* ── Industry recognition (white band) ──
          Replaces the certificate marquee. Those SVGs were invented
          placeholders; keeping them beside real awards would mix genuine and
          fabricated trust signals on the section whose whole job is trust.
          They return as a second band once the client supplies real scans
          and permission (project reference §8). */}
      <div className="bg-[var(--color-surface-white)] border-b border-[var(--color-border)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-10 sm:py-12">
          <AwardsShelf locale={locale} awards={awards} />
        </div>
      </div>
    </section>
  );
}
