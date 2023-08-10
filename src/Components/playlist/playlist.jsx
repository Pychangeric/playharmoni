import React, { useState, useEffect } from 'react';
import './playlist.css';

const Playlist = ({onPlaylistAdd}) => {
  const [visible, setVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [availableMusics, setAvailableMusics] = useState([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [addedSongs, setAddedSongs] = useState({});
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/playlists')
      .then(response => response.json())
      .then(data => setPlaylists(data));

    fetch('http://localhost:3000/musics')
      .then(response => response.json())
      .then(data => setAvailableMusics(data));

    const localStorageData = JSON.parse(localStorage.getItem('addedSongs') || '{}');
    setAddedSongs(localStorageData);
  }, []);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleAddMusicsToPlaylist = playlistId => {
    setCurrentPlaylistId(playlistId);
    setShowMusicPopup(true);
  };

  const handleAddMusicToPlaylist = async musicId => {

    if (currentPlaylistId) {
      try {
        const response = await fetch(`http://localhost:3000/playlists/${currentPlaylistId}/musics/${musicId}`, {
          method: 'POST',
        });

        if (response.ok) {
          setAddedSongs(prevAddedSongs => ({
            ...prevAddedSongs,
            [currentPlaylistId]: [...(prevAddedSongs[currentPlaylistId] || []), musicId],
          }));
          localStorage.setItem('addedSongs', JSON.stringify(addedSongs));
        } else {
        }
      } catch (error) {
      }
    }
  };

  const handleDeletePlaylist = async playlistId => {
    try {
      const response = await fetch(`http://localhost:3000/playlists/${playlistId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.id !== playlistId));
      } else {
      }
    } catch (error) {
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // formData.append('title', playlistTitle);
    // formData.append('description', playlistDescription);


    try {
      const response = await fetch('http://localhost:3000/playlists', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setPlaylistTitle('');
        setPlaylistDescription('');
        onPlaylistAdd(responseData);
        setPlaylists(prevPlaylists => [...prevPlaylists, responseData]);
      } else {
      }
    } catch (error) {
    }
  };

  const handlePlayMusic = playlistId => {
    setCurrentPlaylistId(playlistId);
    setCurrentSongIndex(0);
    setIsPlaying(true);

    const newAudio = new Audio(availableMusics.find(music => music.id === addedSongs[playlistId][0]).audio_url);
    newAudio.addEventListener('ended', handleNextSong);
    setAudioRef(newAudio);
    newAudio.play();
  };

  const handlePauseMusic = () => {
    if (audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex + 1 < addedSongs[currentPlaylistId].length) {
      setCurrentSongIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }

    if (audioRef) {
      audioRef.pause();
      const newAudio = new Audio(availableMusics.find(music => music.id === addedSongs[currentPlaylistId][currentSongIndex]).audio_url);
      newAudio.addEventListener('ended', handleNextSong);
      setAudioRef(newAudio);
      newAudio.play();
    }
  };

  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(prevIndex => prevIndex - 1);
    } else {
      setCurrentSongIndex(addedSongs[currentPlaylistId].length - 1);
    }

    if (audioRef) {
      audioRef.pause();
      const newAudio = new Audio(availableMusics.find(music => music.id === addedSongs[currentPlaylistId][currentSongIndex]).audio_url);
      newAudio.addEventListener('ended', handleNextSong);
      setAudioRef(newAudio);
      newAudio.play();
    }
  };

  return (
    <div className="container">
      <h2>Playlists</h2>
      <button className="btn" onClick={handleClick}>
        {visible ? '-' : '+'}
      </button>
      {visible && (
        <form className="playlist-form" onSubmit={handleSubmit} encType="multipart/form-data">
           <label>Title:</label>
        <input type="text" name="title" placeholder="Playlist name" value={playlistTitle} onChange={e => setPlaylistTitle(e.target.value)} />

          <label>Description:</label>
          <textarea name="description" placeholder="Optional description"></textarea>

          <button type="submit">Save</button>
        </form>
      )}

      <div className="playlist-list">
        <h3>Playlist List:</h3>
        {playlists.map(playlist => (
          <div className="playlist-item" key={playlist.id}>
            <div className="playlist-header">
              <h4>{playlist.title}</h4>
              <button className="delete-button" onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
            </div>
            <p className='parag'>Description: <span>{playlist.description}</span></p>
            <button onClick={() => handleAddMusicsToPlaylist(playlist.id)}>Add Musics</button>
            <button onClick={() => handlePlayMusic(playlist.id)}>Play</button>
            <button className='pause' onClick={handlePauseMusic}>Pause</button>
            {addedSongs[playlist.id] && (
              <div>
                <p>Added Songs:</p>
                {addedSongs[playlist.id].map((musicId, index) => (
                  <div key={musicId}>
                    <p>{availableMusics.find(music => music.id === musicId)?.title}</p>
                    {isPlaying && index === currentSongIndex && (
                      <p>Now Playing</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {currentPlaylistId && showMusicPopup && (
        <div className="music-popup">
          <div className="music-list">
            {availableMusics.map(music => (
              <div className="music-item" key={music.id}>
                <p>{music.title}</p>
                <button className="add-button" onClick={() => handleAddMusicToPlaylist(music.id)}>
                  <span className="plus-icon">+</span>
                </button>
              </div>
            ))}
          </div>
          <button className="close-popup" onClick={() => setShowMusicPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Playlist;
