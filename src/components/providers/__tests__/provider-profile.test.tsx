import { render, screen } from "@testing-library/react";
import { ProviderProfile } from "@/components/providers/provider-profile";
import { ReviewCard } from "@/components/providers/review-card";
import type { Provider, Review } from "@/lib/types";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/ro/providers/diamond-cleaning"),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

// photo-gallery uses Dialog which needs client env — mock it
vi.mock("@/components/providers/photo-gallery", () => ({
  PhotoGallery: ({ companyName }: { companyName: string }) => (
    <div data-testid="photo-gallery">{companyName}</div>
  ),
}));

const baseProvider: Provider = {
  id: "7",
  slug: "diamond-cleaning",
  companyName: "Diamond Cleaning",
  bio: {
    ro: "Servicii premium de curățenie.",
    ru: "Премиум услуги уборки.",
  },
  phone: "+373 60 111 111",
  email: "info@diamond.md",
  photoUrls: ["/p1.jpg", "/p2.jpg"],
  services: ["GENERAL_CLEANING", "DEEP_CLEANING"],
  pricePerSqm: 55,
  coverageAreas: ["centru", "botanica"],
  availability: [
    { dayOfWeek: "MON", startTime: "08:00", endTime: "19:00" },
    { dayOfWeek: "SAT", startTime: "09:00", endTime: "15:00" },
  ],
  ratingAvg: 4.9,
  reviewCount: 85,
  verified: true,
  createdAt: "2025-01-15",
};

const roLabels = {
  verified: "Verificat",
  per_sqm: "lei/m²",
  reviews: "recenzii",
  rating_aria: "{{rating}} din 5 stele",
  services_and_prices: "Servicii și prețuri",
  coverage_areas: "Cartiere deservite",
  availability: "Program de lucru",
  recent_reviews: "Recenzii recente",
  book_cta: "Rezervă acum · de la {{price}} lei/m²",
  day_mon: "Lun",
  day_tue: "Mar",
  day_wed: "Mie",
  day_thu: "Joi",
  day_fri: "Vin",
  day_sat: "Sâm",
  day_sun: "Dum",
  no_availability: "Fără program disponibil",
  service_labels: {
    GENERAL_CLEANING: "Curățenie generală",
    DEEP_CLEANING: "Curățenie profundă",
    POST_RENOVATION: "Curățenie după reparație",
    MAINTENANCE: "Curățenie de întreținere",
    WINDOW_CLEANING: "Spălarea geamurilor",
    CARPET_CLEANING: "Curățarea covoarelor",
    UPHOLSTERY_CLEANING: "Curățare mobilier moale",
    MOVE_IN_OUT: "Curățenie la mutare",
  },
  area_labels: {
    centru: "Centru",
    botanica: "Botanica",
    buiucani: "Buiucani",
    ciocana: "Ciocana",
    riscani: "Rîșcani",
    telecentru: "Telecentru",
    durlesti: "Durlești",
    sculeni: "Sculeni",
    "posta-veche": "Poșta Veche",
    rascanovca: "Râșcanovca",
  },
};

const newestReview: Review = {
  id: "r1",
  providerId: "7",
  clientName: "Maria T.",
  rating: 5,
  comment: "Echipă foarte profesionistă!",
  locale: "ro",
  createdAt: "2026-03-12",
};

const olderReview: Review = {
  id: "r2",
  providerId: "7",
  clientName: "Andrei B.",
  rating: 4,
  comment: "Bun, dar puteau fi mai rapizi.",
  locale: "ro",
  createdAt: "2026-02-01",
};

// ─── ProviderProfile component ──────────────────────────────────────────────

describe("ProviderProfile", () => {
  it("renders company name as heading", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[newestReview]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Diamond Cleaning" }),
    ).toBeInTheDocument();
  });

  it("renders verified badge for verified provider", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText("Verificat")).toBeInTheDocument();
  });

  it("hides verified badge for unverified provider", () => {
    const unverified = { ...baseProvider, verified: false };
    render(
      <ProviderProfile
        provider={unverified}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.queryByText("Verificat")).not.toBeInTheDocument();
  });

  it("renders bio in the correct locale — RO", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(
      screen.getByText("Servicii premium de curățenie."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Премиум услуги уборки."),
    ).not.toBeInTheDocument();
  });

  it("renders bio in the correct locale — RU", () => {
    const ruLabels = {
      ...roLabels,
      book_cta: "Забронировать · от {{price}} лей/м²",
    };
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ru"
        labels={ruLabels}
      />,
    );
    expect(screen.getByText("Премиум услуги уборки.")).toBeInTheDocument();
    expect(
      screen.queryByText("Servicii premium de curățenie."),
    ).not.toBeInTheDocument();
  });

  it("renders localized service names in services section", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText("Curățenie generală")).toBeInTheDocument();
    expect(screen.getByText("Curățenie profundă")).toBeInTheDocument();
  });

  it("renders coverage area badges with localized names", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText("Centru")).toBeInTheDocument();
    expect(screen.getByText("Botanica")).toBeInTheDocument();
  });

  it("renders availability schedule", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText("Lun")).toBeInTheDocument();
    expect(screen.getByText("08:00 – 19:00")).toBeInTheDocument();
  });

  it("renders review cards for provided reviews", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[newestReview, olderReview]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText("Maria T.")).toBeInTheDocument();
    expect(screen.getByText("Andrei B.")).toBeInTheDocument();
  });

  it("renders CTA linking to booking page", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    const cta = screen.getByRole("link", { name: /rezervă acum/i });
    expect(cta).toHaveAttribute("href", "/ro/booking/diamond-cleaning");
  });

  it("interpolates price into CTA label", () => {
    render(
      <ProviderProfile
        provider={baseProvider}
        reviews={[]}
        locale="ro"
        labels={roLabels}
      />,
    );
    expect(screen.getByText(/de la 55 lei\/m²/i)).toBeInTheDocument();
  });
});

// ─── ReviewCard component ────────────────────────────────────────────────────

describe("ReviewCard", () => {
  it("renders client initials in avatar", () => {
    render(<ReviewCard review={newestReview} />);
    expect(screen.getByText("MT")).toBeInTheDocument();
  });

  it("renders client name", () => {
    render(<ReviewCard review={newestReview} />);
    expect(screen.getByText("Maria T.")).toBeInTheDocument();
  });

  it("renders comment text", () => {
    render(<ReviewCard review={newestReview} />);
    expect(
      screen.getByText("Echipă foarte profesionistă!"),
    ).toBeInTheDocument();
  });

  it("renders 5 filled stars for rating 5", () => {
    render(<ReviewCard review={newestReview} />);
    const filledStars = screen.getAllByTestId("star-filled");
    expect(filledStars).toHaveLength(5);
  });

  it("renders 4 filled + 1 empty star for rating 4", () => {
    render(<ReviewCard review={olderReview} />);
    expect(screen.getAllByTestId("star-filled")).toHaveLength(4);
    expect(screen.getAllByTestId("star-empty")).toHaveLength(1);
  });

  it("renders the formatted date", () => {
    render(<ReviewCard review={newestReview} />);
    // createdAt "2026-03-12" should be formatted as a date string
    expect(screen.getByTestId("review-date")).toBeInTheDocument();
  });
});
