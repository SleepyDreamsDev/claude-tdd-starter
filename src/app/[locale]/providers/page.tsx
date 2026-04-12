import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/config";
import { SERVICE_TYPES, NEIGHBORHOODS } from "@/lib/constants";
import { ProviderListingContent } from "@/components/providers/provider-listing-content";
import type { Locale } from "@/lib/types";

interface ProvidersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProvidersPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.providers.title} — Forever Clean`,
    description:
      locale === "ro"
        ? "Compară prețuri, recenzii și disponibilitate specialiștilor de curățenie din Chișinău."
        : "Сравните цены, отзывы и доступность специалистов по уборке в Кишинёве.",
  };
}

export default async function ProvidersPage({ params }: ProvidersPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  const serviceTypes = SERVICE_TYPES.map((s) => ({
    value: s.value,
    label: s.label[l],
  }));
  const neighborhoods = NEIGHBORHOODS.map((n) => ({
    value: n.value,
    label: n.label[l],
  }));

  const labels = {
    filters: dict.common.filters,
    sort_by: dict.common.sort_by,
    no_results: dict.common.no_results,
    per_sqm: dict.common.per_sqm,
    reviews: dict.common.reviews,
    rating_aria: dict.common.rating_aria,
    title: dict.providers.title,
    found_count: dict.providers.found_count,
    min_rating: dict.providers.min_rating,
    price_range: dict.providers.price_range,
    all_services: dict.providers.all_services,
    all_areas: dict.providers.all_areas,
    verified: dict.providers.verified,
    sort_rating: dict.providers.sort_rating,
    sort_price_asc: dict.providers.sort_price_asc,
    sort_price_desc: dict.providers.sort_price_desc,
    sort_reviews: dict.providers.sort_reviews,
    reset_filters: dict.providers.reset_filters,
    apply_filters: dict.providers.apply_filters,
    show_results: dict.providers.show_results,
    service_type: dict.providers.service_type,
    neighborhood: dict.providers.neighborhood,
    no_results_hint: dict.providers.no_results_hint,
  };

  return (
    <Suspense>
      <ProviderListingContent
        locale={l}
        labels={labels}
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
      />
    </Suspense>
  );
}
