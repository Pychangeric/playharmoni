// MusicPopup.js

import React from 'react';
import './MusicPopup.css'; // Add your CSS styles here

const MusicPopup = ({ selectedGenre, filteredMusic, onClose, handleMusicPlay }) => {
    return (
    <div className="music-popup-container">
      <div className="music-popup">
        <h3>Genre: {selectedGenre}</h3>
        <div className="music-cards">
          {filteredMusic.map((music) => (
            <div key={music.id} className="music-card">
              <img src={music.avatar} alt={`Album: ${music.album}`} />
              <h4>{music.title}</h4>
              <p>Album: {music.album}</p>
              <button onClick={() => handleMusicPlay(music)}>
                Play
              </button>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MusicPopup;
