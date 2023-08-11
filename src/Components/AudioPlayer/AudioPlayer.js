//import React, { useState, useEffect } from "react";
//import ReactAudioPlayer from "react-audioplayer";

//const AudioPlayer = () => {
  //const [songs, setSongs] = useState([]);
  //const [currentSongIndex, setCurrentSongIndex] = useState(0);

  //useEffect(() => {
    //fetchSongsFromAPI();
  //}, []);
//
 // const fetchSongsFromAPI = async () => {
   // try {
     // const response = await fetch("http://127.0.0.1:3000/musics");
      //const data = await response.json();
      //setSongs(data);
    //} catch (error) {
      //console.error("Error fetching songs:", error);
    //}
  //};

  //const handleSongChange = (newIndex) => {
    //setCurrentSongIndex(newIndex);
  //};

  //return (
    //<div className="audio-player">
      //<ReactAudioPlayer
        //src={songs[currentSongIndex]?.audio_url || ""}
 //       autoPlay={true}
   //     controls
     //   onEnded={() => handleSongChange((currentSongIndex + 1) % songs.length)}
     // />
      //<div className="song-info">
       // <img src={songs[currentSongIndex]?.cover_url} alt="Song Cover" />
        //<div className="song-details">
         // <h2>{songs[currentSongIndex]?.title}</h2>
          //<p>{songs[currentSongIndex]?.genre}</p>
        //</div>
      //</div>
    //</div>
 // );
//};

//export default AudioPlayer;
