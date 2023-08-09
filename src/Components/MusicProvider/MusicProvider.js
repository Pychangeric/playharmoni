// MusicProvider.js
import React, { useState, useEffect } from 'react';

const MusicProvider = ({ children }) => {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    // Fetch music data from the backend API
    fetch('http://localhost:3000/musics')
      .then((response) => response.json())
      .then((data) => {
        setMusicData(data);
      })
      .catch((error) => console.error('Error fetching music data:', error));
  }, []);

  return (
    <div>
      {children({
        musicData,
      })}
    </div>
  );
};

export default MusicProvider;
