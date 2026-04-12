"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export type HeaderLabels = {
  home: string;
  providers: string;
  book_now: string;
  open_menu: string;
  close_menu: string;
};

export function Header({
  labels,
  currentLocale,
}: {
  labels: HeaderLabels;
  currentLocale: Locale;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${currentLocale}`, label: labels.home },
    { href: `/${currentLocale}/providers`, label: labels.providers },
  ];

  return (
    <header className="bg-bg-card border-b-[0.5px] border-border-default sticky top-0 z-40">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="flex items-center gap-1.5">
          <div
            className="w-[5px] h-5 bg-primary rounded-sm"
            aria-hidden="true"
          />
          <span className="font-heading font-medium text-[15px] text-text-heading">
            Forever Clean
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[14px] transition-colors duration-150",
                pathname === link.href
                  ? "text-primary font-medium"
                  : "text-text-secondary hover:text-text-body",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <LocaleSwitcher currentLocale={currentLocale} />

          {/* Desktop CTA */}
          <Link
            href={`/${currentLocale}/providers`}
            className="hidden md:flex items-center bg-primary text-white text-[13px] font-medium px-5 py-2 rounded-lg hover:bg-primary-hover transition-colors duration-150 active:scale-[0.98]"
          >
            {labels.book_now}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 min-h-11 min-w-11 flex items-center justify-center"
            aria-label={isMenuOpen ? labels.close_menu : labels.open_menu}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={1.3} className="text-text-heading" />
            ) : (
              <Menu size={20} strokeWidth={1.3} className="text-text-heading" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t-[0.5px] border-border-light bg-bg-card px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[14px] py-3 transition-colors duration-150",
                pathname === link.href
                  ? "text-primary font-medium"
                  : "text-text-body",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${currentLocale}/providers`}
            className="mt-2 bg-primary text-white text-[14px] font-medium px-5 py-3 rounded-lg text-center hover:bg-primary-hover transition-colors duration-150 active:scale-[0.98]"
            onClick={() => setIsMenuOpen(false)}
          >
            {labels.book_now}
          </Link>
        </nav>
      )}
    </header>
  );
}
