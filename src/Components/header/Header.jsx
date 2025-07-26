import { FaMosque } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { useGlobalContext } from "../../Hook/useGlobalContext";

const Header = () => {
  const { city, setShowHome } = useGlobalContext();
  return (
    <div className="h-[80px] w-full  bg-[#374151]">
      <div className="container  h-full flex justify-between items-center mx-auto  px-3.5 lg:px-0">
        <span className="h-full font-['Bebas_Neue'] text-2xl  md:text-4xl text-white flex  justify-center items-center gap-2">
          <FaMosque />
          <p className="mt-1.5">SalaTime</p>
        </span>
        <div
          className="flex justify-center items-center gap-2 text-[#C1CFDA] font-bold cursor-pointer text-[14px] md:text-[18px] border border-[#C1CFDA] px-2 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl"
          onClick={() => setShowHome(false)}>
          <FaLocationDot />
          {city}
        </div>
      </div>
    </div>
  );
};

export default Header;
