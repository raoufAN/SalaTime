import { GiSunrise } from "react-icons/gi";
import { useGlobalContext } from "../../Hook/useGlobalContext";

const mainPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const Table = () => {
  const { timeNow, prayerTimeToday, city, timeToMilliseconds, upcomingPrayer, getNameOfSlat } =
    useGlobalContext();

  return (
    <div className="w-full lg:w-9/12 mx-auto my-10">
      {prayerTimeToday != undefined ? (
        <>
          <div className="flex justify-between items-center flex-col sm:flex-row bg-[#374151] md:rounded-t-2xl p-7 text-white">
            <div className="space-y-1.5 text-center">
              <h3 className="tex-xl lg:text-2xl font-bold">
                {prayerTimeToday.date.gregorian.weekday.en},{" "}
                {prayerTimeToday.date.gregorian.month.en} {prayerTimeToday.date.gregorian.day},{" "}
                {prayerTimeToday.date.gregorian.year}
              </h3>
              <h4 className="lg:text-xl" dir="rtl">
                <span>{prayerTimeToday.date.hijri.weekday.ar}</span>{" "}
                <span>{prayerTimeToday.date.hijri.day}</span>{" "}
                <span>{prayerTimeToday.date.hijri.month.ar}</span>{" "}
                <span>{prayerTimeToday.date.hijri.year}</span>
              </h4>
            </div>
            <div className="space-y-1.5 text-center">
              <h3 className="tex-xl lg:text-2xl font-bold">Algeria, {city}</h3>
              <h4 className="lg:text-xl">
                {prayerTimeToday.meta.method.location.latitude}° N,
                {prayerTimeToday.meta.method.location.longitude}° E
              </h4>
            </div>
          </div>
          <div className="flex flex-col shadow-xl md:rounded-b-2xl">
            {Object.entries(prayerTimeToday.timings)
              .filter(([name]) => mainPrayers.includes(name))
              .sort(function (a, b) {
                return timeToMilliseconds(a[1]) - timeToMilliseconds(b[1]);
              })
              .map((el, index) => (
                <div
                  className={`flex justify-between items-center  ${
                    el[0] === upcomingPrayer ? "bg-[#C1CFDA] p-5 " : "bg-[#f9fafb] p-4 "
                  }   ${
                    index === mainPrayers.length - 1
                      ? "border-b-0 md:rounded-b-2xl"
                      : "border-b  border-gray-300"
                  }`}
                  key={index}>
                  <div className="flex  items-center flex-1 font-bold ">
                    {getNameOfSlat(el[0], false)}
                  </div>
                  <p className="font-bold flex-1 text-center">{el[1]}</p>
                  <div className=" flex-1 text-right">
                    <span
                      className={`w-fit py-1.5 px-4 rounded-full font-bold  ${
                        el[0] === upcomingPrayer ? "bg-[#374151] text-white" : "bg-[#e5e7eb]"
                      }`}>
                      {el[0] === upcomingPrayer
                        ? "Next "
                        : timeToMilliseconds(el[1]) > timeNow
                        ? "Upcoming"
                        : "Passed"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="w-full justify-center items-center">
          <h1 className="text-2xl font-bold text-[#374151]">Loading</h1>
        </div>
      )}
    </div>
  );
};

export default Table;
