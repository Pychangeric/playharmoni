import React, { useState, useEffect } from 'react';
import './Category.css'; 
import MusicPopup from '../popup/MusicPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Category = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [allMusic, setAllMusic] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    // Fetch all music from the backend
    fetch('http://localhost:3000/musics')
      .then((response) => response.json())
      .then((data) => {
        setAllMusic(data);
        // Extract unique genres from the music data
        const uniqueGenres = [...new Set(data.map((music) => music.genre))];
        setGenres(uniqueGenres);
      })
      .catch((error) => console.error('Error fetching music:', error));
  }, []);

  useEffect(() => {
    // Filter music based on the selected genre
    if (selectedGenre) {
      const filtered = allMusic.filter((music) => music.genre === selectedGenre);
      setFilteredMusic(filtered);
    }
  }, [selectedGenre, allMusic]);

  const handleCategoryClick = () => {
    setShowGenres(!showGenres);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setShowPopup(true); // Open the popup when a genre is clicked
  };

  const handleMusicPlay = (music) => {
    console.log(`Playing: ${music.title}`);
    // Implement the logic to play the selected music
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="category">
      <button className="category-button" onClick={handleCategoryClick}>
        Categories
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {showGenres && (
        <div className="genre-dropdown">
          {genres.map((genre) => (
            <button
              key={genre}
              className={selectedGenre === genre ? 'active' : ''}
              onClick={() => handleGenreClick(genre)} 
            >
              {genre}
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          ))}
        </div>
      )}

      {showPopup && selectedGenre && (
        <MusicPopup
          selectedGenre={selectedGenre}
          filteredMusic={filteredMusic}
          onClose={handlePopupClose}
          handleMusicPlay={handleMusicPlay}
        />
      )}
    </div>
  );
};

export default Category;
