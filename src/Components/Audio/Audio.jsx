import React, { useState } from 'react';
import Player from '../Player';
import { Close, VisibilityOff } from '@mui/icons-material';
import './Audio.css';

function Audio({ onOpenHome }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showSongList, setShowSongList] = useState(false);

  const [songs] = useState([
    {
        title: "Congragulations",
        artist: "Ada ehi",
        img_src: "./images/song-1.jpeg",
        src: "./music/Ada Ehi - Congratulations ft Buchi  The Official Video.mp3"
      },
      {
        title: "Come and Go",
        artist: "Arrdree",
        img_src: "./images/song-4.jpeg",
        src: "./music/ArrDee - Come & Go (Official Music Video).mp3"
      },
      {
        title: "Under the influence",
        artist: "Chris Brown",
        img_src: "./images/song-5.jpeg",
        src: "./music/Ada Ehi - Congratulations ft Buchi  The Official Video.mp3"
      },
      {
        title: "Hush Little Baby",
        artist: "Fenekot",
        img_src: "./images/song-6.jpeg",
        src: "./music/fenekot - Hush little baby don't you cry (Mockingbird) (Lyrics).mp3"
      },
      {
        title: "Lucid dreams",
        artist: "Juice wrld",
        img_src: "./images/song-2.jpeg",
        src: "./music/Juice WRLD - Lucid Dreams (Directed by Cole Bennett).mp3"
      },
      {
        title: "Stay high",
        artist: "Juice World",
        img_src: "./images/song-2.jpeg",
        src: "./music/Juice WRLD - Stay High (Official Audio).mp3"
      },
      {
        title: "This world",
        artist: "Juice world",
        img_src: "./images/song-2.jpeg",
        src: "./music/Juice WRLD ft. Marshmello - Come & Go (Official Audio).mp3"
      },    {
        title: "This world",
        artist: "Juice world",
        img_src: "./images/song-2.jpeg",
        src: "./music/Juice WRLD ft. Marshmello - Come & Go (Official Audio).mp3"
      },
      {
        title: "Monster",
        artist: "Gabry",
        img_src: "./images/song-6.jpeg",
        src: "./music/LUM!X, Gabry Ponte - Monster (Official Music Video).mp3"
      },    {
        title: "Kulosa",
        artist: "Oxlade",
        img_src: "./images/song-8.jpeg",
        src: "./music/Oxlade - KU LO SA  A COLORS SHOW.mp3"
      },    {
        title: "Charm",
        artist: "Rema",
        img_src: "./images/song-7.jpeg",
        src: "./music/Rema - Charm (Official Music Video).mp3"
      },    {
        title: "You have done me well",
        artist: "Solomon Lange",
        img_src: "./images/song-3.jpeg",
        src: "./music/SOLOMON LANGE_ YOU HAVE DONE ME WELL (SWAHILI) OFFICIAL VIDEO..mp3"
      },    {
        title: "Blessings",
        artist: "Victor Thompson x Ehis D Greatest",
        img_src: "./images/song-9.jpeg",
        src: "./music/This Year ( Blessing ) - Victor Thompson x Ehis D Greatest (Official Video).mp3"
      }
  ]); 
  const handlePlayButtonClick = (index) => {
    setCurrentSongIndex(index);
    setIsVisible(true);
  };

  const handleCloseButtonClick = () => {
    setIsVisible(false);
    setCurrentSongIndex(0);
    setShowSongList(false);
    onOpenHome();
  };

  const handleShowSongList = () => {
    setShowSongList(!showSongList);
  }
  return (
    <div className="audio">
      {isVisible && (
        <div className="popup">
          <button className="close-button" onClick={handleCloseButtonClick}>
            <Close />
          </button>
          <Player
            songs={songs}
            currentSongIndex={currentSongIndex}
          />
        </div>
      )}
      <div className="hide-button">
        <button onClick={handleShowSongList}>
          {isVisible ? <VisibilityOff /> : 'Show Audio'}
        </button>
      </div>
      {showSongList && (
        <div className="song-list">
          <h5>Audios available</h5>
          {songs.map((song, index) => (
            <div key={index}>
              <img src={song.img_src} alt={song.title} />
              <div>
                <h6>{song.title}</h6>
                <p>{song.artist}</p>
                <button type="button" onClick={() => handlePlayButtonClick(index)}>
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Audio;

