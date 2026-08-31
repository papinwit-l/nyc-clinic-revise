import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { InstagramPost } from "@/types/instagram";

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
  data: InstagramPost[];
};

export default function InstagramFeed({ t, data }: Props) {
  if (data.length === 0) return null;

  return (
    <section className="bg-[var(--color-surface-white)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">{t.label}</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            {t.heading}
          </h2>
        </div>

        {/* Grid — 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {data.map((post) => {
            // Use thumbnail for videos, media_url for images
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
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/50 transition-colors duration-300 flex items-center justify-center">
                  <InstagramIcon
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
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

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            <InstagramIcon size={16} />
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
