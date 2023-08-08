import React, { useState, useEffect } from 'react';
import './Recommendation.css';

const Recommendation = () => {
  const [query, setQuery] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [filteredMusicList, setFilteredMusicList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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

  useEffect(() => {
    // Generate recommendations based on the search query
    const recommendedSongs = musicList.filter((music) =>
      music.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMusicList(recommendedSongs);

    // Generate random recommendations from the entire music list (excluding the search results)
    const nonRecommendedSongs = musicList.filter(
      (music) => !music.title.toLowerCase().includes(query.toLowerCase())
    );
    const randomRecommendations = getRandomElements(nonRecommendedSongs, 3); // Change '3' to the number of random recommendations you want to show
    setRecommendations(randomRecommendations);
  }, [query, musicList]);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setQuery(userInput);
  };

  // Helper function to get random elements from an array
  const getRandomElements = (array, count) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  return (
    <div className="recommendation-container">
      <h3>Recommendations:</h3>
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
          <li key={music.id}>{music.title}</li>
        ))}
      </ul>
      {query && recommendations.length > 0 && (
        <div>
          <h4>Random Recommendations:</h4>
          <ul>
            {recommendations.map((music) => (
              <li key={music.id}>{music.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
