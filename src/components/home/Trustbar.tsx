const STATS = [
  { value: "15+", labelEn: "Years Experience", labelTh: "ปีแห่งประสบการณ์" },
  { value: "10,000+", labelEn: "Nose Thread Cases", labelTh: "เคสร้อยไหมจมูก" },
  { value: "4", labelEn: "Specialists", labelTh: "แพทย์ผู้เชี่ยวชาญ" },
  { value: "✓", labelEn: "Board-Certified", labelTh: "แพทย์เฉพาะทาง" },
] as const;

export default function TrustBar() {
  return (
    <section className="bg-[var(--color-primary-mid)] border-y border-[var(--color-accent-border)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[var(--color-accent-border)]">
          {STATS.map(({ value, labelEn, labelTh }) => (
            <div key={labelEn} className="text-center lg:px-6">
              <p className="stat-number text-3xl sm:text-4xl text-[var(--color-accent)]">
                {value}
              </p>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-primary-muted)] mt-2 font-medium">
                {labelEn}
              </p>
              <p className="font-[var(--font-thai-body)] text-xs text-[var(--color-on-primary-muted)] opacity-60 mt-0.5">
                {labelTh}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
