import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "@/components/home/search-form";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: mockPush })),
}));

const serviceTypes = [
  { value: "GENERAL_CLEANING", label: "Curățenie generală" },
  { value: "DEEP_CLEANING", label: "Curățenie profundă" },
];

const neighborhoods = [
  { value: "centru", label: "Centru" },
  { value: "botanica", label: "Botanica" },
];

const labels = {
  search_service: "Tip de serviciu",
  search_area: "Cartier",
  search_button: "Caută specialiști",
};

describe("SearchForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders search button with label", () => {
    render(
      <SearchForm
        locale="ro"
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
        labels={labels}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Caută specialiști" }),
    ).toBeInTheDocument();
  });

  it("renders service type select with placeholder", () => {
    render(
      <SearchForm
        locale="ro"
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
        labels={labels}
      />,
    );
    expect(screen.getByText("Tip de serviciu")).toBeInTheDocument();
  });

  it("renders neighborhood select with placeholder", () => {
    render(
      <SearchForm
        locale="ro"
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
        labels={labels}
      />,
    );
    expect(screen.getByText("Cartier")).toBeInTheDocument();
  });

  it("navigates to /ro/providers on click with no selections", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        locale="ro"
        serviceTypes={serviceTypes}
        neighborhoods={neighborhoods}
        labels={labels}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Caută specialiști" }));
    expect(mockPush).toHaveBeenCalledWith("/ro/providers");
  });
});
