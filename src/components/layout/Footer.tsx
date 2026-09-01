import Link from "next/link";
import { Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LineIcon,
} from "@/components/shared/SocialIcons";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE_HREF = "tel:+66880087870";

const SOCIALS = [
  {
    href: "https://web.facebook.com/nycclinic",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/nycclinic/",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/user/nycnewyorkclinic",
    icon: YoutubeIcon,
    label: "YouTube",
  },
];

type Props = {
  locale: Locale;
  t: Dictionary["footer"];
  navT: Dictionary["nav"];
};

export default function Footer({ locale, t, navT }: Props) {
  const isTH = locale === "th";
  const l = (path: string) => `/${locale}${path}`;

  // Font helpers — footer labels/links are a mix of EN-only and translated text
  const localeFont = isTH ? "var(--font-thai-body)" : "var(--font-body)";
  const enFont = "var(--font-body)";

  const NAV_COLS = [
    {
      title: t.services,
      links: [
        { href: l("/services/nose-thread-lift"), label: "Nose Thread Lift" },
        {
          href: l("/services/facial-thread-lift"),
          label: "Facial Thread Lift",
        },
        { href: l("/services/facial-design"), label: "Facial Design" },
        { href: l("/services/surgery"), label: "Surgery" },
        { href: l("/services/skin-treatments"), label: "Skin Treatments" },
      ],
      // Service names are always English
      linkFont: enFont,
    },
    {
      title: t.clinic,
      links: [
        { href: l("/about"), label: navT.about },
        { href: l("/doctors"), label: navT.doctors },
        { href: l("/before-after"), label: navT.beforeAfter },
        { href: l("/blog"), label: navT.blog },
      ],
      // Nav labels are translated
      linkFont: localeFont,
    },
    {
      title: t.support,
      links: [
        { href: l("/contact"), label: navT.contact },
        { href: l("/promotions"), label: "Promotions" },
        { href: l("/faq"), label: "FAQ" },
        { href: l("/reviews"), label: "Reviews" },
      ],
      // Mix of translated and English — use locale font (Montserrat handles English fine)
      linkFont: localeFont,
    },
  ];

  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="primary" size="lg" />

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: localeFont }}
            >
              {t.description}
            </p>

            <div className="space-y-2 text-sm">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 hover:text-white transition-colors"
                style={{ fontFamily: enFont }}
              >
                <Phone size={14} strokeWidth={1.5} />
                088-008-7870
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ fontFamily: enFont }}
              >
                <LineIcon className="w-3.5 h-3.5" />
                @nycclinic
              </a>
            </div>

            <div className="flex items-center gap-4 pt-1">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-footer-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ title, links, linkFont }) => (
            <div key={title}>
              <h4
                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white mb-4"
                style={{ fontFamily: localeFont }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm hover:text-white transition-colors"
                      style={{ fontFamily: linkFont }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-on-primary-muted)]">
          <p style={{ fontFamily: localeFont }}>
            &copy; {new Date().getFullYear()} NYC Clinic. {t.rights}.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={l("/privacy-policy")}
              className="hover:text-white transition-colors"
              style={{ fontFamily: localeFont }}
            >
              {t.privacy}
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link
              href={l("/terms")}
              className="hover:text-white transition-colors"
              style={{ fontFamily: localeFont }}
            >
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
