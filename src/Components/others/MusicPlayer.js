import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeDown,
  VolumeUp,
  ExpandLess,
} from '@mui/icons-material';
import {
  LinearProgress,
  Slider,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [musicListAnchor, setMusicListAnchor] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/musics')
      .then((response) => response.json())
      .then((fetchedSongs) => {
        setSongs(fetchedSongs);
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  useEffect(() => {
    if (songs[currentSongIndex]) {
      const sound = new Howl({
        src: [songs[currentSongIndex].src],
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => {
          setIsPlaying(false);
          setCurrentTime(0);
        },
        onload: () => setDuration(sound.duration()),
      });

      if (isPlaying) {
        sound.play();
      } else {
        sound.pause();
      }

      sound.on('play', () => {
        const seekInterval = setInterval(() => {
          setCurrentTime(sound.seek());
        }, 1000);

        sound.on('end', () => {
          clearInterval(seekInterval);
        });
      });

      return () => {
        sound.unload();
      };
    }
  }, [currentSongIndex, isPlaying, songs]);

  const togglePlayPause = () => {
    if (isPlaying) {
      Howler.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const progressPercentage = (currentTime / duration) * 100;

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    if (isPlaying) {
      togglePlayPause();
    }
  };

  const openMusicList = (event) => {
    setMusicListAnchor(event.currentTarget);
  };

  const closeMusicList = () => {
    setMusicListAnchor(null);
  };
  return (
    <div className="music-player">
      <h2>Music Player</h2>
      <div className="controls">
        <IconButton onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton>
          <SkipPrevious />
        </IconButton>
        <IconButton>
          <SkipNext />
        </IconButton>
      </div>
      <LinearProgress variant="determinate" value={progressPercentage} />
      <div className="volume-control">
        <VolumeDown />
        <Slider
          value={volume * 100}
          onChange={(event, newValue) => setVolume(newValue / 100)}
          aria-labelledby="continuous-slider"
        />
        <VolumeUp />
      </div>
      <IconButton className="music-list-button" onClick={openMusicList}>
        <ExpandLess />
      </IconButton>
      <Popover
        open={Boolean(musicListAnchor)}
        anchorEl={musicListAnchor}
        onClose={closeMusicList}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List className="song-list-popover">
          {songs.map((song, index) => (
            <ListItem key={index} button onClick={() => selectSong(index)}>
              <ListItemText primary={song.title} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};


export default MusicPlayer;
