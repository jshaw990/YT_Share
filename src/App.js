import React, { Component } from 'react';
import TopNav from './components/TopNav';
import SearchBar from './components/SearchBar.jsx';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList.jsx';
import VideoPlayer from './components/VideoPlayer';
import './style/App.css';

require('dotenv').config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('React Tutorials');
  }

  videoSearch(searchTerm) {
    YTSearch({key: API_KEY, term: searchTerm}, (data) => {
      console.log(data);
        this.setState({
          videos: data,
          selectedVideo: data[0]
        });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopNav/>
        </header>
        <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
        <VideoPlayer video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
                   videos={this.state.videos} />
      </div>
    );
  }
}

export default App;