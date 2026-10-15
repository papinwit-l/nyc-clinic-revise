import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under a locale (/th/anything-unknown). Without
 * it those fall through to the ROOT not-found, which renders outside the
 * locale layout — no header, footer, fonts or styles. notFound() here hands
 * them to app/[locale]/not-found.tsx instead. Specific routes always win
 * over a catch-all, so this never shadows a real page.
 */
export default function CatchAll() {
  notFound();
}
