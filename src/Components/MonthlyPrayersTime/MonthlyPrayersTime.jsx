import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useGlobalContext } from "../../Hook/useGlobalContext";
import { useRef } from "react";

const headTitles = [
  "Date",
  "Day",
  "Hijri",
  "Imsak",
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Sunset",
  "Maghrib",
  "Isha",
];

const MonthlyPrayersTime = () => {
  const { PrayerTimeData, currentFullDate, getPrayerTimeData, city } = useGlobalContext();
  const { setshowMonthlyTable } = useGlobalContext();

  const leftRef = useRef();
  const rightRef = useRef();

  const tableItems = (title, rowParDate, indexRowPrDate) => {
    if (title === "Date") {
      return indexRowPrDate + 1;
    } else if (title === "Day") {
      return rowParDate[1].date.gregorian?.weekday.en;
    } else if (title === "Hijri") {
      return (
        <>
          <span>{rowParDate[1].date.hijri.day}</span>{" "}
          <span>{rowParDate[1].date.hijri.month.en}</span>{" "}
          <span>{rowParDate[1].date.hijri.year}</span>
        </>
      );
    } else {
      return (
        <>
          {rowParDate[1].timings[title].split(" ")[0]}
          <p className="ml-1">
            {Number(rowParDate[1].timings[title].split(" ")[0].split(":")[0]) > 9 ? "PM" : "AM"}
          </p>
        </>
      );
    }
  };

  const handleClicking = (way, NumberMonth) => {
    if (way === "left") {
      if (NumberMonth - 2 >= 0) {
        getPrayerTimeData(city, NumberMonth - 2);
        if (NumberMonth - 2 > 0) {
          rightRef.current.style.opacity = "1";
        } else {
          leftRef.current.style.opacity = "0.5";
        }
      }
    }
    if (way === "right") {
      if (NumberMonth + 1 < 13) {
        getPrayerTimeData(city, NumberMonth);
        if (NumberMonth < 10) {
          leftRef.current.style.opacity = "1";
        } else {
          rightRef.current.style.opacity = "0.5";
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-[95%] 2xl:w-[1600px]  my-10 mx-auto overflow-x-scroll  2xl:overflow-x-visible relative">
        {PrayerTimeData?.data && Object.keys(PrayerTimeData.data).length > 0 ? (
          <div className="w-[1600px] mx-auto">
            <div className="flex justify-between items-center  bg-[#374151] md:rounded-t-2xl p-7 text-white">
              <h1 className="text-2xl font-bold">Monthly Prayer Times</h1>
              <div className="flex  items-center space-x-3">
                <MdOutlineArrowBackIos
                  size={30}
                  className="font-bold cursor-pointer"
                  onClick={() =>
                    handleClicking("left", PrayerTimeData.data[0].date.gregorian.month.number)
                  }
                  ref={leftRef}
                />
                <div className="text-2xl font-bold">
                  <span>{PrayerTimeData.data[0].date.gregorian.month.en}</span>{" "}
                  <span>{PrayerTimeData.data[0].date.gregorian.year}</span>
                </div>
                <MdOutlineArrowForwardIos
                  size={30}
                  className="font-bold cursor-pointer"
                  onClick={() =>
                    handleClicking("right", PrayerTimeData.data[0].date.gregorian.month.number)
                  }
                  ref={rightRef}
                />
              </div>
            </div>
            <div className="p-5 text-white bg-[#374151] flex justify-between">
              {headTitles.map((el, index) => {
                return (
                  <div
                    className={`${
                      el === "Hijri" || el === "Day" ? "w-[170px]" : "w-[140px]"
                    } font-bold  text-center  `}
                    key={index}>
                    {el}
                  </div>
                );
              })}
            </div>
            <div key={PrayerTimeData} className="shadow-2xl md:rounded-b-2xl">
              {Object.entries(PrayerTimeData.data).map((el, index) => {
                return (
                  <div
                    className={`flex justify-between items-center   p-4 ${
                      index === Object.entries(PrayerTimeData.data).length - 1
                        ? "border-b-0 md:rounded-b-2xl"
                        : "border-b  border-gray-300"
                    }  ${
                      new Date(currentFullDate).getTime() ===
                      new Date(el[1].date.readable).getTime()
                        ? "bg-[#C1CFDA]"
                        : "bg-[#f9fafb]"
                    }`}
                    key={index}>
                    {headTitles.map((title, indexTitle) => (
                      <div
                        className={`${
                          title === "Hijri" || title === "Day" ? "w-[170px]" : "w-[140px]"
                        }  text-center font-bold flex`}
                        key={indexTitle}>
                        {tableItems(title, el, index)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full justify-center items-center">
            <h1 className="text-2xl font-bold text-[#374151]">Loading</h1>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center my-10">
        <button
          className="font-bold text-white py-2.5 px-6 rounded-2xl cursor-pointer bg-[#374151] text-center hover:scale-110"
          onClick={() => setshowMonthlyTable(false)}>
          Hide Monthly Table
        </button>
      </div>
    </div>
  );
};

export default MonthlyPrayersTime;
