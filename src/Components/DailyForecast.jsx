import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const DailyForecast = ({ dailyData, convertTemp }) => {
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  // console.log(dailyData.weather_code);
  return (
    <div>
      <h3 className="text-xl pt-2 font-semibold mb-4">Daily forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {dailyData.time.map((date, idx) => (
          <div key={idx} className="bg-[hsl(243,27%,20%)] rounded-2xl p-4 text-center hover:bg-[hsl(243,23%,24%)] transition-colors">
            <p className=" mb-3 font-medium">{getDayName(date)}</p>
            <div className="flex justify-center mb-3">
              {getWeatherIcon(Math.round(dailyData.weather_code[idx]),10)}
            </div>
            <div className='flex justify-between'>
              <p className="font-medium">{convertTemp(dailyData.max[idx])}°</p>
              <p className="font-medium text-gray-300">{convertTemp(dailyData.min[idx])}°</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;