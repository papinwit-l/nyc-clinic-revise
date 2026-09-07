import type { Dictionary } from "@/i18n/get-dictionary";
import AwardsShelf from "@/components/shared/AwardsShelf";

type Props = {
  t: Dictionary["home"]["trust"];
  locale: string;
};

export default function TrustBarV2({ t, locale }: Props) {
  const isTH = locale === "th";

  const stats = [
    { value: "15+", label: t.experience, suffix: isTH ? "ปี" : "yrs" },
    { value: "10,000+", label: t.cases },
    { value: "4", label: t.specialists },
    { value: "✓", label: t.certified },
  ];

  return (
    <section>
      {/* ── Stats strip (navy) ── */}
      <div className="bg-[var(--color-primary)] border-y border-[var(--color-accent-border)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[var(--color-accent-border)]">
            {stats.map(({ value, label, suffix }) => (
              <div key={label} className="text-center lg:px-6">
                <p className="stat-number text-3xl sm:text-4xl text-[var(--color-accent)]">
                  {value}
                  {suffix && (
                    <span className="text-lg sm:text-xl font-normal ml-1 tracking-normal">
                      {suffix}
                    </span>
                  )}
                </p>
                <p
                  className={`text-[11px] tracking-[0.12em] uppercase mt-2 font-medium text-[var(--color-on-primary-muted)] ${""}`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
