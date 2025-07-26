import algerianWilayas from "../../data/Wilayas";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useGlobalContext } from "../../Hook/useGlobalContext";
import { useState } from "react";

const WelcomePage = () => {
  const { city, setCity, setShowHome, getPrayerTimeData, getPrayerTimeToday, month } =
    useGlobalContext();
  const [noShossenCity, setNoShossenCity] = useState(false);

  const handleShowPages = (e) => {
    e.preventDefault();
    if (city !== "") {
      setShowHome(true);
      setNoShossenCity(false);
      getPrayerTimeData(city, month);
      getPrayerTimeToday(city);
    } else {
      setNoShossenCity(true);
    }
  };
  return (
    <div className="w-full min-h-[100dvh] md:min-h-screen bg-[#1f2937] flex items-center justify-center">
      <div className="container   h-full mx-auto text-center flex flex-col items-center px-3.5 lg:px-0">
        <h1 className="text-5xl font-bold text-[#C1CFDA] font-['Bebas_Neue']">
          Welcome to <p className="text-white inline-block">SalaTime</p>
          <p className="hidden md:inline-block">|</p> Your trusted source for accurate prayer times
          In Algeria
        </h1>
        <span className="text-2xl text-[#C1CFDA] mt-10 mb-5">Please Choose Your City</span>

        <Menu as="div" className="w-full md:w-[400px] relative inline-block text-left  ">
          <div>
            <MenuButton className="inline-flex w-full   justify-between gap-x-1.5 rounded-md bg-[#C1CFDA] px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              {city !== "" ? city : <> Options</>}
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-black" />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute w-full md:w-[400px] right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div className="py-1 max-h-40 md:max-h-60 overflow-y-auto">
              {algerianWilayas.map((el, index) => {
                return (
                  <MenuItem key={index}>
                    <a
                      href="#"
                      className="flex px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden  space-x-3 font-bold"
                      onClick={() => {
                        setCity(el);
                        setNoShossenCity(false);
                      }}>
                      <p>{index + 1}</p>
                      <p>{el}</p>
                    </a>
                  </MenuItem>
                );
              })}
            </div>
          </MenuItems>
        </Menu>

        <button
          className="w-[300px] bg-[#C1CFDA]   mt-10  font-bold text-[#1f2937]  py-2  rounded-xl  hover:bg-white  hover:scale-110 cursor-pointer"
          onClick={(e) => {
            handleShowPages(e);
          }}>
          Next
        </button>
        {noShossenCity && (
          <span className="text-[14px] mt-2.5 text-red-400">You forgot to choose a city</span>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
