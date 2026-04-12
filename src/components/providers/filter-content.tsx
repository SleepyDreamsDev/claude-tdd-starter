"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Neighborhood, ProviderFilters } from "@/lib/types";

interface FilterContentProps {
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

const ratingChips = [
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

export function FilterContent({
  filters,
  onFilterChange,
  onReset,
  labels,
  serviceTypes,
  neighborhoods,
}: FilterContentProps) {
  const minPrice = filters.minPrice ?? 10;
  const maxPrice = filters.maxPrice ?? 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Section 1 — Service type */}
      <div>
        <p className="text-sm font-medium text-text-heading mb-2">
          {labels.service_type}
        </p>
        <div className="flex flex-col gap-1.5">
          {serviceTypes.map((item) => {
            const checked = filters.serviceType === item.value;
            return (
              <div key={item.value} className="flex items-center gap-2">
                <Checkbox
                  id={`service-${item.value}`}
                  checked={checked}
                  onCheckedChange={() => {
                    if (checked) {
                      onFilterChange({ ...filters, serviceType: undefined });
                    } else {
                      onFilterChange({
                        ...filters,
                        serviceType:
                          item.value as ProviderFilters["serviceType"],
                      });
                    }
                  }}
                />
                <label
                  htmlFor={`service-${item.value}`}
                  className="text-sm text-text-body cursor-pointer"
                >
                  {item.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Neighborhood */}
      <div>
        <p className="text-sm font-medium text-text-heading mb-2">
          {labels.neighborhood}
        </p>
        <Select
          value={filters.neighborhood ?? "__all__"}
          onValueChange={(val) => {
            if (val === "__all__") {
              onFilterChange({ ...filters, neighborhood: undefined });
            } else {
              onFilterChange({ ...filters, neighborhood: val as Neighborhood });
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={labels.all_areas} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{labels.all_areas}</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Section 3 — Price range */}
      <div>
        <p className="text-sm font-medium text-text-heading mb-1">
          {labels.price_range}
        </p>
        <p className="text-xs text-text-secondary mb-2">
          {minPrice} – {maxPrice} lei/m²
        </p>
        <Slider
          min={10}
          max={100}
          step={5}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]: number[]) =>
            onFilterChange({ ...filters, minPrice: min, maxPrice: max })
          }
        />
      </div>

      {/* Section 4 — Min rating */}
      <div>
        <p className="text-sm font-medium text-text-heading mb-2">
          {labels.min_rating}
        </p>
        <div className="flex gap-2">
          {ratingChips.map((chip) => {
            const active = filters.minRating === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => {
                  if (active) {
                    onFilterChange({ ...filters, minRating: undefined });
                  } else {
                    onFilterChange({ ...filters, minRating: chip.value });
                  }
                }}
                className={
                  active
                    ? "bg-primary text-white rounded-lg px-3.5 py-1.5 text-[13px]"
                    : "border-[0.5px] border-border-default text-text-body rounded-lg px-3.5 py-1.5 text-[13px]"
                }
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 5 — Reset */}
      <button
        onClick={onReset}
        className="text-sm text-primary hover:underline text-left"
      >
        {labels.reset_filters}
      </button>
    </div>
  );
}
