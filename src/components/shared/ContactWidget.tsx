"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Phone, MessageCircle, X, Minus } from "lucide-react";
import { LineIcon } from "@/components/shared/SocialIcons";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";

type WidgetState = "collapsed" | "expanded" | "minimized";

type Props = {
  locale: string;
};

export default function ContactWidget({ locale }: Props) {
  const [state, setState] = useState<WidgetState>("collapsed");
  const containerRef = useRef<HTMLDivElement>(null);
  const isTH = locale === "th";

  // Close expanded when clicking outside
  useEffect(() => {
    if (state !== "expanded") return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setState("collapsed");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [state]);

  // ── Minimized: small tab at bottom edge ──
  if (state === "minimized") {
    return (
      <button
        type="button"
        onClick={() => setState("collapsed")}
        className="fixed bottom-0 right-6 z-50 flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] text-white text-[10px] font-semibold tracking-[0.15em] uppercase shadow-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300"
        style={{
          fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
          borderRadius: "8px 8px 0 0",
        }}
        aria-label={isTH ? "เปิดช่องทางติดต่อ" : "Open contact"}
      >
        <MessageCircle size={14} />
        {isTH ? "ติดต่อเรา" : "Contact"}
      </button>
    );
  }

  // ── Collapsed & Expanded ──
  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Expanded options — slide up from main button */}
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-300 origin-bottom ${
          state === "expanded"
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Phone */}
        <a
          href={PHONE_HREF}
          className="group flex items-center gap-3 bg-white pl-4 pr-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-primary)] text-white shrink-0">
            <Phone size={16} />
          </span>
          <span className="flex flex-col">
            <span
              className="text-[9px] font-medium tracking-[0.1em] uppercase text-[var(--color-text-subtle)]"
              style={{
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {isTH ? "โทรหาเรา" : "Call us"}
            </span>
            <span className="text-sm font-semibold text-[var(--color-primary)] tracking-wide">
              {PHONE}
            </span>
          </span>
        </a>

        {/* LINE */}
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[var(--color-line)] pl-4 pr-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-white shrink-0">
            <LineIcon className="w-5 h-5" />
          </span>
          <span className="flex flex-col">
            <span
              className="text-[9px] font-medium tracking-[0.1em] uppercase text-white/80"
              style={{
                fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              }}
            >
              {isTH ? "แอดไลน์ปรึกษาฟรี" : "Free consultation"}
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              @nycclinic
            </span>
          </span>
        </a>
      </div>

      {/* Dr. Jing die-cut IS the control — the circular button is gone.
          The rounded-shape exception no longer applies here; the tap target
          is the figure itself. Three-state logic is unchanged. */}
      <div className="relative">
        {/* Badge — minimize when collapsed, close when expanded */}
        <button
          type="button"
          onClick={() =>
            setState(state === "expanded" ? "collapsed" : "minimized")
          }
          className="absolute top-2 right-2 w-6 h-6 !rounded-full bg-[var(--color-primary)] ring-1 ring-[var(--color-accent-border)] text-[var(--color-on-primary-warm)] hover:text-white hover:bg-[var(--color-primary-light)] flex items-center justify-center shadow-md transition-colors duration-200 z-20"
          aria-label={
            state === "expanded"
              ? isTH
                ? "ปิด"
                : "Close"
              : isTH
                ? "ย่อ"
                : "Minimize"
          }
        >
          {state === "expanded" ? (
            <X size={12} strokeWidth={2.5} />
          ) : (
            <Minus size={12} strokeWidth={3} />
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            setState((s) => (s === "expanded" ? "collapsed" : "expanded"))
          }
          className="block relative transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
          aria-label={
            state === "expanded"
              ? isTH
                ? "ปิดช่องทางติดต่อ"
                : "Close contact options"
              : isTH
                ? "ติดต่อเรา"
                : "Contact us"
          }
        >
          <Image
            src="/images/dr-jing_die-cut.png"
            alt=""
            width={1216}
            height={1860}
            sizes="(max-width: 640px) 120px, 170px"
            className="w-[120px] sm:w-[170px] h-auto select-none drop-shadow-[0_10px_24px_rgba(26,31,58,0.18)]"
          />

          {/* Bubble — collapsed only; the pills say it when expanded.
              Navy echoes her top rather than spending accent budget. */}
          <span
            className={`absolute top-1 right-[76%] whitespace-nowrap bg-[var(--color-primary)] ring-1 ring-[var(--color-accent-border)] text-[var(--color-on-primary-warm)] px-3 py-1.5 rounded-full shadow-md text-[11px] sm:text-xs transition-all duration-300 ${
              state === "collapsed"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
            style={{
              fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)",
              fontWeight: 500,
            }}
          >
            {isTH ? "ติดต่อสอบถามได้เลย" : "Questions? Ask us"}
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--color-primary)] border-r border-t border-[var(--color-accent-border)]" />
          </span>
        </button>
      </div>
    </div>
  );
}
