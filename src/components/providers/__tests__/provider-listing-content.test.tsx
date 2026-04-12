import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ProviderListingContent } from "@/components/providers/provider-listing-content";
import type { Provider } from "@/lib/types";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/ro/providers",
}));

// Radix UI components require ResizeObserver which is not available in jsdom
vi.mock("@/components/providers/filter-drawer", () => ({
  FilterDrawer: () => <button>Filtre</button>,
}));

vi.mock("@/components/providers/filter-sidebar", () => ({
  FilterSidebar: () => <aside data-testid="filter-sidebar" />,
}));

vi.mock("@/components/providers/sort-select", () => ({
  SortSelect: ({ value }: { value: string }) => (
    <select role="combobox" defaultValue={value}>
      <option value="rating">Rating</option>
    </select>
  ),
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (v: string) => void;
  }) => (
    <div data-testid="service-select" data-value={value}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => (
    <span>{placeholder}</span>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectItem: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: string;
  }) => <div data-value={value}>{children}</div>,
}));

import React from "react";

const mockProviders: Provider[] = [
  {
    id: "1",
    slug: "cristal-plus",
    companyName: "Cristal Plus",
    bio: { ro: "Bio RO", ru: "Bio RU" },
    phone: "+373 69 000 001",
    email: "info@cristal.md",
    photoUrls: [],
    services: ["GENERAL_CLEANING", "DEEP_CLEANING"],
    pricePerSqm: 45,
    coverageAreas: ["centru", "botanica"],
    availability: [],
    ratingAvg: 4.8,
    reviewCount: 24,
    verified: true,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    slug: "sparkle-md",
    companyName: "Sparkle MD",
    bio: { ro: "Bio RO 2", ru: "Bio RU 2" },
    phone: "+373 69 000 002",
    email: "info@sparkle.md",
    photoUrls: [],
    services: ["MAINTENANCE"],
    pricePerSqm: 38,
    coverageAreas: ["buiucani"],
    availability: [],
    ratingAvg: 4.5,
    reviewCount: 12,
    verified: false,
    createdAt: "2024-02-01",
  },
];

vi.mock("@/lib/mock-data", () => ({
  getProviders: vi.fn(() => mockProviders),
}));

const labels = {
  filters: "Filtre",
  sort_by: "Sortează după",
  no_results: "Nu s-au găsit rezultate",
  per_sqm: "lei/m²",
  reviews: "recenzii",
  rating_aria: "{{rating}} din 5 stele",
  title: "Servicii de curățenie",
  found_count: "{{count}} specialiști găsiți",
  min_rating: "Rating minim",
  price_range: "Interval preț",
  all_services: "Toate serviciile",
  all_areas: "Toate cartierele",
  verified: "Verificat",
  sort_rating: "Rating",
  sort_price_asc: "Preț: mic → mare",
  sort_price_desc: "Preț: mare → mic",
  sort_reviews: "Nr. recenzii",
  reset_filters: "Resetează filtrele",
  apply_filters: "Aplică filtrele",
  show_results: "Arată {{count}} rezultate",
  service_type: "Tip serviciu",
  neighborhood: "Cartier",
  no_results_hint: "Încearcă să extinzi filtrele",
};

const serviceTypes = [
  { value: "GENERAL_CLEANING", label: "Curățenie generală" },
  { value: "DEEP_CLEANING", label: "Curățenie profundă" },
];

const neighborhoods = [
  { value: "centru", label: "Centru" },
  { value: "botanica", label: "Botanica" },
];

function renderContent() {
  return render(
    <ProviderListingContent
      locale="ro"
      labels={labels}
      serviceTypes={serviceTypes}
      neighborhoods={neighborhoods}
    />,
  );
}

describe("ProviderListingContent", () => {
  it("renders the page title", () => {
    renderContent();
    expect(
      screen.getByRole("heading", { name: "Servicii de curățenie" }),
    ).toBeInTheDocument();
  });

  it("renders found count text", () => {
    renderContent();
    expect(screen.getAllByText("2 specialiști găsiți")[0]).toBeInTheDocument();
  });

  it("renders provider cards for each provider", () => {
    renderContent();
    expect(screen.getAllByText("Cristal Plus")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Sparkle MD")[0]).toBeInTheDocument();
  });

  it("renders NoResults when getProviders returns empty array", async () => {
    const { getProviders } = await import("@/lib/mock-data");
    vi.mocked(getProviders).mockReturnValueOnce([]);
    renderContent();
    expect(
      screen.getAllByText("Nu s-au găsit rezultate")[0],
    ).toBeInTheDocument();
  });

  it("renders SortSelect", () => {
    renderContent();
    expect(screen.getAllByRole("combobox")[0]).toBeInTheDocument();
  });
});
