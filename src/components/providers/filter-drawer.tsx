"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterContent } from "@/components/providers/filter-content";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ProviderFilters } from "@/lib/types";

interface FilterDrawerProps {
  filters: ProviderFilters;
  onApply: (filters: ProviderFilters) => void;
  resultCount: number;
  labels: {
    filters: string;
    reset_filters: string;
    apply_filters: string;
    service_type: string;
    neighborhood: string;
    price_range: string;
    min_rating: string;
    all_services: string;
    all_areas: string;
  };
  serviceTypes: { value: string; label: string }[];
  neighborhoods: { value: string; label: string }[];
}

export function FilterDrawer({
  filters,
  onApply,
  labels,
  serviceTypes,
  neighborhoods,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<ProviderFilters>(filters);

  const activeCount = [
    filters.serviceType,
    filters.neighborhood,
    filters.minRating,
    filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? true
      : undefined,
  ].filter(Boolean).length;

  const filterLabels = {
    service_type: labels.service_type,
    neighborhood: labels.neighborhood,
    price_range: labels.price_range,
    min_rating: labels.min_rating,
    all_services: labels.all_services,
    all_areas: labels.all_areas,
    reset_filters: labels.reset_filters,
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) setLocalFilters(filters);
      }}
    >
      <SheetTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-lg border-[0.5px] border-border-default bg-bg-card px-3 py-2 text-sm text-text-body">
          <SlidersHorizontal
            size={16}
            strokeWidth={1.3}
            className="text-primary"
          />
          {labels.filters}
          {activeCount > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="rounded-t-xl max-h-[85vh] flex flex-col p-0"
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border-default" />
        <div className="flex items-center justify-between px-5 py-3">
          <span className="font-medium text-text-heading">
            {labels.filters}
          </span>
          <button
            onClick={() => setLocalFilters({})}
            className="text-sm text-primary"
          >
            {labels.reset_filters}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <FilterContent
            filters={localFilters}
            onFilterChange={setLocalFilters}
            onReset={() => setLocalFilters({})}
            labels={filterLabels}
            serviceTypes={serviceTypes}
            neighborhoods={neighborhoods}
          />
        </div>
        <div className="border-t-[0.5px] border-border-light p-4">
          <SheetClose asChild>
            <button
              onClick={() => onApply(localFilters)}
              className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white active:scale-[0.98] transition-all duration-150"
            >
              {labels.apply_filters}
            </button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
