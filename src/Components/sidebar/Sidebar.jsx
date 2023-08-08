import React, { useState } from 'react';
import Playlist from "../playlist/playlist";
import './Sidebar.css'; 
import Audio from '../Audio/Audio';
import Search from '../search/Search';
import Logo from '../Logo/Logo';

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
      <Logo />
      <Search />
      <button onClick={handleAudioButtonClick}>Toggle Audio</button>
      <button onClick={handlePlaylistButtonClick}>Toggle Playlist</button>
      {showPlaylist && <Playlist />} 
      {showAudio && (
        <div className="audio-grid-container">
          <Audio />
        </div>
      )} 
    </div>
  );
};

export default Sidebar;
