interface BackgroundColorModalProps {
  setBgColor: (color: string) => void;
  setShowColorModal: (show: boolean) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  setIsEditing: (editing: boolean) => void;
}

const BackgroundColorModal = ({
  setBgColor,
  setShowColorModal,
  selectedColor,
  setSelectedColor,
  setIsEditing,
}: BackgroundColorModalProps) => {
  const handleColorPick = (color: string) => {
    setSelectedColor(color);
  };

  const saveBackgroundColor = () => {
    setBgColor(selectedColor);
    setShowColorModal(false);
    setIsEditing(true);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select Background Color</h2>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorPick(e.target.value)}
          className="w-full h-12 cursor-pointer"
        />
        <div className="flex justify-center mt-4 gap-10">
          <button
            onClick={() => setShowColorModal(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={saveBackgroundColor}
            className="bg-[#7209B7] text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorModal;
