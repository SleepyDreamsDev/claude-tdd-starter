import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
