import DateBox from "../../Components/Date/DateBox";
import Header from "../../Components/header/Header";
import MonthlyPrayersTime from "../../Components/MonthlyPrayersTime/MonthlyPrayersTime";
import TableSection from "../../Components/tableSection/TableSection";
import Timer from "../../Components/timer/Timer";
import { useGlobalContext } from "../../Hook/useGlobalContext";

const HomePage = () => {
  const { showMonthlyTable, setshowMonthlyTable } = useGlobalContext();
  return (
    <div className="w-full">
      <Header />

      {showMonthlyTable ? (
        <MonthlyPrayersTime />
      ) : (
        <div className="container mx-auto  px-3.5 lg:px-0">
          <>
            <h1 className="text-[#374151] text-2xl md:text-3xl font-bold text-center my-5">
              Stay Connected With Your Prayers
            </h1>
            <DateBox />
            <Timer />
            <h1 className="text-[#374151] text-2xl md:text-3xl font-bold text-center mt-10">
              Today's Prayer Times
            </h1>
            <p className="text-[#374151] font-bold text-center">
              Accurate prayer times for Aden based on geographical coordinates and calculation
              methods.
            </p>
            <TableSection />
            <div className="w-full flex justify-center items-center  my-10">
              <button
                className="font-bold text-white py-2.5 px-6 rounded-2xl cursor-pointer bg-[#374151] text-center hover:scale-110"
                onClick={() => setshowMonthlyTable(true)}>
                Show Monthly Table
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default HomePage;
