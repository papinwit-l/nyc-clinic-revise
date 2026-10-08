import { LineIcon } from "@/components/shared/SocialIcons";
import { LINE_URL } from "@/lib/site";

/**
 * Shared LINE call-to-action at the foot of EVERY article. One component, copy
 * from the dictionary (blog.cta) — marketing changes the wording in one place
 * and it changes on all articles. Not a per-post field on purpose.
 *
 * Sharp corners: structural/conversion element, not patient-facing content.
 */

type Props = {
  t: { heading: string; text: string; button: string };
  locale: string;
};

export default function ArticleCTA({ t, locale }: Props) {
  const isTH = locale === "th";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";

  return (
    <aside className="mt-14 bg-[var(--color-primary)] px-7 py-9 flex flex-wrap items-center justify-between gap-5">
      <div>
        <p
          className="text-xl text-[var(--color-accent-pale)]"
          style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 500 }}
        >
          {t.heading}
        </p>
        <p
          className="mt-1.5 text-sm text-[var(--color-on-primary-muted)]"
          style={{ fontFamily: bodyFont, fontWeight: 300 }}
        >
          {t.text}
        </p>
      </div>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[0.95rem] font-medium px-7 py-3.5 whitespace-nowrap transition-colors"
        style={{ fontFamily: bodyFont }}
      >
        <LineIcon className="w-5 h-5" />
        {t.button}
      </a>
    </aside>
  );
}
