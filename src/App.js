import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
import './style/App.css';
import TopNav from './components/TopNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: []
    };
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