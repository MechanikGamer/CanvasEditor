import ResetIcon from "../assets/ResetIcon.png";

interface ResetButtonProps {
  handleReset: () => void;
}

const ResetButton = ({ handleReset }: ResetButtonProps) => {
  return (
    <div
      onClick={handleReset}
      className="flex items-center border-b-2 border-[#CB0000] cursor-pointer hover:bg-[#F7F7F8] transition-all px-2"
    >
      <div className="text-[#CB0000] font-medium tex-[18px]">Reset</div>
      <img
        src={ResetIcon}
        alt="ResetIcon"
        className="pl-2 w-8 h-8 object-cover"
      />
    </div>
  );
};

export default ResetButton;
