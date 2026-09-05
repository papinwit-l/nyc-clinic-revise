import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Playfair_Display,
  Montserrat,
  Cormorant_Garamond,
  Anuphan,
  Mitr,
  Prompt,
} from "next/font/google";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactWidget from "@/components/shared/ContactWidget";
import "../globals.css";

// ─── Fonts ──────────────────────────────────────────

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// ─── Logo faces (PINNED) ────────────────────────────
// The wordmark must not follow the heading/body typeface. These are
// separate instances so a change of --font-display or --font-body cannot
// restyle the logo. Same families, so no extra font files are fetched.
const playfairLogo = Playfair_Display({
  subsets: ["latin"],
  // 400 = Logo.tsx letters (font-normal), 700 = HeroLogo (font-bold)
  weight: ["400", "700"],
  variable: "--font-logo",
  display: "swap",
});

const montserratLogo = Montserrat({
  subsets: ["latin"],
  // 300 = Logo.tsx subline (font-light), 400 = HeroLogo subline
  weight: ["300", "400"],
  variable: "--font-logo-sub",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

// Thai headings — pairs with Playfair Display
const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai-head",
  display: "swap",
});

// Thai taglines / pull quotes — pairs with Cormorant Garamond
const mitr = Mitr({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400"],
  variable: "--font-thai-serif",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-thai-body",
  display: "swap",
});

// ─── Metadata ───────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "NYC Clinic — New York Clinic, GR",
    template: "%s | NYC Clinic",
  },
  description:
    "ศูนย์ความงามครบวงจร ร้อยไหมจมูก ศัลยกรรม ฟิลเลอร์ โบท็อกซ์ โดยทีมแพทย์ผู้เชี่ยวชาญกว่า 15 ปี — NYC Clinic กรุงเทพฯ",
};

// ─── Layout ─────────────────────────────────────────

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`
        ${playfair.variable}
        ${montserrat.variable}
        ${playfairLogo.variable}
        ${montserratLogo.variable}
        ${cormorant.variable}
        ${anuphan.variable}
        ${mitr.variable}
        ${prompt.variable}
      `}
    >
      <body>
        <Header locale={locale as Locale} t={t.nav} />
        <main>{children}</main>
        <Footer locale={locale as Locale} t={t.footer} navT={t.nav} />
        <ContactWidget locale={locale} />
      </body>
    </html>
  );
}
