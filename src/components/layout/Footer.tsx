import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LineIcon,
} from "@/components/shared/SocialIcons";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE_HREF = "tel:+66880087870";

const NAV_COLS = [
  {
    title: "Services",
    titleTh: "บริการ",
    links: [
      { href: "/services/nose-thread-lift", label: "Nose Thread Lift" },
      { href: "/services/facial-thread-lift", label: "Facial Thread Lift" },
      { href: "/services/facial-design", label: "Facial Design" },
      { href: "/services/surgery", label: "Surgery" },
      { href: "/services/skin-treatments", label: "Skin Treatments" },
    ],
  },
  {
    title: "Clinic",
    titleTh: "คลินิก",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/doctors", label: "Doctors" },
      { href: "/before-after", label: "Before & After" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Support",
    titleTh: "ช่วยเหลือ",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/promotions", label: "Promotions" },
      { href: "/faq", label: "FAQ" },
      { href: "/reviews", label: "Reviews" },
    ],
  },
] as const;

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

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      {/* Main grid */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Image
              src="/images/nyc-clinic-logo.jpg"
              alt="NYC — New York Clinic, GR"
              width={140}
              height={140}
              className="h-20 w-auto"
            />

            <p className="text-sm leading-relaxed max-w-xs">
              ศูนย์ความงามครบวงจร โดยทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง กว่า 15 ปี
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <PhoneIcon />
                088-008-7870
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
              >
                <LineIcon className="w-3.5 h-3.5" />
                @nyc-clinic
              </a>
            </div>

            {/* Socials */}
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
          {NAV_COLS.map(({ title, titleTh, links }) => (
            <div key={title}>
              <h4 className="font-[var(--font-body)] text-[11px] font-semibold tracking-[0.15em] uppercase text-white mb-4">
                {title}
                <span className="text-[var(--color-on-primary-muted)] font-normal mx-2">
                  ·
                </span>
                <span className="font-[var(--font-thai-body)] text-xs font-normal tracking-normal normal-case text-[var(--color-on-primary-muted)]">
                  {titleTh}
                </span>
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm hover:text-white transition-colors"
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
          <p>
            &copy; {new Date().getFullYear()} NYC Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
