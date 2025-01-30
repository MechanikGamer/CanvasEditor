import { render, screen } from "@testing-library/react";
import Separator from "../Separator";

describe("Separator", () => {
  it("renders with correct role", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass("w-full", "my-8", "h-[2px]", "bg-[#FAFAFA]");
  });
});
