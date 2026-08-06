import type { Metadata } from "next";
import {
  Playfair_Display,
  Montserrat,
  Cormorant_Garamond,
  Taviraj,
  Noto_Serif_Thai,
  Prompt,
} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

const taviraj = Taviraj({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-thai-head",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`
        ${playfair.variable}
        ${montserrat.variable}
        ${cormorant.variable}
        ${taviraj.variable}
        ${notoSerifThai.variable}
        ${prompt.variable}
      `}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
