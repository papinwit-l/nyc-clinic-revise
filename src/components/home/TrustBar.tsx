import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  t: Dictionary["home"]["trust"];
};

export default function TrustBar({ t }: Props) {
  const stats = [
    { value: "15+", label: t.experience },
    { value: "10,000+", label: t.cases },
    { value: "4", label: t.specialists },
    { value: "✓", label: t.certified },
  ];

  return (
    <section className="bg-[var(--color-primary-mid)] border-y border-[var(--color-accent-border)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[var(--color-accent-border)]">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center lg:px-6">
              <p className="stat-number text-3xl sm:text-4xl text-[var(--color-accent)]">
                {value}
              </p>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-primary-muted)] mt-2 font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
