import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import BackgroundColorModal from "./BackgroundColorModal";

export interface CanvasElement {
  id: number;
  type: "text" | "image";
  content?: string;
  color?: string;
  src?: string;
}

const CanvasEditor: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>("#9B9B9B");
  const [bgImage, setBgImage] = useState<string>("");
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(bgColor);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addText = () => {
    setIsEditing(true);
    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "text",
        content: "Type your text here",
        color: "#353535",
      },
    ]);
  };

  const addImage = (src: string) => {
    setIsEditing(true);
    setElements((prev) => [...prev, { id: Date.now(), type: "image", src }]);
  };

  const handleExport = () => {
    if (canvasRef.current) {
      setIsExporting(true);
      canvasRef.current.classList.add("exporting");

      setTimeout(() => {
        if (canvasRef.current) {
          toPng(canvasRef.current, {
            width: 1080,
            height: 1350,
          })
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = "poster.png";
              link.href = dataUrl;
              link.click();
            })
            .catch((err) => {
              console.error("Export failed:", err);
            })
            .finally(() => {
              setIsExporting(false);
              canvasRef.current?.classList.remove("exporting");
            });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    setBgColor("#9B9B9B");
    setBgImage("");
    setElements([]);
    setIsEditing(false);
  };

  return (
    <div className="px-4 flex flex-row md:flex-col min-h-screen  py-[66px] lg:px-[189px] gap-24 w-full h-full">
      <div className="flex gap-6 flex-1 flex-col md:flex-row">
        <div className="flex gap-24 w-full md:w-1/2 ">
          <CanvasArea
            canvasRef={canvasRef}
            bgColor={bgColor}
            bgImage={bgImage}
            elements={elements}
            setElements={setElements}
            isExporting={isExporting}
            isEditing={isEditing}
          />
        </div>
        <div className="flex gap-24 w-full md:w-1/2">
          <Sidebar
            addText={addText}
            addImage={addImage}
            handleBackgroundModal={() => {
              setSelectedColor(bgColor);
              setShowColorModal(true);
            }}
            handleReset={handleReset}
            handleExport={handleExport}
          />
        </div>
      </div>

      {showColorModal && (
        <BackgroundColorModal
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setBgColor={setBgColor}
          setShowColorModal={setShowColorModal}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default CanvasEditor;
