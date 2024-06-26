'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/lib/fetchWeather';
import { getWeatherIcon } from '@/lib/weatherIcons';
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { MdOutlineWindPower } from "react-icons/md";
import { RiCloudWindyLine } from "react-icons/ri";
import { CiCloud } from "react-icons/ci";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherByCity = async () => {
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      setError(null);
    } catch (error) {
      setError('City not found');
      setWeather(null);
    }
  };

  const getWeatherByLocation = async (latitude, longitude) => {
    try {
      const data = await fetchWeatherByCoords(latitude, longitude);
      setWeather(data);
      setError(null);
    } catch (error) {
      setError('Location not found');
      setWeather(null);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      }, (error) => {
        setError('Unable to retrieve your location');
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  const isDay = weather ? weather.weather[0].icon.includes('d') : true;

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex mb-5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-l-lg"
          placeholder="Enter city"
        />
        <button
          onClick={getWeatherByCity}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
      <div className="flex flex-col backdrop-blur-sm bg-white/30 px-10 rounded-xl">
        <div className="text-center flex flex-row gap-2 justify-center">
          <div className='flex justify-center'>
          {getWeatherIcon(weather.weather[0].main, isDay)}
          </div>
          <div className='flex flex-col justify-center items-center'>
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-xl">{weather.weather[0].description}</p>
          <p className="text-2xl">{weather.main.temp}°C</p>
          </div>
        </div>
          <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex flex-col justify-center text-lg bg-black bg-opacity-45 mt-2 px-2 rounded-xl text-slate-400 mb-4"><WiHumidity size={40} color='grey'/>Humidity: <div>{weather.main.humidity}%</div></div>
          <div className="flex flex-col justify-center text-lg bg-black bg-opacity-45 mt-2 px-2 rounded-xl text-slate-400 mb-4"><WiStrongWind size={40}/>Pressure: <div>{weather.main.pressure} hPa</div></div>
          <div className="flex flex-col justify-center text-lg bg-black bg-opacity-45 mt-2 px-2 rounded-xl text-slate-400 mb-4"><MdOutlineWindPower size={40}/>Wind Speed: <div>{weather.wind.speed} m/s</div></div>
          <div className="flex flex-col justify-center text-lg bg-black bg-opacity-45 mt-2 px-2 rounded-xl text-slate-400 mb-4"><RiCloudWindyLine size={40}/>Wind Direction: <div>{weather.wind.deg}°</div></div>
          <div className="flex flex-col justify-center text-lg bg-black bg-opacity-45 mt-2 px-2 rounded-xl text-slate-400 mb-4"><CiCloud size={40}/>Cloudiness: <div>{weather.clouds.all}%</div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
