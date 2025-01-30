import ResetIcon from "../assets/ResetIcon.png";

interface ResetButtonProps {
  handleReset: () => void;
}

const ResetButton = ({ handleReset }: ResetButtonProps) => {
  return (
    <button
      onClick={handleReset}
      className="flex items-center border-b-2 border-[#CB0000] hover:bg-white97 transition-all px-2"
    >
      <div className="text-[#CB0000] font-medium text-[18px]">Reset</div>
      <img
        src={ResetIcon}
        alt="ResetIcon"
        className="pl-2 w-8 h-8 object-cover"
      />
    </button>
  );
};

export default ResetButton;
