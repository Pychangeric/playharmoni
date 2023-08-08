import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Slider from '@mui/material/Slider';

const AudioPlayer = ({ musicData, currentIndex, onPrevious, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    // Use the 'currentIndex' to determine the current music
    const currentMusic = musicData[currentIndex];

    // Set up the audio source
    audioRef.current.src = currentMusic.audio_url;
    audioRef.current.load();

    // Handle the case where the audio is played outside the AudioPlayer component
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [musicData, currentIndex, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} preload="auto" />

      <div className="controls">
        <SkipPreviousIcon onClick={onPrevious} />
        {isPlaying ? (
          <PauseCircleOutlineIcon onClick={handlePlayPause} />
        ) : (
          <PlayCircleOutlineIcon onClick={handlePlayPause} />
        )}
        <SkipNextIcon onClick={onNext} />
      </div>

      <div className="volume-controls">
        <VolumeDownIcon />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          aria-labelledby="continuous-slider"
        />
        <VolumeUpIcon />
      </div>
    </div>
  );
};

export default AudioPlayer;
