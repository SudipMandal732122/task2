import React, { useState, useEffect } from 'react';
import { fetchWeather, getCityCoordinates } from '../utils/weatherApi';
import Header from './Header';
import SettingsDropdown from './SettingsDropdown';
import SearchBar from './SearchBar';
import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherDetailsGrid from './WeatherDetailsGrid';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

function LandingPage() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = new Date();
  const currentDay = days[day.getDay()];
  const [searchQuery, setSearchQuery] = useState('');
  const [cityName, setCityName] = useState('Berlin, Germany');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [firstRender,setFirstrender]=useState(true);
  const [units, setUnits] = useState({ temp: 'celsius', wind: 'km/h', precip: 'mm'  });
  const [selectedDay, setSelectedDay] = useState(currentDay);

  useEffect(() => {
    loadWeather(52.52, 13.41, 'Berlin, Germany');
    setFirstrender(!firstRender);
  }, []);

  const loadWeather = async (lat, lon, city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
      setCityName(city);
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const { latitude, longitude, name, country } = await getCityCoordinates(searchQuery);
      await loadWeather(latitude, longitude, `${name}, ${country}`);
      setSearchQuery('');
    } catch (err) {
      setError('No search result found!');
      setLoading(false);
    }
  };

  const convertTemp = (temp) => {
    if (units.temp === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const convertWind = (speed) => {
    if (units.wind === 'mph') {
      return Math.round(speed * 0.621371);
    }
    return Math.round(speed);
  };

  const convertPrecip = (value) => {
  if (units.precip === "in") {
    return (value * 0.0393701).toFixed(2); // mm → inches
  }
  return value;
};


  if (loading && !weatherData) {
    return  <LoadingScreen />;
  }

  if (error && !weatherData) {
    return(
      <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white  md:p-8" >
      <div className="max-w-7xl min-[375px]:px-10 p-4  mx-auto" >
        <div className="relative">
            <Header onSettingsClick={() => setShowSettings(!showSettings)} />

            <SettingsDropdown 
              units={units} 
              setUnits={setUnits} 
              isVisible={showSettings} 
            />
        </div>
         <ErrorScreen onRetry={() => loadWeather(52.52, 13.41, 'Berlin, Germany')} showSettings={showSettings} setShowSettings={setShowSettings} />
        </div>
        </div>
    );
  }

  if (!weatherData) return null;

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white  md:p-8" >
      <div className="max-w-7xl min-[375px]:px-10 p-4  mx-auto" >
        <div className="relative">
            <Header onSettingsClick={() => setShowSettings(!showSettings)} />

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
          error={error}
        />

        {
            !firstRender && error ? <p className="text-white text-center text-lg font-semibold mt-2">{error}</p>
            :
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CurrentWeatherCard 
                        cityName={cityName}
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
                />
            </div>
           
        }

        </div> 
    </div>
  );
}

export default LandingPage;