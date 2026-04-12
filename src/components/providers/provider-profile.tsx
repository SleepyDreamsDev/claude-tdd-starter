import Link from "next/link";
import type { Locale, Provider, Review } from "@/lib/types";
import { StarRating } from "@/components/ui/star-rating";
import { PhotoGallery } from "@/components/providers/photo-gallery";
import { ReviewCard } from "@/components/providers/review-card";
import { AvailabilityTable } from "@/components/providers/availability-table";

interface ProfileLabels {
  verified: string;
  per_sqm: string;
  reviews: string;
  rating_aria?: string;
  services_and_prices: string;
  coverage_areas: string;
  availability: string;
  recent_reviews: string;
  book_cta: string;
  no_availability: string;
  day_mon: string;
  day_tue: string;
  day_wed: string;
  day_thu: string;
  day_fri: string;
  day_sat: string;
  day_sun: string;
  service_labels: Record<string, string>;
  area_labels: Record<string, string>;
}

interface ProviderProfileProps {
  provider: Provider;
  reviews: Review[];
  locale: Locale;
  labels: ProfileLabels;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border-light pb-4">
      <h3 className="mb-2 text-[13px] font-medium text-text-heading">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProviderProfile({
  provider,
  reviews,
  locale,
  labels,
}: ProviderProfileProps) {
  const ctaText = labels.book_cta.replace(
    "{{price}}",
    String(provider.pricePerSqm),
  );

  const ratingAria = labels.rating_aria?.replace(
    "{{rating}}",
    String(provider.ratingAvg),
  );

  const availabilityLabels = {
    day_mon: labels.day_mon,
    day_tue: labels.day_tue,
    day_wed: labels.day_wed,
    day_thu: labels.day_thu,
    day_fri: labels.day_fri,
    day_sat: labels.day_sat,
    day_sun: labels.day_sun,
    no_availability: labels.no_availability,
  };

  return (
    <div className="relative">
      {/* Content with bottom padding to clear the sticky CTA bar */}
      <div className="mx-auto max-w-3xl pb-24 md:px-8 md:pb-8 md:pt-4">
        {/* Hero image / avatar */}
        <PhotoGallery
          companyName={provider.companyName}
          photoUrls={provider.photoUrls}
          closeLabel="×"
        />

        {/* Name + rating */}
        <div className="border-b border-border-light px-4 pb-4 md:px-0">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h2 className="font-heading text-[20px] font-medium text-text-heading">
              {provider.companyName}
            </h2>
            {provider.verified && (
              <span className="shrink-0 rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-medium text-text-accent">
                {labels.verified}
              </span>
            )}
          </div>
          <StarRating
            rating={provider.ratingAvg}
            count={provider.reviewCount}
            countLabel={labels.reviews}
            ariaLabel={ratingAria}
            size="md"
          />
        </div>

        {/* Bio */}
        <div className="border-b border-border-light px-4 py-4 md:px-0">
          <p className="text-[13px] leading-[1.6] text-text-body">
            {provider.bio[locale]}
          </p>
        </div>

        {/* Services & prices */}
        <div className="border-b border-border-light px-4 py-4 md:px-0">
          <h3 className="mb-2 text-[13px] font-medium text-text-heading">
            {labels.services_and_prices}
          </h3>
          <div className="flex flex-col gap-1.5">
            {provider.services.map((service) => (
              <div key={service} className="flex justify-between text-[13px]">
                <span className="text-text-body">
                  {labels.service_labels[service] ?? service}
                </span>
                <span className="font-medium text-primary">
                  {provider.pricePerSqm} {labels.per_sqm}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage areas */}
        <div className="border-b border-border-light px-4 py-4 md:px-0">
          <h3 className="mb-2 text-[13px] font-medium text-text-heading">
            {labels.coverage_areas}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {provider.coverageAreas.map((area) => (
              <span
                key={area}
                className="rounded-md bg-primary-subtle px-2.5 py-1 text-[12px] text-text-body"
              >
                {labels.area_labels[area] ?? area}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="border-b border-border-light px-4 py-4 md:px-0">
          <h3 className="mb-2 text-[13px] font-medium text-text-heading">
            {labels.availability}
          </h3>
          <AvailabilityTable
            slots={provider.availability}
            labels={availabilityLabels}
          />
        </div>

        {/* Reviews */}
        <div className="px-4 py-4 md:px-0">
          <h3 className="mb-3 text-[13px] font-medium text-text-heading">
            {labels.recent_reviews}
          </h3>
          <div className="flex flex-col gap-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border-default bg-bg-card px-4 pb-7 pt-3 md:static md:mx-auto md:max-w-3xl md:border-t-0 md:px-8 md:pb-8">
        <Link
          href={`/${locale}/booking/${provider.slug}`}
          className="block w-full rounded-xl bg-primary px-4 py-3.5 text-center text-[15px] font-medium text-white transition-all duration-150 hover:bg-primary-hover active:scale-[0.98]"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
