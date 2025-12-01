import React from 'react';

const WeatherDetailsGrid = ({ feelsLike, humidity, wind, precipitation, units }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[hsl(243,27%,20%)] rounded-xl p-4">
        <p className="text-gray-300 font-semibold mb-2">Feels Like</p>
        <p className="text-2xl ">{feelsLike}°</p>
      </div>
      <div className="bg-[hsl(243,27%,20%)] rounded-xl p-4">
        <p className="text-gray-300 font-semibold mb-2">Humidity</p>
        <p className="text-2xl ">{humidity}%</p>
      </div>
      <div className="bg-[hsl(243,27%,20%)] rounded-xl p-4">
        <p className="text-gray-300 font-semibold mb-2">Wind</p>
        <p className="text-2xl ">{wind} {units.wind}</p>
      </div>
      <div className="bg-[hsl(243,27%,20%)] rounded-xl p-4">
        <p className="text-gray-300 font-semibold mb-2">Precipitation</p>
        <p className="text-2xl ">{precipitation} {units.precip}</p>
      </div>
    </div>
  );
};

export default WeatherDetailsGrid;