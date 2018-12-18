import React, { Component } from 'react';
import './style/App.css';
import TopNav from './components/TopNav.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav/>
      </div>
    );
  }
}

export default App;
