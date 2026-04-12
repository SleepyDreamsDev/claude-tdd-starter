"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

function humanize(segment: string): string {
  const words = segment.split("-");
  return (
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1) +
    (words.length > 1 ? " " + words.slice(1).join(" ") : "")
  );
}

export function Breadcrumbs({
  locale,
  homeLabel,
  segmentLabels = {},
}: {
  locale: Locale;
  homeLabel: string;
  /** Translated labels for known static route segments, e.g. { providers: "Specialiști" } */
  segmentLabels?: Record<string, string>;
}) {
  const pathname = usePathname();
  // Drop the leading empty string and locale segment
  const segments = pathname.split("/").filter(Boolean).slice(1);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="px-4 md:px-8 py-2 bg-bg-page">
      <ol className="flex items-center gap-1 text-[12px] text-text-secondary flex-wrap">
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-text-body transition-colors duration-150"
          >
            {homeLabel}
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${locale}/${segments.slice(0, index + 1).join("/")}`;
          return (
            <li key={href} className="flex items-center gap-1">
              <ChevronRight size={12} strokeWidth={1.3} aria-hidden="true" />
              {isLast ? (
                <span className="text-text-body" aria-current="page">
                  {segmentLabels[segment] ?? humanize(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-text-body transition-colors duration-150"
                >
                  {segmentLabels[segment] ?? humanize(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
