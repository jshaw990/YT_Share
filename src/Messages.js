import {Component} from "react";
import React from "react";

class Messages extends Component {
  
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.slice(0).reverse().map(m => this.renderMessage(m))}
      </ul>
    );
  }
  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <p className={className}>
        <div className="Message-content">
          <span className="messageUsername">
            {member.username}: 
          </span>
          <span> </span>
          <span className="messageText">{text}</span>
        </div>
        <hr></hr>
      </p>
    );
  }
}

export default Messages;