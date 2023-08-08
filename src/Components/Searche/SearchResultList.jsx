import React, { useState } from 'react';
import './Searche.css';
import SearchResult from './SearchResult';

const SearchResultList = ({ searchResults }) => {
    const [openBox, setOpenBox] = useState(true); // Start with the box open

    const handleBox = (value) => {
        setOpenBox(value);
    };

    return (
        <div>
            {openBox && (
                <div className='d--search'>
                    <button onClick={() => handleBox(false)}>X</button>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, id) => (
                            <SearchResult key={id} result={result} id={id} />
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultList;
