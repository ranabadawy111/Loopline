import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PriorityTag from "../components/ui/PriorityTag";

describe("PriorityTag", () => {
  it("renders the correct label for each priority", () => {
    const { rerender } = render(<PriorityTag priority="low" />);
    expect(screen.getByText("Low")).toBeInTheDocument();

    rerender(<PriorityTag priority="medium" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();

    rerender(<PriorityTag priority="high" />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });
});
