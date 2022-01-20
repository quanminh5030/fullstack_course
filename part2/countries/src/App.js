import axios from "axios";
import React, { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";
import Country from "./components/Country";

function App() {

  const [countries, setcountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setcountries(res.data))
      .catch(err => console.error(err))
  }, []);

  const handleChanged = e => setFilter(e.target.value);

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.trim().toLowerCase()));

  const showCountry = countryName => setFilter(countryName.toLowerCase());

  return (
    <div>
      find countries <input onChange={handleChanged} />

      {
        (() => {
          if (filterCountries.length > 10) return <p>Too many matches, specify another filter</p>
          else {
            if (filterCountries.length === 1) {
              return (
                <Country country={filterCountries[0]} />
              )
            } else {
              return (
                <CountriesList
                  countries={filterCountries}
                  showCountry={showCountry}
                />
              )
            }
          }
        })()
      }
    </div>
  );
}

export default App;
