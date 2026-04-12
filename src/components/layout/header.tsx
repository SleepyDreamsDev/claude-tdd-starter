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
  how_it_works: string;
  about: string;
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
    { href: `/${currentLocale}#how-it-works`, label: labels.how_it_works },
    { href: "#", label: labels.about },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b-[0.5px] border-border-default bg-bg-card">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[14px] transition-colors duration-150",
                  pathname === link.href
                    ? "font-medium text-primary"
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
              className="hidden w-[140px] items-center justify-center rounded-lg bg-primary py-2 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-primary-hover active:scale-[0.98] md:flex"
            >
              {labels.book_now}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="flex min-h-11 min-w-11 items-center justify-center p-1 md:hidden"
              aria-label={isMenuOpen ? labels.close_menu : labels.open_menu}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={1.3} className="text-text-heading" />
              ) : (
                <Menu
                  size={20}
                  strokeWidth={1.3}
                  className="text-text-heading"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu — always rendered, animated via max-height */}
        <nav
          className={cn(
            "overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden",
            isMenuOpen ? "max-h-[400px]" : "max-h-0",
          )}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-1 border-t-[0.5px] border-border-light bg-bg-card px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-3 text-[14px] transition-colors duration-150",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-text-body",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${currentLocale}/providers`}
              className="mt-2 rounded-lg bg-primary px-5 py-3 text-center text-[14px] font-medium text-white transition-colors duration-150 hover:bg-primary-hover active:scale-[0.98]"
              onClick={() => setIsMenuOpen(false)}
            >
              {labels.book_now}
            </Link>
          </div>
        </nav>
      </header>

      {/* Backdrop overlay — sibling of header so it escapes header stacking context */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
