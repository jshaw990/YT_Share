import React, { Component } from 'react';
import TopNav from './components/TopNav';
import SearchBar from './components/SearchBar.jsx';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList.jsx';
import VideoPlayer from './components/VideoPlayer';
import './style/App.css';
import Messages from "./Messages";
import Input from "./Input"


require('dotenv').config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API;

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
let members = []
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      messages: [],
      member: {
        username: randomName(),
        color: randomColor()
      }
    };
    this.drone = new window.Scaledrone('ZiDPD6E9oCpQ5i3I', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });

    this.videoSearch('React Tutorials');
  }
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  videoSearch(searchTerm) {
    YTSearch({ key: API_KEY, term: searchTerm }, (data) => {
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
          <TopNav />
        </header>
        <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} />
        <VideoPlayer video={this.state.selectedVideo} />
        <VideoList onVideoSelect={userSelected => this.setState({ selectedVideo: userSelected })}
          videos={this.state.videos} />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}/>
        <Input onSendMessage={this.onSendMessage}/>  
      </div>
    );
  }
}

export default App;