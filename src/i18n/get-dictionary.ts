import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "./config";

const dictionaries = {
  th: () => import("./dictionaries/th").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

/**
 * Unknown "locale" → 404. A path with a dot (/llms.txt, /wp-login.php) skips
 * the proxy and lands here as the locale; without this guard the lookup threw
 * and every such request returned 500 instead of 404.
 */
export async function getDictionary(locale: Locale | string) {
  if (!isValidLocale(locale)) notFound();
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
