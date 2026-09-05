import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { CaseCard } from "@/types/case";
import BeforeAfterRevealSlide from "./BeforeAfterRevealSlide";
import SectionHeader from "@/components/shared/SectionHeader";

type ImageData = {
  src: string;
  alt: string;
};

type BeforeAfterItem = {
  beforeImage: ImageData;
  afterImage: ImageData;
};

type Props = {
  t: Dictionary["home"]["results"];
  tCommon: Dictionary["common"];
  locale: string;
  data: BeforeAfterItem[];
};

export default function BeforeAfterRevealContainer({
  t,
  tCommon,
  locale,
  data,
}: Props) {
  const isTH = locale === "th";

  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="mb-12">
          <SectionHeader section="results" />
          <p
            className="text-[var(--color-text-muted)] mt-3 max-w-md mx-auto text-center"
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
            }}
          >
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ beforeImage, afterImage }, index) => (
            <BeforeAfterRevealSlide
              key={index}
              index={index}
              beforeImage={beforeImage}
              afterImage={afterImage}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
