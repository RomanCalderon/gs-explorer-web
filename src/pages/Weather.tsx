// Dummy component to fetch data from the ASP.NET API

import { useEffect, useState } from 'react'

interface ForecastProps {
  forecast: WeatherProps[];
}

interface WeatherProps {
  date: string;
  temperatureF: number;
  temperatureC: number;
  summary: string;
}

const Weather = () => {
  const [forecast, setForecast] = useState<WeatherProps[]>([]);

  const getForecast = async () => {
    const response = await fetch('https://localhost:7162/api/weatherforecast/v1');
    const forecast: ForecastProps = await response.json();
    console.log(forecast);
    setForecast(forecast.forecast);
  }

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <>
      <div>Weather</div>
      <div>
        {forecast.map((weather) => (
          <div key={weather.date}>
            <div>{weather.date}</div>
            <div>{weather.temperatureF}</div>
            <div>{weather.temperatureC}</div>
            <div>{weather.summary}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Weather