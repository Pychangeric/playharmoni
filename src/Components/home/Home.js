import React, { useState, useEffect } from 'react';
import Share from '../Share';
import './Home.css';
import Sidebar from '../sidebar/Sidebar';
import NavBar from '../nav/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
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
        <div key={genre} className='box-home'>
          <h1>{genre}</h1>
            {musicItems.map((music) => (
              <div key={music.id} className='box-cards'>
                  <img src={music.avatar} alt={music.title} />
                  <h4> {music.title}</h4>
                <h5>{music.genre}</h5>
                  <h6> {music.album}</h6>
                  <a href={music.video} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPlay} />
                  </a>
                  <Share url={music.video} />
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default Home;
