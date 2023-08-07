import React, { useState, useEffect } from 'react';
import Share from '../Share';

import './Home.css'


const Home = () => {
  // State to hold the music data fetched from the backend
  const [musicData, setMusicData] = useState([]);

  // Function to fetch music data from the backend
  const fetchMusicData = async () => {
    try {
      const response = await fetch('http://localhost:3000/musics');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMusicData(data);
    } catch (error) {
      console.error('Error fetching music data:', error);
    }
  };

  // Fetch music data when the component mounts
  useEffect(() => {
    fetchMusicData();
  }, []);

  return (
    <>
      <h1>Music List</h1>
      <ul>
        {musicData.map((music) => (
          <li key={music.id}>
            <div>
              <img src={music.avatar} alt={music.title} />
            </div>
            <div>
              <strong>Title:</strong> {music.title}
            </div>
            <div>
              <strong>Genre:</strong> {music.genre}
            </div>
            <div>
              <strong>Album:</strong> {music.album}
            </div>
            <div>
              <strong>Video:</strong>
              <a href={music.video} target="_blank" rel="noopener noreferrer">
                Play Video
              </a>
            </div>
            <div>
              <Share url= {music.video}/>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
