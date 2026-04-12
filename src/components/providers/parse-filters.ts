import type { ProviderFilters, ServiceType, Neighborhood } from "@/lib/types";

const VALID_SERVICE_TYPES: ServiceType[] = [
  "GENERAL_CLEANING",
  "DEEP_CLEANING",
  "POST_RENOVATION",
  "MAINTENANCE",
  "WINDOW_CLEANING",
  "CARPET_CLEANING",
  "UPHOLSTERY_CLEANING",
  "MOVE_IN_OUT",
];

const VALID_NEIGHBORHOODS: Neighborhood[] = [
  "centru",
  "botanica",
  "buiucani",
  "ciocana",
  "riscani",
  "telecentru",
  "durlesti",
  "sculeni",
  "posta-veche",
  "rascanovca",
];

const VALID_SORT_VALUES = [
  "rating",
  "price_asc",
  "price_desc",
  "reviews",
] as const;
type SortBy = (typeof VALID_SORT_VALUES)[number];

export function parseFiltersFromParams(
  params: URLSearchParams,
): ProviderFilters {
  const filters: ProviderFilters = {};

  const service = params.get("service");
  if (service && (VALID_SERVICE_TYPES as string[]).includes(service)) {
    filters.serviceType = service as ServiceType;
  }

  const area = params.get("area");
  if (area && (VALID_NEIGHBORHOODS as string[]).includes(area)) {
    filters.neighborhood = area as Neighborhood;
  }

  const minRating = params.get("minRating");
  if (minRating !== null) {
    const parsed = parseFloat(minRating);
    if (!isNaN(parsed)) {
      filters.minRating = parsed;
    }
  }

  const minPrice = params.get("minPrice");
  if (minPrice !== null) {
    const parsed = parseFloat(minPrice);
    if (!isNaN(parsed)) {
      filters.minPrice = parsed;
    }
  }

  const maxPrice = params.get("maxPrice");
  if (maxPrice !== null) {
    const parsed = parseFloat(maxPrice);
    if (!isNaN(parsed)) {
      filters.maxPrice = parsed;
    }
  }

  const sort = params.get("sort");
  if (sort && (VALID_SORT_VALUES as readonly string[]).includes(sort)) {
    filters.sortBy = sort as SortBy;
  }

  const search = params.get("search");
  if (search && search.length > 0) {
    filters.search = search;
  }

  return filters;
}

export function filtersToParams(filters: ProviderFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.serviceType !== undefined) {
    params.set("service", filters.serviceType);
  }

  if (filters.neighborhood !== undefined) {
    params.set("area", filters.neighborhood);
  }

  if (filters.minRating !== undefined) {
    params.set("minRating", String(filters.minRating));
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.sortBy !== undefined) {
    params.set("sort", filters.sortBy);
  }

  if (filters.search !== undefined) {
    params.set("search", filters.search);
  }

  return params;
}
