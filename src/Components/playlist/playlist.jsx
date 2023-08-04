import React, { useState, useEffect } from 'react';
import './playlist.css';

const Playlist = () => {
    const [visible, setVisible] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [availableMusics, setAvailableMusics] = useState([]);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [addedSongs, setAddedSongs] = useState({});

    useEffect(() => {
        // Fetch playlists data from your backend API
        fetch('http://localhost:3000/playlists')
            .then(response => response.json())
            .then(data => setPlaylists(data));
    }, []);

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:3000/playlists', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const responseData = await response.json();
                setPlaylists(prevPlaylists => [...prevPlaylists, responseData]);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleAddMusicsToPlaylist = async (playlistId) => {
        setCurrentPlaylistId(playlistId);

        try {
            const response = await fetch(`http://localhost:3000/playlists/${playlistId}/added-songs`);
            if (response.ok) {
                const addedSongsData = await response.json();
                setAddedSongs((prevAddedSongs) => ({
                    ...prevAddedSongs,
                    [playlistId]: addedSongsData,
                }));
                setAvailableMusics([]); // Clear the available musics when adding to a playlist
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleAddMusicToPlaylist = async (musicId) => {
        if (currentPlaylistId) {
            try {
                const response = await fetch(`http://localhost:3000/playlists/${currentPlaylistId}/musics/${musicId}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    // Update the addedSongs state to reflect the added music
                    setAddedSongs((prevAddedSongs) => ({
                        ...prevAddedSongs,
                        [currentPlaylistId]: [...(prevAddedSongs[currentPlaylistId] || []), musicId],
                    }));

                    // Fetch the updated list of added songs for the current playlist
                    await handleAddMusicsToPlaylist(currentPlaylistId);

                    // Update the playlists similarly to your existing code
                    // ...
                } else {
                    // Handle error
                }
            } catch (error) {
                // Handle error
            }
        }
    };

    return (
        <div className="container">
            <h2>New Playlist</h2>
            <button className="btn" onClick={handleClick}>+</button>
            {visible && (
                <form className="playlist-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>Title:</label>
                    <input type="text" name="title" placeholder='playlist name' />

                    <label>Description:</label>
                    <textarea name="description" placeholder='optional description'></textarea>

                    <button type="submit">Save</button>
                </form>
            )}

            <div className="playlist-list">
                <h3>Playlist List:</h3>

                {playlists.map(playlist => (
                    <div className="playlist-item" key={playlist.id}>
                        <h4>{playlist.title}</h4>
                        <p>Description: {playlist.description}</p>
                        <button onClick={() => handleAddMusicsToPlaylist(playlist.id)}>Add Musics</button>
                        {addedSongs[playlist.id] && (
                            <div>
                                <p>Added Songs:</p>
                                {addedSongs[playlist.id].map(musicId => (
                                    <div key={musicId}>
                                        <p>{availableMusics.find(music => music.id === musicId)?.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {currentPlaylistId && (
                <div className="music-selection-modal">
                    <h3>Select Musics to Add:</h3>
                    {availableMusics.map(music => (
                        <div className="music-item" key={music.id} >
                            <p>{music.title}</p>
                            <button onClick={() => handleAddMusicToPlaylist(music.id)}>Add</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Playlist;
