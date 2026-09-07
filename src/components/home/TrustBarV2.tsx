import type { Dictionary } from "@/i18n/get-dictionary";
import AwardsShelf from "@/components/shared/AwardsShelf";
import TrustStats from "./TrustStats";

type Props = {
  t: Dictionary["home"]["trust"];
  locale: string;
};

export default function TrustBarV2({ t, locale }: Props) {
  return (
    <section>
      {/* Stats strip — own client component: the count-up needs an
          IntersectionObserver, and keeping it isolated leaves the rest of
          TrustBar on the server. */}
      <TrustStats t={t} locale={locale} />

      {/* ── Industry recognition (white band) ──
          Replaces the certificate marquee. Those SVGs were invented
          placeholders; keeping them beside real awards would mix genuine and
          fabricated trust signals on the section whose whole job is trust.
          They return as a second band once the client supplies real scans
          and permission (project reference §8). */}
      <div className="bg-[var(--color-surface-white)] border-b border-[var(--color-border)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-10 sm:py-12">
          <AwardsShelf locale={locale} />
        </div>
      </div>
    </section>
  );
}
