import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function PlayerControls(props) {
  return (
    <div className='c-player--controls'>
      <button className="skip-btn">
        <FontAwesomeIcon icon={faBackward} onClick={() => props.SkipSong(false)} />
      </button>
      <button className="play-btn" onClick={() => props.setIsPlaying(!props.isPlaying)}>
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </button>
      <button className="skip-btn">
        <FontAwesomeIcon icon={faForward} onClick={() => props.SkipSong()} />
      </button>
      <div className="volume">
        <FontAwesomeIcon icon={faVolumeHigh} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={props.volume}
          onChange={(e) => props.handleVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default PlayerControls;
