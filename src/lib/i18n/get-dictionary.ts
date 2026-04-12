import type { Locale } from "./config";

const dictionaries = {
  ro: () => import("./messages/ro.json").then((m) => m.default),
  ru: () => import("./messages/ru.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
