"use client";

import { useState } from "react";
import type { ServiceCard } from "@/types/service";
import ServiceRow from "./ServiceRow";
import ServiceCardItem from "./ServiceCardItem";
import ServiceFeature from "./ServiceFeature";

/**
 * ⚠ REVIEW AID — REMOVE BEFORE LAUNCH.
 *
 * Holds the layout toggle so marketing can compare the two versions on a
 * staging URL rather than us editing a constant between screenshots.
 *
 * Once they choose: delete this file, and have
 * app/[locale]/services/page.tsx map over the chosen layout component
 * directly. Neither ServiceRow nor ServiceCardItem changes — they are both
 * server components, and this wrapper is the only reason the index ships
 * client JS at all.
 */

type Layout = "directory" | "cards" | "editorial";

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "directory", label: "A · Directory" },
  { id: "cards", label: "B · Cards" },
  { id: "editorial", label: "C · Editorial" },
];

type Props = {
  services: ServiceCard[];
  locale: string;
  signatureLabel: string;
};

export default function ServicesIndex({
  services,
  locale,
  signatureLabel,
}: Props) {
  const [layout, setLayout] = useState<Layout>("directory");

  return (
    <>
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 pt-[var(--section-py)] mb-10 flex items-center gap-2">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-text-subtle)] mr-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Layout — review only
        </span>
        {LAYOUTS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLayout(l.id)}
            aria-pressed={layout === l.id}
            className={`px-3 py-1 text-[11px] tracking-[0.06em] uppercase border transition-colors ${
              layout === l.id
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "bg-white/70 text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-accent)]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {layout === "editorial" ? (
        /* Full-bleed bands — no container, and no w-screen trick needed now
           that the page doesn't wrap this in one. */
        <div>
          {services.map((s, i) => (
            <ServiceFeature
              key={s.slug}
              service={s}
              locale={locale}
              index={i}
              signatureLabel={signatureLabel}
            />
          ))}
        </div>
      ) : layout === "directory" ? (
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 pb-[var(--section-py)] space-y-12 sm:space-y-14">
          {services.map((s, i) => (
            <ServiceRow
              key={s.slug}
              service={s}
              locale={locale}
              index={i}
              signatureLabel={signatureLabel}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 pb-[var(--section-py)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCardItem
              key={s.slug}
              service={s}
              locale={locale}
              index={i}
              signatureLabel={signatureLabel}
            />
          ))}
        </div>
      )}
    </>
  );
}
