import React, { useState } from 'react';
//import SearchBar from './components/SearchBar';
import SearchBar from './SearchBar';
//import Recommendations from './components/Recommendations';
import Recommendations from './Recommendations';
import Logo from './Logo';
//import Logo from './components/Logo';

const App = () => {
  // Sample search results
  const [searchResults, setSearchResults] = useState([
    
  ]);

  return (
    <div>
      <Logo />
      <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      {/* Display search results */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {result.title}
          </li>
        ))}
      </ul>
      <Recommendations userId="user123" />
    </div>
  );
};

export default App;
