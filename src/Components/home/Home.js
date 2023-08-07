import React, { useState, useEffect } from 'react';
import Share from '../Share';
import './Home.css';
import NavBar from '../nav/NavBar';
import Sidebar from '../sidebar/Sidebar';

const Home = () => {
  const [musicData, setMusicData] = useState([]);

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

  useEffect(() => {
    fetchMusicData();
  }, []);

  // Group musicData by genre
  const groupedMusicData = musicData.reduce((acc, music) => {
    if (!acc[music.genre]) {
      acc[music.genre] = [];
    }
    acc[music.genre].push(music);
    return acc;
  }, {});

  return (
    <>
      <NavBar />
      <Sidebar />
      <h1>Music List</h1>
      {Object.entries(groupedMusicData).map(([genre, musicItems]) => (
        <div key={genre}>
          <h1>{genre}</h1>
          <ul>
            {musicItems.map((music) => (
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
                  <Share url={music.video} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Home;
