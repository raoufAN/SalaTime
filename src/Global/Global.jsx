import { useCallback, useState } from "react";
import { GlobalContext } from "./GlobalContext";

import { GiSunrise } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import { GiSunset } from "react-icons/gi";
import { FaMoon } from "react-icons/fa";

const today = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Global = ({ children }) => {
  const [city, setCity] = useState("");
  const [showHome, setShowHome] = useState(false);
  const [PrayerTimeData, setPrayerTimeData] = useState([]);
  const [prayerTimeToday, setPrayerTimeToday] = useState(null);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [showMonthlyTable, setshowMonthlyTable] = useState(false);

  const day = today.getDate();
  const month = today.getMonth();
  const monthName = monthNames[month];
  const year = today.getFullYear();

  const currentFullDate = `${day} ${monthName} ${year}`;

  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");

  const timeToMilliseconds = (TimeString) => {
    const [hours, minutes, seconds] = TimeString.split(":").map(Number);
    return (
      hours * 60 * 60 * 1000 + minutes * 60 * 1000 + (seconds !== undefined ? seconds * 1000 : 0)
    );
  };

  const currentTime = `${hours}:${minutes}:${seconds}`;
  let timeNow = timeToMilliseconds(currentTime);

  const getPrayerTimeData = useCallback(
    async (city, Month) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=Algeria&method=3&month=${
            Month + 1
          }&year=${year}&timezonestring=Africa/Algiers`
        );
        if (!response.ok) {
          console.error("Failed with status:", response.status);
          return;
        }
        const data = await response.json();
        // console.log(data);
        setPrayerTimeData(data);
      } catch (error) {
        console.error("Faild Fetching The Data :", error);
      }
    },
    [year]
  );
  const getPrayerTimeToday = async (city) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Algeria&method=3&timezonestring=Africa/Algiers`
      );
      if (!response.ok) {
        console.error("Failed with status:", response.status);
        return;
      }
      const data = await response.json();
      //console.log(data.data);
      setPrayerTimeToday(data.data);
    } catch (error) {
      console.error("Faild Fetching The Data :", error);
    }
  };

  const getNameOfSlat = (nameOfSalat, showingArabic) => {
    switch (nameOfSalat) {
      case "Fajr":
        return (
          <>
            <GiSunrise className="mr-2.5 text-indigo-300" size={20} />
            <div className="text-indigo-300 flex space-x-2">
              <p> {nameOfSalat}</p>
              <p className={showingArabic ? "flex" : "hidden"}>(الفجر )</p>
            </div>
          </>
        );
      case "Dhuhr":
        return (
          <>
            <MdSunny className="mr-2.5  text-yellow-400" size={20} />
            <div className="text-yellow-400 flex space-x-2">
              <p>{nameOfSalat}</p> <p className={showingArabic ? "flex" : "hidden"}>(الظهر )</p>
            </div>
          </>
        );
      case "Asr":
        return (
          <>
            <MdSunny className="mr-2.5 text-orange-400" size={20} />
            <div className="text-orange-400 flex  space-x-2">
              <p>{nameOfSalat}</p>
              <p className={showingArabic ? "flex" : "hidden"}> (العصر)</p>
            </div>
          </>
        );
      case "Maghrib":
        return (
          <>
            <GiSunset className="mr-2.5 text-rose-400" size={18} />
            <div className="text-rose-400 flex space-x-2">
              <p>{nameOfSalat} </p> <p className={showingArabic ? "flex" : "hidden"}>(المغرب)</p>
            </div>
          </>
        );
      case "Isha":
        return (
          <>
            <FaMoon
              className={`mr-2.5 mt-0.5 ${showingArabic ? "text-white" : "text-slate-700"}`}
              size={18}
            />
            <div className={`${showingArabic ? "text-white" : "text-slate-700"} flex`}>
              <p>{nameOfSalat}</p>
              <p className={showingArabic ? "flex space-x-2" : "hidden"}> (العشاء)</p>
            </div>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        city,
        setCity,
        showHome,
        setShowHome,
        getPrayerTimeData,
        PrayerTimeData,
        getPrayerTimeToday,
        prayerTimeToday,
        day,
        month,
        year,
        timeNow,
        timeToMilliseconds,
        upcomingPrayer,
        setUpcomingPrayer,
        getNameOfSlat,
        currentFullDate,
        showMonthlyTable,
        setshowMonthlyTable,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Global;
