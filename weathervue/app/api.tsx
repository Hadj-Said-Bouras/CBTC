"use client"
import React, { useEffect, useState } from 'react';
import { WiDaySunny, WiCloudy, WiDayShowers, WiDayThunderstorm } from 'react-icons/wi';

const api = {
  key: "ca42c9b91f5366afae64f005250483b5",
  base: 'http://api.openweathermap.org/data/2.5/',
};

function Api() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [forecasts, setForecasts] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    searchCity();
  };

  const searchCity = async () => {
    if (!search) return;

    const url = `${api.base}weather?q=${search}&appid=${api.key}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === 200) {
        setWeather(result);
        forecast(result.coord);
      } else {
        console.log("Error: ", result.message);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const forecast = async (coord) => {
    if (!coord) {
      console.error("Error: Missing coordinates for forecast");
      return;
    }

    const url = `${api.base}forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${api.key}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === "200") {
        organizeForecastByDays(result.list);
      } else {
        console.log("Error fetching forecast: ", result.message);
      }
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const organizeForecastByDays = (forecastList) => {
    const groupedByDay = forecastList.reduce((acc, forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      acc[date] = acc[date] || [];
      acc[date].push(forecast);
      return acc;
    }, {});

    setForecasts(groupedByDay);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={(e) => handleSearch(e)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>

        {weather.cod === 200 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
            <p className="text-lg">
              <span className="">
                {weather.weather[0].main === 'Clear' && <WiDaySunny />}
                {weather.weather[0].main === 'Clouds' && <WiCloudy />}
                {weather.weather[0].main === 'Rain' && <WiDayShowers />}
                {weather.weather[0].main === 'Thunderstorm' && <WiDayThunderstorm />}
              </span>
              {weather.weather[0].description}
            </p>
            <p className="text-lg">Temperature: {weather.main.temp} K</p>
            <p className="text-lg">Temperature: {Math.round(weather.main.temp - 273)} °C</p>
          </div>
        )}

        {Object.keys(forecasts).length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
            {Object.keys(forecasts).map((date, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{date}</h3>
                <div className="flex flex-wrap">
                  {forecasts[date].map((forecast, subIndex) => (
                    <div key={subIndex} className="mr-4 mb-4">
                      <p className="text-sm text-gray-500">{forecast.dt_txt.split(' ')[1]}</p>
                      <p className="text-lg">{forecast.main.temp} K</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Api;
