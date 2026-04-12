"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  function getLocalePath(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <div className="flex border-[0.5px] border-border-default rounded-md overflow-hidden">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          scroll={false}
          className={
            locale === currentLocale
              ? "px-2 py-[3px] text-[11px] bg-primary text-white"
              : "px-2 py-[3px] text-[11px] text-text-secondary"
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
