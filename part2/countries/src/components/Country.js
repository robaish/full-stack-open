import React from "react";
import Weather from "./Weather";

const Country = function ({ country }) {
  
  console.log(country);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p><span>capital </span>{country.capital}</p>
      <p><span>population </span>{country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="" />
      <Weather country={country} />
    </>
  );
}

export default Country;