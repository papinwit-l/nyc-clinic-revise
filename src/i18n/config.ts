export const defaultLocale = "th" as const;
export const locales = ["th", "en"] as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
