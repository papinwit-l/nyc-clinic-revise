"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Shared modal shell. Owns the behaviour that's easy to get subtly different
 * between copies: backdrop click, Escape, body scroll lock, and the navy card
 * styling. Content is passed as children — this component knows nothing about
 * awards or cases.
 *
 * Sharp corners: a modal is structure, not patient-facing content.
 */

type Props = {
  open: boolean;
  onClose: () => void;
  /** Close-button label — callers supply it localised. */
  closeLabel: string;
  /** Widen for image-led content. */
  size?: "md" | "lg";
  children: React.ReactNode;
};

export default function Lightbox({
  open,
  onClose,
  closeLabel,
  size = "md",
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[rgba(15,17,30,0.88)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${size === "lg" ? "max-w-3xl" : "max-w-lg"} bg-[var(--color-primary)] ring-1 ring-[var(--color-accent-border)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 sm:p-9`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-[var(--color-on-primary-muted)] hover:text-[var(--color-accent)] transition-colors"
          aria-label={closeLabel}
        >
          <X size={18} strokeWidth={2} />
        </button>

        {children}
      </div>
    </div>
  );
}
