// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ playlists }) => {
  return (
    <div className="sidebar">
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link>
          </li>
        ))}
        {/* Add more navigation links here */}
      </ul>
    </div>
  );
};

export default Sidebar;
