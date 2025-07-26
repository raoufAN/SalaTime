import { MdDateRange } from "react-icons/md";
import { useGlobalContext } from "../../Hook/useGlobalContext";
const DateBox = () => {
  const { prayerTimeToday } = useGlobalContext();

  return (
    <div className="w-full md:w-9/12 bg-[#374151] mx-auto rounded-2xl p-3.5 flex items-center flex-col space-y-3.5 shadow-2xl">
      {prayerTimeToday ? (
        <>
          <h1 className="text-white text-2xl md:text-3xl flex font-bold">
            <MdDateRange className="mr-2.5 mt-0.5" />
            {prayerTimeToday.date.gregorian.weekday.en}, {prayerTimeToday.date.gregorian.month.en}{" "}
            {prayerTimeToday.date.gregorian.day}, {prayerTimeToday.date.gregorian.year}
          </h1>
          <h3 className="text-white text-xl md:text-2xl font-bold" dir="rtl">
            <span>{prayerTimeToday.date.hijri.weekday.ar}</span>{" "}
            <span>{prayerTimeToday.date.hijri.day}</span>{" "}
            <span>{prayerTimeToday.date.hijri.month.ar}</span>{" "}
            <span>{prayerTimeToday.date.hijri.year}</span>
          </h3>
        </>
      ) : (
        <h1 className="text-white">Loading...</h1>
      )}
    </div>
  );
};

export default DateBox;
