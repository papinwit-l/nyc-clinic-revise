import Image from "next/image";
import type { Doctor } from "@/types/doctor";

/**
 * Team doctor row: portrait | name block | credentials, on a white panel.
 * Every row faces the same way.
 *
 * Chosen by marketing Oct 2026 ("Option B") over a 3-column card grid, after
 * reviewing both on the live page. Replaced the alternating blocks of the old
 * DoctorCard, which left half the page empty on desktop and made the flipped
 * middle row read as misaligned. (DoctorCard and the card-grid variant are in
 * git history if ever needed.)
 *
 * Still lighter than DoctorLead — no backing plate, no badge, no stats.
 *
 * The name follows the page locale; the other language sits beneath it in the
 * opposite face. Nickname ("Dr. Beer" / "หมอเบียร์") leads, because that is
 * how patients know the doctors.
 *
 * Below md the row stacks: portrait, name block, then credentials.
 */

type Props = {
  doctor: Doctor;
  locale: string;
};

export default function DoctorTeamCard({ doctor, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const altFont = isTH ? "var(--font-display)" : "var(--font-thai-head)";

  const portrait = (
    <div
      className="relative aspect-[4/5] w-full max-w-[260px] md:max-w-none overflow-hidden radius-soft bg-[var(--color-surface-dim)]"
      style={{ boxShadow: "0 10px 30px rgba(26, 31, 58, 0.12)" }}
    >
      <Image
        src={doctor.image}
        alt={`${doctor.nameEn} — ${doctor.nameTh}`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 260px, 220px"
      />
    </div>
  );

  const identity = (
    <div>
      <p
        className={
          isTH
            ? "text-[0.9rem] font-medium text-[var(--color-accent-dark)]"
            : "text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-dark)]"
        }
        style={{ fontFamily: bodyFont }}
      >
        {isTH ? doctor.nameTh : doctor.nameEn}
      </p>
      <h3
        className="pt-2 text-[1.3rem] lg:text-[1.45rem] leading-[1.3] text-[var(--color-primary)]"
        style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
      >
        {isTH ? doctor.fullNameTh : doctor.fullNameEn}
      </h3>
      <p
        className="pt-1 text-[0.9rem] text-[var(--color-accent-dark)]"
        style={{ fontFamily: altFont }}
      >
        {isTH ? doctor.fullNameEn : doctor.fullNameTh}
      </p>
      {/* Navy + medium: this was --color-text-subtle and all but vanished on
          the surface-dim ground. */}
      <p
        className="pt-3.5 text-sm leading-[1.6] font-medium text-[var(--color-primary)]"
        style={{ fontFamily: bodyFont }}
      >
        {isTH ? doctor.specialtyTh : doctor.specialty}
      </p>
    </div>
  );

  const credentials = (
    <ul className="space-y-2 pt-4 border-t border-[var(--color-border-accent)] md:pt-0 md:border-t-0 md:pl-10 md:border-l">
      {doctor.credentials.map((c, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span
            aria-hidden
            className="shrink-0 w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)] mt-[0.6em]"
          />
          <span
            className={`text-[var(--color-text-warm)] text-sm ${
              isTH ? "leading-[1.9]" : "leading-[1.75]"
            }`}
            style={{ fontFamily: bodyFont, fontWeight: 300 }}
          >
            {isTH ? c.th : c.en}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <article
      id={doctor.slug}
      className="scroll-mt-28 bg-[var(--color-surface-white)] border border-[var(--color-border-accent)] p-6 md:p-8 grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr_1.25fr] md:gap-10 md:items-start"
    >
      {portrait}
      {identity}
      {credentials}
    </article>
  );
}
