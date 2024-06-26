const API_KEY = '5033ac86ebca10fba385abf4de4bd5eb';  // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
