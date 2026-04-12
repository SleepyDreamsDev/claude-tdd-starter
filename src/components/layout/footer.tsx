import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

export type FooterLabels = {
  home: string;
  providers: string;
  how_it_works: string;
  about: string;
  terms: string;
  privacy: string;
  contact: string;
  footer_copyright: string;
};

export function Footer({
  labels,
  currentLocale,
}: {
  labels: FooterLabels;
  currentLocale: Locale;
}) {
  return (
    <footer className="border-t-[0.5px] border-border-default bg-bg-page px-4 py-6 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-center md:gap-16">
        {/* Col 1: Logo + copyright */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/${currentLocale}`}
            className="flex items-center gap-1.5"
          >
            <div
              className="h-5 w-[5px] rounded-sm bg-primary"
              aria-hidden="true"
            />
            <span className="font-heading font-medium text-[15px] text-text-heading">
              Forever Clean
            </span>
          </Link>
          <span className="text-[12px] text-text-muted">
            {labels.footer_copyright}
          </span>
        </div>

        {/* Col 2: Nav + Legal side by side */}
        <div className="flex gap-10">
          {/* Nav links */}
          <div className="flex flex-col gap-1.5">
            <Link
              href={`/${currentLocale}`}
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.home}
            </Link>
            <Link
              href={`/${currentLocale}/providers`}
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.providers}
            </Link>
            <Link
              href={`/${currentLocale}#how-it-works`}
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.how_it_works}
            </Link>
            <Link
              href="#"
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.about}
            </Link>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-1.5">
            <Link
              href="#"
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.terms}
            </Link>
            <Link
              href="#"
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.privacy}
            </Link>
            <Link
              href="#"
              className="text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-body"
            >
              {labels.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
