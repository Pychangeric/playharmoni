import React, { useState, useEffect } from 'react';
import './Recommendation.css';

const Recommendation = () => {
  const [musicList, setMusicList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
    // Start the timer to change recommendations every 2 seconds
    const timer = setInterval(changeRecommendation, 2000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [musicList]);

  const changeRecommendation = () => {
    if (musicList.length > 0) {
      const randomIndex = Math.floor(Math.random() * musicList.length);
      setCurrentSlideIndex(randomIndex);
    }
  };

  const currentMusic = musicList[currentSlideIndex];

  return (
    <div className="recommendation-container">
      {currentMusic && (
        <div className="music-item">
          <div className="music-avatar">
            <img src={currentMusic.avatar} alt={currentMusic.title} />
          </div>
          <span className="music-title">{currentMusic.title}</span>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
