import React from "react";

const CountryList = ({ countries, handleClick }) => {
  
  return (
    <ul className="no-list-style">
      {countries.map(country =>
        <li key={country.cca2}>
          {country.name.common}
          <button value={country.name.common} onClick={handleClick}>show</button>
        </li>
      )}
    </ul>
  ); 
}

export default CountryList;