import Image from "next/image";
import type { Doctor } from "@/types/doctor";
import type { Dictionary } from "@/i18n/get-dictionary";
import CountUp from "@/components/shared/CountUp";
import InView from "@/components/shared/InView";

/**
 * Lead specialist block. Four things separate it from DoctorCard, and the
 * separation is deliberate — one of them alone wouldn't read as hierarchy:
 *   1. a 2-of-5 column against the team's fixed 200px portrait
 *   2. the navy backing plate
 *   3. the Lead Specialist badge
 *   4. the stats — only the lead carries these
 * It also sits on --color-surface while the team sits on --color-surface-dim,
 * so it is literally the brighter part of the page.
 */

type Props = {
  doctor: Doctor;
  t: Dictionary["doctor"];
  locale: string;
};

export default function DoctorLead({ doctor, t, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <article
      id={doctor.slug}
      className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 lg:items-start scroll-mt-28"
    >
      <InView variant="rise" className="lg:col-span-2">
        <div className="relative max-w-md mx-auto lg:mx-0">
          <span
            aria-hidden
            className="absolute inset-0 translate-y-4 translate-x-4 bg-[var(--color-primary)]"
          />
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-surface-dim)] radius-soft">
            <Image
              src={doctor.image}
              alt={`${doctor.nameEn} — ${doctor.nameTh}`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </div>
        </div>
      </InView>

      <div className="lg:col-span-3">
        <span className="badge">
          {isTH ? "แพทย์ผู้เชี่ยวชาญหลัก" : "Lead Specialist"}
        </span>

        <h2
          className="text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.15] mt-5 text-[var(--color-primary)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            letterSpacing: "-0.005em",
          }}
        >
          {doctor.fullNameEn}
        </h2>
        <p
          className="text-[var(--color-accent)] text-base sm:text-lg mt-1.5"
          style={{ fontFamily: "var(--font-thai-head)", fontWeight: 500 }}
        >
          {doctor.fullNameTh}
        </p>

        <div className="divider-accent mt-4 mb-5" />

        <p
          className={`text-[var(--color-text-warm)] text-[0.95rem] sm:text-base max-w-[56ch] ${
            isTH ? "leading-[1.95]" : "leading-[1.85]"
          }`}
          style={{ fontFamily: bodyFont, fontWeight: 300 }}
        >
          {isTH
            ? (doctor.bioTh ?? doctor.specialtyTh)
            : (doctor.bioEn ?? doctor.specialty)}
        </p>

        {/* TODO: 15+/10,000+ are hardcoded to match the Trust Bar. The
            doctor record's `experience` field says "20+ yrs · 40,000+ cases" —
            one of the two is wrong and marketing owes an answer. */}
        <div className="flex items-center gap-8 mt-7">
          <div>
            <p
              className="stat-number text-[clamp(2rem,3.6vw,2.75rem)] text-[var(--color-accent)]"
              style={{ fontWeight: 400 }}
            >
              <CountUp to={15} suffix="+" />
            </p>
            <p
              className="text-xs text-[var(--color-text-warm)] mt-1.5"
              style={{ fontFamily: bodyFont }}
            >
              {isTH ? "ปีประสบการณ์" : "yrs experience"}
            </p>
          </div>
          <span aria-hidden className="w-px h-10 bg-[var(--color-border)]" />
          <div>
            <p
              className="stat-number text-[clamp(2rem,3.6vw,2.75rem)] text-[var(--color-accent)]"
              style={{ fontWeight: 400 }}
            >
              <CountUp to={10000} suffix="+" />
            </p>
            <p
              className="text-xs text-[var(--color-text-warm)] mt-1.5"
              style={{ fontFamily: bodyFont }}
            >
              {isTH ? "เคส" : "cases"}
            </p>
          </div>
        </div>

        {/* Credentials — active locale only. Both languages stacked on every
            line reads as duplicated content, not thoroughness. */}
        <h3
          className={`mt-9 text-[var(--color-primary)] ${
            isTH ? "text-[1.1rem]" : "text-[1.2rem]"
          }`}
          style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 500 }}
        >
          {t.credentials.heading}
        </h3>

        <ul className="mt-4 space-y-3">
          {doctor.credentials.map((c, i) => (
            <li key={i} className="flex gap-3 items-start">
              {/* Diamond, not a number — credentials aren't a sequence */}
              <span
                aria-hidden
                className="shrink-0 w-2 h-2 rotate-45 border border-[var(--color-accent)] mt-2"
              />
              <span
                className={`text-[var(--color-text-warm)] text-[0.95rem] ${
                  isTH ? "leading-[1.9]" : "leading-[1.75]"
                }`}
                style={{ fontFamily: bodyFont }}
              >
                {isTH ? c.th : c.en}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
