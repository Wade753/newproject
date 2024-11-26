import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather, weatherSelector } from "./reducers/appSlice";

const ICON_URL = process.env.REACT_APP_ICON_URL;

export default function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector(weatherSelector);

  const [city, setCity] = React.useState("");
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-6">WeatherApp</h1>
      <input
        onChange={handleChange}
        value={city}
        type="text"
        placeholder="Enter city name"
        className="w-64 p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => dispatch(fetchWeather(city))}
        className="w-64 p-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Get Weather
      </button>
      {weatherData && Object.keys(weatherData).length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md w-80">
          <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
          <div className="flex items-center">
            <img
              src={`${ICON_URL}${weatherData?.weather[0]?.icon}@2x.png`}
              alt="weather icon"
              className="w-12 h-12"
            />
            <p className="text-lg ml-2">{weatherData.weather[0].description}</p>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm">Temperature:</p>
              <p className="text-lg font-semibold">
                {(weatherData.main.temp - 273.15).toFixed(2)}°C
              </p>
            </div>
            <div>
              <p className="text-sm">Feels Like:</p>
              <p className="text-lg font-semibold">
                {(weatherData.main.feels_like - 273.15).toFixed(2)}°C
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm">Humidity:</p>
              <p className="text-lg font-semibold">
                {weatherData.main.humidity}%
              </p>
            </div>
            <div>
              <p className="text-sm">Pressure:</p>
              <p className="text-lg font-semibold">
                {weatherData.main.pressure} hPa
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm">Wind Speed:</p>
              <p className="text-lg font-semibold">
                {weatherData.wind.speed} m/s
              </p>
            </div>
            <div>
              <p className="text-sm">Wind Direction:</p>
              <p className="text-lg font-semibold">{weatherData.wind.deg}°</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
