import React, { useState } from 'react';
import Searchbar from './Searchbar';
import SearchResultList from './SearchResultList'; 

function Searchbare() {
  const [searchResults, setSearchResults] = useState([]);
  

  return (
    <div>
      <div>
        <Searchbar setSearchResults={setSearchResults}  />
        <SearchResultList searchResults={searchResults} />
    
      </div>
    </div>
  );
}

export default Searchbare;