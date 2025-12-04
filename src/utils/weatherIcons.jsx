import React from "react";

export const getWeatherIcon = (code, size = 80) => {
  const sizeClass =
    size === 80 ? "w-20 h-20" :
    size === 10 ? "w-14 h-14" :
    "w-8 h-8";

  const ICONS = {
    sunny: "./assets/icon-sunny.webp",
    partlyCloudy: "./assets/icon-partly-cloudy.webp",
    overcast: "./assets/icon-overcast.webp",
    fog: "./assets/icon-fog.webp",
    drizzle: "./assets/icon-drizzle.webp",
    rain: "./assets/icon-rain.webp",
    snow: "./assets/icon-snow.webp",
    storm: "./assets/icon-storm.webp",
  };

  if ([0].includes(code)) return <img className={sizeClass} src={ICONS.sunny} />;

  if ([1, 2].includes(code)) return <img className={sizeClass} src={ICONS.partlyCloudy} />;

  if ([3,4,5,6,7,8,9,10,11,12,13,14].includes(code))
    return <img className={sizeClass} src={ICONS.overcast} />;

  if ([45, 48].includes(code))
    return <img className={sizeClass} src={ICONS.fog} />;

  if ([51,52,53,55,56,57].includes(code))
    return <img className={sizeClass} src={ICONS.drizzle} />;

  if ([61,63,65,66,67].includes(code))
    return <img className={sizeClass} src={ICONS.rain} />;

  if ([71,73,75,77,85,86].includes(code))
    return <img className={sizeClass} src={ICONS.snow} />;

  if ([95,96,99].includes(code))
    return <img className={sizeClass} src={ICONS.storm} />;

  return <img className={sizeClass} src={ICONS.sunny} />;
};
