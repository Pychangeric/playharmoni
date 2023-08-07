import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [filteredMusicList, setFilteredMusicList] = useState([]);

  useEffect(() => {
    // Fetch music data from the backend API
    fetch('http://localhost:3000/musics')
      .then((response) => response.json())
      .then((data) => {
        setMusicList(data);
        setFilteredMusicList(data); // Initialize filtered list with all songs
      })
      .catch((error) => console.error('Error fetching music data:', error));
  }, []);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setQuery(userInput);

    // Filter the music list based on the search query
    const filteredSongs = musicList.filter((music) =>
      music.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredMusicList(filteredSongs);
  };

  const fetchMusicById = (id) => {
    // Fetch music data by ID from the backend API
    fetch(`http://localhost:3000/musics/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Do something with the fetched music data by ID
        console.log('Fetched music by ID:', data);
      })
      .catch((error) => console.error('Error fetching music by ID:', error));
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for music..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {filteredMusicList.map((music) => (
          <li key={music.id} onClick={() => fetchMusicById(music.id)}>
            {music.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
