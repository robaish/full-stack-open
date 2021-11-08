import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    console.log('%c effect ➡️', 'color: orange;');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('%c promise fulfilled', 'color: green;');
        console.log('got', response.data.length, 'countries');
        setCountries(response.data);
      })
  }, []);

  const handleChange = (event) => {
    setSearchWord(event.target.value);
  }

  const filteredByName = 
    searchWord !== '' 
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchWord.toLowerCase()))
    : [];

  return (
    <div>
      <div>
        find countries
        <input type="text" value={searchWord} onChange={handleChange} />
        <Countries searchWord={searchWord} countries={filteredByName} />
      </div>
    </div>
  );
}

export default App;
