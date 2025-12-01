export async function fetchWeatherApi(url, params) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${queryString}`);
  const data = await response.json();
  
  return [{
    utcOffsetSeconds: () => data.utc_offset_seconds || 0,
    current: () => ({
      time: () => data.current.time,
      variables: (index) => ({
        value: () => {
          const keys = ['temperature_2m', 'relative_humidity_2m', 'is_day', 'weather_code', 
                       'rain', 'snowfall', 'wind_speed_10m', 'precipitation', 'apparent_temperature'];
          return data.current[keys[index]];
        }
      })
    }),
    hourly: () => ({
      time: () => data.hourly.time[0],
      timeEnd: () => data.hourly.time[data.hourly.time.length - 1],
      interval: () => 3600,
      variables: (index) => ({
        valuesArray: () => {
          const keys = ['temperature_2m', 'relative_humidity_2m', 'weather_code'];
          return data.hourly[keys[index]];
        }
      })
    }),
    daily: () => ({
      time: () => data.daily.time[0],
      timeEnd: () => data.daily.time[data.daily.time.length - 1],
      interval: () => 86400,
      variables: (index) => ({
        valuesArray: () => {
          const keys = ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'rain_sum'];
          return data.daily[keys[index]];
        }
      })
    })
  }];
}

export async function fetchWeather(latitude = 25.01, longitude = 88.14) {
  const params = {
    latitude,
    longitude,
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'rain_sum'],
    hourly: ['temperature_2m', 'relative_humidity_2m', 'weather_code'],
    current: ['temperature_2m', 'relative_humidity_2m', 'is_day', 'weather_code', 
              'rain', 'snowfall', 'wind_speed_10m', 'precipitation', 'apparent_temperature'],
    timezone: 'GMT',
    timeformat: 'unixtime'
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const offset = response.utcOffsetSeconds();

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();


  const data = {
    current: {
      time: new Date((Number(current.time()) + offset) * 1000),
      temperature: current.variables(0).value(),
      humidity: current.variables(1).value(),
      is_day: current.variables(2).value(),
      weather_code: current.variables(3).value(),
      rain: current.variables(4).value(),
      snowfall: current.variables(5).value(),
      wind: current.variables(6).value(),
      precipitation: current.variables(7).value(),
      feels_like: current.variables(8).value()
    },
    hourly: {
      time: Array.from({ length: 24 }, (_, i) => 
        new Date((Number(hourly.time()) + i * 3600 + offset) * 1000)
      ),
      temp: hourly.variables(0).valuesArray(),
      weather_code:  hourly.variables(1).valuesArray(),
    },
    daily: {
      time: Array.from({ length: 7 }, (_, i) => 
        new Date((Number(daily.time()) + i * 86400 + offset) * 1000)
      ),
      max: daily.variables(1).valuesArray(),
      min: daily.variables(2).valuesArray(),
      weather_code: daily.variables(3).valuesArray(),
      rain: daily.variables(4).valuesArray()
    }
  };
 
  return data;
}

export async function getCityCoordinates(city) {
  city = city.trim();
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('No search result found!');
  }

  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}