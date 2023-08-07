import React, { useState, useRef } from 'react';
import ffmpeg from 'ffmpeg.js';

const VideoToAudioConverter = ({ videoUrl }) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const convertToAudio = async () => {
    const ffmpegInstance = createFFmpeg({
      log: true,
    });

    await ffmpegInstance.load();

    const inputPath = 'input.mp4'; 
    const outputPath = 'output.mp3'; 
    ffmpegInstance.FS('writeFile', inputPath, await fetchFile(videoUrl));
    await ffmpegInstance.run('-i', inputPath, '-q:a', '0', '-map', 'a', outputPath);

    const audioData = ffmpegInstance.FS('readFile', outputPath);
    const audioBlob = new Blob([audioData.buffer], { type: 'audio/mpeg' });

    setAudioBlob(audioBlob);

    ffmpegInstance.FS('unlink', inputPath);
    ffmpegInstance.FS('unlink', outputPath);
  };

  const fetchFile = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={convertToAudio}>Convert to Audio</button>
      {audioBlob && (
        <div>
          <audio ref={audioRef} controls src={URL.createObjectURL(audioBlob)} />
          <button onClick={handlePlayAudio}>Play Audio</button>
        </div>
      )}
    </div>
  );
};

export default VideoToAudioConverter;
