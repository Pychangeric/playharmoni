import React, { useState } from 'react';
import Playlist from '../playlist/playlist';
import Category from '../cartegory/Category';
import './Sidebar.css';
import Audio from '../Audio/Audio';
import Logo from '../Logo/Logo';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Recommendation from '../Recomendation/Recommendation';

const Sidebar = () => {
  const [showAudio, setShowAudio] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleAudioButtonClick = () => {
    setShowAudio((prevShowAudio) => !prevShowAudio);
    setShowPlaylist(false); // Close playlist when audio is clicked
  };

  const handlePlaylistButtonClick = () => {
    setShowPlaylist((prevShowPlaylist) => !prevShowPlaylist);
    setShowAudio(false); // Close audio when playlist is clicked
  };

  return (
    <div className="sidebar">
      <Logo /> 
      <div className="fade-box">
        <HeadphonesIcon />
        <button className="sidebar-button" onClick={handleAudioButtonClick}>
          Audio
        </button>
      </div>
      {showAudio && <Audio />}
      <div className="fade-box">
        <PlaylistAddIcon />
        <button className="sidebar-button" onClick={handlePlaylistButtonClick}>
          Playlist
        </button>
      </div>
      {showPlaylist && <Playlist />}
      <Category />
      <Recommendation />
    </div>
  );
};

export default Sidebar;
