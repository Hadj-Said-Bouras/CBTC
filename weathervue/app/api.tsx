// Importing necessary dependencies and icons from react-icons library
"use client"
import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiDayShowers, WiDayThunderstorm } from 'react-icons/wi';

// Type definition for the structure of weather data received from the API
interface WeatherData {
  cod: number;
  name: string;
  sys: {
    country: string;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
  };
}

// Type definition for the structure of forecast data received from the API
interface ForecastData {
  [date: string]: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
  }>;
}

// API configuration object
const api = {
  key: "ca42c9b91f5366afae64f005250483b5",
  base: 'http://api.openweathermap.org/data/2.5/',
};

// Main component for fetching weather data and rendering UI
function Api() {
  // State variables using the useState hook
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecasts, setForecasts] = useState<ForecastData>({});
  const [showNotification, setShowNotification] = useState(false);

  // Function to handle the search button click
  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!search) return;

    // Constructing the URL for weather data based on the search query
    const url = `${api.base}weather?q=${search}&appid=${api.key}`;

    try {
      // Fetching weather data from the API
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === 200) {
        // If the API request is successful, update the weather state and fetch forecasts
        setWeather(result);
        forecast(result.coord);
      } else {
        // If there's an error, log it and display a notification
        console.log("Error: ", result.message);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      // Log any errors that occur during the API request
      console.error("Error fetching weather:", error);
    }
  };

  // Function to fetch forecast data based on coordinates
  const forecast = async (coord: { lat: number; lon: number }) => {
    if (!coord) return;

    // Constructing the URL for forecast data based on coordinates
    const url = `${api.base}forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${api.key}`;

    try {
      // Fetching forecast data from the API
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === "200") {
        // If the API request is successful, organize and update forecast data
        organizeForecastByDays(result.list);
      } else {
        // If there's an error, log it
        console.log("Error fetching forecast: ", result.message);
      }
    } catch (error) {
      // Log any errors that occur during the API request
      console.error("Error fetching forecast:", error);
    }
  };

  // Function to organize forecast data by days
  const organizeForecastByDays = (forecastList: Array<{ dt_txt: string }>) => {
    // Grouping forecast data by day using reduce function
    const groupedByDay: Record<string, any[]> = forecastList.reduce(
      (acc, forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        (acc[date] = acc[date] || []).push(forecast);
        return acc;
      },
      {} as Record<string, any[]>
    );
  
    // Updating the forecasts state with the organized data
    setForecasts(groupedByDay);
  };

  // JSX rendering of the component
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 to-green-200">
      <div className="flex justify-center items-center py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="flex mb-6">
            {/* Input for entering city name */}
            <input
              type="text"
              placeholder="Enter city name"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {/* Button to trigger the search */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-4 rounded-r-lg"
            >
              Search
            </button>
          </div>
          {/* Notification for city not found */}
          {showNotification && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">City not found. Please try again.</span>
            </div>
          )}
          {/* Displaying weather information if available */}
          {weather?.cod === 200 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="flex justify-center items-center mb-4">
                {/* Weather icon based on weather condition */}
                <span className="text-6xl mr-4">
                  {weather.weather[0].main === 'Clear' && <WiDaySunny className="text-yellow-500" />}
                  {weather.weather[0].main === 'Clouds' && <WiCloudy className="text-gray-500" />}
                  {weather.weather[0].main === 'Rain' && <WiDayShowers className="text-blue-500" />}
                  {weather.weather[0].main === 'Thunderstorm' && <WiDayThunderstorm className="text-yellow-600" />}
                </span>
                <div>
                  {/* Displaying weather description and temperature */}
                  <p className="text-2xl font-semibold text-gray-800">{weather.weather[0].description}</p>
                  <p className="text-xl text-gray-600">Temperature: {Math.round(weather.main.temp - 273)} °C</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Displaying 5-day forecast if available */}
      {Object.keys(forecasts).length > 0 && (
        <div className="flex-1 bg-white rounded-t-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">5-Day Forecast</h2>
          {/* Grid layout for the 5-day forecast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(forecasts).map((date, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                {/* Displaying date for each day */}
                <h3 className="text-lg font-semibold mb-2 text-gray-700">{date}</h3>
                <div className="flex flex-wrap">
                  {/* Displaying forecast details for each time slot in a day */}
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
