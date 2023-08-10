import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSliders, faSearch, faAngleDown, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Links.css';
import Category from '../cartegory/Category';

function Links() {
  return (
    <div className='links--a'>
      <nav>
        <ul>
          <li><Link to='/home'><FontAwesomeIcon icon={faHome} />Home</Link></li>
          <li><Link to='/playlist'><FontAwesomeIcon icon={faSliders} />Playlist</Link></li>
    
          <li><Link to='/category'><Category /></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Links;
