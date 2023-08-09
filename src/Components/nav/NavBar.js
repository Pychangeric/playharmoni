import React from 'react';
import './NavBar.css'; 
import Searchbare from '../Searche/Searchbare';
import MusicPlayer from '../others/MusicPlayer';


const NavBar = () => {
  return (
    <div className="navbar">
      <div className="search-container">
      <MusicPlayer />

        <Searchbare />
      </div>
    </div>
  );
};

export default NavBar;
