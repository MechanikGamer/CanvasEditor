import { render, screen, fireEvent } from "@testing-library/react";
import BackgroundColorModal from "../BackgroundColorModal";

describe("BackgroundColorModal", () => {
  const mockSetBgColor = jest.fn();
  const mockSetShowColorModal = jest.fn();
  const mockSetSelectedColor = jest.fn();
  const mockSetIsEditing = jest.fn();

  const defaultProps = {
    setBgColor: mockSetBgColor,
    setShowColorModal: mockSetShowColorModal,
    selectedColor: "#ff0000",
    setSelectedColor: mockSetSelectedColor,
    setIsEditing: mockSetIsEditing,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal with the correct elements", () => {
    render(<BackgroundColorModal {...defaultProps} />);

    expect(screen.getByText(/Select Background Color/i)).toBeInTheDocument();

    const colorInput = screen.getByLabelText("Color picker");
    expect(colorInput).toBeInTheDocument();
    expect((colorInput as HTMLInputElement).value).toBe("#ff0000");

    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  test("calls setSelectedColor when a new color is picked", () => {
    render(<BackgroundColorModal {...defaultProps} />);

    const colorInput = screen.getByLabelText(
      "Color picker"
    ) as HTMLInputElement;

    fireEvent.change(colorInput, { target: { value: "#00FF00" } });

    expect(mockSetSelectedColor).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedColor).toHaveBeenCalledWith("#00ff00");
  });

  test("clicking 'Cancel' closes the modal without saving", () => {
    render(<BackgroundColorModal {...defaultProps} />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockSetShowColorModal).toHaveBeenCalledTimes(1);
    expect(mockSetShowColorModal).toHaveBeenCalledWith(false);

    expect(mockSetBgColor).not.toHaveBeenCalled();
    expect(mockSetIsEditing).not.toHaveBeenCalled();
  });

  test("clicking 'Save' applies the background color and closes the modal", () => {
    render(<BackgroundColorModal {...defaultProps} />);

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    expect(mockSetBgColor).toHaveBeenCalledTimes(1);
    expect(mockSetBgColor).toHaveBeenCalledWith("#ff0000");

    expect(mockSetShowColorModal).toHaveBeenCalledTimes(1);
    expect(mockSetShowColorModal).toHaveBeenCalledWith(false);

    expect(mockSetIsEditing).toHaveBeenCalledTimes(1);
    expect(mockSetIsEditing).toHaveBeenCalledWith(true);
  });
});
