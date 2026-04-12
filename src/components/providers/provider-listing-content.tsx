"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProviderCard } from "@/components/providers/provider-card";
import { FilterDrawer } from "@/components/providers/filter-drawer";
import { FilterSidebar } from "@/components/providers/filter-sidebar";
import { SortSelect } from "@/components/providers/sort-select";
import { NoResults } from "@/components/providers/no-results";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  parseFiltersFromParams,
  filtersToParams,
} from "@/components/providers/parse-filters";
import { getProviders } from "@/lib/mock-data";
import type { Locale, ProviderFilters, ServiceType } from "@/lib/types";

interface ProviderListingContentProps {
  locale: Locale;
  serviceTypes: { value: string; label: string }[];
  neighborhoods: { value: string; label: string }[];
  labels: {
    filters: string;
    sort_by: string;
    no_results: string;
    per_sqm: string;
    reviews: string;
    rating_aria: string;
    title: string;
    found_count: string;
    min_rating: string;
    price_range: string;
    all_services: string;
    all_areas: string;
    verified: string;
    sort_rating: string;
    sort_price_asc: string;
    sort_price_desc: string;
    sort_reviews: string;
    reset_filters: string;
    apply_filters: string;
    show_results: string;
    service_type: string;
    neighborhood: string;
    no_results_hint: string;
  };
}

export function ProviderListingContent({
  locale,
  serviceTypes,
  neighborhoods,
  labels,
}: ProviderListingContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = parseFiltersFromParams(
    new URLSearchParams(searchParams.toString()),
  );
  const providers = getProviders(filters);

  function updateFilters(newFilters: ProviderFilters) {
    const params = filtersToParams(newFilters);
    router.replace(
      `${pathname}${params.size > 0 ? "?" + params.toString() : ""}`,
      { scroll: false },
    );
  }

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  const cardLabels = {
    verified: labels.verified,
    per_sqm: labels.per_sqm,
    reviews: labels.reviews,
    rating_aria: labels.rating_aria,
  };

  const foundCountText = labels.found_count.replace(
    "{{count}}",
    String(providers.length),
  );

  const sortValue = filters.sortBy ?? "rating";

  const filterLabels = {
    service_type: labels.service_type,
    neighborhood: labels.neighborhood,
    price_range: labels.price_range,
    min_rating: labels.min_rating,
    all_services: labels.all_services,
    all_areas: labels.all_areas,
    reset_filters: labels.reset_filters,
  };

  function getAreaLabels(areas: string[]): string[] {
    return areas.map(
      (a) => neighborhoods.find((n) => n.value === a)?.label ?? a,
    );
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-8">
        <h1 className="font-heading text-2xl text-text-heading mb-6">
          {labels.title}
        </h1>

        {/* MOBILE layout */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-3">
            <Select
              value={filters.serviceType ?? ""}
              onValueChange={(v) =>
                updateFilters({
                  ...filters,
                  serviceType:
                    v === "__clear__"
                      ? undefined
                      : (v as ServiceType) || undefined,
                  sortBy: filters.sortBy,
                })
              }
            >
              <SelectTrigger className="flex-1 border-[0.5px] border-border-default bg-bg-card text-sm h-9">
                <SelectValue placeholder={labels.all_services} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__">{labels.all_services}</SelectItem>
                {serviceTypes.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FilterDrawer
              filters={filters}
              onApply={(newFilters) => updateFilters(newFilters)}
              resultCount={providers.length}
              labels={{
                filters: labels.filters,
                apply_filters: labels.apply_filters,
                ...filterLabels,
              }}
              serviceTypes={serviceTypes}
              neighborhoods={neighborhoods}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-secondary">
              {foundCountText}
            </span>
            <SortSelect
              value={sortValue}
              onChange={(v) =>
                updateFilters({
                  ...filters,
                  sortBy: v as ProviderFilters["sortBy"],
                })
              }
              labels={{
                sort_by: labels.sort_by,
                sort_rating: labels.sort_rating,
                sort_price_asc: labels.sort_price_asc,
                sort_price_desc: labels.sort_price_desc,
                sort_reviews: labels.sort_reviews,
              }}
            />
          </div>
          {providers.length === 0 ? (
            <NoResults
              labels={{
                no_results: labels.no_results,
                no_results_hint: labels.no_results_hint,
                reset_filters: labels.reset_filters,
              }}
              onReset={resetFilters}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {providers.map((p) => (
                <ProviderCard
                  key={p.id}
                  provider={p}
                  locale={locale}
                  labels={cardLabels}
                  variant="list"
                />
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP layout */}
        <div className="hidden lg:flex gap-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilters}
            onReset={resetFilters}
            labels={filterLabels}
            serviceTypes={serviceTypes}
            neighborhoods={neighborhoods}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-text-secondary">
                {foundCountText}
              </span>
              <SortSelect
                value={sortValue}
                onChange={(v) =>
                  updateFilters({
                    ...filters,
                    sortBy: v as ProviderFilters["sortBy"],
                  })
                }
                labels={{
                  sort_by: labels.sort_by,
                  sort_rating: labels.sort_rating,
                  sort_price_asc: labels.sort_price_asc,
                  sort_price_desc: labels.sort_price_desc,
                  sort_reviews: labels.sort_reviews,
                }}
              />
            </div>
            {providers.length === 0 ? (
              <NoResults
                labels={{
                  no_results: labels.no_results,
                  no_results_hint: labels.no_results_hint,
                  reset_filters: labels.reset_filters,
                }}
                onReset={resetFilters}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {providers.map((p) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    locale={locale}
                    labels={cardLabels}
                    variant="grid"
                    areas={getAreaLabels(p.coverageAreas)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
