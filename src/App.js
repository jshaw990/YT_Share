import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
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
      text: '',
      username: '',
      chats: [],
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

  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });
    const pusher = new Pusher('process.env.APP_KEY', {
      cluster: 'process.env.APP_CLUSTER',
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
      this.setState({ text: e.target.value });
    }
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
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    );
  }
}

export default App;