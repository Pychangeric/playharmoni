import React, { useState, useRef, useEffect } from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioEl.current.addEventListener('loadedmetadata', () => {
      const duration = Math.floor(audioEl.current.duration);
      setAudioDuration(duration);
    });

    return () => {
      audioEl.current.removeEventListener('loadedmetadata', () => {
        const duration = Math.floor(audioEl.current.duration);
        setAudioDuration(duration);
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(audioEl.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleAudioEnded = () => {
      SkipSong(true); // Play the next song when the current song ends
    };

    audioEl.current.addEventListener('ended', handleAudioEnded);

    return () => {
      audioEl.current.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioEl]);

  const SkipSong = (forwards = true) => {
    setIsPlaying(false); // Pause the player first

    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  const handleVolume = (newVolume) => {
    setVolume(newVolume);
    audioEl.current.volume = newVolume;
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    audioEl.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="c-player">
      <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
      <h4>Playing now</h4>
      <PlayerDetails song={props.songs[props.currentSongIndex]} />
      <input
        type="range"
        min="0"
        max={audioDuration}
        step="1"
        value={currentTime}
        onChange={handleSeek}
      />
      <p>Current Time: {formatTime(currentTime)}</p>

      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
        handleVolume={handleVolume}
        volume={volume}
      />
      <p>Next up: <span>{props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</span></p>
    </div>
  );
}

export default Player;
