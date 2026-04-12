import { render, screen } from "@testing-library/react";
import { StarRating } from "@/components/ui/star-rating";

describe("StarRating", () => {
  it("renders 5 filled stars for rating 4.8", () => {
    render(<StarRating rating={4.8} />);
    const filled = screen.getAllByTestId("star-filled");
    const empty = screen.queryAllByTestId("star-empty");
    expect(filled).toHaveLength(5);
    expect(empty).toHaveLength(0);
  });

  it("renders 3 filled and 2 empty stars for rating 3.2", () => {
    render(<StarRating rating={3.2} />);
    const filled = screen.getAllByTestId("star-filled");
    const empty = screen.getAllByTestId("star-empty");
    expect(filled).toHaveLength(3);
    expect(empty).toHaveLength(2);
  });

  it("displays numeric rating text", () => {
    render(<StarRating rating={4.8} />);
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("displays review count with label when provided", () => {
    render(<StarRating rating={4.8} count={47} countLabel="recenzii" />);
    expect(screen.getByText("(47 recenzii)")).toBeInTheDocument();
  });

  it("hides count when showCount is false", () => {
    render(
      <StarRating
        rating={4.8}
        count={47}
        countLabel="recenzii"
        showCount={false}
      />,
    );
    expect(screen.queryByText("(47 recenzii)")).not.toBeInTheDocument();
  });

  it("has accessible aria-label with default format", () => {
    render(<StarRating rating={4.8} />);
    expect(screen.getByLabelText("4.8 / 5")).toBeInTheDocument();
  });

  it("uses custom aria-label when provided", () => {
    render(<StarRating rating={4.8} ariaLabel="4.8 din 5 stele" />);
    expect(screen.getByLabelText("4.8 din 5 stele")).toBeInTheDocument();
  });
});
