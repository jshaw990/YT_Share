import React, { Component } from 'react';
import './style/App.css';
import TopNav from './components/TopNav';
import SearchBar from './components/SearchBar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Messages from "./Messages";
import ChatMessage from "./Input";
import Buttons from './components/Buttons';
import {
  Container,
  Row,
  Col 
} from 'reactstrap';

require('dotenv').config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API;

function randomName() {
  const user = "User";
  const ranNum = Math.floor(1000 + Math.random() * 9000);
  return user + ranNum;
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
      selectedVideo: {
        id: {
          videoId: ''
        }
      },
      messages: [],
      member: {
        username: randomName(),
        color: randomColor()
      },
      room: {
        name: 'default',
        skipCount: 0
      }
    };
  }

  componentDidMount() {
    this.drone = new window.Scaledrone('ZiDPD6E9oCpQ5i3I', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    this.initRoom();

    this.videoSearch('James Bond');
  }

  initRoom = (name) => {
    if (this.room) this.room.unsubscribe();
    this.room = this.drone.subscribe("observable-" + (name || this.state.room.name));
    
    const newState = {  messages: [] };
    this.setState(newState);

    this.room.on('data', (data, member) => {
      // console.log(this.room, member)
      if (!data.type) {
        const messages = this.state.messages;
        messages.push(data);
        this.setState({ messages });
        // console.log('messages: '+ messages, 'type: ' + data.type)
      }
      if (
        member.clientData.id === this.state.member.id
      ) return;
      // console.log('DATA', data)
      if (data.type === "videoSearch") {
        const { videos, selectedVideo } = data;
        return this.setState({
          videos,
          selectedVideo
        })
      }

      if (data.type === "videoStateChange" && this.state.member.username !== this.state.room.name) {
        if (!this.player || typeof this.player.seekTo !== 'function') return;
        return this.player.seekTo(data.time)
      }
    })
  }

  onSendMessage = (text) => {
    this.drone.publish({
      room: "observable-" + this.state.room.name,
      message: {
        text,
        member: this.state.member
      }
    });
    // console.log('message: ' + text, 'room: ' + this.state.room.name)
  }

  sendVideoSearch = (message) => {
    if (this.state.member.username === this.state.room.name){
    this.drone.publish({ room: "observable-" + this.state.room.name, message })
  }}

  handleVideoStateChange = ({ data, target }) => {
    console.log(data)
    if (this.state.member.username === this.state.room.name){
    const time = target.getCurrentTime();
    this.drone.publish({
      room: "observable-" + this.state.room.name,
      message: {
        type: "videoStateChange",
        time
      }
    })
  }}
  videoSearch(searchTerm) {
    YTSearch({ key: API_KEY, term: searchTerm }, (data) => {
      const searchData = {
        videos: data,
        selectedVideo: data[0]
      };
      this.setState(searchData);
      searchData.type = "videoSearch"
      this.sendVideoSearch(searchData)
    });
  }

  videoReady = ({ target }) => {
    console.log('TARGET READY', target)
    this.player = target;
  }
  setUser = (event) => {
    let member = Object.assign({}, this.state.member);
    member.username = event.target.value;
    this.setState({ member })
  }
  createRoom = () => {
    let room = Object.assign({}, this.state.room)
    room.name = this.state.member.username;
    this.setState({ room })
    // console.log('room:' + this.state.room.name, 'member:' + this.state.member.username)

    this.initRoom(room.name)
  }
  joinRoom = (event) => {
    if (event.key === "Enter") {
      let room = Object.assign({}, this.state.room)
      room.name = event.target.value;
      this.setState({ room })
      // console.log('room:' + this.state.room.name, 'member:' + this.state.member.username)
      this.initRoom(room.name)
    }
  }
  skipCount = (event) => {
    let count = Object.assign({}, this.state.room);
    count.skipCount = this.state.room.skipCount
        this.setState((prevState) => ({
        skipCount: prevState.room.skipCount + 1,
    }));
  }
  render() {
    return (
      <Container>
      <div className="App">
        <header className="App-header">
          <TopNav
            username={this.state.member.username}
            setUser={this.setUser}
            room={this.state.room}
            member={this.state.member}
            createRoom={this.createRoom}
            joinRoom={this.joinRoom}
          />
        </header>
        <br></br>
        <Row>
          <Col sm="12" md="12" lg="7">
          <div className="videoArea">
        <VideoPlayer
          video={this.state.selectedVideo}
          onStateChange={this.handleVideoStateChange}
          onReady={this.videoReady}
          member={this.state.member.username}
          room={this.state.room.name}
        />
        </div>
          <div className="chatArea">
          <Buttons 
            selectedVideo={this.state.selectedVideo.id.videoId}
            skip={this.state.room.skipCount} 
            skipCount={this.skipCount}  
          /> 
          <br></br>
          <ChatMessage onSendMessage={this.onSendMessage}
          />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
          color={this.state.member.color}
        />
        </div>
        </Col>
        <Col sm="12" md="12" lg="5" className="searchArea">
        <SearchBar
        onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} 
        member={this.state.member.username}
        room={this.state.room.name}
        />
        <VideoList onVideoSelect={userSelected => this.setState({ selectedVideo: userSelected })}
          videos={this.state.videos}
          member={this.state.member.username}
          room={this.state.room.name}
        />
        </Col>
        </Row>
        <Row>
        </Row>
      </div>
      </Container>
    );
  }
}

export default App;