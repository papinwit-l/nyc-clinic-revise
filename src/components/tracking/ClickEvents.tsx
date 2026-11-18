"use client";

import { useEffect } from "react";

/**
 * One delegated listener instead of wiring every button: any click on a
 * LINE link or a tel: link pushes a dataLayer event GTM can count as a
 * conversion. Pushing is harmless without consent — GTM's tags decide.
 */
const isLine = (href: string) => /(^|\/\/)(lin\.ee|line\.me|page\.line\.me)\//i.test(href);

export default function ClickEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const event = href.startsWith("tel:") ? "phone_click" : isLine(href) ? "line_click" : null;
      if (!event) return;
      const w = window as unknown as { dataLayer?: unknown[] };
      (w.dataLayer ??= []).push({
        event,
        link_url: href,
        page_path: window.location.pathname,
        link_text: (a.textContent ?? "").trim().slice(0, 100),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
