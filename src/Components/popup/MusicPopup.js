import React from 'react';
import './MusicPopup.css'; // Add your CSS styles here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const cardBackgroundColors = [
  '#00CED1', // Bright Teal
  '#FF6F61', // Coral
  '#FFD700', // Lemon Yellow
  '#E0FFFF', // Light Cyan
  '#9370DB', // Medium Purple
  '#FFA500', // Orange
  '#2E77A3', // Light Blue
  '#4E9E5E', // Light Green
  '#8563A7', // Light Purple
  '#D18E9E', // Light Pink
  '#E89E53', // Light Orange
  // Add more colors as needed
];

const MusicPopup = ({ selectedGenre, filteredMusic, onClose, handleMusicPlay }) => {
  return (
    <div className="music-popup-container">
      <div className="music-popup">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3>Genre: {selectedGenre}</h3>
        <div className="music-cards">
          {filteredMusic.map((music, index) => (
            <div
              key={music.id}
              className="music-card"
              style={{ backgroundColor: cardBackgroundColors[index % cardBackgroundColors.length] }}
            >
              <img src={music.avatar} alt={`Album: ${music.album}`} />
              <h4>{music.title}</h4>
              <p>Album: {music.album}</p>
              <button onClick={() => handleMusicPlay(music)}>
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPopup;
