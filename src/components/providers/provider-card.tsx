import Link from "next/link";
import { SERVICE_TYPES } from "@/lib/constants";
import type { Locale, Provider } from "@/lib/types";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";

interface ProviderCardProps {
  provider: Provider;
  locale: Locale;
  labels: {
    verified: string;
    per_sqm: string;
    reviews: string;
    rating_aria?: string;
  };
  variant?: "list" | "mini" | "grid";
  areas?: string[];
  className?: string;
}

const MAX_VISIBLE_TAGS = 2;
const MAX_VISIBLE_GRID_TAGS = 3;

function getServiceLabel(service: string, locale: Locale): string {
  const found = SERVICE_TYPES.find((s) => s.value === service);
  return found ? found.label[locale] : service;
}

export function ProviderCard({
  provider,
  locale,
  labels,
  variant = "list",
  areas,
  className,
}: ProviderCardProps) {
  const initials = getInitials(provider.companyName);
  const avatarColor = getAvatarColor(provider.companyName);
  const overflowCount = provider.services.length - MAX_VISIBLE_TAGS;
  const ratingAriaLabel = labels.rating_aria
    ? labels.rating_aria.replace("{{rating}}", String(provider.ratingAvg))
    : undefined;

  if (variant === "grid") {
    const gridOverflowCount = provider.services.length - MAX_VISIBLE_GRID_TAGS;
    return (
      <Link
        href={`/${locale}/providers/${provider.slug}`}
        className={cn(
          "flex flex-col overflow-hidden rounded-xl border-[0.5px] border-border-default bg-bg-card transition-all duration-150 hover:border-border-hover hover:shadow-sm",
          className,
        )}
      >
        <div
          className={cn(
            "relative flex h-[100px] items-center justify-center",
            avatarColor.bg,
          )}
        >
          <span className={cn("text-2xl font-medium", avatarColor.text)}>
            {initials}
          </span>
          {provider.verified && (
            <span className="absolute right-2 top-2 rounded-sm bg-white/80 px-1.5 py-0.5 text-[10px] text-text-accent">
              {labels.verified}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 p-3.5">
          <div className="flex items-baseline justify-between">
            <span className="flex-1 text-sm font-medium text-text-heading">
              {provider.companyName}
            </span>
            <span className="shrink-0 text-sm font-medium text-primary">
              {provider.pricePerSqm}{" "}
              <span className="text-[11px] text-text-muted">
                {labels.per_sqm}
              </span>
            </span>
          </div>
          <StarRating
            rating={provider.ratingAvg}
            count={provider.reviewCount}
            countLabel={labels.reviews}
            ariaLabel={ratingAriaLabel}
            size="sm"
          />
          <div className="flex flex-wrap gap-1">
            {provider.services
              .slice(0, MAX_VISIBLE_GRID_TAGS)
              .map((service) => (
                <span
                  key={service}
                  data-testid="grid-service-tag"
                  className="rounded-sm bg-primary-subtle px-1.5 py-0.5 text-[11px] text-text-body"
                >
                  {getServiceLabel(service, locale)}
                </span>
              ))}
            {gridOverflowCount > 0 && (
              <span className="rounded-sm bg-primary-subtle px-1.5 py-0.5 text-[11px] text-text-body">
                +{gridOverflowCount}
              </span>
            )}
          </div>
          {areas && areas.length > 0 && (
            <span className="text-[11px] text-text-secondary">
              {areas.slice(0, 3).join(" · ")}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "mini") {
    return (
      <Link
        href={`/${locale}/providers/${provider.slug}`}
        className={cn("flex items-center gap-2.5", className)}
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-medium",
            avatarColor.bg,
            avatarColor.text,
          )}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-text-heading">
            {provider.companyName}
          </div>
          <StarRating
            rating={provider.ratingAvg}
            count={provider.reviewCount}
            countLabel={labels.reviews}
            ariaLabel={ratingAriaLabel}
            size="sm"
          />
        </div>
        <span className="text-[13px] font-medium text-primary">
          {provider.pricePerSqm}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}/providers/${provider.slug}`}
      className={cn(
        "flex gap-3 rounded-xl border-[0.5px] border-border-default bg-bg-card p-3.5 transition-all duration-150 hover:border-border-hover hover:shadow-sm",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-medium",
          avatarColor.bg,
          avatarColor.text,
        )}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between">
          <span className="text-sm font-medium text-text-heading">
            {provider.companyName}
          </span>
          <span className="shrink-0 text-sm font-medium text-primary">
            {provider.pricePerSqm}{" "}
            <span className="text-[11px] text-text-muted">
              {labels.per_sqm}
            </span>
          </span>
        </div>
        <div className="mb-1.5 flex items-center gap-1">
          <StarRating
            rating={provider.ratingAvg}
            count={provider.reviewCount}
            countLabel={labels.reviews}
            ariaLabel={ratingAriaLabel}
            size="sm"
          />
          {provider.verified && (
            <span className="rounded-sm bg-primary-light px-1.5 py-0.5 text-[10px] text-text-accent">
              {labels.verified}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {provider.services.slice(0, MAX_VISIBLE_TAGS).map((service) => (
            <span
              key={service}
              data-testid="service-tag"
              className="rounded-sm bg-primary-subtle px-1.5 py-0.5 text-[11px] text-text-body"
            >
              {getServiceLabel(service, locale)}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="rounded-sm bg-primary-subtle px-1.5 py-0.5 text-[11px] text-text-body">
              +{overflowCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
