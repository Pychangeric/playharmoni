import React from 'react';
import './NavBar.css'; 
import Searchbare from '../Searche/Searchbare';


const NavBar = () => {
  return (
    <div className="navbar">
      <div className="search-container">
        <Searchbare />
      </div>
    </div>
  );
};

export default NavBar;
