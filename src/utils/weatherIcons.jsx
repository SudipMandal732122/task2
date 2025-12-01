import React from 'react';



export const getWeatherIcon = (code, size = 80) => {
  const sizeClass = size === 80 ? 'w-20 h-20' :  size === 10 ? 'w-14 h-14' : 'w-8 h-8' ;

  if ([0].includes(code)) return <img className={sizeClass} src='./assets/icon-sunny.webp'/>;    
  if ([1, 2].includes(code)) return <img className={sizeClass} src='./assets/icon-partly-cloudy.webp'/>;    
  if ([3].includes(code)) return <img className={sizeClass} src='./assets/icon-overcast.webp'/>;    
  if ([45, 48].includes(code)) return <img className={sizeClass} src='./assets/icon-fog.webp'/>;    
  if ([51, 53, 55, 56, 57].includes(code)) return <img className={sizeClass} src='./assets/icon-drizzle.webp'/>;    
  if ([61, 63, 65, 66, 67].includes(code)) return <img className={sizeClass} src='./assets/icon-rain.webp'/>;    
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <img className={sizeClass} src='./assets/icon-snow.webp'/>;    
  if ([95, 96, 99].includes(code)) return <img className={sizeClass} src='./assets/icon-storm.webp'/>;    

  return <img className={sizeClass} src='./assets/icon-sunny.webp'/>;
};
