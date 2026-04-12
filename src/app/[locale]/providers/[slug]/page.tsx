import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/config";
import { getProviderBySlug, getReviewsByProvider } from "@/lib/mock-data";
import { ProviderProfile } from "@/components/providers/provider-profile";
import type { Locale } from "@/lib/types";

interface ProfilePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * Safely serialise an object for use inside a <script> tag.
 * JSON.stringify alone does not escape </script>, which can break out of the tag.
 * We escape the three HTML-critical characters so the JSON remains valid but safe.
 */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const provider = getProviderBySlug(slug);
  if (!provider) return {};

  const l = locale as Locale;
  const bio = provider.bio[l];
  const description = bio.length > 160 ? bio.slice(0, 157) + "…" : bio;

  return {
    title: `${provider.companyName} — Forever Clean`,
    description,
    openGraph: {
      title: `${provider.companyName} — Forever Clean`,
      description,
      type: "website",
    },
  };
}

export default async function ProviderProfilePage({
  params,
}: ProfilePageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  const l = locale as Locale;
  const reviews = getReviewsByProvider(provider.id);
  const dict = await getDictionary(l);

  const labels = {
    verified: dict.providers.verified,
    per_sqm: dict.common.per_sqm,
    reviews: dict.common.reviews,
    rating_aria: dict.common.rating_aria,
    services_and_prices: dict.profile.services_and_prices,
    coverage_areas: dict.profile.coverage_areas,
    availability: dict.profile.availability,
    recent_reviews: dict.profile.recent_reviews,
    book_cta: dict.profile.book_cta,
    no_availability: dict.profile.no_availability,
    day_mon: dict.profile.day_mon,
    day_tue: dict.profile.day_tue,
    day_wed: dict.profile.day_wed,
    day_thu: dict.profile.day_thu,
    day_fri: dict.profile.day_fri,
    day_sat: dict.profile.day_sat,
    day_sun: dict.profile.day_sun,
    service_labels: dict.services as Record<string, string>,
    area_labels: dict.neighborhoods as Record<string, string>,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.companyName,
    description: provider.bio[l],
    telephone: provider.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.ratingAvg,
      reviewCount: provider.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ProviderProfile
        provider={provider}
        reviews={reviews}
        locale={l}
        labels={labels}
      />
    </>
  );
}
