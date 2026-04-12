import Link from "next/link";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import type { Locale } from "@/lib/i18n/config";

export type FooterLabels = {
  home: string;
  providers: string;
  footer_copyright: string;
  footer_contact: string;
};

export function Footer({
  labels,
  currentLocale,
}: {
  labels: FooterLabels;
  currentLocale: Locale;
}) {
  return (
    <footer className="bg-bg-page border-t-[0.5px] border-border-default px-4 md:px-8 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-5">
          <Link
            href={`/${currentLocale}`}
            className="text-[12px] text-text-secondary hover:text-text-body transition-colors duration-150"
          >
            {labels.home}
          </Link>
          <Link
            href={`/${currentLocale}/providers`}
            className="text-[12px] text-text-secondary hover:text-text-body transition-colors duration-150"
          >
            {labels.providers}
          </Link>
        </div>

        <LocaleSwitcher currentLocale={currentLocale} />

        <div className="flex flex-col gap-0.5 md:text-right">
          <span className="text-[12px] text-text-secondary">
            {labels.footer_copyright}
          </span>
          <span className="text-[12px] text-text-muted">
            {labels.footer_contact}
          </span>
        </div>
      </div>
    </footer>
  );
}
