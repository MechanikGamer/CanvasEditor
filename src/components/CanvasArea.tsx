import React from "react";
import { CanvasElement } from "./CanvasEditor";
import CanvasItem from "./CanvasItem";
import StartImage from "../assets/StartImage.png";

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  bgColor: string;
  bgImage: string;
  elements: CanvasElement[];
  setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  isExporting: boolean;
  isEditing: boolean;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  bgColor,
  bgImage,
  elements,
  setElements,
  isExporting,
  isEditing,
}) => {
  const handleDelete = (id: number) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div
      ref={canvasRef}
      className={`flex-1 w-full h-screen md:h-full bg-white shadow-lg relative ${
        isExporting ? "exporting" : ""
      }`}
      style={{
        backgroundColor: isEditing ? bgColor : "transparent",
        backgroundImage: isEditing ? `url(${bgImage})` : `url(${StartImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {elements.map((el) => (
        <CanvasItem
          key={el.id}
          element={el}
          onDelete={() => handleDelete(el.id)}
          isExporting={isExporting}
        />
      ))}
    </div>
  );
};

export default CanvasArea;
