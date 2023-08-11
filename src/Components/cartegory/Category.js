import React, { useState, useEffect } from 'react';
import './Category.css'; 
import MusicPopup from '../popup/MusicPopup';

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
    setShowGenres(false);
  };
  const handleMusicPlay = (music) => {
    // Implement the logic to add the selected music to the audio player and start playing
    console.log(`Playing: ${music.title}`);
    // Here, you can update the state of your audio player component to start playing the selected music
  };

  const handleMusicClick = (genre) => {
    setSelectedGenre(genre);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="category">
      <button className="category-button" onClick={handleCategoryClick}>
        Categories
      </button>
      {showGenres && (
        <div className="genre-dropdown">
          {genres.map((genre) => (
            <button
              key={genre}
              className={selectedGenre === genre ? 'active' : ''}
              onClick={() => handleMusicClick(genre)} // Use handleMusicClick instead of handleGenreClick
            >
              {genre}
            </button>
          ))}
        </div>
      )}

{showPopup && selectedGenre && (
      <MusicPopup
        selectedGenre={selectedGenre}
        filteredMusic={filteredMusic}
        onClose={handlePopupClose}
        handleMusicPlay={handleMusicPlay} // Pass the handleMusicPlay function
      />
      )}
    </div>
  );
};

export default Category;