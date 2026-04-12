"use client";

import { FilterContent } from "@/components/providers/filter-content";
import type { ProviderFilters } from "@/lib/types";

interface FilterSidebarProps {
  filters: ProviderFilters;
  onFilterChange: (filters: ProviderFilters) => void;
  onReset: () => void;
  labels: {
    service_type: string;
    neighborhood: string;
    price_range: string;
    min_rating: string;
    all_services: string;
    all_areas: string;
    reset_filters: string;
  };
  serviceTypes: { value: string; label: string }[];
  neighborhoods: { value: string; label: string }[];
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  labels,
  serviceTypes,
  neighborhoods,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r-[0.5px] border-border-light bg-bg-card p-5 sticky top-20 self-start">
      <FilterContent
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onReset}
        labels={labels}
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
      />
    </aside>
  );
}
