export const locales = ["ro", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
