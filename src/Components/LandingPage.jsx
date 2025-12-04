import React, { useState, useEffect } from 'react';

import {
  fetchWeather,
  getCityCoordinates,
  fetchSuggestions,
} from "../utils/weatherApi";

import Header from './Header';
import SettingsDropdown from './SettingsDropdown';
import SearchBar from './SearchBar';
import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherDetailsGrid from './WeatherDetailsGrid';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import ErrorScreen from './ErrorScreen';
import WebLoader from './WebLoader';

import { useQuery } from "@tanstack/react-query";


function LandingPage() {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const today = new Date();
  const currentDay = days[today.getDay()];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [coords, setCoords] = useState({
    lat: 52.52,
    lon: 13.41,
    city: "Berlin, Germany",
  });

  const [units, setUnits] = useState({ 
    temp: 'celsius', 
    wind: 'km/h', 
    precip: 'mm' 
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [noResult, setNoResult] = useState(false);



  const { data: suggestions = [], refetch: refetchSuggestions } = useQuery({
    queryKey: ["suggestions", searchQuery],
    queryFn: () => fetchSuggestions(searchQuery),
    enabled: false,
  });
  
  useEffect(() => {
  if (!searchQuery.trim()) {
    setShowSuggestions(false);
    return;
  }

  const timer = setTimeout(() => {
    setShowSuggestions(true);
    refetchSuggestions();
  }, 450);

  return () => clearTimeout(timer);
}, [searchQuery]);
  

  const {
    data: weatherData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["weather", coords.lat, coords.lon],
    queryFn: () => fetchWeather(coords.lat, coords.lon),
    //  Auto refresh every 5 minutes
    refetchInterval: 2 * 60 * 1000,

    //  Refresh when browser becomes active
    refetchOnWindowFocus: true,

    //  Refresh if network reconnects
    refetchOnReconnect: true,

    // Retry on failure
    retry: 1,
  });

  const onSelectSuggestion = (item) => {
    const lat = item.latitude;
    const lon = item.longitude;
    const city = `${item.name}, ${item.country}`;

    setCoords({ lat, lon, city });
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setNoResult(false); // reset old message

    try {
      const { latitude, longitude, name, country } =
        await getCityCoordinates(searchQuery);

      setCoords({
        lat: latitude,
        lon: longitude,
        city: `${name}, ${country}`,
      });

      setSearchQuery("");
    } catch (err) {
      console.log("Search failed.");
      setNoResult(true);       // <-- Show the message
      setSearchQuery("");      //  clear input
    }
  };

  const convertTemp = (temp) =>
    units.temp === "fahrenheit" ? Math.round(temp * 1.8 + 32) : Math.round(temp);

  const convertWind = (speed) =>
    units.wind === "mph" ? Math.round(speed * 0.621371) : Math.round(speed);

  const convertPrecip = (val) =>
    units.precip === "in" ? (val * 0.0393701).toFixed(2) : val;

  const handleClickOutside = () => {
    if (showSettings) setShowSettings(false);
    if (openDropdown) setOpenDropdown(false);
  };


  if (isLoading) {
    return (
      <WebLoader
        props={{
          setShowSettings,
          showSettings,
          units,
          setUnits,
          searchQuery,
          setSearchQuery,
          handleSearch,
          error,
        }}
      />
    );
  }



  if (error) {
    return(
      <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white  md:p-6"  >
      <div className="max-w-7xl min-[375px]:px-14 min-[375px]:pb-10 p-4  mx-auto" >
        <div className="relative">
            <Header onSettingsClick={() => setShowSettings(!showSettings)} />

            <SettingsDropdown 
              units={units} 
              setUnits={setUnits} 
              isVisible={showSettings} 
            />
        </div>
        <ErrorScreen 
          onRetry={() => refetch()}
          showSettings={showSettings} 
          setShowSettings={setShowSettings} 
        />
        </div>
        </div>
    );
  }

  if (!weatherData) return null;

  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div 
      className="min-h-screen bg-[hsl(243,96%,9%)] text-white  md:p-6 "   onClick={handleClickOutside} 
    >
      <div className="max-w-7xl min-[375px]:px-14  min-[375px]:pb-10 max-[375px]:pb-10 p-4  mx-auto "  >
        <div className="relative">
            <Header 
              showSettings={showSettings} 
              onSettingsClick={() => setShowSettings(!showSettings)} 
            />

            <SettingsDropdown 
              units={units} 
              setUnits={setUnits} 
              isVisible={showSettings} 
            />
        </div>
       <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          

          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          onSelectSuggestion={onSelectSuggestion}
        />
        

        {
           noResult ? 
            <p className="text-white text-center text-lg font-semibold mt-6">
              No search result found!
            </p>
            :
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CurrentWeatherCard 
                        cityName={coords.city}
                        dateStr={dateStr}
                        temperature={convertTemp(weatherData.current.temperature)}
                        weatherCode={weatherData.current.weather_code}
                    />

                    <WeatherDetailsGrid 
                        feelsLike={convertTemp(weatherData.current.feels_like)}
                        humidity={Math.round(weatherData.current.humidity)}
                        wind={convertWind(weatherData.current.wind)}
                        precipitation={convertPrecip(weatherData.current.precipitation)}
                        units={units}
                    />

                    <DailyForecast 
                        dailyData={weatherData.daily}
                        convertTemp={convertTemp}
                        weatherCode={weatherData.daily.weather_code}
                    />
                </div>

                <HourlyForecast 
                    hourlyData={weatherData.hourly}
                    convertTemp={convertTemp}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                />
            </div>
           
        }

        </div> 
    </div>
  );
}

export default LandingPage;