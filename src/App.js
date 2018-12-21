import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import songs from './songs.js';

class App extends Component {
  state = {
    songs: [],
    inputs: [],
  }
  
  loadSongs() {
    this.setState({
      songs: songs,
      selectedSong: 0,
      inputs: new Array(songs[0].placeholders.length),
      placeholders: songs[0].placeholders,
      songMode: false,
      lyricLine: 0
    });
  }


  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
