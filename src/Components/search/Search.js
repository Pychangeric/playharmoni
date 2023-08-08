import React, { useState } from 'react';
import "./Search.css"

const Search = () => {
  const [title, setTitle] = useState('');
  const [foundMusic, setFoundMusic] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/musics`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const musicList = await response.json();
      if (musicList.length > 0) {
        setFoundMusic(musicList[0]);
      } else {
        setFoundMusic(null);
      }
    } catch (error) {
      console.error('Error fetching music data:', error);
      setFoundMusic(null);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input">
          <input
            type="text"
            placeholder="Enter Music Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {foundMusic && (
        <div className="found-music">
          <h3>Found Music</h3>
          <p>ID: {foundMusic.id}</p>
          <p>Title: {foundMusic.title}</p>
          <p>Genre: {foundMusic.genre}</p>
          <p>Album: {foundMusic.album}</p>
          <p>Video: <a href={foundMusic.video} target="_blank" rel="noopener noreferrer">Play Video</a></p>
        </div>
      )}
    </div>
  );
};

export default Search;
