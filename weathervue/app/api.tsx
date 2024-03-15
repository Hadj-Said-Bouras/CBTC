"use client"
import React, { useState } from 'react';

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
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

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

const api = {
  key: "ca42c9b91f5366afae64f005250483b5",
  base: 'https://api.openweathermap.org/data/2.5/',
};

function Api() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>({
    cod: 200,
    name: 'London',
    sys: {
      country: 'GB',
    },
    weather: [
      {
        main: 'Clouds',
        description: 'broken clouds',
      },
    ],
    main: {
      temp: 288.15,
      humidity: 60,
    },
    wind: {
      speed: 3.6,
    },
  });
  const [forecasts, setForecasts] = useState<ForecastData>({
    '2023-05-01': [
      {
        dt_txt: '2023-05-01 12:00:00',
        main: {
          temp: 290.15,
        },
        wind: {
          speed: 4.1,
        },
      },
      // ... add more forecast data for the day
    ],
    '2023-05-02': [
      {
        dt_txt: '2023-05-02 12:00:00',
        main: {
          temp: 292.15,
        },
        wind: {
          speed: 3.2,
        },
      },
      // ... add more forecast data for the day
    ],
    // ... add more forecast data for other days
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    const url = `${api.base}weather?q=${search}&appid=${api.key}`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
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
      })
      .catch(error => {
        console.error("Error fetching weather:", error);
      });
  };

  const forecast = (coord: { lat: number; lon: number }) => {
    if (!coord) return;

    const url = `${api.base}forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${api.key}`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.cod === "200") {
          organizeForecastByDays(result.list);
        } else {
          console.log("Error fetching forecast: ", result.message);
        }
      })
      .catch(error => {
        console.error("Error fetching forecast:", error);
      });
  };

  const organizeForecastByDays = (forecastList: Array<{ dt_txt: string }>) => {
    const groupedByDay: Record<string, any[]> = forecastList.reduce(
      (acc, forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        (acc[date] = acc[date] || []).push(forecast);
        return acc;
      },
      {} as Record<string, any[]>
    );

    setForecasts(groupedByDay);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?q=80&w=1887&auto=format&fit=crop&w=675&q=80"
                alt="Weather Background"
                className="w-full h-full object-cover"
              />
              
            </div>
            <div className="relative z-10 p-8 text-white">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{weather?.name}, {weather?.sys.country}</h2>
                <p className="text-lg" suppressHydrationWarning>{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <h1 className="text-6xl font-bold mb-2">{weather ? Math.round(weather.main.temp - 273) + "°C" : ""}</h1>
                <p className="text-2xl">{weather?.weather[0].description}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-8">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Enter city name"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="flex-grow px-4 py-2 mr-2 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white py-2 px-4 rounded-lg"
                >
                  Search
                </button>
              </form>
            </div>
            {showNotification && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">City not found. Please try again.</span>
              </div>
            )}
            <ul className="mb-6">
              <li className="flex justify-between mb-2">
                <span className="font-bold text-sm uppercase">Precipitation</span>
                <span>{weather?.weather[0].description.includes("rain") ? "Yes" : "No"}</span>
              </li>
              <li className="flex justify-between mb-2">
                <span className="font-bold text-sm uppercase">Humidity</span>
                <span>{weather?.main.humidity}%</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold text-sm uppercase">Wind</span>
                <span>{weather?.wind.speed} m/s</span>
              </li>
            </ul>
            <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Forecast</h3>
          <div className="flex overflow-x-auto">
            {Object.keys(forecasts).map((date, index) => (
          <div key={index} className={`flex-shrink-0 ${index === 0 ? 'bg-indigo-500 text-white' : 'bg-gray-200'} rounded-lg mr-4 p-4`}>
        <p className="text-sm font-bold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
        <p className="text-lg font-bold">{Math.round(forecasts[date][0].main.temp - 273)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Api;