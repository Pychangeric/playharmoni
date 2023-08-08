import React, { useState } from 'react';
import Playlist from '../playlist/playlist';
import Category from '../cartegory/Category';
import './Sidebar.css';
import Audio from '../Audio/Audio';

import Logo from '../Logo/Logo';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Recommendation from '../Recomendation/Recommendation';
import Profile from '../profile/Profile';

const Sidebar = () => {
  const [showAudio, setShowAudio] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleAudioButtonClick = () => {
    setShowAudio((prevShowAudio) => !prevShowAudio);
  };

  const handlePlaylistButtonClick = () => {
    setShowPlaylist((prevShowPlaylist) => !prevShowPlaylist);
  };

  return (
    <div className="sidebar">
      <Category />
      <Logo />
      <ul className="sidebar-buttons">
        <div className="fade-box">
          <HeadphonesIcon />
          <li onClick={handleAudioButtonClick}>Audio</li>
        </div>
        <h1>Playlist</h1>
        <div className="fade-box">
          <PlaylistAddIcon />
          <li onClick={handlePlaylistButtonClick}>Playlist</li>
        </div>
      </ul>
      {showPlaylist && <Playlist />}
      {showAudio && (
        <div className="audio-grid-container">
          <Audio />
          <Recommendation />
          <Profile />
        </div>
        
      )}
    </div>
  );
};

export default Sidebar;
