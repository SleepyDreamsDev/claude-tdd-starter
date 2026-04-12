import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "ru" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  const headerLabels = {
    home: dict.nav.home,
    providers: dict.nav.providers,
    how_it_works: dict.nav.how_it_works,
    about: dict.nav.about,
    book_now: dict.common.book_now,
    open_menu: dict.nav.open_menu,
    close_menu: dict.nav.close_menu,
  };

  const footerLabels = {
    home: dict.nav.home,
    providers: dict.nav.providers,
    how_it_works: dict.nav.how_it_works,
    about: dict.nav.about,
    terms: dict.nav.terms,
    privacy: dict.nav.privacy,
    contact: dict.nav.contact,
    footer_copyright: dict.nav.footer_copyright,
  };

  const mobileNavLabels = {
    home_tab: dict.nav.home,
    search_tab: dict.nav.search_tab,
    bookings_tab: dict.nav.bookings_tab,
    account_tab: dict.nav.account_tab,
  };

  return (
    <html lang={locale} className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#7b8cc4" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-page">
        <Header labels={headerLabels} currentLocale={locale} />
        <Breadcrumbs
          locale={locale}
          homeLabel={dict.nav.home}
          segmentLabels={{
            providers: dict.nav.providers,
            booking: dict.booking.title,
          }}
        />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer labels={footerLabels} currentLocale={locale} />
        <MobileNav labels={mobileNavLabels} locale={locale} />
      </body>
    </html>
  );
}
