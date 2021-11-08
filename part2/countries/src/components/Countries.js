import React, { useEffect, useState } from 'react';
import Country from './Country';
import CountryList from './CountryList';

const Countries = ({ countries, searchWord }) => {
  const [showCountry, setShowCountry] = useState('');

  useEffect(() => {
    console.log(countries.length);
    if (countries.length === 1) {
      setShowCountry(countries[0]);
    } else {
      setShowCountry('');
    }
  }, [countries, searchWord])

  const handleClick = event => {
    const chosenCountry = countries.filter(country => country.name.common === event.target.value);
    setShowCountry(chosenCountry[0]);
  }

  if (showCountry !== '') {
    return <Country country={showCountry} />
  } else if (countries.length <= 10) {
    return <CountryList countries={countries} handleClick={handleClick} />
  }
  return <p>Too many matches, specify another filter</p>
}

export default Countries;