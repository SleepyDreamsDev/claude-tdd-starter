import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  usePathname: vi.fn(() => "/ro"),
  notFound: vi.fn(),
}));

vi.mock("@/lib/i18n/get-dictionary", () => ({
  getDictionary: vi.fn(() =>
    Promise.resolve({
      common: {
        search: "Caută",
        book_now: "Rezervă acum",
        per_sqm: "lei/m²",
        reviews: "recenzii",
      },
      home: {
        hero_title: "Curățenie profesională în Chișinău",
        hero_subtitle:
          "Găsește și rezervă specialiști verificați în 60 de secunde",
        search_service: "Tip de serviciu",
        search_area: "Cartier",
        search_button: "Caută specialiști",
        how_it_works: "Cum funcționează",
        step1_title: "Caută",
        step1_desc: "Alege serviciul și cartierul tău",
        step2_title: "Compară",
        step2_desc: "Vezi prețuri, recenzii și disponibilitate",
        step3_title: "Rezervă",
        step3_desc: "Confirmă rezervarea în câteva secunde",
        featured_title: "Specialiști de top",
        featured_view_all: "Vezi toți",
        popular_services_title: "Servicii populare",
        starting_from: "de la {{price}} lei/m²",
      },
      providers: { verified: "Verificat" },
      nav: {
        home: "Acasă",
        providers: "Specialiști",
        how_it_works: "Cum funcționează",
        about: "Despre noi",
        terms: "Termeni și condiții",
        privacy: "Confidențialitate",
        contact: "Contact",
        footer_copyright: "© 2026 Forever Clean",
        open_menu: "Deschide meniu",
        close_menu: "Închide meniu",
        search_tab: "Caută",
        bookings_tab: "Rezervări",
        account_tab: "Cont",
      },
      services: {},
      neighborhoods: {},
      booking: { title: "Rezervare" },
    }),
  ),
}));

vi.mock("@/lib/i18n/config", () => ({
  isValidLocale: vi.fn(() => true),
}));

// Import after mocks
import LocalePage from "@/app/[locale]/page";

describe("Homepage", () => {
  async function renderPage() {
    const Component = await LocalePage({
      params: Promise.resolve({ locale: "ro" }),
    });
    render(Component);
  }

  it("renders hero title", async () => {
    await renderPage();
    expect(
      screen.getByText("Curățenie profesională în Chișinău"),
    ).toBeInTheDocument();
  });

  it("renders hero subtitle", async () => {
    await renderPage();
    expect(
      screen.getByText(
        "Găsește și rezervă specialiști verificați în 60 de secunde",
      ),
    ).toBeInTheDocument();
  });

  it("renders location badge", async () => {
    await renderPage();
    expect(screen.getByText("Chișinău, Moldova")).toBeInTheDocument();
  });

  it("renders how-it-works section with 3 step titles", async () => {
    await renderPage();
    expect(screen.getByText("Cum funcționează")).toBeInTheDocument();
    // Step titles also appear in search button / nav, so check all exist
    expect(screen.getAllByText("Caută").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Compară")).toBeInTheDocument();
    expect(screen.getByText("Rezervă")).toBeInTheDocument();
  });

  it("renders featured providers section title", async () => {
    await renderPage();
    // Title appears in both mobile section and desktop sidebar
    expect(
      screen.getAllByText("Specialiști de top").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders 4 featured provider cards", async () => {
    await renderPage();
    // Each provider name appears twice (mobile list + desktop sidebar), use getAllByText
    expect(
      screen.getAllByText("Diamond Cleaning").length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ProCurat").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Cristal Plus").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(
      screen.getAllByText("EcoClean Moldova").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders view-all link to providers page", async () => {
    await renderPage();
    const viewAllLinks = screen.getAllByText("Vezi toți");
    const link = viewAllLinks.find(
      (el) => el.closest("a")?.getAttribute("href") === "/ro/providers",
    );
    expect(link).toBeDefined();
  });
});
