import { describe, it, expect } from "vitest";
import {
  parseFiltersFromParams,
  filtersToParams,
} from "@/components/providers/parse-filters";

describe("parseFiltersFromParams", () => {
  it("parses valid service=DEEP_CLEANING → serviceType", () => {
    const params = new URLSearchParams("service=DEEP_CLEANING");
    const result = parseFiltersFromParams(params);
    expect(result.serviceType).toBe("DEEP_CLEANING");
  });

  it("parses valid area=botanica → neighborhood", () => {
    const params = new URLSearchParams("area=botanica");
    const result = parseFiltersFromParams(params);
    expect(result.neighborhood).toBe("botanica");
  });

  it("ignores invalid service value → serviceType is undefined", () => {
    const params = new URLSearchParams("service=INVALID_SERVICE");
    const result = parseFiltersFromParams(params);
    expect(result.serviceType).toBeUndefined();
  });

  it("ignores invalid area value → neighborhood is undefined", () => {
    const params = new URLSearchParams("area=unknown-area");
    const result = parseFiltersFromParams(params);
    expect(result.neighborhood).toBeUndefined();
  });

  it("parses minRating=4 → minRating: 4", () => {
    const params = new URLSearchParams("minRating=4");
    const result = parseFiltersFromParams(params);
    expect(result.minRating).toBe(4);
  });

  it("parses minPrice=20&maxPrice=60 → { minPrice: 20, maxPrice: 60 }", () => {
    const params = new URLSearchParams("minPrice=20&maxPrice=60");
    const result = parseFiltersFromParams(params);
    expect(result.minPrice).toBe(20);
    expect(result.maxPrice).toBe(60);
  });

  it("parses valid sort=price_asc → sortBy: 'price_asc'", () => {
    const params = new URLSearchParams("sort=price_asc");
    const result = parseFiltersFromParams(params);
    expect(result.sortBy).toBe("price_asc");
  });

  it("ignores invalid sort=foo → sortBy is undefined", () => {
    const params = new URLSearchParams("sort=foo");
    const result = parseFiltersFromParams(params);
    expect(result.sortBy).toBeUndefined();
  });

  it("empty params → returns {}", () => {
    const params = new URLSearchParams();
    const result = parseFiltersFromParams(params);
    expect(result).toEqual({});
  });
});

describe("filtersToParams", () => {
  it("round-trip: filtersToParams(parseFiltersFromParams(params)) preserves values for a full params set", () => {
    const original = new URLSearchParams(
      "service=GENERAL_CLEANING&area=centru&minRating=4&minPrice=20&maxPrice=80&sort=rating&search=test",
    );
    const filters = parseFiltersFromParams(original);
    const result = filtersToParams(filters);

    expect(result.get("service")).toBe("GENERAL_CLEANING");
    expect(result.get("area")).toBe("centru");
    expect(result.get("minRating")).toBe("4");
    expect(result.get("minPrice")).toBe("20");
    expect(result.get("maxPrice")).toBe("80");
    expect(result.get("sort")).toBe("rating");
    expect(result.get("search")).toBe("test");
  });

  it("skips undefined values — no empty string params", () => {
    const filters = { serviceType: "DEEP_CLEANING" as const };
    const result = filtersToParams(filters);

    expect(result.get("service")).toBe("DEEP_CLEANING");
    expect(result.get("area")).toBeNull();
    expect(result.get("minRating")).toBeNull();
    expect(result.get("minPrice")).toBeNull();
    expect(result.get("maxPrice")).toBeNull();
    expect(result.get("sort")).toBeNull();
    expect(result.get("search")).toBeNull();
  });
});
