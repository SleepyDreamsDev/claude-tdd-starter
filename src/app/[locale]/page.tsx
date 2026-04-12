import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-bg-page gap-4">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher currentLocale={locale} />
      </div>
      <h1 className="font-heading text-text-heading text-4xl">Forever Clean</h1>
      <p className="text-text-body">{dict.home.hero_subtitle}</p>
      <Button>{dict.common.book_now}</Button>
    </main>
  );
}
