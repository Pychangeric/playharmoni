import React from 'react';
import './NavBar.css'; 
import Search from '../search/Search';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="search-container">
        <Search />
      </div>
    </div>
  );
};

export default NavBar;
