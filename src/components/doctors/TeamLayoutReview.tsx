"use client";

import { useSyncExternalStore, type ReactNode } from "react";

/**
 * TEMPORARY — lets marketing compare the two team layouts on the live page.
 *
 *   /doctors            → Option A, no switcher. This is what patients see.
 *   /doctors?team=a     → Option A + the review switcher
 *   /doctors?team=b     → Option B + the review switcher
 *
 * The switcher only appears when ?team= is in the URL, so nothing about the
 * review is visible to ordinary visitors. Switching rewrites the URL
 * (replaceState, no history entry) so the address bar is always a shareable
 * link to what is on screen.
 *
 * AFTER THE DECISION: delete this file, render the chosen layout directly in
 * doctors/page.tsx, drop the other branch from DoctorTeamCard, and delete
 * DoctorCard.tsx.
 */

type Choice = "a" | "b";
const EVENT = "nyc-team-layout";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function readParam(): string | null {
  return new URLSearchParams(window.location.search).get("team");
}

function choose(next: Choice) {
  const url = new URL(window.location.href);
  url.searchParams.set("team", next);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(EVENT));
}

const OPTIONS: { key: Choice; label: string }[] = [
  { key: "a", label: "A · Card grid" },
  { key: "b", label: "B · Aligned rows" },
];

export default function TeamLayoutReview({
  a,
  b,
}: {
  a: ReactNode;
  b: ReactNode;
}) {
  // Server (and first paint) render null → Option A, no switcher.
  const param = useSyncExternalStore(subscribe, readParam, () => null);
  const reviewing = param === "a" || param === "b";
  const active: Choice = param === "b" ? "b" : "a";

  return (
    <>
      {reviewing && (
        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-white)] px-4 py-3 text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="font-semibold tracking-[0.12em] uppercase">
            Layout review
          </span>
          <div className="flex gap-2">
            {OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={active === key}
                onClick={() => choose(key)}
                className={`px-3 py-1.5 border cursor-pointer transition-colors ${
                  active === key
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    : "border-[var(--color-border-strong)] hover:border-[var(--color-primary)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span>Not visible to visitors without ?team= in the URL</span>
        </div>
      )}
      {active === "b" ? b : a}
    </>
  );
}
