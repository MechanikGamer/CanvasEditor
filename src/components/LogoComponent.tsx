import Logo from "../assets/logo.png";

const LogoComponent = () => {
  return (
    <div className="flex items-center space-x-3">
      <img src={Logo} alt="Logo" className="w-16 h-16 object-cover" />
      <div className="text-[#676767] text-3xl font-bold">CanvasEditor</div>
    </div>
  );
};

export default LogoComponent;
