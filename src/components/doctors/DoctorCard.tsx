import Image from "next/image";
import type { Doctor } from "@/types/doctor";

/**
 * Team doctor block. One block each rather than a grid — credentials are the
 * actual content of this page and a card can't hold them.
 *
 * Deliberately lighter than DoctorLead: fixed 200px portrait, no backing
 * plate, no badge, no stats. The size difference is what keeps the lead block
 * ahead; adding any of those here would flatten the hierarchy.
 *
 * Blocks alternate: even index puts the portrait left, odd puts it right.
 * Text stays left-aligned inside its own column either way — credentials are
 * lists, and a list that changes alignment between blocks makes the eye
 * re-find the start of each one.
 *
 * Below sm the grid stacks and the portrait always comes first, regardless of
 * index: a reversed stack would put a name above a face with no portrait in
 * view yet.
 */

type Props = {
  doctor: Doctor;
  locale: string;
  /** Position in the list — decides which side the portrait sits on. */
  index?: number;
};

export default function DoctorCard({ doctor, locale, index = 0 }: Props) {
  const flipped = index % 2 === 1;
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <article
      id={doctor.slug}
      className={`relative grid grid-cols-1 gap-8 items-start scroll-mt-28 pt-14 first:pt-0 ${
        flipped ? "sm:grid-cols-[1fr_200px]" : "sm:grid-cols-[200px_1fr]"
      }`}
    >
      {/* Separator — gradient rose-gold, strongest on the portrait side and
          fading out across the block, so the rule itself says which way this
          one faces. Replaces a --color-border hairline that was all but
          invisible at 10%. Hidden on the first block. */}
      {index > 0 && (
        <span
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: flipped
              ? "linear-gradient(90deg, transparent 0%, var(--color-border-accent) 55%, var(--color-accent) 100%)"
              : "linear-gradient(90deg, var(--color-accent) 0%, var(--color-border-accent) 45%, transparent 100%)",
          }}
        />
      )}

      <div
        className={`relative aspect-[3/4] w-full max-w-[200px] mx-auto overflow-hidden bg-white ring-1 ring-[var(--color-border)] radius-soft ${
          flipped ? "sm:order-2 sm:mx-0" : "sm:mx-0"
        }`}
      >
        <Image
          src={doctor.image}
          alt={`${doctor.nameEn} — ${doctor.nameTh}`}
          fill
          className="object-cover object-top"
          sizes="200px"
        />
      </div>

      {/* Capped measure, then pushed toward the portrait on flipped rows.
          Without the cap the block spans the full column while credential
          lines are short, so a flipped row reads as content pinned far left
          with a void before the portrait. Text stays left-aligned either way —
          mirroring the alignment too would make each list's start move. */}
      {/* Vertical rule down the whole info block, on the side nearest the
          portrait — ties the column to the face and gives every block the same
          rule height. Beside the credential list alone it varied with the
          number of credentials, so stacked blocks read as different lengths.
          Desktop only: at mobile widths the indent costs more than it gives. */}
      <div
        className={`relative max-w-[62ch] ${
          flipped ? "sm:order-1 sm:ml-auto sm:pr-6" : "sm:pl-6"
        }`}
      >
        <span
          aria-hidden
          className={`hidden sm:block absolute top-1 bottom-1 w-px ${
            flipped ? "right-0" : "left-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, var(--color-accent) 0%, var(--color-border-accent) 65%, transparent 100%)",
          }}
        />
        <h2
          className="text-[1.5rem] sm:text-[1.75rem] leading-tight text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {doctor.fullNameEn}
        </h2>
        <p
          className="text-[var(--color-accent)] text-sm sm:text-base mt-1"
          style={{ fontFamily: "var(--font-thai-head)", fontWeight: 500 }}
        >
          {doctor.fullNameTh}
        </p>
        <p
          className="text-[var(--color-text-subtle)] text-sm mt-1.5"
          style={{ fontFamily: bodyFont }}
        >
          {isTH ? doctor.specialtyTh : doctor.specialty}
        </p>

        <ul className="mt-5 space-y-2.5">
          {doctor.credentials.map((c, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                aria-hidden
                className="shrink-0 w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)] mt-2"
              />
              <span
                className={`text-[var(--color-text-warm)] text-sm ${
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
