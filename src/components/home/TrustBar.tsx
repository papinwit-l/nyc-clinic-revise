import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";

// Mockup certificates — replace with real scans once client provides them.
// See project reference §8: pending permission + higher-res individual files.
const CERTIFICATES = [
  {
    src: "/images/certificates/cert-mfu.svg",
    alt: "Mae Fah Luang University — Anti-Aging & Regenerative Medicine",
  },
  {
    src: "/images/certificates/cert-rcs.svg",
    alt: "Royal College of Surgeons — Aesthetic Surgery Fellowship",
  },
  {
    src: "/images/certificates/cert-miracu.svg",
    alt: "MIRACU Thread Lifting — Certified Master Trainer",
  },
  {
    src: "/images/certificates/cert-smmt.svg",
    alt: "Society of Mesotherapy Management Thailand — Active Member",
  },
  {
    src: "/images/certificates/cert-aad.svg",
    alt: "American Academy of Dermatology — CME Training",
  },
];

type Props = {
  t: Dictionary["home"]["trust"];
  locale: string;
};

export default function TrustBar({ t, locale }: Props) {
  const isTH = locale === "th";

  const stats = [
    { value: "15+", label: t.experience, suffix: isTH ? "ปี" : "yrs" },
    { value: "10,000+", label: t.cases },
    { value: "4", label: t.specialists },
    { value: "✓", label: t.certified },
  ];

  return (
    <section>
      {/* ── Continuous scroll keyframes ── */}
      <style>{`
        @keyframes cert-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cert-track {
          display: flex;
          width: max-content;
          animation: cert-scroll 35s linear infinite;
        }
        .cert-slider:hover .cert-track {
          animation-play-state: paused;
        }
        .cert-slider {
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-track {
            animation: none;
          }
        }
      `}</style>

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
                  className={`text-[11px] tracking-[0.12em] uppercase mt-2 font-medium text-[var(--color-on-primary-muted)] ${
                    isTH ? "font-[var(--font-thai-body)]" : ""
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certificate slider (cream bg, continuous loop) ── */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="py-6 sm:py-8 overflow-hidden cert-slider">
          {/* Track is doubled — first set + clone — so the seam is invisible.
              translateX(-50%) brings clone into view = seamless loop. */}
          <div className="cert-track">
            {[...CERTIFICATES, ...CERTIFICATES].map((cert, i) => (
              <div
                key={`${cert.src}-${i}`}
                className="shrink-0 px-4 sm:px-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={200}
                  height={140}
                  className="h-24 sm:h-28 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
