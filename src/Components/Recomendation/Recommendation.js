import React, { useState, useEffect } from 'react';
import './Recommendation.css';

const Recommendation = () => {
  const [musicList, setMusicList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch music data from the backend API
    fetch('http://localhost:3000/musics')
      .then((response) => response.json())
      .then((data) => {
        setMusicList(data);
      })
      .catch((error) => console.error('Error fetching music data:', error));
  }, []);

  useEffect(() => {
    // Generate random recommendations from the entire music list
    const randomRecommendations = getRandomElements(musicList, 5); // Change '5' to the number of random recommendations you want to show
    setRecommendations(randomRecommendations);
  }, [musicList]);

  // Helper function to get random elements from an array
  const getRandomElements = (array, count) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  return (
    <div className="recommendation-container">
      <ul className="music-list">
        {recommendations.map((music) => (
          <li key={music.id} className="music-item">
            <div className="music-avatar">
              <img src={music.avatarUrl} alt={music.title} />
            </div>
            <span className="music-title">{music.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
