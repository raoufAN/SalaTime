import { useGlobalContext } from "../../Hook/useGlobalContext";
import { useEffect, useState } from "react";

const Timer = () => {
  const {
    timeNow,
    prayerTimeToday,
    timeToMilliseconds,
    upcomingPrayer,
    setUpcomingPrayer,
    getNameOfSlat,
  } = useGlobalContext();
  const [runtime, setRunTime] = useState(new Date());
  const [upcomingPrayerTime, setUpcomingPrayerTime] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const hours = runtime.getHours().toString().padStart(2, "0");
  const minutes = runtime.getMinutes().toString().padStart(2, "0");
  const seconds = runtime.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  let timeer = timeToMilliseconds(currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRunTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [runtime]);

  useEffect(() => {
    if (!prayerTimeToday) return;
    const mainPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const FiltringPrayers = Object.entries(prayerTimeToday?.timings)

      .map(([name, time]) => {
        return { name, time: timeToMilliseconds(time) };
      })
      .filter(({ name, time }) => mainPrayers.includes(name) && timeNow < time);

    if (FiltringPrayers.length > 0) {
      const closestPrayer = FiltringPrayers.reduce((prev, curr) =>
        curr.time < prev.time ? curr.time : prev
      );
      setUpcomingPrayer(closestPrayer.name);
      setUpcomingPrayerTime(closestPrayer.time);
    } else {
      setUpcomingPrayer("Fajr");
      setUpcomingPrayerTime(
        timeToMilliseconds(prayerTimeToday?.timings.Fajr) + timeToMilliseconds("24:00:00")
      );
    }
  }, [timeNow, timeToMilliseconds, prayerTimeToday, setUpcomingPrayer]);

  useEffect(() => {
    if (!upcomingPrayerTime || !timeer) return;

    const difference = Math.max(0, upcomingPrayerTime - timeer);

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ hours, minutes, seconds });
  }, [timeer, upcomingPrayerTime]);

  return (
    <div className="w-full md:w-9/12 bg-[#374151] mx-auto rounded-2xl p-3.5 flex items-center justify-center flex-col space-y-3.5 my-5 text-white shadow-2xl">
      {prayerTimeToday != undefined ? (
        <>
          <span className=" font-bold"> Next Prayer</span>
          <h1 className="text-2xl font-bold flex items-center ">
            {getNameOfSlat(upcomingPrayer, true)}
          </h1>
          <div className="w-full md:w-[70%] grid grid-cols-3 gap-4 mt-3">
            <div className="p-5 backdrop-blur-sm rounded-2xl bg-[#C1CFDA] flex flex-col justify-center items-center text-2xl md:text-3xl font-bold">
              <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
              <span className="text-xl">Hours</span>
            </div>
            <div className="p-5 backdrop-blur-sm rounded-2xl bg-[#C1CFDA] flex flex-col justify-center items-center text-2xl md:text-3xl font-bold">
              <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
              <span className="text-xl">Minutes</span>
            </div>
            <div className="p-5 backdrop-blur-sm rounded-2xl bg-[#C1CFDA] flex flex-col justify-center items-center text-2xl md:text-3xl font-bold">
              <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
              <span className="text-xl">Seconds</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white">Loading...</h1>
        </>
      )}
    </div>
  );
};

export default Timer;
