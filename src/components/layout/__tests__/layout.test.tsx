import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/ro"),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const headerLabels = {
  home: "Acasă",
  providers: "Specialiști",
  how_it_works: "Cum funcționează",
  about: "Despre noi",
  book_now: "Rezervă acum",
  open_menu: "Deschide meniu",
  close_menu: "Închide meniu",
};

const footerLabels = {
  home: "Acasă",
  providers: "Specialiști",
  how_it_works: "Cum funcționează",
  about: "Despre noi",
  terms: "Termeni și condiții",
  privacy: "Confidențialitate",
  contact: "Contact",
  footer_copyright: "© 2026 Forever Clean",
};

const mobileNavLabels = {
  home_tab: "Acasă",
  search_tab: "Caută",
  bookings_tab: "Rezervări",
  account_tab: "Cont",
};

// ── Header ──────────────────────────────────────────────────────────────

describe("Header", () => {
  it("renders logo brand text", () => {
    render(<Header labels={headerLabels} currentLocale="ro" />);
    expect(screen.getByText("Forever Clean")).toBeInTheDocument();
  });

  it("renders locale switcher with RO and RU options", () => {
    render(<Header labels={headerLabels} currentLocale="ro" />);
    expect(screen.getByText("RO")).toBeInTheDocument();
    expect(screen.getByText("RU")).toBeInTheDocument();
  });

  it("hamburger button is present with aria-expanded false", () => {
    render(<Header labels={headerLabels} currentLocale="ro" />);
    const btn = screen.getByRole("button", { name: /deschide meniu/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("sets aria-expanded to true after hamburger click", async () => {
    const user = userEvent.setup();
    render(<Header labels={headerLabels} currentLocale="ro" />);
    const btn = screen.getByRole("button", { name: /deschide meniu/i });
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("renders desktop nav links from labels", () => {
    render(<Header labels={headerLabels} currentLocale="ro" />);
    // Desktop nav always in DOM (CSS hides it on mobile)
    expect(
      screen.getAllByRole("link", { name: /specialiști/i }).length,
    ).toBeGreaterThan(0);
  });
});

// ── Footer ───────────────────────────────────────────────────────────────

describe("Footer", () => {
  it("renders home and providers nav links", () => {
    render(<Footer labels={footerLabels} currentLocale="ro" />);
    expect(screen.getByRole("link", { name: /acasă/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /specialiști/i }),
    ).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer labels={footerLabels} currentLocale="ro" />);
    expect(screen.getByText("© 2026 Forever Clean")).toBeInTheDocument();
  });

  it("renders legal links including contact", () => {
    render(<Footer labels={footerLabels} currentLocale="ro" />);
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /termeni/i })).toBeInTheDocument();
  });

  it("renders locale switcher", () => {
    render(<Footer labels={footerLabels} currentLocale="ro" />);
    expect(screen.getByText("RO")).toBeInTheDocument();
    expect(screen.getByText("RU")).toBeInTheDocument();
  });
});

// ── Mobile navigation ────────────────────────────────────────────────────

describe("MobileNav", () => {
  it("renders 4 navigation tab labels", () => {
    render(<MobileNav labels={mobileNavLabels} locale="ro" />);
    expect(screen.getByText("Acasă")).toBeInTheDocument();
    expect(screen.getByText("Caută")).toBeInTheDocument();
    expect(screen.getByText("Rezervări")).toBeInTheDocument();
    expect(screen.getByText("Cont")).toBeInTheDocument();
  });

  it("marks home link as active when pathname is /ro", () => {
    vi.mocked(usePathname).mockReturnValue("/ro");
    render(<MobileNav labels={mobileNavLabels} locale="ro" />);
    const homeLink = screen.getByRole("link", { name: /acasă/i });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("marks providers link as active when pathname is /ro/providers", () => {
    vi.mocked(usePathname).mockReturnValue("/ro/providers");
    render(<MobileNav labels={mobileNavLabels} locale="ro" />);
    const searchLink = screen.getByRole("link", { name: /caută/i });
    expect(searchLink).toHaveAttribute("aria-current", "page");
  });
});

// ── Breadcrumbs ──────────────────────────────────────────────────────────

describe("Breadcrumbs", () => {
  it("renders nothing on the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/ro");
    const { container } = render(<Breadcrumbs locale="ro" homeLabel="Acasă" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders home link pointing to /ro on a nested page", () => {
    vi.mocked(usePathname).mockReturnValue("/ro/providers");
    render(<Breadcrumbs locale="ro" homeLabel="Acasă" />);
    const homeLink = screen.getByRole("link", { name: /acasă/i });
    expect(homeLink).toHaveAttribute("href", "/ro");
  });

  it("shows humanized path segment as breadcrumb label", () => {
    vi.mocked(usePathname).mockReturnValue("/ro/providers");
    render(<Breadcrumbs locale="ro" homeLabel="Acasă" />);
    expect(screen.getByText("Providers")).toBeInTheDocument();
  });

  it("humanizes hyphenated segments into title-cased text", () => {
    vi.mocked(usePathname).mockReturnValue("/ro/providers/diamond-cleaning");
    render(<Breadcrumbs locale="ro" homeLabel="Acasă" />);
    expect(screen.getByText("Diamond cleaning")).toBeInTheDocument();
  });
});
