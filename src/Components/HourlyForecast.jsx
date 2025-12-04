import React  from 'react';
import DayDropdown from './DayDropdown';
import { getWeatherIcon } from '../utils/weatherIcons';

const HourlyForecast = ({ hourlyData, convertTemp, selectedDay, setSelectedDay, openDropdown, setOpenDropdown }) => {

  

  // Convert entries to easier format
  const entries = hourlyData.time.map((t, i) => ({
    time: t instanceof Date ? t : new Date(t),
    temp: hourlyData.temp[i],
    code: hourlyData.weather_code[i],
  }));

  // Filter by selected day
  const filteredHours = entries.filter(entry => {
    const dayName = entry.time.toLocaleDateString("en-US", { weekday: "long" });
    return dayName === selectedDay;
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className=" bg-[hsl(243,27%,20%)]  rounded-3xl p-6 max-[375px]:p-4  ">
      <div className=" relative flex items-center justify-between  max-[375px]:gap-2 max-[375px]:text-sm mb-6">
        <h3 className="text-xl font-bold">Hourly forecast</h3>
        <button
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="bg-[hsl(243,23%,24%)] px-3 py-2 rounded-lg cursor-pointer font-semibold hover:bg-[hsl(243,23%,30%)] flex gap-2 focus:outline-[0.1rem] focus:outline-offset-[0.2rem]"
        >
          <p>{selectedDay} </p>
          <img className={`transition-transform duration-300 ${openDropdown ? "rotate-180" : "rotate-0"}`}
          src="./assets/icon-dropdown.svg"/>
        </button>
         <DayDropdown
          days={days}
          selectedDay={selectedDay}
          onSelect={(day) => {
            setSelectedDay(day);
            setOpenDropdown(false);
          }}
          isVisible={openDropdown}
        />
      </div>

      <div className="space-y-3 h-[30rem]  overflow-y-auto thin-scrollbar pr-4 -mr-6 max-[375px]:-mr-4">
        {filteredHours.map((entry, idx) => (
          <div
            key={idx}
            className="bg-[hsl(243,23%,24%)]  rounded-xl px-4 py-[0.7rem] flex items-center justify-between hover:bg-[hsl(243,23%,30%)] transition-colors"
          >
            <div className="flex items-center gap-3">

              {getWeatherIcon(entry.code, 20)}

              <span>
                {entry.time.getHours() % 12 || 12}
                {entry.time.getHours() >= 12 ? " PM" : " AM"}
              </span>
            </div>

            <span className="font-semibold">
              {convertTemp(entry.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
