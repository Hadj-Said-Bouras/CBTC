"use client"
import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiDayShowers, WiDayThunderstorm } from 'react-icons/wi';

const api = {
  key: "ca42c9b91f5366afae64f005250483b5",
  base: 'http://api.openweathermap.org/data/2.5/',
};

function Api() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [forecasts, setForecasts] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
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
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const forecast = async (coord) => {
    if (!coord) return;

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 to-green-200">
      <div className="flex justify-center items-center py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-4 rounded-r-lg"
            >
              Search
            </button>
          </div>
          {showNotification && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">City not found. Please try again.</span>
            </div>
          )}
          {weather.cod === 200 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="flex justify-center items-center mb-4">
                <span className="text-6xl mr-4">
                  {weather.weather[0].main === 'Clear' && <WiDaySunny className="text-yellow-500" />}
                  {weather.weather[0].main === 'Clouds' && <WiCloudy className="text-gray-500" />}
                  {weather.weather[0].main === 'Rain' && <WiDayShowers className="text-blue-500" />}
                  {weather.weather[0].main === 'Thunderstorm' && <WiDayThunderstorm className="text-yellow-600" />}
                </span>
                <div>
                  <p className="text-2xl font-semibold text-gray-800">{weather.weather[0].description}</p>
                  <p className="text-xl text-gray-600">Temperature: {Math.round(weather.main.temp - 273)} °C</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {Object.keys(forecasts).length > 0 && (
        <div className="flex-1 bg-white rounded-t-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">5-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(forecasts).map((date, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">{date}</h3>
                <div className="flex flex-wrap">
                  {forecasts[date].map((forecast, subIndex) => (
                    <div key={subIndex} className="mr-4 mb-4 text-center">
                      <p className="text-sm text-gray-500">{forecast.dt_txt.split(' ')[1]}</p>
                      <p className="text-lg text-gray-600">temp: {Math.round(forecast.main.temp - 273)} °C</p>
                      <p className="text-lg text-gray-600">wind speed: {forecast.wind.speed} m/s</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Api;