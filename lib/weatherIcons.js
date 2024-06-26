import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayCloudy, WiNightClear, WiNightAltCloudy } from 'react-icons/wi';

const weatherIcons = {
  Clear: {
    day: <WiDaySunny size={200} color='orange'/>,
    night: <WiNightClear size={200} color='yellow'/>
  },
  Clouds: {
    day: <WiDayCloudy size={200} color='orange'/>,
    night: <WiNightAltCloudy size={200} color='black'/>
  },
  Rain: <WiRain size={200} color='blue'/>,
  Snow: <WiSnow size={200} color='lightblue'/>,
  Thunderstorm: <WiThunderstorm size={200} color='amber'/>,
  Fog: <WiFog size={200} color='white'/>,
};

export const getWeatherIcon = (weather, isDay) => {
  if (weatherIcons[weather]) {
    return isDay ? weatherIcons[weather].day : weatherIcons[weather].night;
  }
  return <WiCloudy size={200} color=''/>; // Default icon
};
