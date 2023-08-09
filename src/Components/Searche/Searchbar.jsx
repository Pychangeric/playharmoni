// Searchbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Searche.css'
const Searchbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const fetchData = (value) => {
    fetch('http://localhost:3000/musics')
      .then((res) => res.json())
      .then((data) => {
        const results = data.filter((details) => {
          return details && details.title && details.title.toLowerCase().includes(value);
        });
        setSearchResults(results);
      });
  };

  const handleChange = (value) => {
    fetchData(value);
    setQuery(value);
  };

  return (
    <div>
      <div className='c--search'>
     
        <input
          placeholder="search music title..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
           <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Searchbar;
