import React, { useRef } from "react";
import LogoComponent from "./LogoComponent";
import ResetButton from "./ResetButton";
import Separator from "./Separator";
import AddTextImage from "../assets/AddTextImage.png";
import UploadImage from "../assets/AddImage.png";
import ChangeBackground from "../assets/ChangeBackground.png";

interface SidebarProps {
  addText: () => void;
  addImage: (src: string) => void;
  handleBackgroundModal: () => void;
  handleReset: () => void;
  handleExport: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  addText,
  addImage,
  handleBackgroundModal,
  handleReset,
  handleExport,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          addImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  const buttons = [
    { label: "Text", image: AddTextImage, onClick: addText },
    { label: "Image", image: UploadImage, onClick: handleImageButtonClick },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <LogoComponent />
        <ResetButton handleReset={handleReset} />
      </div>
      <Separator />

      <div className="px-4 py-6 flex items-center mb-4 bg-[#F7F7F8] rounded-[10px]">
        <h2 className="text-lg font-bold text-[#353535]">Add Content</h2>
      </div>

      <div className="flex justify-between gap-6 mt-8 min-h-[250px]">
        {buttons.map(({ label, image, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="relative w-1/2 bg-[#F7F7F8] py-6 rounded-lg hover:bg-gray-200 flex flex-col justify-center items-center cursor-pointer min-h-[250px]"
          >
            <img
              src={image}
              alt={label}
              className="w-20 h-20 object-cover mb-4"
            />
            <span className="absolute bottom-4 text-[18px] font-medium text-[#353535]">
              {label}
            </span>
          </button>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="gap-6 mr-[22px] flex mt-2">
        <div
          className="relative flex flex-col w-1/2 bg-[#F7F7F8] p-6 mt-4 rounded-[10px] items-center justify-center hover:bg-gray-200 cursor-pointer min-h-[250px] mr-[29px] gap-6"
          onClick={handleBackgroundModal}
        >
          <img
            src={ChangeBackground}
            alt="Background"
            className="w-20 h-20 object-cover mb-4"
          />
          <span className="absolute bottom-4 text-[18px] font-medium text-[#353535]">
            Background
          </span>
        </div>
      </div>

      <Separator />

      <div className="mt-auto flex justify-end pt-4 bg-buttonPrimary">
        <button
          onClick={handleExport}
          className="bg-[#7209B7] font-semibold text-white py-2 px-8 rounded hover:bg-[#5118A7]"
        >
          Export to PNG
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
