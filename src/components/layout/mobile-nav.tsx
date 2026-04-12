"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export type MobileNavLabels = {
  home_tab: string;
  search_tab: string;
  bookings_tab: string;
  account_tab: string;
};

export function MobileNav({
  labels,
  locale,
}: {
  labels: MobileNavLabels;
  locale: Locale;
}) {
  const pathname = usePathname();

  const tabs = [
    { href: `/${locale}`, label: labels.home_tab, icon: Home },
    { href: `/${locale}/providers`, label: labels.search_tab, icon: Search },
    {
      href: `/${locale}/bookings`,
      label: labels.bookings_tab,
      icon: Calendar,
    },
    { href: `/${locale}/account`, label: labels.account_tab, icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-card border-t-[0.5px] border-border-default z-40 flex justify-around pt-2 pb-5">
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center"
          >
            <Icon
              size={20}
              strokeWidth={1.3}
              className={cn(isActive ? "text-primary" : "text-text-muted")}
            />
            <span
              className={cn(
                "text-[10px]",
                isActive ? "text-primary font-medium" : "text-text-muted",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
