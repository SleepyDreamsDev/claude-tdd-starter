import { render, screen } from "@testing-library/react";
import { ProviderCard } from "@/components/providers/provider-card";
import type { Provider } from "@/lib/types";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/ro"),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const baseProvider: Provider = {
  id: "7",
  slug: "diamond-cleaning",
  companyName: "Diamond Cleaning",
  bio: { ro: "Servicii premium", ru: "Премиум услуги" },
  phone: "+373 60 111 111",
  email: "info@diamond.md",
  photoUrls: [],
  services: [
    "GENERAL_CLEANING",
    "DEEP_CLEANING",
    "POST_RENOVATION",
    "MAINTENANCE",
    "WINDOW_CLEANING",
    "CARPET_CLEANING",
    "UPHOLSTERY_CLEANING",
    "MOVE_IN_OUT",
  ],
  pricePerSqm: 55,
  minBooking: 1200,
  coverageAreas: ["centru", "botanica", "telecentru"],
  availability: [{ dayOfWeek: "MON", startTime: "08:00", endTime: "18:00" }],
  ratingAvg: 4.9,
  reviewCount: 85,
  verified: true,
  createdAt: "2025-01-15",
};

const labels = {
  verified: "Verificat",
  per_sqm: "lei/m²",
  reviews: "recenzii",
};

describe("ProviderCard", () => {
  it("renders provider company name", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    expect(screen.getByText("Diamond Cleaning")).toBeInTheDocument();
  });

  it("renders price with per_sqm label", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    expect(screen.getByText("55")).toBeInTheDocument();
    expect(screen.getByText("lei/m²")).toBeInTheDocument();
  });

  it("renders star rating with correct values", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("(85 recenzii)")).toBeInTheDocument();
  });

  it("shows verified badge when provider is verified", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    expect(screen.getByText("Verificat")).toBeInTheDocument();
  });

  it("hides verified badge when provider is not verified", () => {
    const unverified = { ...baseProvider, verified: false };
    render(<ProviderCard provider={unverified} locale="ro" labels={labels} />);
    expect(screen.queryByText("Verificat")).not.toBeInTheDocument();
  });

  it("renders service tags with overflow indicator", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    // 8 services, max 2 shown + "+6"
    const tags = screen.getAllByTestId("service-tag");
    expect(tags).toHaveLength(2);
    expect(screen.getByText("+6")).toBeInTheDocument();
  });

  it("renders avatar with correct initials", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    expect(screen.getByText("DC")).toBeInTheDocument();
  });

  it("links to provider profile page", () => {
    render(
      <ProviderCard provider={baseProvider} locale="ro" labels={labels} />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/ro/providers/diamond-cleaning");
  });

  it("renders mini variant with compact layout and no tags", () => {
    render(
      <ProviderCard
        provider={baseProvider}
        locale="ro"
        labels={labels}
        variant="mini"
      />,
    );
    expect(screen.getByText("Diamond Cleaning")).toBeInTheDocument();
    expect(screen.queryAllByTestId("service-tag")).toHaveLength(0);
  });
});
