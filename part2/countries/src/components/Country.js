import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

const Country = ({ country }) => {

  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(`${baseUrl}/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => setWeather(res.data))
      .catch(err => console.error(err))
  }, [country]);

  const windDirection = weather && compassSector[(weather.wind.deg / 22.5).toFixed(0)];
  const celciusTemp = weather && (Number(weather.main.temp) - 273.15).toFixed(1);
  const windSpeedMph = weather && (Number(weather.wind.speed) * 2.237).toFixed(0);
  const iconLink = weather && `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`

  return <div>
    <h2>{country.name.common}</h2>

    <p>capital {country.capital}</p>
    <p>population {country.population}</p>

    <h3>Spoken languages</h3>
    <ul>
      {Object.values(country.languages).map(language =>
        <li key={language}>{language}</li>
      )}
    </ul>

    <img src={country.flags.png} alt='flag' width={200} />

    <h3>Weather in {country.capital}</h3>

    <p>
      <b>temperature: </b>
      {celciusTemp} Celcius
    </p>
    <img src={iconLink} alt='weather icon' width={100} />
    <p>
      <b>wind: </b>
      {windSpeedMph} mph direction {windDirection}
    </p>
  </div>;
};

export default Country;
