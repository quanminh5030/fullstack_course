import React from 'react';

const CountriesList = ({ countries, showCountry }) => {
  return <div>
    {countries.map(country =>
      <p key={country.name.official}>
        {country.name.common} {' '}
        <button onClick={() => showCountry(country.name.common)}>show</button>
      </p>
    )}
  </div>
};

export default CountriesList;
