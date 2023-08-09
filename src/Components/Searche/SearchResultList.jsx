import React, { useState } from 'react';
import SearchResult from './SearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './Searche.css';

function SearchResultList({ searchResults }) {
  const [selectedMusic, setSelectedMusic] = useState(null);

  const handleMusicClick = (music) => {
    setSelectedMusic(music);
  };

  const handleClosePopup = () => {
    setSelectedMusic(null);
  };

  return (
    <div>
      <div>
        {searchResults.map((result) => (
          <SearchResult
            key={result.id}
            result={result}
            onClick={() => handleMusicClick(result)}
          />
        ))}
      </div>
      {selectedMusic && (
        <div className="popup-container">
          <div className="popup-content">
            <button className="popup-close" onClick={handleClosePopup}>
              Close
            </button>
            <h2>{selectedMusic.title}</h2>
            <p>{selectedMusic.genre}</p>
            <img src={selectedMusic.avatar} alt='' />
            <a href={selectedMusic.video} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faPlay} />
              </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResultList;
