import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const HourlyForecast = ({ hourlyData, convertTemp, selectedDay, setSelectedDay }) => {
  // Helper to convert incoming time entries to Date objects safely
  const toDate = (t) => (t instanceof Date ? t : new Date(t));

  return (
    <div className="bg-[hsl(243,27%,20%)] rounded-3xl p-6 max-[375px]:p-4 ">
      <div className="flex items-center justify-between max-[375px]:gap-2 max-[375px]:text-sm mb-6">
        <h3 className="text-xl font-bold">Hourly forecast</h3>
        
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-[hsl(243,23%,24%)] ps-3 pe-2 py-2 rounded-lg focus:outline-none cursor-pointer"
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>

      {/* note: hide-scrollbar class here */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto thin-scrollbar pr-4 -mr-6 max-[375px]:-mr-4">
        {hourlyData.time.slice(0, 20).map((timeEntry, idx) => {
          const time = toDate(timeEntry);
          // safe indexing guards
          const weatherCode = hourlyData.weather_code?.[idx];
          const tempVal = hourlyData.temp?.[idx];

          return (
            <div
              key={idx}
              className="bg-[hsl(243,23%,24%)] rounded-xl p-4 flex items-center justify-between hover:bg-[hsl(243,23%,30%)] transition-colors"
            >
              <div className="flex items-center gap-3">
                
                {getWeatherIcon(weatherCode, 20)}
                <span>
                  {time.getHours() % 12 || 12} {time.getHours() >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
              <span className="font-semibold">{tempVal != null ? convertTemp(tempVal) : '--'}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
