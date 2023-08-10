import React from 'react';
import './Searche.css';

const SearchResult = ({ result, onClick }) => {
  return (
    
    <div className="d--search" onClick={onClick}>
      <p>{result.title}</p>
    </div>
  );
};

export default SearchResult;
