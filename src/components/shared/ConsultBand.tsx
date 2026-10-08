import { LineIcon } from "@/components/shared/SocialIcons";
import { LINE_URL } from "@/lib/site";

/**
 * Closing LINE call-to-action band: rule – line of text – rule, then the LINE
 * button. The same pattern /doctors, /about and the service pages end on.
 *
 * Extracted Oct 2026 when /before-after gained one — it was the only gallery
 * page that ran from its last block straight into the footer. Those other
 * pages still carry their own inline copy; move them onto this when next
 * touched.
 */

type Props = {
  text: string;
  button: string;
  locale: string;
};

export default function ConsultBand({ text, button, locale }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const headFont = isTH ? "var(--font-thai-head)" : "var(--font-display)";

  return (
    <section className="bg-[var(--color-primary)] py-16 text-center">
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        <div className="flex items-center gap-5 sm:gap-8">
          <span
            aria-hidden
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent))",
            }}
          />
          <p
            className={`shrink-0 text-[var(--color-on-primary-warm)] ${
              isTH ? "text-[1.15rem]" : "text-[1.25rem]"
            }`}
            style={{ fontFamily: headFont, fontWeight: isTH ? 600 : 400 }}
          >
            {text}
          </p>
          <span
            aria-hidden
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent), transparent)",
            }}
          />
        </div>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-line mt-6 inline-flex"
          style={{ fontFamily: bodyFont }}
        >
          <LineIcon className="w-5 h-5" />
          {button}
        </a>
      </div>
    </section>
  );
}
