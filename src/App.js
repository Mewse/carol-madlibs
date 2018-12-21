import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import songs from './songs.js';
import Inputs from './Inputs';
import Lyrics from './Lyrics';

const ESCAPE_KEY = 27;
const SPACE_KEY = 32;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

class App extends Component {
  state = {
    songs: [],
    selectedSong: 0,
    inputs: {},
    placeholders: [],
    songMode: false,
    lyricLine: 0,
    lyrics: [],
    compiledLyrics: []
  }
  
  loadSongs() {
    this.setState({
      songs: songs.map(song => song.name),
      selectedSong: 0,
      inputs: new Array(Object.keys(songs[0].placeholders).length).fill(""),
      placeholders: Object.values(songs[0].placeholders),
      songMode: false,
      lyricLine: 0,
      lyrics: songs[0].lyrics,
    });
  }

  componentDidMount() {
    this.loadSongs();
    this.addLyricListener();
  }

  addLyricListener() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    switch(event.keyCode) {
      case ESCAPE_KEY:
        this.setState({songMode: false, lyricLine: 0})
        break;
      case SPACE_KEY:
        this.advanceLyrics();
        break;
      case RIGHT_ARROW_KEY: 
        this.advanceLyrics();
        break;
      case LEFT_ARROW_KEY:
        this.rewindLyrics();
        break;
      default:
        break;
    }
  }

  /**
   * Enter song mode
   */
  startSongMode() {
    this.setState({songMode: true, lyricLine: 0})
  }

  /**
   * Go to next lyric. Exit song mode after final line
   */
  advanceLyrics() {
    this.setState((prevState) => {
      if (prevState.lyricLine + 1 >= prevState.lyrics.length) {
        return {songMode: false, lyricLine: 0}
      } else {
        return {
          lyricLine: prevState.lyricLine + 1
        }
      }
    })
  }

  /**
   * Go to next lyric. Exit song mode after final line
   */
  rewindLyrics() {
    if (this.state.lyricLine - 1 < 0) {
      return;
    }
    this.setState((prevState) => {
        return {
          lyricLine: prevState.lyricLine - 1
        }
    })
  }

  onChangeInput(index, value) {
    this.setState((prevState) => ({
      inputs: prevState.inputs.map((input, i) => {
        if (i === index) return value
        else return input
      })
    }));
  }

  compile() {
    const newLyrics = this.state.lyrics.map((lyric, index) => this.format(lyric))
    this.setState({compiledLyrics: newLyrics, songMode: true});
  }

  format(string) {
    let outString = string;
    for (const rep of Array(this.state.placeholders.length).keys()) {
      if (string.indexOf(`{${rep}}`) !== -1) {
        const replace = `\\{${rep}\\}`;
        outString = outString.replace(new RegExp(replace,"g"), this.state.inputs[rep])
      }
    }
    return outString;
  }

  render() {
    const editModeContent = (
      <div className="inputs-container">
        <Inputs 
              placeholders={this.state.placeholders} 
              inputs={this.state.inputs}
              onChange={this.onChangeInput.bind(this)}
              compile={this.compile.bind(this)}
          />
          
          {/* <Lyrics lyrics={this.state.lyrics} /> */}
          {/* Compiled Lyrics
          <Lyrics lyrics={this.state.compiledLyrics} /> */}
      </div>
    )

    const songModeContent = (
      <div className="song-lyric-container">
        <h1 className="song-lyric">{this.state.compiledLyrics[this.state.lyricLine]}</h1>
      </div>
    )
    
    return (
      <div className="App">
        {this.state.songMode ? songModeContent : editModeContent}
      </div>
    );
  }
}

export default App;
