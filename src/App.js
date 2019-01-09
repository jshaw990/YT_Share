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
      members: [],
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
    let members = []
    this.room.on('members', m => {
      members = m;
      this.setState({members})
     });
    this.room.on('member_join', member => {
      members.push(member);
      this.setState({members})
      if (this.state.member.username === this.state.room.name){
        this.updateMember()
      }
    });
    this.room.on('member_leave', ({id}) => {
      const index = members.findIndex(member => member.id === id);
      members.splice(index, 1);
      this.setState({members})
     });
    this.room.on('data', (data, member) => {
      if (!data.type) {
        const messages = this.state.messages;
        messages.push(data);
        this.setState({ messages });
      }
      if (
        member.clientData.id === this.state.member.id
      ) return;
      if (data.type === "videoChange") {
        const { videos, selectedVideo, time } = data;
        this.setState({
          videos,
          selectedVideo
        }, () => {
          console.log("selected video done!", time);
          setTimeout(() => {
            if (time) return this.player.seekTo(time);
          }, 0)
        })
      }
      if (data.type === "requestVideoSync" && this.state.member.username === this.state.room.name) {
        this.updateMember();
      }
      if (data.type === "videoStateChange" && this.state.member.username !== this.state.room.name) {
        if (!this.player || typeof this.player.seekTo !== 'function') return;
        return this.player.seekTo(data.time)
      }
    })
  }
  updateMember = () => {
    const { videos, selectedVideo } = this.state;
    this.drone.publish({
      room: "observable-" + this.state.room.name,
      message: {
        videos,
        selectedVideo,
        type: 'videoChange',
        time: this.player.getCurrentTime()
      }
    });
  }
  onSendMessage = (text) => {
    this.drone.publish({
      room: "observable-" + this.state.room.name,
      message: {
        text,
        member: this.state.member
      }
    });
  }
  sendVideoSearch = (message) => {
    if (this.state.member.username === this.state.room.name){
    this.drone.publish({ room: "observable-" + this.state.room.name, message })
  }}
  handleVideoStateChange = ({ data, target }) => {
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
      searchData.type = "videoChange"
      this.sendVideoSearch(searchData)
    });
  }
  handleVideoChange = selectedVideo => {
    this.setState({ selectedVideo });
    if (this.state.member.username === this.state.room.name) {
      this.drone.publish({
        room: "observable-" + this.state.room.name,
        message: {
          type: "videoChange",
          selectedVideo,
          videos: this.state.videos,
        }
      });
    }
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
    this.initRoom(room.name)
  }
  joinRoom = (event) => {
    if (event.key === "Enter") {
      let room = Object.assign({}, this.state.room)
      room.name = event.target.value;
      this.setState({ room })
      this.initRoom(room.name)
    }
  }
  onSync = () => {
    if (this.state.member.username !== this.state.room.name) {
      this.drone.publish({
        room: "observable-" + this.state.room.name,
        message: {
          type: "requestVideoSync",
        }
      });
    }
  }
  skipCount = () => {
    let room = Object.assign({}, this.state.room);
    room.skipCount = this.state.room
        this.setState(( prevState, { room }) => ({
          skipCount: this.state.room.skipCount + 1
        }));
    console.log("Skip", this.state.room)
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
            members={this.state.members.length}
            onSync={this.onSync}
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
        <VideoList onVideoSelect={this.handleVideoChange}
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