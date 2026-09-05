import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { InstagramPost } from "@/types/instagram";
import Logo from "../shared/Logo";

function InstagramIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const IG_PROFILE_URL = "https://www.instagram.com/nycclinic/";

type Props = {
  t: Dictionary["home"]["instagram"];
  locale: string;
  data: InstagramPost[];
};

export default function InstagramFeed({ t, locale, data }: Props) {
  const isTH = locale === "th";
  const bodyFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  if (data.length === 0) return null;

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Profile-style header — reads as a real IG presence, not a generic
            "Follow Us" band. Avatar + handle left, Follow action right. */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Avatar — story-ring style. Circular is the IG convention
                (intentional exception to the sharp-edge rule). */}
            {/* <div
              className="shrink-0 rounded-full p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent), var(--color-accent-pale))",
              }}
            >
              <div className="rounded-full bg-white p-[2px]">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/nyc-clinic-logo.jpg"
                    alt="NYC Clinic"
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
              </div>
            </div> */}

            {/* Logo — NYC Clinic branding, not a raster image */}
            <div className="shrink-0 p-4 rounded-md bg-[var(--color-primary)]">
              <Logo variant="primary" size="sm" layout="full" />
            </div>
            {/* <div
              className="shrink-0 p-4 rounded-md"
              style={{
                background:
                  "linear-gradient(160deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)",
              }}
            >
              <Logo variant="reversed" size="md" layout="full" />
            </div> */}

            <div>
              <span className="section-label" style={{ fontFamily: bodyFont }}>
                {t.label}
              </span>
              <p
                className="text-xl sm:text-2xl font-semibold text-[var(--color-primary)] mt-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.heading}
              </p>
            </div>
          </div>

          {/* Follow — secondary outline button (LINE is the primary CTA sitewide) */}
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors"
            style={{ fontFamily: bodyFont }}
          >
            <InstagramIcon size={15} />
            {isTH ? "ติดตาม" : "Follow"}
          </a>
        </div>

        {/* Grid — uniform (authentic IG feel); 4 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {data.map((post) => {
            const imgSrc =
              post.media_type === "VIDEO"
                ? (post.thumbnail_url ?? post.media_url)
                : post.media_url;

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-[var(--color-surface-dim)]"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src={imgSrc}
                  alt={
                    post.caption
                      ? post.caption.slice(0, 80).replace(/\n/g, " ")
                      : "NYC Clinic Instagram post"
                  }
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized
                />
                {/* Hover overlay — explicit rgba (reliable, unlike /opacity on a
                    CSS-variable colour in Tailwind v4) */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(26,31,58,0.5)" }}
                >
                  <InstagramIcon size={28} className="text-white" />
                </div>
                {/* Video indicator */}
                {post.media_type === "VIDEO" && (
                  <div className="absolute top-2 right-2 text-white/80">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 drop-shadow"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
