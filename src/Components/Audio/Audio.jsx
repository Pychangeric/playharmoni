import React from 'react';

class AudioPlayer extends React.Component {
  state = {
    playing: false,
    currentTime: 0,
    duration: 0
  }

  audioRef = React.createRef()

  handlePlay = () => {
    this.audioRef.current.play()
    this.setState({ playing: true })
  }

  handlePause = () => {
    this.audioRef.current.pause()
    this.setState({ playing: false })
  }

  handleTimeUpdate = () => {
    this.setState({
      currentTime: this.audioRef.current.currentTime,
      duration: this.audioRef.current.duration
    })
  }

  render() {
    const { playing, currentTime, duration } = this.state
    const { src } = this.props

    return (
      <div>
        <audio
          ref={this.audioRef}
          src={src}
          onTimeUpdate={this.handleTimeUpdate}
        />
        <button onClick={playing ? this.handlePause : this.handlePlay}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <p>{currentTime} / {duration}</p>
      </div>
    )
  }
}

// Usage example
export default function App() {
  return (
    <div>
      <h1>My Audio Player</h1>
      <AudioPlayer src="Ada Ehi - Congratulations ft Buchi  The Official Video.mp3" />
    </div>
  );
}
