import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { CanvasElement } from "./CanvasEditor";

interface CanvasItemProps {
  element: CanvasElement;
  onDelete: () => void;
  isExporting: boolean;
}

const CanvasItem: React.FC<CanvasItemProps> = ({
  element,
  onDelete,
  isExporting,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<string>(element.color || "#000000");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const predefinedColors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#0000FF",
    "#00FF00",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.length === 1) {
      e.preventDefault();
      document.execCommand("insertText", false, e.key);
    }
  };

  const handleFocus = () => {
    if (
      !isFocused &&
      contentRef.current?.textContent === "Type your text here"
    ) {
      contentRef.current.textContent = "";
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (contentRef.current?.textContent?.trim() === "") {
      contentRef.current.textContent = "Type your text here";
      setIsFocused(false);
    }
  };

  return (
    <Rnd
      bounds="parent"
      default={{
        x: 50,
        y: 50,
        width: element.type === "image" ? 150 : 300,
        height: element.type === "image" ? 150 : 100,
      }}
      className={`relative ${
        isExporting ? "border-none" : "border-2 border-purple-500"
      }`}
      enableResizing={{ bottomRight: true }}
      dragHandleClassName="drag-handle"
      minWidth={50}
      minHeight={50}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-[-20px] left-[-20px] bg-white rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 cursor-move drag-handle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M27.7501 16.6061L24.3211 20.035C23.9859 20.3702 23.4442 20.3702 23.109 20.035C22.7738 19.6999 22.7738 19.1581 23.109 18.8229L25.0746 16.8572H16.8571V25.0748L18.8228 23.1091C19.158 22.7739 19.6997 22.7739 20.0349 23.1091C20.3701 23.4443 20.3701 23.9861 20.0349 24.3213L16.6059 27.7502C16.2819 28.0751 15.7376 28.0948 15.3929 27.7502L11.964 24.3213C11.6288 23.9861 11.6288 23.4443 11.964 23.1091C12.2992 22.7739 12.8409 22.7739 13.1761 23.1091L15.1426 25.0748V16.8572H6.92511L8.89077 18.8229C9.22595 19.1581 9.22595 19.6999 8.89077 20.035C8.55559 20.3702 8.01381 20.3702 7.67863 20.035L4.24966 16.6061C3.91791 16.2743 3.91533 15.7274 4.24966 15.3931L7.67863 11.9641C8.01381 11.6289 8.55559 11.6289 8.89077 11.9641C9.22595 12.2993 9.22595 12.8411 8.89077 13.1762L6.92511 15.1428H15.1426V6.92523L13.177 8.89089C12.8418 9.22607 12.3 9.22607 11.9648 8.89089C11.6297 8.55571 11.6297 8.01393 11.9648 7.67875L15.3938 4.24978C15.7256 3.91803 16.2725 3.91546 16.6068 4.24978L20.0358 7.67875C20.371 8.01393 20.371 8.55571 20.0358 8.89089C19.8678 9.05805 19.6483 9.14206 19.4288 9.14206C19.2094 9.14206 18.9899 9.05805 18.8228 8.89089L16.8571 6.92523V15.1428H25.0746L23.109 13.1771C22.7738 12.8419 22.7738 12.3001 23.109 11.965C23.4442 11.6298 23.9859 11.6298 24.3211 11.965L27.7501 15.3939C28.0844 15.7274 28.0819 16.2752 27.7501 16.6061V16.6061Z"
              fill="#7209B7"
            />
          </svg>
        </div>

        {element.type === "image" ? (
          <img
            src={element.src}
            alt="User uploaded"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ color, direction: "ltr", textAlign: "center" }}
            className="w-full h-full flex items-center justify-start font-bold text-xl focus:outline-none bg-transparent text-left px-2"
          >
            Type your text here
          </div>
        )}

        <div className="absolute bottom-[-10px] right-[-10px] bg-purple-500 rounded-full w-6 h-6 border-4 border-white cursor-se-resize"></div>

        <button
          onClick={onDelete}
          className="absolute top-[-12px] right-[-12px] bg-white rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M13.375 5.93163C13.2092 5.93163 13.0503 5.99628 12.9331 6.11135C12.8158 6.22643 12.75 6.3825 12.75 6.54524V13.4121C12.7321 13.7224 12.59 14.0132 12.3547 14.2211C12.1194 14.429 11.8099 14.5372 11.4937 14.5221H6.50625C6.19006 14.5372 5.88061 14.429 5.64532 14.2211C5.41002 14.0132 5.26793 13.7224 5.25 13.4121V6.54524C5.25 6.3825 5.18415 6.22643 5.06694 6.11135C4.94973 5.99628 4.79076 5.93163 4.625 5.93163C4.45924 5.93163 4.30027 5.99628 4.18306 6.11135C4.06585 6.22643 4 6.3825 4 6.54524V13.4121C4.01784 14.0479 4.29161 14.6509 4.76136 15.089C5.23111 15.527 5.85855 15.7645 6.50625 15.7493H11.4937C12.1415 15.7645 12.7689 15.527 13.2386 15.089C13.7084 14.6509 13.9822 14.0479 14 13.4121V6.54524C14 6.3825 13.9342 6.22643 13.8169 6.11135C13.6997 5.99628 13.5408 5.93163 13.375 5.93163Z"
              fill="#CB0000"
            />
            <path
              d="M14 4.09082H11.5V2.86361C11.5 2.70087 11.4342 2.54479 11.3169 2.42972C11.1997 2.31465 11.0408 2.25 10.875 2.25H7.125C6.95924 2.25 6.80027 2.31465 6.68306 2.42972C6.56585 2.54479 6.5 2.70087 6.5 2.86361V4.09082H4C3.83424 4.09082 3.67527 4.15546 3.55806 4.27054C3.44085 4.38561 3.375 4.54168 3.375 4.70442C3.375 4.86716 3.44085 5.02323 3.55806 5.1383C3.67527 5.25338 3.83424 5.31803 4 5.31803H14C14.1658 5.31803 14.3247 5.25338 14.4419 5.1383C14.5592 5.02323 14.625 4.86716 14.625 4.70442C14.625 4.54168 14.5592 4.38561 14.4419 4.27054C14.3247 4.15546 14.1658 4.09082 14 4.09082ZM7.75 4.09082V3.47721H10.25V4.09082H7.75Z"
              fill="#CB0000"
            />
            <path
              d="M8.375 12.0677V7.77245C8.375 7.60971 8.30915 7.45364 8.19194 7.33856C8.07473 7.22349 7.91576 7.15884 7.75 7.15884C7.58424 7.15884 7.42527 7.22349 7.30806 7.33856C7.19085 7.45364 7.125 7.60971 7.125 7.77245V12.0677C7.125 12.2304 7.19085 12.3865 7.30806 12.5016C7.42527 12.6166 7.58424 12.6813 7.75 12.6813C7.91576 12.6813 8.07473 12.6166 8.19194 12.5016C8.30915 12.3865 8.375 12.2304 8.375 12.0677Z"
              fill="#CB0000"
            />
            <path
              d="M10.875 12.0677V7.77245C10.875 7.60971 10.8092 7.45364 10.6919 7.33856C10.5747 7.22349 10.4158 7.15884 10.25 7.15884C10.0842 7.15884 9.92527 7.22349 9.80806 7.33856C9.69085 7.45364 9.625 7.60971 9.625 7.77245V12.0677C9.625 12.2304 9.69085 12.3865 9.80806 12.5016C9.92527 12.6166 10.0842 12.6813 10.25 12.6813C10.4158 12.6813 10.5747 12.6166 10.6919 12.5016C10.8092 12.3865 10.875 12.2304 10.875 12.0677Z"
              fill="#CB0000"
            />
          </svg>
        </button>

        {element.type === "text" && (
          <div className="absolute bottom-[-40px] left-0 flex gap-2">
            {predefinedColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`relative w-6 h-6 flex items-center justify-center rounded-full transition-all
          ${color === presetColor ? "ring-4 ring-white" : "ring-0"}`}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: presetColor }}
                ></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
