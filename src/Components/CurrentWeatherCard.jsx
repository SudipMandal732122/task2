import React from 'react';

import { getWeatherIcon } from '../utils/weatherIcons';


const CurrentWeatherCard = ({ cityName, dateStr, temperature, weatherCode }) => {
  return (
    <div className=" bg-[url('/assets/bg-today-large.svg')] max-[375px]:bg-[url('/assets/bg-today-small.svg')] rounded-3xl max-[375px]:py-8 px-4 py-15 relative overflow-hidden ">

      <div className="flex items-center  justify-between max-[375px]:flex-col">

        <div className='flex flex-col  justify-center'>
          <h3 className="text-2xl font-bold ">{cityName}</h3>
          <p className="text-blue-200 max-[375px]:mt-2 max-[375px]:mb-4 max-[375px]:text-center">{dateStr}</p>
        </div>
          { console.log(weatherCode)}
        <div className="flex items-center max-[375px]:gap-20 gap-5">
          <div>
            {
              getWeatherIcon(weatherCode)        
            }
          </div>
          <div className="text-7xl font-semibold">
            {temperature}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;