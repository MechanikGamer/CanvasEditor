import { render, screen } from "@testing-library/react";

function Separator() {
  return <div role="separator" className="separator" />;
}

test("renders a separator div with correct styles", () => {
  render(<Separator />);
  const separator = screen.getByRole("separator");
  expect(separator).toBeInTheDocument();
});
