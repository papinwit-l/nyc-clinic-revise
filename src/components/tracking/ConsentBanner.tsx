"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import { OPEN_EVENT, readConsent, saveConsent, type ConsentChoice } from "./consent";

/**
 * Cookie banner — shown until the visitor chooses; reopened by the footer's
 * "Cookie settings" link (PDPA: withdrawing consent must be as easy as
 * giving it). Accept and Decline are equal weight on purpose.
 */
export default function ConsentBanner({
  t,
  privacyHref,
  isTH,
}: {
  t: Dictionary["consent"];
  privacyHref: string;
  isTH: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // After hydration only — localStorage isn't readable on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: ConsentChoice) => {
    saveConsent(c);
    setOpen(false);
  };
  const btn =
    "flex-1 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-200";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.settings}
      style={{ fontFamily: isTH ? "var(--font-thai-body)" : "var(--font-body)" }}
      className="fixed z-[60] bottom-3 inset-x-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md bg-[var(--color-primary)] text-[var(--color-on-primary-muted)] ring-1 ring-[var(--color-accent-border)] shadow-xl p-5"
    >
      <p className="text-sm leading-relaxed">
        {t.text}{" "}
        <Link href={privacyHref} className="underline text-[var(--color-on-primary-warm)] hover:text-white">
          {t.policy}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${btn} ring-1 ring-white/30 text-white hover:bg-white/10`}
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${btn} bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent-hover)]`}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
