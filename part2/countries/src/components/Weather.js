import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca3}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log('%c got weather ☀️', 'color: orange;');
        console.log(response.data);
        setWeather(response.data);
      })
  }, [country, api_key]);

  console.log(weather);
  if (weather !== undefined) {
    return (
      <>
        <h2>{`Weather in ${country.capital}`}</h2>
        <p><strong>What it's like:</strong> {weather.weather[0].description}</p>
        <p><strong>Temperature:</strong> {weather.main.temp}°C. Feels like {weather.main.feels_like}°C.</p>
        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
      </>
    );
  } 
  return null;
}

export default Weather;