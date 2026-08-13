import type { Locale } from "./config";

const dictionaries = {
  th: () => import("./dictionaries/th").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
