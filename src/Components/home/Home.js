import React, { useState, useEffect } from 'react';
import Share from '../Share';
import './Home.css';
import Sidebar from '../sidebar/Sidebar';
import NavBar from '../nav/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Category from '../cartegory/Category';

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

  const groupedMusicData = musicData.reduce((acc, music) => {
    if (!acc[music.genre]) {
      acc[music.genre] = [];
    }
    acc[music.genre].push(music);
    return acc;
  }, {});

  // Define an array of background colors
  const cardBackgroundColors = [
    '#00CED1', // Bright Teal
    '#FF6F61', // Coral
    '#FFD700', // Lemon Yellow
    '#E0FFFF', // Light Cyan
    '#9370DB', // Medium Purple
    '#FFA500', // Orange
    '#2E77A3', // Light Blue
    '#4E9E5E', // Light Green
    '#8563A7', // Light Purple
    '#D18E9E', // Light Pink
    '#E89E53', // Light Orange
    
    // Add more colors as needed
  ];
  

  return (
    <div className='home'>
      <Category />
      <NavBar />
      <Sidebar />
      <h1>Music List</h1>
      {Object.entries(groupedMusicData).map(([genre, musicItems]) => (
        <div className='box-home'>
          {musicItems.map((music, index) => (
            <div
              key={music.id}
              className='box-cards'
              style={{
                backgroundColor: cardBackgroundColors[index % cardBackgroundColors.length],
                borderColor: cardBackgroundColors[index % cardBackgroundColors.length],
              }}
            >
              <img src={music.avatar} alt={music.title} />
              <h4>{music.title}</h4>
              <h5>{music.genre}</h5>
              <h6>{music.album}</h6>
              <a href={music.video} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faPlay} />
              </a>
              <br />
              <Share url={music.video} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
