import React from 'react';
import './NavBar.css'; 
import Search from '../search/Search';


const NavBar = () => {
  return (
    <div className="navbar">
      <Search />
    </div>
  );
};

export default NavBar;