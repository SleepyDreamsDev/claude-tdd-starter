import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { FilterContent } from "@/components/providers/filter-content";

vi.mock("@/components/ui/slider", () => ({
  Slider: ({
    onValueChange,
  }: {
    onValueChange?: (v: number[]) => void;
    value?: number[];
  }) => (
    <input
      data-testid="price-slider"
      type="range"
      onChange={() => onValueChange?.([20, 80])}
    />
  ),
}));

const mockServiceTypes = [
  { value: "GENERAL_CLEANING", label: "Curățenie generală" },
  { value: "DEEP_CLEANING", label: "Curățenie profundă" },
  { value: "POST_RENOVATION", label: "Curățenie după reparație" },
  { value: "MAINTENANCE", label: "Curățenie de întreținere" },
  { value: "WINDOW_CLEANING", label: "Spălarea geamurilor" },
  { value: "CARPET_CLEANING", label: "Curățarea covoarelor" },
  { value: "UPHOLSTERY_CLEANING", label: "Curățare mobilier moale" },
  { value: "MOVE_IN_OUT", label: "Curățenie la mutare" },
];

const mockNeighborhoods = [
  { value: "centru", label: "Centru" },
  { value: "botanica", label: "Botanica" },
];

const mockLabels = {
  service_type: "Tip serviciu",
  neighborhood: "Cartier",
  price_range: "Interval preț",
  min_rating: "Rating minim",
  all_services: "Toate serviciile",
  all_areas: "Toate cartierele",
  reset_filters: "Resetează filtrele",
};

const defaultProps = {
  filters: {},
  onFilterChange: vi.fn(),
  onReset: vi.fn(),
  labels: mockLabels,
  serviceTypes: mockServiceTypes,
  neighborhoods: mockNeighborhoods,
};

describe("FilterContent", () => {
  it("renders all 8 service type checkboxes", () => {
    render(<FilterContent {...defaultProps} />);
    mockServiceTypes.forEach((st) => {
      expect(screen.getByText(st.label)).toBeInTheDocument();
    });
  });

  it("renders neighborhood select with all areas placeholder", () => {
    render(<FilterContent {...defaultProps} />);
    expect(screen.getByText(mockLabels.all_areas)).toBeInTheDocument();
  });

  it("renders price range slider", () => {
    render(<FilterContent {...defaultProps} />);
    expect(screen.getByTestId("price-slider")).toBeInTheDocument();
  });

  it("renders 3 rating chips (3+, 4+, 4.5+)", () => {
    render(<FilterContent {...defaultProps} />);
    expect(screen.getByText("3+")).toBeInTheDocument();
    expect(screen.getByText("4+")).toBeInTheDocument();
    expect(screen.getByText("4.5+")).toBeInTheDocument();
  });

  it("calls onFilterChange when a service type checkbox is clicked", () => {
    const onFilterChange = vi.fn();
    render(<FilterContent {...defaultProps} onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("Curățenie generală"));
    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ serviceType: "GENERAL_CLEANING" }),
    );
  });

  it("active rating chip has bg-primary class when minRating matches", () => {
    render(<FilterContent {...defaultProps} filters={{ minRating: 4 }} />);
    const chip = screen.getByText("4+");
    expect(chip.className).toContain("bg-primary");
  });

  it("inactive rating chip does not have bg-primary class", () => {
    render(<FilterContent {...defaultProps} filters={{ minRating: 4 }} />);
    const chip = screen.getByText("3+");
    expect(chip.className).not.toContain("bg-primary");
  });

  it("calls onReset when reset button is clicked", () => {
    const onReset = vi.fn();
    render(<FilterContent {...defaultProps} onReset={onReset} />);
    fireEvent.click(screen.getByText(mockLabels.reset_filters));
    expect(onReset).toHaveBeenCalled();
  });
});
